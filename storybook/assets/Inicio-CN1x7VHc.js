import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { type ReactNode } from 'react'
import { Blocks, ChevronRight, Layers, Lightbulb, SlidersHorizontal, type LucideIcon } from 'lucide-react'
import { ICONO_SECCION, Buscador } from './Buscador'
import { QUE_SECCION, type Seccion } from './buscar'
import { useIndice } from './Mapa'
import { Enlace } from './navegar'
import { Vitrina } from './piezas'
import { SECCIONES, Sitio, idPortada, useIndiceSitio } from './Sitio'

/* La portada del design system, con la estética de primer.style: fondo
   blanco, un título grande, el buscador (lo primero que se usa), la vitrina
   de piezas reales y las secciones en tarjetas con "Learn more". */


const PARA_EMPEZAR = ['Buttons', 'Tables', 'Fields', 'Patient menu', 'Appointment cards', 'Colors']

const PASOS: { icono: LucideIcon; titulo: string; texto: string }[] = [
  { icono: SlidersHorizontal, titulo: 'Probalo', texto: 'Cada pieza tiene un Playground: cambiás texto, tamaño o estado y la ves en vivo.' },
  { icono: Layers, titulo: 'Mirá todos sus estados', texto: 'Vacío, cargando, error, deshabilitado… y cómo se ve en celular, tablet y computadora.' },
  { icono: Lightbulb, titulo: 'Entendé por qué', texto: 'Cada decisión de diseño explicada, leída del código de la app.' },
]

function Titulo({ children, nota }: { children: ReactNode; nota?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="m-0 text-[28px] leading-tight font-semibold tracking-[-0.01em] text-ink">{children}</h2>
      {nota && <p className="m-0 max-w-[68ch] text-[16px] leading-relaxed text-ink-muted">{nota}</p>}
    </div>
  )
}

