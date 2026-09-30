import { useState } from 'react'
import { Trash2, CirclePlus, ChevronDown, ChevronUp, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { EmptyState } from '@/components/ui/empty-state'
import { ModalShell, SectionCard, SelectField, FormFooter, FieldLabel } from '@/components/patients/form'

/* Figma 3864:270946 "Settings — Employee (Roles & Location)" y el modal
   "Assign Role".

   Las locaciones son las del frame, tal cual —incluido "Naples Detal"—.

   Regla del sistema: **sin ninguna locación tildada, el rol vale para todas**.
   Por eso el rótulo del rol dice "All locations" cuando no hay ninguna, en vez
   de "0 / 4": cero seleccionadas no significa que el rol no aplique en ningún
   lado, significa lo contrario. */

export const SEDES = ['Buenos Aires Medical 1', 'Naples Detal', 'Sede Olivos', 'Sede Pruebas 1']

export const ROLES_DISPONIBLES = [
  'Practice Administrator', 'Administrator', 'Dentist', 'Hygienist', 'Receptionist', 'Assistant',
]

export type RolAsignado = { id: string; nombre: string; sedes: string[] }

export function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn(
        'flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors',
        on ? 'bg-dash-blue' : 'bg-line-strong',
      )}
    >
      <span className={cn('size-4 rounded-full bg-white transition-transform', on && 'translate-x-4')} />
    </button>
  )
}

