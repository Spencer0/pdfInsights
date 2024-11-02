import React, { useState } from 'react';
import FinancialPlanner from './components/FinancialPlanner';
import LoadSpinner from './components/LoadSpinner';
import InsightsDashboard from './components/InsightsDashboard';

function App() {
  const [page, setPage] = useState('financialPlanner');

  const handlePDFUpload = () => {
    setPage('loadSpinner');
    setTimeout(() => {
      setPage('insightsDashboard');
    }, 3000); // Simulate loading for 3 seconds
  };

  const renderPage = () => {
    switch (page) {
      case 'financialPlanner':
        return <FinancialPlanner onPDFUpload={handlePDFUpload} />;
      case 'loadSpinner':
        return <LoadSpinner />;
      case 'insightsDashboard':
        return <InsightsDashboard />;
      default:
        return <FinancialPlanner onPDFUpload={handlePDFUpload} />;
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;
