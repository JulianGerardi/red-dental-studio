import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageTitle } from '@/components/ui/page-title'
import { TextField, SelectField, OptionCheckbox, FormFooter } from '@/components/patients/form'
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

/* Figma 3640:72713 "Patients — Edit Patient (Full Page)".
   Tres secciones a 1088 de ancho: General (2×2 + 1 full), Demography
   (7 full-width + un checkbox) y Address (3 filas de 2). */

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  /* En el drawer va sin caja, como en Confidentally 2.0. */
  if (useEnDrawer()) return <DrawerSection title={title}>{children}</DrawerSection>
  return (
    <section className={cn(TARJETA_PANEL, 'p-6')}>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}

/* El cuerpo de la página del Figma 3640:72713, con campos fijos. La app ya no lo usa: Edit Patient es EditPatientPage,
   con los datos del paciente (patients.md, 2026-11-17). */
export function EditPatientForm() {
  return (
    <div className="flex flex-col gap-6">
      <Section title="General Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="First Name" required placeholder="John" />
          <TextField label="Middle Name" placeholder="Lorem" />
          <TextField label="Last Name" required placeholder="Smith" />
          <TextField label="Preferred Name" placeholder="Johnny" />
          <TextField label="Email" placeholder="john.smith@hotmail.com" />
        </div>
      </Section>

      <Section title="Demography Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Gender" required />
          <SelectField label="Race" />
          <SelectField label="Ethnicity" />
          <SelectField label="Profession" />
          <SelectField label="Nationality" />
          <SelectField label="Language" />
          <SelectField label="Religion" />
        </div>
        <OptionCheckbox label="Interpreter Required" />
      </Section>

      <Section title="Address Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Address Line 1" placeholder="Street and number" />
          <TextField label="Address Line 2" placeholder="Apartment, suite, etc." />
          <SelectField label="Country" required />
          <SelectField label="State" required />
          <TextField label="City" required placeholder="City" />
          <TextField label="ZIP Code" placeholder="00000" />
        </div>
      </Section>
    </div>
  )
}

/* Edit Patient con el formato de la ficha de un empleado (Settings → Employees): una sola pantalla, sin pestañas, con la
   foto editable, el nombre y su estado arriba, y General, Contact, Address y Demographic en cards apiladas (CON-1329).
   Sin Guardian ni el buscador de personas: la edición no vincula a nadie. Un solo Save Changes; si falta algo, lleva al
   campo. Cuelga de la tabla: migas, Cancel y Save vuelven a Patients. Ver patients.md, 2026-11-18. */
export default function EditPatientPage() {
  const { id = 'john-smith' } = useParams()
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
          <h3 className="mt-5 mb-4 text-sm font-bold text-ink">General Information</h3>
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
