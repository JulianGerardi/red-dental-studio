import type { Meta, StoryObj } from '@storybook/react-vite'
import { Page, Seccion } from './Page'
import { elementosDe, meta as datos, recetas, type Receta } from './Recipes'
import { ColoresEnUso, EstadosDeLaApp, ROLES_COLOR, TamanosEnUso, TodoLoEncontrado } from './spec'

const meta = {
  title: 'Audit/Fields in code',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const campos = recetas.filter((r) => r.tipo === 'field')
const conError = (r: Receta) => /field-error|dash-bad/.test(r.firma)

export const CamposEnCodigo: Story = {
  name: 'Fields in code',
  render: () => {
    const total = datos.elementos.field ?? 0
    return (
      <Page
        titulo="Fields in code"
        bajada={`Para quien migra código: los ${total} <input>, <select> y <textarea> de la app con estilo propio, leídos del código, comparados con los campos estándar (Elements / Fields). Si el código cambia, cambia acá.`}
      >
        <Seccion titulo="Sizes in use" nota="Cuántos campos usan cada valor. Más de un valor quiere decir que hay campos del mismo tipo que no miden lo mismo.">
          <TamanosEnUso looks={campos.filter((r) => r.inputType !== 'checkbox' && r.inputType !== 'file')} total={total} />
        </Seccion>
        <Seccion titulo="Colors in use">
          <ColoresEnUso looks={campos} roles={ROLES_COLOR.filter((r) => r.nombre !== 'Fill on hover')} />
        </Seccion>
        <Seccion titulo="States in the app" nota="Qué porcentaje de los campos define cada estado y qué falta.">
          <EstadosDeLaApp
            looks={campos}
            total={total}
            filas={[
              { estado: 'Focus', define: (r) => r.estados.foco === 'definido', clases: /^(?:[^\s:]+:)*focus(?:-visible)?:(?!outline-none)/, faltante: (n, sin) => `${n} fields use the browser’s default ring; ${elementosDe(sin.filter((r) => r.estados.foco === 'quitado' || r.estados.foco === 'invisible'))} show no ring at all.` },
              { estado: 'Error', define: conError, clases: /field-error|dash-bad/, faltante: (n) => `${n} fields have no error look.` },
              { estado: 'Disabled', define: (r) => r.estados.deshabilitado, clases: /(^|:)disabled:|cursor-not-allowed/, faltante: (n) => `${n} fields have no disabled look.` },
            ]}
          />
        </Seccion>
        <TodoLoEncontrado tipo="field" cantidad={campos.length} elementos={total} />
      </Page>
    )
  },
}
