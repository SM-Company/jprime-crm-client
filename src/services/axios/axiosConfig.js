import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: window.location.hostname.includes('localhost') ? 'http://127.0.0.1:8000/api' : 'https://js.markadai.com/api', 
  timeout: 5000,  
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
