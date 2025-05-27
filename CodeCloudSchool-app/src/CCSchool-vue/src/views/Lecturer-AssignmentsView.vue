<script setup lang="ts">
import { ref } from 'vue';

const assignmentTitle = ref('');
const dueDate = ref('');
const submissionFormat = ref('');
const assignmentDetailsHeader = ref('');
const assignmentDetailsDescription = ref('');
const attemptCount = ref(1);
const unlimitedAttempts = ref(false);

const submissionFormats = [
  { value: 'pdf', label: 'PDF Document' },
  { value: 'doc', label: 'Word Document' },
  { value: 'zip', label: 'ZIP Archive' },
  { value: 'code', label: 'Code Repository' },
  { value: 'other', label: 'Other Format' }
];

const incrementAttempts = () => {
  if (!unlimitedAttempts.value) {
    attemptCount.value++;
  }
};

const decrementAttempts = () => {
  if (!unlimitedAttempts.value && attemptCount.value > 1) {
    attemptCount.value--;
  }
};

const toggleUnlimitedAttempts = () => {
  unlimitedAttempts.value = !unlimitedAttempts.value;
};

const saveAssignment = () => {
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
};
</script>

<template>
  <div class="assignment-view">
    <h1 class="text-3xl font-bold mb-6">Create a New Assignment</h1>
    
    <div class="assignment-form space-y-6 max-w-3xl">
      <!-- Assignment Title -->
      <div class="form-group">
        <label class="block text-lg font-medium mb-2">Assignment Title</label>
        <input 
          v-model="assignmentTitle"
          type="text" 
          placeholder="Type assignment title here" 
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      
      <!-- Due Date and Attempt Count -->
      <div class="flex flex-wrap gap-6">
        <div class="form-group flex-1 min-w-[200px]">
          <label class="block text-lg font-medium mb-2">Assignment Due Date</label>
          <input 
            v-model="dueDate"
            type="date" 
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
        </div>
        
        <div class="form-group flex-1 min-w-[200px]">
          <label class="block text-lg font-medium mb-2">Set Attempt Count</label>
          <div class="flex items-center gap-2">
            <button 
              @click="decrementAttempts"
              :disabled="unlimitedAttempts"
              class="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              -
            </button>
            <span class="px-4 py-2 bg-gray-100 rounded-lg">
              {{ unlimitedAttempts ? '∞' : attemptCount }}
            </span>
            <button 
              @click="incrementAttempts"
              :disabled="unlimitedAttempts"
              class="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              +
            </button>
            <button 
              @click="toggleUnlimitedAttempts"
              class="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              :class="{ 'bg-blue-100 text-blue-600': unlimitedAttempts }"
            >
              ∞
            </button>
          </div>
        </div>
      </div>
      
      <!-- Submission Format -->
      <div class="form-group">
        <label class="block text-lg font-medium mb-2">Expected Submission Format</label>
        <select 
          v-model="submissionFormat"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>Select a Format</option>
          <option v-for="format in submissionFormats" :key="format.value" :value="format.value">
            {{ format.label }}
          </option>
        </select>
      </div>
      
      <!-- Assignment Details -->
      <div class="form-group">
        <h2 class="text-xl font-bold mb-4">Assignment Details</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-lg font-medium mb-2">Assignment Details Header</label>
            <input 
              v-model="assignmentDetailsHeader"
              type="text" 
              placeholder="Type assignment header here" 
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          
          <div>
            <label class="block text-lg font-medium mb-2">Assignment Details Description</label>
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <!-- Rich Text Editor Toolbar -->
              <div class="bg-gray-100 p-2 border-b border-gray-300 flex flex-wrap gap-2">
                <button class="p-2 hover:bg-gray-200 rounded" title="Bold">
                  <strong>B</strong>
                </button>
                <button class="p-2 hover:bg-gray-200 rounded" title="Italic">
                  <em>I</em>
                </button>
                <button class="p-2 hover:bg-gray-200 rounded" title="Link">
                  <span class="underline">Link</span>
                </button>
                <button class="p-2 hover:bg-gray-200 rounded" title="Bullet List">
                  <span>• List</span>
                </button>
                <button class="p-2 hover:bg-gray-200 rounded" title="Numbered List">
                  <span>1. List</span>
                </button>
              </div>
              <!-- Text Area -->
              <textarea 
                v-model="assignmentDetailsDescription"
                placeholder="Type assignment description here" 
                rows="8"
                class="w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Save Button -->
      <button 
        @click="saveAssignment"
        class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        SAVE ASSIGNMENT
      </button>
    </div>
  </div>
</template>

<style scoped>
.assignment-view {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}
</style>