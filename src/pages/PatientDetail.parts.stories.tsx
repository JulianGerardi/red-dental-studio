import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import PatientDetail, { TOPE } from './PatientDetail'
import { PendingDocuments } from '@/components/patients/PendingDocuments'
import { conPacientes } from '@/design-system/decorators'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes } from '@/design-system/kit'

/* Playground, Parts, States y Specs del Overview del paciente; decisiones en
   design-reference/figma/modulos/patient-dashboard.md (2026-10-17). */

type Args = { appointments: number }

const meta = {
  title: 'Pages/Parts/Patient Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      decisionsFrom: 'pages/PatientDetail.tsx',
      description: {
        component: [
          'El Overview del paciente (`@/pages/PatientDetail`): los cuatro bloques clínicos arriba y, abajo, **dos columnas**. A la izquierda **Pending Task** y debajo **Pending documents**; a la derecha **Appointments**, una columna de 280px del alto de las dos. Desde 1024px; antes, todo en una columna en ese orden.',
          '',
          '**Cuántos se ven:** 3 tareas y 4 documentos siempre. Turnos: 7 en la columna (entran a la par de la izquierda) y 3 cuando va apilado. Más allá, "Show N more" (`ui/show-more`). La pantalla completa, con el menú y el header, está en *Pages*.',
          '',
          '**Probalo:** en *Playground* cambiá la cantidad de turnos desde *Controls* y mirá cuándo aparece "Show N more"; en *Guidelines → Devices* la misma pantalla en el celular, la tablet y el escritorio.',
        ].join('\n'),
      },
    },
  },
  args: { appointments: 7 },
  argTypes: {
    appointments: { control: { type: 'range', min: 1, max: 14 }, description: 'Turnos del paciente. Con más de 7 (o de 3 apilado) aparece "Show N more".' },
  },
  decorators: [conPacientes],
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const sinControles = { controls: { disable: true } }
const PLAYGROUND = 'pages-parts-patient-overview--playground'

/* La pantalla en su propio iframe: la columna de turnos depende del ancho de la ventana. */
export const Playground: Story = {
  parameters: { docs: { story: { inline: false, iframeHeight: 1400 }, devices: { height: 1400 } } },
  render: (a) => (
    <div className="min-h-screen bg-page-background">
      <PatientDetail key={a.appointments} turnos={a.appointments} />
    </div>
  ),
}

/* ── Parts ─────────────────────────────────────────────────────────── */

const PARTES: [string, string, string][] = [
  ['Patient menu', 'Avatar, Start Encounter, Clinical Mode, las seis secciones y los datos General y Contact.', 'PatientSidePanel'],
  ['Clinical cards', 'Allergies, Medical Conditions, Medication y Past Surgery and Hospitalization, de a dos. Cada una abre su listado flotante.', 'Card · ClinicalPopover'],
  ['Pending Task', 'Abajo de Pending documents, con el mismo diseño: lo que hay que hacer por este paciente, agrupado por tipo y en filas. Se ven 3.', 'Card · PendingTaskList'],
  ['Pending documents', 'Debajo de Pending Task: los documentos a resolver por urgencia, con quién actúa y la acción. Se ven 4. En una columna angosta el vencimiento y el botón bajan a otro renglón.', 'Card · PendingDocuments'],
  ['Appointments', 'Columna derecha de 280px, del alto de Pending Task + Pending documents. Se ven 7 en la columna y 3 apilado.', 'Card · ShowMore · PatientAppointmentCard'],
]

/* Mapa del layout desde 1024px: qué va en cada columna. */
function Mapa() {
  const caja = (texto: string, clase = '') => (
    <div className={`flex items-center justify-center rounded-lg bg-white p-3 text-center text-[12px] font-semibold text-ink shadow-panel ${clase}`}>{texto}</div>
  )
  return (
    <div className="flex gap-3 rounded-xl bg-page-background p-4">
      {caja('Patient menu', 'w-28 shrink-0')}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          {['Allergies', 'Medical Conditions', 'Medication', 'Past Surgery…'].map((c) => caja(c, 'py-2 font-medium'))}
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_7rem] gap-3">
          <div className="flex flex-col gap-3">
            {caja('Pending Task', 'h-24')}
            {caja('Pending documents', 'h-24')}
          </div>
          {caja('Appointments · 280px')}
        </div>
      </div>
    </div>
  )
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <div className="p-4 sm:p-6">
      <Lienzo>
        <Bloque titulo="Layout from 1024px" nota="Lo que se resuelve (tareas y documentos) a la izquierda, uno abajo del otro; la agenda del paciente en la columna de la derecha, de punta a punta.">
          <Mapa />
        </Bloque>
        <TablaPartes partes={PARTES} />
      </Lienzo>
    </div>
  ),
}

