// nuxt.config.ts
export default defineNuxtConfig({
  // Modules à inclure dans votre application Nuxt
  modules: [
    '@nuxtjs/tailwindcss', // Active le module Tailwind CSS
    '@pinia/nuxt',       // Active le module Pinia pour Nuxt 3
  ],
  // Configuration spécifique pour Tailwind CSS
  tailwindcss: {
    cssPath: '~/assets/css/main.css', // Chemin vers votre fichier CSS principal Tailwind
    configPath: 'tailwind.config.js', // Chemin vers votre fichier de configuration Tailwind
    viewer: true, // Active le visualiseur Tailwind CSS en mode développement
  },
  // Options de rendu du serveur (SSR)
  ssr: true, // Active le rendu côté serveur par défaut
  // Autres configurations globales si nécessaire
  app: {
    head: {
      title: 'ITECH SERVICE | Abonnements & Services IT', // Titre par défaut de votre application
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Vente d\'abonnements en ligne et services informatiques.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } // Icône de votre site
      ]
    }
  }
})
