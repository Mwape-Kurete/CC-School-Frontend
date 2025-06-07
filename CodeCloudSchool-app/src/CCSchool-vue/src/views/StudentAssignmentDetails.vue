<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
import { ref, onMounted } from 'vue';
import { AssignmentService } from '@/api/assignments';
import { StudentService } from '@/api/student';
import { AssignmentSubmissionService } from '@/api/assignments';

// Extracting assignmentID from the route parameters
const assignmentIdNumber = route.params.assignmentId;
const assignmentId = Array.isArray(assignmentIdNumber) ? Number(assignmentIdNumber[0]) : Number(assignmentIdNumber);


// fetch the student from localstorage
const studentNumber = localStorage.getItem('studentNumber');

// has the user submitted this assignment?
const hasSubmitted = ref(false);


// reactive references for data from api
interface Assignment {
    assignment_ID: number;
    title: string;
    description?: string;
    dueDate: string; // ISO date string from API
    lecturerId: number;
    courseId?: number;
    // future additions
    // submissionType: string; // e.g., 'pdf', 'link'
}

// create ref of type assignment
const assignmentDetails = ref<Assignment | null>(null);

const studentUserId = ref<number | null>(null);

import SubmissionComp from '@/components/SubmissionComp.vue';
import CButton from '@/components/ui/CButton.vue';
import Dropdown from '@/components/ui/CDropdown.vue';

import { ChevronUp, ChevronDown } from 'lucide-vue-next';

const selectedAttempt = ref(null);
const showDetails = ref(true);

const attemptOptions = [
    { label: '2', value: '2' },
    { label: '3', value: '3' }
]

onMounted(async () => {
    // Fetch assignment details when the component is mounted
    await fetchAssignmentDetails(assignmentId);
    await getStudentDetails();

    // Ensure studentUserId is available before calling
    if (studentUserId.value !== null) {
        // console.log('Student User ID:', studentUserId.value);
        await getStudentSubmission(assignmentId, studentUserId.value);
    } else {
        console.warn('Student ID not available. Skipping submission check.');
    }
})

// Functions
// ==============================================================================
// function to fetch assignment details by id
const fetchAssignmentDetails = async (assignmentId: number) => {
    try {
        const response = await AssignmentService.getAssignmentById(assignmentId);

        if (typeof response === 'string') {
            console.error('Failed to fetch assignment:', response);
        } else {
            // console.log('Assignment fetched successfully:', response);
            // store assignment details
            assignmentDetails.value = response as Assignment;
        }
    } catch (error) {
        console.error('Failed to fetch assignments:', error);
    }
}

const getStudentDetails = async () => {
    try {
        if (!studentNumber) {
            console.error('No student number found in localStorage');
            return null;
        }
        const student = await StudentService.getStudentByStudentNumber(studentNumber);
        if (student && typeof student !== 'string') {
            // console.log('Student details:', student);
            studentUserId.value = student.userId;
        } else if (typeof student === 'string') {
            console.error('Error fetching student:', student);
            return null;
        } else {
            console.error('No student found with the given number');
            return null;
        }
    } catch (error) {
        console.error('Error fetching student details:', error);
        return null;
    }
}

const getStudentSubmission = async (assignmentId: number, studentId: number) => {
    try {
        const submission = await AssignmentSubmissionService.getStudentSubmissions(assignmentId, studentId);
        if (submission && typeof submission !== 'string') {
            // console.log('Student submission:', submission);
            hasSubmitted.value = true;
        } else if (typeof submission === 'string') {
            console.error('Error fetching submission:', submission);
            hasSubmitted.value = false;
        } else {
            console.error('No submission found for this assignment');
            hasSubmitted.value = false;
        }
    } catch (error) {
        console.error('Error fetching student submission:', error);
        hasSubmitted.value = false;
    }
}

</script>

<template>

    <!-- hand in details -->
    <!-- attempt number -->
    <div class="attempts-con mb-6 flex items-center gap-4">
        <Dropdown v-model="selectedAttempt" :options="attemptOptions" placeholder="Attempt 1" option-label="label"
            option-value="value" size="sm" type="secondary" />
    </div>

    <h2 class="text-2xl font-semibold subtitle">
        {{ assignmentDetails ? assignmentDetails.title : 'Loading title...' }}
    </h2>
    <h4 class="mb-4">
        Due:
        {{ assignmentDetails ? AssignmentService.formatAssignmentDate(assignmentDetails.dueDate) : 'Loading date...' }}
    </h4>

    <!-- Toggle Section -->
    <div class="details-con flex justify-between mb-4 cursor-pointer" @click="showDetails = !showDetails">
        <h4 class="font-semibold">Details</h4>
        <component :is="showDetails ? ChevronUp : ChevronDown" class="w-1 h-1clear text-gray-700" />
    </div>

    <!-- Collapsible Assignment Details -->
    <div v-if="showDetails" class="assignment-details mb-4">
        <h1 class="text-2xl font-bold mb-4">
            {{ assignmentDetails ? assignmentDetails.title : 'Loading title...' }}
        </h1>
        <p>
            {{ assignmentDetails ? assignmentDetails.description : 'Loading description...' }}
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
        <br> {{ assignmentDetails ? AssignmentService.formatAssignmentDate(assignmentDetails.dueDate) : 'Loading date...'}}
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

    <SubmissionComp v-if="!hasSubmitted" :assignmentId="assignmentId" :studentId="studentUserId" class="file-sub" />
    <!-- <CButton class="submit-btn" type="tertiary" size="lg">Submit Assignment</CButton> -->
    <div v-if="hasSubmitted" class="submission-feedback-text bg-green-100 text-green-800 px-4 py-2 rounded mb-4">
        You’ve already submitted this assignment.

    </div>
    <SubmissionComp v-if="hasSubmitted" :assignmentId="assignmentId" :studentId="studentUserId" class="file-sub" />

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

.submission-feedback-text {
    color: white !important;
    background-color: #C2BFF8 !important;
    border-radius: 15px;
    font-size: 32px;
    font-weight: 600;
    font-family: 'QuickSand', sans-serif;
    text-align: center;
}
</style>