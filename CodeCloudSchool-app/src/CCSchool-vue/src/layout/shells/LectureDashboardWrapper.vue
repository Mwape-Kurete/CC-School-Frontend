<script setup lang="ts">
import ThreeColLayout from '@/layout/ThreeColLayout.vue'
import LecturerKnob from '@/components/LecturerKnob.vue'
import LectureDashboardView from '@/views/LectureDashboardView.vue'
</script>

<template>
  <ThreeColLayout>
    <template #default>
      <LectureDashboardView />
    </template>

    <template #aside>
      <LecturerKnob />
    </template>
  </ThreeColLayout>
</template>
