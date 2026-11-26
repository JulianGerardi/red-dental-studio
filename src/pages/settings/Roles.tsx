import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Copy, Eye, Pencil, Plus, Power, ShieldCheck, Trash2 } from 'lucide-react'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { RoleCard } from '@/components/settings/RoleCard'
import { PermissionsPicker } from '@/components/settings/PermissionsPicker'
import { Card } from '@/components/settings/primitives'
import { FormFooter, TextArea, TextField } from '@/components/patients/form'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { EmptyState } from '@/components/ui/empty-state'
import { FilterMenu } from '@/components/ui/filter-menu'
import { Pill } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { aviso } from '@/components/ui/toaster'
import { PADDING_PAGINA } from '@/lib/estilos'
import { OBLIGATORIO } from '@/lib/validacion'
import { useAvisoSalida } from '@/lib/useAvisoSalida'
import { useRoles } from '@/data/rolesStore'
import type { Rol } from '@/data/roles'

/* Settings → Roles (CON-3115): los roles de la cuenta en cards, como la portada de Settings, y cada rol en su página con
   pestañas y un solo Save, como la ficha de una Location (Julián, 2026-11-26). Los roles del sistema sólo se consultan y se
   duplican. Ver design-reference/figma/modulos/roles.md. */

export const LISTA_ROLES = '/settings/roles'
export const rutaRol = (id: string) => `${LISTA_ROLES}/${id}`
const rutaDuplicar = (id: string) => `${LISTA_ROLES}/new?from=${id}`

type Pregunta = { tipo: 'desactivar' | 'activar' | 'borrar'; rol: Rol }

/* Textos de CON-3181, CON-3229 y CON-3132. Con empleados activos no se puede: el aviso lo dice y sólo deja cerrar, como
   Unable to change working hours. */
function textos(p: Pregunta) {
  const bloqueado = p.rol.usuarios > 0 && p.tipo !== 'activar'
  if (p.tipo === 'desactivar') return bloqueado
    ? { titulo: 'Error deactivating role', cuerpo: 'This role is assigned to active users. Reassign or remove all users before deactivating it.', boton: 'Close', bloqueado }
    : { titulo: 'Deactivate role', cuerpo: 'This role will be disabled and won’t be available for new assignments. You can reactivate it later.', boton: 'Deactivate', bloqueado }
  if (p.tipo === 'borrar') return bloqueado
    ? { titulo: 'Error deleting role', cuerpo: 'This role is assigned to active users. Reassign or remove all users before deleting it.', boton: 'Close', bloqueado }
    : { titulo: 'Delete role', cuerpo: 'This action is permanent and cannot be undone. The role will be removed from the system.', boton: 'Delete', bloqueado }
  return { titulo: 'Activate role', cuerpo: 'This role will be available for new assignments again.', boton: 'Activate', bloqueado }
}

