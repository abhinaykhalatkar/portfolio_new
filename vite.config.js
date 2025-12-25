import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite static build config.
// If you deploy under a subpath (e.g. GitHub Pages), set `base` to that path.
export default defineConfig({
  plugins: [
    react({
      // CRA allows JSX in .js files; keep that behavior to avoid mass renames.
      include: ['**/*.jsx', '**/*.js', '**/*.tsx', '**/*.ts'],
    }),
  ],
  base: '/',
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    globals: true,
  },
  build: {
    outDir: 'build', // keep CRA-like output folder name to reduce deployment churn
  },
  server: {
    port: 3000,
    strictPort: true,
  },
});
