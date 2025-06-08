<script setup>
import { ref, computed } from 'vue'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'

const props = defineProps({
  variant: {
    type: String,
    default: 'assignment', // or 'module' or ''
  },
})

//MWAPE ADJUSTMENT START
const emit = defineEmits(['submitModule'])

//function to handle form data when Save module is clicked
function submitModuleForm() {
  const payload = {
    title: moduleForm.value.title,
    groupTitle: moduleForm.value.pageName, // maps to GroupTitle
    description: moduleForm.value.description,
    slideUrl: moduleForm.value.slides || '',
    AdditionalResources: moduleForm.value.resources || '',
  }

  emit('submitModule', payload)
}

defineExpose({
  resetForm: () => {
    moduleForm.value = {
      title: '',
      pageName: '',
      description: '',
      slides: '',
      resources: '',
      embedCode: '',
    }
  },
})

//MWAPE ADJUSTMENT END

/* Assignment Form State */
const assignmentForm = ref({
  title: '',
  dueDate: null,
  attempts: 1,
  unlimitedAttempts: false,
  format: null,
  detailsHeader: '',
  description: '',
})

const formats = [
  { label: 'PDF', value: 'pdf' },
  { label: 'DOCX', value: 'docx' },
  { label: 'Image', value: 'image' },
  { label: 'Zip Archive', value: 'zip' },
]

function increaseAttempts() {
  assignmentForm.value.attempts++
}
function decreaseAttempts() {
  if (assignmentForm.value.attempts > 1) assignmentForm.value.attempts--
}
function toggleUnlimited() {
  assignmentForm.value.unlimitedAttempts = !assignmentForm.value.unlimitedAttempts
}

/* Module Form State */
const moduleForm = ref({
  title: '',
  pageName: '',
  description: '',
  slides: null,
  resources: '',
  embedCode: '',
})
</script>

<template>
  <div class="p-6 max-w-xl mx-auto">
    <!-- ASSIGNMENT FORM -->
    <template v-if="variant === 'assignment'">
      <h2 class="text-lg font-semibold mb-4 title-underline">Create a New Assignment</h2>

      <div class="mb-4">
        <label class="block mb-2">Assignment Title</label>
        <InputText
          v-model="assignmentForm.title"
          class="w-full rounded-input"
          placeholder="Type assignment title here"
        />
      </div>

      <div class="flex gap-4 mb-4">
        <div class="flex-1">
          <label class="block mb-2">Assignment Due Date</label>
          <Calendar
            v-model="assignmentForm.dueDate"
            placeholder="Select a Date"
            class="w-full rounded-input button-clr"
            showIcon
          />
        </div>
        <div class="flex-1">
          <label class="block mb-2">Set Attempt Count</label>
          <div class="flex items-center gap-2">
            <Button
              icon="pi pi-minus"
              class="button-clr"
              @click="decreaseAttempts"
              :disabled="assignmentForm.attempts <= 1"
            />
            <span
              >Attempts {{ assignmentForm.unlimitedAttempts ? '∞' : assignmentForm.attempts }}</span
            >
            <Button
              icon="pi pi-plus"
              class="button-clr"
              @click="increaseAttempts"
              :disabled="assignmentForm.unlimitedAttempts"
            />
            <Button icon="pi pi-infinity" class="button-clr" @click="toggleUnlimited">∞</Button>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="block mb-2">Expected Submission Format</label>
        <Dropdown
          v-model="assignmentForm.format"
          :options="formats"
          optionLabel="label"
          optionValue="value"
          placeholder="Select a Format"
          class="w-full rounded-input"
        />
      </div>

      <h3 class="text-md font-semibold mt-6 mb-2 title-underline">Assignment Details</h3>

      <div class="mb-4">
        <label class="block mb-2">Assignment Details Header</label>
        <InputText
          v-model="assignmentForm.detailsHeader"
          class="w-full rounded-input"
          placeholder="Type assignment title here"
        />
      </div>

      <div class="mb-6">
        <label class="block mb-2">Assignment Details Description</label>
        <Textarea
          v-model="assignmentForm.description"
          class="w-full rounded-input"
          rows="6"
          placeholder="Type assignment description here"
        />
      </div>

      <Button label="Save Assignment" class="w-full rounded-input save-btn button-clr" />
    </template>

    <!-- MODULE FORM -->
    <template v-else-if="variant === 'module'">
      <h2 class="text-lg font-semibold mb-4 title-underline">Create a New Module</h2>

      <div class="mb-4">
        <label class="block mb-2">Module Title</label>
        <InputText
          v-model="moduleForm.title"
          class="w-full rounded-input"
          placeholder="Type Module title here"
        />
      </div>

      <!-- Divider -->
      <div class="form-divider"></div>

      <div class="mb-4">
        <label class="block mb-2">Module Page Name</label>
        <InputText
          v-model="moduleForm.pageName"
          class="w-full rounded-input"
          placeholder="Type Module Page Name here"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-2">Module Page Description</label>
        <Textarea
          v-model="moduleForm.description"
          class="w-full rounded-input"
          rows="5"
          placeholder="Type Module Page Name here"
        />
      </div>

      <div class="mb-4">
        <!-- <label class="block mb-2">Module Page Slides</label>
        <FileUpload
          mode="basic"
          class="w-full rounded-input"
          name="slides"
          chooseLabel="Upload Page Slides"
          @select="(e) => (moduleForm.slides = e.files)"
        /> -->

        <!-------------------------------------------------------------->

        <!--Mwape Change (to match backend) start-->
        <label class="block mb-2">Module Page Slides</label>
        <InputText
          v-model="moduleForm.slides"
          class="w-full rounded-input"
          placeholder="Paste Share Link here"
        />
        <!--Mwape Change (to match backend) End-->
      </div>

      <div class="mb-4">
        <label class="block mb-2">Add Additional Resources</label>
        <Textarea
          v-model="moduleForm.resources"
          class="w-full rounded-input"
          rows="5"
          placeholder="Type Additional Module Page Resources here"
        />
      </div>

      <!--Mwape Change (refactor because this is not in the backend)
      <div class="mb-6">
        <label class="block mb-2">Embed Video/Content</label>
        <InputText
          v-model="moduleForm.embedCode"
          class="w-full rounded-input"
          placeholder="Paste Embed code here"
        />
      </div>
