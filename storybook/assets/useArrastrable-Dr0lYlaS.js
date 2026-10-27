import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from 'react'

export type Posicion = { x: number; y: number }

/* Posición libre de un flotante (Confibot, currently being seen): se arrastra con mouse o touch (Pointer Events,
   cubre los dos) y se guarda en localStorage, así sobrevive a la navegación y a recargar la página. Siempre clampeada
   adentro de la ventana, con un margen chico; si la ventana se achica (resize) se recalcula para que no quede
   cortado afuera.

   Un movimiento menor a 5px cuenta como click, no arrastre: el mismo botón abre o se mueve según lo que se hizo,
   sin un modo "arrastre" aparte que haya que activar. El click real llega por \`onTap\` -no por un onClick del
   caller- para poder ignorarlo cuando el gesto fue arrastre (el click del navegador llega igual después del
   pointerup; se corta ahí, no desde el pointerup).

   Ver design-reference/figma/modulos/help.md (2026-10-26). */
export function useArrastrable({
  clave, ancho, alto, defecto, onTap,
}: {
  /** Clave de localStorage; cada flotante la suya. */
  clave: string
  /** Tamaño del elemento en su estado cerrado -con eso alcanza para no dejarlo cortado por un borde-. */
  ancho: number
  alto: number
  /** Posición de arranque si nunca se guardó ninguna, o no hay storage (se llama una sola vez). */
  defecto: () => Posicion
  /** El click real: abrir, colapsar, lo que sea. No se llama si el gesto fue un arrastre. */
  onTap?: () => void
}) {
  const margen = 8
  const clamp = useCallback((p: Posicion): Posicion => {
    const maxX = Math.max(margen, window.innerWidth - ancho - margen)
    const maxY = Math.max(margen, window.innerHeight - alto - margen)
    return { x: Math.min(Math.max(p.x, margen), maxX), y: Math.min(Math.max(p.y, margen), maxY) }
  }, [ancho, alto])

  /* Si ya había una posición guardada (se arrastró alguna vez) o recién se arrastra ahora: a partir de ahí sí se
     persiste. Mientras siga en el default, NO se escribe -si no, el primer montaje ya lo guardaba y de ahí en más
     \`defecto()\` nunca se volvía a llamar, ni siquiera en una página distinta con un \`defecto\` distinto (ej.: Confibot
     arriba del FAB de Scheduling, \`sobreFab\`): quedaba pegado a la posición del primer mount para siempre. */
  const huboGuardado = useRef(false)

  const [pos, setPos] = useState<Posicion>(() => {
    try {
      const raw = localStorage.getItem(clave)
      if (raw) {
        huboGuardado.current = true
        return clamp(JSON.parse(raw))
      }
    } catch { /* sin storage: arranca en el default de siempre */ }
    return clamp(defecto())
  })

  useEffect(() => {
    const onResize = () => setPos((p) => clamp(p))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [clamp])

  /* \`defecto()\` sólo se llama una vez, al armar el estado inicial -el valor de \`sobreFab\` (Confibot en Scheduling, se
     apila arriba del FAB de Appointment requests) llega recién después, por un useEffect de useFabDePagina en el
     componente de la página, no en el primer render-. Sin este efecto el botón quedaba pegado a la posición
     calculada con el \`sobreFab\` viejo (false) para siempre -tapaba el FAB-. Sólo corre mientras nunca se guardó nada
     -no pisa una posición ya arrastrada-. */
  useEffect(() => {
    if (huboGuardado.current) return
    setPos(clamp(defecto()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defecto])

  useEffect(() => {
    if (!huboGuardado.current) return
    try { localStorage.setItem(clave, JSON.stringify(pos)) } catch { /* sin storage: no persiste, no rompe nada */ }
  }, [pos, clave])

  const arrastrando = useRef(false)
  const movido = useRef(false)
  const inicio = useRef({ pointerX: 0, pointerY: 0, posX: 0, posY: 0 })

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    arrastrando.current = true
    movido.current = false
    inicio.current = { pointerX: e.clientX, pointerY: e.clientY, posX: pos.x, posY: pos.y }
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (!arrastrando.current) return
    const dx = e.clientX - inicio.current.pointerX
    const dy = e.clientY - inicio.current.pointerY
    if (!movido.current && Math.hypot(dx, dy) > 5) { movido.current = true; huboGuardado.current = true }
    if (!movido.current) return
    setPos(clamp({ x: inicio.current.posX + dx, y: inicio.current.posY + dy }))
  }

  const soltar = (e: ReactPointerEvent<HTMLElement>) => {
    arrastrando.current = false
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch { /* ya liberado (p.ej. pointercancel) */ }
  }

  const onClick = (e: ReactMouseEvent<HTMLElement>) => {
    if (movido.current) { e.preventDefault(); movido.current = false; return }
    onTap?.()
  }

  return {
    pos,
    handlers: {
      onPointerDown, onPointerMove, onPointerUp: soltar, onPointerCancel: soltar, onClick,
      style: { touchAction: 'none' as const },
    },
  }
}
`})))()}export{r as n,n as r,i as t};