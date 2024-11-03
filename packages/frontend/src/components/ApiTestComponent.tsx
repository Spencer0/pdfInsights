// src/components/APITestPage.tsx
import React, { useState } from 'react';
import { testApiCall } from '../services/api/apiService';

const APITestPage: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleApiTest = async () => {
    try {
      const data = await testApiCall();
      setResponse(JSON.stringify(data, null, 2)); // Format the JSON for display
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to fetch data. Check console for details.');
      setResponse(null); // Clear previous response
    }
  };

  return (
    <div>
      <button onClick={handleApiTest}>Test API</button>
      {response && <pre>{response}</pre>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default APITestPage;
