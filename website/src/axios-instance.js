import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Update this to match your Django API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
