import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const MINIMO = 40
/* El aviso de "esto se puede ajustar" corre una sola vez por sesión: la
   primera tabla que se monta lo muestra, el resto ya no. */
let avisoMostrado = false

/* Ancho por columna arrastrable a mano. Las dos tablas del Ledger lo usan:
   arrancan con el ancho del diseño y el usuario puede ensanchar la columna
   que necesite leer entera. Ver design-reference/figma/modulos/ledger.md. */
export function useAnchoColumnas<T extends string>(base: Record<T, number>) {
  const [anchos, setAnchos] = useState<Partial<Record<T, number>>>({})
  const [arrastrando, setArrastrando] = useState<T | null>(null)
  /* Abajo de `lg` no hay manijas, así que el aviso no se gasta ahí: si no,
     entrar una vez desde el celular dejaba sin aviso al escritorio. */
  const [avisando, setAvisando] = useState(
    () => !avisoMostrado && window.matchMedia('(min-width: 1024px)').matches,
  )
  const ref = useRef<{ id: T; x0: number; w0: number; max: number } | null>(null)

  useEffect(() => {
    if (!avisando) return
    avisoMostrado = true
    const t = setTimeout(() => setAvisando(false), 2600)
    return () => clearTimeout(t)
    // Sólo al montar: es un aviso de una vez, no reacciona a cambios.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Techo del arrastre: ensanchar una columna no puede empujar a las
     últimas fuera de la tabla -si Balance se esconde, encontrarlo cuesta
     más que lo que se ganó-. Se mide sobre el DOM en el momento de agarrar,
     así las columnas ocultas no entran en la cuenta. La holgura sale del
     espacio libre del contenedor más lo que la columna elástica pueda ceder. */
  const techo = (celda: HTMLElement, w0: number) => {
    const header = celda.closest('[data-tabla-header]') as HTMLElement | null
    const scroll = header?.closest('[data-tabla-scroll]') as HTMLElement | null
    if (!header || !scroll) return Infinity
    const libre = scroll.clientWidth - header.getBoundingClientRect().width
    const elastica = header.querySelector('[data-elastica]') as HTMLElement | null
    if (!elastica || elastica === celda) return w0 + libre
    const cede = Math.max(0, elastica.getBoundingClientRect().width - (parseFloat(getComputedStyle(elastica).minWidth) || 0))
    return w0 + libre + cede
  }

  /* La columna elástica (Description) no tiene ancho fijo hasta que se la
     toca: hasta entonces crece con la tabla. Por eso el ancho inicial del
     arrastre se lee del DOM y no de `base`. */
  const empezar = (id: T, e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const celda = e.currentTarget.parentElement
    const w0 = celda ? celda.getBoundingClientRect().width : base[id]
    ref.current = { id, x0: e.clientX, w0, max: celda ? techo(celda, w0) : Infinity }
    setArrastrando(id)
    setAvisando(false)
    /* Mientras se arrastra, el cursor y la selección son del documento
       entero: si no, el cursor parpadea al salirse de la manija y el
       arrastre selecciona texto de la tabla. */
    document.body.classList.add('cursor-col-resize', 'select-none')

    const mover = (ev: PointerEvent) => {
      const a = ref.current
      if (!a) return
      const bruto = a.w0 + ev.clientX - a.x0
      setAnchos((p) => ({ ...p, [a.id]: Math.round(Math.min(a.max, Math.max(MINIMO, bruto))) }))
    }
    const soltar = () => {
      ref.current = null
      setArrastrando(null)
      document.body.classList.remove('cursor-col-resize', 'select-none')
      window.removeEventListener('pointermove', mover)
      window.removeEventListener('pointerup', soltar)
    }
    window.addEventListener('pointermove', mover)
    window.addEventListener('pointerup', soltar)
  }

  /* Con teclado: flechas mueven de a 16px, para no dejar la función sólo
     al alcance del mouse. */
  const porTeclado = (id: T, e: React.KeyboardEvent<HTMLElement>) => {
    const celda = e.currentTarget.parentElement
    if (e.key === 'Enter' || e.key === 'Backspace') {
      e.preventDefault()
      soltarUna(id)
      return
    }
    const paso = e.key === 'ArrowLeft' ? -16 : e.key === 'ArrowRight' ? 16 : 0
    if (!paso) return
    e.preventDefault()
    const actual = anchos[id] ?? (celda ? celda.getBoundingClientRect().width : base[id])
    const max = celda ? techo(celda, actual) : Infinity
    setAnchos((p) => ({ ...p, [id]: Math.round(Math.min(max, Math.max(MINIMO, actual + paso))) }))
  }

  /** Devuelve una sola columna a su ancho de diseño (doble click). */
  const soltarUna = (id: T) =>
    setAnchos((p) => {
      const n = { ...p }
      delete n[id]
      return n
    })

  return {
    /** Ancho fijado a mano, o `undefined` si sigue con el del diseño. */
    manual: (id: T) => anchos[id],
    ancho: (id: T) => anchos[id] ?? base[id],
    hayCambios: Object.keys(anchos).length > 0,
    resetear: () => setAnchos({}),
    soltarUna,
    arrastrando,
    avisando,
    empezar,
    porTeclado,
  }
}

/* Publica el ancho visible de la tabla como `--tabla-visible`, para que lo
   que va adentro del contenedor scrolleado -el detalle de fila- pueda
   anclarse a la parte que se ve en vez de al ancho total de la tabla.
   Un `100vw` no alcanza: en tablet el contenedor mide bastante menos que
   la ventana. */
export function useAnchoVisible<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const medir = () => el.style.setProperty('--tabla-visible', `${el.clientWidth}px`)
    medir()
    /* `ResizeObserver` cubre los cambios que no vienen de la ventana -por
       ejemplo colapsar el panel del paciente-, y el `resize` cubre el caso
       de la ventana aunque el observer venga demorado (sus callbacks van
       atadas al ciclo de render y no corren con la pestaña sin pintar). */
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    window.addEventListener('resize', medir)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', medir)
    }
  }, [])
  return ref
}

