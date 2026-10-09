import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { RangesTable, rangoVacio } from './RangesTable'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes, Token } from '@/design-system/kit'
import { COBERTURAS, type Rango, type TipoCobertura } from '@/data/finanzas'

type Args = { tabla: string; tipo: TipoCobertura; ancho: number }

const meta = {
  title: 'Components/Finance/RangesTable',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'components/finance/RangesTable.tsx',
      description: {
        component: [
          'La tabla de rangos de una coverage table (red.dev): la de cada plantilla en *Coverage Table* y la de cada plan en su pestaña *Coverage Table*.',
          '',
          'Cada fila es un rango de códigos CDT (*R. Min* – *R. Max*), su categoría, el tipo de deducible y lo que paga: un % con Type *Percentage* o un monto con *Copayment*. *Exc* cuenta las excepciones de la plantilla que caen en el rango. En el celular cada rango baja a dos columnas.',
          '',
          '**Probalo:** en *Playground* editá un rango, sumá uno vacío con el botón de abajo o borrá uno con el tacho.',
        ].join('\n'),
      },
    },
  },
  args: { tabla: COBERTURAS[0].nombre, tipo: 'Percentage', ancho: 960 },
  argTypes: {
    tabla: { control: 'select', options: COBERTURAS.map((c) => c.nombre), description: 'La plantilla de la que salen los rangos y las excepciones.' },
    tipo: { control: 'inline-radio', options: ['Percentage', 'Copayment'], description: 'Percentage pide un %; Copayment, un monto.' },
    ancho: { control: { type: 'range', min: 360, max: 1100, step: 10 }, description: 'Ancho del contenedor.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Editable({ rangos: inicial, tipo, intentado, nombre }: { rangos: Rango[]; tipo: TipoCobertura; intentado?: boolean; nombre: string }) {
  const [rangos, setRangos] = useState(inicial)
  const tabla = COBERTURAS.find((c) => c.nombre === nombre) ?? COBERTURAS[0]
  return (
    <div className="flex flex-col gap-3">
      <RangesTable tipo={tipo} rangos={rangos} onChange={setRangos} excepciones={tabla.excepciones} intentado={intentado} />
      <button type="button" onClick={() => setRangos([...rangos, rangoVacio()])} className="self-start text-[13px] font-medium text-dash-blue">+ Add Range</button>
    </div>
  )
}

export const Playground: Story = {
  render: ({ tabla, tipo, ancho }) => {
    const t = COBERTURAS.find((c) => c.nombre === tabla) ?? COBERTURAS[0]
    return <div style={{ width: ancho, maxWidth: '100%' }}><Editable key={tabla + tipo} rangos={t.rangos} tipo={tipo} nombre={tabla} /></div>
  },
}

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Code Ranges', 'Desde y hasta, en mayúsculas y sólo D + dígitos (D0100). Obligatorios.', 'TextField hideLabel'],
          ['Category', 'Texto libre (Diagnostic, Endodontics…). Obligatoria.', 'TextField hideLabel'],
          ['Deductible Type', 'Basic, Major, None, Orthodontic o Preventive.', 'SelectField hideLabel'],
          ['Coverage % / Copayment', 'Lo que paga: 0–100 con Percentage, un monto con Copayment.', 'TextField hideLabel'],
          ['Exc', 'Cuántas excepciones de la plantilla caen en el rango (sólo lectura).', 'span'],
          ['Tacho', 'Saca el rango; se guarda con el Save de la pantalla.', 'button'],
          ['Empty', 'Sin rangos: “No procedure ranges found”.', 'EmptyState'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <Muestra titulo="Empty" nota="Sin rangos (Inicio en red.dev).">
          <Editable rangos={[]} tipo="Percentage" nombre={COBERTURAS[0].nombre} />
        </Muestra>
        <Muestra titulo="Validation error" nota="Save con un rango incompleto: lo obligatorio en rojo (Required).">
          <Editable rangos={[rangoVacio()]} tipo="Percentage" intentado nombre={COBERTURAS[0].nombre} />
        </Muestra>
        <Muestra titulo="Copayment" nota="El último valor es un monto.">
          <Editable rangos={COBERTURAS[3].rangos.slice(0, 3)} tipo="Copayment" nombre={COBERTURAS[3].nombre} />
        </Muestra>
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
          <tr><td className="font-semibold">Columnas</td><td className="tabular-nums">1.3fr · 1.6fr · 150 · 110 · 40 · 32, gap 12</td></tr>
          <tr><td className="font-semibold">Fila</td><td className="tabular-nums">campos de 36px, 12px arriba y abajo, línea entre filas</td></tr>
          <tr><td className="font-semibold">Encabezado</td><td className="tabular-nums">12px Medium; el * de obligatorio en rojo</td></tr>
          <tr><td className="font-semibold">Celular (&lt;640px)</td><td>dos columnas: rango y categoría a lo ancho, el resto de a dos</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Encabezado, Exc</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Línea entre filas</td><td><Token nombre="line" /></td></tr>
          <tr><td className="font-semibold">Tacho</td><td><Token nombre="dash-bad-fg" /></td></tr>
          <tr><td className="font-semibold">Obligatorio</td><td><Token nombre="required" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
