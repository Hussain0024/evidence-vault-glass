
import { ethers } from 'ethers';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Smart contract ABI for EvidenceRegistry
const EVIDENCE_REGISTRY_ABI = [
  "function registerEvidence(string memory _fileHash, string memory _evidenceType, string memory _caseNumber) external",
  "function verifyEvidence(string memory _fileHash) external view returns (string memory, address, uint256, string memory, string memory)",
  "function isEvidenceRegistered(string memory _fileHash) external view returns (bool)",
  "function getUserEvidence(address _user) external view returns (string[] memory)",
  "event EvidenceRegistered(string indexed fileHash, address indexed submitter, uint256 timestamp, string evidenceType, string caseNumber)"
];

export interface BlockchainNetwork {
  id: string;
  name: string;
  chain_id: number;
  rpc_url: string;
  contract_address?: string;
  is_active: boolean;
}

export interface BlockchainTransaction {
  hash: string;
  blockNumber: number;
  gasUsed: string;
  transactionFee: string;
}

export class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private contract: ethers.Contract | null = null;
  private currentNetwork: BlockchainNetwork | null = null;

  async initialize(): Promise<void> {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to use blockchain features.');
      }

      this.provider = new ethers.BrowserProvider(window.ethereum);
      
      // Get active blockchain network from database
      const { data: networks, error } = await supabase
        .from('blockchain_networks')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error || !networks) {
        throw new Error('No active blockchain network configured');
      }

      this.currentNetwork = networks;

      // Check if we're on the correct network
      const network = await this.provider.getNetwork();
      if (Number(network.chainId) !== this.currentNetwork.chain_id) {
        await this.switchNetwork();
      }

      this.signer = await this.provider.getSigner();

      // Initialize contract if address is available
      if (this.currentNetwork.contract_address) {
        this.contract = new ethers.Contract(
          this.currentNetwork.contract_address,
          EVIDENCE_REGISTRY_ABI,
          this.signer
        );
      }
    } catch (error: any) {
      console.error('Blockchain initialization error:', error);
      throw error;
    }
  }

  async connectWallet(): Promise<string> {
    try {
      if (!this.provider) {
        await this.initialize();
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please connect your wallet.');
      }

      return accounts[0];
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      throw new Error(error.message || 'Failed to connect wallet');
    }
  }

  async switchNetwork(): Promise<void> {
    if (!this.currentNetwork) {
      throw new Error('No network configuration found');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${this.currentNetwork.chain_id.toString(16)}` }],
      });
    } catch (error: any) {
      console.error('Network switch error:', error);
      throw new Error('Failed to switch to the correct network');
    }
  }

  async registerEvidenceOnBlockchain(
    fileHash: string,
    evidenceType: string,
    caseNumber?: string
  ): Promise<BlockchainTransaction> {
    try {
      if (!this.contract) {
        throw new Error('Smart contract not initialized');
      }

      const tx = await this.contract.registerEvidence(
        fileHash,
        evidenceType,
        caseNumber || ''
      );

      const receipt = await tx.wait();

      return {
        hash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        transactionFee: ethers.formatEther(receipt.gasUsed * receipt.gasPrice)
      };
    } catch (error: any) {
      console.error('Blockchain registration error:', error);
      throw new Error(error.message || 'Failed to register evidence on blockchain');
    }
  }

  async verifyEvidenceOnBlockchain(fileHash: string): Promise<{
    isRegistered: boolean;
    submitter?: string;
    timestamp?: number;
    evidenceType?: string;
    caseNumber?: string;
  }> {
    try {
      if (!this.contract) {
        throw new Error('Smart contract not initialized');
      }

      const isRegistered = await this.contract.isEvidenceRegistered(fileHash);
      
      if (!isRegistered) {
        return { isRegistered: false };
      }

      const [, submitter, timestamp, evidenceType, caseNumber] = 
        await this.contract.verifyEvidence(fileHash);

      return {
        isRegistered: true,
        submitter,
        timestamp: Number(timestamp),
        evidenceType,
        caseNumber
      };
    } catch (error: any) {
      console.error('Blockchain verification error:', error);
      throw new Error(error.message || 'Failed to verify evidence on blockchain');
    }
  }

  async getWalletAddress(): Promise<string> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }
    return await this.signer.getAddress();
  }

  async getBalance(): Promise<string> {
    if (!this.provider || !this.signer) {
      throw new Error('Wallet not connected');
    }
    const balance = await this.provider.getBalance(await this.signer.getAddress());
    return ethers.formatEther(balance);
  }

  isInitialized(): boolean {
    return this.provider !== null && this.signer !== null;
  }

  getCurrentNetwork(): BlockchainNetwork | null {
    return this.currentNetwork;
  }
}

// Singleton instance
export const blockchainService = new BlockchainService();
