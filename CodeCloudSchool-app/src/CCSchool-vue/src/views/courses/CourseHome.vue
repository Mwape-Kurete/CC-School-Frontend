<script setup lang="ts">
import { GraduationCap, BellRing, EllipsisVertical } from 'lucide-vue-next';
import CardComp from '@/components/CardComp.vue';
import { CourseService } from '@/api/courses';
import { AnnouncementService } from '@/api/announcements';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

interface CourseDetails {
  courseFullCode: string;
  courseAbout: string;
  courseSlides: string;
  courseWeekBreakdown: {
    $values: Array<{
      header: string;
      description: string;
    }>;
  };
  courseMarkBreakdown: {
    $values: Array<{
      title: string;
      mark: string;
      items: Array<{
        description: string;
        mark: string;
      }>;
    }>;
  };
  courseSemDescriptions: {
    $values: Array<{
      description: string;
    }>;
  };
}

interface Announcement {
  announcementId: number;
  title: string;
  description: string;
  date: string;
  lecturerId: number;
  courseId: number;
}

const route = useRoute();
const courseDetails = ref<CourseDetails | null>(null);
const announcements = ref<Announcement[]>([]);
const isLoading = ref(false);
const announcementsLoading = ref(false);
const error = ref<string | null>(null);
const announcementsError = ref<string | null>(null);
const showDropdown = ref(false);
const courseId = ref(route.params.courseId);

const getEmbeddedSlideUrl = (url: string) => {
  if (!url) return '';
  return url.replace(/\/(edit|view|preview).*/, '/embed');
};

// Fetch course details
onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await CourseService.getCourseDetails(Number(courseId.value));
    
    if (response && typeof response === 'object' && 'courseFullCode' in response) {
      courseDetails.value = {
        courseFullCode: (response as any).courseFullCode || '',
        courseAbout: (response as any).courseAbout || '',
        courseSlides: (response as any).courseSlides || '',
        courseWeekBreakdown: {
          $values: (response as any).courseWeekBreakdown?.$values || []
        },
        courseMarkBreakdown: {
          $values: (response as any).courseMarkBreakdown?.$values?.map((section: any) => ({
            ...section,
            items: section.items?.$values || []
          })) || []
        },
        courseSemDescriptions: {
          $values: (response as any).courseSemDescriptions?.$values || []
        }
      };
    }
  } catch (err) {
    error.value = 'Failed to load course details';
    console.error('Error fetching course details:', err);
  } finally {
    isLoading.value = false;
  }
});

// Fetch announcements for current course
const fetchAnnouncements = async (): Promise<void> => {
  announcementsError.value = null;
  announcementsLoading.value = true;
  try {
    const response = await AnnouncementService.getAnnouncementsByCourseId(Number(courseId.value));

    if (typeof response === 'string') {
      announcementsError.value = response;
      announcements.value = [];
    } else if (Array.isArray(response)) {
      // Sort by date (newest first) and take first 2 announcements
      announcements.value = response
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 2);
    } else {
      announcementsError.value = 'Unexpected data format';
      announcements.value = [];
    }
  } catch (err) {
    announcementsError.value = 'Failed to load announcements';
    announcements.value = [];
  } finally {
    announcementsLoading.value = false;
  }
};
</script>

