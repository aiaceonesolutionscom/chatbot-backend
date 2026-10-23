import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: {
      plugins: []
    }
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/widget.ts',
      name: 'UniversalChatbot',
      fileName: () => 'widget.js',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        extend: true
      }
    },
    minify: 'esbuild',
    emptyOutDir: true
  }
});
