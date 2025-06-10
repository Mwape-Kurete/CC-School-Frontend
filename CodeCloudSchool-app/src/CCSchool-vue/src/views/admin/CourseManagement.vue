<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CourseService } from '@/api/courses';
import type { Course } from '@/api/courses';
import { ClassesService, type Class } from '@/api/classes';
import { MajorServices, type major } from '@/api/majors';
import Card from 'primevue/card';


const courses = ref < Course[] > ([])
const majors = ref < major[] > ([]);
const classes = ref < Class[] > ([]);

onMounted(async () => {
    await getAllCourses();
    await getAllMajors();
    await getAllClasses();
});



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
            <p><strong>Start:</strong> {{ cls.timeSlot?.startTime }}</p>
            <p><strong>End:</strong> {{ cls.timeSlot?.endTime }}</p>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>


<style scoped>

.card{
    border-radius: 15px;
}

</style>