<template>
  <div class="course-home">
    <!-- Loading state -->
    <div v-if="isLoading" class="loading">Loading course details...</div>
    
    <!-- Error state -->
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <!-- Content -->
    <div v-else-if="courseDetails" class="course-content">
      <h2 class="day-heading">Recent Announcements</h2>
      
      <!-- Announcements would go here -->
      <div class="announcements-container">
        <div v-if="announcementsLoading">Loading announcements...</div>
        <div v-else-if="announcementsError" class="text-red-500">{{ announcementsError }}</div>
        <template v-else>
          <div class="card-container">
            <CardComp
              v-for="announcement in announcements"
              :key="announcement.announcementId"
              cardType="announcement"
              :announcementTitle="announcement.title"
              :announcementBody="announcement.description"
              :announcementDate="AnnouncementService.formatAnnouncementDate(announcement.date)"
              moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..."
            />
            <div v-if="!announcements.length" class="text-gray-500">
              No announcements available
            </div>
          </div>
        </template>
      </div>

      <div class="banner-heading"><h1>{{ courseDetails.courseFullCode }} | Semester 1</h1></div>
      <div class="course-banner"></div>

      <!-- What You Will Learn Section -->
      <div class="course-text">
        <h2>WHAT YOU WILL LEARN</h2>
        <p v-if="courseDetails.courseAbout">{{ courseDetails.courseAbout }}</p>
        <p v-else class="no-content">No course description available.</p>
      </div>

      <!-- Semester Overview Section -->
      <div class="semester-overview">
        <h2>SEMESTER OVERVIEW</h2>
        <div class="week-items">
          <div v-for="(week, index) in courseDetails.courseWeekBreakdown.$values" :key="index" class="week-item">
            <div class="week-header">
              <span class="week-number">{{ week.header }}</span>
              <span class="week-title">{{ week.description }}</span>
            </div>
            <div v-if="index !== courseDetails.courseWeekBreakdown.$values.length - 1" class="week-divider"></div>
          </div>
          <div v-if="courseDetails.courseWeekBreakdown.$values.length === 0" class="no-content">
            No weekly breakdown available.
          </div>
        </div>
      </div>

      <!-- Semester Brief Section -->
      <div class="semester-overview">
        <h2>SEMESTER BRIEF</h2>
        <div v-if="courseDetails.courseSlides" class="google-slides-embed">
          <iframe
            :src="getEmbeddedSlideUrl(courseDetails.courseSlides)"
            frameborder="0"
            width="960"
            height="569"
            allowfullscreen="true"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
          ></iframe>
        </div>
        <div v-else class="no-content">
          No slides available.
        </div>
      </div>

      <!-- Mark Breakdown Section -->
      <div class="semester-overview">
        <h2>MARK BREAKDOWN</h2>
        <div class="week-items">
          <div v-for="(section, sectionIndex) in courseDetails.courseMarkBreakdown.$values" :key="sectionIndex" class="week-item">
            <div class="week-header">
              <span class="week-title"><strong>{{ section.title }}</strong> ({{ section.mark }})</span>
            </div>
            <div class="week-divider"></div>
            <div v-for="(item, itemIndex) in section.items" :key="itemIndex">
              <p>{{ item.description }}: {{ item.mark }}</p>
              <div v-if="itemIndex !== section.items.length - 1" class="week-divider"></div>
            </div>
          </div>
          <div v-if="courseDetails.courseMarkBreakdown.$values.length === 0" class="no-content">
            No mark breakdown available.
          </div>
        </div>
      </div>

      <!-- Year Breakdown Section -->
      <div class="semester-overview">
        <h2>YEAR BREAKDOWN</h2>
        <div class="course-text">
          <h3>SEMESTER 1</h3>
          <p v-if="courseDetails.courseSemDescriptions.$values[0]?.description">
            {{ courseDetails.courseSemDescriptions.$values[0].description }}
          </p>
          <p v-else class="no-content">No semester 1 description available.</p>
          
          <h3>SEMESTER 2</h3>
          <p v-if="courseDetails.courseSemDescriptions.$values[1]?.description">
            {{ courseDetails.courseSemDescriptions.$values[1].description }}
          </p>
          <p v-else class="no-content">No semester 2 description available.</p>
        </div>
      </div>

      <!-- Lecturer Section -->
      <div class="lecturer-section">
        <div class="divider"></div>
        <h2>LECTURER</h2>
        <div class="lecturer-info">
          <div class="lecturer-avatar">
            <div class="avatar-placeholder"></div>
          </div>
          <div class="lecturer-details">
            <h3>LECTURER NAME</h3>
            <p>Lecturename@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* ---------------------------- */
/* courses MAIN CONTENT */
/* ---------------------------- */

