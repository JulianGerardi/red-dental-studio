import { useEffect } from 'react'
import { onStateChange } from 'react-advanced-odontogram'

/* El gráfico de dientes + curva de cada arcada mide 688x130 en su propio
   viewBox y la librería lo dibuja a `height:auto` -entra al 100% del ancho
   y el alto sale de esa proporción-, unos 195px. Era lo más alto de cada
   desplegable y lo que más obligaba a scrollear.

   No hay prop para bajarle el alto, así que se hace acá: se le saca el
   `preserveAspectRatio` por default ("meet", que ajusta por el lado que
   sobra y deja franjas vacías) y se lo fuerza a "none" para que el dibujo
   ESTIRE al alto nuevo usando el ancho entero -el diente y la curva quedan
   un poco más achatados, pero las columnas siguen alineadas con el resto
   de las filas, que es lo que hay que conservar-. El alto lo pone el CSS
   (`.perio-tooth-arch`); acá sólo se habilita que lo respete.

   Ver design-reference/figma/modulos/clinical-mode.md. */

function achicar(raiz: HTMLElement) {
  raiz.querySelectorAll<SVGSVGElement>('.perio-tooth-arch').forEach((svg) => {
    if (svg.getAttribute('preserveAspectRatio') !== 'none') svg.setAttribute('preserveAspectRatio', 'none')
  })
}

export function PerioGraficoAchicado({ raiz }: { raiz: HTMLElement | null }) {
  useEffect(() => {
    if (!raiz) return
    achicar(raiz)
    const baja = onStateChange(() => achicar(raiz))
    const observer = new MutationObserver(() => achicar(raiz))
    observer.observe(raiz, { childList: true, subtree: true })
    return () => {
      baja?.()
      observer.disconnect()
    }
  }, [raiz])

  return null
}
