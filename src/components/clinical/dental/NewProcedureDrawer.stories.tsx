import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'
import { NewProcedureDrawer } from './NewProcedureDrawer'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import type { Finding } from './data'

const HALLAZGOS: Finding[] = [
  { id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: 'May 14, 2026', status: 'Active', tooth: 3, provider: 'Elena Martinez', surfaces: ['O', 'DB'], notes: '', linked: [], diagnoses: [] },
  { id: 'F-3', area: 'Tooth 20', condition: 'localized periodontal pocketing', descriptor: 'Moderate', date: 'May 14, 2026', status: 'Active', tooth: 20, provider: 'Elena Martinez', surfaces: ['B', 'MB'], notes: '', linked: [], diagnoses: [] },
  { id: 'F-5', area: 'Soft Palate', condition: 'oral candidiasis', descriptor: 'Red', date: 'May 14, 2026', status: 'Active', tooth: null, provider: 'Sarah Stone', surfaces: [], notes: '', linked: [], diagnoses: [] },
]

const meta = {
  title: 'Components/Clinical/Dental/NewProcedureDrawer',
  component: NewProcedureDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          "Add Procedure y Add Condition del odontograma. Los pasos dependen de lo elegido: **Procedure**; **Surfaces** si el procedimiento elegido va en superficie, sea Planned o Existing; **Descriptors**, sólo desde Add Condition (la guía visual de [DescriptorFields](/docs/components-clinical-dental-descriptorfields--docs)); y, sólo para Planned, **Link to finding** (los hallazgos por nombre) y **Link to diagnosis** (los diagnósticos por código y superficie, sin estado ni fecha).",
          "",
          "**Vincular pide un procedimiento ya cargado:** el paso de Procedure (y Surfaces, si lo hay) termina en Save, que guarda el procedimiento ahí mismo, sin vínculos todavía. Recién con eso guardado aparecen Link to finding y Link to diagnosis, para agregarle los vínculos al procedimiento que ya existe; su Save los guarda y cierra.",
          "",
          "**Pie:** el de todos los drawers (Cancel o Return, Next Step o Save); Next Step/Save quedan deshabilitados hasta elegir un procedimiento o marcar una superficie. Descriptors no bloquea: es opcional.",
          "",
          "**Probalo:** en *Playground* elegí un procedimiento en superficie (D2140) y avanzá. En *FromAddCondition*, avanzá hasta Descriptors.",
        ].join('\n'),
      },
    },
  },
  args: { open: true, mode: 'procedure', area: 'Tooth 21', teeth: [20, 21, 22], findings: HALLAZGOS, onClose: () => {}, onSave: () => 'F-mock', onLink: () => {} },
  argTypes: { mode: { control: 'inline-radio', options: ['procedure', 'condition'], description: 'Add Procedure arranca en Planned; Add Condition, en Existing.' } },
} satisfies Meta<typeof NewProcedureDrawer>

export default meta
type Story = StoryObj<typeof meta>

/* Paso 1, Procedure: búsqueda con las pestañas Existing y Planned. "Next Step" se habilita al elegir uno. */
export const Playground: Story = {}

/* Desde Add Condition: arranca en Existing, lo que el paciente ya tiene hecho. */
export const FromAddCondition: Story = { args: { mode: 'condition' } }

/* Paso 2, Surfaces: sólo con un procedimiento de diente + superficie cargado en superficie. Es el último paso antes de
   guardar: el botón ya dice Save. Sin superficies marcadas "Save" y "Apply to unset" quedan deshabilitados. */
export const SurfacesStep: Story = {
  play: secuencia(pulsar(/^D2140 on surface$/i), pulsar(/next step/i), esperar(/apply to unset/i)),
}

/* Descriptors: sólo desde Add Condition, y sólo si el procedimiento no va en superficie (si va, Surfaces es el paso
   anterior y Descriptors sigue siendo el último antes de guardar). */
export const DescriptorsStep: Story = {
  args: { mode: 'condition' },
  play: secuencia(pulsar(/^D2740 on tooth$/i), pulsar(/next step/i), esperar(/tap a pill again to clear it/i)),
}

/* Link to finding: cada hallazgo con su nombre y, si tiene, sus superficies. Un procedimiento sin superficie llega
   directo desde Procedure, donde el botón es Save: lo guarda y recién ahí aparece el paso. */
export const LinkToFindingStep: Story = {
  play: secuencia(pulsar(/^D0120\s*-/), pulsar(/^D0120 on tooth$/i), pulsar(/^save$/i), esperar(/localized periodontal pocketing/i)),
}

/* Link to diagnosis: el último paso de lo planeado, con el código de cada hallazgo y sus superficies. */
export const LinkToDiagnosisStep: Story = {
  play: secuencia(pulsar(/^D0120\s*-/), pulsar(/^D0120 on tooth$/i), pulsar(/^save$/i), pulsar(/next step/i), esperar(/K05\.31/)),
}

/* Los pasos. */
export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Steps" nota="Cada paso con su nombre en el indicador, como en todos los drawers.">
        <Tabla encabezado={["Step", "What it asks", "When it shows"]} minimo={560}>
          <tr><td className="font-semibold">Procedure</td><td>Buscar y elegir el procedimiento (Existing o Planned), con el filtro por área.</td><td>Siempre</td></tr>
          <tr><td className="font-semibold">Surfaces</td><td>Marcar las superficies, pieza por pieza. Save de este paso guarda el procedimiento.</td><td>Si el procedimiento va en superficie</td></tr>
          <tr><td className="font-semibold">Descriptors</td><td>La guía visual de descriptores (DescriptorFields), opcional. Save de este paso guarda el procedimiento.</td><td>Desde Add Condition</td></tr>
          <tr><td className="font-semibold">Link to finding</td><td>Vincular los hallazgos que resuelve, por nombre, con estado y fecha, sobre el procedimiento ya guardado.</td><td>Si es Planned, recién después de guardar el procedimiento</td></tr>
          <tr><td className="font-semibold">Link to diagnosis</td><td>Vincular los diagnósticos que trata: código ICD-10 y superficies, sin estado ni fecha. Save de este paso guarda los vínculos.</td><td>Si es Planned, recién después de guardar el procedimiento</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* Medidas. */
export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Size</td><td>md · 480px</td></tr>
          <tr><td className="font-semibold">Title</td><td>New Procedure, o New Condition desde Add Condition.</td></tr>
          <tr><td className="font-semibold">Next/Save disabled</td><td>Sin procedimiento elegido o sin superficies marcadas.</td></tr>
          <tr><td className="font-semibold">Save, en Procedure/Surfaces</td><td>Guarda el procedimiento (sin vínculos) y hace aparecer Link to finding y Link to diagnosis.</td></tr>
          <tr><td className="font-semibold">Save, en Link to diagnosis</td><td>Guarda los vínculos sobre el procedimiento ya creado y cierra.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
