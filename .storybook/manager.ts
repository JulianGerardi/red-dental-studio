import { addons } from 'storybook/manager-api'
import theme from './theme'

/* El design system se ve como un sitio de documentación, no como Storybook:
   el menú, la barra de herramientas y el panel de addons del Storybook no se
   muestran; el sitio tiene su propia barra y su propio menú
   (src/design-system/Sitio.tsx). En una historia abierta sola queda el panel
   de Controls, que es donde se la personaliza. */
/* Un link compartido del Builder trae el diseño en el # de la dirección
   (#diseno=…). Se guarda antes de que Storybook reescriba la dirección; el
   Builder lo toma al abrirse (src/design-system/constructor/compartir.ts). */
try {
  const compartido = window.location.hash.match(/diseno=([\w-]+)/)
  if (compartido) window.sessionStorage.setItem('confidentally-ui-shared', compartido[1]!)
} catch {
  /* Sin almacenamiento: el Builder intenta leer la dirección. */
}

addons.setConfig({
  theme,
  layoutCustomisations: {
    showSidebar: () => false,
    showToolbar: () => false,
    showPanel: (state, porDefecto) => (state.viewMode === 'docs' ? false : porDefecto),
  },
})
