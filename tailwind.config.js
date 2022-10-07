/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './pages/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-datepicker/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
