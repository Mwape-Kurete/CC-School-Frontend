<script setup>
//importing from vue
import { ref, onMounted } from 'vue'

//import services
import { LecturerModulesServices } from '@/api/modules'
import { LecturerCourseService } from '@/api/courses'

//importing components
import CreateModuleForm from '@/components/CreateModuleAssignmentForm.vue'

//Functionality Start
//fetching & setting const variables
const lecturerId = localStorage.getItem('lectId') || '33'
const courseId = ref('')
const testId = 1

//fetching dashboard data from backend
onMounted(async () => {
  try {
    const { success, courses } = await LecturerCourseService.getLecturerCourses(lecturerId)
    if (success && courses?.length) {
      courseId.value = courses[0].id
      localStorage.setItem('courseId', courseId.value.toString())
      console.log('Course ID fetched:', courseId.value)
    }
  } catch (err) {
    console.error('Error fetching courses:', err)
  }
})

async function handleCreateModule(modulePayload) {
  if (!courseId.value) {
    console.error('No course ID found.')
    return
  }

  const result = await LecturerModulesServices.createModule(courseId.value, modulePayload)

  if (typeof result === 'string') {
    console.error('Module creation failed:', result)
  } else {
    console.log('Module created successfully:', result)
    // optionally clear the form or show success feedback
  }
}

// request to pass to component
</script>

<template>
  <div class="create-module">
    <CreateModuleForm variant="module" @submitModule="handleCreateModule" />
  </div>
</template>

<style></style>
