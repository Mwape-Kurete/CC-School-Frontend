<template>
  <div
    class="c-icon-button"
    :class="[`c-icon-button--${type}`, `c-icon-button--${size}`, { 'is-disabled': disabled }]"
    :disabled="disabled"
  >
    <button class="c-icon-button__label">{{ btnIconLabel }}</button>

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
  btnIconLabel: {
    type: String,
    default: 'add label',
  },
})
</script>

<style scoped>
.c-icon-button {
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 0.35rem; /* remove double padding */
  width: 100%;
  background-color: #f7f6fb;
  border-radius: 30px;
  color: #212121;
  overflow: hidden;
  transition: background-color 0.3s ease;

  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

/* Label Button (takes full width, inherits bg from c-button) */
.c-icon-button__label {
  flex-grow: 1;
  font-size: 12px !important;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  padding: 0 1rem;
  height: 100%;
  text-align: left;
}

.c-icon-button:hover {
  opacity: 1;
  transform: scaleX(1);

  background-color: #212121;
  color: #f7f6fb;

  cursor: pointer;
}

/* Icon Container */
.c-icon-button__icon {
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: inherit; /* match parent button */
  color: inherit;
  margin-left: 0.5rem;
  transition: transform 0.2s ease;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
}

.c-icon-button:hover .c-icon-button__icon {
  transform: scale(1);
}
</style>
