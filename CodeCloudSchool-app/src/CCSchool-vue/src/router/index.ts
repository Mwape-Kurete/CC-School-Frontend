import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'dashboard',
      },
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('@/views/CoursesView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'course',
      },
    },
    {
      path: '/modules',
      name: 'modules',
      component: () => import('@/views/ModulesView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'modules',
      },
    },
    // Nested course routes
    {
  path: '/courses/:courseId',
  component: () => import('@/layouts/CourseLayout.vue'),
  children: [
    {
      path: '',
      redirect: { name: 'stu-course-layout' }
    },
    {
      path: 'home',
      name: 'CourseHome',
      component: () => import('@/views/courses/CourseHome.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'stu-course-home'
      }
    },
    {
      path: 'announcements',
      name: 'CourseAnnouncements',
      component: () => import('@/views/courses/CourseAnnouncements.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'stu-course-announcements'
      }
    },
    {
      path: 'modules',
      name: 'CourseModules',
      component: () => import('@/views/courses/CourseModules.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'stu-course-modules'
      }
    },
    {
      path: 'assignments',
      name: 'CourseAssignments',
      component: () => import('@/views/courses/CourseAssignments.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'stu-course-assignments'
      }
    },
    {
      path: 'grades',
      name: 'CourseGrades',
      component: () => import('@/views/courses/CourseGrades.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'stu-course-grades'
      }
    }
  ]
},
    {
      path: '/groups',
      name: 'groups',
      component: () => import('@/views/GroupsView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'groups',
      },
    },
    {
      path: '/timetable',
      name: 'timetable',
      component: () => import('@/views/TimetableView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'timetable'
      },
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/UserAccountView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'account'
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'settings'
      },
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/views/HelpView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'help'
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        layout: 'LoginReg',
        page: 'login'
      },
    },
    {
      path: '/layout-sandbox',
      name: 'layout-sandbox',
      component: () => import('@/views/LayoutSandbox.vue'),
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: () => import('@/views/Sandbox.vue')
    },
    {
      path: '/studentassignmentdetails',
      name: 'studentassignmentdetails',
      component: () => import('@/views/StudentAssignmentDetails.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'student-assignment'
      },
    },
    {
      path: '/studentModuleDetails',
      name: 'studentModuleDetails',
      component: () => import('@/views/StudentModuleDetails.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'student-module-details'
      },
    },
    {
      path: '/studentannouncementdetails',
      name: 'studentannouncementdetails',
      component: () => import('@/views/StudentAnnouncementDetails.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'student-announcement-details'
      },
    },
    //lecturer pages

    {
      path: '/lecturer-dash',
      name: 'lecturer-dash',
      component: () => import('@/views/LectureDashboardView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'lecturer-dashboard'
      },
    },
    {
      path: '/lecturer-courses',
      name: 'lecturer-courses',
      component: () => import('@/views/LecturerCourses.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'lecturer-courses'
      },
    },
    {
      path: '/lecturer-course-details',
      name: 'lecturer-course-details',
      component: () => import('@/views/LecturerCourseDetails.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'lecturer-course-details'
      },
    },

    {
      path: '/LecturerAnnounce',
      name: 'Announcements',
      component: () => import('@/views/Lecturer-AnnouncementsView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'Announcements'
      },
    },

     {
      path: '/LecturerAssign',
      name: 'Assignments',
      component: () => import('@/views/Lecturer-AssignmentsView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'Assignments'
      },
    },
    {
      path: '/lecturer-modules',
      name: 'lecturer-modules',
      component: () => import('@/views/LecturerModules.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'lecturer-modules'
      },
    },
    {
      path: '/lecturer-create-modules',
      name: 'lecturer-create-modules',
      component: () => import('@/views/LecturerCreateModule.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'lecturer-create-modules'
      },
    },
    
  ]
})

export default router
