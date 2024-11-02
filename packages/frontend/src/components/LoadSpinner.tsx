// frontend/src/components/LoadSpinner.tsx

import React, { useEffect, useState } from 'react';

const LoadSpinner: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const messages = [
      "Crunching the numbers...",
      "Fetching your insights...",
      "Analyzing your data...",
      "Just a moment...",
      "Loading financial forecasts...",
    ];
    let index = 0;

    const interval = setInterval(() => {
      if (index < messages.length) {
        setMessage(messages[index]);
        index += 1;
      } else {
        clearInterval(interval);
      }
    }, 1000); // Change message every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Loading...</h1>
      <p>{message}</p>
    </div>
  );
};

export default LoadSpinner;
