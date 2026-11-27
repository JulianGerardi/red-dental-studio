import { useEffect, useState } from 'react'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { documentoTarea, hash, ordenLab, type Documento, type Seccion } from '@/components/dashboard/documentoTarea'
/* Ciclo a propósito (tareas usa documentoRegistro y frenoDeAccion): los dos se llaman sólo dentro de funciones. */
import { avisarTareas, suscribirTareas, tareaViva } from '@/components/dashboard/tareas'
import { PROCEDIMIENTOS, PROCEDIMIENTOS_ORDEN, PROVEEDORES_DERIVACION, VINCULOS_PROCEDIMIENTO, type DatosDerivacion, type ProveedorDerivacion } from '@/data/clinical-mode'
import { ITEMS_INICIALES } from '@/data/clinicalItems'
import { LABORATORIOS, type Denticion, type Laboratorio } from '@/data/laboratorios'
import { fraseDeUso, medicacion, nombreMedicacion, type DatosReceta } from '@/data/recetas'
import { CASOS, NO_ASIGNADOS } from '@/data/treatment-plan'
import type { Adjunto, ProcedimientoFicha } from './FichaClinica'
import type { SuperficieLab } from './dental/RuedaSuperficies'

/* Los registros de Clinical Mode que comparten flujo: Lab order, Prescription y Referral. Cada uno es una tarea
   (`PendingTask`: estado, provider, fechas, documento) más su contenido, y vive fuera de React como las tareas: lo que se
   crea, edita o cambia de estado en la ficha se ve en la tabla, en Pending Task y en el PDF. El estado lo manda
   `dashboard/tareas` (la máquina de estados y las preguntas). Ver design-reference/figma/modulos/clinical-mode.md
   (2026-11-27). */

export type TipoRegistro = 'Lab orders' | 'Prescriptions' | 'Referrals'
export const TIPOS_REGISTRO: TipoRegistro[] = ['Lab orders', 'Prescriptions', 'Referrals']

export type DatosLab = {
  laboratorio: string
  asap: boolean
  procedimientos: string[]
  /** La arcada que se ve; los dientes de las dos denticiones conviven (dentición mixta). */
  denticion: Denticion | null
  dientes: string[]
  superficies: Record<string, SuperficieLab[]>
  trabajo: string
  indicaciones: string
  adjuntos: Adjunto[]
}

export type Registro = PendingTask & {
  id: string
  kind: TipoRegistro
  /** Last update. */
  updated: string
  lab?: DatosLab
  receta?: DatosReceta
  derivacion?: DatosDerivacion
}

/* ── Los procedimientos que cada registro puede vincular ── */

const conCaso = (id: string) => CASOS.find((c) => c.id === VINCULOS_PROCEDIMIENTO[id]?.caso?.id)
const ficha = (p: (typeof PROCEDIMIENTOS)[number]): ProcedimientoFicha => ({ ...p, pieza: p.pieza ? String(p.pieza) : undefined })

/** Lab order (CON-3904): sueltos en Planned, o Pending / In progress de un caso aceptado. */
export const PROCEDIMIENTOS_LAB: ProcedimientoFicha[] = PROCEDIMIENTOS.flatMap((p) => {
  const caso = conCaso(p.id)
  if (!caso) return p.estado === 'Planned' ? [ficha(p)] : []
  return caso.aceptado && ['Waiting for consent', 'Accepted', 'In progress'].includes(caso.estado) && ['Pending', 'In progress'].includes(p.estado)
    ? [{ ...ficha(p), caso: caso.nombre }]
    : []
})

