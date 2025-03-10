import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://gar-kind-wasp.ngrok-free.app/',  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': '1',
  },
  withCredentials: false
});


axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem('accessToken')
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Requesting:', config.baseURL + config.url);
        console.log('Headers:', config.headers);
      }
      
    } catch (error) {
      console.error('Error retrieving access token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
);
export default axiosInstance;
