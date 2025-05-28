
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, MessageCircle, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import PredictionModal from '@/components/PredictionModal';

interface PredictionMarketsProps {
  selectedTopic: string | null;
}

const PredictionMarkets = ({ selectedTopic }: PredictionMarketsProps) => {
  const [selectedMarket, setSelectedMarket] = useState<any>(null);

  const markets = [
    {
      id: 1,
      title: 'Will Bitcoin reach $70,000 by end of month?',
      topic: 'Bitcoin Price',
      description: 'Based on current market trends and recent social media buzz',
      totalPool: '$12,450',
      participants: 234,
      timeRemaining: '5 days',
      yesVotes: 156,
      noVotes: 78,
      yesPrice: 0.65,
      noPrice: 0.35,
      fee: '0.1%',
      status: 'active',
      category: 'Crypto'
    },
    {
      id: 2,
      title: 'Fed will raise interest rates next meeting?',
      topic: 'Federal Reserve Decision',
      description: 'Prediction based on economic indicators and Fed communications',
      totalPool: '$8,920',
      participants: 187,
      timeRemaining: '12 days',
      yesVotes: 95,
      noVotes: 92,
      yesPrice: 0.51,
      noPrice: 0.49,
      fee: '0.1%',
      status: 'active',
      category: 'Economics'
    },
    {
      id: 3,
      title: 'AI regulation bill passes this quarter?',
      topic: 'AI Regulation Bill',
      description: 'Congressional prediction market on AI legislation timeline',
      totalPool: '$6,780',
      participants: 143,
      timeRemaining: '25 days',
      yesVotes: 89,
      noVotes: 54,
      yesPrice: 0.62,
      noPrice: 0.38,
      fee: '0.1%',
      status: 'active',
      category: 'Technology'
    },
    {
      id: 4,
      title: 'Tesla stock above $250 next week?',
      topic: 'Tesla Earnings',
      description: 'Post-earnings prediction for Tesla stock performance',
      totalPool: '$15,600',
      participants: 312,
      timeRemaining: '7 days',
      yesVotes: 198,
      noVotes: 114,
      yesPrice: 0.63,
      noPrice: 0.37,
      fee: '0.1%',
      status: 'active',
      category: 'Stocks'
    }
  ];

  const filteredMarkets = selectedTopic 
    ? markets.filter(market => market.topic === selectedTopic)
    : markets;

  const getYesPercentage = (market: any) => {
    const total = market.yesVotes + market.noVotes;
    return total > 0 ? (market.yesVotes / total) * 100 : 50;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {selectedTopic ? `Markets for "${selectedTopic}"` : 'All Active Markets'}
        </h2>
        <Badge variant="secondary" className="text-sm">
          {filteredMarkets.length} markets
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMarkets.map((market, index) => (
          <Card 
            key={market.id} 
            className="hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 border hover:border-blue-300 animate-fade-in"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <CardHeader>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-gray-900 hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {market.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {market.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{market.description}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Market Stats */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-medium">{market.totalPool}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Users className="w-4 h-4" />
                  <span>{market.participants}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600">
                  <Clock className="w-4 h-4" />
                  <span>{market.timeRemaining}</span>
                </div>
              </div>

              {/* Prediction Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">YES {(getYesPercentage(market)).toFixed(1)}%</span>
                  <span className="text-red-600 font-medium">NO {(100 - getYesPercentage(market)).toFixed(1)}%</span>
                </div>
                <Progress value={getYesPercentage(market)} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{market.yesVotes} votes</span>
                  <span>{market.noVotes} votes</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => setSelectedMarket(market)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300"
                >
                  Predict YES
                </Button>
                <Button 
                  onClick={() => setSelectedMarket(market)}
                  variant="outline" 
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transform hover:scale-105 transition-all duration-300"
                >
                  Predict NO
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="px-3 hover:bg-blue-50 hover:text-blue-600 transform hover:scale-110 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>

              {/* Fee Info */}
              <div className="text-xs text-gray-500 text-center pt-2 border-t">
                Platform fee: {market.fee} of winnings
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Prediction Modal */}
      {selectedMarket && (
        <PredictionModal 
          market={selectedMarket} 
          onClose={() => setSelectedMarket(null)} 
        />
      )}
    </div>
  );
};

export default PredictionMarkets;
