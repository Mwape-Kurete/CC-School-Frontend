<template>
  <div class="course-layout">
    <!-- Optional course header/navigation -->
    <div v-if="$route.params.courseId" class="course-header">
      <h2 class="text-2xl font-bold">{{ $route.params.courseId }}</h2>
      <!-- You could add breadcrumbs or secondary nav here -->
    </div>
    
    <!-- This will render the matched course page component -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

// You can access the courseId anywhere in this layout using:
// route.params.courseId
</script>

<style scoped>
.course-layout {
  @apply p-4;
}
.course-header {
  @apply mb-6 pb-4 border-b border-gray-200;
}
</style>