<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Assignment Title reactive variable
const assignmentTitle = ref('');

// Add missing state and methods for attempts
const attemptCount = ref(1);
const unlimitedAttempts = ref(false);

function decrementAttempts() {
  if (attemptCount.value > 1 && !unlimitedAttempts.value) {
    attemptCount.value--;
  }
}

function incrementAttempts() {
  if (!unlimitedAttempts.value) {
    attemptCount.value++;
  }
}

function toggleUnlimitedAttempts() {
  unlimitedAttempts.value = !unlimitedAttempts.value;
}

const dueDate = ref('');
const submissionFormat = ref('');
const submissionFormats = [
  { value: 'pdf', label: 'PDF' },
  { value: 'docx', label: 'DOCX' },
  { value: 'txt', label: 'TXT' }
];
const assignmentDetailsHeader = ref('');
const assignmentDetailsDescription = ref('');

function saveAssignment() {
    // Here you would typically send data to an API
  console.log('Assignment saved:', {
    title: assignmentTitle.value,
    dueDate: dueDate.value,
    format: submissionFormat.value,
    header: assignmentDetailsHeader.value,
    description: assignmentDetailsDescription.value,
    attempts: unlimitedAttempts.value ? 'unlimited' : attemptCount.value
  });
  
  // Reset form after saving
  assignmentTitle.value = '';
  dueDate.value = '';
  submissionFormat.value = '';
  assignmentDetailsHeader.value = '';
  assignmentDetailsDescription.value = '';
  attemptCount.value = 1;
  unlimitedAttempts.value = false;

  // Redirect to assignments overview page
  router.push('/LecturerAssign'); // Or your actual route path
};
  
</script>

<template>
  <div class="assignment-view">
    <h1 class="page-title">Create a New Assignment</h1>
    
    <div class="assignment-form">
      <!-- Assignment Title -->
      <div class="form-group">
        <label class="form-label">Assignment Title</label>
        <input 
          v-model="assignmentTitle"
          type="text" 
          placeholder="Type assignment title here" 
          class="form-input"
        >
      </div>
      
      <!-- Due Date and Attempt Count -->
      <div class="form-row">
        <div class="form-group date-input">
          <label class="form-label">Assignment Due Date</label>
          <input 
            v-model="dueDate"
            type="date" 
            class="form-input"
          >
        </div>
        
        <div class="form-group attempts-input">
          <label class="form-label">Set Attempt Count</label>
          <div class="attempts-controls">
            <button 
              @click="decrementAttempts"
              :disabled="unlimitedAttempts"
              class="attempt-button"
            >
              -
            </button>
            <span class="attempt-count">
              {{ unlimitedAttempts ? '∞' : attemptCount }}
            </span>
            <button 
              @click="incrementAttempts"
              :disabled="unlimitedAttempts"
              class="attempt-button"
            >
              +
            </button>
            <button 
              @click="toggleUnlimitedAttempts"
              class="attempt-button unlimited"
              :class="{ active: unlimitedAttempts }"
            >
              ∞
            </button>
          </div>
        </div>
      </div>
      
      <!-- Submission Format -->
      <div class="form-group">
        <label class="form-label">Expected Submission Format</label>
        <select 
          v-model="submissionFormat"
          class="form-input"
        >
          <option value="" disabled>Select a Format</option>
          <option v-for="format in submissionFormats" :key="format.value" :value="format.value">
            {{ format.label }}
          </option>
        </select>
      </div>
      
      <!-- Assignment Details -->
      <div class="assignment-details">
        <h2 class="section-title">Assignment Details</h2>
        <div class="details-content">
          <div class="details-header">
            <label class="form-label">Assignment Details Header</label>
            <input 
              v-model="assignmentDetailsHeader"
              type="text" 
              placeholder="Type assignment header here" 
              class="form-input"
            >
          </div>
          
          <div class="details-description">
            <label class="form-label">Assignment Details Description</label>
            <div class="description-editor">
              <div class="editor-toolbar">
                <button class="toolbar-button" title="Bold"><strong>B</strong></button>
                <button class="toolbar-button" title="Italic"><em>I</em></button>
                <button class="toolbar-button" title="Link"><span class="underline">Link</span></button>
                <button class="toolbar-button" title="Bullet List"><span>• List</span></button>
                <button class="toolbar-button" title="Numbered List"><span>1. List</span></button>
              </div>
              <textarea 
                v-model="assignmentDetailsDescription"
                placeholder="Type assignment description here" 
                rows="8"
                class="editor-textarea"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Save Button -->
      <button 
        @click="saveAssignment"
        class="save-button"
      >
        SAVE ASSIGNMENT
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Quicksand:wght@300..700&display=swap');

/* Base Styles */
.assignment-view {
  padding: 60px;
  font-family: "Quicksand", sans-serif;
  color: grey;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  padding: 15px;
}

.form-label {
  display: block;
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 50px;
  color: grey;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-radius: 50px;
  background-color: #D0DFCC;
  box-shadow: 0 0 0 2px #d0dfccab;
}

/* Form Layout */
.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.date-input, .attempts-input {
  flex: 1;
  min-width: 200px;
}

/* Attempt Controls */
.attempts-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.attempt-button {
  padding: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.attempt-button:hover {
  background-color: #d1d5db;
}

.attempt-button:disabled {
  opacity: 0.5;
}

.attempt-button.unlimited {
  font-weight: bold;
}

.attempt-button.unlimited.active {
  background-color: #dbeafe;
    background-color: #D0DFCC;

}

.attempt-count {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
}

/* Assignment Details */
.assignment-details {
  background-color: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.details-content {
  padding: 1rem;
}

.details-header {
  margin-bottom: 1.5rem;
}

.details-description {
  margin-top: 1.5rem;
}

/* Description Editor */
.description-editor {
  border-radius: 0.5rem;
  overflow: hidden;
}

.editor-toolbar {
  background-color: #f3f4f6;
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.toolbar-button {
  padding: 0.5rem;
  background: none;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toolbar-button:hover {
  background-color: #e5e7eb;
}

.editor-textarea {
  width: 100%;
  padding: 0.75rem;
  border: none;
  resize: vertical;
  min-height: 150px;
  font-family: inherit;
  background-color: white;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.editor-textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px #d0dfccab;

}

/* Save Button */
.save-button {
  width: 60%;
  height: 50px;
  padding: 0.75rem 1.5rem;
  border-radius: 80px;
  background-color: #D0DFCC;
  color: white;
  font-weight: 500;
  margin-left: 190px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-button:hover {
    background-color: #abb7a8;

}

.save-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #d0dfccab;
  
}
</style>