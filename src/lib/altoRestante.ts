import { useLayoutEffect, useState, type RefObject } from 'react'

/* El alto que queda desde el borde de arriba del elemento hasta el pie de la ventana, para que una pantalla entre sin
   scroll de página (dashboard.md, 2026-10-19). Se vuelve a medir al cambiar la ventana o lo que hay encima (el banner
   de avisos). Sin `activo` devuelve undefined y el elemento queda con su alto natural. */
export function useAltoRestante(
  ref: RefObject<HTMLElement | null>,
  activo: boolean,
  { abajo = 24, min = 420 }: { abajo?: number; min?: number } = {},
) {
  const [alto, setAlto] = useState<number>()
  useLayoutEffect(() => {
    const el = ref.current
    if (!activo || !el) { setAlto(undefined); return }
    const medir = () => {
      const arriba = el.getBoundingClientRect().top + window.scrollY
      setAlto(Math.max(min, Math.floor(window.innerHeight - arriba - abajo)))
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(document.body)
    window.addEventListener('resize', medir)
    return () => { ro.disconnect(); window.removeEventListener('resize', medir) }
  }, [ref, activo, abajo, min])
  return alto
}
