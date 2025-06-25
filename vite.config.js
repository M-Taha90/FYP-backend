import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Add your proxy configuration here
      '/api': {
        target: 'http://localhost:4000', // Replace with your backend URL
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: if you want to remove '/api' from the request URL
      }
    }
  }
})
