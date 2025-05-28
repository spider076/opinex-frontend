
import Layout from '@/components/Layout';
import TrendingTopics from '@/components/TrendingTopics';
import PredictionMarkets from '@/components/PredictionMarkets';
import { useState } from 'react';

const Markets = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

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
              Prediction Markets
            </h1>
            <p className="text-gray-600 mt-2 hover:text-gray-800 transition-colors duration-300">
              Predict the future, win rewards. Join discussions and compete with others.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Trending Topics Sidebar */}
            <div className="lg:col-span-1">
              <TrendingTopics onTopicSelect={setSelectedTopic} selectedTopic={selectedTopic} />
            </div>

            {/* Main Markets Content */}
            <div className="lg:col-span-3">
              <PredictionMarkets selectedTopic={selectedTopic} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Markets;
