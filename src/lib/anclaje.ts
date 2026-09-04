import { useLayoutEffect, useState, type RefObject } from 'react'

/* Los popovers anclados se dibujaban a la altura de la card. Si la card estaba
   abajo de todo, el panel quedaba fuera de la pantalla y había que scrollear
   para leerlo. Acá se mide el panel ya montado y se lo corre hacia arriba lo
   justo para que entre entero, sin despegarlo de su card.

   Devuelve coordenadas de DOCUMENTO: con position:absolute el panel acompaña
   el scroll y no se separa de la card. */
export function useAnclaje(
  ref: RefObject<HTMLElement | null>,
  anchor: DOMRect,
  anchoMax: number,
  { gap = 10, margen = 12 }: { gap?: number; margen?: number } = {},
) {
  const ancho = Math.min(anchoMax, window.innerWidth - margen * 2)
  const [top, setTop] = useState(() => anchor.top + window.scrollY)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const alto = el.offsetHeight
    const disponible = window.innerHeight - margen * 2
    /* Si no entra ni corriéndolo, se pega al borde de arriba y scrollea solo. */
    const arriba = alto > disponible
      ? margen
      : Math.min(Math.max(anchor.top, margen), window.innerHeight - alto - margen)
    setTop(arriba + window.scrollY)
  }, [ref, anchor.top, margen])

  const cabeDerecha = anchor.right + gap + ancho <= window.innerWidth
  const cabeIzquierda = anchor.left - gap - ancho >= margen
  const bruto = cabeDerecha
    ? anchor.right + gap
    : cabeIzquierda
      ? anchor.left - gap - ancho
      : (window.innerWidth - ancho) / 2
  const left = Math.max(margen, Math.min(bruto, window.innerWidth - ancho - margen)) + window.scrollX

  return { left, top, ancho }
}