/** Referral (CON-2322): sólo procedimientos Planned del paciente, los sueltos del Treatment plan y los de un caso. */
export const PROCEDIMIENTOS_REFERRAL: ProcedimientoFicha[] = [
  ...NO_ASIGNADOS.slice(0, 5).map((p) => ({ id: p.id, codigo: p.codigo, nombre: p.nombre, estado: 'Planned' as const, fecha: p.fecha, pieza: p.pieza, superficie: p.superficie, ubicacion: p.ubicacion })),
  ...PROCEDIMIENTOS.filter((p) => p.estado === 'Planned').map((p) => ({ ...ficha(p), caso: conCaso(p.id)?.nombre })),
]

/* ── Contenido de ejemplo ── */

const LAB_VACIO: DatosLab = { laboratorio: '', asap: false, procedimientos: [], denticion: null, dientes: [], superficies: {}, trabajo: '', indicaciones: '', adjuntos: [] }

const RECETAS: DatosReceta[] = [
  { indicaciones: 'Take with food. Stop and call the office if a rash appears.', medicaciones: [
    medicacion({ nombre: 'Amoxicillin', fuerza: '500', unidadFuerza: 'mg', forma: 'Oral capsule', cantidad: '21', refills: '0', dosis: '1', unidadDosis: 'Capsules', via: 'Oral', frecuencia: 'Three times daily', duracion: '7' }),
    medicacion({ nombre: 'Ibuprofen', fuerza: '400', unidadFuerza: 'mg', forma: 'Oral tablet', cantidad: '20', refills: '0', dosis: '1', unidadDosis: 'Tablets', via: 'Oral', frecuencia: 'Every 4 to 6 hours', duracion: '5' }),
  ] },
  { indicaciones: '', medicaciones: [
    medicacion({ nombre: 'Chlorhexidine gluconate', fuerza: '0.12', unidadFuerza: '%', forma: 'Mouthwash', cantidad: '1', refills: '1', dosis: '1', unidadDosis: 'Tablespoons', via: 'Oral', frecuencia: 'Twice daily', duracion: '2', unidadDuracion: 'Weeks' }),
  ] },
  { indicaciones: 'Do not drive after taking this medication.', medicaciones: [
    medicacion({ nombre: 'Clonazepam', fuerza: '1', unidadFuerza: 'mg', forma: 'Oral tablet', cantidad: '2', refills: '0', controlada: true, generico: false, dosis: '1', unidadDosis: 'Tablets', via: 'Oral', frecuencia: 'At bedtime', duracion: '2' }),
  ] },
  { indicaciones: '', medicaciones: [
    medicacion({ nombre: 'Ibuprofen', fuerza: '600', unidadFuerza: 'mg', forma: 'Oral tablet', cantidad: '12', refills: '0', dosis: '1', unidadDosis: 'Tablets', via: 'Oral', frecuencia: 'Three times daily', duracion: '4' }),
  ] },
]

const NOTAS = [
  'Please evaluate tooth 19 for root canal treatment. The patient reports lingering pain to cold.',
  'Impacted lower third molars, close to the inferior alveolar nerve. Please evaluate for surgical extraction.',
  'Generalized pocketing of 5 to 6 mm after scaling and root planing. Please evaluate for periodontal surgery.',
]

/* El contenido de una tarea de Pending Task que todavía no se abrió, fijo por id: el mismo que arma su PDF. */
function contenidoDe(t: PendingTask): Pick<Registro, 'lab' | 'receta' | 'derivacion'> {
  const n = hash(t.id ?? t.person)
  if (t.kind === 'Lab orders') {
    const o = ordenLab(t)
    return { lab: {
      ...LAB_VACIO, laboratorio: o.lab.nombre, procedimientos: PROCEDIMIENTOS_ORDEN, denticion: o.denticion, trabajo: o.trabajo,
      dientes: o.piezas.map(([d]) => d), superficies: Object.fromEntries(o.piezas.filter(([, s]) => s.length).map(([d, s]) => [d, s as SuperficieLab[]])),
    } }
  }
  if (t.kind === 'Prescriptions') return { receta: RECETAS[n % RECETAS.length]! }
  const i = n % PROVEEDORES_DERIVACION.length
  return { derivacion: { proveedor: PROVEEDORES_DERIVACION[i]!.nombre, nota: NOTAS[i % NOTAS.length]!, procedimientos: ['pr12'], asap: false, obligatoria: false, adjuntos: i === 0 ? [{ nombre: 'periapical-19.jpg', bytes: 8806 }] : [] } }
}

