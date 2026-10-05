import type { Meta, StoryObj } from '@storybook/react-vite'
import { ClinicalBadge, type EstadoBadge, type ResultadoBadge, type TipoBadge } from './ClinicalBadge'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla, Token, useMedidas } from '@/design-system/kit'
import { tokensDe } from '@/design-system/medir'

const TIPOS: TipoBadge[] = ['CC', 'TR']
const RESULTADOS: ResultadoBadge[] = ['ok', 'no']
const ESTADOS: EstadoBadge[] = ['active', 'inactive', 'disabled']
const NOMBRE: Record<TipoBadge, string> = { CC: 'Chief Complaint', TR: 'Triage' }

const meta = {
  title: 'Components/Clinical/ClinicalBadge',
  component: ClinicalBadge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Los badges del header de Clinical Mode (Figma *Design system · 2.0*, 254:2930): **CC** (Chief Complaint) y **TR** (Triage), con tilde si está hecho y cruz si no. Cada uno en tres estados: *active* (lleno), *inactive* (suave) y *disabled* (gris, sin dato).',
          '',
          '**Probalo:** en *Playground* cambiá tipo, resultado, estado y tamaño desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { tipo: 'CC', resultado: 'ok', estado: 'active', size: 'md' },
  argTypes: {
    tipo: { control: 'inline-radio', options: TIPOS, description: 'CC (Chief Complaint) o TR (Triage).' },
    resultado: { control: 'inline-radio', options: RESULTADOS, description: 'ok: tilde, hecho. no: cruz, falta o negativo.' },
    estado: { control: 'inline-radio', options: ESTADOS, description: 'active lleno, inactive suave, disabled sin dato.' },
    size: { control: 'inline-radio', options: ['sm', 'md'], description: 'sm es el de Figma; md, el del header.' },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof ClinicalBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/* Los doce de Figma: cada tipo con tilde y con cruz, en sus tres estados. */
export const States: Story = {
  parameters: { controls: { include: ['size'] } },
  render: ({ size }) => (
    <Lienzo>
      <Tabla encabezado={['Badge', ...ESTADOS]} minimo={420}>
        {TIPOS.flatMap((t) => RESULTADOS.map((r) => (
          <tr key={`${t}-${r}`}>
            <td className="font-semibold">{NOMBRE[t]}{r === 'no' ? ' – Negative' : ''}</td>
            {ESTADOS.map((e) => <td key={e}><ClinicalBadge tipo={t} resultado={r} estado={e} size={size} /></td>)}
          </tr>
        )))}
      </Tabla>
    </Lienzo>
  ),
}

function FilaTamano({ s }: { s: 'sm' | 'md' }) {
  const { ref, m } = useMedidas()
  return (
    <tr>
      <td><div ref={ref}><ClinicalBadge tipo="CC" size={s} /></div></td>
      <td className="font-semibold">{s}</td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m?.padding}</td>
      <td className="tabular-nums">{m?.texto} · {m?.peso}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Sizes" nota="sm es el tamaño de Figma (22 de alto); md, el del header, para que el tilde se lea.">
        <Tabla encabezado={['Sample', 'Size', 'Height', 'Padding', 'Text']}>
          {(['sm', 'md'] as const).map((s) => <FilaTamano key={s} s={s} />)}
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors" nota="Tokens de cada combinación, de ClinicalBadge.tsx y src/index.css.">
        <Tabla encabezado={['Result', 'State', 'Sample', 'Fill', 'Text']} minimo={620}>
          {RESULTADOS.flatMap((r) => ESTADOS.map((e) => {
            const muestra = <ClinicalBadge tipo="TR" resultado={r} estado={e} />
            const clases = { ok: { active: 'bg-status-ok text-white', inactive: 'bg-status-ok-muted text-status-ok-strong', disabled: 'bg-surface-muted text-line-strong' }, no: { active: 'bg-required text-white', inactive: 'bg-status-bad-muted text-status-bad-strong', disabled: 'bg-surface-muted text-line-strong' } }[r][e]
            const k = tokensDe(clases)
            return (
              <tr key={`${r}-${e}`}>
                <td className="font-semibold">{r}</td>
                <td>{e}</td>
                <td>{muestra}</td>
                <td><Token nombre={k.fondo} /></td>
                <td><Token nombre={k.texto} /></td>
              </tr>
            )
          }))}
        </Tabla>
      </Bloque>
      <Muestras>
        {TIPOS.map((t) => <ConRotulo key={t} rotulo={NOMBRE[t]}><ClinicalBadge tipo={t} size="md" /></ConRotulo>)}
      </Muestras>
    </Lienzo>
  ),
}
