import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { InfoTip } from './info-tip'
import { Bloque, Forzar, Lienzo, Tabla, Token, useMedidas } from '@/design-system/kit'
import { TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* Playground, Parts, States y Specs del círculo de info de las cards (billing.md, 2026-10-09). */

type Args = { title: string; text: string; open: boolean }

const meta = {
  title: 'Components/UI/InfoTip',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El **círculo de info** (`@/components/ui/info-tip`) va arriba a la derecha de una card con un número y explica **qué cuenta** ese número: los cinco de Billing y los de Today. Es un `HoverCard` (card blanca con título y texto), no un `Tooltip`: el Tooltip oscuro es sólo para nombrar.',
          '',
          '**Cómo se abre:** con el mouse al pasar; con el dedo al tocar; con el teclado al llegar con Tab. Escape o tocar afuera lo cierra. Gris como la etiqueta de la card y azul mientras está abierto.',
          '',
          '**Probalo:** en *Playground* cambiá título y texto desde *Controls*, o pasá el mouse por el círculo.',
        ].join('\n'),
      },
    },
  },
  args: { title: 'Total A/R', text: "Sum of the remaining total balance of the location's open charges.", open: true },
  argTypes: {
    title: { control: 'text', description: 'Igual que la etiqueta de la card.' },
    text: { control: 'text', description: 'Qué cuenta el número, en una o dos líneas.' },
    open: { control: 'boolean', description: 'Arranca abierto. Apagado: se abre al pasar el mouse.' },
  },
  decorators: [(Story) => <div className="bg-page-background rounded-xl p-6 pb-28"><Story /></div>],
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* Una card con número, como las de Billing, con el círculo arriba a la derecha. */
function Card({ title, text, abierto, children }: { title: string; text: string; abierto?: boolean; children?: ReactNode }) {
  return (
    <div className={cn(TARJETA_PANEL, 'w-[248px] p-4')}>
      <div className="flex items-start justify-between gap-2">
        <p className="truncate text-xs text-ink-muted">{title}</p>
        {children ?? <InfoTip title={title} abierto={abierto}>{text}</InfoTip>}
      </div>
      <p className="text-dash-blue mt-1 text-xl font-bold">$2,131.86</p>
      <p className="mt-0.5 truncate text-[11px] text-ink-faint">Across patient and insurance balances</p>
    </div>
  )
}

export const Playground: Story = {
  render: (a) => <Card key={`${a.open}-${a.title}-${a.text}`} title={a.title} text={a.text} abierto={a.open} />,
}

/* ── Parts ─────────────────────────────────────────────────────────── */

const PARTES: [string, string][] = [
  ['Trigger', 'El círculo de info (Info de lucide, 16px) en un área de 24px. Gris (ink-muted) como la etiqueta; azul con hover, foco o abierto.'],
  ['Card', 'HoverCard de 256px, blanca con sombra, abajo y alineada al borde derecho del círculo. Si no entra abajo, abre arriba.'],
  ['Title', 'El nombre del número, igual que la etiqueta de la card. 13px Semibold.'],
  ['Text', 'Qué cuenta, en una o dos líneas. 12px, ink-muted.'],
]

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-24">
      <Card title="Total A/R" text="Sum of the remaining total balance of the location's open charges." abierto />
      <Tabla encabezado={['Part', 'What it does']} minimo={560} arriba>
        {PARTES.map(([parte, que]) => <tr key={parte}><td className="font-semibold whitespace-nowrap">{parte}</td><td className="text-ink-medium">{que}</td></tr>)}
      </Tabla>
    </div>
  ),
}

/* ── States ────────────────────────────────────────────────────────── */

function Estado({ titulo, nota, children }: { titulo: string; nota: string; children: ReactNode }) {
  return (
    <figure className="m-0 flex w-[248px] flex-col gap-2">
      <figcaption className="flex flex-col gap-0.5">
        <span className="text-[12.5px] font-semibold text-ink">{titulo}</span>
        <span className="text-[11.5px] leading-snug text-ink-muted">{nota}</span>
      </figcaption>
      {children}
    </figure>
  )
}

const TEXTO = "Sum of the remaining guarantor balance of the location's open charges."

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-start gap-x-6 gap-y-36">
      <Estado titulo="Default" nota="Gris, como la etiqueta: hay algo más, sin competir con el número."><Card title="Guarantor A/R" text={TEXTO} /></Estado>
      <Estado titulo="Hover" nota="Azul al pasar el mouse; la card se abre a los 120ms.">
        <Card title="Guarantor A/R" text={TEXTO}><Forzar selector="button" estado="hover"><InfoTip title="Guarantor A/R">{TEXTO}</InfoTip></Forzar></Card>
      </Estado>
      <Estado titulo="Focus" nota="Con el teclado: anillo azul. Enter no hace falta: llegar con Tab ya lo abre.">
        <Card title="Guarantor A/R" text={TEXTO}><Forzar selector="button" estado="focus-visible"><InfoTip title="Guarantor A/R">{TEXTO}</InfoTip></Forzar></Card>
      </Estado>
      <Estado titulo="Open" nota="La card con el título y el texto, abajo y a la derecha. En el celular se abre y se cierra tocando."><Card title="Overdue Balance" text="Open charge balances older than 30 days." abierto /></Estado>
      <Estado titulo="Two lines" nota="El texto más largo de Billing: entra en dos líneas en 256px."><Card title="Guarantors with Open Charges" text="Ledgers whose charges at this location still carry a positive guarantor balance." abierto /></Estado>
    </div>
  ),
}

/* ── Specs ─────────────────────────────────────────────────────────── */

function Medida({ nombre, selector, children }: { nombre: string; selector: string; children: ReactNode }) {
  const { ref, m } = useMedidas(selector)
  return (
    <tr>
      <td className="font-semibold">{nombre}</td>
      <td><div ref={ref}>{children}</div></td>
      <td className="tabular-nums">{m ? `${m.ancho} × ${m.alto}` : ''}</td>
      <td className="tabular-nums">{m?.icono}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas del círculo dibujado.">
        <Tabla encabezado={['Part', 'Sample', 'Size', 'Icon']} minimo={560}>
          <Medida nombre="Trigger" selector="button"><InfoTip title="Total A/R">Sum of the remaining total balance of the location&apos;s open charges.</InfoTip></Medida>
        </Tabla>
        <Tabla encabezado={['Part', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Card</td><td>256px wide, 12px padding, radius 8px, below and aligned to the right edge</td></tr>
          <tr><td className="font-semibold">Title</td><td>13px Semibold · <Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Text</td><td>12px, line height 1.375 · <Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Delay</td><td className="tabular-nums">opens after 120ms, closes after 80ms</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['State', 'Token']} minimo={480}>
          <tr><td className="font-semibold">Default</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Hover, focus, open</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Focus ring</td><td><Token nombre="dash-ring" /></td></tr>
          <tr><td className="font-semibold">Card</td><td><Token nombre="white" /> · shadow-md and a faint ring (the HoverCard of the design system)</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Only on a card with a number, top right, to explain what that number counts. Not for naming an icon: that is a Tooltip.</li>
          <li>The title repeats the card label; the text says what is counted in one or two lines, from the user’s side.</li>
          <li>Opens on hover, tap or keyboard focus; Escape or tapping outside closes it. Screen readers read the title and the text from the button.</li>
          <li>Every number in the same row has one, or none does.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
