import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, type ButtonProps } from '@/components/ui/button'
import { Codigo, Page, Seccion } from './Page'
import { FAMILIA_DESHABILITADO, IndiceDeFamilias, InventarioCompleto, ResumenDeEstados, SeccionDeFamilia, familiaBoton, meta, recetas } from './Recipes'

const meta_ = {
  title: 'Patterns/Buttons',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta_
type Story = StoryObj<typeof meta_>

const FAMILIAS = ['Primary (solid blue)', 'Outline', 'Text link', 'Icon-only', 'Floating round', 'Destructive', FAMILIA_DESHABILITADO, 'List row / menu item', 'Other']

const DESCRIPCIONES: Record<string, string> = {
  'Primary (solid blue)': 'The main action of a screen or dialog: Save, Next, New… Solid brand blue with white text.',
  Outline: 'A secondary action with a border and a white or transparent fill: Cancel, Back, Export.',
  'Text link': 'An action that reads as a link: blue text that underlines on hover.',
  'Icon-only': 'Square buttons that only hold an icon: close, more, toolbar tools. They need an aria-label.',
  'Floating round': 'Round buttons with a shadow that float over content.',
  Destructive: 'Actions that delete or discard, in red.',
  [FAMILIA_DESHABILITADO]: 'Looks the code paints by hand to say “not available”, instead of using the disabled attribute.',
  'List row / menu item': 'A full-width row that behaves like a button: menu items, list entries, selectable cards.',
  Other: 'Buttons that do not fit any family above, or that only carry layout classes.',
}

/* El componente oficial, dibujado con todas sus variantes y estados. */
const VARIANTES: NonNullable<ButtonProps['variant']>[] = ['default', 'secondary', 'destructive', 'success', 'outline', 'ghost', 'link']
const COLUMNAS: [string, string, boolean][] = [
  ['Default', '', false],
  ['Hover', 'pseudo-hover', false],
  ['Focus', 'pseudo-focus-visible pseudo-focus', false],
  ['Active', 'pseudo-active', false],
  ['Disabled', '', true],
]

function Referencia() {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[640px] text-left text-[12px]">
        <thead className="bg-surface-subtle text-[10px] tracking-wide text-ink-muted uppercase">
          <tr><th className="px-3 py-2">Variant</th>{COLUMNAS.map(([n]) => <th key={n} className="px-3 py-2">{n}</th>)}</tr>
        </thead>
        <tbody>
          {VARIANTES.map((v) => (
            <tr key={v} className="border-t border-line-soft">
              <td className="px-3 py-3"><Codigo>{v}</Codigo></td>
              {COLUMNAS.map(([n, pseudo, off]) => (
                <td key={n} className="px-3 py-3"><Button variant={v} className={pseudo} disabled={off}>Button</Button></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const Botones: Story = {
  name: 'Buttons',
  render: () => {
    const botones = recetas.filter((r) => r.tipo === 'button')
    const total = meta.elementos.button ?? 0
    return (
      <Page
        titulo="Buttons"
        bajada={\`Los \${total} botones de la app, leídos del código. Cada uno se dibuja como es de verdad, con lo que hace al pasar el mouse, al enfocarlo con teclado y al deshabilitarlo. Donde el look no define un estado, la celda lo dice en vez de repetir el botón.\`}
      >
        <ResumenDeEstados de={botones} total={total} />

        <Seccion titulo="Families at a glance" nota="Las familias se deducen de las clases de cada look. Los números en naranja son estados que ningún look de la familia define. Hacé clic en una familia para ir a su detalle.">
          <IndiceDeFamilias tipo="button" familiaDe={familiaBoton} orden={FAMILIAS} descripciones={DESCRIPCIONES} />
        </Seccion>

        <Seccion
          titulo="The official component: ui/Button"
          nota={\`El componente Button de components/ui define los cuatro estados para cada variante, con foco visible. La app lo usa en \${meta.usosDeButtonUI} lugares: todo lo demás son <button> con clases propias, que son las familias de abajo.\`}
        >
          <Referencia />
        </Seccion>

        {FAMILIAS.map((f) => {
          const de = botones.filter((r) => familiaBoton(r) === f)
          return de.length ? <SeccionDeFamilia key={f} familia={f} de={de} descripcion={DESCRIPCIONES[f]} /> : null
        })}

        <Seccion titulo="Full inventory" nota="Todos los looks en una sola tabla, para buscar por clase, texto o archivo y filtrar los que les falta un estado.">
          <InventarioCompleto tipo="button" familiaDe={familiaBoton} />
        </Seccion>
      </Page>
    )
  },
}
`})))()}export{n,i as r,r as t};