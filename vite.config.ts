import { resolve } from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    tailwindcss(),
    solidPlugin()
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        demo: resolve(__dirname, 'pages/demo.html'),
        calendar: resolve(__dirname, 'pages/calendar.html'),
        repl: resolve(__dirname, 'pages/repl.html')
      }
    }
  }
});
