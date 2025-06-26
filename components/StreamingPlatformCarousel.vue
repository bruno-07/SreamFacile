<template>
  <div class="streaming-carousel-section p-6 bg-transparent rounded-lg shadow-xl dark:text-gray-100">
    <div class="flex overflow-x-auto snap-x snap-mandatory pb-4 space-x-6 scrollbar-hide">
      <div
        v-for="platform in platforms"
        :key="platform.id"
        @click="selectPlatform(platform)"
        :class="[
          'flex-none w-64 md:w-80 p-6 rounded-xl shadow-lg cursor-pointer transform transition-all duration-300',
          'hover:scale-105 hover:shadow-2xl',
          selectedPlatform.id === platform.id ? 'border-4 border-blue-600 ring-4 ring-blue-300' : 'border border-gray-200 dark:border-gray-700'
        ]"
        :style="{ backgroundColor: platform.bgColor, color: platform.textColor }"
        class="relative overflow-hidden snap-center"
      >
        <div class="absolute inset-0 opacity-20 flex justify-center items-center text-9xl">
          {{ platform.animalEmoji }}
        </div>

        <div class="relative z-10 text-center">
          <h3 class="text-3xl font-extrabold mb-2">{{ platform.name }}</h3>
          <p class="text-lg font-semibold">{{ platform.basePrice }} FCFA / mois</p>
          <p class="text-sm mt-2">{{ platform.description }}</p>
        </div>
      </div>
    </div>

    <div class="mt-8 p-6 bg-gray-50 rounded-lg shadow-inner flex flex-col items-center dark:bg-gray-700 dark:shadow-none">
      <h3 class="text-2xl font-bold text-darkblue mb-4 dark:text-white">Choisissez votre durée d'abonnement :</h3>
      
      <div class="flex items-center space-x-4 mb-6">
        <label for="months" class="text-lg font-medium text-gray-700 dark:text-gray-200">Durée :</label>
        <select
          id="months"
          v-model.number="selectedMonths"
          class="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option v-for="n in 12" :key="n" :value="n">
            {{ n }} mois
          </option>
        </select>
      </div>

      <div class="text-center">
        <p class="text-3xl font-extrabold text-blue-700 dark:text-blue-400">
          Total pour {{ selectedPlatform.name }} : {{ totalPrice }} FCFA
        </p>
        <button
          @click="addItemToCart"
          class="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        >
          Ajouter {{ selectedPlatform.name }} au panier
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBackgroundStore } from '@/stores/background';
import { useCartStore } from '@/stores/cart'; // Import du store Panier

// Initialisation des stores
const backgroundStore = useBackgroundStore();
const cartStore = useCartStore(); // Utilisation du store Panier

// Données des plateformes de streaming avec emojis d'animaux, couleurs et descriptions
const platforms = ref([
  {
    id: 1,
    name: 'Netflix',
    basePrice: 2000,
    animalEmoji: '🦊',
    bgColor: '#e50914',
    textColor: 'white',
    description: 'Films, séries, documentaires illimités.',
    backgroundUrl: '/images/background/netflix.jpeg',
  },
  {
    id: 2,
    name: 'weplex',
    basePrice: 6000,
    animalEmoji: '🦁',
    bgColor: '#113978',
    textColor: 'white',
    description: 'Disney, Pixar, Marvel, Star Wars, National Geographic.',
    backgroundUrl: '/images/background/plex.jpeg',
  },
  {
    id: 3,
    name: 'Amazon Prime Video',
    basePrice: 2000,
    animalEmoji: '🐻',
    bgColor: '#232f3e',
    textColor: 'white',
    description: 'Séries originales, films, et avantages Prime.',
    backgroundUrl: '/images/background/prime.jpeg',
  },
  {
    id: 4,
    name: 'canva pro 1 an',
    basePrice: 5000,
    animalEmoji: '🐒',
    bgColor: '#FF0000',
    textColor: 'white',
    description: 'Vidéos sans pub, lecture en arrière-plan, téléchargements.',
    backgroundUrl: '/images/background/canva.jpeg',
  },
  {
    id: 5,
    name: 'Spotify Premium',
    basePrice: 2000,
    animalEmoji: '🎶',
    bgColor: '#1DB954',
    textColor: 'white',
    description: 'Musique à la demande sans publicité.',
    backgroundUrl: '/images/background/spotify.jpeg',
  },
]);

// État pour la plateforme actuellement sélectionnée (initialisée avec la première plateforme)
const selectedPlatform = ref(platforms.value[0]);

// Initialiser le fond d'écran global avec le fond de la première plateforme au chargement
backgroundStore.setBackground(selectedPlatform.value.backgroundUrl);

// État pour le nombre de mois sélectionné par l'utilisateur
const selectedMonths = ref(1);

// Fonction pour changer la plateforme sélectionnée lors du clic
const selectPlatform = (platform) => {
  selectedPlatform.value = platform;
  backgroundStore.setBackground(platform.backgroundUrl); // Met à jour le fond global
  // Optionnel: Mettre à jour selectedMonths si l'abonnement est déjà dans le panier
  const existingCartItem = cartStore.items.find(item => item.platformId === platform.id);
  if (existingCartItem) {
    selectedMonths.value = existingCartItem.months;
  } else {
    selectedMonths.value = 1; // Réinitialiser à 1 mois si nouvel abonnement
  }
};

// Propriété calculée pour le prix total
const totalPrice = computed(() => {
  return selectedPlatform.value.basePrice * selectedMonths.value;
});

// Fonction pour ajouter l'abonnement sélectionné au panier
const addItemToCart = () => {
  cartStore.addToCart(selectedPlatform.value, selectedMonths.value);
  // Optionnel: Afficher une notification que l'article a été ajouté au panier
  alert(`${selectedPlatform.value.name} (${selectedMonths.value} mois) ajouté au panier !`);
};
</script>

<style scoped>
/* Masquer la barre de défilement pour un carrousel plus propre (peut nécessiter un préfixe navigateur) */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>