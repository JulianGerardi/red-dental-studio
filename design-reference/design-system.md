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
- **El sitio** (`src/design-system/Sitio.tsx`): el design system se ve como
  un sitio de documentación con la estética de primer.style, no como
  Storybook. `.storybook/manager.ts` oculta el menú, la barra de herramientas
  y el panel de Storybook (`layoutCustomisations`; en celular, la barra de
  abajo se oculta en `manager-head.html`). El sitio pone su barra de arriba
  (logo, las cinco secciones, buscador, "Open the app"), el menú de la sección
  a la izquierda (con filtro, grupos plegables y el ítem actual marcado) y en
  celular un menú desplegable. Los links cambian de página sin recargar: le
  piden al Storybook que abra otra página (`navegar.tsx`). El design system
  se llama **Confidentally UI**. Letra Inter,
  la de la app.
- **Welcome** (`Inicio.tsx`): título, el buscador grande (`Buscador.tsx` +
  `buscar.ts`: nombre, descripción, ejemplos y sinónimos en castellano),
  *Explorá tocando* (`piezas.tsx`: 18 piezas reales, 7 a la vista y *View
  more*), las secciones en tarjetas con *Learn more* y cómo se lee una página.
- **Portada de cada sección** (`PortadaSeccion.tsx`, `portadas/*.mdx`,
  título `<Sección>/Overview`): una tarjeta por página, con su muestra si la
  tiene; Components y Pages agrupados por módulo.
- **Página de cada componente** (`DocsPage.tsx`): rastro, nombre, una frase,
  pestañas subrayadas **Overview / Guidelines / Code**, tres tarjetas de
  estado (Component: Ready si tiene Playground y decisiones; Usage; Design) e
  índice *On this page*. Foundations y Audit ahora también tienen página: su
  historia se muestra sin marco (`.ds-informe`) y `Page.tsx` deja el título
  al sitio.
