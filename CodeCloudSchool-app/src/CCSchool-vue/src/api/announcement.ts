import api from './api';

export interface Announcement {
  title: string;
  description: string;
  date: Date | string;
}

export const AnnouncementService = {
  async getAnnouncementByCourseId(courseId: number): Promise<Announcement[] | string> {
    try {
      const response = await api.get(`/courses/${courseId}/announcements`);
      return response.data; // assumed to be an array of announcements
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return 'An unknown error occurred';
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
};