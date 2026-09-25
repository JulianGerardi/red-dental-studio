import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { STATS } from './StatStrip'
import { StatStripApilada } from './StatStrip'

const meta = { title: 'Components/Dashboard/StatStrip parts', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* La variante apilada: título arriba, monto abajo; 2×2 en angosto y cuatro columnas desde 672px. */
export const StackedVariant: Story = { render: () => <StatStripApilada stats={STATS} /> }
`})))()}export{n,i as r,r as t};