import api from './api';

export interface major{
    id: number
    majorName: string;
    majorCode: string;
    majorDescription: string;
    creditsRequired: number;
}

export const MajorServices = {
    async fetchMajors (): Promise<major[] | string> {
        try {
            const response = await api.get('/majors');
            console.log('Majors fetched:', response);
            return response.data; // e.g. array of majors
        } catch (error: any) {
            console.error('Full error object:', error);
            if (error.response && error.response.data) {
                return error.response.data;
            }
            return 'An unknown error occurred';
        }
    }
}
