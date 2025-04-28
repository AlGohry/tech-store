import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from './plugins/axios' // Import axios from the plugins folder

createApp(App).mount('#app')  // Import the main App component

import './assets/main.scss' // Import global styles

const app = createApp(App)  // Create the Vue app instance

// Set axios as a global property
app.config.globalProperties.$axios = axios


app.use(createPinia())  // Pinia for state management
app.use(router) // Vue Router for routing
app.mount('#app') // Mount the app to the DOM

