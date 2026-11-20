import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useId, useState, type KeyboardEvent, type ReactNode } from 'react'
import { ChevronDown, Search, SearchX, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ICONO_SUELTO } from '@/lib/estilos'
import { Radio } from './TreatmentPlanPicker'
import { Avatar } from '@/components/ui/avatar'

/* El filtro View de Scheduling: qué estado, provider y sala muestra la agenda. Diseño de Julián del 2026-10-17
   (antes Figma 3856:208346); decisiones en design-reference/figma/modulos/scheduling.md. */

export type OpcionVista = { id: string; nombre: string; detalle?: string }
export type VistaCalendario = { estado: string; provider: string; sala: string }

/* "Select all …" es una opción más del grupo: elige todos. */
export const TODOS = 'all'

export const ESTADOS_VISTA: OpcionVista[] = [
  { id: 'proposed', nombre: 'Proposed' },
  { id: 'checkin', nombre: 'Check In' },
  { id: 'cancelled', nombre: 'Cancelled' },
]

/* En el orden en que se leen, de a dos por fila. */
export const PROVIDERS_VISTA: OpcionVista[] = [
  { id: 'martinez', nombre: "Dr. Martinez's", detalle: 'General Dentist' },
  { id: 'brooks', nombre: 'Dr. Olivia Brooks', detalle: 'Pediatric Specialist' },
  { id: 'okonkwo', nombre: 'Dr. Emily Okonkwo', detalle: 'Pediatric Specialist' },
  { id: 'kim', nombre: 'Dr. Noah Kim', detalle: 'Pediatric Specialist' },
  { id: 'torres', nombre: 'Dr. Michael Torres', detalle: 'Oral Surgeon' },
  { id: 'garcia', nombre: 'Dr. Sofia Garcia', detalle: 'Pediatric Specialist' },
  { id: 'chen', nombre: 'Dr. Sarah Chen', detalle: 'General Dentist' },
  { id: 'nguyen', nombre: 'Dr. David Nguyen', detalle: 'Oral Surgeon' },
  { id: 'wilson', nombre: 'Dr. James Wilson', detalle: 'General Dentist' },
  { id: 'reed', nombre: 'Dr. Amelia Reed', detalle: 'Oral Surgeon' },
  { id: 'patel', nombre: 'Dr. Priya Patel', detalle: 'General Dentist' },
  { id: 'ahmed', nombre: 'Dr. Daniel Ahmed', detalle: 'Oral Surgeon' },
]

/* Tal cual el diseño: cuatro "Operatory 2" y las especialidades de los providers como subtítulo (anomalías 28 y 91). */
export const SALAS_VISTA: OpcionVista[] = [
  { id: 'op1', nombre: 'Operatory 1', detalle: 'General Dentist' },
  { id: 'op2', nombre: 'Operatory 2', detalle: 'Pediatric Specialist' },
  { id: 'op2-b', nombre: 'Operatory 2', detalle: 'Pediatric Specialist' },
  { id: 'op2-c', nombre: 'Operatory 2', detalle: 'Pediatric Specialist' },
  { id: 'op2-d', nombre: 'Operatory 2', detalle: 'Pediatric Specialist' },
  { id: 'op3', nombre: 'Operatory 3', detalle: 'Oral Surgeon' },
]

export const VISTA_INICIAL: VistaCalendario = { estado: 'proposed', provider: 'martinez', sala: 'op1' }

