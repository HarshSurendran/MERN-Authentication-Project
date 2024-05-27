/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        allura: ['Allura', 'cursive'],
        Oswald: ['Oswald', 'Sans'],
        Volkhov: ['Volkhov', 'cursive']
      },
      colors: {
        gold: '#cda016', 
      },
    },
  },
  plugins: [],
}