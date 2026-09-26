import type { StorybookConfig } from '@storybook/react-vite'

/* El design system lee el código real de la app: los stories importan los
   componentes de src/ y los tokens salen de src/index.css. Ver
   design-reference/design-system.md. */
const config: StorybookConfig = {
  stories: ['../src/design-system/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', 'storybook-addon-pseudo-states'],
  framework: '@storybook/react-vite',
  core: { disableTelemetry: true },
}

export default config
