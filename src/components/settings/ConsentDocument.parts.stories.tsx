import type { Meta, StoryObj } from '@storybook/react-vite'
import { LineaFirma, Seccion } from './ConsentDocument'

const meta = { title: 'Components/Settings/ConsentDocument parts', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Sección de la hoja: rótulo en versalitas con filete y el texto debajo. */
export const DocumentSection: Story = { render: () => <div className="w-[420px] bg-white p-6"><Seccion titulo="Nature of procedure"><p>The proposed treatment has been explained to me.</p></Seccion></div> }

/* La línea de firma del documento (CON-2905, CON-2913): vacía, con el nombre adoptado y sus iniciales, y con el nombre
   escrito por el provider. */
export const SignatureLineEmpty: Story = { render: () => <div className="w-[420px] bg-white p-6"><LineaFirma rol="Patient / Legal Guardian" nombre="John Smith" /></div> }
export const SignatureLineAdopted: Story = { render: () => <div className="w-[420px] bg-white p-6"><LineaFirma rol="Patient / Legal Guardian" nombre="John Smith" firma={{ fecha: '11/13/2026', nombre: 'John Smith', iniciales: 'JS' }} /></div> }
export const SignatureLineTyped: Story = { render: () => <div className="w-[420px] bg-white p-6"><LineaFirma rol="Provider" nombre="Dr. Perez Martinez" firma={{ fecha: '11/13/2026', nombre: 'Perez Martinez', texto: 'Perez Martinez' }} /></div> }
