import React from 'react';

interface FinancialPlannerProps {
  onPDFUpload: () => void;
}

const FinancialPlanner: React.FC<FinancialPlannerProps> = ({ onPDFUpload }) => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Implement PDF validation logic here if needed
    onPDFUpload();
  };

  return (
    <div>
      <h1>Financial Planner</h1>
      <input type="file" accept="application/pdf" onChange={handleUpload} />
    </div>
  );
};

export default FinancialPlanner;
