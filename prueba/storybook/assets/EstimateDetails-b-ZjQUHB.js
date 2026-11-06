import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Fragment, useState } from 'react'
import { AlertTriangle, ArrowLeft, Calculator, Check, ChevronRight, Circle, Loader2, Lock, Plus, RefreshCw, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TARJETA_INTERNA, TARJETA_PANEL } from '@/lib/estilos'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/empty-state'
import { PageTitle } from '@/components/ui/page-title'
import { Pill, type PillTone } from '@/components/ui/pill'
import { Checkbox } from '@/components/ui/checkbox'
import { SelectField } from '@/components/patients/form'
import type { Caso } from '@/data/treatment-plan'
import { dinero, filasDeVisitas, totales, type Estimacion, type TotalesEstimacion } from '@/data/estimaciones'

/* Estimate details: el desglose del Total Amount de un caso, por visita y procedimiento (CON-3710, CON-2529). Sólo en
   Planning se calcula; después queda la foto con la que se presentó. Ver modulos/clinical-mode.md (2026-10-28). */

export type Situacion = Estimacion['estado'] | 'bloqueada'

/** Sólo en Planning y con permiso sobre la ubicación: desde Pending el plan ya no cambia (precondición de CON-2529).
 *  Prototype controls puede forzar el escenario. */
export const estimacionEditable = (caso: Caso, e: Estimacion) =>
  e.forzar ? e.forzar === 'editable' : caso.estado === 'Planning' && !caso.sinPermiso

export const situacionDe = (caso: Caso, e: Estimacion): Situacion =>
  e.forzar === 'bloqueada' ? 'bloqueada' : estimacionEditable(caso, e) || e.estado === 'sin-calcular' ? e.estado : 'bloqueada'

/* Al día no lleva bajada: no hay nada que avisar (Julián, 2026-10-28). */

const ESTADO: Record<Situacion, { tono: PillTone; icono: LucideIcon; texto: string }> = {
  'sin-calcular': { tono: 'neutral', icono: Circle, texto: 'Not calculated' },
  'al-dia': { tono: 'success', icono: Check, texto: 'Up to date' },
  desactualizada: { tono: 'warning', icono: AlertTriangle, texto: 'Update needed' },
  calculando: { tono: 'info', icono: Loader2, texto: 'Updating estimates…' },
  fallo: { tono: 'danger', icono: AlertTriangle, texto: 'Update failed' },
  bloqueada: { tono: 'neutral', icono: Lock, texto: 'Locked at presentation' },
}

const DESCRIPCION: Record<Situacion, string> = {
  'sin-calcular': 'Generate an estimate before presenting this treatment plan.',
  'al-dia': '',
  desactualizada: 'Changes affecting estimates were detected. Amounts shown reflect the previous calculation.',
  calculando: 'Calculating with the latest plan information. Previous results remain visible until the update completes.',
  fallo: 'Changes affecting estimates were detected. Amounts shown reflect the previous calculation.',
  bloqueada: 'These amounts are the estimate frozen when planning was finished. They can’t be updated.',
}

/* En celular la columna Procedure queda fija y los montos scrollean de costado. */
const FIJA = 'max-md:sticky max-md:left-0 max-md:z-[1] max-md:shadow-[1px_0_0_var(--color-line-row)]'

const COLUMNAS: { label: string; clave: keyof TotalesEstimacion | 'cobertura' }[] = [
  { label: 'Amount charged', clave: 'cobrado' },
  { label: 'Allowable amount', clave: 'permitido' },
  { label: 'Coverage %', clave: 'cobertura' },
  { label: 'Copayment', clave: 'copago' },
  { label: 'Deductible applied', clave: 'deducible' },
  { label: 'Insurance portion', clave: 'seguro' },
  { label: 'Insurance adjustment', clave: 'ajuste' },
  { label: 'Patient portion', clave: 'paciente' },
]

