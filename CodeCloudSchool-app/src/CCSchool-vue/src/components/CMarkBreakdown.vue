<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="listG-container">
    <div v-for="(group, index) in items" :key="index" class="list-group">
      <div class="list-group-header">
        <h2 class="list-main">{{ group.title }}</h2>
        <p class="listG-mark">{{ group.mark }}</p>
      </div>

      <div v-for="(entry, i) in group.items" :key="i" class="list-Gs">
        <p class="listG-descript">{{ entry.description }}</p>
        <p class="listG-mark">{{ entry.mark }}</p>
      </div>

      <div v-if="index < items.length - 1" class="divider" />
    </div>
  </div>
</template>

<style scoped>
.listG-container {
  padding: 1rem;
  width: 95%;
  margin: auto;
  color: #333;
}

.list-group {
  margin-bottom: 2rem;
}

.list-group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.list-main {
  font-size: 1rem;
  font-weight: 600;
}

.list-Gs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.listG-descript {
  font-size: 0.95rem;
}

.listG-mark {
  font-size: 0.95rem;
  font-weight: 500;
  color: #666;
}

.divider {
  border-bottom: 1px solid #ddd;
  margin-top: 1.5rem;
}
</style>
