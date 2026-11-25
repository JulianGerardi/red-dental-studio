import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { X } from 'lucide-react'
import { Drawer, DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { TextArea, TextField } from '@/components/patients/form'
import { PermissionsPicker } from '@/components/settings/PermissionsPicker'
import { OBLIGATORIO } from '@/lib/validacion'
import type { Rol } from '@/data/roles'

/* New role y Duplicate role: dos pasos, General y Permissions (CON-3130). Edit role: las mismas dos partes en pestañas,
   las de Edit appointment, y un solo Save changes (CON-3131). Un rol del sistema se abre en sólo lectura, con Close (CON-4065). Ver roles.md. */
export type ModoRol = 'nuevo' | 'duplicar' | 'editar' | 'ver'

const PASOS = ['General', 'Permissions'] as const
type Parte = (typeof PASOS)[number]
const TITULO: Record<ModoRol, string> = { nuevo: 'New role', duplicar: 'Duplicate role', editar: 'Edit role', ver: 'View role' }

export function RoleDrawer({
  modo, rol, nombresUsados, onClose, onGuardar,
}: {
  modo: ModoRol
  /** El rol a editar, ver o duplicar. */
  rol?: Rol
  /** Nombres de los demás roles: el nombre tiene que ser único. */
  nombresUsados: string[]
  onClose: () => void
  onGuardar?: (d: { nombre: string; descripcion: string; permisos: string[] }) => void
}) {
  const soloLectura = modo === 'ver'
  const conPestanas = modo === 'editar' || modo === 'ver'
  /* Duplicar precarga todo, también el nombre: hay que cambiarlo, porque se repite (como red.dev). */
  const [nombre, setNombre] = useState(rol?.nombre ?? '')
  const [descripcion, setDescripcion] = useState(rol?.descripcion ?? '')
  const [permisos, setPermisos] = useState<string[]>(rol?.permisos ?? [])
  const [parte, setParte] = useState<Parte>('General')
  const [intentado, setIntentado] = useState(false)

  const paso = PASOS.indexOf(parte)
  const repetido = nombresUsados.some((n) => n.toLowerCase() === nombre.trim().toLowerCase())
  const errorNombre = intentado && !nombre.trim() ? OBLIGATORIO : intentado && repetido ? 'This role name is already in use.' : undefined
  const errorDescripcion = intentado && !descripcion.trim() ? OBLIGATORIO : undefined
  const generalOk = !!nombre.trim() && !!descripcion.trim() && !repetido
  const faltanPermisos = intentado && permisos.length === 0
  const incompleto = intentado && (!nombre.trim() || !descripcion.trim() || permisos.length === 0)

  const siguiente = () => {
    if (!generalOk) { setIntentado(true); return }
    setIntentado(false)
    setParte('Permissions')
  }
  const guardar = () => {
    if (!generalOk || permisos.length === 0) {
      setIntentado(true)
      if (!generalOk) setParte('General')
      return
    }
    onGuardar?.({ nombre: nombre.trim(), descripcion: descripcion.trim(), permisos })
    onClose()
  }

  const general = (
    <DrawerSection title="General information">
      {rol && soloLectura && (
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone={rol.activo ? 'success' : 'danger'} size="sm">{rol.activo ? 'Active' : 'Inactive'}</Pill>
          <Pill tone="neutral" size="sm">System role</Pill>
        </div>
      )}
      <TextField label="Name" required placeholder="Enter role name" value={nombre} onChange={setNombre} error={errorNombre} disabled={soloLectura} />
      <TextArea label="Description" required placeholder="Enter role description" value={descripcion} onChange={setDescripcion} error={errorDescripcion} disabled={soloLectura} rows={3} />
    </DrawerSection>
  )
  const lista = (
    <DrawerSection title="Permissions">
      {faltanPermisos && <p role="alert" className="text-[12px] text-field-error">Select at least one permission.</p>}
      <PermissionsPicker value={permisos} onChange={setPermisos} readOnly={soloLectura} />
    </DrawerSection>
  )

  const pie = soloLectura
    ? <Button variant="secondary" onClick={onClose}><X /> Close</Button>
    : conPestanas
      ? <DrawerActions onCancel={onClose} onSave={guardar} saveLabel="Save changes" />
      : <DrawerActions step={paso} total={PASOS.length} onNext={siguiente} onBack={() => setParte('General')} onCancel={onClose} onSave={guardar} />

  return (
    <Drawer
      open
      onClose={onClose}
      title={TITULO[modo]}
      size="xl"
      steps={conPestanas ? undefined : PASOS}
      step={paso}
      tabs={conPestanas ? <Tabs tabs={PASOS} value={parte} onChange={setParte} aria-label="Role sections" /> : undefined}
      footer={pie}
    >
      {incompleto && (
        <Alert tone="danger" title="Uncompleted fields" className="mb-4">All required fields marked with (*) must be completed before proceeding</Alert>
      )}
      {conPestanas ? (parte === 'General' ? general : lista) : (
        <>
          <DrawerStep index={0} step={paso}>{general}</DrawerStep>
          <DrawerStep index={1} step={paso}>{lista}</DrawerStep>
        </>
      )}
    </Drawer>
  )
}
`})))()}export{n,i as r,r as t};