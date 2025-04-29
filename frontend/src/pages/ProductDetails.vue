<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- NavBar component -->
    <NavBar />

    <div class="flex-grow container mx-auto px-4 py-12">
      <div v-if="product" class="max-w-6xl mx-auto">
        <!-- Breadcrumb -->
        <nav class="flex mb-8" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <router-link to="/"
                class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z">
                  </path>
                </svg>
                Home
              </router-link>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">{{ product.name }}</span>
              </div>
            </li>
          </ol>
        </nav>

        <!-- Product content -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="md:flex">
            <div class="md:w-1/2 p-6">
              <img :src="product.image" :alt="product.name" class="w-full h-auto max-h-96 object-contain rounded-lg">
              <div class="flex mt-4 space-x-2">
                <button v-for="(img, index) in [product.image, product.image, product.image]" :key="index"
                  class="w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                  <img :src="img" class="w-full h-full object-cover">
                </button>
              </div>
            </div>

            <div class="md:w-1/2 p-6">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>

              <div class="flex items-center mb-4">
                <div class="flex items-center text-yellow-400 mr-2">
                  <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="{ 'text-gray-300': i > 4 }" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                </div>
                <span class="text-gray-600 text-sm">(24 reviews)</span>
              </div>

              <span class="text-3xl font-bold text-gray-900 block mb-6">SAR {{ product.price }}</span>

              <p class="text-gray-700 mb-6">{{ product.description }}</p>

              <div class="mb-6">
                <h3 class="text-sm font-medium text-gray-900">Highlights</h3>
                <ul class="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Latest generation technology</li>
                  <li>Energy efficient design</li>
                  <li>2-year manufacturer warranty</li>
                  <li>Free shipping on all orders</li>
                </ul>
              </div>

              <div class="flex items-center space-x-4">
                <div class="flex items-center border border-gray-300 rounded-lg">
                  <button class="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                  <span class="px-3 py-1">1</span>
                  <button class="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                </div>
                <button @click="addProductToCart"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer component -->
    <Footer />
  </div>
</template>

<script>
import axios from '../plugins/axios'; // Import axios from the plugins folder
import NavBar from '@components/NavBar.vue'; // Import NavBar component
import Footer from '@components/Footer.vue'; // Import Footer component
import { useCartStore } from '../store/cartStore'; // Import cartStore

export default {
  components: {
    NavBar, // Register NavBar component
    Footer // Register Footer component
  },
  data() {
    return {
      product: null
    }
  },
  mounted() {
    this.fetchProduct()
  },
  methods: {
    async fetchProduct() {
      const productId = this.$route.params.id
      try {
        const response = await axios.get(`/${productId}`)
        this.product = response.data
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    },
    addProductToCart() {
      const cartStore = useCartStore()
      cartStore.addToCart(this.product)
      // console.log('🛒 Products in cart:', cartStore.cartItems)
    }
  }

}
</script>

<style scoped>
/* يمكن إضافة بعض الأنماط الخاصة هنا */
</style>
