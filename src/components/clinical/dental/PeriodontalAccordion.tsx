import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/* El tab "Periodontal Status" trae las dos arcadas (1-16 y 32-17) puestas
   una abajo de la otra dentro de un mismo scroll: para ver la inferior hay
   que bajar más de 1000px. Julián pidió partirlo justo donde el número
   pasa de 16 a 32 -la frontera real entre arcadas- y volver cada mitad un
   desplegable, para que las dos entren sin ese scroll gigante.

   La grilla (`.perio-fullgrid-arch`) la arma la librería con DOM plano, no
   JSX (ver PerioChart.tsx del paquete): no hay prop para partirla, así que
   se sacan sus dos hijos del `.perio-fullgrid-scroll` y se reinsertan cada
   uno adentro de un cuerpo desplegable propio. Es la pieza real que se
   muda, no una copia: son ~330 celdas interactivas por arcada y clonarlas
   perdería sus listeners.

   Ver design-reference/figma/modulos/clinical-mode.md. */

const TITULOS = ['Maxillary', 'Mandibular']

/* Ancho fijo de la columna de rótulos ("Miller Class", "Buccal BOP"…) que
   la librería calcula sola y escribe inline (`ROW_LABEL_WIDTH = 220` en su
   código): sin ese ancho no queda lugar para las columnas de dientes. Se
   angosta pisando sólo el primer track de su propio `gridTemplateColumns`
   -las filas ya vienen preparadas para que el rótulo pase a dos líneas en
   vez de cortarse-. */
const ANCHO_ROTULO = 130

function angostarRotulo(arco: HTMLElement) {
  const aplicar = () => {
    const actual = arco.style.gridTemplateColumns
    const partes = actual.split(' ')
    if (!actual || partes[0] === `${ANCHO_ROTULO}px`) return
    partes[0] = `${ANCHO_ROTULO}px`
    arco.style.gridTemplateColumns = partes.join(' ')
  }
  aplicar()
  /* La librería reescribe este inline style en cada resize del panel
     (`applyArchColumns`); hay que volver a angostarlo cada vez que lo pisa.
     No hace falta debounce: `aplicar` no vuelve a escribir si ya está en
     130px, así que la propia mutación que dispara se apaga sola. */
  if (!arco.dataset.anchoObservado) {
    arco.dataset.anchoObservado = 'si'
    new MutationObserver(aplicar).observe(arco, { attributes: true, attributeFilter: ['style'] })
  }
}

export function PeriodontalAccordion({ raiz }: { raiz: HTMLElement | null }) {
  const [scroller, setScroller] = useState<HTMLElement | null>(null)
  const [arcos, setArcos] = useState<HTMLElement[]>([])
  const [abiertas, setAbiertas] = useState<Record<number, boolean>>({ 0: true })
  const cuerpos = useRef<(HTMLDivElement | null)[]>([])

  /* El tab se desmonta entero al cambiar a Odontogram/Diagnoses -no es un
     `display:none`-, así que cada vez que se vuelve a abrir aparece un
     `.perio-fullgrid-scroll` nuevo con sus arcadas de vuelta enteras.
     Se lo detecta por mutaciones en `raiz` y se reparte una única vez por
     montaje (marcado con `data-acordeon`). */
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
      if (encontrado.dataset.acordeon) return
      const hijos = [...encontrado.querySelectorAll<HTMLElement>(':scope > .perio-fullgrid-arch')]
      if (hijos.length !== 2) return
      encontrado.dataset.acordeon = 'si'
      encontrado.classList.add('perio-acordeon-raiz')
      hijos.forEach((h) => encontrado.removeChild(h))
      setScroller(encontrado)
      setArcos(hijos)
      setAbiertas({ 0: true })
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
     cuerpo desplegable en el mismo render en que se guardaron. */
  useEffect(() => {
    arcos.forEach((arco, i) => {
      const cuerpo = cuerpos.current[i]
      if (cuerpo && arco.parentElement !== cuerpo) cuerpo.appendChild(arco)
      angostarRotulo(arco)
    })
  }, [arcos])

  if (!scroller || arcos.length === 0) return null

  return createPortal(
    <>
      {arcos.map((_, i) => {
        const abierta = !!abiertas[i]
        return (
          <div key={i} className="perio-acordeon-seccion">
            <button
              type="button"
              aria-expanded={abierta}
              onClick={() => setAbiertas((p) => ({ ...p, [i]: !p[i] }))}
              className="perio-acordeon-cabecera"
            >
              <span>{TITULOS[i] ?? `Arch ${i + 1}`}</span>
              {abierta ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            </button>
            <div
              ref={(el) => { cuerpos.current[i] = el }}
              className={cn('perio-acordeon-cuerpo', !abierta && 'hidden')}
            />
          </div>
        )
      })}
    </>,
    scroller,
  )
}
