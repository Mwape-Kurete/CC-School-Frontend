<script setup>
import Divider from 'primevue/divider'
const props = defineProps({
  img: String,
  name: String,
  email: String,
})
</script>

<template>
  <div class="lect-card-foot">
    <div class="lect-image">
      <img :src="img || 'https://via.placeholder.com/100'" alt="lecturer image" />
    </div>
    <Divider layout="vertical" class="lecturer-card-divider" />
    <div class="info-lect-card">
      <h1 class="lect-name">{{ props.name }}</h1>
      <p class="lect-email">
        {{ props.email }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.lect-card-foot {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7rem;
  width: 100%;

  background-color: #f7f6fb;
  padding: 1.5rem;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}

.lect-image > img {
  width: 10rem;
  height: 10rem;
  border-radius: 9999px;
  object-fit: cover;
}

.lecturer-card-divider {
  height: 100px;
}
</style>
