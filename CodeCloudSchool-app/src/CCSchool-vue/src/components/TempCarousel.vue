<script setup>
import { ref } from 'vue'
import CarouselImg1 from '@/assets/login_carousel/Login-Carousel-1.png'
import CarouselImg2 from '@/assets/login_carousel/Login-Carousel-2.png'
import CarouselImg3 from '@/assets/login_carousel/Login-Carousel-3.png'

const slides = [CarouselImg1, CarouselImg2, CarouselImg3]
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
    <div
      class="carousel-slide"
      :style="{ backgroundImage: `url(${slides[current]})` }"
    ></div>

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
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.carousel-slide {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
}

/* Controls */
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
