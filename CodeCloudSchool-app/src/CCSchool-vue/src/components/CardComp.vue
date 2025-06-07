<script setup>
import Button from 'primevue/button'
defineProps({
  cardType: {
    type: String,
    default: 'module', // or 'announcement'
  },

  // prop for image
  moduleImg: String,

  // Props for module card
  moduleTitleLine1: String,
  moduleTitleLine2: String,
  moduleEventLabel: String,
  moduleCode: String,
  moduleClassId: String,
  moduleTime: String,

  // Props for announcement card
  announcementTitle: String,
  announcementBody: String,
  announcementDate: String,

  // Props for assignment card
  assignmentTitle: String,
  assignmentBody: String,
  assignmentDate: String,
})
</script>

<template>
  <div
    class="card-container"
    :class="{
      'module-card': cardType === 'module',
      'announcement-card': cardType === 'announcement',
    }"
  >
    <!-- MODULE CARD -->
    <template v-if="cardType === 'module'" @click="$emit('click', $event)">
      <!-- Left Section -->
      <div
        class="left-section"
        :style="
          moduleImg
            ? {
                backgroundImage: `url('${moduleImg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {}
        "
      >
        <div class="course-title">
          <div>{{ moduleTitleLine1 }}</div>
          <div>{{ moduleTitleLine2 }}</div>
        </div>
      </div>

      <!-- Right Section as flex row -->
      <div class="right-section-row">
        <div class="details">
          <div class="event-label">{{ moduleEventLabel }}</div>
          <div class="course-code">{{ moduleCode }}</div>
          <div class="class-id">Class: {{ moduleClassId }}</div>
        </div>
        <Button :label="moduleTime" class="time-button p-button-rounded p-button-text" />
      </div>
    </template>

    <!-- ANNOUNCEMENT CARD -->
    <template v-else-if="cardType === 'announcement'" @click="$emit('click', $event)">
      <div
        class="announcement-avatar"
        :style="
          moduleImg
            ? {
                backgroundImage: `url('${moduleImg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {}
        "
      >
        <!-- <i class="pi pi-image" style="font-size: 1.5rem; color: #999;"></i> -->
      </div>
      <div class="announcement-content">
        <div class="announcement-title">{{ announcementTitle }}</div>
        <div class="announcement-body">{{ announcementBody }}</div>
      </div>
      <div class="announcement-time">
        <Button
          :label="`Posted On: ${announcementDate}`"
          class="time-button p-button-rounded p-button-text"
        />
      </div>
    </template>

    <template v-else @click="$emit('click', $event)">
      <div
        class="announcement-avatar"
        :style="
          moduleImg
            ? {
                backgroundImage: `url('${moduleImg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {}
        "
      >
        <!-- <i class="pi pi-image" style="font-size: 1.5rem; color: #999;"></i> -->
      </div>
      <div class="announcement-content">
        <div class="announcement-title">{{ assignmentTitle }}</div>
        <div class="announcement-body">{{ assignmentBody }}</div>
      </div>
      <div class="announcement-time">
        <Button
          :label="`Due: ${assignmentDate}`"
          class="time-button p-button-rounded p-button-text"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  background-color: #F7F6FB;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Quicksand', sans-serif;
  margin: 1rem auto;
  padding: 1rem;
}

.card-container:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.card-container.announcement-card {
  padding: 1rem !important;
  display: flex;
  align-items: center;
}

/* MODULE CARD STYLES */
.left-section {
  background-color: #d1d1d1;
  width: 30%;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 20px;
}

.course-title {
  text-align: center;
  color: #F7F6FB;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.4;
}

.right-section-row {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem;
  min-width: 0;
}

.event-label {
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 0.3rem;
  letter-spacing: 0.05em;
}

.course-code {
  font-size: 1.25rem;
  font-weight: bold;
  color: #444;
}

.class-id {
  font-size: 0.9rem;
  color: #666;
}

/* ANNOUNCEMENT CARD STYLES */
.announcement-avatar {
  background-color: #d1d1d1;
  width: 60px;
  height: 60px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.announcement-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  margin-left: 1rem;
  margin-right: 1rem;
}

.announcement-title {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.announcement-body {
  font-size: 0.85rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.announcement-time {
  white-space: nowrap;
}

/* Shared button styling */
.time-button {
  background-color: #D8DFE9!important;
  color: #212121 !important;
  font-size: 0.85rem;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: none;
  width: 25%;
}
</style>
