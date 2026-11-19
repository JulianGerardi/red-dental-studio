import type { Meta, StoryObj } from '@storybook/react-vite'
import { DeleteRelationshipDialog, RemoveGuardianDialog } from '@/components/patients/RelationshipDialogs'
import { Bloque, Forzar, Lienzo, Muestra, SpecsMedidas, Tabla, TablaPartes } from '@/design-system/kit'
import { HOUSEHOLD, HogarVacio, MenuAcciones, PersonaCard, RELACIONES } from './Relationships'

/* Playground, Parts, States y Specs de la card de Relationships & Billing, su menú ⋮ y los pop ups de borrar y de quitar
   el acceso de guardián (CON-3999, CON-4113, CON-4139; modulos/relationships.md, 2026-11-03 y 2026-11-18). */

type Grupo = 'Relationship' | 'Household'
type Args = { grupo: Grupo; nombre: string; rol: string; menu: boolean }

const salir = () => {}
const persona = (g: Grupo, nombre: string, rol: string) => ({ ...(g === 'Household' ? HOUSEHOLD[0]! : RELACIONES[0]!), name: nombre, rol })

const meta = {
  title: 'Pages/Parts/Relationships',
  parameters: {
    layout: 'padded',
    docs: {
      jira: ['CON-2879', 'CON-3974', 'CON-3999', 'CON-4113', 'CON-4139'],
      description: {
        component: [
          'La card de una persona en *Relationships & Billing* (`PersonaCard`), en sus dos grupos: las **relaciones** del paciente (Guardian, Guarantor o sólo parentesco) y **Household/Same Guarantor Patients** (los pacientes que comparten Guarantor).',
          '',
          '**Las dos son iguales salvo los datos.** Desde el 2026-11-18 (comentario de Abril en CON-4139):',
          '- **El nombre siempre es link** a la ficha de esa persona (`/patients/:id`): azul `dash-blue`, subrayado al pasar el mouse y foco visible. No hay nombres en negro.',
          '- **Las dos llevan el ⋮** con *Edit relationship* y *Delete relationship* (CON-4113). En Household, al editar se mantiene la pill *Household* (la da el Guarantor compartido, no los roles).',
          '- Household sin pacientes muestra *No household patients*.',
          '',
          '**Probalo:** en *Playground* cambiá el grupo, el nombre (probá uno largo) y el rol, o sacá el ⋮ desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { grupo: 'Relationship', nombre: 'Jessica Miller', rol: 'Mother', menu: true },
  argTypes: {
    grupo: { control: 'inline-radio', options: ['Relationship', 'Household'], description: 'Relaciones (pills de rol, cuatro datos) o Household (pill Household, dos datos).' },
    nombre: { control: 'text', description: 'Nombre de la persona: link a su ficha.' },
    rol: { control: 'text', description: 'Parentesco con el paciente (Relationship to Patient).' },
    menu: { control: 'boolean', description: 'Con el ⋮ de acciones. En la app va siempre; sin él, la card de sólo lectura.' },
  },
  render: ({ grupo, nombre, rol, menu }: Args) => (
    <div className="max-w-[760px]">
      <PersonaCard p={persona(grupo, nombre, rol)} {...(menu ? { onEdit: salir, onDelete: salir } : {})} />
    </div>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/* ── Parts ─────────────────────────────────────────────────────────── */

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <div className="max-w-[760px]"><PersonaCard p={RELACIONES[0]!} onEdit={salir} onDelete={salir} /></div>
      <TablaPartes partes={[
        ['Card', 'Card del panel (TARJETA_PANEL) sobre el fondo gris: sombra, sin borde. px 20, py 16.', 'PersonaCard'],
        ['Avatar', 'Iniciales en el cuadrado azul de 40px, el mismo avatar de persona de toda la app.', 'Avatar size={40}'],
        ['Name', 'Link a la ficha de la persona: 15px Bold, dash-blue, subrayado al hover, foco visible. Siempre link, en los dos grupos.', 'Link /patients/:pacienteId'],
        ['Relationship', 'Parentesco con el paciente, debajo del nombre: 12px, gris.', 'p.rol'],
        ['Pills', 'Legal contact (Guardian, azul), Financial contact (Guarantor, verde) o Household (azul).', 'Pill'],
        ['Actions ⋮', 'Botón de ícono de 28px, a la derecha; queda gris con el menú abierto. Edit relationship y Delete relationship (rojo).', 'MenuAcciones › RowActionsMenu'],
        ['Data', 'Debajo de una línea: Date of Birth, Phone, Email y Contact Address en las relaciones; Date of Birth y Email en Household.', 'p.campos'],
      ]} />
    </Lienzo>
  ),
}

/* ── States ────────────────────────────────────────────────────────── */

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Groups" nota="Misma card, mismo link y mismo ⋮; cambian las pills y los datos.">
        <div className="flex max-w-[760px] flex-col gap-4">
          <Muestra titulo="Relationship" nota="Guardian y Guarantor: Legal contact y Financial contact, cuatro datos.">
            <PersonaCard p={RELACIONES[0]!} onEdit={salir} onDelete={salir} />
          </Muestra>
          <Muestra titulo="Household" nota="Paciente que comparte el Guarantor: pill Household, dos datos y el mismo ⋮ (CON-4113).">
            <PersonaCard p={HOUSEHOLD[0]!} onEdit={salir} onDelete={salir} />
          </Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Name" nota="El nombre es link en las dos; se fuerza el hover y el foco con teclado.">
        <div className="flex max-w-[760px] flex-col gap-4">
          <Muestra titulo="Hover">
            <Forzar selector="a" estado="hover"><PersonaCard p={HOUSEHOLD[0]!} onEdit={salir} onDelete={salir} /></Forzar>
          </Muestra>
          <Muestra titulo="Focus">
            <Forzar selector="a" estado="focus-visible"><PersonaCard p={RELACIONES[0]!} onEdit={salir} onDelete={salir} /></Forzar>
          </Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Actions menu" nota="Sin encabezado: el botón se anuncia como “Actions for <nombre>”. Con el menú abierto el ⋮ queda gris.">
        <div className="flex flex-wrap items-start gap-10">
          <Muestra titulo="Closed"><div className="h-32"><MenuAcciones nombre="Jessica Miller" onEdit={salir} onDelete={salir} /></div></Muestra>
          <Muestra titulo="Open" ancho={240}>
            <div className="flex h-32 items-start justify-end"><MenuAcciones nombre="Jessica Miller" onEdit={salir} onDelete={salir} abierto /></div>
          </Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Empty and long content">
        <div className="flex flex-wrap items-start gap-6">
          <Muestra titulo="Household empty" nota="Al borrar todas las cards de Household." ancho={520}><HogarVacio /></Muestra>
          <Muestra titulo="Long name, narrow" nota="Celular (358px de card): el nombre baja de línea y las pills pasan abajo, con el ⋮ a la derecha." ancho={358}>
            <PersonaCard p={{ ...HOUSEHOLD[0]!, name: 'Maria Fernanda Gonzalez-Rodriguez' }} onEdit={salir} onDelete={salir} />
          </Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Read only" nota="Sin onEdit/onDelete la card no dibuja el ⋮. En la app no se usa: las dos listas llevan acciones.">
        <div className="max-w-[760px]"><PersonaCard p={HOUSEHOLD[1]!} /></div>
      </Bloque>
      <Bloque titulo="In the app">
        <Tabla encabezado={['Group', 'Name', 'Actions', 'Delete removes']} minimo={640}>
          {[
            ['Relationships', 'Link a la ficha', 'Edit relationship · Delete relationship', 'La relación (con confirmación, sin Undo)'],
            ['Household/Same Guarantor Patients', 'Link a la ficha', 'Edit relationship · Delete relationship', 'La card de Household (con la misma confirmación)'],
          ].map(([g, n, a, d]) => (
            <tr key={g}>
              <td className="font-semibold">{g}</td>
              <td className="text-ink-medium">{n}</td>
              <td className="text-ink-medium">{a}</td>
              <td className="text-ink-medium">{d}</td>
            </tr>
          ))}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* ── Specs ─────────────────────────────────────────────────────────── */

const card = <PersonaCard p={HOUSEHOLD[0]!} onEdit={salir} onDelete={salir} />

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <SpecsMedidas piezas={[
      { nombre: 'Card', selector: 'article', children: card },
      { nombre: 'Name (link)', selector: 'a', children: card },
      { nombre: 'Actions ⋮', selector: 'button', children: card },
    ]} />
  ),
}

/* ── Pop ups ───────────────────────────────────────────────────────── */

const emergente = { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 420 } } } as const

export const DeleteDialog: Story = {
  name: 'Delete relationship',
  parameters: { ...emergente, controls: { disable: true } },
  render: () => <DeleteRelationshipDialog onConfirm={salir} onCancel={salir} />,
}
export const RemoveGuardian: Story = {
  name: 'Remove Guardian access',
  parameters: { ...emergente, controls: { disable: true } },
  render: () => <RemoveGuardianDialog persona="Michael Miller" paciente="John Smith" ultimaDeGuardian onConfirm={salir} onCancel={salir} />,
}
