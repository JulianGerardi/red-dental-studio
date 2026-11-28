import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useSyncExternalStore } from 'react'
import {
  CITA_ENCUENTRO, ENCUENTRO_ACTUAL, ENCUENTROS_PREVIOS, PROCEDIMIENTOS_CITA,
  type Encuentro, type EstadoNota, type ProcedimientoCita, type RegistroFase,
} from '@/data/ejecucion'
import type { EstadoProcedimiento } from '@/data/clinical-mode'

/* CON-4153: la ejecución por fases de los procedimientos del turno. Vive fuera de React, como el estado del encuentro
   (lib/encuentro): la barra de Clinical Mode y la ficha abren el mismo drawer y ven lo mismo. Cada acción se guarda en
   el momento; cerrar el encuentro no crea fases. Reglas en clinical-mode.md (2026-11-25). */

const hoy = () => new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })

let procedimientos: ProcedimientoCita[] = structuredClone(PROCEDIMIENTOS_CITA)
let encuentros: Encuentro[] = [...ENCUENTROS_PREVIOS]
const oyentes = new Set<() => void>()
const avisar = () => oyentes.forEach((f) => f())

const cambiar = (id: string, f: (p: ProcedimientoCita) => ProcedimientoCita) => {
  procedimientos = procedimientos.map((p) => (p.id === id ? f(p) : p))
  avisar()
}

export function useProcedimientosCita() {
  return useSyncExternalStore((f) => { oyentes.add(f); return () => { oyentes.delete(f) } }, () => procedimientos)
}

/** Para las stories y los tests: vuelve a los datos de ejemplo. */
export function reiniciarEjecucion() {
  procedimientos = structuredClone(PROCEDIMIENTOS_CITA)
  encuentros = [...ENCUENTROS_PREVIOS]
  avisar()
}

export const ESTADOS_FINALES: EstadoProcedimiento[] = ['Completed', 'Discontinued', 'Referred', 'Discarded']
export const esFinal = (p: ProcedimientoCita) => ESTADOS_FINALES.includes(p.estado)

/** Lo hecho en el encuentro en curso. */
export const registrosHoy = (p: ProcedimientoCita) => p.registros.filter((r) => r.encuentro === ENCUENTRO_ACTUAL)

/** Ejecución lineal (CON-4154): siempre la siguiente fase sin registrar, sea cual sea la que se agendó para la visita. */
export const siguienteFase = (p: ProcedimientoCita) => Math.max(0, ...p.registros.map((r) => r.fase)) + 1

export type AccionPrincipal = { tipo: 'start' | 'fase' | 'completar'; fase: number; label: string }

/** El botón de la fila (CON-4156): una fase → Complete procedure; la 1 de varias → Start procedure; una intermedia →
    Complete phase N; la última → Complete procedure. Sin acción en un estado final. */
export function accionPrincipal(p: ProcedimientoCita): AccionPrincipal | null {
  if (esFinal(p)) return null
  const fase = siguienteFase(p)
  if (fase > p.fases) return null
  if (fase === p.fases) return { tipo: 'completar', fase, label: 'Complete procedure' }
  if (fase === 1) return { tipo: 'start', fase, label: 'Start procedure' }
  return { tipo: 'fase', fase, label: \`Complete phase \${fase}\` }
}

/** Dónde termina si se completa ahora (CON-4155): la última fase registrada hoy (esa fila pasa a Finished) o, si hoy no
    se registró ninguna, la siguiente. */
export function faseDeCierre(p: ProcedimientoCita) {
  return registrosHoy(p).at(-1)?.fase ?? siguienteFase(p)
}

/** Completar antes de la última fase planificada: pide confirmación y no toca el plan. */
export const esAnticipado = (p: ProcedimientoCita) => faseDeCierre(p) < p.fases

/* Registra una fase del encuentro en curso. Si ya estaba (Started o Continued de hoy), se actualiza esa misma fila: no se
   duplica (CON-4155). */
const conFase = (p: ProcedimientoCita, fase: number, evento: RegistroFase['evento']): RegistroFase[] => {
  const ya = p.registros.find((r) => r.fase === fase && r.encuentro === ENCUENTRO_ACTUAL)
  if (ya) return p.registros.map((r) => (r === ya ? { ...r, evento } : r))
  return [...p.registros, { fase, evento, encuentro: ENCUENTRO_ACTUAL }]
}

/** Start procedure (fase 1, Started) o Complete phase N (Continued): el procedimiento queda In progress. */
export function registrarFase(id: string) {
  const p = procedimientos.find((x) => x.id === id)
  const a = p && accionPrincipal(p)
  if (!p || !a || a.tipo === 'completar') return
  cambiar(id, (x) => ({ ...x, estado: 'In progress', registros: conFase(x, a.fase, a.fase === 1 ? 'Started' : 'Continued') }))
}

/** Complete procedure: la fase de cierre queda Finished y el procedimiento Completed, en una sola operación. */
export function completarProcedimiento(id: string) {
  const p = procedimientos.find((x) => x.id === id)
  if (!p || esFinal(p)) return
  const fase = faseDeCierre(p)
  cambiar(id, (x) => ({ ...x, estado: 'Completed', registros: conFase(x, fase, 'Finished') }))
}

/** Refer, Discard y Discontinue: cambian el estado; los registros de fases quedan como estaban. */
export function cambiarEstadoCita(id: string, estado: EstadoProcedimiento) {
  cambiar(id, (x) => ({ ...x, estado }))
}

/** Save de Edit procedure: nota, proveedor, vínculos y estimado. No toca el estado ni las fases. */
export function guardarEdicionCita(id: string, cambios: Pick<Partial<ProcedimientoCita>, 'nota' | 'proveedor' | 'vinculados' | 'diagnosticos' | 'estimado'>) {
  cambiar(id, (x) => ({ ...x, ...cambios }))
}

/** El encuentro de un registro. El que está en curso es de hoy y su nota todavía no se firmó. */
export function encuentroDe(id: string): Encuentro {
  return encuentros.find((e) => e.id === id) ?? { id, fecha: hoy(), provider: CITA_ENCUENTRO.provider, nota: 'Unsigned' }
}

/** Al completar el encuentro, lo de hoy queda guardado con su fecha y su nota sin firmar; el próximo arranca de cero. */
export function cerrarEncuentroEjecucion() {
  const id = \`enc-\${Date.now()}\`
  encuentros = [...encuentros, { id, fecha: hoy(), provider: CITA_ENCUENTRO.provider, nota: 'Unsigned' }]
  procedimientos = procedimientos.map((p) => ({ ...p, registros: p.registros.map((r) => (r.encuentro === ENCUENTRO_ACTUAL ? { ...r, encuentro: id } : r)) }))
  avisar()
}

/** Review and sign después de cerrar: la nota del último encuentro queda firmada en el historial. */
export function firmarNotaUltimoEncuentro(nota: EstadoNota = 'Signed') {
  const ultimo = encuentros.at(-1)
  if (!ultimo || ENCUENTROS_PREVIOS.includes(ultimo)) return
  encuentros = encuentros.map((e) => (e === ultimo ? { ...e, nota } : e))
  avisar()
}
`})))()}export{n,i as r,r as t};