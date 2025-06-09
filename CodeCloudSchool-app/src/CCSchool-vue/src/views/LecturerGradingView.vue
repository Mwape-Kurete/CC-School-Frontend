<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { GradingService, type AssignmentSubmission } from '@/api/grading';
import { lecturerService } from '@/api/lecturer';
import { StudentService } from '@/api/student';

const route = useRoute();
const assignmentId = ref(Number(route.params.assignmentId));
const lecturerId = ref(0); // Will be set from auth or session
const submissions = ref<AssignmentSubmission[]>([]);
const selectedSubmission = ref<AssignmentSubmission | null>(null);
const grade = ref(0);
const feedback = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

// Fetch lecturer ID (you might get this from auth/session in a real app)
onMounted(async () => {
  // This is just an example - in reality you'd get this from auth
  const lecturer = await lecturerService.getLecturerByID(1); // Replace with actual lecturer ID
  if (typeof lecturer !== 'string') {
    lecturerId.value = lecturer.lecturerId;
  }
  
  loadSubmissions();
});

async function loadSubmissions() {
  isLoading.value = true;
  errorMessage.value = '';
  
  const result = await GradingService.getSubmissionsForAssignment(assignmentId.value);
  if (typeof result !== 'string') {
    submissions.value = result;
  } else {
    errorMessage.value = result;
  }
  
  isLoading.value = false;
}

function selectSubmission(submission: AssignmentSubmission) {
  selectedSubmission.value = submission;
  grade.value = 0;
  feedback.value = '';
}

async function submitGrade() {
  if (!selectedSubmission.value || !lecturerId.value) return;
  
  isLoading.value = true;
  errorMessage.value = '';
  
  const result = await GradingService.submitGrade(
    assignmentId.value,
    selectedSubmission.value.studentId,
    lecturerId.value,
    grade.value,
    feedback.value
  );
  
  if (typeof result !== 'string') {
    // Grade submitted successfully
    alert('Grade submitted successfully!');
    selectedSubmission.value = null;
    loadSubmissions();
  } else {
    errorMessage.value = result;
  }
  
  isLoading.value = false;
}
</script>

<template>
  <div class="grading-view">
    <h1>Grade Assignments</h1>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <div class="submissions-list">
      <h2>Submissions</h2>
      <div v-if="isLoading">Loading submissions...</div>
      <div v-else-if="submissions.length === 0">No submissions yet</div>
      <ul v-else>
        <li 
          v-for="submission in submissions" 
          :key="submission.id"
          @click="selectSubmission(submission)"
          :class="{ selected: selectedSubmission?.id === submission.id }"
        >
          Submission from Student ID: {{ submission.studentId }}
          <span class="submission-date">{{ new Date(submission.submittedAt).toLocaleString() }}</span>
        </li>
      </ul>
    </div>
    
    <div v-if="selectedSubmission" class="grading-form">
      <h2>Grade Submission</h2>
      <div class="form-group">
        <label>Grade (0-100)</label>
        <input 
          v-model.number="grade" 
          type="number" 
          min="0" 
          max="100" 
          class="grade-input"
        >
      </div>
      
      <div class="form-group">
        <label>Feedback</label>
        <textarea 
          v-model="feedback" 
          class="feedback-input"
          placeholder="Provide feedback for the student..."
        ></textarea>
      </div>
      
      <button 
        @click="submitGrade"
        :disabled="isLoading"
        class="submit-button"
      >
        {{ isLoading ? 'Submitting...' : 'Submit Grade' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.grading-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.error-message {
  color: red;
  margin-bottom: 1rem;
}

.submissions-list ul {
  list-style: none;
  padding: 0;
}

.submissions-list li {
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submissions-list li:hover {
  background-color: #f5f5f5;
}

.submissions-list li.selected {
  background-color: #D0DFCC;
  border-color: #D0DFCC;
}

.submission-date {
  float: right;
  color: #666;
  font-size: 0.9rem;
}

.grading-form {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.grade-input {
  width: 100px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.feedback-input {
  width: 100%;
  min-height: 150px;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
}

.submit-button {
  background-color: #D0DFCC;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #abb7a8;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>