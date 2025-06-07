<script setup>
import { computed } from 'vue'

// Take the name as a prop
const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

// DiceBear style
const style = 'bottts'

// Generate avatar URL
const avatarUrl = computed(() => {
  const seed = encodeURIComponent(props.name.trim() || 'default')
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`
})
</script>

<template>
  <img :src="avatarUrl" :alt="`Avatar for ${props.name}`" class="w-16 h-16 rounded-full " />
</template>

<style scoped>
img {
  object-fit: cover;
}
</style>
