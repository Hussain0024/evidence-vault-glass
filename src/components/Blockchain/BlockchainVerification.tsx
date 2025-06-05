
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { verifyEvidenceIntegrity } from '@/services/evidenceService';
import { Shield, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

interface BlockchainVerificationProps {
  evidenceId: string;
  blockchainTx?: string;
  blockNumber?: number;
  contractTxHash?: string;
}

export function BlockchainVerification({ 
  evidenceId, 
  blockchainTx, 
  blockNumber,
  contractTxHash 
}: BlockchainVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    message: string;
    blockchainData?: any;
  } | null>(null);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const result = await verifyEvidenceIntegrity(evidenceId);
      setVerificationResult(result);
      
      if (result.isValid) {
        toast({
          title: "Verification Successful",
          description: result.message,
        });
      } else {
        toast({
          title: "Verification Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Verification Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const openEtherscan = (txHash: string) => {
    // Assuming Sepolia testnet - adjust URL based on network
    window.open(`https://sepolia.etherscan.io/tx/${txHash}`, '_blank');
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-white flex items-center text-sm">
          <Shield className="w-4 h-4 mr-2" />
          Blockchain Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {blockchainTx && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Transaction:</span>
              <div className="flex items-center space-x-2">
                <code className="text-blue-400 text-xs">
                  {blockchainTx.slice(0, 10)}...{blockchainTx.slice(-8)}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => openEtherscan(blockchainTx)}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            {blockNumber && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Block:</span>
                <span className="text-white font-mono text-xs">#{blockNumber}</span>
              </div>
            )}
          </div>
        )}

        <Button
          onClick={handleVerify}
          disabled={isVerifying}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
          size="sm"
        >
          {isVerifying ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Verifying...
            </div>
          ) : (
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Verify on Blockchain
            </div>
          )}
        </Button>

        {verificationResult && (
          <div className={`p-3 rounded-lg border ${
            verificationResult.isValid 
              ? 'border-green-500 bg-green-500/10' 
              : 'border-red-500 bg-red-500/10'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {verificationResult.isValid ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-400" />
              )}
              <Badge 
                variant="outline"
                className={verificationResult.isValid 
                  ? 'border-green-500 text-green-400' 
                  : 'border-red-500 text-red-400'
                }
              >
                {verificationResult.isValid ? 'Valid' : 'Invalid'}
              </Badge>
            </div>
            <p className="text-sm text-gray-300">{verificationResult.message}</p>
            
            {verificationResult.blockchainData && verificationResult.isValid && (
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Submitter:</span>
                  <code className="text-blue-400">
                    {verificationResult.blockchainData.submitter?.slice(0, 6)}...
                    {verificationResult.blockchainData.submitter?.slice(-4)}
                  </code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Timestamp:</span>
                  <span className="text-gray-300">
                    {new Date(verificationResult.blockchainData.timestamp * 1000).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
