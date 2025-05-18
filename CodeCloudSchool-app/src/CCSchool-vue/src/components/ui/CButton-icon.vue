<template>
  <div class="button-wrapper">
    <button class="pill-button">Upload Semester Brief</button>

    <span class="connector" />

    <div class="icon-wrapper">
      <Pencil size="16" />
    </div>
  </div>
</template>

<script setup>
import { Pencil } from 'lucide-vue-next'
</script>

<style scoped>
.button-wrapper {
  display: inline-flex;
  align-items: center;
  position: relative;
  background-color: inherit; /* Inherit parent background */
  border-radius: 9999px;
  padding: 0.25rem 1rem 0.25rem 1.25rem;
  color: #444;
  font-weight: 500;
  height: 3rem;
  transition: background-color 0.3s ease;
}

.pill-button {
  background-color: transparent;
  border: none;
  font-size: 1rem;
  color: inherit;
  cursor: pointer;
  padding: 0;
  margin: 0;
  font-weight: 500;
}

.connector {
  width: 1.25rem;
  height: 0.5rem;
  background-color: inherit;
  flex-shrink: 0;
  margin: 0 0.25rem;
  border-radius: 0 999px 999px 0;
}

.icon-wrapper {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background-color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s ease;
  color: inherit;
  box-shadow: 0 0 0 2px white; /* optional if placed on colored background */
}

.button-wrapper:hover .icon-wrapper {
  transform: scale(1.1);
}
</style>
