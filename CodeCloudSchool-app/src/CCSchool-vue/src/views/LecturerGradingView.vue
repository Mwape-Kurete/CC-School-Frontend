<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { GradingService, type AssignmentSubmission } from '@/api/grading';
import { lecturerService } from '@/api/lecturer';
import { StudentService } from '@/api/student';

const route = useRoute();
const assignmentId = ref(Number(route.params.assignmentId));
const lecturerId = ref(0);
const submissions = ref<AssignmentSubmission[]>([]);
const selectedSubmission = ref<AssignmentSubmission | null>(null);
const grade = ref(0);
const feedback = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const useLocalStorage = ref(false); // Toggle between local storage and backend

// Fetch lecturer ID
onMounted(async () => {
  const lecturer = await lecturerService.getLecturerByID(1); // Replace with actual lecturer ID
  if (typeof lecturer !== 'string') {
    lecturerId.value = lecturer.lecturerId;
  }
  
  loadSubmissions();
});

async function loadSubmissions() {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    // Try backend first
    const backendResult = await GradingService.getSubmissionsForAssignment(assignmentId.value);
    
    if (typeof backendResult !== 'string') {
      submissions.value = backendResult;
      useLocalStorage.value = false;
    } else {
      // If backend fails, try local storage
      loadFromLocalStorage();
    }
  } catch (error) {
    // If any error occurs, fall back to local storage
    loadFromLocalStorage();
  }
  
  isLoading.value = false;
}

function loadFromLocalStorage() {
  const storedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
  const assignment = storedAssignments.find((a: any) => a.id === assignmentId.value);
  
  if (assignment) {
    useLocalStorage.value = true;
    
    // Get submissions from localStorage (you might need to adjust this based on your storage structure)
    const storedSubmissions = JSON.parse(localStorage.getItem('assignmentSubmissions') || '[]');
    submissions.value = storedSubmissions.filter((s: any) => s.assignmentId === assignmentId.value);
    
    // If no submissions exist in localStorage, create some mock data for demonstration
    if (submissions.value.length === 0) {
      submissions.value = [
        {
          id: Date.now(),
          assignmentId: assignmentId.value,
          studentId: 12345, // Mock student ID
          submissionContent: 'This is a submission from local storage',
          submittedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('assignmentSubmissions', JSON.stringify(submissions.value));
    }
  } else {
    errorMessage.value = 'Assignment not found in local storage or backend';
  }
}

function selectSubmission(submission: AssignmentSubmission) {
  selectedSubmission.value = submission;
  
  // Try to load existing grade if available
  if (useLocalStorage.value) {
    const storedGrades = JSON.parse(localStorage.getItem('assignmentGrades') || '[]');
    const existingGrade = storedGrades.find((g: any) => 
      g.assignmentId === assignmentId.value && 
      g.studentId === submission.studentId
    );
    
    if (existingGrade) {
      grade.value = existingGrade.grade;
      feedback.value = existingGrade.feedback;
    } else {
      grade.value = 0;
      feedback.value = '';
    }
  } else {
    grade.value = 0;
    feedback.value = '';
  }
}

async function submitGrade() {
  if (!selectedSubmission.value || !lecturerId.value) return;
  
  isLoading.value = true;
  errorMessage.value = '';
  
  if (useLocalStorage.value) {
    // Save to local storage
    const storedGrades = JSON.parse(localStorage.getItem('assignmentGrades') || '[]');
    
    // Remove existing grade if it exists
    const updatedGrades = storedGrades.filter((g: any) => 
      !(g.assignmentId === assignmentId.value && g.studentId === selectedSubmission.value?.studentId)
    );
    
    // Add new grade
    updatedGrades.push({
      assignmentId: assignmentId.value,
      studentId: selectedSubmission.value.studentId,
      lecturerId: lecturerId.value,
      grade: grade.value,
      feedback: feedback.value,
      gradedAt: new Date().toISOString()
    });
    
    localStorage.setItem('assignmentGrades', JSON.stringify(updatedGrades));
    
    alert('Grade saved to local storage successfully!');
    selectedSubmission.value = null;
    loadSubmissions();
  } else {
    // Save to backend
    const result = await GradingService.submitGrade(
      assignmentId.value,
      selectedSubmission.value.studentId,
      lecturerId.value,
      grade.value,
      feedback.value
    );
    
    if (typeof result !== 'string') {
      alert('Grade submitted successfully!');
      selectedSubmission.value = null;
      loadSubmissions();
    } else {
      errorMessage.value = result;
    }
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
    
    <div v-if="useLocalStorage" class="storage-warning">
      <strong>Note:</strong> Using locally stored data (offline mode)
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
        {{ isLoading ? 'Submitting...' : useLocalStorage ? 'Save Grade Locally' : 'Submit Grade' }}
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

.storage-warning {
  background-color: #fff3cd;
  color: #856404;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid #ffeeba;
  border-radius: 0.25rem;
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