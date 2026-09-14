import { useCallback, useEffect, useState } from 'react'
import { Check, TriangleAlert } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
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

type Celda = { pos: string; letra: string; nombre: string; activo: boolean; el: HTMLInputElement }

type Control =
  | { tipo: 'cruz'; clave: string; celdas: Celda[] }
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

  /* El selector de superficies es una cruz de 5 celdas, no cinco checkboxes
     sueltos: se lee aparte para poder dibujarlo como corresponde. */
  ;[...card.querySelectorAll<HTMLElement>('.surface-cross')].forEach((cruz, i) => {
    const celdas = [...cruz.querySelectorAll<HTMLLabelElement>('.surface-cell')]
      .map((celda) => {
        const input = celda.querySelector<HTMLInputElement>('input[type="checkbox"]')
        if (!input) return null
        const pos = [...celda.classList].find((c) => c.startsWith('pos-'))?.slice(4) ?? ''
        return {
          pos,
          letra: celda.querySelector('.surf-letter')?.textContent?.trim() || pos.charAt(0).toUpperCase(),
          nombre: celda.querySelector('.surf-name')?.textContent?.trim() || pos,
          activo: input.checked,
          el: input,
        }
      })
      .filter((c): c is Celda => c !== null)
    if (celdas.length) lista.push({ tipo: 'cruz', clave: cruz.id || `cruz-${i}`, celdas })
  })

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
    if (!visible(el) || el.closest('.surface-cross')) return
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

/* Los controles reales se accionan **como lo haría una persona**, no
   escribiéndoles el valor a mano: poner `.checked` o `.value` y disparar un
   `change` sintético cambia el DOM pero no siempre entra en el estado de la
   librería, y al re-renderizar volvía todo al default. */
function tocarCheckbox(el: HTMLInputElement) {
  el.click()
}

function elegirEnSelect(el: HTMLSelectElement, valor: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')?.set
  if (setter) setter.call(el, valor)
  else el.value = valor
  el.dispatchEvent(new Event('input', { bubbles: true }))
  el.dispatchEvent(new Event('change', { bubbles: true }))
}

/* Las cinco superficies en cruz -vestibular arriba, lingual/palatina abajo,
   mesial y distal a los costados y la oclusal al medio-, que es como se
   lee un odontograma. Cada celda escribe sobre su checkbox real. */
const LUGAR: Record<string, string> = {
  buccal: 'col-start-2 row-start-1',
  mesial: 'col-start-1 row-start-2',
  occlusal: 'col-start-2 row-start-2',
  distal: 'col-start-3 row-start-2',
  lingual: 'col-start-2 row-start-3',
}

