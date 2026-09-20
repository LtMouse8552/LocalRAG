import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 默认仅本地运行，不暴露公网
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
})
