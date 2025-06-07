import api from './api';

// Represents the structure of an announcement returned by the backend  
export interface Announcement {
  announcementId: number;
  title: string;
  description: string;
  date: string;
  lecturerId: number;
}  

export const AnnouncementService = {
    
  async getAnnouncementsByCourseId(courseId: number): Promise<Announcement[] | string> {
    try {
      const response = await api.get(`/api/announcements/course/${courseId}`);
      return response.data; // Expects backend to return Announcement[]
    } catch (error: any) {
      console.error('Error fetching announcements:', error);
      if (error.response?.data) {
        return error.response.data;
      }
      return 'Failed to fetch announcements';
    }
  },

  async getAnnouncementById(announcementId: number): Promise<Announcement | string> {
    try {
      // Changed from '/api/announcements/' to '/api/Announce/'
      const response = await api.get(`/announce/${announcementId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching announcement:', error);
      if (error.response?.data) {
        return error.response.data;
      }
      return 'Failed to fetch announcement';
    }
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
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${day} ${month} - ${hours}:${minutes}`;
  }
};
