<script setup>
import CardComp from '@/components/CardComp.vue'
import CListGroup from '@/components/CListGroup.vue'
import CButton from '@/components/ui/CButton.vue'
import Divider from 'primevue/divider'
import CMarkBreakdown from '@/components/CMarkBreakdown.vue'
import LecturerCard from '@/components/LecturerCard.vue'

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
]
</script>

<template>
  <div class="announcemnts-section">
    <h1 class="section-header">Announcements</h1>
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
    <h1 class="section-header-lg">Computer Science | Semester 1</h1>
    <div class="course-cover-img">
      <img src="https://picsum.photos/seed/picsum/1200/1600" alt="course cover img" />
    </div>
  </div>

  <div class="bio-section">
    <h1 class="section-header">What You Will Learn</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, eum porro eius earum explicabo
      mollitia cupiditate nemo veritatis sint enim unde, totam hic nobis placeat itaque asperiores
      sed officia pariatur! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum adipisci
      eum dolorem harum a accusamus quos! Delectus nihil officiis eos nostrum porro corrupti quia
      tempore, obcaecati officia voluptatum quae ducimus?
    </p>
  </div>

  <div class="sem-overview-section">
    <CListGroup
      :items="[
        { header: 'Week 1 ', description: ' Course Introduction & Briefing.' },
        { header: 'Week 2', description: 'Type-sensitive programming' },
        { header: 'Week 3', description: ' Basic software architecture' },
      ]"
    />
  </div>

  <div class="semester-break">
    <h3>SEMESTER BREAK</h3>
  </div>

  <div class="google-slides-section">
    <h1 class="section-header">SEMESTER BRIEF</h1>
    <div class="slides-container">
      <iframe
        src="https://docs.google.com/presentation/d/e/2PACX-1vRGtMnpYEVo6hbUXId7ZBzDVjzEbtUL6hu4qx8YRp8GLh_ITDH_cUTZSJgxnCh-ztxNWQdj4ozAmWem/pubembed?start=false&loop=true&delayms=3000"
        frameborder="0"
        width="960"
        height="569"
        allowfullscreen="true"
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        class="slides-iframe"
      ></iframe>
    </div>
    <Divider class="mt-5 mb-5" />
  </div>

  <div class="mark-breakdown-section">
    <h1 class="section-header">Mark Breakdown</h1>
    <CButton type="secondary" size="md" :disabled="true" class="mark-breadown-btn mb-2"
      >MARK BREKDOWN</CButton
    >
    <br />
    <CMarkBreakdown :items="assessmentGroups" />
    <Divider class="mb-2" />
  </div>

  <div class="year-breakdown-section">
    <h1 class="section-header">Year Breakdown</h1>
    <CButton type="secondary" size="md" :disabled="true" class="year-breadown-btn mb-2"
      >Semester 1</CButton
    >

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quisquam assumenda soluta
      repellendus saepe expedita, perspiciatis distinctio? Aut culpa vero placeat mollitia animi,
      nesciunt, magnam non eos itaque perferendis dicta.
    </p>

    <Divider class="year-break-div" />

    <CButton type="secondary" size="md" :disabled="true" class="year-breadown-btn"
      >Semester 2</CButton
    >

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quisquam assumenda soluta
      repellendus saepe expedita, perspiciatis distinctio? Aut culpa vero placeat mollitia animi,
      nesciunt, magnam non eos itaque perferendis dicta.
    </p>
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

/* ANNOUNCEMENTS */
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
</style>
