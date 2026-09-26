import type { Meta, StoryObj } from '@storybook/react-vite'
import cobertura from './generated/coverage.json'
import { Codigo, Page, Seccion } from './Page'

/* Estado de la documentación contra el código, calculado por
   scripts/ds-coverage.mjs. Es lo que hace que "todo documentado" se pueda
   medir: si algo falta, acá aparece en rojo. */
const meta = {
  title: 'Audit/Documentation coverage',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const ESTADOS = ['disabled', 'error', 'loading', 'empty', 'selected'] as const
type Resultado = 'story' | 'na' | 'exenta' | 'falta'
const ETIQUETA: Record<Resultado, { texto: string; clase: string; ayuda: string }> = {
  story: { texto: '✓', clase: 'bg-dash-ok-bg text-dash-ok-fg', ayuda: 'Un story lo muestra' },
  exenta: { texto: '≈', clase: 'bg-dash-count-bg text-dash-blue-hover', ayuda: 'Lo muestra otro story (ver exenciones)' },
  na: { texto: 'n/a', clase: 'bg-surface-muted text-ink-muted', ayuda: 'No aplica (ver motivo)' },
  falta: { texto: '✗', clase: 'bg-dash-bad-bg text-dash-bad-fg', ayuda: 'Falta documentarlo' },
}

function Cifra({ n, de, titulo, nota, ok }: { n: number; de?: number; titulo: string; nota?: string; ok: boolean }) {
  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <p className="text-[26px] font-bold tabular-nums">{n}{de !== undefined && <span className="text-ink-faint"> / {de}</span>}</p>
      <p className={`text-[13px] font-semibold ${ok ? 'text-dash-ok-fg' : 'text-warn-fg'}`}>{titulo}</p>
      {nota && <p className="mt-1 text-[12px] text-ink-muted">{nota}</p>}
    </div>
  )
}

export const Cobertura: Story = {
  name: 'Documentation coverage',
  render: () => {
    const c = cobertura
    return (
      <Page
        titulo="Documentation coverage"
        bajada="Qué parte del código tiene su documentación en Storybook. Se recalcula en cada build leyendo los archivos; si un componente, una pantalla o un estado nuevo no está documentado, acá figura como faltante y npm run ds:check falla."
      >
        <Seccion titulo="Summary">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            <Cifra n={c.componentes.conStory + c.componentes.enAnfitrion} de={c.componentes.total} titulo="Component files" nota={`${c.componentes.enAnfitrion} se ven dentro de su anfitrión`} ok={c.componentes.sinStory.length === 0} />
            <Cifra n={c.rutas.conStory} de={c.rutas.total} titulo="Screens (routes)" ok={c.rutas.sinStory.length === 0} />
            <Cifra n={c.internos.conStory} de={c.internos.total} titulo="React components incl. internal pieces" ok={c.internos.sinStory.length === 0} />
            <Cifra n={c.estados.matriz.length - c.estados.sinCubrir.length} de={c.estados.matriz.length} titulo="Components with all their states shown" nota="disabled, error, loading, empty, selected" ok={c.estados.sinCubrir.length === 0} />
            <Cifra n={c.colores.sinToken} titulo="Hand-written colors without a token" nota={`Tope actual: ${c.colores.baseline}`} ok={c.colores.sinToken === 0} />
          </div>
        </Seccion>

        <Seccion titulo="States matrix" nota="Cada componente con story y los estados que su código soporta. Hover y foco se ven en Elements / Buttons y Elements / Fields; acá van los que cambian el contenido o la interacción.">
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-surface-subtle text-[11px] tracking-wide text-ink-muted uppercase">
                <tr><th className="px-3 py-2">Component</th>{ESTADOS.map((e) => <th key={e} className="px-3 py-2 text-center">{e}</th>)}</tr>
              </thead>
              <tbody>
                {c.estados.matriz.map((f) => (
                  <tr key={f.archivo} className="border-t border-line-soft">
                    <td className="px-3 py-1.5 font-mono text-[11.5px]">{f.archivo.replace('components/', '')}</td>
                    {ESTADOS.map((e) => {
                      const r = (f.estados as unknown as Record<string, Resultado>)[e]
                      return <td key={e} className="px-3 py-1.5 text-center">{r ? <span title={ETIQUETA[r].ayuda} className={`inline-block min-w-7 rounded px-1.5 py-0.5 text-[11px] font-semibold ${ETIQUETA[r].clase}`}>{ETIQUETA[r].texto}</span> : <span className="text-ink-faint">·</span>}</td>
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Seccion>

        <Seccion titulo="Exemptions" nota="Estados que un componente soporta pero no tienen story propio, con el motivo. Cada una se valida: si apunta a un story que ya no existe, ds:check falla.">
          <ul className="flex flex-col gap-2 text-[12.5px]">
            {Object.entries(c.estados.exenciones).flatMap(([archivo, estados]) =>
              Object.entries(estados as Record<string, { na?: boolean; story?: string; reason: string }>).map(([estado, ex]) => (
                <li key={`${archivo}-${estado}`} className="rounded-lg border border-line bg-white p-3">
                  <p><Codigo>{archivo.replace('components/', '')}</Codigo> · <b>{estado}</b> · {ex.na ? 'n/a' : <>lo muestra <Codigo>{ex.story}</Codigo></>}</p>
                  <p className="mt-1 text-ink-muted">{ex.reason}</p>
                </li>
              )),
            )}
          </ul>
        </Seccion>

        <Seccion titulo="Exported but not used by the app" nota={`${c.sinUso.length} componentes exportados que ninguna pantalla importa (sólo los importan stories). Son candidatos a borrarse o a conectarse; siguen documentados hasta decidirlo.`}>
          <ul className="grid grid-cols-1 gap-1 text-[12px] sm:grid-cols-2">
            {c.sinUso.map((n) => <li key={n}><Codigo>{n}</Codigo></li>)}
          </ul>
        </Seccion>
      </Page>
    )
  },
}
