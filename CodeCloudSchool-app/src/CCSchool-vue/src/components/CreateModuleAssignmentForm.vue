<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'

const form = ref({
    title: '',
    dueDate: null,
    attempts: 1,
    unlimitedAttempts: false,
    format: null,
    detailsHeader: '',
    description: ''
})

const formats = [
    { label: 'PDF', value: 'pdf' },
    { label: 'DOCX', value: 'docx' },
    { label: 'Image', value: 'image' },
    { label: 'Zip Archive', value: 'zip' }
]

function increaseAttempts() {
    form.value.attempts++
}

function decreaseAttempts() {
    if (form.value.attempts > 1) form.value.attempts--
}

function toggleUnlimited() {
    form.value.unlimitedAttempts = !form.value.unlimitedAttempts
}
</script>


<template>
    <div class="p-6 max-w-xl mx-auto">
        <h2 class="text-lg font-semibold mb-4 title-underline">Create a New Assignment</h2>

        <div class="mb-4">
            <label class="block mb-2">Assignment Title</label>
            <InputText v-model="form.title" class="w-full rounded-input" placeholder="Type assignment title here" />
        </div>

        <div class="flex gap-4 mb-4">
            <div class="flex-1">
                <label class="block mb-2 ">Assignment Due Date</label>
                <Calendar v-model="form.dueDate" placeholder="Select a Date" class="w-full rounded-input button-clr"
                    showIcon />
            </div>
            <div class="flex-1">
                <label class="block mb-2">Set Attempt Count</label>
                <div class="flex items-center gap-2 ">
                    <Button icon="pi pi-minus bac" class="button-clr" @click="decreaseAttempts"
                        :disabled="form.attempts <= 1" />
                    <span>Attempts {{ form.unlimitedAttempts ? '∞' : form.attempts }}</span>
                    <Button icon="pi pi-plus" class="button-clr" @click="increaseAttempts"
                        :disabled="form.unlimitedAttempts" />
                    <Button icon="pi pi-infinity" class="button-clr" @click="toggleUnlimited">∞</Button>
                </div>
            </div>
        </div>

        <div class="mb-4">
            <label class="block mb-2">Expected Submission Format</label>
            <Dropdown v-model="form.format" :options="formats" optionLabel="label" optionValue="value"
                placeholder="Select a Format" class="w-full rounded-input" />
        </div>

        <h3 class="text-md font-semibold mt-6 mb-2 title-underline">Assignment Details</h3>

        <div class="mb-4">
            <label class="block mb-2">Assignment Details Header</label>
            <InputText v-model="form.detailsHeader" class="w-full rounded-input"
                placeholder="Type assignment title here" />
        </div>

        <div class="mb-6">
            <label class="block mb-2">Assignment Details Description</label>
            <Textarea v-model="form.description" class="w-full rounded-input" rows="6"
                placeholder="Type assignment description here" />
        </div>

        <Button label="Save Assignment" class="w-full rounded-input save-btn button-clr" />
    </div>
</template>


<style scoped>
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


/* For PrimeVue Button */
:deep(.button-clr),
.button-clr {
    background-color: lightgray !important;
    color: black !important;
    border: none !important;
}

/* For PrimeVue Calendar input */
:deep(.button-clr .p-inputtext),
.button-clr .p-inputtext  {
    /* background-color: lightgray !important; */
    color: black !important;
    border: none !important;
    border-radius: 25px !important;
}

/* For PrimeVue Calendar icon button */
:deep(.button-clr .p-datepicker-trigger),
.button-clr .p-datepicker-trigger  {
    background-color: #f3f3f3 !important;
    color: black !important;
    border: none !important;
    border-radius: 25px !important;
}

/* Light gray background for all fields */
:deep(.rounded-input),
:deep(.p-inputtext),
:deep(.p-dropdown),
:deep(.p-calendar),
:deep(.p-inputtextarea) {
  background-color: #f3f3f3 !important;
  color: black !important;
  border: none !important;
  border-radius: 25px !important;
  transition: box-shadow 0.2s, border-color 0.2s;
}

</style>
