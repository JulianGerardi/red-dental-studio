import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavigationPreview, type NavigationPreviewState } from '@/components/layout/navigation-preview'
import { PantallaReal } from './pantalla'

/* El menú lateral (rail) sobre las pantallas reales: la app entera, con el
   Sidebar, la barra de arriba y la pantalla de la ruta elegida. */

const RUTAS = {
  Dashboard: '/',
  Patients: '/patients',
  Scheduling: '/scheduling',
  Billing: '/billing',
  Help: '/help',
  'Settings / Accounts': '/settings/accounts',
} as const

type Args = {
  screen: keyof typeof RUTAS
  expanded: boolean
  preview?: Omit<NavigationPreviewState, 'expanded'>
}

const meta = {
  title: 'Elements/Navigation',
  parameters: {
    layout: 'fullscreen',
    router: false,
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          '**Menú lateral (rail)** (\`Sidebar\`, dentro de \`AppShell\`). Colapsado mide 58px y muestra sólo íconos; expandido mide 234px con los nombres. Se abre y se cierra con el botón de la barra de arriba, a la izquierda del saludo.',
          '',
          '- **Colapsado:** al pasar el mouse por un ícono aparece su nombre en un tooltip a la derecha.',
          '- **Expandido:** no hay tooltips, el nombre ya se ve.',
          '- **Ítem activo:** azul con texto blanco, según la pantalla en la que estás.',
          '- **Settings:** queda abajo, en el mismo lugar colapsado y expandido. Al pasar el mouse abre un menú flotante con sus secciones.',
          '- **En el celular:** el menú es un panel que tapa el contenido y se cierra solo al elegir una pantalla.',
          '',
          'El menú del paciente está en *Elements / Patient menu*.',
          '',
          '**Probalo:** en *Playground* elegí la pantalla y usá el botón de la barra de arriba; pasá el mouse por los íconos y por Settings.',
        ].join('\\n'),
      },
    },
  },
  args: { screen: 'Dashboard', expanded: false },
  argTypes: {
    screen: { control: 'select', options: Object.keys(RUTAS), description: 'Pantalla abierta: define el ítem activo.' },
    expanded: { control: 'boolean', description: 'Cómo arranca el menú. En la app se cambia con el botón de la barra de arriba.' },
    preview: { table: { disable: true } },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Pantalla({ screen, expanded, preview = {} }: Args) {
  return (
    <NavigationPreview.Provider value={{ ...preview, expanded }}>
      <PantallaReal key={\`\${screen}-\${expanded}\`} ruta={RUTAS[screen]} />
    </NavigationPreview.Provider>
  )
}

const historia = (nombre: string, args: Partial<Args>, controles?: (keyof Args)[]): Story => ({
  name: nombre,
  args,
  parameters: { docs: { disable: true }, controls: controles ? { include: controles } : { disable: true } },
  render: (a) => <Pantalla {...a} />,
})

/* Elegí la pantalla y colapsá o expandí con el botón de arriba. */
export const Playground: Story = { render: (args) => <Pantalla {...args} /> }

export const Collapsed = historia('Collapsed', { expanded: false }, ['screen'])
export const Expanded = historia('Expanded', { expanded: true }, ['screen'])
export const CollapsedTooltip = historia('Collapsed: tooltip on hover', { preview: { tooltip: 'Scheduling' } })
export const SettingsMenu = historia('Settings menu', { screen: 'Settings / Accounts', preview: { settingsMenu: true } })
export const ActiveItem = historia('Active item', { screen: 'Scheduling', expanded: true }, ['screen', 'expanded'])

/* En el celular el menú es un panel: se abre con el botón de arriba. */
export const Phone: Story = {
  ...historia('On a phone', { screen: 'Dashboard', expanded: true }, ['screen']),
  globals: { viewport: { value: 'mobile2', isRotated: false } },
}
`})))()}export{n,i as r,r as t};