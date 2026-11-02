import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Garante funcionamento em subdiretórios no GitHub Pages
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        retafinalenem: resolve(process.cwd(), 'retafinalenem/index.html'),
        enem: resolve(process.cwd(), 'enem-reta-final/index.html'),
      },
    },
  },
});
