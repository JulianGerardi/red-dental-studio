import type { Meta, StoryObj } from '@storybook/react-vite'
import { AddRelationshipDrawer, DIRECTORIO, OpcionDireccion, PersonaSeleccionada } from './AddRelationshipDrawer'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla } from '@/design-system/kit'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { escribir, esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Patients/AddRelationshipDrawer',
  component: AddRelationshipDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 760 },
      description: {
        component: [
          'Sumar un contacto relacionado desde *Relationships & Billing → Add Relationship*. Antes era una pantalla aparte; ahora es el drawer de Confidentally 2.0 con sus tres pasos.',
          '',
          '**Pasos:** buscar a la persona o crear una nueva; sus datos de contacto; y la relación: Guardian y/o Guarantor, quién es responsable de quién y el vínculo con el paciente. Al guardar aparece primera en la lista.',
          '',
          '**Probalo:** en *Playground* buscá "Miller", elegí a alguien y avanzá; o tildá Add New Person.',
        ].join('\n'),
      },
    },
  },
  args: { paciente: 'John Smith', onClose: () => {}, onGuardar: () => {} },
  argTypes: { paciente: { control: 'text', description: 'El paciente de la ficha: aparece en las frases de Direction.' } },
} satisfies Meta<typeof AddRelationshipDrawer>

export default meta
type Story = StoryObj<typeof meta>

/* El drawer vivo, en el paso 1. */
export const Playground: Story = {}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <div className="flex flex-col gap-8">
      <PasosDelDrawer pasos={[
        { nombre: 'Person', secciones: 'Find or create person: buscador por nombre con resultados; la persona elegida con tilde; o Add New Person con First Name, Last Name y Email', obligatorios: 'Una persona elegida, o First y Last Name' },
        { nombre: 'Contact', secciones: 'General Information: Country, Number, Email · Adress Information: líneas 1 y 2, Country, Region, City, Postal Code', obligatorios: 'Todos' },
        { nombre: 'Relationship', secciones: 'Assign relationship role: Guardian, Guarantor · Direction · Relationship to Patient', obligatorios: 'Al menos un rol, una dirección y el vínculo' },
      ]} />
      <Lienzo>
        <Bloque titulo="Pieces">
          <Muestras>
            <ConRotulo rotulo="Selected person"><div className="w-[340px]"><PersonaSeleccionada p={DIRECTORIO[0]} /></div></ConRotulo>
            <ConRotulo rotulo="Direction option"><div className="flex w-[340px] flex-col gap-2"><OpcionDireccion texto="Michael Miller is Guardian for John Smith." elegida onElegir={() => {}} /><OpcionDireccion texto="John Smith is Guardian of Michael Miller." elegida={false} onElegir={() => {}} /></div></ConRotulo>
          </Muestras>
          <Tabla encabezado={['Piece', 'What it does']}>
            <tr><td className="font-semibold">Selected person</td><td>Borde azul, avatar cuadrado, DOB y email; en el drawer, con el tilde verde.</td></tr>
            <tr><td className="font-semibold">Direction option</td><td>Las dos frases se arman con la persona, los roles elegidos y el paciente.</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>
    </div>
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Abre en el buscador.', story: 'Playground' },
      { estado: 'Validation errors', cuando: 'Next Step sin persona elegida ni Add New Person: aviso debajo del buscador. En los otros pasos, los obligatorios en rojo.', story: 'With Validation Errors' },
      { estado: 'Selected', cuando: 'Persona elegida: su card con tilde.', story: 'Person Selected' },
      { estado: 'Disabled search', cuando: 'Con Add New Person tildado el buscador queda deshabilitado y aparecen los campos de la persona nueva.' },
      { estado: 'Saved', cuando: 'La relación entra primera en la lista, con Legal contact (Guardian) y/o Financial contact (Guarantor).' },
    ]} />
  ),
}

/* Estado de error: Next Step sin elegir a nadie. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^next step$/i), esperar(/select a person or tick/i)),
}

/* Persona elegida desde el buscador. */
export const PersonSelected: Story = {
  play: secuencia(escribir(/search by name/i, 'Miller'), pulsar(/^MM Michael Miller/), esperar(/mm\.thompson/i)),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'lg · 560px'],
      ['Opens from', 'Add Relationship en Relationships & Billing (y en su estado vacío); también /patients/:id/relationships/new.'],
      ['Texts', 'Los del Figma, incluido "Adress".'],
      ['Validation', 'lib/useFormPasos para los campos; persona, rol y dirección se validan aparte.'],
    ]} />
  ),
}
