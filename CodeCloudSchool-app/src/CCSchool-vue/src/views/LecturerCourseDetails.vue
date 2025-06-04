<script setup>
//import api
import { CourseService, LecturerCourseService } from '@/api/courses'
import { AnnouncementService } from '@/api/announcements'

//importing vue features
import { ref, reactive, onMounted, computed } from 'vue'

//importing icons and primevue components
import { PencilLine, Maximize2, Ban, Save, CircleFadingArrowUp, RotateCcw } from 'lucide-vue-next'
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

//FUNCTIONALITY IMPLEMENTATION STARTS HERE

// 2. CONSTANTS
const courseId = 1 // Consider making this a prop if it can vary

// 3. REACTIVE STATE
// Form fields
const googleSlideurl = ref('')
const courseBio = ref('')
const newDescription = ref('')
const semesterInputs = reactive(['', ''])

//computed checks
const hasUnsavedChanges = computed(() => {
  return (
    courseData.courseDescription !== courseBio.value ||
    courseData.courseSlides !== googleSlideurl.value ||
    courseData.courseWeekBreakdown.length > 0 ||
    courseData.courseMarkBreakdown.length > 0 ||
    courseData.courseSemDescriptions.length > 0
  )
})

// Course data
const courseData = reactive({
  courseName: '',
  courseDescription: '',
  courseWeekBreakdown: [],
  courseSlides: '',
  courseMarkBreakdown: [],
  courseSemDescriptions: [],
})

// Draft copies to edit freely before confirming
const draftCourseBio = ref('')
const draftGoogleSlideUrl = ref('')
const draftWeekBreakdown = ref([]) // Mirror of courseWeekBreakdown
const draftMarkBreakdown = ref([]) // Mirror of courseMarkBreakdown
const draftSemDescriptions = ref([]) // Mirror of courseSemDescriptions

// Announcement data
const announcementData = reactive({
  announcementId: '',
  title: '',
  description: '',
  date: '',
  lecturerId: '',
})

// UI State
const isLoading = ref(false)
const error = ref(null)
const isEditing = ref(false)
const fullUpdate = ref(false)

const isEditingSection = reactive({
  courseDescription: false,
  courseWeekBreakdown: false,
  courseSlides: false,
  courseMarkBreakdown: false,
  courseSemDescriptions: false,
})

// Form models
const newSection = reactive({
  title: '',
  mark: '',
  items: [],
})

const newItem = reactive({
  description: '',
  mark: '',
})

// 4. LIFECYCLE HOOKS
onMounted(async () => {
  await loadInitialData()
})

// 5. DATA LOADING FUNCTIONS
const loadInitialData = async () => {
  isLoading.value = true
  try {
    await Promise.all([fetchCourseDetails(), fetchAnnouncements()])
  } catch (err) {
    error.value = 'Failed to load initial data'
    console.error('Initialization error:', err)
  } finally {
    isLoading.value = false
  }
}

const fetchCourseDetails = async () => {
  try {
    const response = await CourseService.getCourseDetails(courseId)
    if (response) {
      // Transform API response
      courseData.courseName = response.courseFullCode || ''
      courseData.courseDescription = response.courseAbout || ''
      courseData.courseSlides = response.courseSlides || ''
      courseData.courseWeekBreakdown = response.courseWeekBreakdown?.$values || []
      courseData.courseMarkBreakdown = response.courseMarkBreakdown?.$values || []
      courseData.courseSemDescriptions = response.courseSemDescriptions?.$values || []

      // Form inputs
      courseBio.value = courseData.courseDescription
      googleSlideurl.value = courseData.courseSlides

      // DRAFT CLONES
      draftWeekBreakdown.value = JSON.parse(JSON.stringify(courseData.courseWeekBreakdown))
      draftMarkBreakdown.value = JSON.parse(JSON.stringify(courseData.courseMarkBreakdown))
      draftSemDescriptions.value = JSON.parse(JSON.stringify(courseData.courseSemDescriptions))
    }
  } catch (err) {
    throw err // Let loadInitialData handle it
  }
}

const fetchAnnouncements = async () => {
  try {
    const response = await AnnouncementService.getAnnouncementsByCourseId(courseId)
    if (typeof response === 'string') {
      console.error('Error:', response)
    } else {
      announcements.value = response
      announcementData.title = response.title
      announcementData.description = response.description
      announcementData.date = response.formatAnnouncementDate(announcement.date)
    }
  } catch (err) {
    throw err // Let loadInitialData handle it
  }
}

