import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
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

/* Sin cargos abiertos la tabla queda vacía. */
export const Empty: Story = { args: { cargos: [] } }
`})))()}export{n,i as r,r as t};