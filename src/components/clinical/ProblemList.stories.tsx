import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProblemList } from './ProblemList'
import { escribir, esperar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/ProblemList',
  component: ProblemList,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta<typeof ProblemList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Búsqueda sin resultados: estado vacío "No problems found". */
export const NoResults: Story = { play: secuencia(escribir(/search/i, 'zzzz'), esperar(/no .* found|nothing matches/i)) }

/* En la primera página "Previous" queda deshabilitado; al llegar a la última,
   lo mismo le pasa a "Next". */
export const PreviousDisabledOnFirstPage: Story = {}
