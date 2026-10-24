import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MoneyInput, PhoneFields, UnitField } from './fields'
import { Bloque, Lienzo, Muestra, Muestras, Tabla, TablaPartes, Token } from '@/design-system/kit'
import { TELEFONO_VACIO, type Telefono } from '@/data/finanzas'

type Args = { campo: 'Unit field' | 'Phone fields' | 'Money input'; unit: string; country: string; error: boolean; disabled: boolean }

const meta = {
  title: 'Components/Finance/Fields',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'components/finance/fields.tsx',
      description: {
        component: [
          'Los tres campos de *Settings → Billing* que el formulario base no tiene, copiados de red.dev con nuestro estilo:',
          '',
          '- **UnitField**: un número con su unidad (*days*, *months*, *years*) y flechas para bajar o subir. Expected Period of Insurance Claim Resolution, Waiting Period, Dependent Max Age.',
          '- **PhoneFields**: Country Code y el número. Con (+1) el número va en dos campos, *Area Code (3 digits)* y *Number (7 digits)*; con otro país, uno solo. Sólo guarda dígitos.',
          '- **MoneyInput**: un monto en una celda de tabla. Se escribe el número y al salir se ve como $1,250.00.',
          '',
          '**Probalo:** en *Playground* elegí el campo y cambiá el país, el error o el estado deshabilitado.',
        ].join('\n'),
      },
    },
  },
  args: { campo: 'Unit field', unit: 'days', country: TELEFONO_VACIO.codigo, error: false, disabled: false },
  argTypes: {
    campo: { control: 'inline-radio', options: ['Unit field', 'Phone fields', 'Money input'], description: 'Qué campo mostrar.' },
    unit: { control: 'inline-radio', options: ['days', 'months', 'years'], description: 'UnitField: la unidad.' },
    country: { control: 'select', options: ['(+1) United States of America (the)', '(+52) Mexico', '(+54) Argentina'], description: 'PhoneFields: el código de país.' },
    error: { control: 'boolean', description: 'Muestra el error de validación.' },
    disabled: { control: 'boolean', description: 'UnitField deshabilitado.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Unidad({ unit, error, disabled }: { unit: string; error?: boolean; disabled?: boolean }) {
  const [v, setV] = useState(30)
  return <UnitField label="Expected Period of Insurance Claim Resolution" required unit={unit} value={v} onChange={setV} disabled={disabled} error={error ? 'This field is required.' : undefined} />
}
function Telefonos({ codigo, error }: { codigo: string; error?: boolean }) {
  const [t, setT] = useState<Telefono>({ ...TELEFONO_VACIO, codigo, area: '800', numero: '4517715' })
  const valor = { ...t, codigo }
  return <PhoneFields required value={valor} onChange={setT} errores={error ? { area: 'This field is required.', numero: 'This field is required.' } : undefined} />
}
function Monto({ inicial = 1250, invalid }: { inicial?: number | null; invalid?: boolean }) {
  const [v, setV] = useState<number | null>(inicial)
  return <MoneyInput label="D2740 new fee" value={v} onChange={setV} invalid={invalid} className="w-32" />
}

export const Playground: Story = {
  render: ({ campo, unit, country, error, disabled }) => (
    <div className="max-w-[640px]">
      {campo === 'Unit field' && <Unidad unit={unit} error={error} disabled={disabled} />}
      {campo === 'Phone fields' && <Telefonos key={country} codigo={country} error={error} />}
      {campo === 'Money input' && <Monto invalid={error} />}
    </div>
  ),
}

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['UnitField · número', 'Se escribe o se cambia con las flechas; no baja del mínimo (0).', 'input type=number'],
          ['UnitField · flechas', 'Bajar y subir de a uno; cada una con su aria-label (Decrease…, Increase…).', 'button'],
          ['UnitField · unidad', 'days, months o years, en gris a la derecha.', 'span'],
          ['PhoneFields · Country Code', 'Elige el país; con (+1) aparecen Area Code y Number.', 'SelectField'],
          ['PhoneFields · Area Code / Number', 'Sólo dígitos: 3 y 7 con (+1); Number se ve como 451-7715.', 'TextField'],
          ['MoneyInput', 'Monto alineado a la derecha; al enfocar muestra el número, al salir $0.00.', 'input inputMode=decimal'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="UnitField">
        <Muestras>
          <Muestra titulo="Default" ancho={300}><Unidad unit="days" /></Muestra>
          <Muestra titulo="Error" nota="Validation: borde rojo y el mensaje abajo." ancho={300}><Unidad unit="days" error /></Muestra>
          <Muestra titulo="Disabled" ancho={300}><Unidad unit="months" disabled /></Muestra>
        </Muestras>
      </Bloque>
      <Bloque titulo="PhoneFields">
        <Muestras>
          <Muestra titulo="(+1) — tres campos" ancho={560}><Telefonos codigo="(+1) United States of America (the)" /></Muestra>
          <Muestra titulo="Otro país — dos campos" ancho={400}><Telefonos codigo="(+54) Argentina" /></Muestra>
          <Muestra titulo="Error" nota="Required: Area Code y Number vacíos." ancho={560}><Telefonos codigo="(+1) United States of America (the)" error /></Muestra>
        </Muestras>
      </Bloque>
      <Bloque titulo="MoneyInput">
        <Muestras>
          <Muestra titulo="With value"><Monto /></Muestra>
          <Muestra titulo="Empty" nota="Placeholder $0.00."><Monto inicial={null} /></Muestra>
          <Muestra titulo="Invalid"><Monto invalid /></Muestra>
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
          <tr><td className="font-semibold">UnitField, PhoneFields</td><td className="tabular-nums">36px de alto (h-9), texto 13px, rótulo 12px Medium</td></tr>
          <tr><td className="font-semibold">Flechas</td><td className="tabular-nums">20 × 20, ícono 14px</td></tr>
          <tr><td className="font-semibold">Unidad</td><td className="tabular-nums">12px</td></tr>
          <tr><td className="font-semibold">MoneyInput</td><td className="tabular-nums">32px de alto (h-8), texto 13px tabular, a la derecha</td></tr>
          <tr><td className="font-semibold">PhoneFields</td><td>tres columnas con (+1), dos con otro país; una en el celular</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Unidad, flechas</td><td><Token nombre="ink-faint" /> · <Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Error</td><td><Token nombre="field-error" /></td></tr>
          <tr><td className="font-semibold">Borde, foco</td><td><Token nombre="line" /> · <Token nombre="dash-blue" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
