<template>
  <div
    class="c-icon-button"
    :class="[`c-icon-button--${type}`, `c-icon-button--${size}`, { 'is-disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <button class="c-icon-button__label">{{ label }}</button>

    <span class="c-icon-button__connector" />

    <div class="c-icon-button__icon">
      <slot name="icon"><Pencil size="16" /></slot>
    </div>
  </div>
</template>

<script setup>
import { Pencil } from 'lucide-vue-next'

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
  disabled: Boolean,
})

const emit = defineEmits(['click'])

function handleClick(e) {
  if (props.disabled) return
  emit('click', e)
}
</script>

<style scoped>
.c-icon-button {
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 0; /* remove double padding */
  border-radius: 999px;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

/* Label Button (takes full width, inherits bg from c-button) */
.c-icon-button__label {
  flex-grow: 1;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  padding: 0 1rem;
  height: 100%;
  text-align: left;
}

/* Connector - only visible on hover */
.c-icon-button__connector {
  width: 1.5rem;
  height: 0.25rem;
  background-color: currentColor;
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.c-icon-button:hover .c-icon-button__connector {
  opacity: 1;
  transform: scaleX(1);
}

/* Icon Container */
.c-icon-button__icon {
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: inherit; /* match parent button */
  color: inherit;
  margin-left: 0.5rem;
  transition: transform 0.2s ease;
  box-shadow: 0 0 0 2px white; /* optional visual aid */
}

.c-icon-button:hover .c-icon-button__icon {
  transform: scale(1.1);
}
</style>
