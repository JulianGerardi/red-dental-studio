import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Codigo, Page, Seccion } from './Page'
import { PaginaDeRecetas, type Receta } from './Recipes'
import { cargar, esperarYMedir, moda, type Medida } from './tables-measure'
import { cn } from '@/lib/utils'

/* Todas las tablas de la app. Lo que se dice de cada una sale de dos lugares y
   ninguno es prosa escrita a mano: las columnas, la construcción, los estilos y
   las funciones visibles se MIDEN abriendo la pantalla real (tables-measure.ts);
   las funciones que no se ven (estado vacío, deshacer) se leen del archivo
   fuente. La única línea escrita a mano es para qué sirve cada tabla. */
const fuentes = import.meta.glob('/src/**/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

type Tabla = { nombre: string; archivo: string; historia: string; uso: string; archivoCompartido?: boolean }

const TABLAS: Tabla[] = [
  { nombre: 'Patients list', archivo: 'components/patients/PatientsTable.tsx', historia: 'components-patients-patientstable--default', uso: 'The list of patients. The name links to the patient’s record.' },
  { nombre: 'Team (Settings)', archivo: 'pages/settings/Employees.tsx', historia: 'pages--settings-team', uso: 'The employees of the practice.' },
  { nombre: 'Accounts (Settings)', archivo: 'pages/settings/Accounts.tsx', historia: 'pages--settings-accounts', uso: 'The platform accounts, filtered by status with a select.' },
  { nombre: 'Locations (Settings)', archivo: 'pages/settings/Locations.tsx', historia: 'pages--settings-locations', uso: 'The practice locations. The name links to the location.' },
  { nombre: 'Insurance (Patient)', archivo: 'pages/patients/Insurance.tsx', historia: 'pages--patient-insurance', uso: 'The patient’s insurance plans. The priority is changed by dragging a row.' },
  { nombre: 'Ledger (Patient)', archivo: 'pages/patients/Ledger.tsx', historia: 'pages--patient-ledger', uso: 'The patient’s financial entries, with Patient / Guarantor views. It has the most features.' },
  { nombre: 'Ledger allocation', archivo: 'components/patients/ledger/LedgerAllocationTable.tsx', historia: 'components-ledger-ledgerallocationtable--default', uso: 'The charges a payment is applied to. It has its own set of 12 columns.' },
  { nombre: 'Documents (Patient)', archivo: 'pages/patients/Documents.tsx', historia: 'pages--patient-documents', uso: 'The patient’s documents and their signature status.' },
  { nombre: 'Recent activity (Billing)', archivo: 'pages/Billing.tsx', historia: 'pages--billing', uso: 'The latest financial movements. Clicking a row selects that patient.' },
  { nombre: 'Problem list (Clinical)', archivo: 'components/clinical/ProblemList.tsx', historia: 'components-clinical-problemlist--default', uso: 'The patient’s problems in Clinical Mode.' },
  { nombre: 'Lab orders (Clinical)', archivo: 'components/clinical/LabOrderPanel.tsx', historia: 'components-clinical-laborderpanel--default', uso: 'The active lab prescriptions in Clinical Mode.' },
  { nombre: 'Procedures (Treatment plan)', archivo: 'components/clinical/TreatmentPlanSection.tsx', historia: 'components-clinical-treatmentplansection--default', uso: 'The procedures of a treatment case, with checkbox selection.' },
  { nombre: 'Insurance summary (Patient overview)', archivo: 'pages/PatientDetail.tsx', historia: 'pages--patient-overview', uso: 'The insurance table inside the patient overview: a compact <table>.', archivoCompartido: true },
]

/* Funciones que no se ven en el DOM de la tabla: se leen del archivo. */
const DEL_CODIGO: [string, RegExp][] = [
  ['Empty state', /EmptyState/],
  ['Undo on delete', /label: 'Undo'/],
]

const meta = {
  title: 'Audit/Tables in the app',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const familiaTabla = (r: Receta) => (r.tag === 'table' ? 'Table' : r.tag === 'th' ? 'Header cell' : 'Data cell')

type Resultado = Medida | 'error' | undefined

/* Una sola iframe fuera de pantalla que va cargando las tablas de a una. */
function useMedidas() {
  const ref = useRef<HTMLIFrameElement>(null)
  const [medidas, setMedidas] = useState<Record<string, Resultado>>({})
  useEffect(() => {
    let vivo = true
    const frame = ref.current
    if (!frame) return
    ;(async () => {
      for (const t of TABLAS) {
        const ok = await cargar(frame, \`iframe.html?id=\${t.historia}&viewMode=story\`)
        const m = ok ? await esperarYMedir(frame) : null
        if (!vivo) return
        setMedidas((p) => ({ ...p, [t.archivo]: m ?? 'error' }))
      }
    })()
    return () => {
      vivo = false
    }
  }, [])
  return { ref, medidas }
}

/* ── Comparación ──────────────────────────────────────────────────────────── */
type Columna = { titulo: string; valor: (m: Medida) => string }

const COLUMNAS: Columna[] = [
  { titulo: 'Built with', valor: (m) => (m.construccion === 'table' ? '<table>' : 'div rows') },
  { titulo: 'Container', valor: (m) => \`\${m.contenedor.radio} radius · \${m.contenedor.borde}\${m.contenedor.conRelleno ? ' · padded card' : ''}\` },
  { titulo: 'Header fill', valor: (m) => m.encabezado.fondo },
  { titulo: 'Header text', valor: (m) => \`\${m.encabezado.texto} · \${m.encabezado.color}\${m.encabezado.mayusculas ? ' · UPPERCASE' : ''}\` },
  { titulo: 'Header height', valor: (m) => \`\${m.encabezado.alto}px\` },
  { titulo: 'Row height', valor: (m) => (m.fila ? \`\${m.fila.alto}px\` : '—') },
  { titulo: 'Row text', valor: (m) => (m.fila ? \`\${m.fila.texto} · \${m.fila.color}\` : '—') },
  { titulo: 'Row divider', valor: (m) => m.fila?.divisor ?? '—' },
]


function Comparacion({ medidas }: { medidas: Record<string, Resultado> }) {
  const medidos = TABLAS.filter((t) => typeof medidas[t.archivo] === 'object').map((t) => ({ t, m: medidas[t.archivo] as Medida }))
  const pendientes = TABLAS.length - Object.keys(medidas).length
  const fallidas = TABLAS.filter((t) => medidas[t.archivo] === 'error')
  if (!medidos.length) return <p className="text-[13px] text-ink-muted">Measuring the tables…</p>
  const modas = COLUMNAS.map((c) => moda(medidos.map(({ m }) => c.valor(m))))
  const distintas = COLUMNAS.map((c, i) => ({ c, i, grupos: [...new Set(medidos.map(({ m }) => c.valor(m)))] })).filter((x) => x.grupos.length > 1)
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-lg border border-line bg-white">
        <table className="w-full min-w-[980px] text-left text-[12px]">
          <thead className="bg-surface-subtle text-[10px] tracking-wide text-ink-muted uppercase">
            <tr><th className="px-3 py-2">Table</th>{COLUMNAS.map((c) => <th key={c.titulo} className="px-3 py-2">{c.titulo}</th>)}</tr>
          </thead>
          <tbody>
            {medidos.map(({ t, m }) => (
              <tr key={t.archivo} className="border-t border-line-soft align-top">
                <td className="px-3 py-2 font-semibold whitespace-nowrap">{t.nombre}</td>
                {COLUMNAS.map((c, i) => {
                  const v = c.valor(m)
                  return <td key={c.titulo} className={cn('px-3 py-2 whitespace-nowrap tabular-nums', v === modas[i] ? 'text-ink-medium' : 'bg-warn-bg text-warn-fg')}>{v}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[12px] text-ink-muted">
        En naranja, lo que se aparta del valor más común de esa columna.
        {pendientes > 0 && \` Midiendo… faltan \${pendientes}.\`}
        {fallidas.length > 0 && \` No se pudo medir: \${fallidas.map((t) => t.nombre).join(', ')}.\`}
      </p>
      {distintas.length > 0 && (
        <div>
          <h3 className="text-[13px] font-semibold">Where they disagree</h3>
          <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-[13px] text-ink-medium">
            {distintas.map(({ c, i, grupos }) => (
              <li key={c.titulo}>
                <b className="text-ink">{c.titulo}.</b>{' '}
                {grupos.map((g) => {
                  const cuales = medidos.filter(({ m }) => c.valor(m) === g).map(({ t }) => t.nombre)
                  return (
                    <span key={g} className="mr-2">
                      <Codigo>{g}</Codigo> in {cuales.length}{g !== modas[i] && cuales.length <= 4 ? \` (\${cuales.join(', ')})\` : ''};
                    </span>
                  )
                })}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function Anatomia({ medidas }: { medidas: Record<string, Resultado> }) {
  const ms = TABLAS.map((t) => medidas[t.archivo]).filter((m): m is Medida => typeof m === 'object')
  if (!ms.length) return <p className="text-[13px] text-ink-muted">Measuring the tables…</p>
  const v = (f: (m: Medida) => string) => moda(ms.map(f))
  const veces = (f: (m: Medida) => string) => ms.filter((m) => f(m) === v(f)).length
  const de = (f: (m: Medida) => string) => \`\${veces(f)} of \${ms.length}\`
  const filas = ms.filter((m) => m.fila)
  return (
    <div className="grid grid-cols-1 gap-3 text-[13px] text-ink-medium sm:grid-cols-2">
      <p><b className="text-ink">Container.</b> {v((m) => m.contenedor.radio)} radius, a 1px {v((m) => m.contenedor.borde)} border and {v((m) => m.contenedor.fondo)} fill ({de((m) => \`\${m.contenedor.radio}\${m.contenedor.borde}\${m.contenedor.fondo}\`)} tables). Wide tables scroll inside the container.</p>
      <p><b className="text-ink">Header row.</b> Fill <Codigo>{v((m) => m.encabezado.fondo)}</Codigo>, text <Codigo>{v((m) => m.encabezado.texto)}</Codigo> in <Codigo>{v((m) => m.encabezado.color)}</Codigo>, {v((m) => String(m.encabezado.mayusculas)) === 'true' ? 'uppercase' : 'not uppercase'} ({de((m) => \`\${m.encabezado.fondo}\${m.encabezado.texto}\${m.encabezado.color}\`)} tables).</p>
      <p><b className="text-ink">Rows.</b> {moda(filas.map((m) => m.fila!.texto))} text in <Codigo>{moda(filas.map((m) => m.fila!.color))}</Codigo>, divided by <Codigo>{moda(filas.map((m) => m.fila!.divisor))}</Codigo>. Row height is not fixed: it goes from {Math.min(...filas.map((m) => m.fila!.alto))}px to {Math.max(...filas.map((m) => m.fila!.alto))}px because each table sets its own vertical padding.</p>
      <p><b className="text-ink">Cells.</b> Plain text; avatar with initials next to a name; <Codigo>Pill</Codigo> for a status; a checkbox for selection; <Codigo>RowActionsMenu</Codigo> for row actions. Which of these a table has is measured per table below.</p>
      <p><b className="text-ink">Footer.</b> Most tables close with a “Showing X of N” counter, some with <Codigo>Pagination</Codigo>. With no rows they show <Codigo>EmptyState</Codigo>.</p>
      <p><b className="text-ink">Toolbar.</b> Above the container, not inside it: search, a filter and the main action (see Elements / Buttons, Primary). It belongs to the screen, so it only appears in the page stories.</p>
    </div>
  )
}

function Etiquetas({ titulo, items, vacio, tono }: { titulo: string; items: string[]; vacio: string; tono: 'medida' | 'codigo' }) {
  return (
    <p className="flex flex-wrap items-center gap-1.5 text-[11.5px]">
      <span className="w-[74px] shrink-0 text-ink-muted">{titulo}</span>
      {items.length
        ? items.map((i) => <span key={i} className={cn('rounded px-1.5 py-0.5', tono === 'medida' ? 'bg-dash-count-bg text-dash-blue-hover' : 'bg-surface-muted text-ink-soft')}>{i}</span>)
        : <span className="text-ink-faint">{vacio}</span>}
    </p>
  )
}

function Pagina() {
  const { ref, medidas } = useMedidas()
  return (
    <Page
      titulo="Tables"
      bajada={\`Las \${TABLAS.length} tablas de la app, medidas sobre la pantalla real: columnas, estilos y funciones salen de lo que se dibuja hoy. Hay dos construcciones: <table> nativo (Clinical y el resumen de seguros del paciente) y filas de <div> con anchos por columna (todo lo demás). Roles (Settings) parece una tabla pero es una lista de tarjetas desplegables: está en Components / Settings.\`}
    >
      <iframe ref={ref} title="Table measurement" aria-hidden tabIndex={-1} className="pointer-events-none fixed top-0 -left-[10000px] h-[900px] w-[1280px] border-0" />

      <Seccion titulo="How they differ" nota="Cada fila es una tabla medida en pantalla. Si dos tablas deberían verse iguales, acá se ve cuáles no.">
        <Comparacion medidas={medidas} />
      </Seccion>

      <Seccion titulo="Anatomy" nota="Los valores son los más comunes entre las tablas medidas; las excepciones están arriba.">
        <Anatomia medidas={medidas} />
      </Seccion>

      <Seccion titulo="Index" nota="Una ficha por tabla. Todo salvo la primera línea se mide o se lee del código.">
        <div className="flex flex-col gap-6">
          {TABLAS.map((t) => {
            const texto = fuentes[\`/src/\${t.archivo}\`] ?? ''
            const m = medidas[t.archivo]
            const medida = typeof m === 'object' ? m : null
            const delCodigo = t.archivoCompartido ? [] : DEL_CODIGO.filter(([, re]) => re.test(texto)).map(([n]) => n)
            return (
              <article key={t.archivo} className="overflow-hidden rounded-lg border border-line bg-white">
                <header className="flex flex-col gap-2 border-b border-line-soft p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[14px] font-semibold">{t.nombre}</h3>
                    <Codigo>src/{t.archivo}</Codigo>
                  </div>
                  <p className="max-w-[80ch] text-[12.5px] text-ink-medium">{t.uso}</p>
                  {medida ? (
                    <>
                      <Etiquetas titulo="Columns" items={medida.columnas} vacio="none found" tono="codigo" />
                      <Etiquetas titulo="In the table" items={medida.dentro} vacio="nothing beyond text" tono="medida" />
                      <Etiquetas titulo="Around it" items={medida.alrededor} vacio="none on this story" tono="medida" />
                      <Etiquetas titulo="In the code" items={delCodigo} vacio={t.archivoCompartido ? 'the file holds a whole page: not checked' : '—'} tono="codigo" />
                    </>
                  ) : (
                    <p className="text-[12px] text-ink-muted">{m === 'error' ? 'This table could not be measured.' : 'Measuring…'}</p>
                  )}
                </header>
                <iframe title={t.nombre} loading="lazy" src={\`iframe.html?id=\${t.historia}&viewMode=story\`} className="h-[520px] w-full border-0 bg-page-background" />
              </article>
            )
          })}
        </div>
      </Seccion>

      <Seccion titulo="Cell recipes found in code" nota="Los <table>, <th> y <td> con clases propias. Las tablas de <div> no aparecen acá: sus celdas usan los looks de texto y pastilla.">
        <PaginaDeRecetas tipo="table" familiaDe={familiaTabla} orden={['Table', 'Header cell', 'Data cell']} estados={false} />
      </Seccion>
    </Page>
  )
}

export const Tablas: Story = {
  name: 'Tables',
  render: () => <Pagina />,
}
`})))()}export{n,i as r,r as t};