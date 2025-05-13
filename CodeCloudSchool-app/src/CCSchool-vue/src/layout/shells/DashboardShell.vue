<script setup lang="ts">
import TheMainLayout from '../TheMainLayout.vue'

defineProps<{
  isStudent?: boolean
  sidebarConfig?: 'lecturer' | 'student'
}>()
</script>

<template>
  <TheMainLayout>
    <!-- Header Slot (empty by default) -->
    <template #header>
      <slot name="header"></slot>
    </template>

    <!-- Dynamic Sidebar -->
    <template #sidebar>
      <!--import and replace once done-->
      <!-- <component :is="sidebarConfig === 'lecturer' ? LecturerNav : StudentNav" /> -->
    </template>

    <!-- Main Content Area -->
    <main class="main-container" :class="{ 'lecturer-layout': !isStudent }">
      <!-- Student View -->
      <template v-if="isStudent">
        <div class="content-area">
          <slot name="student-content"></slot>
        </div>
      </template>

      <!-- Lecturer View -->
      <template v-else>
        <div class="content-area">
          <slot name="lecturer-content"></slot>
        </div>
        <aside class="side-panel">
          <slot name="lecturer-tools"></slot>
        </aside>
      </template>
    </main>
  </TheMainLayout>
</template>

<style scoped>
.main-container {
  display: grid;
  height: 100%;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

.lecturer-layout {
  grid-template-columns: minmax(0, 1fr) 300px;
}

.content-area {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.side-panel {
  position: sticky;
  top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
