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
        console.log('Uploading submission:', {
            assignmentId,
            studentId,
            fileName: file.name,
            fileType: file.type
        });
        try {
            const response = await api.post('/submissions/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data; // Could be a Submission object
        } catch (error: any) {
            console.error('Error uploading submission:', error);
            if (error.response?.data) {
                return error.response.data; // Error message from backend
            }
            return 'Failed to upload submission';
        }
    }, 

    async getStudentSubmissions(assignmentId: number, studentId: number): Promise<object | string> {
    try {
        const response = await api.get(`/submissions/${assignmentId}/student/${studentId}`);
        console.log('Student submission response:', response.data);
        return response.data; // Single submission object
    } catch (error: any) {
        console.error('Error fetching student submission:', error);
        if (error.response?.data) {
            return error.response.data;
        }
        return 'Failed to fetch student submission';
    }
}

   
};