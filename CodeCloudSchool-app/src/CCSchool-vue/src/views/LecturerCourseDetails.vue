<script setup>
import CardComp from '@/components/CardComp.vue'
import CListGroup from '@/components/CListGroup.vue'
import CButton from '@/components/ui/CButton.vue'
import Divider from 'primevue/divider'
import CMarkBreakdown from '@/components/CMarkBreakdown.vue'
import LecturerCard from '@/components/LecturerCard.vue'
import CButtonIcon from '@/components/ui/CButton-icon.vue'
import { PencilLine, Maximize2, Ban, Save, ArrowUpFromLine } from 'lucide-vue-next'
import { ref, reactive } from 'vue'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'

const assessmentGroups = [
  {
    title: 'Theory Assessments',
    mark: '10%',
    items: [
      { description: 'Theme 1: Project Proposal Document', mark: '50%' },
      { description: 'Theme 2: Project Report & Demonstration', mark: '50%' },
    ],
  },
  {
    title: 'Formative Assessments',
    mark: '30%',
    items: [
      { description: 'Theme 1: Progress Feedback', mark: '25%' },
      { description: 'Theme 1: Code Review', mark: '25%' },
      { description: 'Theme 2: Progress Feedback', mark: '25%' },
      { description: 'Theme 2: Code Review', mark: '25%' },
    ],
  },
  {
    title: 'Summative Assessments',
    mark: '60%',
    items: [
      { description: 'Repository Administration', mark: '15%' },
      { description: 'Functional Management System', mark: '70%' },
      { description: 'Individual Contribution', mark: '15%' },
    ],
  },
] //template for assesment layout

const courseData = reactive({
  courseName: 'Computer Science',
  courseDescription: 'rendering from course data ',
  courseWeekBreakdown: [
    { header: 'Week 1 ', description: ' Course Introduction & Briefing.' },
    { header: 'Week 2', description: 'Type-sensitive programming aka TS' },
    { header: 'Week 3', description: ' Basic software architecture' },
  ],
  courseSlides:
    'https://docs.google.com/presentation/d/1ZAwD8jemOHHxzsZoFGk9nIHYy9oJnjzJ7OSP1LckCn4',
  courseMarkBreakdown: [
    {
      title: 'Theory Assessments',
      mark: '10%',
      items: [
        { description: 'Theme 1: Project Proposal Document', mark: '50%' },
        { description: 'Theme 2: Project Report & Demonstration', mark: '50%' },
      ],
    },
    {
      title: 'Formative Assessments',
      mark: '30%',
      items: [
        { description: 'Theme 1: Progress Feedback', mark: '25%' },
        { description: 'Theme 1: Code Review', mark: '25%' },
        { description: 'Theme 2: Progress Feedback', mark: '25%' },
        { description: 'Theme 2: Code Review', mark: '25%' },
      ],
    },
    {
      title: 'Summative Assessments',
      mark: '60%',
      items: [
        { description: 'Repository Administration', mark: '15%' },
        { description: 'Functional Management System', mark: '70%' },
        { description: 'Individual Contribution', mark: '15%' },
      ],
    },
  ],
  courseSemDescriptions: [
    {
      description: 'Semester One description',
    },
    { description: 'Semester Two description' },
  ],
})

const editableData = reactive({ ...courseData }) //state management -> essentially storing the unsaved changes before user confirmation
const isEditing = ref(false) //state management for making the course details editable
const isEditingSection = ref(false) //state management for making the section editable

//storing uploads
const googleSlideurl = ref(null)

const sectionEdit = reactive({
  courseName: false,
  courseDescription: false,
  courseWeekBreakdown: false,
  courseSlides: false,
  courseMarkBreakdown: false,
  courseSemDescriptions: false,
})
</script>

<template>
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
          btnIconLabel="Cancel"
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
          <div class="left-cd">
            <CButtonIcon type="primary" size="md" btnIconLabel="Edit Section">
              <template #icon>
                <PencilLine size="16" />
              </template>
            </CButtonIcon>
          </div>
        </div>
      </div>
      <p>
        {{ courseData.courseDescription }}
      </p>
    </div>

    <div class="sem-overview-section">
      <div v-if="isEditing == false">
        <h1 class="section-header"></h1>
      </div>
      <div v-else-if="isEditing == true">
        <div class="cd-header">
          <div class="right-cd">
            <h1 class="section-header"></h1>
          </div>
          <div class="left-cd">
            <CButtonIcon type="primary" size="md" btnIconLabel="Edit Section">
              <template #icon>
                <PencilLine size="16" />
              </template>
            </CButtonIcon>
          </div>
        </div>
      </div>
      <CListGroup :items="courseData.courseWeekBreakdown" />
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
          <div class="left-cd" v-if="isEditingSection == false">
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
          <div class="left-cd" v-if="isEditingSection == true">
            <CButtonIcon
              type="primary"
              size="md"
              btnIconLabel="Save Section"
              @click="isEditingSection = false"
            >
              <template #icon>
                <PencilLine size="16" />
              </template>
            </CButtonIcon>
          </div>
        </div>
      </div>
      <div class="slides-container">
        <div class="active-editing" v-if="isEditingSection == true">
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
            <CButtonIcon
              type="primary"
              size="md"
              class="updateSave"
              btnIconLabel="Upload Google Slides"
            >
              <template>
                <ArrowUpFromLine size="16" />
              </template>
            </CButtonIcon>
          </div>
          <div class="save-cont">
            <CButtonIcon
              type="primary"
              size="md"
              class="updateSave"
              btnIconLabel="Save Changes"
              @click="isEditingSection = false"
            >
              <template>
                <Save size="16" />
              </template>
            </CButtonIcon>
          </div>
        </div>
        <div class="active-editing" v-if="isEditingSection == false">
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
          <div class="left-cd">
            <CButtonIcon type="primary" size="md" btnIconLabel="Edit Section">
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
      <CMarkBreakdown :items="courseData.courseMarkBreakdown" />
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
          <div class="left-cd">
            <CButtonIcon type="primary" size="md" btnIconLabel="Edit Section">
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

      <p>
        {{ courseData.courseSemDescriptions[0]?.description }}
      </p>

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
