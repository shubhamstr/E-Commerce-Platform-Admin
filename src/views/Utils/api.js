// services/api.ts
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds

    if (decoded.exp < currentTime) {
      // Token expired → logout
      localStorage.removeItem('ecomAdminToken');
      window.location.href = '/ecom/login';
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
