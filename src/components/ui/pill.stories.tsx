import type { Meta, StoryObj } from '@storybook/react-vite'
import { PILL_SIZES, PILL_TONES, Pill, type PillTone } from './pill'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla, Token, useMedidas } from '@/design-system/kit'
import { tokensDe } from '@/design-system/medir'

const TONOS = Object.keys(PILL_TONES) as PillTone[]
const TAMANOS = Object.keys(PILL_SIZES) as (keyof typeof PILL_SIZES)[]

const USO: Record<PillTone, string> = {
  success: 'Done or OK: Active, Signed, Fulfilled.',
  info: 'Scheduled or informative: Booked, Completed.',
  warning: 'Needs attention: Pending, Proposed, Delayed.',
  danger: 'Failed or stopped: Canceled, Rejected.',
  neutral: 'Not active, no emphasis: Draft, Removed.',
  purple: 'A state that needs its own color: In progress, Requested.',
}

const meta = {
  title: 'Elements/Pills',
  component: Pill,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'La pastilla de estado de la app (`@/components/ui/pill`). Dice en qué estado está algo: un paciente, una firma, una cita. No es un botón: no se hace clic.',
          '',
          '**Probalo:** en *Playground* cambiá tono, tamaño y texto desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { tone: 'success', size: 'md', children: 'Active' },
  argTypes: {
    tone: { control: 'inline-radio', options: TONOS, description: 'Color según el estado.' },
    size: { control: 'inline-radio', options: TAMANOS, description: 'md para tablas, sm para espacios chicos.' },
    children: { control: 'text', description: 'Texto del estado.' },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Pill>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Tones: Story = {
  parameters: { controls: { include: ['size'] } },
  render: ({ size }) => (
    <Lienzo>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {TONOS.map((t) => (
          <div key={t} className="flex flex-col items-start gap-2">
            <Pill tone={t} size={size}>{t[0]!.toUpperCase() + t.slice(1)}</Pill>
            <p className="text-[12px] leading-snug text-ink-muted">{USO[t]}</p>
          </div>
        ))}
      </div>
    </Lienzo>
  ),
}

/* Qué estado usa qué tono, leído de las pantallas: cada `Record<…, PillTone>`
   del código. Si el mismo estado aparece con dos tonos, se marca. */
const fuentes = import.meta.glob('/src/**/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
function estadosPorTono() {
  const mapa = new Map<string, Map<PillTone, Set<string>>>()
  for (const [ruta, texto] of Object.entries(fuentes)) {
    if (ruta.includes('.stories.') || ruta.includes('/design-system/')) continue
    for (const bloque of texto.matchAll(/PillTone>\s*=\s*\{([^}]*)\}/g))
      for (const [, estado, tono] of bloque[1]!.matchAll(/['"]?([A-Z][\w ]*)['"]?\s*:\s*'(\w+)'/g)) {
        if (!TONOS.includes(tono as PillTone)) continue
        const porTono = mapa.get(estado!) ?? new Map<PillTone, Set<string>>()
        const archivos = porTono.get(tono as PillTone) ?? new Set<string>()
        archivos.add(ruta.split('/').pop()!.replace('.tsx', ''))
        porTono.set(tono as PillTone, archivos)
        mapa.set(estado!, porTono)
      }
  }
  return [...mapa].sort((a, b) => a[0].localeCompare(b[0]))
}

export const InTheApp: Story = {
  name: 'Statuses in the app',
  parameters: { controls: { disable: true } },
  render: () => {
    const filas = estadosPorTono()
    const conflictos = filas.filter(([, t]) => t.size > 1).length
    return (
      <Lienzo>
        <Bloque nota={`Cada estado con el tono que le da el código. ${conflictos ? `${conflictos} estados usan tonos distintos según la pantalla (en naranja): conviene unificarlos.` : 'Todos los estados usan un solo tono.'}`}>
          <Tabla encabezado={['Status', 'Tone', 'Where']} minimo={560}>
            {filas.map(([estado, porTono]) => (
              <tr key={estado} className={porTono.size > 1 ? 'bg-warn-bg' : ''}>
                <td className="font-semibold">{estado}</td>
                <td><span className="flex flex-wrap gap-1.5">{[...porTono.keys()].map((t) => <Pill key={t} tone={t}>{estado}</Pill>)}</span></td>
                <td className="text-ink-muted">{[...porTono].map(([t, a]) => `${t}: ${[...a].join(', ')}`).join(' · ')}</td>
              </tr>
            ))}
          </Tabla>
        </Bloque>
      </Lienzo>
    )
  },
}

function FilaTamano({ s }: { s: keyof typeof PILL_SIZES }) {
  const { ref, m } = useMedidas()
  return (
    <tr>
      <td><div ref={ref}><Pill tone="success" size={s}>Active</Pill></div></td>
      <td className="font-semibold">{s}</td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m?.padding}</td>
      <td className="tabular-nums">{m?.texto} · {m?.peso}</td>
      <td className="tabular-nums">{m?.radio}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas de la pastilla dibujada.">
        <Tabla encabezado={['Sample', 'Size', 'Height', 'Padding', 'Text', 'Radius']}>
          {TAMANOS.map((s) => <FilaTamano key={s} s={s} />)}
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors" nota="Tokens de cada tono, de pill.tsx y src/index.css.">
        <Tabla encabezado={['Tone', 'Sample', 'Fill', 'Text', 'Border']} minimo={760}>
          {TONOS.map((t) => {
            const k = tokensDe(`border ${PILL_TONES[t]}`)
            return (
              <tr key={t}>
                <td className="font-semibold capitalize">{t}</td>
                <td><Pill tone={t}>Label</Pill></td>
                <td><Token nombre={k.fondo} /></td>
                <td><Token nombre={k.texto} /></td>
                <td><Token nombre={k.borde} /></td>
              </tr>
            )
          })}
        </Tabla>
      </Bloque>
      <Muestras>
        {TAMANOS.map((s) => <ConRotulo key={s} rotulo={s}><Pill tone="info" size={s}>Booked</Pill></ConRotulo>)}
      </Muestras>
    </Lienzo>
  ),
}
