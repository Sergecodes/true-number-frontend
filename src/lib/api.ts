import axios from 'axios';

const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// inject JWT from localStorage
api.interceptors.request.use((config) => {
   if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
         config.headers.Authorization = `Bearer ${token}`;
      }

      config.headers!['Content-Type'] = 'application/json';
   }
   return config;
});

export default api;
