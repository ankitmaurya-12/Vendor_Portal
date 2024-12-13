import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/sap': {
        target: 'http://123.108.38.73:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/sap/, '/sap')
      },
      '/api': {
        target: 'https://ffbe0cc5trial.it-cpitrial06-rt.cfapps.us10-001.hana.ondemand.com', // SAP CPI endpoint
        changeOrigin: true, // Avoid host-related issues
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' from the request
        secure: false, // Allow self-signed certificates (if applicable)
    }
  }
  
  }
})
