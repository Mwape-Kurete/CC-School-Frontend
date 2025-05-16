<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="app-container">
    <!-- Main content area (right side) -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Base layout styles */
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
