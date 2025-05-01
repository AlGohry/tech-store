<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <NavBar />
    <div class="flex-grow container mx-auto px-4 py-4">
      <BannerCarousel />
      <SmartphonesSection />
      <DigitalStoresSection class="mt-12" />
    </div>
    <Footer />
  </div>
</template>


<script setup>
import NavBar from '@Components/NavBar.vue'; // Import NavBar component
import BannerCarousel from '@Components/BannerCarousel.vue'; // Import BannerCarousel component
import SmartphonesSection from '@Components/SmartphonesSection.vue'; // Import SmartphonesSection component
import DigitalStoresSection from '@Components/DigitalStoresSection.vue'; // Import SmartphonesSection component
import Footer from '@Components/Footer.vue'; // Import Footer component
</script>