const getEmbeddedSlideUrl = (url) => {
  if (!url) return ''
  if (url.includes('/edit') || url.includes('/view')) {
    return url.replace(/\/(edit|view).*/, '/embed')
  }
  return url + '/embed'
}

// 6. EDIT MODE FUNCTIONS
const toggleFullEditMode = async () => {
  fullUpdate.value = !fullUpdate.value
  Object.keys(isEditingSection).forEach((key) => {
    isEditingSection[key] = fullUpdate.value
  })

  if (!fullUpdate.value) {
    // User is cancelling update all, revert changes
    await fetchCourseDetails()
  }
}

const enterSectionEdit = (key) => {
  isEditingSection[key] = true
  if (key === 'courseDescription') draftCourseBio.value = courseBio.value
  if (key === 'courseSlides') draftGoogleSlideUrl.value = googleSlideurl.value
}

// 7. CRUD OPERATIONS
// -- Save Operations --
const saveCourseDetails = async (isFullUpdate = false) => {
  try {
    isLoading.value = true
    courseBio.value = draftCourseBio.value
    googleSlideurl.value = draftGoogleSlideUrl.value

    const payload = createSavePayload()
    const updatedCourse = await LecturerCourseService.updateCourseDetails(courseId, payload)
    updateLocalState(updatedCourse)

    if (isFullUpdate) {
      fullUpdate.value = false
      isEditing.value = false
      Object.keys(isEditingSection).forEach((key) => {
        isEditingSection[key] = false
      })
    }
  } catch (err) {
    error.value = err.message || 'Failed to save changes'
    alert('please try again, an error occured')
  } finally {
    isLoading.value = false
  }
}

const createSavePayload = () => ({
  courseFullCode: courseData.courseName,
  courseAbout: courseBio.value,
  courseSlides: googleSlideurl.value || '',
  courseWeekBreakdown: draftWeekBreakdown.value,
  courseMarkBreakdown: draftMarkBreakdown.value,
  courseSemDescriptions: draftSemDescriptions.value,
})

// Sync local reactive state and form inputs with latest backend data after update or wipe
const updateLocalState = (updatedCourse) => {
  Object.assign(courseData, {
    courseName: updatedCourse.courseFullCode,
    courseDescription: updatedCourse.courseAbout,
    courseSlides: updatedCourse.courseSlides,
    courseWeekBreakdown: updatedCourse.courseWeekBreakdown?.$values || [],
    courseMarkBreakdown: updatedCourse.courseMarkBreakdown?.$values || [],
    courseSemDescriptions: updatedCourse.courseSemDescriptions?.$values || [],
  })

  courseBio.value = updatedCourse.courseAbout
  googleSlideurl.value = updatedCourse.courseSlides

  draftWeekBreakdown.value = JSON.parse(JSON.stringify(courseData.courseWeekBreakdown))
  draftMarkBreakdown.value = JSON.parse(JSON.stringify(courseData.courseMarkBreakdown))
  draftSemDescriptions.value = JSON.parse(JSON.stringify(courseData.courseSemDescriptions))
}

// -- Add Operations --
const addWeek = () => {
  if (!newDescription.value.trim()) return

  draftWeekBreakdown.value.push({
    header: `Week ${draftWeekBreakdown.value.length + 1}`,
    description: newDescription.value.trim(),
  })

  newDescription.value = ''
}

const addSemBreakdown = (semesterIndex = 0) => {
  const value = semesterInputs[semesterIndex].trim()
  if (!value) return
  draftSemDescriptions.value[semesterIndex] = { description: value }
  semesterInputs[semesterIndex] = ''
}

const addItemToSection = () => {
  if (!newItem.description.trim() || !newItem.mark.trim()) return
  if (!newSection.items) newSection.items = []
  newSection.items.push({
    description: newItem.description.trim(),
    mark: newItem.mark.trim(),
  })
  newItem.description = ''
  newItem.mark = ''
}

const addSection = () => {
  if (!newSection.title.trim() || !newSection.mark.trim() || !newSection.items?.length) return
  draftMarkBreakdown.value.push({ ...newSection })
  resetNewSection()
}

// 8. UTILITY FUNCTIONS
const resetNewSection = () => {
  newSection.title = ''
  newSection.mark = ''
  newSection.items = []
}

