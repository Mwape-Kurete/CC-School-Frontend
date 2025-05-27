<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import CardComp from '@/components/CardComp.vue'


const router = useRouter();
const announcements = ref<Array<{
  id: string;
  title: string;
  body: string;
  createdAt: string;
}>>([]);

onMounted(() => {
  const stored = sessionStorage.getItem('announcements');
  if (stored) {
    announcements.value = JSON.parse(stored);
  }
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
</script>

<template>
  <div class="announcements-overview">
    <div class="header">
      <h1 class="title">Recent Announcements</h1>
      <Button 
        label="Create Announcement" 
        @click="router.push('/LecturerAnnounce')"
        class="create-button"
      />
    </div>
    
    <div class="announcements-list">
      <div 
        v-for="announcement in announcements" 
        :key="announcement.id"
        class="announcement-card"
      >
      
        <div class="announcement-content">
          <h3 class="announcement-title">{{ announcement.title }}</h3>
          <p class="announcement-body">{{ announcement.body }}</p>
          <p class="announcement-date">
            Posted on {{ formatDate(announcement.createdAt) }}
          </p>
        </div>
      </div>

      <div v-if="announcements.length === 0" class="empty-state">
        No announcements yet. Click "Create Announcement" to add one.
      </div>
    </div>
  </div>
</template>

<style scoped>
.announcements-overview {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.create-button {
  background-color: #D0DFCC;
  color: black;
  border: none;
  border-radius: 50px;
  padding: 0.625rem 1.25rem;
  font-weight: 500;
}

.announcements-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.announcement-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s;
}

.announcement-card:hover {
  transform: translateY(-2px);
}

.announcement-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.announcement-body {
  color: #475569;
  margin-bottom: 0.75rem;
  white-space: pre-line;
}

.announcement-date {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #64748b;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>