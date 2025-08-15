// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL, // central base URL
  headers: {
    'Content-Type': 'application/json'
  }
});
// console.log(import.meta.env.VITE_APP_SERVER_URL);

// Add token dynamically if needed
api.interceptors.request.use((config) => {
  // console.log(config);
  const token = localStorage.getItem('ecomAdminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
