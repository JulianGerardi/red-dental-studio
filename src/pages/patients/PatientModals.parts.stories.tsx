import type { Meta, StoryObj } from '@storybook/react-vite'
import { conPacientes } from '@/design-system/decorators'
import { pulsar, esperar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { VACIO_PACIENTE } from '@/data/patientsStore'
import {
  BuscarPersona, CamposContacto, CamposDemography, CamposDireccion, CamposGeneral, CamposGuardian,
} from '@/components/patients/PacienteCampos'
import { PERSONAS_SISTEMA } from '@/data/personas'
import { EditContactModal } from './EditContactModal'
import EditPatientPage from './EditPatient'
import { NewPatientModal } from './NewPatientModal'

/* New Patient (drawer en pasos, CON-1328) y Edit Patient (pantalla con el formato de la ficha de un empleado, CON-1329).
   Decisiones: design-reference/figma/modulos/patients.md, 2026-11-18. */
const meta = {
  title: 'Pages/Parts/Patient modals',
  parameters: {
    layout: 'fullscreen',
    docs: {
      jira: ['CON-2107', 'CON-2858', 'CON-1328', 'CON-1329'],
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          'Alta y edición de un paciente, con los campos de Confidentally 2.0.',
          '',
          '- **New Patient** es un drawer en pasos: *General* → *Guardian* (sólo para un menor de 18, obligatorio) → *Demography*. General puede vincular a una persona que ya está en el sistema. Si el nombre completo y el email ya son de otro paciente, avisa con un `Alert` y no guarda.',
          '- **Edit Patient** es una pantalla (`/patients/:id/edit`) con el formato de la ficha de un empleado: foto editable, nombre y estado, y las cards *General*, *Contact*, *Address* y *Demographic*, sin pestañas. No lleva Guardian ni el buscador de personas: editar no vincula a nadie.',
          '- **Interpreter Required** va en Demography, en la misma fila que *Language*: van de la mano.',
          '- Los errores se marcan sólo en la sección que se revisó; al guardar, el foco va al primer campo que falta.',
          '',
          '**Probalo:** en *Playground* completá General y avanzá; en *Edit Patient* borrá un obligatorio y tocá *Save Changes*.',
        ].join('\n'),
      },
    },
  },
  decorators: [conPacientes],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const salir = () => {}
const datos = { ...VACIO_PACIENTE, first: 'Abril', last: 'Viola', birthday: 'April 2, 2025', email: 'Abril@gmail.com' }
const sinCambiar = () => {}
const DOCS = { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } }

/* New Patient vivo, en General. */
export const Playground: Story = { render: () => <NewPatientModal onClose={salir} /> }

export const Parts: Story = {
  parameters: DOCS,
  render: () => (
    <div className="flex flex-col gap-8">
      <PasosDelDrawer
        nota="New Patient. Guardian aparece sólo si la fecha de nacimiento es de un menor de 18."
        pasos={[
          { nombre: 'General', secciones: 'Casilla para vincular a una persona del sistema; si no, First, Middle y Last Name en una fila, Email y Birthdate; la cuenta del portal', obligatorios: 'First Name, Last Name, Email, Birthdate · o una persona elegida' },
          { nombre: 'Guardian', secciones: 'Buscador de personas o Add New Person (datos, contacto y dirección en desplegables), garante y relación', obligatorios: 'Un guardián y su relación; si es nuevo, sus datos, teléfono y dirección' },
          { nombre: 'Demography', secciones: 'Gender, Race, Ethnicity, Marital Status, Profession, Nationality, Language + Interpreter Required, Religion', obligatorios: 'Gender' },
        ]}
      />
      <PasosDelDrawer
        nota="Edit Patient: las mismas secciones como cards de una sola pantalla, en este orden, con un único Save Changes."
        pasos={[
          { nombre: 'General', secciones: 'Foto, nombre y estado arriba; First, Middle y Last Name, Email, Birthdate y la cuenta del portal (Linked o la opción de crearla)', obligatorios: 'First Name, Last Name, Email, Birthdate' },
          { nombre: 'Contact', secciones: 'Country Code, Area Code (3 digits), Number (7 digits), Extension', obligatorios: 'Todos menos Extension' },
          { nombre: 'Address', secciones: 'Address Line 1 y 2, Country, State, City, ZIP Code', obligatorios: 'Todos menos Address Line 2' },
          { nombre: 'Demographic', secciones: 'Los mismos campos que en New Patient', obligatorios: 'Gender' },
        ]}
      />
    </div>
  ),
}

export const States: Story = {
  parameters: DOCS,
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'New · General', cuando: 'Abre en General, vacío.', story: 'Playground' },
      { estado: 'New · Required fields', cuando: 'Next Step con obligatorios vacíos: se marcan sólo los del paso.', story: 'New Patient — Required fields' },
      { estado: 'New · Guardian', cuando: 'El paciente es menor de 18: aparece el paso y el aviso.', story: 'New Patient — Guardian' },
      { estado: 'New · Demography', cuando: 'Gender obligatorio; Interpreter Required al lado de Language.', story: 'New Patient — Demography' },
      { estado: 'New · Duplicate', cuando: 'Mismo nombre y email que otro paciente: Alert danger arriba y no guarda.', story: 'New Patient — Duplicate' },
      { estado: 'New · Linked person', cuando: 'La casilla tildada cambia los datos por el buscador.', story: 'Link Person Selected' },
      { estado: 'Edit · Complete', cuando: 'Abre con los datos del paciente; la cuenta del portal como Linked.', story: 'Edit patient' },
      { estado: 'Edit · Missing data', cuando: 'Ficha sin teléfono, dirección ni Gender: Save Changes los marca y lleva al primero.', story: 'Edit Patient — Missing data' },
      { estado: 'Edit · No portal account', cuando: 'Ofrece crear la cuenta en vez del estado Linked.', story: 'Edit Patient — Missing data' },
    ]} />
  ),
}

