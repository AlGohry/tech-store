import { defineStore } from 'pinia'
import { watch } from 'vue'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [], // Load from localStorage on initialization
  }),
  getters: {
    totalProductsQuantity: (state) => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalProductsPrice: (state) => state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    productSubtotals: (state) => state.cartItems.map(item => ({
      _id: item._id,
      subtotal: item.price * item.quantity,
    })),
  },
  actions: {
    addToCart(product) {
      const existingItem = this.cartItems.find(item => item._id === product._id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cartItems.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item._id !== productId)
    },
    clearCart() {
      this.cartItems = []
    },
    increaseQuantity(productId) {
      const item = this.cartItems.find(item => item._id === productId)
      if (item) item.quantity += 1
    },
    decreaseQuantity(productId) {
      const item = this.cartItems.find(item => item._id === productId)
      if (item && item.quantity > 1) item.quantity -= 1
    }
  }
})

