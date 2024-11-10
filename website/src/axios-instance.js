import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.13:8000', // Update this to match your Django API endpoint
  // baseURL: 'http://192.168.1.13:8000/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
