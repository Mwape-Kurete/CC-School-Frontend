<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const courseId = route.params.courseId;

// for visuals
import AccordionCard from '@/components/AccordionCard.vue';

</script>


<template>
  <div class="course-modules">
    <h1>{{ courseId }} - Modules</h1>
  </div>

  <!-- page content -->
  <div class="card-con">
    <AccordionCard header="OVERVIEW" />
    <AccordionCard header="Week 1: Introduction and Briefing" :items="[{ title: 'Week 1: Theory' },
    { title: 'Week 1: Practical' }
    ]" />
    <AccordionCard header="Week 2: Introduction to C# and Dotnet" :items="[{ title: 'Week 2: Theory' },
    { title: 'Week 2: Practical' }
    ]" />
    <AccordionCard header="Week 3: Design Architecture and Patterns" :items="[{ title: 'Week 3: Theory' },
    { title: 'Week 3: Practical' },
    { title: 'Progress Assesment 1' }
    ]" />
    <AccordionCard header="Week 4: Database Integration" :items="[{ title: 'Week 4: Theory' },
    { title: 'Week 4: Practical' }
    ]" />
  </div>

</template>


<style scoped>
.card-con {
  display: flex;
  justify-content: center;
  padding-left: 5%;
  padding-right: 5%;
  flex-direction: column;
}
</style>