import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { DentalAssessmentExam } from './DentalAssessmentExam'

const meta = {
  title: 'Components/Clinical/DentalAssessmentExam',
  component: DentalAssessmentExam,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta<typeof DentalAssessmentExam>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Vista de tabla elegida: el botón queda presionado (aria-pressed). */
export const TableViewSelected: Story = {
  play: async (c) => {
    const { userEvent, within } = await import('storybook/test')
    const botones = await within(c.canvasElement).findAllByRole('button', { pressed: false })
    await userEvent.click(botones.find((b) => /table/i.test(b.textContent ?? b.getAttribute('aria-label') ?? '')) ?? botones[0])
  },
}
`})))()}export{n,i as r,r as t};