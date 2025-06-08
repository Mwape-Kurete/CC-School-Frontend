<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import { AnnouncementService } from '@/api/announcements';

const router = useRouter();
const announcements = ref<Array<{
  id: string;
  title: string;
  body: string;
  createdAt: string;
  moduleImg?: string;
}>>([]); 

// Load announcements from backend with localStorage fallback
onMounted(async () => {
  const courseId = 1; // Should be dynamic in production
  const lecturerId = 1; // Should be dynamic in production
  
  try { 
    // Try backend first
    const backendAnnouncements = await AnnouncementService.getAnnouncementsByLecturerId(lecturerId);
    
    if (Array.isArray(backendAnnouncements)) {
      // Transform and validate announcements
      announcements.value = backendAnnouncements.map(a => ({
        id: a.id,
        title: a.title,
        body: a.body,
        createdAt: a.date || a.createdAt || new Date().toISOString(),
        moduleImg: a.moduleImg
      }));
      
      // Update localStorage
      const key = `announcements_${courseId}_${lecturerId}`;
      localStorage.setItem(key, JSON.stringify(announcements.value));
    } else {
      // Fallback to localStorage
      const key = `announcements_${courseId}_${lecturerId}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        announcements.value = JSON.parse(stored);
      }
    }
  } catch (error) {
    console.error('Error loading announcements:', error);
  }
});

const searchQuery = ref('');
const announcementType = ref<'all' | 'recent' | 'old'>('all');
const sortBy = ref<'date' | 'lecture' | 'subject'>('date');

// Robust date formatting with error handling
const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return 'No date available';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch {
    return 'Invalid date';
  }
};

// Filter and sort announcements
const filteredAnnouncements = computed(() => {
  let filtered = [...announcements.value];

  // Filter by time
  const now = new Date();
  filtered = filtered.filter(a => {
    const createdDate = new Date(a.createdAt);
    if (isNaN(createdDate.getTime())) return false;
    
    const diffInDays = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (announcementType.value === 'recent') return diffInDays <= 7;
    if (announcementType.value === 'old') return diffInDays > 7;
    return true;
  });

  // Search filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.body.toLowerCase().includes(q)
    );
  }

  // Sorting
  filtered.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    
    if (sortBy.value === 'date') return dateB - dateA;
    if (sortBy.value === 'lecture') return (a.title || '').localeCompare(b.title || '');
    return (a.body || '').localeCompare(b.body || '');
  });

  return filtered;
});
</script>

<template>
  <div class="announcements-overview">
    <div class="toolbar">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Search announcements..." 
        class="search-bar"
      />

      <div class="filters">
        <select v-model="announcementType" class="filter-select">
          <option value="all">All Announcements</option>
          <option value="recent">Recent (≤7 days)</option>
          <option value="old">Older (>7 days)</option>
        </select>

        <select v-model="sortBy" class="filter-select">
          <option value="date">Sort by Date</option>
          <option value="lecture">Sort by Lecture</option>
          <option value="subject">Sort by Subject</option>
        </select>
      </div>
    </div>

    <div class="header">
      <h1 class="title">Course Announcements</h1>
      <Button 
        label="Create Announcement" 
        @click="router.push('/LecturerAnnounce')"
        class="create-button"
      />
    </div>
    
    <div class="announcements-list">
      <div 
        v-for="announcement in filteredAnnouncements" 
        :key="announcement.id"
        class="announcement-card"
      >
        <div class="announcement-avatar"
          :style="announcement.moduleImg ? { 
            backgroundImage: `url('${announcement.moduleImg}')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          } : {}">
        </div>
        <div class="announcement-content">
          <div class="announcement-title">{{ announcement.title }}</div>
          <div class="announcement-body">{{ announcement.body }}</div>
        </div>
        <div class="announcement-time">
          <Button 
            :label="`Posted: ${formatDate(announcement.createdAt)}`" 
            class="time-button p-button-rounded p-button-text" 
          />
        </div>
      </div>

      <div v-if="filteredAnnouncements.length === 0" class="empty-state">
        No announcements found. Create one to get started!
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Your existing styles remain unchanged */
</style>

<style scoped>
.announcements-overview {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.search-bar {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
  flex-grow: 1;
  min-width: 200px;
}

.filters {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filter-select {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
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
  gap: 1.5rem;
}

.announcement-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s;
}

.announcement-card:hover {
  transform: translateY(-2px);
}

.announcement-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.announcement-content {
  flex: 1;
  min-width: 0;
}

.announcement-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.announcement-body {
  color: #475569;
  margin-bottom: 0;
  white-space: pre-line;
}

.announcement-time {
  align-self: center;
}

.time-button {
  color: #64748b !important;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
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