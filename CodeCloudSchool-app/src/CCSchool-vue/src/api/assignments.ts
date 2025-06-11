import api from './api';

interface Assignment {
    Assignment_ID?: number;
    title: string;
    description: string;
    dueDate: string | Date;
    courseId: number;
    submissionFormat?: string;
    maxAttempts?: number | null;
    status?: 'upcoming' | 'past' | 'unpublished'; 
    createdAt?: string;
}

export const AssignmentService = {
    async getAssignmentsByCourseId(courseId: number): Promise<Assignment[] | string> {
        try {
            const response = await api.get(`/assignments/by-course/${courseId}`);
            console.log(response)
            return response.data.$values.map((a: any) => ({
                Assignment_ID: a.$id,
                title: a.title,
                description: a.description,
                dueDate: a.dueDate,
                status: this.getAssignmentStatus(a.dueDate),
                createdAt: a.createdAt
            }));
        } catch (error: any) {
            console.error('Error fetching assignments:', error);
            if (error.response?.data) {
                return error.response.data; 
            }
            return 'Failed to fetch assignments';
        }
    },

    async getAssignmentsByLecturerId(lecturerId: number): Promise<Assignment[] | string> {
        try {
            const response = await api.get(`/lecturers/${lecturerId}/assignments`);
            return response.data.map((a: any) => ({
                id: a.id,
                title: a.title,
                description: a.description,
                dueDate: a.dueDate,
                status: this.getAssignmentStatus(a.dueDate),
                createdAt: a.createdAt
            }));
        } catch (error: any) {
            console.error('Error fetching assignments by lecturer:', error);
            if (error.response?.data) {
                return error.response.data;
            }
            return 'Failed to fetch assignments by lecturer';
        }
    },

    async createAssignment(assignment: Omit<Assignment, 'id'>): Promise<Assignment | string> {
        try {
            const response = await api.post('/assignments', {
                ...assignment,
                dueDate: new Date(assignment.dueDate).toISOString()
            });
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
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    async getAssignmentById(assignmentId: number): Promise<Assignment | string> {
        try {
            const response = await api.get(`/assignments/${assignmentId}`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching assignment:', error);
            if (error.response?.data) {
                return error.response.data;
            }
            return 'Failed to fetch assignment';
        }
    }
};

export const AssignmentSubmissionService = {
    async uploadSubmission(
        assignmentId: number,
        studentId: number,
        file: File
    ): Promise<string | object> {
        const formData = new FormData();
        formData.append('assignmentId', assignmentId.toString());
        formData.append('studentId', studentId.toString());
        formData.append('file', file);
        
        try {
            const response = await api.post('/submissions/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error: any) {
            console.error('Error uploading submission:', error);
            if (error.response?.data) {
                return error.response.data;
            }
            return 'Failed to upload submission';
        }
    }, 

    async getStudentSubmissions(assignmentId: number, studentId: number): Promise<object | string> {
        try {
            const response = await api.get(`/submissions/${assignmentId}/student/${studentId}`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching submissions:', error);
            if (error.response?.data) {
                return error.response.data;
            }
            return 'Failed to fetch submissions';
        }
    }  
};