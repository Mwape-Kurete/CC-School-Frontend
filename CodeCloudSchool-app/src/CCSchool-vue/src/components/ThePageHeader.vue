<template>
  <header class="temp-header">
    <div class="left">
      <h1 class="app-title">Code & Cloud School Main Page Layout</h1>
    </div>
    <div class="right">
      <span class="user-placeholder">👤 User</span>
    </div>
  </header>
</template>

<script setup>
// Temporary header – replace with actual AppHeader component when ready
</script>

<style scoped>
.temp-header {
  color: #212121;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  border-radius: 30px;
  margin-top: 0px;
  margin-bottom: 1.2rem;
}

.app-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.user-placeholder {
  font-size: 0.95rem;
  opacity: 0.85;
}
</style>
