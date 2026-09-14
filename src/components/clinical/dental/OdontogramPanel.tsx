import { useCallback, useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Panel de controles del odontograma, dibujado con los componentes de esta
   app en vez de estilar el markup de la librería.

   Cómo funciona: la librería sigue montada y con toda su lógica, pero su
   panel queda fuera de pantalla (ver `.controles-abiertos .panel` en
   odontogram-theme.css). Acá se leen sus controles reales -selects,
   checkboxes y botones- y se dibujan de nuevo con nuestro diseño; cada
   interacción escribe sobre el control original y dispara su evento, así
   que la librería reacciona igual que si la hubieran tocado a ella.
   Ver design-reference/figma/modulos/clinical-mode.md. */

type Control =
  | { tipo: 'select'; clave: string; label: string; valor: string; opciones: { v: string; t: string }[]; off: boolean; el: HTMLSelectElement }
  | { tipo: 'check'; clave: string; label: string; activo: boolean; off: boolean; el: HTMLInputElement }
  | { tipo: 'accion'; clave: string; label: string; off: boolean; el: HTMLButtonElement }

const visible = (el: HTMLElement) => el.offsetParent !== null || el.getClientRects().length > 0

/** El texto propio del contenedor, salteando el control -y cualquier nodo
    que lo contenga-: si no, el label se come el texto de las `<option>`. */
function etiquetaDe(contenedor: Element | null, control: Element, porDefecto: string) {
  if (!contenedor) return porDefecto
  const texto = [...contenedor.childNodes]
    .filter((n) => {
      if (n === control || n.contains(control)) return false
      return n.nodeType === Node.TEXT_NODE || (n instanceof HTMLElement && ['SPAN', 'LABEL', 'STRONG', 'B'].includes(n.tagName))
    })
    .map((n) => n.textContent ?? '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
  return texto || porDefecto
}

function leerControles(card: HTMLElement): Control[] {
  const lista: Control[] = []

  card.querySelectorAll<HTMLSelectElement>('select').forEach((el, i) => {
    if (!visible(el)) return
    lista.push({
      tipo: 'select',
      off: el.disabled,
      clave: el.id || `sel-${i}`,
      label: etiquetaDe(el.closest('.row') ?? el.parentElement, el, 'Option'),
      valor: el.value,
      opciones: [...el.options].map((o) => ({ v: o.value, t: o.textContent ?? o.value })),
      el,
    })
  })

  card.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((el, i) => {
    if (!visible(el)) return
    lista.push({
      tipo: 'check',
      off: el.disabled,
      clave: el.id || `chk-${i}`,
      label: etiquetaDe(el.closest('label') ?? el.parentElement, el, 'Option'),
      activo: el.checked,
      el,
    })
  })

  card.querySelectorAll<HTMLButtonElement>('button').forEach((el, i) => {
    if (!visible(el)) return
    const texto = (el.textContent ?? '').trim()
    /* El botón de plegar la card no viene: el panel ya se pliega solo. */
    if (!texto || texto === '−' || texto === '-') return
    lista.push({ tipo: 'accion', clave: el.id || `btn-${i}`, label: texto, off: el.disabled, el })
  })

  return lista
}

/** Escribe sobre el control real y dispara el evento que la librería escucha. */
function aplicar(el: HTMLElement, cambio: () => void, evento: 'change' | 'click') {
  cambio()
  if (evento === 'click') el.click()
  else el.dispatchEvent(new Event('change', { bubbles: true }))
}

export function OdontogramPanel({ card, vacio }: { card: HTMLElement | null; vacio?: React.ReactNode }) {
  const [controles, setControles] = useState<Control[]>([])
  /* La librería no marca sus botones de selección rápida -probado: no tocan
     ni clase ni aria-pressed-, así que el "cuál aprieté" lo lleva el panel. */
  const [accionActiva, setAccionActiva] = useState<string | null>(null)

  const releer = useCallback(() => {
    setControles(card ? leerControles(card) : [])
  }, [card])

  useEffect(() => {
    setAccionActiva(null)
  }, [card])

  useEffect(() => {
    if (!card) { setControles([]); return }
    releer()
    /* La librería reescribe la card al cambiar de pieza o de estado. */
    const observer = new MutationObserver(releer)
    observer.observe(card, { childList: true, subtree: true, attributes: true })
    return () => observer.disconnect()
  }, [card, releer])

  const selects = controles.filter((c): c is Extract<Control, { tipo: 'select' }> => c.tipo === 'select')
  const checks = controles.filter((c): c is Extract<Control, { tipo: 'check' }> => c.tipo === 'check')
  const acciones = controles.filter((c): c is Extract<Control, { tipo: 'accion' }> => c.tipo === 'accion')

  if (controles.length === 0) {
    return <div className="px-1 py-6 text-center text-[13px] text-[#a1a1aa]">{vacio ?? 'Nothing to set for this tooth.'}</div>
  }

  return (
    <div className="flex flex-col gap-4">
      {selects.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,280px))] gap-x-6 gap-y-4">
          {selects.map((c) => (
            <label key={c.clave} className="flex min-w-0 flex-col gap-1.5">
              <span className="truncate text-[11px] font-medium text-[#71717a]">{c.label}</span>
              <select
                value={c.valor}
                disabled={c.off}
                onChange={(e) => aplicar(c.el, () => { c.el.value = e.target.value }, 'change')}
                className={cn(
                  'h-9 w-full min-w-0 rounded-md border px-2.5 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors',
                  'focus:border-dash-blue focus:ring-2 focus:ring-[#1d56bc]/20 focus:outline-none',
                  c.off ? 'border-[#e4e4e7] bg-[#fafafa] text-[#a1a1aa]' : 'border-[#e4e4e7] bg-white text-[#09090b] hover:border-[#d4d4d8]',
                )}
              >
                {c.opciones.map((o) => <option key={o.v} value={o.v}>{o.t}</option>)}
              </select>
            </label>
          ))}
        </div>
      )}

      {checks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {checks.map((c) => (
            <button
              key={c.clave}
              type="button"
              role="checkbox"
              aria-checked={c.activo}
              disabled={c.off}
              onClick={() => aplicar(c.el, () => { c.el.checked = !c.el.checked }, 'change')}
              className={cn(
                'flex h-8 items-center gap-2 rounded-md border px-2.5 text-[12px] transition-colors disabled:opacity-50',
                c.activo ? 'border-dash-blue bg-dash-count-bg text-dash-blue font-medium' : 'border-[#e4e4e7] bg-white text-[#3f3f46] hover:bg-[#fafafa]',
              )}
            >
              <span className={cn('flex size-3.5 shrink-0 items-center justify-center rounded-[3px] border', c.activo ? 'bg-dash-blue border-dash-blue' : 'border-[#a1a1aa]')}>
                {c.activo && <Check className="size-2.5 text-white" strokeWidth={3} />}
              </span>
              <span className="truncate">{c.label}</span>
            </button>
          ))}
        </div>
      )}

      {acciones.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-[#f1f1f4] pt-3">
          {acciones.map((c) => (
            <button
              key={c.clave}
              type="button"
              disabled={c.off}
              aria-pressed={accionActiva === c.clave}
              onClick={() => {
                aplicar(c.el, () => {}, 'click')
                /* "Clear selection" no queda marcado: deshace la selección. */
                setAccionActiva(/clear/i.test(c.label) ? null : c.clave)
              }}
              className={cn(
                'h-8 rounded-md border px-3 text-[12px] font-medium transition-colors disabled:opacity-50',
                accionActiva === c.clave
                  ? 'border-dash-blue bg-dash-blue text-white'
                  : 'border-[#e4e4e7] bg-white text-[#3f3f46] hover:bg-[#fafafa]',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
