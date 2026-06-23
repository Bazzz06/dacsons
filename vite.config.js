import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Force une seule copie de React (paper-design/shaders-react en embarque une autre).
    dedupe: ['react', 'react-dom'],
  },
  server: {
    host: true,
    port: 5180,
  },
})
