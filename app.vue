<template>
 


  <div class="min-h-screen flex flex-col relative">
    <AppHeader />
    
    <div 
      class="flex-grow main-content-wrapper" 
      :style="backgroundStyle"
    >
      <main class="relative z-10"> <NuxtPage /> 

        <section id="abonnements" class="py-16 bg-lightblue">
          <div class="container mx-auto px-4">
            <h2 class="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-12 tracking-tight drop-shadow-sm">
              Nos Abonnements <span class="text-blue-500">Streaming</span>
            </h2>
            <StreamingPlatformCarousel />
          </div>
        </section>

       
                      <!-- Page À propos - NovaAccess -->
        <section id="about-us" class="bg-blue-200 text-gray-800 py-16 px-6 md:px-16">
          <div class="max-w-5xl mx-auto">
            <!-- Titre principal -->
            <h1 class="text-4xl font-bold text-blue-700 mb-4">À propos de <span class="text-white">Stream</span><span class="text-[#b62630]">Facile</span></h1>
            <p class="text-lg text-gray-600 mb-10">
              Chez <span class="text-white">Stream</span><span class="text-[#b62630]">Facile</span>, nous croyons que chaque abonnement est bien plus qu’un simple service :
              c’est un engagement de confiance, de qualité et de transparence.
            </p>

            <!-- Mission -->
            <div class="mb-12">
              <h2 class="text-2xl font-semibold text-blue-600 mb-2">💡 Notre mission</h2>
              <p class="text-gray-700">
                Offrir une plateforme d’abonnement où <strong>chaque utilisateur se sent respecté, écouté et sécurisé</strong>,
                que ce soit pour accéder à du contenu, à des fonctionnalités premium, ou à des services personnalisés.
                <br /><br />
                Nous ne vendons pas des produits.<br />
                <strong class="text-blue-700">Nous construisons des relations.</strong>
              </p>
            </div>

            <!-- Qui sommes-nous -->
            <div class="mb-12">
              <h2 class="text-2xl font-semibold text-blue-600 mb-2">👥 Qui sommes-nous ?</h2>
              <p class="text-gray-700">
                NovaAccess, c’est une équipe passionnée de <strong>développeurs, créateurs et conseillers</strong>, qui mettent la
                <strong>technologie au service de l’humain</strong>. Basés entre innovation et proximité, nous travaillons chaque jour pour :
              </p>
              <ul class="list-disc list-inside text-gray-700 mt-4 space-y-1">
                <li>Simplifier votre expérience d’abonnement</li>
                <li>Garantir une sécurité totale de vos données</li>
                <li>Vous accompagner avec un <strong>support réactif et chaleureux</strong></li>
                <li>Offrir des services toujours à la hauteur de vos attentes</li>
              </ul>
            </div>

            <!-- Confiance -->
            <div class="mb-12">
              <h2 class="text-2xl font-semibold text-blue-600 mb-2">🤝 Pourquoi nous faire confiance?</h2>
              <ul class="grid sm:grid-cols-2 gap-4 text-gray-700">
                <li class="bg-blue-50 p-4 rounded-lg shadow-sm">
                  ✅ <strong>Transparence totale</strong><br />Aucun frais caché, aucune surprise
                </li>
                <li class="bg-blue-50 p-4 rounded-lg shadow-sm">
                  🔒 <strong>Sécurité & confidentialité</strong><br />Données protégées selon les standards les plus stricts
                </li>
                <li class="bg-blue-50 p-4 rounded-lg shadow-sm">
                  💬 <strong>Support humain et réactif</strong><br />Par chat, email ou téléphone
                </li>
                <li class="bg-blue-50 p-4 rounded-lg shadow-sm">
                  📈 <strong>Engagement qualité</strong><br />Mises à jour régulières et écoute active de vos retours
                </li>
              </ul>
            </div>

            <!-- Témoignages -->
           
            <!-- Contact -->
            <div class="text-center">
              <p class="text-lg text-gray-700 mb-4">📩 Envie d’en savoir plus ?</p>
              <NuxtLink to="https://wa.me/+237699115314" class="inline-block bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition">
                Nous contacter
              </NuxtLink>
            </div>
          </div>
          
        </section>

          
          
          <AppNotification />
      </main>
    </div>

    <footer class="bg-gray-500 text-white py-6 text-center relative z-10">
      <div class="container mx-auto">
        <p>&copy; {{ new Date().getFullYear() }} <span class="text-white">Stream</span><span class="text-[#b62630]">Facile</span>. Tous droits réservés.</p>
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