export function ManijaResize<T extends string>({
  id, label, estado, indice = 0,
}: {
  id: T
  label: string
  estado: ReturnType<typeof useAnchoColumnas<T>>
  /** Posición de la columna, para escalonar el aviso inicial. */
  indice?: number
}) {
  const activa = estado.arrastrando === id
  const tocada = estado.manual(id) !== undefined

  return (
    <span
      role="separator"
      aria-orientation="vertical"
      aria-label={`Resize ${label} column`}
      title={`Drag to resize ${label}${tocada ? ' · Double-click to reset' : ''}`}
      tabIndex={0}
      onPointerDown={(e) => estado.empezar(id, e)}
      onDoubleClick={(e) => { e.stopPropagation(); estado.soltarUna(id) }}
      onKeyDown={(e) => estado.porTeclado(id, e)}
      onClick={(e) => e.stopPropagation()}
      /* Sin `fill`: con `both` la animación deja fijada la opacidad final
         (0) y pisa al `group-hover`, dejando la manija invisible para
         siempre después del aviso. */
      style={estado.avisando ? { animation: `col-hint 2.4s ease-in-out ${indice * 60}ms 1` } : undefined}
      /* -right-[5px] lo deja en el gap entre columnas, y 10px de ancho por
         28 de alto le dan un área de agarre real. Ojo: la celda que lo
         contiene no puede llevar `truncate` -su overflow:hidden recorta la
         manija y la vuelve inclickeable-. */
      /* Sólo de `lg` para arriba: abajo la tabla ya se lee scrolleando, no
         hay hover que revele la manija, y su `touch-none` se comía el
         gesto de scroll horizontal si el dedo caía encima. */
      className={cn(
        'group/manija absolute top-1/2 -right-[5px] z-10 hidden h-[28px] w-[10px] -translate-y-1/2 lg:flex',
        'cursor-col-resize touch-none items-center justify-center rounded-full',
        'transition-opacity duration-150 group-hover/fila:opacity-100',
        'focus-visible:opacity-100 focus-visible:outline-none',
        activa || tocada ? 'opacity-100' : 'opacity-0',
      )}
    >
      {/* Guía que baja por toda la tabla mientras se arrastra: el recorte
          del contenedor con overflow la corta justo al pie. */}
      {activa && (
        <span className="bg-dash-blue/25 pointer-events-none absolute -top-[120px] left-1/2 h-[1200px] w-[2px] -translate-x-1/2" />
      )}
      <span
        className={cn(
          'relative w-[3px] rounded-full transition-[height,background-color] duration-150',
          'motion-safe:animate-[col-grip-in_150ms_ease-out]',
          activa
            ? 'bg-dash-blue h-[26px]'
            : cn(
              'group-hover/manija:bg-dash-blue h-[16px] group-hover/manija:h-[22px]',
              tocada ? 'bg-dash-blue/50' : 'bg-[#d4d4d8]',
            ),
        )}
      />
    </span>
  )
}
