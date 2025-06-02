import api from './api';

interface Assignment {
    id?: number;
    title: string;
    description: string;
    dueDate: string | Date;
    courseId: number;
    submissionFormat?: string;
    maxAttempts?: number | null;
    status?: 'upcoming' | 'past' | 'unpublished';
}

export const AssignmentService = {
    async getAssignmentsByCourseId(courseId: number): Promise<Assignment[] | string> {
        try {
            const response = await api.get(`/courses/${courseId}/assignments`);
            return response.data.map((assignment: any) => ({
                id: assignment.id,
                title: assignment.title,
                description: assignment.description,
                dueDate: assignment.dueDate,
                status: this.getAssignmentStatus(assignment.dueDate),
                submissionFormat: assignment.submissionFormat,
                maxAttempts: assignment.maxAttempts
            }));
        } catch (error: any) {
            console.error('Error fetching assignments:', error);
            if (error.response?.data) {
                return error.response.data;
            }
            return 'Failed to fetch assignments';
        }
    },

    async createAssignment(assignment: Assignment): Promise<Assignment | string> {
        try {
            const response = await api.post('/assignments', assignment);
            return response.data;
        } catch (error: any) {
            console.error('Error creating assignment:', error);
            if (error.response?.data) {
                return error.response.data;
            }
            return 'Failed to create assignment';
        }
    },

    async publishAssignment(assignmentId: number): Promise<boolean | string> {
        try {
            await api.patch(`/assignments/${assignmentId}/publish`);
            return true;
        } catch (error: any) {
            console.error('Error publishing assignment:', error);
            if (error.response?.data) {
                return error.response.data;
            }
            return 'Failed to publish assignment';
        }
    },

    getAssignmentStatus(dueDate: string): 'upcoming' | 'past' {
        const today = new Date();
        const due = new Date(dueDate);
        return due > today ? 'upcoming' : 'past';
    },

    formatAssignmentDate(isoDate: string): string {
        const date = new Date(isoDate);
        const day = date.getUTCDate();
        const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${day} ${month} - ${hours}:${minutes}`;
    }
};