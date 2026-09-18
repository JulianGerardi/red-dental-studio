import { SURFACE_LABELS } from '@/data/odontogram'

export type Surface = (typeof SURFACE_LABELS)[number]

export const SURFACE_NAMES: Record<Surface, string> = {
  MB: 'Mesio-buccal', B: 'Buccal', DB: 'Disto-buccal', O: 'Occlusal',
  ML: 'Mesio-lingual', L: 'Lingual', DL: 'Disto-lingual',
}

/* Rueda de superficies, geometría propia -no la del proyecto hermano: usa
   otro vocabulario (BC/B/O/P/PC/D/M)-. Acá van las 7 superficies que ya
   modela `odontogram.ts` (MB/B/DB/O/ML/L/DL), en el mismo orden, como 6
   sectores iguales alrededor del círculo oclusal central. Ver
   design-reference/figma/modulos/clinical-mode.md. */
const C = 120
const R = 110
const R1 = 44
const ORDER: Exclude<Surface, 'O'>[] = ['MB', 'B', 'DB', 'DL', 'L', 'ML']

const rad = (deg: number) => (deg * Math.PI) / 180
const pt = (r: number, deg: number) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))] as const

function sector(a1: number, a2: number) {
  const [x1, y1] = pt(R1, a1)
  const [x2, y2] = pt(R, a1)
  const [x3, y3] = pt(R, a2)
  const [x4, y4] = pt(R1, a2)
  return `M${x1} ${y1} L${x2} ${y2} A${R} ${R} 0 0 1 ${x3} ${y3} L${x4} ${y4} A${R1} ${R1} 0 0 0 ${x1} ${y1} Z`
}

const ZONES: { id: Surface; d?: string; label: [number, number] }[] = ORDER.map((id, i) => {
  const a1 = -90 + i * 60
  const a2 = a1 + 60
  const mid = a1 + 30
  const [lx, ly] = pt((R1 + R) / 2, mid)
  return { id, d: sector(a1, a2), label: [lx, ly] }
})
ZONES.push({ id: 'O', label: [C, C] })

export function SurfaceWheel({
  value, onChange, size = 220,
}: {
  value: Surface[]
  onChange: (next: Surface[]) => void
  size?: number
}) {
  function toggle(s: Surface) {
    onChange(value.includes(s) ? value.filter((x) => x !== s) : [...value, s])
  }

  return (
    <svg viewBox="0 0 240 240" width={size} height={size} className="max-w-full shrink-0" role="group" aria-label="Tooth surfaces">
      {ZONES.map((z) => {
        const on = value.includes(z.id)
        return (
          <g
            key={z.id} role="checkbox" aria-checked={on} aria-label={SURFACE_NAMES[z.id]} tabIndex={0}
            onClick={() => toggle(z.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(z.id) } }}
            className="cursor-pointer outline-none [&:focus-visible>*:first-child]:stroke-[#1d56bc] [&:focus-visible>*:first-child]:stroke-[3]"
          >
            {z.d ? (
              <path d={z.d} fill={on ? '#dbe7fa' : '#ffffff'} stroke="#000000" strokeWidth={1.5} />
            ) : (
              <circle cx={C} cy={C} r={R1} fill={on ? '#dbe7fa' : '#ffffff'} stroke="#000000" strokeWidth={1.5} />
            )}
            <text
              x={z.label[0]} y={z.label[1]} textAnchor="middle" dominantBaseline="central"
              className="pointer-events-none select-none" fontSize={16} fontWeight={700} fill="#000000"
            >
              {z.id}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
