
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendingTopicsProps {
  onTopicSelect: (topic: string) => void;
  selectedTopic: string | null;
}

const TrendingTopics = ({ onTopicSelect, selectedTopic }: TrendingTopicsProps) => {
  const trendingTopics = [
    { 
      topic: 'Bitcoin Price', 
      source: 'Reddit', 
      mentions: 1240, 
      trend: 'up', 
      change: '+23%',
      category: 'Crypto'
    },
    { 
      topic: 'Federal Reserve Decision', 
      source: 'Twitter', 
      mentions: 890, 
      trend: 'up', 
      change: '+15%',
      category: 'Economics'
    },
    { 
      topic: 'AI Regulation Bill', 
      source: 'Reddit', 
      mentions: 567, 
      trend: 'up', 
      change: '+45%',
      category: 'Technology'
    },
    { 
      topic: 'Climate Summit Results', 
      source: 'Twitter', 
      mentions: 423, 
      trend: 'down', 
      change: '-8%',
      category: 'Politics'
    },
    { 
      topic: 'Tesla Earnings', 
      source: 'Reddit', 
      mentions: 312, 
      trend: 'up', 
      change: '+12%',
      category: 'Stocks'
    },
  ];

  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-2 hover:border-green-300 animate-fade-in sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600">
          <TrendingUp className="w-5 h-5 animate-bounce" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-md ${
                selectedTopic === topic.topic 
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-400' 
                  : 'bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50'
              }`}
              onClick={() => onTopicSelect(topic.topic)}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-300 text-sm">
                    {topic.topic}
                  </div>
                  <div className="flex items-center gap-1">
                    {topic.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 text-green-500 animate-bounce" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500 animate-bounce" />
                    )}
                    <span className={`text-xs font-medium transition-all duration-300 hover:scale-110 ${
                      topic.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {topic.change}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{topic.mentions} mentions</span>
                  <Badge variant="secondary" className="text-xs">
                    {topic.source}
                  </Badge>
                </div>
                
                <Badge variant="outline" className="text-xs">
                  {topic.category}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;
