import { type ReactNode } from 'react'
import { ChevronRight, Layers, Lightbulb, SlidersHorizontal, type LucideIcon } from 'lucide-react'
import { ICONO_SECCION, Buscador } from './Buscador'
import type { Seccion } from './buscar'
import { useIndice } from './Mapa'
import { Enlace } from './navegar'
import { Vitrina } from './piezas'
import { SECCIONES, Sitio, idPortada, useIndiceSitio } from './Sitio'

/* La portada del design system, con la estética de primer.style: fondo
   blanco, un título grande, el buscador (lo primero que se usa), la vitrina
   de piezas reales y las secciones en tarjetas con "Learn more". */

export const QUE_SECCION: Record<Seccion, string> = {
  Foundations: 'Colores, tipografía, radios y sombras: los valores de los que sale todo lo demás.',
  Elements: 'Las piezas estándar para armar pantallas, cada una con su Playground para probarla.',
  Components: 'Cada pieza de cada módulo de la app (Dashboard, Patients, Scheduling, Clinical…), por separado.',
  Pages: 'Las pantallas completas de la app, con sus rutas reales, y las partes de cada una.',
  Audit: 'Lo que el código hace hoy y se aparta del estándar: colores sin token, estados, duplicados.',
}

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
      <div className="mx-auto flex max-w-[1180px] flex-col gap-20 px-5 pt-16 pb-24 sm:px-8">
        {/* Portada: el buscador es lo primero y lo más grande. */}
        <section className="flex flex-col items-center gap-6 text-center">
          <h1 className="m-0 max-w-[18ch] text-[40px] leading-[1.1] font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[56px]">
            La biblia del UX de Confidentally
          </h1>
          <p className="m-0 max-w-[58ch] text-[18px] leading-relaxed text-ink-muted">
            Cada botón, tabla y pantalla de la app, funcionando y explicado. Buscá lo que necesitás o tocá una pieza para abrirla.
          </p>
          <Buscador indice={indice} grande autoFocus className="mt-2" />
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[13px] text-ink-muted">Para empezar:</span>
            {PARA_EMPEZAR.map((t) => {
              const p = indice?.find((x) => x.titulo === t)
              return p ? (
                <Enlace key={t} id={p.id} className="inline-flex h-8 items-center rounded-full border border-line bg-white px-3 text-[13px] font-medium text-ink no-underline transition-colors hover:border-dash-blue hover:text-dash-blue">
                  {t}
                </Enlace>
              ) : null
            })}
          </div>
          <p className="m-0 min-h-5 text-[13px] text-ink-muted tabular-nums">
            {indice && (
              <>
                <b className="font-semibold text-ink">{cuenta('Components') + cuenta('Elements')}</b> piezas · <b className="font-semibold text-ink">{indice.filter((p) => p.grupo === 'Screens').length}</b> pantallas · <b className="font-semibold text-ink">{ejemplos}</b> ejemplos en vivo, leídos del mismo código que la app.
              </>
            )}
          </p>
        </section>

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
                    <span className="text-[13px] text-ink-muted tabular-nums">{indice ? `${cuenta(s)} páginas` : ''}</span>
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
            <pre className="mt-3 mb-0 overflow-x-auto rounded-lg bg-surface-subtle p-3 text-[12.5px] ring-1 ring-line">{'npm run storybook        # el design system en localhost:6006\nnpm run ds:coverage      # lo que todavía no tiene story\nnpm run build-storybook  # versión estática'}</pre>
          </details>
        </section>
      </div>
    </Sitio>
  )
}