.divider {
  height: 1px;
  background-color: #e0e0e0;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
/* Lecturer Section Styles */
.lecturer-section {
  margin-top: 40px;
}

.lecturer-section h2 {
  font-family: "Quicksand", sans-serif;
  font-weight: 600;
  font-size: 26px;
  color: #9A9A9A;
  margin-bottom: 20px;
}

.lecturer-info {
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
}

.lecturer-avatar {
  width: 60px;
  height: 60px;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lecturer-details h3 {
  font-family: "Quicksand", sans-serif;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
  font-size: 18px;
}

.lecturer-details p {
  font-family: "Quicksand", sans-serif;
  color: #666;
  margin: 0;
}
/* Course Text Styles */

.course-text h3{
   font-family: "Quicksand", sans-serif;
   font-weight: 600;
   background-color: #F0F1A5;
   width: 300px;
   height: 50px;
   text-align: center;
   padding-top: 10px;
   border-radius: 25px;
   margin-bottom:20px ;
   color: #212121;
}
.slides-container iframe {
  border-radius: 40px;
  max-width: 100%;
}

.course-text p{
  padding-bottom: 30px;
}


.banner-heading {
  font-size: 20px;
  margin-top: 40px;
}

.course-banner {
  background-image: url('https://images.pexels.com/photos/7988742/pexels-photo-7988742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');

  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  padding: 1rem 2rem 0;
  position: relative;
  margin-top: 20px;
}

.course-text {
  margin-top: 40px;
}

.course-text h2 {
  font-family: "Quicksand", sans-serif;
  font-weight: 600;
  font-size: 26px;
  color: #9A9A9A;
}

.course-text p {
  font-family: "Quicksand", sans-serif;
  font-weight: 400;
  margin-top: 10px;
  color: #9A9A9A;
}

/* Semester Overview Styles */
.semester-overview {
  margin-top: 40px;
}

.semester-overview h2 {
  font-family: "Quicksand", sans-serif;
  font-weight: 600;
  font-size: 26px;
  color: #9A9A9A;
  margin-bottom: 20px;
}

.week-items {
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.week-item {
  padding: 12px 0;
}

.week-header {
  display: flex;
  gap: 10px;
  align-items: center;
}

.week-number {
  font-weight: 600;
  color: #333;
  min-width: 60px;
}

.week-title {
  color: #666;
}

.week-divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 12px 0;
}

/* ---------------------------- */
/* Course MAIN CONTENT */
/* ---------------------------- */
.course-content {
  padding: 1rem 2rem 0;
}

.announcements-container {
  flex-direction: column;
}

/* ---------------------------- */
/* DASHBOARD HEADER CONTAINER */
/* ---------------------------- */
.Course-header {
  padding: 1rem 2rem 0;
  position: relative;
}

/* ---------------------------- */
/* HEADER CONTENT LAYOUT */
/* ---------------------------- */
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
}

/* ---------------------------- */
/* MAIN DASHBOARD TITLE */
/* ---------------------------- */
.title {
  font-size: 2.75rem;
  margin: 0;
  white-space: nowrap;
}

/* ---------------------------- */
/* DATE HEADING STYLING */
/* ---------------------------- */
.day-heading {
  font-family: 'Quicksand', sans-serif;
  font-size: 14pt;
  margin-top: 20px;
  color: #333;
  font-weight: 600;
}

/* ---------------------------- */
/* CONTROL BUTTONS CONTAINER */
/* ---------------------------- */
.controls-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* ---------------------------- */
/* TAB BUTTONS STYLING */
/* ---------------------------- */
.tabs-container {
  display: flex;
  gap: 0.75rem;
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  height: 36px;
  white-space: nowrap;
}

/* ---------------------------- */
/* DROPDOWN MENU STYLING */
/* ---------------------------- */
.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  z-index: 10;
  min-width: 160px;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

/* ---------------------------- */
/* ICON BUTTONS STYLING */
/* ---------------------------- */
.icon-buttons {
  display: flex;
  gap: 0.5rem;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  color: #555;
}

/* ---------------------------- */
/* HEADER DIVIDER LINE */
/* ---------------------------- */
.divider {
  height: 1px;
  background-color: #e0e0e0;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}

.text-gray-500{
  width: 100%;
  background-color: #D8DFE9;
  height: 50px;
  border-radius: 20px;
  padding-left: 20px;
  padding-top: 10px;
  margin-top: 10px;
}
</style>
