import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Garante funcionamento em subdiretórios e na raiz
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        institucional: resolve(process.cwd(), 'institucional.html'),
        retafinalenem: resolve(process.cwd(), 'retafinalenem/index.html'),
        enem: resolve(process.cwd(), 'enem-reta-final/index.html'),
      },
    },
  },
});
