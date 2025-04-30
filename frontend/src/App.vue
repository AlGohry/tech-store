<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useCartStore } from '@/store/cartStore'

const cartStore = useCartStore()

watch(
  () => cartStore.cartItems,
  (newCart) => {
    localStorage.setItem('cartItems', JSON.stringify(newCart))
  },
  { deep: true }
)

</script>

<style>
/* Add any global styles here */
</style>
