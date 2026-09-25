import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useCallback, useEffect } from 'react'
import { onStateChange } from 'react-advanced-odontogram'

/* Las caras lingual/palatina de los anteriores, en los 12 cuadrados que la
   grilla dejaba vacíos.

   La fila oclusal no dibuja los seis anteriores de cada arcada -no tienen
   cara oclusal-, así que quedaban 12 celdas \`.placeholder\` en blanco. Ahí va
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
      /* Sin ids: duplicarlos rompería los \`getElementById\` de la librería.
         Antes de sacarlos, las caries/subcaries quedan marcadas con una
         clase propia -el rojo de \`odontogram-theme.css\` apunta a \`id\`, que
         acá ya no existe-. */
      copia.removeAttribute('id')
      copia.querySelectorAll('[id]').forEach((n) => {
        if (/^(caries|subcaries)-/.test(n.id)) n.classList.add('caries-clon')
        n.removeAttribute('id')
      })

      celda.replaceChildren(copia)
      celda.classList.add('cara-lingual')
      celda.setAttribute(MARCA, numero)
      /* Se le pone la clase \`active\` de la librería, no una propia: así
         estas celdas se marcan exactamente igual que cualquier otra cuando
         la pieza está seleccionada, sin duplicar estilos. */
      celda.classList.toggle('active', modelo.classList.contains('active'))

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

    /* La selección no pasa por \`onStateChange\`: es una clase en la celda.
       Se mira sólo \`class\` y se difiere con un frame, porque el observer
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
      raiz.querySelectorAll<HTMLElement>(\`[\${MARCA}]\`).forEach((celda) => {
        celda.replaceChildren()
        celda.classList.remove('cara-lingual', 'active')
        celda.removeAttribute(MARCA)
        delete celda.dataset.caraLista
      })
    }
  }, [raiz, sincronizar])

  return null
}
`})))()}export{n,i as r,r as t};