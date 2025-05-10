<script setup lang="ts">
import CardComp from '@/components/CardComp.vue';
import AccordionCard from '@/components/AccordionCard.vue';

</script>

<template>
  <div class="about">

    <CardComp cardType="module" moduleTitleLine1="Computer" moduleTitleLine2="Science 101"
      moduleEventLabel="Computer Science 101 Semester 1 Calendar Event" moduleCode="CS 101" moduleClassId="H6"
      moduleTime="Monday 09:00 - 11:00" moduleImg="https://www.primefaces.org/cdn/primevue/images/usercard.png" />

    <CardComp cardType="announcement" announcementTitle="Computer Science Workshop with Jacob Anderson"
      announcementBody="Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit..."
      announcementDate="2 Apr 2025, 11:36" />
    
    <AccordionCard 
      header="Resources"
      :items="[
        { title: 'STUDY GUIDE 2025' },
        { title: 'SEMESTER OVERVIEW'}
      ]"/>

  </div>
</template>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
