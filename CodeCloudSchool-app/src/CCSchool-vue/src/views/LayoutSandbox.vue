<template>
  <MainLayout>
    <!-- Header slot injection -->
    <template #header>
      <div class="p-4 bg-white shadow-sm text-xl font-bold">My Custom App Header</div>
    </template>

    <!-- Sidebar slot injection -->
    <template #sidebar>
      <nav class="p-4 bg-white h-full">
        <ul class="space-y-2 text-gray-700">
          <li><a href="#" class="block px-2 py-1 hover:bg-gray-100 rounded">Dashboard</a></li>
          <li><a href="#" class="block px-2 py-1 hover:bg-gray-100 rounded">Settings</a></li>
          <li><a href="#" class="block px-2 py-1 hover:bg-gray-100 rounded">Profile</a></li>
        </ul>
      </nav>
    </template>

    <!-- Default content slot -->
    <section>
      <h1 class="text-2xl font-semibold mb-4">Welcome to the Layout Sandbox</h1>
      <p class="mb-6 text-gray-600">
        This area demonstrates how to inject content into the layout's main content area.
      </p>

      <!-- Example usage of a custom component -->
      <CButton type="primary" size="md">Try Me</CButton>
      <br /><br />
      <DynamicDropdown
        v-model="selected"
        :options="['Option 1', 'Option 2', 'Option 3']"
        type="secondary"
        size="sm"
        simple-options
      />
    </section>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layout/TheMainLayout.vue'
import CButton from '@/components/ui/CButton.vue'
import DynamicDropdown from '@/components/ui/CDrops.vue'
import { ref } from 'vue'

const selected = ref('')
</script>
