<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <span class="text-2xl font-bold text-primary">TechStore</span>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <div class="relative group">
            <button class="flex items-center nav-link">
              <span>Browse</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div
              class="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <router-link class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                category.name
              </router-link>
            </div>
          </div>

          <router-link to="/deals" class="nav-link">Deals</router-link>
          <router-link to="/new-arrivals" class="nav-link">New Arrivals</router-link>
        </div>

        <!-- Right Side Icons -->
        <div class="flex items-center space-x-4">
          <button class="p-2 rounded-full hover:bg-gray-100">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>

          <div class="relative">
            <button class="p-2 rounded-full hover:bg-gray-100" @click="toggleCart">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
              </svg>
              <span class="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"> 3 </span>
            </button>

            <CartDropdown v-if="showCart" @close="toggleCart" />
          </div>

          <router-link v-if="!isAuthenticated" to="/login" class="btn-primary px-4 py-2 text-sm">
            Login / Register
          </router-link>

          <div v-else class="relative group">
            <button class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center text-white font-medium">
                {{ userInitials }}
              </div>
            </button>
            <div
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</router-link>
              <router-link to="/orders" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Orders</router-link>
              <button @click="logout"
                class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