function CruzSuperficies({ celdas, onCambio }: { celdas: Celda[]; onCambio: () => void }) {
  return (
    <div className="flex items-center gap-4">
      <div className="grid size-[132px] shrink-0 grid-cols-3 grid-rows-3 gap-1">
        {celdas.map((c) => (
          <button
            key={c.pos}
            type="button"
            role="checkbox"
            aria-checked={c.activo}
            aria-label={c.nombre}
            title={c.nombre}
            onClick={() => { tocarCheckbox(c.el); onCambio() }}
            className={cn(
              'flex items-center justify-center rounded-md border text-[13px] font-semibold transition-colors',
              LUGAR[c.pos] ?? '',
              c.activo
                ? 'border-dash-blue bg-dash-blue text-white'
                : 'border-[#e4e4e7] bg-white text-[#71717a] hover:border-[#1d56bc] hover:text-[#1d56bc]',
            )}
          >
            {c.letra}
          </button>
        ))}
      </div>
      <ul className="flex flex-col gap-1 text-[11px] text-[#71717a]">
        {celdas.map((c) => (
          <li key={c.pos} className={cn(c.activo && 'text-dash-blue font-medium')}>
            <span className="inline-block w-4 font-semibold">{c.letra}</span> {c.nombre}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function OdontogramPanel({ card, vacio }: { card: HTMLElement | null; vacio?: React.ReactNode }) {
  const [controles, setControles] = useState<Control[]>([])
  /* La librería no marca sus botones de selección rápida -probado: no tocan
     ni clase ni aria-pressed-, así que el "cuál aprieté" lo lleva el panel.
     Se guarda **por sección**: al volver a un paso tiene que seguir marcado
     lo que se había dejado elegido. */
  const [accionPorPaso, setAccionPorPaso] = useState<Record<string, string | null>>({})
  /* Reset y Clear sí borran lo cargado: se confirman antes. */
  const [confirmando, setConfirmando] = useState<Extract<Control, { tipo: 'accion' }> | null>(null)

  const releer = useCallback(() => {
    setControles(card ? leerControles(card) : [])
  }, [card])

  useEffect(() => {
    if (!card) { setControles([]); return }
    releer()
    /* La librería reescribe la card al cambiar de pieza o de estado. */
    const observer = new MutationObserver(releer)
    observer.observe(card, { childList: true, subtree: true, attributes: true })
    return () => observer.disconnect()
  }, [card, releer])

  const clavePaso = card?.id || card?.querySelector('.card-title')?.textContent?.trim() || 'paso'
  const accionActiva = accionPorPaso[clavePaso] ?? null
  const marcarAccion = (clave: string | null) => setAccionPorPaso((p) => ({ ...p, [clavePaso]: clave }))

  const cruces = controles.filter((c): c is Extract<Control, { tipo: 'cruz' }> => c.tipo === 'cruz')
  const selects = controles.filter((c): c is Extract<Control, { tipo: 'select' }> => c.tipo === 'select')
  const checks = controles.filter((c): c is Extract<Control, { tipo: 'check' }> => c.tipo === 'check')
  const acciones = controles.filter((c): c is Extract<Control, { tipo: 'accion' }> => c.tipo === 'accion')

  if (controles.length === 0) {
    return <div className="px-1 py-6 text-center text-[13px] text-[#a1a1aa]">{vacio ?? 'Nothing to set for this tooth.'}</div>
  }

  /* Sin pieza elegida la librería deshabilita todo. Sin un aviso parecía que
     el panel no andaba: se tocaba una superficie y no pasaba nada. */
  const sinPieza = selects.length > 0 && selects.every((c) => c.off)

  return (
    <div className="flex flex-col gap-4">
      {sinPieza && (
        <p className="bg-dash-count-bg text-dash-blue rounded-md px-3 py-2 text-[12px] font-medium">
          Pick a tooth on the chart to edit it — these fields stay off until then.
        </p>
      )}

      {selects.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,280px))] gap-x-6 gap-y-4">
          {selects.map((c) => (
            <label key={c.clave} className="flex min-w-0 flex-col gap-1.5">
              <span className="truncate text-[11px] font-medium text-[#71717a]">{c.label}</span>
              <select
                value={c.valor}
                disabled={c.off}
                onChange={(e) => { elegirEnSelect(c.el, e.target.value); releer() }}
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

      {cruces.map((c) => <CruzSuperficies key={c.clave} celdas={c.celdas} onCambio={releer} />)}

      {checks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {checks.map((c) => (
            <button
              key={c.clave}
              type="button"
              role="checkbox"
              aria-checked={c.activo}
              disabled={c.off}
              onClick={() => { tocarCheckbox(c.el); releer() }}
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

      {confirmando && (
        <ModalShell
          title={confirmando.label}
          onClose={() => setConfirmando(null)}
          width="max-w-[420px]"
          footer={
            <>
              <button type="button" onClick={() => setConfirmando(null)} className="h-9 rounded-md border border-[#e4e4e7] bg-white px-5 text-[13px] font-medium hover:bg-[#fafafa]">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  confirmando.el.click()
                  marcarAccion(/clear/i.test(confirmando.label) ? null : confirmando.clave)
                  setConfirmando(null)
                }}
                className="h-9 rounded-md bg-[#b22626] px-5 text-[13px] font-medium text-white hover:bg-[#961f1f]"
              >
                {confirmando.label}
              </button>
            </>
          }
        >
          <p className="flex items-start gap-2 text-[13px] leading-relaxed text-[#3f3f46]">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-[#99660d]" />
            This clears everything charted for the current selection — surfaces, conditions and restorations. It cannot be undone.
          </p>
        </ModalShell>
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
                if (/reset|clear|edentulous/i.test(c.label)) { setConfirmando(c); return }
                c.el.click()
                marcarAccion(c.clave)
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
