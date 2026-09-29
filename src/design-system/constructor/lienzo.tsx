import { createContext, createElement, useContext, useRef, useState, type DragEvent, type ReactNode } from 'react'
import { CopyPlus, GripVertical, Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Armado, VerBloque, contiene, hijosDe, iconoDe, nombreDe, permitidos, reIdentificar, type Bloque, type ListaProps, type TipoBloque } from './bloques'

/* El lienzo del Builder: cada bloque se elige con un clic y se arrastra desde su etiqueta; cada lista acepta lo que se suelta,
   venga de la paleta o del mismo lienzo. Ver design-reference/design-system.md › Builder. */

/* ── El árbol ───────────────────────────────────────────────────────── */

export function buscarBloque(bloques: Bloque[], id: string): Bloque | null {
  for (const b of bloques) {
    if (b.id === id) return b
    for (const h of hijosDe(b)) {
      const x = buscarBloque(h, id)
      if (x) return x
    }
  }
  return null
}

/* Aplica `f` a cada lista, con su dirección. */
function recorrer(bloques: Bloque[], f: (xs: Bloque[], lista: string) => Bloque[], lista = 'raiz'): Bloque[] {
  return f(bloques, lista).map((b) => {
    if (b.tipo === 'modal' || b.tipo === 'seccion') return { ...b, bloques: recorrer(b.bloques, f, b.id) }
    if (b.tipo === 'pestanasContenido') return { ...b, pestanas: b.pestanas.map((p) => ({ ...p, bloques: recorrer(p.bloques, f, `${b.id}:${p.id}`) })) }
    if (b.tipo === 'columnas') return { ...b, columnas: b.columnas.map((c) => ({ ...c, bloques: recorrer(c.bloques, f, `${b.id}:${c.id}`) })) }
    return b
  })
}

export function ubicar(bloques: Bloque[], id: string): { lista: string; indice: number } | null {
  let r: { lista: string; indice: number } | null = null
  recorrer(bloques, (xs, lista) => {
    const i = xs.findIndex((b) => b.id === id)
    if (i >= 0) r = { lista, indice: i }
    return xs
  })
  return r
}

export const insertar = (bloques: Bloque[], lista: string, indice: number, b: Bloque) =>
  recorrer(bloques, (xs, l) => (l === lista ? [...xs.slice(0, indice), b, ...xs.slice(indice)] : xs))

export const sacar = (bloques: Bloque[], id: string) => recorrer(bloques, (xs) => xs.filter((b) => b.id !== id))

export const reemplazar = (bloques: Bloque[], id: string, nuevo: Bloque) => recorrer(bloques, (xs) => xs.map((b) => (b.id === id ? nuevo : b)))

/* Mover a una lista: si es la misma y va más abajo, el lugar se corre uno al sacarlo. */
export function mover(bloques: Bloque[], id: string, lista: string, indice: number): Bloque[] {
  const b = buscarBloque(bloques, id)
  const desde = ubicar(bloques, id)
  if (!b || !desde) return bloques
  const i = desde.lista === lista && desde.indice < indice ? indice - 1 : indice
  return insertar(sacar(bloques, id), lista, i, b)
}

/* Si un bloque de ese tipo puede ir en esa lista: un modal sólo va suelto, y nada va adentro de sí mismo. */
export function entra(bloques: Bloque[], lista: string, tipo: TipoBloque, moviendo?: string): boolean {
  if (lista === 'raiz') return true
  const [id, pestana] = lista.split(':')
  const padre = buscarBloque(bloques, id!)
  const esLista = pestana ? padre?.tipo === 'pestanasContenido' || padre?.tipo === 'columnas' : padre?.tipo === 'modal' || padre?.tipo === 'seccion'
  if (!padre || !esLista || !permitidos(padre.tipo).includes(tipo)) return false
  const b = moviendo ? buscarBloque(bloques, moviendo) : null
  return !b || !contiene([b], padre.id)
}

/* ── Arrastrar y soltar ─────────────────────────────────────────────── */

export type Arrastre = { tipo: TipoBloque; nuevo: () => Bloque } | { tipo: TipoBloque; mover: string }
type Destino = { lista: string; indice: number }

export type Edicion = {
  bloques: Bloque[]
  elegido: string | null
  elegir: (id: string | null) => void
  /** Abre su edición en el panel. */
  editar: (id: string) => void
  arrastre: Arrastre | null
  empezar: (a: Arrastre) => void
  terminar: () => void
  destino: Destino | null
  apuntar: (d: Destino | null) => void
  soltar: () => void
  duplicar: (id: string) => void
  borrar: (id: string) => void
  sobre: string | null
  setSobre: (id: string | null) => void
}
const Contexto = createContext<Edicion | null>(null)
const useEdicion = () => useContext(Contexto)!

