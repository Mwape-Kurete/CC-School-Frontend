<script setup lang="ts">

</script>

<template>
  <div class="course-home">
    <h1>{{ courseId }} - Home</h1>
    <!-- Your course home content here -->
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const courseId = route.params.courseId;
</script>