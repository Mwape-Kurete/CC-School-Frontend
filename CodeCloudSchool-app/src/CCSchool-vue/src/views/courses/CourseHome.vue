<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { GraduationCap, BellRing, EllipsisVertical } from 'lucide-vue-next';
import CardComp from '@/components/CardComp.vue';

const route = useRoute();
const courseId = route.params.courseId;
const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// Sample announcements data
const announcements = ref([
  {
    id: 1,
    title: 'COMPUTER SCIENCE WORKSHOP WITH JACOB ANDERSON',
    body: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit...',
    date: '2 Apr 2025, 11:36'
  },
  {
    id: 2,
    title: 'IMPORTANT: SYSTEM MAINTENANCE',
    body: 'The platform will be undergoing maintenance this weekend...',
    date: '5 Apr 2025, 14:20'
  }
]);

// Semester overview data
const weeks = ref([
  { week: 1, title: 'Course Introduction & Briefing' },
  { week: 2, title: 'Type-Sensitive Programming' },
  { week: 3, title: 'Basic Software Architecture' },
  { week: 4, title: 'Database Integration' },
  { week: 5, title: 'Database Integration' },
  { week: 6, title: 'Security & Authentication' },
  { week: 7, title: 'Containerisation' },
  { week: 8, title: 'Cross-Platform Development Introduction' }
]);

const googleSlidesEmbed = `  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTE8fgAcfSDp0L7UmSpXZlyHcFNFIXRGRaDj5UgdRDCXSWSmsISk69qHNT-SZ6NMyEwXtluxhZXeYtH/pubembed?start=false&loop=false&delayms=3000" 
frameborder="0" 
width="960" 
height="569" 
allowfullscreen="true" 
mozallowfullscreen="true" 
webkitallowfullscreen="true">
  </iframe>
`;
</script>

<template>
  <div class="course-home">
    <div class="Course-header"> <!-- Header -->
      <div class="header-content">
        <h1 class="title">Course Overview </h1>   
        <div class="controls-container">
          <div class="tabs-container">
            <div class="dropdown-container">
              <button class="tab active" @click="toggleDropdown">
                Today
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div v-if="showDropdown" class="dropdown-menu">
                <div class="dropdown-item">This Week</div>
                <div class="dropdown-item">This Month</div>
                <div class="dropdown-item">Custom Range</div>
              </div>
            </div>
            <button class="tab">
              <GraduationCap :size="16" class="icon" />
              Grade Overview
            </button>
          </div>
          <div class="icon-buttons">
            <button class="icon-button">
              <div class="icon-circle">
                <BellRing :size="16" />
              </div>
            </button>
            <button class="icon-button">
              <div class="icon-circle">
                <EllipsisVertical :size="16" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="divider"></div>
    </div>

    <!-- Main content section -->
    <div class="course-content">
      <h2 class="day-heading">Recent Announcements</h2>
      
      <div class="announcements-container">
        <CardComp
          v-for="announcement in announcements"
          :key="announcement.id"
          cardType="announcement"
          :announcementTitle="announcement.title"
          :announcementBody="announcement.body"
          :announcementDate="announcement.date"
        />
      </div>

      <div class="banner-heading"><h1>Computer science 101 | Semester 1</h1></div>
      <div class="course-banner"></div>

      <div class="course-text">
        <h2>WHAT YOU WILL LEARN</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
      </div>

      <!-- Semester Overview Section -->
      <div class="semester-overview">
        <h2>SEMESTER OVERVIEW</h2>
        <div class="week-items">
          <div v-for="(week, index) in weeks" :key="week.week" class="week-item">
            <div class="week-header">
              <span class="week-number">Week {{ week.week }}</span>
              <span class="week-title">{{ week.title }}</span>
            </div>
            <div v-if="index !== weeks.length - 1" class="week-divider"></div>
          </div>
        </div>
      </div>

      <!-- Semester Brief Section -->
       <div class="semester-overview">
          <h2>SEMESTER BRIEF</h2>
          <!-- google slides here -->
          <div v-html="googleSlidesEmbed" class="google-slides-embed"></div>
       </div>

      <!-- Mark Breakdown Section -->
      <div class="semester-overview">
        <h2>MARK BREAKDOWN</h2>
        
        <div class="week-items">
          <h3>PROJECT WEIGHTS</h3>
          
          <div class="week-item">
            <div class="week-header">
              <span class="week-title"><strong>Theory Assessments</strong></span>
            </div>
            <div class="week-divider"></div>
            <p>Theme 1: Project Proposal Document: 50%</p>
            <p>Theme 2: Project Report & Demonstration: 50%</p>
          </div>
          
          <div class="week-item">
            <div class="week-header">
              <span class="week-title"><strong>Formative Assessments</strong></span>
            </div>
            <div class="week-divider"></div>
            <p>Theme 1: Progress Feedback: 25%</p>
            <p>Theme 1: Code Review: 25%</p>
            <p>Theme 2: Progress Feedback: 25%</p>
            <p>Theme 2: Code Review: 25%</p>
          </div>
          
          <div class="week-item">
            <div class="week-header">
              <span class="week-title"><strong>Summative Assessments</strong></span>
            </div>
            <div class="week-divider"></div>
            <p>Repository Administration: 15%</p>
            <p>Functional Management System: 70%</p>
            <p>Individual Contribution: 15%</p>
          </div>
        </div>
      </div>

      <!-- Year Breakdown Section -->
       <div class="semester-overview">
          <h2>YEAR BREAKDOWN</h2>

        <div class="course-text">
          <h3>SEMESTER 1</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
          
          <h3>SEMESTER 2</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
        
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
   background-color: #e9e9e9;
   width: 300px;
   height: 50px;
   text-align: center;
   padding-top: 10px;
   border-radius: 25px;
   margin-bottom:20px ;
   color: #9A9A9A;
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
  background-color: #e9e9e9;
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
</style>