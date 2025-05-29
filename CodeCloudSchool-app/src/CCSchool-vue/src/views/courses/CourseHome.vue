<script setup lang="ts">
import { CourseService } from '@/api/courses'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
import type { Course } from '@/api/courses'; // Make sure this import exists and points to the correct type definition
const course = ref<Course | null>(null);

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
})

</script>

<template>
  <div class="course-home">
    <h1>{{ course?.courseDescription }} - Home</h1>
    <!-- Your course home content here -->
  </div>
</template>

