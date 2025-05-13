<template>
  <div class="p-6 space-y-4">
    <h2 class="text-xl font-bold mb-4">CButton Variants</h2>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="space-y-2">
        <p class="font-medium">Primary</p>
        <CButton type="primary">Primary</CButton>
        <br />
        <CButton type="primary" :loading="true">Loading</CButton>
        <br />
        <CButton type="primary" :disabled="true">Disabled</CButton>
      </div>

      <div class="space-y-2">
        <p class="font-medium">Secondary</p>
        <CButton type="secondary">Secondary</CButton>
        <br />
        <CButton type="secondary" :loading="true">Loading</CButton>
        <br />
        <CButton type="secondary" :disabled="true">Disabled</CButton>
      </div>

      <div class="space-y-2">
        <p class="font-medium">Ghost</p>
        <CButton type="ghost">Ghost</CButton>
        <br />
        <CButton type="tertiary">Tertiary</CButton>
        <br />
        <CButton type="danger">Warning</CButton>
      </div>
      <div class="space-y-2">
        <p>
          <CButton type="tertiary"> Show </CButton>
        </p>
        <div space-y-2>
          <CButton type="primary" size="sm">Small</CButton>
          <br />
          <CButton type="primary" size="md">Medium</CButton>
          <br />
          <CButton type="primary" size="lg">Large</CButton>
          <br />
        </div>
        <!-- Dropdown Examples -->
        <div class="space-y-2">
          <p class="font-medium">Dropdown Examples</p>
          <CDropdown
            v-model="selectedFruit"
            :options="['Apple', 'Banana', 'Orange']"
            simple-options
            placeholder="Choose a fruit"
            type="primary"
          />
          <p>Selected: {{ selectedFruit }}</p>

          <CDropdown
            v-model="selectedItem"
            :options="complexOptions"
            :optionLabel="'name'"
            :optionValue="'id'"
            placeholder="Choose an item"
            type="secondary"
          />
          <p>Selected ID: {{ selectedItem }}</p>
        </div>
        <!--Icon Btn Examples-->
        <div class="space-y-2">
          <IconButton type="primary" size="md" @click="onButtonClick">
            Click Me
            <template #icon-slot>
              <Pencil />
            </template>
          </IconButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CButton from '@/components/ui/CButton.vue'
import CDropdown from '@/components/ui/CDropdown.vue'
import IconButton from '@/components/ui/CButton-icon.vue'
import { Pencil } from 'lucide-vue-next'

// Reactive state
const selectedFruit = ref(null)
const selectedItem = ref(null)

const complexOptions = ref([
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' },
  { id: 3, name: 'Item Three' },
])

const onButtonClick = () => {
  console.log('Button clicked')
}
</script>

<style>
.dropdown-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>
