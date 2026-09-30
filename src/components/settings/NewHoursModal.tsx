import { useState } from 'react'
import { CirclePlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModalShell, SelectField, FormFooter } from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'

/* Figma 3864:267207 "New Hours". Aviso ámbar con barra de acento, locación,
   rangos horarios con su nota de zona horaria, los días de repetición y el
   alcance del cambio. Los textos van tal cual. */

const DIAS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const ZONA = 'Time zone in San Francisco, CA, USA (GMT-7)'
const ALCANCES = ['Only this day', 'All selected days', 'This and future weeks']

/* Misma grilla de media hora que "New Exception". */
const HORAS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return `${String(h).padStart(2, '0')}:${m} hs`
})

export function NewHoursModal({ onClose }: { onClose: () => void }) {
  const [rangos, setRangos] = useState([{ inicio: '', fin: '' }])
  const [dias, setDias] = useState<number[]>([1, 4, 5, 6])
  const [alcance, setAlcance] = useState(ALCANCES[0])
  const [locacion, setLocacion] = useState('')
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!locacion.trim() || rangos.some((r) => !r.inicio.trim() || !r.fin.trim())) return
    aviso.ok(`Hours saved for ${dias.length} ${dias.length === 1 ? 'day' : 'days'}.`)
    onClose()
  }

  return (
    <ModalShell
      title="New Hours"
      onClose={onClose}
      width="max-w-[420px]"
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-4">
        <div className="rounded-r-md border-l-[3px] border-l-attn-fg bg-[#fffbeb] px-3 py-2.5">
          <p className="text-[11px] font-bold text-attn-fg">Attention needed</p>
          <p className="mt-1 text-[11px] leading-[1.5] font-medium text-attn-fg">
            Select the location assigned to the provider, then set the start and end times in the
            location&apos;s local time zone. The system will automatically convert and store the
            shift in Coordinated Universal Time (UTC) for consistency across all locations.
          </p>
        </div>

        <div>
          <SelectField
            label="Location"
            options={['Abril', 'Alaska Medical', 'Bayside Dental']}
            value={locacion}
            onChange={setLocacion}
            error={intentado && !locacion.trim() ? 'This field is required.' : undefined}
          />
          <p className="mt-1.5 text-[11px] text-ink-muted">{ZONA}</p>
        </div>

        {rangos.map((r, i) => (
          <div key={i}>
            <div className="grid grid-cols-2 gap-4">
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
            <p className="mt-1.5 text-[11px] text-ink-muted">{ZONA}</p>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setRangos((p) => [...p, { inicio: '', fin: '' }])}
          className="text-dash-blue flex items-center gap-1.5 self-start text-[13px] font-semibold hover:underline"
        >
          <CirclePlus className="size-4" /> Add another time range
        </button>

        <div className="border-t border-line pt-4">
          <p className="text-sm font-bold text-ink">Repeat on days</p>
          <p className="mt-0.5 text-[11px] text-ink-muted">Set your regular hours for each day.</p>
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

        <div className="rounded-r-md border-l-[3px] border-l-dash-blue bg-[#eff4ff] px-3 py-2.5">
          <p className="text-dash-blue text-[11px] leading-[1.5] font-semibold">
            This will update the hours for all selected days with the time ranges you&apos;ve set above.
          </p>
        </div>
      </div>
    </ModalShell>
  )
}
