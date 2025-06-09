<script setup>
//importing from vue
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

//import services
import { LecturerModulesServices } from '@/api/modules'
import { LecturerCourseService } from '@/api/courses'

//importing components
import CreateModuleForm from '@/components/CreateModuleAssignmentForm.vue'

//Functionality Start
//fetching & setting const variables
const storedLectId = localStorage.getItem('lecturerId')
const lecturerId = storedLectId && !isNaN(Number(storedLectId)) ? parseInt(storedLectId, 10) : 2
const courseId = ref('')
const testId = 1

const router = useRouter()
const toast = useToast()

//ref to trigger a reset of the form inputs
const moduleFormRef = ref(null)

//toasty
toast.add({
  severity: 'success',
  summary: 'Success',
  detail: 'Module created!',
  life: 2000,
})

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
    toast.add({ severity: 'error', summary: 'Failed', detail: result, life: 3000 })
  } else {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Module created!', life: 2000 })

    // Reset the form
    moduleFormRef.value?.resetForm()

    // Wait briefly before redirecting (so the toast is seen)
    setTimeout(() => {
      router.push({ name: 'lecturer-modules' })
    }, 2000)
  }
}

// request to pass to component
</script>

<template>
  <Toast />
  <div class="create-module">
    <CreateModuleForm ref="moduleFormRef" variant="module" @submitModule="handleCreateModule" />
  </div>
</template>

<style></style>
