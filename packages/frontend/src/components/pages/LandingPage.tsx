// src/components/LandingPage.tsx
import React from 'react';
import Button from '../common/Button';

const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Background Decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(45% 45% at 50% 50%,#3B82F6_0%,transparent_100%)] opacity-10"></div>
          </div>

          {/* Content */}
          <div className="relative text-center max-w-3xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Spend Sage
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              Revolutionizing the way you review bank statements with intelligent analysis
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                to="/healthcheck"
                variant="primary"
                className="px-8 py-4 text-lg transform transition hover:scale-105"
              >
                Check Server Health
              </Button>

              <Button
                to="/demo"
                variant="secondary"
                className="px-8 py-4 text-lg transform transition hover:scale-105"
              >
                Try Free Demo
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="mt-12 text-sm text-gray-500">
              <p>Trusted by financial professionals worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300"
              >
                <div className="w-12 h-12 mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// Feature data
const features = [
  {
    icon: '📊',
    title: 'Smart Analysis',
    description: 'Advanced AI-powered analysis of your financial statements'
  },
  {
    icon: '⚡',
    title: 'Real-Time Processing',
    description: 'Instant insights and processing of your banking data'
  },
  {
    icon: '🔒',
    title: 'Bank-Level Security',
    description: 'Enterprise-grade security to protect your sensitive information'
  }
];

export default LandingPage;