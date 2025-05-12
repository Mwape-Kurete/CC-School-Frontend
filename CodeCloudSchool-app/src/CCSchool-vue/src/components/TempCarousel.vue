<script setup>
import { ref } from 'vue'

const slides = ['1', '2', '3']
const current = ref(0)

const next = () => {
  current.value = (current.value + 1) % slides.length
}
const prev = () => {
  current.value = (current.value - 1 + slides.length) % slides.length
}
</script>

<template>
  <div class="carousel-container">
    <div class="carousel-slide">
      <p>{{ slides[current] }}</p>
    </div>
    <div class="carousel-controls">
      <button @click="prev">‹</button>
      <button @click="next">›</button>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background-color: #212121;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.carousel-slide {
  font-size: 5rem;
  font-weight: bold;
}

.carousel-controls {
  position: absolute;
  bottom: 1rem;
  display: flex;
  gap: 1rem;
}

button {
  background: none;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.25rem;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
