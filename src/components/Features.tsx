
import { Card } from '@/components/ui/card';
import { TrendingUp, Settings, User } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Real-time market data, technical indicators, and AI-powered insights to make informed trading decisions.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Settings,
      title: 'Lightning Fast Execution',
      description: 'Execute trades in milliseconds with our cutting-edge infrastructure and direct market access.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: User,
      title: 'Personalized Experience',
      description: 'Customize your dashboard, set alerts, and manage your portfolio with our intuitive interface.',
      gradient: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose OpniNex?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with user-friendly design 
            to deliver the ultimate trading experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