const clearContent = async () => {
  try {
    isLoading.value = true
    const clearedCourse = await LecturerCourseService.updateCourseDetails(courseId, {
      courseDescription: '',
      courseWeekBreakdown: [],
      courseSlides: '',
      courseMarkBreakdown: [],
      courseSemDescriptions: [],
    })
    updateLocalState(clearedCourse)
    exitEditMode()
  } catch (err) {
    error.value = err.message || 'Failed to clear content'
  } finally {
    isLoading.value = false
  }
}

const exitEditMode = async () => {
  isEditing.value = false
  try {
    isLoading.value = true
    await fetchCourseDetails() // reload original values
    Object.keys(isEditingSection).forEach((key) => {
      isEditingSection[key] = false
    })
  } catch (err) {
    error.value = err.message || 'Failed to reload content'
  } finally {
    isLoading.value = false
  }
}

// 9. EVENT HANDLERS (for template)
const applySectionDrafts = {
  courseDescription: () => (courseBio.value = draftCourseBio.value),
  courseSlides: () => (googleSlideurl.value = draftGoogleSlideUrl.value),
  courseWeekBreakdown: () =>
    (courseData.courseWeekBreakdown = JSON.parse(JSON.stringify(draftWeekBreakdown.value))),
  courseMarkBreakdown: () =>
    (courseData.courseMarkBreakdown = JSON.parse(JSON.stringify(draftMarkBreakdown.value))),
  courseSemDescriptions: () =>
    (courseData.courseSemDescriptions = JSON.parse(JSON.stringify(draftSemDescriptions.value))),
}

const handleSaveSection = async (sectionKey) => {
  try {
    if (applySectionDrafts[sectionKey]) {
      applySectionDrafts[sectionKey]()
    }
    await saveCourseDetails()
    isEditingSection[sectionKey] = false
  } catch (error) {
    console.error('Error saving section:', error)
  }
}

//making sure changes are actually made and not just stored locally
const handleAddWeek = async () => {
  addWeek()
}

const handleAddSemesterBreakdown = async (index) => {
  addSemBreakdown(index)
}

const handleAddItemToSection = async () => {
  addItemToSection()
}

