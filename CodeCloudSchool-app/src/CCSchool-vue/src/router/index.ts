import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('@/views/CoursesView.vue')
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
      path: '/history',
      name: 'history',
      component: () => import('@/views/HistoryView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/UserAccountView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue')
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/views/HelpView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/layout-sandbox',
      name: 'layout-sandbox',
      component: () => import('@/views/LayoutSandbox.vue')
    }
  ]
})

export default router
