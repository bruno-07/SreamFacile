<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
              <p class="text-gray-600 dark:text-gray-300">
                {{ item.basePrice }} FCFA/{{ item.billingCycle === 'yearly' ? 'an' : 'mois' }}
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <label :for="'months-' + item.id" class="text-gray-700 dark:text-gray-300 sr-only sm:not-sr-only">Durée :</label>
              <select
                :id="'months-' + item.id"
                :value="item.months"
                @change="event => updateMonths(item.id, parseInt(event.target.value))"
                :disabled="item.billingCycle === 'yearly'" class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option v-if="item.billingCycle === 'yearly'" :value="12">1 an</option>
                <option v-else v-for="n in 12" :key="n" :value="n">{{ n }} mois</option>
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
            <i class="fab fa-whatsapp  text-2xl mr-1.5" ></i>
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
import { useNotificationStore } from '@/stores/notification';

const cartStore = useCartStore();
const notificationStore = useNotificationStore();
const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
};

const openModal = () => {
  isOpen.value = true;
};

const updateMonths = (itemId, newMonths) => {
  cartStore.updateItemMonths(itemId, newMonths);
  notificationStore.showNotification('Durée de l\'abonnement mise à jour !', 'success');
};

const removeItem = (itemId) => {
  cartStore.removeItem(itemId);
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