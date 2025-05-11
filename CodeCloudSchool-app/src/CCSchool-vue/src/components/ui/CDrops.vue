<template>
  <Dropdown
    v-model="internalValue"
    :options="processedOptions"
    :optionLabel="optionLabel"
    :optionValue="optionValue"
    :placeholder="placeholder"
    :filter="filter"
    :disabled="disabled"
    :class="[
      'cc-dropdown',
      `cc-dropdown--${type}`,
      `cc-dropdown--${size}`,
      { 'is-disabled': disabled },
    ]"
    v-bind="$attrs"
  >
    <!-- Slot for custom option templates -->
    <template #option="slotProps">
      <slot name="option" v-bind="slotProps">
        {{ slotProps.option[optionLabel] || slotProps.option }}
      </slot>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Dropdown from 'primevue/dropdown'

const props = defineProps({
  modelValue: { type: [String, Number, Object, Array], required: true },
  options: { type: Array, required: true },
  type: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'tertiary', 'danger', 'ghost'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  optionLabel: { type: String, default: 'label' },
  optionValue: { type: String, default: 'value' },
  placeholder: { type: String, default: 'Select...' },
  filter: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  // Allows simple string arrays to be passed
  simpleOptions: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const processedOptions = computed(() => {
  if (props.simpleOptions) {
    return props.options.map((opt) => ({
      [props.optionLabel]: opt,
      [props.optionValue]: opt,
    }))
  }
  return props.options
})
</script>
