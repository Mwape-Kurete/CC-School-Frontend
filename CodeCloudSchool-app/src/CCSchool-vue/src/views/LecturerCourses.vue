<template>
  <div class="lecturer-courses">
    <!-- Header -->
    <div class="Course-header">
      <div class="header-content">
        <h1 class="title">My Courses</h1>
        <div class="controls-container">
          <div class="icon-buttons">
            <button class="icon-button">
              <div class="icon-circle">
                <BellRing :size="16" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="divider"></div>
    </div>

    <!-- Course List -->
    <div class="course-list">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <RouterLink :to="`/lecturer-courses/${course.id}`">
          <div class="course-card-content">
            <h3>{{ course.name }}</h3>
            <p>{{ course.code }}</p>
            <div class="course-meta">
              <span>{{ course.studentCount }} students</span>
              <span>{{ course.moduleCount }} modules</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BellRing } from 'lucide-vue-next';
import { ref } from 'vue';

// Mock data - replace with your API calls
const courses = ref([
  { id: 1, name: 'Computer Science 101', code: 'CS101', studentCount: 45, moduleCount: 8 },
  { id: 2, name: 'Advanced Programming', code: 'CS201', studentCount: 32, moduleCount: 10 },
  { id: 3, name: 'Database Systems', code: 'CS301', studentCount: 28, moduleCount: 6 },
]);
</script>

<style scoped>
/* Use similar styles to your student courses view */
.lecturer-courses {
  padding: 1rem 2rem;
}

.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.course-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.course-card:hover {
  transform: translateY(-4px);
}

.course-card-content {
  padding: 1.5rem;
}

.course-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.course-card p {
  color: #666;
  margin-bottom: 1rem;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.9rem;
}

/* Reuse your existing header styles from CourseHome.vue */
</style>