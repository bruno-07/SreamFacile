// stores/notification.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
  const message = ref('');
  const type = ref('info'); // 'success', 'error', 'warning', 'info'
  const isVisible = ref(false);
  const timeoutId = ref(null); // To clear previous timeouts

  const showNotification = (msg, msgType = 'info', duration = 3000) => {
    // Clear any existing timeout to prevent overlapping notifications
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
    }

    message.value = msg;
    type.value = msgType;
    isVisible.value = true;

    timeoutId.value = setTimeout(() => {
      hideNotification();
    }, duration);
  };

  const hideNotification = () => {
    isVisible.value = false;
    message.value = ''; // Clear message after hiding
    type.value = 'info'; // Reset type
    timeoutId.value = null;
  };

  return {
    message,
    type,
    isVisible,
    showNotification,
    hideNotification,
  };
});