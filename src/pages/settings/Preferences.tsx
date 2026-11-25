import { useState, type KeyboardEvent } from 'react'
import { CalendarDays, Moon, Sun, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { Card } from '@/components/settings/primitives'
import { FieldLabel } from '@/components/patients/form'
import { Pill } from '@/components/ui/pill'
import { aviso } from '@/components/ui/toaster'
import { PADDING_PAGINA, TARJETA_INTERNA } from '@/lib/estilos'

/* Settings → Preferences (red.dev: Account Preferences). Tema y formato de fecha de quien usa la app; se aplican al
   elegir, sin Save, como en red.dev. Las dos cards de red.dev con la vista previa aparte pasan a una columna, con la
   vista previa debajo de los formatos. Ver design-reference/figma/modulos/preferences.md. */

export const FORMATOS_FECHA = [
  { valor: 'MM/DD/YYYY', detalle: 'Month/Day/Year' },
  { valor: 'DD/MM/YYYY', detalle: 'Day/Month/Year' },
  { valor: 'YYYY-MM-DD', detalle: 'Year-Month-Day' },
] as const
export type FormatoFecha = (typeof FORMATOS_FECHA)[number]['valor']
type Tema = 'Light' | 'Dark'

const CLAVE = 'preferences:date-format'

export function formatearFecha(d: Date, formato: FormatoFecha) {
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = String(d.getFullYear())
  return formato === 'MM/DD/YYYY' ? `${mm}/${dd}/${yyyy}` : formato === 'DD/MM/YYYY' ? `${dd}/${mm}/${yyyy}` : `${yyyy}-${mm}-${dd}`
}

const leer = (): FormatoFecha => {
  try {
    const v = localStorage.getItem(CLAVE)
    return FORMATOS_FECHA.some((f) => f.valor === v) ? (v as FormatoFecha) : 'MM/DD/YYYY'
  } catch { return 'MM/DD/YYYY' }
}

/* Una opción como card con su punto, la de OpcionDireccion (Relationships) con título y bajada. */
function Opcion({ titulo, detalle, icono: Icono, elegida, disabled, extra, onElegir }: {
  titulo: string
  detalle: string
  icono?: LucideIcon
  elegida: boolean
  disabled?: boolean
  extra?: React.ReactNode
  onElegir: () => void
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={elegida}
      disabled={disabled}
      tabIndex={elegida ? 0 : -1}
      onClick={onElegir}
      className={cn(
        'flex min-h-14 items-center gap-3 rounded-lg border bg-white px-3 py-2.5 text-left transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue',
        elegida ? 'border-dash-blue bg-dash-count-bg' : 'border-line hover:bg-surface-subtle',
        'disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:hover:bg-surface-subtle',
      )}
    >
      <span className={cn('flex size-4 shrink-0 items-center justify-center rounded-full border-2', elegida ? 'border-dash-blue' : 'border-ink-faint')}>
        {elegida && <span className="size-[7px] rounded-full bg-dash-blue" />}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={cn('flex items-center gap-1.5 text-[13px] font-semibold', disabled ? 'text-ink-muted' : 'text-ink')}>
          {Icono && <Icono aria-hidden className="size-3.5" />}
          {titulo}
        </span>
        <span className="text-[12px] text-ink-muted">{detalle}</span>
      </span>
      {extra}
    </button>
  )
}

/* Flechas para moverse entre las opciones, como un radiogroup nativo. */
function moverConFlechas(e: KeyboardEvent<HTMLDivElement>) {
  const radios = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)')]
  const i = radios.indexOf(document.activeElement as HTMLButtonElement)
  if (i < 0) return
  const paso = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
  if (!paso) return
  e.preventDefault()
  const sig = radios[(i + paso + radios.length) % radios.length]
  sig.focus()
  sig.click()
}

export function SettingsPreferences() {
  const [tema, setTema] = useState<Tema>('Light')
  const [formato, setFormato] = useState<FormatoFecha>(leer)
  const hoy = new Date()

  const elegirFormato = (f: FormatoFecha) => {
    if (f === formato) return
    setFormato(f)
    try { localStorage.setItem(CLAVE, f) } catch { /* sin almacenamiento, vale para esta visita */ }
    aviso.ok(`Dates will show as ${formatearFecha(hoy, f)}.`)
  }

  return (
    <div className={PADDING_PAGINA}>
      <SettingsPageHeader titulo="Account preferences" />

      <div className="mt-4 flex max-w-[880px] flex-col gap-4">
        <Card title="Appearance">
          <FieldLabel>Theme</FieldLabel>
          <div role="radiogroup" aria-label="Theme" onKeyDown={moverConFlechas} className="mt-2 grid gap-3 sm:grid-cols-2">
            <Opcion titulo="Light" detalle="Light theme" icono={Sun} elegida={tema === 'Light'} onElegir={() => setTema('Light')} />
            {/* Los colores de la app todavía no tienen su versión oscura: Dark queda a la vista pero sin elegir. */}
            <Opcion
              titulo="Dark" detalle="Dark theme" icono={Moon} elegida={tema === 'Dark'} disabled onElegir={() => setTema('Dark')}
              extra={<Pill tone="neutral" size="sm">Coming soon</Pill>}
            />
          </div>
        </Card>

        <Card title="Localization & regional">
          <FieldLabel>Preferred date format</FieldLabel>
          <div role="radiogroup" aria-label="Preferred date format" onKeyDown={moverConFlechas} className="mt-2 grid gap-3 sm:grid-cols-3">
            {FORMATOS_FECHA.map((f) => (
              <Opcion key={f.valor} titulo={f.valor} detalle={f.detalle} elegida={formato === f.valor} onElegir={() => elegirFormato(f.valor)} />
            ))}
          </div>

          {/* La "Live Preview" de red.dev, debajo de lo que la cambia. */}
          <div className={cn(TARJETA_INTERNA, 'mt-4 flex items-center gap-3 p-3')} aria-live="polite">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-dash-count-bg text-dash-blue">
              <CalendarDays aria-hidden className="size-4" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">Live preview</span>
              <span className="text-[15px] font-bold text-ink tabular-nums">{formatearFecha(hoy, formato)}</span>
            </span>
            <span className="ml-auto text-[12px] text-ink-muted">Reflects current date</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
