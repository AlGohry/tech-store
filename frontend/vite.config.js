import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@Components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@Images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
      '@Styles': fileURLToPath(new URL('./src/assets', import.meta.url))
    }
  },
  plugins: [vue()],
})
