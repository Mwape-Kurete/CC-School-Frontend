<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

import { StudentService } from '@/api/student'
import { lecturerService } from '@/api/lecturer'
import type { Student } from '@/api/student'
import type { Lecturer } from '@/api/lecturer'

const students = ref<Student[]>([])
const lecturers = ref<Lecturer[]>([])
const loading = ref(true)

const fetchUsers = async () => {
  loading.value = true
  const studentRes = await StudentService.getAllStudents()
  if (typeof studentRes !== 'string') {
    students.value = studentRes
  }

  const lecturerRes = await lecturerService.getAllLecturers()
  if (typeof lecturerRes !== 'string') {
    lecturers.value = lecturerRes
  }

  loading.value = false
}



const approveStudent = async (studentNumber: string) => {
  console.log("Student to approve: ", studentNumber);
  const approved = "Approved";
  try {
    const response = await StudentService.updateStatus(studentNumber, { status: approved });
    
    if (typeof response === 'string' && response.includes('Student Status updated successfully')) {
      console.log('Student approved successfully');
      await fetchUsers(); // refresh the list to reflect changes
    } else {
      console.warn('Unexpected response:', response);
    }
  } catch (error) {
    console.error('Failed to approve student:', error);
  }
}


onMounted(fetchUsers)
</script>

<template>
  <div class="user-management p-4">
    <h1 class="text-2xl font-bold mb-4">User Management</h1>

    <TabView>
      <!-- Students Tab -->
      <TabPanel header="Students">
        <DataTable :value="students" :loading="loading" stripedRows responsiveLayout="scroll">
          <Column header="Name">
            <template #body="{ data }">
              {{ data.name }} {{ data.lastName }}
            </template>
          </Column>

          <Column field="email" header="Email" />
          <Column field="courseName" header="Course" />
          <Column field="isApproved" header="Status">
            <template #body="{ data }">
              <span :class="data.status === 'Approved' ? 'text-green-600' : 'text-red-600'">
                {{ data.status === 'Approved' ? 'Approved' : 'Pending' }}
              </span>
            </template>
          </Column>
          <Column header="Actions">
            <template #body="{ data }">
              <Button v-if="data.status !== 'Approved'" label="Approve" icon="pi pi-check" @click="approveStudent(data.studentNumber)" class="p-button-sm p-button-success" />
            </template>
          </Column>
        </DataTable>
      </TabPanel>

      <!-- Lecturers Tab -->
      <TabPanel header="Lecturers">
        <DataTable :value="lecturers" :loading="loading" stripedRows responsiveLayout="scroll">
          <Column header="Name">
            <template #body="{ data }">
              {{ data.name }} {{ data.lastName }}
            </template>
          </Column>
          <Column field="lecEmail" header="Email" />
        </DataTable>
      </TabPanel>
    </TabView>
  </div>
</template>
