<template>
  <div class="min-h-screen flex flex-col relative">
    <AppHeader />
    
    <div 
      class="flex-grow main-content-wrapper" 
      :style="backgroundStyle"
    >
      <main class="relative z-10"> <NuxtPage /> 

        <section id="streaming-subscriptions" class="py-16 bg-lightblue">
          <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center text-darkblue mb-12">Nos Abonnements Streaming</h2>
            <StreamingPlatformCarousel />
          </div>
        </section>

        <section id="it-services" class="py-16 bg-white">
          <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center text-darkblue mb-8">Nos Services Informatiques</h2>
            <p class="text-center text-lg text-gray-700">
              (Cette section sera développée plus tard : création de sites web dynamiques, portfolio, e-commerce, etc.)
            </p>
          </div>
        </section>

        <section id="about-us" class="py-16 bg-white">
          <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center text-darkblue mb-8">À Propos de Nous</h2>
            <p class="text-center text-lg text-gray-700">
              (Présentation de l'entreprise et de la technologie utilisée : Nuxt 3, Tailwind CSS.)
            </p>
          </div>
          <AppNotification />
        </section>
      </main>
    </div>

    <footer class="bg-gray-800 text-white py-6 text-center relative z-10">
      <div class="container mx-auto">
        <p>&copy; {{ new Date().getFullYear() }} OVIS237. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBackgroundStore } from '@/stores/background'; 
import AppHeader from '@/components/AppHeader.vue';
import StreamingPlatformCarousel from '@/components/StreamingPlatformCarousel.vue';
import AppNotification from '@/components/AppNotification.vue';

const backgroundStore = useBackgroundStore();

const backgroundStyle = computed(() => {
  const url = backgroundStore.getBackground;
  if (url) {
    return {
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      transition: 'background-image 0.5s ease-in-out',
    };
  }
  return {
    backgroundColor: '#ecf0f1', // Original lightblue default background
    transition: 'background-image 0.5s ease-in-out',
  };
});
</script>

<style>
html, body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>