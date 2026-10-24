import type { Meta, StoryObj } from '@storybook/react-vite'
import { Landmark, Receipt, ShieldCheck, SlidersHorizontal, UserCog } from 'lucide-react'
import { SettingsSectionCard } from './SettingsSectionCard'
import { SETTINGS_SECTIONS } from '@/data/mock'
import { SETTINGS_ICONS } from '@/pages/Settings'
import { Bloque, Forzar, Lienzo, Muestra, Muestras, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'

const meta = {
  title: 'Components/Settings/SettingsSectionCard',
  component: SettingsSectionCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'La card de una portada (`@/components/settings/SettingsSectionCard`): ícono, título y bajada, y la card entera es el link. La usan la portada de Settings y la de Billing.',
          '',
          '**detail** (2026-10-08): un dato al pie, en azul, para las portadas de una sección ("5 active schedules · Default: UCR - Red"). Sin detail se ve como antes.',
          '',
          '**Probalo:** en *Playground* cambiá título, bajada y *detail* desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { to: '/settings/accounts', icon: UserCog, title: 'Accounts', description: 'Manage your account and their access.', detail: '' },
  argTypes: {
    icon: { control: false },
    to: { control: 'text', description: 'A dónde lleva.' },
    detail: { control: 'text', description: 'Dato al pie. Vacío = sin pie.' },
  },
  decorators: [(Story) => <div className="bg-page-background rounded-xl p-6"><div className="w-[320px] max-w-full"><Story /></div></div>],
} satisfies Meta<typeof SettingsSectionCard>

export default meta
type Story = StoryObj<typeof meta>

const sinControles = { controls: { disable: true } }
const ancho = (Story: () => React.ReactNode) => <div className="bg-page-background rounded-xl p-6"><Story /></div>

export const Playground: Story = {}

export const Parts: Story = {
  parameters: sinControles,
  decorators: [ancho],
  render: () => (
    <Lienzo>
      <div className="w-[320px]"><SettingsSectionCard to="/settings/finance/carriers" icon={Landmark} title="Carriers" description="The insurance companies you bill and their plans." detail="8 carriers · 10 plans" /></div>
      <TablaPartes partes={[
        ['Icon', 'Cuadro de 44px con el ícono de la sección.', 'LucideIcon'],
        ['Title', '15px bold.', 'h2'],
        ['Description', 'Qué hay adentro, en una o dos líneas.', 'p'],
        ['Detail', 'Opcional: un dato al pie en azul, para las portadas de una sección.', 'detail'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  decorators: [ancho],
  render: () => (
    <Lienzo>
      <Muestras>
        <Muestra titulo="Default" ancho={300}><SettingsSectionCard to="#" icon={UserCog} title="Accounts" description="Manage your account and their access." /></Muestra>
        <Muestra titulo="Hover" nota="Anillo azul tenue." ancho={300}><Forzar selector="a > div" estado="hover"><SettingsSectionCard to="#" icon={UserCog} title="Accounts" description="Manage your account and their access." /></Forzar></Muestra>
        <Muestra titulo="With detail" ancho={300}><SettingsSectionCard to="#" icon={Receipt} title="Fee Schedules" description="What your office charges for each procedure." detail="5 active schedules · Default: UCR - Red" /></Muestra>
      </Muestras>
      <Bloque titulo="Settings home" nota="Una card por sección.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SETTINGS_SECTIONS.map((s) => (
            <SettingsSectionCard key={s.to} to={s.to} icon={SETTINGS_ICONS[s.icon] ?? SlidersHorizontal} title={s.title} description={s.desc} />
          ))}
        </div>
      </Bloque>
      <Bloque titulo="Billing home" nota="Las tres tablas de Billing, con detail.">
        <div className="grid gap-5 md:grid-cols-3">
          <SettingsSectionCard to="#" icon={Receipt} title="Fee Schedules" description="What your office charges for each procedure." detail="5 active schedules" />
          <SettingsSectionCard to="#" icon={Landmark} title="Carriers" description="The insurance companies you bill and their plans." detail="8 carriers · 10 plans" />
          <SettingsSectionCard to="#" icon={ShieldCheck} title="Coverage Tables" description="What each plan pays by procedure category." detail="5 active tables" />
        </div>
      </Bloque>
    </Lienzo>
  ),
}

function Medida({ sel, parte }: { sel: string; parte: string }) {
  const { ref, m } = useMedidas(sel)
  return (
    <tr>
      <td className="font-semibold">{parte}</td>
      <td className="w-[260px]"><div ref={ref}><SettingsSectionCard to="#" icon={Receipt} title="Fee Schedules" description="What your office charges." detail="5 active schedules" /></div></td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m ? `${m.texto} · ${m.peso}` : ''}</td>
      <td className="tabular-nums">{m?.padding}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: sinControles,
  decorators: [ancho],
  render: () => (
    <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas de la card dibujada.">
        <Tabla encabezado={['Part', 'Sample', 'Height', 'Text', 'Padding']} minimo={640}>
          <Medida sel="a > div" parte="Card" />
          <Medida sel="h2" parte="Title" />
          <Medida sel="p:last-child" parte="Detail" />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={420}>
          <tr><td className="font-semibold">Card</td><td><Token nombre="card" /> · <code>shadow-panel</code></td></tr>
          <tr><td className="font-semibold">Icon box</td><td><Token nombre="accent" /> · icon <Token nombre="primary" /></td></tr>
          <tr><td className="font-semibold">Description</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Detail</td><td><Token nombre="dash-blue" /> · 12px semibold</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
