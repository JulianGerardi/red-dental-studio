import type { Meta, StoryObj } from '@storybook/react-vite'
import { ALERT_TONES, Alert, type AlertTone } from './alert'
import { Bloque, Lienzo, Muestra, SpecsMedidas, Tabla, TablaPartes, Token } from '@/design-system/kit'
import { tokensDe } from '@/design-system/medir'

/* Playground, Parts, States y Specs del aviso único de la app (patients.md, 2026-11-18). */

const TONOS = Object.keys(ALERT_TONES) as AlertTone[]
const USO: Record<AlertTone, string> = {
  info: 'Algo para saber, sin acción: una verificación en curso.',
  success: 'Salió bien: se guardó, se envió.',
  warning: 'Hay que tenerlo en cuenta: acceso limitado, un dato que falta.',
  danger: 'Algo falló o se bloqueó: no se pudo guardar.',
}

const meta = {
  title: 'Elements/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El aviso de la app (`@/components/ui/alert`): un mensaje dentro de la pantalla, con ícono, título y texto, en los colores de los estados. Por ejemplo, *Limited access to this treatment case* en Treatment Plan o *Guarantor not assigned* en el detalle del turno. Para algo que pasó y se va solo, el toast (`aviso`).',
          '',
          '**Es el único aviso de la app.** No se arman franjas con barra a la izquierda (`border-l-[3px]`) para un mensaje: desde el 2026-11-18 los avisos de Guardian, New Hours, Assign Role, Vitals y el detalle del turno usan `Alert`, y `Section notice` dejó de existir. Las tarjetas con barra de color (turnos, findings) no son avisos.',
          '',
          '**Probalo:** en *Playground* cambiá tono, título y texto desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { tone: 'warning', title: 'Limited access to this treatment case', children: 'You do not have permission to update treatment plans for this location.' },
  argTypes: {
    tone: { control: 'inline-radio', options: TONOS, description: 'Color según lo que dice.' },
    title: { control: 'text', description: 'Qué pasa, en una línea.' },
    children: { control: 'text', description: 'El detalle o qué hacer. Vacío, no se muestra.' },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/* ── Parts ─────────────────────────────────────────────────────────── */

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <div className="max-w-[560px]">
        <Alert tone="warning" title="Attention needed">
          Select the location assigned to the provider, then set the start and end times in the location&apos;s local time zone.
        </Alert>
      </div>
      <TablaPartes partes={[
        ['Box', 'Caja redondeada (8px) con borde de 1px y fondo del tono. Ocupa el ancho de su contenedor.', 'Alert'],
        ['Icon', 'Uno por tono, 16px, del color del título: Info, CircleCheck, TriangleAlert, CircleAlert.', 'ALERT_TONES[tone].icono'],
        ['Title', 'Qué pasa, en una línea corta. 13px Semibold, del color del tono. Obligatorio.', 'title'],
        ['Text', 'El detalle o qué hacer. 13px, color de texto. Opcional: sin texto, el aviso es sólo el título.', 'children'],
      ]} />
    </Lienzo>
  ),
}

/* ── States ────────────────────────────────────────────────────────── */

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Tones" nota="El tono sale de lo que dice el aviso, no del lugar donde va.">
        <div className="flex max-w-[640px] flex-col gap-3">
          {TONOS.map((t) => <Alert key={t} tone={t} title={t[0]!.toUpperCase() + t.slice(1)}>{USO[t]}</Alert>)}
        </div>
      </Bloque>
      <Bloque titulo="Content">
        <div className="flex flex-wrap items-start gap-6">
          <Muestra titulo="Title and text" nota="Guardian de New Patient: el título dice qué pasa y el texto, qué hacer." ancho={440}>
            <Alert tone="warning" title="This patient is under 18.">Add at least one guardian: search for a person in the system or add a new one.</Alert>
          </Muestra>
          <Muestra titulo="Title only" nota="Cuando una línea alcanza: perfil de facturación inactivo." ancho={440}>
            <Alert tone="info" title="This billing profile is inactive and cannot be edited." />
          </Muestra>
          <Muestra titulo="Narrow" nota="En la card del detalle del turno (300px): sólo título." ancho={300}>
            <Alert tone="warning" title="Guarantor not assigned" />
          </Muestra>
          <Muestra titulo="Long content" nota="El texto largo baja de línea; el ícono queda arriba, alineado al título." ancho={300}>
            <Alert tone="warning" title="Attention needed">
              Select the location assigned to the provider, then set the start and end times in the location&apos;s local time zone. The system will automatically convert and store the shift in Coordinated Universal Time (UTC).
            </Alert>
          </Muestra>
        </div>
      </Bloque>
      <Bloque titulo="In the app" nota="Dónde se usa cada tono hoy.">
        <Tabla encabezado={['Tone', 'Screen', 'Title']} minimo={640}>
          {[
            ['warning', 'Scheduling › Appointment details', 'Guarantor not assigned'],
            ['warning', 'Patients › New Patient › Guardian', 'This patient is under 18.'],
            ['warning', 'Settings › Employees › New Hours', 'Attention needed'],
            ['warning', 'Clinical › Treatment Plan', 'Limited access to this treatment case'],
            ['info', 'Settings › Employees › New Hours', 'This will update the hours for all selected days…'],
            ['info', 'Settings › Employees › Assign Role', 'Global access'],
            ['info', 'Settings › Billing Profile', 'This billing profile is inactive and cannot be edited.'],
            ['info', 'Clinical › Vitals', 'Blood pressure'],
            ['danger', 'Settings › Finance, Patients › Insurance', 'Uncompleted fields'],
          ].map(([t, pantalla, titulo]) => (
            <tr key={pantalla + titulo}>
              <td className="font-semibold capitalize">{t}</td>
              <td className="text-ink-medium">{pantalla}</td>
              <td className="text-ink-medium">{titulo}</td>
            </tr>
          ))}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* ── Specs ─────────────────────────────────────────────────────────── */

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <SpecsMedidas piezas={[
        { nombre: 'Box', children: <Alert tone="warning" title="Guarantor not assigned" className="w-[240px]" /> },
        { nombre: 'Title', selector: 'p', children: <Alert tone="warning" title="Guarantor not assigned" className="w-[240px]" /> },
        { nombre: 'Icon', selector: 'svg', children: <Alert tone="warning" title="Guarantor not assigned" className="w-[240px]" /> },
      ]} />
      <Bloque titulo="Colors" nota="Tokens de cada tono, de alert.tsx y src/index.css. El borde es el color del título al 25%.">
        <Tabla encabezado={['Tone', 'Fill', 'Border (25%)', 'Title and icon']} minimo={560}>
          {TONOS.map((t) => {
            const k = tokensDe(`border ${ALERT_TONES[t].caja} ${ALERT_TONES[t].color}`)
            return (
              <tr key={t}>
                <td className="font-semibold capitalize">{t}</td>
                <td><Token nombre={k.fondo} /></td>
                <td><Token nombre={k.texto} /></td>
                <td><Token nombre={k.texto} /></td>
              </tr>
            )
          })}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
