import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ProductDetails from '../pages/ProductDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
