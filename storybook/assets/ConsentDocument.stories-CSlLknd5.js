import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { User } from 'lucide-react'
import { Campo, ConsentDocument } from './ConsentDocument'

const meta = {
  title: 'Components/Settings/ConsentDocument',
  component: ConsentDocument,
  parameters: { layout: 'padded' },
  args: {
    titulo: 'Extraction Informed Consent',
    procedimiento: 'Removal of impacted tooth',
    naturaleza: 'The proposed treatment has been explained to me in a way that I understood, including what will be done and why it is recommended.',
    riesgos: 'Pain, swelling, bleeding, or bruising.\\nInfection or delayed healing.\\nReaction to medications or anesthesia.',
    vistaPaciente: false,
  },
  decorators: [(Story) => <div className="w-[520px] rounded-xl border border-line bg-surface-alt p-3"><Story /></div>],
} satisfies Meta<typeof ConsentDocument>

export default meta
type Story = StoryObj<typeof meta>

export const ClinicView: Story = {}
export const PatientView: Story = { args: { vistaPaciente: true } }
export const Empty: Story = { args: { titulo: '', procedimiento: undefined, naturaleza: '', riesgos: '' } }

/* Casilla del recuadro de datos: rótulo con ícono arriba, valor abajo. */
export const DataCell: Story = {
  render: () => <div className="w-[220px] border border-line"><Campo icono={User} etiqueta="Patient"><p className="font-bold">Sarah Stone</p><p className="text-ink-muted">DOB: 04/02/1991</p></Campo></div>,
}
`})))()}export{n,i as r,r as t};