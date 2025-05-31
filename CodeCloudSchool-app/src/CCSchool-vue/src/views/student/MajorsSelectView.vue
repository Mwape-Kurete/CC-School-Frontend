<script setup lang="ts">
import { ref, onMounted } from 'vue';


import { MajorServices } from '@/api/majors';
import type { major } from '@/api/majors';

const majors = ref<major[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const studentNumber = ref(localStorage.getItem('studentNumber')).value;


onMounted(async () => {
    loading.value = true;
    console.log('Fetching majors for student number:', studentNumber);


    try {
        const response = await MajorServices.fetchMajors();
        if (typeof response === 'string') {
            error.value = response;
        } else if('$values' in response) {
            majors.value = response.$values as major[];
            console.log('Majors fetched successfully:', majors.value);
        }else {
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


</script>

<template>
    <div class="majors-view p-4">
        <h1 class="text-3xl font-bold mb-8">Select 2 Majors to enroll in</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="major in majors" :key="major.id "
                class="major-card p-6 ">
                <h2 class="text-xl font-semibold mb-2">{{ major.majorName }} | {{ major.majorCode }}</h2>
                <p class="mb-4 text-gray-600">{{ major.majorDescription }}</p>
                <h4 class="text-gray-600">Credits for this course: {{ major.creditsRequired }}</h4>
            </div>
        </div>
    </div>

</template>

<style scoped>


.courses-view {
    font-family: "Quicksand", sans-serif;
}

.major-card {
    border-radius: 20px;
    background-color: #2e2e2e !important;
    color: #ffffff !important;

}

.major-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
}
</style>
