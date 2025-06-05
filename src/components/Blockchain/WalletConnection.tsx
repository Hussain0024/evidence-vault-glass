
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { blockchainService } from '@/services/blockchainService';
import { Wallet, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface WalletConnectionProps {
  onConnectionChange?: (connected: boolean) => void;
}

export function WalletConnection({ onConnectionChange }: WalletConnectionProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [network, setNetwork] = useState<string>('');

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (blockchainService.isInitialized()) {
        const address = await blockchainService.getWalletAddress();
        const balance = await blockchainService.getBalance();
        const currentNetwork = blockchainService.getCurrentNetwork();
        
        setWalletAddress(address);
        setBalance(balance);
        setNetwork(currentNetwork?.name || 'Unknown');
        setIsConnected(true);
        onConnectionChange?.(true);
      }
    } catch (error) {
      console.log('No wallet connection found');
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      await blockchainService.initialize();
      const address = await blockchainService.connectWallet();
      const balance = await blockchainService.getBalance();
      const currentNetwork = blockchainService.getCurrentNetwork();
      
      setWalletAddress(address);
      setBalance(balance);
      setNetwork(currentNetwork?.name || 'Unknown');
      setIsConnected(true);
      
      onConnectionChange?.(true);
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center text-sm">
            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
            Wallet Connected
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Address:</span>
            <code className="text-blue-400 text-xs">
              {formatAddress(walletAddress)}
            </code>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Balance:</span>
            <span className="text-white font-mono text-xs">
              {parseFloat(balance).toFixed(4)} ETH
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Network:</span>
            <Badge variant="outline" className="text-xs border-green-500 text-green-400">
              {network}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center text-sm">
          <AlertCircle className="w-4 h-4 mr-2 text-yellow-400" />
          Wallet Required
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <p className="text-gray-400 text-sm">
          Connect your wallet to register evidence on the blockchain
        </p>
        <Button 
          onClick={connectWallet}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {isConnecting ? (
            <div className="flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Connecting...
            </div>
          ) : (
            <div className="flex items-center">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
