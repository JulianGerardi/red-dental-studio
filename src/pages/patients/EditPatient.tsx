import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageTitle } from '@/components/ui/page-title'
import { Tabs } from '@/components/ui/tabs'
import { TextField, SelectField, OptionCheckbox, FormFooter } from '@/components/patients/form'
import { PatientBreadcrumb } from '@/components/patients/PatientBreadcrumb'
import {
  CamposDemography, CamposGeneral, CamposGuardian, limpiarPaciente, useFormPaciente, type SeccionPaciente,
} from '@/components/patients/PacienteCampos'
import { DrawerSection, useEnDrawer } from '@/components/ui/drawer'
import { aviso } from '@/components/ui/toaster'
import { DATOS_JOHN_SMITH, usePatients } from '@/data/patientsStore'
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

/* Edit Patient como pantalla, con la lógica de la ficha de una Location (Settings → Locations): título, pestañas debajo,
   cada sección en su card y Cancel / Save Changes abajo a la derecha. Las pestañas y la validación son las de antes
   (General / Guardian sólo para un menor / Demography; el error lleva a su pestaña). Ver patients.md, 2026-11-17. */
export default function EditPatientPage() {
  const { id = 'john-smith' } = useParams()
  const navigate = useNavigate()
  const { datosDe, updatePatient } = usePatients()
  const datos = datosDe(id) ?? DATOS_JOHN_SMITH
  /* La cuenta del portal que ya existía no se cambia desde acá: se muestra como "Linked". */
  const portalVinculado = datos.portal
  const f = useFormPaciente(datos, { portalVinculado })
  const [elegida, setSeccion] = useState<SeccionPaciente>('General')
  /* Guardian, sólo para un menor (patients.md, 2026-11-04): si deja de serlo, se vuelve a General. */
  const seccion = f.secciones.includes(elegida) ? elegida : 'General'
  const nombre = [datos.first, datos.last].filter(Boolean).join(' ') || 'Patient'

  /* Se vuelve a donde se estaba (la tabla o la ficha); si se entró directo, a la ficha del paciente. */
  const volver = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate(`/patients/${id}`))

  const guardar = () => {
    const error = f.revisar(f.secciones)
    if (error) { setSeccion(error.seccion); f.enfocar(error.campo); return }
    const guardado = limpiarPaciente(f.d, f.menor)
    updatePatient(id, guardado)
    aviso.ok(`${[guardado.first, guardado.last].filter(Boolean).join(' ')} has been updated.`)
    volver()
  }

  const comunes = { d: f.d, cambiar: f.cambiar, errores: f.errores }
  const panel = (s: SeccionPaciente, contenido: React.ReactNode) => (
    <div role="tabpanel" aria-label={s} hidden={seccion !== s} className={cn(TARJETA_PANEL, 'p-6')}>{contenido}</div>
  )
  return (
    <div className={CONTENEDOR_PAGINA}>
      <PatientBreadcrumb name={nombre} section="Edit Patient" />
      <PageTitle>Edit Patient</PageTitle>
      <Tabs
        className="mt-4" aria-label="Patient sections" value={seccion} onChange={setSeccion}
        tabs={f.secciones.map((s) => ({ value: s, alerta: f.conError(s) }))}
      />
      <div className="mt-4">
        {panel('General', <CamposGeneral {...comunes} portalVinculado={portalVinculado} />)}
        {f.menor && panel('Guardian', <CamposGuardian {...comunes} />)}
        {panel('Demography', <CamposDemography {...comunes} />)}
      </div>
      <div className="mt-4 flex justify-end gap-3">
        <FormFooter onCancel={volver} onSave={guardar} saveLabel="Save Changes" />
      </div>
    </div>
  )
}
