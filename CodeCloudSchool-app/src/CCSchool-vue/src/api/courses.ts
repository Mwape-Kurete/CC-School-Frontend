import api from './api';

export interface Course{
    id: number,
    courseName: string,
    courseCode: number,
    courseDescription: string,
}

export interface CourseDetails {
  courseFullCode: string,
  courseAbout: string,
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

    async getCourseDetails(courseId: number): Promise<CourseDetails | string> {
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
  async updateCourseDetails(courseId: number, courseUpdateData: CourseDetails): Promise<CourseDetails> {
    try {
      // Transform data to match API expectations
      const payload = {
        $id: "1", // Add required metadata property
        updatedDetails: { // Add required field
          courseFullCode: courseUpdateData.courseFullCode,
          courseAbout: courseUpdateData.courseAbout,
          courseSlides: courseUpdateData.courseSlides,
          courseWeekBreakdown: {
            $id: "2", // Metadata property before $values
            $values: courseUpdateData.courseWeekBreakdown || []
          },
          courseMarkBreakdown: {
            $id: "3",
            $values: courseUpdateData.courseMarkBreakdown || []
          },
          courseSemDescriptions: {
            $id: "4",
            $values: courseUpdateData.courseSemDescriptions || []
          }
        }
      };

      const response = await api.patch(
        `api/Courses/courses/${courseId}/descript-details`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      return response.data;

    } catch (error: any) {
      if (error.response) {
        console.error('Full error response:', error.response);
        throw new Error(
          error.response.data?.title ||
          `Update failed with status ${error.response.status}`
        );
      }
      throw new Error(error.message || 'Network error during update');
    }
  },

  async addCourseDetails(courseId: number, courseSendData: CourseDetails): Promise<CourseDetails> {
    try {
      const response = await api.post(
        `Courses/courses/${courseId}/add-descript-details`, // Consistent path format
        courseSendData,
        {
          headers: {
            '/Content-Type': 'application/json'
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.message
          || error.response.data
          || 'Failed to add course details';
        throw new Error(`HTTP ${error.response.status}: ${errorMessage}`);
      }
      throw new Error('Network error occurred while adding course details');
    }
  }
}
