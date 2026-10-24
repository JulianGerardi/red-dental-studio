import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Search, Plus, CalendarDays, Users } from 'lucide-react'
import { PatientsTable, type PatientRow } from '@/components/patients/PatientsTable'
import { PatientCard } from '@/components/patients/PatientCard'
import { usePatients } from '@/data/patientsStore'
import { PageTitle } from '@/components/ui/page-title'
import { SearchButton } from '@/components/ui/search-button'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { ShowMore } from '@/components/ui/show-more'
import { NewPatientModal } from '@/pages/patients/NewPatientModal'
import { Panel } from '@/components/dashboard/primitives'
import { AppointmentCard, type Appointment } from '@/components/dashboard/AppointmentCard'
import { NewAppointmentModal, type DatosTurno } from '@/components/scheduling/NewAppointmentModal'
import { HORAS } from '@/components/scheduling/AppointmentSlotPicker'
import { formatDMY } from '@/components/ui/date-picker'
import { aviso } from '@/components/ui/toaster'
import { TURNOS_PATIENTS } from '@/components/dashboard/dashboard-data'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Barra lateral junto a la tabla, desde la altura del título: Today Appointments y Recent Patients, los dos con el
   mismo Panel que el Dashboard y la card compacta de cada fila. Cada lista muestra unas pocas filas enteras y "Show N
   more" abre el resto con scroll adentro (ui/show-more): nunca queda una fila cortada ni la barra se estira con la
   tabla. Decisiones en design-reference/figma/modulos/patients.md (2026-10-13 y 2026-10-19). */
/* Recent Patients (la última card) termina siempre a la altura de la tabla: la barra entera toma el alto medido de la
   tabla (\`altoTabla\` más abajo) y su \`ShowMore llenarAlto\` mide cuántas filas enteras entran ahí, no un número fijo
   (patients.md, 2026-10-19). Today Appointments sigue con \`limit\` fijo: no tiene un alto propio del que tirar.
   Estos dos valores son sólo el arranque, antes de medir. */
const LIMITE_TURNOS = 4
const LIMITE_RECIENTES = 3
const CANTIDAD_RECIENTES = 10

/* Globo con el total -no el filtrado ni el visible- al lado del título del
   panel, mismo color que el de notificaciones de la campana. */
export function Globo({ n }: { n: number }) {
  return (
    <span className="bg-dash-blue flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold text-white">
      {n}
    </span>
  )
}

/* Figma 3638:59529 "Patients — List".
   Los formatos de fecha mezclados ("April 2" / "Jan 15" / "June 2" / "Jun 3")
   y las iniciales en minúscula son del original y se dejan tal cual. */

