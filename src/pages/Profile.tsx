import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { TrendingUp, TrendingDown, MessageCircle, ThumbsUp, Users, Clock, Search, Sparkles } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 animate-fade-in">
        {/* Floating background elements */}
        <div className="fixed top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="fixed top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="fixed bottom-32 left-1/3 w-28 h-28 bg-pink-200/30 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              Trading Community
            </h1>
            <p className="text-gray-600 mt-2 hover:text-gray-800 transition-colors duration-300">
              Join discussions, ask questions, and share trading insights
            </p>
            <div className="flex justify-center mt-4">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-bounce" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Ask Question */}
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-2 hover:border-blue-300 animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <MessageCircle className="w-5 h-5 animate-bounce" />
                    Ask a Question
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400 animate-pulse" />
                    <Input
                      placeholder="Search discussions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 hover:border-blue-400 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <Textarea
                    placeholder="What's your trading question? Share your thoughts..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    rows={3}
                    className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-300"
                  />
                  <Button 
                    onClick={handleAskQuestion} 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Post Question
                  </Button>
                </CardContent>
              </Card>

              {/* Discussion List */}
              <div className="space-y-4">
                {discussions.map((discussion, index) => (
                  <Card 
                    key={discussion.id} 
                    className="hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 border hover:border-purple-300 animate-fade-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                          {discussion.title}
                        </h3>
                        <p className="text-gray-600 text-sm hover:text-gray-800 transition-colors duration-300">{discussion.preview}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {discussion.tags.map((tag, tagIndex) => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="text-xs hover:bg-blue-100 hover:text-blue-800 transition-all duration-300 transform hover:scale-110"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="font-medium hover:text-blue-600 transition-colors duration-300">{discussion.author}</span>
                            <div className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-300">
                              <Clock className="w-4 h-4" />
                              {discussion.time}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1 hover:text-blue-600 hover:scale-110 transition-all duration-300">
                              <MessageCircle className="w-4 h-4" />
                              {discussion.replies}
                            </div>
                            <div className="flex items-center gap-1 hover:text-red-500 hover:scale-110 transition-all duration-300">
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
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-2 hover:border-green-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
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
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg hover:from-blue-50 hover:to-purple-50 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-md"
                      >
                        <div>
                          <div className="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-300">{topic.topic}</div>
                          <div className="text-sm text-gray-600">{topic.posts} posts</div>
                        </div>
                        <div className="flex items-center gap-1">
                          {topic.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-green-500 animate-bounce" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500 animate-bounce" />
                          )}
                          <span className={`text-sm font-medium transition-all duration-300 hover:scale-110 ${
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
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-2 hover:border-purple-300 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Users className="w-5 h-5 animate-pulse" />
                    Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                      <span className="text-gray-600">Active Members</span>
                      <span className="font-semibold text-lg text-blue-600 hover:scale-110 transition-transform duration-300">15,432</span>
                    </div>
                    <div className="flex justify-between items-center hover:bg-green-50 p-2 rounded transition-colors duration-300">
                      <span className="text-gray-600">Questions Today</span>
                      <span className="text-green-600 font-medium hover:scale-110 transition-transform duration-300">+156</span>
                    </div>
                    <div className="flex justify-between items-center hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                      <span className="text-gray-600">Expert Contributors</span>
                      <span className="text-blue-600 font-medium hover:scale-110 transition-transform duration-300">2,341</span>
                    </div>
                    <div className="flex justify-between items-center hover:bg-purple-50 p-2 rounded transition-colors duration-300">
                      <span className="text-gray-600">Answered Questions</span>
                      <span className="text-purple-600 font-medium hover:scale-110 transition-transform duration-300">89.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-2 hover:border-yellow-300 animate-fade-in" style={{animationDelay: '0.6s'}}>
                <CardHeader>
                  <CardTitle className="text-yellow-600">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Market Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-purple-50 hover:border-purple-400 hover:text-purple-600 transform hover:scale-105 transition-all duration-300">
                    <Users className="w-4 h-4 mr-2" />
                    Join Expert Panel
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-green-50 hover:border-green-400 hover:text-green-600 transform hover:scale-105 transition-all duration-300">
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
