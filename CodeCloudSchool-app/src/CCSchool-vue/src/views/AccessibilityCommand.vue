<template>
  <div>
    <button @click="startListening" class="voice-btn"> <!-- Fixed: Added @click handler -->
      🎤 {{ isListening ? "Listening..." : "I'm Listening..." }} 
    </button>
    <p v-if="spokenText">You said: "{{ spokenText }}"</p>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
  
const isListening = ref(false);
const spokenText = ref("");
const error = ref("");

const startListening = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    error.value = "Speech recognition not supported in this browser.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    isListening.value = true;
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    spokenText.value = transcript;
    executeCommand(transcript.toLowerCase());
  };

  recognition.onerror = (event) => {
    error.value = `Error: ${event.error}`;
    isListening.value = false;
  };

  recognition.onend = () => {
    isListening.value = false;
  };

  recognition.start();
};

const executeCommand = (command) => {
  if (command.includes("publish announcement") || command.includes("submit form")) {
    alert("Form submitted via voice!");
    router.push('/LecturerAnnounceOver');
  } else if (command.includes("navigate")) { 
    alert("Navigating to home page...");
  } else if (command.includes("grades")){
    alert("Opening grades page...");
  } else {
    alert("Command not recognized.");
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Quicksand:wght@300..700&display=swap');

.voice-btn {
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  color: #181818;
  border: 1px solid #181818;
  border-radius: 4px;
  font-family: "Lexend", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  background-color: white;
  color: #181818;
  border: 1px solid #181818;
}

.voice-btn:hover{
  background-color: #181818;
  color: white;
}
.error {
  color: red;
}
</style> 