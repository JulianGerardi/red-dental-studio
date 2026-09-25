# Design system (Storybook)

Vive en el mismo repo que la app y **lee el mismo código**: no hay una copia que
mantener aparte. Publicado junto a la app, en `/storybook`.

```bash
npm run storybook        # localhost:6006 (antes corre ds:scan)
npm run build-storybook  # versión estática (storybook-static/)
npm run ds:scan          # lee el código: recetas de UI y cobertura (generated/*.json)
npm run ds:coverage      # qué falta documentar
npm run ds:check         # igual, pero falla si se rompe una regla (CI)
npm run ds:tokenize      # pasa colores escritos a mano a su token
```

## Qué se actualiza solo

| Si cambiás… | Design system |
|---|---|
| Un token de `src/index.css` (`@theme`, `:root`) | Se actualiza solo: la página **Foundations / Colors** parsea el CSS. |
| Un componente existente | Se actualiza solo: los stories lo importan de `src/components`. |
| Una pantalla | Se actualiza solo: **Pages** monta las mismas rutas (`src/AppRoutes.tsx`). |
| Un color escrito a mano (`text-[#09090b]`) | Cambia solo ese lugar. Para que cambie en todos lados tiene que ser un token. |
| Agregás un componente | Aparece en **Components / Catalog** (se lee del código) pero sin preview hasta que le hagas su `.stories.tsx`. |
| Agregás una ruta | Hay que sumarla a `src/design-system/Pages.stories.tsx`; `ds:check` avisa si falta. |

## Estructura del sidebar

- **Welcome**: qué es y cómo se usa.
- **Foundations**: Colors, Typography, Radius and shadows, Color audit. Todo
  calculado leyendo `src/index.css` y el código fuente.
- **Components**: 109 de los 115 archivos de `src/components` tienen su story
  (223 stories en total), agrupados por módulo: UI (los 24 primitivos, con
  props por autodocs), Dashboard, Layout, Scheduling, Patients, Ledger,
  Settings, Billing, Clinical (con Dental) y Help. Los 6 restantes manipulan
  el DOM de la librería del odontograma y se ven dentro de
  *Clinical / DentalAssessmentExam* (`src/design-system/exentos.json`).
- **Components / Catalog**: inventario de *todos* los archivos de
  `src/components`, leído del código: qué exportan, dónde se usan, si tienen
  story y la nota de diseño que cada uno trae en el encabezado.
- **Patterns**: lo que el código arma a mano y no es un componente con nombre.
  *Buttons, Fields, Cards, Pills and badges* y *Tables* se generan leyendo el
  código con el compilador de TypeScript (`scripts/scan-recipes.mjs`): cada
  receta se dibuja con sus clases reales, con su cantidad de usos, dónde está,
  sus estados (hover, foco, deshabilitado) y un cuadro de consistencia por
  familia (cuántas alturas, paddings y pesos distintos conviven).
  *Duplicates and inconsistencies* pone lado a lado lo que la app resuelve más
  de una vez (6 switches, 7 contenedores tipo card, 3 checkboxes…), medido en
  pantalla.
- **Foundations / States**: cómo dibuja el código cada estado (hover, foco,
  active, disabled, invalid): todas las clases con su cantidad de usos.
- **Foundations / Documentation coverage**: lo que falta documentar, calculado
  del código (ver "Cómo se mide" abajo).
- **Pages**: las 30 pantallas de la app, montadas con las rutas reales. Las
  piezas internas de cada pantalla (tarjetas, filas, pestañas, diálogos) están
  en **Pages / Parts**.

Las 394 stories se abrieron una por una en el navegador: ninguna da error.

## Cómo se mide que no falte nada

`npm run ds:check` (y la página *Documentation coverage*) comprueban cuatro
cosas contra el código:

1. **Cada archivo de `src/components` tiene su `.stories.tsx`** (o está en
   `exentos.json` con el motivo, si sólo vive dentro de otro).
2. **Cada función de React tiene story**, exportada o no: 328 en total. Las
   piezas chicas -`FilaRol`, `Dialogo`, `HeadCell`…- se exportaron para poder
   mostrarlas, y viven en `X.parts.stories.tsx`. Se cuenta por importación
   desde su propio archivo, no por nombre.
3. **Cada estado que un componente soporta tiene un story que lo muestra**:
   `disabled`, `error`, `loading`, `empty`, `selected`. El detector lee el
   código (`scripts/states-lib.mjs`). Si el estado nace de una interacción
   (un error de validación, una búsqueda sin resultados), el story la hace con
   una función `play` y **comprueba que el estado esté en pantalla**
   (`esperar(/required/i)`): si no aparece, el story falla. Lo que no se puede
   mostrar va a `state-waivers.json` con motivo, y cada exención se valida
   contra un story real.