/* ── States ────────────────────────────────────────────────────────── */

/* El Playground en un iframe del ancho de una ventana real, achicado para entrar en la página. */
function Ventana({ ancho, alto, args = '', escala }: { ancho: number; alto: number; args?: string; escala: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line-row bg-page-background" style={{ width: ancho * escala, height: alto * escala }}>
      <iframe
        title={`${ancho}px`}
        loading="lazy"
        src={`iframe.html?id=${PLAYGROUND}&viewMode=story${args && `&args=${args}`}`}
        style={{ width: ancho, height: alto, border: 0, transform: `scale(${escala})`, transformOrigin: 'top left' }}
      />
    </div>
  )
}

const Fila = ({ children }: { children: ReactNode }) => <div className="flex flex-wrap items-start gap-6">{children}</div>

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <div className="p-4 sm:p-6">
      <Lienzo className="max-w-[1100px]">
        <Bloque titulo="Two columns · 1024px and up">
          <Fila>
            <Muestra titulo="7 appointments" nota="Entran todos: la columna termina a la par de Pending documents.">
              <Ventana ancho={1280} alto={1340} escala={0.4} />
            </Muestra>
            <Muestra titulo="12 appointments" nota="Se ven 7 y “Show 5 more” abre el resto con scroll adentro.">
              <Ventana ancho={1280} alto={1340} escala={0.4} args="appointments:12" />
            </Muestra>
          </Fila>
        </Bloque>
        <Bloque titulo="One column · under 1024px" nota="Pending Task, Pending documents y Appointments, en ese orden. Los turnos vuelven a 3 para no alargar la página.">
          <Ventana ancho={768} alto={2300} escala={0.3} />
        </Bloque>
        <Bloque titulo="Pending documents in a narrow column" nota="Con menos de ~520px (la columna a 1024px, el celular) el vencimiento y el botón bajan a un segundo renglón, alineados a la derecha.">
          <Fila>
            <Muestra titulo="Wide" ancho={760}><div className="rounded-lg bg-white p-5 shadow-panel"><PendingDocuments /></div></Muestra>
            <Muestra titulo="Narrow · 380px" ancho={380}><div className="rounded-lg bg-white p-5 shadow-panel"><PendingDocuments /></div></Muestra>
          </Fila>
        </Bloque>
      </Lienzo>
    </div>
  ),
}

/* ── Specs ─────────────────────────────────────────────────────────── */

const SPECS: [string, string, string][] = [
  ['Columns', 'minmax(0, 1fr) · 280px, desde 1024px (lg)', 'lg:grid-cols-[minmax(0,1fr)_280px]'],
  ['Gap', '20px entre columnas y entre Pending Task y Pending documents', 'gap-5'],
  ['Appointments height', 'Se estira al alto de la columna izquierda; si tiene más turnos, la izquierda queda más corta', 'align-items: stretch'],
  ['Visible tasks', String(TOPE.tareas), 'TOPE.tareas'],
  ['Visible documents', '4', 'PendingDocuments · TOPE'],
  ['Visible appointments', `${TOPE.turnosColumna} en la columna · ${TOPE.turnos} apilado`, 'TOPE.turnosColumna · TOPE.turnos'],
  ['Document row', 'El nombre pide 14rem (224px); si no entra, vencimiento y botón bajan juntos y van a la derecha', 'basis-56 · ml-auto'],
]

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <div className="p-4 sm:p-6">
      <Lienzo>
        <Tabla encabezado={['Spec', 'Value', 'Code']} minimo={640} arriba>
          {SPECS.map(([spec, valor, codigo]) => (
            <tr key={spec}>
              <td className="font-semibold whitespace-nowrap">{spec}</td>
              <td className="text-ink-medium">{valor}</td>
              <td className="font-mono text-[12px] text-ink-muted">{codigo}</td>
            </tr>
          ))}
        </Tabla>
      </Lienzo>
    </div>
  ),
}
