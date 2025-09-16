/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './pages/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-datepicker/**/*.js',
  ],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
