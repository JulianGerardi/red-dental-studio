import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { MAXILLARY, MANDIBULAR } from '@/data/odontogram'

/* Vocabulario compartido por DentAssmt, Intra Oral y Extra Oral. Ver
   design-reference/figma/modulos/clinical-mode.md. */

export type FindingStatus =
  | 'Active' | 'Monitoring' | 'In Treatment' | 'Treated' | 'Externally Treated'
  | 'No Treatment Needed' | 'Patient Declined' | 'Clinic Declined' | 'Discarded'

const GREEN = { badge: 'bg-dash-ok-bg text-dash-ok-fg', rail: 'border-l-dash-ok-fg', dot: 'bg-dash-ok-fg', good: true }
const BLUE = { badge: 'bg-dash-count-bg text-dash-blue', rail: 'border-l-dash-blue', dot: 'bg-dash-blue', good: true }
const RED = { badge: 'bg-[#fef2f2] text-field-error', rail: 'border-l-field-error', dot: 'bg-field-error', good: false }
const AMBER = { badge: 'bg-warn-bg text-warn-fg', rail: 'border-l-warn-fg', dot: 'bg-warn-fg', good: false }

export const STATUS_STYLE: Record<FindingStatus, { badge: string; rail: string; dot: string; good: boolean }> = {
  Active: GREEN, Monitoring: AMBER, 'In Treatment': BLUE, Treated: GREEN, 'Externally Treated': GREEN,
  'No Treatment Needed': RED, 'Patient Declined': RED, 'Clinic Declined': RED, Discarded: RED,
}

export type ProcedureGroup = 'Diagnostic' | 'Preventive' | 'Restorative' | 'Endodontic'
export type ProcedureScope = 'Tooth' | 'Surface' | 'Quadrant' | 'Arch'
export const SCOPES: ProcedureScope[] = ['Tooth', 'Surface', 'Quadrant', 'Arch']
export type ProcedureOption = { code: string; label: string; group: ProcedureGroup }

export const PROCEDURE_GROUPS = ['All', 'Diagnostic', 'Preventive', 'Restorative', 'Endodontic'] as const
export type ProcedureFilter = (typeof PROCEDURE_GROUPS)[number]

export const PROCEDURES: ProcedureOption[] = [
  { code: 'D0120', label: 'Periodic Oral Evaluation', group: 'Diagnostic' },
  { code: 'D0140', label: 'Limited Oral Evaluation - Problem Focused', group: 'Diagnostic' },
  { code: 'D0220', label: 'Intraoral - Periapical First Radiographic Image', group: 'Diagnostic' },
  { code: 'D1110', label: 'Prophylaxis - Adult', group: 'Preventive' },
  { code: 'D1206', label: 'Topical Application of Fluoride Varnish', group: 'Preventive' },
  { code: 'D2140', label: 'Amalgam - One Surface, Primary or Permanent', group: 'Restorative' },
  { code: 'D2740', label: 'Crown - Porcelain / Ceramic', group: 'Restorative' },
  { code: 'D3310', label: 'Treatment of Root Canal Obstruction; Non-Surgical Access', group: 'Endodontic' },
  { code: 'D3330', label: 'Endodontic Therapy, Molar - Excluding Final Restoration', group: 'Endodontic' },
]

export const DIAGNOSES = [
  'Chronic enamel dental caries', 'Acute gingival inflammation', 'Chronic gingival inflammation',
  'Periodic tooth sensitivity', 'Moderate plaque accumulation', 'Localized periodontal pocketing',
  'Severe root surface decay', 'Frequent enamel erosion',
]

export const PROVIDERS = ['Elena Martinez', 'Emily Chen', 'Daniel Anderson', 'Sarah Stone']

export type Finding = {
  id: string
  area: string
  condition: string
  descriptor: string
  date: string
  status: FindingStatus
  tooth: number | null
  provider: string
  surfaces: string[]
  notes: string
  /** Ids de los hallazgos del chart que este procedimiento resuelve. */
  linked: string[]
  diagnoses: string[]
}

export type LinkedFinding = { id: string; tooth: number; date: string; status: FindingStatus }

export const LINKED_FINDINGS: LinkedFinding[] = [
  { id: '#10987231', tooth: 20, date: 'May 18, 2026', status: 'Active' },
  { id: '#10987232', tooth: 20, date: 'May 18, 2026', status: 'Active' },
  { id: '#10987233', tooth: 21, date: 'May 18, 2026', status: 'Active' },
  { id: '#10987234', tooth: 21, date: 'May 18, 2026', status: 'Active' },
  { id: '#10987235', tooth: 22, date: 'May 18, 2026', status: 'Active' },
]

/* Numeración universal 1-32, ya la tiene odontogram.ts -mismo esquema
   (1-16 maxilar, 32-17 mandibular)-, se reusa en vez de duplicarla. */
export const UPPER_TEETH = MAXILLARY
export const LOWER_TEETH = MANDIBULAR

export function neighbours(tooth: number) {
  const lo = tooth <= 16 ? 1 : 17
  const hi = tooth <= 16 ? 16 : 32
  const start = Math.min(Math.max(tooth - 1, lo), hi - 2)
  return [start, start + 1, start + 2]
}

export function quadrantTeeth(tooth: number) {
  const start = Math.floor((tooth - 1) / 8) * 8 + 1
  return Array.from({ length: 8 }, (_, i) => start + i)
}
`})))()}export{n,i as r,r as t};