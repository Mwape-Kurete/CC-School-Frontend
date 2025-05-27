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

const getAssignmentsByStatus = (status: Assignment['status']) => {
  return assignments.value.filter(assignment => assignment.status === status);
};
</script>

<template>
  <div class="assignments-overview">
    <h1 class="text-3xl font-bold mb-6">Assignments Overview</h1>
    
    <!-- Upcoming Assignments -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">Upcoming Assignments</h2>
      <div class="space-y-4">
        <div 
          v-for="assignment in getAssignmentsByStatus('upcoming')" 
          :key="assignment.id"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <h3 class="text-xl font-medium text-blue-600">{{ assignment.title }}</h3>
          <p class="text-gray-600 mt-1">{{ assignment.description }}</p>
          <p class="text-sm text-gray-500 mt-2">Due: {{ new Date(assignment.dueDate).toLocaleDateString() }}</p>
        </div>
      </div>
    </section>
    
    <!-- Past Assignments -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">Past Assignments</h2>
      <div class="space-y-4">
        <div 
          v-for="assignment in getAssignmentsByStatus('past')" 
          :key="assignment.id"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <h3 class="text-xl font-medium text-gray-700">{{ assignment.title }}</h3>
          <p class="text-gray-600 mt-1">{{ assignment.description }}</p>
          <p class="text-sm text-gray-500 mt-2">Was due: {{ new Date(assignment.dueDate).toLocaleDateString() }}</p>
        </div>
      </div>
    </section>
    
    <!-- Unpublished Assignments -->
    <section>
      <h2 class="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">Unpublished Assignments</h2>
      <div class="space-y-4">
        <div 
          v-for="assignment in getAssignmentsByStatus('unpublished')" 
          :key="assignment.id"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 bg-gray-50"
        >
          <h3 class="text-xl font-medium text-gray-600">{{ assignment.title }}</h3>
          <p class="text-gray-500 mt-1">{{ assignment.description }}</p>
          <p class="text-sm text-gray-400 mt-2">Planned for: {{ new Date(assignment.dueDate).toLocaleDateString() }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.assignments-overview {
  padding: 2rem;
}
</style>