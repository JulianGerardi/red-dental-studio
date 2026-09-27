import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import {
  ArrowRight, ClipboardCheck, CornerDownLeft, LayoutTemplate, Layers, Lightbulb, MonitorSmartphone,
  Palette, Puzzle, Search, SlidersHorizontal, X, type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { DataTable, PersonCell, AmountCell } from '@/components/ui/data-table'
import { TextField } from '@/components/patients/form'
import { AppointmentCard } from '@/components/dashboard/AppointmentCard'
import { TurnoCalendario } from '@/components/scheduling/TurnoCalendario'
import { cn } from '@/lib/utils'
import { armarIndice, buscar, normalizar, type Pagina, type Resultado, type Seccion } from './buscar'
import { Mapa, useIndice } from './Mapa'

/* La portada del design system: un buscador grande (cualquiera escribe lo
   que busca, en castellano o en inglés), una vitrina con piezas reales de la
   app que abren su página al tocarlas, las secciones y cómo se lee una
   página. Todo sale de index.json y del código: no hay listas a mano que se
   desactualicen. */

const ICONO: Record<Seccion, LucideIcon> = {
  Foundations: Palette,
  Elements: LayoutTemplate,
  Components: Puzzle,
  Pages: MonitorSmartphone,
  Audit: ClipboardCheck,
}

const SECCIONES: { nombre: Seccion; que: string }[] = [
  { nombre: 'Foundations', que: 'Colores, tipografía, radios y sombras: los valores base.' },
  { nombre: 'Elements', que: 'Las piezas estándar para armar pantallas, con Playground.' },
  { nombre: 'Components', que: 'Cada pieza de cada módulo de la app, por separado.' },
  { nombre: 'Pages', que: 'Las pantallas completas, con sus rutas reales.' },
  { nombre: 'Audit', que: 'Lo que el código hace hoy y se aparta del estándar.' },
]

const PARA_EMPEZAR = ['Buttons', 'Tables', 'Fields', 'Patient menu', 'Appointment cards', 'Colors']

const abrir = (href: string) => window.open(new URL(href, window.location.href).toString(), '_top')

/* Marca en el texto lo que coincide con la búsqueda. */
function Resaltado({ texto, consulta }: { texto: string; consulta: string }) {
  const palabras = normalizar(consulta).split(/\\s+/).filter((p) => p.length > 1)
  if (!palabras.length) return <>{texto}</>
  const norm = normalizar(texto)
  const marcas = new Array(texto.length).fill(false)
  for (const p of palabras) {
    let i = norm.indexOf(p)
    while (i >= 0) {
      for (let k = i; k < i + p.length; k++) marcas[k] = true
      i = norm.indexOf(p, i + p.length)
    }
  }
  const partes: ReactNode[] = []
  let desde = 0
  for (let i = 1; i <= texto.length; i++) {
    if (i === texto.length || marcas[i] !== marcas[desde]) {
      const trozo = texto.slice(desde, i)
      partes.push(marcas[desde] ? <mark key={desde} className="rounded-[3px] bg-brand-tint px-px text-ink">{trozo}</mark> : trozo)
      desde = i
    }
  }
  return <>{partes}</>
}

function Buscador({ indice }: { indice: Pagina[] | null }) {
  const [consulta, setConsulta] = useState('')
  const [activo, setActivo] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const todos = useMemo(() => (indice ? buscar(indice, consulta) : []), [indice, consulta])
  const resultados = todos.slice(0, 8)
  const abierto = consulta.trim().length > 0

  useEffect(() => {
    input.current?.focus({ preventScroll: true })
  }, [])

  const destino = (r: Resultado) => r.ejemplo?.href ?? r.href

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <div
        className={cn(
          'flex h-14 items-center gap-3 border border-line bg-white px-5 shadow-[0_10px_30px_-12px_rgb(29_86_188/0.35)] transition-[border-radius]',
          'focus-within:border-dash-blue focus-within:ring-4 focus-within:ring-dash-blue/10',
          abierto ? 'rounded-t-[28px] rounded-b-none' : 'rounded-full',
        )}
      >
        <Search className="size-5 shrink-0 text-dash-blue" aria-hidden />
        <input
          ref={input}
          id="ds-buscar"
          value={consulta}
          onChange={(e) => { setConsulta(e.target.value); setActivo(0) }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActivo((i) => Math.min(i + 1, resultados.length - 1)) }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setActivo((i) => Math.max(i - 1, 0)) }
            else if (e.key === 'Enter' && resultados[activo]) abrir(destino(resultados[activo]))
            else if (e.key === 'Escape') setConsulta('')
          }}
          placeholder="Buscá un componente, pantalla o estado…"
          aria-label="Search the design system"
          role="combobox"
          aria-expanded={abierto}
          aria-controls="ds-resultados"
          aria-activedescendant={abierto && resultados[activo] ? \`ds-r-\${activo}\` : undefined}
          autoComplete="off"
          spellCheck={false}
          className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-faint"
        />
        {consulta && (
          <button type="button" onClick={() => { setConsulta(''); input.current?.focus() }} aria-label="Clear search" className="flex size-7 items-center justify-center rounded-full text-ink-muted hover:bg-surface-muted">
            <X className="size-4" />
          </button>
        )}
      </div>

      {abierto && (
        <div className="absolute inset-x-0 top-full z-20 overflow-hidden rounded-b-[28px] text-left border border-t-0 border-dash-blue bg-white pb-2 shadow-[0_24px_48px_-16px_rgb(9_9_11/0.25)] ring-4 ring-dash-blue/10">
          <div className="mx-5 border-t border-line-row" />
          {!indice ? (
            <p className="m-0 px-5 py-4 text-[13px] text-ink-muted">Cargando el índice…</p>
          ) : resultados.length === 0 ? (
            <div className="px-5 py-4 text-[13px] text-ink-muted">
              <p className="m-0">No encontramos <b className="text-ink">“{consulta}”</b>.</p>
              <p className="m-0 mt-1">Probá con otra palabra: <i>botón</i>, <i>tabla</i>, <i>turno</i>, <i>error</i>, <i>celular</i>.</p>
            </div>
          ) : (
            <ul id="ds-resultados" role="listbox" aria-label="Results" className="m-0 list-none p-0 pt-1">
              {resultados.map((r, i) => {
                const Icono = ICONO[r.seccion]
                return (
                  <li key={r.id} id={\`ds-r-\${i}\`} role="option" aria-selected={i === activo}>
                    <a
                      href={destino(r)}
                      target="_top"
                      onMouseEnter={() => setActivo(i)}
                      className={cn('flex items-start gap-3 px-5 py-2.5 no-underline', i === activo && 'bg-info-bg')}
                    >
                      <span className={cn('mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg', i === activo ? 'bg-dash-blue text-white' : 'bg-surface-slate text-ink-slate')}>
                        <Icono className="size-4" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="flex flex-wrap items-baseline gap-x-2">
                          <span className="text-[14px] font-semibold text-ink"><Resaltado texto={r.titulo} consulta={consulta} /></span>
                          {r.ejemplo && <span className="text-[12.5px] text-dash-blue">→ {r.ejemplo.nombre}</span>}
                          <span className="text-[11.5px] text-ink-faint">{[r.seccion, r.grupo].filter(Boolean).join(' / ')}</span>
                        </span>
                        {r.descripcion && <span className="truncate text-[12.5px] text-ink-muted"><Resaltado texto={r.descripcion} consulta={consulta} /></span>}
                      </span>
                      {i === activo && <CornerDownLeft className="mt-2 size-4 shrink-0 text-dash-blue" aria-hidden />}
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
          {todos.length > resultados.length && (
            <p className="m-0 px-5 pt-2 text-[11.5px] text-ink-faint">
              {todos.length} resultados · se muestran los 8 más cercanos. Sumá otra palabra para afinar.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Vitrina: piezas reales, cada una abre su página ─────────────────── */

type Pieza = { titulo: string; seccion: string; que: string; clase?: string; arriba?: boolean; muestra: ReactNode }

const FILAS = [
  { id: '1', nombre: 'Maria Abril Viola', ini: 'MV', estado: 'Active', saldo: 120 },
  { id: '2', nombre: 'Noah James Smith', ini: 'NS', estado: 'Active', saldo: 0 },
  { id: '3', nombre: 'Elias Aguirre', ini: 'EA', estado: 'Inactive', saldo: 48.5 },
]

const PIEZAS: Pieza[] = [
  {
    titulo: 'Buttons', seccion: 'Elements', que: 'Cinco variantes y tres tamaños para toda acción.',
    muestra: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    ),
  },
  {
    titulo: 'Fields', seccion: 'Elements', que: 'Texto, selección, fecha y búsqueda, con error y ayuda.',
    muestra: <TextField label="Patient name" value="Maria Abril Viola" onChange={() => {}} className="w-[230px]" />,
  },
  {
    titulo: 'Tables', seccion: 'Elements', que: 'Buscar, filtrar, ordenar y achicar columnas, como en el Ledger.', clase: 'sm:col-span-2', arriba: true,
    muestra: (
      <div className="w-[460px] max-w-full">
        <DataTable
          rows={FILAS}
          rowKey={(f) => f.id}
          pageSize={3}
          columns={[
            { key: 'p', header: 'Patient', cell: (f) => <PersonCell name={f.nombre} initials={f.ini} /> },
            { key: 'e', header: 'Status', width: 110, cell: (f) => <Pill tone={f.estado === 'Active' ? 'success' : 'neutral'} size="sm">{f.estado}</Pill> },
            { key: 's', header: 'Balance', width: 100, align: 'right', cell: (f) => <AmountCell value={f.saldo} /> },
          ]}
        />
      </div>
    ),
  },
  {
    titulo: 'Tabs', seccion: 'Elements', que: 'Cambiar de vista dentro de un mismo bloque.',
    muestra: <Tabs tabs={['Patient View', 'Guarantor View']} value="Patient View" onChange={() => {}} aria-label="Example" />,
  },
  {
    titulo: 'Pills', seccion: 'Elements', que: 'El estado de algo, con seis tonos para toda la app.',
    muestra: (
      <div className="flex max-w-[220px] flex-wrap justify-center gap-1.5">
        <Pill tone="success">Active</Pill>
        <Pill tone="info">Booked</Pill>
        <Pill tone="warning">No Show</Pill>
        <Pill tone="danger">Overdue</Pill>
        <Pill tone="purple">In progress</Pill>
      </div>
    ),
  },
  {
    titulo: 'Appointment cards', seccion: 'Elements', que: 'Un turno en el Dashboard, Patients, el paciente y la agenda.',
    muestra: (
      <div className="flex w-[240px] flex-col gap-2">
        <AppointmentCard appt={{ name: 'Noah James', initials: 'NJ', provider: 'Dr. Elena Martinez', operatory: 'Operatory 2', time: '10:00' }} compact />
        <TurnoCalendario evento={{ start: 10.5, patient: 'Maria Abril Viola', state: 'Check-in' }} forma="chip" />
      </div>
    ),
  },
  {
    titulo: 'Colors', seccion: 'Foundations', que: 'Los tokens de color, leídos de index.css.',
    muestra: (
      <div className="grid grid-cols-4 gap-2">
        {['bg-dash-blue', 'bg-ink', 'bg-green', 'bg-amber', 'bg-dash-bad-fg', 'bg-purple-fg', 'bg-brand-tint', 'bg-surface-slate'].map((c) => (
          <span key={c} className={cn('size-9 rounded-lg ring-1 ring-black/5', c)} />
        ))}
      </div>
    ),
  },
]

function Vitrina({ indice }: { indice: Pagina[] | null }) {
  const hrefDe = (titulo: string, seccion: string) => indice?.find((p) => p.titulo === titulo && p.seccion === seccion)?.href
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {PIEZAS.map((p) => {
        const href = hrefDe(p.titulo, p.seccion)
        return (
          <a
            key={p.titulo}
            href={href}
            target="_top"
            className={cn(
              'group flex flex-col overflow-hidden rounded-xl border border-line bg-white no-underline transition',
              'hover:border-dash-blue/50 hover:shadow-[0_12px_28px_-14px_rgb(29_86_188/0.45)] motion-safe:hover:-translate-y-0.5',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue',
              p.clase,
            )}
          >
            <div inert className={cn('pointer-events-none flex h-[168px] justify-center overflow-hidden bg-surface-subtle p-4', p.arriba ? 'relative items-start after:absolute after:inset-x-0 after:bottom-0 after:h-12 after:bg-gradient-to-t after:from-surface-subtle after:to-transparent' : 'items-center')}>
              {p.muestra}
            </div>
            <div className="flex items-start justify-between gap-3 border-t border-line-row px-4 py-3">
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[14px] font-semibold text-ink">{p.titulo}</span>
                <span className="text-[12.5px] leading-snug text-ink-muted">{p.que}</span>
              </span>
              <ArrowRight className="mt-0.5 size-4 shrink-0 text-ink-faint transition group-hover:text-dash-blue motion-safe:group-hover:translate-x-0.5" aria-hidden />
            </div>
          </a>
        )
      })}
    </div>
  )
}

function Titulo({ children, nota }: { children: ReactNode; nota?: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="sb-unstyled m-0 text-[20px] font-bold tracking-tight text-ink">{children}</h2>
      {nota && <p className="m-0 text-[13.5px] text-ink-muted">{nota}</p>}
    </div>
  )
}

const PASOS: { icono: LucideIcon; titulo: string; texto: string }[] = [
  { icono: SlidersHorizontal, titulo: 'Probalo', texto: 'Cada pieza tiene un Playground: cambiás texto, tamaño o estado desde Controls y la ves en vivo.' },
  { icono: Layers, titulo: 'Mirá todos sus estados', texto: 'Vacío, cargando, error, deshabilitado… y cómo se ve en celular, tablet y computadora.' },
  { icono: Lightbulb, titulo: 'Entendé por qué', texto: 'Cada decisión de diseño explicada, leída del código de la app, con la línea a la que se refiere.' },
]

export function Inicio() {
  const entradas = useIndice()
  const indice = useMemo(() => (entradas ? armarIndice(entradas) : null), [entradas])
  const cuenta = (s: Seccion) => indice?.filter((p) => p.seccion === s).length ?? 0
  const primera = (s: Seccion) => indice?.find((p) => p.seccion === s)?.href
  const ejemplos = entradas?.filter((e) => e.type === 'story').length

  return (
    <MemoryRouter>
      <div className="ds-inicio sb-unstyled not-prose flex flex-col gap-14 font-sans text-ink">
        {/* Portada: el buscador es lo primero y lo más grande. */}
        <section className="relative -mx-2 overflow-visible rounded-3xl border border-line-row px-6 pt-14 pb-12 sm:px-10">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,var(--color-brand-tint)_0%,var(--color-info-bg)_45%,white_80%)]" />
            <div className="absolute inset-0 [background-image:linear-gradient(color-mix(in_srgb,var(--color-dash-blue)_6%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--color-dash-blue)_6%,transparent)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_20%,transparent_75%)]" />
          </div>
          <div className="relative flex flex-col items-center gap-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-dash-blue/20 bg-white/80 px-3 py-1 text-[12px] font-medium text-dash-blue">
              <span className="size-1.5 rounded-full bg-green" /> Confidentally · Design system
            </span>
            <h1 className="sb-unstyled m-0 max-w-[16ch] text-[38px] leading-[1.05] font-bold tracking-[-0.025em] text-balance text-ink sm:text-[52px]">
              La biblia del UX de Confidentally
            </h1>
            <p className="m-0 max-w-[56ch] text-[16px] leading-relaxed text-ink-medium">
              Cada botón, tabla y pantalla de la app, funcionando y explicado. Buscá lo que necesitás o tocá una pieza para abrirla.
            </p>
            <Buscador indice={indice} />
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-[12.5px] text-ink-muted">Para empezar:</span>
              {PARA_EMPEZAR.map((t) => {
                const p = indice?.find((x) => x.titulo === t)
                return (
                  <a key={t} href={p?.href} target="_top" className="inline-flex h-8 items-center rounded-full border border-line bg-white px-3 text-[13px] font-medium text-ink no-underline transition-colors hover:border-dash-blue hover:text-dash-blue">
                    {t}
                  </a>
                )
              })}
            </div>
            <p className="m-0 text-[12.5px] text-ink-muted tabular-nums">
              {indice ? (
                <>
                  <b className="text-ink">{cuenta('Components') + cuenta('Elements')}</b> piezas · <b className="text-ink">{indice.filter((p) => p.grupo === 'Screens').length}</b> pantallas · <b className="text-ink">{ejemplos}</b> ejemplos en vivo — leídos del mismo código que la app.
                </>
              ) : '\xA0'}
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <Titulo nota="Piezas reales de la app. Tocá cualquiera para abrir su página.">Explorá tocando</Titulo>
          <Vitrina indice={indice} />
        </section>

        <section className="flex flex-col gap-5">
          <Titulo nota="El design system está ordenado como el menú de la izquierda.">Por sección</Titulo>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {SECCIONES.map((s) => {
              const Icono = ICONO[s.nombre]
              return (
                <a key={s.nombre} href={primera(s.nombre)} target="_top" className="group flex flex-col gap-3 rounded-xl border border-line bg-white p-4 no-underline transition-colors hover:border-dash-blue/50 hover:bg-info-bg/40">
                  <span className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-info-bg text-dash-blue"><Icono className="size-[18px]" /></span>
                    <span className="text-[12px] font-medium text-ink-muted tabular-nums">{indice ? cuenta(s.nombre) : ''}</span>
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[14px] font-semibold text-ink group-hover:text-dash-blue">{s.nombre}</span>
                    <span className="text-[12.5px] leading-snug text-ink-muted">{s.que}</span>
                  </span>
                </a>
              )
            })}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <Titulo nota="Todas las páginas de componentes tienen las mismas tres pestañas: Overview, Guidelines y Code.">Cómo se lee una página</Titulo>
          <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
            {PASOS.map((p, i) => (
              <li key={p.titulo} className="flex gap-3 rounded-xl border border-line-row bg-surface-subtle p-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-dash-blue ring-1 ring-line"><p.icono className="size-[18px]" /></span>
                <span className="flex flex-col gap-1">
                  <span className="text-[14px] font-semibold text-ink"><span className="text-ink-faint tabular-nums">{i + 1}.</span> {p.titulo}</span>
                  <span className="text-[12.5px] leading-snug text-ink-muted">{p.texto}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col gap-5">
          <Titulo nota="Si preferís ver la lista completa, acá están todas, agrupadas como en el menú.">Todas las páginas</Titulo>
          <Mapa buscador={false} />
        </section>

        <details className="rounded-xl border border-line-row bg-surface-subtle px-5 py-4 text-[13px] leading-relaxed text-ink-medium">
          <summary className="cursor-pointer text-[14px] font-semibold text-ink">Para quien programa</summary>
          <ul className="mt-3 mb-0 flex flex-col gap-1.5 pl-5">
            <li>No es una copia de la app: lee el mismo código. Si cambiás un token en <code>src/index.css</code> o un componente, cambia acá solo.</li>
            <li>Un color escrito a mano (<code>text-[#…]</code>) cambia sólo ese lugar: conviene pasarlo a token (ver <i>Audit / Colors in code</i>).</li>
            <li>Un componente nuevo necesita su <code>.stories.tsx</code>. <code>npm run ds:coverage</code> lista lo que falta.</li>
          </ul>
          <pre className="mt-3 mb-0 overflow-x-auto rounded-lg bg-white p-3 text-[12px] ring-1 ring-line-row">{'npm run storybook        # el design system en localhost:6006\\nnpm run ds:coverage      # lo que todavía no tiene story\\nnpm run build-storybook  # versión estática'}</pre>
        </details>
      </div>
    </MemoryRouter>
  )
}
`})))()}export{n,i as r,r as t};