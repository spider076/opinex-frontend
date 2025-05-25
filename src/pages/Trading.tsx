
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown } from 'lucide-react';

const Trading = () => {
  const watchlist = [
    { symbol: 'BTC/USD', price: '$65,432.10', change: '+2.34%', volume: '$2.1B', trending: 'up' },
    { symbol: 'ETH/USD', price: '$3,245.67', change: '+1.89%', volume: '$1.8B', trending: 'up' },
    { symbol: 'AAPL', price: '$178.92', change: '-0.45%', volume: '$45.2M', trending: 'down' },
    { symbol: 'TSLA', price: '$245.30', change: '+3.21%', volume: '$38.7M', trending: 'up' },
    { symbol: 'GOOGL', price: '$2,789.15', change: '+0.78%', volume: '$28.3M', trending: 'up' },
  ];

  const recentTrades = [
    { symbol: 'BTC/USD', type: 'BUY', amount: '0.5', price: '$65,200', time: '14:32:15' },
    { symbol: 'ETH/USD', type: 'SELL', amount: '2.0', price: '$3,240', time: '14:28:42' },
    { symbol: 'AAPL', type: 'BUY', amount: '100', price: '$179.50', time: '14:15:23' },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Trading Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor markets and execute trades</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trading Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Chart Placeholder */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">BTC/USD Chart</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">1H</Button>
                    <Button variant="outline" size="sm">4H</Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">1D</Button>
                    <Button variant="outline" size="sm">1W</Button>
                  </div>
                </div>
                <div className="h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive Trading Chart</p>
                    <p className="text-sm text-gray-500 mt-2">Real-time market data visualization</p>
                  </div>
                </div>
              </Card>

              {/* Watchlist */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Market Watchlist</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-medium text-gray-700">Symbol</th>
                        <th className="text-right py-2 font-medium text-gray-700">Price</th>
                        <th className="text-right py-2 font-medium text-gray-700">Change</th>
                        <th className="text-right py-2 font-medium text-gray-700">Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchlist.map((item) => (
                        <tr key={item.symbol} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                          <td className="py-3 font-medium">{item.symbol}</td>
                          <td className="text-right py-3">{item.price}</td>
                          <td className={`text-right py-3 flex items-center justify-end space-x-1 ${
                            item.trending === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.trending === 'up' ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <span>{item.change}</span>
                          </td>
                          <td className="text-right py-3 text-gray-600">{item.volume}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Form */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Place Order</h2>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">BUY</Button>
                    <Button variant="outline" className="flex-1">SELL</Button>
                  </div>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btc">BTC/USD</SelectItem>
                      <SelectItem value="eth">ETH/USD</SelectItem>
                      <SelectItem value="aapl">AAPL</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Amount</label>
                    <Input type="number" placeholder="0.00" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Price</label>
                    <Input type="number" placeholder="Market Price" />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Place Buy Order
                  </Button>
                </div>
              </Card>

              {/* Portfolio Summary */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Balance</span>
                    <span className="font-semibold text-lg">$125,432.10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available</span>
                    <span className="text-green-600">$45,230.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">In Orders</span>
                    <span className="text-orange-600">$15,201.60</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">P&L Today</span>
                    <span className="text-green-600">+$2,345.80</span>
                  </div>
                </div>
              </Card>

              {/* Recent Trades */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Trades</h2>
                <div className="space-y-3">
                  {recentTrades.map((trade, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{trade.symbol}</div>
                        <div className="text-sm text-gray-600">{trade.time}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${trade.type === 'BUY' ? 'text-green-600' : 'text-red-600'}`}>
                          {trade.type} {trade.amount}
                        </div>
                        <div className="text-sm text-gray-600">{trade.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Trading;
