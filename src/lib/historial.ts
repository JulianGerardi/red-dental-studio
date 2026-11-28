import { useMemo, useSyncExternalStore } from 'react'
import { ENCUENTROS_HISTORIAL, ENCUENTRO_HOY, HISTORIA_PACIENTE, type Adenda, type EncuentroHistorial } from '@/data/historial'
import { useEstadoEncuentro } from '@/lib/encuentro'
import { largo, mailProvider, paciente as datosPaciente } from '@/components/dashboard/documentoTarea'
import { COMUNES, PDFS, htmlDe } from '@/pdfs/plantillas'
import { completar, type Datos } from '@/pdfs/marco'

/* El historial de encuentros de Patient Summary y lo que cambia al firmar una nota o sumarle un addendum. Vive fuera de
   React para que la tabla lo vea sin recargar (CON-3166). La nota es la plantilla Clinical note de src/pdfs (la que
   recibe el backend) completada con los eventos del encuentro. Ver clinical-mode.md (2026-11-27, Patient Summary). */

let encuentros = ENCUENTROS_HISTORIAL
const oyentes = new Set<() => void>()
const cambiar = (id: string, f: (e: EncuentroHistorial) => EncuentroHistorial) => {
  encuentros = encuentros.map((e) => (e.id === id ? f(e) : e))
  oyentes.forEach((o) => o())
}

/* El encuentro de hoy entra al historial cuando empieza (el botón de la barra, lib/encuentro) y queda con el estado
   con que se cerró: Completed o Discharged. Antes de empezar no aparece (Planned no se lista). */
let cerradoHoy = false
export function cerrarEncuentroHoy(estado: 'Completed' | 'Discharged') {
  cerradoHoy = true
  cambiar(ENCUENTRO_HOY, (e) => ({ ...e, estado, nota: 'Unsigned', firmada: undefined, adendas: undefined }))
}

export function useHistorial() {
  const todos = useSyncExternalStore((f) => { oyentes.add(f); return () => { oyentes.delete(f) } }, () => encuentros)
  const [encuentro] = useEstadoEncuentro()
  return useMemo(() => todos.flatMap((e): EncuentroHistorial[] =>
    e.id !== ENCUENTRO_HOY ? [e]
      : encuentro !== 'sinEmpezar' ? [{ ...e, estado: encuentro === 'enPausa' ? 'On hold' : 'In progress', nota: 'Unsigned', firmada: undefined, adendas: undefined }]
        : cerradoHoy ? [e] : []), [todos, encuentro])
}

/** Vuelve a los datos de arranque (Storybook y tests). */
export function reiniciarHistorial() { encuentros = ENCUENTROS_HISTORIAL; cerradoHoy = false; oyentes.forEach((o) => o()) }

const hora = (d: Date) => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

/** La nota firmada no cambia más, y un encuentro Completed pasa a Fulfilled (CON-2727). */
export function firmarNota(id: string) {
  const d = new Date()
  cambiar(id, (e) => ({ ...e, nota: 'Signed', firmada: largo(d), estado: e.estado === 'Completed' ? 'Fulfilled' : e.estado }))
}

/** Un addendum se suma al final, firmado por su autor, y no se edita ni se borra (CON-2730). */
export function agregarAdenda(id: string, adenda: Pick<Adenda, 'author' | 'text'>) {
  const d = new Date()
  cambiar(id, (e) => ({ ...e, adendas: [...(e.adendas ?? []), { ...adenda, created_at: `${largo(d)} at ${hora(d)}`, signed_date: largo(d) }] }))
}

/** La nota se firma con el encuentro terminado (CON-2727): Completed o Fulfilled. */
export const encuentroCerrado = (e: EncuentroHistorial) => e.estado === 'Completed' || e.estado === 'Fulfilled'
/** Hay nota para abrir o bajar: firmada o sin firmar. Un encuentro cancelado no tiene; una ajena puede estar restringida. */
export const tieneNota = (e: EncuentroHistorial) => e.nota === 'Signed' || e.nota === 'Unsigned'
/** La columna Exams: el encuentro cargó una condición o un examen (CON-2731). Los signos vitales solos no cuentan, como en
 *  red.dev; la nota igual los muestra en Exams. */
