import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from 'lucide-react'
import { OdontogramShell, type OdontogramThemeConfig } from 'react-advanced-odontogram'
import { cn } from '@/lib/utils'
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
  /** Controls, Statuses, Tooth details, Orthodontics, Caries, Diagnoses y
      Tooth information viven en un panel flotante que abre el FAB del
      examen, y se recorren de a uno: así el gráfico queda entero a la vista
      y el panel no empuja nada. */
  controlesAbiertos: boolean
  onCerrarControles: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pasos, setPasos] = useState<Paso[]>([])
  const [paso, setPaso] = useState(0)
  /* Minimizado deja sólo la barra: el gráfico se ve entero sin cerrar nada. */
  const [minimizado, setMinimizado] = useState(false)

  /* Las secciones son las cards que dibuja la librería más el resumen
     "Tooth information", que vive en otra columna. Se releen porque la
     librería monta y desmonta cards según la pieza activa -Orthodontics,
     por ejemplo, sólo aparece en piezas elegibles-. */
  const releer = useCallback(() => {
    const raiz = ref.current
    if (!raiz) return
    const cabecera = raiz.querySelector<HTMLElement>('.panel-header')
    const cards = [...raiz.querySelectorAll<HTMLElement>('.panel-body > .card, .panel-body > div > .card')]
    const info = raiz.querySelector<HTMLElement>('.tooth-info')
    /* La cabecera -selección de piezas- es un paso más: dejarla siempre
       visible hacía el flotante el doble de alto. */
    const lista: Paso[] = cabecera ? [{ titulo: 'Controls', nodo: cabecera }] : []
    cards.forEach((nodo) => lista.push({ titulo: tituloDe(nodo, 'Details'), nodo }))
    if (info) lista.push({ titulo: tituloDe(info, 'Tooth information'), nodo: info })
    setPasos((previos) =>
      previos.length === lista.length && previos.every((p, i) => p.nodo === lista[i].nodo) ? previos : lista,
    )
  }, [])

  useEffect(() => {
    const raiz = ref.current
    if (!raiz) return
    releer()
    const observer = new MutationObserver(releer)
    observer.observe(raiz, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [releer])

  /* Un solo paso a la vez: es lo que mantiene el panel chico. */
  useEffect(() => {
    pasos.forEach(({ nodo }, i) => {
      nodo.style.display = controlesAbiertos && !minimizado && i === paso ? 'block' : 'none'
    })
  }, [pasos, paso, controlesAbiertos, minimizado])

  useEffect(() => {
    if (pasos.length > 0 && paso > pasos.length - 1) setPaso(0)
  }, [pasos, paso])

  const actual = pasos[paso]
  /* Con el resumen abierto la cabecera del panel de la librería -la
     selección de piezas- no viene a cuento: acompaña a las cards. */
  const enResumen = !!actual?.nodo.classList.contains('tooth-info')

  return (
    <div
      ref={ref}
      className={cn(
        'odonto-embed w-full',
        controlesAbiertos && !minimizado && 'controles-abiertos',
        controlesAbiertos && !minimizado && enResumen && 'en-resumen',
      )}
      style={VARIABLES}
    >
      <OdontogramShell themeConfig={TEMA} language="en" numberingSystem="UNIVERSAL" />

      {controlesAbiertos && pasos.length > 0 && (
        <div className={cn(
          'fixed right-[88px] bottom-6 z-50 flex h-12 w-[340px] items-center justify-between gap-1 border border-[#e4e4e7] bg-white px-2 shadow-[0_12px_32px_rgb(0_0_0/0.14)]',
          minimizado ? 'rounded-xl' : 'rounded-b-xl border-t-0',
        )}>
          <button
            type="button"
            aria-label="Previous section"
            disabled={paso === 0}
            onClick={() => setPaso((p) => Math.max(0, p - 1))}
            className="flex size-8 shrink-0 items-center justify-center rounded-md text-[#71717a] hover:bg-[#f4f4f5] disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>

          <span className="min-w-0 flex-1 text-center">
            <span className="block truncate text-[13px] font-semibold text-[#09090b]">{actual?.titulo}</span>
            <span className="block text-[11px] text-[#a1a1aa]">{paso + 1} of {pasos.length}</span>
          </span>

          <button
            type="button"
            aria-label="Next section"
            disabled={paso === pasos.length - 1}
            onClick={() => setPaso((p) => Math.min(pasos.length - 1, p + 1))}
            className="flex size-8 shrink-0 items-center justify-center rounded-md text-[#71717a] hover:bg-[#f4f4f5] disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>

          <button
            type="button"
            aria-label={minimizado ? 'Expand controls' : 'Minimize controls'}
            aria-pressed={minimizado}
            onClick={() => setMinimizado((v) => !v)}
            className="flex size-8 shrink-0 items-center justify-center rounded-md text-[#71717a] hover:bg-[#f4f4f5]"
          >
            {minimizado ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>

          <button
            type="button"
            aria-label="Close controls"
            onClick={onCerrarControles}
            className="flex size-8 shrink-0 items-center justify-center rounded-md border border-[#e4e4e7] text-[#71717a] hover:bg-[#f4f4f5]"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
