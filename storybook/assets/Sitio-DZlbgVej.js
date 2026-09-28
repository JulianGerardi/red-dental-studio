import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, Blocks, ChevronRight, GalleryVerticalEnd, Menu, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { armarIndice, normalizar, type Pagina, type Seccion } from './buscar'
import { Buscador } from './Buscador'
import { useIndice } from './Mapa'
import { Enlace, ir } from './navegar'
import { AGREGAR, type TipoBloque } from './constructor/bloques'

/* El sitio del design system: barra de arriba con las secciones y el
   buscador, menú de la sección a la izquierda y la página. Ocupa toda la
   ventana (el menú y las barras del Storybook están ocultos, ver
   .storybook/manager.ts), así que se ve como un sitio de documentación y no
   como una herramienta. Está armado a la manera de primer.style. */

export const SECCIONES: Seccion[] = ['Foundations', 'Elements', 'Components', 'Pages', 'Audit']

/* Las páginas de piezas que el constructor sabe armar: su botón flotante
   abre el constructor con ese bloque ya agregado. */
const BLOQUE_DE_PAGINA: Record<string, TipoBloque> = {
  Buttons: 'botones', Tabs: 'pestanasContenido', Fields: 'campos', Pills: 'pills', Tables: 'tabla', 'Page header': 'encabezado',
  'Appointment cards': 'turnos', EmptyState: 'vacio', Switch: 'opciones', Checkbox: 'opciones', DataTable: 'tabla',
  Dialog: 'modal', Cards: 'seccion', StatCard: 'stats', PendingTaskCard: 'tareas', AppointmentCard: 'turnos',
  CalendarViews: 'calendario', AppointmentSlotPicker: 'horarios', PatientPaymentPanel: 'pago', PostPaymentDialog: 'pago',
}
export const idPortada = (s: Seccion) => \`\${s.toLowerCase()}-overview--docs\`
const APP = 'https://juliangerardi.github.io/red-dental-studio/'

let cache: { entradas: unknown; indice: Pagina[] } | null = null
export function useIndiceSitio() {
  const entradas = useIndice()
  return useMemo(() => {
    if (!entradas) return null
    if (cache?.entradas !== entradas) cache = { entradas, indice: armarIndice(entradas) }
    return cache.indice
  }, [entradas])
}

/* La lista de una sección: primero las páginas sueltas, después los grupos
   (los módulos de Components, Screens y Parts de Pages), plegables. */
function Lista({ indice, seccion, actual, alElegir }: { indice: Pagina[]; seccion: Seccion; actual?: string; alElegir?: () => void }) {
  const [filtro, setFiltro] = useState('')
  const propias = indice.filter((p) => p.seccion === seccion && p.id !== idPortada(seccion))
  const f = normalizar(filtro.trim())
  const visibles = f ? propias.filter((p) => normalizar(\`\${p.titulo} \${p.grupo}\`).includes(f)) : propias
  const grupos = new Map<string, Pagina[]>()
  for (const p of visibles) grupos.set(p.grupo, [...(grupos.get(p.grupo) ?? []), p])
  const grupoActual = propias.find((p) => p.id === actual)?.grupo
  const [abiertos, setAbiertos] = useState<Set<string>>(() => new Set(grupoActual ? [grupoActual] : []))
  const lista = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lista.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest' })
  }, [actual])

  const item = (p: Pagina) => {
    const es = p.id === actual
    return (
      <li key={p.id}>
        <Enlace
          id={p.id}
          onClick={alElegir}
          aria-current={es ? 'page' : undefined}
          className={cn(
            'relative flex min-h-8 items-center rounded-md px-2 py-1 text-[14px] leading-snug no-underline transition-colors',
            es ? 'bg-surface-muted font-semibold text-ink' : 'text-ink-medium hover:bg-surface-muted hover:text-ink',
          )}
        >
          {es && <span aria-hidden className="absolute top-1.5 bottom-1.5 -left-2 w-1 rounded-full bg-dash-blue" />}
          {p.titulo}
        </Enlace>
      </li>
    )
  }

  return (
    <div ref={lista} className="flex flex-col gap-4">
      <Enlace id={idPortada(seccion)} onClick={alElegir} className="text-[22px] leading-tight font-semibold text-ink no-underline hover:text-dash-blue">
        {seccion}
      </Enlace>
      <label className="flex h-8 items-center gap-2 rounded-md border border-line bg-white px-2.5 focus-within:border-dash-blue focus-within:ring-2 focus-within:ring-dash-blue/15">
        <Search className="size-4 shrink-0 text-ink-muted" aria-hidden />
        <input
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder={\`Search \${seccion}\`}
          aria-label={\`Search \${seccion}\`}
          className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-muted"
        />
      </label>
      <nav aria-label={seccion} className="flex flex-col gap-3">
        {[...grupos].map(([grupo, paginas]) => {
          if (!grupo) return <ul key="-" className="m-0 flex list-none flex-col gap-0.5 p-0">{paginas.map(item)}</ul>
          const abierto = !!f || abiertos.has(grupo)
          return (
            <div key={grupo} className="flex flex-col gap-0.5 border-t border-line-row pt-3">
              <button
                type="button"
                aria-expanded={abierto}
                onClick={() => setAbiertos((a) => { const n = new Set(a); if (n.has(grupo)) n.delete(grupo); else n.add(grupo); return n })}
                className="flex h-8 items-center justify-between rounded-md px-2 text-left text-[14px] font-semibold text-ink hover:bg-surface-muted"
              >
                {grupo}
                <span className="flex items-center gap-1.5 text-[12px] font-normal text-ink-muted">
                  {paginas.length}
                  <ChevronRight className={cn('size-4 transition-transform', abierto && 'rotate-90')} aria-hidden />
                </span>
              </button>
              {abierto && <ul className="m-0 flex list-none flex-col gap-0.5 p-0 pl-2">{paginas.map(item)}</ul>}
            </div>
          )
        })}
        {!visibles.length && <p className="m-0 px-2 text-[13px] text-ink-muted">Nada con “{filtro}”.</p>}
      </nav>
    </div>
  )
}

export function Sitio({ actual, seccion, lateral = true, children }: { actual?: string; seccion?: Seccion; lateral?: boolean; children: ReactNode }) {
  const indice = useIndiceSitio()
  const [menu, setMenu] = useState(false)
  const paginaActual = indice?.find((p) => p.id === actual)
  const activa = seccion ?? paginaActual?.seccion
  const bloque = paginaActual ? BLOQUE_DE_PAGINA[paginaActual.titulo] : undefined

  return (
    <div className="ds-sitio sb-unstyled min-h-screen bg-white text-ink">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/95 px-4 backdrop-blur lg:px-6">
        <button type="button" onClick={() => setMenu(true)} aria-label="Open menu" className="flex size-9 items-center justify-center rounded-md text-ink hover:bg-surface-muted lg:hidden">
          <Menu className="size-5" />
        </button>
        <Enlace id="welcome--docs" className="flex items-center gap-2.5 text-ink no-underline">
          <span className="flex size-8 items-center justify-center rounded-lg bg-dash-blue text-white"><GalleryVerticalEnd className="size-4" /></span>
          <span className="text-[16px] font-bold tracking-[-0.01em]">Confidentally UI</span>
          <span className="hidden text-[14px] text-ink-muted sm:inline">Design system</span>
        </Enlace>
        <nav aria-label="Sections" className="ml-auto hidden items-center gap-1 lg:flex">
          {SECCIONES.map((s) => (
            <Enlace
              key={s}
              id={idPortada(s)}
              aria-current={s === activa ? 'page' : undefined}
              className={cn('rounded-md px-3 py-1.5 text-[15px] no-underline transition-colors', s === activa ? 'font-semibold text-ink' : 'text-ink-medium hover:bg-surface-muted hover:text-ink')}
            >
              {s}
            </Enlace>
          ))}
          <Enlace
            id="builder--docs"
            aria-current={activa === 'Builder' ? 'page' : undefined}
            className={cn('ml-1 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[15px] no-underline transition-colors', activa === 'Builder' ? 'bg-info-bg font-semibold text-dash-blue' : 'text-dash-blue hover:bg-info-bg')}
          >
            <Blocks className="size-4" /> Builder
          </Enlace>
        </nav>
        <Buscador indice={indice} className="ml-auto hidden w-56 md:block lg:ml-2" />
        <a href={APP} target="_blank" rel="noreferrer" className="hidden h-8 shrink-0 items-center gap-1 rounded-md border border-line px-3 text-[13px] font-medium text-ink no-underline transition-colors hover:bg-surface-muted sm:inline-flex">
          Open the app <ArrowUpRight className="size-3.5" />
        </a>
      </header>

      <div className="flex">
        {lateral && activa && indice && (
          <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[280px] shrink-0 overflow-y-auto border-r border-line py-6 pr-4 pl-6 lg:block">
            <Lista indice={indice} seccion={activa} actual={actual} />
          </aside>
        )}
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      {/* Desde cualquier página se puede ir a armar un componente; en la de
          una pieza que el constructor conoce, ya llega con ese bloque. */}
      {activa !== 'Builder' && (
        <button
          type="button"
          onClick={() => {
            try {
              if (bloque) window.sessionStorage.setItem(AGREGAR, bloque)
            } catch {
              /* Sin almacenamiento: abre el constructor igual. */
            }
            ir('builder--docs')
          }}
          className="fixed right-5 bottom-5 z-30 inline-flex h-11 items-center gap-2 rounded-full bg-dash-blue px-5 text-[14px] font-semibold text-white shadow-[0_12px_32px_-8px_rgb(29_86_188/0.6)] transition-colors hover:bg-dash-blue-hover"
        >
          <Blocks className="size-4" /> {bloque && paginaActual ? \`Build with \${paginaActual.titulo}\` : 'Build a component'}
        </button>
      )}

      {/* Celular y tablet: el menú es un panel que se abre desde la barra. */}
      {menu && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" aria-label="Close menu" onClick={() => setMenu(false)} className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-y-0 left-0 flex w-[min(320px,88vw)] flex-col gap-5 overflow-y-auto bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-semibold">Menu</span>
              <button type="button" onClick={() => setMenu(false)} aria-label="Close menu" className="flex size-8 items-center justify-center rounded-md hover:bg-surface-muted"><X className="size-4" /></button>
            </div>
            <Buscador indice={indice} className="md:hidden" />
            <nav aria-label="Sections" className="flex flex-wrap gap-1.5">
              {SECCIONES.map((s) => (
                <Enlace key={s} id={idPortada(s)} onClick={() => setMenu(false)} className={cn('rounded-full border px-3 py-1 text-[13px] no-underline', s === activa ? 'border-dash-blue bg-info-bg font-semibold text-dash-blue' : 'border-line text-ink-medium')}>
                  {s}
                </Enlace>
              ))}
              <Enlace id="builder--docs" onClick={() => setMenu(false)} className="inline-flex items-center gap-1 rounded-full border border-dash-blue/40 bg-info-bg px-3 py-1 text-[13px] font-medium text-dash-blue no-underline">
                <Blocks className="size-3.5" /> Builder
              </Enlace>
            </nav>
            {activa && indice && <Lista indice={indice} seccion={activa} actual={actual} alElegir={() => setMenu(false)} />}
          </div>
        </div>
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};