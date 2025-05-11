<template>
  <div class="p-6">
    <!-- Page Title -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
          <Icon icon="mdi:cart-outline" class="mr-3 text-primary text-4xl" />
          Shopping Cart
        </h1>
        <span v-if="cartStore.cartItems.length > 0"
          class="ml-4 bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
          {{ cartStore.totalProductsQuantity }} {{ cartStore.totalProductsQuantity > 1 ? 'items' : 'item' }}
        </span>
      </div>
    </div>
    <!-- Empty State -->
    <div v-if="cartItems.length === 0" class="text-center py-12">
      <Icon icon="mdi:cart-remove" class="mx-auto text-6xl text-gray-400 mb-4" />
      <h3 class="text-xl font-medium text-gray-600 mb-2">Your cart is empty</h3>
      <p class="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
      <router-link to="/" class="btn-primary px-6 py-3 inline-flex items-center">
        <Icon icon="mdi:store-outline" class="mr-2" />
        Continue Shopping
      </router-link>
    </div>

    <!-- Cart Content -->
    <div v-else class="flex flex-col lg:flex-row gap-8">
      <!-- Product List (New Style) -->
      <div class="lg:w-2/3 space-y-4">
        <div v-for="item in cartItems" :key="item.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Image -->
            <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded-md self-center">

            <!-- Details -->
            <div class="flex-grow">
              <div class="flex justify-between items-start">
                <h3 class="font-medium text-gray-800 dark:text-white">{{ item.name }}</h3>
                <button @click="removeItem(item._id)" class="text-gray-400 hover:text-red-500 transition-colors">
                  <Icon icon="mdi:close" />
                </button>
              </div>

              <!-- Price Row -->
              <div class="flex items-center justify-between mt-2">
                <span class="text-lg font-medium text-primary">SAR {{ item.price.toFixed(2) }}</span>
                <div class="flex items-center border border-gray-200 dark:border-gray-600 rounded-md">
                  <button @click="decreaseQuantity(item._id)"
                    class="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Icon icon="mdi:minus" />
                  </button>
                  <span class="px-3 py-1 text-gray-800 dark:text-white">{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item._id)"
                    class="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Icon icon="mdi:plus" />
                  </button>
                </div>
              </div>

              <!-- Subtotal -->
              <div class="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <span class="text-sm text-gray-500">Subtotal</span>
                <span class="font-medium">SAR {{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Product List (Old Style) -->
      <div class="lg:w-2/3 hidden">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <!-- Table Header -->
          <div
            class="hidden md:grid grid-cols-12 bg-gray-50 dark:bg-gray-700 p-4 text-sm font-medium text-gray-500 dark:text-gray-300">
            <div class="col-span-5">Product</div>
            <div class="col-span-2 text-center">Price</div>
            <div class="col-span-3 text-center">Quantity</div>
            <div class="col-span-2 text-right">Total</div>
          </div>

          <!-- Cart Items -->
          <div v-for="item in cartItems" :key="item.id" class="p-4 border-b border-gray-100 dark:border-gray-700">
            <div class="grid grid-cols-3 md:grid-cols-12 gap-4 items-center">
              <!-- Product Image & Name -->
              <div class="col-span-2 md:col-span-5 flex items-center">
                <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-md mr-4">
                <div>
                  <h3 class="font-medium text-gray-800 dark:text-white">{{ item.name }}</h3>
                  <button @click="removeItem(item._id)" class="text-red-500 text-sm mt-1 flex items-center">
                    <Icon icon="mdi:trash-can-outline" class="mr-1" />
                    Remove
                  </button>
                </div>
              </div>

              <!-- Price -->
              <div class="col-span-1 md:col-span-2 text-center text-gray-600 dark:text-gray-300">
                SAR {{ item.price.toFixed(2) }}
              </div>

              <!-- Quantity -->
              <div class="col-span-3 md:col-span-3 flex items-center justify-center">
                <div class="flex items-center border border-gray-200 dark:border-gray-600 rounded-md">
                  <button @click="decreaseQuantity(item._id)"
                    class="px-3 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Icon icon="mdi:minus" />
                  </button>
                  <span class="px-3 py-1 text-gray-800 dark:text-white">{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item._id)"
                    class="px-3 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Icon icon="mdi:plus" />
                  </button>
                </div>
              </div>

              <!-- Total -->
              <div class="col-span-1 md:col-span-2 text-right font-medium text-gray-800 dark:text-white">
                SAR {{ (item.price * item.quantity).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Continue Shopping -->
        <div class="mt-6">
          <router-link to="/" class="text-primary flex items-center">
            <Icon icon="mdi:arrow-left" class="mr-2" />
            Continue Shopping
          </router-link>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:w-1/3">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-4">
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center">
              <h3
                class="text-lg font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">
                Order Summary
              </h3>
            </div>
            <button @click="clearCart" class="flex items-center text-red-500 hover:text-red-600 transition-colors"
              v-if="cartItems.length > 0">
              <Icon icon="mdi:trash-can-outline" class="mr-1" />
              Clear Cart
            </button>
          </div>


          <div class="space-y-4 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Subtotal</span>
              <span class="font-medium">SAR {{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Shipping</span>
              <span class="font-medium">{{ shippingCost === 0 ? 'Free' : `SAR SAR {shippingCost.toFixed(2)}` }}</span>
            </div>
            <div v-if="discount > 0" class="flex justify-between text-green-600">
              <span>Discount</span>
              <span class="font-medium">-SAR {{ discount.toFixed(2) }}</span>
            </div>
          </div>

          <div
            class="flex justify-between text-lg font-bold text-gray-800 dark:text-white pt-4 border-t border-gray-100 dark:border-gray-700">
            <span>Total</span>
            <span>SAR {{ total.toFixed(2) }}</span>
          </div>

          <button @click="proceedToCheckout" class="btn-primary w-full mt-6 py-3 flex items-center justify-center">
            <Icon icon="mdi:lock-outline" class="mr-2" />
            Proceed to Checkout
          </button>

          <div class="mt-4 text-center text-sm text-gray-500">
            <p>or <router-link to="/" class="text-primary">continue shopping</router-link></p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useCartStore } from '@/store/cartStore'

const router = useRouter()

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.cartItems)

const shippingCost = ref(0)
const discount = ref(100.00)

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
)

const total = computed(() =>
  subtotal.value + shippingCost.value - discount.value
)

const increaseQuantity = (id) => {
  cartStore.increaseQuantity(id)
}

const decreaseQuantity = (id) => {
  cartStore.decreaseQuantity(id)
}

const removeItem = async (id) => {
  // Add fade-out animation
  const itemElement = document.getElementById(`item-${id}`)
  if (itemElement) {
    itemElement.classList.add('opacity-0', 'transition-opacity', 'duration-300')
    await new Promise(resolve => setTimeout(resolve, 300))
  }
  cartStore.removeFromCart(id)
}

const clearCart = () => {
  cartStore.clearCart()
}

const proceedToCheckout = () => {
  router.push('/checkout')
}
</script>

<style scoped>
/* Add any custom styles here */
</style>