<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted} from 'vue'

const router = useRouter()

// get user role from localstorage
const userRole = ref(localStorage.getItem('userRole')).value;

// import the api services for the courses
import { StudentCourseService } from '@/api/courses'
import type { Course } from '@/api/courses'

const courses = ref<Course[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);




// const courses = [
//   { id: 'cs-101', name: 'CS 101' },
//   { id: 'ai-210', name: 'AI 210' },
//   { id: 'oop-101', name: 'OOP 101' },
//   { id: 'csp-210', name: 'CSP 210' }
// ]

// fetch the courses when the component is mounted
onMounted(async ()=> {
  try{
    // check the user role from Local Storage
    // if the user is a student
    if(userRole === 'Student'){
      // Get the student number from Local Storage
      const studentNumber = localStorage.getItem('studentNumber');
      // If the student number exists, fetch the courses
      if (typeof studentNumber === 'string') {

        const response = await StudentCourseService.getStudentCourses(studentNumber);
        // check if the response is an error message
        if (typeof response === 'string') {
        error.value = response;
      } else {
        console.log('Courses fetched successfully:', response);
          courses.value = response.map((course) => ({
            id: course.id,
            name: course.courseName,
            courseName: course.courseName,
            courseCode: course.courseCode,
            courseDescription: course.courseDescription
          }));
        }
      } else {
        error.value = 'Student number not found.';
      }
    }
  } catch (err) {
    error.value = 'Failed to load courses.';
    console.error(err);
  } finally {
    loading.value = false;
  }
})


const navigateToCourse = (courseId: number) => {
  router.push({ name: 'CourseHome', params: { courseId } })
}
</script>

<template>
  <div class="courses-view p-8">
    <h1 class="text-3xl font-bold mb-8">My Courses</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="course in courses" 
        :key="course.id"
        @click="navigateToCourse(course.id)"
        class="course-card p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      >
        <h2 class="text-xl font-semibold mb-2">{{ course.courseName }}</h2>
        <p class="text-gray-600">Click to view course details</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.course-card{
  border-radius: 20px;
  background-color: #f0f0f0;


}
.course-card:hover {
  background-color: #D0DFCC;
}
</style>