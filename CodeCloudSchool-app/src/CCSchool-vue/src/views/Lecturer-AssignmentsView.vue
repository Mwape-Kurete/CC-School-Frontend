<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { AssignmentService } from '@/api/assignments';
import DOMPurify from 'dompurify';

const isLoading = ref(false);
const errorMessage = ref('');
const spokenText = ref('');
const router = useRouter();

// Speech Recognition Setup
interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}

declare var SpeechRecognition: { new (): any };
declare var webkitSpeechRecognition: { new (): any };

const recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognizer = recognition ? new recognition() : null;

const startListening = () => {
  if (!recognizer) {
    errorMessage.value = 'Speech recognition not supported in this browser.';
    return;
  }

  recognizer.continuous = false;
  recognizer.lang = 'en-US';

  recognizer.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    handleVoiceCommand(transcript);
  };

  recognizer.onerror = (event: any) => {
    errorMessage.value = `Speech recognition error: ${event.error}`;
  };

  recognizer.start();
};

const handleVoiceCommand = async (command: string) => { 
  spokenText.value = command;
  
  try {
    if (command.includes('save') || command.includes('submit') || 
        command.includes('publish') || command.includes('send')) {
      await saveAssignment();
    } else if (command.includes('clear') || command.includes('reset')) {
      resetForm();
    } else if (command.includes('cancel') || command.includes('back')) {
      router.push('/LecturerAssignOver');
    } else {
      errorMessage.value = "Command not recognized. Try 'save', 'clear', or 'cancel'";
    }
  } catch (error) {
    console.error('Error handling voice command:', error);
    errorMessage.value = 'Please try again.';
  }
};

// Form state and other existing code remains the same...
const assignmentTitle = ref('');
const attemptCount = ref(1);
const unlimitedAttempts = ref(false);
const dueDate = ref('');
const submissionFormat = ref(''); 
const assignmentDetailsHeader = ref('');
const assignmentDetailsDescription = ref('');

const submissionFormats = [ 
  { value: 'pdf', label: 'PDF' },
  { value: 'docx', label: 'DOCX' },
  { value: 'txt', label: 'TXT' }
];

// Rich text editor functionality
const editorRef = ref<HTMLElement | null>(null);
const activeFormats = ref({
  bold: false,
  italic: false,
  underline: false
});

function formatText(command: string, value: string = '') {
  document.execCommand(command, false, value);
  updateDescriptionContent();
  checkActiveFormats();
}

function checkActiveFormats() {
  if (!editorRef.value) return;
  
  activeFormats.value = {
    bold: document.queryCommandState('bold'),
    italic: document.queryCommandState('italic'),
    underline: document.queryCommandState('underline')
  };
}

function updateDescriptionContent() {
  if (editorRef.value) {
    assignmentDetailsDescription.value = editorRef.value.innerText;
  }
}

function handlePaste(e: ClipboardEvent) {
  e.preventDefault();
  const text = e.clipboardData?.getData('text/plain') || '';
  document.execCommand('insertText', false, text);
  updateDescriptionContent();
}

onMounted(() => {
  if (editorRef.value && assignmentDetailsDescription.value) {
    editorRef.value.innerHTML = assignmentDetailsDescription.value;
  }
});

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
  if (!assignmentTitle.value.trim() || !assignmentDetailsDescription.value.trim()) {
    errorMessage.value = 'Title and description are required';
    return;
  }

  isLoading.value = true;

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
    const localStorageId = saveToLocalStorage(assignmentData);
    
    const backendResponse = await AssignmentService.createAssignment({
      title: assignmentTitle.value,
      description: `${assignmentDetailsHeader.value}\n\n${assignmentDetailsDescription.value}`,
      dueDate: dueDate.value,
      courseId: 1,
      submissionFormat: submissionFormat.value,
      maxAttempts: unlimitedAttempts.value ? null : attemptCount.value
    });

    if (typeof backendResponse !== 'string' && backendResponse.id) {
      updateLocalStorageId(localStorageId, backendResponse.id);
    }

    resetForm();
    router.push('/LecturerAssignOver');
  } catch (error) {
    console.error('Failed to save assignment:', error);
    errorMessage.value = 'Failed to save assignment. Please try again.';
  } finally {
    isLoading.value = false;
  }
}

