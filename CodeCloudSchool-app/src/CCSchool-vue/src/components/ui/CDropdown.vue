<template>
  <div class="cc-dropdown-wrapper" :class="{ open: isOpen }">
    <!-- Native <select> dropdown with styling -->
    <select
      v-model="internalValue"
      :disabled="disabled"
      @focus="isOpen = true"
      @blur="isOpen = false"
      :class="[
        'cc-dropdown',
        `cc-dropdown--${type}`,
        `cc-dropdown--${size}`,
        { 'is-disabled': disabled },
      ]"
      v-bind="$attrs"
    >
      <!-- Optional placeholder -->
      <option :value="null" disabled>{{ placeholder }}</option>

      <!-- Dynamically generated options -->
      <option
        v-for="(option, index) in processedOptions"
        :key="index"
        :value="option?.[optionValue]"
      >
        {{ option?.[optionLabel] ?? option }}
      </option>
    </select>

    <!-- Chevron icon that rotates when dropdown is open -->
    <ChevronDown class="cc-chevron" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

// Define option shape
interface SelectOption {
  [key: string]: any
}

// Props definition
const props = defineProps<{
  modelValue: string | number | object | null
  options: SelectOption[]
  optionLabel?: string
  optionValue?: string
  placeholder?: string
  type?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  simpleOptions?: boolean
}>()

// Emit event to update v-model
const emit = defineEmits(['update:modelValue'])

// Track dropdown open state for animation
const isOpen = ref(false)

// v-model computed binding
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// Process options based on `simpleOptions` flag
const processedOptions = computed(() => {
  if (props.simpleOptions) {
    return props.options.map((opt) => ({
      [props.optionLabel || 'label']: opt,
      [props.optionValue || 'value']: opt,
    }))
  }
  return props.options
})

// Defaults
const optionLabel = props.optionLabel || 'label'
const optionValue = props.optionValue || 'value'
const placeholder = props.placeholder || 'Select an option'
const type = props.type || 'primary'
const size = props.size || 'md'
const disabled = props.disabled || false
</script>

<style lang="scss" scoped>
@use '../../assets/styles/components/dropdowns' as *;

.cc-dropdown-wrapper {
  position: relative;
  display: inline-block;

  // Ensure the select looks like a custom dropdown
  select.cc-dropdown {
    appearance: none; // Hide native arrow
    width: 100%;
    padding-right: 2.5rem; // Make space for the chevron inside
    box-sizing: border-box;
  }

  .cc-chevron {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%) rotate(0deg);
    pointer-events: none;
    transition: transform 0.3s ease;
    width: 1rem;
    height: 1rem;
    color: currentColor;
  }

  // 👇 Rotate when the dropdown is focused
  &.open .cc-chevron {
    transform: translateY(-50%) rotate(180deg);
  }
}
</style>
