import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  MoverVisitaDialog, PlanCard, Seleccionable, TurnoVinculadoInfo, VisitRow,
  type Plan, type TurnoVinculado, type Visita,
} from './TreatmentPlanPicker'
import { Bloque, ConRotulo, Lienzo, Muestras, Muestra, Tabla, Token } from '@/design-system/kit'

/* Playground, Parts, States y Specs de las piezas del paso "Link to treatment plan visit" de New Appointment. */

const PLAN: Plan = { id: 'p1', estado: 'Accepted', date: '02/12/2026', doctor: 'Dr. Elena Martinez', therapy: 'Crown and root canal', visitas: 2, procedimientos: 4 }
const VISITA: Visita = { id: 'v1', name: 'Visit 1', procedimientos: ['D3310 – Endodontic therapy', 'D2740 – Crown – porcelain/ceramic'], total: '$1,240.00' }
const VINCULADA: TurnoVinculado = { fecha: 'Sep 28, 2026', hora: '1:15 PM', estado: 'Fulfilled' }
const ESTADOS: TurnoVinculado['estado'][] = ['Booked', 'Fulfilled', 'No Show', 'Cancelled']

type Args = { seleccionada: boolean; vinculada: boolean; estado: TurnoVinculado['estado'] }

const meta = {
  title: 'Components/Scheduling/TreatmentPlanPicker',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Las piezas del paso **Link to treatment plan visit** de New Appointment: la card del plan, la fila de la visita con su tabla de procedimientos y, desde 2026-10-17, **el aviso de que la visita ya está linkeada a otro turno** y la pregunta *Move treatment visit?* que aparece al guardar.',
          '',
          '**Cuándo se usa:** una visita pertenece a un solo turno. Si ya tiene uno, se ve en su fila *antes* de elegirla; si igual se elige, Save pregunta si se mueve y recién ahí la desvincula del turno anterior.',
          '',
          '**Probalo:** en *Playground* prendé *vinculada*, cambiá el estado del turno y elegí la fila.',
        ].join('\n'),
      },
    },
  },
  args: { seleccionada: true, vinculada: true, estado: 'Fulfilled' },
  argTypes: {
    seleccionada: { control: 'boolean', description: 'La visita elegida abre la tabla de procedimientos.' },
    vinculada: { control: 'boolean', description: 'La visita ya está linkeada a otro turno: se ve el bloque Linked appointment.' },
    estado: { control: 'inline-radio', options: ESTADOS, description: 'Estado del turno al que está linkeada, con el tono de los turnos de la app.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

export const Playground: Story = {
  render: ({ seleccionada, vinculada, estado }) => (
    <div className="w-[420px] max-w-full">
      <VisitRow
        key={`${seleccionada}-${vinculada}-${estado}`}
        visita={{ ...VISITA, vinculada: vinculada ? { ...VINCULADA, estado } : undefined }}
        on={seleccionada}
        onClick={() => {}}
      />
    </div>
  ),
}

/* ── Parts ─────────────────────────────────────────────────────────── */

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Pieces" nota="Las dos que ya existían y las dos de la visita linkeada.">
        <Muestras>
          <ConRotulo rotulo="Plan card"><div className="w-[380px] max-w-full"><PlanCard plan={PLAN} on onClick={() => {}} /></div></ConRotulo>
          <ConRotulo rotulo="Visit row, linked"><div className="w-[380px] max-w-full"><VisitRow visita={{ ...VISITA, vinculada: VINCULADA }} on={false} onClick={() => {}} /></div></ConRotulo>
          <ConRotulo rotulo="Linked appointment"><div className="w-[340px] max-w-full"><TurnoVinculadoInfo turno={VINCULADA} /></div></ConRotulo>
        </Muestras>
        <Tabla encabezado={['Piece', 'What it does']} minimo={560} arriba>
          <tr><td className="font-semibold whitespace-nowrap">PlanCard</td><td className="text-ink-medium">El plan elegible: barra de color del estado, doctor, terapia, conteos y fecha.</td></tr>
          <tr><td className="font-semibold whitespace-nowrap">VisitRow</td><td className="text-ink-medium">La visita: nombre, procedimientos, total; la elegida abre la tabla de códigos.</td></tr>
          <tr><td className="font-semibold whitespace-nowrap">TurnoVinculadoInfo</td><td className="text-ink-medium">Bloque gris dentro de la fila con la fecha y la hora del otro turno, su estado en una Pill y el círculo de info (InfoTip) que explica que hay que moverla.</td></tr>
          <tr><td className="font-semibold whitespace-nowrap">MoverVisitaDialog</td><td className="text-ink-medium">La pregunta de sí o no al guardar: ConfirmDialog con Cancel y Move visit.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* ── States ────────────────────────────────────────────────────────── */

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States" nota="Lo linkeado se ve sin elegir la visita: se decide antes de tocarla.">
        <div className="flex flex-wrap items-start gap-x-6 gap-y-6">
          <Muestra titulo="Free" nota="Sin turno: sólo la fila." ancho={380}><VisitRow visita={VISITA} on={false} onClick={() => {}} /></Muestra>
          <Muestra titulo="Selected" nota="Borde azul y la tabla de procedimientos." ancho={380}><VisitRow visita={VISITA} on onClick={() => {}} /></Muestra>
          <Muestra titulo="Linked" nota="El turno donde ya está, en la misma fila." ancho={380}><VisitRow visita={{ ...VISITA, vinculada: VINCULADA }} on={false} onClick={() => {}} /></Muestra>
          <Muestra titulo="Linked and selected" nota="Save va a preguntar si se mueve." ancho={380}><VisitRow visita={{ ...VISITA, vinculada: VINCULADA }} on onClick={() => {}} /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Linked appointment status" nota="La Pill del turno usa los tonos de los turnos de la app (PATIENT_APPOINTMENT_TONES). La pregunta al guardar está en la story Move Visit Question.">
        <Muestras>
          {ESTADOS.map((estado) => (
            <ConRotulo key={estado} rotulo={estado}><div className="w-[260px]"><TurnoVinculadoInfo turno={{ ...VINCULADA, estado }} /></div></ConRotulo>
          ))}
        </Muestras>
      </Bloque>
    </Lienzo>
  ),
}

