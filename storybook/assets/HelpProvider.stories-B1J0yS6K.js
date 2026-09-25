import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { HelpProvider, useHelp } from './HelpProvider'
import { TOPICS } from './topics'

function Botones() {
  const { showOnScreen, confibotAbierto, toggleConfibot } = useHelp()
  return (
    <div className="flex flex-wrap gap-2">
      <button className="rounded-md border border-line px-3 py-1.5 text-[13px]" onClick={toggleConfibot}>
        Confibot: {confibotAbierto ? 'open' : 'closed'}
      </button>
      <button className="rounded-md border border-line px-3 py-1.5 text-[13px]" onClick={() => showOnScreen(TOPICS[0].id)}>
        Show “{TOPICS[0].title}” on screen
      </button>
    </div>
  )
}

const meta = {
  title: 'Components/Help/HelpProvider',
  component: HelpProvider,
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'Contexto de Help: \`useHelp()\` da \`showOnScreen(topicId)\` y el estado del Confibot. Vive en la raíz de la app.' } },
  },
  args: { children: null },
} satisfies Meta<typeof HelpProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HelpProvider>
      <Botones />
    </HelpProvider>
  ),
}
`})))()}export{n,i as r,r as t};