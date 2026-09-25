import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { HOUSEHOLD, MenuAcciones, PersonaCard, RELACIONES } from './Relationships'

const meta = { title: 'Pages/Parts/Relationships', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const RelationCard: Story = { render: () => <div className="w-[640px]"><PersonaCard p={RELACIONES[0]} onEdit={() => {}} onDelete={() => {}} /></div> }
export const HouseholdCard: Story = { render: () => <div className="w-[640px]"><PersonaCard p={HOUSEHOLD[0]} /></div> }
export const RowMenu: Story = { render: () => <div className="h-40"><MenuAcciones nombre="Jessica Miller" onEdit={() => {}} onDelete={() => {}} /></div> }
`})))()}export{n,i as r,r as t};