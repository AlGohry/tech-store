<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- NavBar component -->
    <NavBar />
    <!-- Banner Carousel -->
    <BannerCarousel />

    <div class="flex-grow container mx-auto px-4 py-8">
      <!-- Header with search/shopping cart -->
      <header class="flex flex-col md:flex-row justify-between items-center mb-12 hidden">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
          <span class="text-blue-600">Tech</span> Store
        </h1>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input type="text" placeholder="Search products..."
              class="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <button class="relative p-2 text-gray-700 hover:text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
              </path>
            </svg>
            <span
              class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>
        </div>
      </header>

      <div class="mb-10">
        <!-- Section Title -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              Smartphones
            </h2>
            <span class="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
              {{ products.length }} items
            </span>
          </div>

          <router-link to="/smartphones"
            class="flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors">
            View all
            <Icon icon="mdi:chevron-right" class="ml-1 text-lg" />
          </router-link>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard v-for="product in products" :key="product._id" :product="product"
            class="transition-all duration-300 hover:scale-105 hover:shadow-lg p-2" />
        </div>
      </div>

    </div>
    <!-- Footer component -->
    <Footer />
  </div>
</template>

<script>
import axios from '../plugins/axios'; // Import axios from the plugins folder
import ProductCard from '../components/ProductCard.vue'; // Corrected import path
import NavBar from '../components/NavBar.vue'; // Import NavBar component
import Footer from '../components/Footer.vue'; // Import Footer component
import BannerCarousel from '../components/BannerCarousel.vue' // Import BannerCarousel component

export default {
  components: {
    ProductCard,
    NavBar, // Register NavBar component
    Footer, // Register Footer component
    BannerCarousel // Register BannerCarousel component
  },
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('/')
        this.products = response.data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
  }
}
</script>

<style scoped>
/* يمكن إضافة بعض الأنماط الخاصة هنا */
</style>
