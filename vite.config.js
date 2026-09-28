import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative asset paths, so the built site works from any folder: a custom
  // domain root, or a sub-path like https://<user>.github.io/gamesmiths/.
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Libraries go in their own file, so editing the site's text doesn't
        // make returning visitors re-download React and the animation library.
        manualChunks(id) {
          if (/node_modules[\\/](react|react-dom|scheduler|motion|motion-dom|motion-utils|framer-motion)[\\/]/.test(id)) {
            return 'vendor'
          }
        },
      },
    },
  },
})
