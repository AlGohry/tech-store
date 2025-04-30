<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-10">

          <router-link to="/" class="flex items-center">
            <h1 class="text-3xl md:text-4xl font-bold  mb-4 md:mb-0">
              <span class="text-primary">Tech</span> Store
            </h1>
          </router-link>

          <!-- Main Categories Menu -->
          <div class="hidden md:flex items-center space-x-6">
            <router-link to="/smartphones"
              class="nav-link flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <Icon icon="mdi:cellphone" class="text-xl" />
              <span>Smartphones</span>
            </router-link>

            <router-link to="/digital-stores"
              class="nav-link flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <Icon icon="mdi:storefront-outline" class="text-xl" />
              <span>Digital Stores</span>
            </router-link>

            <router-link to="/gaming-platforms"
              class="nav-link flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <Icon icon="mdi:gamepad-variant-outline" class="text-xl" />
              <span>Gaming Platforms</span>
            </router-link>

            <router-link to="/shopping-cards"
              class="nav-link flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <Icon icon="mdi:credit-card-outline" class="text-xl" />
              <span>Shopping Cards</span>
            </router-link>

            <router-link to="/subscriptions"
              class="nav-link flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <Icon icon="mdi:calendar-sync-outline" class="text-xl" />
              <span>Subscriptions</span>
            </router-link>

            <router-link to="/restaurants"
              class="nav-link flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <Icon icon="mdi:silverware-fork-knife" class="text-xl" />
              <span>Restaurants</span>
            </router-link>
          </div>
        </div>

        <!-- Right Side Icons -->
        <div class="flex items-center space-x-2">
          <!-- Search Icon -->
          <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>

          <!-- Language Selector -->
          <div class="relative group">
            <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Icon icon="mdi:translate" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div
              class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <button
                class="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <span class="text-sm">Arabic</span>
              </button>
              <button
                class="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <span class="text-sm">English</span>
              </button>
            </div>
          </div>

          <!-- Theme Toggle -->
          <button @click="toggleTheme" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Icon v-if="darkMode" icon="mdi:weather-sunny" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <Icon v-else icon="mdi:weather-night" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <!-- Shopping Cart -->
          <div class="relative">
            <router-link to="/cart" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              @click.stop="toggleCart">
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
              </svg>
              <span v-if="cartStore.cartItems.length > 0"
                class="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {{ cartStore.totalProductsQuantity }}
              </span>
            </router-link>

            <CartDropdown v-if="showCart" @close="toggleCart" />
          </div>

          <!-- Auth Section -->
          <router-link v-if="!isAuthenticated" to="/login" class="btn-primary px-4 py-2 text-sm">
            Login / Register
          </router-link>

          <div v-else class="relative group">
            <button class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center text-black font-medium">
                AH
              </div>
            </button>
            <div
              class="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <router-link to="/profile"
                class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Icon icon="mdi:account-circle-outline" class="text-xl text-gray-600 dark:text-gray-300" />
                <span class="ml-2">Profile</span>
              </router-link>
              <router-link to="/orders"
                class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Icon icon="mdi:shopping-outline" class="text-xl text-gray-600 dark:text-gray-300" />
                <span class="ml-2">My Orders</span>
              </router-link>
              <button @click="logout"
                class="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Icon icon="mdi:logout" class="text-xl text-gray-600 dark:text-gray-300" />
                <span class="ml-2">Logout</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/store/cartStore'
import { Icon } from '@iconify/vue';
const showCart = ref(false)
const isAuthenticated = ref(true) // مؤقتًا
const userName = ref('Ahmed') // مؤقتًا
const userAvatar = ref('https://i.pravatar.cc/150?u=ahmed') // صورة افتراضية
const cartStore = useCartStore()

function toggleCart() {
  showCart.value = !showCart.value
}

function logout() {
  console.log('Logging out...')
}
</script>
