import api from "./api";

export interface Modules {
    moduleId: number;
    groupTitle: string;
    title: string;
    description: string;
    slideUrl: string;
    courseId: number;
    additionalResources: string;

}

export const ModulesServices = {
    async fetchModulesByCourseID(courseId: number): Promise<Modules[] | string> {
        try{
            const response = await api.get(`/modules/by-course/${courseId}`);
            console.log("Modules Fetched: ", response.data);
            return response.data;
        } catch (error: any) {
      console.error('Error fetching announcement by ID:', error);
      return error.response?.data || 'Failed to fetch announcement';
    }
    }, 

    async fetchModuleById(moduleId: number): Promise<Modules | string>{
        try{
            const response = await api.get(`/modules/${moduleId}`);
            console.log("Module Fetched: ", response.data);
            return response.data;
        } catch (error: any){
            console.error('Error fetching announcement by ID:', error);
            return error.response?.data || 'Failed to fetch announcement';
        }
    }
}