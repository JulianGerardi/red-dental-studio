import { useCallback, useEffect } from 'react'
import { onStateChange } from 'react-advanced-odontogram'

/* Las caras lingual/palatina de los anteriores, en los 12 cuadrados que la
   grilla dejaba vacíos.

   La fila oclusal no dibuja los seis anteriores de cada arcada -no tienen
   cara oclusal-, así que quedaban 12 celdas `.placeholder` en blanco. Ahí va
   la otra cara del diente: la **misma pieza dibujada arriba**, en chico, y
   clickeable para poder cargarle condiciones como a cualquier otra.

   Es una copia del SVG que ya dibuja la librería, no un dibujo aparte: así
   no se despega del original ni hay dos versiones del mismo diente que
   mantener. Se vuelve a copiar cuando la librería avisa que cambió algo.
   Ver design-reference/figma/modulos/clinical-mode.md. */

const MARCA = 'data-cara-de'

export function CarasLinguales({ raiz }: { raiz: HTMLElement | null }) {
  const sincronizar = useCallback(() => {
    const grid = raiz?.querySelector<HTMLElement>('#toothGrid')
    if (!grid) return

    const oclusales = [...grid.querySelectorAll<HTMLElement>('.tooth-tile.occl-view')]
    const laterales = [...grid.querySelectorAll<HTMLElement>('.tooth-tile.side-view')]
    if (oclusales.length !== laterales.length) return

    oclusales.forEach((celda, i) => {
      if (!celda.classList.contains('placeholder')) return
      const modelo = laterales[i]
      const original = modelo?.querySelector('svg')
      const numero = modelo?.getAttribute('data-tooth')
      if (!original || !numero) return

      const copia = original.cloneNode(true) as SVGElement
      /* Sin ids: duplicarlos rompería los `getElementById` de la librería. */
      copia.removeAttribute('id')
      copia.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'))

      celda.replaceChildren(copia)
      celda.classList.add('cara-lingual')
      celda.setAttribute(MARCA, numero)
      /* Sigue el estado de selección de su pieza. */
      celda.classList.toggle('esta-activa', modelo.classList.contains('active'))

      if (!celda.dataset.caraLista) {
        celda.dataset.caraLista = 'si'
        /* Clickearla selecciona la pieza, así se le cargan condiciones desde
           el panel igual que tocándola arriba. */
        celda.addEventListener('click', () => modelo.click())
      }
    })
  }, [raiz])

  useEffect(() => {
    if (!raiz) return
    sincronizar()

    /* Redibujar con los avisos de la propia librería. */
    const baja = onStateChange(() => sincronizar())

    /* La selección no pasa por `onStateChange`: es una clase en la celda.
       Se mira sólo `class` y se difiere con un frame, porque el observer
       también ve los cambios que hacemos nosotros. */
    let pedido = 0
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(pedido)
      pedido = requestAnimationFrame(() => sincronizar())
    })
    observer.observe(raiz, { subtree: true, attributes: true, attributeFilter: ['class'] })

    return () => {
      baja?.()
      cancelAnimationFrame(pedido)
      observer.disconnect()
      raiz.querySelectorAll<HTMLElement>(`[${MARCA}]`).forEach((celda) => {
        celda.replaceChildren()
        celda.classList.remove('cara-lingual', 'esta-activa')
        celda.removeAttribute(MARCA)
        delete celda.dataset.caraLista
      })
    }
  }, [raiz, sincronizar])

  return null
}
