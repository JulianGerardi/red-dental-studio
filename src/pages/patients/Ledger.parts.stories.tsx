import type { Meta, StoryObj } from '@storybook/react-vite'
import { MOVIMIENTOS } from '@/data/ledger'
import { AccionesFila, Household } from './Ledger'

/* Las piezas del Ledger del paciente que no son la pantalla entera. Decisiones en
   design-reference/figma/modulos/ledger.md (2026-11-12, CON-3753, CON-3755, CON-4076). */
const meta = {
  title: 'Pages/Parts/Ledger',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'pages/patients/Ledger.tsx',
      jira: ['CON-3732', 'CON-3753', 'CON-3755', 'CON-4076'],
      description: {
        component: 'Dos piezas del Ledger (`@/pages/patients/Ledger`). **Household** aparece en *Guarantor View*: quiénes comparten la cuenta, con el garante primero (CON-4076). **Row actions** es el ⋮ de una fila: *Apply credit* si el pago dejó crédito sin aplicar y *Estimation details* si el cargo viene de un caso (CON-3753, CON-3755); sin ninguna de las dos, la fila no lleva menú.\n\n**Probalo:** abrí el ⋮ de cada ejemplo. La pantalla completa está en [Pages / Patient ledger](/docs/pages--docs).',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>
const nada = () => {}

export const HouseholdCard: Story = { render: () => <div className="max-w-[900px]"><Household /></div> }

/* Un cargo con caso: el menú lleva a su estimación en Clinical Mode. */
const conMenu = MOVIMIENTOS.filter((m) => m.tipo === 'Charge')
export const RowActionsCharge: Story = {
  render: () => (
    <div className="flex h-40 flex-col items-start gap-2">
      {conMenu.slice(0, 3).map((m) => (
        <span key={m.id} className="flex items-center gap-2 text-[13px] text-ink"><AccionesFila m={m} onAplicar={nada} onAbrirCaso={nada} onOpenChange={nada} /> {m.descripcion}</span>
      ))}
    </div>
  ),
}

/* Un pago: con crédito sin aplicar ofrece Apply credit; si no, no hay menú (estado vacío de la celda). */
const pagos = MOVIMIENTOS.filter((m) => m.tipo === 'Payment')
export const RowActionsPayment: Story = {
  render: () => (
    <div className="flex h-40 flex-col items-start gap-2">
      {pagos.slice(0, 3).map((m) => (
        <span key={m.id} className="flex items-center gap-2 text-[13px] text-ink"><AccionesFila m={m} onAplicar={nada} onAbrirCaso={nada} onOpenChange={nada} /> {m.descripcion}</span>
      ))}
    </div>
  ),
}
