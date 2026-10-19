import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 监听 0.0.0.0，允许外部（NATAPP 等）访问
    allowedHosts: true, // 允许通过隧道域名访问，避免 "Blocked request"
  },
})
