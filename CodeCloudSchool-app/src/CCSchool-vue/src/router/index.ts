import { createRouter, createWebHistory } from 'vue-router'

// Add type declarations for route meta fields
declare module 'vue-router' {
  interface RouteMeta {
    public?: boolean
    allowedRoles?: ('student' | 'lecturer' | 'admin')[]
    layout?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { allowedRoles: ['student'] }
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('@/views/CoursesView.vue'),
      meta: { allowedRoles: ['student', 'lecturer'] }
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
      component: () => import('@/views/GroupsView.vue')
    },
    {
      path: '/timetable',
      name: 'timetable',
      component: () => import('@/views/TimetableView.vue')
    },

    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/UserAccountView.vue'),
      meta: { allowedRoles: ['student', 'lecturer', 'admin'] }
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
      meta: { 
        layout: 'LoginReg', 
        public: true 
      }
    },

    {
      path: '/lecturer-dash', 
      name: 'lecturer-dashboard',
      component: () => import('@/views/LectureDashboardView.vue'),
      meta: { 
        layout: 'ThreeCol',
        allowedRoles: ['lecturer'] 
      }
    },

        {
      path: '/lecturer/grading',
      name: 'lecturer-grading',
      component: () => import('@/views/lecturer/GradingView.vue'),
      meta: { allowedRoles: ['lecturer'] }
    },

    // ========================
    // Admin Routes
    // ========================
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: () => import('@/views/admin/AdminDashboard.vue'),
      meta: { 
        layout: 'TwoCol',
        allowedRoles: ['admin'] }
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('@/views/admin/UserManagement.vue'),
      meta: { allowedRoles: ['admin'] }
    },
    {
      path: '/admin/settings',
      name: 'admin-settings',
      component: () => import('@/views/admin/SystemSettings.vue'),
      meta: { allowedRoles: ['admin'] }
    },

    {
      path: '/layout-sandbox',
      name: 'layout-sandbox',
      component: () => import('@/views/LayoutSandbox.vue')
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: () => import('@/views/Sandbox.vue'),
      meta: { public: true }
    }
  ]
})


export default router