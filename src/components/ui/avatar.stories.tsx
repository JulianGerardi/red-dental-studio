import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserRound } from 'lucide-react'
import { AVATAR_BASE, AVATAR_SIZES, Avatar, type AvatarSize } from './avatar'
import { EditableAvatar } from './editable-avatar'
import { PersonCell } from './data-table'
import { Bloque, ConRotulo, Forzar, Lienzo, Muestras, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'
import { tokensDe } from '@/design-system/medir'

const TAMANOS = Object.keys(AVATAR_SIZES).map(Number) as AvatarSize[]
const FOTO = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c7d9fb"/><stop offset="1" stop-color="#1a4da9"/></linearGradient></defs><rect width="64" height="64" fill="url(#g)"/><circle cx="32" cy="26" r="11" fill="#fff" opacity=".9"/><path d="M12 60c3-12 12-18 20-18s17 6 20 18" fill="#fff" opacity=".9"/></svg>')}`

/* Dónde va cada tamaño, leído de la app. */
const USO: Record<AvatarSize, string> = {
  24: 'Cards de turno de Scheduling y del paciente, barra de Clinical Mode',
  28: 'Filas del Dashboard (turnos y tareas), Pending Task, providers de View filters',
  32: 'Tablas (PersonCell), listas y cards compactas, topbar, Currently being seen',
  36: 'Drawers y cards con tres renglones: Appointment details, Add relationship, Treatments',
  40: 'Relationships, paciente elegido en Billing',
  44: 'Card de turno del Dashboard (la referencia), Owner de la cuenta',
  56: 'Ficha de un empleado',
  62: 'Panel del paciente',
  72: 'Popover del paciente en el Dashboard',
}

const meta = {
  title: 'Elements/Avatars',
  component: Avatar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Las iniciales (o la foto) de una persona (`@/components/ui/avatar`): pacientes, providers, empleados y la cuenta del topbar. **Un solo estilo en toda la app**: cuadrado con esquinas redondeadas, azul con las iniciales en blanco, el del avatar de *Appointments* del Dashboard.',
          '',
          'Antes convivían círculos (tablas de Patients y Employees, Relationships, el panel del paciente) y cuadrados, en azul y en celeste. Ahora la forma y el color son siempre los mismos; lo único que cambia es el tamaño, de una escala de nueve.',
          '',
          '**Probalo:** en *Playground* cambiá las iniciales, el tamaño y poné una foto desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { initials: 'NJ', size: 44, photo: 'none' },
  argTypes: {
    initials: { control: 'text', description: 'Una o dos letras (se cortan en dos y van en mayúscula).' },
    size: { control: 'inline-radio', options: TAMANOS, description: 'Ver *Specs*: 32 en tablas y listas, 44 en la card de turno, 62 en el panel del paciente.' },
    photo: { control: 'inline-radio', options: ['none', 'photo'], mapping: { none: null, photo: FOTO }, description: 'Con foto, las iniciales no se ven.' },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Fondo', 'Azul de la marca, igual para pacientes y equipo.', 'Avatar'],
          ['Iniciales', 'Blanco Semibold, en mayúscula, dos letras como máximo. El tamaño de letra sale del tamaño del avatar.', 'Avatar'],
          ['Esquina', 'rounded-avatar: 27% del lado, así crece con el tamaño (12px a 44, 9px a 32).', 'token --radius-avatar'],
          ['Foto', 'Reemplaza las iniciales, recortada a la misma forma (object-cover).', 'photo'],
          ['Lápiz', 'Sólo en EditableAvatar: con hover o foco, un velo oscuro con el lápiz abre el selector de archivos.', 'EditableAvatar'],
        ]} />
      </Bloque>
      <Bloque titulo="Person vs thing" nota="El avatar es sólo para personas. Una locación lleva sus iniciales en celeste (Location selector) y la marca de la clínica sigue redonda: así no se confunden con alguien.">
        <Muestras>
          <ConRotulo rotulo="Persona"><Avatar initials="SS" /></ConRotulo>
          <ConRotulo rotulo="Locación"><span className="bg-dash-count-bg text-dash-blue-hover flex size-8 items-center justify-center rounded-md text-[11px] font-semibold">AB</span></ConRotulo>
          <ConRotulo rotulo="Sin nadie (ícono)"><span className="flex size-8 items-center justify-center rounded-avatar bg-surface-muted text-ink-faint"><UserRound className="size-4" /></span></ConRotulo>
        </Muestras>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <Muestras>
          <ConRotulo rotulo="Initials"><Avatar initials="EM" size={44} /></ConRotulo>
          <ConRotulo rotulo="One letter"><Avatar initials="M" size={44} /></ConRotulo>
          <ConRotulo rotulo="Long name (two letters max)"><Avatar initials="mja" size={44} /></ConRotulo>
          <ConRotulo rotulo="Photo"><Avatar initials="EM" size={44} photo={FOTO} /></ConRotulo>
          <ConRotulo rotulo="Editable · rest"><EditableAvatar foto={null} iniciales="EM" label="Elena Martinez" size={44} onChange={() => {}} /></ConRotulo>
          <ConRotulo rotulo="Editable · hover">
            <Forzar selector="button" estado="hover" className="flex"><EditableAvatar foto={FOTO} iniciales="EM" label="Elena Martinez" size={44} onChange={() => {}} /></Forzar>
          </ConRotulo>
          <ConRotulo rotulo="Editable · focus">
            <Forzar selector="button" estado="focus-visible" className="flex"><EditableAvatar foto={null} iniciales="EM" label="Elena Martinez" size={44} onChange={() => {}} /></Forzar>
          </ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="In a table" nota="PersonCell: el avatar de 32 y el nombre como link. Igual en Patients y en Employees.">
        <div className="flex w-full max-w-[420px] flex-col divide-y divide-line-row rounded-lg border border-line-row bg-white">
          {[['Abril Viola', 'AV'], ['Elena Martinez', 'EM'], ['Marco Rivera', 'MR']].map(([n, i]) => (
            <div key={n} className="flex h-14 items-center px-4"><PersonCell name={n!} initials={i!} onClick={() => {}} /></div>
          ))}
        </div>
      </Bloque>
    </Lienzo>
  ),
}

