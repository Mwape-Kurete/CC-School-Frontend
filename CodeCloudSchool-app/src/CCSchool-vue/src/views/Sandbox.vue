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
        <div class="space-y-2">
          <CButton :loading="isSubmitting" type="primary">Submit</CButton>
          <br />
          <CButton :icon="Eye" type="primary">View</CButton>
          <br />
          <CButton :icon="Pencil" type="secondary">Edit</CButton>
          <br />
          <CButton :icon="Maximize2" type="tertiary">Expand</CButton>
        </div>
        <div class="dropdown-grid">
          <DynamicDropdown :options="['Primary']" type="primary" />
          <DynamicDropdown :options="['Secondary']" type="secondary" />
          <DynamicDropdown :options="['Tertiary']" type="tertiary" />
          <DynamicDropdown :options="['Danger']" type="danger" />
          <DynamicDropdown :options="['Ghost']" type="ghost" />
          <DynamicDropdown
            v-model="selectedIndex"
            :options="['Apple', 'Banana', 'Orange']"
            simple-options
            use-index-as-value
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CButton from '@/components/ui/CButton.vue'
import DynamicDropdown from '@/components/ui/CDrops.vue'
import { Eye, Pencil, Maximize2 } from 'lucide-vue-next'

export default {
  components: { CButton },
}
const selectedIndex = ref(0)
</script>

<style>
.dropdown-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>
