import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { PatientSidePanel, setPatientMenuCollapsed } from '@/components/patients/PatientSidePanel'
import { TooltipProvider } from '@/components/ui/tooltip'
import { NOTIFICACIONES } from '@/data/notificaciones'
import { conPacientes } from './decorators'
import { HelpProvider } from '@/components/help/HelpProvider'

/* Cómo se navega la app: el menú lateral (rail) y el menú del paciente. Se
   usan los componentes reales -Sidebar, Topbar y PatientSidePanel-, así que
   se comportan igual que en la app: colapsar y expandir, tooltips, el menú
   flotante de Settings y el ítem activo según la ruta. */

type Args = { expanded: boolean; route: string; tooltip?: string; settingsMenu?: boolean }

const RUTAS = ['/', '/patients', '/scheduling', '/billing', '/settings/accounts', '/help']

const meta = {
  title: 'Elements/Navigation',
  parameters: {
    layout: 'fullscreen',
    router: false,
    docs: {
      story: { inline: false, iframeHeight: 640 },
      description: {
        component: [
          '**Menú lateral (rail).** Colapsado mide 58px y muestra sólo íconos; expandido mide 234px con los nombres. Se abre y se cierra con el botón de la barra de arriba (⟨ ⟩, a la izquierda del saludo).',
          '',
          '- **Colapsado:** al pasar el mouse por un ícono aparece su nombre en un tooltip a la derecha (a los 100 ms).',
          '- **Expandido:** no hay tooltips, el nombre ya se ve.',
          '- **Ítem activo:** azul con texto blanco, según la pantalla en la que estás.',
          '- **Settings:** queda abajo, en el mismo lugar colapsado y expandido. Al pasar el mouse abre un menú flotante con sus secciones.',
          '- **En el celular:** el menú es un panel que tapa el contenido y se cierra solo al elegir una pantalla.',
          '',
          '**Menú del paciente.** En las pantallas de un paciente, el panel de la izquierda (218px) se colapsa a 60px con el botón de arriba del panel; colapsado muestra sólo íconos, con tooltip. Queda colapsado al pasar de una sección del paciente a otra. Sólo colapsa desde 1024px de ancho.',
          '',
          '**Probalo:** en *Sidebar* usá el botón de la barra de arriba o el control *expanded*; pasá el mouse por los íconos y por Settings.',
        ].join('\\n'),
      },
    },
  },
  args: { expanded: false, route: '/patients' },
  argTypes: {
    tooltip: { table: { disable: true } },
    settingsMenu: { table: { disable: true } },
    expanded: { control: 'boolean', description: 'Rail expandido (234px) o colapsado (58px).' },
    route: { control: 'select', options: RUTAS, description: 'Pantalla actual: define el ítem activo.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* Comprueba que el texto aparezca (tooltips y menús se dibujan fuera del
   canvas): si no aparece, la historia falla. */
async function aparece(canvasElement: HTMLElement, texto: RegExp) {
  const { within } = await import('storybook/test')
  await within(canvasElement.ownerDocument.body).findAllByText(texto)
}

/* El marco de la app: rail + barra de arriba + contenido. */
function Marco({ expanded: inicial, route, tooltip, settingsMenu }: Args) {
  const [expanded, setExpanded] = useState(inicial)
  return (
    <MemoryRouter initialEntries={[route]}>
      <HelpProvider>
      <TooltipProvider>
        <div className="flex h-svh bg-page-background">
          <Sidebar expanded={expanded} onClose={() => setExpanded(false)} tooltipAbierto={tooltip} settingsAbierto={settingsMenu} />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar expanded={expanded} onToggleSidebar={() => setExpanded((v) => !v)} notificaciones={NOTIFICACIONES} />
            <div className="flex-1 p-8">
              <div className="max-w-[520px] rounded-lg border border-line-row bg-white p-5 text-[13px] text-ink-medium">
                <p className="text-[14px] font-semibold text-ink">Menu {expanded ? 'expanded' : 'collapsed'}</p>
                <ul className="mt-2 flex list-disc flex-col gap-1 pl-5">
                  <li>The button left of the greeting {expanded ? 'collapses' : 'expands'} the menu.</li>
                  {!expanded && <li>Hover an icon to see its name.</li>}
                  <li>Hover Settings, at the bottom, to open its menu.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
      </HelpProvider>
    </MemoryRouter>
  )
}

/* Colapsá y expandí con el botón de arriba o desde Controls. */
export const Sidebar_: Story = {
  name: 'Sidebar',
  render: (args) => <Marco key={\`\${args.expanded}-\${args.route}\`} {...args} />,
}

/* Colapsado: el nombre aparece en un tooltip al pasar el mouse. */
export const CollapsedTooltip: Story = {
  name: 'Collapsed: tooltip on hover',
  args: { expanded: false, tooltip: 'Scheduling' },
  parameters: { controls: { include: ['route'] } },
  /* El tooltip de Scheduling queda abierto para verlo; en los demás ítems
     aparece al pasar el mouse. */
  render: (args) => <Marco key={\`\${args.expanded}-\${args.route}\`} {...args} />,
  play: async ({ canvasElement }) => {
    const { within, expect } = await import('storybook/test')
    await expect(await within(canvasElement.ownerDocument.body).findByRole('tooltip')).toHaveTextContent('Scheduling')
  },
}

/* Settings abre su menú flotante al pasar el mouse. */
export const SettingsMenu: Story = {
  name: 'Settings menu',
  args: { expanded: false, route: '/settings/accounts', settingsMenu: true },
  parameters: { controls: { include: ['expanded'] } },
  /* El menú queda abierto para verlo; en la app abre al pasar el mouse. */
  render: (args) => <Marco key={\`\${args.expanded}-\${args.route}\`} {...args} />,
  play: async ({ canvasElement }) => aparece(canvasElement, /^Locations$/),
}

export const Expanded: Story = {
  args: { expanded: true, route: '/scheduling' },
  render: (args) => <Marco key={\`\${args.expanded}-\${args.route}\`} {...args} />,
}

/* ── Menú del paciente ──────────────────────────────────────────────────── */
function Paciente() {
  return (
    <MemoryRouter initialEntries={['/patients/patient-0001']}>
      <HelpProvider>
      <TooltipProvider>
        <div className="flex min-h-svh gap-5 bg-page-background p-6">
          <PatientSidePanel name="Sarah Stone" initials="SS" section="Dashboard" basePath="/patients/patient-0001" />
          <div className="flex-1 rounded-lg border border-line-row bg-white p-5 text-[13px] text-ink-medium">
            The patient’s content uses the width the menu frees when it collapses.
          </div>
        </div>
      </TooltipProvider>
      </HelpProvider>
    </MemoryRouter>
  )
}

/* El estado del panel es de toda la sesión (así queda igual al pasar de una
   sección del paciente a otra); cada historia lo deja como dice su nombre. */
export const PatientMenu: Story = {
  name: 'Patient menu: expanded',
  parameters: { controls: { disable: true } },
  decorators: [conPacientes],
  loaders: [async () => { setPatientMenuCollapsed(false); return {} }],
  render: () => <Paciente />,
}

export const PatientMenuCollapsed: Story = {
  name: 'Patient menu: collapsed',
  parameters: { controls: { disable: true } },
  decorators: [conPacientes],
  loaders: [async () => { setPatientMenuCollapsed(true); return {} }],
  render: () => <Paciente />,
}
`})))()}export{n,i as r,r as t};