const handleAddSection = async () => {
  addSection()
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
          :announcementTitle="announcementData.title"
          :announcementBody="announcementData.description"
          :announcementDate="announcementData.date"
          moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..."
        />

        <div class="divider-card"></div>

        <div v-if="!announcementData.length" class="text-gray-500">
          You have not posted an announcement
        </div>
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
        <div class="right-cs-header header-btns" v-else-if="isEditing == true">
          <div class="edit-types">
            <CButtonIcon
              class="edit-course-var"
              type="primary"
              size="md"
              btnIconLabel="Wipe Course Details"
              @click="clearContent"
            >
              <template #icon>
                <RotateCcw size="20" />
              </template>
            </CButtonIcon>
            <CButtonIcon
              class="edit-course-var"
              type="primary"
              size="md"
              :btnIconLabel="fullUpdate ? 'Cancel Update All' : 'Update entire Course Content'"
              @click="toggleFullEditMode"
            >
              <template #icon>
                <CircleFadingArrowUp size="20" />
              </template>
            </CButtonIcon>
            <!--Below is save button for global changes-->
            <CButtonIcon
              v-if="fullUpdate && hasUnsavedChanges"
              class="edit-course-var"
              type="primary"
              size="md"
              btnIconLabel="Save All Changes"
              @click="saveCourseDetails(true)"
            >
              <template #icon>
                <Save size="20" />
              </template>
            </CButtonIcon>
            <CButtonIcon
              class="edit-course-var exit-editing"
              type="primary"
              size="md"
              btnIconLabel="Exit Edit Mode"
              @click="exitEditMode"
            >
              <template #icon>
                <Ban size="20" />
              </template>
            </CButtonIcon>
          </div>
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
                @click="enterSectionEdit('courseDescription')"
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
                @click="handleSaveSection('courseDescription')"
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
                  v-model="draftCourseBio"
                  class="w-8 border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none"
                />
                <label for="course-bio">Insert Course Description</label>
              </FloatLabel>
            </p>
          </div>
        </div>
        <div class="active-editing" v-if="isEditingSection.courseDescription == false">
          <div class="check-content text-center" v-if="courseData.courseDescription == ''">
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
                @click="handleSaveSection('courseWeekBreakdown')"
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
                @click="handleAddWeek"
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
            <CListGroup :items="draftWeekBreakdown" />
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
                @click="handleSaveSection('courseSlides')"
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
                    v-model="draftGoogleSlideUrl"
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
            <div class="check-content text-center" v-if="courseData.courseSlides == ''">
              <p>No Content Yet. Edit this section to add content</p>
            </div>
            <div class="check-content text-center" v-if="courseData.courseSlides != null">
              <iframe
                :src="getEmbeddedSlideUrl(courseData.courseSlides)"
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
                @click="handleSaveSection('courseMarkBreakdown')"
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
          <div class="w-full mb-4 editing-year-break">
            <FloatLabel>
              <InputText
                v-model="newSection.title"
                class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none"
                id="section-title"
              />
              <label for="section-title">Type of Assignment (e.g., Formative)</label>
            </FloatLabel>
          </div>

          <div class="w-full mb-4">
            <FloatLabel>
              <InputText
                v-model="newSection.mark"
                class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none"
                id="section-mark"
              />
              <label for="section-mark">Total Mark for the assignment (e.g., 30%)</label>
            </FloatLabel>
          </div>

          <!-- INNER ITEMS LOOP -->
          <div class="w-full mb-4 flex gap-2">
            <FloatLabel class="flex-1">
              <InputText
                v-model="newItem.description"
                id="desc-input"
                class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none"
              />
              <label for="desc-input">Assessment/Task title (e.g., Theory Quiz)</label>
            </FloatLabel>
            <FloatLabel class="w-24">
              <InputText
                v-model="newItem.mark"
                id="mark-input"
                class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none"
              />
              <label for="mark-input">Assessment/Task Mark</label>
            </FloatLabel>
            <Button
              icon="pi pi-plus simple-plus"
              @click="handleAddItemToSection"
              :disabled="!newItem.description || !newItem.mark"
            />
          </div>

          <!-- ADD SECTION BUTTON -->
          <CButtonIcon
            class="add-icon-btn add-sec-btn"
            type="primary"
            size="md"
            btnIconLabel="Add Section"
            @click="handleAddSection"
            :disabled="!newSection.title || !newSection.mark || !newSection.items?.length"
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
            <CMarkBreakdown :items="draftMarkBreakdown" />
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
            <div class="left-cd" v-if="isEditingSection.courseSemDescriptions == false">
              <CButtonIcon
                type="primary"
                size="md"
                btnIconLabel="Edit Section"
                @click="isEditingSection.courseSemDescriptions = true"
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
                  v-model="semesterInputs[0]"
                  class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none"
                />
                <label for="week-break">Add a Semester Description</label>
              </FloatLabel>
              <CButtonIcon
                class="add-icon-btn"
                type="primary"
                size="md"
                btnIconLabel="Add Semester Description"
                @click="handleAddSemesterBreakdown(0)"
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
              {{ draftSemDescriptions[0]?.description || 'No description' }}
            </p>
          </div>
        </div>

        <Divider class="year-break-div" />

        <CButton type="secondary" size="md" :disabled="true" class="year-breadown-btn"
          >Semester 2</CButton
        >
        <div class="active-editing" v-if="isEditingSection.courseSemDescriptions == true">
          <div class="input-cont">
            <div class="w-full mb-4 flex gap-2 items-end">
              <FloatLabel class="w-full">
                <InputText
                  id="week-break2"
                  v-model="semesterInputs[1]"
                  class="w-full mt-2 border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none"
                />
                <label for="week-break2">Add a Semester Description</label>
              </FloatLabel>
              <CButtonIcon
                class="add-icon-btn"
                type="primary"
                size="md"
                btnIconLabel="Add Semester Description"
                @click="handleAddSemesterBreakdown(1)"
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
            <p v-if="courseData.courseSemDescriptions.length > 1">
              {{ draftSemDescriptions[1]?.description || 'No description' }}
            </p>
          </div>
        </div>
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
.header-btns {
  width: 100%;
  margin-bottom: 2rem;
}

.edit-types {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

#edit-course {
  margin: 0;
  margin-bottom: 2rem;
}

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
  display: block;
}

/*mark breakdown */
.editing-year-break {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.editing-year-break > * {
  margin-top: 1rem;
}

.add-sec-btn {
  margin-top: 2rem;
  min-width: 100%;
  margin-bottom: 2rem;
}

button.p-button.p-component.p-button-icon-only {
  border-radius: 9999px;
  margin-top: 0.5rem;
  height: 30px;
  width: 30px;
  background-color: #414141;
  color: white;
  border: none;

  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}

button.p-button.p-component.p-button-icon-only:active {
  background-color: #f0f1a5;
  color: #414141;
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
