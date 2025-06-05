import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { blockchainService } from './blockchainService';

export interface EvidenceUpload {
  file: File;
  caseNumber?: string;
  evidenceType: string;
  description?: string;
  tags?: string[];
}

export interface EvidenceRecord {
  id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  file_path: string;
  case_number?: string;
  evidence_type: string;
  description?: string;
  tags?: string[];
  hash_sha256: string;
  blockchain_tx?: string;
  contract_transaction_hash?: string;
  block_number?: number;
  gas_used?: number;
  transaction_fee?: string;
  blockchain_network_id?: string;
  status: 'pending' | 'processing' | 'verified' | 'failed';
  verification_progress: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

// Generate SHA-256 hash for file
async function generateFileHash(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function uploadEvidence(evidenceData: EvidenceUpload): Promise<string> {
  const { file, caseNumber, evidenceType, description, tags } = evidenceData;
  
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('User not authenticated');

    // Generate file hash
    const fileHash = await generateFileHash(file);
    
    // Create unique file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // Upload file to storage
    const { error: uploadError } = await supabase.storage
      .from('evidence-files')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get active blockchain network
    const { data: network } = await supabase
      .from('blockchain_networks')
      .select('*')
      .eq('is_active', true)
      .single();

    // Create evidence record
    const { data: evidence, error: evidenceError } = await supabase
      .from('evidence')
      .insert({
        user_id: user.id,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        file_path: filePath,
        case_number: caseNumber,
        evidence_type: evidenceType,
        description,
        tags,
        hash_sha256: fileHash,
        blockchain_network_id: network?.id,
        status: 'pending',
        verification_progress: 0
      })
      .select()
      .single();

    if (evidenceError) throw evidenceError;

    // Log audit event
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      evidence_id: evidence.id,
      action: 'Evidence Upload',
      details: {
        file_name: file.name,
        file_size: file.size,
        evidence_type: evidenceType,
        case_number: caseNumber
      },
      ip_address: 'unknown',
      user_agent: navigator.userAgent
    });

    // Start blockchain registration process
    registerOnBlockchain(evidence.id, fileHash, evidenceType, caseNumber);

    return evidence.id;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Upload failed');
  }
}

async function registerOnBlockchain(
  evidenceId: string, 
  fileHash: string, 
  evidenceType: string, 
  caseNumber?: string
) {
  try {
    // Update status to processing
    await supabase
      .from('evidence')
      .update({ 
        status: 'processing',
        verification_progress: 25
      })
      .eq('id', evidenceId);

    // Initialize blockchain service if not already done
    if (!blockchainService.isInitialized()) {
      await blockchainService.initialize();
    }

    // Register evidence on blockchain
    const txResult = await blockchainService.registerEvidenceOnBlockchain(
      fileHash,
      evidenceType,
      caseNumber
    );

    // Update evidence with blockchain transaction details
    await supabase
      .from('evidence')
      .update({ 
        status: 'verified',
        verification_progress: 100,
        blockchain_tx: txResult.hash,
        contract_transaction_hash: txResult.hash,
        block_number: txResult.blockNumber,
        gas_used: parseInt(txResult.gasUsed),
        transaction_fee: txResult.transactionFee
      })
      .eq('id', evidenceId);

    // Log verification completion
    await supabase.from('audit_logs').insert({
      user_id: (await supabase.auth.getUser()).data.user?.id,
      evidence_id: evidenceId,
      action: 'Evidence Verified',
      details: {
        blockchain_tx: txResult.hash,
        block_number: txResult.blockNumber,
        gas_used: txResult.gasUsed,
        transaction_fee: txResult.transactionFee
      },
      ip_address: 'unknown',
      user_agent: navigator.userAgent
    });

    toast({
      title: "Evidence verified on blockchain!",
      description: `Transaction: ${txResult.hash.slice(0, 10)}...`,
    });

  } catch (error: any) {
    console.error('Blockchain registration error:', error);
    
    // Update status to failed
    await supabase
      .from('evidence')
      .update({ 
        status: 'failed',
        verification_progress: 0
      })
      .eq('id', evidenceId);

    toast({
      title: "Blockchain verification failed",
      description: error.message,
      variant: "destructive",
    });
  }
}

export async function getEvidence(): Promise<EvidenceRecord[]> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('evidence')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(item => ({
      ...item,
      status: item.status as 'pending' | 'processing' | 'verified' | 'failed'
    })) as EvidenceRecord[];
  } catch (error: any) {
    console.error('Fetch evidence error:', error);
    throw new Error(error.message || 'Failed to fetch evidence');
  }
}

export async function getEvidenceById(id: string): Promise<EvidenceRecord | null> {
  try {
    const { data, error } = await supabase
      .from('evidence')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    
    return {
      ...data,
      status: data.status as 'pending' | 'processing' | 'verified' | 'failed'
    } as EvidenceRecord;
  } catch (error: any) {
    console.error('Fetch evidence by ID error:', error);
    return null;
  }
}

export async function downloadEvidence(evidenceId: string, filePath: string): Promise<string> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('User not authenticated');

    const { data, error } = await supabase.storage
      .from('evidence-files')
      .createSignedUrl(filePath, 3600);

    if (error) throw error;

    // Log download event
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      evidence_id: evidenceId,
      action: 'Evidence Downloaded',
      details: { file_path: filePath },
      ip_address: 'unknown',
      user_agent: navigator.userAgent
    });

    return data.signedUrl;
  } catch (error: any) {
    console.error('Download error:', error);
    throw new Error(error.message || 'Download failed');
  }
}

export async function verifyEvidenceIntegrity(evidenceId: string): Promise<{
  isValid: boolean;
  blockchainData?: any;
  message: string;
}> {
  try {
    const evidence = await getEvidenceById(evidenceId);
    if (!evidence) {
      return { isValid: false, message: 'Evidence not found' };
    }

    if (!evidence.blockchain_tx) {
      return { isValid: false, message: 'Evidence not registered on blockchain' };
    }

    // Verify evidence on blockchain
    const blockchainData = await blockchainService.verifyEvidenceOnBlockchain(evidence.hash_sha256);
    
    if (!blockchainData.isRegistered) {
      return { isValid: false, message: 'Evidence not found on blockchain' };
    }

    return {
      isValid: true,
      blockchainData,
      message: 'Evidence successfully verified on blockchain'
    };
  } catch (error: any) {
    console.error('Verification error:', error);
    return { isValid: false, message: error.message || 'Verification failed' };
  }
}
