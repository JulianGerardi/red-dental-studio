import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { PROCEDURES, type ProcedureGroup } from '@/components/clinical/dental/data'
import type { PillTone } from '@/components/ui/pill'

/* Settings → Billing: fee schedules (lo que cobra el consultorio), carriers con sus planes y coverage tables (lo que paga
   el plan). Cada plan apunta a un fee schedule y a una coverage table. Ver design-reference/figma/modulos/settings-billing.md. */

export type Estado = 'Active' | 'Inactive'
export const TONO_ESTADO: Record<Estado, PillTone> = { Active: 'success', Inactive: 'neutral' }

/* ── Procedimientos ────────────────────────────────────────────────── */

/* El catálogo CDT es el mismo de Clinical Mode (New Procedure): un solo vocabulario de códigos y categorías. */
export const PROCEDIMIENTOS = PROCEDURES

/* Honorario completo del consultorio (UCR) por código: la base de la que salen los otros fee schedules. */
const UCR: Record<string, number> = {
  D0120: 65, D0140: 85, D0150: 110, D0180: 120, D0220: 35, D1110: 115, D1206: 45, D1351: 55, D2140: 140, D2330: 165,
  D2390: 520, D2720: 1180, D2740: 1250, D3310: 850, D3330: 1250, D4341: 260, D4910: 150, D5110: 1850, D5986: 180,
  D6010: 2200, D6750: 1150, D7140: 195, D7240: 495, D8080: 5800, D9110: 95, D9972: 300,
}

/* ── Fee schedules ─────────────────────────────────────────────────── */

export const TIPOS_ARANCEL = ['UCR', 'PPO', 'Medicaid', 'Discount plan'] as const
export type TipoArancel = (typeof TIPOS_ARANCEL)[number]

export type Arancel = {
  id: string
  nombre: string
  tipo: TipoArancel
  descripcion: string
  /** "Mar 1, 2026". */
  vigencia: string
  porDefecto: boolean
  estado: Estado
  /** Precio por código CDT. El código que falta es un procedimiento sin precio en este fee schedule. */
  precios: Record<string, number>
}

/* Un fee schedule derivado del UCR: factor y redondeo a dólar, sin los códigos que no cubre. */
const derivado = (factor: number, sin: string[] = []) =>
  Object.fromEntries(Object.entries(UCR).filter(([c]) => !sin.includes(c)).map(([c, v]) => [c, Math.round(v * factor)]))

export const ARANCELES: Arancel[] = [
  { id: 'ucr-red', nombre: 'UCR - Red', tipo: 'UCR', descripcion: 'Full office fees. Patients without insurance pay these.', vigencia: 'Jan 1, 2026', porDefecto: true, estado: 'Active', precios: { ...UCR } },
  { id: 'ppo-premium', nombre: 'PPO Premium Plan', tipo: 'PPO', descripcion: 'Contracted fees for premium PPO plans.', vigencia: 'Mar 1, 2026', porDefecto: false, estado: 'Active', precios: derivado(0.82) },
  { id: 'delta-ppo', nombre: 'Delta Dental PPO 2026', tipo: 'PPO', descripcion: 'Fees negotiated with Delta Dental of California.', vigencia: 'Jan 1, 2026', porDefecto: false, estado: 'Active', precios: derivado(0.78, ['D9972', 'D5986']) },
  { id: 'medicaid', nombre: 'Medicaid', tipo: 'Medicaid', descripcion: 'State Medicaid fees for adults and children.', vigencia: 'Jul 1, 2025', porDefecto: false, estado: 'Active', precios: derivado(0.55, ['D2740', 'D2720', 'D6010', 'D6750', 'D9972', 'D5986', 'D8080']) },
  { id: 'membership', nombre: 'In-house Membership', tipo: 'Discount plan', descripcion: 'Members save 15% on every procedure.', vigencia: 'Feb 1, 2026', porDefecto: false, estado: 'Active', precios: derivado(0.85) },
  { id: 'standard-2025', nombre: 'Standard 2025', tipo: 'UCR', descripcion: "Last year's office fees, kept for claims dated 2025.", vigencia: 'Jan 1, 2025', porDefecto: false, estado: 'Inactive', precios: derivado(0.95) },
]

