import api from './api';



interface User {
  userId: number;
  name: string;
  email: string;
  lastName: string;
  status: string;
  phoneNumber: string;
  studentNumber: string;
  yearLevel: string;
  role: string;
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
  },

  async updateStatus(studentNumber: string, dto: { status: string }) {
    const res = await api.put(`/student/${studentNumber}/status`, dto);
    return res.data;
  },

  async reEnroll(studentNumber: string, dto: { yearLevel: string }) {
    const res = await api.put(`/student/${studentNumber}/enroll`, dto);
    return res.data;
  },

  async updatePassword(studentNumber: string, dto: { oldPassword: string, newPassword: string }) {
    const res = await api.put(`/student/${studentNumber}/updatePassword`, dto);
    return res.data;
  }
};