export function Inicio() {
  const indice = useIndiceSitio()
  const entradas = useIndice()
  const cuenta = (s: Seccion) => indice?.filter((p) => p.seccion === s && p.id !== idPortada(s)).length ?? 0
  const ejemplos = entradas?.filter((e) => e.type === 'story').length

  return (
    <Sitio actual="welcome--docs" lateral={false}>
      <div className="mx-auto flex max-w-[1180px] flex-col gap-16 px-5 pt-10 pb-24 sm:px-8">
        {/* Portada: el buscador es lo primero y lo más grande. */}
        <section className="relative -mx-2 rounded-3xl border border-line-row px-6 pt-14 pb-12 sm:px-10">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,var(--color-brand-tint)_0%,var(--color-info-bg)_45%,white_80%)]" />
            <div className="absolute inset-0 [background-image:linear-gradient(color-mix(in_srgb,var(--color-dash-blue)_6%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--color-dash-blue)_6%,transparent)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_20%,transparent_75%)]" />
          </div>
          <div className="relative flex flex-col items-center gap-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-dash-blue/20 bg-white/80 px-3 py-1 text-[12px] font-medium text-dash-blue">
              <span className="size-1.5 rounded-full bg-green" /> Design system
            </span>
            <h1 className="m-0 text-[44px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-ink sm:text-[64px]">Confidentally UI</h1>
            <p className="m-0 max-w-[56ch] text-[17px] leading-relaxed text-ink-medium">
              Cada botón, tabla y pantalla de la app, funcionando y explicado. Buscá lo que necesitás, tocá una pieza para abrirla o armá la tuya.
            </p>
            <Buscador indice={indice} grande autoFocus />
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-[12.5px] text-ink-muted">Para empezar:</span>
              {PARA_EMPEZAR.map((t) => {
                const p = indice?.find((x) => x.titulo === t)
                return p ? (
                  <Enlace key={t} id={p.id} className="inline-flex h-8 items-center rounded-full border border-line bg-white px-3 text-[13px] font-medium text-ink no-underline transition-colors hover:border-dash-blue hover:text-dash-blue">
                    {t}
                  </Enlace>
                ) : null
              })}
            </div>
            <p className="m-0 min-h-5 text-[12.5px] text-ink-muted tabular-nums">
              {indice && (
                <>
                  <b className="font-semibold text-ink">{cuenta('Components') + cuenta('Elements')}</b> piezas · <b className="font-semibold text-ink">{indice.filter((p) => p.grupo === 'Screens').length}</b> pantallas · <b className="font-semibold text-ink">{ejemplos}</b> ejemplos en vivo, leídos del mismo código que la app.
                </>
              )}
            </p>
          </div>
        </section>

        {/* El constructor, la invitación más grande después del buscador. */}
        <Enlace id="builder--docs" className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-ink p-8 text-white no-underline sm:p-10 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-col gap-3">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white/90">
              <Blocks className="size-3.5" /> Builder
            </span>
            <span className="text-[30px] leading-tight font-bold tracking-[-0.02em] sm:text-[36px]">Armá tu propio componente</span>
            <span className="max-w-[52ch] text-[15px] leading-relaxed text-white/70">
              Sumá bloques (encabezado, campos, tabla, botones…), cambiá cada uno y mirá cómo queda. El código sale solo, listo para copiar, con los componentes reales de la app.
            </span>
            <span className="mt-2 inline-flex items-center gap-1.5 self-start rounded-md bg-white px-4 py-2 text-[14px] font-semibold text-ink transition-transform group-hover:translate-x-0.5">
              Open builder <ChevronRight className="size-4" />
            </span>
          </div>
          <div aria-hidden className="relative hidden w-[420px] shrink-0 lg:block">
            <div className="rounded-xl bg-white p-4 text-ink shadow-2xl">
              <p className="m-0 text-[13px] font-semibold">Clinic details</p>
              <p className="m-0 mt-0.5 text-[12px] text-ink-muted">Name and contact shown to patients.</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {['Clinic name', 'Phone'].map((x) => (
                  <span key={x} className="flex flex-col gap-1 text-[11px] font-medium">{x}<span className="h-7 rounded-md border border-line" /></span>
                ))}
              </div>
              <div className="mt-3 flex justify-end gap-1.5">
                <span className="rounded-md border border-line px-2.5 py-1 text-[11px]">Cancel</span>
                <span className="rounded-md bg-dash-blue px-2.5 py-1 text-[11px] text-white">Save changes</span>
              </div>
            </div>
            <div className="absolute -right-3 -bottom-6 w-[230px] rounded-xl border border-white/10 bg-[color-mix(in_srgb,var(--color-ink)_92%,white)] p-3 font-mono text-[10.5px] leading-relaxed text-white/80 shadow-2xl">
              <span className="text-[color-mix(in_srgb,var(--color-dash-blue)_45%,white)]">{'<Card>'}</span><br />
              {'  '}<span className="text-[color-mix(in_srgb,var(--color-dash-blue)_45%,white)]">{'<CardTitle>'}</span>Clinic details…<br />
              {'  '}<span className="text-[color-mix(in_srgb,var(--color-dash-blue)_45%,white)]">{'<TextField'}</span> label=&quot;Phone&quot; /&gt;<br />
              <span className="text-[color-mix(in_srgb,var(--color-dash-blue)_45%,white)]">{'</Card>'}</span>
            </div>
          </div>
        </Enlace>

        <section className="flex flex-col gap-8">
          <Titulo nota="Piezas reales de la app. Tocá cualquiera para abrir su página.">Explorá tocando</Titulo>
          <Vitrina indice={indice} />
        </section>

        <section className="flex flex-col gap-8">
          <Titulo nota="El design system está ordenado en cinco secciones, las mismas de la barra de arriba.">Secciones</Titulo>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECCIONES.map((s) => {
              const Icono = ICONO_SECCION[s]
              return (
                <Enlace key={s} id={idPortada(s)} className="group flex flex-col rounded-xl border border-line bg-white p-6 no-underline transition-colors hover:border-ink-faint">
                  <span className="flex items-center justify-between">
                    <span className="text-[20px] font-semibold text-ink">{s}</span>
                    <Icono className="size-5 text-ink-muted" aria-hidden />
                  </span>
                  <span className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-muted">{QUE_SECCION[s]}</span>
                  <span className="mt-6 flex items-center justify-between">
                    <span className="inline-flex items-center gap-0.5 text-[14px] font-medium text-dash-blue">
                      Learn more <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                    <span className="text-[13px] text-ink-muted tabular-nums">{indice ? \`\${cuenta(s)} páginas\` : ''}</span>
                  </span>
                </Enlace>
              )
            })}
            <div className="flex flex-col rounded-xl border border-dashed border-line bg-surface-subtle p-6">
              <span className="text-[20px] font-semibold text-ink">Cómo se lee una página</span>
              <ol className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
                {PASOS.map((p) => (
                  <li key={p.titulo} className="flex gap-3">
                    <p.icono className="mt-0.5 size-4 shrink-0 text-dash-blue" aria-hidden />
                    <span className="text-[14px] leading-snug text-ink-muted"><b className="font-semibold text-ink">{p.titulo}.</b> {p.texto}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t border-line pt-8 text-[15px] leading-relaxed text-ink-medium">
          <p className="m-0">
            <b className="font-semibold text-ink">No es una copia de la app:</b> lee el mismo código. Si cambia un token en <code className="rounded bg-surface-muted px-1 py-0.5 text-[13px]">src/index.css</code> o un componente, cambia acá.
          </p>
          <details className="mt-4">
            <summary className="cursor-pointer font-semibold text-ink">Para quien programa</summary>
            <ul className="mt-3 mb-0 flex flex-col gap-1.5 pl-5 text-[14px]">
              <li>Un color escrito a mano cambia sólo ese lugar: conviene pasarlo a token (ver <i>Audit / Colors in code</i>).</li>
              <li>Un componente nuevo necesita su <code>.stories.tsx</code>. <code>npm run ds:coverage</code> lista lo que falta.</li>
            </ul>
            <pre className="mt-3 mb-0 overflow-x-auto rounded-lg bg-surface-subtle p-3 text-[12.5px] ring-1 ring-line">{'npm run storybook        # el design system en localhost:6006\\nnpm run ds:coverage      # lo que todavía no tiene story\\nnpm run build-storybook  # versión estática'}</pre>
          </details>
        </section>
      </div>
    </Sitio>
  )
}
`})))()}export{n,i as r,r as t};