import { create } from 'storybook/theming/create'

/* La interfaz de Storybook usa los mismos valores que la app (src/index.css):
   riel #fafafa, azul #1d56bc para lo activo, bordes #e7e7e7, Inter. Así la
   plataforma y el design system se sienten una sola cosa. Si cambia un token
   en index.css, cambiar acá el mismo valor. Ver design-reference/design-system.md. */

/* Logo del bloque superior del sidebar de la app: ícono GalleryVerticalEnd y
   el nombre, en blanco sobre #1a4da9. */
const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" width="208" height="40" viewBox="0 0 208 40"><rect width="208" height="40" rx="8" fill="#1a4da9"/><g transform="translate(14 12)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 0h8"/><path d="M2 4h12"/><rect x="0" y="8" width="16" height="10" rx="2" transform="scale(1 .8) translate(0 2)"/></g><text x="42" y="19" fill="#fff" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="600">Confidentally</text><text x="42" y="31" fill="#c7d5f0" font-family="Inter, system-ui, sans-serif" font-size="9.5" font-weight="500" letter-spacing=".6">DESIGN SYSTEM</text></svg>`

export default create({
  base: 'light',
  brandTitle: 'Confidentally design system',
  brandImage: `data:image/svg+xml;utf8,${encodeURIComponent(LOGO)}`,
  brandTarget: '_self',

  colorPrimary: '#1d56bc',
  colorSecondary: '#1d56bc',

  appBg: '#fafafa',
  appContentBg: '#ffffff',
  appPreviewBg: '#f5f5f5',
  appBorderColor: '#e7e7e7',
  appBorderRadius: 8,

  fontBase: '"Inter", ui-sans-serif, system-ui, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, monospace',

  textColor: '#09090b',
  textInverseColor: '#ffffff',
  textMutedColor: '#71717a',

  barBg: '#ffffff',
  barTextColor: '#4a5565',
  barHoverColor: '#1d56bc',
  barSelectedColor: '#1d56bc',

  buttonBg: '#ffffff',
  buttonBorder: '#e4e4e7',
  booleanBg: '#f4f4f5',
  booleanSelectedBg: '#1d56bc',
  inputBg: '#ffffff',
  inputBorder: '#e4e4e7',
  inputTextColor: '#09090b',
  inputBorderRadius: 6,
})
