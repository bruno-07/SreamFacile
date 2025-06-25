<template>
  <header class="bg-white shadow-md py-4 sticky top-0 z-50 dark:bg-gray-800 dark:shadow-lg transition-colors duration-300">
    <nav class="container mx-auto flex justify-between items-center px-4">
      <NuxtLink to="/" class="flex items-center space-x-2">
        <img src="/" alt="OVIS237 Logo" class="h-10 w-auto">
        <span class="text-2xl font-bold text-darkblue dark:text-white">OVIS237</span>
      </NuxtLink>

      <button
        @click="openCart"
        class="ml-2 p-2 rounded-full focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition relative md:order-none order-2"
        aria-label="Ouvrir le panier"
      >
        <svg class="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <span v-if="cartStore.cartItemCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {{ cartStore.cartItemCount }}
        </span>
      </button>

      <button
        @click="darkModeStore.toggleDarkMode"
        class="ml-4 p-2 rounded-full focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition md:order-none order-3"
        :aria-label="darkModeStore.isDarkMode ? 'Activer le mode clair' : 'Activer le mode sombre'"
      >
        <svg v-if="!darkModeStore.isDarkMode" class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      </button>

      <ul class="hidden md:flex space-x-8 md:order-none order-1">
        <li>
          <NuxtLink 
            to="/" 
            class="font-semibold" 
            :class="{ 'text-blue-600 underline': isActiveLink('/'), 'text-gray-700 hover:text-darkblue dark:text-gray-300 dark:hover:text-white': !isActiveLink('/') }"
          >
            Accueil
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="#streaming-subscriptions" 
            class="font-semibold" 
            :class="{ 'text-blue-600 underline': isActiveLink('#streaming-subscriptions'), 'text-gray-700 hover:text-darkblue dark:text-gray-300 dark:hover:text-white': !isActiveLink('#streaming-subscriptions') }"
          >
            Abonnements
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="#it-services" 
            class="font-semibold" 
            :class="{ 'text-blue-600 underline': isActiveLink('#it-services'), 'text-gray-700 hover:text-darkblue dark:text-gray-300 dark:hover:text-white': !isActiveLink('#it-services') }"
          >
            Services IT
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="#about-us" 
            class="font-semibold" 
            :class="{ 'text-blue-600 underline': isActiveLink('#about-us'), 'text-gray-700 hover:text-darkblue dark:text-gray-300 dark:hover:text-white': !isActiveLink('#about-us') }"
          >
            À Propos
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/contact" 
            class="font-semibold" 
            :class="{ 'text-blue-600 underline': isActiveLink('/contact'), 'text-gray-700 hover:text-darkblue dark:text-gray-300 dark:hover:text-white': !isActiveLink('/contact') }"
          >
            Contact
          </NuxtLink>
        </li>
      </ul>

      <button @click="toggleMobileMenu" class="md:hidden focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 order-last">
        <svg v-if="!isMobileMenuOpen" class="w-8 h-8 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <svg v-else class="w-8 h-8 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </nav>
  </header>

  <div v-if="isMobileMenuOpen"
       @click="closeMobileMenu"
       class="fixed inset-0 bg-black/40 z-30 md:hidden">
  </div>

  <div v-if="isMobileMenuOpen"
       class="fixed top-0 bottom-0 right-0 w-3/10 bg-white/80 dark:bg-gray-800/80 z-40 flex flex-col md:hidden transition-transform duration-300 ease-in-out transform"
       :class="{ 'translate-x-0': isMobileMenuOpen, 'translate-x-full': !isMobileMenuOpen }"
  >
    <div class="flex justify-between items-center p-4 shadow-sm dark:shadow-lg">
      <span class="text-xl font-bold text-darkblue dark:text-white">Menu</span>
      <button @click="toggleMobileMenu" class="focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
        <svg class="w-8 h-8 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <ul class="flex flex-col items-center mt-8 space-y-6">
      <li>
        <NuxtLink
          to="/"
          @click="closeMobileMenu"
          class="text-xl font-semibold"
          :class="{ 'text-blue-600 underline': isActiveLink('/'), 'text-gray-700 hover:text-darkblue dark:text-gray-300 dark:hover:text-white': !isActiveLink('/') }"
        >
          Accueil
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="#streaming-subscriptions"
          @click="closeMobileMenu"
          class="text-xl font-semibold"
          :class="{ 'text-blue-600 underline': isActiveLink('#streaming-subscriptions'), 'text-gray-700 hover:text-darkblue dark:text-gray-300 dark:hover:text-white': !isActiveLink('#streaming-subscriptions') }"
        >
          Abonnements
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="#it-services"
          @click="closeMobileMenu"
          class="text-xl font-semibold"
          :class="{ 'text-blue-600 underline': isActiveLink('#it-services'), 'text-gray-700 hover:text-darkblue dark:text-gray-300 dark:hover:text-white': !isActiveLink('#it-services') }"
        >
          Services IT
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/contact"
          @click="closeMobileMenu"
          class="text-xl font-semibold"
          :class="{ 'text-blue-600 underline': isActiveLink('/contact'), 'text-gray-700 hover:text-darkblue dark:text-gray-300 dark:hover:text-white': !isActiveLink('/contact') }"
        >
          Contact
        </NuxtLink>
      </li>
    </ul>
  </div>

  <CartModal ref="cartModalRef" />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from '#app';
import { useDarkModeStore } from '@/stores/darkMode';
import { useCartStore } from '@/stores/cart';
import CartModal from '@/components/CartModal.vue';

const isMobileMenuOpen = ref(false);
const route = useRoute();
const darkModeStore = useDarkModeStore();
const cartStore = useCartStore();

const cartModalRef = ref(null);

const openCart = () => {
  if (cartModalRef.value) {
    cartModalRef.value.openModal();
  }
};

const isActiveLink = (linkPath) => {
  if (!route || !route.path) {
    return false;
  }

  if (linkPath.startsWith('#')) {
    return route.hash === linkPath;
  } else {
    return route.path === linkPath;
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  // Removed document.body.style.overflow = 'hidden' to allow background scrolling
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<style scoped>
/* Styles handled by Tailwind CSS */
</style>