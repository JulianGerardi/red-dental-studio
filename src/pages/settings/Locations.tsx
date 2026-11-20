import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { PADDING_PAGINA } from '@/lib/estilos'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, Trash2, Plus, MapPin } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { NewLocationDrawer } from '@/components/settings/NewLocationDrawer'
import { DataTable, TextCell } from '@/components/ui/data-table'

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
    <div className={PADDING_PAGINA}>
      <SettingsPageHeader
        titulo="Locations"
        accion={(
          <Button size="md" data-tour="set-locations" onClick={() => setCreando(true)}>
            <Plus /> New location
          </Button>
        )}
      >
        <SettingsSearch value={q} onChange={setQ} placeholder="Search locations" />
      </SettingsPageHeader>

      <div className="mt-4">
        <DataTable
          columns={[
            /* El nombre es el acceso, como en la tabla de pacientes. */
            { key: 'nombre', header: 'Name', width: 180, cell: (l) => <TextCell>{l.nombre}</TextCell> },
            { key: 'empleados', header: 'Employees', width: 100, cell: (l) => l.empleados },
            { key: 'salas', header: 'Rooms', width: 80, cell: (l) => l.salas },
            { key: 'info', header: 'Address', cell: (l) => <TextCell>{l.info}</TextCell> },
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
                <Pencil className="size-4 shrink-0" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onSelect={() => borrar(l)}>
                <Trash2 className="size-4 shrink-0" /> Delete
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
