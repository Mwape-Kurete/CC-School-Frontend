<template>
  <div class="course-assignments">
    <h1>{{ courseId }} - Assignments</h1>
    <!-- Your course home content here -->
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const courseId = route.params.courseId;
</script>