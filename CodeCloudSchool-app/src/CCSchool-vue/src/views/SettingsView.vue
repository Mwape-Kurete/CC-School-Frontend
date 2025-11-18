<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const accessibilityEnabled = ref(false);
const darkModeEnabled = ref(false);
const textToSpeechEnabled = ref(false);

// Load settings from localStorage
onMounted(() => {
  accessibilityEnabled.value = JSON.parse(localStorage.getItem('accessibility') || 'false');
  darkModeEnabled.value = JSON.parse(localStorage.getItem('darkMode') || 'false');
  textToSpeechEnabled.value = JSON.parse(localStorage.getItem('textToSpeech') || 'false');
  applyDarkMode(darkModeEnabled.value);
});

// Save settings on change
watch(accessibilityEnabled, (val) => {
  localStorage.setItem('accessibility', JSON.stringify(val));
});

watch(textToSpeechEnabled, (val) => {
  localStorage.setItem('textToSpeech', JSON.stringify(val));
});

watch(darkModeEnabled, (val) => {
  localStorage.setItem('darkMode', JSON.stringify(val));
  applyDarkMode(val);
});

// Apply or remove dark mode class
function applyDarkMode(enabled: boolean) {
  document.body.classList.toggle('dark-mode', enabled);
}
</script>

<template>
  <div class="settings-view">
    <h1 class="title">Settings</h1>

    <div class="setting-section">
      <h2 class="section-title">Accessibility Settings</h2>

      <div class="setting-item">
        <label class="label">Enable Accessibility for Students</label>
        <input type="checkbox" v-model="accessibilityEnabled" />
      </div>

      <div class="setting-item">
        <label class="label">Enable Dark Mode</label>
        <input type="checkbox" v-model="darkModeEnabled" />
      </div>

      <div class="setting-item">
        <label class="label">Enable Text-to-Speech</label>
        <input type="checkbox" v-model="textToSpeechEnabled" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');

.settings-view {
  padding: 2rem;
  font-family: "Quicksand", sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.setting-section {
  background-color: var(--card-bg);
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.setting-item:last-child {
  border-bottom: none;
}

.label {
  font-size: 1rem;
}

/* Toggle styling */
input[type="checkbox"] {
  width: 1.5rem;
  height: 1.5rem;
  accent-color: #D0DFCC;
}

/* Theme variables */
:root {
  --bg-color: #f9fafb;
  --text-color: #1e293b;
  --card-bg: #ffffff;
}

body.dark-mode {
  --bg-color: #1e293b;
  --text-color: #f8fafc;
  --card-bg: #334155;
}
</style>