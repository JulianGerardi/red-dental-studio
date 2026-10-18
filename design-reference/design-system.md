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
    Suma la solicitud de turno (`SolicitudCard`), que es la misma card que la del
    Overview (`TarjetaTurno`, 2026-10-12).
  - El Playground de **Navigation** monta la app con `PantallaReal`
    (`src/design-system/pantalla.tsx`, lo mismo que usa *Pages*); *Parts*,
    *States* y *Specs* montan sólo el `Sidebar` con su router (`Rail`, alto fijo
    y sin el z-40, que lo ponía encima de la barra del sitio). Lo que en la
    app se abre con el mouse se deja a la vista con dos contextos que la app no
    usa: `NavigationPreview` (`components/layout/navigation-preview.ts`:
    expanded, tooltip, settingsMenu) y `PatientMenuPreview`
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
  - **Counts** — `src/components/ui/count.tsx` (2026-10-07): el globo con una cuenta (alergias, medicación…), círculo
    con un dígito y píldora con dos, 20 px de alto. No marca un estado —eso es `Pill`—. Prop `active` para el globo
    sobre la card azul abierta. Lo usa el dashboard del paciente; los otros conteos redondos de la app
    (`OperatoryCard`, la barra de Clinical Mode) siguen con su propia clase y se pueden migrar.
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
   Discard / Expire / Cancel / Present / Accept del caso, Confirm procedure-, el aviso de Clinical Note y *Move treatment
   visit?* de New Appointment (2026-10-17).
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
- *Elements / Appointment cards → Patients list card: states*: Default, Kebab hover, Menu open (Edit / Go to
  appointment), Long name y la lista de los 10 turnos. El Playground de *Patients list* abre el modal de Edit. Para
  dejar el menú a la vista, `RowActionsMenu` suma `abierto` (sólo stories; ver *Components / UI / RowActionsMenu →
  Open*) y `AppointmentCardCompacta` suma `menuAbierto`.
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


## Consents: Parts y States, y el pie en angosto (2026-10-07)

- *Pages › Parts › Consents* pasa a la estructura de *Elements / Buttons*: **Playground**, **Parts** (la pantalla y una
  tabla con qué hace cada parte y su componente), **States** (cada parte en cada estado, una muestra por estado con su
  nota, incluido *Narrow footer*), **Preview · Clinic view / Patient view** (el drawer abierto, en iframe) y **Specs**
  (Colors corrige *Panels*: sombra, sin borde). Ya no hay historias sueltas.
- Editor de Consents: el pie fijo hace wrap; en angosto Cancel y Save bajan juntos a otra línea y Preview queda arriba
  (*Narrow footer*, en un iframe de 320px). Decisiones
  en `figma/modulos/consents.md` (segunda vuelta del 2026-10-07).

## Clinical Mode: detalle de fila en la Problem List (2026-10-08)

- *Components / Clinical / RecordDetail* (nuevo): Playground (registro y ancho: tabla del Overview, flotante del examen,
  teléfono), **Parts** (el detalle, los bloques de procedimiento y de problema, cada pieza y la tabla de qué hace cada
  una), **States** (todo vinculado, caso histórico, antes de aceptar, vacío, problema con procedimientos, problema con
  derivación propia, flotante y angosto), *More open*, *Full record* y *Full record · problem* (el drawer, en iframe),
  *Contents* y **Specs** (columnas por container query, bloques, tipografía y reglas).
- *Components / Clinical / ProblemList*: *Expanded row* y *Jump to finding*; States y Specs suman la fila desplegada,
  el salto entre pestañas y los anchos de columna nuevos.
- *Elements / Tables*: `defaultExpanded` (la fila arranca abierta y la tabla abre en su página), *States → Expanded
  row*, y la regla de que el detalle queda en la parte visible cuando la tabla scrollea de costado.
- Decisiones en `figma/modulos/clinical-mode.md` (2026-10-08).
- Segunda vuelta (2026-10-08): el detalle pasa de cards a **lista** (filas una debajo de la otra, título a la izquierda).
  *RecordDetail* actualiza Parts (Rows of a procedure / problem, Row, Entry), States, *More open* y Specs (lista, título
  de 150px, línea de 24px).

## Clinical Mode: Lab Order con la tabla estándar (2026-10-08)

- *Components / Clinical / LabOrderPanel* pasa a la estructura de *Elements / Buttons*: **Playground** con *orders*
  (0 a 9: el vacío y la paginación) y *width* (desktop, tablet, phone); **Parts** (Filter, View History, New
  Prescription, las pills de estado y la tabla de qué hace cada parte); **States** (Filter open, Filtered, Row menu,
  Canceled, No results, Empty, Phone, cada uno con su story) y **Specs**. Ya no hay historias sueltas.
- *Elements / Tables*: el `filter` de `DataTable` acepta opciones con cantidad y color (`FilterOption`); el Playground
  lo muestra y Specs → Rules lo suma. *Audit / Tables in the app* mide Lab Order desde su Playground.
- Decisiones en `figma/modulos/clinical-mode.md` (2026-10-08).

## Dashboard: fila de fecha (2026-10-09)

