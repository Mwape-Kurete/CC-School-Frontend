import { User } from 'lucide-vue-next';
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

interface StudentSignUp {
  name: string;
  lastName: string;
  password: string;
  gender: string;
  address: string;
  phoneNumber: string;
  enrollmentDate: string;
  yearLevel: string;
}


export const AuthService = {
  async login({ email, password, role }: LoginData): Promise< User | string> {
    try {
      const response = await api.post(`/${role}/login`, { email, password });
      console.log('Login response:', response);
      return response.data; // e.g. User data , "Login successful"
    } catch (error: any) {
        console.error('Full error object:', error); 
        if (error.response && error.response.data) {
            return error.response.data;
        }
    return 'An unknown error occurred';
    }

  },

  async signUpStudent(StudentSignUp: StudentSignUp): Promise<User | string>{
    try {
      const response = await api.post('/student/register', StudentSignUp);
      console.log('Sign Up response:', response);
      return response.data; // should return a Student
    } catch (error: any) {
      console.error('Full error object:', error);
      if (error.response && error.response.data) {
        return error.response.data; // e.g. "Email already exists"
      }
      return 'An unknown error occurred';
    }
  }


};
