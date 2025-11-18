<script setup lang="ts">
//importing from vue
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

//import services
import { LecturerCourseService } from '@/api/courses'
import { lecturerService } from '@/api/lecturer'
import { AnnouncementService } from '@/api/announcements'
import { ClassesService } from '@/api/classes'

//import utils
import { getRandomGradient } from '@/utils/colourUtils'

//importing components and icons
import LecturerKnob from '@/components/LecturerKnob.vue'
import ToDoComp from '@/components/ToDoComp.vue'
import CardComp from '@/components/CardComp.vue'
import CreateModuleAssignmentForm from '@/components/CreateModuleAssignmentForm.vue'
import CButtonIcon from '@/components/ui/CButton-icon.vue'
import { PlusCircleIcon } from 'lucide-vue-next'
import placeholderImg from '@/components/placeholderImg.vue'

// Functionality Start
// fetching & setting const variables
const storedLectId = localStorage.getItem('lecturerId')
const lecturerId = storedLectId && !isNaN(Number(storedLectId)) ? parseInt(storedLectId, 10) : 2

const userId = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

// announcements state
const announcements = ref<any[]>([])
const announcementData = reactive({
  title: '',
  description: '',
  date: '',
  lecturerId: '',
})

// setting up class states
const classes = ref<any[]>([])
const classData = reactive({
  classID: '',
  className: '',
  classDescription: '',
  timeSlot: {
    day: '',
    endTime: '',
    startTime: '',
  },
  moduleImg: [] as string[],
  Classroom: '',
})

// using routing for inpage navigation
const router = useRouter()

// Main initialization
onMounted(async () => {
  await initializeDashboard()
})

const initializeDashboard = async () => {
  loading.value = true
  error.value = null

  try {
    console.log('Initializing dashboard for lecturer:', lecturerId)

    // First fetch lecturer details
    const lecturerSuccess = await fetchLecturerUserID()
    if (!lecturerSuccess) {
      error.value = 'Failed to fetch lecturer details'
      return
    }

    // Then fetch all data in parallel for better performance
    await Promise.all([fetchCourses(), fetchAnnouncements(), fetchLecturerClasses()])
  } catch (err) {
    console.error('Failed loading dashboard:', err)
    error.value = 'Failed to load dashboard data'
  } finally {
    loading.value = false
  }
}

// Fetch lecturer user ID
const fetchLecturerUserID = async (): Promise<boolean> => {
  try {
    console.log('Fetching lecturer details for ID:', lecturerId)

    const result = await lecturerService.getLecturerByID(lecturerId)

    if (typeof result === 'string') {
      console.error('Error from service:', result)
      error.value = `Failed to fetch lecturer: ${result}`
      return false
    }

    // Success case - result is a Lecturer object
    console.log('Lecturer details fetched:', result)

    // Store the IDs
    localStorage.setItem('lecturerId', result.lecturerId.toString())
    if (result.userId) {
      localStorage.setItem('userId', result.userId.toString())
      userId.value = result.userId.toString()
    }

    console.log('Lecturer IDs stored:', {
      lecturerId: result.lecturerId,
      userId: result.userId,
    })

    return true
  } catch (err) {
    console.error('Exception in fetchLecturerUserID:', err)
    error.value = 'Failed to fetch lecturer details'
    return false
  }
}

// Fetch courses - DEBUG VERSION
const fetchCourses = async (): Promise<boolean> => {
  try {
    console.log('Fetching courses for lecturer:', lecturerId)

    const result = await LecturerCourseService.getLecturerCourses(lecturerId.toString())

    // DEBUG: Log the entire result object
    console.log('RAW RESULT FROM COURSES SERVICE:', result)
    console.log('Result type:', typeof result)
    console.log('Result keys:', Object.keys(result || {}))

    // Check if result exists and has the expected structure
    if (!result) {
      console.error('Courses service returned undefined or null')
      return false
    }

    // Check different possible response structures
    if (result.success && result.courses?.length) {
      console.log('Courses found via success path:', result.courses)
    } else if (result.$values?.length) {
      console.log('Courses found via $values path:', result.$values)
      // Store first course info from $values
      const firstCourse = result.$values[0]
      localStorage.setItem('courseId', firstCourse.id.toString())
      if (firstCourse.courseName) {
        localStorage.setItem('courseName', firstCourse.courseName)
      }
      if (firstCourse.courseCode) {
        localStorage.setItem('courseCode', firstCourse.courseCode.toString())
      }
      return true
    } else if (Array.isArray(result)) {
      console.log('Courses found as direct array:', result)
      // Handle if it returns a direct array
      if (result.length > 0) {
        const firstCourse = result[0]
        localStorage.setItem('courseId', firstCourse.id.toString())
        if (firstCourse.courseName) {
          localStorage.setItem('courseName', firstCourse.courseName)
        }
        if (firstCourse.courseCode) {
          localStorage.setItem('courseCode', firstCourse.courseCode.toString())
        }
      }
      return true
    }

    console.error('No courses found in response. Full result:', result)
    return false
  } catch (err) {
    console.error('Exception in fetchCourses:', err)
    return false
  }
}

