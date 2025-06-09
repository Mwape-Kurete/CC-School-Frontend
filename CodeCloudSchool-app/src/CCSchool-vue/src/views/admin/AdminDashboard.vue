<script setup lang="ts">
//importing from vue
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

//import services
import { LecturerCourseService } from '@/api/courses'
import { lecturerService } from '@/api/lecturer'

//importing comopponents and icons
import LecturerKnob from '@/components/LecturerKnob.vue'
import ToDoComp from '@/components/ToDoComp.vue'
import CardComp from '@/components/CardComp.vue'
import CreateModuleAssignmentForm from '@/components/CreateModuleAssignmentForm.vue'
import CButtonIcon from '@/components/ui/CButton-icon.vue'
import { PlusCircleIcon } from 'lucide-vue-next'

//Functionality Start
//fetching & setting const variables
const storedAdminId = localStorage.getItem('adminId')
const adminId = storedAdminId && !isNaN(Number(storedAdminId)) ? parseInt(storedAdminId, 10) : 2

const userId = ref('')

//setting var for announcements
const announcements = ref([])

//fetching dashboard data from backend
onMounted(async () => {
// fetch all classes 
// fetch unapproved students
// when approving students add them to classes
// fetch unassigned lecturers
// 
    
    
})

// fetch adminID if needed

</script>

<template>
  <div class="dashboard-container">
    <!-- Main Content Area -->
    <!-- Your main dashboard content -->
    <div class="content-section">
      <!-- Add more components/content as needed -->
      <div class="student-header">
        <h1 class="ps-header pt-0">Students Pending Approval</h1>

      </div>
      <div class="card-container">
        <CardComp
          cardType="announcement"
          announcementTitle=" Computer science  workshop with Jacob  Anderson"
          announcementBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          announcementDate="2023-10-15"
          moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..."
        />

        <div class="divider-card"></div>

        <CardComp
          cardType="announcement"
          announcementTitle=" Computer science  workshop with Jacob  Anderson"
          announcementBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          announcementDate="2023-10-15"
          moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..."
        />

        <div class="divider-card"></div>

        <CardComp
          cardType="announcement"
          announcementTitle=" Computer science  workshop with Jacob  Anderson"
          announcementBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          announcementDate="2023-10-15"
          moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..."
        />
      </div>

      <hr />

      <h1 class="ps-header pt-5">This Weeks Schedule</h1>
      <CardComp
        cardType="module"
        moduleTitleLine1=" Computer science"
        moduleTitleLine2="Fundamentals Module"
        moduleEventLabel="Practical"
        moduleCode="CS101"
        moduleClassId="1E"
        moduleTime="9:00 - 12:00"
        moduleImg="https://picsum.photos/id/870/200/300?grayscale&blur=2"
      />
      <CardComp
        cardType="module"
        moduleTitleLine1=" Computer science"
        moduleTitleLine2="Fundamentals Module"
        moduleEventLabel="Practical"
        moduleCode="CS101"
        moduleClassId="2E"
        moduleTime="14:00 - 18:00"
        moduleImg="https://picsum.photos/id/870/200/300?grayscale&blur=2"
      />
    </div>

    <!-- Right Side Panel -->
    <aside class="side-panel">
      <div class="panel-content">
        <h3 class="text-center">Class Analytics</h3>
        <!-- Additional panel components can go here -->
        <div class="panel-section">
          <!-- Activity content -->
          <LecturerKnob />
          <ToDoComp />
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
/* students */
.student-header {
  margin-bottom: 2rem;
}

.card-container {
  background-color: #f5f5f5;
  border-radius: 25px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.dashboard-view {
  padding: 2rem;
}

.divider,
.divider-card {
  height: 1px;
  background-color: #ccc;
  margin: 1rem 0;
}

.divider-card {
  width: 97%;
  margin-left: 1.5%;
}

/*module section*/

/*layout below */

.dashboard-view {
  padding: 2rem;
}
.dashboard-container {
  display: grid;
  grid-template-columns: 1fr 300px; /* Main content takes remaining space, aside fixed at 300px */
  gap: 2rem;
  min-height: 100vh;
  padding: 2rem;
}

.pa-header {
  margin-top: -1.5rem;
  padding-top: -1.5rem;
}
.side-panel {
  border-left: 1px solid #e5e7eb;
  padding-left: 2rem;
}

.panel-content {
  position: sticky;
  top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Responsive behavior */
@media (max-width: 1024px) {
  .dashboard-container {
    grid-template-columns: 1fr;
  }

  .side-panel {
    border-left: none;
    border-top: 1px solid #e5e7eb;
    padding-left: 0;
    padding-top: 2rem;
  }
}

/* Additional styling as needed */
.content-section {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.panel-section {
  background: white;
  padding: 2rem;
  width: 100%;

  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}
</style>
