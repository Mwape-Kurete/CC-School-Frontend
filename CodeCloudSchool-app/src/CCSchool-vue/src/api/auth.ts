import { User } from 'lucide-vue-next';
import api from './api';

interface LoginData {
  email: string;
  password: string;
  role: 'admin' | 'lecturer' | 'student';
}

// admin register required data
// {
//   "fName": "string",
//   "lName": "string",
//   "password": "string",
//   "phoneNumber": "string",
//   "adminRole": "string",
//   "department": "string"
// }

// student register required data
  // "name": "string",
  // "lastName": "string",
  // "phoneNumber": "string",
  // "password": "string",
  // "studentNumber": "string",
  // "email": "string",
  // "gender": "string",
  // "address": "string",
  // "enrollmentDate": "2025-05-28T11:05:32.681Z",
  // "yearLevel": "string",
  // "status": "string",

// lecturer register required data
// the route is POST api/LecturerReg
// "name": "string",
//   "lastName": "string",
//   "phoneNumber": "string",
//   "password": "string",
//   "role": "string",
//   "lecturerId": 0,
//   "lectName": "string",
//   "lecLastName": "string",
//   "lecEmail": "user@example.com",
//   "department": "string",
//   "dateOfJoining": "2025-05-28T11:06:38.222Z",
//   "isActive": true,


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
      return response.data; // should be success message
    } catch (error: any) {
      console.error('Full error object:', error);
      if (error.response && error.response.data) {
        return error.response.data; // e.g. "Email already exists"
      }
      return 'An unknown error occurred';
    }
  }


};
