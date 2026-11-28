import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/* Un documento de las plantillas de PDF (src/pdfs) dentro del visor de documentos: la misma hoja HTML que recibe el
   backend y que abre View PDF, así lo que se lee es lo que se imprime. Va en un iframe (trae sus estilos) que toma el
   alto de su contenido; en pantallas angostas la hoja se acomoda al ancho en lugar de achicarse. Ver
   design-reference/figma/README.md › Hoja de documentos. */

const AJUSTE = \`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
<style>
html, body { overflow: hidden; }
@media screen {
  body { background: transparent; padding: 2px 2px 28px; }
  .hoja { width: auto; max-width: 210mm; min-height: 0; }
}
@media screen and (max-width: 640px) {
  .hoja { padding: 20px 16px 16px; }
  .membrete { flex-wrap: wrap; }
  .meta { text-align: left; }
  .resumen { grid-template-columns: 1fr 1fr; }
}
</style>\`

export function DocumentHtml({ html, title, className }: {
  /** La hoja completa (\`<!DOCTYPE html>…\`), ya con sus datos. */
  html: string
  /** Qué documento es, para el lector de pantalla. */
  title: string
  className?: string
}) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [alto, setAlto] = useState(1123)
  const documento = useMemo(() => html.replace('</head>', \`\${AJUSTE}</head>\`), [html])
  const medir = () => {
    const cuerpo = ref.current?.contentDocument?.body
    if (cuerpo) setAlto(Math.ceil(cuerpo.getBoundingClientRect().height))
  }
  /* Al cambiar el ancho, el texto se reacomoda y el alto es otro. */
  useEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(medir)
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return <iframe ref={ref} title={title} srcDoc={documento} sandbox="allow-same-origin" onLoad={medir} style={{ height: alto }} className={cn('block w-full border-0', className)} />
}
`})))()}export{n,i as r,r as t};