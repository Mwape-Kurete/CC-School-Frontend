<template>
  <select
    v-model="internalValue"
    :disabled="disabled"
    :class="[
      'cc-dropdown',
      `cc-dropdown--${type}`,
      `cc-dropdown--${size}`,
      { 'is-disabled': disabled },
    ]"
    v-bind="$attrs"
  >
    <!-- Optional placeholder as a disabled first option -->
    <option :value="null" disabled>{{ placeholder }}</option>

    <!-- Loop through processed options -->
    <option v-for="(option, index) in processedOptions" :key="index" :value="option?.[optionValue]">
      <!-- Fallback to the whole option if label is missing -->
      {{ option?.[optionLabel] ?? option }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// ✅ Define shape of each option object
interface SelectOption {
  [key: string]: any
}

// ✅ Strongly typed props using defineProps generic
const props = defineProps<{
  modelValue: string | number | object | null
  options: SelectOption[]
  optionLabel?: string // e.g., "label" for { label: "Apple", value: "apple" }
  optionValue?: string // e.g., "value"
  placeholder?: string // e.g., "Select an item"
  type?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  simpleOptions?: boolean // allows simple array: ['Apple', 'Banana']
}>()

const emit = defineEmits(['update:modelValue'])

// ✅ Sync the v-model via computed setter/getter
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// ✅ Process options into label/value pairs (when simpleOptions is enabled)
const processedOptions = computed(() => {
  if (props.simpleOptions) {
    return props.options.map((opt) => ({
      [props.optionLabel || 'label']: opt,
      [props.optionValue || 'value']: opt,
    }))
  }
  return props.options
})

// ✅ Set default values if not provided
const optionLabel = props.optionLabel || 'label'
const optionValue = props.optionValue || 'value'
const placeholder = props.placeholder || 'Select an option'
const type = props.type || 'primary'
const size = props.size || 'md'
const disabled = props.disabled || false
</script>

<style scoped lang="scss">
@use '../../assets/styles/components/dropdowns' as *;
</style>
