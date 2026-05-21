import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Use '' as the third parameter to load all env variables (including those without VITE_ prefix)
  const env = loadEnv(mode, process.cwd(), '');
  const targetUrl = env.VITE_API_URL || env.API_URL || 'http://localhost:5000';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: targetUrl,
          changeOrigin: true,
          secure: false,
        },
        "/uploads": {
          target: targetUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
