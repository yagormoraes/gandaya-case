/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        matter: ['"Matter SQ"', 'sans-serif'],
        fira: ['"Fira Sans"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      colors: {
        'primary': '#232323',
        'secondary': '#D5FF5C'
      }
    },
  },
  plugins: [],
};