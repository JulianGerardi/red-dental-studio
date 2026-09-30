import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

/* El tab "Periodontal Status" trae las dos arcadas (1-16 y 32-17) puestas
   una abajo de la otra dentro de un mismo scroll: para ver la inferior hay
   que bajar más de 1000px. Primero se probó con dos desplegables, pero
   Julián pidió tabs -Maxillary/Mandibular- para no tener que scrollear ni
   para cambiar de arcada ni dentro de ella.

   La grilla (`.perio-fullgrid-arch`) la arma la librería con DOM plano, no
   JSX (ver PerioChart.tsx del paquete): no hay prop para partirla, así que
   se sacan sus dos hijos del `.perio-fullgrid-scroll` y se reinsertan cada
   uno adentro de su propio panel de tab. Es la pieza real que se muda, no
   una copia: son ~330 celdas interactivas por arcada y clonarlas perdería
   sus listeners.

   Ver design-reference/figma/modulos/clinical-mode.md. */

const TITULOS = ['Maxillary', 'Mandibular']

/* Ancho de la columna de rótulos ("Miller Class", "Buccal BOP"…) y ancho de
   las columnas de dientes: van inline en el `gridTemplateColumns` de la
   arcada, que la librería recalcula sola (`ROW_LABEL_WIDTH = 220` en su
   código) pero SIN reaccionar a cambios de tamaño del contenedor -se
   probó angostar el `.perio-fullgrid-scroll` y no vuelve a correr el
   ajuste, ni con `max-width` ni con un resize real de ventana-, así que
   hay que pisarlo.

   Las columnas de dientes pasan a `fr` en vez de un px fijo: así rellenan
   TODO el ancho disponible del panel -el `max-width` de
   `.perio-tabs-cuerpo`, en el CSS- en vez de quedarse en un tamaño fijo
   que en una pantalla más ancha deja un hueco vacío a la derecha, o en una
   más angosta obliga a scrollear. Angostar el panel de paso es lo que
   también achica el gráfico de dientes+curva sin deformarlo: esa fila
   comparte la MISMA grilla, y su SVG mide `width:100%; height:auto` -el
   alto sale solo de un ancho más chico, manteniendo la proporción real del
   diente-. */
const ANCHO_ROTULO = 130

function ajustarColumnas(arco: HTMLElement) {
  const aplicar = () => {
    const actual = arco.style.gridTemplateColumns
    if (!actual) return
    if (actual === arco.dataset.columnasPropias) return
    const partes = actual.split(' ')
    /* `minmax(0, Nfr)`, no `Nfr` a secas: un track `fr` sin mínimo explícito
       vale `minmax(auto, Nfr)` -su "auto" es el min-content del contenido
       más ancho de esa columna en CUALQUIER fila-, así que con checkboxes o
       números que no quieren achicarse más de cierto punto la grilla
       "explota" mucho más ancha que el contenedor en vez de repartir el
       espacio de verdad. Con el mínimo en 0 el reparto es proporcional
       siempre, sin ese piso. */
    const nuevas = [
      `${ANCHO_ROTULO}px`,
      ...partes.slice(1).map((p) => `minmax(0, ${parseFloat(p).toFixed(2)}fr)`),
    ].join(' ')
    arco.style.gridTemplateColumns = nuevas
    arco.dataset.columnasPropias = nuevas
  }
  aplicar()
  /* Se reaplica ante cualquier mutación de estilo -por si la librería
     alguna vez vuelve a escribir el suyo-, pero no hace falta debounce:
     `aplicar` no reescribe si el valor ya es el propio, así que la mutación
     que dispara se apaga sola. */
  if (!arco.dataset.columnasObservadas) {
    arco.dataset.columnasObservadas = 'si'
    new MutationObserver(aplicar).observe(arco, { attributes: true, attributeFilter: ['style'] })
  }
}

export function PeriodontalTabs({ raiz }: { raiz: HTMLElement | null }) {
  const [scroller, setScroller] = useState<HTMLElement | null>(null)
  const [arcos, setArcos] = useState<HTMLElement[]>([])
  const [activa, setActiva] = useState(0)
  const cuerpos = useRef<(HTMLDivElement | null)[]>([])

  /* El tab se desmonta entero al cambiar a Odontogram/Diagnoses -no es un
     `display:none`-, así que cada vez que se vuelve a abrir aparece un
     `.perio-fullgrid-scroll` nuevo con sus arcadas de vuelta enteras.
     Se lo detecta por mutaciones en `raiz` y se reparte una única vez por
     montaje (marcado con `data-tabs`). */
  useEffect(() => {
    if (!raiz) return
    let pedido = 0
    const revisar = () => {
      const encontrado = raiz.querySelector<HTMLElement>('.perio-fullgrid-scroll')
      if (!encontrado) {
        setScroller(null)
        setArcos([])
        return
      }
      if (encontrado.dataset.tabs) return
      const hijos = [...encontrado.querySelectorAll<HTMLElement>(':scope > .perio-fullgrid-arch')]
      if (hijos.length !== 2) return
      encontrado.dataset.tabs = 'si'
      encontrado.classList.add('perio-tabs-raiz')
      hijos.forEach((h) => encontrado.removeChild(h))
      setScroller(encontrado)
      setArcos(hijos)
      setActiva(0)
    }
    revisar()
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(pedido)
      pedido = requestAnimationFrame(revisar)
    })
    observer.observe(raiz, { childList: true, subtree: true })
    return () => {
      cancelAnimationFrame(pedido)
      observer.disconnect()
    }
  }, [raiz])

  /* Recién acá los arcos ya tienen dónde ir: React montó los `div` de cada
     panel en el mismo render en que se guardaron. */
  useEffect(() => {
    arcos.forEach((arco, i) => {
      const cuerpo = cuerpos.current[i]
      if (cuerpo && arco.parentElement !== cuerpo) cuerpo.appendChild(arco)
      ajustarColumnas(arco)
    })
  }, [arcos])

  if (!scroller || arcos.length === 0) return null

  return createPortal(
    <>
      <div className="perio-tabs-cabecera">
        {arcos.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-selected={activa === i}
            onClick={() => setActiva(i)}
            className={cn(
              'perio-tabs-boton',
              activa === i ? 'perio-tabs-boton-activo' : 'perio-tabs-boton-inactivo',
            )}
          >
            {TITULOS[i] ?? `Arch ${i + 1}`}
          </button>
        ))}
      </div>
      {arcos.map((_, i) => (
        <div
          key={i}
          ref={(el) => { cuerpos.current[i] = el }}
          className={cn('perio-tabs-cuerpo', activa !== i && 'hidden')}
        />
      ))}
    </>,
    scroller,
  )
}
