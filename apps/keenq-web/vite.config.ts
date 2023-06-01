// import preact from '@preact/preset-vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react({
    jsxRuntime: "classic",
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@preact/signals': '@preact/signals-react',
      // react: 'preact/compat',
      // 'react-dom': 'preact/compat'
    }
  }
})
