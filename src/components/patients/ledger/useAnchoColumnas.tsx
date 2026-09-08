import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const MINIMO = 40

/* Ancho por columna arrastrable a mano. Las dos tablas del Ledger lo usan:
   arrancan con el ancho del diseño y el usuario puede ensanchar la columna
   que necesite leer entera. Ver design-reference/figma/modulos/ledger.md. */
export function useAnchoColumnas<T extends string>(base: Record<T, number>) {
  const [anchos, setAnchos] = useState<Partial<Record<T, number>>>({})
  const [arrastrando, setArrastrando] = useState<T | null>(null)
  const ref = useRef<{ id: T; x0: number; w0: number } | null>(null)

  /* La columna elástica (Description) no tiene ancho fijo hasta que se la
     toca: hasta entonces crece con la tabla. Por eso el ancho inicial del
     arrastre se lee del DOM y no de `base`. */
  const empezar = (id: T, e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const celda = e.currentTarget.parentElement
    const w0 = celda ? celda.getBoundingClientRect().width : base[id]
    ref.current = { id, x0: e.clientX, w0 }
    setArrastrando(id)

    const mover = (ev: PointerEvent) => {
      const a = ref.current
      if (!a) return
      setAnchos((p) => ({ ...p, [a.id]: Math.max(MINIMO, Math.round(a.w0 + ev.clientX - a.x0)) }))
    }
    const soltar = () => {
      ref.current = null
      setArrastrando(null)
      window.removeEventListener('pointermove', mover)
      window.removeEventListener('pointerup', soltar)
    }
    window.addEventListener('pointermove', mover)
    window.addEventListener('pointerup', soltar)
  }

  /* Con teclado: flechas mueven de a 16px, para no dejar la función sólo
     al alcance del mouse. */
  const porTeclado = (id: T, e: React.KeyboardEvent<HTMLElement>) => {
    const paso = e.key === 'ArrowLeft' ? -16 : e.key === 'ArrowRight' ? 16 : 0
    if (!paso) return
    e.preventDefault()
    const celda = e.currentTarget.parentElement
    const actual = anchos[id] ?? (celda ? celda.getBoundingClientRect().width : base[id])
    setAnchos((p) => ({ ...p, [id]: Math.max(MINIMO, Math.round(actual + paso)) }))
  }

  return {
    /** Ancho fijado a mano, o `undefined` si sigue con el del diseño. */
    manual: (id: T) => anchos[id],
    ancho: (id: T) => anchos[id] ?? base[id],
    hayCambios: Object.keys(anchos).length > 0,
    resetear: () => setAnchos({}),
    arrastrando,
    empezar,
    porTeclado,
  }
}

export function ManijaResize<T extends string>({
  id, label, estado,
}: {
  id: T
  label: string
  estado: ReturnType<typeof useAnchoColumnas<T>>
}) {
  return (
    <span
      role="separator"
      aria-orientation="vertical"
      aria-label={`Resize ${label} column`}
      tabIndex={0}
      onPointerDown={(e) => estado.empezar(id, e)}
      onKeyDown={(e) => estado.porTeclado(id, e)}
      onClick={(e) => e.stopPropagation()}
      /* -right-[5px] lo deja en el gap entre columnas, y 10px de ancho por
         28 de alto le dan un área de agarre real. Ojo: la celda que lo
         contiene no puede llevar `truncate` -su overflow:hidden recorta la
         manija y la vuelve inclickeable-. */
      className={cn(
        'absolute top-1/2 -right-[5px] z-10 flex h-[28px] w-[10px] -translate-y-1/2 cursor-col-resize touch-none items-center justify-center',
        'opacity-0 transition-opacity group-hover/fila:opacity-100 focus-visible:opacity-100 focus-visible:outline-none',
        estado.arrastrando === id && 'opacity-100',
      )}
    >
      <span className={cn('h-4 w-px bg-[#d4d4d8]', estado.arrastrando === id && 'bg-dash-blue h-full w-[2px]')} />
    </span>
  )
}
