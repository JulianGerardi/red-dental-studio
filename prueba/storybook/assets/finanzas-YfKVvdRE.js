import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { PROCEDURES } from '@/components/clinical/dental/data'
import type { PillTone } from '@/components/ui/pill'

/* Settings → Billing como en red.dev: carriers con sus planes (cada plan con su ficha de siete secciones), fee schedules
   con versiones y coverage tables, que son plantillas que el plan copia. Ver design-reference/figma/modulos/settings-billing.md. */

export const PROCEDIMIENTOS = PROCEDURES
export const descripcionDe = (codigo: string) => PROCEDURES.find((p) => p.code === codigo)?.label ?? ''
export const opcionProcedimiento = (codigo: string) => \`\${codigo} - \${descripcionDe(codigo)}\`
export const OPCIONES_PROCEDIMIENTO = PROCEDURES.map((p) => opcionProcedimiento(p.code))
export const codigoDeOpcion = (opcion: string) => opcion.split(' - ')[0]

export type Estado = 'Active' | 'Inactive'
export const TONO_ESTADO: Record<Estado, PillTone> = { Active: 'success', Inactive: 'danger' }

/* ── Catálogos de los selects, tal cual red.dev ─────────────────────── */

export const FORMATOS_RECLAMO = ['ADA 2012', 'ADA 2019', 'ADA 2024']
export const MESES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const FUENTES_PAGO = [
  'Blue Cross/Blue Shield', 'CHAMPUS', 'Commercial Insurance', 'Commercial Insurance (DHMO)', 'Commercial Insurance (PPO)',
  'Medicaid', 'Medicare Part B',
]
export const TIPOS_PLAN = ['Dental', 'Medical']
export const SI_NO = ['No', 'Yes']
export const CORONAS_PAGADAS = ['Prep date', 'Seat date']
export const ASIGNACIONES = ['Patient', 'Provider']
export const METODOS_COB = ['Carve out non duplication', 'Maintenance of benefits', 'Traditional']
export const TIPOS_DEDUCIBLE = ['Basic', 'Major', 'None', 'Orthodontic', 'Preventive'] as const
export type TipoDeducible = (typeof TIPOS_DEDUCIBLE)[number]
export const TIPOS_COBERTURA = ['Copayment', 'Percentage'] as const
export type TipoCobertura = (typeof TIPOS_COBERTURA)[number]
export const TIPOS_EXCEPCION = ['Age limitation', 'Downgrade', 'Frequency', 'Not covered'] as const
export type TipoExcepcion = (typeof TIPOS_EXCEPCION)[number]
export const CLASES_DEDUCIBLE = ['Preventive', 'Basic', 'Major', 'Ortho'] as const
export type ClaseDeducible = (typeof CLASES_DEDUCIBLE)[number]

/* Con (+1) el número va en dos campos: Area Code (3 digits) y Number (7 digits). */
export type Telefono = { codigo: string; area: string; numero: string }
export const esNorteamerica = (codigo: string) => codigo.startsWith('(+1)')
export const TELEFONO_VACIO: Telefono = { codigo: '(+1) United States of America (the)', area: '', numero: '' }

/* ── Fee schedules ─────────────────────────────────────────────────── */

export const ESTADOS_ARANCEL = ['Active', 'Inactive', 'Archived'] as const
export type EstadoArancel = (typeof ESTADOS_ARANCEL)[number]
export const TONO_ARANCEL: Record<EstadoArancel, PillTone> = { Active: 'success', Inactive: 'danger', Archived: 'neutral' }

/* Cada guardado con Available From crea una versión; la vigente es la última que ya empezó. */
export type VersionArancel = { id: string; desde: string; precios: Record<string, number> }

/* Type y Assignments no están en red.dev: los pidió Julián para la tabla de Fee Schedules (settings-billing.md). */
export const TIPOS_ARANCEL = ['UCR', 'PPO', 'Medicaid', 'Discount plan'] as const
export type TipoArancel = (typeof TIPOS_ARANCEL)[number]
/** Asignaciones directas por id; los carriers salen de los planes que lo usan. */
export type Asignados = { pacientes: string[]; proveedores: string[]; locaciones: string[] }
export const SIN_ASIGNAR: Asignados = { pacientes: [], proveedores: [], locaciones: [] }

export type Arancel = {
  id: string
  nombre: string
  tipo: TipoArancel
  porDefecto: boolean
  estado: EstadoArancel
  versiones: VersionArancel[]
  /** Last updated, ISO. */
  actualizado: string
  asignados: Asignados
}

const UCR: Record<string, number> = {
  D0120: 65, D0140: 85, D0150: 110, D0180: 120, D0220: 35, D1110: 115, D1206: 45, D1351: 55, D2140: 140, D2330: 165,
  D2390: 520, D2720: 1180, D2740: 1250, D3310: 850, D3330: 1250, D4341: 260, D4910: 150, D5110: 1850, D5986: 180,
  D6010: 2200, D6750: 1150, D7140: 195, D7240: 495, D8080: 5800, D9110: 95, D9972: 300,
}
const derivado = (factor: number, sin: string[] = []) =>
  Object.fromEntries(Object.entries(UCR).filter(([c]) => !sin.includes(c)).map(([c, v]) => [c, Math.round(v * factor)]))
const version = (id: string, desde: string, precios: Record<string, number>): VersionArancel => ({ id, desde, precios })

const arancel = (
  id: string, nombre: string, tipo: TipoArancel, estado: EstadoArancel, actualizado: string, versiones: VersionArancel[],
  asignados: Partial<Asignados> = {}, porDefecto = false,
): Arancel => ({ id, nombre, tipo, porDefecto, estado, versiones, actualizado, asignados: { ...SIN_ASIGNAR, ...asignados } })

const SIN_MEDICAID = ['D2740', 'D2720', 'D6010', 'D6750', 'D9972', 'D5986', 'D8080']

export const ARANCELES: Arancel[] = [
  arancel('ucr-red', 'UCR - Red', 'UCR', 'Active', '2026-09-28', [version('ucr-red-1', '2025-01-01', derivado(0.95)), version('ucr-red-2', '2026-01-01', { ...UCR })], { pacientes: ['patient-0002', 'patient-0005'], locaciones: ['abril', 'alaska', 'northgate'] }, true),
  arancel('aetna-2026', 'Aetna 2026', 'PPO', 'Active', '2026-10-05', [version('aetna-2026-1', '2026-03-01', derivado(0.8))]),
  arancel('delta-ppo', 'Delta Dental PPO 2026', 'PPO', 'Active', '2026-08-14', [version('delta-ppo-1', '2025-07-01', derivado(0.74, ['D9972'])), version('delta-ppo-2', '2026-01-01', derivado(0.78, ['D9972', 'D5986']))], { locaciones: ['riverside'] }),
  arancel('ppo-premium', 'PPO Premium Plan', 'PPO', 'Active', '2026-07-02', [version('ppo-premium-1', '2026-03-01', derivado(0.82))], { pacientes: ['patient-0001', 'patient-0004', 'patient-0007'], proveedores: ['emily-chen'], locaciones: ['bayside'] }),
  arancel('medicaid', 'Medicaid', 'Medicaid', 'Active', '2026-06-19', [version('medicaid-1', '2025-07-01', derivado(0.55, SIN_MEDICAID))], { pacientes: ['patient-0010', 'patient-0013'], proveedores: ['julio-perez'] }),
  arancel('membership', 'In-house Membership', 'Discount plan', 'Inactive', '2026-02-01', [version('membership-1', '2026-02-01', derivado(0.85))], { pacientes: ['patient-0003', 'patient-0006', 'patient-0009', 'patient-0012'] }),
  arancel('cigna-2027', 'Cigna DPPO 2027', 'PPO', 'Inactive', '2026-09-30', [version('cigna-2027-1', '2027-01-01', derivado(0.79))]),
  arancel('standard-2025', 'Standard 2025', 'UCR', 'Archived', '2025-12-15', [version('standard-2025-1', '2025-01-01', derivado(0.95))]),
  arancel('medicaid-2024', 'Medicaid 2024', 'Medicaid', 'Archived', '2025-07-01', [version('medicaid-2024-1', '2024-07-01', derivado(0.5, SIN_MEDICAID))]),
]

export const hoyIso = () => new Date().toISOString().slice(0, 10)

/* La versión vigente: la última que ya empezó (o la primera, si todas son futuras). */
export function versionVigente(a: Arancel, hoy = hoyIso()): VersionArancel {
  const ordenadas = [...a.versiones].sort((x, y) => x.desde.localeCompare(y.desde))
  return [...ordenadas].reverse().find((v) => v.desde <= hoy) ?? ordenadas[0]
}

/* Non-zero fees: cuántos códigos del catálogo tienen un importe mayor que cero. */
export const conImporte = (precios: Record<string, number | null>) => PROCEDIMIENTOS.filter((p) => (precios[p.code] ?? 0) > 0).length

/* "03/06/2026 - Active", como el select de red.dev (que además muestra una hora). */
export function etiquetaVersion(a: Arancel, v: VersionArancel, hoy = hoyIso()) {
  const vigente = versionVigente(a, hoy)
  const estado = v.id === vigente.id ? 'Active' : v.desde > hoy ? 'Scheduled' : 'Expired'
  return \`\${fechaDMA(v.desde)} - \${estado}\`
}

/* ── Coverage tables (plantillas) ──────────────────────────────────── */

export type Rango = { id: string; desde: string; hasta: string; categoria: string; deducible: TipoDeducible; valor: number }

export type Excepcion = {
  id: string
  tipo: TipoExcepcion
  procedimientos: string[]
  edadMin?: number
  edadMax?: number
  /** Age limitation: lo que pasa fuera de la edad, un % o un código más barato. */
  opcionEdad?: 'Coverage' | 'Downgrade'
  cobertura?: number
  rebajaA?: string
  deducible?: TipoDeducible
  veces?: number
  periodo?: number
  motivo: string
}

export type TablaCobertura = { id: string; nombre: string; tipo: TipoCobertura; rangos: Rango[]; excepciones: Excepcion[] }

const rango = (desde: string, hasta: string, categoria: string, deducible: TipoDeducible, valor: number): Rango =>
  ({ id: \`\${desde}-\${hasta}\`, desde, hasta, categoria, deducible, valor })

const porcentajes = (basico: number, mayor: number, orto: number): Rango[] => [
  rango('D0100', 'D0999', 'Diagnostic', 'Preventive', 100),
  rango('D1000', 'D1999', 'Preventive', 'Preventive', 100),
  rango('D2000', 'D2399', 'Restorative', 'Basic', basico),
  rango('D2400', 'D2999', 'Inlays, onlays and crowns', 'Major', mayor),
  rango('D3000', 'D3999', 'Endodontics', 'Basic', basico),
  rango('D4000', 'D4999', 'Periodontics', 'Basic', basico),
  rango('D5000', 'D5899', 'Removable prosthodontics', 'Major', mayor),
  rango('D6000', 'D6999', 'Implants and fixed prosthodontics', 'Major', mayor),
  rango('D7000', 'D7999', 'Oral surgery', 'Basic', basico),
  rango('D8000', 'D8999', 'Orthodontics', 'Orthodontic', orto),
  rango('D9000', 'D9999', 'Adjunctive general services', 'Basic', basico),
]

const EXCEPCIONES_PPO: Excepcion[] = [
  { id: 'ex-fluor', tipo: 'Age limitation', procedimientos: ['D1206', 'D1351'], edadMin: 0, edadMax: 18, opcionEdad: 'Coverage', cobertura: 0, deducible: 'Preventive', motivo: 'Fluoride and sealants are covered for children only.' },
  { id: 'ex-limpieza', tipo: 'Frequency', procedimientos: ['D0120', 'D1110'], veces: 2, periodo: 12, motivo: 'Two exams and cleanings per benefit year.' },
  { id: 'ex-corona', tipo: 'Downgrade', procedimientos: ['D2740'], rebajaA: 'D2720', motivo: 'Porcelain crowns on molars are paid as metal crowns.' },
  { id: 'ex-blanqueo', tipo: 'Not covered', procedimientos: ['D9972'], motivo: 'Cosmetic whitening is not covered.' },
]

export const COBERTURAS: TablaCobertura[] = [
  { id: 'standard-ppo', nombre: 'Standard PPO 100/80/50', tipo: 'Percentage', rangos: porcentajes(80, 50, 50), excepciones: EXCEPCIONES_PPO },
  { id: 'premium-ppo', nombre: 'Premium PPO 100/90/60', tipo: 'Percentage', rangos: porcentajes(90, 60, 50), excepciones: EXCEPCIONES_PPO.slice(1) },
  { id: 'medicaid-adults', nombre: 'Medicaid Adults', tipo: 'Percentage', rangos: porcentajes(60, 0, 0), excepciones: [] },
  {
    id: 'dhmo-copay', nombre: 'DHMO Copay', tipo: 'Copayment', excepciones: [],
    rangos: [
      rango('D0100', 'D0999', 'Diagnostic', 'None', 0), rango('D1000', 'D1999', 'Preventive', 'None', 0),
      rango('D2000', 'D2399', 'Restorative', 'None', 25), rango('D2400', 'D2999', 'Inlays, onlays and crowns', 'None', 250),
      rango('D3000', 'D3999', 'Endodontics', 'None', 180), rango('D4000', 'D4999', 'Periodontics', 'None', 60),
      rango('D7000', 'D7999', 'Oral surgery', 'None', 45), rango('D8000', 'D8999', 'Orthodontics', 'None', 1800),
    ],
  },
]

/* Exc: cuántas excepciones caen en el rango de códigos. */
export const excepcionesEnRango = (r: Rango, excepciones: Excepcion[]) =>
  excepciones.filter((e) => e.procedimientos.some((c) => r.desde && r.hasta && c >= r.desde && c <= r.hasta)).length

/* ── Carriers y planes ─────────────────────────────────────────────── */

export type Aseguradora = {
  id: string
  nombre: string
  payerId: string
  formato: string
  /** Expected Period of Insurance Claim Resolution, en días. */
  diasResolucion: number
  sinDiagnosticos: boolean
  noFacturar: boolean
  email: string
  sitio: string
  telefono: Telefono
  /** Location Number: el número que el carrier le asignó a cada locación, por id de locación. */
  numerosLocacion: Record<string, string>
}

/* El buscador de Carrier Name de New Carrier sugiere el payer y completa su Payer ID. */
export const PAGADORES = [
  { nombre: 'Aetna Dental Plans', payerId: '60054' },
  { nombre: 'BeneCare Dental Plan', payerId: '23210' },
  { nombre: 'Blue Cross Blue Shield', payerId: '47198' },
  { nombre: 'Cigna Dental', payerId: '62308' },
  { nombre: 'Delta Dental of California', payerId: '77777' },
  { nombre: 'Guardian', payerId: '64246' },
  { nombre: 'Humana Dental', payerId: '73288' },
  { nombre: 'MetLife Tricare', payerId: '89070' },
  { nombre: 'United Concordia', payerId: '89071' },
]
export const opcionPagador = (p: { nombre: string; payerId: string }) => \`\${p.nombre} - \${p.payerId}\`

const tel = (area: string, numero: string): Telefono => ({ ...TELEFONO_VACIO, area, numero })

export const ASEGURADORAS: Aseguradora[] = [
  { id: 'aetna', nombre: 'Aetna Dental Plans', payerId: '60054', formato: 'ADA 2019', diasResolucion: 30, sinDiagnosticos: true, noFacturar: false, email: 'dentalclaims@aetna.example', sitio: 'https://www.aetna.com', telefono: tel('800', '4517715'), numerosLocacion: { abril: 'AET-1042', bayside: 'AET-2210' } },
  { id: 'benecare', nombre: 'BeneCare Dental Plan', payerId: '23210', formato: 'ADA 2019', diasResolucion: 21, sinDiagnosticos: false, noFacturar: false, email: 'claims@benecare.example', sitio: 'https://www.benecare.com', telefono: tel('800', '6942273'), numerosLocacion: {} },
  { id: 'metlife', nombre: 'MetLife Tricare', payerId: '89070', formato: 'ADA 2024', diasResolucion: 45, sinDiagnosticos: false, noFacturar: false, email: 'tricare@metlife.example', sitio: 'https://www.metlife.com', telefono: tel('855', '6385433'), numerosLocacion: {} },
  { id: 'delta-ca', nombre: 'Delta Dental of California', payerId: '77777', formato: 'ADA 2019', diasResolucion: 30, sinDiagnosticos: false, noFacturar: false, email: 'providers@delta.example', sitio: 'https://www.deltadentalins.com', telefono: tel('800', '7656003'), numerosLocacion: { abril: 'DD-77-104' } },
  { id: 'cigna', nombre: 'Cigna Dental', payerId: '62308', formato: 'ADA 2012', diasResolucion: 30, sinDiagnosticos: true, noFacturar: true, email: '', sitio: 'https://www.cigna.com', telefono: tel('800', '2446224'), numerosLocacion: {} },
]

export type Contacto = { nombre: string; apellido: string; email: string; organizacion: string }
/* Montos de Deductibles And Benefits: Annual Individual, Annual Family y Lifetime (Individual u Ortho). */
export type Montos = [number, number, number]

export type PlanSeguro = {
  id: string
  aseguradoraId: string
  nombre: string
  grupo: string
  estado: Estado
  telefono: Telefono
  contacto: Contacto
  linea1: string
  linea2: string
  pais: string
  estadoUs: string
  ciudad: string
  zip: string
  mesRenovacion: string
  fuentePago: string
  tipo: string
  /** Max Allowable Amount Fee Schedule: id de un fee schedule o ''. */
  arancelMaximoId: string
  /** Waiting Period, en meses. */
  espera: number
  /** Dependent Max Age, en años. */
  edadMaxima: number
  dienteFaltante: string
  coronas: string
  fueraDeRed: string
  asignacion: string
  cobertura: { tipo: TipoCobertura; rangos: Rango[] }
  /** Códigos que piden predeterminación antes del tratamiento. */
  predeterminaciones: string[]
  tablaPagos: { codigo: string; valor: number }[]
  deducibles: Record<ClaseDeducible, Montos>
  beneficios: Montos
  /** Coordination Of Benefits: método por Source of Payment del plan primario. */
  coordinacion: Record<string, string>
  /** Fee Schedule By Location: id de fee schedule por id de locación. */
  arancelPorLocacion: Record<string, string>
}

export const CONTACTOS: Contacto[] = [
  { nombre: 'Arina', apellido: 'Zabalenca', email: 'arina@referral.com', organizacion: 'Arina Zabalenca' },
  { nombre: 'Marcus', apellido: 'Reed', email: 'mreed@acmecorp.example', organizacion: 'Acme Corp' },
  { nombre: 'Priya', apellido: 'Shah', email: 'benefits@northwind.example', organizacion: 'Northwind Logistics' },
]

const DEDUCIBLES_BASE: Record<ClaseDeducible, Montos> = { Preventive: [0, 0, 0], Basic: [50, 150, 0], Major: [50, 150, 0], Ortho: [0, 0, 0] }

export function planVacio(aseguradoraId: string): PlanSeguro {
  return {
    id: '', aseguradoraId, nombre: '', grupo: '', estado: 'Active',
    telefono: { ...TELEFONO_VACIO }, contacto: { nombre: '', apellido: '', email: '', organizacion: '' },
    linea1: '', linea2: '', pais: 'United States of America (the)', estadoUs: '', ciudad: '', zip: '',
    mesRenovacion: '', fuentePago: '', tipo: '', arancelMaximoId: '', espera: 0, edadMaxima: 0, dienteFaltante: '',
    coronas: '', fueraDeRed: '', asignacion: '',
    cobertura: { tipo: 'Percentage', rangos: [] }, predeterminaciones: [], tablaPagos: [],
    deducibles: { Preventive: [0, 0, 0], Basic: [0, 0, 0], Major: [0, 0, 0], Ortho: [0, 0, 0] }, beneficios: [0, 0, 0],
    coordinacion: Object.fromEntries(FUENTES_PAGO.map((f) => [f, 'Traditional'])), arancelPorLocacion: {},
  }
}

const plan = (id: string, aseguradoraId: string, nombre: string, grupo: string, extra: Partial<PlanSeguro> = {}): PlanSeguro => ({
  ...planVacio(aseguradoraId),
  id, nombre, grupo,
  telefono: tel('213', '5550142'), contacto: CONTACTOS[1],
  linea1: '1200 Wilshire Blvd', linea2: 'Suite 400', estadoUs: 'California', ciudad: 'Los Angeles', zip: '90017',
  mesRenovacion: 'January', fuentePago: 'Commercial Insurance (PPO)', tipo: 'Dental', espera: 6, edadMaxima: 26,
  dienteFaltante: 'No', coronas: 'Seat date', fueraDeRed: 'Yes', asignacion: 'Provider',
  cobertura: { tipo: 'Percentage', rangos: porcentajes(80, 50, 50) },
  predeterminaciones: ['D2740', 'D6010', 'D8080'],
  deducibles: DEDUCIBLES_BASE, beneficios: [1500, 4500, 1500],
  ...extra,
})

export const PLANES: PlanSeguro[] = [
  plan('acme-ppo', 'aetna', 'Acme Corp', 'AET-100245', { arancelMaximoId: 'aetna-2026' }),
  plan('northwind', 'aetna', 'Northwind Logistics', 'AET-100388', { arancelMaximoId: 'aetna-2026', contacto: CONTACTOS[2], beneficios: [2000, 6000, 2000], cobertura: { tipo: 'Percentage', rangos: porcentajes(90, 60, 50) } }),
  plan('city-la', 'aetna', 'City of Los Angeles', 'AET-200017', { arancelMaximoId: 'aetna-2026', fuentePago: 'Commercial Insurance', mesRenovacion: 'July' }),
  plan('aetna-dmo', 'aetna', 'Aetna DMO Essentials', 'AET-DMO-9', { estado: 'Inactive', fuentePago: 'Commercial Insurance (DHMO)', cobertura: { tipo: 'Copayment', rangos: COBERTURAS[3].rangos }, predeterminaciones: [] }),
  plan('benecare-family', 'benecare', 'BeneCare Family', 'BC-55120', { arancelMaximoId: 'ppo-premium', mesRenovacion: 'April' }),
  plan('benecare-senior', 'benecare', 'BeneCare Senior', 'BC-55190', { arancelMaximoId: 'ppo-premium', edadMaxima: 0, fuentePago: 'Medicare Part B' }),
  plan('tricare-dental', 'metlife', 'Tricare Dental Program', 'TDP-0001', { fuentePago: 'CHAMPUS', arancelMaximoId: 'medicaid', espera: 12 }),
  plan('delta-ppo-plus', 'delta-ca', 'Delta PPO Plus Premier', 'DD-442100', { arancelMaximoId: 'delta-ppo', arancelPorLocacion: { bayside: 'ppo-premium' } }),
]

/* ── Helpers ───────────────────────────────────────────────────────── */

export function idNuevo(nombre: string, usados: string[]) {
  const base = nombre.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item'
  let id = base
  for (let n = 2; usados.includes(id); n++) id = \`\${base}-\${n}\`
  return id
}

export const cantidad = (n: number, singular: string, plural = \`\${singular}s\`) => \`\${n} \${n === 1 ? singular : plural}\`

export const dinero = (n: number) => \`$\${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`

/* "2026-03-06" → "06/03/2026": red.dev muestra las fechas como día/mes/año. */
export const fechaDMA = (iso: string) => {
  const [a, m, d] = iso.split('-')
  return \`\${d}/\${m}/\${a}\`
}

export const telefonoTexto = (t: Telefono) =>
  esNorteamerica(t.codigo) && t.area ? \`(\${t.area}) \${t.numero.slice(0, 3)}-\${t.numero.slice(3)}\` : t.numero
`})))()}export{n,i as r,r as t};