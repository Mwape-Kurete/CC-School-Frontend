<template>
  <!-- Main navigation bar container -->
  <div class="navbar bg-[#D0DFCC] shadow-sm">
    <!-- Logo section at the top of the sidebar -->

    <div class="logo-section flex items-center justify-center p-4">
      <!-- Company logo image -->
      <img 
        src="@/assets/logo.png" 
        alt="Cloud & Code Academy Logo"
        class="w-[260px] h-auto max-h-[56px] object-contain"
      >
    </div>
    <!-- Navigation menu links section -->
    <div class="nav-links py-4">
      <!-- Loop through each navigation item -->
      <div v-for="item in navItems" :key="item.label">
        <!-- Main nav item -->
        <RouterLink
          :to="item.route"
          active-class="active-nav-item"
          @click="handleNavClick(item)"
        >
          <div
            class="nav-item pl-6 pr-3 py-3 flex items-center transition-colors mx-4 hover:bg-white/50 hover:text-gray-700"
          >
            <component :is="item.icon" class="h-5 mr-3" />
            <span class="font-medium">{{ item.label }}</span>
          </div>
        </RouterLink>

        <!-- Nested Course Navigation -->
        <div 
          v-if="item.label === 'Courses' && showCourseNav && !isCollapsed"
          class="course-nav ml-8"
        >
          <!-- Course Selection Level -->
          <div v-if="!selectedCourse" class="space-y-1">
            <div 
              v-for="course in courses" 
              :key="course"
              @click.stop="selectCourse(course)"
              class="course-nav-item"
            >
              {{ course }}
            </div>
          </div>

          <!-- Course Pages Level -->
          <div v-else class="space-y-1">
            <div 
              class="course-nav-item font-semibold"
              @click.stop="selectedCourse = null"
            >
              ← {{ selectedCourse }}
            </div>
            <div 
              v-for="page in coursePages" 
              :key="page"
              class="course-nav-item"
            >
              {{ page }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
// Import Vue Router functionality
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
// Import Lucide icons for the navigation
import { 
  Gauge, 
  BookOpen, 
  Users, 
  Calendar, 
  User, 
  Settings, 

} from 'lucide-vue-next';

// Array containing all navigation items with their labels, icons and routes
const navItems = [
  { label: 'Dashboard', icon: Gauge, route: '/' },
  { label: 'Courses', icon: BookOpen, route: '/courses' },
  { label: 'Groups', icon: Users, route: '/groups' },
  { label: 'Timetable', icon: Calendar, route: '/timetable' },
  { label: 'User Account', icon: User, route: '/account' },
  { label: 'Settings', icon: Settings, route: '/settings' },

];

// State management
const isCollapsed = ref(false);
const showCourseNav = ref(false);
const selectedCourse = ref(null);

// Course data
const courses = ref(['CS 101', 'AI 210', 'OOP 101', 'CSP 210']);
const coursePages = ref(['Home', 'Announcements', 'Modules', 'Assignments', 'Grades']);

const handleNavClick = (item) => {
  if (item.label === 'Courses') {
    showCourseNav.value = !showCourseNav.value;
    selectedCourse.value = null;
  } else {
    showCourseNav.value = false;
  }
};

const selectCourse = (course) => {
  selectedCourse.value = course;
};
</script>

<style scoped>
/* Main sidebar styling */
.navbar {
  width: 312px;
  height: calc(100vh - 40px);
  position: fixed;
  left: 30px;
  top: 20px;
  z-index: 40;
  border-radius: 21px;
  padding: 16px 0;

}

/* Logo container styling */
.logo-section {
  min-height: 80px; /* Give enough space for the logo */
  padding: 0 1rem; /* Adjust padding as needed */
}
/* Navigation item styling */
.nav-item {
margin: -20px;
  position: relative;
  left: -12px;
  width: calc(100% - 16px);
  color: #212121;
}

/* Hover state for navigation items */
.nav-item:hover {
  border-radius: 10px;
    background-color: rgba(236, 236, 236, 0.831);
}

/* Active state for navigation items */
.active-nav-item .nav-item {
  background-color: white;
  color: #1f2937; /* gray-800 */
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border-radius: 10px;
  transform: translateX(-4px);
}

.course-nav {
  border-left: 2px solid rgba(0, 0, 0, 0.1);
  margin-top: 4px;
}

.course-nav-item {
  padding: 8px 12px;
  margin-left: -12px;
  color: #212121;
  cursor: pointer;
  border-radius: 6px;
}

.course-nav-item:hover {
  background-color: rgba(236, 236, 236, 0.831);
}
</style>