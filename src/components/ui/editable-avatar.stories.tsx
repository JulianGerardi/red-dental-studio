import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { EditableAvatar } from './editable-avatar'
import { AVATAR_SIZES, type AvatarSize } from './avatar'
import { Bloque, ConRotulo, Forzar, Lienzo, Muestras, Tabla, TablaPartes, Token } from '@/design-system/kit'

const FOTO = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#1a4da9"/><circle cx="32" cy="26" r="11" fill="#fff" opacity=".9"/><path d="M12 60c3-12 12-18 20-18s17 6 20 18" fill="#fff" opacity=".9"/></svg>')}`

const meta = {
  title: 'Components/UI/EditableAvatar',
  component: EditableAvatar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El avatar de *Elements / Avatars* con la foto editable: en la ficha de un empleado (56), en el panel del paciente (62) y, en celeste y sin iniciales, el logo de la cuenta (44). Misma forma y color que cualquier otro avatar.',
          '',
          '**Probalo:** en *Playground* pasá el mouse o llegá con Tab y elegí una imagen; cambiá el tamaño desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { foto: null, iniciales: 'EM', label: 'Elena Martinez', size: 56, onChange: () => {} },
  argTypes: {
    iniciales: { control: 'text', description: 'Lo que se ve sin foto.' },
    label: { control: 'text', description: 'Nombre para el aria-label del botón: "Change photo for …".' },
    size: { control: 'inline-radio', options: Object.keys(AVATAR_SIZES).map(Number), description: 'De la escala del Avatar.' },
    foto: { table: { disable: true } },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof EditableAvatar>

export default meta
type Story = StoryObj<typeof meta>

function Demo(args: React.ComponentProps<typeof EditableAvatar>) {
  const [foto, setFoto] = useState<string | null>(args.foto)
  return <EditableAvatar {...args} foto={foto} onChange={setFoto} />
}

export const Playground: Story = { render: (args) => <Demo {...args} /> }

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Avatar', 'Las iniciales o la foto, con la forma y el color de todos los avatares.', 'Avatar'],
          ['Botón', 'Cubre el avatar entero; invisible en reposo para no tapar la foto. Con hover o foco, velo oscuro y lápiz.', 'button'],
          ['Archivo', 'Input oculto que abre el selector del sistema; la imagen queda en localStorage (usePhoto).', 'input[type=file]'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

const muestra = (size: AvatarSize, foto: string | null, extra?: string) => (
  <EditableAvatar foto={foto} iniciales="EM" label="Elena Martinez" size={size} className={extra} onChange={() => {}} />
)

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <Muestras>
          <ConRotulo rotulo="Rest · initials">{muestra(56, null)}</ConRotulo>
          <ConRotulo rotulo="Rest · photo">{muestra(56, FOTO)}</ConRotulo>
          <ConRotulo rotulo="Hover"><Forzar selector="button" estado="hover" className="flex">{muestra(56, FOTO)}</Forzar></ConRotulo>
          <ConRotulo rotulo="Focus"><Forzar selector="button" estado="focus-visible" className="flex">{muestra(56, null)}</Forzar></ConRotulo>
          <ConRotulo rotulo="Patient panel · 62">{muestra(62, null)}</ConRotulo>
          <ConRotulo rotulo="Account logo · empty">
            <EditableAvatar foto={null} iniciales="" label="Account logo" size={44} className="bg-dash-count-bg" onChange={() => {}} />
          </ConRotulo>
        </Muestras>
      </Bloque>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Tamaños</td><td>56 empleado · 62 paciente · 44 logo de la cuenta (los del Avatar)</td></tr>
          <tr><td className="font-semibold">Lápiz</td><td className="tabular-nums">16px, centrado</td></tr>
          <tr><td className="font-semibold">Foco</td><td className="tabular-nums">anillo de 2px a 2px del avatar</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Velo y lápiz</td><td>black 45% · <Token nombre="white" /></td></tr>
          <tr><td className="font-semibold">Anillo de foco</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Logo vacío</td><td><Token nombre="dash-count-bg" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
