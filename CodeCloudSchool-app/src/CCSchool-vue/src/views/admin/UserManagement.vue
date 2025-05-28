<template>
  <div class="user-management">
    <h1>User Management</h1>
    <div class="controls">
      <button @click="addUser">+ Add User</button>
    </div>
    <div class="user-list">
      <p>User list will appear here</p>
    </div>
  </div>
</template>

<script setup>
const addUser = () => {
  // TODO: Implement user creation
  console.log("Add user clicked");
};
</script>