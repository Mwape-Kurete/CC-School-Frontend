import api from './api';

export interface TimeSlot {
    classID: number;
    className: string;
    classDescription: string;
    timeSlotId: number;
    day: string;           // e.g. "Monday"
    startTime: string;     // e.g. "09:00"
    endTime: string;       // e.g. "10:30"
}

export const timetableServices = {
    async fetchTimetableByStudentId(studentId: number): Promise<TimeSlot[] | string> {
        try {
            const response = await api.get(`/timetable/student/${studentId}`);
            console.log("Timetable fetched:", response.data);
            return response.data.$values as TimeSlot[];
        } catch (error: any) {
            console.error('Full error object:', error);
            if (error.response?.data) {
                return error.response.data; // e.g. "No courses found"
            }
            return 'An unknown error occurred';
        }
    }
};
