import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { KeyboardEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { PADDING_PAGINA, TARJETA_PANEL } from '@/lib/estilos'
import { useTema, type Tema } from '@/lib/tema'

/* Settings → Preferences (red.dev: Account Preferences). El tema de quien usa la app: se aplica al elegir, sin Save, como
   en red.dev. Una card con una fila por sección: a la izquierda qué es, a la derecha las opciones.
   Ver design-reference/figma/modulos/preferences.md (2026-11-26). */

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

/* Una miniatura de la app con el tema: rail azul, encabezado y dos cards. \`tema-claro\` / \`tema-oscuro\` (index.css) la
   pintan con los tokens de su tema aunque la app esté en el otro. */
function Miniatura({ tema }: { tema: Tema }) {
  return (
    <span aria-hidden className={cn('flex h-[120px] overflow-hidden rounded-md bg-page-background', tema === 'Dark' ? 'tema-oscuro' : 'tema-claro')}>
      <span className="w-4 shrink-0 bg-dash-blue" />
      <span className="flex flex-1 flex-col gap-1.5 p-2">
        <span className="h-2.5 rounded-sm bg-surface" />
        <span className="grid flex-1 grid-cols-2 gap-1.5">
          {[0, 1].map((i) => (
            <span key={i} className="flex flex-col gap-1 rounded-sm bg-surface p-1.5">
              <span className="h-1.5 w-2/3 rounded-full bg-line-strong" />
              <span className="h-1.5 w-1/2 rounded-full bg-line-strong" />
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

const TEMAS: { valor: Tema; detalle: string }[] = [
  { valor: 'Light', detalle: 'Light theme' },
  { valor: 'Dark', detalle: 'Dark theme' },
]

export function SettingsPreferences() {
  const [tema, setTema] = useTema()

  return (
    <div className={PADDING_PAGINA}>
      <SettingsPageHeader titulo="Account preferences" />

      <div className={cn(TARJETA_PANEL, 'mt-4')}>
        <Seccion titulo="Appearance" detalle="Choose the theme for your portal.">
          <div role="radiogroup" aria-label="Theme" onKeyDown={moverConFlechas} className="grid grid-cols-2 gap-3">
            {TEMAS.map((t) => {
              const on = tema === t.valor
              return (
                <button
                  key={t.valor} type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1}
                  onClick={() => setTema(t.valor)}
                  className={cn(
                    'flex flex-col gap-2.5 rounded-lg border bg-surface p-2 text-left transition-colors',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue',
                    on ? 'border-dash-blue ring-1 ring-dash-blue' : 'border-line hover:border-line-strong',
                  )}
                >
                  <Miniatura tema={t.valor} />
                  <span className="flex items-center gap-2 px-1 pb-0.5">
                    <Punto on={on} />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[13px] font-semibold text-ink">{t.valor}</span>
                      <span className="text-[11px] text-ink-muted">{t.detalle}</span>
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </Seccion>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};