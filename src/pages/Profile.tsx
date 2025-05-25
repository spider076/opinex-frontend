
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Settings } from 'lucide-react';

const Profile = () => {
  const accountStats = [
    { label: 'Total Trades', value: '1,247', change: '+12%' },
    { label: 'Win Rate', value: '73.2%', change: '+2.1%' },
    { label: 'Total P&L', value: '$45,230', change: '+18.5%' },
    { label: 'Best Month', value: '$12,400', change: 'March 2024' },
  ];

  const tradingHistory = [
    { date: '2024-03-15', symbol: 'BTC/USD', type: 'BUY', amount: '0.5', pnl: '+$1,234', status: 'Closed' },
    { date: '2024-03-14', symbol: 'ETH/USD', type: 'SELL', amount: '2.0', pnl: '+$856', status: 'Closed' },
    { date: '2024-03-14', symbol: 'AAPL', type: 'BUY', amount: '100', pnl: '-$245', status: 'Closed' },
    { date: '2024-03-13', symbol: 'TSLA', type: 'BUY', amount: '50', pnl: '+$2,100', status: 'Closed' },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
            <p className="text-gray-600 mt-2">Manage your account and view trading performance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">John Doe</h2>
                  <p className="text-gray-600">john.doe@email.com</p>
                  <Badge variant="secondary" className="mt-2">Pro Trader</Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium">Jan 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Type</span>
                    <span className="font-medium">Premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verification</span>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Card>

              {/* Account Stats */}
              <Card className="p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Trading Stats</h3>
                <div className="space-y-4">
                  {accountStats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-600">{stat.label}</span>
                      <div className="text-right">
                        <div className="font-semibold">{stat.value}</div>
                        <div className="text-sm text-green-600">{stat.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account Settings */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <Input defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <Input defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input defaultValue="john.doe@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <Input defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <div className="flex space-x-4 mt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </Card>

              {/* Trading History */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Trading History</h2>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-medium text-gray-700">Date</th>
                        <th className="text-left py-2 font-medium text-gray-700">Symbol</th>
                        <th className="text-left py-2 font-medium text-gray-700">Type</th>
                        <th className="text-right py-2 font-medium text-gray-700">Amount</th>
                        <th className="text-right py-2 font-medium text-gray-700">P&L</th>
                        <th className="text-right py-2 font-medium text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tradingHistory.map((trade, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3">{trade.date}</td>
                          <td className="py-3 font-medium">{trade.symbol}</td>
                          <td className="py-3">
                            <Badge variant={trade.type === 'BUY' ? 'default' : 'secondary'}>
                              {trade.type}
                            </Badge>
                          </td>
                          <td className="text-right py-3">{trade.amount}</td>
                          <td className={`text-right py-3 font-medium ${
                            trade.pnl.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {trade.pnl}
                          </td>
                          <td className="text-right py-3">
                            <Badge variant="outline">{trade.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
