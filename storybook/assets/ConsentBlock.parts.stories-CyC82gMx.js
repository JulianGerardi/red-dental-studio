import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { CONSENTIMIENTO } from '@/data/treatment-plan'
import { FilaFirma, PanelHistorial } from './ConsentBlock'

const meta = {
  title: 'Components/Clinical/ConsentBlock parts',
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 420 } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Una fila de firma: con su estado (pendiente o firmada) y la fecha. */
export const SignatureRows: Story = {
  render: () => (
    <div className="flex w-[360px] flex-col gap-2">
      {CONSENTIMIENTO.firmas.map((f) => <FilaFirma key={f.rol} f={f} />)}
      <FilaFirma f={{ ...CONSENTIMIENTO.firmas[0], estado: 'Signed', fecha: '05/14/2026' }} />
    </div>
  ),
}

export const HistoryPanel: Story = { parameters: { layout: 'fullscreen' }, render: () => <PanelHistorial onClose={() => {}} /> }
`})))()}export{n,i as r,r as t};