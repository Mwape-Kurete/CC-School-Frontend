<script setup lang="ts">
//importing from vue
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

//import services
import { LecturerCourseService } from '@/api/courses'
import { lecturerService } from '@/api/lecturer'
import { AnnouncementService } from '@/api/announcements'
import { ClassesService } from '@/api/classes'

//impor utils
import { getRandomGradient } from '@/utils/colourUtils'

//importing comopponents and icons
import LecturerKnob from '@/components/LecturerKnob.vue'
import ToDoComp from '@/components/ToDoComp.vue'
import CardComp from '@/components/CardComp.vue'
import CreateModuleAssignmentForm from '@/components/CreateModuleAssignmentForm.vue'
import CButtonIcon from '@/components/ui/CButton-icon.vue'
import { PlusCircleIcon } from 'lucide-vue-next'
import placeholderImg from '@/components/placeholderImg.vue'

//Functionality Start
//fetching & setting const variables
const storedLectId = localStorage.getItem('lecturerId')
const lecturerId = storedLectId && !isNaN(Number(storedLectId)) ? parseInt(storedLectId, 10) : 2

const userId = ref('')

// announcements state
const announcements = ref<any[]>([]) // type properly if known
const announcementData = reactive({
  title: '',
  description: '',
  date: '',
  lecturerId: '',
})

//setting up class states
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

//using routing for inpage navigation
const router = useRouter()

// fetch courses and announcements
onMounted(async () => {
  try {
    const { success, courses, error } = await LecturerCourseService.getLecturerCourses(
      lecturerId.toString(),
    )

    await fetchLecturerUserID()
    await fetchAnnouncements()
    await fetchLecturerClasses()

    if (success && courses?.length) {
      const firstCourse = courses[0]
      localStorage.setItem('courseId', firstCourse.id.toString())

      if (firstCourse.courseName) {
        localStorage.setItem('courseName', firstCourse.courseName)
      }

      if (firstCourse.courseCode) {
        localStorage.setItem('courseCode', firstCourse.courseCode.toString())
      }

      console.log('Lecturer courses fetched successfully:', courses)
    } else {
      console.error('Error fetching lecturer courses:', error)
    }
  } catch (err) {
    console.error('Failed loading dashboard:', err)
  }
})

const fetchLecturerUserID = async () => {
  try {
    const lecturer = await lecturerService.getLecturerByID(lecturerId)

    if (typeof lecturer === 'string') {
      console.error('Error from service:', lecturer)
      return
    }

    localStorage.setItem('lecturerId', lecturer.lecturerId.toString())
    localStorage.setItem('userId', lecturer.userId?.toString() || '')

    console.log('Lecturer IDs stored:', {
      lecturerId: lecturer.lecturerId,
      userId: lecturer.userId,
    })
  } catch (err) {
    console.error('Failed to fetch lecturer details:', err)
  }
}

const formatDate = (iso: string): string => {
  const date = new Date(iso)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

//announcemnets
const fetchAnnouncements = async () => {
  try {
    const response = await AnnouncementService.getAllAnnouncments()

    if (response && response.$values) {
      announcements.value = response.$values.map((item) => ({
        announcementId: item.id,
        title: item.title,
        description: item.body, // ✅ corrected
        date: new Date(item.date).toLocaleDateString(),
        lecturerId: item.lecturerId,
        moduleImg: item.moduleImg,
      }))

      // Optional: set first announcement details if needed
      if (announcements.value.length > 0) {
        const first = announcements.value[0]
        announcementData.title = first.title
        announcementData.description = first.description
        announcementData.date = first.date
        announcementData.lecturerId = first.lecturerId
      }
    } else {
      console.warn('No announcements found.')
    }
  } catch (error) {
    console.error('Error fetching announcements:', error)
  }
}

//classes
const fetchLecturerClasses = async () => {
  const storedUserId = localStorage.getItem('userId')
  const userId = storedUserId && !isNaN(Number(storedUserId)) ? parseInt(storedUserId, 10) : null

  if (!userId) {
    console.error('Missing or invalid userId')
    return
  }

  try {
    const result = await ClassesService.getClassesByLecturerId(userId)
    classes.value = result
  } catch (err) {
    console.error('Error fetching classes:', err)
  }
}

//navs
function handleGoToAnnouncement(lecturerId: string) {
  router.push({
    name: 'LecturerAnnounce',
    params: { lecturerId },
  })
}

//placeholder handling

function getImageOrGradient(img: string | null | undefined) {
  return img || getRandomGradient()
}
</script>

<template>
  <div class="dashboard-container">
    <!-- Main Content Area -->
    <!-- Your main dashboard content -->
    <div class="content-section">
      <!-- Add more components/content as needed -->
      <div class="announcement-header">
        <h1 class="ps-header pt-0">Your Announcements</h1>
        <CButtonIcon
          class="btn-icon-custom"
          type="primary"
          size="sm"
          :disabled="true"
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
          :moduleImg="
            item.moduleImg || 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?...'
          "
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

      <h1 class="ps-header pt-5">This Weeks Schedule</h1>
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
    <!-- Right Side Panel
    <aside class="side-panel">
      <div class="panel-content">
        <h3 class="text-center">Class Analytics</h3>
        <div class="panel-section">
          <ToDoComp />
        </div>
      </div>
    </aside>
    -->
  </div>
</template>

<style scoped>
/* announcements */
.announcement-header {
  margin-bottom: 2rem;
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

/*module section*/

/*layout below */

.dashboard-view {
  padding: 2rem;
}
.dashboard-container {
  display: grid;
  grid-template-columns: 1fr 300px; /* Main content takes remaining space, aside fixed at 300px */
  gap: 2rem;
  min-height: 100vh;
  padding: 2rem;
}

.pa-header {
  margin-top: -1.5rem;
  padding-top: -1.5rem;
}
.side-panel {
  border-left: 1px solid #e5e7eb;
  padding-left: 0rem;
}

.panel-content {
  position: sticky;
  top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Responsive behavior */
@media (max-width: 1024px) {
  .dashboard-container {
    grid-template-columns: 1fr;
  }

  .side-panel {
    border-left: none;
    border-top: 1px solid #e5e7eb;
    padding-left: 0;
    padding-top: 2rem;
  }
}

/* Additional styling as needed */
.content-section {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.panel-section {
  background: white;
  padding: 2rem;
  width: 100%;

  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}
</style>
