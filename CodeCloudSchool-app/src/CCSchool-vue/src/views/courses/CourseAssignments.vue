<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const courseId = route.params.courseId;

// For visuals 
import CardComp from '@/components/CardComp.vue'
import Dropdown from '@/components/ui/CDropdown.vue' // Adjust the path as needed
import { ref } from 'vue'

// Sample state and options for the dropdown
const selectedFilter = ref(null)

const filterOptions = [
  { label: 'All Assignments', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' }
]

</script>


<template>
  <div class="course-assignments">
    <h1>{{ courseId }} - Assignments</h1>
  </div>

  <!-- page content -->
  <div class="dashboard-view">
    <!-- search bar and filter -->
    <div class="search-filter-con mb-6 flex items-center gap-4">
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1016.65 2a7 7 0 000 14z" />
        </svg>
        <input type="text" placeholder="Search" class="input" />
      </div>

      <Dropdown v-model="selectedFilter" :options="filterOptions" placeholder="Filter assignments" option-label="label"
        option-value="value" size="md" type="secondary" />
    </div>

    <!-- upcoming assignments -->
    <h3 class="text-2xl font-semibold mb-2">Upcoming Assignments</h3>
    <div class="divider"></div>

    <div class="card-container">
      <CardComp cardType="assignment" assignmentTitle="API INTEGRATION: WEATHER DASHBOARD"
        assignmentBody="This is the body of the assignment." assignmentDate="2023-10-15"
        moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..." />
      <div class="divider-card"></div>
      <CardComp cardType="assignment" assignmentTitle="Refactor Legacy Code: E-Commerce Checkout System"
        assignmentBody="This is the body of the assignment." assignmentDate="2023-10-15"
        moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..." />
    </div>

    <!-- past assignments -->
    <h3 class="text-2xl font-semibold mb-2 mt-4">Past Assignments</h3>
    <div class="divider"></div>

    <div class="card-container">
      <CardComp cardType="assignment" assignmentTitle="Debugging Challenge: Banking System Vulnerability"
        assignmentBody="This is the body of the assignment." assignmentDate="2023-10-15"
        moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..." />
      <div class="divider-card"></div>
      <CardComp cardType="assignment" assignmentTitle="Algorithm Challenge: Route Optimiser for Delivery Drones"
        assignmentBody="This is the body of the assignment." assignmentDate="2023-10-15"
        moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..." />
    </div>
  </div>
</template>



<style scoped>
.card-container {
  background-color: #F5F5F5;
  border-radius: 25px;
  padding: 1rem;
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

.search-filter-con {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between !important;
}


.search-bar {
  display: flex;
  align-items: center;
  background-color: #d9d9d9;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 300px;
}

.search-bar .icon {
  width: 20px;
  height: 20px;
  color: #888;
  margin-right: 0.5rem;
}

.search-bar .input {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-size: 1rem;
  color: #333;
}
</style>
