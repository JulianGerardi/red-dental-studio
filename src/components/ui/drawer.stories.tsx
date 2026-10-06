import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Drawer, DrawerActions, DrawerSection, DrawerStep, type DrawerSize } from './drawer'
import { Button } from './button'
import { TextField, SelectField } from '@/components/patients/form'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla } from '@/design-system/kit'

type Args = { title: string; description: string; steps: number; size: DrawerSize; open: boolean }

const PASOS = ['General', 'Contact', 'Demographic', 'Review']

const meta = {
  title: 'Components/UI/Drawer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 620 },
      description: {
        component: [
          'Todo lo que se abre encima de una pantalla -formularios, detalles, editores- es un drawer que entra desde la derecha (Julián, 2026-10-06), con la lógica de Confidentally 2.0 y el diseño de esta plataforma. Las confirmaciones de una sola pregunta siguen siendo *ConfirmDialog*.',
          '',
          '**Como en Confidentally 2.0:** una columna, secciones con título suelto sin caja (`DrawerSection`), campos de a dos por fila; con varias partes, los pasos (Step 1, 2, 3) debajo del título y cada parte en un `DrawerStep` (la que no se ve no se desmonta). **Pie (`DrawerActions`):** dos botones del mismo ancho: Cancel / Next Step en el primer paso, Return / Next Step en los del medio, Return / Save en el último. **Panel al costado (`aside`):** el calendario de New Appointment se despliega a la izquierda del drawer.',
          '',
          '**Tamaños:** md 480 (formularios cortos), lg 560 (formularios con pasos), xl 760 (tablas y editores), como los anchos de 2.0.',
          '',
          '**Pasos:** cada paso dice su nombre (General, Contact, Address…), así el usuario sabe qué está haciendo. Al avanzar, el tilde rebota, la línea se llena en verde y el contenido entra desde la derecha (con Return, desde la izquierda).',
          '',
          '**Probalo:** en *Playground* cambiá la cantidad de pasos y el tamaño desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { title: 'New Patient', description: 'Create the patient record', steps: 3, size: 'lg', open: true },
  argTypes: {
    title: { control: 'text', description: 'Qué se carga.' },
    description: { control: 'text', description: 'Una línea de contexto. Vacía, no se muestra.' },
    steps: { control: { type: 'range', min: 1, max: 4, step: 1 }, description: 'Cantidad de pasos. Con 1 no se muestran pasos.' },
    size: { control: 'inline-radio', options: ['md', 'lg', 'xl'], description: 'md 480 · lg 560 · xl 760.' },
    open: { control: 'boolean', description: 'Abierto al cargar. Apagado: se abre con el botón.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Demo({ title, description, steps, size, open }: Args) {
  const [abierto, setAbierto] = useState(open)
  const [paso, setPaso] = useState(0)
  const pasos = PASOS.slice(0, steps)
  const actual = Math.min(paso, pasos.length - 1)
  const cerrar = () => { setAbierto(false); setPaso(0) }
  return (
    <div className="p-6">
      <Button onClick={() => setAbierto(true)}>Open drawer</Button>
      <Drawer
        open={abierto} onClose={cerrar} title={title} description={description || undefined} size={size}
        steps={pasos} step={actual}
        footer={<DrawerActions step={actual} total={pasos.length} onNext={() => setPaso(actual + 1)} onBack={() => setPaso(actual - 1)} onCancel={cerrar} onSave={cerrar} />}
      >
        {pasos.map((p, i) => (
          <DrawerStep key={p} index={i} step={actual}>
            <DrawerSection title={`${p} Information`}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField label="First Name" required placeholder="John" />
                <TextField label="Last Name" required placeholder="Smith" />
              </div>
              <SelectField label="Country" options={['United States', 'Mexico', 'Argentina']} />
            </DrawerSection>
          </DrawerStep>
        ))}
      </Drawer>
    </div>
  )
}

export const Playground: Story = { render: (args) => <Demo key={`${args.steps}-${args.size}`} {...args} /> }

/* Las piezas: el pie en cada paso. El encabezado con los pasos se ve en Playground. */
export const Parts: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Lienzo>
      <Bloque titulo="Section" nota="DrawerSection: título suelto (y bajada) sin caja ni borde, como en 2.0. SectionCard se dibuja así dentro de un drawer.">
        <div className="w-[420px] rounded-lg border border-dashed border-line p-5">
          <DrawerSection title="Contact Details" description="Update this patient's contact information">
            <TextField label="Email Address" placeholder="john.smith@hotmail.com" />
          </DrawerSection>
        </div>
      </Bloque>
      <Bloque titulo="Footer" nota="DrawerActions: dos botones del mismo ancho, Cancel o Return a la izquierda y Next Step o Save a la derecha.">
        <Muestras>
          {[
            ['1 step', 0, 1],
            ['First step', 0, 3],
            ['Middle step', 1, 3],
            ['Last step', 2, 3],
          ].map(([rotulo, step, total]) => (
            <ConRotulo key={rotulo as string} rotulo={rotulo}>
              <div className="flex w-[320px] items-center gap-3 rounded-lg border border-line p-4 [&>button]:flex-1">
                <DrawerActions step={step as number} total={total as number} onNext={() => {}} onBack={() => {}} onCancel={() => {}} onSave={() => {}} />
              </div>
            </ConRotulo>
          ))}
        </Muestras>
      </Bloque>
    </Lienzo>
  ),
}

/* Estados del pie: Next Step o Save disabled hasta completar lo obligatorio. */
export const States: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={720}>
      <tr>
        <td className="font-semibold">Next disabled</td>
        <td><div className="flex w-[300px] items-center gap-3 [&>button]:flex-1"><DrawerActions step={0} total={2} nextDisabled onNext={() => {}} onCancel={() => {}} onSave={() => {}} /></div></td>
        <td className="text-ink-medium">Falta algo obligatorio del paso: no se puede seguir.</td>
      </tr>
      <tr>
        <td className="font-semibold">Save disabled</td>
        <td><div className="flex w-[300px] items-center gap-3 [&>button]:flex-1"><DrawerActions step={1} total={2} saveDisabled onBack={() => {}} onCancel={() => {}} onSave={() => {}} /></div></td>
        <td className="text-ink-medium">Último paso sin completar: Save espera.</td>
      </tr>
    </Tabla>
  ),
}

