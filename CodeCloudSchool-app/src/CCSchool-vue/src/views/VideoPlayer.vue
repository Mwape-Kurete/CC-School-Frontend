<template>
  <div class="video-container">
    <video controls>
      <source src="@/assets/ESP Now Boards Setup.mp4" type="video/mp4" />
      <track
        label="English"
        kind="subtitles"
        src="/captions.vtt"
        srclang="en"
        default
      />
    </video>
    <button @click="toggleCaptions" class="caption-btn">
      {{ captionsOn ? "Hide Captions" : "Show Captions" }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const captionsOn = ref(true);

const toggleCaptions = () => {
  const video = document.querySelector('video');
  const track = video.textTracks[0];
  track.mode = captionsOn.value ? "hidden" : "showing";
  captionsOn.value = !captionsOn.value;
};
</script>

<style>
.video-container {
  max-width: 800px;
  margin: 0 auto;
  background-size: cover;
  background-position: center;
  padding: 20px;
}

video{
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.caption-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background: #35495e;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>