<template>
  <div class="c-button-icon-wrapper">
    <button
      :class="[
        'c-button-icon',
        `c-button-icon--${type}`,
        `c-button-icon--${size}`,
        { 'is-disabled': disabled || loading },
      ]"
      :disabled="disabled || loading"
      @click="handleClick"
    >
      <span v-if="loading" class="c-button-icon__loader" />
      <span class="c-button-icon__label">
        <slot />
      </span>
    </button>

    <!-- Connector Line -->
    <span class="c-connector" :class="{ active: isHovered }" />

    <!-- Icon Slot -->
    <span class="icon-container">
      <slot name="icon-slot" />
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'secondary', 'tertiary', 'danger', 'ghost', 'icon'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  loading: Boolean,
  disabled: Boolean,
})

const emit = defineEmits(['click'])

const isHovered = ref(false)

function handleClick(e) {
  if (props.disabled || props.loading) return
  emit('click', e)
}
</script>

<style scoped>
.c-button-icon-wrapper {
  display: inline-flex;
  align-items: center;
  position: relative;
  gap: 0.5rem;
}
.c-button-icon-wrapper:hover .c-connector {
  opacity: 1;
  transform: scaleX(1);
  transition:
    transform 400ms cubic-bezier(0.68, -0.55, 0.27, 1.55),
    opacity 300ms ease;
}

/* Main Button Styles */
.c-button-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding-right: 2.5rem;
}

.c-button-icon__label {
  display: inline-block;
}

/* Loading Spinner */
.c-button-icon__loader {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Connector Line with “Plop” effect */
.c-connector {
  width: 1rem;
  height: 2px;
  background-color: currentColor;
  transform: scaleX(0);
  opacity: 0;
  transform-origin: left center;
  transition:
    transform 300ms ease-out,
    opacity 200ms ease-out;
}

/* Icon Container */
.icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #212121;
  color: white;
  font-size: 0.875rem;
}

/* Disabled State */
.is-disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

/* Spinner Animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
