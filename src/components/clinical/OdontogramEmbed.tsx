import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, TriangleAlert, X } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
import { OdontogramShell, clearSelection, type OdontogramThemeConfig } from 'react-advanced-odontogram'
import { cn } from '@/lib/utils'
import { OdontogramPanel } from '@/components/clinical/dental/OdontogramPanel'
import { ToothInfoTrigger } from '@/components/clinical/dental/ToothInfoTrigger'
import { CarasLinguales } from '@/components/clinical/dental/CarasLinguales'
import { PeriodontalTabs } from '@/components/clinical/dental/PeriodontalTabs'
import { PerioPdArrastre } from '@/components/clinical/dental/PerioPdArrastre'
import '@/styles/odontogram-scoped.css'
import '@/styles/odontogram-theme.css'

/* El odontograma de react-advanced-odontogram (MIT, (c) Zoltán Dul —
   github.com/ZoliQua/React-Odontogram-Modul), que es el que pidió Julián,
   embebido con la paleta de este sistema.

   Dos cosas que hay que saber:
   - Su CSS es el de una app entera (trae `*`, `body`, `.btn`, `.card`), así
     que no se importa el del paquete sino la copia acotada a `.odonto-embed`
     que genera `scripts/scope-odontogram-css.mjs`.
   - La librería resuelve sus controles con `document.getElementById`, así
     que no puede haber dos instancias montadas a la vez.

   Ver design-reference/figma/modulos/clinical-mode.md. */

const COLORES = {
  background: '#ffffff',
  panel: '#ffffff',
  card: '#ffffff',
  text: '#09090b',
  muted: '#71717a',
  line: '#e4e4e7',
  accent: '#1d56bc',
  accent2: '#1a804d',
}

const TEMA: OdontogramThemeConfig = { colors: COLORES }

/* `themeConfig` sólo alcanza al nodo interno de la librería, pero el CSS
   acotado define `--text: var(--odon-text, ...)` en `.odonto-embed` -este
   wrapper-, que está más arriba: las variables no llegaban y quedaban los
   colores de fábrica. Se declaran también acá, que es donde se leen. */
const VARIABLES = {
  '--odon-bg': COLORES.background,
  '--odon-panel': COLORES.panel,
  '--odon-card': COLORES.card,
  '--odon-text': COLORES.text,
  '--odon-muted': COLORES.muted,
  '--odon-line': COLORES.line,
  '--odon-accent': COLORES.accent,
  '--odon-accent2': COLORES.accent2,
} as React.CSSProperties

type Paso = { titulo: string; nodo: HTMLElement }

/* El `.card-title` trae adentro los botones de la card (el "−" de plegar,
   el "Reset" de Tooth details): sin sacarlos el paso se llama
   "Statuses−" o "Tooth detailsReset". */
function tituloDe(nodo: HTMLElement, porDefecto: string) {
  const cabecera = nodo.querySelector('.card-title')
  if (!cabecera) return porDefecto
  const texto = [...cabecera.childNodes]
    .filter((n) => !(n instanceof HTMLElement && n.tagName === 'BUTTON'))
    .map((n) => n.textContent ?? '')
    .join('')
    .trim()
  return texto || porDefecto
}

