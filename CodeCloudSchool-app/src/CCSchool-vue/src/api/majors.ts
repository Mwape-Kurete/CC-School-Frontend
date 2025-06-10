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
            return response.data.$values; // e.g. array of majors
        } catch (error: any) {
            console.error('Full error object:', error);
            if (error.response && error.response.data) {
                return error.response.data;
            }
            return 'An unknown error occurred';
        }
    }, 
    async fetchMajorsById (majorId: number): Promise<major | string> {
        try {
            const response = await api.get(`/majors/${majorId}`);
            console.log('Major fetched:', response);
            return response.data; // e.g. a single major object
        } catch (error: any) {
            console.error('Full error object:', error);
            if (error.response && error.response.data) {
                return error.response.data;
            }
            return 'An unknown error occurred';
        }
    },
    async addStudentToMajor (majorId: number, studentId: string): Promise<string> {
        try{
            const response = await api.post(`majors/addStudentToMajor/${majorId}/${studentId}`);
            console.log('Student added to major:', response);
            return 'Student added to major successfully';
        } catch (error: any) {
            console.error('Full error object:', error);
            if (error.response && error.response.data){
                return error.response.data; // e.g. "Student already enrolled in this major"
            }
            return 'An unknown error occurred';
        }
    }
}


export const StudentMajorServices = {
    // pass the userID of the student here as studentID
    async fetchStudentMajors (studentId: number): Promise<major[] | string> {
        try {
            const response = await api.get(`majors/getMajorsByStudentId/${studentId}`);
            console.log('Student majors fetched:', response.data);
            return response.data.$values; // e.g. array of majors for the student
        } catch (error: any) {
            console.error('Full error object:', error);
            if (error.response && error.response.data) {
                return error.response.data;
            }
            return 'An unknown error occurred';
        }
    }
}