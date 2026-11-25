import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState, type KeyboardEvent, type ReactNode } from 'react'
import { CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { Pill } from '@/components/ui/pill'
import { aviso } from '@/components/ui/toaster'
import { PADDING_PAGINA, TARJETA_PANEL } from '@/lib/estilos'

/* Settings → Preferences (red.dev: Account Preferences). Tema y formato de fecha de quien usa la app; se aplican al
   elegir, sin Save, como en red.dev. Una card con una fila por sección: a la izquierda qué es, a la derecha las
   opciones. Ver design-reference/figma/modulos/preferences.md (2026-11-25). */

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
  return formato === 'MM/DD/YYYY' ? \`\${mm}/\${dd}/\${yyyy}\` : formato === 'DD/MM/YYYY' ? \`\${dd}/\${mm}/\${yyyy}\` : \`\${yyyy}-\${mm}-\${dd}\`
}

const leer = (): FormatoFecha => {
  try {
    const v = localStorage.getItem(CLAVE)
    return FORMATOS_FECHA.some((f) => f.valor === v) ? (v as FormatoFecha) : 'MM/DD/YYYY'
  } catch { return 'MM/DD/YYYY' }
}

/* Flechas para moverse entre las opciones, como un radiogroup nativo. */
function moverConFlechas(e: KeyboardEvent<HTMLDivElement>) {
  const radios = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)')]
  const i = radios.indexOf(document.activeElement as HTMLButtonElement)
  const paso = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
  if (i < 0 || !paso) return
  e.preventDefault()
  const sig = radios[(i + paso + radios.length) % radios.length]
  sig.focus()
  sig.click()
}

function Punto({ on }: { on: boolean }) {
  return (
    <span className={cn('flex size-4 shrink-0 items-center justify-center rounded-full border-2', on ? 'border-dash-blue' : 'border-ink-faint')}>
      {on && <span className="size-[7px] rounded-full bg-dash-blue" />}
    </span>
  )
}

const OPCION = cn(
  'rounded-lg border bg-white text-left transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue',
  'disabled:cursor-not-allowed',
)

/* Una miniatura de la app con el tema: rail azul, encabezado y dos cards. Sólo dibujo, con los tokens de la app. */
function Miniatura({ oscuro }: { oscuro?: boolean }) {
  const linea = oscuro ? 'bg-ink-medium' : 'bg-line'
  const card = oscuro ? 'bg-ink-soft' : 'bg-white shadow-hairline'
  return (
    <span aria-hidden className={cn('flex h-[88px] overflow-hidden rounded-md', oscuro ? 'bg-ink' : 'bg-surface-muted')}>
      <span className="w-4 shrink-0 bg-dash-blue" />
      <span className="flex flex-1 flex-col gap-1.5 p-2">
        <span className={cn('h-2.5 rounded-sm', oscuro ? 'bg-ink-soft' : 'bg-white')} />
        <span className="grid flex-1 grid-cols-2 gap-1.5">
          {[0, 1].map((i) => (
            <span key={i} className={cn('flex flex-col gap-1 rounded-sm p-1.5', card)}>
              <span className={cn('h-1.5 w-2/3 rounded-full', linea)} />
              <span className={cn('h-1.5 w-1/2 rounded-full', linea)} />
              <span className="mt-auto h-1.5 w-1/3 rounded-full bg-dash-blue" />
            </span>
          ))}
        </span>
      </span>
    </span>
  )
}

function Seccion({ titulo, detalle, children }: { titulo: string; detalle: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-bold text-ink">{titulo}</h2>
        <p className="text-[12px] leading-relaxed text-ink-muted">{detalle}</p>
      </div>
      {children}
    </section>
  )
}

export function SettingsPreferences() {
  const [tema, setTema] = useState<Tema>('Light')
  const [formato, setFormato] = useState<FormatoFecha>(leer)
  const hoy = new Date()

  const elegirFormato = (f: FormatoFecha) => {
    if (f === formato) return
    setFormato(f)
    try { localStorage.setItem(CLAVE, f) } catch { /* sin almacenamiento, vale para esta visita */ }
    aviso.ok(\`Dates will show as \${formatearFecha(hoy, f)}.\`)
  }

  const temas: { valor: Tema; detalle: string; disabled?: boolean }[] = [
    { valor: 'Light', detalle: 'Light theme' },
    /* Los colores de la app todavía no tienen su versión oscura: Dark queda a la vista pero sin elegir. */
    { valor: 'Dark', detalle: 'Dark theme', disabled: true },
  ]

  return (
    <div className={PADDING_PAGINA}>
      <SettingsPageHeader titulo="Account preferences" />

      <div className={cn(TARJETA_PANEL, 'mt-4 max-w-[960px] divide-y divide-line-row')}>
        <Seccion titulo="Appearance" detalle="Choose the theme for your portal.">
          <div role="radiogroup" aria-label="Theme" onKeyDown={moverConFlechas} className="grid max-w-[520px] grid-cols-2 gap-3">
            {temas.map((t) => {
              const on = tema === t.valor
              return (
                <button
                  key={t.valor} type="button" role="radio" aria-checked={on} disabled={t.disabled} tabIndex={on ? 0 : -1}
                  onClick={() => setTema(t.valor)}
                  className={cn(OPCION, 'flex flex-col gap-2.5 p-2', on ? 'border-dash-blue ring-1 ring-dash-blue' : 'border-line hover:border-line-strong')}
                >
                  <span className={cn(t.disabled && 'opacity-60')}><Miniatura oscuro={t.valor === 'Dark'} /></span>
                  <span className="flex items-center gap-2 px-1 pb-0.5">
                    <Punto on={on} />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className={cn('text-[13px] font-semibold', t.disabled ? 'text-ink-muted' : 'text-ink')}>{t.valor}</span>
                      <span className="text-[11px] text-ink-muted">{t.detalle}</span>
                    </span>
                    {t.disabled && <Pill tone="neutral" size="sm">Coming soon</Pill>}
                  </span>
                </button>
              )
            })}
          </div>
        </Seccion>

        <Seccion titulo="Localization & regional" detalle="Preferred date format for dates across your portal. Examples reflect the current date.">
          <div className="flex max-w-[520px] flex-col gap-3">
            <div role="radiogroup" aria-label="Preferred date format" onKeyDown={moverConFlechas} className="flex flex-col overflow-hidden rounded-lg border border-line">
              {FORMATOS_FECHA.map((f, i) => {
                const on = formato === f.valor
                return (
                  <button
                    key={f.valor} type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1}
                    onClick={() => elegirFormato(f.valor)}
                    className={cn(
                      'flex min-h-12 items-center gap-3 px-3 py-2 text-left transition-colors',
                      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-dash-blue',
                      i > 0 && 'border-t border-line-row',
                      on ? 'bg-dash-count-bg' : 'bg-white hover:bg-surface-subtle',
                    )}
                  >
                    <Punto on={on} />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[13px] font-semibold text-ink">{f.valor}</span>
                      <span className="text-[11px] text-ink-muted">{f.detalle}</span>
                    </span>
                    <span className={cn('text-[13px] tabular-nums', on ? 'font-semibold text-dash-blue' : 'text-ink-muted')}>{formatearFecha(hoy, f.valor)}</span>
                  </button>
                )
              })}
            </div>

            {/* La "Live Preview" de red.dev: cómo se va a ver hoy, debajo de lo que la cambia. */}
            <p className="flex items-center gap-2 text-[12px] text-ink-muted" aria-live="polite">
              <CalendarDays aria-hidden className="size-3.5 text-dash-blue" />
              Live preview:
              <span className="font-semibold text-ink tabular-nums">{formatearFecha(hoy, formato)}</span>
              <span>· Reflects current date</span>
            </p>
          </div>
        </Seccion>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};