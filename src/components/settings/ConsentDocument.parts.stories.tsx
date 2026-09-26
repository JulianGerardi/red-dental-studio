import type { Meta, StoryObj } from '@storybook/react-vite'
import { Seccion } from './ConsentDocument'

const meta = { title: 'Components/Settings/ConsentDocument parts', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Sección de la hoja: rótulo en versalitas con filete y el texto debajo. */
export const DocumentSection: Story = { render: () => <div className="w-[420px] bg-white p-6"><Seccion titulo="Nature of procedure"><p>The proposed treatment has been explained to me.</p></Seccion></div> }
