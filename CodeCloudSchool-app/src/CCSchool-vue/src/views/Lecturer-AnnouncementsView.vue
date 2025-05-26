<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
    const stored = sessionStorage.getItem('announcements');
    const announcements = stored ? JSON.parse(stored) : [];

    announcements.unshift({
      id: Date.now().toString(),
      title: title.value,
      body: body.value,
      createdAt: new Date().toISOString()
    });

    sessionStorage.setItem('announcements', JSON.stringify(announcements));
    title.value = '';
    body.value = '';
    document.getElementById('editable')!.innerHTML = '';
    router.push('/views/LecturerAnnounceOver');
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
.announcement-container {
  padding: 2rem;
  background-color: #f8fafc;
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
  color: #64748b;
}

.custom-input {
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
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
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
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
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
  font-family: 'Georgia', serif;
  padding: 1rem;
  line-height: 1.75;
  overflow-y: auto;
}

.send-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.625rem 1.25rem;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  align-self: flex-end;
  margin-top: 0.5rem;
}

.send-button:hover {
  background-color: #2563eb;
}
</style>