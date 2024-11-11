import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // JM's
  // baseURL: 'http://192.168.1.13:8000/',  DAN's
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
