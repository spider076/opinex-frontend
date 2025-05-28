
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Users, MessageCircle, DollarSign, TrendingUp, Send } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PredictionModalProps {
  market: any;
  onClose: () => void;
}

const PredictionModal = ({ market, onClose }: PredictionModalProps) => {
  const [betAmount, setBetAmount] = useState('');
  const [prediction, setPrediction] = useState<'yes' | 'no' | null>(null);
  const [message, setMessage] = useState('');
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const { toast } = useToast();

  // Mock chat messages
  const chatMessages = [
    { user: 'CryptoTrader', message: 'Looking at the charts, I think YES is likely', time: '2m ago', prediction: 'yes' },
    { user: 'MarketAnalyst', message: 'Fed signals suggest otherwise', time: '5m ago', prediction: 'no' },
    { user: 'AIEnthusiast', message: 'The momentum is strong for this bill', time: '8m ago', prediction: 'yes' },
    { user: 'TechGuru', message: 'Congress moves slowly on tech issues', time: '12m ago', prediction: 'no' },
  ];

  const handlePlaceBet = async () => {
    if (!betAmount || !prediction) {
      toast({
        title: "Error",
        description: "Please enter an amount and select your prediction",
        variant: "destructive",
      });
      return;
    }

    setIsPlacingBet(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Bet Placed!",
      description: `You predicted ${prediction.toUpperCase()} with $${betAmount}`,
    });
    
    setIsPlacingBet(false);
    onClose();
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been added to the discussion",
    });
    
    setMessage('');
  };

  const getYesPercentage = () => {
    const total = market.yesVotes + market.noVotes;
    return total > 0 ? (market.yesVotes / total) * 100 : 50;
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{market.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Betting Section */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">Place Your Prediction</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 font-medium">YES {getYesPercentage().toFixed(1)}%</span>
                      <span className="text-red-600 font-medium">NO {(100 - getYesPercentage()).toFixed(1)}%</span>
                    </div>
                    <Progress value={getYesPercentage()} className="h-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={prediction === 'yes' ? 'default' : 'outline'}
                    onClick={() => setPrediction('yes')}
                    className={`${prediction === 'yes' ? 'bg-green-600 hover:bg-green-700' : 'border-green-300 text-green-600 hover:bg-green-50'}`}
                  >
                    Predict YES
                  </Button>
                  <Button
                    variant={prediction === 'no' ? 'default' : 'outline'}
                    onClick={() => setPrediction('no')}
                    className={`${prediction === 'no' ? 'bg-red-600 hover:bg-red-700' : 'border-red-300 text-red-600 hover:bg-red-50'}`}
                  >
                    Predict NO
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bet Amount ($)</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                  />
                </div>

                {betAmount && prediction && (
                  <div className="p-3 bg-blue-50 rounded-lg text-sm">
                    <div className="flex justify-between">
                      <span>Potential Return:</span>
                      <span className="font-medium">
                        ${(parseFloat(betAmount) * (prediction === 'yes' ? 1/market.yesPrice : 1/market.noPrice)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Fee (0.1%):</span>
                      <span>${(parseFloat(betAmount) * 0.001).toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handlePlaceBet}
                  disabled={!betAmount || !prediction || isPlacingBet}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isPlacingBet ? 'Placing Bet...' : 'Place Bet'}
                </Button>
              </CardContent>
            </Card>

            {/* Market Stats */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Market Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Pool:</span>
                    <span className="font-medium">{market.totalPool}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Participants:</span>
                    <span>{market.participants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Remaining:</span>
                    <span>{market.timeRemaining}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <Badge variant="secondary">{market.category}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Section */}
          <div className="space-y-4">
            <Card className="h-96">
              <CardContent className="p-4 h-full flex flex-col">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Live Discussion ({chatMessages.length})
                </h4>
                
                <div className="flex-1 overflow-y-auto space-y-3">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{msg.user}</span>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={msg.prediction === 'yes' ? 'default' : 'secondary'}
                            className={`text-xs ${msg.prediction === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          >
                            {msg.prediction.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{msg.message}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-3">
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage}
                    size="sm"
                    className="self-end"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PredictionModal;
