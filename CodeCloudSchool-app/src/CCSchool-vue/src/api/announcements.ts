import api from './api';

interface  Announcements {
    Title: string;
    Description: string;
    Date: Date;
    LecturerId: number;
}

export const AnnouncementService = {
    async getAnnouncementsByCourseId(courseId: number): Promise<Announcements[] | string> {
        try {
            const response = await api.get(`/courses/${courseId}/announcements`);
            console.log('Announcements response:', response.data.$values);
            return response.data.$values; // should return an array of announcements for the course
        } catch (error: any) {
            console.error('Full error object:', error);
            if (error.response && error.response.data) {
                return error.response.data; // e.g. "No announcements found"
            }
            return 'An unknown error occurred';
        }
    }
};

;

export function formatAnnouncementDate(isoDate: string): string {
    const date = new Date(isoDate);

    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' }); // "July"
    const hours = date.getUTCHours().toString().padStart(2, '0'); // "23"
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // "59"

    return `${day} ${month} - ${hours}:${minutes}`;
}
// This function formats the date to a more readable format
// e.g. "23 July - 23:59"
// It takes an ISO date string and returns a formatted string
// Usage example:
// const formattedDate = formatAnnouncementDate('2023-07-23T23:59:00Z');            