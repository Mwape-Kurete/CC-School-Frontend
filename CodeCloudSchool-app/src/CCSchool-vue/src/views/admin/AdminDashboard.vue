<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <div class="admin-cards">
      <div class="card">
        <h3>User Management</h3>
        <router-link to="/admin/users">Go to Users</router-link>
      </div>
      <div class="card">
        <h3>System Settings</h3>
        <router-link to="/admin/settings">Configure System</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Admin-specific logic will go here
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
}
.card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
}
</style>