import { useLayoutEffect, useRef, useState, useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* Los flotantes recogidos (Patients y Confibot) viven en una columna pegada al borde derecho (Julián, 2026-10-27, tres
   capturas): por default las dos pestañas una abajo de la otra, y al abrir una, su hoja/card se despliega en la
   columna y empuja a la otra pestaña -Patients arriba, su card abajo, y Confibot abajo de todo; la hoja de Confibot
   queda entre las dos pestañas-. La columna se corre para arriba si no entra. Ver design-reference/figma/modulos/help.md. */
export function DockFlotantes({ baseY, children }: { baseY: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [alto, setAlto] = useState(0)
  const [vh, setVh] = useState(() => window.innerHeight)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setAlto(el.offsetHeight))
    ro.observe(el)
    setAlto(el.offsetHeight)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* El alto de la columna crece de a poco mientras se despliega un panel (ver PanelDock), así que `top` la sigue cuadro
     a cuadro y la columna sube suave en vez de pegar un salto. */
  const top = Math.max(8, Math.min(baseY, vh - 8 - alto))

  return (
    <div ref={ref} style={{ top }} className="pointer-events-none fixed right-0 z-[41] flex flex-col items-end gap-0.5">
      {children}
    </div>
  )
}

/* Un panel que se despliega dentro de la columna: crece en alto (y empuja lo que tiene abajo) mientras aparece, y al
   cerrar hace lo mismo al revés antes de desmontarse. */
export function PanelDock({ abierto, children }: { abierto: boolean; children: ReactNode }) {
  const [montado, setMontado] = useState(abierto)
  const [visible, setVisible] = useState(abierto)
  const [listo, setListo] = useState(abierto)

  useEffect(() => {
    if (abierto) {
      setMontado(true)
      const a = setTimeout(() => setVisible(true), 16)
      const b = setTimeout(() => setListo(true), 300)
      return () => { clearTimeout(a); clearTimeout(b) }
    }
    setListo(false)
    setVisible(false)
    const c = setTimeout(() => setMontado(false), 280)
    return () => clearTimeout(c)
  }, [abierto])

  if (!montado) return null
  return (
    <div
      className={cn(
        'pointer-events-auto grid w-full justify-items-end transition-[grid-template-rows,opacity] duration-[260ms] ease-out motion-reduce:transition-none',
        visible ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
      )}
    >
      <div className={cn('min-h-0', !listo && 'overflow-hidden')}>{children}</div>
    </div>
  )
}
