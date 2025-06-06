import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://cc-school-backend.onrender.com/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;