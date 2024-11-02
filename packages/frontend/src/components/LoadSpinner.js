import React, { useEffect, useState } from 'react';
import { getLoadingMessages } from '../utils/loadingMessages';

function LoadSpinner() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const messages = getLoadingMessages();
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
}

export default LoadSpinner;
