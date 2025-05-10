<template>
  <button
    :class="[
      'c-button',
      `c-button--${type}`,
      `c-button--$size`,
      { 'is-disabled': disabled || loading },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="c-button__loader" />
    <template v-else-if="icon">
      <span class="k-button__icon">
        <component :is="icon" />
      </span>
      <span class="c-button__droplet" />
    </template>

    <span class="c-button__label">
      <slot />
    </span>
    <slot />
  </button>
</template>

<script>
export default {
  name: 'CButton',
  props: {
    type: { type: String, default: 'primary' },
    size: { type: String, default: 'md' },
    icon: { type: [Object, Function], default: null },
    loading: Boolean,
    disabled: Boolean,
  },
  methods: {
    handleClick(e) {
      if (this.disabled || this.loading) return
      this.$emit('click', e)
    },
  },
}
</script>

<style scoped>
.c-button__loader {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.c-button__icon {
  display: inline-flex;
  align-items: center;
  margin-right: 0.25rem;
}

.c-button__droplet {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.5rem;
  background-color: currentColor;
  border-radius: 50%;
  display: inline-block;
}

.c-button__label {
  vertical-align: middle;
}
</style>