/* La pregunta abierta, sola. */
export const MoveVisitQuestion: Story = {
  parameters: { layout: 'fullscreen', controls: { disable: true }, docs: { story: { inline: false, iframeHeight: 420 } } },
  render: () => <MoverVisitaDialog visita="Visit 2" turno={VINCULADA} onConfirm={() => {}} onCancel={() => {}} />,
}

/* La tarjeta seleccionable base: elegida (borde azul) y sin elegir. */
export const SelectableCard: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-[380px] flex-col gap-2">
      <Seleccionable on onClick={() => {}} barra="var(--color-dash-blue)" className="p-3"><span className="text-[13px] font-semibold">Selected</span></Seleccionable>
      <Seleccionable on={false} onClick={() => {}} className="p-3"><span className="text-[13px] font-semibold">Not selected</span></Seleccionable>
    </div>
  ),
}

/* ── Specs ─────────────────────────────────────────────────────────── */

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Linked appointment">
        <Tabla encabezado={['Part', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Block</td><td>Inside the visit row, 12px side margin · <Token nombre="dash-field" /> · radius 6px · 12px × 8px padding</td></tr>
          <tr><td className="font-semibold">Label</td><td>"Linked appointment" 11px · <Token nombre="ink-muted" />, with the InfoTip next to it</td></tr>
          <tr><td className="font-semibold">Date</td><td>"Sep 28, 2026 · 1:15 PM" 12px · <Token nombre="ink" />, then the status Pill (sm)</td></tr>
          <tr><td className="font-semibold">Tone</td><td>Booked info · Fulfilled success · No Show warning · Cancelled danger</td></tr>
          <tr><td className="font-semibold">Info text</td><td>"To use this visit for the new appointment, you’ll need to move it from the linked appointment."</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Move question">
        <Tabla encabezado={['Part', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Component</td><td>ConfirmDialog (Elements / ConfirmDialog), 420px, centered; it is a yes or no question, so it is not a drawer</td></tr>
          <tr><td className="font-semibold">Title</td><td>Move treatment visit?</td></tr>
          <tr><td className="font-semibold">Text</td><td>"Visit N is linked to the appointment on {'{date}'} at {'{time}'}." and "Continuing will unlink this visit from that appointment and link it to the appointment you are saving."</td></tr>
          <tr><td className="font-semibold">Buttons</td><td>Cancel (secondary) · Move visit (primary: it is not destructive, the visit keeps its data)</td></tr>
          <tr><td className="font-semibold">Keyboard</td><td>Focus goes into the dialog; Escape or Cancel closes it and the drawer keeps what was typed</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
