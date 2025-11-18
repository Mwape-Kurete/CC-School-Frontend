<template>
  <div class="lecturer-courses">
    <!-- Header -->
    <div class="Course-header">
      <div class="header-content">
        <h1 class="title">My Courses</h1>
        <div class="controls-container">
          <div class="icon-buttons"></div>
        </div>
      </div>
      <div class="divider"></div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">Loading courses...</div>

    <!-- Error State -->
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- Course List -->
    <div v-else class="course-list">
      <div v-if="courses.length === 0" class="no-courses">No courses found.</div>
      <div v-else v-for="course in courses" :key="course.id" class="course-card">
        <RouterLink :to="`/lecturer-course-details/${course.id}`">
          <div class="course-card-content">
            <h3>{{ course.courseName }}</h3>
            <p>{{ course.courseCode }}</p>
            <div class="course-meta">
              <span>{{ course.studentCount }} students</span>
              <span>{{ course.moduleCount }} modules</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { LecturerCourseService } from '@/api/courses'
import { lecturerService } from '@/api/lecturer'
import { generateCourseSummary } from '@/utils/courseUtils'

// Reactive data
const courses = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Get lecturer ID from localStorage
const getLecturerId = (): number => {
  const storedLectId = localStorage.getItem('lecturerId')
  return storedLectId && !isNaN(Number(storedLectId)) ? parseInt(storedLectId, 10) : 2
}

// Fetch lecturer user ID
const fetchLecturerUserID = async (lecturerId: number): Promise<boolean> => {
  try {
    console.log('Fetching lecturer details for ID:', lecturerId)

    const result = await lecturerService.getLecturerByID(lecturerId)

    // Check if result is an error string or Lecturer object
    if (typeof result === 'string') {
      console.error('Error fetching lecturer details:', result)
      error.value = `Failed to fetch lecturer: ${result}`
      return false
    }

    // Success case - result is a Lecturer object
    console.log('Lecturer details fetched:', result)

    // Store the IDs
    localStorage.setItem('lecturerId', result.lecturerId.toString())
    if (result.userId) {
      localStorage.setItem('userId', result.userId.toString())
    }

    console.log('Lecturer IDs stored:', {
      lecturerId: result.lecturerId,
      userId: result.userId,
    })

    return true
  } catch (err) {
    console.error('Exception in fetchLecturerUserID:', err)
    error.value = 'Failed to fetch lecturer details'
    return false
  }
}

// Fetch courses
const fetchCourses = async (lecturerId: number): Promise<boolean> => {
  try {
    console.log('Fetching courses for lecturer:', lecturerId)

    const result = await LecturerCourseService.getLecturerCourses(lecturerId.toString())

    if (!result.success || !result.courses?.length) {
      console.error('Error fetching courses:', result.error)
      error.value = result.error || 'Failed to fetch courses'
      return false
    }

    // Transform courses
    courses.value = result.courses.map(generateCourseSummary)

    // Store first course info
    const firstCourse = result.courses[0]
    localStorage.setItem('courseId', firstCourse.id.toString())

    if (firstCourse.courseName) {
      localStorage.setItem('courseName', firstCourse.courseName)
    }

    if (firstCourse.courseCode) {
      localStorage.setItem('courseCode', firstCourse.courseCode.toString())
    }

    console.log('Courses fetched successfully:', courses.value)
    return true
  } catch (err) {
    console.error('Exception in fetchCourses:', err)
    error.value = 'Failed to load courses'
    return false
  }
}

// Main initialization
onMounted(async () => {
  try {
    const lecturerId = getLecturerId()
    console.log('Initializing with lecturerId:', lecturerId)

    // First fetch lecturer details to ensure we have the latest data
    const lecturerSuccess = await fetchLecturerUserID(lecturerId)

    if (!lecturerSuccess) {
      loading.value = false
      return
    }

    // Then fetch courses
    const coursesSuccess = await fetchCourses(lecturerId)

    if (!coursesSuccess) {
      loading.value = false
      return
    }
  } catch (err) {
    console.error('Failed loading dashboard:', err)
    error.value = 'Failed to load dashboard'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.lecturer-courses {
  padding: 1rem 2rem;
}

.loading,
.error,
.no-courses {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #d32f2f;
}

.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.course-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.course-card:hover {
  transform: translateY(-4px);
}

.course-card-content {
  padding: 1.5rem;
}

.course-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.course-card p {
  color: #666;
  margin-bottom: 1rem;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.9rem;
}
</style>
