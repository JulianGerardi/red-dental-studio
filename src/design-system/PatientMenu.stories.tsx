import { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { setEncounterState, setPatientMenuCollapsed } from '@/components/patients/PatientSidePanel'
import { PatientMenuPreview, type PatientMenuPreviewState } from '@/components/patients/patient-menu-preview'
import { PantallaReal } from './pantalla'

/* El menú del paciente sobre las pantallas reales del paciente: cada sección
   muestra su pantalla de verdad (Overview, Treatments, Insurance, Ledger,
   Documents, Relationships & Billing), con el panel tal como lo arma la app. */

const PACIENTE = '/patients/abril-viola'
const SECCIONES = {
  Overview: '',
  Treatments: '/treatments',
  Insurance: '/insurance',
  Ledger: '/ledger',
  Documents: '/documents',
  'Relationships & Billing': '/relationships',
} as const
type Seccion = keyof typeof SECCIONES

type Args = {
  section: Seccion
  collapsed: boolean
  encounter: 'start' | 'pending'
  preview?: PatientMenuPreviewState
}

const meta = {
  title: 'Elements/Patient menu',
  parameters: {
    layout: 'fullscreen',
    router: false,
    docs: {
      /* La página de docs explica y muestra el Playground; cada vista está en su
         historia, a tamaño completo. */
      story: { inline: false, iframeHeight: 760 },
      description: {
        component: [
          'El panel de la izquierda en las pantallas de un paciente (`@/components/patients/PatientSidePanel`), mostrado sobre las pantallas reales.',
          '',
          '**Expandido (218px):** colapsar · foto, nombre, estado y edad · botón de encuentro (*Start Encounter* / *Pending Encounter*, el chevron cambia entre los dos) · *Clinical Mode* · las secciones, con la actual en azul · *General* y *Contact* con su lápiz.',
          '',
          '**Colapsado (60px):** sólo íconos con su tooltip; el estado pasa a un punto verde sobre la foto; General y Contact se leen en la tarjeta del ícono de ficha. La pantalla usa el ancho que libera (se nota en Ledger).',
          '',
          '**Recuerda** colapsado/expandido y el encuentro al pasar de una sección a otra. **Menos de 1024px:** no colapsa; las secciones pasan a una tira horizontal.',
        ].join('\n'),
      },
    },
  },
  args: { section: 'Overview', collapsed: false, encounter: 'start' },
  argTypes: {
    section: { control: 'select', options: Object.keys(SECCIONES), description: 'Sección: se abre su pantalla y queda en azul en el menú.' },
    collapsed: { control: 'boolean', description: 'Expandido (218px) o colapsado (60px). En la app, con el botón de arriba del panel.' },
    encounter: { control: 'inline-radio', options: ['start', 'pending'], description: 'Start Encounter (verde) o Pending Encounter (ámbar).' },
    preview: { table: { disable: true } },
  },
  /* El colapso y el encuentro viven fuera de React (se comparten entre las
     pantallas del paciente): quedan bien antes de dibujar. */
  loaders: [async ({ args }) => {
    setPatientMenuCollapsed(!!args.collapsed)
    setEncounterState(args.encounter ?? 'start')
    return {}
  }],
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* Sigue los controles una vez que el panel ya está escuchando. */
function Sincronizar({ collapsed, encounter }: Pick<Args, 'collapsed' | 'encounter'>) {
  useEffect(() => {
    setPatientMenuCollapsed(collapsed)
    setEncounterState(encounter)
  }, [collapsed, encounter])
  return null
}

function Pantalla({ section, collapsed, encounter, preview = {} }: Args) {
  return (
    <PatientMenuPreview.Provider value={preview}>
      <PantallaReal
        key={section}
        ruta={`${PACIENTE}${SECCIONES[section]}`}
        despues={<Sincronizar collapsed={collapsed} encounter={encounter} />}
      />
    </PatientMenuPreview.Provider>
  )
}

const historia = (nombre: string, args: Partial<Args>, controles?: (keyof Args)[]): Story => ({
  name: nombre,
  args,
  parameters: { docs: { disable: true }, controls: controles ? { include: controles } : { disable: true } },
  render: (a) => <Pantalla {...a} />,
})

/* Cambiá sección, colapsado y encuentro desde Controls. */
export const Playground: Story = { render: (args) => <Pantalla {...args} /> }

/* Cada sección abre su pantalla real. */
export const Overview = historia('Section: Overview', { section: 'Overview' }, ['collapsed'])
export const Treatments = historia('Section: Treatments', { section: 'Treatments' }, ['collapsed'])
export const Insurance = historia('Section: Insurance', { section: 'Insurance' }, ['collapsed'])
export const Ledger = historia('Section: Ledger', { section: 'Ledger' }, ['collapsed'])
export const Documents = historia('Section: Documents', { section: 'Documents' }, ['collapsed'])
export const Relationships = historia('Section: Relationships & Billing', { section: 'Relationships & Billing' }, ['collapsed'])

/* Colapsado: la tabla del Ledger gana el ancho del panel. */
export const Collapsed = historia('Collapsed', { section: 'Ledger', collapsed: true }, ['section'])
export const CollapsedTooltip = historia('Collapsed: tooltip on hover', { section: 'Overview', collapsed: true, preview: { tooltip: 'Ledger' } })
export const CollapsedStatus = historia('Collapsed: patient status', { section: 'Overview', collapsed: true, preview: { tooltip: 'John Smith · Active · 50 years' } })
export const CollapsedInfoCard = historia('Collapsed: patient information', { section: 'Overview', collapsed: true, preview: { infoCard: true } })

export const PendingEncounter = historia('Encounter: pending', { encounter: 'pending' })
export const EncounterOptions = historia('Encounter: options', { preview: { encounterOptions: true } })

/* En el celular: tira horizontal de secciones. */
export const Phone: Story = {
  ...historia('On a phone', { section: 'Overview' }, ['section']),
  globals: { viewport: { value: 'mobile2', isRotated: false } },
}
