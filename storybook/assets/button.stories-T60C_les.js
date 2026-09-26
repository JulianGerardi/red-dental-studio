import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Download, Plus, Send, Trash2 } from 'lucide-react'
import { BUTTON_SIZES, BUTTON_VARIANTS, Button, type ButtonProps, type ButtonSize, type ButtonVariant } from './button'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla, Token, useMedidas } from '@/design-system/kit'
import { tokensDe } from '@/design-system/medir'

const ICONOS = { none: null, Plus, Download, Send, Trash2, ArrowRight } as const
type Estado = 'default' | 'hover' | 'pressed' | 'focus'
type Args = ButtonProps & { icon: keyof typeof ICONOS; iconPosition: 'start' | 'end'; label: string; state: Estado }

const VARIANTES = Object.keys(BUTTON_VARIANTS) as ButtonVariant[]
const TAMANOS = Object.keys(BUTTON_SIZES) as ButtonSize[]

const USO: Record<ButtonVariant, string> = {
  primary: 'The main action of the screen or dialog. Only one per view.',
  secondary: 'Next to the primary one: Cancel, Back, Export.',
  ghost: 'Low emphasis, no box: toolbars and row actions.',
  link: 'Reads as a link: navigate or see more.',
  destructive: 'Deletes or discards. Usually inside a confirmation dialog.',
}
const ALTO: Record<ButtonSize, string> = { sm: '28px', md: '32px', lg: '36px' }

/* Estado forzado con el addon de pseudo-estados: la clase va en un
   contenedor y aplica a todo lo de adentro. */
const PSEUDO: Record<Estado, string> = { default: '', hover: 'pseudo-hover-all', pressed: 'pseudo-active-all', focus: 'pseudo-focus-visible-all pseudo-focus-all' }

