import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useLayoutEffect, useRef, useState } from 'react'
import { Monitor, Smartphone, Tablet } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Cómo se ve un componente en cada dispositivo: la misma historia dibujada
   en un iframe del ancho real del dispositivo (390, 768 o 1280px), escalada
   para entrar en la página. Es la historia de verdad, no una captura: se puede
   usar adentro. */

const DISPOSITIVOS = [
  { id: 'phone', nombre: 'Phone', ancho: 390, alto: 760, icono: Smartphone },
  { id: 'tablet', nombre: 'Tablet', ancho: 768, alto: 900, icono: Tablet },
  { id: 'desktop', nombre: 'Desktop', ancho: 1280, alto: 800, icono: Monitor },
] as const

export function Dispositivos({ storyId, alto }: { storyId: string; alto?: number }) {
  const [actual, setActual] = useState<(typeof DISPOSITIVOS)[number]['id']>('phone')
  const caja = useRef<HTMLDivElement>(null)
  const [disponible, setDisponible] = useState(800)
  useLayoutEffect(() => {
    const el = caja.current
    if (!el) return
    const medir = () => setDisponible(el.clientWidth)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const d = DISPOSITIVOS.find((x) => x.id === actual)!
  const h = alto ?? d.alto
  const escala = Math.min(1, disponible / d.ancho)
  return (
    <div className="font-sans">
      <div role="tablist" aria-label="Device" className="inline-flex items-center gap-1 rounded-lg bg-surface-slate p-1">
        {DISPOSITIVOS.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={actual === x.id}
            onClick={() => setActual(x.id)}
            className={cn('flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium', actual === x.id ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft')}
          >
            <x.icono className="size-3.5" /> {x.nombre} <span className="opacity-70">{x.ancho}px</span>
          </button>
        ))}
      </div>
      <div ref={caja} className="mt-3 w-full">
        <div className="mx-auto overflow-hidden rounded-xl border border-line-row bg-page-background shadow-sm" style={{ width: d.ancho * escala, height: h * escala }}>
          <iframe
            key={\`\${storyId}-\${actual}\`}
            title={\`\${d.nombre} preview\`}
            src={\`iframe.html?id=\${storyId}&viewMode=story\`}
            loading="lazy"
            style={{ width: d.ancho, height: h, border: 0, transform: \`scale(\${escala})\`, transformOrigin: 'top left' }}
          />
        </div>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};