export const Specs: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Lienzo>
      <Bloque titulo="Sizes" nota="Ancho máximo del panel; en el teléfono ocupa toda la pantalla.">
        <Tabla encabezado={['Size', 'Width', 'For']} minimo={560}>
          <tr><td className="font-semibold">md</td><td className="tabular-nums">480px</td><td>Formularios cortos: Edit Contact, Edit Relationship, medicamentos y alergias, New Room, New Hours, Review Exam.</td></tr>
          <tr><td className="font-semibold">lg</td><td className="tabular-nums">560px</td><td>Formularios con pasos: New Patient, Edit Patient, New Appointment, subscriptions.</td></tr>
          <tr><td className="font-semibold">xl</td><td className="tabular-nums">760px</td><td>Tablas o editores: Post payment, Apply credit, Assign Role, AI Narrative Editor.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Steps" nota="Elements / StepIndicator tiene la barra de pasos completa.">
        <Tabla encabezado={['Rule', 'How']} minimo={640}>
          <tr><td className="font-semibold">Label</td><td>El nombre de cada paso, en todos los drawers: lo que se está haciendo.</td></tr>
          <tr><td className="font-semibold">Next Step</td><td>Avanza sólo con lo obligatorio del paso completo; si falta algo lo marca en rojo, sólo en el paso a la vista (<code>lib/useFormPasos</code>). Save revisa todos y vuelve al primero incompleto.</td></tr>
          <tr><td className="font-semibold">Motion</td><td>Al avanzar, el tilde rebota, la línea se llena y el contenido entra desde la derecha; con Return, desde la izquierda (260ms).</td></tr>
          <tr><td className="font-semibold">Kept</td><td>Los pasos que no se ven no se desmontan: lo escrito se conserva al ir y volver.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Where">
        <Tabla encabezado={['Drawer', 'Steps', 'Size']} minimo={640}>
          <tr><td className="font-semibold">New Patient</td><td>General · Guardian (si hace falta) · Demography</td><td>lg</td></tr>
          <tr><td className="font-semibold">New Appointment</td><td>Patient and Scheduling · Link to treatment plan visit</td><td>lg + calendario al costado</td></tr>
          <tr><td className="font-semibold">New Location · New Employee</td><td>General · Contact · Address</td><td>lg</td></tr>
          <tr><td className="font-semibold">New Account</td><td>Information · Address · Owner</td><td>lg</td></tr>
          <tr><td className="font-semibold">Add Relationship</td><td>Person · Contact · Relationship</td><td>lg</td></tr>
          <tr><td className="font-semibold">New Procedure</td><td>Procedure · Surfaces (si el procedimiento lleva superficie) · Link to finding · Link to diagnosis (si es Planned)</td><td>md</td></tr>
          <tr><td className="font-semibold">Edit Patient, subscriptions, Post payment</td><td>Ver cada componente</td><td>lg / xl</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
