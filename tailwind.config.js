/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'class' or false if you don't want dark mode
  theme: {
    extend: {
      margin: {
        '15': '8rem', // Custom value for margin-top
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

