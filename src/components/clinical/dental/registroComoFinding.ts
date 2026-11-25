import { precioUcr } from '@/data/finanzas'
import { importe, type EstimadoProcedimiento } from '@/data/estimaciones'
import type { Problema } from '@/data/clinical-mode'
import type { Caso } from '@/data/treatment-plan'
import { type AreaTratamiento, type Finding } from './data'

/* Las filas de Problem List, Procedures y Treatment Plan como Finding, para editarlas con los mismos drawers que el
   examen (Edit Finding / Edit Procedure, Julián 2026-11-25). Ver design-reference/figma/modulos/clinical-mode.md. */

/** Lo que una fila guarda además de sus columnas: descriptores, vínculos y estimado. */
export type ExtrasEdicion = {
  descriptores?: Record<string, string>
  vinculados?: string[]
  diagnosticos?: string[]
  estimado?: EstimadoProcedimiento
}

const vacio = (t?: string) => !t || t === '-' || t === ''
export const superficiesDe = (t: string) => (vacio(t) ? [] : t.split(',').map((s) => s.trim()).filter(Boolean))
export const textoSuperficies = (s: string[]) => (s.length ? s.join(', ') : '-')

export function findingDeProblema(p: Problema & ExtrasEdicion): Finding {
  return {
    id: p.id, area: vacio(p.ubicacion) ? '' : p.ubicacion, condition: p.condicion, descriptor: '', date: p.fecha, status: p.estado,
    tooth: p.pieza ?? null, provider: p.proveedor, surfaces: superficiesDe(p.superficie), notes: p.nota ?? '', linked: [], diagnoses: [],
    examen: p.examen, problema: p.id, kind: 'condition', descriptors: p.descriptores,
  }
}

/** El área de un procedimiento de las tablas: el diente, la boca entera, la arcada o una región; sin dato, ninguna. */
function areaDeFila(pieza: string, ubicacion: string): AreaTratamiento | null {
  if (!vacio(pieza) && Number(pieza)) return { tipo: 'Tooth', valor: pieza }
  if (/full mouth/i.test(ubicacion)) return { tipo: 'Mouth', valor: 'Entire oral cavity' }
  if (/arch/i.test(ubicacion)) return { tipo: 'Arch', valor: /upper/i.test(ubicacion) ? 'Maxillary' : 'Mandibular' }
  if (/palate|lip|cheek|tongue/i.test(ubicacion)) return { tipo: 'Intraoral', valor: ubicacion }
  return null
}

type FilaProcedimiento = {
  id: string; fecha: string; pieza?: number | string; superficie: string; ubicacion: string
  codigo: string; nombre: string; proveedor: string; nota?: string; fee?: string
} & ExtrasEdicion

export function findingDeProcedimiento(p: FilaProcedimiento): Finding {
  const pieza = p.pieza === undefined ? '' : String(p.pieza)
  const fee = p.fee !== undefined ? importe(p.fee) : precioUcr(p.codigo)
  return {
    id: p.id, area: p.ubicacion, condition: `${p.codigo} - ${p.nombre}`, descriptor: '', date: p.fecha,
    /* El estado del finding no se usa: Edit Procedure muestra el de la fila (prop `estado`). */
    status: 'Active', tooth: Number(pieza) || null, provider: p.proveedor, surfaces: superficiesDe(p.superficie),
    notes: p.nota ?? '', linked: p.vinculados ?? [], diagnoses: p.diagnosticos ?? [], kind: 'procedure',
    fee: fee || undefined, treatmentArea: areaDeFila(pieza, p.ubicacion), estimado: p.estimado,
  }
}

/** Lo que vuelve de Edit Procedure, en los nombres de la fila. */
export const cambiosDeProcedimiento = (patch: Partial<Finding>) => ({
  ...(patch.provider !== undefined && { proveedor: patch.provider }),
  ...(patch.notes !== undefined && { nota: patch.notes.trim() || undefined }),
  ...(patch.linked && { vinculados: patch.linked }),
  ...(patch.diagnoses && { diagnosticos: patch.diagnoses }),
  ...(patch.estimado && { estimado: patch.estimado }),
})

/** Lo que vuelve de Edit Finding, en los nombres de la fila de la Problem List. */
export const cambiosDeProblema = (patch: Partial<Finding>) => ({
  ...(patch.notes !== undefined && { nota: patch.notes.trim() || undefined }),
  ...(patch.surfaces && { superficie: textoSuperficies(patch.surfaces) }),
  ...(patch.descriptors && { descriptores: patch.descriptors }),
})

/** Por qué no se puede tocar el estimado de un procedimiento de un caso: como Estimate details, sólo en Planning y con
 *  permiso sobre la ubicación (CON-2529). Suelto, siempre se puede. */
export function bloqueoEstimadoDe(caso?: Pick<Caso, 'estado' | 'nombre' | 'sinPermiso'>) {
  if (!caso) return undefined
  if (caso.sinPermiso) return "You don't have permission to change estimates at this location."
  if (caso.estado !== 'Planning') return `${caso.nombre} is past Planning, so this estimate was frozen when planning finished.`
  return undefined
}
