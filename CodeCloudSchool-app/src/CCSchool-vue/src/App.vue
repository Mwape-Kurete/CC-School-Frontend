<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed, watchEffect, ref, defineAsyncComponent } from 'vue'

//defining layout components async
const layouts = {
  TwoCol: defineAsyncComponent(() => import('@/layout/TheMainLayout.vue')),
  ThreeCol: defineAsyncComponent(() => import('@/layout/ThreeColLayout.vue')),
  LoginReg: defineAsyncComponent(() => import('@/layout/LoginRegLayout.vue')),
}

//fetching the current route
const route = useRoute()

//reactive layout component ref
const layoutComponent = ref(layouts.TwoCol)

//watching for route.meta.layout changes and updating layouyComponent

watchEffect(() => {
  const layoutName = (route.meta.layout as keyof typeof layouts) || 'TwoCol'
  layoutComponent.value = layouts[layoutName] || layouts.TwoCol
})
</script>

<template>
  <component :is="layoutComponent">
    <div class="app-container">
      <!-- Main content area (right side) -->
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </component>
</template>

<style>
/* Base layout styles */
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
