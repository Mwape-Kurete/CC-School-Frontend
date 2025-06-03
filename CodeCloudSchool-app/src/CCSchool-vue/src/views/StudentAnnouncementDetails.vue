<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CButton from '@/components/ui/CButton.vue';
import { AnnouncementService } from '@/api/announcements';

const route = useRoute();
const announcement = ref<Announcement | null>(null);

interface Announcement {
  announcementId: number;
  title: string;
  description: string;
  date: string;
  lecturerId: number;
  // Add lecturer details if available
  lecturerName?: string;
  lecturerEmail?: string;
}

onMounted(async () => {
  const announcementId = Number(route.params.announcementId);
  const response = await AnnouncementService.getAnnouncementById(announcementId);
  
  if (typeof response !== 'string') {
    announcement.value = response;
  } else {
    console.error('Failed to load announcement:', response);
  }
});
</script>

<template>
  <div v-if="announcement">
    <!-- Lecturer info -->
    <div class="flex lecturer-info-con">
      <img class="lecturer-img" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Lecturer Image" />
      <div class="lec-name-email">
        <h2>Lecturer Name</h2>
        <h4>lecturer@email.com</h4>
      </div>
    </div>

    <!-- Announcement content -->
    <h1 class="mb-4 mt-4">{{ announcement.title }}</h1>
    <p class="w-9">{{ announcement.description }}</p>

    <!-- Go back button -->
    <CButton type="tertiary" size="md" class="mt-4" @click="$router.back()">
      Go Back
    </CButton>
  </div>

  <div v-else class="text-gray-500">
    Loading announcement...
  </div>
</template>

<style scoped>
    .lecturer-info-con {
        display: flex;
        align-items: center;
    }

    .lecturer-img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
    }

</style>