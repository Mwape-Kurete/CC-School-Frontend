<script setup>
import CSearch from './ui/CSearch.vue'

const props = defineProps({
  page: String,
})
</script>

<template>
  <header class="temp-header">
    <div class="left">
      <h1 v-if="page === 'dashboard'" class="pageHeader">Dashboard</h1>
      <h1 v-else-if="page === 'lecturer-dashboard'" class="pageHeader">Lecturer Dashboard</h1>
      <h1 v-else-if="page === 'course'" class="pageHeader">Course Overview</h1>
      <h1 v-else-if="page === 'modules'" class="pageHeader">Modules Overview</h1>
      <h1 v-else-if="page === 'groups'" class="pageHeader">Groups Overview</h1>
      <h1 v-else-if="page === 'timetable'" class="pageHeader">Timetable Overview</h1>
      <h1 v-else-if="page === 'history'" class="pageHeader">History Overview</h1>
      <h1 v-else-if="page === 'account'" class="pageHeader">Account Overview</h1>
      <h1 v-else-if="page === 'settings'" class="pageHeader">Settings</h1>
      <h1 v-else-if="page === 'help'" class="pageHeader">How Can We Assist</h1>
    </div>
    <div class="right">
      <div class="search-actions">
        <CSearch />
      </div>
    </div>
  </header>
</template>

<style scoped>
.temp-header {
  color: #212121;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: em 1.5rem;
  border-bottom: 1px solid #c5c5c5;
  margin-top: 0px;
  margin-bottom: 1.2rem;
}

.pageHeader {
  font-size: 36px;
  font-weight: 300;
}

.user-placeholder {
  font-size: 0.95rem;
  opacity: 0.85;
}
</style>
