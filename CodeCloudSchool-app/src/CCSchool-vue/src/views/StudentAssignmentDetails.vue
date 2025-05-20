<script setup>

import SubmissionComp from '@/components/SubmissionComp.vue';
import CButton from '@/components/ui/CButton.vue';
import Dropdown from '@/components/ui/CDropdown.vue';
import { ref } from 'vue';

import { ChevronUp, ChevronDown } from 'lucide-vue-next';

const selectedAttempt = ref(null);
const showDetails = ref(true);

const attemptOptions = [
    { label: '2', value: '2' },
    { label: '3', value: '3' }
]


</script>

<template>

    <!-- hand in details -->
    <!-- attempt number -->
    <div class="attempts-con mb-6 flex items-center gap-4">
        <Dropdown v-model="selectedAttempt" :options="attemptOptions" placeholder="Attempt 1" option-label="label"
            option-value="value" size="sm" type="secondary" />
    </div>

    <h2 class="text-2xl font-semibold subtitle">Theory -  API Integration: Weather Dashboard</h2>
    <h4 class="mb-4">Due: Mon, 3 Mar 2025 23:59</h4>

    <!-- Toggle Section -->
    <div class="details-con flex justify-between mb-4 cursor-pointer" @click="showDetails = !showDetails">
        <h4 class="font-semibold">Details</h4>
        <component :is="showDetails ? ChevronUp : ChevronDown" class="w-1 h-1 text-gray-700" />
    </div>

    <!-- Collapsible Assignment Details -->
    <div v-if="showDetails" class="assignment-details mb-4">
        <h1 class="text-2xl font-bold mb-4">API Integration: Weather Dashboard</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar
            vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.
            Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar
            vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.
            Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
        </p>
    </div>

    <!-- hand in section -->
    <div class="divider"></div>

    <div class="pill-con flex bg-red-100 mb-4">
        <button class="px-6 py-2 rounded-full bg-red-300 text-gray-700 font-semibold">
            HAND IN
        </button>
        <button class="px-4 py-2 rounded-full bg-red-300 text-gray-700 font-semibold">
            PDF
        </button>
    </div>

    <h4 class="text-2xl font-semibold mb-4">SUBMISSION DEADLINE
        <br> 03 March 2025 at 23:59
    </h4>

    <h4 class="font-semibold mb-1">LATE SUBMISSION</h4>
    <p class="body mb-5">Late submissions are accepted for a maximum of 48 hours after the allocated deadline given in
        your
        brief.  Any work submitted during these 48 hours will be evaluated, but will only be awarded a maximum of 50% as
        a late-submission penalty. After 48 hours, 0% will be awarded. OW takes a zero-tolerance stance on work
        submitted later than 48 hours after the deadline.</p>

    <h4 class="font-semibold mb-1">Plagiarism Declaration</h4>
    <p class="body mb-5">By submitting this assignment, I confirm that I understand and accept the terms of the Open
        Window Plagiarism Declaration. Please see openwindow.co.za/plagiarism for more information.
    </p>

    <SubmissionComp class="file-sub" />
    <CButton class="submit-btn" type="tertiary" size="lg">Submit Assignment</CButton>

</template>

<style scoped>

details-con {
    width: 100% !important;
}
.attempts-con {
    display: flex;
    justify-content: end;
}

.assignment-details {
  transition: all 1s ease-in-out;
}

.divider {
    height: 1px;
    background-color: #ccc;
    margin: 1rem 0;
}

.pill-con {
    justify-content: space-between;
}

.body {
    width: 80%;
}

.file-sub {
    width: 100vw;
}

.submit-btn {
    margin-left: 30%
}
</style>