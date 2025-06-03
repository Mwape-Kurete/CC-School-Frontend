import api from './api';

// Represents the structure of an announcement returned by the backend  
export interface Announcement {
  announcementId: number;
  title: string;
  description: string;
  date: string;
  lecturerId: number;
  courseId: number;
  courseName?: string;
}

export const AnnouncementService = {
  async getAnnouncementsByCourseId(courseId: number): Promise<Announcement[] | string> {
    try {
      const response = await api.get(`/api/Announce/course/${courseId}`);
      return response.data;
    } catch (error: any) {
      const errorMsg = this.handleError(error);
      console.error('API Error:', errorMsg, error.response?.config?.url);
      return errorMsg;
    }
  },

  async getAnnouncementById(announcementId: number): Promise<Announcement | string> {
    try {
       const response = await api.get(`/api/Announce/${announcementId}`);
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  },

  handleError(error: any): string {
    if (error.response?.status === 404) {
      return 'Announcement not found (404)';
    }
    return error.response?.data?.message || 'Failed to fetch data';
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
