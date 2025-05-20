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
      meta: { layout: 'TwoCol', page: 'timetable' },
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('@/views/HistoryView.vue'),
      meta: { layout: 'TwoCol', page: 'history' },
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/UserAccountView.vue'),
      meta: { layout: 'TwoCol', page: 'account' },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: { layout: 'TwoCol', page: 'settings' },
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/views/HelpView.vue'),
      meta: { layout: 'TwoCol', page: 'help' },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: { layout: 'LoginReg', page: 'login' },
    },
    {
      path: '/lecturer-dash',
      name: 'lecturer-dash',
      component: () => import('@/views/LectureDashboardView.vue'),
      meta: { layout: 'TwoCol', page: 'lecturer-dashboard' },
    },
    {
      path: '/layout-sandbox',
      name: 'layout-sandbox',
      component: () => import('@/views/LayoutSandbox.vue'),
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: () => import('@/views/Sandbox.vue'),
    },
  ],
})

export default router