- **Builder** (`constructor/Constructor.tsx`, `portadas/Builder.mdx`): arma
  un componente con las piezas reales de la app, arrastrándolas, y da su
  código. El panel flotante (abajo en el celular) tiene *Components*, la
  paleta: los bloques editables y las partes de pantallas (Screen parts).
  `constructor/paleta.ts` arma además, desde `index.json`, todas las piezas
  de Confidentally UI (Elements y Components por módulo), así que una pieza
  nueva aparece sola; esas no se muestran en la paleta (se sacaron a pedido)
  pero Describe las usa. Cada pieza va por separado: un ítem por ejemplo, y en las páginas que
  juntan varias ("ClinicalTopBar parts", "Insurance modals", las partes de
  Pages) cada ejemplo se llama como la pieza. El componente real y su import
  se leen del archivo de historias (la primera etiqueta de la app en su
  render, si no el `component` de la página). Se busca en castellano con el
  buscador del sitio (`buscar.ts`).
  Cada ítem se arrastra al lienzo (entre bloques, o adentro de una sección,
  una pestaña o un modal abierto) o se suma con un clic: adentro de lo que se
  pidió con *Add block inside*, adentro de la sección o el modal elegidos, si
  no debajo de lo elegido. El lienzo (`constructor/lienzo.tsx`) envuelve cada
  bloque en un marco: un clic lo elige (Supr lo borra, Esc lo suelta), su
  etiqueta lo arrastra y tiene editar, duplicar y borrar; doble clic lo
  edita. Cada lista del lienzo recibe lo que se suelta según la altura del
  puntero; lo que no entra ahí (un modal adentro de una sección) sigue a la
  lista de afuera. `bloques.tsx` sólo expone el contexto `Armado`, así el
  mismo `VerDiseno` sirve para armar y para el link compartido. Una pieza
  real (bloque `pieza`) se dibuja sola en el lienzo, sin iframe: su historia
  con `composeStory` (sus args y decoradores; las que traen su router,
  `parameters.router: false`, no van adentro del del lienzo) y `.pieza-aislada`
  (docs.css) deja en su lugar lo que en la app es fijo, como el fondo de un
  modal. Si al montarse dibuja algo afuera (un diálogo de Radix que bloquea la
  página, un popover en `<body>`) —lo avisa un `focusin` que viaja por el
  árbol de React— va en un iframe transparente; también las historias que
  abren un menú o diálogo al cargar. Se probaron las 358 piezas. Las pantallas
  completas no están en la paleta: una pantalla se arma desde cero con el
  contenedor **App** (menú lateral y barra reales; en el código, el contenido
  de la ruta para AppShell) y el bloque **Columns** (2 a 4 columnas, cada una
  con bloques). *Layers* tiene los puntos de partida (*Blank screen*),
  contenedor App / Page / Card / Panel / None, ancho y la lista de bloques;
  *Code* el TSX con sus imports, para copiar. *Describe* (primera pestaña,
  `constructor/PanelDescribir.tsx`) piensa con animación: un orbe, los pasos
  y, con Gemini, sus pensamientos a medida que llegan; después arma el lienzo
  bloque por bloque (docs.css, `bl-*`). Con una clave de Gemini (plan gratis,
  la pega cada persona y queda en su navegador) piensa `constructor/ia.ts`
  (`pensarDiseno`): `streamGenerateContent` con
  `thinkingConfig.includeThoughts`; Gemini recibe el catálogo (piezas con ids
  cortos p1…, los campos de cada bloque y de cada tabla), el **lienzo actual**
  en JSON con sus ids y los pedidos anteriores de la sesión, y devuelve el
  diseño entero. Así edita: "cambiá el título", "sacá la tabla", "poné los
  turnos a la derecha" tocan sólo eso y lo demás vuelve con el mismo id;
  algo nuevo lo arma de cero. `desdeFormatoIA` valida todo campo contra el
  bloque real (tipos, valores permitidos, columnas que existen) y descarta
  lo que no existe. Un cambio se aplica de una; algo nuevo se arma bloque
  por bloque. Si el modelo no existe prueba el siguiente; si falla (clave,
  límite, red) lo dice —una clave rechazada se marca en rojo y ofrece pegar
  otra— y sigue sin IA. Sin IA también se edita lo que hay
  (`editarSinIA`): agregar una parte, sacar una por su nombre y cambiar el
  título. Sin clave arma con `constructor/describir.ts`, sin IA: parte
  el texto (comas, "y", "a la derecha", "abajo"), reconoce campos (≈45 clases
  de dato, con su control y opciones sacadas de `src/data`: profesionales,
  pacientes, seguros, zonas…), bloques por palabras de UI (tabla de
  pacientes / movimientos / recetas / turnos, pestañas, métricas, agenda…) y
  si no, la pieza real más parecida (`buscarPiezas`, con los sinónimos del
  buscador). Popup con lista → Modal con sus campos; sin lista → el modal
  real; "eliminar" → modal de confirmación; formulario → card con botones;
  pantalla → contenedor App con encabezado y "a la derecha" en Columns. Cada
  parte queda con sus otras opciones para cambiarla, y *Deshacer* vuelve al
  diseño anterior. Si no reconoce nada lo dice. Bloques editables: Layout (Modal con `ModalShell` y
  `FormFooter`, Tabs with content, Columns, Section con `SectionCard`, Tabs,
  Breadcrumb, Steps con `StepIndicator`), Forms (Fields —con el tipo
  Calendar, que usa `DatePicker`—, Payment como el `PatientPaymentPanel` del
  Ledger, Switches, Time slots con `AppointmentSlotPicker`, Search bar como
  la de Patients con `SearchButton` y `FilterMenu`, Upload), Content
  (Heading, Text, Buttons, Pills, Empty state, Divider, Alert en los tonos de
  `Pill`, Person con `Avatar`), Data (Table, Calendar con `VistaDia` /
  `VistaSemana` / `VistaMes` y `StatusLegend`, Stats con `StatCard`, Stat
  strip con `StatStrip`, Details con `InfoBlock`, Appointments, Tasks con
  `PendingTaskCard`, Patient cards con `PatientCard`, Operatories con
  `OperatoryCard`, Pagination) y Clinical (Odontogram con el
  `Odontogram` de Clinical y `makeMockExam`, Prescription). Las tablas tienen
  columnas libres sobre cuatro conjuntos de datos (`constructor/datos.tsx`:
  pacientes, movimientos del Ledger, recetas y turnos). *PNG* baja la imagen
  del componente (o del modal abierto) con `html-to-image`; *Share link* arma
  un link con el diseño comprimido en `#diseno=` (`constructor/compartir.ts`):
  no se sube a ningún servidor. `.storybook/manager.ts` guarda ese `#` al
  abrir el sitio, antes de que Storybook reescriba la dirección, y el Builder
  lo vuelve a poner para que recargar o copiar la dirección siga mostrándolo.
  El link abre una vista con solo el componente (se puede usar), su código y
  *PNG*; no toca el diseño que la persona tenga guardado hasta que toca *Edit
  a copy*, que lo pasa al Builder, borra el `#` y ofrece *Volver a mi diseño*.
  Un link cortado abre el Builder con un aviso. Modal, Section y cada pestaña tienen bloques
  adentro (el panel los muestra anidados); un modal no va adentro de otro
  bloque. En el lienzo el modal se abre sobre el lienzo (`transform-gpu`
  contiene su `position: fixed`) y queda abierto mientras se edita algo de
  adentro; la pestaña que se edita queda a la vista. Cada bloque se dibuja y se escribe en el mismo lugar
  (`constructor/bloques.tsx`: `VerBloque` y `codigoBloque`), así lo que se ve
  y lo que se copia no se separan. Lo armado queda en `localStorage`. En cada
  página hay un botón flotante: en la de una pieza que el constructor conoce
  dice "Build with …" y la agrega. Si se suma un bloque nuevo, generar el
  código de todos los puntos de partida y compilarlo (se probó con `tsc`).
