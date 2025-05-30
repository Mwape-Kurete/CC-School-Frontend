<script setup>
import { MoveLeft, MoveRight } from 'lucide-vue-next';

const slotHeight = 80;

const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.

// Adjust because we want Monday to be the first day of the week
const adjustedToday = (today === 0) ? 6 : today - 1;


const days = [
    { name: 'Mon', date: 26 },
    { name: 'Tue', date: 27 },
    { name: 'Wed', date: 28 },
    { name: 'Thu', date: 29 },
    { name: 'Fri', date: 30 },
    { name: 'Sat', date: 31 },
    { name: 'Sun', date: 1 },
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
        <h1 class="calendar-title">
            May 2025 / W4
            <MoveLeft class="cursor-pointer" size="36" />
            <MoveRight class="cursor-pointer" size="36" />
        </h1>
        <div class="calendar-header">
            <div class="time-column-header"></div>
            <div v-for="(day, index) in days" :key="index"
                :class="['day-header', { 'current-day': index === adjustedToday, 'not-today': index !== adjustedToday }]">
                <div class="day-date">{{ day.date }}</div>
                <div class="day-name">{{ day.name }}</div>
                <div class="linePointer"></div>
            </div>
        </div>

        <div class="calendar-body">
            <!-- Time column -->
            <div class="time-column">
                <div v-for="(time, index) in hours" :key="index" class="time-cell">
                    {{ time }}
                </div>
            </div>

            <!-- Day columns with events -->
            <div class="day-columns">
                <div v-for="(day, dayIndex) in days" :key="dayIndex" class="day-column">
                    <!-- Background slots -->
                    <div v-for="i in hours.length" :key="i" class="slot"></div>

                    <!-- Events -->
                    <div v-for="(event, eventIndex) in events.filter(e => e.day === dayIndex)" :key="eventIndex"
                        class="event" :class="{ dark: event.dark }" :style="{
                            top: `${(event.startHour - 9) * slotHeight}px`,
                            height: `${event.duration * slotHeight}px`,
                        }">
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
    font-family: 'quicksand', sans-serif;
    margin: 20px;
}


.calendar-title {
    width: 100%;
    margin-top: -2%;
    font-size: 48px;
    font-weight: 400;
    margin-bottom: 1%;   
    display: inline-block; 
}

.cursor-pointer{
    cursor: pointer;
    margin-left: 2%;
    margin-right: 1%;
}


.calendar-header {
    display: grid;
    grid-template-columns: 60px repeat(7, 1fr);
    align-items: end;
    margin-bottom: 1%;
}


.day-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    padding-bottom: 6px;
    gap: 4px;
    color: #aaa;
    /* Default greyed out */
    transition: color 0.3s ease;
}

.day-header.current-day {
    color: #212121 !important;
}


.day-date {
    font-family: 'quicksand', sans-serif;
    font-weight: 600;
    font-size: 48px;
    line-height: 1;
}

.day-name {
    font-family: 'quicksand', sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 1;
    margin-bottom: 8%;
}

.linePointer {
    width: 6px;
    border-radius: 5px;
    height: 30px;
}

.day-header .linePointer {
    background-color: #aaa;
}

.day-header.current-day .linePointer {
    background-color: #212121;
}



.calendar-body {
    display: flex;
    height: 800px;
    overflow-y: scroll;
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
    border-right: 1px solid #ff000025;
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
    border: 1px solid #212121;
    border-radius: 10px;
    padding: 4px;
    font-size: 12px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
}

.event.dark {
    background: #212121;
    color: white;
    border: none;
}
</style>
