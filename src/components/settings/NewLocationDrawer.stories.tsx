import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewLocationDrawer } from './NewLocationDrawer'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'

const meta = {
  title: 'Components/Settings/NewLocationDrawer',
  component: NewLocationDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          'Alta de una locación desde *Settings → Locations → New location*. Antes era una pantalla aparte; ahora es un drawer con los pasos de Confidentally 2.0 y los mismos campos y catálogos.',
          '',
          '**Pasos:** General, Contact y Address. Next Step sólo avanza con lo obligatorio del paso completo. Al guardar, la locación aparece primera en la tabla con su toast.',
          '',
          '**Probalo:** en *Playground* completá cada paso; Next Step con campos vacíos los marca en rojo.',
        ].join('\n'),
      },
    },
  },
  args: { onClose: () => {}, onGuardar: () => {} },
} satisfies Meta<typeof NewLocationDrawer>

export default meta
type Story = StoryObj<typeof meta>

/* El drawer vivo, en el paso 1. */
export const Playground: Story = {}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <PasosDelDrawer pasos={[
      { nombre: 'General', secciones: 'General Information: Name, Abbreviation, Default Fee Schedule', obligatorios: 'Name, Default Fee Schedule' },
      { nombre: 'Contact', secciones: 'Contact Information: Country Code, Area Code, Number, Email', obligatorios: 'Todos' },
      { nombre: 'Address', secciones: 'Address Information: Line 1 y 2, Country, State, City, ZIP, Time Zone', obligatorios: 'Todos menos Address Line 2' },
    ]} />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Abre en General, sin errores.', story: 'Playground' },
      { estado: 'Validation errors', cuando: 'Next Step o Save con obligatorios vacíos: borde rojo y "This field is required." sólo en el paso a la vista.', story: 'With Validation Errors' },
      { estado: 'Saved', cuando: 'La locación entra primera en la tabla y aparece el toast "… was added to your locations."' },
    ]} />
  ),
}

/* Estado de error: Next Step con Name y Default Fee Schedule vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^next step$/i), esperar(/required/i)),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'lg · 560px'],
      ['Opens from', 'New location en Settings → Locations; también /settings/locations/new, que abre la lista con el drawer abierto.'],
      ['Fields', 'De a dos por fila; Name y Time Zone a lo ancho.'],
      ['Validation', 'lib/useFormPasos'],
    ]} />
  ),
}
