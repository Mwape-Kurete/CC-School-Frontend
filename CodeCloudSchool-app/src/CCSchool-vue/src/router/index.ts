import { createRouter, createWebHistory  } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { layout: 'TwoCol' }
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('@/views/CoursesView.vue'),
      meta: { layout: 'TwoCol' }
    },
    // Nested course routes
    {
      path: '/courses/:courseId',
      component: () => import('@/layouts/CourseLayout.vue'),
      children: [
        {
          path: '',
          redirect: { name: 'CourseHome' }
        },
        {
          path: 'home',
          name: 'CourseHome',
          component: () => import('@/views/courses/CourseHome.vue')
        },
        {
          path: 'announcements',
          name: 'CourseAnnouncements',
          component: () => import('@/views/courses/CourseAnnouncements.vue')
        },
        {
          path: 'modules',
          name: 'CourseModules',
          component: () => import('@/views/courses/CourseModules.vue')
        },
        {
          path: 'assignments',
          name: 'CourseAssignments',
          component: () => import('@/views/courses/CourseAssignments.vue')
        },
        {
          path: 'grades',
          name: 'CourseGrades',
          component: () => import('@/views/courses/CourseGrades.vue')
        }
      ]
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('@/views/GroupsView.vue'),
      meta: { layout: 'TwoCol' }
    },
    {
      path: '/timetable',
      name: 'timetable',
      component: () => import('@/views/TimetableView.vue'),
      meta: { layout: 'TwoCol' }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/UserAccountView.vue'),
      meta: { layout: 'TwoCol' }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: { layout: 'TwoCol' }
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: { layout: 'LoginReg' }
    },
    {
      path: '/lecturer-dash',
      name: 'lecturer-dash',
      component: () => import('@/views/LectureDashboardView.vue'),
      meta: { layout: 'ThreeCol' }
    },
    {
      path: '/layout-sandbox',
      name: 'layout-sandbox',
      component: () => import('@/views/LayoutSandbox.vue')
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: () => import('@/views/Sandbox.vue')
    },
    {
      path: '/studentassignment',
      name: 'studentassignment',
      component: () => import('@/views/StudentAssignment.vue'),
      meta: { layout: 'TwoCol' }
    },
    {
      path: '/studentassignmentdetails',
      name: 'studentassignmentdetails',
      component: () => import('@/views/StudentAssignmentDetails.vue'),
      meta: { layout: 'TwoCol' }
    },
    {
      path: '/studentModule',
      name: 'studentModule',
      component: () => import('@/views/StudentModule.vue'),
      meta: { layout: 'TwoCol' }
    },
    {
      path: '/studentModuleDetails',
      name: 'studentModuleDetails',
      component: () => import('@/views/StudentModuleDetails.vue'),
      meta: { layout: 'TwoCol' }
    },
    {
      path: '/studentannouncement',
      name: 'studentannouncement',
      component: () => import('@/views/StudentAnnouncement.vue'),
      meta: { layout: 'TwoCol' }
    },
    {
      path: '/studentannouncementdetails',
      name: 'studentannouncementdetails',
      component: () => import('@/views/StudentAnnouncementDetails.vue'),
      meta: { layout: 'TwoCol' }
    }
  ]
})

export default router
