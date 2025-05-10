<script setup>
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 16,
  },
  color: String,
  strokeWidth: {
    type: Number,
    default: 2,
  },
})

const iconComponent = computed(() => {
  // Convert kebab-case to PascalCase if needed
  const iconName = props.name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  return LucideIcons[iconName] || fallbackComponent
})

const fallbackComponent = {
  template: '<span class="icon-fallback"></span>',
}
</script>

<template>
  <component
    :is="iconComponent"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    class="icon"
  />
</template>

<style>
.icon-fallback {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-color: currentColor;
  border-radius: 50%;
  opacity: 0.2;
}
</style>
