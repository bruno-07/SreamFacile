<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div class="flex justify-between items-center border-b pb-3 mb-4 dark:border-gray-700">
        <h2 class="text-2xl font-bold text-darkblue dark:text-white">Votre Panier ({{ cartStore.cartItemCount }} articles)</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div v-if="cartStore.items.length === 0" class="text-center py-8 text-gray-600 dark:text-gray-400">
        <p>Votre panier est vide pour l'instant.</p>
        <button @click="closeModal" class="mt-4 text-blue-600 hover:underline dark:text-blue-400">
          Commencer vos achats
        </button>
      </div>

      <div v-else>
        <ul>
          <li v-for="item in cartStore.items" :key="item.id" class="flex flex-col sm:flex-row items-center justify-between py-3 border-b dark:border-gray-700 last:border-b-0">
            <div class="flex-grow text-center sm:text-left mb-2 sm:mb-0">
              <p class="font-semibold text-lg text-darkblue dark:text-white">{{ item.name }} {{ item.animalEmoji }}</p>
              <p class="text-gray-600 dark:text-gray-300">{{ item.basePrice }} FCFA/mois</p>
            </div>
            <div class="flex items-center space-x-2">
              <label :for="'months-' + item.id" class="text-gray-700 dark:text-gray-300 sr-only sm:not-sr-only">Durée :</label>
              <select
                :id="'months-' + item.id"
                :value="item.months"
                @change="event => updateMonths(item.id, parseInt(event.target.value))"
                class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option v-for="n in 12" :key="n" :value="n">{{ n }} mois</option>
              </select>
              <span class="font-bold text-darkblue dark:text-white min-w-[80px] text-right">{{ item.totalPrice }} FCFA</span>
              <button @click="removeItem(item.id)" class="ml-2 p-2 text-red-600 hover:bg-red-100 rounded-full dark:hover:bg-red-900 dark:text-red-400 focus:outline-none">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </li>
        </ul>

        <div class="mt-6 pt-4 border-t dark:border-gray-700 text-right">
          <p class="text-xl font-bold text-darkblue dark:text-white">Total du panier : {{ cartStore.cartTotalPrice }} FCFA</p>
          <a
            :href="whatsappLink"
            target="_blank"
            class="mt-4 inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          >
            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.611-3.924-1.611-6.241C.133 5.303 5.385.051 11.85 0s11.71 5.252 11.71 11.71-5.253 11.71-11.71 11.71c-2.317 0-4.437-.57-6.241-1.612L.057 24zm6.597-3.807l-.466-.276c-1.258-.737-1.996-1.92-1.996-3.267 0-.012 0-.024 0-.036.001-.202.002-.403.004-.603.204-.002.404-.004.604-.004.99 0 1.777.625 2.162 1.41l.169.349c.123.253.28.53.47.78.337.452.748.773 1.229.957.514.195 1.096.289 1.724.289.479 0 .942-.055 1.378-.166.425-.108.813-.263 1.157-.456.33-.189.626-.42.87-.69.23-.257.435-.55.617-.86.17-.297.31-.607.417-.92.12-.358.196-.732.227-1.111.026-.339.039-.68.039-1.018 0-.422-.05-.83-.146-1.223-.1-.38-.225-.74-.374-1.077-.14-.309-.313-.59-.516-.84-.2-.24-.42-.455-.658-.642-.23-.18-.46-.33-.69-.45-.23-.11-.46-.2-.68-.26-.22-.06-.44-.08-.66-.08-.21 0-.41.01-.61.02-.2-.001-.4-.002-.6-.002-.49 0-.96.06-1.4.19-.43.12-.83.29-1.19.51-.35.21-.68.46-.98.76-.28.27-.55.57-.79.91-.23.32-.43.66-.6.99-.16.32-.28.64-.37.96-.09.31-.15.62-.17.92-.02.3-.02.6-.02.89 0 .42.06.84.18 1.25.1.34.22.68.36 1.01.13.31.29.62.47.9.18.28.38.54.61.78.22.23.47.44.73.62.26.17.53.32.81.44.28.12.58.2.89.24.31.04.62.06.94.06.31 0 .61-.01.91-.03.29-.02.58-.05.86-.09.28-.05.55-.1.82-.17.26-.07.51-.15.75-.24.24-.09.47-.19.69-.3.22-.11.43-.22.62-.35.19-.13.36-.26.51-.4.15-.14.28-.29.39-.45.11-.16.2-.33.27-.5.06-.17.11-.34.14-.5l.006-.012c.002-.006.004-.012.006-.018.001-.004.002-.008.003-.012.002-.007.003-.014.004-.021.002-.007.002-.014.002-.021.001-.006.001-.013.001-.019 0-.008-.001-.016-.002-.024-.002-.009-.004-.018-.006-.027-.001-.003-.002-.007-.003-.011.005-.008.01-.016.015-.024.002-.004.004-.008.006-.012.002-.004.003-.008.005-.012.001-.002.002-.004.002-.006.001-.002.001-.004.001-.006 0-.001-.001-.002-.001-.003-.001-.002-.001-.004-.002-.005l-.014-.028c-.001-.002-.002-.004-.003-.006-.002-.004-.004-.008-.006-.012-.002-.004-.004-.008-.006-.012-.001-.002-.002-.004-.003-.006-.001-.002-.002-.004-.003-.005l-.014-.028c-.001-.002-.002-.004-.003-.006-.002-.004-.004-.008-.006-.012-.002-.004-.004-.008-.006-.012-.001-.002-.002-.004-.003-.006-.001-.002-.002-.004-.003-.005l-.014-.028c-.001-.002-.002-.004-.003-.006-.002-.004-.004-.008-.006-.012-.002-.004-.004-.008-.006-.012-.001-.002-.002-.004-.003-.006-.001-.002-.002-.004-.003-.005z"/>
            </svg>
            Commander via WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useNotificationStore } from '@/stores/notification'; // NEW: Import notification store

const cartStore = useCartStore();
const notificationStore = useNotificationStore(); // NEW: Initialize notification store
const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
};

const openModal = () => {
  isOpen.value = true;
};

const updateMonths = (itemId, newMonths) => {
  cartStore.updateItemMonths(itemId, newMonths);
  // NEW: Notify on update
  notificationStore.showNotification('Durée de l\'abonnement mise à jour !', 'success');
};

const removeItem = (itemId) => {
  // REMOVED: The `confirm` dialog
  cartStore.removeItem(itemId);
  // NEW: Notify on removal
  notificationStore.showNotification('Abonnement supprimé du panier.', 'info');
};

const whatsappLink = computed(() => {
  const phoneNumber = '237699115314';
  const message = encodeURIComponent(cartStore.getWhatsAppMessage);
  return `https://wa.me/${phoneNumber}?text=${message}`;
});

defineExpose({
  openModal
});
</script>

<style scoped>
/* Aucun style spécifique ici, Tailwind gère tout */
</style>