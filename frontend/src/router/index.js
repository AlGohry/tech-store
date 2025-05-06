import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

import Home from '../pages/Home.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import Cart from '../pages/Cart.vue'
import Smartphones from '../pages/Smartphones.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'product/:id',
        name: 'ProductDetails',
        component: ProductDetails
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart
      },
      {
        path: 'smartphones',
        name: 'Smartphones',
        component: Smartphones
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
