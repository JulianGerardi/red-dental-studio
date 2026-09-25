import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { MOVIMIENTOS } from '@/data/ledger'
import { CreditAdjustmentPanel } from './CreditAdjustmentPanel'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Ledger/CreditAdjustmentPanel',
  component: CreditAdjustmentPanel,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
  args: { cargos: MOVIMIENTOS.filter((m) => m.tipo === 'Charge'), onCancelar: () => {}, onGuardar: () => {} },
} satisfies Meta<typeof CreditAdjustmentPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Estado de error: Save con los campos obligatorios vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)),
}
`})))()}export{n,i as r,r as t};