
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
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Trade Smarter with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  OpniNex
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Experience the future of trading with our advanced platform. 
                Real-time analytics, lightning-fast execution, and institutional-grade security.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                Start Trading Now
              </Button>
              <Button size="lg" variant="outline" className="border-2">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>$2.5B+ Daily Volume</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>500K+ Active Traders</span>
              </div>
            </div>
          </div>

          {/* Market Data Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Market Data</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {marketData.map((item) => (
                <Card key={item.symbol} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{item.symbol}</div>
                      <div className="text-lg font-bold">{item.price}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {item.trending === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        item.trending === 'up' ? 'text-green-500' : 'text-red-500'
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
