import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Caso, Visita } from '@/data/treatment-plan'

/* Estimate details del Treatment Plan (CON-3710 calcular a mano, CON-2529 recalcular cuando cambia el plan). Mock: el
   cálculo sale del CDT de cada procedimiento, no de un motor de seguros. Ver modulos/clinical-mode.md (2026-10-28). */

/** Lo que guarda cada caso. \`visitas\` es la foto del plan cuando se calculó: si el plan cambió, la tabla sigue mostrando
 *  esa foto (Update needed) hasta que se recalcule. */
export type Estimacion = {
  estado: 'sin-calcular' | 'al-dia' | 'desactualizada' | 'calculando' | 'fallo'
  visitas?: Visita[]
  /** Lo fija Prototype controls: muestra el escenario elegido aunque el estado del caso diga otra cosa. */
  forzar?: 'editable' | 'bloqueada'
}

export type FilaEstimacion = {
  id: string
  codigo: string
  nombre: string
  cobrado: number
  permitido: number
  cobertura: number
  copago: number
  deducible: number
  seguro: number
  ajuste: number
  paciente: number
}

export type TotalesEstimacion = Omit<FilaEstimacion, 'id' | 'codigo' | 'nombre' | 'cobertura'>

/* Cobertura por categoría del CDT: D0/D1 preventivo, D2-D4 básico, el resto mayor. */
const cobertura = (codigo: string) => {
  const c = Number(codigo.charAt(1))
  return c <= 1 ? 100 : c <= 4 ? 80 : 50
}
const DEDUCIBLE = 50
const PERMITIDO = 0.85
const redondear = (n: number) => Math.round(n * 100) / 100
export const importe = (fee: string) => Number(fee.replace(/[^0-9.]/g, '')) || 0

/** Una fila por procedimiento; el deducible se consume en orden, sólo en lo que no es preventivo. Sin cargo (amount
 *  charged 0) no se estima, como pide CON-2529. */
export function filasDeVisitas(visitas: Visita[]): { visita: string; filas: FilaEstimacion[] }[] {
  let deducibleRestante = DEDUCIBLE
  return visitas.map((v) => ({
    visita: v.nombre,
    filas: v.procedimientos.filter((p) => p.estado !== 'Removed' && importe(p.fee) > 0).map((p) => {
      const cobrado = importe(p.fee)
      const pct = cobertura(p.codigo)
      const permitido = redondear(cobrado * (pct === 100 ? 0.9 : PERMITIDO))
      const deducible = pct === 100 ? 0 : Math.min(deducibleRestante, permitido)
      deducibleRestante -= deducible
      const seguro = redondear((permitido - deducible) * (pct / 100))
      return {
        id: p.id, codigo: p.codigo, nombre: p.nombre, cobrado, permitido, cobertura: pct, copago: 0, deducible,
        seguro, ajuste: redondear(cobrado - permitido), paciente: redondear(permitido - seguro),
      }
    }),
  })).filter((g) => g.filas.length > 0)
}

export const totales = (filas: FilaEstimacion[]): TotalesEstimacion => {
  const suma = (k: keyof TotalesEstimacion) => redondear(filas.reduce((t, f) => t + f[k], 0))
  return {
    cobrado: suma('cobrado'), permitido: suma('permitido'), copago: suma('copago'), deducible: suma('deducible'),
    seguro: suma('seguro'), ajuste: suma('ajuste'), paciente: suma('paciente'),
  }
}

export const dinero = (n: number) => \`$\${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`

/* Estimaciones de arranque: Periodontists Recommended cambió después del último cálculo (la foto no tiene el último
   procedimiento de la Visit 2), la alternativa nunca se calculó y el resto quedó calculado. */
export function estimacionesIniciales(casos: Caso[]): Record<string, Estimacion> {
  return Object.fromEntries(casos.map((c) => {
    if (c.id === 'c1') {
      const foto = c.visitas.map((v, i) => (i === c.visitas.length - 1 ? { ...v, procedimientos: v.procedimientos.slice(0, -1) } : v))
      return [c.id, { estado: 'desactualizada', visitas: foto }]
    }
    if (c.id === 'c2') return [c.id, { estado: 'sin-calcular' }]
    return [c.id, { estado: 'al-dia', visitas: c.visitas }]
  }))
}
`})))()}export{n,i as r,r as t};