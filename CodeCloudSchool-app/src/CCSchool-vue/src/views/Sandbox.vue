<template>
  <div class="p-6 space-y-4">
    <h2 class="text-xl font-bold mb-4">CButton Variants</h2>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="space-y-2">
        <p class="font-medium">Primary</p>
        <CButton type="primary">Primary</CButton>
        <CButton type="primary" :loading="true">Loading</CButton>
        <CButton type="primary" :disabled="true">Disabled</CButton>
      </div>

      <div class="space-y-2">
        <p class="font-medium">Secondary</p>
        <CButton type="secondary">Secondary</CButton>
        <CButton type="secondary" :loading="true">Loading</CButton>
        <CButton type="secondary" :disabled="true">Disabled</CButton>
      </div>

      <div class="space-y-2">
        <p class="font-medium">Ghost</p>
        <CButton type="ghost">Ghost</CButton>
      </div>
      <div class="space-y-2">
        <p>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#contentId"
            aria-expanded="false"
            aria-controls="contentId"
          >
            Show
          </button>
        </p>
        <div space-y-2>
          <CButton type="primary">Small</CButton>
          <CButton type="primary">Medium</CButton>
          <CButton type="primary">Large</CButton>
        </div>
        <div class="space-y-2">
          <CButton :loading="isSubmitting" type="primary">Submit</CButton>
          <CButton :loading="true" icon="EditIcon" type="secondary">Saving...</CButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CButton from '@/components/ui/CButton.vue'

export default {
  components: { CButton },
}
</script>
