<template>
  <!-- Main navigation bar container -->
  <div class="navbar bg-[#D0DFCC] shadow-sm">
    <!-- Logo section at the top of the sidebar -->
    <div class="logo-section flex items-center justify-center px-6 py-4">
      <!-- Company logo image -->
      <img 
        :src="isCollapsed ? '@/assets/logo-short.png' : '@/assets/logo.png'"
        alt="Cloud & Code Academy Logo"
        :class="{
          'w-[260px] h-[56px]': !isCollapsed,
          'w-[56px] h-[39px]': isCollapsed
        }"
      >
    </div>

    <!-- Navigation menu links section -->
    <div class="nav-links py-4">
      <!-- Loop through each navigation item -->
      <RouterLink
        v-for="item in navItems" 
        :key="item.label"
        :to="item.route"
        active-class="active-nav-item"
      >
        <!-- Individual navigation item container -->
        <div
          class="nav-item pl-6 pr-3 py-3 flex items-center transition-colors mx-4 hover:bg-white/50 hover:text-gray-700"
        >
          <!-- Navigation icon -->
          <component :is="item.icon" class="h-5  mr-3" />
          <!-- Navigation text label -->
          <span class="font-medium">{{ item.label }}</span>
        </div>
      </RouterLink>
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
  History, 
  User, 
  Settings, 
  HelpCircle 
} from 'lucide-vue-next';

// Array containing all navigation items with their labels, icons and routes
const navItems = [
  { label: 'Dashboard', icon: Gauge, route: '/' },
  { label: 'Courses', icon: BookOpen, route: '/courses' },
  { label: 'Groups', icon: Users, route: '/groups' },
  { label: 'Timetable', icon: Calendar, route: '/timetable' },
  { label: 'History', icon: History, route: '/history' },
  { label: 'User Account', icon: User, route: '/account' },
  { label: 'Settings', icon: Settings, route: '/settings' },
  { label: 'Help', icon: HelpCircle, route: '/help' }
];

// State management
const isCollapsed = ref(false);
const showCourseNav = ref(false);
const selectedCourse = ref(null);

// Course data
const courses = ref(['CS 101', 'AI 210', 'OOP 101', 'CSP 210']);
const coursePages = ref(['Home', 'Announcements', 'Modules', 'Assignments', 'Attendance', 'Grades']);
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
  padding: 0 24px;
}

/* Navigation item styling */
.nav-item {
margin: -6px;
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
</style>