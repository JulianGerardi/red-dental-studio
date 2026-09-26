import { useLayoutEffect, useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateTextField, OptionCheckbox, SearchField, SelectField, TextArea, TextField } from '@/components/patients/form'
import { Bloque, Lienzo, Swatch, Tabla, useMedidas } from './kit'
import { cn } from '@/lib/utils'
import { hex } from './medir'

/* Los campos de formulario de la app (src/components/patients/form.tsx): los
   que usan todas las pantallas con formulario. Esta página los muestra tal
   cual y deja probarlos. */

type Tipo = 'Text' | 'Select' | 'Search' | 'Date' | 'Textarea' | 'Checkbox'
type Estado = 'default' | 'focus'
type Args = {
  type: Tipo
  label: string
  placeholder: string
  value: string
  hint: string
  error: string
  required: boolean
  disabled: boolean
  state: Estado
}

const OPCIONES = ['Female', 'Male', 'Other']

const meta = {
  title: 'Elements/Fields',
  component: TextField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Los campos de formulario de la app (`@/components/patients/form`). Todos comparten el mismo aspecto: rótulo arriba, control de 36px, texto de ayuda o error debajo.',
          '',
          '**Cuál usar:** *Text* para texto corto · *Select* para elegir de una lista · *Search* para buscar con sugerencias · *Date* para una fecha tipeada · *Textarea* para texto largo · *Checkbox* para aceptar o activar una opción.',
          '',
          '**Probalo:** en *Playground* cambiá tipo, rótulo, valor, ayuda, error y estado desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { type: 'Text', label: 'First name', placeholder: 'Type here', value: '', hint: '', error: '', required: false, disabled: false, state: 'default' },
  argTypes: {
    type: { control: 'inline-radio', options: ['Text', 'Select', 'Search', 'Date', 'Textarea', 'Checkbox'], description: 'Tipo de campo.' },
    label: { control: 'text', description: 'Rótulo arriba del campo.' },
    placeholder: { control: 'text', description: 'Texto gris cuando está vacío.' },
    value: { control: 'text', description: 'Valor cargado.' },
    hint: { control: 'text', description: 'Texto de ayuda debajo del campo.' },
    error: { control: 'text', description: 'Mensaje de error. Pinta el borde de rojo y reemplaza la ayuda.' },
    required: { control: 'boolean', description: 'Agrega el asterisco rojo.' },
    disabled: { control: 'boolean' },
    state: { control: 'inline-radio', options: ['default', 'focus'], description: 'Fuerza el foco para verlo sin hacer clic.', table: { category: 'Preview' } },
  },
} satisfies Meta<Args>

const angosto = [(Story: React.ComponentType) => <div className="w-[340px] max-w-full"><Story /></div>]

export default meta
type Story = StoryObj<Args>

function Campo({ type, label, placeholder, value, hint, error, required, disabled }: Omit<Args, 'state'>) {
  const [v, setV] = useState(value)
  const comun = { label, required, disabled, hint: hint || undefined, error: error || undefined }
  if (type === 'Select') return <SelectField {...comun} placeholder={placeholder || 'Select'} options={OPCIONES} value={v} onChange={setV} />
  if (type === 'Search') return <SearchField {...comun} placeholder={placeholder || 'Search...'} options={['Amoxicillin', 'Ibuprofen', 'Lidocaine']} value={v} onChange={setV} />
  if (type === 'Date') return <DateTextField {...comun} value={v} onChange={setV} />
  if (type === 'Textarea') return <TextArea {...comun} placeholder={placeholder} value={v} onChange={setV} rows={3} />
  if (type === 'Checkbox') return <OptionCheckbox label={label} disabled={disabled} />
  return <TextField {...comun} placeholder={placeholder} value={v} onChange={setV} />
}

/* Cambiá todo desde Controls. */
export const Playground: Story = {
  decorators: angosto,
  render: ({ state, ...args }) => (
    <div className={state === 'focus' ? 'pseudo-focus-all pseudo-focus-visible-all' : ''}>
      {/* key: al cambiar el valor desde Controls, el campo arranca de nuevo con ese valor. */}
      <Campo key={`${args.type}-${args.value}`} {...args} />
    </div>
  ),
}

export const Types: Story = {
  parameters: { controls: { include: ['required', 'disabled'] } },
  decorators: [(Story) => <div className="w-[720px] max-w-full"><Story /></div>],
  render: ({ required, disabled }) => (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <TextField label="Text" placeholder="Type here" required={required} disabled={disabled} />
      <SelectField label="Select" options={OPCIONES} required={required} disabled={disabled} />
      <SearchField label="Search" options={['Amoxicillin', 'Ibuprofen']} required={required} disabled={disabled} />
      <DateTextField label="Date" required={required} disabled={disabled} />
      <TextArea label="Textarea" placeholder="Add notes" rows={3} required={required} disabled={disabled} />
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-ink">Checkbox</span>
        <OptionCheckbox label="Send a reminder to the patient" disabled={disabled} />
      </div>
    </div>
  ),
}

