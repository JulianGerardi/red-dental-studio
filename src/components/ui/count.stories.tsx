import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronDown, Clipboard, PersonStanding, Pill as PillIcon } from 'lucide-react'
import { COUNT_TONES, Count } from './count'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla, Token, useMedidas } from '@/design-system/kit'
import { tokensDe } from '@/design-system/medir'
import { TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

const meta = {
  title: 'Elements/Counts',
  component: Count,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El globo con una cuenta (`@/components/ui/count`): cuántas alergias, medicamentos o condiciones tiene un paciente. Con un dígito es un círculo; con dos, una píldora. No es un estado (eso es *Pills*) ni un botón: sólo cuenta.',
          '',
          '**Probalo:** en *Playground* cambiá el número y probá *active* (el globo sobre una card azul) desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { children: '4', active: false },
  argTypes: {
    children: { control: 'text', description: 'El número. Un dígito dibuja un círculo; dos o más, una píldora.' },
    active: { control: 'boolean', description: 'Sobre una card abierta (azul): fondo claro y número azul.' },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Count>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/* Los casos de la cuenta, en reposo y sobre la card abierta. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque nota="El ancho se adapta al número. El cero no se apaga: una lista vacía también es un dato.">
        <Muestras>
          {['0', '4', '12'].map((n) => <ConRotulo key={n} rotulo={n.length > 1 ? 'Two digits' : n === '0' ? 'Zero' : 'One digit'}><Count>{n}</Count></ConRotulo>)}
          <ConRotulo rotulo="Active (open card)">
            <span className="flex h-9 items-center rounded-lg bg-dash-blue px-3"><Count active>4</Count></span>
          </ConRotulo>
        </Muestras>
      </Bloque>
    </Lienzo>
  ),
}

/* Como se usa: en la cabecera de las cards clínicas del dashboard del paciente. */
const CARDS = [
  { titulo: 'Allergies', Icono: PersonStanding, cuenta: '4' },
  { titulo: 'Medical Conditions', Icono: Clipboard, cuenta: '4' },
  { titulo: 'Medication', Icono: PillIcon, cuenta: '12' },
]
export const InContext: Story = {
  name: 'In context',
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque nota="Icono, título, globo y chevron: el globo va pegado al título y su centro coincide con el del texto.">
        <div className="grid gap-3 sm:grid-cols-3">
          {CARDS.map(({ titulo, Icono, cuenta }, i) => (
            <div key={titulo} className={cn(TARJETA_PANEL, 'flex items-center gap-2.5 px-4 py-3', i === 0 && 'bg-dash-blue')}>
              <Icono className={cn('size-4 shrink-0', i === 0 ? 'text-white' : 'text-ink')} />
              <span className={cn('truncate text-[13px] font-semibold', i === 0 ? 'text-white' : 'text-ink')}>{titulo}</span>
              <Count active={i === 0}>{cuenta}</Count>
              <ChevronDown className={cn('ml-auto size-4 shrink-0', i === 0 ? 'rotate-180 text-white' : 'text-ink-muted')} />
            </div>
          ))}
        </div>
      </Bloque>
    </Lienzo>
  ),
}

function FilaMedidas({ rotulo, cuenta }: { rotulo: string; cuenta: string }) {
  const { ref, m } = useMedidas()
  return (
    <tr>
      <td><div ref={ref} className="inline-block"><Count>{cuenta}</Count></div></td>
      <td className="font-semibold">{rotulo}</td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m?.ancho}</td>
      <td className="tabular-nums">{m?.padding}</td>
      <td className="tabular-nums">{m?.texto} · {m?.peso}</td>
      <td className="tabular-nums">{m?.radio}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Size" nota="Medidas leídas del globo dibujado. El alto es fijo; el ancho mínimo es igual al alto, así que un dígito es un círculo.">
        <Tabla encabezado={['Sample', 'Case', 'Height', 'Width', 'Padding', 'Text', 'Radius']} minimo={700}>
          <FilaMedidas rotulo="One digit" cuenta="4" />
          <FilaMedidas rotulo="Two digits" cuenta="12" />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors" nota="Tokens de cada caso, de count.tsx y src/index.css.">
        <Tabla encabezado={['Case', 'Sample', 'Fill', 'Text']} minimo={560}>
          {(Object.keys(COUNT_TONES) as (keyof typeof COUNT_TONES)[]).map((caso) => {
            const k = tokensDe(COUNT_TONES[caso])
            return (
              <tr key={caso}>
                <td className="font-semibold capitalize">{caso}</td>
                <td>{caso === 'active' ? <span className="inline-flex rounded-md bg-dash-blue p-1.5"><Count active>4</Count></span> : <Count>4</Count>}</td>
                <td><Token nombre={k.fondo} /></td>
                <td><Token nombre={k.texto} /></td>
              </tr>
            )
          })}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
