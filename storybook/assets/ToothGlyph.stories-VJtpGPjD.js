import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { OcclusalView, ToothGlyph } from './ToothGlyph'

const meta = {
  title: 'Components/Clinical/Dental/ToothGlyph',
  component: ToothGlyph,
  args: { numero: 14, tinte: '#ffffff', ausente: false, flip: false },
} satisfies Meta<typeof ToothGlyph>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Missing: Story = { args: { ausente: true } }
export const WithOpenFinding: Story = { args: { tinte: '#fecaca' } }
export const Occlusal: Story = {
  render: () => <OcclusalView numero={14} surfaces={[null, null, null, 'caries', null, null, null]} ausente={false} seleccionado={false} flip={false} onSurface={() => {}} />,
}
`})))()}export{n,i as r,r as t};