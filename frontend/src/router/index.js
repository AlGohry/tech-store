import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import Cart from '../pages/Cart.vue'
import Smartphones from '../pages/Smartphones.vue' // Import Smartphones page

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
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/smartphones', // New route for Smartphones
    name: 'Smartphones',
    component: Smartphones
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

