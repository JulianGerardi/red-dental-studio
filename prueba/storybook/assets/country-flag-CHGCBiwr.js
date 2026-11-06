import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { cn } from '@/lib/utils'
import { paisDe } from '@/data/paises'

/* Bandera de un país, en SVG de country-flag-icons (los emoji de bandera no se ven en Windows: salen dos letras). Lo usan
   los Country Code (patients.md, 2026-11-04). Cada bandera es un archivo aparte (vite.config: no se incrustan en el JS)
   y se carga recién cuando se muestra. */
const URLS = import.meta.glob<string>('/node_modules/country-flag-icons/3x2/*.svg', { eager: true, query: '?url', import: 'default' })
const urlDe = (iso: string) => URLS[\`/node_modules/country-flag-icons/3x2/\${iso}.svg\`]

/** Decorativa: el código o el nombre van al lado en texto. Sin país conocido, no dibuja nada. */
export function CountryFlag({ opcion, className }: { opcion: string; className?: string }) {
  const iso = paisDe(opcion)?.iso
  const src = iso && urlDe(iso)
  if (!src) return null
  return <img src={src} alt="" loading="lazy" className={cn('h-3 w-[18px] shrink-0 rounded-[2px] object-cover ring-1 ring-line', className)} />
}
`})))()}export{n,i as r,r as t};