/* ── Carriers y planes ─────────────────────────────────────────────── */

export const RECLAMOS = ['Electronic', 'Paper'] as const
export type Reclamo = (typeof RECLAMOS)[number]

export type Aseguradora = {
  id: string
  nombre: string
  payerId: string
  reclamos: Reclamo
  telefono: string
  fax: string
  email: string
  sitio: string
  linea1: string
  linea2: string
  ciudad: string
  estadoUs: string
  zip: string
  estado: Estado
}

export const ASEGURADORAS: Aseguradora[] = [
  { id: 'aetna', nombre: 'Aetna', payerId: '60054', reclamos: 'Electronic', telefono: '(800) 451-7715', fax: '(859) 425-3379', email: 'dentalclaims@aetna.example', sitio: 'aetna.com', linea1: 'PO Box 14094', linea2: '', ciudad: 'Lexington', estadoUs: 'Kentucky', zip: '40512', estado: 'Active' },
  { id: 'bcbs', nombre: 'Blue Cross Blue Shield', payerId: '47198', reclamos: 'Electronic', telefono: '(888) 630-2583', fax: '', email: '', sitio: 'bcbs.com', linea1: 'PO Box 272540', linea2: '', ciudad: 'Chico', estadoUs: 'California', zip: '95927', estado: 'Active' },
  { id: 'cigna', nombre: 'Cigna', payerId: '62308', reclamos: 'Electronic', telefono: '(800) 244-6224', fax: '', email: 'providers@cigna.example', sitio: 'cigna.com', linea1: 'PO Box 188037', linea2: '', ciudad: 'Chattanooga', estadoUs: 'Tennessee', zip: '37422', estado: 'Active' },
  { id: 'delta-dental-ca', nombre: 'Delta Dental of California', payerId: '77777', reclamos: 'Electronic', telefono: '(800) 765-6003', fax: '(415) 972-8466', email: '', sitio: 'deltadentalins.com', linea1: 'PO Box 997330', linea2: '', ciudad: 'Sacramento', estadoUs: 'California', zip: '95899', estado: 'Active' },
  { id: 'guardian', nombre: 'Guardian', payerId: '64246', reclamos: 'Paper', telefono: '(800) 541-7846', fax: '', email: '', sitio: 'guardianlife.com', linea1: 'PO Box 981587', linea2: '', ciudad: 'El Paso', estadoUs: 'Texas', zip: '79998', estado: 'Active' },
  { id: 'humana', nombre: 'Humana', payerId: '73288', reclamos: 'Electronic', telefono: '(800) 233-4013', fax: '', email: '', sitio: 'humana.com', linea1: 'PO Box 14611', linea2: '', ciudad: 'Lexington', estadoUs: 'Kentucky', zip: '40512', estado: 'Inactive' },
  { id: 'medi-cal', nombre: 'Medi-Cal Dental', payerId: 'MCDNT', reclamos: 'Paper', telefono: '(800) 423-0507', fax: '', email: '', sitio: 'dental.dhcs.ca.gov', linea1: 'PO Box 15609', linea2: '', ciudad: 'Sacramento', estadoUs: 'California', zip: '95852', estado: 'Active' },
  { id: 'metlife', nombre: 'MetLife', payerId: '65978', reclamos: 'Electronic', telefono: '(877) 638-3379', fax: '', email: '', sitio: 'metlife.com', linea1: 'PO Box 981282', linea2: '', ciudad: 'El Paso', estadoUs: 'Texas', zip: '79998', estado: 'Active' },
  { id: 'united-concordia', nombre: 'United Concordia', payerId: 'CDCA1', reclamos: 'Electronic', telefono: '(800) 332-0366', fax: '', email: '', sitio: 'unitedconcordia.com', linea1: 'PO Box 69421', linea2: '', ciudad: 'Harrisburg', estadoUs: 'Pennsylvania', zip: '17106', estado: 'Active' },
]

