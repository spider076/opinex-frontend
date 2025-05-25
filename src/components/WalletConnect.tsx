
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Wallet, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WalletConnect = ({ children }: { children: React.ReactNode }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const { toast } = useToast();

  const walletOptions = [
    {
      name: 'MetaMask',
      icon: '🦊',
      description: 'Connect using MetaMask wallet',
      popular: true
    },
    {
      name: 'WalletConnect',
      icon: '🔗',
      description: 'Connect with WalletConnect protocol',
      popular: true
    },
    {
      name: 'Coinbase Wallet',
      icon: '🔵',
      description: 'Connect using Coinbase Wallet',
      popular: false
    },
    {
      name: 'Trust Wallet',
      icon: '🛡️',
      description: 'Connect using Trust Wallet',
      popular: false
    }
  ];

  const connectWallet = async (walletName: string) => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock wallet address
      const mockAddress = '0x742d35Cc6471d40332D1234567890abcdef';
      setConnectedWallet(mockAddress);
      
      toast({
        title: "Wallet Connected!",
        description: `Successfully connected to ${walletName}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Please try again or choose a different wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const copyAddress = () => {
    if (connectedWallet) {
      navigator.clipboard.writeText(connectedWallet);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const disconnectWallet = () => {
    setConnectedWallet(null);
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from wallet",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            {connectedWallet ? 'Wallet Connected' : 'Connect Your Wallet'}
          </DialogTitle>
        </DialogHeader>
        
        {connectedWallet ? (
          <div className="space-y-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-800 font-medium">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-mono">
                    {`${connectedWallet.slice(0, 6)}...${connectedWallet.slice(-4)}`}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyAddress}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex gap-2">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Continue to Trading
              </Button>
              <Button variant="outline" onClick={disconnectWallet}>
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Choose your preferred wallet to connect and start trading
            </p>
            
            <div className="space-y-2">
              {walletOptions.map((wallet) => (
                <Card
                  key={wallet.name}
                  className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-blue-300"
                  onClick={() => connectWallet(wallet.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{wallet.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{wallet.name}</span>
                            {wallet.popular && (
                              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{wallet.description}</p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {isConnecting && (
              <div className="text-center py-4">
                <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Connecting to wallet...</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnect;