const meta = {
  title: 'Elements/Buttons',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El botón estándar de la app (\`@/components/ui/button\`). Cada variante es el look más usado en el código para ese tipo de botón y los tamaños son las tres alturas más usadas.',
          '',
          '**Cuál usar:** *Primary* para la acción principal (una por vista) · *Secondary* para la alternativa (Cancel, Back) · *Ghost* para acciones de poco peso · *Link* para navegar · *Destructive* para borrar o descartar.',
          '',
          '**Probalo:** en *Playground* cambiá variante, tamaño, texto, ícono y estado desde el panel *Controls*.',
        ].join('\\n'),
      },
    },
  },
  args: { variant: 'primary', size: 'lg', label: 'Save', icon: 'none', iconPosition: 'start', iconOnly: false, disabled: false, loading: false, state: 'default' },
  argTypes: {
    variant: { control: 'inline-radio', options: VARIANTES, description: 'Tipo de botón.' },
    size: { control: 'inline-radio', options: TAMANOS, description: 'sm 28px · md 32px · lg 36px.' },
    label: { control: 'text', description: 'Texto del botón.' },
    icon: { control: 'select', options: Object.keys(ICONOS), description: 'Ícono de lucide-react.' },
    iconPosition: { control: 'inline-radio', options: ['start', 'end'], description: 'Antes o después del texto.' },
    iconOnly: { control: 'boolean', description: 'Botón cuadrado con sólo el ícono. Necesita aria-label.' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean', description: 'Spinner y deshabilitado mientras dura la acción.' },
    state: { control: 'inline-radio', options: ['default', 'hover', 'pressed', 'focus'], description: 'Fuerza un estado para verlo sin interactuar.', table: { category: 'Preview' } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Demo({ icon, iconPosition, label, state, ...props }: Args) {
  const Icono = ICONOS[icon] ?? (props.iconOnly ? Plus : null)
  const i = Icono ? <Icono /> : null
  return (
    <div className={PSEUDO[state]}>
      <Button {...props} aria-label={props.iconOnly ? label : undefined}>
        {props.iconOnly ? i : <>{iconPosition === 'start' && i}{label}{iconPosition === 'end' && i}</>}
      </Button>
    </div>
  )
}

/* Cambiá todo desde Controls. */
export const Playground: Story = {
  render: (args) => <Demo {...args} />,
}

export const Variants: Story = {
  parameters: { controls: { include: ['size', 'label'] } },
  render: ({ size, label }) => (
    <Lienzo>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        {VARIANTES.map((v) => (
          <div key={v} className="flex flex-col items-start gap-2">
            <Button variant={v} size={size}>{v === 'destructive' ? 'Delete' : label}</Button>
            <p className="text-[12px] font-semibold capitalize">{v}</p>
            <p className="text-[12px] leading-snug text-ink-muted">{USO[v]}</p>
          </div>
        ))}
      </div>
    </Lienzo>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { include: ['variant', 'label'] } },
  render: ({ variant, label }) => (
    <Lienzo>
      <Muestras>
        {TAMANOS.map((s) => (
          <ConRotulo key={s} rotulo={\`\${s} · \${ALTO[s]}\`}><Button variant={variant} size={s}>{label}</Button></ConRotulo>
        ))}
        {TAMANOS.map((s) => (
          <ConRotulo key={\`i-\${s}\`} rotulo={\`icon \${s}\`}><Button variant={variant} size={s} iconOnly aria-label="Add"><Plus /></Button></ConRotulo>
        ))}
      </Muestras>
    </Lienzo>
  ),
}

const COLUMNAS_ESTADO: [string, Estado | 'disabled' | 'loading'][] = [
  ['Default', 'default'], ['Hover', 'hover'], ['Pressed', 'pressed'], ['Focus (keyboard)', 'focus'], ['Disabled', 'disabled'], ['Loading', 'loading'],
]

export const States: Story = {
  parameters: { controls: { include: ['size'] } },
  render: ({ size }) => (
    <Lienzo>
      <Tabla encabezado={['Variant', ...COLUMNAS_ESTADO.map(([n]) => n)]} minimo={820}>
        {VARIANTES.map((v) => (
          <tr key={v}>
            <td className="font-semibold capitalize">{v}</td>
            {COLUMNAS_ESTADO.map(([n, e]) => (
              <td key={n}>
                <div className={e === 'disabled' || e === 'loading' ? '' : PSEUDO[e]}>
                  <Button variant={v} size={size} disabled={e === 'disabled'} loading={e === 'loading'}>{v === 'destructive' ? 'Delete' : 'Save'}</Button>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </Tabla>
    </Lienzo>
  ),
}

export const WithIcon: Story = {
  parameters: { controls: { include: ['variant', 'size'] } },
  render: ({ variant, size }) => (
    <Muestras>
      <ConRotulo rotulo="Icon first"><Button variant={variant} size={size}><Plus />New patient</Button></ConRotulo>
      <ConRotulo rotulo="Icon last"><Button variant={variant} size={size}>Next<ArrowRight /></Button></ConRotulo>
      <ConRotulo rotulo="Icon only"><Button variant={variant} size={size} iconOnly aria-label="Download"><Download /></Button></ConRotulo>
    </Muestras>
  ),
}

function FilaTamano({ s }: { s: ButtonSize }) {
  const { ref, m } = useMedidas()
  return (
    <tr>
      <td><div ref={ref}><Button size={s}><Plus />Save</Button></div></td>
      <td className="font-semibold">{s}</td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m?.padding}</td>
      <td className="tabular-nums">{m?.texto} · {m?.peso}</td>
      <td className="tabular-nums">{m?.radio}</td>
      <td className="tabular-nums">{m?.gap}</td>
      <td className="tabular-nums">{m?.icono}</td>
    </tr>
  )
}

/* Medidas y colores, leídos del botón dibujado y de src/index.css. */
export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas del botón ya dibujado.">
        <Tabla encabezado={['Sample', 'Size', 'Height', 'Padding', 'Text', 'Radius', 'Gap', 'Icon']} minimo={760}>
          {TAMANOS.map((s) => <FilaTamano key={s} s={s} />)}
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors" nota="Los tokens de cada variante. Salen de button.tsx y su valor de src/index.css: si cambia uno, cambia acá.">
        <Tabla encabezado={['Variant', 'Fill', 'Text', 'Border', 'Hover fill', 'Focus ring']} minimo={900}>
          {VARIANTES.map((v) => {
            const t = tokensDe(BUTTON_VARIANTS[v])
            return (
              <tr key={v}>
                <td className="font-semibold capitalize">{v}</td>
                <td><Token nombre={t.fondo} /></td>
                <td><Token nombre={t.texto} /></td>
                <td><Token nombre={t.borde} /></td>
                <td><Token nombre={t.fondoHover} /></td>
                <td><Token nombre={t.foco} /></td>
              </tr>
            )
          })}
        </Tabla>
      </Bloque>
      <Bloque titulo="Shared rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Radius 6px and Medium weight on every size.</li>
          <li>Focus with the keyboard: 2px ring, 2px away from the button, in the variant’s color.</li>
          <li>Disabled and loading: 40% opacity and no pointer events.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
`})))()}export{n,i as r,r as t};