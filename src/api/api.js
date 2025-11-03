import axios from 'axios'
import { loadingHandler } from '../context/LoadingHandler'; 

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  baseURL:'http://localhost:5000/api'
  // baseURL:'https://e-learning-platform-backend-psi.vercel.app/api'
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    loadingHandler.start();
    return config;
  },
  (error) => {
    loadingHandler.stop();
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    loadingHandler.stop();
    return response;
  },
  (error) => {
    loadingHandler.stop();
    return Promise.reject(error);
  }
);


export default api


