<!-- DashboardView.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { GraduationCap, BellRing, EllipsisVertical } from 'lucide-vue-next';
import CardComp from '@/components/CardComp.vue';

// Dropdown toggle logic
const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

//Module card data
const modules = [
  {
    date: 'Monday, 14 April',
    items: [
      {
        cardType: 'module',
        moduleTitleLine1: 'Computer Science 101',
        moduleEventLabel: 'CS 101 Class',
        moduleCode: 'H6',
        moduleClassId: 'H6',
        moduleTime: '09:00 - 11:00'
      },
      {
        cardType: 'module',
        moduleTitleLine1: 'Artificial Intelligence 210',
        moduleEventLabel: 'AI 210 Class',
        moduleCode: 'D2',
        moduleClassId: 'D2',
        moduleTime: '13:00 - 16:00'
      }
    ]
  },

  {
    date: 'Tuesday, 15 April',
    items: [
      {
        cardType: 'module',
        moduleTitleLine1: 'Data Structures 201',
        moduleEventLabel: 'DS 201 Class',
        moduleCode: 'B3',
        moduleClassId: 'B3',
        moduleTime: '10:00 - 12:00'
      },
    ]
  },

  {
    date: 'Wednesday, 16 April',
    items: [
      {
        cardType: 'module',
        moduleTitleLine1: 'Web Development 301',
        moduleEventLabel: 'WD 301 Class',
        moduleCode: 'A1',
        moduleClassId: 'A1',
        moduleTime: '11:00 - 13:00'
      },
    ]
  }
];
</script>

<template>
  

    <!-- Main content section -->
    <div class="dashboard-content">
      <!-- Loop through each day's modules -->
      <div v-for="day in modules" :key="day.date" class="day-section">
        <h2 class="day-heading">{{ day.date }}</h2>
        
        <!-- Loop through each module for this day -->
        <div v-for="(module, index) in day.items" :key="index" class="module-card">
          <CardComp v-bind="module" />
        </div>
      </div>
    </div>



</template>

<style scoped>

/* ---------------------------- */
/* DASHBOARD MAIN CONTENT */
/* ---------------------------- */
.dashboard-content{
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

  color: #333; /* Darker color for better readability */
  font-weight: 600; /* Slightly bolder */
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