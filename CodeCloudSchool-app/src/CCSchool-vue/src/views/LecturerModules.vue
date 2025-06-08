<script setup>
//importing from vue
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

//importing api services
import { LecturerCourseService } from '@/api/courses'
import { ModulesServices, LecturerModulesServices } from '@/api/modules'

//importing components
import AccordionCard from '@/components/AccordionCard.vue'
import CDropdown from '@/components/ui/CDropdown.vue'
import CButtonIcon from '@/components/ui/CButton-icon.vue'
import { PlusCircleIcon, ArrowUpFromLine } from 'lucide-vue-next'

//using routing for inpage navigation
const router = useRouter()
const toast = useToast()

//setting variables
const selectedOption = ref('All')

//Get Lecturer ID else fallback
const storedLectId = localStorage.getItem('lecturerId')
const lecturerId = storedLectId && !isNaN(Number(storedLectId)) ? parseInt(storedLectId, 10) : 2

const modules = ref([])

//initial data fetch
onMounted(fetchModules)

//simplifying onMounted
async function fetchModules() {
  try {
    const { success, courses } = await LecturerCourseService.getLecturerCourses(lecturerId)
    if (success && courses?.length) {
      const courseId = courses[0].id
      const response = await ModulesServices.fetchModulesByCourseID(courseId)

      modules.value = response?.$values || []
    }
  } catch (err) {
    console.error('Error fetching modules:', err)
  }
}

//publish modules handeling
async function handlePublishModule(courseId, moduleId) {
  try {
    const response = await LecturerModulesServices.publishModule(courseId, moduleId, true)

    console.log('Module published:', response)

    //toast notification
    toast.add({ severity: 'success', summary: 'Success', detail: 'Module published successfully' })

    await fetchModules() // Refresh the list after publishing
  } catch (error) {
    console.error('Failed to publish module:', error)
    //error toast
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to publish module' })
  }
}

//navs
const goToCreateModule = () => {
  router.push({ name: 'lecturer-create-modules' })
}

function handleModuleClick(courseId) {
  router.push({
    name: 'studentModuleDetails',
    params: { courseId },
  })
}
</script>

<template>
  <Toast />
  <div class="modules-header">
    <div class="right-aligned">
      <CDropdown
        v-model="selectedOption"
        :options="['All', 'Published', 'Unpublished']"
        simple-options
        placeholder="Select an Option"
        type="primary"
        size="sm"
      />
      <CButtonIcon
        class="btn-icon-custom"
        type="primary"
        size="sm"
        btnIconLabel="Create New Module"
        @click="goToCreateModule"
      >
        <template #icon>
          <PlusCircleIcon />
        </template>
      </CButtonIcon>
    </div>
  </div>

  <div class="card-con">
    <template v-if="selectedOption === 'All'">
      <h1>All Modules</h1>
      <AccordionCard
        v-for="mod in modules"
        :key="mod.moduleId"
        :header="(mod.groupTitle || 'Untitled') + ': ' + (mod.title || 'No Title')"
        :items="[{ title: mod.description }]"
      />
    </template>

    <template v-else-if="selectedOption === 'Published'">
      <h1>Published Modules</h1>
      <AccordionCard
        v-for="mod in modules.filter((m) => m.published)"
        :key="mod.moduleId"
        :header="(mod.groupTitle || 'Untitled') + ': ' + (mod.title || 'No Title')"
        :items="[{ title: mod.description }]"
        @click="() => handleModuleClick(mod.courseId)"
      />
    </template>

    <template v-else-if="selectedOption === 'Unpublished'">
      <h1>Unpublished Modules</h1>
      <div
        class="accordion-container"
        v-for="mod in modules.filter((m) => !m.published)"
        :key="mod.moduleId"
      >
        <AccordionCard
          :header="(mod.groupTitle || 'Untitled') + ': ' + (mod.title || 'No Title')"
          :items="[{ title: mod.description }]"
        />
        <CButtonIcon
          type="secondary"
          size="lg"
          btnIconLabel="Publish Module"
          @click="handlePublishModule(mod.courseId, mod.moduleId)"
        >
          <template #icon>
            <ArrowUpFromLine />
          </template>
        </CButtonIcon>
      </div>
    </template>
  </div>
</template>

<style scoped>
.modules-header {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 1.5rem;
}

.right-aligned {
  align-self: flex-end;
  display: flex;
  justify-content: row;
  gap: 1rem;
}

.btn-icon-custom {
  width: 65%;
  height: inherit;
}

.card-con {
  display: flex;
  justify-content: center;
  padding-left: 5%;
  padding-right: 5%;
  flex-direction: column;
}

.unpublished {
  margin-top: 1rem;
}

hr {
  margin: 1.2rem 0;
}

.accordion-container {
  padding: 1rem;
  padding-bottom: 2rem;
  background-color: #f7f6fb;
  border-radius: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  margin-bottom: 3rem;
}
</style>
