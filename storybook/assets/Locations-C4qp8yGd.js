import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Pencil, Trash2, Plus, MapPin } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'
import { SearchButton } from '@/components/ui/search-button'
import { aviso } from '@/components/ui/toaster'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'

/* Settings → Locations. La tabla de entrada: nombre, empleados, salas e
   información de contacto. El detalle de cada fila —Information / Working
   Hours / Rooms / Exceptions— vive en LocationDetail.tsx. */

type Locacion = { id: string; nombre: string; empleados: number; salas: number; info: string }

export const LOCACIONES: Locacion[] = [
  { id: 'abril', nombre: 'Abril', empleados: 12, salas: 4, info: '789 N Sunrise Street, Los Angeles' },
  { id: 'alaska', nombre: 'Alaska Medical', empleados: 7, salas: 3, info: '1220 W 5th Ave, Anchorage' },
  { id: 'bayside', nombre: 'Bayside Dental', empleados: 9, salas: 5, info: '450 Biscayne Blvd, Miami' },
  { id: 'northgate', nombre: 'Northgate Clinic', empleados: 5, salas: 2, info: '9800 Aurora Ave N, Seattle' },
  { id: 'riverside', nombre: 'Riverside Care', empleados: 4, salas: 2, info: '310 Congress Ave, Austin' },
]

export function SettingsLocations() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [filas, setFilas] = useState(LOCACIONES)
  const inputRef = useRef<HTMLInputElement>(null)

  const visibles = useMemo(
    () => filas.filter((l) => \`\${l.nombre} \${l.info}\`.toLowerCase().includes(q.trim().toLowerCase())),
    [filas, q],
  )

  const borrar = (l: Locacion) => {
    const indice = filas.findIndex((x) => x.id === l.id)
    setFilas((prev) => prev.filter((x) => x.id !== l.id))
    aviso.ok(\`\${l.nombre} was removed.\`, {
      label: 'Undo',
      onClick: () => setFilas((prev) => [...prev.slice(0, indice), l, ...prev.slice(indice)]),
    })
  }

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Locations"
        bajada="Set your location name. Add the location you need."
        accion={(
          <Link
            to="/settings/locations/new"
            data-tour="set-locations"
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 shrink-0 items-center gap-2 rounded-md px-4 text-[13px] font-medium text-white transition-colors"
          >
            <Plus className="size-4" /> New location
          </Link>
        )}
      >
        <div className="relative min-w-0 flex-1 sm:max-w-[320px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search locations"
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <SearchButton onClick={() => inputRef.current?.focus()} className="h-9" />
      </SettingsPageHeader>

      <div className="mt-4 overflow-x-auto rounded-lg border border-line-row bg-white">
        <div className="min-w-[760px]">
          <div className="flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
            <span className="w-[180px]">Location name</span>
            <span className="w-[100px]">Employees</span>
            <span className="w-[80px]">Room</span>
            <span className="min-w-0 flex-1">Information</span>
            <span className="w-[60px] text-right">Actions</span>
          </div>

          {visibles.length === 0 ? (
            <EmptyState
              icon={MapPin}
              title={filas.length === 0 ? 'No locations yet' : 'No locations found'}
              detail={
                filas.length === 0
                  ? 'Add your first location to start assigning employees and rooms.'
                  : 'Try a different name or address.'
              }
              className="border-0"
            />
          ) : (
            visibles.map((l) => (
              <div
                key={l.id}
                className="flex items-center gap-3 border-t border-line-row px-3 py-3 text-[13px] text-ink-soft"
              >
                {/* El nombre es el acceso, como en la tabla de pacientes. */}
                <Link
                  to={\`/settings/locations/\${l.id}\`}
                  className="text-dash-blue w-[180px] truncate font-semibold hover:underline"
                >
                  {l.nombre}
                </Link>
                <span className="w-[100px]">{l.empleados}</span>
                <span className="w-[80px]">{l.salas}</span>
                <span className="min-w-0 flex-1 truncate">{l.info}</span>
                <span className="flex w-[60px] justify-end">
                  <RowActionsMenu label={l.nombre}>
                    <DropdownMenuItem onSelect={() => navigate(\`/settings/locations/\${l.id}\`)}>
                      <Pencil className="size-4 shrink-0" /> Edit location
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onSelect={() => borrar(l)}>
                      <Trash2 className="size-4 shrink-0" /> Delete location
                    </DropdownMenuItem>
                  </RowActionsMenu>
                </span>
              </div>
            ))
          )}

          {visibles.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3">
              <span className="text-xs font-semibold text-ink-muted">
                Showing {visibles.length} of {filas.length} locations
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};