export function FilaRol({
  rol, abierto, onAbrir, onCambiar, onBorrar,
}: {
  rol: RolAsignado
  abierto: boolean
  onAbrir: () => void
  onCambiar: (sedes: string[]) => void
  onBorrar: () => void
}) {
  const todas = rol.sedes.length === 0 || rol.sedes.length === SEDES.length

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border transition-colors',
        abierto ? 'border-dash-blue' : 'border-line',
      )}
    >
      <div className={cn('flex items-center gap-3 px-4 py-3.5', abierto ? 'bg-dash-count-bg' : 'bg-white')}>
        <span className="min-w-0 flex-1">
          <span className="text-[15px] font-bold text-ink">{rol.nombre}</span>
          <span className="ml-2 text-[13px] text-ink-muted">
            {rol.sedes.length === 0
              ? 'Global access'
              : `${rol.sedes.length} / ${SEDES.length} locations`}
          </span>
        </span>

        {/* "Global access" y no "All locations": es el nombre que usa el aviso
            del modal para la misma regla, y nombrar dos veces distinto la
            misma cosa es lo que hace dudar. */}
        <span className="hidden text-[13px] text-ink-muted sm:inline">Global access</span>
        <Switch
          on={todas}
          label={`Global access for ${rol.nombre}`}
          onChange={(v) => onCambiar(v ? [] : [SEDES[0]])}
        />
        <span className="h-5 w-px bg-line" />
        <button
          type="button"
          aria-label={`Remove ${rol.nombre}`}
          onClick={onBorrar}
          className="rounded p-1 text-ink hover:bg-dash-bad-bg hover:text-dash-bad-fg"
        >
          <Trash2 className="size-4" />
        </button>
        <button
          type="button"
          aria-label={abierto ? `Collapse ${rol.nombre}` : `Expand ${rol.nombre}`}
          aria-expanded={abierto}
          onClick={onAbrir}
          className="rounded p-1 text-ink hover:bg-black/5"
        >
          {abierto ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
        </button>
      </div>

      {abierto && (
        <div className="grid gap-3 border-t border-line bg-white p-4 sm:grid-cols-2 xl:grid-cols-4">
          {SEDES.map((s) => {
            const on = rol.sedes.includes(s)
            return (
              <div
                key={s}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-3 py-2.5 transition-colors',
                  on ? 'border-dash-blue' : 'border-line',
                )}
              >
                <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{s}</span>
                <Switch
                  on={on}
                  label={s}
                  onChange={(v) => onCambiar(v ? [...rol.sedes, s] : rol.sedes.filter((x) => x !== s))}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function AssignRoleModal({
  onGuardar, onClose,
}: {
  onGuardar: (rol: string, sedes: string[]) => void
  onClose: () => void
}) {
  const [rol, setRol] = useState('')
  const [sedes, setSedes] = useState<string[]>([])
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!rol) return
    onGuardar(rol, sedes)
    onClose()
  }

  return (
    /* Mismo modal que el resto de la app: título solo, sin ícono ni bajada, y
       las secciones en SectionCard con la misma jerarquía de títulos que New
       Patient o New Appointment. */
    <ModalShell
      title="Assign Role"
      width="max-w-[780px]"
      onClose={onClose}
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-5">
        <SelectField
          label="Role"
          required
          value={rol}
          onChange={setRol}
          options={ROLES_DISPONIBLES}
          error={intentado && !rol ? 'This field is required.' : undefined}
        />

        <SectionCard title="Locations">
          <div className="border-l-dash-blue bg-dash-count-bg flex gap-2 rounded-r-md border-l-[3px] px-3 py-2.5">
            <Info className="text-dash-blue mt-px size-4 shrink-0" />
            <span className="text-xs">
              <span className="text-dash-blue-hover block font-semibold">Global access</span>
              <span className="text-dash-blue-hover">
                No locations selected means this role applies to all locations in the account.
              </span>
            </span>
          </div>

          {/* Tres columnas como el frame; a 780 el nombre más largo
              —"Buenos Aires Medical 1"— entra sin cortarse. */}
          <div className="grid gap-x-5 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {SEDES.map((s) => (
              <div key={s} className="flex items-center gap-3">
                <span className="min-w-0 flex-1 truncate">
                  <FieldLabel>{s}</FieldLabel>
                </span>
                <Switch
                  on={sedes.includes(s)}
                  label={s}
                  onChange={(v) => setSedes(v ? [...sedes, s] : sedes.filter((x) => x !== s))}
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </ModalShell>
  )
}

export function RolesLocation() {
  const [roles, setRoles] = useState<RolAsignado[]>([
    { id: 'r1', nombre: 'Administrator', sedes: [SEDES[0]] },
    { id: 'r2', nombre: 'Dentist', sedes: [SEDES[3]] },
    { id: 'r3', nombre: 'Receptionist', sedes: [SEDES[1]] },
  ])
  const [abierto, setAbierto] = useState<string | null>('r2')
  const [modal, setModal] = useState(false)

  const cambiar = (id: string, sedes: string[]) =>
    setRoles((rs) => rs.map((r) => (r.id === id ? { ...r, sedes } : r)))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setModal(true)}
          className="text-dash-blue flex items-center gap-1.5 text-[13px] font-semibold hover:underline"
        >
          <CirclePlus className="size-4" /> Add Role
        </button>
      </div>

      {roles.length === 0 ? (
        <EmptyState
          icon={CirclePlus}
          title="No roles assigned"
          detail="Assign a role and choose the locations so this employee can work in the practice."
          accion={{ label: 'Add Role', onClick: () => setModal(true) }}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {roles.map((r) => (
            <FilaRol
              key={r.id}
              rol={r}
              abierto={abierto === r.id}
              onAbrir={() => setAbierto(abierto === r.id ? null : r.id)}
              onCambiar={(s) => cambiar(r.id, s)}
              onBorrar={() => {
                const indice = roles.findIndex((x) => x.id === r.id)
                setRoles((rs) => rs.filter((x) => x.id !== r.id))
                aviso.warn(`${r.nombre} was removed.`, {
                  label: 'Undo',
                  onClick: () => setRoles((rs) => [...rs.slice(0, indice), r, ...rs.slice(indice)]),
                })
              }}
            />
          ))}
        </div>
      )}

      {/* Cancel y Save los pone la pantalla, una sola vez al pie. */}

      {modal && (
        <AssignRoleModal
          onClose={() => setModal(false)}
          onGuardar={(nombre, sedes) => {
            const id = `r${Date.now()}`
            setRoles((rs) => [...rs, { id, nombre, sedes }])
            setAbierto(id)
            aviso.ok(
              sedes.length === 0
                ? `${nombre} assigned to all locations.`
                : `${nombre} assigned to ${sedes.length} location${sedes.length > 1 ? 's' : ''}.`,
            )
          }}
        />
      )}
    </div>
  )
}
