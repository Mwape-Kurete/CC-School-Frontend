import axios from 'axios';

const api = axios.create({
  baseURL: (process.env as any).VITE_API_BASE_URL || 'https://cc-school-backend-1.onrender.com/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;