export const TIPOS_PLAN = ['PPO', 'DHMO', 'Indemnity', 'Medicaid'] as const
export type TipoPlan = (typeof TIPOS_PLAN)[number]

export type PlanSeguro = {
  id: string
  aseguradoraId: string
  nombre: string
  grupo: string
  empleador: string
  tipo: TipoPlan
  arancelId: string
  coberturaId: string
  suscriptores: number
  estado: Estado
}

export const PLANES: PlanSeguro[] = [
  { id: 'p-aetna-ppo', aseguradoraId: 'aetna', nombre: 'Aetna Dental PPO', grupo: 'AET-100245', empleador: 'Northwind Logistics', tipo: 'PPO', arancelId: 'ppo-premium', coberturaId: 'ppo-standard', suscriptores: 42, estado: 'Active' },
  { id: 'p-aetna-dmo', aseguradoraId: 'aetna', nombre: 'Aetna DMO', grupo: 'AET-200871', empleador: 'Lakeside School District', tipo: 'DHMO', arancelId: 'ppo-premium', coberturaId: 'dhmo-network', suscriptores: 18, estado: 'Active' },
  { id: 'p-bcbs-choice', aseguradoraId: 'bcbs', nombre: 'BlueDental Choice PPO', grupo: 'BCB-55012', empleador: 'Riverside County', tipo: 'PPO', arancelId: 'ppo-premium', coberturaId: 'ppo-standard', suscriptores: 31, estado: 'Active' },
  { id: 'p-cigna-dppo', aseguradoraId: 'cigna', nombre: 'Cigna DPPO Advantage', grupo: 'CIG-77231', empleador: 'Abril Holdings', tipo: 'PPO', arancelId: 'ppo-premium', coberturaId: 'ppo-plus', suscriptores: 27, estado: 'Active' },
  { id: 'p-delta-ppo', aseguradoraId: 'delta-dental-ca', nombre: 'Delta Dental PPO', grupo: 'DDC-118204', empleador: 'Golden State Teachers', tipo: 'PPO', arancelId: 'delta-ppo', coberturaId: 'ppo-standard', suscriptores: 64, estado: 'Active' },
  { id: 'p-deltacare', aseguradoraId: 'delta-dental-ca', nombre: 'DeltaCare USA', grupo: 'DDC-990112', empleador: 'Golden State Teachers', tipo: 'DHMO', arancelId: 'delta-ppo', coberturaId: 'dhmo-network', suscriptores: 12, estado: 'Active' },
  { id: 'p-guardian', aseguradoraId: 'guardian', nombre: 'Dental Guard Preferred', grupo: 'GRD-41207', empleador: 'Northgate Clinic staff', tipo: 'PPO', arancelId: 'ppo-premium', coberturaId: 'ppo-standard', suscriptores: 9, estado: 'Active' },
  { id: 'p-medi-cal', aseguradoraId: 'medi-cal', nombre: 'Medi-Cal Dental', grupo: 'MCD-STATE', empleador: '', tipo: 'Medicaid', arancelId: 'medicaid', coberturaId: 'medicaid-adult', suscriptores: 88, estado: 'Active' },
  { id: 'p-metlife-pdp', aseguradoraId: 'metlife', nombre: 'MetLife PDP Plus', grupo: 'MET-30418', empleador: 'Bayside Hospital', tipo: 'PPO', arancelId: 'ppo-premium', coberturaId: 'ppo-plus', suscriptores: 23, estado: 'Active' },
  { id: 'p-metlife-basic', aseguradoraId: 'metlife', nombre: 'MetLife Basic', grupo: 'MET-30419', empleador: 'Bayside Hospital', tipo: 'Indemnity', arancelId: 'ucr-red', coberturaId: 'basic-100-70', suscriptores: 6, estado: 'Inactive' },
  { id: 'p-concordia', aseguradoraId: 'united-concordia', nombre: 'Concordia Advantage Plus', grupo: 'UCC-6120', empleador: 'Seaside Manufacturing', tipo: 'PPO', arancelId: 'ppo-premium', coberturaId: 'ppo-standard', suscriptores: 4, estado: 'Active' },
]

