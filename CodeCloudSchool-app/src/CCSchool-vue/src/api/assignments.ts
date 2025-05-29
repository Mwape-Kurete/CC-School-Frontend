import api from './api';

interface Assignment {
    title: string;
    description: string;
    dueDate: Date | string;
    courseId: number;
}

export const AssignmentService ={
    async getAssignmentsByCourseId(courseId: number) : Promise<Assignment[] | string> {
        try {
            const response = await api.get(`/courses/${courseId}`);
            console.log('Assignments response:', response.data.assignments.$values);
            return response.data.assignments.$values; // should return an array of assignments for the course
        } catch (error: any) {
            console.error('Full error object:', error);
            if (error.response && error.response.data) {
                return error.response.data; // e.g. "No courses found"
            }
            return 'An unknown error occurred';
        }
    }
}