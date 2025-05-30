<script setup lang="ts">
import { ref } from 'vue';

interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'upcoming' | 'past' | 'unpublished';
}
 
const assignments = ref<Assignment[]>([
  {
    id: 1,
    title: 'API INTEGRATION: WEATHER DASHBOARD',
    description: 'Lorem ipsum dolor Sit Amet, Consectetur Adipiscing Elit..',
    dueDate: '2023-12-15',
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'REFACTOR LEGACY CODE: E-COMMERCE CHECKOUT SYSTEM',
    description: 'Lorem ipsum dolor Sit Amet, Consectetur Adipiscing Elit..',
    dueDate: '2023-12-20',
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'DEBUGGING CHALLENGE: BANKING SYSTEM VULNERABILITY',
    description: 'Lorem ipsum dolor Sit Amet, Consectetur Adipiscing Elit..',
    dueDate: '2023-11-10',
    status: 'past'
  },
  {
    id: 4,
    title: 'ALGORITHM CHALLENGE: ROUTE OPTIMISER FOR DELIVERY DRONES',
    description: 'Lorem ipsum dolor Sit Amet, Consectetur Adipiscing Elit..',
    dueDate: '2023-11-05',
    status: 'past'
  },
  {
    id: 5,
    title: 'DEBUGGING CHALLENGE: BANKING SYSTEM VULNERABILITY',
    description: 'Lorem ipsum dolor Sit Amet, Consectetur Adipiscing Elit..',
    dueDate: '2024-01-10',
    status: 'unpublished'
  },
  {
    id: 6,
    title: 'ALGORITHM CHALLENGE: ROUTE OPTIMISER FOR DELIVERY DRONES',
    description: 'Lorem ipsum dolor Sit Amet, Consectetur Adipiscing Elit..',
    dueDate: '2024-01-15',
    status: 'unpublished'
  }
]);

const searchQuery = ref('');
const sortOption = ref<'recent' | 'oldest'>('recent');

const getAssignmentsByStatus = (status: Assignment['status']) => {
  return assignments.value
    .filter(assignment =>
      assignment.status === status &&
      assignment.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortOption.value === 'recent' ? dateB - dateA : dateA - dateB;
    });
};
</script>

<template>
  <div class="assignments-overview">
    <h1 class="page-title">Assignments Overview</h1>
    
    <!-- Upcoming Assignments -->
    <section class="assignment-section">
      <div class="assignment-controls">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search assignments..."
          class="search-input"
        />
        <select v-model="sortOption" class="sort-select">
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <h2 class="section-title">Upcoming Assignments</h2>
      <div class="assignment-list">
        <div 
          v-for="assignment in getAssignmentsByStatus('upcoming')" 
          :key="assignment.id"
          class="assignment-card upcoming"
        >
          <div class="assignment-image-holder"></div>
          <div class="assignment-details">
            <h3 class="assignment-title">{{ assignment.title }}</h3>
            <p class="assignment-description">{{ assignment.description }}</p>
            <p class="due-date">Due: {{ new Date(assignment.dueDate).toLocaleDateString() }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Past Assignments -->
    <section class="assignment-section">
      <h2 class="section-title">Past Assignments</h2>
      <div class="assignment-list">
        <div 
          v-for="assignment in getAssignmentsByStatus('past')" 
          :key="assignment.id"
          class="assignment-card past"
        >
          <div class="assignment-image-holder"></div>
          <div class="assignment-details">
            <h3 class="assignment-title">{{ assignment.title }}</h3>
            <p class="assignment-description">{{ assignment.description }}</p>
            <p class="due-date">Was due: {{ new Date(assignment.dueDate).toLocaleDateString() }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Unpublished Assignments -->
    <section class="assignment-section">
      <div class="section-header">
        <h2 class="section-title">Unpublished Assignments</h2>
        <button class="create-assignment-btn">Create New Assignment</button>
      </div>
      <div class="assignment-list">
        <div 
          v-for="assignment in getAssignmentsByStatus('unpublished')" 
          :key="assignment.id"
          class="assignment-card unpublished"
        >
          <div class="assignment-image-holder"></div>
          <div class="assignment-details">
            <h3 class="assignment-title">{{ assignment.title }}</h3>
            <p class="assignment-description">{{ assignment.description }}</p>
            <p class="due-date">Planned for: {{ new Date(assignment.dueDate).toLocaleDateString() }}</p>
          </div>
          <button class="publish-btn">
            <span class="upload-icon"><i data-lucide="upload"></i></span> Publish Assignment
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Quicksand:wght@300..700&display=swap');
.assignments-overview {
  padding: 2rem;
  
}

.page-title {
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 1.5rem;
}

.assignment-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  font-family: "Quicksand", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.assignment-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.assignment-card {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.assignment-card:hover {
  background-color: #f9fafb;
}

.assignment-details {
  flex: 1;
}

.assignment-image-holder {
  width: 80px;
  height: 80px;
  background-color: #e5e7eb;
  border-radius: 9999px;
  margin-right: 1rem;
}

.assignment-title {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.assignment-description {
  color: #4b5563;
  margin-top: 0.25rem;
}

.due-date {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

/* Status-specific styles */
.upcoming .assignment-title {
  color: #D0DFCC;
  font-family: "Quicksand", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
}

.past .assignment-title {
  color: #4b5563;
  font-family: "Quicksand", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
}

.unpublished {
  background-color: #f9fafb;
}

.unpublished .assignment-title {
  color: #6b7280;
  font-family: "Quicksand", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
}

.unpublished .assignment-description {
  color: #6b7280;
}

.unpublished .due-date {
  color: #9ca3af;
}

.assignment-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius:50px;
  font-size: 1rem;
  margin-right: 1rem;
}

.sort-select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 13px;
  font-family: "Quicksand", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 600;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.create-assignment-btn {
  margin-bottom: 0.5rem;
  background-color: #D0DFCC; /* Red */
  width: 30%;
  height: 40px;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 600;
  border: none;
}

.create-assignment-btn:hover {
  background-color: #aab7a7; 
}

.publish-btn {
  margin-left: auto;
  background-color: #d1d5db;
  color: #374151;
  padding: 0.4rem 0.8rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.upload-icon {
  font-size: 1rem;
}
</style>