4. **Cada ruta tiene su story en Pages**, y **ningún color escrito a mano que
   ya tenga token**.

Además informa los **15 componentes exportados que ninguna pantalla usa**
(los seis paneles de `clinical/panels.tsx`, `StatCard`, `ViewToggle`,
`GuarantorBanner`, `LinkTreatmentPlanDrawer`, `Tabs` y cuatro piezas de
`ui/card`): siguen documentados, pero son candidatos a borrarse o conectarse.

`hover`, `focus` y `active` no llevan story propio: se ven con el addon de
pseudo-estados (`storybook-addon-pseudo-states`) en cada tarjeta de Patterns.

**Cada página Docs muestra el código** (`src/design-system/DocsPage.tsx`): la nota
de diseño del encabezado del archivo, el componente, sus controles, y al final
*Source* (el `.tsx` del componente) y *Stories source* (el `.stories.tsx`),
leídos con `?raw`. Los modales, drawers y paneles anchos se dibujan en un
iframe dentro de Docs (`docs.story.inline: false`): son `position: fixed` y
inline quedaban con alto cero, o sea que la página no mostraba nada.

## Tokens (2026-09-25)

Había **1.885 colores hex escritos a mano** en 110 archivos
(`text-[#09090b]` ×314, `border-[#e4e4e7]` ×281, …). El design system no podía
"vincularse" a nada: cambiar un color obligaba a buscar y reemplazar.

`scripts/tokenize-colors.mjs` los pasó a tokens **sin cambiar ningún píxel**:
cada token vale exactamente el hex que reemplazó (`--color-ink: #09090b`).
Verificado comparando los colores calculados (`getComputedStyle` de todos los
elementos) de 29 rutas antes y después: idénticos.

| Familia | Tokens | Uso |
|---|---|---|
| Texto | `ink`, `ink-soft`, `ink-medium`, `ink-muted`, `ink-slate`, `ink-faint` | `text-ink-muted` |
| Líneas | `line`, `line-strong`, `line-row`, `line-soft`, `line-hair` | `border-line` |
| Fondos | `surface-subtle`, `surface-muted`, `surface-alt`, `surface-slate` | `bg-surface-subtle` |
| Estados | `dash-ok-*`, `dash-bad-*`, `dash-busy-*`, `field-error`, `required`, `warn-*`, `attn-fg`, `info-bg`, `purple-fg` | `text-dash-ok-fg` |
| Marca | `dash-blue`, `dash-blue-hover`, `dash-ring` | `bg-dash-blue` |

Los **estados del calendario** (`--color-appt-<estado>-bg|bar|fg|dot`) también son
tokens: `calendar-data.ts` los lee con `var(--color-appt-…)`, así que la
paleta de turnos se cambia en `src/index.css` y se ve en la grilla, la
leyenda y el detalle. Apuntan a tokens de apoyo (`brand-tint`, `green`,
`green-deep`, `amber`…), no a hex.

Los tokens propios van en `@theme static`: Tailwind sólo emite las variables
que alguna clase usa, y estos también se leen desde JS y desde Storybook.

**Quedan 103 colores en clases sin token** (55 valores, casi todos de 1 a 5
usos) y ~110 en estilos en línea, SVG y datos (el odontograma, el mosaico
de UnderConstruction, el visor de radiografías). Unificarlos cambia el aspecto
(muchos son casi iguales entre sí), así que necesitan una decisión de diseño;
están listados en **Foundations / Color audit**. `scripts/ds-baseline.json`
guarda el tope: `ds:check` falla si crece.

## Reglas

1. Nunca escribas `text-[#xxxxxx]`. Usá un token, o creá uno en `src/index.css`.
2. Todo componente nuevo lleva su `.stories.tsx` al lado.
3. Toda ruta nueva se suma a `Pages.stories.tsx`.
4. Los stories importan componentes reales: no copies markup.

## Cómo está armado

- `.storybook/main.ts`: Storybook 10 + `@storybook/react-vite`, reusa `vite.config.ts`
  (mismo Tailwind y alias `@`). `preview.tsx` carga `src/index.css` y envuelve
  cada story en `MemoryRouter` + `TooltipProvider` + `Toaster`; las pantallas
  (`parameters.router: false`) traen los suyos.
- `src/design-system/tokens.ts`: parsea `src/index.css` (`?raw`).
- `src/design-system/audit.ts` y `catalog.ts`: leen el código con
  `import.meta.glob(..., { query: '?raw' })`.
- `.github/workflows/deploy-pages.yml`: construye Storybook en `dist/storybook`.
