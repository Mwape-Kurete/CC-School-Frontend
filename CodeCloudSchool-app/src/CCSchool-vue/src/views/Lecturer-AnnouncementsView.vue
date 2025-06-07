<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { AnnouncementService } from '@/api/announcements';
import type { Announcement } from '@/api/announcements';
import DOMPurify from 'dompurify';

const router = useRouter();
const courseId = ref<number>(1);
const lecturerId = ref<number>(1); // Get from auth/session in real app

const title = ref('');
const body = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const editableDiv = ref<HTMLElement | null>(null);

// Toolbar button configurations
const toolbarButtons = [
  { cmd: 'bold', label: 'B', active: false },
  { cmd: 'italic', label: 'I', active: false },
  { cmd: 'underline', label: 'U', active: false },
  { cmd: 'insertUnorderedList', label: '•', active: false },
  { cmd: 'insertOrderedList', label: '1.', active: false }
];

const announcements = ref<Announcement[]>([]);

// Formatting functions
const format = (cmd: string, value?: string) => {
  if (!editableDiv.value) return;
  editableDiv.value.focus();
  document.execCommand(cmd, false, value);
  updateBody();
};

const updateBody = () => {
  body.value = editableDiv.value?.innerHTML || '';
};

const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault();
  const text = e.clipboardData?.getData('text/plain') || '';
  document.execCommand('insertText', false, text);
  updateBody();
};

// Combined storage functions
const saveAnnouncement = async (announcementData: Announcement) => {
  // Save to backend
  const backendResult = await AnnouncementService.postAnnouncement(courseId.value, announcementData);
  
  if (typeof backendResult === 'string') {
    throw new Error(backendResult);
  }

  // Save to localStorage
  const localStorageKey = `announcements_${courseId.value}_${lecturerId.value}`;
  const storedAnnouncements = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
  
  const updatedAnnouncements = [
    ...storedAnnouncements,
    {
      ...backendResult,
      // Ensure we have all required fields
      id: backendResult.id || Date.now().toString(),
      date: backendResult.date || new Date().toISOString()
    }
  ];
  
  localStorage.setItem(localStorageKey, JSON.stringify(updatedAnnouncements));
  
  return backendResult;
};

const loadAnnouncements = async () => {
  try {
    // Try to load from backend first
    const backendAnnouncements = await AnnouncementService.getAnnouncementsByCourseId(courseId.value);
    
    if (typeof backendAnnouncements !== 'string') {
      announcements.value = backendAnnouncements;
      
      // Update localStorage with fresh data from backend
      const localStorageKey = `announcements_${courseId.value}_${lecturerId.value}`;
      localStorage.setItem(localStorageKey, JSON.stringify(backendAnnouncements));
    } else {
      // Fallback to localStorage if backend fails
      const localStorageKey = `announcements_${courseId.value}_${lecturerId.value}`;
      const stored = localStorage.getItem(localStorageKey);
      if (stored) {
        announcements.value = JSON.parse(stored);
      }
      throw new Error(backendAnnouncements);
    }
  } catch (error) {
    console.error('Error loading announcements:', error);
  }
};

// Main announcement sending function
const sendAnnouncement = async () => {
  if (!title.value.trim() || !body.value.trim()) {
    errorMessage.value = 'Please fill in both title and body.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const announcementData: Announcement = {
      title: title.value,
      body: DOMPurify.sanitize(body.value),
      date: new Date().toISOString(),
      lecturerId: lecturerId.value,
      id: Date.now().toString() // Temporary ID until backend responds
    };

    // Save to both storage locations
    const result = await saveAnnouncement(announcementData);
    
    // Reset form
    title.value = '';
    body.value = '';
    if (editableDiv.value) {
      editableDiv.value.innerHTML = '';
    }
    
    // Refresh announcements
    await loadAnnouncements();
    router.push('/LecturerAnnounceOver');
  } catch (error: unknown) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to create announcement';
    console.error('Error:', error);
  } finally {
    isLoading.value = false;
  }
};

// Initial load
onMounted(() => {
  loadAnnouncements();
  if (editableDiv.value) {
    editableDiv.value.innerHTML = body.value;
  }
});

// Date formatting helper
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
</script>

<template>
  <div class="announcement-container">
    <h1 class="main-title">Create An Announcement</h1>
    <div class="announcement-card">
      <h2 class="card-title">Create an Announcement</h2>
      <div class="form-container">
        <div class="input-group">
          <label class="input-label" for="announcement-title">Title</label>
          <InputText
            id="announcement-title"
            v-model="title"
            placeholder="Title"
            class="custom-input"
          />
        </div>
        <div class="input-group">
          <label class="input-label">Body</label>
          <div class="toolbar">
            <button
              v-for="btn in toolbarButtons"
              :key="btn.cmd"
              @click.prevent="format(btn.cmd)"
              :class="{ 'active-format': btn.active }"
              :title="btn.cmd"
            >
              {{ btn.label }}
            </button>
          </div>
          <div
            ref="editableDiv"
            contenteditable="true"
            @input="updateBody"
            @paste="handlePaste"
            class="rich-textarea"
            placeholder="Type your announcement here..."
          ></div>
        </div>
        <Button
          label="SEND ANNOUNCEMENT"
          class="send-button"
          @click="sendAnnouncement"
          :loading="isLoading"
        />
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&display=swap');
.announcement-container {
  padding: 2rem;
  font-family: "Quicksand", sans-serif;
}

.main-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.announcement-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #5f5f5f;
}

.custom-input {
  border: 1px solid #cbd5e1;
  border-radius: 50px;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  width: 100%;
  font-family: inherit;
}

.toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.toolbar button {
  background-color: #D0DFCC;
  border: 1px solid #aab7a7;
  border-radius: 4px;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 32px;
  text-align: center;
}

.toolbar button:hover {
  background-color: #c0d0bd;
}

.toolbar button.active-format {
  background-color: #aab7a7;
  color: white;
}

.rich-textarea {
  min-height: 300px;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
  padding: 1rem;
  line-height: 1.75;
  overflow-y: auto;
  outline: none;
}

.rich-textarea:empty:before {
  content: attr(placeholder);
  color: #94a3b8;
  pointer-events: none;
}

.send-button {
  width: 70%;
  background-color: #D0DFCC;
  color: black;
  border: none;
  border-radius: 50px;
  padding: 0.625rem 1.25rem;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  margin-top: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.send-button:hover {
  background-color: #aab7a7;
}

.error-message {
  color: #dc2626;
  text-align: center;
  margin-top: 0.5rem;
}

.rich-textarea b,
.rich-textarea strong {
  font-weight: bold;
}

.rich-textarea i,
.rich-textarea em {
  font-style: italic;
}

.rich-textarea u {
  text-decoration: underline;
}

.rich-textarea ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.rich-textarea ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
}
</style>