export function OdontogramEmbed({
  controlesAbiertos, onCerrarControles,
}: {
  /** Controls, Statuses, Tooth details, Orthodontics, Caries y Diagnoses
      viven en un panel flotante que abre el FAB del examen, y se recorren
      de a uno: así el gráfico queda entero a la vista y el panel no empuja
      nada. "Tooth information" va aparte, en `ToothInfoTrigger`. */
  controlesAbiertos: boolean
  onCerrarControles: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pasos, setPasos] = useState<Paso[]>([])
  const [infoNodo, setInfoNodo] = useState<HTMLElement | null>(null)
  const [accionesNodo, setAccionesNodo] = useState<HTMLElement | null>(null)
  const [paso, setPaso] = useState(0)
  /* Minimizado deja sólo la barra: el gráfico se ve entero sin cerrar nada. */
  const [minimizado, setMinimizado] = useState(false)
  const [confirmandoCierre, setConfirmandoCierre] = useState(false)
  const [reinicio, setReinicio] = useState(0)
  /* Pasos en los que se cambió algo: el resto queda como pendiente. */
  const [tocados, setTocados] = useState<string[]>([])

  /* La cruz descarta: vuelve el odontograma al default. Para guardar lo
     hecho y sacar los controles de en medio está el minimizar. Se apoya en
     el "Reset mouth" de la librería, que es quien sabe cuál es el default,
     y en su `clearSelection()`, porque si no las piezas quedan elegidas. */
  const descartarYCerrar = () => {
    ref.current?.querySelector<HTMLButtonElement>('#btnResetAll')?.click()
    clearSelection()
    setPaso(0)
    setTocados([])
    /* Remonta el panel: así se olvida qué botón estaba marcado. */
    setReinicio((n) => n + 1)
    onCerrarControles()
  }

  /* Las secciones son las cards que dibuja la librería. "Tooth information"
     ya no es una más: se lee aparte (`infoNodo`) para el ícono propio
     (`ToothInfoTrigger`), que se porta adentro de `.chart-actions` -la fila
     de botones de la propia librería (vista oclusal, cordales, hueso,
     pulpa, limpiar selección)-, así que también se relee ese contenedor.
     Se releen porque la librería monta y desmonta cards según la pieza
     activa -Orthodontics, por ejemplo, sólo aparece en piezas elegibles- y
     porque `.chart-actions` sólo existe en la vista Odontogram, no en
     Periodontal Status ni Diagnoses. */
  const releer = useCallback(() => {
    const raiz = ref.current
    if (!raiz) return
    const cabecera = raiz.querySelector<HTMLElement>('.panel-header')
    const cards = [...raiz.querySelectorAll<HTMLElement>('.panel-body > .card, .panel-body > div > .card')]
    /* La cabecera -selección de piezas- es un paso más: dejarla siempre
       visible hacía el flotante el doble de alto. */
    const lista: Paso[] = cabecera ? [{ titulo: 'Controls', nodo: cabecera }] : []
    cards.forEach((nodo) => lista.push({ titulo: tituloDe(nodo, 'Details'), nodo }))
    setPasos((previos) =>
      previos.length === lista.length && previos.every((p, i) => p.nodo === lista[i].nodo) ? previos : lista,
    )
    const info = raiz.querySelector<HTMLElement>('.tooth-info')
    setInfoNodo((previo) => (previo === info ? previo : info))
    const acciones = raiz.querySelector<HTMLElement>('.chart-actions')
    setAccionesNodo((previo) => (previo === acciones ? previo : acciones))
  }, [])

  /* Varias filas de la librería quedan sin contenido según la pieza
     activa: siguen ocupando su celda de la grilla y dejaban la card llena
     de huecos. Se miden y se colapsan; primero se limpia la marca para que
     una fila que vuelve a tener contenido reaparezca. */
  const colapsarVacias = useCallback((nodo: HTMLElement) => {
    const hijos = [...nodo.children] as HTMLElement[]
    hijos.forEach((h) => h.classList.remove('odonto-vacio'))
    requestAnimationFrame(() => {
      hijos.forEach((h) => {
        if (h.clientHeight === 0 && getComputedStyle(h).display !== 'none') h.classList.add('odonto-vacio')
      })
    })
  }, [])

  useEffect(() => {
    const raiz = ref.current
    if (!raiz) return
    releer()
    const observer = new MutationObserver(() => {
      releer()
      const visible = [...raiz.querySelectorAll<HTMLElement>('.panel-body > .card, .panel-body > div > .card')]
        .find((c) => c.style.display !== 'none')
      if (visible) colapsarVacias(visible)
    })
    observer.observe(raiz, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [releer, colapsarVacias])

  /* Un solo paso a la vez: es lo que mantiene el panel chico. */
  useEffect(() => {
    pasos.forEach(({ nodo }, i) => {
      /* El activo se deja sin `display` inline: si no, el `block` pisa el
         `grid` con el que la card acomoda sus filas en varias columnas. */
      if (controlesAbiertos && !minimizado && i === paso) {
        nodo.style.removeProperty('display')
        colapsarVacias(nodo)
      } else {
        nodo.style.display = 'none'
      }
    })
  }, [pasos, paso, controlesAbiertos, minimizado, colapsarVacias])

  useEffect(() => {
    if (pasos.length > 0 && paso > pasos.length - 1) setPaso(0)
  }, [pasos, paso])

  /* La botonera va anclada al pie del **gráfico**, no al de la card: si no,
     al abrir el panel la card crece y los botones se van para abajo. Se
     publica el alto del chart como variable para que el examen la use. */
  useEffect(() => {
    const raiz = ref.current
    if (!raiz) return
    const chart = raiz.querySelector<HTMLElement>('.chart')
    const destino = raiz.closest<HTMLElement>('[data-examen]')
    if (!chart || !destino) return
    const medir = () => destino.style.setProperty('--odonto-chart-fin', `${chart.offsetTop + chart.offsetHeight}px`)
    medir()
    const observer = new ResizeObserver(medir)
    observer.observe(chart)
    return () => observer.disconnect()
  }, [pasos])

  const actual = pasos[paso]
  /* Lo que quedó sin tocar; el resumen se muestra al minimizar. */
  const pendientes = pasos.filter((pa) => !tocados.includes(pa.titulo)).map((pa) => pa.titulo)

  return (
    <div
      ref={ref}
      className={cn(
        'odonto-embed w-full',
        controlesAbiertos && !minimizado && 'controles-abiertos',
      )}
      style={VARIABLES}
    >
      <OdontogramShell themeConfig={TEMA} language="en" numberingSystem="UNIVERSAL" />
      <CarasLinguales raiz={ref.current} />
      <PeriodontalTabs raiz={ref.current} />
      <PerioPdArrastre raiz={ref.current} />
      {infoNodo && accionesNodo && <ToothInfoTrigger nodo={infoNodo} contenedor={accionesNodo} />}

      {confirmandoCierre && (
        <ModalShell
          title="Discard and close?"
          onClose={() => setConfirmandoCierre(false)}
          width="max-w-[440px]"
          footer={
            <>
              <button type="button" onClick={() => setConfirmandoCierre(false)} className="h-9 rounded-md border border-[#e4e4e7] bg-white px-5 text-[13px] font-medium hover:bg-[#fafafa]">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => { setConfirmandoCierre(false); descartarYCerrar() }}
                className="h-9 rounded-md bg-[#b22626] px-5 text-[13px] font-medium text-white hover:bg-[#961f1f]"
              >
                Discard and close
              </button>
            </>
          }
        >
          <p className="flex items-start gap-2 text-[13px] leading-relaxed text-[#3f3f46]">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-[#b22626]" />
            <span>
              This returns the whole chart to its default: every surface, condition
              and restoration you set is removed. It cannot be undone.
              <br />
              To put the controls away without losing anything, use the{' '}
              <strong className="font-semibold text-[#09090b]">minimize</strong> arrow instead.
            </span>
          </p>
        </ModalShell>
      )}

      {controlesAbiertos && !minimizado && actual && (
        <div className="mt-3 w-full rounded-t-xl border border-b-0 border-[#e4e4e7] bg-white p-4">
          <OdontogramPanel
            key={reinicio}
            card={actual.nodo}
            onTocar={() => setTocados((t) => (t.includes(actual.titulo) ? t : [...t, actual.titulo]))}
          />
        </div>
      )}

      {controlesAbiertos && pasos.length > 0 && (
        <div className={cn(
          'flex h-10 w-full items-center gap-2 border border-[#e4e4e7] bg-white px-2',
          minimizado ? 'mt-3 rounded-xl' : 'rounded-b-xl border-t-0',
        )}>
          {/* Los dos chevrones van juntos, como un paginador: separados a los
              extremos de la barra costaba saltar de paso. */}
          <span className="flex shrink-0 items-center">
            <button
              type="button"
              aria-label="Previous section"
              disabled={paso === 0}
              onClick={() => setPaso((p) => Math.max(0, p - 1))}
              className="flex size-7 shrink-0 items-center justify-center rounded-md text-[#71717a] hover:bg-[#f4f4f5] disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next section"
              disabled={paso === pasos.length - 1}
              onClick={() => setPaso((p) => Math.min(pasos.length - 1, p + 1))}
              className="flex size-7 shrink-0 items-center justify-center rounded-md text-[#71717a] hover:bg-[#f4f4f5] disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </span>

          <span className="min-w-0 flex-1 text-center">
            <span className="block truncate text-[12px] font-semibold text-[#09090b]" title={minimizado ? tocados.join(' · ') : undefined}>
              {minimizado
                ? (tocados.length > 0 ? `Set: ${tocados.slice(0, 3).join(' · ')}${tocados.length > 3 ? ` +${tocados.length - 3}` : ''}` : 'Nothing set yet')
                : actual?.titulo}
            </span>
            <span className="block truncate text-[10px] text-[#a1a1aa]" title={minimizado ? pendientes.join(' · ') : undefined}>
              {minimizado
                ? (pendientes.length > 0 ? `${pendientes.length} left: ${pendientes.slice(0, 2).join(' · ')}${pendientes.length > 2 ? '…' : ''}` : 'All sections visited')
                : `${paso + 1} of ${pasos.length}`}
            </span>
          </span>

          <button
            type="button"
            aria-label={minimizado ? 'Expand controls' : 'Minimize controls'}
            aria-pressed={minimizado}
            onClick={() => setMinimizado((v) => !v)}
            className="flex size-7 shrink-0 items-center justify-center rounded-md text-[#71717a] hover:bg-[#f4f4f5]"
          >
            {minimizado ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>

          <button
            type="button"
            aria-label="Close controls"
            onClick={() => setConfirmandoCierre(true)}
            className="flex size-7 shrink-0 items-center justify-center rounded-md border border-[#e4e4e7] text-[#71717a] hover:bg-[#f4f4f5]"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