/* El estado del arrastre. Lo que se suelta o se duplica queda elegido. */
export function useLienzo({ bloques, setBloques, elegido, elegir, editar }: {
  bloques: Bloque[]
  setBloques: (f: (b: Bloque[]) => Bloque[]) => void
  elegido: string | null
  elegir: (id: string | null) => void
  editar: (id: string) => void
}): Edicion {
  const [arrastre, setArrastre] = useState<Arrastre | null>(null)
  const [destino, setDestino] = useState<Destino | null>(null)
  const [sobre, setSobre] = useState<string | null>(null)
  /* El drop puede llegar antes que el re-render del último dragover: se lee lo último de acá. */
  const ultimo = useRef<{ a: Arrastre | null; d: Destino | null }>({ a: null, d: null })

  const terminar = () => {
    ultimo.current = { a: null, d: null }
    setArrastre(null)
    setDestino(null)
  }
  return {
    bloques, elegido, elegir, editar, arrastre, destino, sobre, setSobre, terminar,
    empezar: (a) => {
      ultimo.current = { a, d: null }
      setArrastre(a)
    },
    apuntar: (d) => {
      ultimo.current.d = d
      setDestino((x) => (x?.lista === d?.lista && x?.indice === d?.indice ? x : d))
    },
    soltar: () => {
      const { a, d } = ultimo.current
      terminar()
      if (!a || !d) return
      if ('mover' in a) {
        setBloques((x) => mover(x, a.mover, d.lista, d.indice))
        elegir(a.mover)
      } else {
        const b = a.nuevo()
        setBloques((x) => insertar(x, d.lista, d.indice, b))
        elegir(b.id)
      }
    },
    duplicar: (id) => {
      const b = buscarBloque(bloques, id)
      if (!b) return
      const copia = reIdentificar(b)
      setBloques((x) => {
        const donde = ubicar(x, id)
        return donde ? insertar(x, donde.lista, donde.indice + 1, copia) : x
      })
      elegir(copia.id)
    },
    borrar: (id) => {
      const b = buscarBloque(bloques, id)
      setBloques((x) => sacar(x, id))
      if (b && elegido && contiene([b], elegido)) elegir(null)
    },
  }
}

const ARMADO = { Lista }

/* Todo lo de adentro se elige, se mueve y recibe bloques. Lo que se suelta fuera de una lista va a la de afuera. */
export function Lienzo({ edicion, children }: { edicion: Edicion; children: ReactNode }) {
  const caja = useRef<HTMLDivElement>(null)
  const alFinal = (ev: DragEvent) => {
    const a = edicion.arrastre
    if (!a) return
    ev.preventDefault()
    ev.dataTransfer.dropEffect = 'mover' in a ? 'move' : 'copy'
    edicion.apuntar({ lista: 'raiz', indice: indiceEn(caja.current?.querySelector('[data-lista="raiz"]'), ev.clientY) })
  }
  return (
    <Contexto.Provider value={edicion}>
      <Armado.Provider value={ARMADO}>
        <div
          ref={caja}
          className={cn('flex flex-1 flex-col', edicion.arrastre && '[&_iframe]:pointer-events-none')}
          onDragOver={alFinal}
          onDrop={(ev) => { ev.preventDefault(); edicion.soltar() }}
          onDragLeave={(ev) => { if (!caja.current?.contains(ev.relatedTarget as Node)) edicion.apuntar(null) }}
          onPointerDown={(ev) => { if (!(ev.target as HTMLElement).closest('[data-bloque], [role="dialog"]')) edicion.elegir(null) }}
          onMouseLeave={() => edicion.setSobre(null)}
        >
          {children}
        </div>
      </Armado.Provider>
    </Contexto.Provider>
  )
}

/* Cuántos bloques de la lista quedan arriba del puntero: ahí va lo que se suelta. */
function indiceEn(el: Element | null | undefined, y: number) {
  let i = 0
  for (const h of el?.children ?? []) {
    if (!(h instanceof HTMLElement) || !h.dataset.bloque) continue
    const r = h.getBoundingClientRect()
    if (r.top + r.height / 2 < y) i++
  }
  return i
}

