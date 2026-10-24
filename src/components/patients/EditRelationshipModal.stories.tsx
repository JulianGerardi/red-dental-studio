import type { Meta, StoryObj } from '@storybook/react-vite'
import { EditRelationshipModal } from './EditRelationshipModal'
import { esperar, pulsar, pulsarRol, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Patients/EditRelationshipModal',
  component: EditRelationshipModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 620 },
      description: {
        component: [
          'Cambiar cómo se relaciona una persona con el paciente: sus roles (Guardian y/o Guarantor) y el vínculo. Abre con lo que la relación ya tiene.',
          '',
          '**Quitar Guardian revoca acceso** (CON-3958, 2026-10-22): si se destilda Guardian y se guarda, antes aparece *Remove Guardian access* —"[Persona] will no longer have guardian access to [Paciente]"— y, si era su último vínculo de guardián, que se le desactiva el usuario de este consultorio. Cancel vuelve al formulario; Remove Guardian guarda.',
          '',
          '**Probalo:** en *Playground* destildá Guardian y apretá Save.',
        ].join('\n'),
      },
    },
  },
  args: {
    persona: { name: 'Michael Miller', initials: 'MM', dob: 'May 14, 1982', email: 'mm.thompson@yahoo.com' },
    paciente: 'John Smith', inicial: { guardian: true, guarantor: false, rel: 'Parent' }, ultimaDeGuardian: true, onClose: () => {},
  },
} satisfies Meta<typeof EditRelationshipModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Estado de error: Save sin vínculo ni rol. */
export const WithValidationErrors: Story = {
  args: { inicial: { guardian: false, guarantor: false, rel: '' } },
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)),
}

/* Guardian destildado y Save: pide confirmar antes de revocar el acceso. */
export const RemoveGuardianConfirm: Story = {
  name: 'Remove Guardian access',
  args: { inicial: { guardian: true, guarantor: true, rel: 'Parent' } },
  play: secuencia(pulsarRol('checkbox', /^Guardian$/), pulsar(/^save$/i), esperar(/will no longer have guardian access/i)),
}
