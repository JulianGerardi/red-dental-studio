import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import {
  Plus, ZoomIn, ZoomOut, ListFilter, Trash2, Pencil, ChevronDown,
  CirclePlus, X, ChevronLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { PANORAMICA_GRANDE, PANORAMICA_CHICA } from '@/assets/panoramic'
import { BOTON_ICONO_REDONDO } from '@/lib/estilos'
import {
  HALLAZGOS, ZONAS, PROCEDIMIENTOS_CONDICION, type Hallazgo, type Radiografia,
} from '@/data/clinical-mode'

/* Figma 4106:202309 "Radiography — Panoramic Viewer (Default)" y
   4106:202622 (panel New Condition).

   La placa es la del propio Figma, exportada del nodo 4106:202592. Cada
   estudio la muestra con un filtro distinto derivado de su id: es una sola
   imagen de origen, no veinte, y así la grilla no parece un copy-paste. */

export function filtroDe(id: string) {
  const n = [...id].reduce((a, c) => a + c.charCodeAt(0), 0)
  return \`brightness(\${0.86 + (n % 5) * 0.07}) contrast(\${1 + (n % 4) * 0.08}) saturate(0)\`
}

export function Placa({ id, chica }: { id: string; chica?: boolean }) {
  return (
    <img
      src={chica ? PANORAMICA_CHICA : PANORAMICA_GRANDE}
      alt=""
      loading="lazy"
      draggable={false}
      style={{ filter: filtroDe(id) }}
      className="h-full w-full object-cover"
    />
  )
}

/* Design System 432:15211. La card va sobre gris #f9f9f9 con la barra de
   acento a la izquierda, la zona en versalitas y dos acciones —borrar y
   editar— en cajitas blancas. Los rojos y verdes salen muestreados del nodo. */
const PILL: Record<Hallazgo['estado'], string> = {
  Active: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg',
  Discarded: 'border-dash-bad-fg bg-dash-bad-bg text-dash-bad-fg',
}
const ACENTO: Record<Hallazgo['estado'], string> = {
  Active: '#1e9850',
  Discarded: '#d20319',
}

export function FichaHallazgo({ h, onBorrar }: { h: Hallazgo; onBorrar: () => void }) {
  return (
    <div
      /* shrink-0: la lista es flex con alto máximo, y sin esto las cards se
         achicaban hasta recortar Condition y Descriptors. */
      className="shrink-0 overflow-hidden rounded-md border-l-[4px] bg-surface-alt p-3"
      style={{ borderLeftColor: ACENTO[h.estado] }}
    >
      <div className="flex items-center gap-2">
        <span className={cn('shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold', PILL[h.estado])}>
          {h.estado}
        </span>
        <span className="min-w-0 truncate text-[12px] text-ink-muted">{h.fecha}</span>
        <span className="ml-auto flex shrink-0 items-center gap-1">
          <button
            onClick={onBorrar}
            aria-label={\`Delete finding on \${h.zona}\`}
            className="flex size-7 items-center justify-center rounded-md bg-white text-ink transition-colors hover:bg-dash-bad-bg hover:text-dash-bad-fg"
          >
            <Trash2 className="size-3.5" />
          </button>
          <button
            onClick={() => aviso.info('Editing a finding is not available in this release.')}
            aria-label={\`Edit finding on \${h.zona}\`}
            className="flex size-7 items-center justify-center rounded-md bg-white text-ink transition-colors hover:bg-line-soft"
          >
            <Pencil className="size-3.5" />
          </button>
        </span>
      </div>
      <p className="mt-2 text-[13px] font-bold text-ink uppercase">{h.zona}</p>
      <p className="mt-1 text-[13px] text-ink">
        Condition: <span className="text-ink-muted">{h.condicion}</span>
      </p>
      <p className="text-[13px] text-ink">
        Descriptors: <span className="text-ink-muted">{h.descriptores}</span>
      </p>
    </div>
  )
}

/* Panel New Condition: dos pasos, con el catálogo de procedimientos en el
   primero. En el frame entra por la derecha y tapa media pantalla. */
export function NewCondition({ onClose }: { onClose: () => void }) {
  const [paso, setPaso] = useState(1)
  const [zona, setZona] = useState<string | null>(ZONAS[0])
  const [elegido, setElegido] = useState(0)
  const [q, setQ] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={onClose}>
      <aside
        role="dialog"
        aria-label="New Condition"
        onClick={(e) => e.stopPropagation()}
        className="motion-safe:animate-[panel-in_180ms_ease-out] flex h-full w-full max-w-[420px] flex-col bg-white"
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-5">
          <h2 className="text-[20px] font-bold text-ink">New Condition</h2>
          <button onClick={onClose} aria-label="Close" className="shrink-0 text-ink hover:opacity-60">
            <X className="size-5" />
          </button>
        </div>

        {/* Dos pasos, con la línea de progreso entre los dos números. */}
        <div className="flex items-center gap-3 px-5 pt-5">
          {[1, 2].map((n) => (
            <span key={n} className="flex flex-1 items-center gap-3 last:flex-none">
              <span className="flex flex-col items-center gap-1">
                <span className={cn('text-[11px]', paso >= n ? 'text-dash-blue font-medium' : 'text-ink-faint')}>
                  Step
                </span>
                <span
                  className={cn(
                    'flex size-5 items-center justify-center rounded-full text-[11px] font-semibold',
                    paso >= n ? 'bg-dash-blue text-white' : 'bg-line text-ink-muted',
                  )}
                >
                  {n}
                </span>
              </span>
              {n === 1 && (
                <span className="mt-4 h-px flex-1 bg-line">
                  <span className={cn('block h-px bg-dash-blue transition-all', paso > 1 ? 'w-full' : 'w-0')} />
                </span>
              )}
            </span>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <p className="text-[13px] font-semibold text-ink">Selected area</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {zona ? (
              <span className="bg-dash-count-bg text-dash-blue-hover flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-semibold">
                <button onClick={() => setZona(null)} aria-label={\`Remove \${zona}\`} className="hover:opacity-70">
                  <X className="size-3" />
                </button>
                {zona}
              </span>
            ) : (
              <span className="text-[12px] text-ink-muted">Pick an area on the image.</span>
            )}
          </div>

          <div className="my-4 h-px bg-line-soft" />

          {paso === 1 ? (
            <>
              <span className="block text-xs font-medium text-ink">
                Condition<span className="text-required">*</span>
              </span>
              <div className="mt-1.5 flex gap-2">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Select"
                  className="focus:border-dash-blue h-9 min-w-0 flex-1 rounded-md border border-line px-3 text-[13px] placeholder:text-ink-faint focus:outline-none"
                />
                <button
                  onClick={() => aviso.info('Filters are not available in this release.')}
                  className="flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-line px-3 text-[13px] font-medium hover:bg-surface-subtle"
                >
                  <ListFilter className="size-3.5" /> Filter
                </button>
              </div>

              <button
                onClick={() => aviso.info('The full catalog is not available in this release.')}
                className="text-dash-blue mt-4 flex items-center gap-0.5 text-[13px] font-bold hover:underline"
              >
                All ›
              </button>

              <div className="mt-2 flex flex-col gap-2">
                {PROCEDIMIENTOS_CONDICION
                  .filter((p) => \`\${p.codigo} \${p.nombre}\`.toLowerCase().includes(q.trim().toLowerCase()))
                  .map((p, i) => (
                    <button
                      key={\`\${p.codigo}-\${i}\`}
                      disabled={p.deshabilitado}
                      onClick={() => setElegido(i)}
                      className={cn(
                        'flex items-center gap-2 rounded-lg border p-3 text-left transition-colors',
                        p.deshabilitado
                          ? 'cursor-not-allowed border-line bg-surface-muted text-ink-faint'
                          : elegido === i
                            ? 'border-dash-blue'
                            : 'border-line hover:bg-surface-subtle',
                      )}
                    >
                      <span className="min-w-0 flex-1 text-[13px]">
                        <span className={cn('font-semibold', !p.deshabilitado && elegido === i && 'text-dash-blue')}>
                          {p.codigo}
                        </span>{' '}
                        - {p.nombre}
                      </span>
                    </button>
                  ))}
              </div>
            </>
          ) : (
            <>
              <span className="block text-xs font-medium text-ink">Descriptors</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {['Red', 'White', 'Ulcerated', 'Swollen', 'Painful'].map((d) => (
                  <button
                    key={d}
                    onClick={() => aviso.info(\`\${d} added to the finding.\`)}
                    className="rounded-full border border-line px-3 py-1 text-[12px] font-medium hover:bg-surface-subtle"
                  >
                    {d}
                  </button>
                ))}
              </div>
              <span className="mt-4 block text-xs font-medium text-ink">Note</span>
              <textarea
                rows={4}
                placeholder="Add a note for this finding"
                className="focus:border-dash-blue mt-1.5 w-full resize-none rounded-md border border-line p-3 text-[13px] placeholder:text-ink-faint focus:outline-none"
              />
            </>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-line-soft p-5">
          <button
            onClick={() => (paso === 1 ? onClose() : setPaso(1))}
            className="h-10 flex-1 rounded-md border border-line text-[13px] font-medium hover:bg-surface-subtle"
          >
            {paso === 1 ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={() => {
              if (paso === 1) return setPaso(2)
              aviso.ok('Finding added to the exam.')
              onClose()
            }}
            className="bg-dash-blue hover:bg-dash-blue-hover h-10 flex-1 rounded-md text-[13px] font-semibold text-white transition-colors"
          >
            {paso === 1 ? 'Next Step' : 'Save'}
          </button>
        </div>
      </aside>
    </div>
  )
}

export function RadiographyViewer({
  estudios, actual, onCambiar, onVolver, onSubir,
}: {
  estudios: Radiografia[]
  actual: Radiografia
  onCambiar: (r: Radiografia) => void
  onVolver: () => void
  onSubir: () => void
}) {
  const [zoom, setZoom] = useState(1)
  const [condicion, setCondicion] = useState(false)
  const [hallazgos, setHallazgos] = useState(HALLAZGOS)

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex flex-col rounded-xl border border-line bg-white lg:w-[330px] lg:shrink-0">
        <div className="flex flex-wrap items-center gap-2 px-4 pt-4">
          <p className="min-w-0 flex-1 text-[17px] font-bold text-ink">Findings</p>
          {/* Los dos botones del componente: el azul apagado para revisar y el
              azul pleno para el alta. */}
          <button
            onClick={() => aviso.info('Review Exam is not available in this release.')}
            className="flex h-8 shrink-0 items-center gap-1 rounded-md bg-[#8eaadd] px-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#7b9bd6]"
          >
            <Plus className="size-3.5" /> Review Exam
          </button>
          <button
            onClick={() => setCondicion(true)}
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-8 shrink-0 items-center gap-1 rounded-md px-2.5 text-[12px] font-semibold text-white transition-colors"
          >
            <Plus className="size-3.5" /> No Finding
          </button>
        </div>
        <div className="flex max-h-[520px] flex-col gap-3 overflow-y-auto p-4">
          {hallazgos.map((h) => (
            <FichaHallazgo
              key={h.id}
              h={h}
              onBorrar={() => {
                const indice = hallazgos.findIndex((x) => x.id === h.id)
                setHallazgos((hs) => hs.filter((x) => x.id !== h.id))
                aviso.warn(\`Finding on \${h.zona} was deleted.\`, {
                  label: 'Undo',
                  onClick: () => setHallazgos((hs) => [...hs.slice(0, indice), h, ...hs.slice(indice)]),
                })
              }}
            />
          ))}
        </div>
        <button
          onClick={() => aviso.info('The full finding list is not available in this release.')}
          className="flex items-center gap-1 px-4 pb-4 text-[13px] font-medium text-[#8eaadd] hover:underline"
        >
          All result ({hallazgos.length}) <ChevronDown className="size-3.5" />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <button
          onClick={onVolver}
          className="text-dash-blue flex w-fit items-center gap-1 text-[13px] font-medium hover:underline"
        >
          <ChevronLeft className="size-4" /> All images
        </button>

        {/* El tope de 819 va acá: puesto en el hijo junto a \`w-full\`, el
            contenedor con \`w-fit\` se medía contra un hijo que se medía contra
            él y los dos colapsaban a 0. */}
        <div className="relative w-full max-w-[819px] overflow-hidden rounded-xl bg-black">
          {/* 819x552, la medida del nodo del Figma. El tope va en el **ancho**:
              topando sólo el alto, en una columna más ancha el marco quedaba en
              874x552 y la proporción se iba a 1.58 en vez de 1.48. */}
          <div className="aspect-[819/552] w-full overflow-auto">
            <div style={{ width: \`\${zoom * 100}%\`, height: \`\${zoom * 100}%\` }}>
              <Placa id={actual.id} />
            </div>
          </div>

          {/* Redondos y abajo a la derecha, que es donde los pone el frame
              —no centrados en el alto de la placa—. */}
          <div className="absolute right-4 bottom-4 flex flex-col gap-3">
            <button
              onClick={() => setCondicion(true)}
              aria-label="Add condition"
              className={BOTON_ICONO_REDONDO}
            >
              <Plus className="size-5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(1, Number((z - 0.25).toFixed(2))))}
              aria-label="Zoom out"
              className={BOTON_ICONO_REDONDO}
            >
              <ZoomOut className="size-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(3, Number((z + 0.25).toFixed(2))))}
              aria-label="Zoom in"
              className={BOTON_ICONO_REDONDO}
            >
              <ZoomIn className="size-4" />
            </button>
          </div>

          {zoom > 1 && (
            <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
              {Math.round(zoom * 100)}%
            </span>
          )}
        </div>

        {/* Tira de miniaturas, con el botón de sumar al final. */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {estudios.slice(0, 8).map((r) => (
            <button
              key={r.id}
              onClick={() => { onCambiar(r); setZoom(1) }}
              aria-label={\`Show \${r.tipo} from \${r.fecha}\`}
              aria-current={r.id === actual.id ? 'true' : undefined}
              className={cn(
                'h-[74px] w-[96px] shrink-0 overflow-hidden rounded-lg border-2 transition-colors',
                r.id === actual.id ? 'border-dash-blue' : 'border-transparent hover:border-line',
              )}
            >
              <Placa id={r.id} chica />
            </button>
          ))}
          <button
            onClick={onSubir}
            aria-label="Add image"
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-[74px] w-[96px] shrink-0 items-center justify-center rounded-lg text-white transition-colors"
          >
            <CirclePlus className="size-6" />
          </button>
        </div>
      </div>

      {condicion && <NewCondition onClose={() => setCondicion(false)} />}
    </div>
  )
}
`})))()}export{n,i as r,r as t};