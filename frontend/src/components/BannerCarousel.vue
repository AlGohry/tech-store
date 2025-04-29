<template>
  <div class="relative container mx-auto px-4 overflow-hidden rounded-xl shadow-md mb-5 mt-5">
    <div class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
      <div v-for="(banner, index) in banners" :key="index" class="min-w-full h-64 bg-center bg-cover cursor-pointer"
        :style="{ backgroundImage: `url('${banner.image}')` }" @click="navigateTo(banner.link)">
        <!-- <div class="h-full w-full bg-black/30 flex items-center justify-center">
          <h2 class="text-white text-2xl md:text-4xl font-bold">{{ banner.title }}</h2>
        </div> -->
      </div>
    </div>

    <!-- Indicators -->
    <div class="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <span v-for="(banner, index) in banners" :key="index" class="w-3 h-3 rounded-full cursor-pointer"
        :class="activeIndex === index ? 'bg-white' : 'bg-white/50'" @click="activeIndex = index"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import banner1 from "@styles/banners/banner1.png";
import banner2 from "@styles/banners/banner2.png";

const router = useRouter();

const banners = [
  { image: banner1, title: "🔥 Summer Sale 50% Off", link: "/smartphones" },
  { image: banner2, title: "🎮 Best Deals on Gaming Cards", link: "/digital-stores" },
];

const activeIndex = ref(0);

const navigateTo = (link) => {
  router.push(link);
};

onMounted(() => {
  setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % banners.length;
  }, 5000);
});
</script>
