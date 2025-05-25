
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const Hero = () => {
  const marketData = [
    { symbol: 'BTC/USD', price: '$65,432.10', change: '+2.34%', trending: 'up' },
    { symbol: 'ETH/USD', price: '$3,245.67', change: '+1.89%', trending: 'up' },
    { symbol: 'AAPL', price: '$178.92', change: '-0.45%', trending: 'down' },
    { symbol: 'TSLA', price: '$245.30', change: '+3.21%', trending: 'up' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-fade-in">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-bounce"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-400/20 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight hover:scale-105 transition-transform duration-300">
                Trade Smarter with{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                  OpniNex
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg hover:text-gray-800 transition-colors duration-300">
                Experience the future of trading with our advanced platform. 
                Real-time analytics, lightning-fast execution, and institutional-grade security.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Trading Now
              </Button>
              <Button size="lg" variant="outline" className="border-2 hover:border-blue-500 hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2 hover:scale-110 transition-transform duration-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>$2.5B+ Daily Volume</span>
              </div>
              <div className="flex items-center space-x-2 hover:scale-110 transition-transform duration-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <span>500K+ Active Traders</span>
              </div>
            </div>
          </div>

          {/* Market Data Cards */}
          <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300">Live Market Data</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {marketData.map((item, index) => (
                <Card key={item.symbol} className="p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border hover:border-blue-300" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">{item.symbol}</div>
                      <div className="text-lg font-bold hover:scale-110 transition-transform duration-300">{item.price}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {item.trending === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500 animate-bounce" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 animate-bounce" />
                      )}
                      <span className={`text-sm font-medium transition-all duration-300 hover:scale-110 ${
                        item.trending === 'up' ? 'text-green-500 hover:text-green-600' : 'text-red-500 hover:text-red-600'
                      }`}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
