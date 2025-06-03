<script setup>
//import api
import { CourseService, LecturerCourseService } from '@/api/courses'

//importing vue features
import { ref, reactive, onMounted } from 'vue'

//importing icons and primevue components
import { PencilLine, Maximize2, Ban, Save } from 'lucide-vue-next'
import { Plus } from 'lucide-vue-next'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Textarea from 'primevue/textarea'
import Divider from 'primevue/divider'
import Button from 'primevue/button'

//importing components
import CardComp from '@/components/CardComp.vue'
import CListGroup from '@/components/CListGroup.vue'
import CButton from '@/components/ui/CButton.vue'
import CMarkBreakdown from '@/components/CMarkBreakdown.vue'
import LecturerCard from '@/components/LecturerCard.vue'
import CButtonIcon from '@/components/ui/Cbutton-icon.vue'
import Toast from 'primevue/toast'

// State management
const isLoading = ref(false)
const error = ref(null)

// Form fields initialized with API data
const googleSlideurl = ref('')
const courseBio = ref('')
const newDescription = ref('')
const semesterDescription = ref('')

// Course data - initialize with proper structure
const courseData = reactive({
  courseName: '',
  courseDescription: '',
  courseWeekBreakdown: [],
  courseSlides: '',
  courseMarkBreakdown: [],
  courseSemDescriptions: [],
})

// API Integration
const courseId = 1

onMounted(async () => {
  isLoading.value = true
  try {
    const response = await CourseService.getCourseDetails(courseId)

    if (response) {
      // Transform API response to match component's expected structure
      courseData.courseName = response.courseFullCode || ''
      courseData.courseDescription = response.courseAbout || ''
      courseData.courseSlides = response.courseSlides || ''

      // Handle $values arrays
      courseData.courseWeekBreakdown = response.courseWeekBreakdown?.$values || []
      courseData.courseMarkBreakdown = response.courseMarkBreakdown?.$values || []
      courseData.courseSemDescriptions = response.courseSemDescriptions?.$values || []

      // Initialize form fields
      googleSlideurl.value = courseData.courseSlides
      courseBio.value = courseData.courseDescription
    }
  } catch (err) {
    error.value = 'Failed to load course details'
    console.error('API error:', err)
  } finally {
    isLoading.value = false
  }
})

// Save handler example
const saveCourseDetails = async () => {
  try {
    isLoading.value = true

    const payload = {
      courseFullCode: courseData.courseName,
      courseAbout: courseBio.value,
      courseSlides: googleSlideurl.value,
      courseWeekBreakdown: { $values: courseData.courseWeekBreakdown },
      courseMarkBreakdown: {
        $values: courseData.courseMarkBreakdown.map((section) => ({
          ...section,
          items: { $values: section.items?.$values || [] },
        })),
      },
      courseSemDescriptions: { $values: courseData.courseSemDescriptions },
    }
    const updatedCourse = await LecturerCourseService.updateCourseDetails(courseId, payload)

    // Update local state with any changes from server
    Object.assign(courseData, {
      courseName: updatedCourse.courseFullCode,
      courseDescription: updatedCourse.courseAbout,
      courseSlides: updatedCourse.courseSlides,
      courseWeekBreakdown: updatedCourse.courseWeekBreakdown,
      courseMarkBreakdown: updatedCourse.courseMarkBreakdown,
      courseSemDescriptions: updatedCourse.courseSemDescriptions,
    })

    // Reset editing states
    isEditing.value = false
    Object.keys(isEditingSection).forEach((key) => {
      isEditingSection[key] = false
    })
  } catch (err) {
    error.value = err.message || 'Failed to save changes'
  } finally {
    isLoading.value = false
  }
}

// Editing states
const isEditing = ref(false)
const isEditingSection = reactive({
  courseDescription: false,
  courseWeekBreakdown: false,
  courseSlides: false,
  courseMarkBreakdown: false,
  courseSemDescriptions: false,
})

// COURSES WEEKLY BREAKDOWN
const courseWeeklyBreakdown = ref([])

const addWeek = () => {
  if (!newDescription.value.trim()) return

  const weekNumber = courseWeeklyBreakdown.value.length + 1
  courseWeeklyBreakdown.value.push({
    header: `Week ${weekNumber}`,
    description: newDescription.value.trim(),
  })

  newDescription.value = ''
}

// ASSIGNMENT BREAKDOWN
const assignmentBreakdown = ref([])
const newSection = reactive({
  title: '',
  mark: '',
  items: [],
})

const newItem = reactive({
  description: '',
  mark: '',
})

