import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    totalQuantity(state) {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0)
    },
    totalItems: (state) => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
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
    }
  }
})
