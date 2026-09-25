import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { makeMockExam } from '@/data/odontogram'
import { Odontogram } from './Odontogram'

const meta = {
  title: 'Components/Clinical/Odontogram',
  component: Odontogram,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
  args: { exam: makeMockExam(), selected: [], onToggle: () => {}, onSurface: () => {} },
} satisfies Meta<typeof Odontogram>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const [seleccion, setSeleccion] = useState<number[]>([])
  return (
    <Odontogram
      exam={makeMockExam()}
      selected={seleccion}
      onToggle={(n) => setSeleccion((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]))}
      onSurface={() => {}}
    />
  )
}

export const Default: Story = { render: () => <Demo /> }
`})))()}export{n,i as r,r as t};