export default function Patients() {
  const { patients } = usePatients()
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState<'new' | null>(null)
  const [editando, setEditando] = useState<PatientRow | null>(null)
  const [buscarTurno, setBuscarTurno] = useState('')
  const [buscarReciente, setBuscarReciente] = useState('')
  const [turnoEditando, setTurnoEditando] = useState<DatosTurno | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* Alto de la columna de la tabla, para que la barra lateral termine a esa misma altura (más abajo). Se mide ésta,
     no al revés: si en cambio las dos columnas se estiran entre sí (\`items-stretch\`), cuántas filas entran en la
     barra depende de su propio alto ya estirado, que a su vez depende de cuántas filas decide mostrar -un bucle que
     nunca termina de asentarse exacto. Midiendo sólo la tabla, independiente de la barra, no hay vuelta (Julián,
     2026-10-19; design-reference/figma/modulos/patients.md). */
  const refTabla = useRef<HTMLDivElement>(null)
  const [altoTabla, setAltoTabla] = useState(0)
  useEffect(() => {
    const el = refTabla.current
    if (!el) return
    const medir = () => setAltoTabla(el.offsetHeight)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const rows = useMemo(
    () => patients.filter((r) => r.name.toLowerCase().includes(query.toLowerCase())),
    [patients, query],
  )

  /* La barra lateral muestra siempre el mismo pulso de la cuenta: no se filtra con la búsqueda de la tabla, igual que
     las cards de resumen de Billing; cada panel tiene su buscador. Los nuevos pacientes entran primero en el store:
     los 10 primeros son los recientes. */
  const recientes = useMemo(() => patients.slice(0, CANTIDAD_RECIENTES), [patients])
  const recientesFiltrados = useMemo(
    () => recientes.filter((r) => r.name.toLowerCase().includes(buscarReciente.toLowerCase())),
    [recientes, buscarReciente],
  )
  const turnosFiltrados = useMemo(
    () => TURNOS_PATIENTS.filter((a) => a.name.toLowerCase().includes(buscarTurno.toLowerCase())),
    [buscarTurno],
  )

  /* Edit abre el mismo modal que el Dashboard con lo que la card ya sabe. */
  const editarTurno = (a: Appointment) => {
    const h = Number(a.time.slice(0, 2))
    const inicio = HORAS.find((x) => Number(x.slice(0, 2)) === h) ?? ''
    setTurnoEditando({
      patient: a.name, primary: a.provider, operatory: a.operatory, date: formatDMY(new Date()),
      start: inicio, end: HORAS[HORAS.indexOf(inicio) + 1] ?? '', status: 'Check-in',
    })
  }

  const buscador = (valor: string, cambiar: (v: string) => void, placeholder: string) => (
    <div className="relative shrink-0">
      <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-ink-faint" />
      <input
        value={valor}
        onChange={(e) => cambiar(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="focus:border-dash-blue h-8 w-full rounded-md border border-line bg-white pr-2 pl-8 text-[12px] placeholder:text-ink-faint focus:outline-none"
      />
    </div>
  )

  return (
    <div className={CONTENEDOR_PAGINA}>
      {/* Dos columnas desde el título: la tabla con su encabezado, y la barra lateral arrancando a la misma altura.
          Abajo de lg la barra va debajo de la tabla. Antes llevaba un link "Patients ⌄" arriba -no abría nada
          distinto de esta misma pantalla- (patients.md, 2026-10-18). lg:items-start, no stretch (2026-10-19): la
          barra toma el alto medido de la tabla (\`--alto-tabla\`) en vez de estirarse contra ella -estirarse las dos
          entre sí crea un bucle (ver altoTabla más arriba). */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start" style={{ '--alto-tabla': altoTabla ? \`\${altoTabla}px\` : undefined } as CSSProperties}>
        <div className="min-w-0 flex-1" ref={refTabla}>
          {/* El botón principal va en la fila del título, al borde derecho de la columna de la tabla. */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-[9px]">
              <PageTitle>Patients</PageTitle>
              {/* Copy de locación en una pantalla de pacientes: es del Figma. */}
              <p className="text-xs leading-[17px] text-[#a3a3a3]">
                Set your location name. Add the location you need.
              </p>
            </div>

            <Button size="md" onClick={() => setModal('new')} data-tour="pat-new">
              <Plus /> New Patient
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-[320px]" data-tour="pat-search">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by Name or Last Name"
                className="focus:border-dash-blue h-8 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] font-medium shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
              />
            </div>
            <SearchButton onClick={() => inputRef.current?.focus()} className="h-8" />
          </div>

          <div className="mt-4">
            {/* El nombre navega al dashboard del paciente; el kebab abre Edit. */}
            <PatientsTable rows={rows} onRowAction={setEditando} />
          </div>
        </div>

        {/* Mismo Panel que usa el Dashboard. Sin overflow-hidden acá: recortaba la sombra del panel (patients.md,
            2026-10-10); el scroll va adentro de cada panel, en ShowMore. lg:h-[var(--alto-tabla)]: el alto de la
            tabla, medido arriba. */}
        <div className="flex w-full flex-col gap-4 lg:h-[var(--alto-tabla,auto)] lg:w-[336px] lg:shrink-0">
          <Panel title={<>Today Appointments <Globo n={TURNOS_PATIENTS.length} /></>} bodyClassName="gap-2 pt-0" className="shrink-0 [&>header]:min-h-10">
            {buscador(buscarTurno, setBuscarTurno, "Search today's appointments")}
            {turnosFiltrados.length === 0 ? (
              <EmptyState
                icon={CalendarDays}
                title={buscarTurno ? 'No matching appointments' : 'No appointments today'}
                detail={buscarTurno ? 'Try a different name.' : 'Your schedule is clear for today.'}
                className="py-6"
              />
            ) : (
              <ShowMore total={turnosFiltrados.length} limit={LIMITE_TURNOS} label="appointments" enCaja className="flex flex-col gap-3">
                {(n) => turnosFiltrados.slice(0, n).map((a, i) => <AppointmentCard key={i} appt={a} onEdit={editarTurno} compact />)}
              </ShowMore>
            )}
          </Panel>

          {/* flex-1: abraza el resto de la altura de la barra (ya tomó el alto de la tabla más arriba); min-h-0 para
              que no se niegue a achicarse por debajo de su contenido. min-h-[220px]: una tabla muy corta (la última
              página, con un solo paciente) deja a Today Appointments -shrink-0- de igual pidiendo más alto que toda la
              barra; sin este piso, Recent Patients quedaba en 0 y desaparecía entera. */}
          <Panel title={<>Recent Patients <Globo n={recientes.length} /></>} bodyClassName="gap-2 pt-0" className="min-h-[220px] flex-1 [&>header]:min-h-10">
            {buscador(buscarReciente, setBuscarReciente, 'Search recent patients')}
            {recientesFiltrados.length === 0 ? (
              <EmptyState
                icon={Users}
                title={buscarReciente ? 'No matching patients' : 'No patients yet'}
                detail={buscarReciente ? 'Try a different name.' : 'New patients will show up here.'}
                className="py-6"
              />
            ) : (
              <ShowMore total={recientesFiltrados.length} limit={LIMITE_RECIENTES} label="recent patients" enCaja llenarAlto className="flex flex-col gap-3">
                {(n) => recientesFiltrados.slice(0, n).map((r) => <PatientCard key={r.id} row={r} onEdit={setEditando} />)}
              </ShowMore>
            )}
          </Panel>
        </div>
      </div>

      {turnoEditando && (
        <NewAppointmentModal
          titulo="Edit Appointment"
          inicial={turnoEditando}
          onGuardar={() => { setTurnoEditando(null); aviso.ok('Appointment updated.') }}
          onClose={() => setTurnoEditando(null)}
        />
      )}
      {modal === 'new' && <NewPatientModal onClose={() => setModal(null)} />}
      {/* Mismo formulario que New Patient (variante con guardián), otro título.
          Se le pasa la fila para que guarde sobre ese paciente. */}
      {editando && (
        <NewPatientModal
          title="Edit Patient"
          forceGuardian
          editId={editando.id}
          inicial={{
            first: editando.name.split(' ')[0] ?? '',
            last: editando.name.split(' ').slice(1).join(' '),
            email: editando.email,
            birthday: editando.birthday,
          }}
          onClose={() => setEditando(null)}
        />
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};