function saveToLocalStorage(assignmentData: any): number {
  const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
  const newAssignment = {
    ...assignmentData,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  assignments.push(newAssignment);
  localStorage.setItem('assignments', JSON.stringify(assignments));
  return newAssignment.id;
}

function updateLocalStorageId(tempId: number, backendId: number) {
  const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
  const assignmentIndex = assignments.findIndex((a: any) => a.id === tempId);
  if (assignmentIndex !== -1) {
    assignments[assignmentIndex].id = backendId;
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }
}

function resetForm() {
  assignmentTitle.value = '';
  dueDate.value = '';
  submissionFormat.value = '';
  assignmentDetailsHeader.value = '';
  assignmentDetailsDescription.value = '';
  attemptCount.value = 1;
  unlimitedAttempts.value = false;
  if (editorRef.value) {
    editorRef.value.innerHTML = '';
  }
}
</script>

<template>
  <div class="assignment-view">
    <h1 class="page-title">Create a New Assignment</h1>
    
    <div class="assignment-form">
      <!-- Existing form fields remain the same -->
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
                <button 
                  @click="formatText('bold')" 
                  class="toolbar-button" 
                  :class="{ active: activeFormats.bold }"
                  title="Bold"
                >
                  <strong>B</strong>
                </button>
                <button 
                  @click="formatText('italic')" 
                  class="toolbar-button" 
                  :class="{ active: activeFormats.italic }"
                  title="Italic"
                >
                  <em>I</em>
                </button>
                <button 
                  @click="formatText('underline')" 
                  class="toolbar-button" 
                  :class="{ active: activeFormats.underline }"
                  title="Underline"
                >
                  <span style="text-decoration: underline">U</span>
                </button>
                <button 
                  @click="formatText('insertUnorderedList')" 
                  class="toolbar-button" 
                  title="Bullet List"
                >
                  <span>• List</span>
                </button>
                <button 
                  @click="formatText('insertOrderedList')" 
                  class="toolbar-button" 
                  title="Numbered List"
                >
                  <span>1. List</span>
                </button>
              </div>
              <div
                ref="editorRef"
                class="editor-content"
                contenteditable="true"
                @input="updateDescriptionContent"
                @paste="handlePaste"
                @mouseup="checkActiveFormats"
                @keyup="checkActiveFormats"
                placeholder="Type assignment description here"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Voice feedback -->
      <p v-if="spokenText" class="voice-feedback">You said: "{{ spokenText }}"</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      
      <!-- Save Button with Voice Command -->
      <button 
        @click="saveAssignment"
        @keydown.space="startListening"
        @keydown.enter="saveAssignment"
        class="save-button"
        :disabled="isLoading"
      >
        <i class="fi fi-ts-ear-sound"></i> 
        {{ isLoading ? 'Saving...' : 'SAVE ASSIGNMENT' }}
      </button>
      
      <button 
        @click="startListening"
        class="voice-trigger-button"
        :disabled="isLoading"
        aria-label="Activate voice commands"
        title="Press and hold to speak"
      >
        <i class="fi fi-ts-microphone"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Quicksand:wght@300..700&display=swap');
@import url('https://cdn-uicons.flaticon.com/3.0.0/uicons-thin-straight/css/uicons-thin-straight.css');

/* Existing styles remain the same, add these new ones: */

.voice-feedback {
  font-size: 0.9rem;
  color: #4b5563;
  margin: 1rem 0;
  font-style: italic;
  text-align: center;
}

.error-message {
  color: #dc2626;
  text-align: center;
  margin: 1rem 0;
}

.save-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 60%;
  height: 50px;
  padding: 0.75rem 1.5rem;
  border-radius: 80px;
  background-color: #D0DFCC;
  color: white;
  font-weight: 500;
  margin: 0 auto;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.save-button:hover {
  background-color: #abb7a8;
}

.save-button:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

.save-button i {
  font-size: 1.2rem;
}

.voice-trigger-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.voice-trigger-button:hover {
  background-color: #2563eb;
  transform: scale(1.05);
}

.voice-trigger-button:active { 
  background-color: #1d4ed8;
  transform: scale(0.95);
}

.voice-trigger-button i {
  font-size: 1.5rem;
}
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

.toolbar-button.active {
  background-color: #D0DFCC;
  color: white;
}

.editor-content {
  min-height: 150px;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0 0 0.5rem 0.5rem;
  outline: none;
  background-color: white;
  font-family: inherit;
}

.editor-content:focus {
  outline: none;
  box-shadow: 0 0 0 2px #d0dfccab;
}

.editor-content[placeholder]:empty:before {
  content: attr(placeholder);
  color: #9ca3af;
}

.hidden-textarea {
  display: none;
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

.voice-command-button {
  background-color: #dbeafe;
  border: 1px solid #60a5fa;
  border-radius: 50px;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: "Lexend", sans-serif;
  cursor: pointer;
}

.voice-command-button:hover {
  background-color: #bfdbfe;
}

.voice-command-button:focus {
  outline: 3px solid #ff8c00;
}
</style>