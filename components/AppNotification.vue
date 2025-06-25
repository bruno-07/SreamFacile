<template>
  <Transition name="fade">
    <div
      v-if="notificationStore.isVisible"
      :class="notificationClass"
      class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white font-semibold z-[9999] transition-all duration-300 ease-out"
    >
      {{ notificationStore.message }}
      <button @click="notificationStore.hideNotification" class="ml-4 text-white opacity-75 hover:opacity-100 focus:outline-none">
        &times;
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import { useNotificationStore } from '@/stores/notification';

const notificationStore = useNotificationStore();

const notificationClass = computed(() => {
  switch (notificationStore.type) {
    case 'success':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    case 'warning':
      return 'bg-yellow-500';
    case 'info':
    default:
      return 'bg-blue-500';
  }
});
</script>

<style scoped>
/* Vue Transition styles for fade effect */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>