- **Piezas de pantalla completa en un ejemplo** (barras, paneles, banners de
  Components con `layout: 'fullscreen'`): dentro del recuadro de un ejemplo
  o de una vista de dispositivo se muestran con 24px de aire y el fondo de la
  app (decorador en `preview.tsx`), para que no queden pegadas al borde. Los
  modales se ven igual.
- **Una historia sola** (Full screen, una pantalla de Pages): barra fina para
  volver (`Foco.tsx`, decorador en `preview.tsx`) y el panel de Controls.
- **Elements**: las piezas estándar para armar pantallas. Cada una es un
  componente real de la app y su página tiene el mismo orden: **Playground**
  (se personaliza desde el panel *Controls*; *Show code* da el código),
  variantes o tipos, estados, y **Specs** (medidas leídas del componente
  dibujado y colores leídos de sus clases y de `src/index.css`).
  - **Page header** — `Breadcrumb` + `SettingsPageHeader`: rastro, título
    (24px Bold), bajada, acción principal y barra con buscador, botón Search y
    filtro. *Headers in the app* detecta en el código qué encabezado usa cada
    pantalla y marca los que se apartan (hoy conviven varios tamaños de título:
    PageTitle 20px Semibold, h1 sueltos de 20, 24 y 36px).
  - **Navigation** — el menú lateral (`Sidebar` en `AppShell`): colapsado
    58px con tooltip, expandido 176px (234 en el celular). Playground sobre la
    app real (pantalla, cómo arranca y *open* para dejar abierto el tooltip o un
    menú flotante); *Parts*, *States* (expandido y colapsado, hover, menús de
    Billing y Settings, tooltip) y *Specs* (medidas leídas de los dos rails y
    colores) con el rail solo.
  - **Patient menu** — `PatientSidePanel` solo, sin la pantalla (las
    pantallas del paciente están en *Pages*). Tiene su propio router: tocar una
    sección cambia el ítem activo, y un recuadro punteado marca dónde va la
    pantalla y mide el ancho que le queda (colapsar le da 158px más). Historias:
    Playground (sección, colapsado, encuentro, nombre y *open* para dejar
    abierto un tooltip, la tarjeta de datos o las opciones del encuentro),
    *Parts* (qué hace cada parte, expandido y colapsado), *States* (hover y
    foco en una sección, encuentro pendiente y sus opciones, colapsado con
    tooltip, estado y tarjeta) y *Specs*.
  - **Appointment cards** — las cuatro cards de un turno, cada una con su
    componente: `AppointmentCard` (Dashboard), `AppointmentCard compact`
    (Patients, con kebab: Edit y Go to appointment), `PatientAppointmentCard` (Overview del paciente, antes escrita
    a mano en `PatientDetail.tsx`) y `TurnoCalendario` (Scheduling: bloque,
    chip de Month y fila del celular, antes repetido tres veces en
    `CalendarViews.tsx`). *Which card goes where*, estados de cada una, los
    siete estados del calendario en sus tres formas y *Specs*. Tocarlas abre lo
    mismo que en la app (ficha rápida, detalle del turno, modal de edición).
  - El Playground de **Navigation** monta la app con `PantallaReal`
    (`src/design-system/pantalla.tsx`, lo mismo que usa *Pages*); *Parts*,
    *States* y *Specs* montan sólo el `Sidebar` con su router (`Rail`, alto fijo
    y sin el z-40, que lo ponía encima de la barra del sitio). Lo que en la
    app se abre con el mouse se deja a la vista con dos contextos que la app no
    usa: `NavigationPreview` (`components/layout/navigation-preview.ts`:
    expanded, tooltip, settingsMenu, billingMenu) y `PatientMenuPreview`
    (`components/patients/patient-menu-preview.ts`: collapsed y encounter por
    instancia, tooltip, infoCard, encounterOptions). Abrirlos con una función
    `play` no alcanza: al terminar, la historia se vuelve a dibujar. Para
    hover, foco o un menú abierto en una parte de una muestra está `Forzar`
    (`src/design-system/kit.tsx`).
  - Una página de Elements puede documentar varios archivos:
    `docs.decisionsFrom` acepta una lista, y *Design decisions* y *Where it is
    used* los juntan.
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
    para armarla, anatomía y las cards reales de la app, incluida la de la
    portada de Settings (`SettingsSectionCard`).
  - **Tables** — `src/components/ui/data-table.tsx`: la tabla estándar
    (barra → encabezado → filas → pie) armada con columnas y filas; selección,
    menú de fila, paginación, densidad y estado vacío se prenden con props. Trae
    también las funciones del Ledger para **reducir, achicar y filtrar**, con
    las mismas piezas: `search`, `filter` (FilterMenu), `columnPicker`
    (ColumnPicker; `locked` y `hidden` por columna), `resizable` (ManijaResize +
    useAnchoColumnas) y `rowDetail` (filas que se despliegan, con Expand /
    Collapse all). El Playground deja armar una tabla eligiendo columnas y
    funciones; *Reduce, resize and filter* las muestra todas prendidas y *How to
    build a table* explica los pasos con el código.
    Ya la usan **Patients**, **Team**, **Accounts**, **Locations**,
    **Documents**, **Insurance** y **Billing** (2026-09-26), con `Button` /
    `buttonClasses()` para su acción principal. Para esas pantallas se sumaron:
    selección controlada (`selected`, `onSelectedChange`), filas por página
    (`pageSizeOptions`), avatar `soft` en `PersonCell`, `reorder` (manija para
    reordenar arrastrando o con ↑ ↓; Insurance), filas clickeables con teclado
    (Billing) y filas que crecen si una celda tiene dos líneas.
    **Estados:** `loading` (filas grises con la forma de las columnas),
    `error` (motivo + *Try again*), `disabled` (toda la tabla de sólo lectura, al
    60%) e `isRowDisabled` (filas atenuadas, sin casilla ni menú; *seleccionar
    todo* las saltea), además de vacío, sin resultados, seleccionadas y compacta. Las tablas de
    Clinical (`<table>` nativas) y las del Ledger todavía no.
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

