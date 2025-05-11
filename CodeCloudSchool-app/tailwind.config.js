/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // Add these for Electron compatibility:
    "./src/**/*.electron.{vue,js,ts}",
    "./electron/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
