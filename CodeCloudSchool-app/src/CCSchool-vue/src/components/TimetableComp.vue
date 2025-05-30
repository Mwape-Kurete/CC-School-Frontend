
<script setup>
const slotHeight = 80;

const days = [
  { name: 'Mon', date: 7 },
  { name: 'Tue', date: 8 },
  { name: 'Wed', date: 9 },
  { name: 'Thu', date: 10 },
  { name: 'Fri', date: 11 },
  { name: 'Sat', date: 12 },
  { name: 'Sun', date: 13 },
];

const hours = [
  '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm'
];

const events = [
  { title: 'CS 101', class: 'Class: H6', day: 0, startHour: 9, duration: 2, dark: true },
  { title: 'CS 101', class: 'Class: H6', day: 1, startHour: 10, duration: 1, dark: false },
  { title: 'CS 101', class: 'Class: H6', day: 1, startHour: 11, duration: 1, dark: true },
  { title: 'CS 101', class: 'Class: H6', day: 1, startHour: 14, duration: 1, dark: true },
  { title: 'CS 101', class: 'Class: H6', day: 1, startHour: 15, duration: 1, dark: false },
  { title: 'CS 101', class: 'Class: H6', day: 2, startHour: 10, duration: 1, dark: true },
  { title: 'CS 101', class: 'Class: H6', day: 3, startHour: 12, duration: 1, dark: false },
  { title: 'CS 101', class: 'Class: H6', day: 4, startHour: 16, duration: 1, dark: true },
];
</script>


<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <div class="time-column-header"></div>
      <div
        v-for="(day, index) in days"
        :key="index"
        class="day-header"
      >
        <div>{{ day.name }}</div>
        <div>{{ day.date }}</div>
      </div>
    </div>

    <div class="calendar-body">
      <!-- Time column -->
      <div class="time-column">
        <div
          v-for="(time, index) in hours"
          :key="index"
          class="time-cell"
        >
          {{ time }}
        </div>
      </div>

      <!-- Day columns with events -->
      <div class="day-columns">
        <div
          v-for="(day, dayIndex) in days"
          :key="dayIndex"
          class="day-column"
        >
          <!-- Background slots -->
          <div
            v-for="i in hours.length"
            :key="i"
            class="slot"
          ></div>

          <!-- Events -->
          <div
            v-for="(event, eventIndex) in events.filter(e => e.day === dayIndex)"
            :key="eventIndex"
            class="event"
            :class="{ dark: event.dark }"
            :style="{
              top: `${(event.startHour - 9) * slotHeight}px`,
              height: `${event.duration * slotHeight}px`,
            }"
          >
            <strong>{{ event.title }}</strong><br />
            {{ event.class }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  font-family: 'Poppins', sans-serif;
  margin: 20px;
}

.calendar-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}

.calendar-header {
  display: grid;
  grid-template-columns: 60px repeat(7, 1fr);
  text-align: center;
  font-weight: 500;
  border-bottom: 2px solid black;
  margin-bottom: 4px;
}

.day-header {
  padding: 4px;
}

.calendar-body {
  display: flex;
  height: 800px;
  overflow-y: scroll;
  border-left: 4px solid black;
}

.time-column {
  width: 60px;
  display: flex;
  flex-direction: column;
  text-align: right;
  padding-right: 4px;
  font-size: 14px;
}

.time-cell {
  height: 80px;
  padding-top: 8px;
}

.day-columns {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  flex: 1;
  position: relative;
}

.day-column {
  border-right: 1px solid #ddd;
  position: relative;
}

.slot {
  height: 80px;
  border-bottom: 1px solid #eee;
}

.event {
  position: absolute;
  left: 10%;
  width: 80%;
  background: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 4px;
  font-size: 12px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
}

.event.dark {
  background: black;
  color: white;
  border: none;
}
</style>
