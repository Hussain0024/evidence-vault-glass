
interface EthereumProvider {
  request(args: { method: string; params?: any[] }): Promise<any>;
  isMetaMask?: boolean;
  selectedAddress?: string;
  chainId?: string;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export {};
