<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

import CSearch from './ui/CSearch.vue'
import CButtonIcon from './ui/CButton-icon.vue'
import CDropdown from './ui/CDropdown.vue'
import { EllipsisVertical } from 'lucide-vue-next'
import { GraduationCap } from 'lucide-vue-next'
import { BellRing } from 'lucide-vue-next'
import { lecturerService } from '@/api/lecturer'
import { StudentService } from '@/api/student'

const route = useRoute()
const courseId = route.params.courseId

const props = defineProps({
  page: String,
})

<<<<<<< Updated upstream
const selectedRange = ref(null)
=======
// State refs
const userId = ref('')
const userRole = ref('')
const userName = ref('')

// Fetch user data from local storage and API

// Get and fetch user details
onMounted(async () => {
  userRole.value = localStorage.getItem('userRole') || ''

  try {
    switch (userRole.value) {
      case 'Student':
        userId.value = localStorage.getItem('studentNumber') || ''
        const student = await studentService.getStudentByStudentNumber(userId.value)
        userName.value = student.name || `${student.firstName} ${student.lastName}`
        break

      case 'Lecturer':
        userId.value = localStorage.getItem('lectId') || ''
        const lecturer = await lecturerService.getLecturerByID(userId.value)
        userName.value = lecturer.name || `${lecturer.firstName} ${lecturer.lastName}`
        break

      case 'Admin':
        userId.value = localStorage.getItem('adminId') || ''
        userName.value = 'admin'
        break

      default:
        console.warn('Unrecognized role:', userRole.value)
        userName.value = 'Guest'
    }
  } catch (error) {
    console.error('Error fetching user info:', error)
    userName.value = 'Error loading name'
  }
})
>>>>>>> Stashed changes
</script>

<template>
  <header class="temp-header">
    <div class="left">
      <h1 v-if="page === 'dashboard'" class="pageHeader">Dashboard</h1>

      <!--Nested courses start-->
      <h1 v-else-if="page === 'stu-course-layout'" class="pageHeader">Courses You're Taking</h1>
      <h1 v-else-if="page === 'stu-course-home'" class="pageHeader">{{ courseId }} Overview</h1>
      <h1 v-else-if="page === 'stu-course-announcements'" class="pageHeader">
        {{ courseId }} Announcements
      </h1>
      <h1 v-else-if="page === 'stu-course-modules'" class="pageHeader">{{ courseId }} Modules</h1>
      <h1 v-else-if="page === 'stu-course-assignments'" class="pageHeader">
        {{ courseId }} Assignments
      </h1>
      <h1 v-else-if="page === 'stu-course-grades'" class="pageHeader">{{ courseId }} Grades</h1>
      <!--Nested courses end-->

      <!--Students-->
      <h1 v-else-if="page === 'course'" class="pageHeader">Course Overview</h1>
      <h1 v-else-if="page === 'modules'" class="pageHeader">Modules Overview</h1>
      <h1 v-else-if="page === 'student-assignment'" class="pageHeader">Modules Overview</h1>
      <h1 v-else-if="page === 'student-module-details'" class="pageHeader">Modules Overview</h1>
      <h1 v-else-if="page === 'student-announcement-details'" class="pageHeader">
        Modules Overview
      </h1>
      <h1 v-else-if="page === 'groups'" class="pageHeader">Groups Overview</h1>
      <h1 v-else-if="page === 'timetable'" class="pageHeader">Timetable Overview</h1>
      <h1 v-else-if="page === 'history'" class="pageHeader">History Overview</h1>
      <h1 v-else-if="page === 'account'" class="pageHeader">Account Overview</h1>
      <h1 v-else-if="page === 'settings'" class="pageHeader">Settings</h1>
      <h1 v-else-if="page === 'help'" class="pageHeader">How Can We Assist</h1>

      <!--lecturers-->
      <h1 v-else-if="page === 'lecturer-dashboard'" class="pageHeader">Lecturer Dashboard</h1>
      <h1 v-else-if="page === 'lecturer-courses'" class="pageHeader">Course Overview</h1>
      <h1 v-else-if="page === 'lecturer-course-details'" class="pageHeader">Course Details</h1>
      <h1 v-else-if="page === 'lecturer-modules'" class="pageHeader">Modules Overview</h1>
      <h1 v-else-if="page === 'lecturer-create-modules'" class="pageHeader">Create a Module</h1>
    </div>
    <!--Lecturer End-->
    <div class="right">
      <div class="search-actions">
        <div
          v-if="
            page === 'dashboard' ||
            page === 'lecturer-dashboard' ||
            page === 'timetable' ||
            page === 'stu-course-announcements'
          "
          class="cont-button-group"
        >
          <CDropdown
            v-model="selectedRange"
            :options="['Today', 'This Week', 'This Month']"
            simple-options
            placeholder="Today"
            type="secondary"
            size="md"
          />
          <CButtonIcon
            class="btn-icon-custom"
            type="primary"
            size="sm"
            :disabled="true"
            :btnIconLabel="userName || 'Guest User'"
          >
            <template #icon>
              <GraduationCap />
            </template>
          </CButtonIcon>
          <div class="right-icons">
            <BellRing size="34" />
            <EllipsisVertical size="34" />
          </div>
        </div>
        <!-- <div v-else><CSearch /></div> -->

        <div v-else class="search-actions-alt">
          <CButtonIcon
            type="primary"
            size="sm"
            :disabled="true"
            :btnIconLabel="userName || 'Guest User'"
          >
            <template #icon>
              <GraduationCap />
            </template>
          </CButtonIcon>
          <div class="right-icons">
            <BellRing size="34" />
            <EllipsisVertical size="34" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.temp-header {
  color: #212121;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: em 1.5rem;
  border-bottom: 1px solid #c5c5c5;
  margin-top: 0px;
  margin-bottom: 1.2rem;
}

.pageHeader {
  font-size: 36px;
  font-weight: 400;
}

.user-placeholder {
  font-size: 0.95rem;
  opacity: 0.85;
}

.search-actions > *:not(:last-child) {
  margin-right: 0.75rem;
}

.cont-button-group {
  display: flex;
  flex-direction: row !important;
  align-items: center;
}

.btn-icon-custom {
  width: 60%;
}

.right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.search-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-actions-alt {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cont-button-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.right-icons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.right-icons > * {
  padding: 0.5rem;
  border-radius: 999999px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>
