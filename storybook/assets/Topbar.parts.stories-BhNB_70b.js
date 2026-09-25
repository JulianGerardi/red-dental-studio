import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { NOTIFICACIONES } from '@/data/notificaciones'
import { Campana, GlobalSearch, MenuCuenta } from './Topbar'

const meta = { title: 'Components/Layout/Topbar parts', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AccountMenu: Story = { render: () => <div className="h-72 w-[260px]"><MenuCuenta /></div> }
export const Bell: Story = { render: () => <div className="h-72"><Campana items={NOTIFICACIONES} ocultas={[]} /></div> }
export const BellWithHidden: Story = { render: () => <div className="h-72"><Campana items={NOTIFICACIONES} ocultas={[NOTIFICACIONES[0].id]} onVolverAlBanner={() => {}} /></div> }
export const BellEmpty: Story = { render: () => <div className="h-40"><Campana items={[]} ocultas={[]} /></div> }
export const Search: Story = { render: () => <div className="w-[320px]"><GlobalSearch showCommandHint /></div> }
export const SearchWithoutHint: Story = { render: () => <div className="w-[320px]"><GlobalSearch showCommandHint={false} /></div> }
`})))()}export{n,i as r,r as t};