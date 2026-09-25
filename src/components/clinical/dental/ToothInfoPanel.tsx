import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/* El resumen "Tooth information", redibujado con el diseño de la app. La
   librería lo genera como un bloque de párrafos y una tabla; acá se lee ese
   nodo -que sigue siendo la fuente- y se muestra como una ficha.
   Ver design-reference/figma/modulos/clinical-mode.md. */

type Arcada = { arcada: string; piezas: string }
type Linea = { rotulo: string; valor: string; vacio: boolean }
export type Resumen = { titular: string; columna: string; arcadas: Arcada[]; lineas: Linea[] }
export type LineaPerio = { rotulo: string; valor: string; vacio: boolean }

/* La librería escribe los renglones sin dato con un texto que arranca en
   "No"/"no" ("No carious teeth.", "no recorded wear"): sirve para
   apagarlos visualmente en vez de darles el mismo peso que a un hallazgo. */
const sinDato = (valor: string) => /^no\b/i.test(valor.trim())

/* "Periodontal status" es la excepción: sano se lee "the periodontium is
   healthy", no "no ...", así que `sinDato` lo cuenta como si tuviera
   hallazgo. Lo usa `hayHallazgo` (el punto rojo del ícono) para no avisar
   de un examen sano. */
const saludable = (valor: string) => /\bhealthy\b/i.test(valor)

/** Hay algo para ver -y ameritar el punto rojo del ícono- si algún
    renglón tiene dato real Y, si es el de periodontal, ese dato no es
    "sano"; o si ya se cargó algún sitio en el sondaje periodontal. */
export function hayHallazgo(resumen: Resumen | null, perio: LineaPerio[] | null = null) {
  const enResumen = (resumen?.lineas ?? []).some((l) => {
    if (l.vacio) return false
    if (l.rotulo === 'Periodontal status') return !saludable(l.valor)
    return true
  })
  const enPerio = (perio ?? []).some((l) => l.rotulo === 'Charted sites' && !l.vacio)
  return enResumen || enPerio
}

/* El sondaje sin cargar se lee "–" (promedios/máximos) o "0"/"0%"
   (conteos y porcentajes): mismo criterio de "sin dato" que el resto del
   panel, para no resaltar un renglón en cero como si fuera un hallazgo. */
const sinDatoPerio = (valor: string) => valor === '–' || valor === '0' || valor === '0%'

function leerResumenPerio(nodo: HTMLElement): LineaPerio[] {
  return [...nodo.querySelectorAll('.perio-fullgrid-summary-item')].map((item) => {
    const rotulo = item.querySelector('.perio-fullgrid-summary-label')?.textContent?.trim() ?? ''
    const valor = item.querySelector('.perio-fullgrid-summary-value')?.textContent?.trim() ?? ''
    return { rotulo, valor, vacio: sinDatoPerio(valor) }
  })
}

function leerResumen(nodo: HTMLElement): Resumen {
  const tabla = nodo.querySelector('table')
  return {
    titular: nodo.querySelector('.tooth-info-overview')?.textContent?.trim() ?? '',
    columna: [...(tabla?.querySelectorAll('thead th') ?? [])].map((e) => e.textContent?.trim() ?? '').filter(Boolean)[0] ?? '',
    arcadas: [...(tabla?.querySelectorAll('tbody tr') ?? [])].map((tr) => {
      const celdas = [...tr.children].map((td) => td.textContent?.trim() ?? '')
      return { arcada: celdas[0] ?? '', piezas: celdas[1] ?? '' }
    }),
    lineas: [...nodo.querySelectorAll('.tooth-info-line')].map((p) => {
      const texto = p.textContent?.trim() ?? ''
      const corte = texto.indexOf(':')
      const rotulo = corte > 0 ? texto.slice(0, corte).trim() : texto
      const valor = corte > 0 ? texto.slice(corte + 1).trim() : ''
      return { rotulo, valor, vacio: sinDato(valor) }
    }),
  }
}

/* La usan tanto el panel como el ícono -para el punto rojo de "hay algo
   nuevo para ver"-, así que leen el mismo resumen en vez de cada uno
   observar `nodo` por su cuenta. `nodo` llega en `null` en Periodontal
   Status: ahí `.tooth-info` no existe, sólo `.perio-summary-card`. */
export function useResumenDental(nodo: HTMLElement | null) {
  const [resumen, setResumen] = useState<Resumen | null>(null)

  const releer = useCallback(() => setResumen(nodo ? leerResumen(nodo) : null), [nodo])

  useEffect(() => {
    releer()
    if (!nodo) return
    /* La librería reescribe el resumen con cada cambio del chart. */
    const observer = new MutationObserver(releer)
    observer.observe(nodo, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [nodo, releer])

  return resumen
}

/* `.perio-summary-card` sólo existe en el DOM mientras se ve Periodontal
   Status -la librería la saca por completo al volver a Odontogram, no la
   deja oculta-, así que `perioNodo` llega en `null` la mayor parte del
   tiempo y el bloque de abajo no se dibuja. */
export function usePerioResumen(perioNodo: HTMLElement | null) {
  const [perio, setPerio] = useState<LineaPerio[] | null>(null)

  const releer = useCallback(() => setPerio(perioNodo ? leerResumenPerio(perioNodo) : null), [perioNodo])

  useEffect(() => {
    releer()
    if (!perioNodo) return
    const observer = new MutationObserver(releer)
    observer.observe(perioNodo, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [perioNodo, releer])

  return perio
}

export function ToothInfoPanel({ nodo, perioNodo }: { nodo: HTMLElement | null; perioNodo?: HTMLElement | null }) {
  const resumen = useResumenDental(nodo)
  const perio = usePerioResumen(perioNodo ?? null)
  if (!resumen && !(perio && perio.length > 0)) return null

  return (
    <div className="flex flex-col gap-4">
      {resumen?.titular && (
        <p className="text-[13px] font-semibold text-ink">{resumen.titular}</p>
      )}

      {perio && perio.length > 0 && (
        <div className="rounded-lg border border-line-row bg-surface-alt p-3">
          <p className="mb-2 text-[11px] font-semibold text-ink-muted">Periodontal summary</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2">
            {perio.map((l) => (
              <div key={l.rotulo} className="flex items-center justify-between gap-2">
                <dt className="text-[12px] text-ink-soft">{l.rotulo}</dt>
                <dd className={cn('text-[12px] tabular-nums', l.vacio ? 'text-ink-faint' : 'font-semibold text-ink')}>
                  {l.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {resumen && resumen.arcadas.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-line-row">
          <div className="bg-surface-alt px-3 py-2 text-[11px] font-semibold text-ink-muted">
            {resumen.columna}
          </div>
          {resumen.arcadas.map((a) => (
            <div key={a.arcada} className="flex items-start gap-3 border-t border-line-row px-3 py-2">
              <span className="w-[84px] shrink-0 text-[12px] font-medium text-ink">{a.arcada}</span>
              <span className="min-w-0 flex-1 text-[12px] leading-relaxed text-ink-soft tabular-nums">{a.piezas}</span>
            </div>
          ))}
        </div>
      )}

      {resumen && resumen.lineas.length > 0 && (
        <dl className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-3">
          {resumen.lineas.map((l) => (
            <div key={l.rotulo} className="min-w-0">
              <dt className="text-[11px] font-medium text-ink-muted">{l.rotulo}</dt>
              <dd className={cn('text-[12px] leading-snug', l.vacio ? 'text-ink-faint' : 'font-medium text-ink')}>
                {l.valor || '—'}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
