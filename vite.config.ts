import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
  /* Las banderas de los Country Code van como archivos aparte, no en el JS (ui/country-flag.tsx). */
  build: { assetsInlineLimit: (archivo: string) => (archivo.includes('country-flag-icons') ? false : undefined) },
})
