import api from './api';


interface User {
  id: string;
  name: string;
  email: string;
  lastName: string;
}


export const StudentService = {
  async getStudentByStudentNumber(studentNumber: string): Promise<User | string> {
    try {
      const response = await api.get(`/student/${studentNumber}`);
      console.log('User Fetched:', response);
      return response.data; // Adjust if needed
    } catch (error: any) {
      console.error('Full error object:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return 'An unknown error occurred';
    }
  }
};

