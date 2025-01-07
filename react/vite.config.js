import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { rmSync } from 'fs';


export default defineConfig({
  plugins: [
    react(),
    // 在構建開始前清空 ../assets 文件夾
    {
      name: 'clear-assets',
      apply: 'build',
      buildStart() {
        rmSync('../assets', { recursive: true, force: true });
      },
    },
  ],
  server: {
    proxy: {
      '/php': {
        target: 'https://dbfinal.marimo.idv.tw', // 指向WAMP伺服器
        // target: 'https://localhost',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/php/, '/php'),
      },
      '/photo': {
        target: 'https://dbfinal.marimo.idv.tw', // 指向WAMP伺服器
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/photo/, '/photo'),
      },
    },
  },
  build: {
    // 構建於 ../
    outDir: '../',
    emptyOutDir: false,
  },
});
