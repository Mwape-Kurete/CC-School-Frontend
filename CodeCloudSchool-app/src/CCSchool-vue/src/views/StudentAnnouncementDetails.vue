<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CButton from '@/components/ui/CButton.vue';
import { AnnouncementService } from '@/api/announcements';
import AvatarComp from '@/components/AvatarComp.vue';
import { lecturerService, type Lecturer } from '@/api/lecturer';

const route = useRoute();
const announcement = ref<Announcement | null>(null);
const lecturerDetails = ref<Lecturer | null>(null);


// Extracting assignmentID from the route parameters
const announcementIdNumber = route.params.announcementId;
const announcementId = Array.isArray(announcementIdNumber) ? Number(announcementIdNumber[0]) : Number(announcementIdNumber);
console.log('Viewing announcement ID:', announcementId);




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


  const response = await AnnouncementService.getAnnouncementById(announcementId);

  if (typeof response !== 'string') {
    announcement.value = response;
    console.log(announcement.value?.lecturerId);
  } else {
    console.error('Failed to load announcement:', response);
  }

  // Fetch lecturer details if available
  if (announcement.value && announcement.value.lecturerId) {
    await getLecturerDetails(announcement.value.lecturerId);
  } else {
    console.warn('No lecturer ID found in announcement');
  }

});


// functions 
const getLecturerDetails = async (lecturerId: number) => {
  try {
    const response = await lecturerService.getLecturerByID(lecturerId);
    if (response && typeof response !== 'string') {
      lecturerDetails.value = response;
    } else {
      console.error('Failed to fetch lecturer details:', response);

    }
  } catch (error) {
    console.error('Error fetching lecturer details:', error);
  }
}

</script>

<template>
  <div v-if="announcement">
    <!-- Lecturer info -->
    <div class="flex lecturer-info-con">
      <AvatarComp :name="lecturerDetails?.name ? lecturerDetails.name + ' ' + lecturerDetails.lastName : 'Lecturer Name'" class="lecturer-img" />
      <div class="lec-name-email">
        <h2>
          {{ lecturerDetails ? lecturerDetails.name + ' ' + lecturerDetails.lastName : 'Lecturer Name' }}
        </h2>
        <h4>
          {{ lecturerDetails ? lecturerDetails.lecEmail : ''}}
        </h4>
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

.lecturer-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}
</style>