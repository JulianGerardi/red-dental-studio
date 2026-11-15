import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConRotulo, Muestras } from '@/design-system/kit'
import { CountryFlag } from './country-flag'

/* La bandera de un país, decorativa: el código o el nombre van al lado en texto (patients.md, 2026-11-04). */
const meta = {
  title: 'Components/UI/CountryFlag',
  component: CountryFlag,
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'La bandera que acompaña al Country Code de un teléfono y al país de una dirección. Es decorativa (`alt=""`): el nombre va siempre en texto al lado. Sin país conocido no dibuja nada.\n\n**Probalo:** escribí en *Controls* la opción tal como la muestra el campo ("(+54) Argentina") o un valor viejo ("+1").' } },
  },
  args: { opcion: '(+1) United States' },
  argTypes: { opcion: { control: 'text', description: 'La opción del campo: "(+54) Argentina", "United States"…' } },
} satisfies Meta<typeof CountryFlag>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Countries: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Muestras>
      {['(+1) United States', '(+54) Argentina', '(+52) Mexico', '(+34) Spain', '(+55) Brazil'].map((o) => (
        <ConRotulo key={o} rotulo={o}><CountryFlag opcion={o} /></ConRotulo>
      ))}
    </Muestras>
  ),
}

/* Estado vacío: un valor que no es un país no dibuja nada. */
export const UnknownCountry: Story = { args: { opcion: 'Atlantis' }, render: (args) => <span className="text-[13px] text-ink-muted">[<CountryFlag {...args} />] no flag for an unknown country</span> }
