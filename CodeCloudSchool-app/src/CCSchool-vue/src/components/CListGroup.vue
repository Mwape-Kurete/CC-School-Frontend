<script setup>
import Divider from 'primevue/divider'

defineProps({
  header: String,
  description: String,
  items: {
    type: Array,
    default: () => null,
  },
})
</script>

<template>
  <div class="listG-container">
    <!-- If items are passed, render list -->
    <div
      v-if="items && items.length"
      class="list-group-item"
      v-for="(item, idx) in items"
      :key="idx"
    >
      <h3 class="listG-header">{{ item.header }}</h3>
      <span class="vert-div"></span>
      <p class="listG-description">{{ item.description }}</p>
    </div>
    <!-- Otherwise, fallback to single prop-based content -->
    <div v-else class="list-group-item">
      <h3 class="listG-header">{{ header }}</h3>
      <span class="vert-div"></span>
      <p class="listG-description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.list-group-item {
  display: flex;
  flex-direction: row;

  align-items: center;

  gap: 2rem;
  margin-bottom: 1.5rem;
}

.vert-div {
  height: 1.5rem;
  width: 0.02rem;
  background-color: rgb(66, 66, 66);
}
</style>
