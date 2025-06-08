<template>
  <button
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
    ref="button"
    
    class="keyboard-btn"
  >
    {{ label }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  label: String,
});

const button = ref(null);

const handleClick = () => {
  alert(`${props.label} activated!`);
};

// Ensure button is focusable
onMounted(() => {
  button.value.focus();
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Quicksand:wght@300..700&display=swap');

.keyboard-btn {
  padding: 12px 24px;
  font-size: 16px;
  font-family: "Lexend", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  background-color: white;
  color: #181818;
  border: 1px solid #181818;
  border-radius: 4px;
  cursor: pointer;
}

.keyboard-btn:hover{
  background-color: #181818;
  color: white;
}
.keyboard-btn:focus {
  outline: 3px solid #ff8c00;
}
</style>