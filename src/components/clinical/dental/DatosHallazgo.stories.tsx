import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, TablaPartes } from '@/design-system/kit'
import { FilaArea, FilaDato, FilaNombre, IconoExamen, IconoFecha, IconoProveedor } from './DatosHallazgo'
import type { TipoArea } from './data'

const TIPOS_AREA: TipoArea[] = ['Tooth', 'Range', 'Quadrant', 'Arch', 'Mouth', 'Intraoral', 'Extraoral']

/* Las filas de datos de un finding, iguales en Edit Finding, Edit Procedure y el detalle de la Problem List.
   Decisiones en design-reference/figma/modulos/clinical-mode.md (2026-10-27 y 2026-10-28). */
const meta = {
  title: 'Components/Clinical/Dental/DatosHallazgo',
  parameters: {
    layout: 'padded',
    docs: {
      jira: ['CON-3700', 'CON-1961'],
      description: {
        component: 'Las filas con que se lee un finding: su **nombre** con el estado a la derecha, el **área de tratamiento** con el ícono de su tipo (CON-3700, CON-1961) y los datos sueltos (fecha, provider, examen) con su ícono en un cuadrado.\n\n**Probalo:** *Finding* arma una ficha entera; *Treatment areas* muestra el ícono de cada tipo de área.',
      },
    },
  },
  decorators: [(Story) => <div className="w-[420px] max-w-full rounded-xl bg-white p-4"><Story /></div>],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Finding: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <FilaNombre nombre="Chronic enamel dental caries" estado="Active" />
      <FilaArea area={{ tipo: 'Tooth', valor: '3' }} />
      <FilaDato icono={<IconoFecha />} rotulo="Date">05/14/2026</FilaDato>
      <FilaDato icono={<IconoProveedor />} rotulo="Provider">Elena Martinez</FilaDato>
      <FilaDato icono={<IconoExamen />} rotulo="Exam">Dental Assessment</FilaDato>
    </div>
  ),
}

/* El nombre con cada tono de estado. */
export const NameAndStatus: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <FilaNombre nombre="Chronic enamel dental caries" estado="Active" />
      <FilaNombre nombre="Localized periodontal pocketing" estado="In Treatment" tono="info" />
      <FilaNombre nombre="Oral candidiasis" estado="Discarded" tono="danger" />
    </div>
  ),
}

/* Un dato sin valor (estado vacío): queda el rótulo solo. */
export const EmptyValue: Story = { render: () => <FilaDato icono={<IconoProveedor />} rotulo="Provider" /> }

export const TreatmentAreas: Story = {
  decorators: [(Story) => <div className="w-[720px] max-w-full"><Story /></div>],
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Name row', 'El nombre del finding y su estado en una pill.', 'FilaNombre'],
          ['Area row', 'El área de tratamiento: ícono del tipo, tipo y valor.', 'FilaArea'],
          ['Data row', 'Un dato con su ícono y su rótulo.', 'FilaDato'],
          ['Icons', 'Fecha, provider y examen, en un cuadrado gris.', 'IconoFecha · IconoProveedor · IconoExamen'],
        ]} />
      </Bloque>
      <Bloque titulo="Treatment areas">
        <div className="flex flex-col gap-3">
          {TIPOS_AREA.map((t) => <FilaArea key={t} area={{ tipo: t, valor: t === 'Tooth' ? '3' : t === 'Range' ? '3 – 5' : t === 'Quadrant' ? 'Upper Left' : t === 'Arch' ? 'Maxillary' : t === 'Mouth' ? 'Full mouth' : t === 'Intraoral' ? 'Soft Palate' : 'Right Temple Area' }} />)}
        </div>
      </Bloque>
    </Lienzo>
  ),
}