const PACIENTE = { person: 'John Smith', initials: 'JS', patientId: 'john-smith' }
const [MARTINEZ, ANDERSON, CHEN] = ['Dr. Elena Martinez', 'Dr. Daniel Anderson', 'Dr. Emily Chen']

type Fila = [estado: string, provider: string, creado: string, actualizado: string, vence: string]
const semilla = (kind: TipoRegistro, clave: string, filas: Fila[]): Registro[] =>
  filas.map(([state, provider, register, updated, expiration], i) => {
    const base: PendingTask = { id: `${clave}-${i + 1}`, kind, state, ...PACIENTE, provider, register, expiration }
    return { ...base, id: base.id!, kind, updated, pdf: kind === 'Lab orders' ? !['Pending', 'Canceled'].includes(state) : state === (kind === 'Prescriptions' ? 'Active' : 'Requested'), ...contenidoDe(base) }
  })

const SEMILLA: Registro[] = [
  ...semilla('Lab orders', 'lab', [
    ['Pending', MARTINEZ, '11/20/2026', '11/20/2026', '12/18/2026'],
    ['Requested', MARTINEZ, '11/12/2026', '11/13/2026', '12/04/2026'],
    ['Requested', ANDERSON, '11/05/2026', '11/06/2026', '11/30/2026'],
    ['Delayed', MARTINEZ, '10/14/2026', '11/02/2026', '11/10/2026'],
    ['Pending', CHEN, '10/28/2026', '10/28/2026', '12/10/2026'],
    ['Delivered', MARTINEZ, '09/22/2026', '10/09/2026', '10/12/2026'],
    ['Rejected', ANDERSON, '09/03/2026', '09/08/2026', '09/30/2026'],
    ['Canceled', MARTINEZ, '08/18/2026', '08/19/2026', '09/15/2026'],
    ['Delivered', CHEN, '07/06/2026', '07/24/2026', '07/27/2026'],
  ]),
  ...semilla('Prescriptions', 'rx', [
    ['Pending', MARTINEZ, '11/24/2026', '11/24/2026', '12/24/2026'],
    ['Active', MARTINEZ, '11/10/2026', '11/10/2026', '01/10/2027'],
    ['Active', ANDERSON, '10/30/2026', '10/30/2026', '12/30/2026'],
    ['Pending', CHEN, '10/21/2026', '10/21/2026', '12/21/2026'],
    ['Expired', MARTINEZ, '08/31/2026', '08/31/2026', '09/30/2026'],
    ['Canceled', MARTINEZ, '06/30/2026', '07/02/2026', '07/30/2026'],
    ['Expired', ANDERSON, '06/05/2026', '06/05/2026', '07/05/2026'],
  ]),
  ...semilla('Referrals', 'ref', [
    ['Pending', MARTINEZ, '11/22/2026', '11/22/2026', '12/22/2026'],
    ['Requested', MARTINEZ, '11/09/2026', '11/10/2026', '12/09/2026'],
    ['Pending', ANDERSON, '10/27/2026', '10/27/2026', '11/27/2026'],
    ['Requested', CHEN, '10/15/2026', '10/16/2026', '11/15/2026'],
    ['Completed', MARTINEZ, '09/08/2026', '10/01/2026', '10/08/2026'],
    ['Rejected', MARTINEZ, '08/11/2026', '08/20/2026', '09/11/2026'],
    ['Canceled', ANDERSON, '07/02/2026', '07/03/2026', '08/02/2026'],
  ]),
]

/* ── Almacén ── */

