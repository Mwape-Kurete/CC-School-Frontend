<script setup lang="ts">
import LecturerKnob from '@/components/LecturerKnob.vue'
import ToDoComp from '@/components/ToDoComp.vue'
import CreateModuleAssignmentForm from '@/components/CreateModuleAssignmentForm.vue'
</script>

<template>
  <div class="dashboard-container">
    <!-- Main Content Area -->
    <!-- Your main dashboard content -->
    <div class="content-section">
      <!-- Add more components/content as needed -->
      <h1 class="ps-header pt-0">Announcements</h1>
      <CreateModuleAssignmentForm variant="announcement" />

      <hr />

      <h1 class="ps-header pt-5">This Weeks Schedule</h1>
    </div>

    <!-- Right Side Panel -->
    <aside class="side-panel">
      <div class="panel-content">
        <h3 class="text-center">Class Analytics</h3>
        <!-- Additional panel components can go here -->
        <div class="panel-section">
          <!-- Activity content -->
          <LecturerKnob />
          <ToDoComp />
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.dashboard-view {
  padding: 2rem;
}
.dashboard-container {
  display: grid;
  grid-template-columns: 1fr 300px; /* Main content takes remaining space, aside fixed at 300px */
  gap: 2rem;
  min-height: 100vh;
  padding: 2rem;
}

.pa-header {
  margin-top: -1.5rem;
  padding-top: -1.5rem;
}
.side-panel {
  border-left: 1px solid #e5e7eb;
  padding-left: 2rem;
}

.panel-content {
  position: sticky;
  top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Responsive behavior */
@media (max-width: 1024px) {
  .dashboard-container {
    grid-template-columns: 1fr;
  }

  .side-panel {
    border-left: none;
    border-top: 1px solid #e5e7eb;
    padding-left: 0;
    padding-top: 2rem;
  }
}

/* Additional styling as needed */
.content-section {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.panel-section {
  background: white;
  padding: 2rem;
  width: 100%;

  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}
</style>
