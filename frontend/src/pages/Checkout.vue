<template>
  <div class="p-6">
    <!-- Page Title -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
          <Icon icon="mdi:credit-card-outline" class="mr-3 text-primary text-4xl" />
          Checkout
        </h1>
      </div>
      <router-link to="/cart" class="text-primary flex items-center">
        <Icon icon="mdi:arrow-left" class="mr-2" />
        Return to Cart
      </router-link>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Left Column - Customer Information -->
      <div class="lg:w-2/3 space-y-8">
        <!-- Collapsible Customer Information -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 @click="isCustomerInfoOpen = !isCustomerInfoOpen"
            class="text-xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-100 dark:border-gray-700 cursor-pointer">
            Customer Information
            <Icon :icon="isCustomerInfoOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="float-right" />
          </h2>

          <div v-if="isCustomerInfoOpen">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name*</label>
                <input type="text" class="input-field" placeholder="Your full name" required>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email*</label>
                <input type="email" class="input-field" placeholder="your@email.com" required>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number*</label>
                <input type="tel" class="input-field" placeholder="05XXXXXXXX" required>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City*</label>
                <select class="input-field" required>
                  <option value="">Select city</option>
                  <option>Riyadh</option>
                  <option>Jeddah</option>
                  <option>Dammam</option>
                  <option>Mecca</option>
                  <option>Medina</option>
                </select>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address*</label>
                <textarea class="input-field" rows="3" placeholder="Full address including district and street"
                  required></textarea>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Notes</label>
                <textarea class="input-field" rows="2" placeholder="Any special instructions for delivery"></textarea>
              </div>
            </div>
            <div class="md:col-span-2">
                <button type="button" @click="addNewAddress" class="btn-primary py-2 px-4">
                <Icon icon="mdi:plus" class="mr-2" /> Add New Address
                </button>
            </div>
          </div>
        </div>

        <!-- Order Details -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2
            class="text-xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">
            Order Details
          </h2>

          <div class="">
            <div class="flex items-start">
              <img src="https://phonedb.net/img/oneplus_nord_ce4_lite_5g_2.jpg"
                class="w-20 h-20 object-cover rounded-md mr-4">
              <div class="flex-grow">
                <p class="text-sm text-gray-500 mb-1">category </p>
                <h3 class="font-medium text-gray-800 dark:text-white mb-2">name </h3>
                <p class="text-sm text-green-600 mb-2">Returnable until returnDate</p>
                <p class="text-gray-600 dark:text-gray-300">
                  Get it by <strong>deliveryDate </strong>
                </p>
              </div>
            </div>
            <div class="border-b border-gray-100 dark:border-gray-700 my-4"></div>
            <!-- Estimated Delivery -->
            <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>Estimated Delivery:</span>
              <span class="font-bold">Tuesday, May 13, 2025</span>
            </div>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2
            class="text-xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">
            Payment Method
          </h2>

          <div class="space-y-3">

            <label
              class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input type="radio" name="payment" class="radio-input" @change="showCardForm = true">
              <div class="ml-3">
                <span class="block font-medium">Mada</span>
                <span class="block text-sm text-gray-500">Secure online payment</span>
              </div>
              <img src="https://s101.daleelstore.com/public/PaymentMethod/footer_icon/8_1739350583.svg" alt="Mada"
                class="ml-auto h-8">
            </label>

            <label
              class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input type="radio" name="payment" class="radio-input" @change="showCardModal = true">
              <div class="ml-3">
                <span class="block font-medium">Credit Card</span>
                <span class="block text-sm text-gray-500">Visa, Mastercard</span>
              </div>
              <div class="ml-auto flex space-x-2">
                <img src="https://s101.daleelstore.com/public/PaymentMethod/footer_icon/6_1739350628.svg" alt="Visa"
                  class="h-8">
              </div>
            </label>

            <label
              class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input type="radio" name="payment" class="radio-input">
              <div class="ml-3">
                <span class="block font-medium">Apple Pay</span>
                <span class="block text-sm text-gray-500">Pay with Apple Pay</span>
              </div>
              <img src="https://s101.daleelstore.com/public/PaymentMethod/footer_icon/13_1739357245.png" alt="Apple Pay"
                class="ml-auto h-8">
            </label>

            <label
              class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input type="radio" name="payment" class="radio-input" @change="showCardForm = false">
              <div class="ml-3">
                <span class="block font-medium">Cash on Delivery (COD)</span>
                <span class="block text-sm text-gray-500">Pay when you receive your order</span>
              </div>
              <img src="https://www.jarir.com/assets/images/svg/payondeliverywithcard.svg" alt="Cash on Delivery"
                class="ml-auto h-8">
            </label>
          </div>
        </div>
      </div>

      <!-- Right Column - Order Summary -->
      <div class="lg:w-1/3">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-4">
          <h3
            class="text-lg font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">
            Order Summary
          </h3>

          <!-- Products List -->
          <div class="space-y-4 mb-4 max-h-96 overflow-y-auto">
            <div class="flex items-center">
              <img src="https://phonedb.net/img/oneplus_nord_ce4_lite_5g_2.jpg"
                class="w-16 h-16 object-cover rounded-md mr-4">
              <div class="flex-grow">
                <h4 class="font-medium text-gray-800 dark:text-white"> item.name </h4>
                <p class="text-sm text-gray-500">Qty: item.quantity </p>
              </div>
              <span class="font-medium">SAR item.price * item.quantity </span>
            </div>
          </div>

          <!-- Order Totals -->
          <div class="space-y-3 mb-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Subtotal</span>
              <span class="font-medium">SAR subtotal.toFixed</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Shipping</span>
              <span class="font-medium">SAR 20</span>
            </div>
            <div v-if="discount > 0" class="flex justify-between text-green-600">
              <span>Discount</span>
              <span class="font-medium">-SAR 30</span>
            </div>
          </div>

          <div
            class="flex justify-between text-lg font-bold text-gray-800 dark:text-white pt-4 border-t border-gray-100 dark:border-gray-700">
            <span>Total</span>
            <span>SAR 500</span>
          </div>
          <!-- Moved Estimated Delivery -->
          <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Estimated Delivery:</span>
            <span class="font-medium">Tuesday, May 13, 2025</span>
          </div>
          <!-- Terms and Conditions -->
          <div class="mt-6">
            <label class="flex items-start">
              <input type="checkbox" class="checkbox-input mt-1">
              <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">
                By clicking "Finish shopping", you agree to our
                <a href="#" class="text-primary">Terms and Conditions</a> and
                <a href="#" class="text-primary">Privacy Policy</a>
              </span>
            </label>
          </div>

          <button @click="placeOrder" class="btn-primary w-full mt-6 py-3 flex items-center justify-center">
            <Icon icon="mdi:lock-outline" class="mr-2" />
            Finish Shopping
          </button>
          <!-- Security & Privacy Footer -->
          <div class=" pt-4 ">
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Your payment information is processed securely. We use 128-bit encryption and never store your full card
              details.
            </p>
            <p class="text-xs text-gray-500">
              © All rights reserved. {{ storeName }} {{ new Date().getFullYear() }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Card Modal -->
    <div v-if="showCardModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">Add New Card</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Card Number</label>
            <input type="text" class="input-field" placeholder="1234 5678 9012 3456">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Expiration Date</label>
              <div class="flex gap-2">
                <select class="input-field">
                  <option>MM</option>
                  <!-- Add month options -->
                </select>
                <select class="input-field">
                  <option>YYYY</option>
                  <!-- Add year options -->
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">CVV</label>
              <input type="text" class="input-field" placeholder="123">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Cardholder Name</label>
            <input type="text" class="input-field" placeholder="Name on card">
          </div>
          <label class="flex items-center mt-4">
            <input type="checkbox" class="checkbox-input">
            <span class="ml-2 text-sm">Remember this card</span>
          </label>
          <p class="text-xs text-gray-500 mt-2">
            Your card details will be securely stored for faster payments. CVV will not be stored.
          </p>
          <div class="flex gap-4 mt-6">
            <button @click="showCardModal = false" class="btn-secondary flex-1">Cancel</button>
            <button @click="saveCard" class="btn-primary flex-1">Save Card</button>
          </div>
        </div>
      </div>
    </div>


    <!-- Payment Methods Footer -->
    <div class="pt-8">
      <h4 class="text-center text-gray-500 dark:text-gray-400 mb-4">We Accept</h4>
      <div class="flex flex-wrap justify-center gap-3">
        <img src="https://wps-media.jarir.com/wp-content/uploads/2021/12/mada.png" alt="Mada" class="h-10">
        <img src="https://wps-media.jarir.com/wp-content/uploads/2022/02/visa.png" alt="Visa" class="h-10">
        <img src="https://wps-media.jarir.com/wp-content/uploads/2021/12/mastercard.png" alt="Mastercard" class="h-10">
        <img src="https://wps-media.jarir.com/wp-content/uploads/2021/12/amex.png" alt="American Express" class="h-10">
        <img src="https://wps-media.jarir.com/wp-content/uploads/2024/07/ARB_mokafaa_logo-1.svg" alt="Mokafaa" class="h-10">
        <img src="https://s101.daleelstore.com/public/PaymentMethod/footer_icon/13_1739357245.png" alt="Apple Pay" class="h-10">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const isCustomerInfoOpen = ref(false)
const showCardModal = ref(false)
const storeName = ref('Tech Store')



const addNewAddress = () => {
  // Add address logic
}

const saveCard = () => {
  // Save card logic
  showCardModal.value = false
}
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors;
}

.radio-input {
  @apply h-5 w-5 text-primary focus:ring-primary border-gray-300 dark:border-gray-600;
}

.checkbox-input {
  @apply h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded;
}

.btn-primary {
  @apply bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors;
}

.btn-secondary {
  @apply bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-md transition-colors py-2 px-4;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>