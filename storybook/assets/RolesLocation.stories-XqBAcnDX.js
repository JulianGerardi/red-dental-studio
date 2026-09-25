import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { AssignRoleModal, RolesLocation } from './RolesLocation'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { userEvent, within } from 'storybook/test'

const meta = {
  title: 'Components/Settings/RolesLocation',
  component: RolesLocation,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RolesLocation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const AssignRole: Story = {
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  render: () => <AssignRoleModal onGuardar={() => {}} onClose={() => {}} />,
}

/* Estado de error: Save sin elegir rol ni sedes. */
export const AssignRoleWithErrors: Story = { ...AssignRole, play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)) }

/* Sin roles: estado vacío con la acción "Add Role". Se llega quitando los tres. */
export const Empty: Story = {
  render: () => <RolesLocation />,
  play: async (c) => {
    const cuerpo = within(c.canvasElement.ownerDocument.body)
    for (const rol of ['Administrator', 'Dentist', 'Receptionist']) {
      await userEvent.click(await cuerpo.findByRole('button', { name: \`Remove \${rol}\` }))
    }
    await esperar(/no roles assigned/i)(c)
  },
}

/* Rol abierto: muestra sus sedes con los interruptores encendidos. */
export const RoleExpandedSelected: Story = { render: () => <RolesLocation /> }
`})))()}export{n,i as r,r as t};