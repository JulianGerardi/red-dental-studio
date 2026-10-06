import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewEmployeeDrawer } from './NewEmployeeDrawer'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'

const meta = {
  title: 'Components/Settings/NewEmployeeDrawer',
  component: NewEmployeeDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          'Alta de un empleado desde *Settings → Employees → New Employee*. Antes era una pantalla aparte; ahora es un drawer con los pasos de Confidentally 2.0.',
          '',
          '**Link a person that already exists:** cambia los datos personales por un buscador de providers; Next Step queda deshabilitado hasta elegir a alguien.',
          '',
          '**Probalo:** en *Playground* tildá la casilla de vincular o completá los datos y avanzá.',
        ].join('\n'),
      },
    },
  },
  args: { onClose: () => {}, onGuardar: () => {} },
} satisfies Meta<typeof NewEmployeeDrawer>

export default meta
type Story = StoryObj<typeof meta>

/* El drawer vivo, en el paso 1. */
export const Playground: Story = {}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <PasosDelDrawer pasos={[
      { nombre: 'General', secciones: 'General Information: casilla para vincular a alguien que ya existe; si no, First, Middle y Last name, Birthdate, Email', obligatorios: 'First name, Last name, Birthdate, Email · o una persona elegida' },
      { nombre: 'Contact', secciones: 'Contact Information: Country Code, Area Code, Number, Extension', obligatorios: 'Todos menos Extension' },
      { nombre: 'Address', secciones: 'Address Information: Line 1 y 2, Country, State, City, ZIP', obligatorios: 'Todos menos Address Line 2' },
    ]} />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Abre en General con los campos de la persona.', story: 'Playground' },
      { estado: 'Validation errors', cuando: 'Next Step con obligatorios vacíos: se marcan en rojo sólo los del paso a la vista.', story: 'With Validation Errors' },
      { estado: 'Next disabled', cuando: 'Con la casilla de vincular tildada y nadie elegido.', story: 'Link Existing' },
      { estado: 'Saved', cuando: 'El empleado entra primero en la tabla, Active, y aparece el toast.' },
    ]} />
  ),
}

/* Estado de error: Next Step con los obligatorios vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^next step$/i), esperar(/required/i)),
}

/* Link a person that already exists: los datos se cambian por el buscador y Next Step queda disabled hasta elegir a alguien. */
export const LinkExisting: Story = {
  play: secuencia(pulsar(/link a person/i), esperar(/search providers/i)),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'lg · 560px'],
      ['Opens from', 'New Employee en Settings → Employees; también /settings/team/new.'],
      ['Fields', 'De a dos por fila; Email a lo ancho.'],
      ['Shared piece', 'LinkExistingPerson, la misma de la ficha del empleado.'],
      ['Validation', 'lib/useFormPasos'],
    ]} />
  ),
}
