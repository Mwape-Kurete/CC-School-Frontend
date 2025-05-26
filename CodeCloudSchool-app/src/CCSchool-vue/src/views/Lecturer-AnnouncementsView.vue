<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Editor from 'primevue/editor'; // For rich text editing

const announcement = ref({
  title: '',
  body: ''
});

const sendAnnouncement = () => {
  console.log('Announcement sent:', announcement.value);
  // Add your submission logic here
};
</script>

<template>
  <div class="courses-view">
    <h1 class="section-title">Create An Announcement</h1>
    
    <div class="announcement-form">
      <div class="form-group">
        <label for="announcement-title">Announcement Title</label>
        <InputText 
          id="announcement-title" 
          v-model="announcement.title" 
          placeholder="Type announcement title here" 
          class="w-full"
        />
      </div>

      <div class="form-group">
        <label for="announcement-body">Announcement Body</label>
        <Editor 
          id="announcement-body"
          v-model="announcement.body" 
          editorStyle="height: 200px"
          placeholder="Type announcement body here"
        />
      </div>

      <Button 
        label="SEND ANNOUNCEMENT" 
        class="send-button"
        @click="sendAnnouncement"
      />
    </div>
  </div>
</template>

<style scoped>
.courses-view {
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.announcement-form {
  max-width: 800px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.w-full{
  border: 1px solid #e5e7eb;
  border-radius : 50px;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: red;
}

.send-button {
  background-color: #3b82f6; /* Blue color similar to PrimeVue primary */
  color: white;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
}

.send-button:hover {
  background-color: #2563eb;
}
</style>