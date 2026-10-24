import type { Meta, StoryObj } from '@storybook/react-vite'
import { SectionNotice } from './section-notice'
import { Bloque, Lienzo, Tabla, Token, TablaPartes } from '@/design-system/kit'
import { tokensDe } from '@/design-system/medir'

const meta = {
  title: 'Elements/Section notice',
  component: SectionNotice,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El aviso de una sección de formulario (`@/components/ui/section-notice`): una franja cálida con barra a la izquierda y un texto corto. Va arriba de los campos y explica para qué sirve la sección, por ejemplo *Optional section. Use this section when a guardian needs to be associated with the patient…* en el paso Guardian de New Patient y Edit Patient (Figma 5277:125202).',
          '',
          '**No es un Alert:** `Alert` avisa de algo que pasó o que hay que atender (ícono, título, color por estado); éste sólo acompaña a la sección, sin ícono ni título. Si lo que dice es un error o un bloqueo, va `Alert`.',
          '',
          '**Probalo:** en *Playground* cambiá el texto desde *Controls*; con dos renglones se ve cómo parte.',
        ].join('\n'),
      },
    },
  },
  args: { children: 'Optional section. Use this section when a guardian needs to be associated with the patient. It is available in both creation and editing.' },
  argTypes: {
    children: { control: 'text', description: 'El texto del aviso, una o dos oraciones.' },
    className: { table: { disable: true } },
  },
  decorators: [(Story) => <div className="w-[480px] max-w-full"><Story /></div>],
} satisfies Meta<typeof SectionNotice>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  decorators: [(Story) => <div className="w-[720px] max-w-full"><Story /></div>],
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes
          partes={[
            ['Bar', 'Barra de 3px a la izquierda, en el color del texto: es lo que lo separa de un campo.', 'SectionNotice'],
            ['Text', '11px en negrita, hasta dos oraciones. Sin ícono ni título.', 'SectionNotice'],
          ]}
        />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States" nota="Una oración o dos: siempre del ancho de la columna de campos, y el texto parte en renglones sin cortar la barra.">
        <div className="flex w-[480px] max-w-full flex-col gap-4">
          <SectionNotice>Additional contact and address information. These fields are optional.</SectionNotice>
          <SectionNotice>Optional section. Use this section when a guardian needs to be associated with the patient. It is available in both creation and editing.</SectionNotice>
        </div>
      </Bloque>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const k = tokensDe('border-l-[3px] border-attn-fg bg-warn-bg text-attn-fg')
    return (
      <Lienzo>
        <Bloque titulo="Colors" nota="Tokens de section-notice.tsx y src/index.css.">
          <Tabla encabezado={['Part', 'Token']} minimo={420}>
            <tr><td className="font-semibold">Fill</td><td><Token nombre={k.fondo} /></td></tr>
            <tr><td className="font-semibold">Bar</td><td><Token nombre={k.borde} /></td></tr>
            <tr><td className="font-semibold">Text</td><td><Token nombre={k.texto} /></td></tr>
          </Tabla>
        </Bloque>
        <Bloque titulo="Sizes" nota="Padding 16px a los costados y 12px arriba y abajo; texto de 11px con interlineado 1,5; esquinas redondeadas sólo a la derecha (la izquierda es la barra).">
          <SectionNotice className="w-[320px]">Optional section.</SectionNotice>
        </Bloque>
      </Lienzo>
    )
  },
}
