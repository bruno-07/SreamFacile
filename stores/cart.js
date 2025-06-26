// stores/cart.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);

  if (process.client) {
    const savedCart = localStorage.getItem('ovis237_cart');
    if (savedCart) {
      items.value = JSON.parse(savedCart);
    }
  }

  // Ajoute un abonnement au panier comme un nouvel article distinct
  const addToCart = (platform, months = 1) => {
    // Vérifier si l'article annuel existe déjà et le supprimer avant d'ajouter le nouveau
    // Ceci est important pour éviter les doublons si l'utilisateur ajoute plusieurs fois Canva Pro
    if (platform.billingCycle === 'yearly') {
      items.value = items.value.filter(item => item.platformId !== platform.id);
    }

    items.value.push({
      platformId: platform.id,
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: platform.name,
      basePrice: platform.basePrice,
      months: platform.billingCycle === 'yearly' ? 12 : months, // Force à 12 mois si annuel
      totalPrice: platform.billingCycle === 'yearly' ? platform.basePrice : platform.basePrice * months, // Calcul du prix initial
      billingCycle: platform.billingCycle, // AJOUTER LE CYCLE DE FACTURATION
      animalEmoji: platform.animalEmoji // Pour l'affichage dans le panier
    });
    saveCart();
  };

  const removeItem = (itemId) => {
    items.value = items.value.filter(item => item.id !== itemId);
    saveCart();
  };

  const updateItemMonths = (itemId, newMonths) => {
    const itemIndex = items.value.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      const item = items.value[itemIndex];
      // Ne mettez à jour les mois que si le cycle de facturation n'est PAS annuel
      if (item.billingCycle !== 'yearly') {
        item.months = newMonths;
        item.totalPrice = item.basePrice * newMonths;
      } else {
        // Pour les abonnements annuels, les mois sont toujours 12 et le prix est le basePrice
        item.months = 12;
        item.totalPrice = item.basePrice;
      }
      saveCart();
    }
  };

  const clearCart = () => {
    items.value = [];
    saveCart();
  };

  const saveCart = () => {
    if (process.client) {
      localStorage.setItem('ovis237_cart', JSON.stringify(items.value));
    }
  };

  const cartItemCount = computed(() => items.value.length);

  const cartTotalPrice = computed(() => {
    return items.value.reduce((total, item) => total + item.totalPrice, 0);
  });

  const getWhatsAppMessage = computed(() => {
    if (items.value.length === 0) {
      return "Bonjour OVIS237, mon panier est vide.";
    }

    let message = "Bonjour StreamFacile, je souhaite m'abonner aux services suivants :\n\n";
    items.value.forEach((item, index) => {
      // Ajuster le message pour les abonnements annuels
      const durationText = item.billingCycle === 'yearly' ? '1 an' : `${item.months} mois`;
      message += `${index + 1}. ${item.name} (${durationText}) - ${item.totalPrice} FCFA\n`;
    });
    message += `\nMontant total du panier: ${cartTotalPrice.value} FCFA\n`;
    message += "Veuillez me contacter pour finaliser ma commande. Merci !";

    return message;
  });

  return {
    items,
    addToCart,
    removeItem,
    clearCart,
    cartItemCount,
    cartTotalPrice,
    getWhatsAppMessage,
    updateItemMonths,
  };
});