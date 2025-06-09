<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { GradingService, type GradedAssignment } from '@/api/grading';
import { StudentService } from '@/api/student';

const studentId = ref(0); // Will be set from auth or session
const grades = ref<GradedAssignment[]>([]);
const isLoading = ref(false);
const errorMessage = ref('');

// Fetch student ID (you might get this from auth/session in a real app)
onMounted(async () => {
  // This is just an example - in reality you'd get this from auth
  const student = await StudentService.getStudentByStudentNumber("12345"); // Replace with actual student number
  if (typeof student !== 'string') {
    studentId.value = student.userId;
  }
  
  loadGrades();
});

async function loadGrades() {
  isLoading.value = true;
  errorMessage.value = '';
  
  const result = await GradingService.getGradesForStudent(studentId.value);
  if (typeof result !== 'string') {
    grades.value = result;
  } else {
    errorMessage.value = result;
  }
  
  isLoading.value = false;
}
</script>

<template>
  <div class="grades-view">
    <h1>Your Grades</h1>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <div v-if="isLoading">Loading grades...</div>
    <div v-else-if="grades.length === 0">No grades yet</div>
    <div v-else class="grades-list">
      <div v-for="grade in grades" :key="grade.assignmentId" class="grade-item">
        <div class="grade-header">
          <h3>Assignment ID: {{ grade.assignmentId }}</h3>
          <div class="grade-value">{{ grade.grade }}%</div>
        </div>
        <div class="feedback">{{ grade.feedback }}</div>
        <div class="graded-at">Graded on: {{ new Date(grade.gradedAt).toLocaleString() }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grades-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.error-message {
  color: red;
  margin-bottom: 1rem;
}

.grades-list {
  margin-top: 2rem;
}

.grade-item {
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.grade-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.grade-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.feedback {
  margin: 1rem 0;
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
  border-left: 4px solid #D0DFCC;
}

.graded-at {
  font-size: 0.9rem;
  color: #666;
  text-align: right;
}
</style>