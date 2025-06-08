<script setup lang="ts">
import { MoveLeft, MoveRight } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';
import { timetableServices } from '@/api/timetable';
import type { TimeSlot } from '@/api/timetable';
import { StudentService } from '@/api/student';

const userId = ref<number | undefined>(undefined);
const timetable = ref<TimeSlot[]>([]);
const events = ref<any[]>([]);
const error = ref<string | null>(null);



const slotHeight = 80;

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Get today's date and day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const today = new Date();
const dayOfWeek = today.getDay();

// Compute how many days to subtract to get to Monday (adjust for Sunday = 0)
const diffToMonday = (dayOfWeek === 0) ? -6 : 1 - dayOfWeek;

// Start from Monday
const monday = new Date(today);
monday.setDate(today.getDate() + diffToMonday);

// Build the days array dynamically
const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    return {
        name: dayNames[i],
        date: date.getDate()
    };
});

// Adjusted today index (0 = Monday)
const adjustedToday = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;


const hours = [
    '8 am','9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm'
];


onMounted(async () => {
    await fetchStudentDetails();

    console.log("user id: ", userId.value)
    if (userId.value !== undefined) {
        const result = await timetableServices.fetchTimetableByStudentId(userId.value);
        if (typeof result === 'string') {
            error.value = result;
        } else {
            timetable.value = result;

            // convert timeslot[] into events
            events.value = result.map(slot => {
                const startHour = timeToHour(slot.startTime);
                const endHour = timeToHour(slot.endTime);
                return {
                    title: slot.className,
                    class: `Class: ${slot.classDescription}`,
                    day: dayMap[slot.day],
                    startHour: startHour,
                    duration: endHour - startHour,
                    dark: (slot.timeSlotId) % 2 === 1 //styling condition
                }
            });
        }
    }

});

// functions 
const fetchStudentDetails = async () => {
    const studentNumber = localStorage.getItem('studentNumber');
    if (studentNumber != null) {
        const response = await StudentService.getStudentByStudentNumber(studentNumber);
        if (typeof response !== 'string' && response.userId !== undefined) {
            userId.value = response.userId;
        } else {
            error.value = typeof response === 'string' ? response : 'User not found';
        }
    }
}

// Helper: convert "13:00" to number 13
const timeToHour = (time: string): number => {
    return parseInt(time.split(':')[0], 10);
};

// Mapping of day strings to index (0 = Mon, 6 = Sun)
const dayMap: Record<string, number> = {
    'Monday': 0,
    'Tuesday': 1,
    'Wednesday': 2,
    'Thursday': 3,
    'Friday': 4,
    'Saturday': 5,
    'Sunday': 6
};

</script>


<template>
    <div class="calendar-container">
        <h1 class="calendar-title">
            May 2025 / W4
            <MoveLeft class="cursor-pointer" :size="36" />
            <MoveRight class="cursor-pointer" :size="36" />
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
                            top: `${(event.startHour - 8) * slotHeight}px`,
                            height: `${event.duration * slotHeight}px`,
                        }">
                        <strong>{{ event.title }}</strong><br />
                        <!-- {{ event.class }} -->
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

.cursor-pointer {
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
