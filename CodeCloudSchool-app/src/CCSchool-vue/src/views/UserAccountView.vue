<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DiceBearAvatar from '@/components/AvatarComp.vue'
import { StudentService } from '@/api/student'

const userRole = ref(localStorage.getItem('userRole') || 'guest')
const userId = ref<string | null>(null)
if (userRole.value === 'Student') {
  userId.value = localStorage.getItem('studentNumber')
}

const userName = ref('Guest')
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  if (userRole.value === 'Student' && userId.value) {
    
    loading.value = true
    try {
      const result = await StudentService.getStudentByStudentNumber(userId.value)
      if (typeof result === 'string') {
        // error returned as string message
        error.value = result
        userName.value = 'Unknown Student'
      } else {
        // We got user data, use the `name` field from API response
        userName.value = result.name || 'No Name'
      }
    } catch (e) {
      error.value = 'Failed to fetch student data.'
      userName.value = 'Unknown Student'
    } finally {
      loading.value = false
    }
  } else {
    loading.value = false
  }
})
</script>

<template>
  <div class="useracc-view">
    <h1 class="text-3xl font-bold mb-4">This is the user account</h1>

    <div v-if="loading" class="text-gray-500">Loading user info...</div>
    <div v-else>
      <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

      <div class="flex items-center space-x-4">
        <DiceBearAvatar :name="userName" />
        <div>
          <p class="text-lg font-medium">{{ userName }}</p>
          <!-- Add more user info here -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.useracc-view {
  padding: 2rem;
}
</style>
