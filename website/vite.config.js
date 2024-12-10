import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // This should be the default
  },
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.jpeg', '**/*.png', '**/*.svg'], // Add other image formats if needed
});
