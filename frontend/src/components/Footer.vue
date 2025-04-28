<template>
  <footer class="bg-gray-100 py-3 mt-10">
    <div class="container mx-auto px-4 text-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Payment Methods -->
        <div>
          <h3 class="font-semibold text-lg">Payment Methods</h3>
          <div class="flex items-center space-x-1 mt-2">
            <!-- Mastercard & Visa -->
            <img src="https://s101.daleelstore.com/public/PaymentMethod/footer_icon/6_1739350628.svg" loading="lazy"
              alt="Mastercard and Visa" class="h-8 object-contain">

            <!-- Mada -->
            <img src="https://s101.daleelstore.com/public/PaymentMethod/footer_icon/8_1739350583.svg" loading="lazy"
              alt="Mada" class="h-8 object-contain">

            <!-- Apple Pay -->
            <img src="https://s101.daleelstore.com/public/PaymentMethod/footer_icon/13_1739357245.png" loading="lazy"
              alt="Apple Pay" class="h-8 object-contain">
          </div>
        </div>

        <!-- Social Links -->
        <div>
          <h3 class="font-semibold text-lg">Follow Us</h3>
          <div class="flex space-x-4 mt-2">
            <a href="https://twitter.com" target="_blank" class="hover:text-primary">
              <Icon icon="fa-brands:twitter" class="text-xl" />
            </a>
            <a href="https://facebook.com" target="_blank" class="hover:text-primary">
              <Icon icon="fa-brands:facebook" class="text-xl" />
            </a>
            <a href="https://instagram.com" target="_blank" class="hover:text-primary">
              <Icon icon="fa-brands:instagram" class="text-xl" />
            </a>
          </div>
        </div>

        <!-- Copyright and Year -->
        <div class="text-center md:text-right">
          <p>&copy; {{ new Date().getFullYear() }} TechStore. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue'; // Import the Icon component
</script>