import { useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { aviso } from '@/components/ui/toaster'
import { Bloque, Lienzo, Tabla, TablaPartes, Token } from '@/design-system/kit'
import { ULTIMA_CONDICION, type UltimaCondicion } from '@/data/clinical-mode'
import { OdontogramaLectura, OdontogramaOverview } from './OdontogramaOverview'

/* Playground, Parts, States y Specs. La librería del odontograma es una sola por página: cada chart va en su propio
   iframe (clinical-mode.md, 2026-10-18). */

const CONDICIONES = {
  'Caries · tooth 3 (frame)': ULTIMA_CONDICION,
  'Charted now · tooth 13': { condicion: 'Resin-based composite crown, anterior', actualizado: '18/10/2026', pieza: 13, examen: 'Dental Assessment' },
  'Without a tooth': { condicion: 'Mucocele', actualizado: '21/06/2026', pieza: null, examen: 'Intraoral' },
  'Long name': { condicion: 'Periodontal scaling and root planing – four or more teeth per quadrant', actualizado: '18/10/2026', pieza: 19, examen: 'Periodontal' },
} satisfies Record<string, UltimaCondicion>
type Condicion = keyof typeof CONDICIONES

type Args = { expanded: boolean; condition: Condicion }

const meta = {
  title: 'Components/Clinical/Overview chart',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 820 },
      description: {
        component: [
          'El chart del Overview de Clinical Mode: **el mismo odontograma de DentAssmt, de sólo lectura**, con lo mismo cargado. No tiene controles ni se puede tocar: es para mirar el estado del paciente al entrar. La pieza de la **última condición** queda resaltada (borde azul y el número en una pastilla) y el aviso de abajo dice cuál es y cuándo se cargó.',
          '',
          '**Cómo se usa:** la última condición es la del frame (la caries de la pieza 3) hasta que se carga otra con **Add Condition** en cualquier examen; ahí pasa a ser esa. **Show details** lleva al examen donde se cargó; si es DentAssmt, abre con la pieza ya elegida. El botón de arriba amplía el chart y esconde Treatment Plan y la Problem List.',
          '',
          '**Probalo:** en *Playground* elegí la condición y ampliá el chart desde *Controls*; tocá *Show details* para ver adónde iría. *Parts* dice qué hace cada parte, *States* lista cada caso (cada uno es su historia) y *Specs* trae medidas y colores.',
        ].join('\n'),
      },
    },
  },
  args: { expanded: false, condition: 'Caries · tooth 3 (frame)' },
  argTypes: {
    expanded: { control: 'boolean', description: 'Ampliado: en la pantalla esconde Treatment Plan y la Problem List; el chart va de 900 a 1100px, centrado.' },
    condition: { control: 'inline-radio', options: Object.keys(CONDICIONES), description: 'La última condición: la del frame, una recién cargada, una sin pieza (no resalta nada) o una con nombre largo (se corta).' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const enIframe = { controls: { disable: true }, docs: { story: { inline: false, iframeHeight: 820 } } }

/* El chart sobre el fondo de la página, al ancho de la columna del Overview a 1440. */
function Demo({ condicion, ampliado: inicial = false }: { condicion: Condicion; ampliado?: boolean }) {
  const [ampliado, setAmpliado] = useState(inicial)
  return (
    <div className="bg-page-background min-h-[800px] p-6">
      <div className={ampliado ? 'max-w-[1344px]' : 'max-w-[968px]'}>
        <OdontogramaOverview
          ultima={CONDICIONES[condicion]}
          ampliado={ampliado}
          onAmpliar={() => setAmpliado((v) => !v)}
          onDetalle={(p) => aviso.info(`Opens ${p}${p === 'DentAssmt' && CONDICIONES[condicion].pieza ? ` with tooth ${CONDICIONES[condicion].pieza} selected` : ''}.`)}
        />
      </div>
    </div>
  )
}

/* Cambiá todo desde Controls. */
export const Playground: Story = {
  render: ({ expanded, condition }) => <Demo key={`${expanded}-${condition}`} condicion={condition} ampliado={expanded} />,
}

/* ── Parts ─────────────────────────────────────────────────────────── */

export const Parts: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts" nota="Reemplaza al odontograma propio que tenía el Overview (Odontogram, que sigue en el Builder): el chart es el de DentAssmt, así se ve lo mismo en los dos lados.">
        <TablaPartes partes={[
          ['Canvas', 'Fondo punteado del frame, en una card de la página. El chart scrollea a lo ancho adentro si no entra.', 'OdontogramaOverview'],
          ['Dental chart', 'La grilla de react-advanced-odontogram con readOnly: sin la ayuda "Click a tooth…", sin Status / Plan y sin los botones de vista. Lo cargado es lo de DentAssmt.', 'OdontogramaLectura'],
          ['Last condition tooth', 'Borde azul y fondo celeste en sus dos celdas, y el número en una pastilla azul. Sin pieza no se resalta nada.', 'OdontogramaLectura pieza'],
          ['Expand', 'Amplía el chart y esconde Treatment Plan y la Problem List; vuelve con el mismo botón (aria-pressed).', 'OdontogramaOverview'],
          ['Last Condition', 'Qué se cargó último y cuándo (Last Update). El nombre se corta en una línea; el completo va en el tooltip.', 'OdontogramaOverview'],
          ['Show details', 'Lleva al examen donde se cargó la condición; en DentAssmt, con la pieza elegida. Sin examen con pestaña no aparece.', 'OdontogramaOverview onDetalle'],
        ]} />
      </Bloque>
      <Bloque titulo="Where the last condition comes from">
        <Tabla encabezado={['Case', 'Last Condition', 'Tooth', 'Show details']} minimo={640} arriba>
          <tr><td className="font-semibold">Al entrar</td><td>La del frame: Caries, 20/06/2025 (Problem List p5).</td><td>3, con la caries oclusal pintada.</td><td>DentAssmt con la 3 elegida.</td></tr>
          <tr><td className="font-semibold">Add Condition en un examen</td><td>El procedimiento elegido y la fecha de hoy.</td><td>La del drawer; sin pieza, ninguna.</td><td>Ese examen.</td></tr>
          <tr><td className="font-semibold">Add Procedure</td><td>No cambia: es algo planeado, no una condición.</td><td>—</td><td>—</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* ── States (cada uno en su iframe) ───────────────────────────────── */

const ESTADOS: [string, string, string][] = [
  ['Default', 'Al entrar a Clinical Mode: la caries de la pieza 3.', 'Default'],
  ['Charted now', 'Después de Add Condition en DentAssmt sobre la 13: cambia el aviso y la pieza resaltada.', 'ChartedNow'],
  ['Without a tooth', 'Condición de una zona (Mucocele, Intraoral): no se resalta ninguna pieza; Show details va a Intra Oral.', 'WithoutATooth'],
  ['Long name', 'El nombre se corta en una línea para no tapar los números de abajo.', 'LongName'],
  ['Expanded', 'El chart ampliado, con el botón presionado.', 'Expanded'],
  ['Chart only', 'La grilla de sólo lectura sola, con la pieza 3 resaltada.', 'ChartOnly'],
]

export const States: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States" nota="Cada estado es su propia historia, en su iframe: la librería del odontograma no puede estar dos veces en la misma página. Abrilas desde la barra lateral de Storybook.">
        <Tabla encabezado={['State', 'When', 'Story']} minimo={640}>
          {ESTADOS.map(([estado, cuando, historia]) => (
            <tr key={estado}>
              <td className="font-semibold whitespace-nowrap">{estado}</td>
              <td className="text-ink-medium">{cuando}</td>
              <td className="font-mono text-[12px] text-ink-muted">{historia}</td>
            </tr>
          ))}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const Default: Story = { parameters: enIframe, render: () => <Demo condicion="Caries · tooth 3 (frame)" /> }
export const ChartedNow: Story = { parameters: enIframe, render: () => <Demo condicion="Charted now · tooth 13" /> }
export const WithoutATooth: Story = { parameters: enIframe, render: () => <Demo condicion="Without a tooth" /> }
export const LongName: Story = { parameters: enIframe, render: () => <Demo condicion="Long name" /> }
export const Expanded: Story = { parameters: enIframe, render: () => <Demo condicion="Caries · tooth 3 (frame)" ampliado /> }
export const ChartOnly: Story = {
  parameters: enIframe,
  render: () => <div className="bg-page-background p-6"><div className="max-w-[936px]"><OdontogramaLectura pieza={3} /></div></div>,
}

/* ── Specs ─────────────────────────────────────────────────────────── */

const Fila = ({ a, b }: { a: string; b: ReactNode }) => <tr><td className="font-semibold">{a}</td><td>{b}</td></tr>

export const Specs: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <Fila a="Card" b="Card de la página (rounded-lg, shadow-panel, sin borde). Padding 16px y 64px abajo, para el aviso." />
          <Fila a="Canvas" b="Puntos de 1px cada 16px sobre el fondo de la página." />
          <Fila a="Chart" b="Mínimo 720px (debajo scrollea adentro de la card); ampliado, de 900 a 1100px y centrado." />
          <Fila a="Expand" b="32×32, radio 8, borde line; arriba a la derecha a 12px." />
          <Fila a="Last Condition" b="Abajo a la derecha a 12px, hasta 600px; en el celular, todo el ancho y en dos líneas. Padding 12×8, radio 8. Título 13px Semibold, fecha 11px." />
          <Fila a="Show details" b="11px Semibold, padding 10×4, radio 6." />
          <Fila a="Last condition tooth" b="Las dos celdas de la pieza con borde y fondo; el número en una pastilla de 36px de ancho mínimo, radio 6." />
          <Fila a="Caries" b="Rojo, también en las caras oclusal, mesial y distal (antes quedaban en el negro de la librería)." />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={480}>
          <Fila a="Last condition tooth, border and number" b={<Token nombre="dash-blue" />} />
          <Fila a="Last condition tooth, fill" b={<Token nombre="dash-count-bg" />} />
          <Fila a="Warning icon" b={<Token nombre="warn-fg" />} />
          <Fila a="Show details" b={<Token nombre="dash-blue" />} />
          <Fila a="Date" b={<Token nombre="ink-muted" />} />
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <Tabla encabezado={['Rule', 'Why']} minimo={560}>
          <Fila a="Sólo lectura" b="El Overview es para mirar; se carga en DentAssmt o con Add Condition. Tocar una pieza no hace nada." />
          <Fila a="Un solo odontograma" b="DentAssmt y el Overview muestran lo mismo: la librería borra su estado al salir, así que se guarda y se vuelve a cargar (estadoOdontograma)." />
          <Fila a="Uno por página" b="La librería busca sus nodos por id: nunca dos charts montados a la vez." />
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
