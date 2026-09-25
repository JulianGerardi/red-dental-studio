import { useState } from 'react'
import { CirclePlus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModalShell, SelectField, FormFooter } from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'

/* Misma grilla de media hora que "New Exception": desplegable, no texto
   libre con máscara. */
const HORAS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return `${String(h).padStart(2, '0')}:${m} hs`
})

/* Figma 4620:115332 "Settings — Location (Information)": el modal que abre
   "Edit hours" en la pestaña Working Hours de una locación. Se llama **"New
   Availability"**, no "Edit Hours" —el rótulo del botón que lo abre y el
   título del modal no coinciden en el frame; se replica tal cual—.

   Es más chico que "New Hours" (3864:267207, el de la ficha de un empleado):
   sin el aviso ámbar y sin el selector de locación, porque acá ya se está
   adentro de una. Y el alcance tiene sólo dos opciones, no tres. */

const DIAS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const ALCANCES = ['Only this day', 'All linked days'] as const

export function LocationHoursModal({
  dia, onClose, onGuardar,
}: {
  /** Índice 0-6 (domingo a sábado) del día que se estaba editando, si vino de
      una fila puntual. Preselecciona ese día en "Repeat on days". */
  dia?: number
  onClose: () => void
  onGuardar?: (rango: { inicio: string; fin: string }) => void
}) {
  const [rangos, setRangos] = useState([{ inicio: '', fin: '' }])
  const [dias, setDias] = useState<number[]>(dia !== undefined ? [dia] : [1, 2, 3, 4, 5])
  const [alcance, setAlcance] = useState<(typeof ALCANCES)[number]>(ALCANCES[0])
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (rangos.some((r) => !r.inicio.trim() || !r.fin.trim()) || dias.length === 0) return
    onGuardar?.(rangos[0])
    aviso.ok(`Hours saved for ${dias.length} ${dias.length === 1 ? 'day' : 'days'}.`)
    onClose()
  }

  return (
    <ModalShell
      title="New Availability"
      onClose={onClose}
      width="max-w-[420px]"
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-4">
        {rangos.map((r, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="grid flex-1 grid-cols-2 gap-4">
              <SelectField
                label="Start Time" placeholder="00:00 hs" options={HORAS} value={r.inicio}
                onChange={(v) => setRangos((p) => p.map((x, j) => (j === i ? { ...x, inicio: v } : x)))}
                error={intentado && !r.inicio.trim() ? 'Required.' : undefined}
              />
              <SelectField
                label="End Time" placeholder="00:00 hs" options={HORAS} value={r.fin}
                onChange={(v) => setRangos((p) => p.map((x, j) => (j === i ? { ...x, fin: v } : x)))}
                error={intentado && !r.fin.trim() ? 'Required.' : undefined}
              />
            </div>
            {rangos.length > 1 && (
              <button
                type="button"
                aria-label="Remove time range"
                onClick={() => setRangos((p) => p.filter((_, j) => j !== i))}
                className="mt-7 shrink-0 rounded p-1 text-ink-muted hover:bg-surface-muted hover:text-dash-bad-fg"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => setRangos((p) => [...p, { inicio: '', fin: '' }])}
          className="text-dash-blue -mt-2 flex items-center gap-1.5 self-start text-[13px] font-semibold hover:underline"
        >
          <CirclePlus className="size-4" /> Add another time range
        </button>

        <div className="border-t border-line pt-4">
          <p className="text-sm font-bold text-ink">Repeat on days</p>
          <div className="mt-3 flex gap-2">
            {DIAS.map((d, i) => {
              const on = dias.includes(i)
              return (
                <button
                  key={i}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setDias((p) => (on ? p.filter((x) => x !== i) : [...p, i]))}
                  className={cn(
                    'flex size-8 items-center justify-center rounded-md border text-[13px] font-semibold transition-colors',
                    on
                      ? 'border-dash-blue text-dash-blue bg-white'
                      : 'border-transparent text-[#c4c4c8] hover:bg-surface-muted',
                  )}
                >
                  {d}
                </button>
              )
            })}
          </div>
        </div>

        <div className="border-t border-line pt-4">
          <p className="text-sm font-bold text-ink">Apply change to</p>
          <p className="mt-0.5 text-[11px] text-ink-muted">
            Choose how you want these hours to be applied.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {ALCANCES.map((a) => {
              const on = alcance === a
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAlcance(a)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-[13px]',
                    on ? 'border-dash-blue' : 'border-line hover:bg-surface-subtle',
                  )}
                >
                  <span className={cn('flex size-4 shrink-0 items-center justify-center rounded-full border-2', on ? 'border-dash-blue' : 'border-ink-faint')}>
                    {on && <span className="bg-dash-blue size-2 rounded-full" />}
                  </span>
                  {a}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </ModalShell>
  )
}
