<template>
  <div class="c-button-wrapper">
    <button :class="[
      'c-button',
      `c-button--${type}`,
      `c-button--${size}`,
      { 'is-disabled': disabled || loading },
    ]" :disabled="disabled || loading" @click="handleClick">
      <span v-if="loading" class="c-button__loader" />
      <span class="c-button__label">
        <slot />
      </span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'tertiary', 'danger', 'ghost'].includes(value),
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

function handleClick(e) {
  if (props.disabled || props.loading) return
  emit('click', e)
}
</script>

<style scoped>
.c-button-wrapper {
  display: inline-flex;
  align-items: center;
}

.c-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

/* Loading spinner */
.c-button__loader {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Disabled state */
.is-disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