function FilaTamano({ s }: { s: AvatarSize }) {
  const { ref, m } = useMedidas()
  return (
    <tr>
      <td><div ref={ref} className="inline-block"><Avatar initials="NJ" size={s} /></div></td>
      <td className="font-semibold tabular-nums">{s}</td>
      <td className="tabular-nums">{m?.texto} · {m?.peso}</td>
      <td className="tabular-nums">27% · {Math.round(s * 0.27)}px</td>
      <td className="text-ink-muted">{USO[s]}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const k = tokensDe(AVATAR_BASE)
    return (
      <Lienzo>
        <Bloque titulo="Sizes" nota="Medidas leídas del avatar dibujado. No hay otros tamaños: si una pantalla necesita uno, se elige el más cercano de la escala.">
          <Tabla encabezado={['Sample', 'Size', 'Text', 'Radius', 'Where']} minimo={760}>
            {TAMANOS.map((s) => <FilaTamano key={s} s={s} />)}
          </Tabla>
        </Bloque>
        <Bloque titulo="Colors" nota="Los mismos para pacientes, providers y empleados.">
          <Tabla encabezado={['Piece', 'Token']}>
            <tr><td className="font-semibold">Fondo</td><td><Token nombre={k.fondo} /></td></tr>
            <tr><td className="font-semibold">Iniciales</td><td><Token nombre={k.texto} /></td></tr>
            <tr><td className="font-semibold">Velo del lápiz (EditableAvatar)</td><td>black 45%</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>
    )
  },
}