export function EstimateDetails({ caso, estimacion, onVolver, onCalcular }: {
  caso: Caso
  estimacion: Estimacion
  onVolver: () => void
  onCalcular: () => void
}) {
  const editable = estimacionEditable(caso, estimacion)
  const situacion = situacionDe(caso, estimacion)
  const { tono, icono: Icono } = ESTADO[situacion]
  /* Pending terminó de planear pero todavía no se presentó. */
  const presentado = caso.estado !== 'Pending' || estimacion.forzar === 'bloqueada'
  const texto = situacion === 'bloqueada' && !presentado ? 'Locked' : ESTADO[situacion].texto
  const descripcion = situacion === 'sin-calcular' && !editable
    ? 'No estimate was calculated while this case was in planning.'
    : situacion === 'bloqueada' && presentado
      ? 'These amounts are the estimate frozen when the treatment plan was presented.'
      : DESCRIPCION[situacion]
  const grupos = estimacion.visitas ? filasDeVisitas(estimacion.visitas) : []
  const filas = grupos.flatMap((g) => g.filas)
  const total = totales(filas)
  const anterior = situacion === 'desactualizada' || situacion === 'fallo'
  const [cerradas, setCerradas] = useState<string[]>([])
  const alternar = (v: string) => setCerradas((c) => (c.includes(v) ? c.filter((x) => x !== v) : [...c, v]))

  const nota = situacion === 'bloqueada' ? 'Presented estimate' : anterior ? 'Previous calculation' : 'Estimated amount'
  const resumen: [string, number][] = [
    ['Plan case total', total.cobrado],
    ['Deductible applied', total.deducible],
    ['Insurance portion', total.seguro],
    ['Insurance adjustments', total.ajuste],
    ['Patient portion', total.paciente],
  ]

  /* Calcular está siempre a mano mientras se planea (CON-3710: para corroborar). Al día baja a secundario. */
  const accion = editable && (
    <Button
      variant={situacion === 'al-dia' ? 'secondary' : 'primary'}
      loading={situacion === 'calculando'}
      onClick={onCalcular}
      className="min-w-[180px] self-start"
    >
      {situacion === 'calculando' ? 'Updating estimates…' : situacion === 'sin-calcular'
        ? <><Calculator /> Calculate estimates</>
        : <><RefreshCw /> {situacion === 'fallo' ? 'Retry update' : situacion === 'al-dia' ? 'Recalculate' : 'Update estimates'}</>}
    </Button>
  )

  return (
    <div className={cn(TARJETA_PANEL, 'p-4 sm:p-6')}>
      <Button variant="secondary" size="md" onClick={onVolver}>
        <ArrowLeft /> Back to Case
      </Button>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          {/* El rótulo chico del sistema (el de ListGroup): 11px, semibold, tracking-wide. */}
          <p className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">Treatment case · {caso.nombre}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5" aria-live="polite">
            <PageTitle>Estimate details</PageTitle>
            <Pill tone={tono} size="sm" className="gap-1 whitespace-nowrap">
              <Icono className={cn('size-3', situacion === 'calculando' && 'animate-spin')} aria-hidden /> {texto}
            </Pill>
          </div>
          {descripcion && (
            <p className="mt-2 max-w-[560px] text-[13px] leading-[1.5] text-ink-muted">{descripcion}</p>
          )}
        </div>
        {accion}
      </div>

      {situacion === 'fallo' && (
        <Alert tone="danger" title="Estimates couldn’t be updated" className="mt-4">
          {filas.length ? 'Your previous calculation is still displayed. Try again.' : 'Try again.'}
        </Alert>
      )}

      {filas.length === 0 ? (
        <EmptyState
          icon={Calculator}
          title="No estimates calculated yet"
          detail={editable ? 'Calculate estimates to view the estimated insurance and patient portions.' : 'There are no insurance or patient amounts for this case.'}
          className="mt-6 rounded-lg border border-dashed border-line py-14"
        />
      ) : (
        <>
          <section aria-label="Estimated totals" className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {resumen.map(([label, n], i) => {
              const paciente = i === resumen.length - 1
              return (
                <div key={label} className={cn(TARJETA_INTERNA, 'p-4', paciente && 'bg-dash-count-bg col-span-2 md:col-span-1')}>
                  <p className="text-[12px] text-ink-muted">{label}</p>
                  <p className={cn('mt-2 text-[22px] leading-none font-bold tabular-nums', paciente ? 'text-dash-blue' : 'text-ink')}>{dinero(n)}</p>
                  <p className="mt-2 text-[11px] text-ink-faint">{nota}</p>
                </div>
              )
            })}
          </section>

          <div className="mt-7 mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-[14px] font-bold text-ink">Procedure breakdown</h2>
            <span className="text-[12px] text-ink-muted">
              {anterior ? 'Previous calculation · ' : situacion === 'bloqueada' ? 'Presented snapshot · ' : ''}
              {grupos.length} {grupos.length === 1 ? 'visit' : 'visits'} · {filas.length} {filas.length === 1 ? 'procedure' : 'procedures'}
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-line-row">
            <table className="w-full min-w-[1040px] border-collapse text-[13px]">
              <thead>
                <tr className="bg-surface-alt">
                  <th scope="col" className={cn(FIJA, 'h-11 w-[170px] bg-surface-alt px-4 text-left md:w-[30%] text-[11px] font-semibold text-ink-muted')}>Procedure</th>
                  {COLUMNAS.map((c) => (
                    <th key={c.clave} scope="col" className="h-11 px-3 text-right text-[11px] leading-tight font-semibold text-ink-muted">{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grupos.map((g) => {
                  const abierta = !cerradas.includes(g.visita)
                  return (
                    <Fragment key={g.visita}>
                      <tr className="border-t border-line-row bg-surface-subtle">
                        <td colSpan={COLUMNAS.length + 1} className="px-4 py-2">
                          <button
                            type="button"
                            onClick={() => alternar(g.visita)}
                            aria-expanded={abierta}
                            className="sticky left-4 flex items-center gap-2 rounded text-[13px] font-semibold text-ink hover:text-dash-blue"
                          >
                            <ChevronRight className={cn('size-4 text-ink-muted transition-transform', abierta && 'rotate-90')} aria-hidden />
                            {g.visita}
                            <span className="text-[12px] font-normal text-ink-muted">
                              {g.filas.length} {g.filas.length === 1 ? 'procedure' : 'procedures'}
                            </span>
                          </button>
                        </td>
                      </tr>
                      {abierta && g.filas.map((f) => (
                        <tr key={f.id} className="border-t border-line-row text-ink-soft">
                          <td className={cn(FIJA, 'max-w-0 bg-white px-4 py-3')}>
                            <span className="block truncate" title={\`\${f.codigo} \${f.nombre}\`}>
                              <span className="mr-1.5 font-semibold text-ink">{f.codigo}</span>{f.nombre}
                            </span>
                          </td>
                          {COLUMNAS.map((c) => (
                            <td
                              key={c.clave}
                              className={cn(
                                'px-3 py-3 text-right whitespace-nowrap tabular-nums',
                                c.clave === 'paciente' && 'bg-dash-count-bg/50 text-dash-blue font-semibold',
                              )}
                            >
                              {c.clave === 'cobertura' ? \`\${f.cobertura}%\` : dinero(f[c.clave])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-line-row bg-surface-alt font-bold text-ink">
                  <td className={cn(FIJA, 'bg-surface-alt px-4 py-3.5')}>Case total</td>
                  {COLUMNAS.map((c) => (
                    <td key={c.clave} className={cn('px-3 py-3.5 text-right whitespace-nowrap tabular-nums', c.clave === 'paciente' && 'text-dash-blue')}>
                      {c.clave === 'cobertura' ? '—' : dinero(total[c.clave])}
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="mt-3 text-[12px] leading-[1.6] text-ink-muted">
            {anterior
              ? 'The totals and procedure rows belong to the same previous calculation. Changes to the plan are not included until estimates are updated.'
              : situacion === 'bloqueada'
                ? 'Read-only snapshot. Updating estimates is not available after planning is finished.'
                : 'Estimates are not a guarantee of coverage or payment. Final insurance benefits and patient responsibility may vary.'}
          </p>
        </>
      )}
    </div>
  )
}

/* Prototype controls, como el HTML de referencia de Julián: elegir el escenario, simular un cambio del plan y forzar que
   el próximo cálculo falle. Es una herramienta de demo, no parte del producto (clinical-mode.md, 2026-10-28). */
export const ESCENARIOS = ['Update needed', 'Up to date', 'Not calculated', 'Update failed', 'Presented / Locked'] as const
export type Escenario = (typeof ESCENARIOS)[number]

const ESCENARIO_DE: Partial<Record<Situacion, Escenario>> = {
  desactualizada: 'Update needed', 'al-dia': 'Up to date', 'sin-calcular': 'Not calculated', fallo: 'Update failed', bloqueada: 'Presented / Locked',
}

export function PrototypeControls({ situacion, onEscenario, onSimular, fallar, onFallar }: {
  situacion: Situacion
  onEscenario: (e: Escenario) => void
  onSimular: () => void
  fallar: boolean
  onFallar: (v: boolean) => void
}) {
  const calculando = situacion === 'calculando'
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 rounded-lg border border-dashed border-line-strong bg-white/60 px-4 py-3">
      <span className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">Prototype controls</span>
      <SelectField
        label="Estimate scenario"
        hideLabel
        value={ESCENARIO_DE[situacion] ?? ''}
        onChange={(v) => onEscenario(v as Escenario)}
        options={[...ESCENARIOS]}
        disabled={calculando}
        className="w-[200px]"
      />
      <Button
        variant="secondary"
        size="md"
        onClick={onSimular}
        disabled={calculando || situacion === 'bloqueada' || situacion === 'sin-calcular'}
      >
        <Plus /> Simulate plan change
      </Button>
      <span className="flex items-center gap-2 text-[13px] text-ink">
        <Checkbox on={fallar} onChange={onFallar} label="Fail next calculation" disabled={calculando} />
        <span aria-hidden>Fail next calculation</span>
      </span>
      <span className="ml-auto text-[11px] text-ink-faint">Demo only · No server connection</span>
    </div>
  )
}
`})))()}export{n,i as r,r as t};