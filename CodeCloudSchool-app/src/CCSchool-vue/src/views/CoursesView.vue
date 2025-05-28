<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const courses = [
  { id: 'cs-101', name: 'CS 101' },
  { id: 'ai-210', name: 'AI 210' },
  { id: 'oop-101', name: 'OOP 101' },
  { id: 'csp-210', name: 'CSP 210' }
]

const navigateToCourse = (courseId: string) => {
  router.push({ name: 'CourseHome', params: { courseId } })
}
</script>

<template>
  <div class="courses-view p-8">
    <h1 class="text-3xl font-bold mb-8">My Courses</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="course in courses" 
        :key="course.id"
        @click="navigateToCourse(course.id)"
        class="course-card p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      >
        <h2 class="text-xl font-semibold mb-2">{{ course.name }}</h2>
        <p class="text-gray-600">Click to view course details</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.course-card{
  border-radius: 20px;
  background-color: #f0f0f0;


}
.course-card:hover {
  background-color: #D0DFCC;
}
</style>