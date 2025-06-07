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
  
}

export class ClassesService {

  async getClassesByStudentId(studentId: number): Promise<Class[]> {
    const response = await api.get(`classes/bystudent/${studentId}`);


    if (response.status !== 200) {
      throw new Error(`Failed to fetch classes for student ${studentId}: ${response.statusText}`);
    }

    const classes: Class[] = response.data;
    return classes;
  }
}
