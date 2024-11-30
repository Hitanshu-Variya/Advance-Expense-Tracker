import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000, // 15 seconds
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      // Handle timeout error
      return Promise.reject(new Error('Request timed out. Please try again.'));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 