/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        '15': '8rem', // Giá trị tùy chỉnh cho margin-top
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
