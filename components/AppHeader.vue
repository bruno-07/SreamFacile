<!-- components/AppHeader.vue -->
<template>
  <header class="bg-white shadow-md py-4 sticky top-0 z-50">
    <nav class="container mx-auto flex justify-between items-center px-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <img src="/" alt="OVIS237 Logo" class="h-10 w-auto"> 
        <span class="text-2xl font-bold text-darkblue">OVIS237</span> 
      </NuxtLink>

      <!-- Menu de navigation pour les grands écrans -->
      <ul class="hidden md:flex space-x-8">
        <li>
          <NuxtLink 
            to="/" 
            class="font-semibold" 
            :class="{ 'text-blue-600 underline': isActiveLink('/'), 'text-gray-700 hover:text-darkblue': !isActiveLink('/') }"
          >
            Accueil
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="#streaming-subscriptions" 
            class="font-semibold" 
            :class="{ 'text-blue-600 underline': isActiveLink('#streaming-subscriptions'), 'text-gray-700 hover:text-darkblue': !isActiveLink('#streaming-subscriptions') }"
          >
            Abonnements
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="#it-services" 
            class="font-semibold" 
            :class="{ 'text-blue-600 underline': isActiveLink('#it-services'), 'text-gray-700 hover:text-darkblue': !isActiveLink('#it-services') }"
          >
            Services IT
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="#about-us" 
            class="font-semibold" 
            :class="{ 'text-blue-600 underline': isActiveLink('#about-us'), 'text-gray-700 hover:text-darkblue': !isActiveLink('#about-us') }"
          >
            À Propos
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/contact" 
            class="font-semibold" 
            :class="{ 'text-blue-600 underline': isActiveLink('/contact'), 'text-gray-700 hover:text-darkblue': !isActiveLink('/contact') }"
          >
            Contact
          </NuxtLink>
        </li>
      </ul>

      <!-- Bouton Hamburger pour mobile -->
      <button @click="toggleMobileMenu" class="md:hidden focus:outline-none p-2 rounded-md hover:bg-gray-100">
        <svg v-if="!isMobileMenuOpen" class="w-8 h-8 text-darkblue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <svg v-else class="w-8 h-8 text-darkblue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Menu mobile (overlay) -->
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-white z-40 flex flex-col md:hidden transition-transform duration-300 ease-in-out transform"
           :class="{ 'translate-x-0': isMobileMenuOpen, 'translate-x-full': !isMobileMenuOpen }">
        <div class="flex justify-between items-center p-4 shadow-sm">
          <span class="text-xl font-bold text-darkblue">Menu</span>
          <button @click="toggleMobileMenu" class="focus:outline-none p-2 rounded-md hover:bg-gray-100">
            <svg class="w-8 h-8 text-darkblue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
              :class="{ 'text-blue-600 underline': isActiveLink('/'), 'text-gray-700 hover:text-darkblue': !isActiveLink('/') }"
            >
              Accueil
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="#streaming-subscriptions" 
              @click="closeMobileMenu" 
              class="text-xl font-semibold"
              :class="{ 'text-blue-600 underline': isActiveLink('#streaming-subscriptions'), 'text-gray-700 hover:text-darkblue': !isActiveLink('#streaming-subscriptions') }"
            >
              Abonnements
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="#it-services" 
              @click="closeMobileMenu" 
              class="text-xl font-semibold"
              :class="{ 'text-blue-600 underline': isActiveLink('#it-services'), 'text-gray-700 hover:text-darkblue': !isActiveLink('#it-services') }"
            >
              Services IT
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/contact" 
              @click="closeMobileMenu" 
              class="text-xl font-semibold"
              :class="{ 'text-blue-600 underline': isActiveLink('/contact'), 'text-gray-700 hover:text-darkblue': !isActiveLink('/contact') }"
            >
              Contact
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from '#app'; // CHANGEMENT ICI : import de useRoute depuis '#app'

const isMobileMenuOpen = ref(false);
const route = useRoute(); // Obtenez l'objet route

// Fonction pour déterminer si un lien est actif
const isActiveLink = (linkPath) => {
  // Vérifie si l'objet route est défini avant d'accéder à ses propriétés
  if (!route || !route.path) { 
    return false; // Retourne false si la route n'est pas encore prête
  }

  if (linkPath.startsWith('#')) {
    // Pour les liens d'ancrage (vers des sections de la même page)
    // Compare le hash de la route actuelle avec le hash du lien
    return route.hash === linkPath;
  } else {
    // Pour les liens de page (vers des pages différentes)
    // Compare le chemin de la route actuelle avec le chemin du lien
    return route.path === linkPath;
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
};
</script>

<style scoped>
/* Les styles sont principalement gérés par Tailwind CSS */
</style>
