import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarFallback } from './avatar'

const meta = {
  title: 'Components/UI/Avatar',
  component: Avatar,
  parameters: { docs: { description: { component: 'El círculo con las iniciales o la foto de una persona. **Probalo** en *Playground*: iniciales, tamaño, color (paciente o equipo) y foto.' } } },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

const FOTO = \`data:image/svg+xml;utf8,\${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c7d9fb"/><stop offset="1" stop-color="#1a4da9"/></linearGradient></defs><rect width="64" height="64" fill="url(#g)"/><circle cx="32" cy="26" r="11" fill="#fff" opacity=".9"/><path d="M12 60c3-12 12-18 20-18s17 6 20 18" fill="#fff" opacity=".9"/></svg>')}\`
const TONOS = {
  patient: 'bg-dash-blue-hover text-white',
  team: 'bg-dash-count-bg text-dash-blue-hover',
  primary: '',
} as const
type AvatarArgs = { initials: string; size: number; tone: keyof typeof TONOS; photo: boolean }

/* Cambiá iniciales, tamaño, color y foto desde Controls. */
export const Playground: StoryObj<AvatarArgs> = {
  args: { initials: 'SS', size: 32, tone: 'patient', photo: false },
  argTypes: {
    initials: { control: 'text', description: 'Una o dos letras.' },
    size: { control: 'inline-radio', options: [16, 24, 32, 36, 40, 56, 62], description: '32 en tablas y listas · 62 en el panel del paciente · 16-24 en chips.' },
    tone: { control: 'inline-radio', options: Object.keys(TONOS), description: 'patient: azul oscuro (pacientes) · team: celeste (equipo y providers) · primary: el del componente base.' },
    photo: { control: 'boolean', description: 'Con foto, las iniciales no se ven.' },
  },
  render: ({ initials, size, tone, photo }) => (
    <Avatar style={{ width: size, height: size }}>
      {photo ? <img src={FOTO} alt={initials} className="size-full object-cover" /> : (
        <AvatarFallback className={\`font-semibold \${TONOS[tone]}\`} style={{ fontSize: Math.max(7, Math.round(size / 2.8)) }}>{initials.slice(0, 2).toUpperCase()}</AvatarFallback>
      )}
    </Avatar>
  ),
}

export const Initials: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {[24, 32, 40, 56].map((s) => (
        <Avatar key={s} style={{ width: s, height: s }}>
          <AvatarFallback style={{ fontSize: s / 2.6 }}>SS</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}
`})))()}export{n,i as r,r as t};