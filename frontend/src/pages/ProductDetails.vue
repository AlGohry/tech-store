<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-6">
      <router-link to="/" class="hover:underline">Home</router-link> /
      <router-link :to="`/${product.category}`" class="hover:underline">
        {{ product.category }}
      </router-link> /
      <span class="text-gray-800">{{ product.name }}</span>
    </nav>

    <!-- Product Display -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Image Gallery -->
      <div>
        <img :src="selectedImage" alt="Main Image" class="w-full h-[400px] object-contain rounded-xl mb-4 shadow-md" />
        <div class="flex gap-4">
          <img v-for="(img, index) in product.images || [product.image]" :key="index" :src="img"
            @click="selectedImage = img"
            :class="['w-20 h-20 object-contain border rounded cursor-pointer', img === selectedImage ? 'border-primary' : '']" />
        </div>
      </div>

      <!-- Product Info -->
      <div class="space-y-4">
        <h1 class="text-3xl font-bold text-gray-800">{{ product.name }}</h1>
        <p class="text-gray-600">{{ product.description }}</p>
        <p class="text-xl font-semibold text-primary">SAR {{ product.price }}</p>
        <p><strong>Brand:</strong> {{ product.brand }}</p>
        <p><strong>In Stock:</strong> {{ product.countInStock }}</p>

        <!-- Quantity Selector -->
        <div class="flex items-center gap-2">
          <button @click="qty--" :disabled="qty <= 1" class="px-3 py-1 bg-gray-200 rounded">-</button>
          <span>{{ qty }}</span>
          <button @click="qty++" :disabled="qty >= product.countInStock"
            class="px-3 py-1 bg-gray-200 rounded">+</button>
        </div>

        <!-- Add to Cart -->
        <button @click="addProductToCart" class="btn-primary px-5 py-2 rounded mt-4">Add to Cart</button>

        <!-- Highlights -->
        <ul class="mt-6 space-y-2 text-gray-700 list-disc list-inside">
          <li>Powerful Snapdragon 8 Gen processor</li>
          <li>High-resolution AMOLED display</li>
          <li>Long battery life with fast charging</li>
          <li>5G connectivity and Android 13</li>
        </ul>
      </div>
    </div>

    <!-- Related Products -->
    <div v-if="relatedProducts.length" class="mt-16">
      <h2 class="text-2xl font-bold mb-4">You may also like</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="item in relatedProducts" :key="item._id"
          class="border p-4 rounded-xl shadow hover:shadow-lg transition">
          <img :src="item.image" alt="" class="w-full h-40 object-cover rounded mb-3" />
          <h3 class="font-semibold text-lg line-clamp-1">{{ item.name }}</h3>
          <p class="text-sm text-gray-500 line-clamp-2">{{ item.description }}</p>
          <div class="flex justify-between items-center mt-3">
            <span class="text-primary font-bold">SAR {{ item.price }}</span>
            <router-link :to="`/product/${item._id}`" class="text-sm text-primary underline">View</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from '../plugins/axios'
import { useCartStore } from '../store/cartStore'

const product = ref({})
const relatedProducts = ref([])
const selectedImage = ref('')
const qty = ref(1)

const route = useRoute()
const cartStore = useCartStore()

const fetchProduct = async () => {
  try {
    const res = await axios.get(`/${route.params.id}`)
    product.value = res.data
    selectedImage.value = product.value.images?.[0] || product.value.image

    // Get related products by category
    const related = await axios.get(`/${product.category}`)
    relatedProducts.value = related.data.filter(p => p._id !== product.value._id)
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
