import axios from 'axios';
import { API_BASE_URL } from '../../config';

// Create an Axios instance with the base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log('API_BASE_URL:', API_BASE_URL);
console.log('Environment Variables:', {
    nodeEnv: process.env.NODE_ENV,
    apiUrlLocal: process.env.REACT_APP_API_URL_LOCAL,
    apiUrlProd: process.env.REACT_APP_API_URL_PRODUCTION
  });
// Optional: Interceptors for adding authorization tokens for AWS deployment
apiClient.interceptors.request.use(
  (config) => {
    // Add authorization token logic here if required
    // Example: config.headers.Authorization = `Bearer ${yourToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const testApiCall = async () => {
    console.log(apiClient)
    console.log("testing call")
    try {
      const response = await apiClient.get('/healthcheck');
      return response.data;
    } catch (error: any) {
      console.error('Health check failed:', error.message); // More specific error message
      throw new Error('Health check failed: ' + error.message); // Throw with context
    }
  };


