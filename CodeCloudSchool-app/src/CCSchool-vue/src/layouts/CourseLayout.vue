<template>
  <div class="course-layout">
    <!-- Optional course header/navigation -->
    <div v-if="$route.params.courseId" class="course-header">
      <!-- <h2 class="text-2xl font-bold">{{ $route.params.courseId }}</h2> -->
      <!-- You could add breadcrumbs or secondary nav here -->
    </div>

    <!-- This will render the matched course page component -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

// You can access the courseId anywhere in this layout using:
// route.params.courseId
</script>

<style scoped>
.course-layout {
  padding: 1rem; /* replaces p-4 */
}
.course-header {
  margin-bottom: 1.5rem; /* replaces mb-6 */
  padding-bottom: 1rem; /* replaces pb-4 */
  border-bottom: 1px solid #e5e7eb; /* replaces border-b border-gray-200 */
}
</style>
