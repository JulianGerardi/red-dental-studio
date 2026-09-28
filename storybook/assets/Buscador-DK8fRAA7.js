import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ClipboardCheck, CornerDownLeft, LayoutTemplate, MonitorSmartphone, Palette, Puzzle, Search, X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buscar, normalizar, type Pagina, type Resultado, type Seccion } from './buscar'
import { Enlace, ir } from './navegar'

/* El buscador del sitio. Grande en la portada, como el de Google; chico en
   la barra de arriba de todas las páginas. Los dos buscan lo mismo (ver
   buscar.ts): nombre, descripción, ejemplos y sinónimos en castellano. */

export const ICONO_SECCION: Record<Seccion, LucideIcon> = {
  Foundations: Palette,
  Elements: LayoutTemplate,
  Components: Puzzle,
  Pages: MonitorSmartphone,
  Audit: ClipboardCheck,
}

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

export function Buscador({ indice, grande, autoFocus, className }: { indice: Pagina[] | null; grande?: boolean; autoFocus?: boolean; className?: string }) {
  const [consulta, setConsulta] = useState('')
  const [activo, setActivo] = useState(0)
  const [foco, setFoco] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const caja = useRef<HTMLDivElement>(null)
  const todos = useMemo(() => (indice ? buscar(indice, consulta) : []), [indice, consulta])
  const resultados = todos.slice(0, grande ? 8 : 7)
  const abierto = consulta.trim().length > 0 && (grande || foco)
  const destino = (r: Resultado) => r.ejemplo?.id ?? r.id

  useEffect(() => {
    if (autoFocus) input.current?.focus({ preventScroll: true })
  }, [autoFocus])

  /* El chico se cierra al hacer clic afuera. */
  useEffect(() => {
    if (grande) return
    const fuera = (e: MouseEvent) => {
      if (caja.current && !caja.current.contains(e.target as Node)) setFoco(false)
    }
    document.addEventListener('mousedown', fuera)
    return () => document.removeEventListener('mousedown', fuera)
  }, [grande])

  const elegir = (r: Resultado) => {
    setConsulta('')
    setFoco(false)
    ir(destino(r))
  }

  return (
    <div ref={caja} className={cn('relative', grande ? 'mx-auto w-full max-w-[640px]' : 'w-full', className)}>
      <div
        className={cn(
          'flex items-center border border-line bg-white transition-[border-radius]',
          'focus-within:border-dash-blue focus-within:ring-dash-blue/15',
          grande
            ? cn('h-14 gap-3 px-5 shadow-[0_1px_6px_rgb(9_9_11/0.08)] focus-within:ring-4', abierto ? 'rounded-t-[28px] rounded-b-none' : 'rounded-full')
            : 'h-8 gap-2 rounded-md px-2.5 focus-within:ring-2',
        )}
      >
        <Search className={cn('shrink-0', grande ? 'size-5 text-dash-blue' : 'size-4 text-ink-muted')} aria-hidden />
        <input
          ref={input}
          value={consulta}
          onFocus={() => setFoco(true)}
          onChange={(e) => { setConsulta(e.target.value); setActivo(0); setFoco(true) }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActivo((i) => Math.min(i + 1, resultados.length - 1)) }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setActivo((i) => Math.max(i - 1, 0)) }
            else if (e.key === 'Enter' && resultados[activo]) elegir(resultados[activo])
            else if (e.key === 'Escape') { setConsulta(''); input.current?.blur() }
          }}
          placeholder={grande ? 'Buscá un componente, pantalla o estado…' : 'Search'}
          aria-label="Search the design system"
          role="combobox"
          aria-expanded={abierto}
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
          className={cn('h-full min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink-muted', grande ? 'text-[16px]' : 'text-[14px]')}
        />
        {consulta && (
          <button type="button" onClick={() => { setConsulta(''); input.current?.focus() }} aria-label="Clear search" className="flex size-6 items-center justify-center rounded-full text-ink-muted hover:bg-surface-muted">
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {abierto && (
        <div
          className={cn(
            'absolute z-40 overflow-hidden bg-white text-left',
            grande
              ? 'inset-x-0 top-full rounded-b-[28px] border border-t-0 border-dash-blue pb-2 shadow-[0_24px_48px_-16px_rgb(9_9_11/0.25)] ring-4 ring-dash-blue/15'
              : 'top-[calc(100%+6px)] right-0 w-[min(440px,calc(100vw-32px))] rounded-xl border border-line py-1.5 shadow-[0_16px_40px_-12px_rgb(9_9_11/0.3)]',
          )}
        >
          {grande && <div className="mx-5 border-t border-line-row" />}
          {!indice ? (
            <p className="m-0 px-4 py-3 text-[13px] text-ink-muted">Cargando…</p>
          ) : resultados.length === 0 ? (
            <div className="px-4 py-3 text-[13px] text-ink-muted">
              <p className="m-0">No encontramos <b className="text-ink">“{consulta}”</b>.</p>
              <p className="m-0 mt-1">Probá con otra palabra: <i>botón</i>, <i>tabla</i>, <i>turno</i>, <i>error</i>, <i>celular</i>.</p>
            </div>
          ) : (
            <ul role="listbox" aria-label="Results" className="m-0 list-none p-0 pt-1">
              {resultados.map((r, i) => {
                const Icono = ICONO_SECCION[r.seccion]
                return (
                  <li key={r.id} role="option" aria-selected={i === activo}>
                    <Enlace
                      id={destino(r)}
                      onClick={() => { setConsulta(''); setFoco(false) }}
                      onMouseEnter={() => setActivo(i)}
                      className={cn('flex items-start gap-3 no-underline', grande ? 'px-5 py-2.5' : 'px-3 py-2', i === activo && 'bg-surface-muted')}
                    >
                      <span className={cn('mt-0.5 flex shrink-0 items-center justify-center rounded-md', grande ? 'size-8' : 'size-7', i === activo ? 'bg-dash-blue text-white' : 'bg-surface-slate text-ink-slate')}>
                        <Icono className="size-4" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="flex flex-wrap items-baseline gap-x-2">
                          <span className="text-[14px] font-semibold text-ink"><Resaltado texto={r.titulo} consulta={consulta} /></span>
                          {r.ejemplo && <span className="text-[12.5px] text-dash-blue">→ {r.ejemplo.nombre}</span>}
                          <span className="text-[11.5px] text-ink-muted">{[r.seccion, r.grupo].filter(Boolean).join(' / ')}</span>
                        </span>
                        {r.descripcion && <span className="truncate text-[12.5px] text-ink-muted"><Resaltado texto={r.descripcion} consulta={consulta} /></span>}
                      </span>
                      {i === activo && <CornerDownLeft className="mt-2 size-4 shrink-0 text-dash-blue" aria-hidden />}
                    </Enlace>
                  </li>
                )
              })}
            </ul>
          )}
          {todos.length > resultados.length && (
            <p className={cn('m-0 pt-2 text-[11.5px] text-ink-muted', grande ? 'px-5' : 'px-3 pb-1')}>
              {todos.length} resultados · se muestran los {resultados.length} más cercanos. Sumá otra palabra para afinar.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};