import React, { useState } from 'react';
import { FaPlay, FaSpinner, FaFileUpload } from 'react-icons/fa';

const DemoPage = () => {
  const [demoState, setDemoState] = useState('initial'); // initial, uploading, processing, complete

  const playDemo = () => {
    setDemoState('uploading');
    
    // Simulate PDF upload
    setTimeout(() => {
      setDemoState('processing');
      
      // Simulate processing
      setTimeout(() => {
        setDemoState('complete');
      }, 2000);
    }, 2000);
  };

  const DemoViewport = () => {
    switch (demoState) {
      case 'initial':
        return (
          <div className="flex items-center justify-center h-full mt-5 bg-gray-100">
            <p className="text-gray-500">Click "Play Demo" to start</p>
          </div>
        );
      
      case 'uploading':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gray-100">
            <FaFileUpload className="text-4xl text-blue-500 animate-bounce mb-4" />
            <p className="text-gray-700">Uploading PDF...</p>
          </div>
        );
      
      case 'processing':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gray-100">
            <FaSpinner className="text-4xl text-blue-500 animate-spin mb-4" />
            <p className="text-gray-700">Processing document...</p>
          </div>
        );
      
      case 'complete':
        return (
          <div className="h-full bg-white p-6">
            <h2 className="text-2xl font-bold mb-4">Document Insights</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold">Key Points</h3>
                <ul className="list-disc list-inside mt-2">
                  <li>Important insight 1</li>
                  <li>Important insight 2</li>
                  <li>Important insight 3</li>
                </ul>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold">Summary</h3>
                <p className="mt-2">This is a mock summary of the document...</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="h-[60vh] w-full mt-20 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex h-full">
        {/* Left Panel */}
        <div className="w-1/4 bg-gray-50 p-6 border-r">
          <button
            onClick={playDemo}
            disabled={demoState !== 'initial'}
            className={`
              flex items-center justify-center
              w-full px-4 py-2 rounded-lg
              ${demoState === 'initial' 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
              transition-colors duration-200
            `}
          >
            <FaPlay className="mr-2" />
            Play Demo
          </button>
          
          {/* Demo progress indicators */}
          <div className="mt-8">
            <div className={`flex items-center mb-4 ${demoState !== 'initial' ? 'text-blue-500' : 'text-gray-400'}`}>
              <div className="w-4 h-4 rounded-full border-2 mr-2" />
              Upload PDF
            </div>
            <div className={`flex items-center mb-4 ${demoState === 'processing' || demoState === 'complete' ? 'text-blue-500' : 'text-gray-400'}`}>
              <div className="w-4 h-4 rounded-full border-2 mr-2" />
              Process Document
            </div>
            <div className={`flex items-center ${demoState === 'complete' ? 'text-blue-500' : 'text-gray-400'}`}>
              <div className="w-4 h-4 rounded-full border-2 mr-2" />
              View Insights
            </div>
          </div>
        </div>

        {/* Right Panel - Demo Viewport */}
        <div className="w-3/4">
          <DemoViewport />
        </div>
      </div>
    </div>
  );
};

export default DemoPage;