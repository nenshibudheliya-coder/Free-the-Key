import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5175,
  },
  build: {
    target: 'esnext',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Put libraries in a separate file
          }
          if (id.includes('free.jsx') || id.includes('LevelSelect.jsx')) {
            return 'game-core'; // Put game logic in its own chunk
          }
        },
      },
    },
  },
})
