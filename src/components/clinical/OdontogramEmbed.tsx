import { OdontogramShell, type OdontogramThemeConfig } from 'react-advanced-odontogram'
import '@/styles/odontogram-scoped.css'
import '@/styles/odontogram-theme.css'

/* El odontograma de react-advanced-odontogram (MIT, (c) Zoltán Dul —
   github.com/ZoliQua/React-Odontogram-Modul), que es el que pidió Julián,
   embebido con la paleta de este sistema.

   Dos cosas que hay que saber:
   - Su CSS es el de una app entera (trae `*`, `body`, `.btn`, `.card`), así
     que no se importa el del paquete sino la copia acotada a `.odonto-embed`
     que genera `scripts/scope-odontogram-css.mjs`.
   - La librería resuelve sus controles con `document.getElementById`, así
     que no puede haber dos instancias montadas a la vez.

   Ver design-reference/figma/modulos/clinical-mode.md. */

const COLORES = {
  background: '#ffffff',
  panel: '#ffffff',
  card: '#ffffff',
  text: '#09090b',
  muted: '#71717a',
  line: '#e4e4e7',
  accent: '#1d56bc',
  accent2: '#1a804d',
}

const TEMA: OdontogramThemeConfig = { colors: COLORES }

/* `themeConfig` sólo alcanza al nodo interno de la librería, pero el CSS
   acotado define `--text: var(--odon-text, ...)` en `.odonto-embed` -este
   wrapper-, que está más arriba: las variables no llegaban y quedaban los
   colores de fábrica. Se declaran también acá, que es donde se leen. */
const VARIABLES = {
  '--odon-bg': COLORES.background,
  '--odon-panel': COLORES.panel,
  '--odon-card': COLORES.card,
  '--odon-text': COLORES.text,
  '--odon-muted': COLORES.muted,
  '--odon-line': COLORES.line,
  '--odon-accent': COLORES.accent,
  '--odon-accent2': COLORES.accent2,
} as React.CSSProperties

export function OdontogramEmbed() {
  return (
    <div className="odonto-embed w-full" style={VARIABLES}>
      <OdontogramShell themeConfig={TEMA} language="en" numberingSystem="UNIVERSAL" />
    </div>
  )
}
