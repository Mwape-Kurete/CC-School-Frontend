<template>
  <main class="min-h-screen flex items-center justify-center p-4">
    <!-- Login Layout -->
    <div
      v-if="isLogin"
      class="w-full max-w-6xl rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
    >
      <!-- Form Section -->
      <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <slot name="login-form"></slot>
      </div>

      <!-- Carousel Section -->
      <div class="w-full md:w-1/2 flex items-center justify-center p-8">
        <Carousel
          :value="carouselItems"
          :circular="true"
          :autoplayInterval="3000"
          class="w-full max-w-md"
        >
          <template #item="slotProps">
            <div class="text-center text-white p-4">
              <i :class="slotProps.data.icon" class="text-5xl mb-4"></i>
              <h3 class="text-2xl font-bold mb-2">{{ slotProps.data.title }}</h3>
              <p class="opacity-90">{{ slotProps.data.content }}</p>
            </div>
          </template>
        </Carousel>
      </div>
    </div>

    <!-- Registration Layout -->
    <div
      v-else
      class="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
    >
      <!-- Carousel Section -->
      <div
        class="w-full md:w-1/2 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center p-8 order-1 md:order-2"
      >
        <Carousel
          :value="carouselItems"
          :circular="true"
          :autoplayInterval="3000"
          class="w-full max-w-md"
        >
          <template #item="slotProps">
            <div class="text-center text-white p-4">
              <i :class="slotProps.data.icon" class="text-5xl mb-4"></i>
              <h3 class="text-2xl font-bold mb-2">{{ slotProps.data.title }}</h3>
              <p class="opacity-90">{{ slotProps.data.content }}</p>
            </div>
          </template>
        </Carousel>
      </div>

      <!-- Form Section -->
      <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
        <slot name="registration-form"></slot>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import Carousel from 'primevue/carousel'

const props = defineProps({
  isLogin: {
    type: Boolean,
    default: true,
  },
})

const carouselItems = ref([
  {
    title: 'Welcome Back!',
    content: 'Login to access your personalized dashboard and continue your journey with us.',
    icon: 'pi pi-user',
  },
  {
    title: 'Stay Secure',
    content: 'Your security is our top priority. All your data is encrypted and protected.',
    icon: 'pi pi-shield',
  },
  {
    title: '24/7 Support',
    content: 'Our team is always ready to help you with any questions or issues.',
    icon: 'pi pi-headset',
  },
])
</script>
