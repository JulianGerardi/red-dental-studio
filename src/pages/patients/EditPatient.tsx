import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageTitle } from '@/components/ui/page-title'
import { FormFooter } from '@/components/patients/form'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import {
  CamposContacto, CamposDemography, CamposDireccion, CamposGeneral, duplicadoDe, useFormPaciente,
} from '@/components/patients/PacienteCampos'
import { DrawerSection, useEnDrawer } from '@/components/ui/drawer'
import { Card } from '@/components/settings/primitives'
import { EditableAvatar } from '@/components/ui/editable-avatar'
import { Alert } from '@/components/ui/alert'
import { Pill } from '@/components/ui/pill'
import { aviso } from '@/components/ui/toaster'
import { DATOS_JOHN_SMITH, usePatients } from '@/data/patientsStore'
import { clavePacienteFoto, usePhoto } from '@/lib/usePhoto'
import { CONTENEDOR_PAGINA, TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  /* En el drawer va sin caja, como en Confidentally 2.0. */
  if (useEnDrawer()) return <DrawerSection title={title}>{children}</DrawerSection>
  return (
    <section className={cn(TARJETA_PANEL, 'p-6')}>
      <h2 className="text-sm font-bold text-ink">{title}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}

/* Edit Patient con el formato de la ficha de un empleado (Settings → Employees): una sola pantalla, sin pestañas, con la
   foto editable, el nombre y su estado arriba, y General, Contact, Address y Demographic en cards apiladas (CON-1329).
   Sin Guardian ni el buscador de personas: la edición no vincula a nadie. Un solo Save Changes; si falta algo, lleva al
   campo. Cuelga de la tabla: migas, Cancel y Save vuelven a Patients. Ver patients.md, 2026-11-18. */
/* `pacienteId` es para Storybook: abrir la pantalla con un paciente sin pasar por la ruta. */
export default function EditPatientPage({ pacienteId = 'john-smith' }: { pacienteId?: string }) {
  const { id = pacienteId } = useParams()
  const navigate = useNavigate()
  const { patients, datosDe, getPatient, updatePatient } = usePatients()
  const datos = datosDe(id) ?? DATOS_JOHN_SMITH
  const fila = getPatient(id)
  /* La cuenta del portal que ya existía no se cambia desde acá: se muestra como "Linked". */
  const portalVinculado = datos.portal
  const f = useFormPaciente(datos, { edicion: true })
  const [foto, setFoto] = usePhoto(clavePacienteFoto(id))
  const [duplicado, setDuplicado] = useState<string | null>(null)
  const nombre = fila?.name ?? [datos.first, datos.last].filter(Boolean).join(' ')
  const estado = fila?.status ?? 'Active'
  const volver = () => navigate('/patients')

  const guardar = () => {
    const error = f.revisar(f.secciones)
    if (error) { f.enfocar(error.campo); return }
    const repetido = duplicadoDe(patients, f.d, id)
    setDuplicado(repetido)
    if (repetido) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    updatePatient(id, f.d)
    aviso.ok(`${[f.d.first, f.d.last].filter(Boolean).join(' ')} has been updated.`)
    volver()
  }

  const comunes = { d: f.d, cambiar: f.cambiar, errores: f.errores, conTitulo: false }
  return (
    <div className={CONTENEDOR_PAGINA}>
      <div className="mb-4"><Breadcrumb items={[{ label: 'Patients', to: '/patients' }, { label: 'Edit Patient' }]} /></div>
      <PageTitle>Edit Patient</PageTitle>
      <div className="mt-4 flex flex-col gap-4">
        {duplicado && <Alert tone="danger" title={duplicado}>Check the name and email, or find the existing patient in the list.</Alert>}
        <Card>
          <div className="flex items-center gap-3">
            <EditableAvatar foto={foto} iniciales={(fila?.initials ?? nombre.split(' ').map((p) => p[0]).join('')).toUpperCase()} onChange={setFoto} label={nombre} size={56} />
            <span className="min-w-0">
              <span className="block truncate text-xl font-bold text-ink">{nombre}</span>
              <Pill tone={estado === 'Active' ? 'success' : 'neutral'} className="mt-1">{estado}</Pill>
            </span>
          </div>
          <h2 className="mt-5 mb-4 text-sm font-bold text-ink">General Information</h2>
          <CamposGeneral {...comunes} portalVinculado={portalVinculado} />
        </Card>
        <Card title="Contact Information"><CamposContacto {...comunes} /></Card>
        <Card title="Address Information"><CamposDireccion {...comunes} /></Card>
        <Card title="Demographic Information"><CamposDemography {...comunes} /></Card>
      </div>
      <div className="mt-4 flex justify-end gap-3">
        <FormFooter onCancel={volver} onSave={guardar} saveLabel="Save Changes" />
      </div>
    </div>
  )
}
