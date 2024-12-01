import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@react-spring/web',
      'framer-motion',
      'lucide-react',
      'wagmi',
      'viem',
      '@web3modal/wagmi',
      'react-router-dom'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true,
    port: 5173
  }
});