import { User } from 'lucide-vue-next';
import api from './api';

interface LoginData {
  email: string;
  password: string;
  role: 'admin' | 'lecturer' | 'student' | 'lecturerreg'; // 'lecturerreg' for lecturer registration
}


interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'lecturer' | 'admin' | 'lecturerreg'; // 'lecturerreg' for lecturer registration
  studentNumber?: string; // only present for students
  lecturerId?: string; // only present for lecturers
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

interface LectAnnouncement {
  id: string;
  title: string;
  description: string;
  date:string;
  lectureId: string;
}

interface LecturerSignUp{
  id: string;
  name: string;
  email:string;
  password: string;
  department:string;
  phoneNumber: string;
  address:string;
}

interface AdminSignUp {
  id: number;
  Name : string;
  LastName: string;
  Password: string;
  PhoneNumber: string;
  AdminRole: string;
  AssignedDepartments : string;
  PrivateEmail: String;
}


export const AuthService = {
  async login({ email, password, role }: LoginData): Promise< User | string> {
    try {
      if(role === 'lecturer'){
        role = 'lecturerreg'; // Adjust role for lecturer registration
      }
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
      return response.data; // now returns a string stating "Verification email sent" 
    } catch (error: any) {
      console.error('Full error object:', error);
      if (error.response && error.response.data) {
        return error.response.data; // e.g. "Email already exists"
      }
      return 'An unknown error occurred';
    }
  },

  async getLecturerAnnouncements (AnnounceData: LectAnnouncement) : Promise<LectAnnouncement [] | string >{
    try {
      const response = await api.get('/lecturer/announcements', {params:AnnounceData});
      console.log('Announcements fetched successfully:', response);
      return response.data;
    }catch(error:any){
      console.error('error fetching announcements:',error);
      if (error.response && error.response.data){
        return error.response.data
      }
      return "An unkown error occured"
    }
  },

  async verifyEmail(token: string, role: string): Promise<string | any> {
    try {
      const response = await api.post(`/${role}/verify-email`, { token });
      console.log('Email verification response:', response);
      return response; //  "Email verified successfully"
    } catch (error: any) {
      console.error('Full error object:', error);
      if (error.response && error.response.data) {
        return error.response.data; // e.g. "Invalid or expired token"
      }
      return 'An unknown error occurred';
    }
  }


};

export const LectAuthService = {

   async signUpLecturer(lectureData: LecturerSignUp)  : Promise<User | string >{
    try{
      const response = await api.post('/lecturerreg/register', lectureData);
      console.log('Sign up Successful', response.data);
      return response.data; // now returns a string stating "Verification email sent"
    }catch(error:any){
      console.log('Full error object:', error);
      if(error.response && error.response.data){
        return error.response.data;
      }
      return 'An unknown error occurred';
    }
  },


};


export const AdminAuthService = {
  async signUpAdmin(adminData: AdminSignUp): Promise<User | string>{
    try{
      const response = await api.post('/admin/register', adminData);
      console.log('Sign up Successful', response);
      return response.data;
    } catch(error:any){
      console.log('Full error object:', error);
      console.log('Validation errors:', error.response.data.errors);
      if(error.response && error.response.data){
        return error.response.data;
      }
      return 'An unknown error occurred';
    }
  },
}