export const huboExamenes = ({ eventos: v }: EncuentroHistorial) =>
  [v.ros, v.physical, v.extraoral_findings, v.intraoral_findings, v.dental_assessment_findings, v.radiographic_exams, v.periodontal_exams].some((x) => x.length > 0)

const NOTAS_HTML = '<p>Patient responsibilities were discussed including but not limited to daily care, use/misuse, regular maintenance appointments, and routine examination of underlying oral tissues.</p><p>The patient was discharged to return home in satisfactory condition.</p>'
const hay = (x: unknown[]) => x.length > 0

/** Las variables de la plantilla Clinical note para un encuentro: sólo las secciones de lo que se hizo (CON-2975). */
export function datosNota(e: EncuentroHistorial, paciente: string): Datos {
  const p = datosPaciente(paciente)
  const edad = Math.floor((Date.now() - p.nacimiento.getTime()) / 31557600000)
  const provider = e.provider.replace(/^Dr\.\s*/, '')
  const v = e.eventos
  return {
    ...COMUNES,
    patient_name: paciente, patient_birth_date: `${largo(p.nacimiento)} (${edad} yrs)`, patient_phone: p.telefono, patient_email: p.email, patient_address: p.direccion,
    provider_name: provider, provider_email: mailProvider(provider),
    visit_date: largo(new Date(e.fecha)), visit_time: e.horario,
    auto_generated: !!e.automatica,
    ...HISTORIA_PACIENTE,
    encounter_questionnaires: [], has_history_questionnaires: false, history_questionnaires: [],
    has_exams: huboExamenes(e) || hay(v.vitals),
    has_ros: hay(v.ros), ros: v.ros,
    has_vitals: hay(v.vitals), vitals: v.vitals, out_of_range_values: '', vitals_notes: '',
    has_physical: hay(v.physical), physical: v.physical,
    has_extraoral: hay(v.extraoral_findings), extraoral_findings: v.extraoral_findings,
    has_intraoral: hay(v.intraoral_findings), intraoral_findings: v.intraoral_findings,
    dental_assessment: hay(v.dental_assessment_findings), dental_assessment_date: e.fecha, dental_assessment_no_findings: false,
    dental_assessment_findings: v.dental_assessment_findings, dental_assessment_reviewed: false, dental_assessment_review_note: '',
    radiographic_exams: v.radiographic_exams,
    periodontal_exams: v.periodontal_exams,
    has_treatment_plan: false, has_procedures: false, procedures: [], has_workflows: false, workflows: [],
    has_prescriptions: hay(v.prescriptions), prescriptions: v.prescriptions,
    has_lab_orders: hay(v.lab_orders), lab_orders: v.lab_orders,
    has_referrals: hay(v.referrals), referrals: v.referrals,
    clinical_notes_html: NOTAS_HTML,
    provider_signed_date: e.nota === 'Signed' ? e.firmada ?? '' : '', provider_signature_image: '',
    has_addenda: !!e.adendas?.length, addenda: e.adendas ?? [],
  }
}

const PLANTILLA = htmlDe(PDFS.find((x) => x.id === 'clinical-note')!)

/** La Clinical Note del encuentro: la hoja HTML de la plantilla, la misma en la pantalla y en el PDF. La pestaña se
 *  titula como la de red.dev ("Dental Clinical Note — <paciente>"). */
export const hojaNota = (e: EncuentroHistorial, paciente: string) =>
  completar(PLANTILLA, datosNota(e, paciente)).replace(/<title>[^<]*<\/title>/, `<title>Dental Clinical Note — ${paciente}</title>`)

/** Varias notas en un solo documento, cada una desde su página (Download de varias). */
export function hojasJuntas(hojas: string[]) {
  const cuerpo = (h: string) => h.slice(h.indexOf('<body>') + 6, h.lastIndexOf('</body>'))
  const [primera = '', ...resto] = hojas
  return primera
    .replace('</head>', '<style>@media print { .hoja + .hoja { break-before: page; } }</style></head>')
    .replace('</body>', `${resto.map(cuerpo).join('\n')}</body>`)
}
