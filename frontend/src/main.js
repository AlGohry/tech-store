import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from './plugins/axios' // Import axios from the plugins folder
import Toast from 'vue-toastification' // Import Toast for notifications
import 'vue-toastification/dist/index.css' // Import Toast CSS

createApp(App).mount('#app')  // Import the main App component

import '@styles/main.scss' // Import global styles

const app = createApp(App)  // Create the Vue app instance

// Set axios as a global property
app.config.globalProperties.$axios = axios

app.use(Toast); // Toast notifications
app.use(createPinia())  // Pinia for state management
app.use(router) // Vue Router for routing
app.mount('#app') // Mount the app to the DOM