// Update to match API structure
const addItemToSection = () => {
  if (!newItem.description || !newItem.mark) return
  if (!newSection.items.$values) {
    newSection.items.$values = []
  }
  newSection.items.$values.push({
    description: newItem.description,
    mark: newItem.mark,
  })
  newItem.description = ''
  newItem.mark = ''
}

const addSection = () => {
  if (!newSection.title || !newSection.mark || !newSection.items.length) return
  assignmentBreakdown.value.push({ ...newSection })
  // Reset section
  newSection.title = ''
  newSection.mark = ''
  newSection.items = []
}

// SEMESTER BREAKDOWN
const semesterBreakdown = ref([])

const addSemBreakdown = () => {
  const trimmed = semesterDescription.value.trim()
  if (!trimmed) return

  semesterBreakdown.value.push({ description: trimmed })
  semesterDescription.value = ''
}
</script>

<template>
  <div v-if="isLoading">Loading course details...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else>
    <div class="announcemnts-section">
      <div class="cd-header">
        <div class="right-cd">
          <h1 class="section-header">Announcements</h1>
        </div>
        <div class="left-cd">
          <CButtonIcon type="primary" size="md" btnIconLabel="View All Announcements">
            <template #icon>
              <Maximize2 size="16" />
            </template>
          </CButtonIcon>
        </div>
      </div>
      <div class="card-container">
        <CardComp
          cardType="announcement"
          announcementTitle=" Computer science  workshop with Jacob  Anderson"
          announcementBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          announcementDate="2023-10-15"
          moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..."
        />

        <div class="divider-card"></div>

        <CardComp
          cardType="announcement"
          announcementTitle=" Computer science  workshop with Jacob  Anderson"
          announcementBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          announcementDate="2023-10-15"
          moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..."
        />

        <div class="divider-card"></div>

        <CardComp
          cardType="announcement"
          announcementTitle=" Computer science  workshop with Jacob  Anderson"
          announcementBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          announcementDate="2023-10-15"
          moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..."
        />

        <div class="divider-card"></div>
      </div>
    </div>

    <div class="course-details-section">
      <div class="course-section-header">
        <div class="left-cs-header">
          <h1 class="section-header-lg">{{ courseData.courseName }}</h1>
        </div>
        <div class="right-cs-header" v-if="isEditing == false">
          <CButtonIcon
            id="edit-course"
            type="primary"
            size="md"
            btnIconLabel="Edit Course Details"
            @click="isEditing = true"
          >
            <template #icon>
              <PencilLine size="20" />
            </template>
          </CButtonIcon>
        </div>
        <div class="right-cs-header" v-else-if="isEditing == true">
          <CButtonIcon
            id="edit-course"
            type="primary"
            size="md"
            btnIconLabel="Exit Edit Mode"
            @click="isEditing = false"
          >
            <template #icon>
              <Ban size="20" />
            </template>
          </CButtonIcon>
        </div>
      </div>

      <div class="course-cover-img">
        <img src="https://picsum.photos/seed/picsum/1200/1600" alt="course cover img" />
      </div>

      <div class="bio-section">
        <div v-if="isEditing == false">
          <h1 class="section-header">What You Will Learn</h1>
        </div>
        <div v-else-if="isEditing == true">
          <div class="cd-header">
            <div class="right-cd">
              <h1 class="section-header">What You Will Learn</h1>
            </div>
            <div class="left-cd" v-if="isEditingSection.courseDescription == false">
              <CButtonIcon
                type="primary"
                size="md"
                btnIconLabel="Edit Section"
                @click="isEditingSection.courseDescription = true"
              >
                <template #icon>
                  <PencilLine size="16" />
                </template>
              </CButtonIcon>
            </div>
            <div class="left-cd" v-if="isEditingSection.courseDescription == true">
              <CButtonIcon
                type="primary"
                size="md"
                btnIconLabel="Save Section"
                @click="(saveCourseDetails(), (isEditingSection.courseDescription = false))"
              >
                <template #icon>
                  <PencilLine size="16" />
                </template>
              </CButtonIcon>
            </div>
          </div>
        </div>
        <div class="active-editing" v-if="isEditingSection.courseDescription == true">
          <div class="input-cont">
            <p>
              <FloatLabel>
                <Textarea
                  id="course-bio"
                  v-model="courseBio"
                  class="w-8 border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none"
                />
                <label for="course-bio">Insert Course Description</label>
              </FloatLabel>
              <CButtonIcon
                class="add-icon-btn"
                type="primary"
                size="md"
                btnIconLabel="update"
                @click="addDescription"
              >
                <template #icon>
                  <PencilLine size="16" />
                </template>
              </CButtonIcon>
            </p>
          </div>
        </div>
        <div class="active-editing" v-if="isEditingSection.courseDescription == false">
          <div class="check-content text-center" v-if="courseData.courseDescription == null">
            <p>No Content Yet. Edit this section to add content</p>
          </div>
          <div class="check-content" v-if="courseData.courseDescription !== null">
            <p>{{ courseData.courseDescription }}</p>
          </div>
        </div>
      </div>

      <div class="sem-overview-section">
        <div v-if="isEditing == false">
          <h2 class="section-header">weekly breakdown</h2>
        </div>
        <div v-else-if="isEditing == true">
          <div class="cd-header">
            <div class="right-cd">
              <h2 class="section-header">weekly breakdown</h2>
            </div>
            <div class="left-cd" v-if="isEditingSection.courseWeekBreakdown == false">
              <CButtonIcon
                type="primary"
                size="md"
                btnIconLabel="Edit Section"
                @click="isEditingSection.courseWeekBreakdown = true"
              >
                <template #icon>
                  <PencilLine size="16" />
                </template>
              </CButtonIcon>
            </div>
            <div class="left-cd" v-if="isEditingSection.courseWeekBreakdown == true">
              <CButtonIcon
                type="primary"
                size="md"
                btnIconLabel="Save Section"
                @click="(saveCourseDetails(), (isEditingSection.courseWeekBreakdown = false))"
              >
                <template #icon>
                  <PencilLine size="16" />
                </template>
              </CButtonIcon>
            </div>
          </div>
        </div>
        <div class="active-editing" v-if="isEditingSection.courseWeekBreakdown == true">
          <div class="input-cont">
            <div class="w-full mb-4 flex gap-2 items-end">
              <FloatLabel class="w-full">
                <InputText
                  id="week-break"
                  v-model="newDescription"
                  class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none"
                />
                <label for="week-break">Add a weekly breakdown</label>
              </FloatLabel>
              <CButtonIcon
                class="add-icon-btn"
                type="primary"
                size="md"
                btnIconLabel="Add Breakdown"
                @click="addWeek"
              >
                <template #icon>
                  <Plus size="16" />
                </template>
              </CButtonIcon>
            </div>
          </div>
        </div>
        <div class="active-editing" v-if="isEditingSection.courseWeekBreakdown == false">
          <div class="check-content text-center" v-if="courseData.courseWeekBreakdown.length == 0">
            <p>No Content Yet. Edit this section to add content</p>
          </div>
          <div class="check-content text-center">
            <CListGroup
              :items="courseData.courseWeekBreakdown"
              v-if="courseData.courseWeekBreakdown.length > 0"
            />
          </div>
        </div>
      </div>

      <div class="semester-break">
        <h3>SEMESTER BREAK</h3>
      </div>

      <div class="google-slides-section">
        <div v-if="isEditing == false">
          <h1 class="section-header">SEMESTER BRIEF</h1>
        </div>
        <div v-else-if="isEditing == true">
          <div class="cd-header">
            <div class="right-cd">
              <h1 class="section-header">SEMESTER BRIEF</h1>
            </div>
            <div class="left-cd" v-if="isEditingSection.courseSlides == false">
              <CButtonIcon
                type="primary"
                size="md"
                btnIconLabel="Edit Section"
                @click="isEditingSection.courseSlides = true"
              >
                <template #icon>
                  <PencilLine size="16" />
                </template>
              </CButtonIcon>
            </div>
            <div class="left-cd" v-if="isEditingSection.courseSlides == true">
              <CButtonIcon
                type="primary"
                size="md"
                btnIconLabel="Save Section"
                @click="(saveCourseDetails(), (isEditingSection.courseSlides = false))"
              >
                <template #icon>
                  <PencilLine size="16" />
                </template>
              </CButtonIcon>
            </div>
          </div>
        </div>
        <div class="slides-container">
          <div class="active-editing" v-if="isEditingSection.courseSlides == true">
            <div class="input-cont">
              <div class="w-full mb-4">
                <FloatLabel>
                  <InputText
                    id="g-slide-url"
                    v-model="googleSlideurl"
                    class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none"
                  />
                  <label for="g-slide-url">Upload Google Slide Link</label>
                </FloatLabel>
              </div>
            </div>
            <div class="save-cont">
              <CButtonIcon
                type="primary"
                size="md"
                class="updateSave"
                btnIconLabel="Save Changes"
                @click="isEditingSection.courseSlides = false"
              >
                <template>
                  <Save size="16" />
                </template>
              </CButtonIcon>
            </div>
          </div>
          <div class="active-editing" v-if="isEditingSection.courseSlides == false">
            <div class="check-content text-center" v-if="courseData.courseSlides == null">
              <p>No Content Yet. Edit this section to add content</p>
            </div>
            <div class="check-content text-center" v-if="courseData.courseSlides != null">
              <iframe
                :src="courseData.courseSlides + '/embed'"
                frameborder="0"
                width="960"
                height="569"
                allowfullscreen="true"
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                class="slides-iframe"
              ></iframe>
            </div>
          </div>
        </div>
        <Divider class="mt-5 mb-5" />
      </div>

      <div class="mark-breakdown-section">
        <div v-if="isEditing == false">
          <h1 class="section-header">Mark Breakdown</h1>
        </div>
        <div v-else-if="isEditing == true">
          <div class="cd-header">
            <div class="right-cd">
              <h1 class="section-header">Mark Breakdown</h1>
            </div>
            <div class="left-cd" v-if="isEditingSection.courseMarkBreakdown == false">
              <CButtonIcon
                type="primary"
                size="md"
                btnIconLabel="Edit Section"
                @click="isEditingSection.courseMarkBreakdown = true"
              >
                <template #icon>
                  <PencilLine size="16" />
                </template>
              </CButtonIcon>
            </div>
            <div class="left-cd" v-if="isEditingSection.courseMarkBreakdown == true">
              <CButtonIcon
                type="primary"
                size="md"
                btnIconLabel="Save Section"
                @click="(saveCourseDetails(), (isEditingSection.courseMarkBreakdown = false))"
              >
                <template #icon>
                  <PencilLine size="16" />
                </template>
              </CButtonIcon>
            </div>
          </div>
        </div>
        <CButton type="secondary" size="md" :disabled="true" class="mark-breadown-btn mb-2"
          >MARK BREKDOWN</CButton
        >
        <br />
        <div class="active-editing" v-if="isEditingSection.courseMarkBreakdown == true">
          <!-- SECTION HEADER + TOTAL MARK -->
          <div class="w-full mb-4">
            <FloatLabel>
              <InputText v-model="newSection.title" class="w-full" id="section-title" />
              <label for="section-title">Section Title</label>
            </FloatLabel>
          </div>

          <div class="w-full mb-4">
            <FloatLabel>
              <InputText v-model="newSection.mark" class="w-full" id="section-mark" />
              <label for="section-mark">Total Mark (e.g., 30%)</label>
            </FloatLabel>
          </div>

          <!-- INNER ITEMS LOOP -->
          <div class="w-full mb-4 flex gap-2">
            <FloatLabel class="flex-1">
              <InputText v-model="newItem.description" id="desc-input" />
              <label for="desc-input">Item Description</label>
            </FloatLabel>
            <FloatLabel class="w-24">
              <InputText v-model="newItem.mark" id="mark-input" />
              <label for="mark-input">Mark</label>
            </FloatLabel>
            <Button icon="pi pi-plus" @click="addItemToSection" severity="primary" outlined />
          </div>

          <!-- ADD SECTION BUTTON -->

          <CButtonIcon
            class="add-icon-btn"
            type="primary"
            size="md"
            btnIconLabel="Add Breakdown"
            @click="addWeek"
          >
            <template #icon>
              <Plus size="16" />
            </template>
          </CButtonIcon>
        </div>
        <div class="active-editing" v-if="isEditingSection.courseMarkBreakdown == false">
          <div class="check-content text-center" v-if="courseData.courseMarkBreakdown.length == 0">
            <p>No Content Yet. Edit this section to add content</p>
          </div>
          <div class="check-content text-center">
            <CMarkBreakdown
              :items="courseData.courseMarkBreakdown"
              v-if="courseData.courseMarkBreakdown.length > 0"
            />
          </div>
        </div>

        <Divider class="mb-2" />
      </div>

      <div class="year-breakdown-section">
        <div v-if="isEditing == false">
          <h1 class="section-header">Year Breakdown</h1>
        </div>
        <div v-else-if="isEditing == true">
          <div class="cd-header">
            <div class="right-cd">
              <h1 class="section-header">Year Breakdown</h1>
            </div>
            <div class="left-cd" v-if="isEditingSection.courseMarkBreakdown == false">
              <CButtonIcon
                type="primary"
                size="md"
                btnIconLabel="Edit Section"
                @click="isEditingSection = true"
              >
                <template #icon>
                  <PencilLine size="16" />
                </template>
              </CButtonIcon>
            </div>
            <div class="left-cd" v-if="isEditingSection.courseSemDescriptions == true">
              <CButtonIcon
                type="primary"
                size="md"
                btnIconLabel="Save Section"
                @click="(saveCourseDetails(), (isEditingSection.courseSemDescriptions = false))"
              >
                <template #icon>
                  <PencilLine size="16" />
                </template>
              </CButtonIcon>
            </div>
          </div>
        </div>
        <CButton type="secondary" size="md" :disabled="true" class="year-breadown-btn mb-2"
          >Semester
        </CButton>
        <div class="active-editing" v-if="isEditingSection.courseSemDescriptions == true">
          <div class="input-cont">
            <div class="w-full mb-4 flex gap-2 items-end">
              <FloatLabel class="w-full">
                <InputText
                  id="week-break"
                  v-model="semesterDescription"
                  class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none"
                />
                <label for="week-break">Add a Semester Description</label>
              </FloatLabel>
              <CButtonIcon
                class="add-icon-btn"
                type="primary"
                size="md"
                btnIconLabel="Add Semester Description"
                @click="addSemBreakdown"
              >
                <template #icon>
                  <Plus size="16" />
                </template>
              </CButtonIcon>
            </div>
          </div>
        </div>
        <div class="active-editing" v-else-if="isEditingSection.courseSemDescriptions == false">
          <div
            class="check-content text-center"
            v-if="courseData.courseSemDescriptions.length == 0"
          >
            <p>No Content Yet. Edit this section to add content</p>
          </div>
          <div class="check-content">
            <p v-if="courseData.courseSemDescriptions.length > 0">
              {{ courseData.courseSemDescriptions[0]?.description || 'No description' }}
            </p>
          </div>
        </div>

        <Divider class="year-break-div" />

        <CButton type="secondary" size="md" :disabled="true" class="year-breadown-btn"
          >Semester 2</CButton
        >

        <p>
          {{ courseData.courseSemDescriptions[1]?.description }}
        </p>
      </div>
    </div>

    <div class="lecturer-contact-card-section">
      <LecturerCard
        img="https://picsum.photos/id/237/200/300"
        name="Dr. Jane Doe"
        email="jane.doe@example.com"
      />
    </div>
  </div>
