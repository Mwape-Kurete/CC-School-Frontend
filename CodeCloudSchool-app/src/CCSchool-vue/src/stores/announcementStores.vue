import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Announcement {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
}

export const useAnnouncementStore = defineStore('announcements', () => {
  const announcements = ref<Announcement[]>([]);

  const addAnnouncement = (title: string, body: string) => {
    announcements.value.push({
      id: Date.now().toString(),
      title,
      body,
      createdAt: new Date()
    });
  };

  return { announcements, addAnnouncement };
}); 