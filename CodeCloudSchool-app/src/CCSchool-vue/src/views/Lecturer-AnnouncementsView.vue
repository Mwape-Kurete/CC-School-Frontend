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

const title = ref('');
const body = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const editableDiv = ref<HTMLElement | null>(null);

const announcements = ref<Array<{
  id: string;
  title: string;
  description: string;
  date: string;
  moduleImg?: string;
}>>([]);

const searchQuery = ref('');
const announcementType = ref<'all' | 'recent' | 'old'>('all');
const sortBy = ref<'date' | 'lecture' | 'subject'>('date');

// Formatting functions
const format = (cmd: string, value?: string) => {
  document.execCommand(cmd, false, value);
  body.value = editableDiv.value?.innerHTML || '';
};

const updateBody = () => {
  body.value = editableDiv.value?.innerHTML || '';
};

// Save to localStorage function
function saveToLocalStorage(announcementData: Announcement) {
  const key = `announcements_${courseId.value}_${announcementData.lecturerId}`;
  const storedAnnouncements = JSON.parse(localStorage.getItem(key) || '[]');
  const newAnnouncement = {
    ...announcementData,
    id: Date.now().toString(),
    date: announcementData.date,
  };
  storedAnnouncements.push(newAnnouncement);
  localStorage.setItem(key, JSON.stringify(storedAnnouncements));
}

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
      description: DOMPurify.sanitize(body.value),
      date: new Date().toISOString(),
      lecturerId: 1,
      announcementId: Date.now(),
    };

    const result = await AnnouncementService.postAnnouncement(courseId.value, announcementData);

    if (typeof result === 'string') {
      errorMessage.value = result;
    } else {
      await fetchAnnouncements();
      saveToLocalStorage(announcementData);
      
      // Reset form after successful submission
      title.value = '';
      body.value = '';
      if (editableDiv.value) {
        editableDiv.value.innerHTML = '';
      }
      
      errorMessage.value = '';
      router.push('/LecturerAnnounceOver');
    }
  } catch (error: unknown) {
    errorMessage.value = 'Failed to create announcement. Please try again.';
    console.error('Error:', error);
  } finally {
    isLoading.value = false;
  }
};

// Fetch announcements function
const fetchAnnouncements = async () => {
  const result = await AnnouncementService.getAnnouncementsByCourseId(courseId.value);
  if (typeof result !== 'string') {
    announcements.value = result.map((a: any) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      date: a.date,
      moduleImg: a.moduleImg || null
    }));
  }
};

onMounted(fetchAnnouncements);

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

// Computed property for filtered announcements
const filteredAnnouncements = computed(() => {
  let filtered = [...announcements.value];

  if (announcementType.value === 'recent') {
    filtered = filtered.filter(a => {
      const createdDate = new Date(a.date);
      const now = new Date();
      const diffInDays = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
      return diffInDays <= 7;
    });
  } else if (announcementType.value === 'old') {
    filtered = filtered.filter(a => {
      const createdDate = new Date(a.date);
      const now = new Date();
      const diffInDays = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
      return diffInDays > 7;
    });
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
    );
  }

  if (sortBy.value === 'date') {
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (sortBy.value === 'lecture') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy.value === 'subject') {
    filtered.sort((a, b) => a.description.localeCompare(b.description));
  }

  return filtered;
});
</script>

<!-- Your template and style sections remain unchanged -->
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
            <button @click.prevent="format('bold')">B</button>
            <button @click.prevent="format('italic')">I</button>
            <button @click.prevent="format('underline')">U</button>
          </div>
          <div
            ref="editableDiv"
            contenteditable="true"
            @input="updateBody"
            class="rich-textarea"
          ></div>
        </div>
        <Button
          label="SEND ANNOUNCEMENT"
          class="send-button"
          @click="sendAnnouncement"
          :loading="isLoading"
        />
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>



<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Quicksand:wght@300..700&display=swap');
.announcement-container {
  padding: 2rem;
  
}

.main-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.announcement-card {
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
  font-family: "Quicksand", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
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
}

.toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.toolbar button {
  background-color: #D0DFCC;
  border: 1px solid #aab7a7;
  border-radius: 50px;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer; 
  transition: background-color 0.2s ease;
}

.toolbar button:hover {
  background-color: #e2e8f0;
}

.rich-textarea {
  min-height: 300px;
  font-family: "Quicksand", sans-serif;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
  padding: 1rem;
  line-height: 1.75;
  overflow-y: auto;
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
  margin-left: 100px;
}

.send-button:hover {
  background-color: #aab7a7;
}
</style>