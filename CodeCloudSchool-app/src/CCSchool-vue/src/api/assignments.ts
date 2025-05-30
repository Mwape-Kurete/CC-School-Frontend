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
    },

    async getAssignmentById(assignmentId: number): Promise<Assignment | string> {
        try {
            const response = await api.get(`/assignments/${assignmentId}`);
            return response.data; // should return an assignment object
        } catch (error: any) {
            console.error('Full error object:', error);
            if(error.response && error.response.data) {
                return error.response.data; // e.g. "Assignment not found"
            }
            return 'An unknown error occurred';
        }
    },


    formatAssignmentDate(isoDate: string): string {
        const date = new Date(isoDate);

        const day = date.getUTCDate();
        const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' }); // "July"
        const hours = date.getUTCHours().toString().padStart(2, '0'); // "23"
        const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // "59"

        return `${day} ${month} - ${hours}:${minutes}`;
    }
}
