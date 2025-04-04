import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    historyApiFallback: true, 
  },
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
})
