<!-- DashboardView.vue -->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import CardComp from '@/components/CardComp.vue';
import { ClassesService } from '@/api/classes';
import type { Class } from '@/api/classes';
import { StudentService } from '@/api/student';
import { ImageGenServices } from '@/api/ImgGen';



const classes = ref<Class[]>([]);
const userID = ref<number | undefined>();
const userRole = ref<string | undefined>();
const loading = ref(false);
const error = ref<string | null>(null);


// Load classes when component mounts
onMounted(async () => {
  await fetchStudent();
  if (userID.value) {
    await loadStudentClasses();
  }

});

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Get today's day index (0 = Sunday, ..., 6 = Saturday)
const todayIndex = new Date().getDay();

// Generate days starting from today
const sortedWeekDays = Array.from({ length: 7 }, (_, i) => (todayIndex + i) % 7);

// Group classes by day (0-6)
const groupedClasses = computed(() => {
  const map = new Map<number, Class[]>();
  for (const cls of classes.value) {
    const day = cls.timeSlot.day;
    if (!map.has(day)) map.set(day, []);
    map.get(day)?.push(cls);
  }
  return map;
});



// functions 

const fetchStudent = async () => {
  try {
    const studentNumber = localStorage.getItem('studentNumber');
    if (!studentNumber) {
      throw new Error('Student number not found in localStorage');
    }
    const response = await StudentService.getStudentByStudentNumber(studentNumber);
    if (typeof response === 'string') {
      throw new Error('Unexpected response type: string');
    }
    userID.value = response.userId;
    userRole.value = response.role;
  } catch (err) {
    error.value = (err instanceof Error ? err.message : 'Failed to fetch student info');
  }
};


const loadStudentClasses = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Fetch classes by userId
    const studentClasses = await ClassesService.getClassesByStudentId(userID.value as number);
    classes.value = studentClasses;

    // Fetch images for each class
    for (const cls of studentClasses) {
      cls.moduleImg = await ImageGenServices.fetchCourseImage(cls.className);
    }

  } catch (err: any) {
    error.value = err.message || 'Failed to load classes';
  } finally {
    loading.value = false;
  }
}

function getFormattedDateFromDayIndex(dayIndex: number): string {
  const today = new Date();
  const delta = (dayIndex - today.getDay() + 7) % 7;
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + delta);

  return targetDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  }); // e.g., "8 June"
}




</script>


<template>
  <div class="dashboard-content">

    <div v-if="loading">Loading classes...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="userRole === 'Student'">

      <div v-if="classes.length === 0">
        No classes found.
      </div>

      <!-- Loop through days starting from today -->
      <div v-for="dayIndex in sortedWeekDays" :key="dayIndex">
        <template v-if="groupedClasses.get(dayIndex)?.length">
          <!-- Day Heading -->
          <h2 class="day-heading">
            {{ dayNames[dayIndex] }}, {{ getFormattedDateFromDayIndex(dayIndex) }}
          </h2>

          <!-- Classes under this day -->
          <div v-for="cls in groupedClasses.get(dayIndex)" :key="cls.classID">
            <CardComp :cardType="'module'" :moduleTitleLine1="cls.className"
              :moduleEventLabel="cls.classDescription || 'No description'" :moduleCode="cls.courses?.courseName"
              :moduleClassId="cls.Classroom"
              :moduleTime="`${cls.timeSlot.startTime.substring(0, 5)} - ${cls.timeSlot.endTime.substring(0, 5)}`"
              :moduleImg="cls.moduleImg" />
          </div>
        </template>
      </div>

    </div>

    <div v-else>
      <p>You do not have permission to view classes.</p>
    </div>

  </div>
</template>


<style scoped>
/* ---------------------------- */
/* DASHBOARD MAIN CONTENT */
/* ---------------------------- */
.dashboard-content {
  padding: 1rem 2rem 0;
}

/* ---------------------------- */
/* DASHBOARD HEADER CONTAINER */
/* ---------------------------- */
.dashboard-header {
  padding: 1rem 2rem 0;
  position: relative;
}

/* ---------------------------- */
/* HEADER CONTENT LAYOUT */
/* ---------------------------- */
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
}

/* ---------------------------- */
/* MAIN DASHBOARD TITLE */
/* ---------------------------- */
.title {
  font-size: 2.75rem;
  margin: 0;

  white-space: nowrap;
}

/* ---------------------------- */
/* DATE HEADING STYLING */
/* ---------------------------- */
.day-heading {
  font-family: 'Quicksand', sans-serif;
  font-size: 14pt;
  margin-top: 20px;

  color: #333;
  /* Darker color for better readability */
  font-weight: 600;
  /* Slightly bolder */
}

/* ---------------------------- */
/* CONTROL BUTTONS CONTAINER */
/* ---------------------------- */
.controls-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* ---------------------------- */
/* TAB BUTTONS STYLING */
/* ---------------------------- */
.tabs-container {
  display: flex;
  gap: 0.75rem;
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  height: 36px;
  white-space: nowrap;
}

/* ---------------------------- */
/* DROPDOWN MENU STYLING */
/* ---------------------------- */
.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  z-index: 10;
  min-width: 160px;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

/* ---------------------------- */
/* ICON BUTTONS STYLING */
/* ---------------------------- */
.icon-buttons {
  display: flex;
  gap: 0.5rem;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  color: #555;
}

/* ---------------------------- */
/* HEADER DIVIDER LINE */
/* ---------------------------- */
.divider {
  height: 1px;
  background-color: #e0e0e0;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>