/* ── Coverage tables ───────────────────────────────────────────────── */

/* Las clases de beneficio de un plan dental: cada categoría CDT pertenece a una. */
export const CLASES = ['Preventive', 'Basic', 'Major', 'Orthodontics', 'Other'] as const
export type Clase = (typeof CLASES)[number]

export const CATEGORIAS: { grupo: ProcedureGroup; clase: Clase; rango: string }[] = [
  { grupo: 'Diagnostic services', clase: 'Preventive', rango: 'D0100–D0999' },
  { grupo: 'Preventive services', clase: 'Preventive', rango: 'D1000–D1999' },
  { grupo: 'Restorative services', clase: 'Basic', rango: 'D2000–D2999' },
  { grupo: 'Endodontic services', clase: 'Basic', rango: 'D3000–D3999' },
  { grupo: 'Periodontal services', clase: 'Basic', rango: 'D4000–D4999' },
  { grupo: 'Oral and maxillofacial surgery', clase: 'Basic', rango: 'D7000–D7999' },
  { grupo: 'Adjunctive service', clase: 'Basic', rango: 'D9000–D9999' },
  { grupo: 'Prosthodontics, removable', clase: 'Major', rango: 'D5000–D5899' },
  { grupo: 'Maxillofacial prosthetics', clase: 'Major', rango: 'D5900–D5999' },
  { grupo: 'Implant services', clase: 'Major', rango: 'D6000–D6199' },
  { grupo: 'Prosthodontics, fixed', clase: 'Major', rango: 'D6200–D6999' },
  { grupo: 'Orthodontic services', clase: 'Orthodontics', rango: 'D8000–D8999' },
  { grupo: 'Cosmetic & aesthetic services', clase: 'Other', rango: 'D9970–D9975' },
]

export const claseDe = (grupo: ProcedureGroup) => CATEGORIAS.find((c) => c.grupo === grupo)?.clase ?? 'Other'

export const ESPERAS = ['None', '3 months', '6 months', '12 months'] as const
export type Espera = (typeof ESPERAS)[number]

export type ReglaCobertura = {
  /** 0 a 100. 0 = no cubre. */
  porcentaje: number
  /** Si el deducible se descuenta antes de pagar. */
  deducible: boolean
  espera: Espera
  /** Límite de frecuencia en texto libre ("2 per calendar year"); vacío si no hay. */
  frecuencia: string
}

export const PERIODOS = ['Calendar year', 'Plan year'] as const
export type Periodo = (typeof PERIODOS)[number]

export type TablaCobertura = {
  id: string
  nombre: string
  /** Cuándo se renuevan el máximo y el deducible. */
  periodo: Periodo
  /** Máximo anual por persona; 0 = sin máximo. */
  maximo: number
  deducible: number
  deducibleFamilia: number
  /** Máximo de por vida para ortodoncia; 0 = sin beneficio. */
  maximoOrto: number
  estado: Estado
  reglas: Record<ProcedureGroup, ReglaCobertura>
}

export type PorClase = Record<Clase, number>

/* Frecuencias habituales de un plan dental; se pueden cambiar categoría por categoría. */
const FRECUENCIAS: Partial<Record<ProcedureGroup, string>> = {
  'Diagnostic services': '2 exams per calendar year',
  'Preventive services': '2 cleanings per calendar year',
  'Prosthodontics, removable': '1 per 5 years',
  'Prosthodontics, fixed': '1 per tooth per 5 years',
  'Implant services': '1 per tooth per 5 years',
}

