import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'

/* Mapa del design system: todo lo que hay, agrupado como en el menú de la
   izquierda, con un link a cada página. Se arma leyendo index.json -el índice
   que genera Storybook-, así que siempre está completo: una página nueva
   aparece sola. */

export type Entrada = { id: string; title: string; name: string; type: 'docs' | 'story'; importPath: string }

let cache: Promise<Entrada[]> | null = null
export function cargarIndice(): Promise<Entrada[]> {
  cache ??= fetch('./index.json')
    .then((r) => r.json())
    .then((j: { entries: Record<string, Entrada> }) => Object.values(j.entries))
    .catch(() => [])
  return cache
}

export function useIndice() {
  const [entradas, setEntradas] = useState<Entrada[] | null>(null)
  useEffect(() => {
    let vivo = true
    cargarIndice().then((e) => vivo && setEntradas(e))
    return () => {
      vivo = false
    }
  }, [])
  return entradas
}

/* Link que abre la página en el Storybook (no adentro del iframe). */
export const hrefDe = (e: Pick<Entrada, 'id' | 'type'>) => `./?path=/${e.type === 'docs' ? 'docs' : 'story'}/${e.id}`

export function IrA({ entrada, children, className }: { entrada: Pick<Entrada, 'id' | 'type'>; children: React.ReactNode; className?: string }) {
  return <a href={hrefDe(entrada)} target="_top" className={className ?? 'text-dash-blue hover:underline'}>{children}</a>
}

/* Una página por título: la de docs si existe, si no la primera story. */
export function paginas(entradas: Entrada[]) {
  const porTitulo = new Map<string, Entrada>()
  for (const e of entradas) {
    const actual = porTitulo.get(e.title)
    if (!actual || (e.type === 'docs' && actual.type !== 'docs')) porTitulo.set(e.title, e)
  }
  return [...porTitulo.values()]
}

/* La página de un archivo de componente (`components/ui/button.tsx`). */
export function paginaDeArchivo(entradas: Entrada[], archivo: string) {
  const base = archivo.replace(/\.tsx$/, '')
  const candidatas = entradas.filter((e) => e.importPath === `./src/${base}.stories.tsx`)
  return candidatas.find((e) => e.type === 'docs') ?? candidatas[0]
}

const SECCIONES: { nombre: string; que: string }[] = [
  { nombre: 'Foundations', que: 'Colores, tipografía, radios y sombras.' },
  { nombre: 'Elements', que: 'Las piezas estándar, con Playground para probarlas.' },
  { nombre: 'Components', que: 'Las piezas de cada módulo de la app.' },
  { nombre: 'Pages', que: 'Las pantallas completas.' },
  { nombre: 'Audit', que: 'Lo que el código hace hoy y se aparta del estándar.' },
]

export function Mapa() {
  const entradas = useIndice()
  const [q, setQ] = useState('')
  /* Las pantallas son stories de un mismo título (Pages): cada una va aparte. */
  const lista = useMemo(() => {
    if (!entradas) return []
    const pantallas = entradas.filter((e) => e.title === 'Pages' && e.type === 'story').map((e) => ({ ...e, title: `Pages/Screens/${e.name}` }))
    return [...paginas(entradas.filter((e) => e.title !== 'Pages')), ...pantallas]
  }, [entradas])

  if (!entradas) return <p style={{ color: '#71717a', fontSize: 13 }}>Loading the map…</p>

  const coincide = (e: Entrada) => e.title.toLowerCase().includes(q.trim().toLowerCase())
  return (
    <div className="not-prose flex flex-col gap-5 font-sans text-ink">
      <div className="relative w-[320px] max-w-full">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a page: button, sidebar, ledger…"
          aria-label="Find a page"
          className="h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:border-dash-blue focus:outline-none"
        />
      </div>
      {SECCIONES.map((s) => {
        const deSeccion = lista.filter((e) => e.title.split('/')[0] === s.nombre && coincide(e))
        if (!deSeccion.length) return null
        /* Components y Pages se agrupan por módulo (el segundo nivel). */
        const grupos = new Map<string, Entrada[]>()
        for (const e of deSeccion) {
          const partes = e.title.split('/')
          const grupo = partes.length > 2 ? partes[1]! : ''
          grupos.set(grupo, [...(grupos.get(grupo) ?? []), e])
        }
        return (
          <section key={s.nombre} className="rounded-lg border border-line-row bg-white p-4">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="m-0 text-[15px] font-semibold">{s.nombre}</h3>
              <p className="m-0 text-[12.5px] text-ink-muted">{s.que}</p>
            </div>
            {grupos.size === 1 && grupos.has('') ? (
              /* Una sola lista: los links repartidos en columnas. */
              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3 lg:grid-cols-4">
                {grupos.get('')!.map((e) => (
                  <IrA key={e.id} entrada={e} className="text-dash-blue text-[13px] no-underline hover:underline">{e.title.split('/').pop()}</IrA>
                ))}
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
                {[...grupos].map(([grupo, items]) => (
                  <div key={grupo || s.nombre} className="flex flex-col gap-1">
                    {grupo && <p className="m-0 text-[11px] font-semibold tracking-wide text-ink-muted uppercase">{grupo}</p>}
                    {items.map((e) => (
                      <IrA key={e.id} entrada={e} className="text-dash-blue text-[13px] no-underline hover:underline">
                        {e.title.split('/').pop()}
                      </IrA>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
