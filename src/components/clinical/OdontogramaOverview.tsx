import { useEffect, useState } from 'react'
import { Maximize2, Minimize2, TriangleAlert } from 'lucide-react'
import { OdontogramChartSurface, OdontogramProvider } from 'react-advanced-odontogram'
import { cn } from '@/lib/utils'
import { TEMA, VARIABLES } from '@/components/clinical/OdontogramEmbed'
import { useUltimaCondicion } from '@/components/clinical/ExamLayout'
import { pestanaDeExamen } from '@/components/clinical/RecordDetail'
import { CarasLinguales } from '@/components/clinical/dental/CarasLinguales'
import { elegirAlAbrir, fdiDe, sincronizarOdontograma } from '@/components/clinical/dental/estadoOdontograma'
import type { Pestana, UltimaCondicion } from '@/data/clinical-mode'
import '@/styles/odontogram-scoped.css'
import '@/styles/odontogram-theme.css'

/* El chart del Overview de Clinical Mode: el mismo odontograma de DentAssmt, de sólo lectura, con la última condición
   cargada resaltada y su aviso abajo. Ver design-reference/figma/modulos/clinical-mode.md (2026-10-18). */

/** El odontograma de DentAssmt sin controles y sin poder tocarlo: lo mismo cargado (estadoOdontograma) y la pieza de la
    última condición marcada. Como OdontogramEmbed, no puede haber dos montados a la vez: la librería es una sola. */
export function OdontogramaLectura({ pieza }: { /** Universal (1-32): la pieza resaltada. */ pieza?: number | null }) {
  const [raiz, setRaiz] = useState<HTMLDivElement | null>(null)

  useEffect(() => sincronizarOdontograma({ editable: false }), [])

  /* La librería rearma la grilla cuando cambia algo: la marca se vuelve a poner. Se observan nodos, no clases. */
  useEffect(() => {
    if (!raiz) return
    const fdi = pieza ? fdiDe(pieza) : 0
    const marcar = () => {
      raiz.querySelectorAll('.es-ultima').forEach((n) => n.classList.remove('es-ultima'))
      if (!fdi) return
      raiz.querySelectorAll(`.tooth-tile[data-tooth="${fdi}"], [data-cara-de="${fdi}"]`).forEach((n) => n.classList.add('es-ultima'))
      raiz.querySelectorAll('.tooth-label-cell').forEach((n) => n.textContent?.trim() === String(pieza) && n.classList.add('es-ultima'))
    }
    marcar()
    const observer = new MutationObserver(marcar)
    observer.observe(raiz, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [raiz, pieza])

  return (
    <div ref={setRaiz} className="odonto-embed odonto-resumen w-full" style={VARIABLES}>
      <OdontogramProvider themeConfig={TEMA} language="en" numberingSystem="UNIVERSAL" readOnly>
        <OdontogramChartSurface />
      </OdontogramProvider>
      <CarasLinguales raiz={raiz} />
    </div>
  )
}

export function OdontogramaOverview({ ampliado = false, onAmpliar, onDetalle, ultima: fija }: {
  /** Ampliado: el Overview esconde Treatment Plan y la Problem List y el chart usa todo el ancho. */
  ampliado?: boolean
  onAmpliar?: () => void
  /** Show details: la pestaña del examen donde se cargó la condición (DentAssmt abre con la pieza elegida). */
  onDetalle?: (pestana: Pestana) => void
  /** La condición del aviso. Sin ella, la última que se cargó con Add Condition (ExamFindingsProvider). */
  ultima?: UltimaCondicion
}) {
  const delPaciente = useUltimaCondicion()
  const ultima = fija ?? delPaciente
  const pestana = ultima.examen ? pestanaDeExamen(ultima.examen) : undefined

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-panel">
      {/* Fondo punteado: es el del frame y da la sensación de mesa de trabajo. */}
      <div
        className="overflow-x-auto p-4 pb-16"
        style={{ background: 'radial-gradient(#e4e4e7 1px, transparent 1px) 0 0 / 16px 16px, #fafbfe' }}
      >
        <div className={cn('mx-auto', ampliado ? 'max-w-[1100px] min-w-[900px]' : 'min-w-[720px]')}>
          <OdontogramaLectura pieza={ultima.pieza} />
        </div>
      </div>

      <button
        type="button"
        onClick={onAmpliar}
        aria-label={ampliado ? 'Collapse chart' : 'Expand chart'}
        aria-pressed={ampliado}
        className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-lg border border-line bg-white shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle"
      >
        {ampliado ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
      </button>

      {/* Desde sm, una sola línea: con una condición larga el aviso subía y tapaba los números de abajo. El nombre se corta. */}
      <div className="absolute right-3 bottom-3 left-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-line bg-white/95 px-3 py-2 shadow-[0_4px_14px_rgb(0_0_0/0.1)] backdrop-blur-sm sm:left-auto sm:max-w-[min(600px,calc(100%-24px))] sm:flex-nowrap">
        <span className="flex min-w-0 items-center gap-2">
          <TriangleAlert className="size-4 shrink-0 text-warn-fg" />
          <span className="truncate text-[13px] font-semibold text-ink" title={ultima.condicion}>
            Last Condition: {ultima.condicion}
            {ultima.pieza && <span className="sr-only"> on tooth {ultima.pieza}</span>}
          </span>
        </span>
        <span className="shrink-0 text-[11px] whitespace-nowrap text-ink-muted">Last Update: {ultima.actualizado}</span>
        {pestana && (
          <button
            type="button"
            onClick={() => {
              if (pestana === 'DentAssmt' && ultima.pieza) elegirAlAbrir(ultima.pieza)
              onDetalle?.(pestana)
            }}
            className="bg-dash-blue hover:bg-dash-blue-hover ml-auto shrink-0 rounded-md px-2.5 py-1 text-[11px] font-semibold text-white transition-colors"
          >
            Show details
          </button>
        )}
      </div>
    </div>
  )
}
