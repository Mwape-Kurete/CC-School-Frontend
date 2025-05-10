<script setup lang="ts">
import CardComp from '@/components/CardComp.vue';

</script>

<template>
  <div class="about">

    <CardComp cardType="module" moduleTitleLine1="Computer" moduleTitleLine2="Science 101"
      moduleEventLabel="Computer Science 101 Semester 1 Calendar Event" moduleCode="CS 101" moduleClassId="H6"
      moduleTime="Monday 09:00 - 11:00" />

    <CardComp cardType="announcement" announcementTitle="Computer Science Workshop with Jacob Anderson"
      announcementBody="Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit..."
      announcementDate="2 Apr 2025, 11:36" />


  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
