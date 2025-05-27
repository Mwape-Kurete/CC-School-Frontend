<script setup lang="ts">
import { ref, onMounted,markRaw} from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const router = useRouter();
const title = ref('');
const body = ref('');

const format = (cmd: string, value?: string) => {
  document.execCommand(cmd, false, value);
  body.value = document.getElementById('editable')?.innerHTML || '';
};

const updateBody = () => {
  body.value = document.getElementById('editable')?.innerHTML || '';
};

const sendAnnouncement = () => {
  if (title.value.trim() && body.value.trim()) {
    const stored = localStorage.getItem('Announcements');
    const announcements = stored ? JSON.parse(stored) : [];

    announcements.unshift({
      id: Date.now().toString(),
      title: title.value,
      body: body.value,
      createdAt: new Date().toISOString()
    });

    sessionStorage.setItem('Announcements', JSON.stringify(announcements));
    title.value = '';
    body.value = '';
    document.getElementById('editable')!.innerHTML = '';
    router.push('LecturerAnnounceOver');
  }
};
</script>

<template>
  <div class="announcement-container">
    <h1 class="main-title">Create An Announcement</h1>

    <div class="announcement-card">
      <h2 class="card-title">Create an Announcement</h2>

      <div class="form-container">
        <div class="input-group">
          <label class="input-label">Announcement Title</label>
          <InputText
            v-model="title"
            placeholder="Type announcement title here"
            class="custom-input"
          />
        </div>

        <div class="input-group">
          <label class="input-label">Announcement Body</label>

          <div class="toolbar">
            <button @click.prevent="format('bold')"><strong>B</strong></button>
            <button @click.prevent="format('italic')"><em>I</em></button>
            <button @click.prevent="format('underline')"><u>U</u></button>
            <button @click.prevent="format('insertUnorderedList')">• List</button>
            <button @click.prevent="format('formatBlock', '<h2>')">H2</button>
          </div>

          <div
            id="editable"
            contenteditable="true"
            class="rich-textarea"
            @input="updateBody"
          ></div>
        </div>

        <Button
          label="SEND ANNOUNCEMENT"
          class="send-button"
          @click="sendAnnouncement"
        />
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