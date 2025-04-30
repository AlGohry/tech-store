<template>
  <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md duration-300">
    <div class="relative">
      <img :src="product.image" :alt="product.name" class="w-full h-56 object-cover">
      <div class="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
        New
      </div>
    </div>

    <div class="p-5">
      <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{{ product.name }}</h3>
      <p class="text-gray-600 mb-4 line-clamp-3">{{ product.description }}</p>

      <div class="flex items-center justify-between mb-4">
        <span class="text-2xl font-bold text-gray-900">SAR {{ product.price }}</span>
        <div class="flex items-center text-yellow-400">
          <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="{ 'text-gray-300': i > 4 }" fill="currentColor"
            viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
            </path>
          </svg>
        </div>
      </div>

      <div class="flex space-x-2">
        <router-link :to="'/product/' + product._id"
          class="flex-1 btn-primary py-2 px-4 rounded-lg text-center font-medium transition-colors duration-300">
          View Details
        </router-link>

        <button @click="addToCart" class="btn-primary py-2 px-4 rounded-lg font-medium transition-colors duration-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/store/cartStore'
import { useToast } from 'vue-toastification'
import { defineProps } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const toast = useToast()

const addToCart = () => {
  cartStore.addToCart(props.product)
  logProductAddition(props.product, cartStore.totalProductsQuantity)
  showToast()
}
console.log(cartStore.productSubtotals) // Array of subtotals for each product
console.log(cartStore.totalProductsPrice) // Total price of all products

const logProductAddition = (product, totalProductsQuantity) => {
  console.log('🛒 Product added from card:', product)
  console.log('📦 Total quantity in cart:', totalProductsQuantity)
}

const showToast = () => {
  toast.success('Product added to cart', {
    timeout: 2000,
    position: 'top-right'
  })
}
</script>
