// stores/cart.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  // Le panier sera un tableau d'objets, chaque objet représentant un abonnement sélectionné
  // avec sa quantité/durée.
  const items = ref([]);

  // Récupérer le panier depuis le localStorage lors de l'initialisation
  if (process.client) {
    const savedCart = localStorage.getItem('ovis237_cart');
    if (savedCart) {
      items.value = JSON.parse(savedCart);
    }
  }

  // Ajoute un abonnement au panier comme un nouvel article distinct
  const addToCart = (platform, months = 1) => {
    items.value.push({
      platformId: platform.id, // Garder le platformId pour référence si nécessaire
      id: Date.now() + Math.random().toString(36).substr(2, 9), // ID unique pour chaque article de panier
      name: platform.name,
      basePrice: platform.basePrice,
      months: months,
      totalPrice: platform.basePrice * months // Calculer le prix total à l'ajout
    });
    saveCart();
  };

  // Fonction pour supprimer un article du panier par son ID unique
  const removeItem = (itemId) => {
    items.value = items.value.filter(item => item.id !== itemId);
    saveCart();
  };

  // NEW FUNCTION: Update the number of months for a specific item in the cart
  const updateItemMonths = (itemId, newMonths) => {
    const itemIndex = items.value.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      const item = items.value[itemIndex];
      item.months = newMonths;
      item.totalPrice = item.basePrice * newMonths;
      saveCart();
    }
  };

  // Fonction pour vider tout le panier
  const clearCart = () => {
    items.value = [];
    saveCart();
  };

  // Fonction interne pour sauvegarder le panier dans le localStorage
  const saveCart = () => {
    if (process.client) {
      localStorage.setItem('ovis237_cart', JSON.stringify(items.value));
    }
  };

  // Propriété calculée pour le nombre total d'articles dans le panier
  const cartItemCount = computed(() => items.value.length);

  // Propriété calculée pour le prix total de tous les articles dans le panier
  const cartTotalPrice = computed(() => {
    return items.value.reduce((total, item) => total + item.totalPrice, 0);
  });

  // Propriété calculée pour obtenir les détails du panier formatés pour le message WhatsApp
  const getWhatsAppMessage = computed(() => {
    if (items.value.length === 0) {
      return "Bonjour OVIS237, mon panier est vide.";
    }

    let message = "Bonjour OVIS237, je souhaite m'abonner aux services suivants :\n\n";
    items.value.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.months} mois) - ${item.totalPrice} FCFA\n`;
    });
    message += `\nMontant total du panier: ${cartTotalPrice.value} FCFA\n`;
    message += "Veuillez me contacter pour finaliser ma commande. Merci !";

    return message;
  });

  // Exposer les méthodes et propriétés du store
  return {
    items,
    addToCart,
    removeItem,
    clearCart,
    cartItemCount,
    cartTotalPrice,
    getWhatsAppMessage,
    updateItemMonths, // EXPOSE THE NEW FUNCTION
  };
});