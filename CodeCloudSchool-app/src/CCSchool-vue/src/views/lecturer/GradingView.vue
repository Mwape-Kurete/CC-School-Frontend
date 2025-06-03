<template>
  <div class="grading-view">
    <h1>Grade Submissions</h1>
    <div class="submission-list">
      <div v-for="i in 5" :key="i" class="submission-item">
        <h3>Assignment {{ i }}</h3>
        <input type="number" placeholder="Enter grade" min="0" max="100">
        <button>Save Grade</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.submission-item {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #eee;
}
</style>