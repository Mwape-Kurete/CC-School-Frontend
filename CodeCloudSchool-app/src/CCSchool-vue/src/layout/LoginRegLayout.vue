<script setup>
import { ref, computed } from 'vue'
import TempCarousel from '@/components/TempCarousel.vue'

const props = defineProps({
  pageType: String,
})

const renderLogin = computed(() => props.pageType === 'login')
</script>

<template>
  <div class="grid-container">
    <!-- Single grid layout with conditional column order -->
    <div class="grid-item carousel-column" :class="{ 'order-last': !renderLogin }">
      <TempCarousel />
    </div>
    <div class="grid-item form-column" :class="{ 'order-first': !renderLogin }">
      <div class="form-wrapper">
        <slot>{{ pageType }}</slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

/* Column ordering */
.carousel-column.order-last {
  order: 2;
}
.form-column.order-first {
  order: 1;
}

/* Centering the form */
.form-wrapper {
  width: 100%;
  height: 100%;
  padding: 1.5rem 1.25rem;
  margin: 0 auto;
  background-color: white;
  border-radius: 15px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* Hide carousel on mobile */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
  .carousel-column {
    display: none;
  }

  /* Reset ordering on mobile */
  .carousel-column.order-last,
  .form-column.order-first {
    order: initial;
  }
}
</style>