// Format date helper
const formatDate = (iso: string): string => {
  try {
    const date = new Date(iso)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  } catch {
    return iso // Return original if parsing fails
  }
}

// Announcements
const fetchAnnouncements = async (): Promise<boolean> => {
  try {
    console.log('Fetching announcements...')

    const response = await AnnouncementService.getAllAnnouncments()

    if (response && response.$values) {
      announcements.value = response.$values.map((item) => ({
        announcementId: item.id,
        title: item.title,
        description: item.body,
        date: new Date(item.date).toLocaleDateString(),
        lecturerId: item.lecturerId,
        moduleImg: item.moduleImg,
      }))

      // Set first announcement details if available
      if (announcements.value.length > 0) {
        const first = announcements.value[0]
        announcementData.title = first.title
        announcementData.description = first.description
        announcementData.date = first.date
        announcementData.lecturerId = first.lecturerId
      }

      console.log('Announcements fetched successfully:', announcements.value.length)
      return true
    } else {
      console.warn('No announcements found.')
      return true // Not an error, just no data
    }
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return false
  }
}

// Classes
const fetchLecturerClasses = async (): Promise<boolean> => {
  try {
    const storedUserId = localStorage.getItem('userId')
    const userId = storedUserId && !isNaN(Number(storedUserId)) ? parseInt(storedUserId, 10) : null

    if (!userId) {
      console.error('Missing or invalid userId')
      return false
    }

    console.log('Fetching classes for user:', userId)

    const result = await ClassesService.getClassesByLecturerId(userId)
    classes.value = result

    console.log('Classes fetched successfully:', classes.value.length)
    return true
  } catch (err) {
    console.error('Error fetching classes:', err)
    return false
  }
}

// Navigation
function handleGoToAnnouncement(lecturerId: string) {
  if (!lecturerId) {
    console.error('No lecturerId available for navigation')
    return
  }

  router.push({
    name: 'LecturerAnnounce',
    params: { lecturerId },
  })
}

// Placeholder handling
function getImageOrGradient(img: string | null | undefined) {
  return img || getRandomGradient()
}
</script>

<template>
  <div class="dashboard-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading">Loading dashboard...</div>

    <!-- Error State -->
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- Main Content -->
    <div v-else class="content-section">
      <!-- Announcements Section -->
      <div class="announcement-header">
        <h1 class="ps-header pt-0">Your Announcements</h1>
        <CButtonIcon
          class="btn-icon-custom"
          type="primary"
          size="sm"
          :disabled="!announcementData.lecturerId"
          btnIconLabel="New Announcement"
          @click="() => handleGoToAnnouncement(announcementData.lecturerId)"
        >
          <template #icon>
            <PlusCircleIcon />
          </template>
        </CButtonIcon>
      </div>

      <div class="card-container">
        <!-- Display up to 3 announcements -->
        <CardComp
          v-for="(item, index) in announcements.slice(0, 3)"
          :key="item.announcementId || index"
          cardType="announcement"
          :announcementTitle="item.title"
          :announcementBody="item.description"
          :announcementDate="item.date"
          :moduleImg="item.moduleImg || getRandomGradient()"
        />

        <div class="divider-card"></div>

        <!-- Empty state -->
        <div v-if="announcements.length === 0" class="text-gray-500">
          You have not posted an announcement
        </div>

        <!-- Link to full announcement page -->
        <div v-if="announcements.length > 3" class="mt-4 text-right">
          <RouterLink to="/LecturerAnnounce" class="text-gray-500 hover:underline text-sm">
            Go to announcements page →
          </RouterLink>
        </div>
      </div>

      <hr />

      <!-- Schedule Section -->
      <h1 class="ps-header pt-5">This Weeks Schedule</h1>

      <div v-if="classes.length === 0" class="text-gray-500 mt-4">
        No classes scheduled for this week.
      </div>

      <CardComp
        v-for="cls in classes"
        :key="cls.classID"
        cardType="module"
        :moduleTitleLine1="'You Have'"
        :moduleTitleLine2="cls.className"
        moduleEventLabel="Lecture"
        :moduleCode="cls.courseId"
        :moduleClassId="cls.classID"
        :moduleTime="cls.timeSlot?.startTime + ' - ' + cls.timeSlot?.endTime"
        :moduleImg="getImageOrGradient(cls.moduleImg)"
      />
    </div>
  </div>
</template>

<style scoped>
.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #d32f2f;
  background: #ffebee;
  border-radius: 8px;
  margin: 1rem;
}

/* announcements */
.announcement-header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-container {
  background-color: #f5f5f5;
  border-radius: 25px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.dashboard-view {
  padding: 2rem;
}

.divider,
.divider-card {
  height: 1px;
  background-color: #ccc;
  margin: 1rem 0;
}

.divider-card {
  width: 97%;
  margin-left: 1.5%;
}

/* Layout */
.dashboard-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  min-height: 100vh;
  padding: 2rem;
}

.content-section {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

/* Responsive behavior */
@media (max-width: 1024px) {
  .dashboard-container {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .announcement-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
