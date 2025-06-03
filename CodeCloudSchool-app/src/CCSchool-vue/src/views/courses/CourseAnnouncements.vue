<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const courseId = route.params.courseId;

import { CourseService } from '@/api/courses'
import { AnnouncementService } from '@/api/announcements';
import { onMounted, ref, computed } from 'vue';

// Components
import CardComp from '@/components/CardComp.vue';
import Dropdown from '@/components/ui/CDropdown.vue';

// Filter options
const selectedFilter = ref('all');
const filterOptions = [
  { label: 'All Announcements', value: 'all' },
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' }
];

import type { Course } from '@/api/courses';
const course = ref<Course | null>(null);

// Announcements state
const announcements = ref<Announcement[]>([]);

interface Announcement {
  announcementId: number;
  title: string;
  description: string;
  date: string;
  lecturerId: number;
}

// Fetch announcements when component mounts
onMounted(async () => {
  const courseIdParam = route.params.courseId;
  const courseId = Array.isArray(courseIdParam) ? Number(courseIdParam[0]) : Number(courseIdParam);
  try {
    const result = await CourseService.getCoursebyId(courseId);
    if (typeof result === 'string') {
      console.error('Failed to fetch course:', result);
      course.value = null;
    } else {
      console.log('Course fetched:', result);
      course.value = result;
      console.log('Course fetched successfully:', course.value);
    }
  } catch (error) {
    console.error('Failed to fetch course:', error);
  }


  await fetchAnnouncements();
});

// Fetch announcements for current course
const error = ref<string | null>(null);
const fetchAnnouncements = async (): Promise<void> => {
  error.value = null;
  try {
    const response = await AnnouncementService.getAnnouncementsByCourseId(Number(courseId));

    if (typeof response === 'string') {
      error.value = response;
      announcements.value = [];
    } else if (Array.isArray(response)) {
      announcements.value = response;
      console.log('Announcements fetched:', announcements.value);
    } else {
      error.value = 'Unexpected data format';
      announcements.value = [];
    }

  } catch (err) {
    error.value = 'Failed to load announcements';
    announcements.value = [];
  }
};

// Filter announcements based on selected filter
const filteredAnnouncements = computed(() => {
  const sorted = [...announcements.value].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (selectedFilter.value === 'oldest') {
    return sorted.reverse();
  }
  return sorted;
});

// Handle announcement click
const onAnnouncementClick = (announcementId: number): void => {
  router.push({
    name: 'AnnouncementDetails',
    params: {
      courseId: route.params.courseId,
      announcementId
    }
  });
};


</script>


<template>
  <div class="course-announcements">
    <h1>Announcements</h1>
  </div>

  <div v-if="error" class="text-red-500 p-4 bg-red-50 rounded-lg mx-4 mb-4">
    Error: {{ error }}
  </div>

  <div class="dashboard-view">
    <!-- Search and filter -->
    <div class="search-filter-con mb-6 flex items-center gap-4">
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1016.65 2a7 7 0 000 14z" />
        </svg>
        <input type="text" placeholder="Search" class="input" />
      </div>

      <Dropdown v-model="selectedFilter" :options="filterOptions" placeholder="Filter by Date" option-label="label"
        option-value="value" size="md" type="secondary" />
    </div>

    <!-- Announcements list -->
    <h3 class="text-2xl font-semibold mb-4">Recent Announcements</h3>
    <div class="divider"></div>

    <div class="card-container">
      <CardComp v-for="announcement in filteredAnnouncements" @click="onAnnouncementClick(announcement.announcementId)"
        :key="announcement.announcementId" cardType="announcement" :announcementTitle="announcement.title"
        :announcementBody="announcement.description"
        :announcementDate="AnnouncementService.formatAnnouncementDate(announcement.date)"
        moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..." />

      <div v-if="!announcements.length" class="text-gray-500">
        No announcements available
      </div>
    </div>
  </div>
</template>



<style scoped>
.card-container {
  background-color: #F5F5F5;
  border-radius: 25px;
  padding: 1rem;
}

.dashboard-view {
  padding: 2rem;
}

.divider,
.divider-card {
  height: 1px;
  background-color: #ccc;
  margin: 1rem 0;
}

.divider-card {
  width: 97%;
  margin-left: 1.5%;
}

.search-filter-con {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between !important;
}


.search-bar {
  display: flex;
  align-items: center;
  background-color: #d9d9d9;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 300px;
}

.search-bar .icon {
  width: 20px;
  height: 20px;
  color: #888;
  margin-right: 0.5rem;
}

.search-bar .input {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-size: 1rem;
  color: #333;
}
</style>