function Lista({ lista, bloques, contenedor, className }: ListaProps) {
  const e = useEdicion()
  const ref = useRef<HTMLDivElement>(null)
  const puede = (a: Arrastre) => entra(e.bloques, lista, a.tipo, 'mover' in a ? a.mover : undefined)
  /* Si no puede ir acá (un modal adentro de una sección), sigue de largo a la lista de afuera. */
  const sobre = (ev: DragEvent) => {
    const a = e.arrastre
    if (!a || !puede(a)) return
    ev.preventDefault()
    ev.stopPropagation()
    ev.dataTransfer.dropEffect = 'mover' in a ? 'move' : 'copy'
    e.apuntar({ lista, indice: indiceEn(ref.current, ev.clientY) })
  }
  const soltar = (ev: DragEvent) => {
    if (!e.arrastre || !puede(e.arrastre)) return
    ev.preventDefault()
    ev.stopPropagation()
    e.soltar()
  }
  const aca = e.destino?.lista === lista
  return (
    <div ref={ref} data-lista={lista} className={className} onDragOver={sobre} onDrop={soltar}>
      {bloques.map((b, i) => (
        <Marco key={b.id} b={b} contenedor={contenedor} antes={aca && e.destino!.indice === i} despues={aca && i === bloques.length - 1 && e.destino!.indice === bloques.length} />
      ))}
      {!bloques.length && (
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed px-4 text-center text-[13px]',
            lista === 'raiz' ? 'min-h-48' : 'min-h-20',
            aca ? 'border-dash-blue bg-info-bg text-dash-blue' : 'border-line text-ink-muted',
          )}
        >
          {lista === 'raiz' ? (
            <>
              <span className="font-medium text-ink">Arrastrá componentes acá</span>
              <span>Desde el panel Components, o describilo en Describe.</span>
            </>
          ) : 'Soltá bloques acá'}
        </div>
      )}
    </div>
  )
}

function Linea({ abajo }: { abajo?: boolean }) {
  return <span aria-hidden className={cn('pointer-events-none absolute inset-x-0 z-30 h-[3px] rounded-full bg-dash-blue', abajo ? '-bottom-[9px]' : '-top-[9px]')} />
}

function Marco({ b, contenedor, antes, despues }: { b: Bloque; contenedor: ListaProps['contenedor']; antes: boolean; despues: boolean }) {
  const e = useEdicion()
  const elegido = e.elegido === b.id
  const marcado = elegido || e.sobre === b.id
  const moviendo = !!e.arrastre && 'mover' in e.arrastre && e.arrastre.mover === b.id
  return (
    <div
      data-bloque={b.id}
      /* En captura elige primero el de afuera y después el de adentro: queda elegido el más chico que se tocó. */
      onPointerDownCapture={() => e.elegir(b.id)}
      onMouseOver={(ev) => { ev.stopPropagation(); if (!e.arrastre) e.setSobre(b.id) }}
      onDoubleClick={(ev) => { ev.stopPropagation(); e.editar(b.id) }}
      className={cn(
        'relative rounded-[6px] outline-offset-[5px]',
        elegido ? 'outline-2 outline-dash-blue' : marcado && 'outline-1 outline-dash-blue/50 outline-dashed',
        moviendo && 'opacity-40',
      )}
    >
      {antes && <Linea />}
      {marcado && !e.arrastre && (
        /* Apoyada sobre el contorno, para tapar lo menos posible del bloque de arriba. */
        <div className={cn('absolute -top-[23px] -left-[7px] z-20 flex h-[18px] items-center rounded-t-[5px] text-[11px] leading-none font-medium', elegido ? 'bg-dash-blue text-white' : 'border border-dash-blue/40 bg-white text-dash-blue')}>
          <span
            draggable
            title="Arrastrá para mover"
            onDragStart={(ev) => {
              ev.dataTransfer.effectAllowed = 'move'
              ev.dataTransfer.setData('text/plain', nombreDe(b))
              e.empezar({ tipo: b.tipo, mover: b.id })
            }}
            onDragEnd={e.terminar}
            className="flex h-full cursor-grab items-center gap-1 pr-1.5 pl-1 active:cursor-grabbing"
          >
            <GripVertical className="size-3 opacity-70" />
            {createElement(iconoDe(b), { className: 'size-3' })}
            <span className="max-w-[220px] truncate">{nombreDe(b)}</span>
          </span>
          {elegido && (
            <>
              <button type="button" onClick={() => e.editar(b.id)} aria-label={`Edit ${nombreDe(b)}`} title="Editar (doble clic)" className="flex h-full w-5 items-center justify-center border-l border-white/25 hover:bg-white/15">
                <Pencil className="size-3" />
              </button>
              <button type="button" onClick={() => e.duplicar(b.id)} aria-label={`Duplicate ${nombreDe(b)}`} title="Duplicar" className="flex h-full w-5 items-center justify-center border-l border-white/25 hover:bg-white/15">
                <CopyPlus className="size-3" />
              </button>
              <button type="button" onClick={() => e.borrar(b.id)} aria-label={`Delete ${nombreDe(b)}`} title="Borrar" className="flex h-full w-5 items-center justify-center rounded-tr-[5px] border-l border-white/25 hover:bg-white/15">
                <Trash2 className="size-3" />
              </button>
            </>
          )}
        </div>
      )}
      <VerBloque b={b} contenedor={contenedor} />
      {/* Una pieza real se dibuja en un iframe: hasta elegirla, el clic la elige y no llega adentro. */}
      {b.tipo === 'pieza' && !elegido && <div className="absolute inset-0 z-[1] cursor-pointer" />}
      {despues && <Linea abajo />}
    </div>
  )
}
