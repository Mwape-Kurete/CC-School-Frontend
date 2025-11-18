import '@/assets/tailwind.css'
import './assets/main.css'
import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'

// Use available themes:
import 'primevue/resources/themes/lara-light-blue/theme.css' // Available theme
import 'primevue/resources/primevue.min.css' // core css
import 'primeicons/primeicons.css' // icons
import 'primeflex/primeflex.css' // primeflex (optional)

import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.component('Toast', Toast)
app.mount('#app')