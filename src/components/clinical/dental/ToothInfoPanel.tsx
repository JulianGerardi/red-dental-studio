import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/* El resumen "Tooth information", redibujado con el diseño de la app. La
   librería lo genera como un bloque de párrafos y una tabla; acá se lee ese
   nodo -que sigue siendo la fuente- y se muestra como una ficha.
   Ver design-reference/figma/modulos/clinical-mode.md. */

type Arcada = { arcada: string; piezas: string }
type Linea = { rotulo: string; valor: string; vacio: boolean }
export type Resumen = { titular: string; columna: string; arcadas: Arcada[]; lineas: Linea[] }

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
    "sano". */
export function hayHallazgo(resumen: Resumen | null) {
  if (!resumen) return false
  return resumen.lineas.some((l) => {
    if (l.vacio) return false
    if (l.rotulo === 'Periodontal status') return !saludable(l.valor)
    return true
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
   observar `nodo` por su cuenta. */
export function useResumenDental(nodo: HTMLElement) {
  const [resumen, setResumen] = useState<Resumen | null>(null)

  const releer = useCallback(() => setResumen(leerResumen(nodo)), [nodo])

  useEffect(() => {
    releer()
    /* La librería reescribe el resumen con cada cambio del chart. */
    const observer = new MutationObserver(releer)
    observer.observe(nodo, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [nodo, releer])

  return resumen
}

export function ToothInfoPanel({ nodo }: { nodo: HTMLElement }) {
  const resumen = useResumenDental(nodo)
  if (!resumen) return null

  return (
    <div className="flex flex-col gap-4">
      {resumen.titular && (
        <p className="text-[13px] font-semibold text-[#09090b]">{resumen.titular}</p>
      )}

      {resumen.arcadas.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-[#e7e7e7]">
          <div className="bg-[#f9f9f9] px-3 py-2 text-[11px] font-semibold text-[#71717a]">
            {resumen.columna}
          </div>
          {resumen.arcadas.map((a) => (
            <div key={a.arcada} className="flex items-start gap-3 border-t border-[#e7e7e7] px-3 py-2">
              <span className="w-[84px] shrink-0 text-[12px] font-medium text-[#09090b]">{a.arcada}</span>
              <span className="min-w-0 flex-1 text-[12px] leading-relaxed text-[#3f3f46] tabular-nums">{a.piezas}</span>
            </div>
          ))}
        </div>
      )}

      {resumen.lineas.length > 0 && (
        <dl className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-3">
          {resumen.lineas.map((l) => (
            <div key={l.rotulo} className="min-w-0">
              <dt className="text-[11px] font-medium text-[#71717a]">{l.rotulo}</dt>
              <dd className={cn('text-[12px] leading-snug', l.vacio ? 'text-[#a1a1aa]' : 'font-medium text-[#09090b]')}>
                {l.valor || '—'}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
