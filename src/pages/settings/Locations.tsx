import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Trash2, Plus, MapPin } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'

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
  const [q, setQ] = useState('')
  const [filas, setFilas] = useState(LOCACIONES)

  const visibles = useMemo(
    () => filas.filter((l) => `${l.nombre} ${l.info}`.toLowerCase().includes(q.trim().toLowerCase())),
    [filas, q],
  )

  const borrar = (l: Locacion) => {
    const indice = filas.findIndex((x) => x.id === l.id)
    setFilas((prev) => prev.filter((x) => x.id !== l.id))
    aviso.ok(`${l.nombre} was removed.`, {
      label: 'Undo',
      onClick: () => setFilas((prev) => [...prev.slice(0, indice), l, ...prev.slice(indice)]),
    })
  }

  return (
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-[#09090b]">Locations</h1>
      <p className="mt-1 text-sm text-[#71717a]">Set your location name. Add the location you need.</p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 sm:max-w-[320px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#a1a1aa]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search locations"
            className="focus:border-dash-blue h-9 w-full rounded-md border border-[#e4e4e7] bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-[#a1a1aa] focus:outline-none"
          />
        </div>
        <Link
          to="/settings/locations/new"
          className="bg-dash-blue hover:bg-dash-blue-hover ml-auto flex h-9 items-center gap-2 rounded-md px-4 text-[13px] font-medium text-white transition-colors"
        >
          <Plus className="size-4" /> New location
        </Link>
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-[#e7e7e7] bg-white">
        <div className="min-w-[760px]">
          <div className="flex h-12 items-center gap-3 border-b border-[#e7e7e7] bg-[#f9f9f9] px-4 text-xs font-semibold text-[#71717a]">
            <span className="w-[180px]">Location name</span>
            <span className="w-[100px]">Employees</span>
            <span className="w-[80px]">Room</span>
            <span className="min-w-0 flex-1">Information</span>
            <span className="w-[72px] text-right">Action</span>
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
                className="flex items-center gap-3 border-b border-[#e7e7e7] px-4 py-3 text-[13px] text-[#3f3f46] last:border-0"
              >
                {/* El nombre es el acceso, como en la tabla de pacientes. */}
                <Link
                  to={`/settings/locations/${l.id}`}
                  className="text-dash-blue w-[180px] truncate font-semibold hover:underline"
                >
                  {l.nombre}
                </Link>
                <span className="w-[100px]">{l.empleados}</span>
                <span className="w-[80px]">{l.salas}</span>
                <span className="min-w-0 flex-1 truncate">{l.info}</span>
                <span className="flex w-[72px] justify-end">
                  <button
                    type="button"
                    aria-label={`Delete ${l.nombre}`}
                    onClick={() => borrar(l)}
                    className="rounded p-1.5 text-[#09090b] transition-colors hover:bg-[#fff2f2] hover:text-[#dc2626]"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </span>
              </div>
            ))
          )}

          {visibles.length > 0 && (
            <div className="flex h-[52px] items-center px-4">
              <span className="text-xs font-semibold text-[#71717a]">
                Showing {visibles.length} of {filas.length} locations
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
