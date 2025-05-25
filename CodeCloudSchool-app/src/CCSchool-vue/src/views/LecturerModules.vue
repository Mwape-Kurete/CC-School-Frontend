<script setup>
import { ref } from 'vue'
import AccordionCard from '@/components/AccordionCard.vue'
import CDropdown from '@/components/ui/CDropdown.vue'
import CButtonIcon from '@/components/ui/CButton-icon.vue'
import { PlusCircleIcon } from 'lucide-vue-next'

const selectedOption = ref(null)
</script>

<template>
  <div class="modules-header">
    <div class="left-aligned">
      <h1>Modules You've Set</h1>
    </div>
    <div class="right-aligned">
      <CDropdown
        v-model="selectedOption"
        :options="['Student View', 'Lecturer View', 'Unpublished']"
        simple-options
        placeholder="Student View"
        type="primary"
        size="md"
      />
      <CButtonIcon
        class="btn-icon-custom"
        type="primary"
        size="sm"
        :disabled="true"
        btnIconLabel="Create New Module"
      >
        <template #icon>
          <PlusCircleIcon />
        </template>
      </CButtonIcon>
    </div>
  </div>

  <div class="card-con">
    <AccordionCard header="OVERVIEW" />
    <AccordionCard
      header="Week 1: Introduction and Briefing"
      :items="[{ title: 'Week 1: Theory' }, { title: 'Week 1: Practical' }]"
    />
    <AccordionCard
      header="Week 2: Introduction to C# and Dotnet"
      :items="[{ title: 'Week 2: Theory' }, { title: 'Week 2: Practical' }]"
    />
    <AccordionCard
      header="Week 3: Design Architecture and Patterns"
      :items="[
        { title: 'Week 3: Theory' },
        { title: 'Week 3: Practical' },
        { title: 'Progress Assesment 1' },
      ]"
    />
    <AccordionCard
      header="Week 4: Database Integration"
      :items="[{ title: 'Week 4: Theory' }, { title: 'Week 4: Practical' }]"
    />
  </div>
</template>

<style scoped>
.modules-header {
  display: flex;
  flex-direction: row;
  gap: 40%;
}

.right-aligned {
  align-self: flex-end;
  display: flex;
  justify-content: row;
  gap: 1rem;
}

.btn-icon-custom {
  width: 40%;
  height: inherit;
}

.card-con {
  display: flex;
  justify-content: center;
  padding-left: 5%;
  padding-right: 5%;
  flex-direction: column;
}
</style>
