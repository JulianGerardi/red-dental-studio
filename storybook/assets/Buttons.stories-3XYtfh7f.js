import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Page, Seccion } from './Page'
import { elementosDe, familiaBoton, meta, recetas } from './Recipes'
import { ColoresEnUso, EstadosDeLaApp, TamanosEnUso, TodoLoEncontrado } from './spec'

const meta_ = {
  title: 'Audit/Buttons in code',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta_
type Story = StoryObj<typeof meta_>

export const Botones: Story = {
  name: 'Buttons in code',
  render: () => {
    const botones = recetas.filter((r) => r.tipo === 'button')
    const total = meta.elementos.button ?? 0
    return (
      <Page
        titulo="Buttons in code"
        bajada={\`Para quien migra código: cuánto se aparta hoy la app del botón estándar (Elements / Buttons). Son los \${total} <button> de la app, leídos del código; \${meta.usosDeButtonUI} usan el componente Button, el resto tiene clases propias. Si el código cambia, cambia acá.\`}
      >
        <Seccion titulo="Sizes in use" nota="Cuántos botones usan cada valor, en toda la app. Si hay más de un valor, hay botones del mismo tipo que no miden lo mismo.">
          <TamanosEnUso looks={botones} total={total} />
        </Seccion>

        <Seccion titulo="Colors in use" nota="Los colores que usan los botones, con la cantidad de botones que los usan.">
          <ColoresEnUso looks={botones} />
        </Seccion>

        <Seccion titulo="States in the app" nota="Qué porcentaje de los botones define cada estado, qué clases usa y qué falta.">
          <EstadosDeLaApp
            looks={botones}
            total={total}
            filas={[
              { estado: 'Hover', define: (r) => r.estados.hover, clases: /^hover:/, faltante: (n) => \`\${n} buttons look the same under the mouse.\` },
              {
                estado: 'Focus',
                define: (r) => r.estados.foco === 'definido',
                clases: /^(?:[^\\s:]+:)*focus(?:-visible)?:(?!outline-none)/,
                faltante: (n, sin) => \`\${n} buttons use the browser’s default ring; \${elementosDe(sin.filter((r) => r.estados.foco === 'quitado' || r.estados.foco === 'invisible'))} show no ring at all.\`,
              },
              { estado: 'Active (pressed)', define: (r) => r.estados.activo, clases: /(^|:)active:/, faltante: (n) => \`\${n} buttons do not react to the press.\` },
              { estado: 'Disabled', define: (r) => r.estados.deshabilitado, clases: /(^|:)disabled:|cursor-not-allowed/, faltante: (n) => \`\${n} buttons have no disabled look: disabled or not, they look the same.\` },
            ]}
          />
          <p className="mt-3 max-w-[70ch] text-[12.5px] text-ink-muted">
            El botón estándar (<code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-[11px]">ui/Button</code>, en Elements / Buttons) ya resuelve todos estos estados; la app lo usa en {meta.usosDeButtonUI} lugares.
          </p>
        </Seccion>

        <TodoLoEncontrado tipo="button" familiaDe={familiaBoton} cantidad={botones.length} elementos={total} />
      </Page>
    )
  },
}
`})))()}export{n,i as r,r as t};