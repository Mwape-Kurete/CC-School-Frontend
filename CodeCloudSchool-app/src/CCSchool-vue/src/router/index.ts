import { createRouter, createWebHistory } from 'vue-router'
import LayoutSandbox from '@/views/LayoutSandbox.vue'
import Sandbox from '@/views/Sandbox.vue'


const routes = [
  { path: '/', name: 'LayoutSandbox', component: LayoutSandbox },
  { path: '/sandbox', name: 'Sandbox', component: Sandbox },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
