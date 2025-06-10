<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AdminCourseServices, CourseService } from '@/api/courses';
import type { Course } from '@/api/courses';
import { ClassesService, type Class } from '@/api/classes';
import { AdminMajorServices, MajorServices, type major } from '@/api/majors';
import { AdminClassesService, type CreateClass } from '@/api/classes';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const toast = useToast();



const courses = ref<Course[]>([])
const majors = ref<major[]>([]);
const classes = ref<Class[]>([]);

onMounted(async () => {
    await getAllCourses();
    await getAllMajors();
    await getAllClasses();
});


// Define new class model
const newClass = ref({
    className: '',
    classDescription: '',
    classroom: '',
    courseId: null
});

// Create class function
const createClass = async () => {
    try {
        const response = await AdminClassesService.createClass(newClass.value);
        console.log("Class created:", response);
        await getAllClasses(); // refresh list
        toast.add({ severity: 'success', summary: 'Success', detail: 'Class created', life: 3000 });

        // Reset form
        newClass.value = {
            className: '',
            classDescription: '',
            classroom: '',
            courseId: null
        };
    } catch (error) {
        console.error("Error creating class:", error);
    }
};

const newMajor = ref({
    majorName: '',
    majorCode: '',
    majorDescription: '',
    creditsRequired: null,
});

const createMajor = async () => {
    try {
        const response = await AdminMajorServices.createMajor(newMajor.value);
        console.log("Major created:", response);
        await getAllMajors(); // refresh list
        newMajor.value = {
            majorName: '',
            majorCode: '',
            majorDescription: '',
            creditsRequired: null,
        };
    } catch (error) {
        console.error("Error creating major:", error);
    }
};


const newCourse = ref({
    courseName: '',
    courseCode: null,
    coursePresentationLink: '',
    courseDescription: '',
});

const createCourse = async () => {
    try {
        const response = await AdminCourseServices.createCourse(newCourse.value);
        console.log("Course created:", response);
        await getAllCourses(); // refresh list
        newCourse.value = {
            courseName: '',
            courseCode: null,
            coursePresentationLink: '',
            courseDescription: '',
        };
    } catch (error) {
        console.error("Error creating course:", error);
    }
};



const selectedClassIdInput = ref<string>('');
const selectedClassId = ref<number | null>(null);
const selectedStudentIdInput = ref<string>('');
const selectedStudentId = ref<number | null>(null);
const selectedLecturerIdInput = ref<string>('');
const selectedLecturerId = ref<number | null>(null);


const addStudentToClass = async () => {
    selectedStudentId.value = selectedStudentIdInput.value ? Number(selectedStudentIdInput.value) : null;
    if (!selectedClassId.value || !selectedStudentId.value) return;
    try {
        await AdminClassesService.addStudentToClass(selectedClassId.value, selectedStudentId.value);
        console.log("Student added to class");
        toast.add({ severity: 'success', summary: 'Success', detail: 'Class created', life: 3000 });

    } catch (error) {
        console.error("Error adding student:", error);
    }
};

const addLecturerToClass = async () => {
    selectedLecturerId.value = selectedLecturerIdInput.value ? Number(selectedLecturerIdInput.value) : null;
    if (!selectedClassId.value || !selectedLecturerId.value) return;
    try {
        await AdminClassesService.addLecturerToClass(selectedClassId.value, selectedLecturerId.value);
        console.log("Lecturer added to class");
        toast.add({ severity: 'success', summary: 'Success', detail: 'Class created', life: 3000 });

    } catch (error) {
        console.error("Error adding lecturer:", error);
    }
};



// functions
const getAllCourses = async () => {
    try {
        const response = await CourseService.getCourses();
        if (Array.isArray(response)) {
            courses.value = response;
            console.log("Courses retrieved: ", response);
        } else {
            console.warn("Unexpected response format for courses:", response);
        }
    } catch (error) {
        console.error("Failed to load courses:", error);
    }
};


const getAllMajors = async () => {
    try {
        const response = await MajorServices.fetchMajors();
        if (Array.isArray(response)) {
            majors.value = response;
            console.log("Majors retrieved: ", response);
        } else {
            console.warn("Unexpected response format for majors:", response);
        }
    } catch (error) {
        console.error("Failed to load majors:", error);
    }
};

const getAllClasses = async () => {
    try {
        const response = await ClassesService.getClasses();
        if (Array.isArray(response)) {
            classes.value = response;
            console.log("Classes retrieved: ", response);
        } else {
            console.warn("Unexpected response format for classes:", response);
        }
    } catch (error) {
        console.error("Failed to load classes:", error);
    }
};



</script>

