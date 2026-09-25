import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { MOVIMIENTOS } from '@/data/ledger'
import { BotonExpandirTodo, LedgerRowDetail } from './LedgerRowDetail'

const CON_CREDITO = MOVIMIENTOS.find((m) => (m.creditoDisponible ?? 0) > 0) ?? MOVIMIENTOS[0]

const meta = {
  title: 'Components/Ledger/LedgerRowDetail',
  component: LedgerRowDetail,
  parameters: { layout: 'padded' },
  args: { m: MOVIMIENTOS[0], onVerTodo: () => {} },
  decorators: [(Story) => <div className="w-[760px]"><Story /></div>],
} satisfies Meta<typeof LedgerRowDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithAvailableCredit: Story = { args: { m: CON_CREDITO, onAplicarCredito: () => {} } }

export const ExpandAll: Story = {
  render: () => (
    <div className="flex gap-3">
      <BotonExpandirTodo todasAbiertas={false} hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
      <BotonExpandirTodo todasAbiertas hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
    </div>
  ),
}
`})))()}export{n,i as r,r as t};