import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy for the SAP OData service
      "/sap": {
        target: "http://rmdevapp.remsons.com:8000", // Target server
        changeOrigin: true, // Changes the origin of the request to the target URL
        secure: false, // Disable SSL verification for HTTPS
        rewrite: (path) => path.replace(/^\/sap/, "/sap"), // Keeps '/sap' in the URL
        configure: (proxy, options) => {
          // Add custom headers if needed
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("Origin", "http://rmdevapp.remsons.com:8000");
          });
        },
      },
      "/api": {
        target:
          "https://ffbe0cc5trial.it-cpitrial06-rt.cfapps.us10-001.hana.ondemand.com", // SAP CPI endpoint
        changeOrigin: true, // Avoid host-related issues
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' from the request
        secure: false, // Allow self-signed certificates (if applicable)
      },
    },
  },
});
