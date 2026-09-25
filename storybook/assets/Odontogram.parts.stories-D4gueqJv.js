import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { makeMockExam } from '@/data/odontogram'
import { Arch, ToothCell } from './Odontogram'

const exam = makeMockExam()

const meta = {
  title: 'Components/Clinical/Odontogram parts',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Una pieza: normal, elegida y con marca de problema o de finding cerrado. */
export const Tooth: Story = {
  render: () => (
    <div className="flex gap-3">
      <ToothCell tooth={exam.teeth[2]} selected={false} onToggle={() => {}} onSurface={() => {}} problema={false} finding={false} flip={false} />
      <ToothCell tooth={exam.teeth[2]} selected onToggle={() => {}} onSurface={() => {}} problema={false} finding={false} flip={false} />
      <ToothCell tooth={exam.teeth[2]} selected={false} onToggle={() => {}} onSurface={() => {}} problema finding={false} flip={false} />
      <ToothCell tooth={exam.teeth[2]} selected={false} onToggle={() => {}} onSurface={() => {}} problema={false} finding flip={false} />
    </div>
  ),
}

/* Media arcada: las piezas de un lado, con la corona hacia arriba o abajo. */
export const HalfArch: Story = {
  render: () => (
    <Arch exam={exam} numbers={[1, 2, 3, 4, 5, 6, 7, 8]} flip={false} selected={[3]} onToggle={() => {}} onSurface={() => {}} findings={[]} left="UR" center="" right="" />
  ),
}
`})))()}export{n,i as r,r as t};