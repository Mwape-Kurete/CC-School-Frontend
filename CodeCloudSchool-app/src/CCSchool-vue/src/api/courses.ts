import api from './api';

export interface Course{
    id: number,
    courseName: string,
    courseCode: number,
    courseDescription: string,
}

//updated interface to handle 404 errors
export interface CourseDetails {
  courseFullCode: string;
  courseAbout: string;
  courseSlides: string;
  courseWeekBreakdown: Array<{
    header?: string;
    description?: string;
  }>;
  courseMarkBreakdown: Array<{
    title?: string;
    mark?: string;
    items?: Array<{
      description?: string;
      mark?: string;
    }>;
  }>;
  courseSemDescriptions: Array<{
    description?: string;
  }>;
} //The nullified fields are there to match what my backeend service expects


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
  async updateCourseDetails(courseId: number, courseUpdateData: any): Promise<any> {
    try {
      // Transform data to match backend DTO structure
      const payload = {
        courseFullCode: courseUpdateData.courseFullCode || '',
        courseAbout: courseUpdateData.courseAbout || '',
        courseSlides: courseUpdateData.courseSlides || '',
        courseWeekBreakdown: courseUpdateData.courseWeekBreakdown || [],
        courseMarkBreakdown: (courseUpdateData.courseMarkBreakdown || []).map((section: any) => ({
          title: section.title,
          mark: section.mark,
          items: section.items || []
        })),
        courseSemDescriptions: courseUpdateData.courseSemDescriptions?.$values || []
      }; //this is an attempt to fix the 404: bad request issues the lecturer update course details was giving

      const response = await api.patch(
        `/Courses/courses/${courseId}/descript-details`,
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
        console.error('API Error:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
        throw new Error(
          error.response.data?.title ||
          `Update failed with status ${error.response.status}`
        );
      }
      throw new Error(error.message || 'Network error during update');
    }
  },

  async partialUpdateCourseDetails(courseId: number, courseUpdateData: any): Promise<any> {
  try {
    const partialPayload: any = {}

    if (courseUpdateData.courseFullCode !== undefined) {
      partialPayload.courseFullCode = courseUpdateData.courseFullCode
    }
    if (courseUpdateData.courseAbout !== undefined) {
      partialPayload.courseAbout = courseUpdateData.courseAbout
    }
    if (courseUpdateData.courseSlides !== undefined) {
      partialPayload.courseSlides = courseUpdateData.courseSlides
    }
    if (courseUpdateData.courseWeekBreakdown !== undefined) {
      partialPayload.courseWeekBreakdown = courseUpdateData.courseWeekBreakdown
    }
    if (courseUpdateData.courseMarkBreakdown !== undefined) {
      partialPayload.courseMarkBreakdown = courseUpdateData.courseMarkBreakdown.map((section: any) => ({
        title: section.title,
        mark: section.mark,
        items: section.items || []
      }))
    }
    if (courseUpdateData.courseSemDescriptions !== undefined) {
      partialPayload.courseSemDescriptions =
        courseUpdateData.courseSemDescriptions.$values || courseUpdateData.courseSemDescriptions
    }

    const response = await api.patch(`/Courses/courses/${courseId}/descript-details/patch`, partialPayload)
    return response.data

  } catch (error: any) {
    if (error.response) {
      console.error('API Error:', error.response.data)
      throw new Error(
        error.response.data?.message ||
        'Failed to partially update course details'
      )
    }
    throw new Error('Network error occurred while updating course details')
  }
},

  async addCourseDetails(courseId: number, courseSendData: any): Promise<any> {
    try {
      // Similar transformation for POST
      const payload = {
        courseFullCode: courseSendData.courseFullCode || '',
        courseAbout: courseSendData.courseAbout || '',
        courseSlides: courseSendData.courseSlides || '',
        courseWeekBreakdown: courseSendData.courseWeekBreakdown || [],
        courseMarkBreakdown: (courseSendData.courseMarkBreakdown || []).map((section: any) => ({
          title: section.title,
          mark: section.mark,
          items: section.items || []
        })),
        courseSemDescriptions: courseSendData.courseSemDescriptions || []
      };

      const response = await api.post(
        `/Courses/courses/${courseId}/add-descript-details`,
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
        console.error('API Error:', error.response.data);
        throw new Error(
          error.response.data?.message ||
          'Failed to add course details'
        );
      }
      throw new Error('Network error occurred while adding course details'); //better exception handeling -> this is for debugging
    }
  }
}
