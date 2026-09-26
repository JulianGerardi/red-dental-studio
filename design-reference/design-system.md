# Design system (Storybook)

Vive en el mismo repo que la app y **lee el mismo código**: no hay una copia que
mantener aparte. Publicado junto a la app, en `/storybook`.

```bash
npm run storybook        # localhost:6006 (antes corre ds:scan)
npm run build-storybook  # versión estática (storybook-static/)
npm run ds:scan          # lee el código: looks de UI y cobertura (generated/*.json)
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

- **Welcome**: qué es, cómo está ordenado y cómo probar un elemento.
- **Foundations**: Colors, Typography, Radius and shadows. Todo calculado
  leyendo `src/index.css`.
- **Elements**: las piezas estándar para armar pantallas. Cada una es un
  componente real de la app y su página tiene el mismo orden: **Playground**
  (se personaliza desde el panel *Controls*; *Show code* da el código),
  variantes o tipos, estados, y **Specs** (medidas leídas del componente
  dibujado y colores leídos de sus clases y de `src/index.css`).
  - **Buttons** — `src/components/ui/button.tsx`. Variantes `primary`,
    `secondary`, `ghost`, `link`, `destructive` (el look más usado en el código
    para cada tipo) y tamaños `sm` 28 · `md` 32 · `lg` 36 (las tres alturas más
    usadas). Resuelve una sola vez hover, presionado, foco con teclado (anillo
    de 2px del color de la variante: rojo en destructive), deshabilitado y
    cargando (`loading`).
  - **Fields** — `src/components/patients/form.tsx` (TextField, SelectField,
    SearchField, DateTextField, TextArea, OptionCheckbox). Todos comparten el
    mismo aspecto (`control()`): foco azul, error rojo con mensaje, y ahora
    `disabled` y `hint` (texto de ayuda).
  - **Pills** — `src/components/ui/pill.tsx`, con *Statuses in the app*: qué
    estado usa qué tono, leído del código, marcando los que usan dos tonos.
  - **Cards** — `src/components/ui/card.tsx` (Card, CardHeader, CardTitle,
    CardDescription, CardContent, CardFooter): qué es una card, Playground
    para armarla, anatomía y las cards reales de la app.
  - **Tables** — `src/components/ui/data-table.tsx`: la tabla estándar
    (barra → encabezado → filas → pie) armada con columnas y filas; selección,
    menú de fila, paginación, densidad y estado vacío se prenden con props. El
    Playground deja armar una tabla eligiendo columnas y funciones, y *How to
    build a table* explica los tres pasos con el código.
- **Components**: las piezas de cada módulo (Dashboard, Layout, Scheduling,
  Patients, Ledger, Settings, Billing, Clinical, Help, UI). *Components /
  Catalog* es el inventario de todos los archivos de `src/components`.
- **Pages**: las 30 pantallas, con las rutas reales. Sus piezas internas están
  en **Pages / Parts**.
- **Audit**: para quien migra código, lo que la app hace hoy y se aparta del
  estándar. *Colors in code* (colores sin token), *Buttons / Fields / Cards /
  Pills in code* (tamaños, colores y estados en uso, con todas las variantes
  que el código dibuja), *Tables in the app* (cada tabla medida en pantalla y
  comparada), *States in code*, *Duplicates* y *Documentation coverage*. Estas
  páginas se generan leyendo el código (`scripts/scan-recipes.mjs`, que lee
  cada rama de un condicional como un look aparte).

Los componentes estándar (Button, DataTable, las partes de Card) todavía no
reemplazan a los `<button>` y tablas escritos a mano en las pantallas: la
migración es un paso aparte. *Documentation coverage* lista qué exportados no
usa todavía la app.

## Interfaz de Storybook

La interfaz usa la identidad de la app para que plataforma y design system se
sientan una sola cosa: tema claro con el riel `#fafafa` y el azul `#1d56bc`
para lo activo (como el ítem activo del sidebar), bordes `#e7e7e7`, Inter,
logo azul `#1a4da9` con el ícono y el nombre del bloque superior del sidebar,
y el fondo gris `page-background` con contenido en cajas blancas, igual que
`<main>` en `AppShell`. Está en `.storybook/theme.ts` (valores), `manager.ts`
y `manager-head.html` (fuente y retoques de CSS) y `Page.tsx`. Si cambia un
token de `src/index.css`, cambiar el mismo valor en `theme.ts`.

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
pseudo-estados (`storybook-addon-pseudo-states`) en las páginas de Elements.

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
