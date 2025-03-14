import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Cambiar el puerto a 3000
    headers: {
      //'Cross-Origin-Opener-Policy': 'unsafe-none', // Permite la comunicación entre ventanas
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    },
  },
})
