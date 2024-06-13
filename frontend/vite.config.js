import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ClosePlugin from './vite-plugin-close.js'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api' :  {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    },
  }
})
