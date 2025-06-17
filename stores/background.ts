// stores/background.ts
import { defineStore } from 'pinia';

export const useBackgroundStore = defineStore('background', {
  state: () => ({
    // Initialisez avec une image de fond par défaut si vous en avez une, sinon null
    currentBackground: null as string | null,
  }),
  actions: {
    /**
     * Définit la nouvelle URL de l'image de fond.
     * @param url L'URL de l'image de fond.
     */
    setBackground(url: string) {
      this.currentBackground = url;
    },
    /**
     * Réinitialise le fond d'écran à l'état par défaut (null ou une image par défaut).
     */
    resetBackground() {
      this.currentBackground = null;
    }
  },
  // Getters si vous avez besoin de données calculées à partir de l'état
  getters: {
    getBackground: (state) => state.currentBackground,
  },
});
