import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const fuentesPdfStub = new URL('./src/lib/pdf-font-stubs.ts', import.meta.url).pathname

/* Build para el artifact: un solo bundle en formato IIFE.
   Un <script type="module"> inline no ejecuta dentro de un iframe
   sandboxeado con origen opaco, que es donde corre el artifact. */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: new URL('./src', import.meta.url).pathname },
      /* react-advanced-odontogram trae un "export a PDF" que nuestra UI no
         expone, con tres fuentes OpenType embebidas en base64 (~500-650KB
         cada una): árabe, chino y Roboto -esta última la que de verdad
         usaría el inglés, si esa función se llegara a llamar-. `claude.ai`
         rechaza compartir el artifact por "file type that can't be
         reviewed" con cualquiera de las tres adentro, así que se pisan las
         tres (no jsPDF/html2canvas enteros, para no mover más de lo
         necesario). Specifiers exactos, tal como los escribe el loader de
         la librería (ver loader-BN_gLe6T.js). */
      { find: './notoArabic-En58EmGw.js', replacement: fuentesPdfStub },
      { find: './notoSC-G1i3iX-D.js', replacement: fuentesPdfStub },
      { find: './roboto-Bywi16HJ.js', replacement: fuentesPdfStub },
    ],
  },
  build: {
    outDir: 'dist-single',
    rollupOptions: {
      output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'app.js' },
    },
  },
})
