import api from './api'

export interface Modules {
  moduleId: number
  groupTitle: string
  title: string
  description: string
  slideUrl: string
  courseId: number
  additionalResources: string
  published: boolean
}

export const ModulesServices = {
  async fetchModulesByCourseID(courseId: number): Promise<Modules[] | string> {
    try {
      const response = await api.get(`/modules/by-course/${courseId}`)
      console.log('Modules Fetched: ', response.data)
      return response.data
    } catch (error: any) {
      console.error('Error fetching announcement by ID:', error)
      return error.response?.data || 'Failed to fetch announcement'
    }
  },

  async fetchModuleById(moduleId: number): Promise<Modules | string> {
    try {
      const response = await api.get(`/modules/${moduleId}`)
      console.log('Module Fetched: ', response.data)
      return response.data
    } catch (error: any) {
      console.error('Error fetching announcement by ID:', error)
      return error.response?.data || 'Failed to fetch announcement'
    }
  },
}

export const LecturerModulesServices = {
  async createModule(courseId: number, module: Modules): Promise<Modules | string> {
    try {
      const response = await api.post(`/modules/course/${courseId}`, module)
      console.log('Module Created: ', response.data)
      return response.data
    } catch (error: any) {
      console.error('Error creating module:', error)
      return error.response?.data || 'Failed to create module'
    }
  },

  async publishModule(
    courseId: number,
    moduleId: number,
    published: boolean,
  ): Promise<Modules | any> {
    try {
      const response = await api.put(
        `modules/course/${courseId}/module/${moduleId}/publish`,
        published,
      )

      console.log('Module published successfully:', response.data)

      return response.data
    } catch (error: any) {
      console.error('Error publishing module:', error)
      return error.response?.data || 'Failed to create module'
    }
  },
}
