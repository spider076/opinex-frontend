
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, MessageCircle, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';
import PredictionModal from '@/components/PredictionModal';
import { useMarkets } from '@/hooks/useMarkets';

interface PredictionMarketsProps {
  selectedTopic: string | null;
}

const PredictionMarkets = ({ selectedTopic }: PredictionMarketsProps) => {
  const [selectedMarket, setSelectedMarket] = useState<any>(null);
  const { markets, loading } = useMarkets(selectedTopic);

  const getYesPercentage = (market: any) => {
    const total = market.yes_votes + market.no_votes;
    return total > 0 ? (market.yes_votes / total) * 100 : 50;
  };

  const formatTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading markets...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {selectedTopic ? `Markets for "${selectedTopic}"` : 'All Active Markets'}
        </h2>
        <Badge variant="secondary" className="text-sm">
          {markets.length} markets
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {markets.map((market, index) => (
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
                  <span className="font-medium">${market.total_pool}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Users className="w-4 h-4" />
                  <span>{market.participants}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimeRemaining(market.end_date)}</span>
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
                  <span>{market.yes_votes} votes</span>
                  <span>{market.no_votes} votes</span>
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
                Platform fee: {market.fee_percentage}% of winnings
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
