import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Pencil, Trash2, Plus, MapPin } from 'lucide-react'
import { SearchButton } from '@/components/ui/search-button'
import { aviso } from '@/components/ui/toaster'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { NewLocationDrawer } from '@/components/settings/NewLocationDrawer'
import { DataTable, TextCell } from '@/components/ui/data-table'
import { TABLA_LINK } from '@/lib/estilos'

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

/* `nuevo`: la ruta /settings/locations/new abre la lista con el drawer de New Location ya abierto. */
export function SettingsLocations({ nuevo = false }: { nuevo?: boolean }) {
  const navigate = useNavigate()
  const [creando, setCreando] = useState(nuevo)
  const cerrar = () => { setCreando(false); if (nuevo) navigate('/settings/locations', { replace: true }) }
  const [q, setQ] = useState('')
  const [filas, setFilas] = useState(LOCACIONES)
  const inputRef = useRef<HTMLInputElement>(null)

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
      <SettingsPageHeader
        titulo="Locations"
        bajada="Set your location name. Add the location you need."
        accion={(
          <Button data-tour="set-locations" onClick={() => setCreando(true)}>
            <Plus /> New location
          </Button>
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

      <div className="mt-4">
        <DataTable
          columns={[
            /* El nombre es el acceso, como en la tabla de pacientes. */
            { key: 'nombre', header: 'Location name', width: 180, cell: (l) => <Link to={`/settings/locations/${l.id}`} className={TABLA_LINK}>{l.nombre}</Link> },
            { key: 'empleados', header: 'Employees', width: 100, cell: (l) => l.empleados },
            { key: 'salas', header: 'Room', width: 80, cell: (l) => l.salas },
            { key: 'info', header: 'Information', cell: (l) => <TextCell>{l.info}</TextCell> },
          ]}
          rows={visibles}
          rowKey={(l) => l.id}
          rowLabel={(l) => l.nombre}
          pageSize={Math.max(visibles.length, 1)}
          itemLabel="locations"
          empty={filas.length === 0
            ? { icon: MapPin, title: 'No locations yet', detail: 'Add your first location to start assigning employees and rooms.' }
            : { icon: MapPin, title: 'No locations found', detail: 'Try a different name or address.' }}
          rowActions={(l) => (
            <>
              <DropdownMenuItem onSelect={() => navigate(`/settings/locations/${l.id}`)}>
                <Pencil className="size-4 shrink-0" /> Edit location
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onSelect={() => borrar(l)}>
                <Trash2 className="size-4 shrink-0" /> Delete location
              </DropdownMenuItem>
            </>
          )}
        />
      </div>

      {creando && (
        <NewLocationDrawer
          onClose={cerrar}
          onGuardar={(l) => {
            setFilas((p) => [{ id: l.nombre.toLowerCase().replace(/\s+/g, '-'), nombre: l.nombre, empleados: 0, salas: 0, info: l.info }, ...p])
            aviso.ok(`${l.nombre} was added to your locations.`)
          }}
        />
      )}
    </div>
  )
}
