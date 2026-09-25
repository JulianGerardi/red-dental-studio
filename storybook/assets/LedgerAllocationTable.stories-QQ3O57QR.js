import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { MOVIMIENTOS } from '@/data/ledger'
import { LedgerAllocationTable } from './LedgerAllocationTable'

const meta = {
  title: 'Components/Ledger/LedgerAllocationTable',
  component: LedgerAllocationTable,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
  args: { cargos: MOVIMIENTOS.filter((m) => m.tipo === 'Charge') },
} satisfies Meta<typeof LedgerAllocationTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
`})))()}n();export{t as default};