-->

      <div class="flex gap-4">
        <Button
          label="Save Module"
          class="flex-1 rounded-input button-clr"
          @click="submitModuleForm"
        />
        <Button
          label="Add Another Page to This Module"
          icon="pi pi-plus"
          class="flex-1 rounded-input button-clr"
        />
      </div>
    </template>

    <!-- Announcement FORM -->
    <template v-else-if="variant === 'announcement'">
      <h2 class="text-lg font-semibold mb-4 title-underline">Create an Announcement</h2>

      <div class="mb-4">
        <label class="block mb-2">Announcement Title</label>
        <InputText
          v-model="announceForm.title"
          class="w-full rounded-input"
          placeholder="Type Module title here"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-2">Announcement Body</label>
        <Textarea
          v-model="announceForm.body"
          class="w-full rounded-input"
          rows="5"
          placeholder="Type Announcement Body here"
        />
      </div>

      <Button label="Send Announcement" class="w-full rounded-input save-btn button-clr" />
    </template>
  </div>
</template>

<style scoped>
.form-divider {
  height: 1px;
  background: #d0d0d1;
  margin: 1rem 0;
  border: none;
}

.rounded-input {
  border-radius: 25px !important;
}

.save-btn {
  width: 70% !important;
  margin-left: 15%;
}

.title-underline {
  text-decoration: underline;
  text-decoration-color: #d0d0d1;
  text-underline-offset: 6px;
  text-decoration-thickness: 1px;
  margin-bottom: 1rem;
}

.button-clr {
  background-color: lightgray !important;
  color: black !important;
  border: none;
  border-radius: 25px;
}

/* Shared PrimeVue styles */
:deep(.rounded-input),
:deep(.p-inputtext),
:deep(.p-dropdown),
:deep(.p-calendar),
:deep(.p-inputtextarea),
:deep(.p-fileupload-buttonbar),
:deep(.p-button) {
  background-color: #f3f3f3 !important;
  color: black !important;
  border: none !important;
  border-radius: 25px !important;
}
</style>
