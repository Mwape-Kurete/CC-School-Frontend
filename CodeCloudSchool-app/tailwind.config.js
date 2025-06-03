/** @type {import('tailwindcss').Config} */
module.exports = {
  important: "#app",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts}", // PrimeVue components
    // Add these for Electron compatibility:
    "./src/**/*.electron.{vue,js,ts}",
    "./electron/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
