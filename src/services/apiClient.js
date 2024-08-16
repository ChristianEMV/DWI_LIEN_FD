import axios from 'axios';

const apiClient = axios.create();

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); 
    const rol = localStorage.getItem('userRole');
    if (token ) {
      config.headers.Authorization = `Bearer ${token}`;
    
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
