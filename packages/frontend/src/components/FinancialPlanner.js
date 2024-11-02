import React from 'react';

function FinancialPlanner({ onPDFUpload }) {
  const handleUpload = (event) => {
    // Implement PDF validation logic here if needed
    onPDFUpload();
  };

  return (
    <div>
      <h1>Financial Planner</h1>
      <input type="file" accept="application/pdf" onChange={handleUpload} />
    </div>
  );
}

export default FinancialPlanner;
