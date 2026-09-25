import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { PanelAgenda, PanelLedger, PanelOdontograma } from './Login'

const meta = { title: 'Pages/Parts/Login', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Los tres widgets animados del panel de la derecha del login. */
export const AgendaWidget: Story = { render: () => <div className="w-[360px]"><PanelAgenda /></div> }
export const LedgerWidget: Story = { render: () => <div className="w-[360px]"><PanelLedger /></div> }
export const OdontogramWidget: Story = { render: () => <div className="w-[360px]"><PanelOdontograma /></div> }
`})))()}export{n,i as r,r as t};