import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { tokensTema } from './tokens'
import { tamanosDeTexto } from './audit'
import { Codigo, Page, Seccion } from './Page'

const meta = {
  title: 'Foundations/Typography',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const EJEMPLO = 'Sarah Stone, treatment plan accepted'

export const Escala: Story = {
  name: 'Typography',
  render: () => (
    <Page
      titulo="Typography"
      bajada="Una sola familia, Inter. La escala sale de lo que el código usa hoy: cada tamaño con la cantidad de veces que aparece."
    >
      <Seccion titulo="Familia">
        <p className="text-[32px] leading-tight font-semibold">Inter</p>
        <p className="mt-1 text-[13px] text-ink-muted">
          <Codigo>--font-sans: {tokensTema['font-sans']}</Codigo>
        </p>
        <div className="mt-4 flex flex-wrap gap-6 text-[20px]">
          {[400, 500, 600, 700].map((w) => (
            <span key={w} style={{ fontWeight: w }}>Aa {w}</span>
          ))}
        </div>
      </Seccion>

      <Seccion
        titulo="Tamaños en uso"
        nota="Todos son clases arbitrarias (text-[13px]). Los que casi no se usan son candidatos a unificarse."
      >
        <div className="overflow-hidden rounded-lg border border-line">
          {tamanosDeTexto.map((t) => {
            const px = parseFloat(t.valor.replace('text-[', ''))
            return (
              <div key={t.valor} className="flex items-baseline gap-4 border-t border-line-soft px-4 py-2.5 first:border-t-0">
                <span className="w-24 shrink-0"><Codigo>{t.valor}</Codigo></span>
                <span className="w-24 shrink-0 text-[12px] text-ink-muted">{t.usos} usos</span>
                <span className="min-w-0 truncate" style={{ fontSize: px }}>{EJEMPLO}</span>
              </div>
            )
          })}
        </div>
      </Seccion>
    </Page>
  ),
}
`})))()}export{n,i as r,r as t};