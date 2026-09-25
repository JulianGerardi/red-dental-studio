import type { Meta, StoryObj } from '@storybook/react-vite'
import { clasesDeEstado } from './audit'
import { Codigo, Page, Seccion } from './Page'

/* Cómo se ve cada estado en la app, leído del código: todas las clases de
   hover, foco, active y disabled con la cantidad de veces que se usan. Un
   mismo estado dibujado de cinco maneras distintas se ve acá, en la tabla. */
const meta = {
  title: 'Foundations/States',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false }, pseudo: {} },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const ESTADOS = [
  { prefijo: 'hover', titulo: 'Hover', nota: 'Al pasar el mouse. El fondo cambia a surface-subtle o surface-muted según el control; en links y botones de texto, subrayado o baja la opacidad.' },
  { prefijo: 'focus-visible', titulo: 'Focus (keyboard)', nota: 'Anillo o borde al navegar con teclado.' },
  { prefijo: 'focus', titulo: 'Focus (any)', nota: 'En los campos, el borde pasa a azul.' },
  { prefijo: 'active', titulo: 'Active (pressed)', nota: 'Mientras se aprieta el botón.' },
  { prefijo: 'disabled', titulo: 'Disabled', nota: 'Control deshabilitado. Hay más de una forma de atenuarlo: no coinciden.' },
  { prefijo: 'aria-invalid', titulo: 'Invalid', nota: 'Campo con error de validación.' },
] as const

function Tabla({ prefijo, muestra }: { prefijo: string; muestra: boolean }) {
  const filas = clasesDeEstado(prefijo)
  const total = filas.reduce((n, f) => n + f.usos, 0)
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <table className="w-full text-left text-[12px]">
        <thead className="bg-surface-subtle text-[11px] tracking-wide text-ink-muted uppercase">
          <tr><th className="px-3 py-2">Preview</th><th className="px-3 py-2">Class</th><th className="px-3 py-2">Uses</th><th className="px-3 py-2">Files</th></tr>
        </thead>
        <tbody>
          {filas.slice(0, 40).map((f) => (
            <tr key={f.valor} className="border-t border-line-soft">
              <td className="px-3 py-1.5">
                {muestra && prefijo === 'hover' && /bg-/.test(f.valor)
                  ? <span className={`pseudo-hover inline-block h-6 w-14 rounded border border-line ${f.valor}`} />
                  : <span className="text-ink-faint">·</span>}
              </td>
              <td className="px-3 py-1.5"><Codigo>{f.valor}</Codigo></td>
              <td className="px-3 py-1.5 tabular-nums">{f.usos}</td>
              <td className="px-3 py-1.5 tabular-nums">{f.archivos}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-line-soft bg-surface-subtle px-3 py-2 text-[11.5px] text-ink-muted">{filas.length} distinct classes, {total} uses{filas.length > 40 && ' · showing the 40 most used'}</p>
    </div>
  )
}

export const Estados: Story = {
  name: 'States',
  render: () => (
    <Page
      titulo="States"
      bajada="Los estados de un control y las clases con las que la app los dibuja hoy. Para ver un estado aplicado a un componente concreto, usá Patterns / Buttons (cada receta muestra hover, foco, active y disabled) y los stories Disabled, WithValidationErrors, Empty y Selected de cada componente."
    >
      {ESTADOS.map((e) => (
        <Seccion key={e.prefijo} titulo={e.titulo} nota={e.nota}>
          <Tabla prefijo={e.prefijo} muestra />
        </Seccion>
      ))}
    </Page>
  ),
}
