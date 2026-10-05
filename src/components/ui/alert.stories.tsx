import type { Meta, StoryObj } from '@storybook/react-vite'
import { ALERT_TONES, Alert, type AlertTone } from './alert'
import { Bloque, Lienzo, Tabla, Token } from '@/design-system/kit'
import { tokensDe } from '@/design-system/medir'

const TONOS = Object.keys(ALERT_TONES) as AlertTone[]
const USO: Record<AlertTone, string> = {
  info: 'Algo para saber, sin acción: una verificación en curso.',
  success: 'Salió bien: se guardó, se envió.',
  warning: 'Hay que tenerlo en cuenta: acceso limitado, un dato que falta.',
  danger: 'Algo falló o se bloqueó: no se pudo guardar.',
}

const meta = {
  title: 'Elements/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El aviso de la app (`@/components/ui/alert`): un mensaje dentro de la pantalla, con ícono, título y texto, en los colores de los estados. Por ejemplo, *Limited access to this treatment case* en Treatment Plan. Para algo que pasó y se va solo, el toast (`aviso`).',
          '',
          '**Probalo:** en *Playground* cambiá tono, título y texto desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { tone: 'warning', title: 'Limited access to this treatment case', children: 'You do not have permission to update treatment plans for this location.' },
  argTypes: {
    tone: { control: 'inline-radio', options: TONOS, description: 'Color según lo que dice.' },
    title: { control: 'text', description: 'Qué pasa, en una línea.' },
    children: { control: 'text', description: 'El detalle o qué hacer. Vacío, no se muestra.' },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <div className="flex max-w-[640px] flex-col gap-3">
        {TONOS.map((t) => <Alert key={t} tone={t} title={t[0]!.toUpperCase() + t.slice(1)}>{USO[t]}</Alert>)}
        <Alert tone="info" title="Only a title, no detail" />
      </div>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Colors" nota="Tokens de cada tono, de alert.tsx y src/index.css.">
        <Tabla encabezado={['Tone', 'Fill', 'Border', 'Title and icon']} minimo={560}>
          {TONOS.map((t) => {
            const k = tokensDe(`border ${ALERT_TONES[t].caja} ${ALERT_TONES[t].color}`)
            return (
              <tr key={t}>
                <td className="font-semibold capitalize">{t}</td>
                <td><Token nombre={k.fondo} /></td>
                <td><Token nombre={k.borde} /></td>
                <td><Token nombre={k.texto} /></td>
              </tr>
            )
          })}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
