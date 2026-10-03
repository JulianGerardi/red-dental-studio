import { MAXILLARY, MANDIBULAR } from '@/data/odontogram'

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

/* Las categorías y el catálogo como en la app real (red.dev, New Procedure): cada procedimiento con su área de tratamiento,
   que es lo que filtra el embudo y lo que muestra el chip debajo de la descripción. */
export const PROCEDURE_GROUPS = [
  'All', 'Adjunctive service', 'Cosmetic & aesthetic services', 'Diagnostic services', 'Endodontic services', 'Implant services',
  'Maxillofacial prosthetics', 'Oral and maxillofacial surgery', 'Orthodontic services', 'Periodontal services', 'Preventive services',
  'Prosthodontics, fixed', 'Prosthodontics, removable', 'Restorative services',
] as const
export type ProcedureFilter = (typeof PROCEDURE_GROUPS)[number]
export type ProcedureGroup = Exclude<ProcedureFilter, 'All'>
export type ProcedureScope = 'Tooth' | 'Surface' | 'Quadrant' | 'Arch'
export const SCOPES: ProcedureScope[] = ['Tooth', 'Surface', 'Quadrant', 'Arch']
export const TREATMENT_AREAS = ['Arch', 'Mouth', 'Quadrant', 'Surface', 'Tooth'] as const
export type TreatmentArea = (typeof TREATMENT_AREAS)[number]
export type ProcedureOption = { code: string; label: string; group: ProcedureGroup; area: TreatmentArea }

export const PROCEDURES: ProcedureOption[] = [
  { code: 'D0120', label: 'Periodic oral evaluation – established patient', group: 'Diagnostic services', area: 'Mouth' },
  { code: 'D0140', label: 'Limited oral evaluation – problem focused', group: 'Diagnostic services', area: 'Mouth' },
  { code: 'D0150', label: 'Comprehensive oral evaluation – new or established patient', group: 'Diagnostic services', area: 'Mouth' },
  { code: 'D0180', label: 'Comprehensive periodontal evaluation – new or established patient', group: 'Diagnostic services', area: 'Mouth' },
  { code: 'D0220', label: 'Intraoral – periapical first radiographic image', group: 'Diagnostic services', area: 'Tooth' },
  { code: 'D1110', label: 'Prophylaxis – adult', group: 'Preventive services', area: 'Mouth' },
  { code: 'D1206', label: 'Topical application of fluoride varnish', group: 'Preventive services', area: 'Mouth' },
  { code: 'D1351', label: 'Sealant – per tooth', group: 'Preventive services', area: 'Tooth' },
  { code: 'D2140', label: 'Amalgam – one surface, primary or permanent', group: 'Restorative services', area: 'Surface' },
  { code: 'D2330', label: 'Resin-based composite – one surface, anterior', group: 'Restorative services', area: 'Surface' },
  { code: 'D2390', label: 'Resin-based composite crown, anterior', group: 'Restorative services', area: 'Tooth' },
  { code: 'D2720', label: 'Crown – resin with high noble metal', group: 'Restorative services', area: 'Tooth' },
  { code: 'D2740', label: 'Crown – porcelain/ceramic', group: 'Restorative services', area: 'Tooth' },
  { code: 'D3310', label: 'Endodontic therapy, anterior tooth', group: 'Endodontic services', area: 'Tooth' },
  { code: 'D3330', label: 'Endodontic therapy, molar tooth', group: 'Endodontic services', area: 'Tooth' },
  { code: 'D4341', label: 'Periodontal scaling and root planing – four or more teeth per quadrant', group: 'Periodontal services', area: 'Quadrant' },
  { code: 'D4910', label: 'Periodontal maintenance', group: 'Periodontal services', area: 'Mouth' },
  { code: 'D5110', label: 'Complete denture – maxillary', group: 'Prosthodontics, removable', area: 'Arch' },
  { code: 'D5986', label: 'Fluoride gel carrier', group: 'Maxillofacial prosthetics', area: 'Arch' },
  { code: 'D6010', label: 'Surgical placement of implant body: endosteal implant', group: 'Implant services', area: 'Tooth' },
  { code: 'D6750', label: 'Retainer crown – porcelain fused to high noble metal', group: 'Prosthodontics, fixed', area: 'Tooth' },
  { code: 'D7140', label: 'Extraction, erupted tooth or exposed root', group: 'Oral and maxillofacial surgery', area: 'Tooth' },
  { code: 'D7240', label: 'Removal of impacted tooth – completely bony', group: 'Oral and maxillofacial surgery', area: 'Tooth' },
  { code: 'D8080', label: 'Comprehensive orthodontic treatment of the adolescent dentition', group: 'Orthodontic services', area: 'Mouth' },
  { code: 'D9110', label: 'Palliative treatment of dental pain – per visit', group: 'Adjunctive service', area: 'Mouth' },
  { code: 'D9972', label: 'External bleaching – per arch', group: 'Cosmetic & aesthetic services', area: 'Arch' },
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

/* Existing: algo que el paciente ya tiene hecho (una condition ya hecha); Planned: lo que se va a hacer. En Existing sólo
   aparecen los procedimientos que quedan en la boca (restauraciones, endodoncias, implantes y prótesis). */
export type ProcedureStatus = 'Existing' | 'Planned'
export const PROCEDURE_STATUSES: ProcedureStatus[] = ['Existing', 'Planned']
export const EXISTING_GROUPS: ProcedureGroup[] = ['Restorative services', 'Endodontic services', 'Implant services', 'Prosthodontics, fixed', 'Prosthodontics, removable']

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
