import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { ManijaResize, useAnchoColumnas } from './useAnchoColumnas'

const BASE = { fecha: 120, descripcion: 260, monto: 110 }

const meta = {
  title: 'Components/Ledger/Column resize handle',
  parameters: { layout: 'padded', docs: { description: { component: 'Manija para ajustar el ancho de una columna arrastrando. \`useAnchoColumnas\` guarda los anchos y \`ManijaResize\` dibuja el agarre.' } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const anchos = useAnchoColumnas<keyof typeof BASE>(BASE)
  return (
    <div className="flex w-[520px] border border-line">
      {(Object.keys(BASE) as (keyof typeof BASE)[]).map((id, i) => (
        <div key={id} className="relative px-3 py-2 text-[12px] font-semibold" style={{ width: anchos.ancho(id) }}>
          {id}
          <ManijaResize id={id} label={id} estado={anchos} indice={i} />
        </div>
      ))}
    </div>
  )
}

export const Default: Story = { render: () => <Demo /> }
`})))()}export{r as n,n as r,i as t};