</template>

<style scoped>
.section-header {
  margin-bottom: 2rem;
  color: #414141;
}

.section-header-lg {
  margin-bottom: 2rem;
  font-size: 48px;
}

.course-details-section {
  margin-bottom: 2.5rem;
}

/* ANNOUNCEMENTS */
.cd-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-cd > .CButtonIcon {
  width: 15rem;
  margin-top: 5rem;
}

.announcemnts-section {
  margin-bottom: 2rem;
}

.card-container {
  background-color: #f5f5f5;
  border-radius: 25px;
  padding: 1rem;
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

/*COURSE MASTER SECTION */

/*weekly breakdown*/
.add-icon-btn {
  width: 50%;
}

.course-cover-img > img {
  width: 100%;
  height: 300px;
  border-radius: 30px;
  object-fit: cover;
}

.course-cover-img {
  margin-bottom: 2rem;
}

.bio-section {
  margin-bottom: 2.5rem;
}

.semester-break {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 45px;
  background-color: #f0f1a5;
  height: 45px;
  margin: 2rem 0;
}

.slides-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slides-iframe {
  border-radius: 10px;
}

/*SLIDES*/
.save-cont {
  width: 100%;
}

.input-cont {
  margin-bottom: 5rem;
}

.mark-breadown-btn {
  margin-top: -2rem;
}

.google-slides-section {
  margin-bottom: 2rem;
}

.mark-breakdown-section {
  margin-bottom: 2rem;
}

.year-break-div {
  margin: 2rem 0rem;
}

.year-breakdown-section {
  margin-bottom: 2rem;
}

/* COURSE DETAILS SECTION */
.course-details-section {
  margin: 2.5rem;
}
.course-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#edit-course {
  width: 15rem;
  margin-top: 5rem;
  margin-bottom: 1rem;
}

/*inputs */
::v-deep(.p-inputtext),
::v-deep(.p-password-input),
::v-deep(.p-dropdown) {
  background-color: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  padding-left: 0 !important;
}

::v-deep(.p-password-input) {
  border: none !important;
}

::v-deep(.p-divider-content) {
  background-color: #f8f8f8 !important;
}

::v-deep(.p-float-label > label) {
  background-color: transparent !important;
}
</style>