- *Pages / Parts / Dashboard* deja de ser una lista suelta: **Playground** con la fila de fecha (*day*, *markedDays*),
  **Parts** (selector, Today, línea de alcance; botón de filtro), **States** (otro día, hoy, Today en hover, calendario
  abierto; filtro sin y con selección) y **Specs** (alto, padding, texto, radio, borde e ícono del selector y de Today,
  leídos del render, y los tokens de Today).
- Regla: Today es `Button` secondary md, 32px como el selector. Decisiones en `figma/modulos/dashboard.md` (2026-10-09).

## Clinical Mode: View Problem List más ancho (2026-10-09)

- *Components / Clinical / ExamLayout*: el flotante de View Problem List mide hasta 1240px y llega hasta el borde de
  abajo de la pantalla con scroll adentro. Stories nuevas: *Problem list open*, *Problem list · row open* y **Specs**
  (ancho, alto, posición y sombra del flotante). Decisiones en `figma/modulos/clinical-mode.md` (2026-10-09).

## Billing: cards como en Patients y la vista de un paciente (2026-10-09)

- *Pages › Parts › Billing* pasa a la estructura de *Elements / Buttons* (antes era una sola historia suelta):
  **Playground** en iframe (paciente o None para el resumen, Patient / Guarantor View, filtro, búsqueda y actividad
  vacía), **Parts** (la pantalla con un paciente y qué hace cada parte), **States** (Header: resumen y con paciente;
  Patient card: patient, guarantor y nombre largo; Patient result: default, hover, selected, focus y nombre largo; Find
  Patient: resumen, con paciente, buscando y sin resultados; Recent Billing Activity: resumen, Patient View, Guarantor
  View, paciente sin movimientos, filtrado sin filas, vacío y angosto; Numbers) y **Specs**. `Billing.tsx` exporta
  `EncabezadoBilling`, `PacienteElegido`, `ResultadoPaciente`, `BuscarPaciente` y `ActividadReciente`, y `Billing`
  acepta `inicial` (sólo stories).
- *Components / Dashboard / Panel and StatusPill* pasa a Playground, Parts, States y Specs. `Panel` suma `top` (una
  franja de borde a borde arriba del título) y su encabezado es `min-h-[52px] py-2 flex-wrap`: Tabs de 36px entran
  sin agrandarlo y en el celular bajan abajo del título.
- *Elements / Cards*: la InnerCard clickeable (hover `surface-subtle`) y la elegida (`dash-count-bg`), y dos reglas:
  los números adentro de un panel son InnerCard y el título de un panel no lleva ícono.
- *Components / UI / InfoTip* (nuevo): el círculo de info de una card con número, sobre `HoverCard` (abre con mouse,
  toque y Tab). Playground, Parts, States (default, hover, focus, abierto, dos líneas) y Specs. Lo usan los números de
  Billing (`Stat info`).
- Animación nueva `paciente-entra` (`src/index.css`): sutil, estilo Apple: 2px, desenfoque leve que se aclara y
  opacidad, 360ms con `cubic-bezier(0.32, 0.72, 0, 1)`.
- Queda para decidir: la card elegida tiene dos lenguajes, el anillo azul (Card de página y AppointmentCard del
  Dashboard) y el celeste (los resultados de Billing). Decisiones en `figma/modulos/billing.md`.

## Settings → Billing desde red.dev (2026-10-09)