export const Specs: Story = {
  parameters: DOCS,
  render: () => (
    <SpecsDelDrawer filas={[
      ['New patient', 'Drawer lg · 560px, pasos con DrawerStep y DrawerActions'],
      ['Edit patient', 'Pantalla: migas Patients / Edit Patient, PageTitle, cards de Settings (Card), FormFooter a la derecha'],
      ['Header de Edit', 'EditableAvatar 56px (misma foto que el panel del paciente: clavePacienteFoto) + nombre 20px Bold + Pill de estado'],
      ['Fields', 'De a dos; el nombre completo en una fila de tres. En celular, apilados'],
      ['Interpreter required', 'OptionCheckbox a 36px de alto, abajo de su celda: a la altura del select de Language'],
      ['Duplicate', 'Alert danger · "A patient is already registered with this name and email address."'],
      ['Validation', 'useFormPaciente: errores por sección revisada; enfocar() lleva al campo con scroll'],
    ]} />
  ),
}

/* New Patient: un paso por story. */
export const NewPatientGuardian: Story = { name: 'New Patient — Guardian', render: () => <NewPatientModal pasoInicial={1} inicial={{ first: 'Mia', last: 'Lopez', email: 'mia@mail.com', birthday: 'January 15, 2016' }} onClose={salir} /> }
export const NewPatientDemography: Story = { name: 'New Patient — Demography', render: () => <NewPatientModal pasoInicial={2} onClose={salir} /> }
/* Next Step sin lo obligatorio: marca en rojo y no avanza. */
export const NewPatientRequired: Story = {
  name: 'New Patient — Required fields',
  render: () => <NewPatientModal onClose={salir} />,
  play: secuencia(pulsar(/Next Step/), esperar(/This field is required/)),
}
/* Abril Viola ya está en la lista (el duplicado mira nombre y email): Save avisa y no guarda (CON-1328). */
export const NewPatientDuplicate: Story = {
  name: 'New Patient — Duplicate',
  render: () => <NewPatientModal pasoInicial={1} inicial={{ ...datos, birthday: '04/02/1990', gender: 'Female' }} onClose={salir} />,
  play: secuencia(pulsar(/^Save/), esperar(/already registered/)),
}

/* Edit Patient: la pantalla, completa y con datos que faltan. */
export const EditPatient: Story = { render: () => <EditPatientPage pacienteId="abril-viola" /> }
export const EditPatientMissing: Story = {
  name: 'Edit Patient — Missing data',
  render: () => <EditPatientPage pacienteId="marco-rivera" />,
  play: secuencia(pulsar(/Save Changes/), esperar(/This field is required/)),
}

export const EditContact: Story = { render: () => <EditContactModal onClose={salir} /> }

/* Las secciones sueltas, como se dibujan en el drawer (con título) o en las cards de Edit Patient (sin título). */
export const FieldsGeneral: Story = {
  name: 'Fields — General', parameters: { layout: 'padded' },
  render: () => <div className="w-[512px]"><CamposGeneral d={datos} cambiar={sinCambiar} errores={{}} portalVinculado /></div>,
}
export const FieldsGuardian: Story = {
  name: 'Fields — Guardian', parameters: { layout: 'padded' },
  render: () => <div className="w-[512px]"><CamposGuardian d={{ ...datos, guardianName: 'Elena Chen', guardianRel: 'Parent' }} cambiar={sinCambiar} errores={{}} /></div>,
}
export const FieldsDemography: Story = {
  name: 'Fields — Demography', parameters: { layout: 'padded' },
  render: () => <div className="w-[512px]"><CamposDemography d={{ ...datos, gender: 'Female', language: 'Spanish', interpreter: true, nationality: 'United States' }} cambiar={sinCambiar} errores={{}} /></div>,
}
export const FieldsContact: Story = {
  name: 'Fields — Contact', parameters: { layout: 'padded' },
  render: () => <div className="w-[512px]"><CamposContacto d={{ ...datos, area: '555', numero: '12345' }} cambiar={sinCambiar} errores={{ numero: 'Number must be 7 digits.' }} /></div>,
}
export const FieldsAddress: Story = {
  name: 'Fields — Address', parameters: { layout: 'padded' },
  render: () => <div className="w-[512px]"><CamposDireccion d={{ ...datos, linea1: '123 Maple Street', pais: 'United States', estado: 'Arizona', ciudad: 'Phoenix', zip: '85016' }} cambiar={sinCambiar} errores={{}} /></div>,
}

/* New Patient → "link a person that already exists" (CON-2107; patients.md, 2026-11-02): el buscador de personas del
   sistema, vacío, con una elegida y con error. */
export const LinkPersonSearch: Story = { render: () => <div className="w-[420px]"><BuscarPersona v={{ activo: true, onActivo: () => {}, personas: PERSONAS_SISTEMA, valor: '', onValor: () => {} }} /></div> }
export const LinkPersonSelected: Story = { render: () => <div className="w-[420px]"><BuscarPersona v={{ activo: true, onActivo: () => {}, personas: PERSONAS_SISTEMA, valor: PERSONAS_SISTEMA[0].name, onValor: () => {} }} /></div> }
export const LinkPersonError: Story = { render: () => <div className="w-[420px]"><BuscarPersona v={{ activo: true, onActivo: () => {}, personas: PERSONAS_SISTEMA, valor: '', onValor: () => {}, error: 'Select a person or untick the option to enter the details.' }} /></div> }