## La biblia: qué tiene cada página de componente

Cada página de docs (`src/design-system/DocsPage.tsx`) muestra, sola:
qué es y cuándo usarlo, **Playground** con controles, las historias (estados),
**On each device** (la historia principal en un iframe de 390, 768 y 1280px,
escalado para entrar; `Dispositivos.tsx`), **Where it is used** (archivos que
lo importan, de `catalog.ts`), **Design decisions** (los comentarios del
código del componente, cada uno con la línea que explica; `decisiones.tsx`) y
el código. Las páginas de Elements que documentan un componente de otro
archivo lo indican con `parameters.docs.decisionsFrom`.

`npm run ds:coverage` mide *Playground con controles* y *Decisiones en el
código* (no frenan el build) y los muestra en *Documentation coverage → UX
bible*. Al 2026-09-27: 89 de 111 con Playground y 107 de 111 con decisiones.
Todo `ui/` tiene Playground: Avatar, Tooltip, Popover, HoverCard, Dialog,
DropdownMenu, Toast, Switch, además de Button, Pill, Card, Tabs y DataTable.

**Tabs** (`ui/tabs.tsx`) es el control segmentado de la app (antes 13 copias a
mano en Ledger, Billing, Account, LedgerOptions, LocationDetail, Employees,
PatientDetail, Scheduling, Consents, ExamPanelHeader y NewProcedureModal):
tamaños md/sm, `fullWidth`, cantidades, íconos, pestaña deshabilitada, flechas
del teclado y deslizamiento cuando no entran. *Elements / Tabs* deja sumar
pestañas, nombrarlas y achicar el ancho.

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

