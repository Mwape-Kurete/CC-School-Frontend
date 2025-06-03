<script setup>
import { ref } from 'vue'

// Props for header and items
const props = defineProps({
  header: {
    type: String
  },
  items: {
    type: Array,
    default: () => [
      { title: 'STUDY GUIDE 2025' },
      { title: 'SEMESTER OVERVIEW' }
    ]
  },
  initiallyOpen: {
    type: Boolean,
    default: true
  }
})

const isOpen = ref(props.initiallyOpen)
</script>

<template>
  <div class="accordion-card">
    <div class="accordion-header" @click="isOpen = !isOpen">
      <span :class="['arrow', { open: isOpen }]">▾</span>
      <span class="header-text">{{ header }}</span>
    </div>

    <div v-if="isOpen" class="accordion-content">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="accordion-item"
      >
        <div class="circle-icon" />
        <div class="item-title">{{ item.title }}</div>
        <div v-if="index < items.length - 1" class="divider"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-card {
  width: 100%;
  /* max-width: 600px; */
  border-radius: 12px;
  overflow: hidden;
  background-color: #f7f7f7;
  font-family: 'Segoe UI', sans-serif;
  margin: 1rem auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.accordion-header {
  background-color: #D8DFE9;
  padding: 1rem;
  font-weight: 500;
  color: #2e2e2e;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.arrow {
  transition: transform 0.3s ease;
  display: inline-block;
  font-size: 0.9rem;
}

.arrow.open {
  transform: rotate(0deg);
}

.arrow:not(.open) {
  transform: rotate(-90deg);
}

.accordion-content {
  padding: 1rem;
  background-color: #fafafa;
}

.accordion-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

.accordion-item:hover{
  cursor: pointer;
}

.circle-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #D0DFCC;
  margin-right: 1rem;
  flex-shrink: 0;
}

.item-title {
  font-size: 0.9rem;
  color: #666;
  flex-grow: 1;
}

.divider {
  height: 1px;
  background-color: #ddd;
  margin-top: 0.5rem;
  margin-left: 2.2rem;
}
</style>
