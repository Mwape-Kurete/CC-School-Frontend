import api from './api';

export interface Course{
    id: number,
    courseName: string,
    courseCode: number,
    courseDescription: string,
}

export interface CourseDetails {
  courseFullCode: string,
  courseWeekBreakdown: WeeklyBreakdown[], // pluralised to reflect array
  courseSlides: string,
  courseMarkBreakdown: MarkBreakdown,
  courseSemDescriptions: string[],
}

interface WeeklyBreakdown {
  header: string,
  description: string,
}

interface MarkBreakdown {
  title: string,
  mark: number,
  items: {
    description: string,
    mark: number,
  }[],
}


export const CourseService = {
    async getCourses() : Promise<Course[] | string> {
        try {
            const response = await api.get('/courses');
            return response.data; // should return an array of courses
        } catch (error: any) {
            console.error('Full error object:', error);
            if (error.response && error.response.data) {
                return error.response.data; // e.g. "No courses found"
            }
            return 'An unknown error occurred';
        }
    },

    async getCoursebyId(courseId: number): Promise<Course | string> {
        try {
            const response = await api.get(`/courses/${courseId}`);
            return response.data; // should return a course object
        } catch (error: any) {
            console.error('Full error object:', error);
            if (error.response && error.response.data) {
                return error.response.data; // e.g. "Course not found"
            }
            return 'An unknown error occurred';
        }
    },

    async getCourseDetails(courseId: string): Promise<CourseDetails | string> {
    try {
      const response = await api.get(`/Courses/courses/${courseId}/details-descript`);

      console.log("Course Details Response:", response.data);

      return response.data as CourseDetails;

    } catch (error: any) {
      console.error("Course Details Error:", error);
      if (error.response?.data) {
        return error.response.data;
      }
      return "An unknown error occurred";
    }
  }
}

export const StudentCourseService = {
    async getStudentCourses(studentId: string): Promise<Course[] | string> {
        try {
            const response = await api.get(`/student/${studentId}`);
            console.log('Student Courses response:', response.data.courses.$values);
            return response.data.courses.$values; // should return an array of courses for the student;
        } catch (error: any) {
            console.error('Full error object:', error);
            if (error.response && error.response.data) {
                return error.response.data; // e.g. "No courses found for this student"
            }
            return 'An unknown error occurred';
        }
    }
}

export const LecturerCourseService = {



}
