import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  // Le panier sera un tableau d'objets, chaque objet représentant un abonnement sélectionné
  // avec sa quantité/durée.
  // Exemple d'un élément du panier: { id: 1, name: 'Netflix', basePrice: 5000, months: 1, platformId: 1 }
  const items = ref([]);

  // Récupérer le panier depuis le localStorage lors de l'initialisation
  if (process.client) {
    const savedCart = localStorage.getItem('ovis237_cart');
    if (savedCart) {
      items.value = JSON.parse(savedCart);
    }
  }

  // Ajoute un abonnement au panier ou met à jour sa quantité
  const addToCart = (platform, months = 1) => {
    const existingItemIndex = items.value.findIndex(item => item.platformId === platform.id);

    if (existingItemIndex > -1) {
      // Si l'abonnement existe déjà, met à jour sa durée
      // Nous allons forcer la mise à jour des mois ici.
      // Si vous voulez un comportement d'incrémentation des mois, ajustez ici.
      items.value[existingItemIndex].months = months;
    } else {
      // Sinon, ajoute un nouvel abonnement
      items.value.push({
        platformId: platform.id, // Garder l'ID de la plateforme pour référence
        name: platform.name,
        basePrice: platform.basePrice,
        months: months,
        animalEmoji: platform.animalEmoji, // Ajouter pour l'affichage dans le panier si besoin
      });
    }
    saveCart();
  };

  // Met à jour la durée d'un abonnement spécifique dans le panier
  const updateItemMonths = (platformId, newMonths) => {
    const item = items.value.find(item => item.platformId === platformId);
    if (item) {
      item.months = newMonths;
      saveCart();
    }
  };

  // Supprime un abonnement du panier
  const removeFromCart = (platformId) => {
    items.value = items.value.filter(item => item.platformId !== platformId);
    saveCart();
  };

  // Vide entièrement le panier
  const clearCart = () => {
    items.value = [];
    saveCart();
  };

  // Sauvegarde le panier dans le localStorage
  const saveCart = () => {
    if (process.client) {
      localStorage.setItem('ovis237_cart', JSON.stringify(items.value));
    }
  };

  // Propriété calculée pour le nombre total d'articles dans le panier (par exemple pour une icône de panier)
  const cartItemCount = computed(() => items.value.length);

  // Propriété calculée pour le prix total du panier
  const cartTotalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.basePrice * item.months), 0);
  });

  // Propriété calculée pour obtenir les détails du panier formatés pour WhatsApp
  const getWhatsAppMessage = computed(() => {
    if (items.value.length === 0) {
      return "Mon panier OVIS237 est vide.";
    }

    let message = "Bonjour OVIS237, je souhaite m'abonner aux services suivants :\n\n";
    items.value.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.basePrice} FCFA/mois) - Durée: ${item.months} mois\n`;
      message += `   Coût: ${item.basePrice * item.months} FCFA\n`;
    });
    message += `\nMontant total du panier: ${cartTotalPrice.value} FCFA\n`;
    message += "Veuillez me contacter pour finaliser ma commande. Merci !";

    // Encode l'URI pour être sûr que le message est bien formaté pour une URL
    return encodeURIComponent(message);
  });

  return {
    items,
    addToCart,
    updateItemMonths,
    removeFromCart,
    clearCart,
    cartItemCount,
    cartTotalPrice,
    getWhatsAppMessage,
  };
});