const COLUMNAS = ['Empty', 'Filled', 'Focus', 'Error', 'Disabled'] as const

function Celda({ tipo, col }: { tipo: 'Text' | 'Select' | 'Textarea'; col: (typeof COLUMNAS)[number] }) {
  const lleno = col === 'Filled' || col === 'Disabled'
  const error = col === 'Error' ? 'This field is required.' : undefined
  const comun = { label: 'Label', disabled: col === 'Disabled', error }
  const campo =
    tipo === 'Select' ? <SelectField {...comun} options={OPCIONES} value={lleno ? 'Female' : ''} onChange={() => {}} />
    : tipo === 'Textarea' ? <TextArea {...comun} placeholder="Placeholder" rows={2} value={lleno ? 'Sensitive to cold.' : ''} onChange={() => {}} />
    : <TextField {...comun} placeholder="Placeholder" value={lleno ? 'Sarah Stone' : undefined} />
  return <div className={col === 'Focus' ? 'pseudo-focus-all pseudo-focus-visible-all' : ''}>{campo}</div>
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  decorators: [(Story) => <div className="w-[980px] max-w-full"><Story /></div>],
  render: () => (
    <Tabla encabezado={['Type', ...COLUMNAS]} minimo={940} arriba>
      {(['Text', 'Select', 'Textarea'] as const).map((t) => (
        <tr key={t}>
          <td className="w-[90px] pt-[38px] font-semibold">{t}</td>
          {COLUMNAS.map((c) => <td key={c} className="w-[170px] align-top"><Celda tipo={t} col={c} /></td>)}
        </tr>
      ))}
    </Tabla>
  ),
}

export const WithHintAndError: Story = {
  name: 'Hint and error',
  parameters: { controls: { disable: true } },
  decorators: angosto,
  render: () => (
    <div className="flex flex-col gap-5">
      <TextField label="Email" placeholder="name@clinic.com" hint="We send the appointment reminders here." />
      <TextField label="Email" required placeholder="name@clinic.com" error="Enter a valid email." value="sarah@" />
    </div>
  ),
}

/* Medidas y colores, leídos del campo dibujado. */
function FilaMedidas({ nombre, children, selector }: { nombre: string; children: React.ReactNode; selector: string }) {
  const { ref, m } = useMedidas(selector)
  return (
    <tr>
      <td className="font-semibold">{nombre}</td>
      <td><div ref={ref} className="w-[180px]">{children}</div></td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m?.padding}</td>
      <td className="tabular-nums">{m?.texto}</td>
      <td className="tabular-nums">{m?.radio}</td>
    </tr>
  )
}

function FilaColores({ nombre, clase, children }: { nombre: string; clase: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [c, setC] = useState<string[] | null>(null)
  useLayoutEffect(() => {
    const el = ref.current?.querySelector('input')
    if (!el) return
    const s = getComputedStyle(el)
    setC([hex(s.borderTopColor), hex(s.backgroundColor), hex(s.color)])
  }, [])
  return (
    <tr>
      <td className="font-semibold">{nombre}</td>
      <td><div ref={ref} className={cn('w-[170px]', clase)}>{children}</div></td>
      {(c ?? ['', '', '']).map((v, i) => (
        <td key={i}><span className="inline-flex items-center gap-2"><Swatch color={v} /><span className="text-[12px] tabular-nums">{v}</span></span></td>
      ))}
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  decorators: [(Story) => <div className="w-[880px] max-w-full"><Story /></div>],
  render: () => (
    <Lienzo>
      <Bloque titulo="Sizes" nota="Todos los campos miden 36px de alto; el rótulo va 8px arriba y la ayuda o el error 4px abajo.">
        <Tabla encabezado={['Type', 'Sample', 'Height', 'Padding', 'Text', 'Radius']} minimo={680}>
          <FilaMedidas nombre="Text" selector="input"><TextField label="Label" placeholder="Placeholder" /></FilaMedidas>
          <FilaMedidas nombre="Search" selector="input"><SearchField label="Label" /></FilaMedidas>
          <FilaMedidas nombre="Select" selector="button"><SelectField label="Label" options={OPCIONES} /></FilaMedidas>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors" nota="Leídos del campo en cada estado. El error agrega el mensaje en el mismo rojo del borde.">
        <Tabla encabezado={['State', 'Sample', 'Border', 'Fill', 'Text']} minimo={720}>
          <FilaColores nombre="Default" clase=""><TextField label="Label" value="Sarah Stone" /></FilaColores>
          <FilaColores nombre="Focus" clase="pseudo-focus-all"><TextField label="Label" value="Sarah Stone" /></FilaColores>
          <FilaColores nombre="Error" clase=""><TextField label="Label" value="Sarah Stone" error="This field is required." /></FilaColores>
          <FilaColores nombre="Disabled" clase=""><TextField label="Label" value="Sarah Stone" disabled /></FilaColores>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
