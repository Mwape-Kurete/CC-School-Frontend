import api from './api';


// Represents the structure of an announcement returned by the backend  
interface Announcement {
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
      const response = await api.get(`/Announce/course/${courseId}`);
      return response.data;
    } catch (error: any) {
      const errorMsg = this.handleError(error);
      console.error('API Error:', errorMsg, error.response?.config?.url);
      return errorMsg;
    }
  },

  async getAnnouncementById(announcementId: number): Promise<Announcement | string> {
    try {
      const response = await api.get(`/Announce/${announcementId}`);
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