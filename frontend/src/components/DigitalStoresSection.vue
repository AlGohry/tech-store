<template>
  <div class="mb-10">
    <!-- Section Title -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Digital Stores
        </h2>
        <span class="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
          {{ stores.length }} stores
        </span>
      </div>
    </div>

    <!-- Stores Grid (Image Only) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <router-link v-for="store in stores" :key="store.id" :to="'/store/' + store.id"
        class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg duration-300 transition-all hover:scale-[1.02]">
        <img :src="store.logo" :alt="store.name" class="w-full h-full object-cover min-h-[120px]">
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

// Import store logos
import amazonLogo from '@Images/stores/amazon.png';
import googlePlayLogo from '@Images/stores/google-play.png';
import huaweiLogo from '@Images/stores/huawei.png';
import itunesLogo from '@Images/stores/itunes.png';

const stores = ref([
  { id: 1, name: 'iTunes', logo: itunesLogo },
  { id: 2, name: 'Google Play', logo: googlePlayLogo },
  { id: 3, name: 'Amazon', logo: amazonLogo },
  { id: 4, name: 'HUAWEI', logo: huaweiLogo }
]);
</script>