Reemplaza la sección del 2026-10-08 de este mismo PR (#18), que nunca llegó a `main`.

- *Pages*: las rutas de red.dev (Fee Schedules en tabla, Edit Fee Schedule con la lista, New Fee Schedule, Carriers, Edit
  Carrier y sus planes, New Insurance Plan, Edit Insurance Plan y su Coverage Table, Coverage Table con la lista, su alta
  y los redirects de `/:id`). *Pages › Parts › Billing settings*: CarrierForm, CarrierPlans, las siete pestañas del plan,
  FeeScheduleEditor y CoverageTableEditor, con Playground (parte e ítem), Parts, States (New, Missing fees, Empty, Save
  disabled, Selected rows) y Specs (rutas y medidas).
- *Components / Finance*, todos con Playground, Parts, States y Specs:
  - **Fields** (UnitField, PhoneFields, MoneyInput) y **RangesTable** (la tabla de rangos de plantillas y planes).
  - **MasterList**: la lista de la izquierda de red.dev (buscador, filtro, punto de estado, ⋮).
  - **Assignments**: el número con desglose en Popover (hover o clic) y el drawer *View assignments*.
  - **CompareFeesDrawer**: la diferencia por código contra una referencia explícita.
  - Drawers con `kit-drawer`: CarrierDrawer, PlanDrawer (más *Fields* con los grupos de `PlanFields`),
    LocationNumberDrawer, CopyFromDrawer, FeeScheduleTools (Copy form, Increase All / Increase Selected) y
    ExceptionsDrawer (lista y asistente de cuatro pasos).
- Salieron CoverageBar, CoverageSummary, EditableAmount, PlansTable, FeeScheduleDrawer, AdjustFeesDrawer,
  CoverageTableDrawer y CoverageRuleDrawer con sus páginas.
- `patients/form`: `hideLabel` en TextField y SelectField (rótulo sólo para lectores de pantalla, para campos dentro de
  una celda) y `control()` exportado para inputs propios con el mismo borde. Siguen de la primera vuelta
  **SettingsSearch**, `etiquetas` en SettingsPageHeader y `detail` en SettingsSectionCard.
- `play.ts` suma `pulsarRol(rol, nombre)` para tocar una pestaña, un radio, una casilla o una opción de menú desde un
  `play`.
- Decisiones y anomalías en `figma/modulos/settings-billing.md`; relevamiento en `red-dev/settings-billing/`.

## Patrón de tablas y drawers sin títulos repetidos (2026-10-09)

- **Todas las tablas iguales** (Julián: "solo está en azul cuando tiene un hipervínculo"; guía: Locations, Employees y
  Patients). Encabezado en banda `surface-alt` con 11px Semibold `ink-muted`; celdas en 13px Regular `ink-soft`, también
  códigos, montos y descripciones; azul `dash-blue` Semibold sólo en lo que navega. Quedan el color semántico de un dato
  (crédito verde, vencido rojo) y las pills.
- Clases en `src/lib/estilos.ts`: `TABLA_MARCO`, `TABLA_ENCABEZADO`, `TABLA_FILA`, `TABLA_TEXTO` y `TABLA_LINK`.
  `DataTable` las usa y las tablas propias (`role="table"`) también. *Elements / Tables › Specs* suma el bloque
  *Pattern for every table*.
- Ajustes: Carriers e Insurance Plans (nombre como link), Accounts (link en Semibold, Plan sin negrita), Billing (Patient y
  Balance sin negrita), Lab Order (personas sin negrita), Documents (sin `ink-medium`), Problem List (de 12px negro a 13px
  `ink-soft`, columnas reacomodadas para que entre a 1440px), Treatment Plan (todas las celdas en `ink-soft`) y las tablas
  propias de Billing (fees, rangos, Compare fees, Location Number, Exceptions y las pestañas del plan). `AmountCell` deja
  el Medium. `TextCell strong` queda sólo para el Builder.
- **Drawers**: un título de sección no repite el rótulo del campo ni el título del drawer; un drawer de un solo campo va
  sin sección. Arreglados Copy form, Increase All, Location Number, Copy from, Manage Exceptions, Add Relationship y Edit
  Relationship.
- Decisiones de Billing en `figma/modulos/settings-billing.md` (16 a 20).

## Chips y tablas que no recortan (2026-10-09)

- *Elements / Chips* (nuevo, `ui/chip`): lo elegido que se puede sacar. Celeste `dash-count-bg`, texto `dash-blue` 12px
  Medium, ✕ a la derecha, 24px de alto. Playground, Parts (y Chip vs Pill), States (default, read only, disabled, long
  text, en lista) y Specs. Reemplaza los chips a mano de Manage Exceptions (gris), Consents y los filtros de Treatment.
  Segunda vuelta: también *Selected area* (New Procedure y Radiography) y las franjas de Working Hours. **Regla: la ✕ va
  siempre a la derecha** (Julián, 2026-10-09).
- Patrón de tablas: `TABLA_MARCO` deja `overflow-hidden` porque escondía la lista de los `SelectField` de una celda; las
  esquinas las redondean el encabezado (`rounded-t`) y la última fila (`last:rounded-b`). *Elements / Tables › Specs*
  lo suma a la regla.

## Campos de los drawers: de a dos y del mismo ancho (2026-10-10)

- **Regla** (Julián, sobre una captura de Post payment: "no están prolijos o no tienen el mismo tamaño… esa regla aplica
  para todo"): los campos van en `grid gap-4 sm:grid-cols-2` y llenan su celda; nunca anchos fijos, `flex-wrap` ni tres
  por fila. El que queda solo va en la columna izquierda; sólo Notes y la búsqueda de paciente o persona ocupan el ancho
  entero. Casillas una debajo de la otra. Rótulo siempre `FieldLabel` y controles de 36px (`control()` para un input
  propio). En una card de página, la misma regla con `lg:grid-cols-4` (Ledger).
- *Components / UI / Drawer*: **Parts → Fields** (Post payment armado con la regla) y **Specs → Fields** (la tabla de
  reglas); tamaño nuevo **2xl** (1000px) para un paso con una tabla ancha, en el control *size* y en *Specs → Sizes*.
- **`npm run ds:campos`** (`scripts/ds-campos.mjs`): con Storybook andando, abre cada story y mide los campos de los
  drawers abiertos (mismo ancho por fila, alineados a la grilla, mismo alto y sin mezclar media columna con ancho entero
  en un mismo paso). Las búsquedas con lupa y las barras de catálogo quedan afuera. `STORYBOOK_URL` y `CHROMIUM_PATH`
  opcionales.
- Arreglados con la medición: Post payment, New Patient, Edit Patient, Edit Contact Details, New Allergy / Medication /
  Medical Condition / Past Surgery, New Subscription, New Depender, New Exception, New Hours, New Location, New Account,
  New Employee, New Appointment, New Carrier (y *Information*), PhoneFields, Increase All, New Procedure, New Condition
  y los paneles Payment / Credit / Charge del Ledger. Decisiones en el `.md` de cada módulo (2026-10-10).


## Cards: la sombra no se recorta (2026-10-10)

- *Elements / Cards → Specs* suma el bloque *Shadow room* (bien: la card scrollea adentro; mal: un contenedor con
  `overflow-hidden` le corta la sombra) y la regla en *Rules*: **una card no va dentro de un `overflow-hidden`**; para
  topar el alto, el scroll va dentro de la card. Lo disparó Today Appointments en Patients, que se veía sin sombra (ver
  `figma/modulos/patients.md`, 2026-10-10).
- **Sombra más suave para todas las cards madre** (Julián: "los shadows de las cards madre están muy duros"). Se
  propusieron tres variantes en una página temporal (*Proposals / Card shadow*, ya borrada) sobre componentes y pantallas
  reales: A · Subtle (sólo el canto), B · Diffuse (contacto + difusa hacia abajo) y C · Floating (amplia y corrida hacia
  abajo). Julián eligió primero la B y después se quedó con **dos alturas**:
  - **Cards madre → A.** `--shadow-panel` pasa de `0 4px 14px` gris al 25% a `0 1px 2px rgb(16 24 40 / 6%), 0 1px 3px
    rgb(16 24 40 / 8%)`: casi planas, la sombra de contacto sólo marca el canto (el blanco casi no contrasta con el fondo
    `#fafbfe`). En gris azulado, el del texto, en vez de gris neutro.
  - **Pop ups flotantes → B.** Token nuevo `--shadow-floating`: `0 1px 2px rgb(16 24 40 / 4%), 0 4px 16px -2px rgb(16 24
    40 / 10%)`. Lo que se abre desde un elemento y queda encima de la pantalla: el detalle del paciente de la card de turno
    (`PatientDetailsPopover`) y su par de Scheduling (`AppointmentDetailsDrawer` en escritorio), `LocationSelector`,
    `ViewFiltersPanel`, Appointment requests, el menú lateral de Billing/Settings (`Sidebar`), `PatientInSessionPopup`,
    `ClinicalPopover`, los flotantes de `ClinicalTopBar`, Problem list en `ExamLayout`, `Confibot` y `CoachMark`. Antes
    cada uno tenía su sombra a mano (`0 8px 24–28px` o `0 12px 32px`, negro del 12% al 22%).
  - Quedan como estaban: las listas de opciones y menús chicos (`shadow-lg`), los toasts, los drawers (tienen fondo
    oscurecido) y la hoja de abajo de Scheduling en el celular (su sombra va hacia arriba). Se pueden sumar después.
- `shadow-stat` (los números del Dashboard: `StatCard` y `StatStrip`) se borra: usan `shadow-panel`. *Elements / Cards →
  Specs* muestra las dos alturas (*Card on the page* y *Floating pop up*) y la regla; *Foundations / Radius and shadows*
  las lee del CSS. No cambian `InnerCard` ni el anillo azul de hover y selección.

## Date filter: un día o un rango (2026-10-12)

- Página nueva *Elements / Date filter* (`ui/date-filter.tsx`): **Playground** (arrancar sin filtro, con un atajo, un
  día o un rango; puntos; deshabilitado), **Parts** (campo, ✕, atajos, mes, día, ayuda), **States** (campo: All dates,
  hover, foco, atajo, un día, rango, deshabilitado; panel: nada elegido, eligiendo el segundo día, atajo), **Open** (el
  popover de verdad) y **Specs** (en Notifications, medidas del campo y del panel, tokens y reglas).
  `DateFilterPanel` es lo de adentro del popover, exportado para mostrarlo abierto; `defaultAnchor` sólo sirve para
  dibujar el estado "eligiendo el segundo día".
- *Pages / Parts / Notifications*: los vacíos de cada pestaña con fechas elegidas (con *Clear dates*) y las reglas de
  los grupos por mes. Decisiones en `figma/modulos/notifications.md` (2026-10-12).
- Arreglo del kit: `Token` (y `colorDeToken` de `medir.ts`) leía negro los tokens de shadcn (`primary`, `accent`…),
  que viven en `@theme inline` sin `--color-*`. Ahora prueba `hsl(var(--<token>))`; se corrige también *Settings
  section card*.

## DatePicker: un calendario para toda la app y el look toolbar (2026-10-12)

- *Components / UI / DatePicker* deja de ser una lista suelta: **Playground** (look, vacío o con fecha, puntos, error),
  **Parts** (campo en los dos looks, el calendario y sus flechas), **States** (field: vacío, elegido, hover, foco, error;
  toolbar: elegido, hover, foco; calendario: elegido y marcados, hoy, con tope), **Open** y **Specs** (*Which one goes
  where*: DatePicker field, DatePicker toolbar y DateFilter; medidas del campo y del calendario; tokens; reglas).
- `MonthCalendar` es el calendario de los dos (`DatePicker` y `DateFilter`) y `fechaTriggerClasses` el campo. El
  `DatePicker` usa el popover de Radix. *Elements / Date filter* y *Pages / Parts / Dashboard* dicen que comparten
  campo y calendario. Decisiones en `figma/modulos/dashboard.md` (2026-10-12).

## Appointment cards: turno del paciente y solicitud, una sola card (2026-10-12)

- Componente nuevo `TarjetaTurno` (`components/scheduling/`), base de `PatientAppointmentCard` (Patient Dashboard) y
  `SolicitudCard` (*Appointment requests* de Scheduling): `InnerCard` con **barra de 3px a la izquierda del color de la
  pill** (`BARRA_TONOS`, un tono de `Pill` → su token de borde), avatar, nombre (hasta dos renglones), `Pill`, motivo,
  fecha, lugar y acciones con `ui/button` sm. Lo pidió Julián: a los turnos del paciente les faltaba la barra que tienen
  las solicitudes. Decisiones en `figma/modulos/patient-dashboard.md` y `scheduling.md` (2026-10-12).
- *Elements / Appointment cards*: *Appointment request* en el Playground (tipo y espera) y en *Which card goes where*;
  *Patient overview and request: one card* (las dos lado a lado y Parts); *Request card: states* (ASAP, Waiting List,
  hover y foco de Schedule, celular); *Long name* en los estados del Overview; *Specs* mide la solicitud y lista la barra
  de cada estado. *Components / Scheduling / TarjetaTurno* con sus variantes; *Elements / Cards → Cards in the app* y
  *Pages / Parts / Scheduling → Request Cards* actualizados.

## Listas largas: filas y "Show more" con scroll (2026-10-12)

- La propuesta de dos variantes del Dashboard se cerró: queda el layout de siempre y, para toda la app, la regla de
  Julián para muchas cards o mucha información: **se ven unos pocos y "Show N more" abre el resto con scroll adentro**.
  La página temporal *Proposals / Dashboard with volume* y el selector de la app se borraron.
- **Elements / Show more** (`ui/show-more.tsx`, nuevo): `ShowMore` dibuja los primeros `limit` ítems (función hija);
  abierta, alto máximo `max(alto cerrado, min(70vh, 640px))` con scroll, degradé abajo que avisa que hay más (color del
  fondo: `fade`) y "Show less". Sin pasar el tope, no hay botón. La zona con scroll es una región con nombre, alcanzable
  con Tab.
- **Elements / List group** (`ui/list-group.tsx`, nuevo): filas en una caja de línea fina con rótulo opcional, y el tope
  de `ShowMore` por dentro.
- **Components / Dashboard / Dashboard rows** (`dashboard/DashboardRows.tsx`, nuevo): `AppointmentRow` y `TaskRow`, con
  el mismo contenido que `AppointmentCard` y `PendingTaskCard`. Se adaptan al ancho de su lista con `@container`
  (columnas desde 768px el turno y 1024px la tarea). La acción del pie de la card de turno pasó a `accionTurno` y la de
  la tarea a `completarTarea`, para que card y fila hagan lo mismo.
- Dónde: Dashboard (turnos, sala de espera, salas, tareas), Patient Dashboard (Pending Task con `TaskRow`, Appointments,
  Pending documents) y Treatments. *Pages / Dashboard Busy Day* muestra el Dashboard con 35 turnos (`?day=busy`).
- **Documents Manager** con el encabezado de las tablas por defecto: `SettingsPageHeader` (la bajada pasa a ser
  opcional) y `SettingsSearch`. *SettingsPageHeader → States* suma *Without subtitle*.
- Regla que dejó la corrección de Julián sobre la propuesta: **rediseñar no es cambiar el contenido** (mismos datos,
  textos y acciones que la pantalla original). Ver `figma/modulos/dashboard.md`.

## Filas del Dashboard: caja de hora y tareas agrupadas (2026-10-13)

- `AppointmentRow`: la hora va en la caja gris de la card (reloj y hora) del alto de la fila; ancha, en una línea.
  `TaskRow`: el tipo con Requested, el paciente con el documento y Expired date, las fechas, y el aire antes del botón.
  *Components / Dashboard / Dashboard rows → Parts* lo explica. Ver `figma/modulos/dashboard.md`.

## Casillas en una página con grilla de dos (2026-10-13)

- En una página (no un drawer) con campos de a dos, las casillas siguen la misma grilla: una por columna, del ancho del
  campo de arriba (Edit Carrier › *Information*, pedido de Julián). En los drawers siguen una debajo de la otra
  (*Components / UI / Drawer → Specs → Fields*).

## Patients: barra lateral con Show more (2026-10-13)

- Today Appointments (4 filas) y Recent Patients (3) usan `ui/show-more`: filas enteras y "Show N more" con scroll
  adentro. Están en la tabla *Limits in the app* de *Elements / Show more*, y la pantalla completa en *Pages / Patients*.
- `BotonVerTodos` se va de `pages/Patients.tsx` y de *Pages / Parts / Patients* (queda `CountBubble`). La muestra *With
  link* de *Components / Dashboard / Panel* (antes *With View all*) toma el link de *All treatment* en Treatment plans.
- Decisiones y motivos en `figma/modulos/patients.md` (2026-10-13).

## Navigation: el menú en blanco (2026-10-13)

- El rail de la app pasa de `surface-subtle` (`#fafafa`) a **blanco**; el bloque del logo sigue azul. *Elements /
  Navigation → Specs → Colors* lo muestra con el token `white`, y Playground, Parts y States ya lo dibujan así porque
  montan el `Sidebar` real. La interfaz de Storybook mantiene su riel `#fafafa` (ver *Interfaz de Storybook*).
  Decisiones en `figma/modulos/header-sidebar.md` (2026-10-13).

## Confibot flotante abajo a la derecha (2026-10-13)

- Vuelve el botón flotante de Confibot (el último que había, antes de pasar al menú): `ConfibotLanzador` en
  `help/Confibot.tsx`. Círculo de 48px con degradé, se estira a "Confibot" con hover o foco; flechita para recogerlo y
  pestaña al pie para traerlo (se recuerda entre visitas). Lo monta `AppShell`; no se dibuja con el chat o un CoachMark
  abiertos.
- **Botones flotantes que conviven:** una pantalla con su propio flotante en esa esquina llama a `useFabDePagina()`
  (`help/HelpProvider.tsx`) y Confibot se apila 12px arriba. Hoy sólo Scheduling (Appointment requests).
- `AppShell` vuelve a reservar el alto del botón al pie del `main` (`pb-24 sm:pb-28`).
- Token nuevo `dash-blue-glow` (`#2f74f5`), el celeste del medio del degradé.
- *Components / Help / Confibot* pasa a la estructura de Buttons: Playground (vista de arranque y *overPageFab*), Parts,
  States (reposo, hover, recogido, sobre el FAB de Scheduling, oculto, chat vacío, con respuesta y sin resultados) y
  Specs. *Navigation → Parts* aclara que el ítem del menú abre la misma hoja. Ver `figma/modulos/help.md`.

## Notifications sin Pending ni Archived; banner de punta a punta (2026-10-13)

- *Pages / Parts / Notifications*: sin los estados ni variantes de *Pending* y *Archived*; *Row actions* muestra el
  ojo (*Mark as read* / *Mark as unread*); *Empty states* con *Inbox* y *Unread* (con y sin fechas); colores y reglas al
  día. *Elements / Date filter → Specs* muestra las dos pestañas que quedan.
- *Components / Layout / NotificationBanner*: de punta a punta del contenido, con la X sola a la derecha; las stories
  usan las tareas que el banner muestra de verdad (`delBanner`), así el paginador dice "1 of 4" y no "1 of 16".
  Decisiones en `figma/modulos/notifications.md` y `header-sidebar.md` (2026-10-13).

## Billing: bento y botones del paciente dentro del panel (2026-10-13)

- *Pages › Parts › Billing*: Parts suma *Bento* y *Patient actions*; States cambia *Header* por **Patient actions**
  (con paciente y angosto) y suma **Numbers › In a row** (los cinco números a 880px, alineados); Specs › Shared rules
  suma el bento (columna derecha del alto de la izquierda, 15 filas por página, mínimo 780px) y la fila de números.
- `Stat` suma `enFila`: en una fila de cards usa `grid-rows-subgrid` y tres filas, así etiqueta, número y bajada quedan
  alineados entre cards aunque una etiqueta use dos líneas. La etiqueta y la bajada ya no se cortan con "…".
- `AccionesPaciente` reemplaza a `EncabezadoBilling`: los botones del paciente con `ui/button` md, en el `top` del Panel
  de la actividad. *Components / Dashboard / Panel and StatusPill* actualiza la descripción de `top`.
- Decisiones en `figma/modulos/billing.md` (2026-10-13).

## Icono 3D en el saludo (2026-10-18)

- El calendario del saludo (`Saludo`, arriba a la izquierda) es el emoji 📅, 3D como la manito 👋; el texto baja de 19 a 16px.
  El campo de fecha y *Today* del Dashboard siguen con el icono lineal. *Components / Layout / Saludo → Parts* lo muestra.
  Ver `figma/modulos/dashboard.md`.

## New Appointment: visita linkeada y pregunta de mover (2026-10-17)

- *Components / Scheduling / TreatmentPlanPicker* pasa a la estructura de *Elements / Buttons* (Playground con controles
  para *seleccionada*, *vinculada* y el estado del turno; Parts; States; Specs) y suma dos piezas: `TurnoVinculadoInfo`
  (el bloque *Linked appointment* dentro de la fila, con `Pill` e `InfoTip`) y `MoverVisitaDialog` (la pregunta).
  `VisitRow` toma `visita.vinculada` y la muestra aunque la fila no esté elegida.
- *Components / Scheduling / NewAppointmentModal* también: Playground, Parts (los dos pasos), States (default, edit,
  validación, visita linkeada, pregunta, movida) y Specs; las stories `Linked Visit` y `Move Visit Question` llegan hasta
  ahí con un `play`.
- *Elements / ConfirmDialog*: **al cerrarse devuelve el foco al botón que la abrió** (antes quedaba en `body`) y suma
  la pregunta de mover a *Where*. Aplica a todas las confirmaciones.
- Decisión y alternativas en `figma/modulos/scheduling.md` (2026-10-17). e2e: `tests/scheduling-linked-visit.e2e.ts`.

## Patient Overview en dos columnas (2026-10-17)
- Página nueva *Pages / Parts / Patient Overview* (Playground, Parts, States, Specs). `PatientDetail` acepta `turnos`
  (sólo para el Storybook) y exporta `TOPE`. `PendingDocuments` tiene la historia *Narrow column*.
- Regla: una fila con nombre + vencimiento + botón le reserva 14rem al nombre y deja que el resto baje a otro renglón.
  Decisiones en `figma/modulos/patient-dashboard.md`.


## Navigation: Billing sin menú (2026-10-13)

- *Elements / Navigation*: Billing es un ítem más del rail (link directo, tooltip colapsado); Fee Schedules, Carriers y
  Coverage Table están sólo en el menú de Settings. *States* cambia *Billing menu* por *Billing* y suma *Settings menu ·
  Billing tables* (Settings en azul y Billing desplegado en `/settings/finance/carriers`). Sin `BillingItem` ni
  `billingMenu`. Ver `figma/modulos/header-sidebar.md`.

## Breadcrumb: dónde va, y el del paciente (2026-10-13)

- **Elements / Breadcrumb** reemplaza a *Components / UI / Breadcrumb* (que eran dos historias sueltas): Playground,
  Parts, States (hover, foco, Overview, rastro largo en angosto, pantalla de primer nivel) y Specs con la tabla *Where
  it goes*. Regla: las pantallas de primer nivel (menú lateral o de la cuenta) no llevan rastro; las que se abren desde
  otra, sí, armado desde la ruta (layout de Settings o `PatientBreadcrumb`), nunca a mano. El link suma foco azul y el
  último tramo `aria-current="page"`.
- **Components / Patients / PatientBreadcrumb**: `Patients › paciente › sección` en las siete pantallas del paciente.
- **Elements / Patient menu → States → Next to the screen**: el menú baja hasta el final de la pantalla (expandido y
  colapsado). *Page header → Headers in the app* reconoce `PatientBreadcrumb`. Ver `figma/modulos/patient-dashboard.md`.

## Breadcrumb con "/" (2026-10-17)

- `Breadcrumb` separa los tramos con "/" (`ink-faint`, `aria-hidden`, 6px de aire) en lugar del chevron. *Elements /
  Breadcrumb → Parts* y *Specs* lo muestran; cambia en todos los rastros (Settings y paciente). Ver
  `figma/modulos/patient-dashboard.md`.

## List group: cada fila en su card (2026-10-13)

- `ListGroup` deja la caja con divisores: cada fila va en su `TARJETA_INTERNA` con 12px entre cards, como las salas y los
  turnos del paciente (Julián: "debe ser estilo card", por continuidad). Las filas de `DashboardRows` pasan a 10px de
  margen interno parejo. *Elements / List group*, *Elements / Show more* y *Components / Dashboard / Dashboard rows*
  muestran las cards. Ver `figma/modulos/dashboard.md`.


## Dashboard reorganizado: tira de salas, Button success y saludo (2026-10-13)

- **Button `success`** (*Elements / Buttons*): verde `dash-ok-fg`, hover `green-deep`, foco del mismo verde. Para lo que
  arranca o llega (Check In del turno). En los turnos, el color dice la acción (`ACCION_TURNO`): Check In `success`,
  Check Out `primary`, Cancel `destructive`.
- **Components / Dashboard / Operatory strip** (nuevo, `OperatoryStrip`): las salas en una fila arriba del Dashboard,
  tantas como entran de 232px; el resto en "Show N more". `OperatoryCard` suma `enPagina` (card de página, sin borde) y
  su página pasa a Playground, Parts, States y Specs.
- **Components / Layout / Greeting** (nuevo, `Saludo`): el saludo del Topbar que se escribe y deja la fecha del día;
  una vez por sesión y sin animación con reducir movimiento.
- *Pages / Parts / Dashboard*: la fila de fecha suma el link a las preguntas frecuentes y pierde la línea de alcance.
- `ShowMore`: sin degradé cuando la lista abierta no scrollea. Las filas de turno pasan a columnas desde 896px.
  Ver `figma/modulos/dashboard.md`.

## OperatoryCard: color por estado y selección (2026-10-17)

- Sobre la página (`enPagina`), la card de sala toma el color de su estado: borde de 1px y fondo con los tokens de su
  pill (`OPERATORY_SURFACES`). Con `onClick` es un botón (`aria-pressed`): `seleccionada` lleva el anillo `dash-ring`
  (2px a 2px) y `atenuada` la baja al 60% hasta el hover o el foco. `OperatoryStrip` suma `elegida` y `onElegir`.
- *Components / Dashboard / OperatoryCard* y *Operatory strip* muestran colores, elegida, apagada, hover y foco.
  Ver `figma/modulos/dashboard.md`.

## Lista de detalle y detalle del procedimiento (2026-10-13)

- *Components / UI / DetailList* (nuevo, `ui/detail-list.tsx`): la lista que se despliega debajo de una fila de tabla
  (`ListaDetalle`, `FilaDetalle`, `Entrada`, `EnlaceRegistro`, `MasItems`, `Vacio`, `NotaDetalle`, `VerRegistroCompleto`).
  Salen de `RecordDetail`. Playground, Parts, States, More open y Specs.
- *Components / Clinical / RecordDetail*: el orden nuevo de las filas y lo del cobro del procedimiento (Clinic location,
  Financial details, Applied transactions: `ContenidoSede`, `ContenidoFinanzas`, `Metrica`, `ContenidoAplicadas`). States
  suma *Charged and partly paid* y *Paid by insurance*; Parts, Contents y Specs, las piezas nuevas. Decisiones en
  `figma/modulos/clinical-mode.md` (2026-10-13).

## El detalle de la Problem List en los exámenes y en Treatment Plan (2026-10-13)

- *Components / Clinical / Dental / FindingActionsMenu*: rehecha con Playground, Parts, States y Specs; suma *View full
  record* (`onVer`), primero junto a Edit. *Components / Clinical / ExamLayout* suma *Finding record open* y Specs →
  *Finding record*.
- *Components / Clinical / TreatmentPlanSection table* (nueva): `TablaProcedimientos` con el detalle de fila
  (`detalle`, `abiertas`, `onAlternar`): chevron, clic en la fila, Collapse all / Expand all, Procedure cortado con
  tooltip. Playground, Parts, States, *Linked finding open* y Specs. Las stories sueltas de la tabla salen de
  *TreatmentPlanSection parts*; *TreatmentPlanSection* suma *Row open*.
- *Components / Clinical / RecordDetail*: `registroDePlan`, `registroDeHallazgo` y `useVerRegistro` en Parts; States suma
  *From Treatment Plan* y *Unassigned procedure*; *Full record · exam finding* nueva. Decisiones en
  `figma/modulos/clinical-mode.md` (2026-10-13).

## Pills de una sola forma y el cobro en Ledger y Billing (2026-10-14)

- **Pills:** una por dato, en minúscula inicial como en toda la app; las de Clinical Mode que iban en mayúsculas
  (Problem List, rail y card de Treatment Plan, detalle) se alinean. *Components / Clinical / RecordDetail → Specs →
  Rules* lo dice.
- *Components / Ledger / LedgerRowDetail* rehecha con Playground, Parts, States, *Related record* y Specs: el detalle de
  la fila según el tipo (Procedure, Charge Adjustment, Patient Payment, Credit Adjustment; Insurance Payment con los
  datos de siempre), con los datos del prototipo de Julián (`FilasTransaccion`, `TratamientoDelCargo`, `MetodosDePago`,
  `Motivo`, `Metrica`, `DetalleMovimiento`). *Pages / Parts / Billing* suma *Row detail* en Parts y dos filas abiertas en
  States.
- *Components / Clinical / RecordDetail*: sin lo del cobro (sale `ContenidoSede`, `ContenidoFinanzas`,
  `ContenidoAplicadas`, `Metrica` y `cargoDe`). Decisiones en `figma/modulos/ledger.md`, `billing.md` y
  `clinical-mode.md` (2026-10-14).

## Scheduling: View rediseñado (2026-10-17)

- *Components / Scheduling / ViewFiltersPanel* con **Playground** (ancho, selección, búsqueda, nombres largos), **In the toolbar**
  (el botón real abierto), **Parts**, **States** (opción: default, hover, foco, elegida, nombre largo; panel: default, todo
  elegido, búsqueda con y sin resultados, provider elegido escondido, poca altura, nombres largos), **Widths** (976, 744 y 351) y
  **Specs** (medidas, tokens y reglas).
- Piezas nuevas: `OpcionFiltro`, `GrupoFiltro` (radiogroup con flechas), `SeccionFiltro` y `ViewMenu`. Se va `Group`. Reusa
  `Radio`, `EmptyState`, `Button`, `Popover` e `ICONO_SUELTO`. Decisiones en `figma/modulos/scheduling.md`.

## Consent required: ConfirmDialog con ícono y tres salidas, y toast con título (2026-10-17)

- **`ConfirmDialog`** suma tres props opcionales: `icon="warning"` (círculo ámbar de 36px a la izquierda del título: la
  acción pedida quedó frenada por algo que falta), `otherAction` (una tercera salida secondary entre Cancel y la
  principal; el diálogo pasa de 420 a 480px y en el celular los tres botones se reparten el ancho) y `loading` (spinner en
  la principal y el resto deshabilitado; la X y Esc no cierran mientras dura). Sin props nuevas se ve igual que antes.
  *Elements / ConfirmDialog* suma las historias *ThreeActions* y *Loading*.
- **Toast con título** (`aviso.ok / error / warn / info` aceptan `string` o `{ titulo, texto }`): el título va en 13px
  Semibold y el texto en 12.5px; la acción baja debajo del texto en vez de ir a la derecha. *Components / UI / Toast*
  suma el control *title* y *with title and action*.
- **`ConsentRequiredDialog`** y **`ResumenConsentimiento`** (*Components / Clinical / ConsentRequiredDialog*): Playground
  (variante, cuántos procedimientos, enviando), Parts (partes, qué hace cada botón, cuándo aparece, dónde se usa),
  States (cada caso en su iframe, más la caja de resumen sola) y Specs (medidas, colores y la lógica).
  Decisiones en `figma/modulos/clinical-mode.md` (2026-10-17).

## La flecha de las filas que se despliegan, igual en todas las tablas (2026-10-18)

- Pedido de Julián: unas tablas tenían flecha para desplegar la fila y otras no. Regla: **toda fila que despliega un
  detalle lleva la flecha al inicio**, en todas las tablas; una fila que navega o abre un drawer no.
- **`RowChevron`** (nuevo, `ui/data-table.tsx`): la flecha de 16px `ink-faint` que gira 90° al abrir. La usan
  `DataTable` (`rowDetail`), `TablaProcedimientos` (Treatment Plan) y ahora también el **Ledger** y **Ledger
  Transactions** (`LedgerAllocationTable`: Patient Payment, Credit Adjustment, Post Payment), que se desplegaban sin
  flecha. El detalle arranca en la primera columna, como en DataTable (`LedgerRowDetail` suma `sangria`).
- *Elements / Tables*: Specs suma *Row chevron* (closed / open) en Parts, la regla y *Row that unfolds* en *Pattern for
  every table*. *Components / Ledger / LedgerAllocationTable* rehecha con Playground, Parts, States, *Row open* y Specs.
  *Audit / Tables in the app* marca **Expandable rows without chevron** si alguna tabla se despliega sin flecha.
  Decisiones en `figma/modulos/ledger.md` (2026-10-18).
