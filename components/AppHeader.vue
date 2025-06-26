<template>
  <header class="bg-white shadow-md py-4 sticky top-0 z-50 dark:bg-gray-800 dark:shadow-lg transition-colors duration-300">
    <nav class="container mx-auto flex justify-between items-center px-4">
      <NuxtLink to="/" class="flex items-center space-x-2">
        <img src="/" alt="OVIS237 Logo" class="h-10 w-auto">
      
      </NuxtLink>

       <ul>
        <li>
          <NuxtLink 
            to="#abonnements" 
            class="font-semibold" 
            :class="{ 'text-blue-600 underline': isActiveLink('#abonnements'), 'text-gray-700 hover:text-darkblue dark:text-gray-300 dark:hover:text-white': !isActiveLink('#abonnements') }"
          >
            abonnements
          </NuxtLink>
        </li>
        </ul>

       <ul>
        <li>
          <NuxtLink 
            to="#about-us" 
            class="font-semibold" 
            :class="{ 'text-blue-600 underline': isActiveLink('#about-us'), 'text-gray-700 hover:text-darkblue dark:text-gray-300 dark:hover:text-white': !isActiveLink('#about-us') }"
          >
             A propos
          </NuxtLink>
        </li>
      </ul>


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

     
     
    </nav>
  </header>

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