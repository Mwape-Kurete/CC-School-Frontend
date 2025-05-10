<template>
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-4">Upload Submission</h2>
      
      <!-- File Upload (PrimeVue) -->
      <FileUpload
        mode="basic"
        name="submission"
        :auto="true"
        chooseLabel="Select File"
        class="mb-4"
        @select="onFileSelect"
      />
  
      <!-- Submission Details Form -->
      <div class="space-y-4">
        <InputText 
          v-model="title" 
          placeholder="Submission Title" 
          class="w-full p-2 border rounded"
        />
        <Textarea
          v-model="description"
          placeholder="Description (Optional)"
          rows="3"
          class="w-full p-2 border rounded"
        />
        
        <!-- Submit Button -->
        <Button 
          label="Submit" 
          icon="pi pi-check" 
          class="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          @click="handleSubmit"
        />
      </div>
  
      <!-- Upload Status -->
      <Toast />
      <div v-if="uploading" class="mt-4 text-gray-600">
        <ProgressSpinner style="width: 30px; height: 30px" />
        <span class="ml-2">Uploading...</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useToast } from 'primevue/usetoast';
  import FileUpload from 'primevue/fileupload';
  import InputText from 'primevue/inputtext';
  import Textarea from 'primevue/textarea';
  import Button from 'primevue/button';
  import Toast from 'primevue/toast';
  import ProgressSpinner from 'primevue/progressspinner';
  
  const toast = useToast();
  const title = ref('');
  const description = ref('');
  const file = ref(null);
  const uploading = ref(false);
  
  const onFileSelect = (event) => {
    file.value = event.files[0];
  };
  
  const handleSubmit = async () => {
    if (!file.value) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Please select a file!', life: 3000 });
      return;
    }
  
    uploading.value = true;
  
    // Simulate API upload (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Mock delay
      toast.add({ severity: 'success', summary: 'Success', detail: 'Submission uploaded!', life: 3000 });
      title.value = '';
      description.value = '';
      file.value = null;
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Upload failed.', life: 3000 });
    } finally {
      uploading.value = false;
    }
  };
  </script>
  
  <style scoped>
  /* Tailwind handles most styles; add custom tweaks here if needed */
  </style>