
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { TrendingUp, TrendingDown, MessageCircle, ThumbsUp, Users, Clock, Search } from 'lucide-react';
import { useState } from 'react';

const Profile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  const trendingTopics = [
    { topic: 'Bitcoin ETF', posts: 156, trend: 'up', change: '+23%' },
    { topic: 'Fed Interest Rates', posts: 89, trend: 'up', change: '+15%' },
    { topic: 'AI Stock Rally', posts: 234, trend: 'up', change: '+45%' },
    { topic: 'Crypto Regulation', posts: 67, trend: 'down', change: '-8%' },
    { topic: 'Market Volatility', posts: 123, trend: 'up', change: '+12%' },
  ];

  const discussions = [
    {
      id: 1,
      title: 'What are your thoughts on the current Bitcoin trend?',
      author: 'CryptoTrader92',
      time: '2 hours ago',
      replies: 24,
      likes: 45,
      tags: ['Bitcoin', 'Cryptocurrency', 'Market Analysis'],
      preview: 'Looking at the recent price action, Bitcoin seems to be forming a bullish pattern...'
    },
    {
      id: 2,
      title: 'Best strategies for trading in volatile markets?',
      author: 'MarketMaster',
      time: '4 hours ago',
      replies: 18,
      likes: 32,
      tags: ['Strategy', 'Risk Management', 'Volatility'],
      preview: 'With recent market swings, I\'m curious about proven strategies that work...'
    },
    {
      id: 3,
      title: 'Tesla stock analysis - worth buying the dip?',
      author: 'StockAnalyst',
      time: '6 hours ago',
      replies: 31,
      likes: 67,
      tags: ['Tesla', 'Stocks', 'Technical Analysis'],
      preview: 'TSLA has dropped significantly. Technical indicators suggest...'
    },
    {
      id: 4,
      title: 'How to interpret Federal Reserve announcements?',
      author: 'EconStudent',
      time: '8 hours ago',
      replies: 15,
      likes: 28,
      tags: ['Federal Reserve', 'Economics', 'Market Impact'],
      preview: 'New to trading and struggling to understand how Fed announcements affect...'
    }
  ];

  const handleAskQuestion = () => {
    if (newQuestion.trim()) {
      // In a real app, this would submit to backend
      console.log('New question:', newQuestion);
      setNewQuestion('');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Trading Community</h1>
            <p className="text-gray-600 mt-2">Join discussions, ask questions, and share trading insights</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Ask Question */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Ask a Question
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search discussions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Textarea
                    placeholder="What's your trading question? Share your thoughts..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleAskQuestion} className="bg-blue-600 hover:bg-blue-700">
                    Post Question
                  </Button>
                </CardContent>
              </Card>

              {/* Discussion List */}
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                          {discussion.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{discussion.preview}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="font-medium">{discussion.author}</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {discussion.time}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {discussion.replies}
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {discussion.likes}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <div>
                          <div className="font-medium text-gray-900">{topic.topic}</div>
                          <div className="text-sm text-gray-600">{topic.posts} posts</div>
                        </div>
                        <div className="flex items-center gap-1">
                          {topic.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${
                            topic.trend === 'up' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {topic.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Members</span>
                      <span className="font-semibold text-lg">15,432</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Questions Today</span>
                      <span className="text-green-600 font-medium">+156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Expert Contributors</span>
                      <span className="text-blue-600 font-medium">2,341</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Answered Questions</span>
                      <span className="text-purple-600 font-medium">89.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Market Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Join Expert Panel
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Discussion
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
