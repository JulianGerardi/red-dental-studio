import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, Search, Plus, CalendarDays, Users } from 'lucide-react'
import { PatientsTable, type PatientRow } from '@/components/patients/PatientsTable'
import { PatientCard } from '@/components/patients/PatientCard'
import { usePatients } from '@/data/patientsStore'
import { PageTitle } from '@/components/ui/page-title'
import { SearchButton } from '@/components/ui/search-button'
import { EmptyState } from '@/components/ui/empty-state'
import { NewPatientModal } from '@/pages/patients/NewPatientModal'
import { Panel } from '@/components/dashboard/primitives'
import { AppointmentCard } from '@/components/dashboard/AppointmentCard'
import { HOY_DEMO, datosDelDia } from '@/components/dashboard/dashboard-data'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* Barra lateral junto a la tabla, no arriba: reemplaza al estante de
   "Active"/"Recent Patients" en grilla de la vuelta anterior. Mismos paneles
   que el Dashboard -Panel + AppointmentCard- para Today Appointments, así la
   card de turno es una sola en todo el sistema y no una versión propia acá,
   en su variante \`compact\` (sin los chips TR/CC ni Check Out).
   La altura de la barra la fija la tabla, no el contenido: se mide con
   ResizeObserver -mismo patrón que \`useAnchoVisible\` en ledger- y se publica
   como variable CSS; cada panel es \`flex-1\` con scroll propio adentro de esa
   altura, así ninguno de los tres bloques queda más alto que los otros. */
const CANTIDAD_TURNOS = 4
const CANTIDAD_PACIENTES = 4

/* Globo con el total -no el filtrado ni el visible- al lado del título del
   panel, mismo color que el de notificaciones de la campana. */
function Globo({ n }: { n: number }) {
  return (
    <span className="bg-dash-blue flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold text-white">
      {n}
    </span>
  )
}

/* "View all" en el header del panel, mismo lugar y estilo que "All treatment"
   en TreatmentPlanList. Se esconde solo si no hay nada de más para mostrar. */
function BotonVerTodos({
  total, cantidad, mostrando, onToggle,
}: {
  total: number
  cantidad: number
  mostrando: boolean
  onToggle: () => void
}) {
  if (total <= cantidad) return null
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-dash-blue flex shrink-0 items-center gap-0.5 text-[12px] font-semibold hover:underline"
    >
      {mostrando ? 'Show less' : 'View all'}
      <ChevronRight className={cn('size-3.5 transition-transform', mostrando && 'rotate-90')} />
    </button>
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
  const [verTodosTurnos, setVerTodosTurnos] = useState(false)
  const [verTodosPacientes, setVerTodosPacientes] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const contenidoRef = useRef<HTMLDivElement>(null)

  /* La barra lateral no tiene alto propio: toma el de este bloque -búsqueda
     + tabla-, que es su hermano en la fila. La variable se publica en el
     padre común porque un hijo no ve el CSS custom property de su hermano. */
  useEffect(() => {
    const el = contenidoRef.current
    if (!el) return
    const medir = () => el.parentElement?.style.setProperty('--patients-alto', \`\${el.getBoundingClientRect().height}px\`)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    window.addEventListener('resize', medir)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', medir)
    }
  }, [])

  const rows = useMemo(
    () => patients.filter((r) => r.name.toLowerCase().includes(query.toLowerCase())),
    [patients, query],
  )

  /* La barra lateral muestra siempre el mismo pulso de la cuenta: no se
     filtra por la búsqueda de la tabla, igual que las cards de resumen de
     Billing. "View all" saca el tope de a uno; buscar en Today Appointments
     también lo saca -no tendría sentido recortar un resultado que se buscó
     a propósito-. */
  const recientesVisibles = useMemo(
    () => (verTodosPacientes ? patients : patients.slice(0, CANTIDAD_PACIENTES)),
    [patients, verTodosPacientes],
  )
  const turnosHoyTodos = useMemo(() => datosDelDia(HOY_DEMO).appointments, [])
  const turnosFiltrados = useMemo(
    () => turnosHoyTodos.filter((a) => a.name.toLowerCase().includes(buscarTurno.toLowerCase())),
    [turnosHoyTodos, buscarTurno],
  )
  const buscandoTurno = buscarTurno.length > 0
  const turnosVisibles = buscandoTurno || verTodosTurnos
    ? turnosFiltrados
    : turnosFiltrados.slice(0, CANTIDAD_TURNOS)

  return (
    <div className={CONTENEDOR_PAGINA}>
      {/* Era un <button> sin acción. Ahora es el mismo link que en el
          resto de las pantallas del módulo. */}
      <Link to="/patients" className="flex items-center gap-1 self-start text-sm text-[#0056ef]">
        Patients <ChevronDown className="size-[15px]" />
      </Link>

      {/* Misma disposición que el resto de las listas: el botón principal va
          en la fila del título -antes quedaba abajo, al lado del buscador- y
          la búsqueda pasa a su propia fila. */}
      <div className="mt-[15px] flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-[9px]">
          <PageTitle>Patients</PageTitle>
          {/* Copy de locación en una pantalla de pacientes: es del Figma. */}
          <p className="text-xs leading-[17px] text-[#a3a3a3]">
            Set your location name. Add the location you need.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModal('new')}
          data-tour="pat-new"
          className="bg-dash-blue hover:bg-dash-blue-hover flex h-[33px] shrink-0 items-center justify-center gap-2 rounded-md px-5 text-[13px] font-medium text-white transition-colors"
        >
          <Plus className="size-3.5" /> New Patient
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start">
        <div ref={contenidoRef} className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
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

        {/* Al costado de la tabla, no arriba: mismo Panel que usa el Dashboard,
            para que la card de turno sea la misma en las dos pantallas. La
            altura tope sale de --patients-alto (ver el effect de arriba) y
            cada panel es flex-1 con scroll propio, así ninguno de los tres
            bloques le gana altura a los otros. Sin tope en mobile: ahí la
            barra va debajo de la tabla y puede ser tan alta como haga falta. */}
        <div className="flex w-full flex-col gap-4 lg:w-[336px] lg:shrink-0 lg:max-h-[var(--patients-alto,none)] lg:overflow-hidden">
          <Panel
            title={<>Today Appointments <Globo n={turnosHoyTodos.length} /></>}
            className="flex-1"
            bodyClassName="min-h-0 gap-2"
            controls={
              <BotonVerTodos
                total={turnosHoyTodos.length} cantidad={CANTIDAD_TURNOS}
                mostrando={verTodosTurnos} onToggle={() => setVerTodosTurnos((v) => !v)}
              />
            }
          >
            <div className="relative shrink-0">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-ink-faint" />
              <input
                value={buscarTurno}
                onChange={(e) => setBuscarTurno(e.target.value)}
                placeholder="Search today's appointments"
                className="focus:border-dash-blue h-8 w-full rounded-md border border-line bg-white pr-2 pl-8 text-[12px] placeholder:text-ink-faint focus:outline-none"
              />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
              {turnosVisibles.length === 0 ? (
                <EmptyState
                  icon={CalendarDays}
                  title={buscandoTurno ? 'No matching appointments' : 'No appointments today'}
                  detail={buscandoTurno ? 'Try a different name.' : 'Your schedule is clear for today.'}
                  className="py-6"
                />
              ) : (
                turnosVisibles.map((a, i) => <AppointmentCard key={i} appt={a} compact />)
              )}
            </div>
          </Panel>

          <Panel
            title={<>Recent Patients <Globo n={patients.length} /></>}
            className="flex-1"
            bodyClassName="min-h-0 gap-3 overflow-y-auto"
            controls={
              <BotonVerTodos
                total={patients.length} cantidad={CANTIDAD_PACIENTES}
                mostrando={verTodosPacientes} onToggle={() => setVerTodosPacientes((v) => !v)}
              />
            }
          >
            {recientesVisibles.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No patients yet"
                detail="New patients will show up here."
                className="py-6"
              />
            ) : (
              recientesVisibles.map((r) => <PatientCard key={r.id} row={r} onEdit={setEditando} />)
            )}
          </Panel>
        </div>
      </div>

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