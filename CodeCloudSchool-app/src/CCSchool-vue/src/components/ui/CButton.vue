<template>
  <div
    class="c-button-wrapper"
    :class="{ 'has-icon': icon && !loading }"
    @mouseenter="startDrip"
    @mouseleave="resetDrip"
  >
    <button
      :class="[
        'c-button',
        `c-button--${type}`,
        `c-button--${size}`,
        { 'is-disabled': disabled || loading },
        { 'btn-icon': icon },
      ]"
      :disabled="disabled || loading"
      @click="handleClick"
    >
      <span v-if="loading" class="c-button__loader" />
      <span class="c-button__label">
        <slot />
      </span>

      <!-- Droplet effect container -->
      <span v-if="icon && !loading" class="c-button__droplet-anchor">
        <span class="c-button__droplet" :style="dropletStyle"></span>
      </span>
    </button>

    <!-- Icon circle -->
    <span v-if="icon && !loading" class="c-button__icon-circle">
      <Icon v-if="typeof icon === 'string'" :name="icon" class="c-button__icon" />
      <component v-else :is="icon" class="c-button__icon" />
    </span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Icon from './Icons.vue' // Your icon wrapper component

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
  icon: {
    type: [String, Object],
    default: null,
    validator: (value) => {
      if (typeof value === 'string') return true // Any string allowed
      return value !== null // Allow component objects
    },
  },
  loading: Boolean,
  disabled: Boolean,
})

const emit = defineEmits(['click'])

const dripProgress = ref(0)

const dropletStyle = computed(() => ({
  transform: `scale(${0.5 + dripProgress.value * 0.5})`,
  opacity: dripProgress.value,
}))

function handleClick(e) {
  if (props.disabled || props.loading) return
  emit('click', e)
}

function startDrip() {
  if (!props.icon) return

  const duration = 300
  const start = Date.now()

  const animate = () => {
    const elapsed = Date.now() - start
    dripProgress.value = Math.min(elapsed / duration, 1)
    if (dripProgress.value < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

function resetDrip() {
  dripProgress.value = 0
}
</script>

<style scoped>
.c-button-wrapper {
  display: inline-flex;
  align-items: center;
  position: relative;

  &.has-icon {
    padding-right: 2rem; /* Space for icon */
  }
}

.c-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &.btn-icon {
    padding-right: 1.5rem; /* Extra space for droplet */
  }
}

/* Droplet effect */
.c-button__droplet-anchor {
  position: absolute;
  right: -0.5rem;
}

.c-button__droplet {
  display: block;
  width: 1rem;
  height: 1rem;
  background: currentColor;
  border-radius: 50%;
  transform-origin: center;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Icon circle */
.c-button__icon-circle {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: currentColor;
  border-radius: 50%;
  color: white;
  z-index: 1;
}

.c-button__icon {
  width: 1rem;
  height: 1rem;
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