## Pop ups: drawer para todo, confirmación chica para preguntas (2026-10-06)

Julián pidió que todo lo que se abre encima de una pantalla sea un **drawer**, con la lógica, los pasos y la
organización de Confidentally 2.0 (`~/Desktop/Work/dashboard-figma`) y los colores, la tipografía y los componentes de
esta plataforma (antes la regla era la contraria: nada de drawers salvo Add Procedure).

1. **`ui/drawer`** (*Components / UI / Drawer*), como los Sheet de 2.0: márgenes de 24px; título y bajada; si hay varias
   partes, el `StepIndicator` (en `ui/step-indicator`, *Elements / StepIndicator*) debajo del título, sin línea, con el
   **nombre de cada paso** (desde 2026-10-06; antes "Step" y el número como en 2.0). Contenido en **una columna**, con secciones de título suelto **sin caja ni borde**
   (`DrawerSection`; `SectionCard` se dibuja así dentro de un drawer) y campos de a dos por fila. Cada parte de un
   formulario con pasos es un `DrawerStep` (la que no se ve no se desmonta). **Pie** (`DrawerActions`): dos botones del
   mismo ancho, Cancel o Return a la izquierda y Next Step o Save a la derecha. Anchos de 2.0: md 480, lg 560, xl 760.
   **`aside`**: un panel de apoyo que se despliega a la izquierda del drawer (en angosto, al pie del contenido).
2. **`ModalShell`** (los formularios de Patients, Settings, Scheduling, Billing, Ledger, Insurance) abre un drawer: el
   ancho que pedía elige el tamaño (hasta 480 md, hasta 640 lg, más xl); `actions` recibe un `DrawerActions`.
3. **Copiados de 2.0**: New Patient (General con las tres casillas -vincular una persona existente, Interpreter
   Required, crear usuario-; vincular cambia los datos por un buscador con el aviso de guardián y suma el paso Guardian,
   que también aparece si es menor; Demography de a dos), New Appointment (paso 1 "Patient and Scheduling" en una
   columna; paso 2 "Link to treatment plan visit" con Additional y Notes; el calendario del día se despliega **al
   costado del drawer** al tocar la fecha o la hora), Edit Contact Details y Edit Relationship (un paso, sin cajas),
   New Procedure / Condition (pie de 2.0).
4. **Con pasos, sin equivalente en 2.0**: Edit Patient (General, Demography, Address), New Subscription y Manage
   Subscription (Subscriber, Subscription), Post payment (Payment, Allocation), New Condition de Radiography.
5. **Drawer de un paso**: medicamentos, condiciones y alergias, Apply unapplied credit, detalle de un movimiento del
   Ledger, New Room / Hours / Availability / Exception, Assign Role, New Depender, Move Procedure / New Group /
   Complete / Delete Case del Treatment Plan, Consent history, el preview de Consents (lg, 2026-10-07), Review Exam, Exam
   review y el AI Narrative Editor (xl).
6. **Siguen como confirmación chica** (`ui/confirm-dialog`, *Elements / ConfirmDialog*), igual que en 2.0: las
   preguntas de sí o no -Discard and close?, Back to permanent dentition?, limpiar la selección del odontograma,
   Discard / Expire / Cancel / Present / Accept del caso, Confirm procedure- y el aviso de Clinical Note.
