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
      path: '/history',
      name: 'history',
      component: () => import('@/views/HistoryView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'history'
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
      path: '/lecturer-dash',
      name: 'lecturer-dash',
      component: () => import('@/views/LectureDashboardView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'lecturer-dashboard'
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
        page: 'student-assignment'
      },
    }
  ]
})

export default router