let registros: Registro[] = SEMILLA

export const hoy = () => new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })

/** Los registros de un tipo con su estado al día; los borrados no están. */
export const registrosDe = (kind: TipoRegistro): Registro[] =>
  registros.filter((r) => r.kind === kind).map((r) => tareaViva(r)).filter((r) => !r.borrada)

export const registroDe = (id: string | undefined) => TIPOS_REGISTRO.flatMap(registrosDe).find((r) => r.id === id)

/** Crea o reemplaza un registro (New y Save de la ficha). */
export function guardarRegistro(r: Registro) {
  registros = registros.some((x) => x.id === r.id) ? registros.map((x) => (x.id === r.id ? r : x)) : [r, ...registros]
  avisarTareas()
}

/** La tarea de Pending Task que abrió Complete this task entra a su tabla, con su contenido, si todavía no estaba. */
export function asegurarRegistro(t: PendingTask | undefined) {
  if (!t?.id || !TIPOS_REGISTRO.includes(t.kind as TipoRegistro) || registros.some((r) => r.id === t.id)) return
  registros = [{ ...t, id: t.id, kind: t.kind as TipoRegistro, updated: t.register, ...contenidoDe(t) }, ...registros]
}

let serie = 1
/** Un registro nuevo, en Pending, a nombre del provider del encuentro (CON-2215: se registra el proveedor y la fecha). */
export const nuevoRegistro = (kind: TipoRegistro, paciente?: Pick<PendingTask, 'person' | 'initials' | 'patientId'>): Registro => ({
  id: `nuevo-${kind.toLowerCase().replace(/\s+/g, '-')}-${serie++}`, kind, state: 'Pending', ...PACIENTE, ...paciente, provider: MARTINEZ,
  register: hoy(), updated: hoy(), expiration: '', pdf: false,
})

export function useRegistros(kind: TipoRegistro) {
  const [, redibujar] = useState(0)
  useEffect(() => suscribirTareas(() => redibujar((n) => n + 1)), [])
  return registrosDe(kind)
}

/* Los laboratorios y los providers de derivación: los de ejemplo más los creados con New laboratory / New provider, que
   quedan para los registros que siguen, para la tabla y para el PDF. */
let laboratoriosCreados: Laboratorio[] = []
export const laboratorios = () => [...LABORATORIOS, ...laboratoriosCreados]
export const agregarLaboratorio = (l: Laboratorio) => { laboratoriosCreados = [...laboratoriosCreados, l] }
let proveedoresCreados: ProveedorDerivacion[] = []
export const proveedoresDerivacion = () => [...PROVEEDORES_DERIVACION, ...proveedoresCreados]
export const agregarProveedor = (p: ProveedorDerivacion) => { proveedoresCreados = [...proveedoresCreados, p] }

/* ── Reglas que dependen del contenido ── */

/* CON-2337: no se activa una receta si una de sus medicaciones marcadas *Update patient medications* ya está Active en
   la historia del paciente. Las medicaciones de ejemplo del paciente no tienen ninguna Active (sus estados son los del
   Figma de Medical History), así que hoy la regla no frena nada. */
const ACTIVAS = () => ITEMS_INICIALES.Medication.filter((m) => String(m.status) === 'Active').map((m) => m.name.toLowerCase())
export function frenoDeAccion(t: PendingTask, accion: string): string | undefined {
  if (accion !== 'Activate') return undefined
  const repetida = registroDe(t.id)?.receta?.medicaciones.find((m) => m.actualizar && ACTIVAS().includes(m.nombre.toLowerCase()))
  return repetida && `The medication ${repetida.nombre} is already active in the patient’s history.`
}

/* ── El documento (PDF) con el contenido del registro ── */

