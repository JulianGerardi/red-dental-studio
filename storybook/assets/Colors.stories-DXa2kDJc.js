import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { aCss, coloresDeTema, gruposDeTokens, hslAHex, tokensClaros } from './tokens'
import { Codigo, Page, Seccion } from './Page'

const meta = {
  title: 'Foundations/Colors',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const Muestra = ({ color }: { color: string }) => (
  <span className="inline-block size-9 shrink-0 rounded-md border border-black/10" style={{ background: color }} />
)

function utilidad(nombre: string) {
  return nombre.endsWith('foreground') ? \`text-\${nombre}\` : \`bg-\${nombre}\`
}

export const Tokens: Story = {
  name: 'Colors',
  render: () => (
    <Page
      titulo="Colors"
      bajada="Salen de src/index.css. Si cambiás un valor ahí, esta página y la app se actualizan juntas."
    >
      <Seccion
        titulo="Sistema base"
        nota="Convención shadcn/ui: cada token tiene su versión clara y oscura. En Tailwind se usan como bg-primary, text-primary-foreground, border-border, etc."
      >
        <div className="flex flex-col gap-8">
          {gruposDeTokens().map(({ grupo, filas }) => (
            <div key={grupo}>
              <h3 className="mb-2 text-[13px] font-semibold text-ink-medium">{grupo}</h3>
              <div className="overflow-hidden rounded-lg border border-line">
                <table className="w-full text-left text-[12.5px]">
                  <thead className="bg-surface-subtle text-[11px] tracking-wide text-ink-muted uppercase">
                    <tr>
                      <th className="px-3 py-2 font-medium">Claro</th>
                      <th className="px-3 py-2 font-medium">Oscuro</th>
                      <th className="px-3 py-2 font-medium">Token</th>
                      <th className="px-3 py-2 font-medium">Clase</th>
                      <th className="px-3 py-2 font-medium">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filas.map((f) => (
                      <tr key={f.nombre} className="border-t border-line-soft">
                        <td className="px-3 py-2"><Muestra color={aCss(f.claro)} /></td>
                        <td className="px-3 py-2">{f.oscuro ? <Muestra color={aCss(f.oscuro)} /> : <span className="text-ink-faint">-</span>}</td>
                        <td className="px-3 py-2"><Codigo>--{f.nombre}</Codigo></td>
                        <td className="px-3 py-2"><Codigo>{utilidad(f.nombre)}</Codigo></td>
                        <td className="px-3 py-2 font-mono text-[12px] text-ink-medium">
                          {hslAHex(f.claro) ?? f.claro}
                          {f.oscuro && <span className="text-ink-faint"> · {hslAHex(f.oscuro) ?? f.oscuro}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion
        titulo="Tokens de la app"
        nota="Los que se agregaron al rediseño: el azul del Figma (dash-*), estados y neutros semánticos. Viven en el bloque @theme de src/index.css."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coloresDeTema.map(({ nombre, valor }) => (
            <div key={nombre} className="flex items-center gap-3 rounded-lg border border-line p-3">
              <Muestra color={\`var(--\${nombre})\`} />
              <div className="min-w-0">
                <p className="truncate font-mono text-[12px] font-medium">--{nombre}</p>
                <p className="truncate text-[11.5px] text-ink-muted">bg-{nombre.replace('color-', '')} · {valor}</p>
              </div>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion titulo="Radio base">
        <p className="text-[13px] text-ink-medium">
          <Codigo>--radius: {tokensClaros.radius}</Codigo> - de ahí salen <Codigo>rounded-sm</Codigo>, <Codigo>rounded-md</Codigo> y <Codigo>rounded-lg</Codigo>.
        </p>
      </Seccion>
    </Page>
  ),
}
`})))()}export{n,i as r,r as t};