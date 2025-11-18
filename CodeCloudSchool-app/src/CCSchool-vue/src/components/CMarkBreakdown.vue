<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

//auto calculate
const computePercentage = (entryMark, totalMark) => {
  const entry = parseFloat(entryMark)
  const total = parseFloat(totalMark)
  if (isNaN(entry) || isNaN(total) || total === 0) return '0%'
  return `${((entry / total) * 100).toFixed(1)}%`
}

const sumItems = (items) => {
  return items.reduce((acc, item) => {
    const mark = parseFloat(item.mark)
    return isNaN(mark) ? acc : acc + mark
  }, 0)
}

const hasMismatch = (group) => {
  const total = parseFloat(group.mark)
  const itemSum = sumItems(group.items)
  return Math.abs(itemSum - total) > 0.01
}
</script>

<template>
  <div class="listG-container">
    <div v-for="(group, index) in items" :key="index" class="list-group">
      <div class="list-group-header">
        <h2 class="list-main">{{ group.title }}</h2>
        <p class="listG-mark">{{ group.mark }}%</p>
      </div>

      <div v-for="(entry, i) in group.items" :key="i" class="list-Gs">
        <p class="listG-descript">{{ entry.description }}</p>
        <p class="listG-mark">{{ computePercentage(entry.mark, group.mark) }}</p>
      </div>

      <p v-if="hasMismatch(group)" class="text-red-500 text-xs mt-2 ml-2">
        ⚠️ Total of subtasks ({{ sumItems(group.items).toFixed(1) }}%) doesn't match
        {{ group.mark }}%
      </p>

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
