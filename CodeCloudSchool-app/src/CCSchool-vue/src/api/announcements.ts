import api from './api';


// Represents the structure of an announcement returned by the backend  
export interface Announcement {
  announcementId: number;
  title: string;
  description: string;
  date: string; // ISO date string
  lecturerId: number;
}

export const AnnouncementService = {
  async getAnnouncementsByCourseId(courseId: number): Promise<Announcement[] | string> {
    try {
      const response = await api.get(`/announce/by-course/${courseId}`);
      console.log('Announcements response:', response.data);
      return response.data.$values ?? response.data; // Handle both array and object formats
    } catch (error: any) {
      const errorMsg = this.handleError(error);
      console.error('Error:', errorMsg, error);
      return errorMsg;
    }
  },

  async getAnnouncementById(announcementId: number): Promise<Announcement | string> {
    try {
      // Changed from '/api/announcements/' to '/api/Announce/'
      const response = await api.get(`/announce/${announcementId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching announcement:', error);
      return this.handleError(error);
    }
  },

  // Extract error handling to a reusable method
  handleError(error: any): string {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.response?.data) {
      return error.response.data;
    }
    return 'Failed to fetch data from server';
  },

  async postAnnouncement(courseId: number, announcement: Announcement): Promise<Announcement | string> {
    try {
      const response = await api.post(`/courses/${courseId}/announcements`, announcement);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return 'An unknown error occurred';
    }
  },

  formatAnnouncementDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};