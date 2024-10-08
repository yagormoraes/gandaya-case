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
        paytone: ['"Paytone One"', 'sans-serif'],
      },
      colors: {
        'primary': '#232323',
        'primary-light': '#656565',
        'primary-lightest': '#A3A3A3',
        'secondary': '#D5FF5C'
      }
    },
  },
  plugins: [],
};
