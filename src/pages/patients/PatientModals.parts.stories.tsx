import type { Meta, StoryObj } from '@storybook/react-vite'
import { conPacientes } from '@/design-system/decorators'
import { pulsar, esperar, secuencia } from '@/design-system/play'
import { VACIO_PACIENTE } from '@/data/patientsStore'
import { CamposDemography, CamposGeneral, CamposGuardian } from '@/components/patients/PacienteCampos'
import { EditContactModal } from './EditContactModal'
import { EditPatientForm } from './EditPatient'
import { EditPatientModal } from './EditPatientModal'
import { NewPatientModal } from './NewPatientModal'

/* New Patient (tres pasos) y Edit Patient (tres pestañas) de Patients: Figma 3751:73452 y 5277:123056. Qué decidimos y por
   qué: design-reference/figma/modulos/patients.md, 2026-10-22. */
const meta = {
  title: 'Pages/Parts/Patient modals',
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 640 } } },
  decorators: [conPacientes],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const salir = () => {}

/* New Patient: un paso por story. */
export const NewPatient: Story = { render: () => <NewPatientModal onClose={salir} /> }
export const NewPatientGuardian: Story = { name: 'New Patient — Guardian', render: () => <NewPatientModal pasoInicial={1} onClose={salir} /> }
export const NewPatientDemography: Story = { name: 'New Patient — Demography', render: () => <NewPatientModal pasoInicial={2} onClose={salir} /> }
/* Next Step sin lo obligatorio: marca en rojo y no avanza. */
export const NewPatientRequired: Story = {
  name: 'New Patient — Required fields',
  render: () => <NewPatientModal onClose={salir} />,
  play: secuencia(pulsar(/Next Step/), esperar(/This field is required/)),
}

/* Edit Patient: se abre con los datos cargados y a un clic de cada sección. */
export const EditPatient: Story = { render: () => <EditPatientModal id="abril-viola" onClose={salir} /> }
export const EditPatientGuardian: Story = { name: 'Edit Patient — Guardian', render: () => <EditPatientModal id="sofia-chen" seccionInicial="Guardian" onClose={salir} /> }
export const EditPatientDemography: Story = { name: 'Edit Patient — Demography', render: () => <EditPatientModal id="abril-viola" seccionInicial="Demography" onClose={salir} /> }
/* Si el paciente aún no tiene cuenta del portal, ofrece crearla en vez del estado "Linked". */
export const EditPatientNoPortal: Story = { name: 'Edit Patient — No portal account', render: () => <EditPatientModal id="marco-rivera" onClose={salir} /> }
/* Save Changes desde Demography con un obligatorio vacío en General y otro en Guardian: lleva a General al campo que
   falta y la pestaña Guardian queda marcada con un punto rojo. */
export const EditPatientErrors: Story = {
  name: 'Edit Patient — Error in another section',
  render: () => (
    <EditPatientModal
      seccionInicial="Demography"
      inicial={{ ...VACIO_PACIENTE, first: 'Abril', birthday: 'April 2, 2025', email: 'abril@gmail.com', guardian: true, city: 'Phoenix' }}
      onClose={salir}
    />
  ),
  play: secuencia(pulsar(/Save Changes/), esperar(/This field is required/)),
}

export const EditContact: Story = { render: () => <EditContactModal onClose={salir} /> }
export const EditPatientFormOnly: Story = { parameters: { layout: 'padded' }, render: () => <EditPatientForm /> }

/* Las tres secciones sueltas, tal como se dibujan en los dos formularios (New Patient las muestra de a una, Edit Patient en
   pestañas). Sirven para ver los campos sin el drawer; los estados con datos y errores están arriba. */
const sinCambiar = () => {}
const datos = { ...VACIO_PACIENTE, first: 'Abril', last: 'Viola', birthday: 'April 2, 2025', email: 'Abril@gmail.com' }
export const FieldsGeneral: Story = {
  name: 'Fields — General', parameters: { layout: 'padded' },
  render: () => <div className="w-[512px]"><CamposGeneral d={datos} cambiar={sinCambiar} errores={{}} portalVinculado /></div>,
}
export const FieldsGuardian: Story = {
  name: 'Fields — Guardian', parameters: { layout: 'padded' },
  render: () => <div className="w-[512px]"><CamposGuardian d={{ ...datos, guardian: true, guardianName: 'Elena Chen', guardianRel: 'Parent' }} cambiar={sinCambiar} errores={{}} /></div>,
}
export const FieldsDemography: Story = {
  name: 'Fields — Demography', parameters: { layout: 'padded' },
  render: () => <div className="w-[512px]"><CamposDemography d={{ ...datos, phone: '(555) 123-4567', language: 'English', city: 'Phoenix' }} cambiar={sinCambiar} errores={{}} /></div>,
}
