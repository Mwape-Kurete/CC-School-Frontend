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
              :key="course.id"
              @click.stop="selectCourse(course)"
              class="course-nav-item"
            >
              {{ course.name }}
            </div>
          </div>

          <!-- Course Pages Level -->
          <div v-else class="space-y-1">
            <div 
              class="course-nav-item font-semibold"
              @click.stop="selectedCourse = null"
            >
              ← {{ selectedCourse.name }}
            </div>
            <RouterLink
              v-for="page in coursePages"
              :key="page.routeName"
              :to="{
                name: page.routeName,
                params: { courseId: selectedCourse.id }
              }"
              class="course-nav-item"
              active-class="active-course-item"
            >
              {{ page.name }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
// Import Vue Router functionality
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
// Import Lucide icons for the navigation
import { 
  Gauge, 
  BookOpen, 
  Users, 
  Calendar, 
  User, 
  Settings,
  Shield, 

} from 'lucide-vue-next';
import { computed } from 'vue' 

const router = useRouter();

// Define component props to accept user role
const props = defineProps({
  userRole: {
    type: String,
    default: 'student' // Fallback to student view
  }
});


// Shared nav items (students + lecturers)
const sharedNavItems = [
  { 
    label: 'Dashboard', 
    icon: Gauge, 
    route: { 
      student: '/', 
      lecturer: '/lecturer-dashboard' // Changed to match your file
    } 
  },
  { label: 'Courses', icon: BookOpen, route: '/courses' },
  { label: 'Groups', icon: Users, route: '/groups' },
  { label: 'Timetable', icon: Calendar, route: '/timetable' },
  { label: 'Account', icon: User, route: '/account' },
];

// Admin-specific items
const adminNavItems = [
  { label: 'Admin Console', icon: Shield, route: '/admin' },
  { label: 'Manage Users', icon: Users, route: '/admin/users' },
  { label: 'System Settings', icon: Settings, route: '/admin/settings' },
];

// Resolve nav items
const navItems = computed(() => {
  const role = currentUser.value?.role || props.userRole;
  return role === 'admin' 
    ? adminNavItems 
    : sharedNavItems.map(item => ({
        ...item,
        route: typeof item.route === 'object' ? item.route[role] : item.route
      }));
});

// State management
const isCollapsed = ref(false);
const showCourseNav = ref(false);
const selectedCourse = ref(null);

// Course data
const courses = ref([
  { id: 'cs-101', name: 'CS 101' },
  { id: 'ai-210', name: 'AI 210' },
  { id: 'oop-101', name: 'OOP 101' },
  { id: 'csp-210', name: 'CSP 210' }
]);

// Course pages with route names matching your router
const coursePages = ref([
  { name: 'Home', routeName: 'CourseHome' },
  { name: 'Announcements', routeName: 'CourseAnnouncements' },
  { name: 'Modules', routeName: 'CourseModules' },
  { name: 'Assignments', routeName: 'CourseAssignments' },
  { name: 'Grades', routeName: 'CourseGrades' }
]);

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
  // Navigate to the course's home page
  router.push({
    name: 'CourseHome',
    params: { courseId: course.id }
  });
};
</script>

<style scoped>
/* Main sidebar styling */

/* Remove underlines from all links */
a {
  color: #212121 !important;
  text-decoration: none;
}

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
  position: relative;
  left: -12px;
  width: calc(100% - 16px);
  color: #212121;
  transition: color 0.2s ease;
}

/* Hover state for navigation items */
.nav-item:hover {
  border-radius: 10px;
  background-color: rgba(236, 236, 236, 0.831);
  color: #212121; 
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
  margin-left: 0; /* Remove extra left margin */
  padding-left: 8px; /* Add some padding instead */
}

/* Make course nav items consistent with main nav items */
.course-nav-item {
  padding: 12px 16px; /* Match main nav padding */
  margin: 4px 0; /* Consistent vertical spacing */
  margin-left: 0; /* Remove negative margin */
  color: #212121;
  cursor: pointer;
  border-radius: 6px;
  display: flex; /* Match main nav layout */
  align-items: center; /* Center items vertically */
  transition: all 0.2s ease; /* Smooth transitions */
  width: 100%; /* Full width */
}

/* Active state for course pages */
.active-course-item,
.active-course-item:hover {
  background-color: white;
  color: #1f2937;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border-radius: 6px;
  font-weight: 500;
  transform: translateX(-4px); /* Match main nav active state */
}

/* Back button styling */
.course-nav-item.font-semibold {
  padding-left: 12px; /* Slightly more padding for back button */
  margin-bottom: 8px; /* Extra space below back button */
}
</style>