export function SettingsRoles() {
  const navigate = useNavigate()
  const { roles, cambiar, borrar } = useRoles()
  const [q, setQ] = useState('')
  const [estados, setEstados] = useState<string[]>([])
  const [tipos, setTipos] = useState<string[]>([])
  const [pregunta, setPregunta] = useState<Pregunta | null>(null)

  const visibles = useMemo(() => roles.filter((r) =>
    (estados.length === 0 || estados.includes(r.activo ? 'Active' : 'Inactive'))
    && (tipos.length === 0 || tipos.includes(r.sistema ? 'System role' : 'Custom role'))
    && `${r.nombre} ${r.descripcion}`.toLowerCase().includes(q.trim().toLowerCase())), [roles, estados, tipos, q])

  const responder = () => {
    if (!pregunta) return
    const { tipo, rol } = pregunta
    setPregunta(null)
    if (rol.usuarios > 0 && tipo !== 'activar') return
    if (tipo === 'borrar') {
      const deshacer = borrar(rol.id)
      aviso.ok(`${rol.nombre} was deleted.`, { label: 'Undo', onClick: deshacer })
      return
    }
    cambiar(rol.id, { activo: tipo === 'activar' })
    aviso.ok(tipo === 'activar' ? `${rol.nombre} is now active.` : `${rol.nombre} is now inactive.`)
  }
  const t = pregunta && textos(pregunta)

  return (
    <div className={PADDING_PAGINA}>
      <SettingsPageHeader
        titulo="Roles"
        accion={<Button size="md" onClick={() => navigate(`${LISTA_ROLES}/new`)}><Plus /> New role</Button>}
      >
        <SettingsSearch value={q} onChange={setQ} placeholder="Search roles" />
        <FilterMenu
          groups={[
            { title: 'Status', value: estados, onChange: setEstados, options: ['Active', 'Inactive'].map((e) => ({ value: e, count: roles.filter((r) => r.activo === (e === 'Active')).length })) },
            { title: 'Type', value: tipos, onChange: setTipos, options: ['System role', 'Custom role'].map((e) => ({ value: e, count: roles.filter((r) => r.sistema === (e === 'System role')).length })) },
          ]}
        />
      </SettingsPageHeader>

      {visibles.length === 0 ? (
        <EmptyState
          icon={ShieldCheck} title="No roles found." className="mt-4 py-16"
          detail={roles.length === 0 ? 'Create a role to group permissions and assign them to your team.' : 'Try a different name, status or type.'}
        />
      ) : (
        <ul aria-label="Roles" className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibles.map((r) => (
            <li key={r.id}>
              <RoleCard
                rol={r} to={rutaRol(r.id)}
                acciones={r.sistema ? (
                  <>
                    <DropdownMenuItem onSelect={() => navigate(rutaRol(r.id))}><Eye className="size-4 shrink-0" /> View permissions</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => navigate(rutaDuplicar(r.id))}><Copy className="size-4 shrink-0" /> Duplicate</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onSelect={() => navigate(rutaRol(r.id))}><Pencil className="size-4 shrink-0" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => navigate(rutaDuplicar(r.id))}><Copy className="size-4 shrink-0" /> Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {r.activo
                      ? <DropdownMenuItem variant="destructive" onSelect={() => setPregunta({ tipo: 'desactivar', rol: r })}><Power className="size-4 shrink-0" /> Deactivate</DropdownMenuItem>
                      : <DropdownMenuItem onSelect={() => setPregunta({ tipo: 'activar', rol: r })}><Power className="size-4 shrink-0" /> Activate</DropdownMenuItem>}
                    <DropdownMenuItem variant="destructive" onSelect={() => setPregunta({ tipo: 'borrar', rol: r })}><Trash2 className="size-4 shrink-0" /> Delete</DropdownMenuItem>
                  </>
                )}
              />
            </li>
          ))}
        </ul>
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

const PESTANAS = ['General', 'Permissions'] as const
type Pestana = (typeof PESTANAS)[number]

/* La página de un rol, como la ficha de una Location: título, pestañas General y Permissions, cards y Cancel · Save al pie.
   Sin pasos. /new es New role; /new?from=<id> duplica (CON-3130: precarga todo, el nombre hay que cambiarlo); un rol del
   sistema se ve en sólo lectura, sin Save (CON-4065). */
export function SettingsRole() {
  const { roleId } = useParams()
  const [params] = useSearchParams()
  const { roles } = useRoles()
  const nuevo = !roleId
  const origen = nuevo ? roles.find((r) => r.id === params.get('from')) : undefined
  const rol = nuevo ? undefined : roles.find((r) => r.id === roleId)
  if (!nuevo && !rol) return <Navigate to={LISTA_ROLES} replace />
  return <FormularioRol key={rol?.id ?? `nuevo-${origen?.id ?? ''}`} rol={rol} origen={origen} />
}

function FormularioRol({ rol, origen }: { rol?: Rol; origen?: Rol }) {
  const navigate = useNavigate()
  const { roles, crear, cambiar } = useRoles()
  const base = rol ?? origen
  const soloLectura = !!rol?.sistema
  const [nombre, setNombre] = useState(base?.nombre ?? '')
  const [descripcion, setDescripcion] = useState(base?.descripcion ?? '')
  const [permisos, setPermisos] = useState<string[]>(base?.permisos ?? [])
  const [pestana, setPestana] = useState<Pestana>('General')
  const [intentado, setIntentado] = useState(false)

  const repetido = roles.some((r) => r.id !== rol?.id && r.nombre.toLowerCase() === nombre.trim().toLowerCase())
  const errorNombre = intentado && !nombre.trim() ? OBLIGATORIO : intentado && repetido ? 'This role name is already in use.' : undefined
  const errorDescripcion = intentado && !descripcion.trim() ? OBLIGATORIO : undefined
  const generalOk = !!nombre.trim() && !!descripcion.trim() && !repetido
  const faltanPermisos = intentado && permisos.length === 0
  const cambiado = !rol || nombre !== rol.nombre || descripcion !== rol.descripcion || JSON.stringify(permisos) !== JSON.stringify(rol.permisos)
  const salida = useAvisoSalida(!soloLectura && cambiado && (!!rol || !!nombre || !!descripcion || permisos.length > 0))

  const guardar = () => {
    if (!generalOk || permisos.length === 0) {
      setIntentado(true)
      setPestana(!generalOk ? 'General' : 'Permissions')
      return
    }
    const datos = { nombre: nombre.trim(), descripcion: descripcion.trim(), permisos }
    if (rol) {
      cambiar(rol.id, datos)
      setIntentado(false)
      aviso.ok(`${datos.nombre} was updated.`)
      return
    }
    crear(datos)
    aviso.ok(`${datos.nombre} was created.`)
    navigate(LISTA_ROLES)
  }

  const titulo = rol ? rol.nombre : origen ? 'Duplicate role' : 'New role'

  return (
    <div className={PADDING_PAGINA}>
      <SettingsPageHeader
        titulo={titulo}
        etiquetas={rol && (
          <>
            <Pill tone={rol.activo ? 'success' : 'danger'} size="sm">{rol.activo ? 'Active' : 'Inactive'}</Pill>
            {rol.sistema && <Pill tone="neutral" size="sm">System role</Pill>}
          </>
        )}
        accion={soloLectura && rol ? <Button size="md" variant="secondary" onClick={() => navigate(rutaDuplicar(rol.id))}><Copy /> Duplicate</Button> : undefined}
      />

      <Tabs
        size="sm" className="mt-4" aria-label="Role sections" value={pestana} onChange={setPestana}
        tabs={[
          { value: 'General', alerta: intentado && !generalOk },
          { value: 'Permissions', count: permisos.length, alerta: faltanPermisos },
        ]}
      />

      <div className="mt-4 flex flex-col gap-4">
        {intentado && (!generalOk || permisos.length === 0) && (
          <Alert tone="danger" title="Uncompleted fields">All required fields marked with (*) must be completed before proceeding</Alert>
        )}
        {pestana === 'General' ? (
          <Card title="General information">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Name" required placeholder="Enter role name" value={nombre} onChange={setNombre} error={errorNombre} disabled={soloLectura} />
              <TextArea label="Description" required placeholder="Enter role description" value={descripcion} onChange={setDescripcion} error={errorDescripcion} disabled={soloLectura} rows={3} />
            </div>
          </Card>
        ) : (
          <Card title="Permissions">
            {faltanPermisos && <p role="alert" className="mb-3 text-[12px] text-field-error">Select at least one permission.</p>}
            <PermissionsPicker value={permisos} onChange={setPermisos} readOnly={soloLectura} />
          </Card>
        )}

        {!soloLectura && (
          <div className="flex justify-end gap-3">
            <FormFooter onCancel={() => salida.ir(LISTA_ROLES)} onSave={guardar} saveLabel={rol ? 'Save changes' : 'Save'} saveDisabled={!!rol && !cambiado} />
          </div>
        )}
      </div>
      {salida.dialogo}
    </div>
  )
}
