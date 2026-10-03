import { useState } from 'react'
import { ArrowLeft, ArrowRight, Baby, Eraser, Grid2x2, PanelBottom, PanelTop, UserRound, type LucideIcon } from 'lucide-react'
import { applyPrimaryDentition, clearSelection, resetMouth } from 'react-advanced-odontogram'
import { ModalShell } from '@/components/patients/form'
import { cn } from '@/lib/utils'

/* La botonera de la app real (red.dev, Dental assessment) arriba del chart: dentición, arcadas, cuadrantes, todas, limpiar
   y moverse de pieza en pieza. Maneja la selección de la librería del odontograma: sus botones de selección (por id) para
   todas y las arcadas, y clic con CMD/CTRL sobre cada pieza para los cuadrantes. La librería numera en FDI; la pantalla,
   en Universal (1-32). Ver design-reference/figma/modulos/clinical-mode.md. */

/* Las piezas en orden Universal, 1 a 32, con su número FDI. */
const UNIVERSAL_A_FDI = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 38, 37, 36, 35, 34, 33, 32, 31, 41, 42, 43, 44, 45, 46, 47, 48]
const CUADRANTES = [1, 2, 3, 4].map((q) => UNIVERSAL_A_FDI.slice((q - 1) * 8, q * 8))

const BOTON = 'flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-line bg-white px-2.5 text-[12.5px] font-medium text-ink shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors hover:bg-surface-subtle'
const ELEGIDO = 'border-dash-blue bg-dash-blue text-white hover:bg-dash-blue-hover'

export function BotoneraDientes({ raiz }: { raiz: HTMLElement | null }) {
  const [denticion, setDenticion] = useState<'permanent' | 'primary'>('permanent')
  const [confirmando, setConfirmando] = useState(false)

  const embed = () => raiz?.querySelector<HTMLElement>('.odonto-embed') ?? null
  const pulsarDeLaLibreria = (id: string) => embed()?.querySelector<HTMLButtonElement>(`#${id}`)?.click()
  const pieza = (fdi: number) => embed()?.querySelector<HTMLElement>(`.tooth-tile[data-tooth="${fdi}"]`) ?? null
  const elegir = (fdis: number[]) => {
    clearSelection()
    fdis.forEach((n, i) => pieza(n)?.dispatchEvent(new MouseEvent('click', { bubbles: true, metaKey: i > 0, ctrlKey: i > 0 })))
  }
  /* Con una pieza elegida, la anterior o la siguiente en orden Universal; sin ninguna, arranca en la 1. */
  const mover = (delta: 1 | -1) => {
    const elegidas = [...new Set([...(embed()?.querySelectorAll<HTMLElement>('.tooth-tile[aria-selected="true"]') ?? [])].map((t) => Number(t.dataset.tooth)))]
    const i = elegidas.length ? UNIVERSAL_A_FDI.indexOf(delta > 0 ? elegidas[elegidas.length - 1]! : elegidas[0]!) : -1
    const siguiente = i < 0 ? 0 : Math.min(Math.max(i + delta, 0), UNIVERSAL_A_FDI.length - 1)
    elegir([UNIVERSAL_A_FDI[siguiente]!])
  }

  const boton = (label: string, icono: LucideIcon | null, onClick: () => void, extra?: { pressed?: boolean; soloIcono?: boolean }) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      aria-label={extra?.soloIcono ? label : undefined}
      aria-pressed={extra?.pressed}
      title={extra?.soloIcono ? label : undefined}
      className={cn(BOTON, extra?.pressed && ELEGIDO, extra?.soloIcono && 'px-2')}
    >
      {icono && (() => { const I = icono; return <I className="size-3.5" /> })()}
      {!extra?.soloIcono && label}
    </button>
  )

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2" role="toolbar" aria-label="Tooth selection">
      <span className="flex items-center gap-1.5">
        {boton('Permanent', UserRound, () => denticion === 'primary' && setConfirmando(true), { pressed: denticion === 'permanent' })}
        {boton('Primary', Baby, () => { if (denticion !== 'primary') { applyPrimaryDentition(); setDenticion('primary') } }, { pressed: denticion === 'primary' })}
      </span>
      <span className="flex items-center gap-1.5">
        {boton('Upper arch', PanelTop, () => { clearSelection(); pulsarDeLaLibreria('btnSelectUpper') })}
        {boton('Lower arch', PanelBottom, () => { clearSelection(); pulsarDeLaLibreria('btnSelectLower') })}
      </span>
      <span className="flex items-center gap-1.5">
        {CUADRANTES.map((fdis, i) => boton(`Q${i + 1}`, Grid2x2, () => elegir(fdis)))}
      </span>
      <span className="flex items-center gap-1.5">
        {boton('All', null, () => pulsarDeLaLibreria('btnSelectAll'))}
        {boton('Clear', Eraser, () => clearSelection())}
      </span>
      <span className="flex items-center gap-1.5">
        {boton('Previous tooth', ArrowLeft, () => mover(-1), { soloIcono: true })}
        {boton('Next tooth', ArrowRight, () => mover(1), { soloIcono: true })}
      </span>

      {/* La librería no tiene "volver a permanente": vuelve con su reinicio, que también borra lo marcado. Se avisa. */}
      {confirmando && (
        <ModalShell
          title="Back to permanent dentition?"
          onClose={() => setConfirmando(false)}
          width="max-w-[420px]"
          footer={
            <>
              <button type="button" onClick={() => setConfirmando(false)} className="h-9 rounded-md border border-line bg-white px-5 text-[13px] font-medium hover:bg-surface-subtle">Cancel</button>
              <button type="button" onClick={() => { resetMouth(); setDenticion('permanent'); setConfirmando(false) }} className="bg-dash-blue hover:bg-dash-blue-hover h-9 rounded-md px-5 text-[13px] font-medium text-white">Switch to permanent</button>
            </>
          }
        >
          <p className="text-[13px] leading-relaxed text-ink-soft">The chart goes back to the permanent teeth. What was marked on the primary teeth is cleared.</p>
        </ModalShell>
      )}
    </div>
  )
}
