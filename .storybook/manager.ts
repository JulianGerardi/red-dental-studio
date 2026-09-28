import { addons } from 'storybook/manager-api'
import theme from './theme'

/* El design system se ve como un sitio de documentación, no como Storybook:
   el menú, la barra de herramientas y el panel de addons del Storybook no se
   muestran; el sitio tiene su propia barra y su propio menú
   (src/design-system/Sitio.tsx). En una historia abierta sola queda el panel
   de Controls, que es donde se la personaliza. */
addons.setConfig({
  theme,
  layoutCustomisations: {
    showSidebar: () => false,
    showToolbar: () => false,
    showPanel: (state, porDefecto) => (state.viewMode === 'docs' ? false : porDefecto),
  },
})
