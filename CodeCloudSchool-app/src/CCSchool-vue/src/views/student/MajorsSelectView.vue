<script setup lang="ts">
import { ref, onMounted } from 'vue';


import { MajorServices } from '@/api/majors';
import type { major } from '@/api/majors';
import CButton from '@/components/ui/CButton.vue';

const majors = ref<major[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const selectedMajorIds = ref<number[]>([]);

const studentNumber = ref(localStorage.getItem('studentNumber')).value;


onMounted(async () => {
    loading.value = true;
    console.log('Fetching majors for student number:', studentNumber);


    try {
        const response = await MajorServices.fetchMajors();
        if (typeof response === 'string') {
            error.value = response;
        } else if ('$values' in response) {
            majors.value = response.$values as major[];
            console.log('Majors fetched successfully:', majors.value);
        } else {
            majors.value = response;
            console.log('Majors fetched successfully (direct):', majors.value);
        }
    } catch (err) {
        error.value = 'Failed to load majors.';
        console.error(err);
    } finally {
        loading.value = false;
    }
});


// functions
// =================================================================================
const onMajorCardClick = (majorId: number) => {
    // function to get the card Id's and store them in states so that the student can be added to the majors by ID
    if (selectedMajorIds.value.includes(majorId)) {
        selectedMajorIds.value = selectedMajorIds.value.filter(id => id !== majorId);
    } else {
        if (selectedMajorIds.value.length < 2) {
            selectedMajorIds.value.push(majorId);
        } else {
            alert('You can only select 2 majors.');
        }
    }
}

const enrollInMajors = async () => {
    if(selectedMajorIds.value.length !== 2) {
        alert('Please select exactly 2 majors to enroll in.');
        return;
    } else {
        console.log('Enrolling in majors:', selectedMajorIds.value[0], selectedMajorIds.value[1]);
    }
}


</script>

<template>
    <div class="majors-view p-4">
        <div class="heading-con">
            <h1 class="heading text-3xl font-bold mb-8">Select 2 Majors to enroll in</h1>
            <CButton class="enroll-btn" type="tertiary" size="sm" @click="enrollInMajors()">Enroll</CButton>
        </div>


        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="major in majors" :key="major.id" @click="onMajorCardClick(major.id)" 
            :class="['major-card p-6', { 'selected': selectedMajorIds.includes(major.id) }]"
            >
                <h2 class="text-xl font-semibold mb-2">{{ major.majorName }} | {{ major.majorCode }}</h2>
                <p class="mb-4 text-gray-600">{{ major.majorDescription }}</p>
                <h4 class="text-gray-600">Credits for this course: {{ major.creditsRequired }}</h4>
            </div>
        </div>
    </div>

</template>

<style scoped>
.heading {
    width: 40% !important;
}

.enroll-btn {
    width: 20% !important;
    margin-right: -10%;
}

.heading-con {
    display: flex;
    justify-content: space-between;
    align-items: start !important;
    justify-content: space-between !important;
}

.courses-view {
    font-family: "Quicksand", sans-serif;
}

.major-card {
    border-radius: 20px;
    background-color: #2e2e2e !important;
    color: #ffffff !important;
}

.selected {
  background-color: #D0DFCC !important; 
  color: black !important;
  border: 2px solid #ffffff44;
}


.major-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
}
</style>
