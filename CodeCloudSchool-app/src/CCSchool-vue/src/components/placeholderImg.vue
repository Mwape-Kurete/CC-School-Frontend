<script setup lang="ts">
import { getRandomGradient } from '@/utils/colourUtils'

defineProps<{ imageUrl?: string }>()
const fallbackStyle = {
  background: getRandomGradient(),
}
</script>

<template>
  <div class="img-holder" :style="!imageUrl ? fallbackStyle : {}">
    <img v-if="imageUrl" :src="imageUrl" alt="Image" />
  </div>
</template>

<style scoped>
.img-holder {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
