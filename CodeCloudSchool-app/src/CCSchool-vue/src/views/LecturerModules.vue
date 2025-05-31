<script setup>
import { ref } from 'vue'
import AccordionCard from '@/components/AccordionCard.vue'
import CDropdown from '@/components/ui/CDropdown.vue'
import CButtonIcon from '@/components/ui/CButton-icon.vue'
import { PlusCircleIcon, ArrowUpFromLine } from 'lucide-vue-next'

const selectedOption = ref(null)
</script>

<template>
  <div class="modules-header">
    <div class="right-aligned">
      <CDropdown
        v-model="selectedOption"
        :options="['All', 'Published', 'Unpublished']"
        simple-options
        placeholder="Select"
        type="primary"
        size="sm"
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
    <div v-if="selectedOption === 'All'">
      <h1 class="header-modules-lect">All Modules</h1>
      <div class="published">
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
      <hr />
      <div class="unpublished">
        <h1 class="inner-header">Unpublished Modules</h1>
        <div class="accordion-container">
          <AccordionCard
            header="Week 5: Database management post integration
            +"
            :items="[{ title: 'Week 6: Theory' }, { title: 'Week 6: Practical' }]"
          />
          <CButtonIcon type="secondary" size="lg" :disabled="true" btnIconLabel="Publish Module">
            <template #icon>
              <ArrowUpFromLine />
            </template>
          </CButtonIcon>
        </div>
        <div class="accordion-container">
          <AccordionCard
            header="Week 6: Introduction CI/CD"
            :items="[{ title: 'Week 6: Theory' }, { title: 'Week 6: Practical' }]"
          />
          <CButtonIcon type="secondary" size="lg" :disabled="true" btnIconLabel="Publish Module">
            <template #icon>
              <ArrowUpFromLine />
            </template>
          </CButtonIcon>
        </div>
        <div class="accordion-container">
          <AccordionCard
            header="Week 7: CI/CD Deep Dive"
            :items="[{ title: 'Week 7: Theory' }, { title: 'Week 7: Practical' }]"
          />
          <CButtonIcon type="secondary" size="lg" :disabled="true" btnIconLabel="Publish Module">
            <template #icon>
              <ArrowUpFromLine />
            </template>
          </CButtonIcon>
        </div>
        <div class="accordion-container">
          <AccordionCard
            header="Week 8: Final Submission"
            :items="[{ title: 'Week 8: Theory' }, { title: 'Week 8: Practical' }]"
          />
          <CButtonIcon type="secondary" size="lg" :disabled="true" btnIconLabel="Publish Module">
            <template #icon>
              <ArrowUpFromLine />
            </template>
          </CButtonIcon>
        </div>
      </div>
    </div>

    <div v-else-if="selectedOption === 'Published'">
      <h1 class="header-modules-lect">Published Modules</h1>
      <div class="published">
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
    </div>

    <div v-else-if="selectedOption === 'Unpublished'">
      <h1 class="header-modules-lect">Unpublished Modules</h1>
      <div class="unpublished">
        <div class="accordion-container">
          <AccordionCard
            header="Week 5: Database management post integration
            +"
            :items="[{ title: 'Week 6: Theory' }, { title: 'Week 6: Practical' }]"
          />
          <CButtonIcon type="secondary" size="lg" :disabled="true" btnIconLabel="Publish Module">
            <template #icon>
              <ArrowUpFromLine />
            </template>
          </CButtonIcon>
        </div>
        <div class="accordion-container">
          <AccordionCard
            header="Week 6: Introduction CI/CD"
            :items="[{ title: 'Week 6: Theory' }, { title: 'Week 6: Practical' }]"
          />
          <CButtonIcon type="secondary" size="lg" :disabled="true" btnIconLabel="Publish Module">
            <template #icon>
              <ArrowUpFromLine />
            </template>
          </CButtonIcon>
        </div>
        <div class="accordion-container">
          <AccordionCard
            header="Week 7: CI/CD Deep Dive"
            :items="[{ title: 'Week 7: Theory' }, { title: 'Week 7: Practical' }]"
          />
          <CButtonIcon type="secondary" size="lg" :disabled="true" btnIconLabel="Publish Module">
            <template #icon>
              <ArrowUpFromLine />
            </template>
          </CButtonIcon>
        </div>
        <div class="accordion-container">
          <AccordionCard
            header="Week 8: Final Submission"
            :items="[{ title: 'Week 8: Theory' }, { title: 'Week 8: Practical' }]"
          />
          <CButtonIcon type="secondary" size="lg" :disabled="true" btnIconLabel="Publish Module">
            <template #icon>
              <ArrowUpFromLine />
            </template>
          </CButtonIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modules-header {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 1.5rem;
}

.right-aligned {
  align-self: flex-end;
  display: flex;
  justify-content: row;
  gap: 1rem;
}

.btn-icon-custom {
  width: 65%;
  height: inherit;
}

.card-con {
  display: flex;
  justify-content: center;
  padding-left: 5%;
  padding-right: 5%;
  flex-direction: column;
}

.unpublished {
  margin-top: 1rem;
}

hr {
  margin: 1.2rem 0;
}

.accordion-container {
  padding: 1rem;
  padding-bottom: 2rem;
  background-color: #f7f6fb;
  border-radius: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  margin-bottom: 3rem;
}
</style>
