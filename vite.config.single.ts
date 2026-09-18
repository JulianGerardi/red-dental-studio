import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* Build para el artifact: un solo bundle en formato IIFE.
   Un <script type="module"> inline no ejecuta dentro de un iframe
   sandboxeado con origen opaco, que es donde corre el artifact. */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      /* Ver src/lib/jspdf-stub.ts: saca del bundle del artifact un "export a
         PDF" de react-advanced-odontogram que no usamos -jsPDF + html2canvas
         + fuentes Noto Arabic/SC, ~1.4MB-, que además es lo que bloquea el
         share público del artifact. */
      jspdf: new URL('./src/lib/jspdf-stub.ts', import.meta.url).pathname,
    },
  },
  build: {
    outDir: 'dist-single',
    rollupOptions: {
      output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'app.js' },
    },
  },
})
