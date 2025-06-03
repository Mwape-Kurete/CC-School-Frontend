<script setup>
import Chip from 'primevue/chip'
import { BadgeMinus } from 'lucide-vue-next'

const props = defineProps({
  toDoItem: String,
  index: Number, // Added index prop for identification
})

const emit = defineEmits(['remove']) // Define custom event

const handleRemove = () => {
  emit('remove', props.index) // Emit event with index when clicked
}
</script>

<template>
  <div class="todo-btn-wrap">
    <div class="todo-chip">
      <Chip class="py-0 pl-2 pr-4 w-16">
        <span class="todo-item">{{ toDoItem }}</span>
      </Chip>
      <div
        class="remove-icon rounded-full"
        @click="handleRemove"
        @keydown.enter="handleRemove"
        tabindex="0"
        role="button"
        aria-label="Remove item"
      >
        <BadgeMinus size="16" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-btn-wrap {
  cursor: pointer;
  margin-bottom: 1rem;
  width: 100%;
}
.todo-chip {
  display: flex;
  align-items: center;
  width: fit-content;
  position: relative;
}

.p-chip.p-component {
  height: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all 0.3s ease;
  padding-right: 1.5rem; /* Initial space */
}

.todo-item {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove-icon {
  background-color: #64748b; /* slategray */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  right: 0;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  color: white;
}

.remove-icon:hover {
  background-color: #ef4444; /* red-500 on hover */
  transform: scale(1.1);
}

.todo-btn-wrap:hover .remove-icon {
  opacity: 1;
  transform: scale(1);
}

/* Focus styles for accessibility */
.remove-icon:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  opacity: 1;
  transform: scale(1);
}
</style>
