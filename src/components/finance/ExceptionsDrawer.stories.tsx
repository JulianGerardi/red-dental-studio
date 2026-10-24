import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExceptionsDrawer, resumenExcepcion } from './ExceptionsDrawer'
import { esperar, escribir, pulsar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'
import { COBERTURAS } from '@/data/finanzas'

const meta = {
  title: 'Components/Finance/ExceptionsDrawer',
  component: ExceptionsDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      decisionsFrom: 'components/finance/ExceptionsDrawer.tsx',
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          '**Manage Exceptions** de una plantilla de *Coverage Table*. red.dev repite *Manage exceptions for standard with exceptions* en el título y la bajada; acá el título es *Manage Exceptions* (como el botón) y la bajada nombra la plantilla y dice para qué sirven.',
          '',
          'Primero la lista: buscador con Search a la izquierda, *Add new exception* a la derecha y la tabla (*Code, Exception* · *Description* · *Reason* · *Actions*) con el patrón de tablas. *Add new exception* abre en el mismo drawer el asistente de cuatro pasos de red.dev; Cancel vuelve a la lista. Cada excepción se guarda al terminar, sin esperar al Save de la tabla.',
          '',
          '**Probalo:** en *Playground* tocá *Add new exception* y armá una de tipo Frequency.',
        ].join('\n'),
      },
    },
  },
  args: { excepciones: COBERTURAS[0].excepciones, tabla: COBERTURAS[0].nombre, onClose: () => {}, onGuardar: () => {} },
  argTypes: { excepciones: { control: false }, tabla: { control: 'text', description: 'El nombre de la plantilla, para la bajada.' }, agregando: { control: 'boolean', description: 'Abre directamente el asistente.' } },
} satisfies Meta<typeof ExceptionsDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <PasosDelDrawer
      nota="La lista es la vista inicial; el asistente reemplaza su contenido y su pie (Cancel · Back · Next Step · Save)."
      pasos={[
        { nombre: 'Exceptions Type', secciones: 'Age limitation · Downgrade · Frequency · Not covered (sin título de sección: lo dice el paso)', obligatorios: 'Exception Type' },
        { nombre: 'Select Procedure', secciones: 'Add Procedures (n): buscador “Search for CDT Code o Description” y los elegidos como chips', obligatorios: 'Al menos uno (“Please add a procedure to the exception”)' },
        { nombre: 'Specify Options', secciones: 'Age limitation: Minimum/Maximum age y Coverage % o Downgrade to + Deductible Type · Downgrade: Downgrade to · Frequency: How many times, Over the course of · Not covered: sin opciones', obligatorios: 'Los del tipo' },
        { nombre: 'Reason For Exception', secciones: 'Reason for exception, con la ayuda “Select the reason for the exception.”', obligatorios: 'Reason' },
      ]}
    />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'List', cuando: 'Las excepciones de la plantilla.', story: 'Playground' },
      { estado: 'Empty', cuando: 'Sin excepciones: “No exceptions found in the system.”.', story: 'Empty' },
      { estado: 'Wizard', cuando: 'Add new exception: el asistente en el paso 1.', story: 'Wizard' },
      { estado: 'Validation error', cuando: 'Next Step en Select Procedure sin códigos.', story: 'Without Procedure' },
      { estado: 'Not covered options', cuando: 'Specify Options de Not covered: “There are no type specific options for Not covered type.”.' },
    ]} />
  ),
}

export const Empty: Story = { args: { excepciones: [] } }
export const Wizard: Story = { args: { agregando: true } }
export const WithoutProcedure: Story = {
  args: { agregando: true },
  play: secuencia(pulsar(/^next step$/i), pulsar(/^next step$/i), esperar(/please add a procedure/i)),
}
export const SearchProcedure: Story = {
  args: { agregando: true },
  play: secuencia(pulsar(/^next step$/i), escribir(/search for cdt code/i, 'D27'), esperar(/D2740 - /)),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <SpecsDelDrawer filas={[
        ['Size', 'lg'],
        ['Guarda', 'onGuardar(lista, “added” | “removed”); quitar tiene Undo en el toast de la pantalla.'],
        ['Description', 'resumenExcepcion(): el efecto en una línea.'],
      ]} />
      <Bloque titulo="Description por tipo">
        <Tabla encabezado={['Type', 'Description']}>
          {COBERTURAS[0].excepciones.map((e) => <tr key={e.id}><td className="font-semibold">{e.tipo}</td><td>{resumenExcepcion(e)}</td></tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
