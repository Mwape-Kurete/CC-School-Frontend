<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();


import { CourseService } from '@/api/courses'
import { AssignmentService } from '@/api/assignments'
import { onMounted, ref, computed } from 'vue';

// For visuals 
import CardComp from '@/components/CardComp.vue'
import Dropdown from '@/components/ui/CDropdown.vue' // Adjust the path as needed


// Sample state and options for the dropdown
const selectedFilter = ref(null)

const filterOptions = [
  { label: 'All Assignments', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' }
]


import type { Course } from '@/api/courses';
const course = ref<Course | null>(null);

onMounted(async () => {

  const courseIdParam = route.params.courseId;
  const courseId = Array.isArray(courseIdParam) ? Number(courseIdParam[0]) : Number(courseIdParam);
  try {
    const result = await CourseService.getCoursebyId(courseId);
    if (typeof result === 'string') {
      console.error('Failed to fetch course:', result);
      course.value = null;
    } else {
      console.log('Course fetched:', result);
      course.value = result;
      console.log('Course fetched successfully:', course.value);
    }
  } catch (error) {
    console.error('Failed to fetch course:', error);
  }


  // fetch the assignments for the course
  await fetchAssignmentsByCourseId();

})

// =====================================================================================
// assignments state and interface
const assignments = ref<Assignment[]>([]); //store the assignments fetched from the API

interface Assignment {
  assignment_ID: number;
  title: string;
  description?: string;
  dueDate: string; // ISO date string from API
  lecturerId: number;
  courseId?: number;
}
// =====================================================================================

// functions
// =====================================================================================

const fetchAssignmentsByCourseId = async (): Promise<void> => {
  // get the courseId from the route params
  const courseIdParam = route.params.courseId;
  const courseId = Array.isArray(courseIdParam) ? Number(courseIdParam[0]) : Number(courseIdParam);

  try {
    const response = await AssignmentService.getAssignmentsByCourseId(courseId);
    console.log('Raw response from backend:', response);

    if (typeof response === 'string') {
      console.error('Failed to fetch assignments:', response);
    } else {

      console.log('Assignments fetched:', response);
      // assign the fetched assignments to the state
      assignments.value = response as Assignment[];
    }

  } catch (error) {
    console.error('Failed to fetch assignments:', error);
  }
}

// split assignments into upcoming and past
const upcomingAssignments = computed(() =>
  assignments.value.filter(a => new Date(a.dueDate) >= new Date())
);

const pastAssignments = computed(() =>
  assignments.value.filter(a => new Date(a.dueDate) < new Date())
);



const onAssignmentClick = (assignmentId: number): void => {
  const courseIdParam = route.params.courseId;
  const courseId = Array.isArray(courseIdParam) ? Number(courseIdParam[0]) : Number(courseIdParam);

  router.push({ name: 'AssignmentDetails', params: { courseId, assignmentId } });
}
// =====================================================================================

</script>


<template>
  <div class="course-assignments">
    <h1>{{ course?.courseDescription }} - Assignments</h1>
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
      <CardComp v-for="assignment in upcomingAssignments" @click="onAssignmentClick(assignment.assignment_ID)"
        :key="assignment.assignment_ID" cardType="assignment" :assignmentTitle="assignment.title"
        :assignmentBody="assignment.description || 'No description provided.'"
        :assignmentDate="AssignmentService.formatAssignmentDate(assignment.dueDate)"
        moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..." />
      <div v-if="!upcomingAssignments.length" class="text-gray-500">No upcoming assignments</div>
    </div>

    <!-- past assignments -->
    <h3 class="text-2xl font-semibold mb-2 mt-4">Past Assignments</h3>
    <div class="divider"></div>

    <div class="card-container">
      <CardComp v-for="assignment in pastAssignments" :key="assignment.assignment_ID" cardType="assignment"
        :assignmentTitle="assignment.title" :assignmentBody="assignment.description || 'No description provided.'"
        :assignmentDate="AssignmentService.formatAssignmentDate(assignment.dueDate)"
        moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..." />
      <div v-if="!pastAssignments.length" class="text-gray-500">No past assignments</div>
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
