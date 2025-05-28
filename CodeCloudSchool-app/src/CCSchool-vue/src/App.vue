<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Base layout styles */
.app-container {
  display: flex;
  min-height: 100vh;
  width: 85vw;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  /*Match navbar width*/
  padding: 2rem;
}
</style>
