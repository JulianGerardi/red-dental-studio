import { cn } from '@/lib/utils'
import {
  MAXILLARY, MANDIBULAR, TOOTH_ICONS,
  type OralExam, type Tooth,
} from '@/data/odontogram'
import { ToothGlyph, OcclusalView } from '@/components/clinical/dental/ToothGlyph'
import type { Finding } from '@/components/clinical/dental/data'

/* Odontograma: dos vistas por pieza -la anatómica y la oclusal-, como el
   odontograma de referencia que pasó Julián, pero dibujado con nuestros
   propios tonos. Ver design-reference/figma/modulos/clinical-mode.md. */

/* Un problema todavía sin resolver, no uno cerrado (Treated/Discarded/...). */
const PROBLEMA_ABIERTO: Finding['status'][] = ['Active', 'Monitoring', 'In Treatment']

function ToothCell({
  tooth, selected, onToggle, onSurface, problema, finding, flip,
}: {
  tooth: Tooth
  selected: boolean
  onToggle: () => void
  onSurface: (index: number) => void
  problema: boolean
  finding: boolean
  /* En la arcada inferior la corona va arriba y la banda lingual también. */
  flip: boolean
}) {
  const missing = tooth.element === 'missing'
  const tinte = problema ? '#fde3e3' : finding ? '#e4ecfa' : '#f1f1f4'

  const icons = (
    <div className="flex h-3 items-center justify-center gap-0.5">
      {tooth.icons.map((k) => {
        const icon = TOOTH_ICONS[k]
        return icon ? (
          <span key={k} title={icon.label} style={{ color: icon.color }} className="text-[8px] leading-none">
            {icon.glyph}
          </span>
        ) : null
      })}
    </div>
  )

  const label = (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'w-full rounded text-[11px] tabular-nums',
        selected
          ? 'bg-primary text-primary-foreground font-medium'
          : problema
            ? 'font-bold text-[#dc2626]'
            : finding
              ? 'text-dash-blue font-bold'
              : 'text-muted-foreground hover:bg-muted font-medium',
      )}
    >
      {tooth.number}
    </button>
  )

  /* La pieza entera abre su detalle; las superficies tienen su propio
     click adentro del SVG. */
  const anatomia = (
    <button type="button" onClick={onToggle} aria-label={`Tooth ${tooth.number}`} className="flex flex-col items-center">
      <ToothGlyph numero={tooth.number} tinte={tinte} ausente={missing} flip={flip} />
      {icons}
    </button>
  )

  const oclusal = (
    <OcclusalView
      numero={tooth.number}
      surfaces={tooth.surfaces}
      ausente={missing}
      seleccionado={selected}
      flip={flip}
      onSurface={onSurface}
    />
  )

  return (
    <div className="flex w-11 shrink-0 flex-col items-center gap-1">
      {flip ? <>{oclusal}{anatomia}{label}</> : <>{label}{anatomia}{oclusal}</>}
    </div>
  )
}

function Arch({
  exam, numbers, flip, selected, onToggle, onSurface, findings, left, center, right,
}: {
  exam: OralExam
  numbers: number[]
  flip: boolean
  selected: number[]
  onToggle: (n: number) => void
  onSurface: (n: number, i: number) => void
  findings: Finding[]
  left: string
  center: string
  right: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-9 shrink-0 rounded-md border bg-background px-1 py-1 text-center text-[13px] font-medium">
        {left}
      </span>
      <div className="flex flex-1 justify-center gap-0.5">
        {numbers.map((n, i) => {
          const delDiente = findings.filter((f) => f.tooth === n)
          return (
            <div key={n} className={cn(i === 8 && 'ml-4')}>
              <ToothCell
                tooth={exam.teeth[n - 1]}
                flip={flip}
                selected={selected.includes(n)}
                onToggle={() => onToggle(n)}
                onSurface={(idx) => onSurface(n, idx)}
                problema={delDiente.some((f) => PROBLEMA_ABIERTO.includes(f.status))}
                finding={delDiente.length > 0}
              />
            </div>
          )
        })}
      </div>
      <span className="w-9 shrink-0 rounded-md border bg-background px-1 py-1 text-center text-[13px] font-medium">
        {right}
      </span>
      <span className="sr-only">{center}</span>
    </div>
  )
}

export function Odontogram({
  exam, selected, onToggle, onSurface, findings = [],
}: {
  exam: OralExam
  selected: number[]
  onToggle: (n: number) => void
  onSurface: (n: number, i: number) => void
  /** Para el número en negrita/color: rojo si hay un problema sin resolver
      en esa pieza, azul si tiene algún finding cerrado. Opcional: las
      vistas sin panel de findings lo dejan afuera y el número queda gris. */
  findings?: Finding[]
}) {
  return (
    <div className="flex w-fit flex-col gap-3">
      <p className="text-center text-sm font-medium">Maxillary</p>
      <Arch
        exam={exam} numbers={MAXILLARY} flip={false} findings={findings}
        selected={selected} onToggle={onToggle} onSurface={onSurface}
        left="UR" center="Maxillary" right="UL"
      />
      <Arch
        exam={exam} numbers={MANDIBULAR} flip findings={findings}
        selected={selected} onToggle={onToggle} onSurface={onSurface}
        left="LR" center="Mandibular" right="LL"
      />
      <p className="text-center text-sm font-medium">Mandibular</p>
    </div>
  )
}
