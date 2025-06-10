import api from "./api";

// Define interfaces matching your C# Classes model structure
export interface Student {
  id: number;
  fullName: string;
  // add other student fields you need
}

export interface Lecturer {
  id: number;
  fullName: string;

}

export interface Course {
  courseId: number;
  courseName: string;
}

export interface Class {
  classID: number;
  className: string;
  classDescription: string;
  courseId: number;
  courses?: Course;
  students: Student[];
  lecturers: Lecturer[];
  timeSlot : {
    day: number,
    endTime: string,
    startTime: string
  };
  moduleImg: any;
  Classroom: string;

}

export const ClassesService = {

  async getClasses():Promise<Class[]> {
    const response = await api.get(`classes/`);

    if(response.status !== 200) {
      throw new Error(`Failed to fetch classes : ${response.statusText}`);
    }

    console.log("Classes Retrieved: ", response)
    return response.data.$values || [];
  },

  async getClassesByStudentId(studentId: number): Promise<Class[]> {
    const response = await api.get(`classes/bystudent/${studentId}`);


    if (response.status !== 200) {
      throw new Error(`Failed to fetch classes for student ${studentId}: ${response.statusText}`);
    }

    console.log("Classes Retrieved: ", response)
    return response.data.$values || [];
  },


}

export const AdminClassesService = {
  getClasses: () => api.get('/classes').then(res => res.data),
  createClass: (data: any) => api.post('/classes', data).then(res => res.data),
  addStudentToClass: (classId: number, studentId: number) =>
    api.post(`/classes/addStudentToClass/${classId}/${studentId}`),
  addLecturerToClass: (classId: number, lecturerId: number) =>
    api.post(`/classes/addLecturerToClass/${classId}/${lecturerId}`),
};

export type CreateClass = {
  classID: number;
  className: string;
  classDescription: string;
  classroom: string;
  courseId: number;
  courses?: any;
  timeSlot?: any;
};
