import { useMemo, useState } from 'react'
import { Copy, Eye, Pencil, Plus, Power, ShieldCheck, Trash2 } from 'lucide-react'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { RoleDrawer, type ModoRol } from '@/components/settings/RoleDrawer'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { FilterMenu } from '@/components/ui/filter-menu'
import { Pill } from '@/components/ui/pill'
import { aviso } from '@/components/ui/toaster'
import { PADDING_PAGINA, TABLA_LINK } from '@/lib/estilos'
import { ROLES_INICIALES, type Rol } from '@/data/roles'

/* Settings → Roles (CON-3115): los roles de la cuenta con sus permisos. Misma estructura que el resto de las listas de
   Settings -título y New role, buscador y Filter, tabla con ⋮- en vez de las cards de red.dev, con los mismos datos.
   Los roles del sistema sólo se consultan y se duplican. Ver design-reference/figma/modulos/roles.md. */

const hoy = () => new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
const idDe = (nombre: string) => `${nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`

type Pregunta = { tipo: 'desactivar' | 'activar' | 'borrar'; rol: Rol }

export function SettingsRoles() {
  const [roles, setRoles] = useState(ROLES_INICIALES)
  const [q, setQ] = useState('')
  const [estados, setEstados] = useState<string[]>([])
  const [tipos, setTipos] = useState<string[]>([])
  const [drawer, setDrawer] = useState<{ modo: ModoRol; rol?: Rol } | null>(null)
  const [pregunta, setPregunta] = useState<Pregunta | null>(null)

  const filas = useMemo(() => roles.filter((r) =>
    (estados.length === 0 || estados.includes(r.activo ? 'Active' : 'Inactive'))
    && (tipos.length === 0 || tipos.includes(r.sistema ? 'System role' : 'Custom role'))
    && `${r.nombre} ${r.descripcion}`.toLowerCase().includes(q.trim().toLowerCase())), [roles, estados, tipos, q])

  const abrir = (r: Rol) => setDrawer({ modo: r.sistema ? 'ver' : 'editar', rol: r })
  const cambiar = (id: string, patch: Partial<Rol>) => setRoles((p) => p.map((r) => (r.id === id ? { ...r, ...patch, actualizado: hoy() } : r)))

  const columnas: DataTableColumn<Rol>[] = [
    {
      key: 'nombre', header: 'Name', locked: true,
      cell: (r) => (
        <span className="flex min-w-0 items-center gap-2">
          <button type="button" onClick={() => abrir(r)} title={r.nombre} className={TABLA_LINK}>{r.nombre}</button>
          {r.sistema && <Pill tone="neutral" size="sm">System role</Pill>}
        </span>
      ),
    },
    /* Sin anchos fijos: las cinco columnas se reparten el ancho por igual, como Subscription history (roles.md, 2026-11-25). */
    { key: 'descripcion', header: 'Description', cell: (r) => <TextCell>{r.descripcion}</TextCell> },
    { key: 'permisos', header: 'Permissions', cell: (r) => <span className="tabular-nums">{r.permisos.length}</span> },
    { key: 'actualizado', header: 'Last updated', cell: (r) => <span className="tabular-nums">{r.actualizado}</span> },
    { key: 'estado', header: 'Status', cell: (r) => <Pill tone={r.activo ? 'success' : 'danger'}>{r.activo ? 'Active' : 'Inactive'}</Pill> },
  ]

  const responder = () => {
    if (!pregunta) return
    const { tipo, rol } = pregunta
    setPregunta(null)
    if (rol.usuarios > 0 && tipo !== 'activar') return
    if (tipo === 'borrar') {
      const i = roles.findIndex((r) => r.id === rol.id)
      setRoles((p) => p.filter((r) => r.id !== rol.id))
      aviso.ok(`${rol.nombre} was deleted.`, { label: 'Undo', onClick: () => setRoles((p) => [...p.slice(0, i), rol, ...p.slice(i)]) })
      return
    }
    cambiar(rol.id, { activo: tipo === 'activar' })
    aviso.ok(tipo === 'activar' ? `${rol.nombre} is now active.` : `${rol.nombre} is now inactive.`)
  }

  /* Textos de CON-3181, CON-3229 y CON-3132. Con empleados activos no se puede: el aviso lo dice y sólo deja cerrar,
     como Unable to change working hours. */
  const textos = (p: Pregunta) => {
    const bloqueado = p.rol.usuarios > 0 && p.tipo !== 'activar'
    if (p.tipo === 'desactivar') return bloqueado
      ? { titulo: 'Error deactivating role', cuerpo: 'This role is assigned to active users. Reassign or remove all users before deactivating it.', boton: 'Close', bloqueado }
      : { titulo: 'Deactivate role', cuerpo: 'This role will be disabled and won’t be available for new assignments. You can reactivate it later.', boton: 'Deactivate', bloqueado }
    if (p.tipo === 'borrar') return bloqueado
      ? { titulo: 'Error deleting role', cuerpo: 'This role is assigned to active users. Reassign or remove all users before deleting it.', boton: 'Close', bloqueado }
      : { titulo: 'Delete role', cuerpo: 'This action is permanent and cannot be undone. The role will be removed from the system.', boton: 'Delete', bloqueado }
    return { titulo: 'Activate role', cuerpo: 'This role will be available for new assignments again.', boton: 'Activate', bloqueado }
  }
  const t = pregunta && textos(pregunta)

  return (
    <div className={PADDING_PAGINA}>
      <SettingsPageHeader
        titulo="Roles"
        accion={<Button size="md" onClick={() => setDrawer({ modo: 'nuevo' })}><Plus /> New role</Button>}
      >
        <SettingsSearch value={q} onChange={setQ} placeholder="Search roles" />
        <FilterMenu
          groups={[
            { title: 'Status', value: estados, onChange: setEstados, options: ['Active', 'Inactive'].map((e) => ({ value: e, count: roles.filter((r) => r.activo === (e === 'Active')).length })) },
            { title: 'Type', value: tipos, onChange: setTipos, options: ['System role', 'Custom role'].map((e) => ({ value: e, count: roles.filter((r) => r.sistema === (e === 'System role')).length })) },
          ]}
        />
      </SettingsPageHeader>

      <div className="mt-4">
        <DataTable
          columns={columnas}
          rows={filas}
          rowKey={(r) => r.id}
          rowLabel={(r) => r.nombre}
          empty={roles.length === 0
            ? { icon: ShieldCheck, title: 'No roles found.', detail: 'Create a role to group permissions and assign them to your team.' }
            : { icon: ShieldCheck, title: 'No roles found.', detail: 'Try a different name, status or type.' }}
          rowActions={(r) => r.sistema ? (
            <>
              <DropdownMenuItem onSelect={() => abrir(r)}><Eye className="size-4 shrink-0" /> View permissions</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setDrawer({ modo: 'duplicar', rol: r })}><Copy className="size-4 shrink-0" /> Duplicate</DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onSelect={() => abrir(r)}><Pencil className="size-4 shrink-0" /> Edit</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setDrawer({ modo: 'duplicar', rol: r })}><Copy className="size-4 shrink-0" /> Duplicate</DropdownMenuItem>
              {r.activo
                ? <DropdownMenuItem variant="destructive" onSelect={() => setPregunta({ tipo: 'desactivar', rol: r })}><Power className="size-4 shrink-0" /> Deactivate</DropdownMenuItem>
                : <DropdownMenuItem onSelect={() => setPregunta({ tipo: 'activar', rol: r })}><Power className="size-4 shrink-0" /> Activate</DropdownMenuItem>}
              <DropdownMenuItem variant="destructive" onSelect={() => setPregunta({ tipo: 'borrar', rol: r })}><Trash2 className="size-4 shrink-0" /> Delete</DropdownMenuItem>
            </>
          )}
        />
      </div>

      {drawer && (
        <RoleDrawer
          key={`${drawer.modo}-${drawer.rol?.id ?? 'nuevo'}`}
          modo={drawer.modo}
          rol={drawer.rol}
          nombresUsados={roles.filter((r) => drawer.modo !== 'editar' || r.id !== drawer.rol?.id).map((r) => r.nombre)}
          onClose={() => setDrawer(null)}
          onGuardar={(d) => {
            if (drawer.modo === 'editar' && drawer.rol) {
              cambiar(drawer.rol.id, d)
              aviso.ok(`${d.nombre} was updated.`)
              return
            }
            setRoles((p) => [{ id: idDe(d.nombre), ...d, activo: true, sistema: false, actualizado: hoy(), usuarios: 0 }, ...p])
            aviso.ok(`${d.nombre} was created.`)
          }}
        />
      )}

      {pregunta && t && (
        <ConfirmDialog
          title={t.titulo}
          tone={pregunta.tipo === 'activar' || t.bloqueado ? 'primary' : 'danger'}
          icon={pregunta.tipo === 'borrar' && !t.bloqueado ? 'delete' : t.bloqueado ? 'warning' : undefined}
          confirmLabel={t.boton}
          hideCancel={t.bloqueado}
          onCancel={() => setPregunta(null)}
          onConfirm={responder}
        >
          {t.cuerpo}
        </ConfirmDialog>
      )}
    </div>
  )
}
