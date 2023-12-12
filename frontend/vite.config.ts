import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh()],
  server: {
    proxy: {
      "/api": {
        target: "http url",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      }
    }
  },
})
