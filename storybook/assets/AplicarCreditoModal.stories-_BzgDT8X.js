import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { MOVIMIENTOS } from '@/data/ledger'
import { AplicarCreditoModal } from './AplicarCreditoModal'

const CREDITO = MOVIMIENTOS.find((m) => (m.creditoDisponible ?? 0) > 0) ?? MOVIMIENTOS[0]

const meta = {
  title: 'Components/Ledger/AplicarCreditoModal',
  component: AplicarCreditoModal,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { m: CREDITO, cargos: MOVIMIENTOS.filter((m) => m.tipo === 'Charge'), onClose: () => {}, onAplicar: () => {} },
} satisfies Meta<typeof AplicarCreditoModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* "Apply credit" queda deshabilitado hasta que se aplica un monto a algún
   cargo, y el campo de monto de cada fila también hasta que se la marca. */
export const ApplyDisabledUntilAmount: Story = {}

/* Sin cargos abiertos: el modal lo dice y no hay nada que aplicar. */
export const NoOpenCharges: Story = { args: { cargos: [] } }
`})))()}export{n,i as r,r as t};