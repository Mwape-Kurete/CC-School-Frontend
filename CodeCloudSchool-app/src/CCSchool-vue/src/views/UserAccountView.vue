<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DiceBearAvatar from '@/components/AvatarComp.vue'
import { StudentService } from '@/api/student'
import { StudentMajorServices } from '@/api/majors'
import { StudentCourseService } from '@/api/courses'
import Cbutton from '@/components/ui/CButton.vue'

const userRole = ref(localStorage.getItem('userRole') || 'guest')
const userId = ref<string | null>(null)
if (userRole.value === 'Student') {
  userId.value = localStorage.getItem('studentNumber')
}

const studentUserId = ref<number | null>(null)

const userName = ref('Guest');
const loading = ref(true);
const error = ref<string | null>(null);

import type { Course } from '@/api/courses'

// fields to display user info
// year level, enrolled courses, majors, phone number, email, status
const userInfo = ref({

  yearLevel: '',
  phoneNumber: '',
  email: '',
  status: ''
});

const studentMajors = ref<string[]>([]);
const courses = ref<Course[]>([]);

onMounted(async () => {
  await fetchUserDetails();
  await fetchMajors();
  await fetchCourses();
})

// functions 
const fetchMajors = async () => {
  if (userRole.value === 'Student' && studentUserId.value) {
    try {

      const result = await StudentMajorServices.fetchStudentMajors(studentUserId.value);
      if (Array.isArray(result)) {
        studentMajors.value = result.map((major: any) => major.majorName || String(major));
      } else {
        console.error('Failed to fetch majors:', result);
      }
    } catch (e) {
      console.error('Error fetching majors:', e);
    }
  }

}


const fetchUserDetails = async () => {
  if (userRole.value === 'Student' && userId.value) {

    loading.value = true
    try {
      const result = await StudentService.getStudentByStudentNumber(userId.value)
      if (typeof result === 'string') {
        // error returned as string message
        error.value = result
        userName.value = 'Unknown Student'

      } else {

        console.log('Student data fetched:', result)

        userName.value = result.name + " " + result.lastName || 'No Name'
        studentUserId.value = result.userId;
        userInfo.value = {
          yearLevel: result.yearLevel || 'N/A',
          phoneNumber: result.phoneNumber || 'N/A',
          email: result.email || 'N/A',
          status: result.status || 'Active'
        }
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
}

const fetchCourses = async () => {
  try {
    if (userRole.value === 'Student' && userId.value) {
      // Get the student number from Local Storage
      const studentNumber = localStorage.getItem('studentNumber');
      // If the student number exists, fetch the courses
      if (typeof studentNumber === 'string') {

        const response = await StudentCourseService.getStudentCourses(studentNumber);
        // check if the response is an error message
        if (typeof response === 'string') {
          error.value = response;
        } else {
          console.log('Courses fetched successfully:', response);
          courses.value = response.map((course) => ({
            id: course.id,
            name: course.courseName,
            courseName: course.courseName,
            courseCode: course.courseCode,
            courseDescription: course.courseDescription
          }));

        }
      } else {
        error.value = 'Student number not found.';
      }
    }
  } catch (err) {
    error.value = 'Failed to load courses.';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

const updateStatus = async () => {
  const newStatus = prompt("Enter new status (e.g., Active, Inactive):");
  if (!newStatus || !userId.value) return;

  try {
    const response = await StudentService.updateStatus(userId.value, { status: newStatus });
    alert(response || "Status updated.");
  } catch (err) {
    console.error("Error updating status", err);
    alert("Failed to update status.");
  }
};

const reEnroll = async () => {
  const newYear = prompt("Enter new year level:");
  if (!newYear || !userId.value) return;

  try {
    const response = await StudentService.reEnroll(userId.value, { yearLevel: newYear });
    alert(response || "Year level updated.");
  } catch (err) {
    console.error("Error re-enrolling student", err);
    alert("Failed to re-enroll.");
  }
};

const changePassword = async () => {
  const oldPassword = prompt("Enter old password:");
  const newPassword = prompt("Enter new password:");
  if (!oldPassword || !newPassword || !userId.value) return;

  try {
    const response = await StudentService.updatePassword(userId.value, {
      oldPassword,
      newPassword,
    });
    alert(response || "Password updated.");
  } catch (err) {
    console.error("Error updating password", err);
    alert("Failed to update password.");
  }
};


</script>

<template>
  <div class="useracc-view">

    <div v-if="loading" class="text-gray-500">Loading user info...</div>
    <div v-else>
      <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

      <div class="profile-con flex  space-x-4">
        <DiceBearAvatar class="pfp" :name="userName" />
        <div>
          <p class="username text-lg font-medium">{{ userName }}</p>
          <div class="user-info-container">
            <h6 v-if="userRole === 'Student'" class="text-sm text-gray-600">Enrolled Year: {{ userInfo.yearLevel }}</h6>
            <h6 v-if="userRole === 'Student'" class="text-sm text-gray-600">Email Address: {{ userInfo.email }}</h6>
            <h6 v-if="userRole === 'Student'" class="text-sm text-gray-600">Student Status: {{ userInfo.status }}</h6>
          </div>

          <div class="actions mt-4 space-y-2">
            <Cbutton size="md" type="secondary" @click="updateStatus" class="action-button">Update Status</Cbutton>
            <Cbutton size="md" type="secondary" @click="reEnroll" class="action-button">Re-Enroll (Year Level)</Cbutton>
            <Cbutton size="md" type="secondary" @click="changePassword" class="action-button">Update Password</Cbutton>
          </div>


        </div>
      </div>
      <div class="majors-course-con mt-4">
        <div class="majors">
          <h3>Majors</h3>
          <div v-if="studentMajors.length" class="majors-grid mt-2">
            <div v-for="(major, index) in studentMajors" :key="index" class="major-card">
              <h4 class="font-semibold text-lg">{{ major }}</h4>
            </div>
          </div>
          <div v-else class="text-gray-500 mt-2">
            No majors enrolled.
          </div>

        </div>
        <div class="courses mt-4">
          <h3>Enrolled Courses</h3>
          <div v-if="courses.length" class="courses-grid mt-2">
            <div v-for="(course, index) in courses" :key="index" class="course-card">
              <h4 class="font-semibold text-lg">{{ course.courseName }}</h4>
              <p class="text-sm text-gray-600">Code: {{ course.courseCode }}</p>
              <!-- <p class="text-sm text-gray-600">{{ getParsedDescription(course).courseAbout }}</p> -->
            </div>
          </div>
          <div v-else class="text-gray-500 mt-2">
            No courses enrolled.
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-con,
.user-info-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
}



.username {
  width: 100%;
  text-align: center;
  font-family: 'QuickSand', sans-serif;
  font-size: 48px !important;
  font-weight: 800;
  color: #333;
}

.pfp {
  width: 150px;
  height: 150px;
  border: none;
}

.useracc-view {
  padding: 2rem;
}


.majors-grid,
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 49%));
  gap: 2%;
}

.major-card,
.course-card {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.major-card:hover,
.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}
</style>
