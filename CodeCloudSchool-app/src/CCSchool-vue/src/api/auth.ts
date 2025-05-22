import api from './api';

interface LoginData {
  email: string;
  password: string;
  role: 'admin' | 'lecturer' | 'student';
}

interface User {
  id: string;
  name: string;
  email: string;
}

export const AuthService = {
  async login({ email, password, role }: LoginData): Promise< User | string> {
    try {
      const response = await api.post(`/${role}/login`, { email, password });
      console.log('Login response:', response);
      return response.data; // e.g. User data , "Login successful"
    } catch (error: any) {
        console.error('Full error object:', error); // Add this
        if (error.response && error.response.data) {
            return error.response.data;
        }
    return 'An unknown error occurred';
    }

  }
};
