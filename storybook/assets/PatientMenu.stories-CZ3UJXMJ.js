import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { PatientSidePanel, setEncounterState, setPatientMenuCollapsed } from '@/components/patients/PatientSidePanel'
import { TooltipProvider } from '@/components/ui/tooltip'
import { HelpProvider } from '@/components/help/HelpProvider'
import { conPacientes } from './decorators'

/* El menú del paciente: el panel de la izquierda en todas las pantallas de un
   paciente (Overview, Treatments, Insurance, Ledger, Documents,
   Relationships). Es el componente real, PatientSidePanel. */

const SECCIONES = ['Overview', 'Treatments', 'Insurance', 'Ledger', 'Documents', 'Relationships & Billing'] as const
type Args = {
  collapsed: boolean
  section: (typeof SECCIONES)[number]
  encounter: 'start' | 'pending'
  name: string
  initials: string
  tooltip?: string
  infoCard?: boolean
  encounterOptions?: boolean
}

const meta = {
  title: 'Elements/Patient menu',
  parameters: {
    layout: 'fullscreen',
    router: false,
    docs: {
      story: { inline: false, iframeHeight: 780 },
      description: {
        component: [
          'El panel de la izquierda en todas las pantallas de un paciente (\`@/components/patients/PatientSidePanel\`).',
          '',
          '**Expandido (218px), de arriba hacia abajo:** botón para colapsar · foto (se cambia con clic), nombre, estado y edad · botón de encuentro (*Start Encounter* verde o *Pending Encounter* ámbar; el chevron cambia entre los dos) · *Clinical Mode* · las secciones del paciente, con la actual en azul · *General* y *Contact*, cada uno con su lápiz para editar.',
          '',
          '**Colapsado (60px):** sólo íconos, cada uno con su nombre en un tooltip. El estado del paciente pasa a un punto verde sobre la foto (tooltip: nombre, estado y edad). *Clinical Mode* queda como ícono. *General* y *Contact* se leen en una tarjeta que abre el ícono de ficha al pasar el mouse. El botón de encuentro no está: se usa expandido.',
          '',
          '**Recuerda el estado:** colapsado o expandido, y el estado del encuentro, se mantienen al pasar de una sección del paciente a otra.',
          '',
          '**En pantallas angostas (menos de 1024px)** no se colapsa: las secciones pasan a una tira horizontal que se desliza, y General y Contact van en dos columnas.',
          '',
          '**Probalo:** en *Playground* cambiá colapsado, sección, encuentro y paciente desde *Controls*.',
        ].join('\\n'),
      },
    },
  },
  args: { collapsed: false, section: 'Overview', encounter: 'start', name: 'Sarah Stone', initials: 'SS' },
  argTypes: {
    collapsed: { control: 'boolean', description: 'Expandido (218px) o colapsado (60px). En la app se cambia con el botón de arriba del panel.' },
    section: { control: 'select', options: SECCIONES, description: 'Sección actual: queda en azul.' },
    encounter: { control: 'inline-radio', options: ['start', 'pending'], description: 'Start Encounter (verde) o Pending Encounter (ámbar).' },
    name: { control: 'text' },
    initials: { control: 'text', description: 'Iniciales cuando no hay foto.' },
    tooltip: { table: { disable: true } },
    infoCard: { table: { disable: true } },
    encounterOptions: { table: { disable: true } },
  },
  decorators: [conPacientes],
  loaders: [async ({ args }) => {
    setPatientMenuCollapsed(!!args.collapsed)
    setEncounterState(args.encounter ?? 'start')
    return {}
  }],
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* El colapso y el encuentro viven fuera de React (se comparten entre las
   pantallas del paciente). Un loader los deja bien antes de dibujar, y este
   componente -después del panel, para que el panel ya esté escuchando- los
   sigue cuando cambian los controles. */
function Sincronizar({ collapsed, encounter }: Pick<Args, 'collapsed' | 'encounter'>) {
  useEffect(() => {
    setPatientMenuCollapsed(collapsed)
    setEncounterState(encounter)
  }, [collapsed, encounter])
  return null
}

function Marco({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={['/patients/patient-0001']}>
      <HelpProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </HelpProvider>
    </MemoryRouter>
  )
}

function Pantalla({ collapsed, section, encounter, name, initials, tooltip, infoCard, encounterOptions }: Args) {
  return (
    <Marco>
      <div className="flex min-h-svh flex-col gap-5 bg-page-background p-6 lg:flex-row lg:items-start">
        <PatientSidePanel
          name={name}
          initials={initials}
          section={section}
          basePath="/patients/patient-0001"
          tooltipAbierto={tooltip}
          infoAbierta={infoCard}
          opcionesEncuentroAbiertas={encounterOptions}
        />
        <div className="min-h-[240px] flex-1 rounded-lg border border-line-row bg-white p-5 text-[13px] text-ink-medium">
          <p className="text-[14px] font-semibold text-ink">{section}</p>
          <p className="mt-1">The patient’s screen. It uses the width the menu frees when it collapses.</p>
        </div>
      </div>
      <Sincronizar collapsed={collapsed} encounter={encounter} />
    </Marco>
  )
}

/* Cambiá todo desde Controls. */
export const Playground: Story = { render: (args) => <Pantalla {...args} /> }

export const Expanded: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => <Pantalla {...args} />,
}

export const Collapsed: Story = {
  args: { collapsed: true },
  parameters: { controls: { include: ['section'] } },
  render: (args) => <Pantalla {...args} />,
}

/* Colapsado: el nombre de cada ícono aparece al pasar el mouse. */
export const CollapsedTooltip: Story = {
  name: 'Collapsed: tooltip on hover',
  args: { collapsed: true, section: 'Overview', tooltip: 'Ledger' },
  parameters: { controls: { disable: true } },
  render: (args) => <Pantalla {...args} />,
}

/* Colapsado: el punto verde sobre la foto dice nombre, estado y edad. */
export const CollapsedStatus: Story = {
  name: 'Collapsed: patient status',
  args: { collapsed: true, tooltip: 'Sarah Stone · Active · 50 years' },
  parameters: { controls: { disable: true } },
  render: (args) => <Pantalla {...args} />,
}

/* Colapsado: General y Contact en la tarjeta del ícono de ficha. */
export const CollapsedInfoCard: Story = {
  name: 'Collapsed: patient information',
  args: { collapsed: true, infoCard: true },
  parameters: { controls: { disable: true } },
  render: (args) => <Pantalla {...args} />,
}

/* La sección actual queda en azul. */
export const ActiveSection: Story = {
  name: 'Active section',
  args: { section: 'Ledger' },
  parameters: { controls: { include: ['section', 'collapsed'] } },
  render: (args) => <Pantalla {...args} />,
}

export const PendingEncounter: Story = {
  name: 'Encounter: pending',
  args: { encounter: 'pending' },
  parameters: { controls: { disable: true } },
  render: (args) => <Pantalla {...args} />,
}

/* El chevron del botón abre las dos opciones. */
export const EncounterOptions: Story = {
  name: 'Encounter: options',
  args: { encounterOptions: true },
  parameters: { controls: { disable: true } },
  render: (args) => <Pantalla {...args} />,
}

/* En el celular: tira horizontal de secciones y datos en dos columnas. */
export const Phone: Story = {
  name: 'On a phone',
  globals: { viewport: { value: 'mobile2', isRotated: false } },
  parameters: { controls: { include: ['section'] } },
  render: (args) => <Pantalla {...args} />,
}
`})))()}export{n,i as r,r as t};