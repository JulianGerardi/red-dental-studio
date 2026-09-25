import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { EVENTOS_INICIALES, FECHA_ANCLA } from './calendar-data'
import { VistaDia, VistaMes, VistaSemana } from './CalendarViews'

const props = { eventos: EVENTOS_INICIALES, fecha: FECHA_ANCLA, onMover: () => {}, onAbrir: () => {} }

const meta = {
  title: 'Components/Scheduling/CalendarViews',
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Week: Story = { render: () => <VistaSemana {...props} /> }
export const Day: Story = { render: () => <VistaDia {...props} /> }
export const Month: Story = { render: () => <VistaMes {...props} /> }

/* Sin turnos las tres vistas se dibujan igual, sólo con la grilla. */
export const EmptyWeek: Story = { render: () => <VistaSemana {...props} eventos={[]} /> }
export const EmptyMonth: Story = { render: () => <VistaMes {...props} eventos={[]} /> }
`})))()}export{n,i as r,r as t};