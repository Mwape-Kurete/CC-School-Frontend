<script setup lang="ts">
// You can add component logic here later
</script>

<template>
  <ThreeColumnLayout>
    <div>
      <h1 class="text-3xl font-bold mb-4">This is the Lecturer dashboard</h1>
    </div>

    <template #aside>
      <div>
        <h3>Widget Panel</h3>
        <!--grade knob & to do go here-->
      </div>
    </template>
  </ThreeColumnLayout>
</template>

<style scoped>
/* Add component-specific styles here if needed */
.dashboard-view {
  padding: 2rem;
}
</style>