const iniciales = (nombre: string) =>
  nombre.replace(/^Dr\\.\\s*/, '').split(/\\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase()

const plural = (n: number, palabra: string) => \`\${n} \${palabra}\${n === 1 ? '' : 's'}\`

/* Una opción: radio, avatar (provider) o círculo (sala), nombre y bajada. Elegida, fondo celeste. */
export function OpcionFiltro({
  on, onElegir, enfocable, nombre, detalle, marca, className,
}: {
  on: boolean
  onElegir: () => void
  /** La que recibe el Tab dentro de su grupo (las demás, con las flechas). */
  enfocable: boolean
  nombre: string
  detalle?: string
  marca?: 'avatar' | 'sala'
  className?: string
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      tabIndex={enfocable ? 0 : -1}
      onClick={onElegir}
      className={cn(
        'flex min-h-10 min-w-0 items-center gap-3 rounded-lg px-3 py-1.5 text-left transition-colors',
        'focus-visible:outline-dash-blue focus-visible:outline-2 focus-visible:-outline-offset-2',
        on ? 'bg-info-bg' : 'hover:bg-surface-subtle',
        className,
      )}
    >
      <Radio on={on} />
      {marca === 'avatar' && (
        <Avatar aria-hidden initials={iniciales(nombre)} size={28} />
      )}
      {marca === 'sala' && <span aria-hidden className="bg-dash-blue size-7 shrink-0 rounded-full" />}
      <span className="min-w-0">
        <span title={nombre} className="block truncate text-[13px] font-semibold text-ink">{nombre}</span>
        {detalle && <span className="block truncate text-[11px] text-ink-muted">{detalle}</span>}
      </span>
    </button>
  )
}

/* Grupo de radios: Tab entra a la elegida y las flechas recorren y eligen, como un radio nativo. */
export function GrupoFiltro({ etiqueta, className, children }: { etiqueta: string; className?: string; children: ReactNode }) {
  const mover = (e: KeyboardEvent<HTMLDivElement>) => {
    const paso = ({ ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 } as Record<string, number>)[e.key]
    const radios = [...e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]')]
    const i = radios.indexOf(document.activeElement as HTMLElement)
    if (!paso || i < 0) return
    e.preventDefault()
    const siguiente = radios[(i + paso + radios.length) % radios.length]
    siguiente.focus()
    siguiente.click()
  }
  return <div role="radiogroup" aria-label={etiqueta} onKeyDown={mover} className={className}>{children}</div>
}

/* Rótulo de la sección con cuántos hay elegidos a la derecha. */
export function SeccionFiltro({ titulo, conteo, className, children }: { titulo: string; conteo: string; className?: string; children: ReactNode }) {
  return (
    <section className={cn('min-w-0', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[13px] font-medium text-ink">{titulo}</h3>
        <p className="text-[11px] whitespace-nowrap text-ink-muted tabular-nums">{conteo}</p>
      </div>
      {children}
    </section>
  )
}

/* El panel: lo de adentro del popover de View, exportado para dibujarlo abierto en el design system. Mide lo que su
   caja (container queries): providers de a dos desde 512px y Rooms al costado desde 896px. */
export function ViewFiltersPanel({
  onClose, onGuardar, inicial = VISTA_INICIAL, busquedaInicial = '', providers = PROVIDERS_VISTA, salas = SALAS_VISTA, className,
}: {
  onClose: () => void
  /** Save: la vista elegida. Cancel, la ✕, Escape o un clic afuera la descartan. */
  onGuardar?: (v: VistaCalendario) => void
  inicial?: VistaCalendario
  busquedaInicial?: string
  providers?: OpcionVista[]
  salas?: OpcionVista[]
  className?: string
}) {
  const [vista, setVista] = useState(inicial)
  const [busqueda, setBusqueda] = useState(busquedaInicial)
  const idTitulo = useId()
  const elegir = (campo: keyof VistaCalendario) => (id: string) => setVista((v) => ({ ...v, [campo]: id }))

  const texto = busqueda.trim().toLowerCase()
  const visibles = texto
    ? providers.filter((p) => \`\${p.nombre} \${p.detalle ?? ''}\`.toLowerCase().includes(texto))
    : providers
  const nombreDe = (lista: OpcionVista[], id: string) => lista.find((o) => o.id === id)?.nombre
  const nProviders = vista.provider === TODOS ? providers.length : 1
  const nSalas = vista.sala === TODOS ? salas.length : 1
  /* Si la búsqueda esconde al provider elegido, el Tab entra por "Select all Providers". */
  const providerEnfocable = visibles.some((p) => p.id === vista.provider) ? vista.provider : TODOS

  const guardar = () => {
    onGuardar?.(vista)
    aviso.ok('Calendar view updated.')
    onClose()
  }

  return (
    <div
      role="group"
      aria-labelledby={idTitulo}
      className={cn(
        '@container flex max-h-[var(--radix-popover-content-available-height,none)] w-[min(976px,calc(100vw-24px))] flex-col overflow-hidden rounded-xl bg-white text-left shadow-floating',
        className,
      )}
    >
      <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-4 pt-5 pb-4 @2xl:px-6 @2xl:pt-6">
        <div>
          <h2 id={idTitulo} className="text-[22px] leading-none font-bold text-ink">View</h2>
          <p className="mt-1.5 text-[11px] text-ink-muted">Customize the schedule you want to see</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className={cn(ICONO_SUELTO, '-mt-1 -mr-1 size-8')}>
          <X className="size-5" />
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-3 pb-5 @2xl:px-6">
        <SeccionFiltro titulo="Status" conteo={\`\${vista.estado === TODOS ? ESTADOS_VISTA.length : 1} selected\`}>
          <GrupoFiltro etiqueta="Status" className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
            {[{ id: TODOS, nombre: 'Select all Status' }, ...ESTADOS_VISTA].map((o) => (
              <OpcionFiltro
                key={o.id}
                nombre={o.nombre}
                on={vista.estado === o.id}
                enfocable={vista.estado === o.id}
                onElegir={() => elegir('estado')(o.id)}
                className="px-4"
              />
            ))}
          </GrupoFiltro>
        </SeccionFiltro>

        <div className="mt-6 grid gap-6 @4xl:grid-cols-[minmax(0,1fr)_248px] @4xl:gap-0">
          <SeccionFiltro titulo="Providers" conteo={\`\${nProviders} of \${providers.length} selected\`} className="@4xl:pr-6">
            <label className="relative mt-3 block">
              <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink" />
              <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Search by name or specialty"
                aria-label="Search providers by name or specialty"
                className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] text-ink placeholder:text-ink-muted focus:outline-none"
              />
            </label>
            <GrupoFiltro etiqueta="Providers" className="mt-3 flex flex-col gap-1">
              <OpcionFiltro
                nombre="Select all Providers"
                on={vista.provider === TODOS}
                enfocable={providerEnfocable === TODOS}
                onElegir={() => elegir('provider')(TODOS)}
                className="self-start pr-4"
              />
              {visibles.length > 0 && (
                <div className="grid gap-x-4 gap-y-1 @lg:grid-cols-2">
                  {visibles.map((p) => (
                    <OpcionFiltro
                      key={p.id}
                      nombre={p.nombre}
                      detalle={p.detalle}
                      marca="avatar"
                      on={vista.provider === p.id}
                      enfocable={providerEnfocable === p.id}
                      onElegir={() => elegir('provider')(p.id)}
                    />
                  ))}
                </div>
              )}
            </GrupoFiltro>
            {visibles.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title="No providers found"
                detail={\`Nothing matches “\${busqueda.trim()}”. Try another name or specialty.\`}
                accion={{ label: 'Clear search', onClick: () => setBusqueda('') }}
                className="py-6"
              />
            ) : (
              <p className="mt-3 text-[11px] text-ink-muted tabular-nums">
                {visibles.length === providers.length
                  ? \`Showing all \${providers.length} providers\`
                  : \`Showing \${visibles.length} of \${providers.length} providers\`}
              </p>
            )}
          </SeccionFiltro>

          <SeccionFiltro
            titulo="Rooms"
            conteo={\`\${nSalas} of \${salas.length} selected\`}
            className="border-t border-line pt-5 @4xl:border-t-0 @4xl:border-l @4xl:pt-0 @4xl:pl-6"
          >
            <GrupoFiltro etiqueta="Rooms" className="mt-3 grid gap-x-4 gap-y-1 @lg:grid-cols-2 @4xl:grid-cols-1">
              {[{ id: TODOS, nombre: 'Select all Rooms' }, ...salas].map((s) => (
                <OpcionFiltro
                  key={s.id}
                  nombre={s.nombre}
                  detalle={s.detalle}
                  marca={s.id === TODOS ? undefined : 'sala'}
                  on={vista.sala === s.id}
                  enfocable={vista.sala === s.id}
                  onElegir={() => elegir('sala')(s.id)}
                  className={s.id === TODOS ? '@lg:col-span-2 @4xl:col-span-1' : undefined}
                />
              ))}
            </GrupoFiltro>
            {/* Lo que se va a ver al tocar Save. */}
            <div className="mt-4 rounded-lg bg-info-bg px-4 py-3">
              <p className="text-dash-blue text-[11px] font-medium">Current view</p>
              <p className="mt-1 truncate text-[13px] font-semibold text-ink">
                {vista.provider === TODOS ? 'All providers' : nombreDe(providers, vista.provider)}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-ink-muted">
                {vista.estado === TODOS ? 'All statuses' : nombreDe(ESTADOS_VISTA, vista.estado)}
                {' · '}
                {vista.sala === TODOS ? 'All rooms' : nombreDe(salas, vista.sala)}
              </p>
            </div>
          </SeccionFiltro>
        </div>
      </div>

      <footer className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-3 border-t border-line px-4 py-4 @2xl:px-6">
        <p className="text-[12px] text-ink-muted tabular-nums">
          {plural(nProviders, 'provider')} · {plural(nSalas, 'room')}
        </p>
        <div className="ml-auto flex gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={guardar}>Save</Button>
        </div>
      </footer>
    </div>
  )
}

/* El botón View de la barra de Scheduling con su panel. Se despliega debajo, alineado a su borde derecho y sin fondo
   oscuro; el popover (Radix) lo corre para que entre en pantalla y cierra con Escape o un clic afuera. */
export function ViewMenu({ valor, onGuardar }: { valor: VistaCalendario; onGuardar: (v: VistaCalendario) => void }) {
  const [abierto, setAbierto] = useState(false)
  return (
    <Popover open={abierto} onOpenChange={setAbierto}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="bg-dash-blue hover:bg-dash-blue-hover focus-visible:outline-dash-blue flex h-8 items-center gap-1.5 rounded-md px-4 text-xs font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          View
          <ChevronDown aria-hidden className={cn('size-3.5 transition-transform', abierto && 'rotate-180')} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={6}
        collisionPadding={12}
        aria-label="View"
        className="w-auto rounded-xl bg-transparent p-0 shadow-none ring-0"
      >
        <ViewFiltersPanel inicial={valor} onGuardar={onGuardar} onClose={() => setAbierto(false)} />
      </PopoverContent>
    </Popover>
  )
}
`})))()}export{n,i as r,r as t};