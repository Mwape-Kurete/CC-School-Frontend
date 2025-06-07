<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AssignmentService } from '@/api/assignments';

const router = useRouter();

// Form state
const assignmentTitle = ref('');
const attemptCount = ref(1);
const unlimitedAttempts = ref(false);
const dueDate = ref('');
const submissionFormat = ref('');
const assignmentDetailsHeader = ref('');
const assignmentDetailsDescription = ref('');

const descriptionEditor = ref<HTMLDivElement | null>(null);

const formatText = (command: string) => {
  if (descriptionEditor.value) {
    descriptionEditor.value.focus();
    document.execCommand(command, false);
  }
};

const submissionFormats = [ 
  { value: 'pdf', label: 'PDF' },
  { value: 'docx', label: 'DOCX' },
  { value: 'txt', label: 'TXT' }
];

// Attempt controls
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

async function saveAssignment() {
  const assignmentData = {
    title: assignmentTitle.value,
    dueDate: dueDate.value,
    format: submissionFormat.value,
    header: assignmentDetailsHeader.value,
    description: assignmentDetailsDescription.value,
    attempts: unlimitedAttempts.value ? 'unlimited' : attemptCount.value,
    status: 'unpublished' 
  };

  try {
    saveToLocalStorage(assignmentData);
    
    const response = await AssignmentService.createAssignment({
      title: assignmentTitle.value,
      description: `${assignmentDetailsHeader.value}\n\n${assignmentDetailsDescription.value}`,
      dueDate: dueDate.value,
      courseId: 1,
      submissionFormat: submissionFormat.value,
      maxAttempts: unlimitedAttempts.value ? null : attemptCount.value
    });

    console.log('Assignment saved:', response);
    resetForm();
    router.push('/LecturerAssignOver');
  } catch (error) {
    console.error('Failed to save assignment:', error);
  }
}

function saveToLocalStorage(assignmentData: any) {
  const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
  const newAssignment = {
    ...assignmentData,
    id: Date.now(),
    dueDate: assignmentData.dueDate,
    status: 'unpublished' 
  };
  assignments.push(newAssignment);
  localStorage.setItem('assignments', JSON.stringify(assignments));
}

function resetForm() {
  assignmentTitle.value = '';
  dueDate.value = '';
  submissionFormat.value = '';
  assignmentDetailsHeader.value = '';
  assignmentDetailsDescription.value = '';
  attemptCount.value = 1;
  unlimitedAttempts.value = false;
}
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
                <button class="toolbar-button" title="Bold" @click="formatText('bold')"><strong>B</strong></button>
                <button class="toolbar-button" title="Italic" @click="formatText('italic')"><em>I</em></button>
                <button class="toolbar-button" title="Underline" @click="formatText('underline')"><u>U</u></button>
                <button class="toolbar-button" title="Bullet List" @click="formatText('insertUnorderedList')">• List</button>
                <button class="toolbar-button" title="Numbered List" @click="formatText('insertOrderedList')">1. List</button>
              </div>
              <div
                ref="descriptionEditor"
                contenteditable="true"
                class="editor-textarea"
                :innerHTML="assignmentDetailsDescription"
                @input="assignmentDetailsDescription = descriptionEditor?.innerHTML ?? ''"
              ></div>
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

.toolbar-button:hover:focus {
  background-color: red;
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


.editor-textarea .Bold {
  font-family: "Quicksand", sans-serif;
  font-weight: 900;
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