/* Arma las reglas de una tabla a partir del porcentaje de cada clase. Preventive no paga deducible; Major y Orthodontics
   esperan \`esperaMayor\`. */
export function armarReglas(clases: PorClase, esperaMayor: Espera = 'None'): Record<ProcedureGroup, ReglaCobertura> {
  return Object.fromEntries(CATEGORIAS.map(({ grupo, clase }) => [grupo, {
    porcentaje: clases[clase],
    deducible: clase !== 'Preventive' && clase !== 'Orthodontics',
    espera: clase === 'Major' || clase === 'Orthodontics' ? esperaMayor : 'None',
    frecuencia: FRECUENCIAS[grupo] ?? '',
  }])) as Record<ProcedureGroup, ReglaCobertura>
}

export const PLANTILLAS: { nombre: string; clases: PorClase }[] = [
  { nombre: 'Standard 100/80/50', clases: { Preventive: 100, Basic: 80, Major: 50, Orthodontics: 50, Other: 0 } },
  { nombre: 'Plus 100/90/60', clases: { Preventive: 100, Basic: 90, Major: 60, Orthodontics: 50, Other: 0 } },
  { nombre: 'Basic 100/70/0', clases: { Preventive: 100, Basic: 70, Major: 0, Orthodontics: 0, Other: 0 } },
  { nombre: 'Empty table', clases: { Preventive: 0, Basic: 0, Major: 0, Orthodontics: 0, Other: 0 } },
]

export const COBERTURAS: TablaCobertura[] = [
  { id: 'ppo-standard', nombre: 'PPO Standard 100/80/50', periodo: 'Calendar year', maximo: 1500, deducible: 50, deducibleFamilia: 150, maximoOrto: 1500, estado: 'Active', reglas: armarReglas(PLANTILLAS[0].clases, '12 months') },
  { id: 'ppo-plus', nombre: 'PPO Plus 100/90/60', periodo: 'Calendar year', maximo: 2000, deducible: 50, deducibleFamilia: 150, maximoOrto: 2000, estado: 'Active', reglas: armarReglas(PLANTILLAS[1].clases) },
  { id: 'dhmo-network', nombre: 'DHMO Network', periodo: 'Plan year', maximo: 0, deducible: 0, deducibleFamilia: 0, maximoOrto: 1000, estado: 'Active', reglas: { ...armarReglas({ Preventive: 100, Basic: 70, Major: 50, Orthodontics: 50, Other: 0 }), 'Endodontic services': { porcentaje: 60, deducible: false, espera: 'None', frecuencia: '' } } },
  { id: 'basic-100-70', nombre: 'Basic 100/70/0', periodo: 'Calendar year', maximo: 1000, deducible: 75, deducibleFamilia: 225, maximoOrto: 0, estado: 'Active', reglas: armarReglas(PLANTILLAS[2].clases) },
  { id: 'medicaid-adult', nombre: 'Medicaid Adult', periodo: 'Plan year', maximo: 1800, deducible: 0, deducibleFamilia: 0, maximoOrto: 0, estado: 'Active', reglas: { ...armarReglas({ Preventive: 100, Basic: 100, Major: 100, Orthodontics: 0, Other: 0 }), 'Implant services': { porcentaje: 0, deducible: false, espera: 'None', frecuencia: '' } } },
  { id: 'legacy-2024', nombre: 'Legacy 2024 80/50/50', periodo: 'Calendar year', maximo: 1000, deducible: 100, deducibleFamilia: 300, maximoOrto: 0, estado: 'Inactive', reglas: armarReglas({ Preventive: 80, Basic: 50, Major: 50, Orthodontics: 0, Other: 0 }, '6 months') },
]