const procedimientosDe = (ids: string[], catalogo: ProcedimientoFicha[]) => catalogo.filter((p) => ids.includes(p.id))
const zona = (p: ProcedimientoFicha) => (p.pieza && p.pieza !== '-' ? `Tooth ${p.pieza}${p.superficie && p.superficie !== '-' ? ` · ${p.superficie}` : ''}` : p.ubicacion && p.ubicacion !== '-' ? p.ubicacion : '')
const lineaProcedimiento = (p: ProcedimientoFicha) => [`${p.codigo} - ${p.nombre}`, zona(p)].filter(Boolean).join(' · ')

/** El documento de una tarea o de un registro: el de la tarea (documentoTarea) con lo cargado en su ficha. */
export function documentoRegistro(t: PendingTask): Documento {
  const base = documentoTarea(t)
  const r = registroDe(t.id)
  if (!r) return base
  if (r.lab) {
    const lab = laboratorios().find((l) => l.nombre === r.lab!.laboratorio)
    const porDenticion = (d: Denticion) => r.lab!.dientes.filter((x) => /^\d+$/.test(x) === (d === 'Permanent'))
    const dientes: Seccion[] = (['Permanent', 'Primary'] as const).filter((d) => porDenticion(d).length).map((d) => ({
      titulo: 'Teeth & Surface Specifications', dientes: { denticion: d, piezas: porDenticion(d).map((x): [string, string[]] => [x, r.lab!.superficies[x] ?? []]) },
    }))
    const procedimientos = procedimientosDe(r.lab.procedimientos, PROCEDIMIENTOS_LAB)
    return { ...base, secciones: [
      ...base.secciones.slice(0, 2),
      { titulo: 'Receiving Laboratory', campos: [['Name', r.lab.laboratorio], ['Phone', lab?.telefono ?? '-'], ['Email', lab?.email ?? '-'], ['Address', lab?.direccion ?? '-']] },
      ...base.secciones.slice(3, 4),
      ...(procedimientos.length ? [{ titulo: 'Procedures', parrafos: procedimientos.map(lineaProcedimiento) }] : []),
      { titulo: 'Dental Work Request', parrafos: [r.lab.asap ? `ASAP. ${r.lab.trabajo}` : r.lab.trabajo] },
      ...(r.lab.indicaciones.trim() ? [{ titulo: 'Special Instructions', parrafos: [r.lab.indicaciones] }] : []),
      ...dientes,
    ] }
  }
  if (r.receta) {
    return { ...base, secciones: [
      ...base.secciones,
      { titulo: 'Medications', listas: r.receta.medicaciones.map((m): [string, string[]] => [
        `${nombreMedicacion(m)} · ${m.forma}`,
        [fraseDeUso(m), `Quantity to dispense: ${m.cantidad} · Refills: ${m.refills || '0'}`, m.generico ? 'Generic substitution allowed' : 'No generic substitution', ...(m.controlada ? ['Controlled substance'] : [])].filter(Boolean),
      ]) },
      ...(r.receta.indicaciones.trim() ? [{ titulo: 'Additional Instructions', parrafos: [r.receta.indicaciones] }] : []),
    ] }
  }
  if (r.derivacion) {
    const d = r.derivacion
    const destino = proveedoresDerivacion().find((p) => p.nombre === d.proveedor)
    const procedimientos = procedimientosDe(d.procedimientos, PROCEDIMIENTOS_REFERRAL)
    const marcas = [d.asap && 'ASAP', d.obligatoria && 'Mandatory to continue treatment'].filter((x): x is string => !!x)
    return { ...base, secciones: [
      ...base.secciones,
      { titulo: 'Referral Provider', campos: [['Name', d.proveedor], ['Specialty', destino?.especialidad || '-']] },
      { titulo: 'Case Procedure(s)', parrafos: procedimientos.length ? procedimientos.map(lineaProcedimiento) : ['No procedures attached to this referral.'] },
      { titulo: 'Referral Notes', parrafos: [d.nota, ...marcas] },
    ] }
  }
  return base
}

export { LAB_VACIO }
