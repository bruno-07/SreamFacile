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
            <h2 class="text-xl sm:text-2xl md:text-4xl font-extrabold text-center text-gray-500 mb-12 drop-shadow-lg uppercase tracking-wider bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 block mx-auto py-4 rounded-lg shadow-lg border-4 border-yellow-500 whitespace-nowrap px-2 sm:px-4 md:px-8">
              Nos Abonnements Streaming 
            </h2>
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

        <section id="about-us" class="py-16 bg-gray-100">
          <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center text-darkblue mb-8">À Propos de Nous</h2>
            <p class="text-center text-lg text-gray-700">
              (Présentation de l'entreprise et de la technologie utilisée : Nuxt 3, Tailwind CSS.)
            </p>
          </div>
        </section>
      </main>
    </div>

    <footer class="bg-darkblue text-white py-6 text-center relative z-10">
      <div class="container mx-auto">
        <p>&copy; {{ new Date().getFullYear() }}     OVIS237. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBackgroundStore } from '@/stores/background'; // Import du store de fond

const backgroundStore = useBackgroundStore();

// Propriété calculée pour le style de fond d'écran
const backgroundStyle = computed(() => {
  const url = backgroundStore.getBackground;
  if (url) {
    return {
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      transition: 'background-image 0.5s ease-in-out', // Transition pour un changement doux
    };
  }
  return {
    // Fond par défaut si aucune image n'est sélectionnée
    backgroundColor: '#ecf0f1', // Couleur de fond par défaut de lightblue
    transition: 'background-image 0.5s ease-in-out',
  };
});
</script>

<style>
/* Appliquez des styles de base pour un défilement fluide du fond */
html, body {
  height: 100%;
}

#app { /* Assurez-vous que l'élément racine de votre Nuxt a au moins min-h-screen */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Vous pouvez ajouter des styles globaux ici si nécessaire */
/* Sinon, utilisez `main.css` pour Tailwind et les styles de base */

/* Assurez-vous que le main-content-wrapper prend tout l'espace disponible */
.main-content-wrapper {
  flex-grow: 1;
  display: flex; /* Utile si NuxtPage ou les sections ont des hauteurs dynamiques */
  flex-direction: column;
  position: relative; /* Pour que le z-index fonctionne */
}

/* Les sections doivent avoir un fond semi-transparent si elles ne sont pas opaques pour voir l'image derrière */
#streaming-subscriptions, #it-services, #about-us {
  /* Si vous voulez que l'image de fond soit visible derrière ces sections,
   * rendez leur fond transparent ou semi-transparent.
   * Sinon, elles couvriront l'image de fond. */
  /* background-color: rgba(255, 255, 255, 0.8); par exemple */
}
</style>