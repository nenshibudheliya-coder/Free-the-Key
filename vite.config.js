import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    viteSingleFile()
  ],
  server: {
    host: '0.0.0.0',
    port: 5175,
  },
  build: {
    target: 'esnext',
    cssMinify: true,
    assetsInlineLimit: 100000000, // Inline all assets
    chunkSizeWarningLimit: 100000000,
    rollupOptions: {
      output: {
        inlineDynamicImports: true, // Flatten dynamic imports into the single file
      },
    },
  },
})
