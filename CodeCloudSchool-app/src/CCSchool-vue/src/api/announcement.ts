import api from './api';

export interface Announcement {
    title: string;
    description: string;
    date: Date | string;
    
}

export const AnnouncementService ={
    async getAnnouncementByCourseId(courseId: number) : Promise<Announcement[] | string> {
        try {
            const response = await api.get(`/courses/${courseId}`);
            console.log('Announcements response:', response.data.announcements.$values);
            return response.data.announcements.$values; // should return an array of announcements for the course
        } catch (error: any) {
            console.error('Full error object:', error);
            if (error.response && error.response.data) {
                return error.response.data; // e.g. "No announcements found"
            }
            return 'An unknown error occurred';
        }
    },

    async getAnnouncementById(announcementId: number): Promise< Announcement | string> {
        try {
            const response = await api.get(`/assignments/${announcementId}`);
            return response.data; // should return an assignment object
        } catch (error: any) {
            console.error('Full error object:', error);
            if(error.response && error.response.data) {
                return error.response.data; // e.g. "Assignment not found"
            }
            return 'An unknown error occurred';
        }
    },

    async postAnnouncement(courseId: number, announcements: Announcement): Promise < Announcement | string >{
        try{
            const response = await api.post('/courses/' + {courseId} + '/announcements', announcements);
            console.log("Announcements response:", response.data);
            if(response.data){
                return response.data; // should return the created announcement object
            }
            }catch (error:any) {
                console.error('Full error object:', error);
                if(error.response && error.response.data){
                    return error.response.data;
                }
        }
        return 'An unknown error occurred'; 
    }


    
}
