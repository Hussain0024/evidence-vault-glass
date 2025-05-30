
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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

    // Simulate blockchain verification process
    setTimeout(async () => {
      try {
        // Update to processing
        await supabase
          .from('evidence')
          .update({ 
            status: 'processing',
            verification_progress: 50
          })
          .eq('id', evidence.id);

        // Simulate completion
        setTimeout(async () => {
          const blockchainTx = '0x' + Math.random().toString(16).substring(2, 42);
          await supabase
            .from('evidence')
            .update({ 
              status: 'verified',
              verification_progress: 100,
              blockchain_tx: blockchainTx
            })
            .eq('id', evidence.id);

          // Log verification completion
          await supabase.from('audit_logs').insert({
            user_id: user.id,
            evidence_id: evidence.id,
            action: 'Evidence Verified',
            details: {
              blockchain_tx: blockchainTx,
              file_name: file.name
            },
            ip_address: 'unknown',
            user_agent: navigator.userAgent
          });

          toast({
            title: "Evidence verified!",
            description: `${file.name} has been verified on the blockchain.`,
          });
        }, 3000);
      } catch (error) {
        console.error('Verification error:', error);
        await supabase
          .from('evidence')
          .update({ 
            status: 'failed',
            verification_progress: 0
          })
          .eq('id', evidence.id);
      }
    }, 1000);

    return evidence.id;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Upload failed');
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
    
    // Cast the data to EvidenceRecord[] with proper type assertion
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
    
    // Cast the data to EvidenceRecord with proper type assertion
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
      .createSignedUrl(filePath, 3600); // 1 hour expiry

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
