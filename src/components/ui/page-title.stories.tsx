import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageTitle } from './page-title'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla, useMedidas } from '@/design-system/kit'

const SUBTITULO = 'mt-[9px] text-xs leading-[17px] text-ink-faint'

const meta = {
  title: 'Components/UI/PageTitle',
  component: PageTitle,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El título de cada pantalla (`@/components/ui/page-title`). Una sola escala para toda la app: **md, 20px Semibold**, en Patients, Scheduling, Billing, Notifications, las pantallas del paciente, **Settings** (todas, incluida la home) y **Help**. **lg, 24px Bold**, sólo en el Dashboard, como en su Figma.',
          '',
          '**Bajada:** 12px en `ink-faint`, 9px debajo del título.',
          '',
          '**Probalo:** en *Playground* cambiá el texto y el tamaño desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { children: 'Patients', size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'lg'], description: 'md 20px Semibold (todas las pantallas) · lg 24px Bold (Dashboard).' },
    children: { control: 'text', description: 'El nombre de la pantalla.' },
  },
} satisfies Meta<typeof PageTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Title and subtitle" nota="Así arrancan Settings → Locations, Help y Patients.">
        <div className="rounded-lg border border-dashed border-line p-5">
          <PageTitle>Locations</PageTitle>
          <p className={SUBTITULO}>Set your location name. Add the location you need.</p>
        </div>
        <Tabla encabezado={['Part', 'What it does']}>
          <tr><td className="font-semibold">Title</td><td>El nombre de la pantalla; uno por pantalla (h1).</td></tr>
          <tr><td className="font-semibold">Subtitle</td><td>Una línea de contexto, opcional.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Muestras>
      <ConRotulo rotulo="md · every screen"><PageTitle>Settings</PageTitle></ConRotulo>
      <ConRotulo rotulo="lg · Dashboard"><PageTitle size="lg">Dashboard</PageTitle></ConRotulo>
    </Muestras>
  ),
}

function Fila({ size }: { size: 'md' | 'lg' }) {
  const { ref, m } = useMedidas()
  return (
    <tr>
      <td><div ref={ref}><PageTitle size={size}>{size === 'lg' ? 'Dashboard' : 'Patients'}</PageTitle></div></td>
      <td className="font-semibold">{size}</td>
      <td className="tabular-nums">{m?.texto} · {m?.peso}</td>
      <td>{size === 'lg' ? 'Dashboard' : 'Todas las demás'}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas del título dibujado.">
        <Tabla encabezado={['Sample', 'Size', 'Text', 'Where']} minimo={560}>
          <Fila size="md" />
          <Fila size="lg" />
        </Tabla>
      </Bloque>
      <Bloque titulo="Shared rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Line height 1.3 y color <code>ink</code> en los dos tamaños.</li>
          <li>Los títulos de cards y paneles van más chicos: 15px Bold (Today Appointments, las secciones de Settings).</li>
          <li>Los drawers y Confibot titulan en 18px Bold con bajada de 12px.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
