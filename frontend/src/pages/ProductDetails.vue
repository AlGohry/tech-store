<template>
  <div class="p-6">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-6">
      <router-link to="/" class="hover:underline">Home</router-link> /
      <router-link :to="`/${product.category}`" class="hover:underline">
        {{ product.category }}
      </router-link> /
      <span class="text-gray-800">{{ product.name }}</span>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Product Image Card -->
      <div class="bg-white rounded-lg shadow-md p-6">

        <!-- Product Images -->
        <div class="mb-4">
          <img :src="selectedImage" :alt="product.name" class="w-full h-96 object-contain rounded-lg">
        </div>
        <div class="flex space-x-2 overflow-x-auto">
          <img v-for="(img, index) in product.images" :key="index" :src="img" @click="selectedImage = img"
            :class="['w-16 h-16 object-cover rounded cursor-pointer border-2', selectedImage === img ? 'border-primary' : 'border-transparent']"
            :alt="`${product.name} thumbnail ${index}`">
        </div>
      </div>

      <!-- Product Info Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Product Name -->
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>

        <!-- Rating -->
        <div class="flex items-center mb-4">
          <div class="flex text-yellow-400 mr-2">
            <span v-for="star in 5" :key="star">
              <svg v-if="star <= Math.round(product.rating)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </span>
          </div>
          <span class="text-gray-600 text-sm">{{ product.rating }} ({{ product.reviewCount }} reviews)</span>
        </div>

        <!-- Price Section -->
        <div class="mb-6">
          <div class="flex items-center">
            <span class="text-3xl font-bold text-primary">SAR {{ discountedPrice }}</span>
            <span v-if="product.price > discountedPrice" class="ml-3 text-lg text-gray-500 line-through">SAR {{
              product.price }}</span>
            <span v-if="product.price > discountedPrice"
              class="ml-3 bg-secondary text-primary px-2 py-1 rounded text-sm font-bold">10% OFF</span>
          </div>
          <p class="text-gray-500 text-sm mt-1">Tax Included</p>
        </div>

        <!-- Product Meta -->
        <div class="mb-6 space-y-2">
          <p class="text-gray-700"><span class="font-semibold">Brand:</span> {{ product.brand }}</p>
          <p class="text-gray-700"><span class="font-semibold">Category:</span> {{ product.category }}</p>
          <p class="text-green-600 font-medium">In Stock: {{ product.stock }} units</p>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Description</h3>
          <p class="text-gray-700">{{ product.description }}</p>
        </div>

        <!-- Add to Cart -->
        <div class="border-t pt-6">
          <div class="flex items-center mb-4">
            <label class="mr-3 font-medium">Quantity:</label>
            <div class="flex items-center border rounded">
              <button @click="qty > 1 ? qty-- : null" class="px-3 py-1 text-lg focus:outline-none"
                :class="qty === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary'">-</button>
              <span class="px-4 py-1 border-x">{{ qty }}</span>
              <button @click="qty++" class="px-3 py-1 text-lg focus:outline-none text-primary">+</button>
            </div>
          </div>
          <button @click="addProductToCart"
            class="w-full bg-primary hover:bg-opacity-90 text-white py-3 px-4 rounded-lg font-bold transition duration-200">
            Add to Cart
          </button>
        </div>
      </div>

      <!-- Delivery Info Card -->
      <div class="bg-white rounded-lg shadow-md p-6 h-fit">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Delivery Information</h2>

        <div class="space-y-4">
          <div>
            <h3 class="font-semibold text-gray-800">Estimated Delivery Time:</h3>
            <p class="text-gray-600">2-4 business days</p>
          </div>

          <div class="flex space-x-4 pt-2">
            <button class="flex items-center text-gray-700 hover:text-primary transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
            <button class="flex items-center text-gray-700 hover:text-primary transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Favorite
            </button>
          </div>

          <div class="pt-4 border-t">
            <div class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h3 class="font-semibold text-gray-800">2-Year Warranty</h3>
                <p class="text-gray-600 text-sm">This product comes with a 24-month manufacturer warranty covering
                  defects.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="related in relatedProducts" :key="related.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
          <router-link :to="`/product/${related.id}`">
            <img :src="related.image" :alt="related.name" class="w-full h-48 object-contain p-4">
            <div class="p-4">
              <h3 class="font-semibold text-lg mb-1">{{ related.name }}</h3>
              <div class="flex items-center mb-2">
                <div class="flex text-yellow-400 mr-1">
                  <span v-for="star in 5" :key="star">
                    <svg v-if="star <= Math.round(related.rating)" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                      viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </span>
                </div>
                <span class="text-gray-600 text-xs">({{ related.reviewCount }})</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-bold text-primary">SAR {{ related.price }}</span>
                <span v-if="related.stock > 0" class="text-green-600 text-xs">In Stock</span>
                <span v-else class="text-red-600 text-xs">Out of Stock</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from '../plugins/axios'
import { useCartStore } from '../store/cartStore'

// Import product images
import product_1 from '@Images/phones/apple_iphone15_pro_max_3.jpg';
import product_2 from '@Images/phones/google_pixel_9_pro_5g.jpg';
import product_3 from '@Images/phones/oneplus_nord_ce4_lite_5g_2.jpg';
import product_4 from '@Images/phones/samsung_galaxy_s23_ultra_5g_2.jpg';

const product = ref({
  name: 'Sample Product',
  category: 'electronics',
  brand: 'Sample Brand',
  description: 'This is a detailed product description explaining all the features and benefits of this amazing product.',
  price: 99.99,
  rating: 4.5,
  reviewCount: 42,
  stock: 15,
  images: [product_1, product_2, product_3, product_4],
})

const relatedProducts = ref([
  {
    id: 1,
    name: 'Related Product 1',
    price: 79.99,
    rating: 4,
    reviewCount: 28,
    stock: 10,
    image: product_1
  },
  {
    id: 2,
    name: 'Related Product 2',
    price: 89.99,
    rating: 4.5,
    reviewCount: 35,
    stock: 5,
    image: product_2
  },
  {
    id: 3,
    name: 'Related Product 3',
    price: 109.99,
    rating: 5,
    reviewCount: 12,
    stock: 0,
    image: product_3
  },
  {
    id: 4,
    name: 'Related Product 4',
    price: 59.99,
    rating: 3.5,
    reviewCount: 18,
    stock: 20,
    image: product_4
  }
])

const selectedImage = ref(product.value.images?.[0] || '')
const qty = ref(1)

const route = useRoute()
const cartStore = useCartStore()

const discountedPrice = computed(() => {
  return (product.value.price * 0.9).toFixed(2)
  // return (product.value.price * 0.8).toFixed(2) // 20% Discount
})


const fetchProduct = async () => {
  try {
    const res = await axios.get(`/${route.params.id}`)
    product.value = res.data
    selectedImage.value = product.value.images?.[0] || product.value.image
  } catch (err) {
    console.error(err)
  }
}

const addProductToCart = () => {
  cartStore.addToCart({ ...product.value, qty: qty.value })
}

onMounted(() => {
  fetchProduct()
})
</script>

<style>
/* Custom styles if needed */
</style>