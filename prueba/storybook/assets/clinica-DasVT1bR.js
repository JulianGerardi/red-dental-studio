import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { DocumentClinic } from '@/components/ui/document-sheet'

/* La clínica de todos los documentos (membrete de la hoja y del PDF). Datos de la clinical note de red.dev. */
export const CLINICA = {
  nombre: 'Red Dental Studio', sede: 'Abril',
  direccion: 'Aroser Allee 97, 5 B, Berlin, 13407, C, AR', contacto: '+54 312321322 · abril@gmail.com',
}

export const MEMBRETE: DocumentClinic = {
  initials: 'RD',
  name: CLINICA.nombre,
  detail: \`\${CLINICA.sede} · \${CLINICA.direccion}\\n\${CLINICA.contacto}\`,
}
`})))()}export{n,i as r,r as t};