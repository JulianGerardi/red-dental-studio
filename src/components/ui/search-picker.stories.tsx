import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, Muestra, TablaPartes } from '@/design-system/kit'
import { SearchPicker } from './search-picker'

/* Playground, Parts y States del buscador con resultados en cards. Decisiones en clinical-mode.md (New Procedure,
   2026-10-20) e insurance.md (2026-11-10). */

type Carrier = { id: string; nombre: string; payer: string }
const CARRIERS: Carrier[] = [
  { id: 'aetna', nombre: 'Aetna Dental Plans', payer: '60054' },
  { id: 'cigna', nombre: 'Cigna Dental', payer: '62308' },
  { id: 'delta', nombre: 'Delta Dental of California', payer: '94276' },
  { id: 'metlife', nombre: 'MetLife Tricare', payer: '65978' },
]
const Opcion = ({ c }: { c: Carrier }) => (
  <span className="flex min-w-0 flex-col">
    <span className="truncate text-[13px] font-medium text-ink">{c.nombre}</span>
    <span className="text-[11px] text-ink-muted">Payer ID {c.payer}</span>
  </span>
)

type Args = { multiple: boolean; accion: 'agregar' | 'vincular'; placeholder: string; emptyText: string }

function Demo({ multiple, accion, placeholder, emptyText, inicial = [] }: Args & { inicial?: Carrier[] }) {
  const [elegidos, setElegidos] = useState<Carrier[]>(inicial)
  return (
    <div className="h-[320px] w-[420px] max-w-full">
      <SearchPicker
        items={CARRIERS} getId={(c) => c.id} getText={(c) => `${c.nombre} ${c.payer}`} renderOption={(c) => <Opcion c={c} />}
        selected={elegidos} onSelect={(c) => setElegidos(multiple ? [...elegidos, c] : [c])} onRemove={(c) => setElegidos(elegidos.filter((e) => e.id !== c.id))}
        multiple={multiple} accion={accion} placeholder={placeholder} emptyText={emptyText} ariaLabel="Carrier" tituloElegidos="Selected carriers"
      />
    </div>
  )
}

const meta = {
  title: 'Components/UI/SearchPicker',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Un buscador que muestra los resultados en cards y deja lo elegido debajo, también en card, con su ✕. Lo usan *New Procedure* para vincular findings y diagnósticos (`accion="vincular"`) e *Insurance* para elegir una suscripción (CON-3259).',
          '',
          '**Cómo se usa:** sin texto no lista nada; al escribir filtra por `getText`. Lo ya elegido no vuelve a aparecer en los resultados. Con `multiple` se suman varios; sin él, elegir reemplaza.',
          '',
          '**Probalo:** en *Playground* escribí "dental" y elegí; cambiá `multiple` y la acción desde *Controls*. *Parts* dice qué hace cada parte y *States* muestra vacío, sin resultados y con elegidos.',
        ].join('\n'),
      },
    },
  },
  args: { multiple: true, accion: 'agregar', placeholder: 'Search carrier', emptyText: 'No results' },
  argTypes: {
    multiple: { control: 'boolean', description: 'Varios elegidos, o uno que se reemplaza.' },
    accion: { control: 'inline-radio', options: ['agregar', 'vincular'], description: 'Cambia el ícono del resultado: + o el eslabón.' },
    placeholder: { control: 'text' },
    emptyText: { control: 'text', description: 'Lo que dice cuando nada coincide.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

export const Playground: Story = { render: (args) => <Demo key={JSON.stringify(args)} {...args} /> }

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Search input', 'Filtra mientras se escribe; la lista se cierra al hacer clic afuera.', 'SearchPicker'],
          ['Result card', 'Lo que devuelve renderOption, con el ícono de la acción a la derecha.', 'renderOption'],
          ['Selected card', 'Lo elegido, con ✕ para quitarlo. Por default se ve igual que el resultado.', 'renderSelected'],
          ['Selected title', 'El rótulo arriba de lo elegido ("Linked findings").', 'tituloElegidos'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <div className="grid gap-6 sm:grid-cols-2">
          <Muestra titulo="Empty" nota="Sin texto no lista nada."><Demo multiple accion="agregar" placeholder="Search carrier" emptyText="No results" /></Muestra>
          <Muestra titulo="Selected" nota="Con elegidos: quedan debajo, cada uno con su ✕."><Demo multiple accion="agregar" placeholder="Search carrier" emptyText="No results" inicial={CARRIERS.slice(0, 2)} /></Muestra>
          <Muestra titulo="Link action" nota='accion="vincular": el resultado lleva el eslabón.'><Demo multiple={false} accion="vincular" placeholder="Search finding" emptyText="No findings match." inicial={[CARRIERS[2]]} /></Muestra>
        </div>
      </Bloque>
    </Lienzo>
  ),
}
