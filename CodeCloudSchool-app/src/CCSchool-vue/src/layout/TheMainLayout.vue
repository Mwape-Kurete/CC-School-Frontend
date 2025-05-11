<template>
  <!--
    Main Layout Wrapper
    Usage:
    1. Import and wrap your page content
    2. Override #header and #sidebar slots as needed
    3. Default content will show if no slots provided
  -->
  <div class="app-layout h-screen flex flex-col bg-gray-50">
    <!--
      Header Slot
      - Override with your <AppHeader> component
      - Fallback shows placeholder in development
    -->
    <header class="layout-header border-b">
      <slot name="header">
        <!-- Dev-only fallback -->
        <div v-if="isDev" class="p-4 text-center">[TEAM: INSERT HEADER COMPONENT HERE]</div>
      </slot>
    </header>

    <!-- Main Content Area -->
    <div class="layout-body flex flex-1 overflow-hidden">
      <!--
        Sidebar Slot
        - Pass your navigation component here
        - Default empty container shows in dev
      -->
      <aside class="layout-sidebar w-64 flex-shrink-0 border-r bg-white">
        <slot name="sidebar">
          <div v-if="isDev" class="h-full p-4 bg-blue-50">[TEAM: INSERT NAVIGATION HERE]</div>
        </slot>
      </aside>

      <!--
        Main Content Slot
        - Insert page content as default slot
        - Shows instructional fallback when empty
      -->
      <main class="layout-content flex-1 overflow-y-auto p-6 bg-gray-50">
        <slot>
          <!-- Instructional fallback -->
          <div class="h-full flex items-center justify-center">
            <div class="text-center p-8 border-2 border-dashed rounded-lg">
              <h1 class="text-xl font-semibold mb-2">Page Content Area</h1>
              <p class="text-gray-500">Add your content inside the layout component</p>
            </div>
          </div>
        </slot>
      </main>
    </div>
  </div>
</template>

<script setup>
// Show placeholders only in development
const isDev = import.meta.env.MODE === 'development'
</script>

<style scoped>
/* Smooth transitions for layout changes */
.layout-body {
  transition: all 0.2s ease;
}

/*
  Custom scrollbar styling
  - Only applies to main content area
  - Electron-friendly thin track
*/
.layout-content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.layout-content::-webkit-scrollbar-thumb {
  background-color: #d1d5db; /* gray-300 */
  border-radius: 9999px;
}
</style>