/* ── Cálculos y formatos ───────────────────────────────────────────── */

/* Rango de porcentajes de una clase en una tabla: "80%" o "50–80%". */
export function porcentajeDeClase(t: Pick<TablaCobertura, 'reglas'>, clase: Clase) {
  const valores = CATEGORIAS.filter((c) => c.clase === clase).map((c) => t.reglas[c.grupo].porcentaje)
  const min = Math.min(...valores)
  const max = Math.max(...valores)
  return min === max ? \`\${min}%\` : \`\${min}–\${max}%\`
}

export const dinero = (n: number, centavos = false) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: centavos ? 2 : 0, maximumFractionDigits: centavos ? 2 : 0 })

/* Un máximo en 0 es "sin máximo", no "paga $0". */
export const maximoTexto = (n: number) => (n === 0 ? 'No limit' : dinero(n))

/* Diferencia promedio contra el UCR de los códigos con precio en los dos; null si no hay con qué comparar. */
export function diferenciaPromedio(a: Arancel, ucr: Arancel | undefined): number | null {
  if (!ucr || ucr.id === a.id) return null
  const codigos = Object.keys(a.precios).filter((c) => ucr.precios[c])
  if (!codigos.length) return null
  return codigos.reduce((s, c) => s + (a.precios[c] - ucr.precios[c]) / ucr.precios[c], 0) / codigos.length * 100
}

/* "+5.0%", "−18.0%" (con el signo menos tipográfico, del ancho del +) o "—". */
export const porcentajeTexto = (n: number | null) => (n === null ? '—' : \`\${n > 0 ? '+' : n < 0 ? '−' : ''}\${Math.abs(n).toFixed(1)}%\`)

/* Ajuste de un precio por porcentaje con redondeo opcional a 1 o 5 dólares. */
export const REDONDEOS = ['No rounding', 'Nearest $1', 'Nearest $5'] as const
export type Redondeo = (typeof REDONDEOS)[number]
export function ajustar(precio: number, porcentaje: number, redondeo: Redondeo = 'Nearest $1') {
  const v = precio * (1 + porcentaje / 100)
  if (redondeo === 'Nearest $5') return Math.max(0, Math.round(v / 5) * 5)
  if (redondeo === 'Nearest $1') return Math.max(0, Math.round(v))
  return Math.max(0, Math.round(v * 100) / 100)
}

/* La fecha del DateTextField ("01 / 03 / 26", día / mes / año) en el formato de la pantalla ("Mar 1, 2026"), y al revés. */
export function fechaLarga(ddmmaa: string) {
  const [d, m, a] = ddmmaa.split('/').map((x) => Number(x.trim()))
  if (!d || !m || a === undefined || Number.isNaN(a) || m > 12 || d > 31) return ''
  return new Date(2000 + a, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
export function fechaCorta(larga: string) {
  const f = new Date(larga)
  if (Number.isNaN(f.getTime())) return ''
  const dos = (n: number) => String(n).padStart(2, '0')
  return \`\${dos(f.getDate())} / \${dos(f.getMonth() + 1)} / \${dos(f.getFullYear() % 100)}\`
}

/* Id legible y único para la URL ("delta-dental-ppo-2026"). */
export function idNuevo(nombre: string, usados: string[]) {
  const base = nombre.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item'
  let id = base
  for (let n = 2; usados.includes(id); n++) id = \`\${base}-\${n}\`
  return id
}

/* Número de un campo de texto ("1,500", "$50", "-10"); null si no es un número. */
export function numero(texto: string) {
  const limpio = texto.replace(/[$,%\\s]/g, '')
  if (!limpio || Number.isNaN(Number(limpio))) return null
  return Number(limpio)
}

/* "1 plan", "3 plans". */
export const cantidad = (n: number, singular: string, plural = \`\${singular}s\`) => \`\${n} \${n === 1 ? singular : plural}\`
`})))()}export{n,i as r,r as t};