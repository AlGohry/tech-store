// Import core dependencies
import { createApp } from 'vue'
import App from './App.vue'

// Import plugins and libraries
import router from './router'
import { createPinia } from 'pinia'
import axios from './plugins/axios' // Axios plugin
import Toast from 'vue-toastification' // Toast notifications
import 'vue-toastification/dist/index.css' // Toast CSS

// Import global styles
import '@styles/main.scss'

// Create the Vue app instance
const app = createApp(App)

// Configure global properties
app.config.globalProperties.$axios = axios

// Register plugins
app.use(createPinia()) // Pinia for state management
app.use(router) // Vue Router for routing
app.use(Toast) // Toast notifications

// Mount the app to the DOM
app.mount('#app')

