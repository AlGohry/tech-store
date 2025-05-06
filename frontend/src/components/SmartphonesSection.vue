<template>
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
      <div v-for="product in products" :key="product._id" 
           class="border  rounded-xl overflow-hidden shadow-sm duration-300 transition-all duration-300 hover:scale-105 hover:shadow-lg p-2">
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

            <button @click="addToCart(product)" class="btn-primary py-2 px-4 rounded-lg font-medium transition-colors duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../plugins/axios'; 
import { useCartStore } from '@/store/cartStore';
import { useToast } from 'vue-toastification';
import { Icon } from '@iconify/vue';

const products = ref([]);
const cartStore = useCartStore();
const toast = useToast();

const fetchProducts = async () => {
  try {
    const response = await axios.get('/');
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const addToCart = (product) => {
  cartStore.addToCart(product);
  logProductAddition(product, cartStore.totalProductsQuantity);
  showToast();
};

const logProductAddition = (product, totalProductsQuantity) => {
  console.log('🛒 Product added from card:', product);
  console.log('📦 Total quantity in cart:', totalProductsQuantity);
};

const showToast = () => {
  toast.success('Product added to cart', {
    timeout: 2000,
    position: 'top-right'
  });
};

onMounted(() => {
  fetchProducts();
});
</script>