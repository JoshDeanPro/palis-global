import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8863,
    host: true,
    allowedHosts: ['palisglobal.com', 'www.palisglobal.com'],
    hmr: {
      clientPort: 443, 
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
