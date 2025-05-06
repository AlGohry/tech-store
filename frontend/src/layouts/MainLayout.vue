<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />

    <div class="flex-grow container mx-auto px-4 py-6">
      <router-view /> <!-- Content for each page will be displayed here -->
    </div>

    <Footer />
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
</script>
