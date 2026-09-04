import { cn } from '@/lib/utils'
import {
  MAXILLARY, MANDIBULAR, SURFACE_LABELS, TOOTH_ICONS,
  type OralExam, type Tooth,
} from '@/data/odontogram'

/* Una pieza: 7 superficies en grilla 3 / 1 / 3.
   Fila superior = banda vestibular, centro = oclusal, fila inferior = lingual. */
function ToothCell({
  tooth,
  selected,
  onToggle,
  onSurface,
  flip,
}: {
  tooth: Tooth
  selected: boolean
  onToggle: () => void
  onSurface: (index: number) => void
  /* En la arcada inferior la banda lingual va arriba: se invierte el orden. */
  flip: boolean
}) {
  const missing = tooth.element === 'missing'
  const order = flip ? [4, 5, 6, 3, 0, 1, 2] : [0, 1, 2, 3, 4, 5, 6]

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
        'w-full rounded text-[10px] font-medium tabular-nums',
        selected ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted',
      )}
    >
      {tooth.number}
    </button>
  )

  const grid = (
    <div
      className={cn(
        'relative grid h-[34px] w-[30px] grid-cols-3 gap-px rounded-sm border p-px transition-colors',
        selected ? 'border-primary ring-primary/40 ring-2' : 'border-border',
        missing && 'bg-muted',
      )}
    >
      {missing && (
        <span className="text-muted-foreground pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-base leading-none">
          ✕
        </span>
      )}
      {order.map((idx, pos) => {
        const isOcclusal = idx === 3
        const fill = tooth.surfaces[idx]
        return (
          <button
            key={pos}
            type="button"
            disabled={missing}
            onClick={() => onSurface(idx)}
            title={`${tooth.number} · ${SURFACE_LABELS[idx]}`}
            style={fill ? { backgroundColor: fill } : undefined}
            className={cn(
              missing ? 'bg-transparent' : 'bg-background hover:bg-accent transition-colors',
              isOcclusal && 'col-span-3',
              missing && 'cursor-not-allowed',
            )}
          />
        )
      })}
    </div>
  )

  return (
    <div className="flex w-[34px] shrink-0 flex-col items-center gap-0.5">
      {flip ? (
        <>{grid}{icons}{label}</>
      ) : (
        <>{label}{icons}{grid}</>
      )}
    </div>
  )
}

function Arch({
  exam, numbers, flip, selected, onToggle, onSurface, left, center, right,
}: {
  exam: OralExam
  numbers: number[]
  flip: boolean
  selected: number[]
  onToggle: (n: number) => void
  onSurface: (n: number, i: number) => void
  left: string
  center: string
  right: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-10 shrink-0 rounded-md border bg-background px-2 py-1 text-center text-sm font-medium">
        {left}
      </span>
      <div className="flex flex-1 justify-center gap-1">
        {numbers.map((n, i) => (
          <div key={n} className={cn(i === 8 && 'ml-4')}>
            <ToothCell
              tooth={exam.teeth[n - 1]}
              flip={flip}
              selected={selected.includes(n)}
              onToggle={() => onToggle(n)}
              onSurface={(idx) => onSurface(n, idx)}
            />
          </div>
        ))}
      </div>
      <span className="w-10 shrink-0 rounded-md border bg-background px-2 py-1 text-center text-sm font-medium">
        {right}
      </span>
      <span className="sr-only">{center}</span>
    </div>
  )
}

export function Odontogram({
  exam, selected, onToggle, onSurface,
}: {
  exam: OralExam
  selected: number[]
  onToggle: (n: number) => void
  onSurface: (n: number, i: number) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-center text-sm font-medium">Maxillary</p>
      <Arch
        exam={exam} numbers={MAXILLARY} flip={false}
        selected={selected} onToggle={onToggle} onSurface={onSurface}
        left="UR" center="Maxillary" right="UL"
      />
      <Arch
        exam={exam} numbers={MANDIBULAR} flip
        selected={selected} onToggle={onToggle} onSurface={onSurface}
        left="LR" center="Mandibular" right="LL"
      />
      <p className="text-center text-sm font-medium">Mandibular</p>
    </div>
  )
}
