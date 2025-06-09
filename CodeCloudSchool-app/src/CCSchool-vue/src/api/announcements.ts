import api from './api'

export interface Announcement {
  id: string
  title: string
  body: string
  date: string
  lecturerId: number
  createdAt: string
  moduleImg?: string
}

export const AnnouncementService = {
  async getAnnouncementsByCourseId(courseId: number): Promise<Announcement[] | string> {
    try {
      const response = await api.get(`/announce/by-course/${courseId}`)
      console.log('Announcement Data Fetched: ', response.data.$values)
      return response.data.$values
    } catch (error: any) {
      console.error('Error fetching announcements:', error)
      return error.response?.data || 'Failed to fetch announcements'
    }
  },

  async getAnnouncementById(id: string): Promise<Announcement | string> {
    try {
      const response = await api.get(`/announce/${id}`)

      return response.data
    } catch (error: any) {
      console.error('Error fetching announcement by ID:', error)
      return error.response?.data || 'Failed to fetch announcement'
    }
  },

  async postAnnouncement(
    courseId: number,
    announcement: Announcement,
  ): Promise<Announcement | string> {
    try {
      const response = await api.post(`/announce/course/${courseId}`, announcement)
      return response.data
    } catch (error: any) {
      console.error('Error posting announcement:', error)
      return error.response?.data || 'An unknown error occurred'
    }
  },

  async getAnnouncementsByLecturerId(lecturerId: number): Promise<Announcement[] | string> {
    try {
      const response = await api.get(`/announce/lecturer/${lecturerId}`)

      return response.data
    } catch (error: any) {
      console.error('Error fetching announcements by lecturer ID:', error)
      return error.response?.data || 'Failed to fetch announcements by lecturer'
    }
  },

  //MWAPE CHANGES START
  async getAllAnnouncments(): Promise<Announcement[] | string> {
    try {
      const response = await api.get('/announce')
      return response.data
    } catch (error: any) {
      console.error('Error fetching all announcements:', error)
      return error.response?.data || 'Failed to fetch all announcements'
    }
  },
  //MWAPE CHANGES END

  formatAnnouncementDate(isoDate: string): string {
    const date = new Date(isoDate)
    const day = date.getUTCDate()
    const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' })
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')
    return `${day} ${month} - ${hours}:${minutes}`
  },
}
