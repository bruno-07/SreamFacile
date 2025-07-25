<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full text-center">
      <h1 class="text-4xl font-bold text-green-600 mb-6">Félicitations !</h1>
      <p class="text-lg text-gray-800 mb-4">
        Votre abonnement a été traité avec succès.
      </p>
      <p class="text-xl font-semibold text-gray-700 mb-8">
        contactez-nous pour vos identifients de connexion
      </p>
       <a
          type="submit"
          class=" bg-green-600 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline text-sm transition-colors duration-200"
          :disabled="loading"
          :href="whatsappLink"
        >
        
          <i class="fab fa-whatsapp text-xl mr-1.5" ></i>Whatsapp
        </a>

      <div class="border-t border-gray-200 pt-6 mt-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Vous ne voyez pas vos identifiants ?
        </h2>
        <p class="text-md text-gray-700 mb-6">
          Si vous ne recevez pas vos coordonnées de connexion dans les 5 minutes,
          
          <a href="https://Wa.me/237682797039" class="text-blue-600 hover:underline font-medium">contacter notre service client</a>.
        </p>
      </div>

      <div>
      <ReferralForm />
      </div>

      <div class="border-t border-gray-200 pt-6 mt-6 bg-yellow-50 p-6 rounded-lg">
        <h2 class="text-2xl font-bold text-yellow-800 mb-4">
          Offre Spéciale Parrainage !
        </h2>
        <p class="text-lg text-yellow-700 font-medium">
          Parrainez 3 clients qui s'abonnent et recevez un abonnement GRATUIT pour vous !
        </p>
        <p class="text-sm text-yellow-600 mt-2">
          (Veuillez vous assurer que les personnes recommandées mentionnent votre nom lors de leur inscription)
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import ReferralForm from '../components/ReferralForm.vue';

const whatsappLink = computed(() => {
  const phoneNumber = '237682797039';
  const message = "Paiement finalisé. Veuillez m'envoyer mes coordonnées de connexion.";
  return `https://wa.me/${phoneNumber}?text=${message}`;
});
</script>

<style scoped>
/* Pas besoin de styles personnalisés si TailwindCSS est bien configuré */
</style>