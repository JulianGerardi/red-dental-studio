/* Insurance Defaults de una Location (epic CON-1173: CON-4029 inicializar, CON-3894 Billing Provider, CON-3896 Rendering
   Provider, CON-4030 referencia contractual, CON-3898 Place of Service, CON-3899 autorización; CON-4031 / CON-4032
   bloqueos). Un registro por Location; lo que no aplica al modo se guarda en null. Ver figma/modulos/insurance-defaults.md. */

export type ModoBilling = 'PROCEDURES' | 'PROFILE'
export type ModoRendering = 'PROCEDURES' | 'PROVIDER'
export type ReferenciaContrato = 'BILLING' | 'RENDERING'

export type DefaultsSeguro = {
  billingMode: ModoBilling
  /** Clave del Billing Profile (`loc:…` o `emp:…`) en modo PROFILE. */
  billingProfileId: string | null
  /** Clave del Billing Profile alternativo en modo PROCEDURES. */
  alternateBillingId: string | null
  renderingMode: ModoRendering
  /** Id del empleado provider en modo PROVIDER. */
  renderingId: string | null
  usePatientPrimary: boolean
  alternateRenderingId: string | null
  contractCalculation: ReferenciaContrato
  warnUncontracted: boolean
  placeId: string | null
  defaultReleaseInfo: boolean
  defaultAssignBenefits: boolean
  updatedAt: string
}

/* Catálogo `places` (CMS Place of Service). `placeId` guarda el id del registro, no el código (CON-3898). */
export type LugarServicio = { id: string; code: string; name: string; active: boolean }
export const PLACES: LugarServicio[] = [
  { id: 'pos-02', code: '02', name: 'Telehealth Provided Other than in Patient’s Home', active: true },
  { id: 'pos-03', code: '03', name: 'School', active: true },
  { id: 'pos-11', code: '11', name: 'Office', active: true },
  { id: 'pos-12', code: '12', name: 'Home', active: true },
  { id: 'pos-15', code: '15', name: 'Mobile Unit', active: true },
  { id: 'pos-21', code: '21', name: 'Inpatient Hospital', active: true },
  { id: 'pos-22', code: '22', name: 'On Campus-Outpatient Hospital', active: true },
  { id: 'pos-31', code: '31', name: 'Skilled Nursing Facility', active: true },
  { id: 'pos-32', code: '32', name: 'Nursing Facility', active: true },
  { id: 'pos-49', code: '49', name: 'Independent Clinic', active: true },
  { id: 'pos-50', code: '50', name: 'Federally Qualified Health Center', active: true },
  { id: 'pos-71', code: '71', name: 'Public Health Clinic', active: true },
  { id: 'pos-72', code: '72', name: 'Rural Health Clinic', active: true },
]
export const textoLugar = (p: LugarServicio) => `${p.name} — ${p.code}`

/* Valores de inicialización al crear la Location (CON-4029): sin perfiles ni providers elegidos y Office — 11. */
export const defaultsIniciales = (): DefaultsSeguro => ({
  billingMode: 'PROCEDURES', billingProfileId: null, alternateBillingId: null,
  renderingMode: 'PROCEDURES', renderingId: null, usePatientPrimary: true, alternateRenderingId: null,
  contractCalculation: 'BILLING', warnUncontracted: false,
  placeId: PLACES.find((p) => p.code === '11' && p.active)?.id ?? null,
  defaultReleaseInfo: false, defaultAssignBenefits: false,
  updatedAt: '2026-11-04T12:00:00Z',
})

/* Semilla: Bayside factura con su propio perfil y tiene a Sarah Stone de Rendering alternativo, para recorrer los
   bloqueos (CON-4031, CON-4032). Las demás quedan como recién creadas. */
export const DEFAULTS_INICIALES: Record<string, DefaultsSeguro> = {
  bayside: { ...defaultsIniciales(), billingMode: 'PROFILE', billingProfileId: 'loc:bayside', alternateRenderingId: 'sarah-stone' },
}

/* Las reglas de consistencia al guardar (CON-3894 › 3.4, CON-3896 › 3.4): lo que no aplica al modo queda en null. */
export const normalizarDefaults = (d: DefaultsSeguro): DefaultsSeguro => ({
  ...d,
  billingProfileId: d.billingMode === 'PROFILE' ? d.billingProfileId : null,
  alternateBillingId: d.billingMode === 'PROCEDURES' ? d.alternateBillingId : null,
  renderingId: d.renderingMode === 'PROVIDER' ? d.renderingId : null,
  usePatientPrimary: d.renderingMode === 'PROCEDURES' ? d.usePatientPrimary : false,
  alternateRenderingId: d.renderingMode === 'PROCEDURES' ? d.alternateRenderingId : null,
})

/* ── Referencias que bloquean una desactivación (CON-4031, CON-4032) ───────────── */

export type CampoReferencia = 'billingProfileId' | 'alternateBillingId' | 'renderingId' | 'alternateRenderingId'
export const ROTULO_REFERENCIA: Record<CampoReferencia, string> = {
  billingProfileId: 'Specific Billing Profile',
  alternateBillingId: 'Alternate Billing Profile',
  renderingId: 'Specific Rendering Provider',
  alternateRenderingId: 'Alternate Rendering Provider',
}
export type Referencia = { locId: string; campo: CampoReferencia }

/** Dónde está elegido un Billing Profile (por su clave) y, si se pasa, un provider (por su id), en todas las Locations. */
export function referenciasEnDefaults(defaults: Record<string, DefaultsSeguro>, perfil: string, provider?: string): Referencia[] {
  return Object.entries(defaults).flatMap(([locId, d]) => {
    const campos: CampoReferencia[] = []
    if (d.billingProfileId === perfil) campos.push('billingProfileId')
    if (d.alternateBillingId === perfil) campos.push('alternateBillingId')
    if (provider && d.renderingId === provider) campos.push('renderingId')
    if (provider && d.alternateRenderingId === provider) campos.push('alternateRenderingId')
    return campos.map((campo) => ({ locId, campo }))
  })
}
