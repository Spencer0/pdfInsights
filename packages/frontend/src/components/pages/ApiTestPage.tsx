import React, { useState, useEffect } from 'react';
import { testApiCall } from '../../services/api/apiService';

interface Bubble {
  id: number;
  text: string;
  x: number;
  y: number;
  isSuccess: boolean;
}

const APITestPage: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [showCounter, setShowCounter] = useState(false);

  // Clean up bubbles after animation
  useEffect(() => {
    const timer = setInterval(() => {
      setBubbles(prev => prev.filter(bubble => Date.now() - bubble.id < 3000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const createBubble = (text: string, isSuccess: boolean) => {
    const x = Math.random() * (window.innerWidth - 200); // Avoid edges
    const y = Math.random() * (window.innerHeight - 200);
    
    const newBubble: Bubble = {
      id: Date.now(),
      text,
      x,
      y,
      isSuccess
    };

    setBubbles(prev => [...prev, newBubble]);
  };

  const handleApiTest = async () => {
    if (!showCounter) setShowCounter(true);
    
    try {
      const data = await testApiCall();
      setSuccessCount(prev => prev + 1);
      createBubble(JSON.stringify(data, null, 2), true);
    } catch (err) {
      setFailCount(prev => prev + 1);
      createBubble('API Call Failed!', false);
    }
  };

  return (
    <main className="flex-grow mt-24 mb-24 relative overflow-hidden">
      {/* Floating Bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className={`absolute p-4 rounded-lg shadow-lg animate-float
            ${bubble.isSuccess ? 'bg-green-100' : 'bg-red-100'}
          `}
          style={{
            left: bubble.x,
            top: bubble.y,
            maxWidth: '300px',
            animation: 'float 3s ease-out forwards',
          }}
        >
          <pre className="text-sm overflow-auto">{bubble.text}</pre>
        </div>
      ))}

      {/* Counter Section */}
      {showCounter && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
          <div className="text-green-500">Success: {successCount}</div>
          <div className="text-red-500">Fail: {failCount}</div>
        </div>
      )}

      {/* Main Content */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <button 
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-700 transform hover:scale-105 transition-transform"
              onClick={handleApiTest}
            >
              Test API
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default APITestPage;