7. **No cambian** los desplegables anclados (popovers, calendario, filtros) ni el visor de radiografías.
   `AppointmentDetailsDrawer` es una card anclada al turno y `LinkTreatmentPlanDrawer` no se usa en la app.
8. **Add Relationship** (2026-10-06): drawer de 2.0 con Person, Contact y Relationship (*Components / Patients /
   AddRelationshipDrawer*).
9. **Settings** (2026-10-06, segunda vuelta): New Location y New Employee dejan de ser pantallas aparte (General,
   Contact, Address; `/settings/locations/new` y `/settings/team/new` abren la lista con el drawer abierto); New Account
   (Information, Address, Owner, como las pestañas de Edit Account; queda en Draft) y Manage Licenses (un paso; no baja
   de las licencias en uso, sin plan avisa y no guarda). Next valida sólo el paso a la vista (`lib/useFormPasos`).
10. **Animación de los pasos**: al completar un paso el tilde rebota, el anillo verde se abre y la línea se llena (la de
   New Procedure); además el contenido del paso nuevo entra deslizándose desde la derecha con Next y desde la izquierda
   con Return (`paso-entra` / `paso-vuelve`).
11. **Cada paso dice su nombre, en todos los drawers** (Julián, 2026-10-06: "en vez de steps debe coincidir con el paso
    que estoy haciendo, así el usuario tiene noción de lo que está haciendo"): General · Contact · Address, Person ·
    Contact · Relationship, Procedure · Surfaces · Link to finding · Link to diagnosis… Reemplaza el "Step" de 2.0.
12. **La línea entre círculos es la misma en todos los drawers**: el rótulo del paso ("Step" o un nombre) va encima
    del círculo sin ocupar ancho (el primero alineado a la izquierda, el último a la derecha). Antes, los nombres largos
    de New Procedure acortaban la línea y la despegaban de los círculos.

## Banner, filtros y Treatment plans (2026-10-06)

- **Banner de notificaciones**: Julián eligió la tarjeta -el aviso ámbar del design system (tono warning de Alert), del
  ancho de su contenido y alineado con la página-, con la tarea, Review, el paginador y la X juntos. Ya no hay barra de
  punta a punta con hueco en el medio.
- **Filtro único** (`ui/filter-menu`, *Elements / Filter*) en toda la app; **el buscador va siempre primero**, en las
  barras (buscador, después Filter) y dentro del menú (la búsqueda arriba de las opciones).
- **Columns** (`ColumnPicker`) usa el mismo botón que el filtro (`filterTriggerClasses`): en la barra del Ledger y en las
  tablas, Filter y Columns tienen el mismo alto, letra y borde.
- **Títulos**: Settings, Help y las fichas de Settings usan `PageTitle` (20px semibold) y la bajada de 12px, como el
  resto de las pantallas (antes 24px bold y 36px en la home de Settings); Confibot titula como los drawers (18px y 12px).
- **Menú**: Billing, como Settings, abre al costado un menú con Billing, Fee Schedules, Carriers y Coverage Table.
- **Pending Task**: cuatro columnas desde 1360px, para que las tareas del día llenen las filas sin hueco.
- **Cards de la página, en toda la app** (`Card`, `TARJETA_PANEL` en `lib/estilos`, la Card de Settings y `SectionCard`):
  blancas, con la sombra de los paneles del Dashboard y **sin borde**: Dashboard, pantallas del paciente, Clinical Mode,
  Billing, Help, Notifications y Settings. Las tablas y la grilla del calendario mantienen su borde. *Elements / Cards →
  Card on the page*.
- **Cards adentro de un panel** (`InnerCard`, `TARJETA_INTERNA`): todas con fondo blanco y `shadow-inner-card`: un
  stroke de medio pixel en gris tenue por dentro de la card (sombra inset, negro al 12%: un border de 0.5px se redondea
  a 1px y una línea por fuera la recortan las listas con scroll) y una sombra casi nula (0 1px 2px, 4%): Appointments, Waiting Room, Rooms y Pending Task del Dashboard, los turnos y tareas del Patient
  Dashboard y las cards chicas de Patients y Scheduling. *Elements / Cards → Card inside a panel*.
- **Cards de Treatment Plan**: en el Overview y en la card *Treatment plans* del workflow quedan las publicadas. Se
  probaron una compacta con anillo de avance y una por visita (un procedimiento por línea); Julián se quedó con las
  actuales porque muestran el detalle de cada procedimiento. Segunda vuelta (2026-10-06): para la del workflow se
  propusieron B (progreso por plan) y C (recorrido por visita) con el mismo detalle; Julián volvió a elegir **A** y las
  otras dos se sacaron del código.

## Cómo se documenta lo nuevo (2026-10-06)

Todo lo que se sumó en esta tanda tiene su página con la estructura de *Elements / Buttons* (Playground primero con
controles, después Parts, States y Specs, con el kit `src/design-system/kit.tsx`; para drawers de formulario,
`src/design-system/kit-drawer.tsx` con las tablas de pasos, estados y specs):

- *Elements / StepIndicator* (rótulos, animación, la línea de círculo a círculo) y *Components / UI / Drawer*
  (los nombres de los pasos, reglas de Next Step, dónde hay pasos).
- *Components / Settings*: NewLocationDrawer, NewEmployeeDrawer, NewAccountDrawer, ManageLicensesDrawer;
  *Components / Patients*: AddRelationshipDrawer; *Elements / Cards* (la card adentro de un panel).
- *Components / Clinical*: Treatment plans card (la A, la elegida), TreatmentPanel, NarrativeEditor, ProblemList,
  TreatmentPlanList y Dental / NewProcedureDrawer.
- *Elements / Filter* (Columns con el mismo botón) y *Components / Ledger / ColumnPicker*; *Elements / Navigation*
  (Billing menu); *Components / UI / PageTitle* (la escala de títulos); *Components / Help / Confibot*;
  *Components / Layout / NotificationBanner*; *Elements / ConfirmDialog*.

## Patients: Today Appointments (2026-10-07)

- `AppointmentCardCompacta` cambió la flecha por el kebab (`RowActionsMenu`) con *Edit* y *Go to appointment*; sigue en
  *Elements / Appointment cards* (Patients list: descripción y tabla *Which card goes where*) y en *Components /
  Dashboard / AppointmentCard parts → CompactRow*.
- La pantalla Patients ya no tiene Recent Patients; `PatientCard` sigue en *Elements / Cards* y sus stories. Decisiones
  y motivos en `figma/modulos/patients.md` (2026-10-07).


## Consents: el preview en un drawer (2026-10-07)

- El preview de Settings → Consents deja de ser la tercera columna y se abre en un **drawer lg** desde *Preview*, en el
  pie fijo del editor (al lado de Cancel y Save). El panel entero es el escritorio gris con la hoja blanca; pie con
  *Back to editor* y *Save*. Se suma al punto 5 de *Pop ups* (drawer de un paso).
- *Pages › Parts › Consents*: Playground en iframe con el control *previewOpen*; *Preview · Clinic view / Patient view*
  con el drawer abierto; Specs con el botón Preview y la regla nueva. Decisiones en `figma/modulos/consents.md`.

## Sidebar: menú expandido de 176px (2026-10-07)

- El rail expandido pasa de 234 a **176px** en escritorio (colapsado sigue en 58; en el celular el panel sigue en 234,
  porque tapa el contenido y no le quita lugar). El ítem de Settings ya no se sale 12px del rail.
- *Elements / Navigation* pasa a la estructura de *Elements / Buttons* (antes era una lista suelta de historias):
  **Playground** sobre la app real con *screen*, *expanded* y *open* (tooltip, menú de Billing o de Settings);
  **Parts** (logo, ítems, Billing, Confibot, Settings, toggle, y qué hace cada uno colapsado); **States** (expandido:
  default, hover, menú de Billing, menú de Settings; colapsado: default, tooltip, menú de Settings) y **Specs** (rail
  176/58 × su alto, logo 64, ítem 152×36 y 32×32, Settings, separaciones y colores con token). El celular queda en
  *Guidelines › On each device*. No hay muestra de foco: los ítems usan el anillo del navegador y no se puede forzar.
- *Components / Layout / Sidebar parts*: las muestras de Settings y Billing van en 176. Decisiones en
  `figma/modulos/header-sidebar.md` (2026-10-07).

