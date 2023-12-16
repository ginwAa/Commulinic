import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "http://172.27.16.1:8081",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      }
    }
  },
})
