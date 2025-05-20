<script setup>
import { ref, watch } from 'vue'

import Knob from 'primevue/knob'
import CDropdown from '@/components/ui/CDropdown.vue'

const selectedView = ref(null)

//changing according to dropdown behaviour

watch(selectedView, (newVal) => {
  if (newVal === 'Grade Average') value.value = 75
  if (newVal === 'Student Attendance') value.value = 90
})
const value = ref(70)
</script>

<template>
  <div class="knob-container">
    <div class="filter-knob">
      <!--filter view component to go here-->
      <CDropdown
        v-model="selectedView"
        :options="['Grade Average', 'Student Attendance']"
        simple-options
        placeholder="Select A View"
        type="secondary"
        size="sm"
      />
    </div>
    <div class="knob-self">
      <Knob v-model="value" valueColor="#212121" :strokeWidth="20" />
    </div>
  </div>
</template>

<style scoped>
.knob-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  column-gap: 5rem;
  border-bottom: 1px solid slategray;
  margin-bottom: 1.5rem;
}

.filter-knob {
  margin-bottom: 1rem;
}
</style>
