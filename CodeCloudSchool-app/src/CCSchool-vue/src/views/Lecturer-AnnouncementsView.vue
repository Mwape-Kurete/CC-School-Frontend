<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import { AnnouncementService } from '@/api/announcements';
import DOMPurify from 'dompurify';

// Extend the Window interface to include SpeechRecognition types
interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}

// Declare SpeechRecognition type if not available globally
declare var SpeechRecognition: {
  new (): any;
};
declare var webkitSpeechRecognition: {
  new (): any;
};

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

const router = useRouter();
const courseId = ref<number>(1);
const lecturerId = ref<number>(1);

const title = ref('');
const body = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const spokenText = ref('');
const editableDiv = ref<HTMLElement | null>(null);
const publishButton = ref<HTMLElement | null>(null);

const toolbarButtons = [
  { cmd: 'bold', label: 'B', active: false },
  { cmd: 'italic', label: 'I', active: false },
  { cmd: 'underline', label: 'U', active: false },
  { cmd: 'insertUnorderedList', label: '•', active: false },
  { cmd: 'insertOrderedList', label: '1.', active: false }
];

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

const saveAnnouncement = async (announcementData: {
  title: string;
  body: string;
}) => {
  try {
    const backendResult = await AnnouncementService.postAnnouncement(
      courseId.value, 
      {
        title: announcementData.title,
        body: DOMPurify.sanitize(announcementData.body),
        date: new Date().toISOString(),
        lecturerId: lecturerId.value,
        id: '',
        createdAt: ''
      }
    );
    
    if (typeof backendResult === 'string') {
      throw new Error(backendResult);
    }

    const key = `announcements_${courseId.value}_${lecturerId.value}`;
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    const updated = [...stored, backendResult];
    localStorage.setItem(key, JSON.stringify(updated));
    
    return backendResult;
  } catch (error) {
    console.error('Error saving announcement:', error);
    throw error;
  }
};

const sendAnnouncement = async () => {
  if (!title.value.trim() || !body.value.trim()) {
    errorMessage.value = 'Title and content are required';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    await saveAnnouncement({
      title: title.value,
      body: body.value
    });
    
    title.value = '';
    body.value = '';
    if (editableDiv.value) editableDiv.value.innerHTML = '';
    
    router.push('/LecturerAnnounceOver');
  } catch (error: unknown) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to create announcement';
  } finally {
    isLoading.value = false;
  }
};

// Voice command integration
const handleVoiceCommand = async (command: string) => { 
  spokenText.value = command;
  
  try {
    if (command.includes('publish') || command.includes('submit') || 
        command.includes('post') || command.includes('send')) {
      if (publishButton.value) {
        publishButton.value.click();
      }
    } else if (command.includes('clear') || command.includes('reset')) {
      title.value = '';
      body.value = '';
      if (editableDiv.value) editableDiv.value.innerHTML = '';      
      errorMessage.value = '';
    } else if (command.includes('cancel') || command.includes('back')) {
        router.push('/LecturerAnnounceOver');
    } else {
      errorMessage.value = "Command not recognized. Try 'publish', 'clear', or 'cancel'";
    }
  } catch (error) {
    console.error('Error handling voice command:', error);
    errorMessage.value = 'Its Chaai...! Please try again.';
  }
};

onMounted(() => {
  if (editableDiv.value) {
    editableDiv.value.innerHTML = body.value; 
  }
  nextTick(() => {
    if (publishButton.value) {
      publishButton.value.focus();
    }
  });
});
</script>

<template>
  <div class="announcement-container">
    <h1 class="main-title">Create Announcement</h1>
    <div class="announcement-card">
      <h2 class="card-title">New Announcement</h2>
      
      <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/3.0.0/uicons-thin-straight/css/uicons-thin-straight.css'>
      
      <button @click="startListening" class="voice-command-button">
        <i class="fi fi-ts-ear-sound"></i> 
      </button>
      <p v-if="spokenText" class="voice-feedback">You said: "{{ spokenText }}"</p>
      
      <div class="form-container">
        <div class="input-group">
          <label for="announcement-title" class="input-label">Title</label>
          <InputText
            id="announcement-title"
            v-model="title"
            placeholder="Announcement title"
            class="custom-input"
            aria-label="Announcement title input"
            :disabled="isLoading"
          />
        </div>
        
        <div class="input-group">
          <label class="input-label">Announcement Body </label>
          <div class="toolbar">
            <button
              v-for="btn in toolbarButtons"
              :key="btn.cmd"
              @click.prevent="format(btn.cmd)"
              @keydown.enter="format(btn.cmd)"
              @keydown.space="format(btn.cmd)"
              :title="btn.cmd"
              :aria-label="`Format ${btn.cmd}`"
              :disabled="isLoading"
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
            aria-label="Announcement content editor"
            role="textbox"
            :aria-disabled="isLoading"
          ></div>
        </div>
        
        <div class="button-group">
          <button 
            @click="router.push('/LecturerAnnounceOver')" 
            class="cancel-button"
            :disabled="isLoading"
          >
            Cancel
          </button>
          <button
          ref="publishButton"
            label="Publish Announcement"
            class="send-button"
            @click="sendAnnouncement"
            @keydown.enter="sendAnnouncement"
            @keydown.space="sendAnnouncement"
            :loading="isLoading"
            aria-label="Publish announcement button"
            :disabled="isLoading"
            v-bind="$attrs">
            Publish Announcement
          </button>
        </div>
        
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Quicksand:wght@300..700&display=swap');
@import url('https://cdn-uicons.flaticon.com/3.0.0/uicons-thin-straight/css/uicons-thin-straight.css');

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

.voice-command {
  margin-bottom: 1rem;
}

.voice-feedback {
  font-size: 0.9rem;
  color: #4b5563;
  margin-bottom: 1rem;
  font-style: italic;
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

.toolbar button:focus {
  outline: 3px solid #ff8c00;
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

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.send-button {
  background-color: #D0DFCC;
  color: black;
  border: none;
  border-radius: 50px;
  padding: 0.625rem 1.25rem;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  margin-top: 0.5rem;
  font-family: "Quicksand", sans-serif;
}

.send-button:hover {
  background-color: #aab7a7;
}

.send-button:focus {
  outline: 3px solid #ff8c00;
}

.cancel-button {
  background-color: #f0f0f0;
  color: #181818;
  border: 1px solid #cbd5e1;
  border-radius: 50px;
  padding: 0.625rem 1.25rem;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  margin-top: 0.5rem;
  font-family: "Quicksand", sans-serif;
}

.cancel-button:hover {
  background-color: #e0e0e0;
}

.cancel-button:focus {
  outline: 3px solid #ff8c00;
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

.voice-command-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

.voice-command-button i {
  font-size: 1rem;
}

.rich-textarea ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
}
</style>