<template>
    <div class="course-management p-4">
        <h1 class="text-2xl font-bold mb-6">Course Management</h1>

        <!-- Courses -->
        <section>
            <h2 class="text-xl font-semibold mb-4">Courses</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card class="card" v-for="course in courses" :key="course.id">
                    <template #title>{{ course.courseName }}</template>
                    <template #content>
                        <p><strong>Code:</strong> {{ course.courseCode }}</p>

                    </template>
                </Card>
            </div>
        </section>

        <!-- Majors -->
        <section class="mt-10">
            <h2 class="text-xl font-semibold  mt-4 mb-4">Majors</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card class="card" v-for="major in majors" :key="major.id">
                    <template #title>{{ major.majorName }}</template>
                    <template #content>
                        <p><strong>Code:</strong> {{ major.majorCode }}</p>
                    </template>
                </Card>
            </div>
        </section>

        <!-- Classes -->
        <section class="mt-10">
            <h2 class="text-xl font-semibold mt-4 mb-4">Classes</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card class="card" v-for="cls in classes" :key="cls.classID">
                    <template #title>{{ cls.className }}</template>
                    <template #content>
                        <p><strong>Day:</strong> {{ cls.timeSlot?.day }}</p>
                        <p><strong>Class ID:</strong> {{ cls.classID }}</p>
                    </template>
                </Card>
            </div>
        </section>
    </div>

    <Toast />


    <!-- Add Class Form -->
    <section class="mt-10 mb-6">
        <h2 class="text-xl font-semibold mb-4">Create New Class</h2>
        <div class="p-6 rounded-xl shadow-lg max-w-xl space-y-4 bg-white">
            <div class="space-y-2">
                <label class="block font-medium">Class Name</label>
                <InputText v-model="newClass.className" class="w-full" placeholder="e.g. Intro to Programming" />
            </div>
            <div class="space-y-2">
                <label class="block font-medium">Description</label>
                <InputText v-model="newClass.classDescription" class="w-full"
                    placeholder="Short description of the class" />
            </div>
            <div class="space-y-2">
                <label class="block font-medium">Classroom</label>
                <InputText v-model="newClass.classroom" class="w-full" placeholder="e.g. Room B202" />
            </div>
            <div class="space-y-2">
                <label class="block font-medium">Course</label>
                <Dropdown v-model="newClass.courseId" :options="courses" optionLabel="courseName" optionValue="id"
                    placeholder="Select a course" class="w-full" />
            </div>
            <Button label="Create Class" icon="pi pi-plus" class="w-full mt-2" @click="createClass" />
        </div>
    </section>




    <!-- Assign Student / Lecturer -->
    <section class="mt-10 max-w-3xl">
        <h2 class="text-xl font-semibold mb-4">Assign Student or Lecturer to Class</h2>
        <div class="p-6 rounded-xl shadow-lg bg-white space-y-6">
            <!-- Class ID -->
            <div class="space-y-2">
                <label class="block font-medium">Class ID</label>
                <InputText v-model="selectedClassIdInput"
                    @input="selectedClassId = selectedClassIdInput ? Number(selectedClassIdInput) : null" class="w-full"
                    placeholder="Enter Class ID" />
            </div>

            <!-- Student Assignment -->
            <div class="space-y-2">
                <label class="block font-medium">Student ID</label>
                <InputText v-model="selectedStudentIdInput" class="w-full" placeholder="Enter Student ID" />
                <Button label="Add Student" icon="pi pi-user-plus" class="w-full" @click="addStudentToClass" />
            </div>

            <!-- Lecturer Assignment -->
            <div class="space-y-2">
                <label class="block font-medium">Lecturer ID</label>
                <InputText v-model="selectedLecturerIdInput" class="w-full" placeholder="Enter Lecturer ID" />
                <Button label="Add Lecturer" icon="pi pi-user-edit" class="w-full" @click="addLecturerToClass" />
            </div>
        </div>
    </section>

    <section class="mt-10">
        <h2 class="text-xl font-semibold mb-4">Create New Major</h2>
        <div class="p-4 rounded shadow-md max-w-xl space-y-4">
            <div>
                <label class="block mb-1 font-medium">Major Name</label>
                <InputText v-model="newMajor.majorName" class="w-full" />
            </div>
            <div>
                <label class="block mb-1 font-medium">Major Code</label>
                <InputText v-model="newMajor.majorCode" class="w-full" />
            </div>
            <div>
                <label class="block mb-1 font-medium">Description</label>
                <InputText v-model="newMajor.majorDescription" class="w-full" />
            </div>
            <div>
                <label class="block mb-1 font-medium">Credits Required</label>
                <InputText v-model.number="newMajor.creditsRequired" type="number" class="w-full" />
            </div>
            <Button label="Create Major" icon="pi pi-plus" class="w-full" @click="createMajor" />
        </div>
    </section>

    <section class="mt-10">
        <h2 class="text-xl font-semibold mb-4">Create New Course</h2>
        <div class="p-4 rounded shadow-md max-w-xl space-y-4">
            <div>
                <label class="block mb-1 font-medium">Course Name</label>
                <InputText v-model="newCourse.courseName" class="w-full" />
            </div>
            <div>
                <label class="block mb-1 font-medium">Course Code</label>
                <InputText v-model.number="newCourse.courseCode" type="number" class="w-full" />
            </div>
            <div>
                <label class="block mb-1 font-medium">Presentation Link</label>
                <InputText v-model="newCourse.coursePresentationLink" class="w-full" />
            </div>
            <div>
                <label class="block mb-1 font-medium">Description</label>
                <InputText v-model="newCourse.courseDescription" class="w-full" />
            </div>
            <Button label="Create Course" icon="pi pi-plus" class="w-full" @click="createCourse" />
        </div>
    </section>




</template>


<style scoped>
.card {
    border-radius: 15px;
}
</style>