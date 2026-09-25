import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { sombrasDeTema } from './tokens'
import { radios, sombras } from './audit'
import { Codigo, Page, Seccion } from './Page'

const meta = {
  title: 'Foundations/Radius and shadows',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Efectos: Story = {
  name: 'Radius and shadows',
  render: () => (
    <Page titulo="Radius and shadows" bajada="Los tokens del sistema y lo que el código escribe a mano.">
      <Seccion titulo="Radio (tokens)" nota="Salen de --radius en src/index.css.">
        <div className="flex flex-wrap gap-4">
          {['sm', 'md', 'lg', 'xl', '2xl'].map((r) => (
            <div key={r} className="flex flex-col items-center gap-2">
              <div className={\`size-16 border border-line bg-surface-subtle rounded-\${r}\`} />
              <Codigo>rounded-{r}</Codigo>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion titulo="Sombras (tokens)">
        <div className="flex flex-wrap gap-6">
          {sombrasDeTema.map(({ nombre, valor }) => (
            <div key={nombre} className="flex flex-col gap-2">
              <div className="h-16 w-40 rounded-lg bg-white" style={{ boxShadow: \`var(--\${nombre})\` }} />
              <Codigo>{nombre.replace('shadow-', 'shadow-')}</Codigo>
              <span className="max-w-40 text-[11px] text-ink-muted">{valor}</span>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion titulo="Radios escritos a mano" nota="rounded-[…] con valor propio. Cada uno es una decisión que no pasa por un token.">
        <ul className="text-[13px]">
          {radios.map((r) => (
            <li key={r.valor} className="flex gap-4 border-t border-line-soft py-1.5 first:border-t-0">
              <Codigo>{r.valor}</Codigo>
              <span className="text-ink-muted">{r.usos} usos en {r.archivos} archivos</span>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion titulo="Sombras escritas a mano">
        <ul className="text-[13px]">
          {sombras.map((s) => (
            <li key={s.valor} className="flex flex-wrap gap-x-4 border-t border-line-soft py-1.5 first:border-t-0">
              <Codigo>{s.valor.length > 90 ? \`\${s.valor.slice(0, 90)}…\` : s.valor}</Codigo>
              <span className="text-ink-muted">{s.usos} usos en {s.archivos} archivos</span>
            </li>
          ))}
        </ul>
      </Seccion>
    </Page>
  ),
}
`})))()}n();export{t as default};