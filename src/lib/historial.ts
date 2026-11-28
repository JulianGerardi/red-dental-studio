import { useMemo, useSyncExternalStore } from 'react'
import { ENCUENTROS_HISTORIAL, ENCUENTRO_HOY, type Adenda, type EncuentroHistorial } from '@/data/historial'
import { useEstadoEncuentro } from '@/lib/encuentro'
import { HISTORIA_MEDICA, NOTAS_ADICIONALES, largo, paciente as datosPaciente, type Documento, type Seccion } from '@/components/dashboard/documentoTarea'

/* El historial de encuentros de Patient Summary y lo que cambia al firmar una nota o sumarle un addendum. Vive fuera de
   React para que la tabla lo vea sin recargar (CON-3166). Ver clinical-mode.md (2026-11-27, Patient Summary). */

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

const ahora = () => `${largo(new Date())} at ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`

/** La nota firmada no cambia más, y un encuentro Completed pasa a Fulfilled (CON-2727). */
export function firmarNota(id: string) {
  cambiar(id, (e) => ({ ...e, nota: 'Signed', firmada: ahora(), estado: e.estado === 'Completed' ? 'Fulfilled' : e.estado }))
}

/** Un addendum se suma al final y no se edita ni se borra (CON-2730). */
export function agregarAdenda(id: string, adenda: Pick<Adenda, 'autor' | 'texto'>) {
  cambiar(id, (e) => ({ ...e, adendas: [...(e.adendas ?? []), { ...adenda, fecha: ahora() }] }))
}

/** La nota se firma con el encuentro terminado (CON-2727): Completed o Fulfilled. */
export const encuentroCerrado = (e: EncuentroHistorial) => e.estado === 'Completed' || e.estado === 'Fulfilled'
/** Hay nota para abrir o bajar: firmada o sin firmar. Un encuentro cancelado no tiene; una ajena puede estar restringida. */
export const tieneNota = (e: EncuentroHistorial) => e.nota === 'Signed' || e.nota === 'Unsigned'

export const AVISO_AUTOMATICA = 'Generated automatically when the encounter closed after 48 hours without activity. Workflow narratives are not included.'

/** La Clinical Note del encuentro, con el formato de red.dev: sólo las secciones de lo que se hizo (CON-2975). La misma
 *  arma la hoja de la pantalla y el PDF. */
export function documentoEncuentro(e: EncuentroHistorial, paciente: string): Documento {
  const p = datosPaciente(paciente)
  const edad = Math.floor((Date.now() - p.nacimiento.getTime()) / 31557600000)
  const visita = new Date(e.fecha)
  const provider = e.provider.replace(/^Dr\.\s*/, '')
  const ordenes = (titulo: string, lista: EncuentroHistorial['recetas']): Seccion[] =>
    lista.length ? [{ titulo, listas: lista.map((o): [string, string[]] => [o.titulo, o.lineas]) }] : []
  /* La nota que se generó sola no trae las narrativas de los workflows (CON-2937). */
  const workflows = e.automatica ? [] : e.workflows ?? []
  return {
    titulo: 'Dental Clinical Note',
    paciente,
    provider,
    firmado: e.nota === 'Signed' ? e.firmada : undefined,
    aviso: e.automatica ? AVISO_AUTOMATICA : undefined,
    adendas: e.adendas,
    secciones: [
      { titulo: 'Dental Clinical Note', campos: [
        ['Patient name', paciente], ['Date of birth', `${largo(p.nacimiento)} (${edad} yrs)`],
        ['Date of visit', `${largo(visita)} — ${e.horario}`], ['Attending dentist', provider], ['Contact', p.telefono],
      ] },
      ...(e.vitales?.length ? [{ titulo: 'Vital Signs', listas: [['Patient vitals were taken:', e.vitales]] } satisfies Seccion] : []),
      HISTORIA_MEDICA,
      ...(e.examenes.length ? [{ titulo: 'Exams', listas: e.examenes.map((x): [string, string[]] => [x.nombre, x.hallazgos]) } satisfies Seccion] : []),
      ...(e.procedimientos.length ? [{ titulo: 'Operative Report', listas: [['Procedure', e.procedimientos.map((x) => `${x.codigo} — ${x.nombre}${x.zona ? ` on ${x.zona}` : ''} [${x.estado}].`)]] } satisfies Seccion] : []),
      ...(workflows.length ? [{ titulo: 'Workflows', listas: workflows.map(([nombre, narrativa]): [string, string[]] => [nombre, [narrativa]]) } satisfies Seccion] : []),
      ...ordenes('Prescriptions', e.recetas),
      ...ordenes('Lab Orders', e.laboratorios),
      ...ordenes('Referrals', e.derivaciones),
      NOTAS_ADICIONALES,
    ],
  }
}

/** "Dental Clinical Note - Julio Perez - 11-27-2026.pdf". */
export const archivoNota = (e: EncuentroHistorial, paciente: string) => `Dental Clinical Note - ${paciente} - ${e.fecha.replaceAll('/', '-')}.pdf`
