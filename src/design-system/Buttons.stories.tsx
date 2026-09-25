import type { Meta, StoryObj } from '@storybook/react-vite'
import { Page, Seccion } from './Page'
import { elementosDe, familiaBoton, meta, recetas, type Receta } from './Recipes'
import { ColoresEnUso, EstadosDeLaApp, MedidasDeTipos, TamanosEnUso, TiposConEstados, TodoLoEncontrado, type Tipo } from './spec'

const meta_ = {
  title: 'Patterns/Buttons',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta_
type Story = StoryObj<typeof meta_>

/* El look más usado de una familia es el que la representa. */
const masUsado = (familia: string): Receta | undefined =>
  recetas.filter((r) => r.tipo === 'button' && familiaBoton(r) === familia).sort((a, b) => b.cantidad - a.cantidad)[0]

const TIPOS: Tipo[] = [
  { nombre: 'Primary', uso: 'The main action of a screen or dialog: Save, Next, New.', look: masUsado('Primary (solid blue)'), texto: 'Save' },
  { nombre: 'Outline', uso: 'A secondary action: Cancel, Back, Export.', look: masUsado('Outline'), texto: 'Cancel' },
  { nombre: 'Text link', uso: 'An action that reads as a link.', look: masUsado('Text link'), texto: 'View all' },
  { nombre: 'Icon only', uso: 'Toolbar and close buttons. Needs an aria-label.', look: masUsado('Icon-only') },
  { nombre: 'Destructive', uso: 'Deletes or discards.', look: masUsado('Destructive'), texto: 'Delete' },
]

export const Botones: Story = {
  name: 'Buttons',
  render: () => {
    const botones = recetas.filter((r) => r.tipo === 'button')
    const total = meta.elementos.button ?? 0
    return (
      <Page
        titulo="Buttons"
        bajada={`Los ${total} botones de la app, leídos del código. Cada tipo se muestra en sus estados, con sus medidas y colores. Lo que sale de esta página es lo que la app hace hoy: si el código cambia, cambia acá.`}
      >
        <Seccion titulo="Types and states" nota="El look más usado de cada tipo, en cada estado. “—” quiere decir que el código no define ese estado: el botón se ve igual.">
          <TiposConEstados tipos={TIPOS} columnas={['default', 'hover', 'focus', 'disabled']} />
        </Seccion>

        <Seccion titulo="Measures" nota="Leídas de los botones de arriba, ya dibujados.">
          <MedidasDeTipos tipos={TIPOS} />
        </Seccion>

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
              { estado: 'Hover', define: (r) => r.estados.hover, clases: /^hover:/, faltante: (n) => `${n} buttons look the same under the mouse.` },
              {
                estado: 'Focus',
                define: (r) => r.estados.foco === 'definido',
                clases: /^(?:[^\s:]+:)*focus(?:-visible)?:(?!outline-none)/,
                faltante: (n, sin) => `${n} buttons use the browser’s default ring; ${elementosDe(sin.filter((r) => r.estados.foco === 'quitado' || r.estados.foco === 'invisible'))} show no ring at all.`,
              },
              { estado: 'Active (pressed)', define: (r) => r.estados.activo, clases: /(^|:)active:/, faltante: (n) => `${n} buttons do not react to the press.` },
              { estado: 'Disabled', define: (r) => r.estados.deshabilitado, clases: /(^|:)disabled:|cursor-not-allowed/, faltante: (n) => `${n} buttons have no disabled look: disabled or not, they look the same.` },
            ]}
          />
          <p className="mt-3 max-w-[70ch] text-[12.5px] text-ink-muted">
            El componente compartido <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-[11px]">ui/Button</code> ya define los cuatro estados para sus 7 variantes (Components / UI / Button), pero la app lo usa en {meta.usosDeButtonUI} lugares.
          </p>
        </Seccion>

        <TodoLoEncontrado tipo="button" familiaDe={familiaBoton} cantidad={botones.length} elementos={total} />
      </Page>
    )
  },
}
