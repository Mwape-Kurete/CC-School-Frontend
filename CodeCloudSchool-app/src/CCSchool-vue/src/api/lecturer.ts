import api from './api'

// Represents the structure of a lecturer returned by the backend
export interface Lecturer {
  lecturerId: number
  name: string
  lectName: string
  lecLastName: string
  lastName: string
  lecEmail: string
  phoneNumber?: string // Optional field
  userId: number
}

export const lecturerService = {

  async getAllLecturers(): Promise<Lecturer [] | string> {
    try {
      const response = await api.get('/lecturerreg');
      console.log('Lecturers Fetched: ', response.data);
      return response.data.$values;
    } catch (error: any) {
      console.error('Error fetching lecturer:', error)
      if (error.response && error.response.data) {
        return error.response.data // e.g. "Lecturer not found"
      }
      return 'An unknown error occurred'
    }
  },

  async getLecturerByID(lecturerId: number): Promise<Lecturer | string> {
    try {
      const response = await api.get(`/lecturerreg/${lecturerId}`)
      console.log('Lecturer response:', response.data)
      return response.data // Should return a Lecturer object
    } catch (error: any) {
      console.error('Error fetching lecturer:', error)
      if (error.response && error.response.data) {
        return error.response.data // e.g. "Lecturer not found"
      }
      return 'An unknown error occurred'
    }
  },
}
