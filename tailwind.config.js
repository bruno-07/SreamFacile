/** @type {import('tailwindcss').Config} */
module.exports = {
  // IMPORTANT: Assurez-vous que 'darkMode' est défini sur 'class'
  darkMode: 'class', 
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        darkblue: '#1a237e', // Définir votre couleur personnalisée si ce n'est pas déjà fait
      }
    },
  },
  plugins: [],
}