<template>
  
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Faites connaître la solution à vos proches et gagnez !</h2>
    

    <form @submit.prevent="submitReferral">
      <div class="mb-6 border-b pb-4">
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Vos informations</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="userName" class="block text-gray-700 text-sm font-bold mb-2">Votre Nom Complet:</label>
            <input
              type="text"
              id="userName"
              v-model="formData.nomUtilisateur"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label for="userPhone" class="block text-gray-700 text-sm font-bold mb-2">Votre Numéro de Téléphone (WhatsApp):</label>
            <input
              type="tel"
              id="userPhone"
              v-model="formData.numeroUtilisateur"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="+237XXXXXXXXX"
              required
            />
          </div>
        </div>
      </div>

      <div class="mb-6 border-b pb-4">
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Faites profiter vos proches (Nom et Numéro)</h3>
        <div v-for="(parraine, index) in formData.parraines" :key="index" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label :for="`parraineName-${index}`" class="block text-gray-700 text-sm font-bold mb-2">Nom du proche #{{ index + 1 }}:</label>
            <input
              type="text"
              :id="`parraineName-${index}`"
              v-model="parraine.nom"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="flex items-end gap-2">
            <div class="flex-grow">
              <label :for="`parrainePhone-${index}`" class="block text-gray-700 text-sm font-bold mb-2">Numéro du proche #{{ index + 1 }}:</label>
              <input
                type="tel"
                :id="`parrainePhone-${index}`"
                v-model="parraine.numero"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="+237XXXXXXXXX"
                required
              />
            </div>
            <button
              type="button"
              @click="removeParraine(index)"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-max"
              v-if="formData.parraines.length > 1"
            >
              -
            </button>
          </div>
        </div>
        <button
          type="button"
          @click="addParraine"
          class="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ajouter un autre proche
        </button>
      </div>
     

      <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-0,5xl text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        {{ errorMessage }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <button
          type="submit"
          class=" bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline text-sm transition-colors duration-200"
          :disabled="loading"
        >
          {{ loading ? 'Envoi en cours...' : 'Je partage et recois mes accès' }}
        </button>
        
          <button
          type="submit"
          class=" bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline text-sm transition-colors duration-200"
          :disabled="loading"
        >
         <a href="/"> revenir a la boutique</a>
        </button>
      </div>
    </form>

    <div>
     
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const API_BASE_URL = 'https://mighty-kindness-3674f7b18e.strapiapp.com'; // Assurez-vous que c'est la bonne URL de votre Strapi

const formData = ref({
  nomUtilisateur: '',
  numeroUtilisateur: '',
  parraines: [{ nom: '', numero: '' }] // Commence avec un champ parrainé
});

const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const whatsappLink = ref(''); // Pour stocker le lien WhatsApp généré

const addParraine = () => {
  formData.value.parraines.push({ nom: '', numero: '' });
};

const removeParraine = (index) => {
  formData.value.parraines.splice(index, 1);
};

const submitReferral = async () => {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';
  whatsappLink.value = '';

  try {
    // Nettoyage des parrainés vides
    const cleanedParraines = formData.value.parraines.filter(
      (p) => p.nom.trim() !== '' && p.numero.trim() !== ''
    );

    const payload = {
      data: {
        nomUtilisateur: formData.value.nomUtilisateur,
        numeroUtilisateur: formData.value.numeroUtilisateur,
        parraines: cleanedParraines, // Envoie la liste JSON nettoyée
      },
    };

    const response = await $fetch(`${API_BASE_URL}/api/parrainages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });

    successMessage.value = 'Vos informations de parrainage ont été envoyées avec succès !';
    
    // Génération du message WhatsApp personnalisé
    let parrainesList = '';
    if (cleanedParraines.length > 0) {
      parrainesList = cleanedParraines.map(p => p.nom).join(', ');
      parrainesList = `j'ai fait profiter ${parrainesList}`;
    }

    const whatsappText = encodeURIComponent(
      `Paiement finalisé. Veuillez m'envoyer mes coordonnées de connexion. ${parrainesList ? `De plus, ${parrainesList}.` : ''}`
    );
    // Remplacez 'VOTRE_NUMERO_WHATSAPP' par le numéro où vous souhaitez recevoir les messages
    whatsappLink.value = `https://wa.me/237682797039?text=${whatsappText}`;

    // Optionnel: Réinitialiser le formulaire après succès
    // formData.value = {
    //   nomUtilisateur: '',
    //   numeroUtilisateur: '',
    //   parraines: [{ nom: '', numero: '' }]
    // };

  } catch (error) {
    console.error('Erreur lors de l\'envoi du parrainage à Strapi:', error);
    errorMessage.value = `Erreur lors de l'envoi de vos informations: ${error.message || 'Veuillez réessayer.'}`;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Ajoutez des styles spécifiques au composant si nécessaire,
   ou assurez-vous que TailwindCSS est configuré pour vos classes. */
</style>