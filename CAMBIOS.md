# Cambios

Lo último arriba. Cada PR suma su entrada: qué cambió y qué tiene que saber el dev. El porqué de cada decisión está en
`design-reference/figma/modulos/<módulo>.md`; lo anterior al 2026-10-06, en `git log` y en esos mismos archivos.

## 2026-10-27

### Pestaña recogida de Confibot y "currently being seen": ícono, un clic para abrir ([#91](https://github.com/JulianGerardi/red-dental-studio/pull/91))
- La pestaña escondida de los dos widgets ya no muestra el nombre siempre: va un ícono, y el nombre aparece recién
  al pasar el mouse. Al traerla de vuelta entra deslizándose desde el borde (no aparece de golpe ni se despliega
  desde un círculo), y ese mismo clic ya abre el chat o el popup -antes hacía falta un segundo clic sobre el botón
  de reposo-.
- **Para el dev:** de paso se corrigió un bug de `useArrastrable` (de la tanda anterior, #90): la posición por
  default se guardaba ya en el primer montaje, así que Confibot dejaba de apilarse arriba del FAB de "Appointment
  requests" en Scheduling (lo tapaba) apenas se visitaba cualquier otra pantalla antes. Ahora sólo persiste si ya
  había una posición guardada o si se arrastra de verdad. Documentado en `help.md` y `patients.md`; Storybook sin
  actualizar (pendiente de que Julián lo pida).

## 2026-10-26

### Confibot y "currently being seen": arrastrables, círculo en reposo, esconder al costado ([#90](https://github.com/JulianGerardi/red-dental-studio/pull/90))
- Los dos widgets flotantes se arrastran con mouse o touch a cualquier parte de la pantalla (se guarda la posición,
  no vuelve sola). En reposo son un círculo completo; abiertos (la card de "currently being seen", la hoja de
  Confibot) siguen con esquinas redondeadas. Confibot muestra sólo el ícono, sin el texto que aparecía al hover.
- Los dos se pueden esconder a una pestaña angosta pegada al costado derecho, a la altura donde se dejaron (antes
  Confibot se escondía pegado abajo; "currently being seen" no tenía esta opción).
- **Para el dev:** `useArrastrable` (nuevo, en `lib/`), compartido entre `ConfibotLanzador` y
  `PatientInSessionPopup`: pointer events, clampeado a la ventana, posición en localStorage. Cada componente maneja
  su propio estado de "recogido" (no comparten código ahí). Documentado en `help.md` y `patients.md`; Storybook sin
  actualizar (pendiente de que Julián lo pida).

### El título de la pestaña dice Confidentally ([#89](https://github.com/JulianGerardi/red-dental-studio/pull/89))
- La pestaña de la app decía `red-clone` (el nombre de la carpeta). Ahora dice `Confidentally`, como el sidebar.
- **Para el dev:** sólo `<title>` en `index.html`. Storybook no cambia: su pestaña sigue con el título que le pone
  Storybook por cada página.

### Favicon de la marca en la app y en Storybook ([#88](https://github.com/JulianGerardi/red-dental-studio/pull/88))
- La pestaña del navegador mostraba el rayo violeta por defecto de Vite. Ahora lleva la marca del sidebar (ícono
  `GalleryVerticalEnd` blanco sobre `#1a4da9`), en la app y en Storybook.
- **Para el dev:** `public/favicon.svg` cambia y se suman `public/favicon-32.png` y `public/apple-touch-icon.png`;
  `index.html` los enlaza. Storybook suma `staticDirs: ['../public']` y los PNG en `manager-head.html`. El título de la
  pestaña no cambia. Storybook sin actualizar (no hay stories nuevos).

## 2026-10-25

### Pending documents: la card llena su parte del alto, con "Show N more" y el scroll adentro de la lista ([#87](https://github.com/JulianGerardi/red-dental-studio/pull/87))
- Igual que Pending Task en el #85: las dos cards del centro del Patient Dashboard se reparten el alto que deja el menú,
  muestran las filas que entran enteras y *Show N more* abre el resto con scroll adentro, sin que la card crezca (antes
  Pending documents crecía y empujaba a Pending Task).
- **Para el dev:** `PendingDocuments` suma `llenar`; `ShowMore` con `filas` mide con la fila más alta de las dibujadas.
  Storybook sin actualizar.

### Tablas: el desplegable ya no lleva View full record ([#86](https://github.com/JulianGerardi/red-dental-studio/pull/86))
- El pie del detalle de una fila sale en Problem List, Procedures, Treatment Plan, Ledger y Billing: el desplegable ya
  tiene toda la información. En el Ledger queda sólo Apply credit. Sigue en el menú de los tres puntos de cada finding.
- **Para el dev:** `DetalleRegistro` y `DetalleMovimiento` / `LedgerRowDetail` pierden la prop `onVerTodo`; se elimina
  `VerRegistroCompleto` (`ui/detail-list`). Se pierde el atajo de un cargo de procedimiento del Ledger a Clinical Mode.

### Pending Task: la card llena el alto, con "Show N more" y el scroll adentro de la lista ([#85](https://github.com/JulianGerardi/red-dental-studio/pull/85))
- En el #84 Pending Task (Patient Dashboard) había pasado a mostrar todas sus tareas sin botón. Ahora la card sigue
  llenando el alto que deja el menú (sin hueco en blanco), muestra las tareas que entran enteras y *Show N more* abre
  el resto con scroll adentro de la lista, sin que la card crezca, como Appointments.
- **Para el dev:** `ShowMore` suma `filas` (selector de la fila, junto a `llenarAlto`, para listas agrupadas);
  `PendingTaskList` suma `llenarAlto`. En `PatientDetail.tsx` el mock de tareas pasa de 6 a 9 para que el botón exista.
  Treatments sigue sin *Show N more*. Storybook sin actualizar.

### Patient: Documents, Treatments y Ledger cierran al pie del menú; Pending Task y Treatments, completos y con scroll adentro ([#84](https://github.com/JulianGerardi/red-dental-studio/pull/84))
- Documents, Treatments y Ledger terminaban antes que el menú del paciente. Ahora la card de contenido llega al mismo
  nivel (Documents y Ledger con el pie de paginación abajo de la card).
- Pending Task (Patient Dashboard) y Treatments muestran todo de entrada, sin *Show N more*; la lista scrollea adentro de
  la card y, en Treatments, con un degradé abajo. Pending documents conserva su *Show 2 more*.
- **Para el dev:** `DataTable` suma la prop `llenar` (estira la tabla y deja el pie abajo, desde `lg`). Pending Task y
  Treatments usan un contenedor `lg:relative` con la lista en `lg:absolute lg:inset-0 overflow-y-auto`, así el alto de la
  fila lo sigue mandando el menú. Treatments ya no usa `ShowMore`. El e2e `patient-overview` pasa a esperar un solo
  *Show N more* y las 6 tareas. Storybook sin actualizar.

### Dashboard: la fila del turno no se rompe al expandir el menú lateral ([#83](https://github.com/JulianGerardi/red-dental-studio/pull/83))
- Con el menú expandido la lista de Appointments mide 381px, 3px por debajo del corte de 384px (`@sm`), y la fila saltaba de 86 a 139px: el provider
  ocupaba el renglón del medio y el botón (Check In / Check Out) quedaba solo en un cuarto renglón. Ahora el botón sube al renglón de Check In y los
  chips, y el provider queda último: 109px expandido; colapsado no cambia.
- **Para el dev:** una clase en `AppointmentRow` (`DashboardRows.tsx`): `order-last … @sm:order-none` en el provider; sólo afecta el layout angosto.

### Patient Dashboard: las tres columnas cierran al mismo nivel ([#82](https://github.com/JulianGerardi/red-dental-studio/pull/82))
- Pending Task (columna del medio) terminaba ~180px antes que el menú del paciente y Appointments, que llegan hasta el
  final de la página. Ahora la card llena el alto que le sobra y las tres columnas cierran juntas, como en la app de red.
- **Para el dev:** `PatientDetail.tsx`, la card de Pending Task suma `flex-1` (sólo crece; en celular no cambia nada).
  Documents, Treatments y Ledger tienen el mismo desnivel y no se tocaron. Storybook sin actualizar.

### La página termina a ras: sin el hueco de ~110px al final del scroll ([#80](https://github.com/JulianGerardi/red-dental-studio/pull/80))
- Comparado con la app de red, al final de cada página quedaban ~137px vacíos (en red, ~16px). Era la reserva de alto
  para el botón de Confibot, que desde que el contenido deja una columna a la derecha ya no hace falta en pantallas
  desde 640px. Ahora la página termina a 24px, igual que el padding de los costados; en celular se conserva la reserva.
- **Para el dev:** `AppShell`, `main`: `pb-24 sm:pb-28` pasa a `pb-24 sm:pb-0`. El botón de Confibot puede quedar sobre
  el padding interno de la última card (no tapa texto ni controles en las pantallas revisadas). Decisión en
  `figma/README.md` → Responsive (2026-10-25). Storybook sin actualizar.

## 2026-10-24

### Clinical Mode: Extraoral e Intraoral con el gráfico del Figma, Edit drawers y buscadores ([#79](https://github.com/JulianGerardi/red-dental-studio/pull/79))
- **Extraoral e Intraoral** muestran el PNG del Figma sin ninguna región marcada (`RegionDiagram`, base común;
  `ExtraOralDiagram`, `IntraOralDiagram` nuevo) con una zona clickeable por región. El SVG propio de #78 se descarta.
  La pestaña Intra Oral deja de ser placeholder (`IntraOralExam`, y `RegionExam` como examen común). Sin región
  elegida, Add Condition carga como "Not Localized".
- **Edit Procedure / Edit Condition / Edit Finding** con el diseño del Figma: `EditFindingDrawer` elige el drawer según
  el finding (procedimiento, condition en un diente, condition sin diente). Edit Finding suma Notes y Treatment Area
  (CON-2770). `DescriptorFields` pasa a control segmentado en toda la app. Pie: Cancel a la izquierda, Save a la derecha.
- **Buscadores**: `ui/search-picker` (`SearchPicker`, nuevo): nada hasta escribir, resultados en cards en un desplegable,
  lo vinculado en una card azul. En New Procedure el buscador es independiente de la lista del catálogo.
- **Para el dev:** `Finding.fee?` (Fee de Edit Procedure, de `precioUcr()` en `data/finanzas.ts`), `INTRAORAL_REGIONS`,
  token `--color-region-active`. `RegionConditionDrawer` recibe regiones como `string[]`. Storybook sin actualizar en
  esta tanda: las historias que eligen de una lista van a tener que escribir en el buscador.
- **Pendiente:** nombres del resto de las zonas del Intraoral, la rueda de superficies del Figma (BC/B/D/M/P/PC/O) vs.
  la nuestra, y los assets limpios de red.dev para reemplazar la reconstrucción de los PNG.

### Clinical Mode: guía visual de descriptores y Extraoral con gráfico de regiones ([#78](https://github.com/JulianGerardi/red-dental-studio/pull/78))
- **Guía visual de descriptores** (`DescriptorFields`, nuevo): doce filas de una sola elección —Quantity, Symmetry,
  Size, Shape, Borders, Colors, Surface, Consistency, Mobility, Pain, Bleeding, Exudate—, tomadas de la app real
  (grabaciones de pantalla en Extraoral e Intraoral). Se eligen al crear una condition (paso *Descriptors* en Add
  Condition) y se corrigen después desde Edit Finding, ya precargadas. Add/Edit Procedure no cambia.
- **Extraoral** deja el placeholder genérico: `ExtraOralDiagram` (gráfico de 4 vistas de cabeza, SVG propio, 7
  regiones clickeables con multi-selección) y `RegionConditionDrawer` (Add Condition por región, no por diente;
  catálogo de condición propio —Atrophy, Blister, Abscess—, con la misma guía de descriptores como paso 2).
- **Para el dev:** `Finding` suma `kind?: 'procedure' | 'condition'` y `descriptors?: Record<string, string>`.
  `ExamLayout` suma `onCondicion?: () => void` (reemplaza el `NewProcedureDrawer` genérico por el drawer propio de un
  examen) y el hook `useFindingsEstado`. `DrawerActions` suma `nextLabel` opcional (default "Next Step", no cambia
  ningún otro drawer).
- **Pendiente, sin inventar:** los límites exactos de cada región del gráfico (sin fuente vectorial real), el
  catálogo completo de condiciones de Extraoral/Intraoral, y si la card de un finding debería mostrar la condition en
  negrita como la app real (afectaría a todos los exámenes). Ver `figma/modulos/clinical-mode.md` (2026-10-22 y
  2026-10-24).

### Docs: Storybook al final de la tanda y la lógica de la app linkeada a Jira ([#76](https://github.com/JulianGerardi/red-dental-studio/pull/76))
- **Storybook al final.** Documentar en Storybook consume mucho crédito: ahora se hace como último paso, cuando Julián lo
  pide, después de que la app esté aprobada y publicada. Antes de eso sólo va la sección con fecha del `.md` del
  módulo. El "subilo" publica la app; el Storybook tiene su propio "subilo" al final. Sin cambios de código: `ds:check`
  sigue corriendo en el deploy con `continue-on-error`.
- **Jira.** La lógica de la app (reglas de negocio, estados, flujos) está en el proyecto `CON`; las historias de abril
  de 2026 son las más detalladas. Las del label `design-system` son de diseño y no se usan. Cada `.md` de módulo trae
  un bloque **Jira** con sus epics e historias, e `design-reference/jira.md` los indexa.
- **Para el dev:** sólo `CLAUDE.md`, `design-reference/jira.md` (nuevo) y el bloque **Jira** en
  `design-reference/figma/modulos/*.md` y en `design-reference/figma/README.md`. El mapeo historia → módulo salió de los
  títulos: si una historia quedó en el módulo equivocado, corregirla en `jira.md` y en el `.md` del módulo.

### Patients y toda la app: achicar el margen de la pestaña "Currently being seen" ([#77](https://github.com/JulianGerardi/red-dental-studio/pull/77))
- El margen que reserva `AppShell` para que la pestaña flotante no tape kebabs ni filas reales (PR #73) pasa de 64px a
  24px: los 64 se sumaban por encima del padding propio de la página en vez de contarlo, y dejaban una franja vacía a
  la derecha mucho más ancha que cualquier otro margen de la app.
- **Para el dev:** `AppShell.tsx`, `sm:pr-16` → `sm:pr-6` en el `<main>`. No se tocó `PatientInSessionPopup`.

## 2026-10-22

### New/Edit Patient según el Figma nuevo, archivar y reactivar relaciones, buscador de persona en desplegable ([#75](https://github.com/JulianGerardi/red-dental-studio/pull/75))
- **New Patient:** tres pasos General → Guardian → Demography; Guardian y Demography son opcionales y siempre están.
  **Edit Patient** (menú de la tabla y lápiz del dashboard del paciente): pestañas con los datos precargados y **Save Changes**
  desde cualquier sección; cambiar de pestaña no guarda; si falla algo en otra sección se marca la pestaña y se lleva al campo.
  New Patient ya no trae *Link a person that already exists* ni *Select Person* (el Figma nuevo no los dibuja). Las anomalías del
  Figma y cómo se resolvieron están en `modulos/patients.md`.
- **Relationships (CON-3958):** *Delete relationship* pasa a **Archive relationship** (no borra: queda en Archived); reactivar desde
  un drawer de revisión; Add Relationship avisa si ya hay una archivada (*Open reactivation*); Edit Relationship pide confirmar
  *Remove Guardian access*; filtro **Active / Archived** en la pantalla.
- **Buscador de persona:** las sugerencias flotan en un desplegable pegado al input y la elegida lleva una ✕ para quitarla.
- **Para el dev:** `NuevoPaciente` → `DatosPaciente` (store) y `usePatients().datosDe(id)`; `components/patients/PacienteCampos.tsx`
  (secciones + `useFormPaciente`), `pages/patients/EditPatientModal.tsx` nuevo, `NewPatientModal` pierde `title`/`forceGuardian`/`editId`;
  `components/patients/RelationshipDialogs.tsx`; `MenuAcciones` usa `onArchive`/`onReactivate` en vez de `onDelete`. Nuevos:
  `ui/section-notice`, `Tabs.alerta`, `Drawer.tabs`, `DateField.valorInicial`.

## 2026-10-20

### New Procedure: vincular un finding o un diagnóstico pide un procedimiento ya cargado ([#74](https://github.com/JulianGerardi/red-dental-studio/pull/74))
- El drawer de Add Procedure/Add Condition guardaba todo junto al final (Procedure, Surfaces, Link to finding, Link to
  diagnosis), así que nada quedaba cargado hasta terminar los cuatro pasos, aunque vincular pide un procedimiento que
  ya exista.
- Ahora el paso de Procedure (y Surfaces, si el procedimiento va en superficie) termina en **Save**: guarda el
  procedimiento ahí mismo, sin vínculos. Recién con eso guardado **aparecen** los pasos Link to finding y Link to
  diagnosis, para vincularlo. Existing sin superficie sigue igual (un solo paso, Save).
- **Para el dev:** `NewProcedureDrawer` separa `onSave` (crea el procedimiento y devuelve su id) de `onLink` (guarda
  `linked`/`diagnoses` sobre ese id, sin crear uno nuevo). Quien lo use tiene que devolver el id en `onSave` y pasar
  `onLink`.

### Buscar una persona se ve igual en toda la app, y la sombra del pie del drawer que no se disparaba ([#72](https://github.com/JulianGerardi/red-dental-studio/pull/72))
- **Buscar una persona** (Patient y Provider de New Appointment, Select Person de New Patient, Select Subscriber y
  Dependent Patient de Insurance) ya no es un menú flotante con una línea de texto: las sugerencias y la elegida son
  cards con avatar y hasta dos líneas de datos (DOB, email…), borde azul y un visto al elegir — el diseño de Add
  Relationship → Select person, ahora compartido. De paso corrige dos bugs en Select Subscriber (rótulo "Plan name"
  mal copiado, y la card de la elegida se mostraba siempre aunque no se hubiera elegido a nadie).
- **`ui/drawer`:** la sombra que avisa "seguís con scroll" (agregada el 2026-10-19) nunca se disparaba con ningún
  alto de ventana: el `ResizeObserver` se armaba con la ref del contenido todavía en `null`. Arreglado con ref por
  callback (`useState` en vez de `useRef`).
- **Para el dev:** `patients/form.tsx` suma `PersonSearchField` (junto a `SearchField`, con la prop `lineas`);
  `AddRelationshipDrawer` ahora lo usa en vez de tener su propio bloque de búsqueda. `ui/drawer` cambia
  `scroll`/`contenido` de `useRef` a `useState` + `ref={setScroll}`/`ref={setContenido}`.

### Margen reservado en AppShell para que "Currently being seen" no tape contenido en tablet ([#73](https://github.com/JulianGerardi/red-dental-studio/pull/73))
- Auditoría UX en tablet: la pestaña fija de "quién está en el sillón" (`PatientInSessionPopup`, borde derecho,
  centrada verticalmente) quedaba encima de kebabs, badges y filas reales en ocho pantallas (Dashboard, Patients,
  Patient Dashboard, Insurance, Ledger, Settings → Locations, Notifications, Help), porque de 640 a ~1500px el
  contenido llega hasta ese mismo borde.
- **Para el dev:** `AppShell` suma `sm:pr-16` al `main` -mismo mecanismo que ya reserva `pb-24 sm:pb-28` para
  Confibot-, así ningún panel o tabla llega nunca hasta donde flota la pestaña. No se tocó `PatientInSessionPopup`.

### El banner amarillo, borde sólo abajo ([#71](https://github.com/JulianGerardi/red-dental-studio/pull/71))
- `border` (las cuatro caras) pasa a `border-b`: arriba, a la izquierda y a la derecha el aviso ya está pegado al
  header, al rail y al borde de la ventana, así que esas caras no necesitan línea propia.

### El banner amarillo sin esquinas redondeadas, y colapsable ([#69](https://github.com/JulianGerardi/red-dental-studio/pull/69))
- Sin `rounded-lg`: con el aviso ya de punta a punta y sin padding, las esquinas redondeadas no correspondían.
- Nuevo: una flecha para **colapsar el aviso entero** a una tira angosta con el total ("4 pending tasks"), que se
  vuelve a abrir con un clic. Es distinto de la X que ya existía, que sólo oculta la tarea puntual que se esté
  mostrando (sigue sin leer en la campana); la flecha nueva no toca ninguna tarea, sólo el estado visual del aviso.
- **Para el dev:** `NotificationBanner` suma estado local `colapsado` (`useState`, no persiste entre sesiones);
  `ChevronUp` junto a la X cuando está abierto, tira con `ChevronDown` cuando está colapsado.

### Salas: más aire entre el encabezado y la primera card de la línea ([#70](https://github.com/JulianGerardi/red-dental-studio/pull/70))
- Al desplegar una sala, la primera card quedaba pegada a la línea que separa el encabezado de la línea del día; ahora hay 12px.
- **Para el dev:** `LineaDelDia` (`OperatoryCard.tsx`): `pt-1` pasa a `pt-3`.

## 2026-10-19

### Patients y Billing: la barra lateral termina a la altura de la tabla, sin hueco ni disparejo ([#68](https://github.com/JulianGerardi/red-dental-studio/pull/68))
- Recent Patients (Patients) y Find Patient (Billing) ya no adivinan un número fijo de filas: toman el alto medido de
  la columna de la tabla y muestran las que entren completas ahí, sin dejar hueco ni pasarse.
- **Para el dev:** `ui/show-more` suma `llenarAlto` (sólo junto con `enCaja`, sólo en el panel `flex-1` de verdad: mide
  la primera fila + `ResizeObserver` en vez de usar `limit` fijo). `children` tiene que devolver las filas sueltas, no
  envueltas en un único contenedor (`<ul>`). Piso de `min-h-[220px]` para cuando la tabla es muy corta.

### Pending Task con el diseño de Pending documents, Pending documents primero y salas con color ([#67](https://github.com/JulianGerardi/red-dental-studio/pull/67))
- **Pending Task** (Dashboard y Patient Dashboard) toma el diseño de Pending documents: grupos por tipo, filas en una caja
  con divisores y, en cada una, ícono del tipo, pills *Requested* y *Expired date*, vencimiento, documento y *Complete this
  Task*. En el Patient Dashboard, **Pending documents va primero** y Pending Task abajo.
- **Las salas vuelven a tener el color de su estado** (verde, azul, rojo) sobre el acordeón.
- **Para el dev:** `PendingTaskList` nuevo; `TaskRow` (`DashboardRows.tsx`) rehecho y sin `DocYVencida`; `OPERATORY_SURFACES`
  vuelve a `OperatoryCard.tsx`. `PatientDetail.tsx` usa `PendingTaskList` y cambia el orden de los dos bloques.

### El banner amarillo, sin el tope de ancho de la página ([#66](https://github.com/JulianGerardi/red-dental-studio/pull/66))
- Ajuste sobre el PR #62: el banner amarillo medía lo mismo que el `max-w-[1400px]/1800px` de `ANCHO_PAGINA` (el
  mismo tope que el título y las cards), así que en pantallas muy anchas seguía con aire a los costados en vez de ir
  de punta a punta de verdad. Ahora mide el 100% de la columna de contenido (sidebar aparte).
- **Para el dev:** `NotificationBanner` deja de usar `ANCHO_PAGINA`; es un único `<div role="status" className="w-full …">`, sin wrapper.

### Billing y Patients: título pegado al buscador ([#65](https://github.com/JulianGerardi/red-dental-studio/pull/65))
- Find Patient (Billing) y Today Appointments / Recent Patients (Patients): el encabezado del panel baja de 52 a 40px y
  el cuerpo arranca sin padding arriba. Today (Billing) usa la medida de las cards compactas de Patients.
- **Para el dev:** se aplica con `[&>header]:min-h-10` y `pt-0` en esos paneles (`TITULO_PEGADO` en `Billing.tsx`);
  `Panel` no cambia.

### Billing: todo a la vista sin scroll ([#63](https://github.com/JulianGerardi/red-dental-studio/pull/63))
- Find Patient muestra 3 pacientes y "Show N more" abre el resto con scroll adentro; Today pasa a filas compactas y las
  5 cards de arriba llevan menos padding. La tabla de Recent Billing Activity muestra 8 filas por página (antes 15).
- **Para el dev:** `Stat` suma la prop `compacta`; `BuscarPaciente` usa `ui/show-more` con `LIMITE_PACIENTES = 3`; el
  tamaño de página es `PAGINA_ACTIVIDAD = 8`. El e2e de Billing espera `Showing 1 to 8 of 21 entries`.

### Dashboard: anillo de sala, Patients today variable y Waiting Room filtrada sin hueco ([#60](https://github.com/JulianGerardi/red-dental-studio/pull/60))
- El anillo azul de la sala elegida ya no se corta contra el borde del scroll al elegir Operatory 1 (la primera de la
  tira). "Patients today" vuelve a variar por sala (12/10/4) en vez del número fijo e igual en las seis. Elegir una
  sala ya no repite su nombre en cada fila de Waiting Room (el chip del título ya lo dice) y el panel filtrado abraza
  sus filas en vez de dejar un hueco blanco enorme debajo.
- En New Appointment, paso 1: con poco alto de ventana el último campo quedaba cortado contra el pie sin ningún aviso.
  Arreglado en `ui/drawer` (vale para todos los drawers): el pie lleva una sombra elevada mientras el paso siga con
  scroll.
- New Appointment: las sugerencias de Patient y de los dos Provider llevan una segunda línea (fecha de nacimiento y
  email del paciente; email del provider), que antes faltaba.
- **Para el dev:** `OperatoryStrip` suma `scroll-p-1.5`; `dashboard-data.ts#salas()` recibe un array de números en vez
  de uno fijo; `AppointmentRow` suma la prop `ocultarOperatorio`; el wrapper de Waiting Room en `Dashboard.tsx` agrega
  `self-start` con sala elegida; `Drawer` mide con `ResizeObserver` si falta contenido por ver; `SearchField` suma la
  prop opcional `subtext` (sin ella no cambia nada para sus otros usos).

### El banner amarillo sin padding arriba ni a los costados ([#62](https://github.com/JulianGerardi/red-dental-studio/pull/62))
- El aviso de tareas pendientes va pegado al header y a los bordes del contenido de la página (antes tenía
  `px-4 pt-4 sm:px-6`). El ancho y el orden interno no cambiaron.
- **Para el dev:** `NotificationBanner` — el wrapper de `ANCHO_PAGINA` pasa a `px-0 pt-0`.

### Dashboard: salas como acordeón, Waiting Room independiente y fila de tres que entra en la pantalla ([#64](https://github.com/JulianGerardi/red-dental-studio/pull/64))
- **Rooms** pasa a ser la tercera de tres columnas, con el diseño del artifact: tocar una sala despliega la línea del
  día de esa sala (hora, paciente, motivo, profesional, Complete / Upcoming) y ya no filtra la Waiting Room. "Patients
  today" es la cantidad de turnos de la sala.
- **Waiting Room independiente**, con su propio Filter por operatorio.
- **Fila de tres que entra en la pantalla desde 1280px:** Appointments, Waiting Room y Rooms toman el alto de la ventana
  y scrollean adentro; abajo de 1280px sigue como antes. **Pending Task va abajo, a todo el ancho**, y su fila muestra
  el estado (Requested) en una pill debajo del tipo.
- **Para el dev:** `OperatoryStrip` se borra; `OperatoryList` + `OperatoryCard` (`turnos`, `abierta`, `onToggle`,
  `onSelect`) y `LineaDelDia`. `Panel` suma `scroll`; hook `useAltoRestante`. `TaskRow` usa `StatusPill` para el estado. `Appointment.motivo` (mock). `AppointmentRow`
  baja TR/CC junto a Check In con `@sm`. El e2e del Dashboard se reescribió (ya no hay Show more a 1440px).
  Además, `tests/scheduling-linked-visit.e2e.ts` busca las sugerencias por el comienzo del nombre: la segunda línea que
  sumó #60 las había roto.

### Dashboard: tocar un turno abre la ficha flotante ([#61](https://github.com/JulianGerardi/red-dental-studio/pull/61))
- La fila del turno (Appointments y Waiting Room) abre la ficha del paciente flotando al lado, como la card; antes sólo
  el nombre. El botón de acción, el kebab y los links no la abren. La ficha es la del Figma `4430:57474`, ya existente.
- **Para el dev:** `AppointmentRow` (`DashboardRows.tsx`) suma `onClick` en `[data-appt-row]` que llama a `onSelect`;
  ignora clics dentro de `button, a, [role=menu], [role=menuitem]`. El botón de acción hace `stopPropagation`.

### Patients: el scroll de Today Appointments y Recent Patients queda adentro de la caja ([#59](https://github.com/JulianGerardi/red-dental-studio/pull/59))
- Al abrir "Show N more", la lista ya no agranda el panel: mide lo mismo que cerrada y scrollea adentro, así la barra no
  se sale de la grilla de la tabla.
- **Para el dev:** `ShowMore` suma `enCaja`; lo pasan los dos paneles de `pages/Patients.tsx`. El resto de las listas
  conserva el crecimiento hasta `min(70vh, 640px)`.

### Clinical mode: ConfirmProcedureDialog y ClinicalNoteDialog pasan a ConfirmDialog ([#58](https://github.com/JulianGerardi/red-dental-studio/pull/58))
- Los dos rearmaban `Dialog` a mano (botones propios, colores sin token) en vez de usar `ui/confirm-dialog`, el patrón
  que ya sigue el resto de la app para una pregunta de sí/no. No es un pop up nuevo, es la corrección de dos piezas que
  no seguían el sistema ya definido.
- **Para el dev:** mismas props y comportamiento externo en los dos componentes. En `ConfirmProcedureDialog`
  (`clinical/dental/`) el checklist de condiciones vinculadas va como children de `ConfirmDialog`. En
  `ClinicalNoteDialog` (`ClinicalTopBar.tsx`), cerrar con Esc o clic afuera ahora también cuenta como "Remind me later".
  *Elements / ConfirmDialog* suma una fila en Specs › Where.

### Detalle del Ledger y Billing más corto, con un solo "View full record" ([#57](https://github.com/JulianGerardi/red-dental-studio/pull/57))
- En el detalle de una fila: los pies **View procedure / View payment / View adjustment** pasan a **View full record**,
  igual que en Procedures y en los findings. Se van **Adjustment reason** (ya es el título), **Payment methods** y las
  frases explicativas de debajo de Financial details y de las aplicaciones.
- **Para el dev:** `LedgerRowDetail` usa `VerRegistroCompleto` (`ui/detail-list`) y pierde `Motivo` y `MetodosDePago`. El
  e2e de Ledger busca ahora *View full record*.

### Billing: sin los saldos del garante ni la columna Balance ([#56](https://github.com/JulianGerardi/red-dental-studio/pull/56))
- Con un paciente elegido se van *Guarantor Unapplied Credits* y *Guarantor Open Balance*, y la tabla pierde la columna
  Balance (también el campo Balance del detalle de la fila y de *View full record*): son de la cuenta en todas las
  locations y la pantalla filtra por una. *Find Patient* sigue mostrando el Balance de cada paciente: queda a decidir.
- **Para el dev:** `ActividadReciente` pierde `creditos` y `saldo`; Billing pasa `saldo: undefined` al detalle y al
  registro completo. `creditosNoAplicados` y `saldoDe` quedan en `data/billing.ts` sin uso en la tabla.

### Patients: Today Appointments con el nombre como link ([#55](https://github.com/JulianGerardi/red-dental-studio/pull/55))
- El nombre de cada fila de *Today Appointments* lleva directo a la ficha del paciente, como ya hacía *Recent
  Patients*. El kebab sigue igual (Edit, Go to appointment).
- **Para el dev:** `AppointmentCardCompacta` (`dashboard/AppointmentCard.tsx`) pasa el nombre a `Link`; el id sale de
  `slug(appt.name)`, ahora exportado de `data/patientsStore.tsx` (el turno no trae el id del paciente). *Recent
  Patients* ya mostraba sólo 10 con scroll interno desde el 13 de octubre, no se tocó.

### Dashboard: la sala vuelve a ser opcional y quedan las salas con scroll horizontal ([#54](https://github.com/JulianGerardi/red-dental-studio/pull/54))
- Se deshace lo de #50 salvo el scroll: sin sala elegida por defecto; tocar una filtra sólo la Waiting Room y tocarla de
  nuevo (o el chip ✕) la suelta. Appointments muestra todas las salas y recupera su Filter. "Patients today" vuelve al 12
  fijo del dato. Se conserva la tira en una fila con scroll horizontal.
- **Para el dev:** `OperatoryStrip` `onElegir(sala | null)` (toca la elegida para soltar); `Dashboard.tsx` recupera `salas`
  y `salaEspera`. Datos: Operatory 6 Available y un turno de Sofia Chen en Operatory 4 se mantienen.

### Overview: el chart de DentAssmt de sólo lectura y Treatment Plan hasta abajo ([#53](https://github.com/JulianGerardi/red-dental-studio/pull/53))
- El chart del Overview de Clinical Mode es el mismo de DentAssmt, sin controles, con lo mismo cargado. La pieza de la
  última condición queda resaltada; la última condición cambia al cargar otra con Add Condition y *Show details* lleva
  al examen donde se cargó. Treatment Plan llega hasta el final de la tabla en desktop. Las caries oclusales salen en rojo.
- **Para el dev:** `OdontogramaOverview` / `OdontogramaLectura` (`clinical/OdontogramaOverview.tsx`),
  `dental/estadoOdontograma.ts` (estado compartido de la librería), `useUltimaCondicion()` en `ExamLayout`, `llena` en
  `TreatmentPlanList`. `Odontogram` ya no se usa en la app (queda en el Builder).

### La flecha de desplegar, en toda fila que se despliega ([#52](https://github.com/JulianGerardi/red-dental-studio/pull/52))
- El Ledger y Ledger Transactions (Patient Payment, Credit Adjustment, Post Payment) se desplegaban sin flecha; Billing,
  Problem List y Treatment Plan la tenían. Ahora todas llevan la misma flecha al inicio y el detalle arranca en la primera
  columna. Una fila que navega o abre un drawer sigue sin flecha.
- **Para el dev:** `RowChevron` nuevo en `ui/data-table.tsx`; lo usan DataTable (`rowDetail`), `TablaProcedimientos`,
  el Ledger y `LedgerAllocationTable`. `LedgerRowDetail` suma `sangria`. *Audit / Tables in the app* marca una tabla
  que se despliegue sin flecha.

### Dashboard: sala siempre elegida, "Patients today" que coincide y salas con scroll horizontal ([#50](https://github.com/JulianGerardi/red-dental-studio/pull/50))
- **La sala elegida filtra Appointments y Waiting Room** (antes sólo la sala de espera) y **siempre hay una**, la primera
  por defecto; tocar otra la cambia. El chip junto al título dice cuál. El filtro por operatorio de Appointments sale
  (lo reemplaza la sala); Pending Task conserva el suyo.
- **"Patients today" es la cantidad de turnos de esa sala** (era un 12 fijo): coincide con las cards que se ven.
- **Las salas van en una fila con scroll horizontal** (232px mínimo, snap) en lugar de "Show N more".
- **Para el dev:** `OperatoryStrip` pierde `ShowMore`; `elegida` es la sala mostrada y `onElegir(nombre)` la cambia (sin
  soltar). `Dashboard.tsx` calcula `patientsToday` de `dia.appointments`; se van `salas` (filtro) y `salaEspera`. Datos:
  Operatory 6 Available y un turno nuevo en Operatory 4. e2e en `tests/dashboard.e2e.ts`.

## 2026-10-18

### Topbar: locación, buscador y perfil más chicos ([#51](https://github.com/JulianGerardi/red-dental-studio/pull/51))
- Locación y buscador pasan de 32 a **28px** de alto (texto de 13 y 12px, íconos de 14px) y el botón del perfil de 40 a 32px
  (avatar de 28). La campana ya medía 28; el botón del menú sigue en 32.
- **Para el dev:** `h-7` en `LocationSelector.tsx` y en `GlobalSearch`; `Avatar size={28}` en `MenuCuenta`.

### Un solo avatar de persona en toda la app ([#49](https://github.com/JulianGerardi/red-dental-studio/pull/49))
- Pacientes, providers, empleados y la cuenta usan el avatar de la card de Appointments: cuadrado con esquinas
  redondeadas, azul con iniciales blancas. Se van los círculos (Patients, Employees, Relationships, panel del paciente)
  y el celeste del equipo. Esquina con el token nuevo `--radius-avatar` (27%, `rounded-avatar`).
- **Para el dev:** `<Avatar initials size photo />` de `ui/avatar` (se va `AvatarFallback`; tamaños 24 a 72 en
  `AVATAR_SIZES`). `PersonCell` pierde `tone`; `EditableAvatar` recibe `size` en vez de `avatarClassName`. No escribir
  avatares a mano. Storybook: *Elements / Avatars*.

### Topbar: el saludo un poco más separado del botón del menú ([#48](https://github.com/JulianGerardi/red-dental-studio/pull/48))
- Entre el botón de expandir el menú y el saludo hay 14px en lugar de 8. Nada más cambia.
- **Para el dev:** `gap-3.5` en el bloque izquierdo de `Topbar.tsx`.

### El icono 3D va sólo en el saludo, y el texto más chico ([#47](https://github.com/JulianGerardi/red-dental-studio/pull/47))
- El calendario del saludo ("Sunday - October 18, 2026") pasa a ser el emoji 📅, 3D como la manito. El campo de fecha y
  *Today* vuelven al icono lineal (lo de #43 se revierte). El saludo baja de 19 a 16px.
- **Para el dev:** se va `emojiFecha` de `ui/date-picker.tsx`; `Saludo.tsx` usa 📅 en vez de `CalendarDays`.


### Icono de calendario 3D en la fecha del Dashboard ([#43](https://github.com/JulianGerardi/red-dental-studio/pull/43))
- El campo de fecha ("Feb 28, 2026") y el botón *Today* usan el emoji 📅 / 🗓️ (3D, como la manito del saludo) en lugar
  del icono lineal. La tira de números, los formularios y el Date filter no cambian.
- **Para el dev:** `emojiFecha` en `ui/date-picker.tsx`; `DatePicker variant="toolbar"` lo usa. Para otro icono 3D, el
  mismo componente con el emoji que corresponda.

### Patients: barra lateral, Recent Patients de vuelta y sin el link "Patients ⌄" ([#44](https://github.com/JulianGerardi/red-dental-studio/pull/44))
- *New Patient* pasa a la fila del título; la barra lateral (*Today Appointments* / *Recent Patients*, de vuelta con
  los últimos 10) arranca a esa misma altura. Las dos listas usan `ui/show-more` (4 turnos, 3 pacientes): nunca queda
  una fila cortada. Se saca el link "Patients ⌄" de arriba, que no abría nada.
- **Para el dev:** `BotonVerTodos` se va de `pages/Patients.tsx`; para una lista larga nueva, `ui/show-more`.

### Dashboard: botón por panel, íconos de Pending Task a la derecha y más gente en la agenda ([#45](https://github.com/JulianGerardi/red-dental-studio/pull/45))
- **Appointments** siempre muestra **Check In** (verde) y **Waiting Room** siempre **Check Out** (azul): la acción la
  decide el panel. **Cancel** sale del Dashboard; si se quiere, va como opción del kebab.
- **Pending Task:** en angosto, el documento y *Expired date* van contra el borde derecho, alineados con el botón azul.
- **Día de la demo con más gente:** 6 en la sala de espera, repartidos entre las salas (el filtro por sala tiene a quién
  mostrar).
- **Para el dev:** `Dashboard.tsx` pasa `accion` según el panel; `dashboard-data` ya no trae `accion`. `AccionTurno`
  sigue aceptando `'Cancel'`. e2e actualizado en `tests/dashboard.e2e.ts`.

### Dashboard: Pending Task como tercera columna ([#40](https://github.com/JulianGerardi/red-dental-studio/pull/40))
- Appointments, Waiting Room y Pending Task se reparten el ancho desde 1280px. Entre 1024 y 1280, Pending Task queda
  abajo, a lo ancho; más angosto, una columna. Sin componentes nuevos: sólo la grilla de `pages/Dashboard.tsx`
  (`xl:grid-cols-3`; el panel lleva `lg:col-span-2 xl:col-span-1`).

## 2026-10-17

### Consent required al completar o empezar un procedimiento sin firma ([#46](https://github.com/JulianGerardi/red-dental-studio/pull/46))
- Nuevo diálogo **Consent required** para CON-3927, CON-3946 y CON-3950 (prototipo de Julián *Consent modals revised*):
  sale al tocar *Complete* en un caso aceptado de Treatment Plan y *Start* en la tabla Procedures del Overview, cuando el
  consentimiento del procedimiento no está firmado. Dos variantes: **No consent sent** (manda el documento y sigue, sin
  segunda confirmación) y **Signature pending** (sigue con la firma pendiente, con *View consent*); las dos ofrecen
  *Sign now* y *Cancel*. Si el caso todavía no se aceptó, no hay diálogo: aviso de error *Procedure cannot be updated*
  con *View case*.
- **Para el dev:** `clinical/ConsentRequiredDialog.tsx` (`ConsentRequiredDialog`, `consentimientoRequerido`,
  `avisarCasoNoListo`, `CASO_LISTO`); textos en `CONSENTIMIENTO_REQUERIDO` (`data/treatment-plan.ts`). `ui/confirm-dialog`
  suma `icon="warning"`, `otherAction` y `loading`. `aviso.ok/error/warn/info` aceptan `{ titulo, texto }` además de un
  string. Decisiones en `figma/modulos/clinical-mode.md`. No se pudieron leer los tickets de Jira en esta sesión (el
  conector de Atlassian no estaba conectado): conviene cotejar contra sus criterios de aceptación.

### New Appointment: visita linkeada a otro turno ([#41](https://github.com/JulianGerardi/red-dental-studio/pull/41))
- Si la visita del plan que se elige ya está linkeada a otro turno, su fila lo muestra (fecha, hora, estado e info) y
  Save pregunta *Move treatment visit?*: *Move visit* la mueve al turno nuevo; *Cancel* vuelve al drawer sin cambios.
  Es una pregunta, no un tercer paso: así el indicador siempre dice dos.
- **Para el dev:** `Visita.vinculada`, `TurnoVinculadoInfo` y `MoverVisitaDialog` en `TreatmentPlanPicker.tsx`.
  `ConfirmDialog` ahora devuelve el foco al botón que lo abrió (aplica a todas). Storybook: *Components / Scheduling /
  TreatmentPlanPicker* y *NewAppointmentModal*. e2e nuevo: `tests/scheduling-linked-visit.e2e.ts`.

### Scheduling: View rediseñado ([#39](https://github.com/JulianGerardi/red-dental-studio/pull/39))
- El filtro **View** tiene el diseño nuevo: Status en una fila, Providers con buscador y de a dos, Rooms al costado con *Current view* y pie con resumen,
  Cancel y Save. Es un popover bajo el botón: Save guarda la vista; Cancel, ✕, Escape o clic afuera la descartan. En tablet y celular se reacomoda.
- **Para el dev:** `ViewMenu` (en `ViewFiltersPanel.tsx`) reemplaza al panel absoluto y a `data-view-trigger`; `Scheduling` guarda `vista`
  (`VistaCalendario`) pero la grilla todavía no filtra. Sale `Group`; entran `OpcionFiltro`, `GrupoFiltro` y `SeccionFiltro`. Storybook:
  *Components / Scheduling / ViewFiltersPanel*.

### Patient Overview: Pending Task y Pending documents a la izquierda, Appointments en su columna ([#42](https://github.com/JulianGerardi/red-dental-studio/pull/42))
- El Overview del paciente pasa a dos columnas desde 1024px: a la izquierda Pending Task y debajo Pending documents; a
  la derecha Appointments (280px) del alto de las dos, con 7 turnos a la vista. Abajo de 1024px, una columna. Mismo
  contenido, otro orden.
- En una columna angosta, la fila de Pending documents baja el vencimiento y el botón a un segundo renglón en vez de
  aplastar el nombre.
- **Para el dev:** `PatientDetail.tsx` (grilla `lg:grid-cols-[minmax(0,1fr)_280px]`, `TOPE.turnosColumna` con `useMedia`);
  `PendingDocuments.tsx` (`basis-56` + `ml-auto`). Storybook: *Pages / Parts / Patient Overview* y *PendingDocuments →
  Narrow column*. Nuevo e2e `tests/patient-overview.e2e.ts`.

### Detalle del registro en Clinical Mode y Treatment Plan; detalle por tipo en Ledger y Billing ([#30](https://github.com/JulianGerardi/red-dental-studio/pull/30))
- **Clinical Mode:** el detalle de Procedures y Problem List ordena sus filas por importancia (Treatment, Procedure consent, Findings, Referral, Lab order; en un problema, Procedures, Treatment, Referral, Lab order, Source exam). *View full record* también sale del menú de cada finding de los exámenes y las filas de Treatment Plan se despliegan con el mismo detalle. Las pills van de a una por dato, chicas y con minúscula inicial.
- **Ledger y Billing:** la fila se despliega según su tipo (Procedure, Charge Adjustment, Patient Payment, Credit Adjustment) con Location, Financial details y las transacciones aplicadas; Billing lo muestra con un paciente elegido. Lo del cobro vive sólo ahí, no en Clinical Mode. Insurance Payment sigue con los datos de siempre.
- **Para el dev:** `ui/detail-list` (`ListaDetalle`, `FilaDetalle`…), `LedgerRowDetail` / `DetalleMovimiento` (lo usa Billing), `RecordDetail` con `registroDePlan`, `registroDeHallazgo` y `useVerRegistro`; Clinical Mode acepta `?case=` y `?procedure=`. Datos: `APLICACIONES` en `data/ledger.ts` y `APLICACIONES_BILLING` en `data/billing.ts`. Storybook: *Components / UI / DetailList*, *Ledger / LedgerRowDetail*, *Clinical / RecordDetail*, *Pages / Parts / Billing*.

### Dashboard: filas en cards, salas arriba con color y filtro, colores por acción y saludo animado ([#31](https://github.com/JulianGerardi/red-dental-studio/pull/31))
- **Filas en cards:** las de Appointments, Waiting Room y Pending Task (también el Pending Task del Patient Dashboard)
  van cada una en su card interna, con 12px entre una y otra.
- **Salas en una tira arriba** que llena el ancho (mínimo 232px por card; las que no entran, a "Show N more"), con el
  **color de su estado** (borde y fondo de su pill). **Tocar una sala filtra la Waiting Room**: la elegida lleva el
  anillo azul, las demás se apagan y el filtro va como chip junto al título. Las salas se llaman "Operatory 1…6", como
  en los turnos.
- **Appointments y Waiting Room a la par**, a todo el ancho desde 1024px. **Un color por acción:** Check In verde,
  Check Out azul, Cancel rojo. Link a **preguntas frecuentes** (Help) al lado de Today. Salen la fecha de arriba del
  título y la línea de alcance de la fecha.
- **Topbar:** "Hi! Dentist Sarah" se escribe y deja la fecha del día con un calendario, una vez por sesión.
- **Para el dev:** `Button` suma la variante `success`. `ACCION_TURNO` (`AppointmentCard`) mapea acción → variante y
  `AccionTurno` suma `'Check In'`. Nuevos: `dashboard/OperatoryStrip` (`elegida`, `onElegir`) y `layout/Saludo` (usa
  `sessionStorage` `saludo-visto`). `OperatoryCard` suma `enPagina` con `OPERATORY_SURFACES`, `seleccionada`,
  `atenuada` y `onClick` (botón con `aria-pressed`). `ListGroup` pone cada hijo en un `<li>` con `TARJETA_INTERNA`;
  `ShowMore` no lleva degradé si la lista abierta no scrollea; `AppointmentRow` pasa a columnas desde `@4xl`. Storybook:
  nuevas *Components / Dashboard / Operatory strip* y *Components / Layout / Greeting*. e2e en `tests/dashboard.e2e.ts`.

### Patient Dashboard sin huecos y breadcrumbs del paciente ([#37](https://github.com/JulianGerardi/red-dental-studio/pull/37))
- El menú del paciente baja hasta el final de la pantalla y Pending Task y Appointments terminan a la misma altura: el
  Overview cierra parejo, sin espacios grises.
- Las siete pantallas del paciente llevan **Patients / John Smith / sección** en lugar del "‹ Patients" (el Overview
  termina en el paciente; Edit Patient también lo tiene). Las de primer nivel (Patients, Billing, Dashboard, Settings,
  Profile…) no llevan; Profile mostraba un "Settings" suelto y ya no.
- **Para el dev:** componente nuevo `components/patients/PatientBreadcrumb` (`migasPaciente`), no armar el rastro a
  mano. `PatientSidePanel` va con `lg:self-stretch` (el contenedor ya no necesita `lg:items-start`). `Breadcrumb` suma
  foco visible y `aria-current`. Storybook: *Elements / Breadcrumb* (reemplaza a *Components / UI / Breadcrumb*) y
  *Components / Patients / PatientBreadcrumb*. e2e nuevo: `tests/patient-dashboard.e2e.ts`.
- Todos los breadcrumbs (también los de Settings) separan los tramos con **"/"** en lugar de la flecha.

## 2026-10-13

### Billing en el menú lateral, sin menú: sus tablas, sólo en Settings ([#36](https://github.com/JulianGerardi/red-dental-studio/pull/36))
- El ítem **Billing** del menú lateral va directo a su pantalla, sin menú flotante. **Fee Schedules, Carriers y Coverage
  Table** quedan sólo en Settings → Billing; ahí el ítem marcado es Settings.
- **Para el dev:** se borran `BillingItem` y `billingMenu` (`NavigationPreview`); Billing es un ítem más de `NAV` y
  `SettingsItem` queda activo en todo `/settings/*`. En *Elements / Navigation → States*: *Billing* y *Settings menu ·
  Billing tables*.

### Billing: bento con Find Patient arriba, la tabla hasta abajo y los botones del paciente dentro del panel ([#33](https://github.com/JulianGerardi/red-dental-studio/pull/33))
- Bento: izquierda los números y Recent Billing Activity; derecha Find Patient (a la altura de los números) y Today.
  Las dos columnas terminan juntas: la tabla muestra 15 filas por página y Find Patient scrollea adentro.
- Con un paciente, los botones de pago van arriba del título de su actividad y el bento guarda el alto del resumen.
- **Para el dev:** `Stat enFila` alinea etiqueta, número y bajada entre cards con subgrid. `AccionesPaciente` (con
  `ui/button` md, en el `top` del Panel) reemplaza a `EncabezadoBilling`. La columna derecha va absoluta desde `lg`
  y toma el alto de la izquierda (`--billing-alto` con paciente). Tres pacientes más en `data/billing.ts`.

### Notifications sin Pending ni Archived, el ojo y el banner de punta a punta ([#34](https://github.com/JulianGerardi/red-dental-studio/pull/34))
- Notifications queda con dos estados (sin leer y leída) y dos pestañas (*Inbox* y *Unread*): se van Pending, Archived,
  archivar y el menú ⋮ (sólo tenía acciones de archivar). La acción de la fila es un ojo: *Mark as read* / *Mark as
  unread*. El banner amarillo va de punta a punta del contenido en toda la app, con la X sola a la derecha.
- **Para el dev:** `EstadoNotificacion` es `'unread' | 'read'` y `Notificacion` ya no tiene `archivada`; el store pierde
  `archivar`. `delBanner` = tareas sin leer no ocultas. `NotificationBanner` pasa a `w-full` con la X en `ml-auto`. Las
  tareas pendientes de ejemplo quedan sin leer (Unread 8) y las archivadas se sacan.

### Confibot vuelve a flotar abajo a la derecha ([#35](https://github.com/JulianGerardi/red-dental-studio/pull/35))
- Vuelve el botón flotante de Confibot (el de antes de pasar al menú): se estira a "Confibot" con el mouse o el foco, se
  recoge con la flechita en una pestaña al pie y eso se recuerda entre visitas. En Scheduling se apila arriba de
  Appointment requests; no se dibuja con el chat o un CoachMark abiertos. El ítem del menú lateral se queda.
- **Para el dev:** `ConfibotLanzador` y `useConfibotRecogido()` en `help/Confibot.tsx`, montados por `AppShell`, que
  vuelve a reservar su alto al pie del `main` (`pb-24 sm:pb-28`). Una pantalla con su propio botón flotante abajo a la
  derecha llama a `useFabDePagina()` (`help/HelpProvider.tsx`) y Confibot se apila arriba. Token nuevo
  `dash-blue-glow`. Storybook: *Components / Help / Confibot*.

### Menú lateral en blanco ([#38](https://github.com/JulianGerardi/red-dental-studio/pull/38))
- El fondo del menú lateral pasa de gris (`#fafafa`) a **blanco**, en escritorio y en el panel del celular. El bloque del
  logo sigue azul; hover, ítem activo y menús flotantes no cambian.
- **Para el dev:** el `aside` de `Sidebar.tsx` usa `bg-white` en lugar de `bg-surface-subtle` (el token sigue en uso en
  otros lados). En *Elements / Navigation → Specs → Colors*.

### Edit Carrier: las dos casillas en la misma fila ([#32](https://github.com/JulianGerardi/red-dental-studio/pull/32))
- En Edit Carrier › *Information*, *Do not include Dental Diagnostic Codes* y *Do not bill Insurance* van lado a lado, cada
  una bajo una de las columnas de arriba (en el celular, apiladas). El drawer New Carrier no cambia.
- **Para el dev:** en una página con campos de a dos, las casillas van en el mismo `grid gap-4 sm:grid-cols-2`; en los
  drawers siguen apiladas.

### Listas largas con "Show more" y scroll: Dashboard, Patient Dashboard y Treatments ([#29](https://github.com/JulianGerardi/red-dental-studio/pull/29))
- Con muchas cards o mucha información se ven unos pocos y **"Show N more" abre el resto con scroll adentro**, sin
  estirar la página; "Show less" vuelve. Dashboard: 5 turnos, 5 en espera, 6 salas y 5 tareas. Patient Dashboard: 3
  tareas, 3 turnos y 4 documentos pendientes. Treatments: 4 planes. Con un día real (`?day=busy`) el Dashboard pasa de
  10.614px a 1.381px de alto.
- Turnos, sala de espera y tareas van en **filas** en lugar de las cards grandes, con el mismo contenido (TR, CC, Check
  In, Check Out o Cancel, Edit appointment; Requested, documento, Expired date, fechas, Complete this Task) y la hora en
  la caja gris de la card. Documents Manager toma el encabezado de las tablas por defecto (buscador de 36px con Search) y
  Last Update a la izquierda.
- **Para el dev:** componentes nuevos `ui/show-more` (`ShowMore`, *Elements / Show more*), `ui/list-group`
  (`ListGroup`, filas en caja con el tope) y `dashboard/DashboardRows` (`AppointmentRow`, `TaskRow`); usarlos para toda
  lista larga en vez de apilar cards. La acción del pie de la card de turno es `accionTurno` y la de la tarea
  `completarTarea` (card y fila hacen lo mismo). `SettingsPageHeader` acepta ir sin `bajada`. `DIA_CARGADO` en
  `dashboard-data.ts` (`?day=busy`). Dos reglas nuevas en `CLAUDE.md`: listas largas y "rediseñar no es cambiar el
  contenido".

## 2026-10-12

### Appointments del Patient Dashboard y solicitudes de Scheduling: una sola card ([#27](https://github.com/JulianGerardi/red-dental-studio/pull/27))
- Los turnos del Patient Dashboard recuperan la barra de 3px a la izquierda que tienen las solicitudes de *Appointment
  requests*, y las dos cards pasan a ser la misma: barra y pill del mismo color (Booked azul, Fulfilled verde, No Show
  ámbar, Cancelled rojo; ASAP rojo, lista de espera azul), avatar, nombre de hasta dos renglones y acciones con
  `ui/button` sm. El panel de solicitudes pasa a 280px, el ancho de la columna Appointments del paciente.
- **Para el dev:** componente nuevo `components/scheduling/TarjetaTurno.tsx` (`TarjetaTurno`, `BARRA_TONOS`), base de
  `PatientAppointmentCard` y `SolicitudCard`; no armar otra card de turno a mano. La solicitud deja la pill y los botones
  con hex en `style`. En *Elements / Appointment cards* y *Components / Scheduling / TarjetaTurno*.

### Fecha del Dashboard alineada con el filtro de Notifications ([#28](https://github.com/JulianGerardi/red-dental-studio/pull/28))
- El selector de fecha del Dashboard y el filtro de Notifications comparten campo y calendario. El Dashboard muestra
  "Feb 28, 2026" (antes 28-02-2026), con texto medium, hover gris y anillo de foco; los formularios siguen en dd-mm-aaaa.
  El `DatePicker` usa el popover de Radix (Escape, foco de vuelta al campo, se da vuelta si no entra) y hoy se marca en
  azul y negrita en los dos calendarios.
- **Para el dev:** `MonthCalendar` es el calendario de toda la app (no armar uno a mano); `fechaTriggerClasses` el campo.
  `DatePicker` suma `variant="toolbar"` para la fecha de una pantalla; `field` sigue por defecto en formularios. Los días
  llevan `aria-label` con la fecha completa. Página *Components / UI / DatePicker* con la estructura completa.

### Notifications: filtro de fecha y grupos por mes ([#26](https://github.com/JulianGerardi/red-dental-studio/pull/26))
- Con muchas notificaciones, un campo de fecha junto a las pestañas: un clic filtra un día, el segundo arma un rango;
  atajos (Today, Yesterday, Last 7/30/90 days), punto en los días con notificaciones y la ✕ para sacarlo. Las fechas
  acotan las pestañas, la lista y las acciones en lote; sin resultados, el vacío ofrece *Clear dates*. Lo de más de una
  semana se agrupa por mes, y Today / Yesterday / This week cuentan días de calendario.
- **Para el dev:** componente nuevo `ui/date-filter` (`DateFilter`, `DateFilterPanel`), en *Elements / Date filter*;
  usarlo para filtrar listas por fecha (el `DatePicker` sigue para campos de formulario). `grupoDe` devuelve un string
  (grupos por mes) y hay `fechaDe` / `diasAtras` en `data/notificaciones.ts`; el store suma `HISTORIAL` (datos de
  ejemplo). El `Token` del kit ya lee bien `primary` y `accent`.

## 2026-10-10

### Sombras más suaves (cards y pop ups) y Today Appointments con sombra ([#25](https://github.com/JulianGerardi/red-dental-studio/pull/25))
- Arreglo: en escritorio el panel *Today Appointments* de Patients se veía sin sombra. La barra lateral que lo envuelve
  tenía `overflow-hidden` y le recortaba la sombra; ahora se ve igual que los paneles del Dashboard. El alto sigue topado
  al de la tabla y la lista de turnos scrollea adentro, como antes.
- Sombras más suaves, en dos alturas. Las cards madre (paneles, cards de las pantallas del paciente, Settings, Clinical
  Mode, Billing y los números del Dashboard) quedan casi planas: sólo una sombra de contacto que marca el canto, en vez
  del halo gris al 25%. Los pop ups que flotan sobre la pantalla (el detalle del paciente de la card de turno, el
  selector de locación, filtros, Appointment requests, Patient in session, los flotantes de Clinical Mode, Confibot y
  CoachMark) llevan una sombra propia, un poco más alta, igual para todos.
- **Para el dev:** `--shadow-panel` cambia de valor, `shadow-stat` se borra (`StatCard` y `StatStrip` usan
  `shadow-panel`) y hay un token nuevo, `shadow-floating`, para los pop ups flotantes. Card madre: `shadow-panel` /
  `TARJETA_PANEL`; pop up flotante: `shadow-floating`; nunca una sombra a mano. Regla nueva en
  *Elements / Cards → Specs* (*Shadow room*): una card no va dentro de un contenedor con `overflow-hidden`; para topar el
  alto, el scroll va adentro de la card.

### Drawers: campos de a dos y del mismo ancho, Post payment y New Carrier ([#24](https://github.com/JulianGerardi/red-dental-studio/pull/24))
- Regla de Julián para toda la app: en los drawers los campos van de a dos y del mismo ancho. Post payment ordenado
  (fecha y monto, tipo y a quién se aplica) y más ancho, para que Ledger Transactions entre entera; la tabla sin ícono.
  New Carrier con las dos casillas una debajo de la otra. La regla se aplicó en unos 20 drawers y en los formularios del
  Ledger (cuatro columnas iguales, títulos sin ícono).
- **Para el dev:** `grid gap-4 sm:grid-cols-2` y cada campo llena su celda; nada de anchos fijos, `flex-wrap` ni tres por
  fila. Sólo Notes y la búsqueda de paciente o persona van a lo ancho. Casillas apiladas, `FieldLabel` y `control()`.
  `ui/drawer` suma `2xl` (1000px). Nuevo `npm run ds:campos` (con Storybook andando) mide los campos de todos los
  drawers. `data/clinicalItems.ts` pierde `ancho: 'full'`. Regla en *Components / UI / Drawer → Specs → Fields*.

## 2026-10-09

### Chips con la ✕ a la derecha en todo el sistema ([#23](https://github.com/JulianGerardi/red-dental-studio/pull/23))
- *Selected area* de New Procedure y de New Condition (Radiography) y las franjas de Working Hours de Locations pasan al
  `Chip` del design system: celeste, texto azul y la ✕ a la derecha (antes a la izquierda, con tamaños y azules
  distintos). El *+N* de Working Hours toma el mismo alto y color.
- **Para el dev:** regla nueva, la ✕ de un chip va siempre a la derecha; usar `ui/chip` y no armar chips a mano. No hay
  cambios de datos ni de comportamiento.

### Selects que se abren dentro de una tabla y Chip del design system ([#22](https://github.com/JulianGerardi/red-dental-studio/pull/22))
- Arreglo: en Fee Schedule By Location, Coordination Of Benefits y Deductible Type de las coverage tables la lista del
  select quedaba escondida (el marco de la tabla recortaba lo que sobresalía). Ahora se abre por encima.
- Chip nuevo para lo elegido que se puede sacar (celeste, texto azul, ✕ a la derecha): lo usan los procedimientos de
  Manage Exceptions (antes gris), los códigos de Consents y los filtros de Treatment.
- **Para el dev:** `TABLA_MARCO` ya no lleva `overflow-hidden` (las esquinas las redondean `TABLA_ENCABEZADO` y la última
  `TABLA_FILA`); no volver a recortar una tabla con selects adentro. Componente nuevo `ui/chip` (`Chip`, con `onRemove` y
  `removeLabel`), en *Elements / Chips*.

### Settings → Billing igual a red.dev: Fee Schedules, Carriers y Coverage Table ([#18](https://github.com/JulianGerardi/red-dental-studio/pull/18))
- Billing se rehízo desde `red.dev` (lógica, pantallas, campos y textos; estilo nuestro): Carriers → Edit Carrier
  (*Information* | *Insurance Plans / Employers*) → la página del plan con siete pestañas; Fee Schedules con versiones,
  Copy form y Bulk Edit; Coverage Table como plantillas con rangos y excepciones (asistente de 4 pasos).
- Correcciones de Julián: Fee Schedules es una tabla (Name, Type, Assignments, Effective, Last updated, Status, Actions:
  Edit, View assignments, Compare fees); *Non-zero fees — n / 26* en el editor; Bulk Edit sobre las filas tildadas;
  *Information* primero en todas las pestañas. Sin portada: `/settings/finance` redirige a Fee Schedules.
- **Para el dev:** datos nuevos en `data/finanzas.ts` (Arancel con `versiones`, `tipo`, `actualizado`, `asignados`;
  PlanSeguro con las siete secciones; TablaCobertura con `excepciones`) y store `data/finanzasStore.tsx`. Rutas
  `…/:id/edit` como red.dev (`/:id` redirige). Componentes en `components/finance/` (fields, RangesTable, MasterList,
  PlanFields, Assignments, CompareFeesDrawer y seis drawers); salieron CoverageBar, CoverageSummary, EditableAmount,
  PlansTable y los drawers viejos. `TextField` / `SelectField` suman `hideLabel`; `control()` se exporta. Relevamiento
  y anomalías en `design-reference/red-dev/settings-billing/` y `figma/modulos/settings-billing.md`.
- Segunda vuelta: breadcrumbs de Billing como el resto de Settings (sin *Edit*, el último no es link); Manage Exceptions
  ordenado y sin título repetido; Add Range avisa con un toast y lleva a la fila nueva; drawers sin títulos de sección que
  repitan el rótulo; **patrón único de tablas** en toda la app.
- **Para el dev (tablas):** usar `TABLA_MARCO`, `TABLA_ENCABEZADO`, `TABLA_FILA`, `TABLA_TEXTO` y `TABLA_LINK` de
  `lib/estilos.ts` en cualquier tabla; azul sólo para links, nada de `font-medium`/`text-ink` en celdas. `AmountCell` ya no
  es Medium; no usar `TextCell strong` en la app. `RangesTable` suma `nuevo` y `ExceptionsDrawer` suma `tabla`.

### Billing: cards como en Patients y la vista de un paciente ([#21](https://github.com/JulianGerardi/red-dental-studio/pull/21))
- Recent Billing Activity, Find Patient y Today son `Panel` (título sin ícono); los resultados de Find Patient y los
  números adentro de un panel son `InnerCard`.
- Elegir un paciente (fila o Find Patient) abre su vista: su card arriba de Find Patient (con animación), su nombre en
  el título, sólo sus movimientos, Patient View / Guarantor View y los botones de pago, que sin paciente no se ven. La
  X vuelve al resumen.
- Cada número de arriba y de Today tiene su círculo de info con el texto de red.dev. *Patient A/R* pasa a *Guarantor
  A/R* y *Patients with Open Balance* a *Guarantors with Open Charges*, como red.dev.
- **Para el dev:** componente nuevo `ui/info-tip` (`InfoTip`, sobre `HoverCard`); `Stat` acepta `info` y
  `StatBilling` también. `Panel` suma `top` y su encabezado pasa a `min-h-[52px] py-2 flex-wrap` (Dashboard y Patients no
  cambian). `PacienteBilling` suma `garante`; `grupoDeGarante()` y `VISTAS_PACIENTE` en `data/billing.ts`. `Billing.tsx`
  exporta `EncabezadoBilling`, `PacienteElegido`, `ResultadoPaciente`, `BuscarPaciente`, `ActividadReciente` y
  `Stat interna`. Animación `paciente-entra` en `index.css`. E2E nuevo: `tests/billing.e2e.ts`.

### Clinical Mode: View Problem List con lugar para toda la tabla ([#19](https://github.com/JulianGerardi/red-dental-studio/pull/19))
- El flotante de *View Problem List* de los exámenes pasa de 820px a **hasta 1240px**: desde 1024px la tabla entra
  entera (Status y Actions). Con una fila abierta llega hasta el borde de abajo y scrollea adentro; antes se salía de
  la pantalla.
- **Para el dev:** sólo cambia el `PopoverContent` de `clinical/ExamLayout.tsx` (ancho, `max-h` con
  `--radix-popover-content-available-height`, `overflow-y-auto` y `collisionPadding`). Storybook: *ExamLayout* suma
  *Problem list open*, *Problem list · row open* y Specs.

### Dashboard: Today a la altura del selector de fecha ([#20](https://github.com/JulianGerardi/red-dental-studio/pull/20))
- Today pasa a `Button` secondary md (32px, como el `DatePicker`); antes iba a mano en 36px y quedaba desalineado.
- La fila de fecha vive en `FiltroFecha` (exportado de `src/pages/Dashboard.tsx`). *Pages / Parts / Dashboard* pasa a
  Playground, Parts, States y Specs.
- **Para el dev:** un botón al lado de un input de 32px va en `md`, nunca un `<button>` a mano con `h-9`.

## 2026-10-08

### Clinical Mode: Lab Order con la tabla, el buscador, el filtro y los botones de la app ([#17](https://github.com/JulianGerardi/red-dental-studio/pull/17))
- Lab Order deja su tabla propia y usa la de la app (`DataTable`) en la card de la página: buscador, Filter que filtra
  por estado (con cantidad y color), *View History* y *New Prescription* con `ui/button`, el kebab estándar (*View
  order*, *Edit order*, *Cancel order* con Undo) y el pie con *Show* y paginación.
- **Para el dev:** `LabOrderPanel` recibe `ordenes` opcional. En `DataTable`, `filter.options` acepta `FilterOption`
  (cantidad y tono); los strings siguen andando. Ya no hay `FilterTrigger` suelto en Lab Order.

### Link de prueba general y rol de product designer ([#16](https://github.com/JulianGerardi/red-dental-studio/pull/16))
- Cada push a una rama que no sea `main` se publica en https://juliangerardi.github.io/red-dental-studio/prueba/ (app)
  y `/prueba/storybook/`, para ver los cambios antes de "subilo". Muestra sólo la última rama subida;
  `/prueba/version.txt` dice cuál. Publicar `main` ya no borra `/prueba` y escribe `/version.txt` con su commit.
- `CLAUDE.md`: las sesiones actúan como product designer senior, UX/UI y UX researcher.
- **Para el dev:** workflow nuevo `.github/workflows/deploy-preview.yml`; los dos deploys comparten `gh-pages` y el de
  prueba sólo toca `prueba/`.

### Clinical Mode: el detalle de la fila pasa de cards a lista ([#15](https://github.com/JulianGerardi/red-dental-studio/pull/15))
- El detalle desplegable de Problem List / Procedures deja las cards: es una lista de filas (título a la izquierda, datos
  a la derecha, una línea fina entre filas) en el orden Treatment, Lab order, Referral, Findings / diagnoses y Procedure
  consent; el problema sigue el mismo orden con Procedures y Source exam. Cada dato va en una línea.
- **Para el dev:** en `clinical/RecordDetail.tsx`, `FilaDetalle` reemplaza a `BloqueDetalle` y `SubtituloBloque`, y
  `FilasProcedimiento` / `FilasProblema` a `BloquesProcedimiento` / `BloquesProblema`. Sin cambios de datos ni de
  navegación.

### Clinical Mode: detalle desplegable en Problem List y Procedures ([#14](https://github.com/JulianGerardi/red-dental-studio/pull/14))
- Cada fila de la tabla del Overview se despliega como en el Ledger y muestra caso, visitas y turno, órdenes de
  laboratorio, derivaciones, hallazgos y diagnósticos, consentimiento y examen de origen, con links a cada pantalla.
  *View full record* abre un drawer de sólo lectura.
- **Para el dev:** nuevo `clinical/RecordDetail.tsx` (`DetalleRegistro`, `RegistroCompletoDrawer`, contexto
  `NavegacionClinica` que provee ClinicalMode). `DataTable` suma `defaultExpanded` y el detalle de fila queda en la parte
  visible cuando la tabla scrollea. `TONO_PROBLEMA` / `TONO_PROCEDIMIENTO` pasan a `RecordDetail`. Datos de los vínculos
  en `VINCULOS_PROCEDIMIENTO` y `DERIVACIONES_PROBLEMA` (`data/clinical-mode.ts`).

## 2026-10-07

### Consents: pie en angosto y Storybook con Parts y States ([#13](https://github.com/JulianGerardi/red-dental-studio/pull/13))
- Editor de Consents: el pie fijo hace wrap. En angosto (menos de ~370 px) Cancel y Save bajan juntos a una segunda
  línea y Preview queda solo arriba; antes, a 320 px, Preview quedaba cortado fuera de la pantalla.
- Storybook: *Pages › Parts › Consents* pasa a Playground, Parts, States y Specs (ya no hay historias sueltas); Specs
  corrige los paneles a sombra sin borde. **Para el dev:** sin cambios de API: `EditorTemplate` y `DrawerPreview` reciben
  lo mismo que en #6.

### Patients: estados de la card de Today Appointments ([#12](https://github.com/JulianGerardi/red-dental-studio/pull/12))
- Storybook: *Elements / Appointment cards → Patients list card: states* (kebab hover, menú abierto con Edit y Go to
  appointment, nombre largo y los 10 turnos). El Playground de *Patients list* abre el modal de Edit.
- `RowActionsMenu` suma `abierto` y `AppointmentCardCompacta` suma `menuAbierto`. **Para el dev:** son sólo para las
  stories (dejan el menú a la vista); no usarlas en pantallas. Sin cambios en la app.

### Navigation: comentarios de una línea ([#11](https://github.com/JulianGerardi/red-dental-studio/pull/11))
- `src/design-system/Navigation.stories.tsx`: dos comentarios largos pasan a una línea y apuntan a `design-system.md`.
  Sin cambios en la app ni en Storybook.

### Avisos al dev ([#10](https://github.com/JulianGerardi/red-dental-studio/pull/10))
- Nace este archivo. Desde ahora todo cambio entra por PR (incluidos el CLAUDE.md y la documentación), suma su entrada
  acá y pide revisión a jonatan784 y betsyMb.

### Navigation en Storybook ([#9](https://github.com/JulianGerardi/red-dental-studio/pull/9))
- *Elements / Navigation* pasa a Playground, Parts, States y Specs. Sin cambios en la app.

### Count, el globo de cuenta ([#8](https://github.com/JulianGerardi/red-dental-studio/pull/8))
- Nuevo `src/components/ui/count.tsx`: círculo con un dígito, píldora con dos, 20 px de alto; prop `active` para la
  card azul abierta. **Para el dev:** todo contador nuevo va con `Count`, no con un `<span>` a mano.
- Página *Elements / Counts* en Storybook.

### Sidebar de 176 px ([#7](https://github.com/JulianGerardi/red-dental-studio/pull/7))
- El menú expandido pasa de 234 a 176 px en escritorio (58 colapsado; en el celular sigue en 234).
- Settings ya no desborda el rail: se le sacó el `w-full`.

### Consents: preview en drawer ([#6](https://github.com/JulianGerardi/red-dental-studio/pull/6))
- La pantalla queda en dos columnas (Templates y editor). El preview se abre en un drawer (`DrawerPreview`, lg) desde
  el botón Preview del pie fijo del editor.
- e2e nuevo: `tests/consents.e2e.ts`.

### Contadores de las cards clínicas ([#5](https://github.com/JulianGerardi/red-dental-studio/pull/5))
- Patient Dashboard: los contadores de Allergies, Medical Conditions, Medication y Past Surgery pasan a globo redondo
  (desde #8, con `Count`).

### Patients: editar turnos ([#4](https://github.com/JulianGerardi/red-dental-studio/pull/4))
- Today Appointments muestra los 10 turnos y cada card tiene un kebab con Edit (abre `NewAppointmentModal` con los
  datos cargados) y Go to appointment. `AppointmentCard` suma `onEdit`.
- Se saca el panel Recent Patients.

### CLAUDE.md (directo a `main`, antes de esta regla)
- Instrucciones para las sesiones de Claude: carpeta `~/Desktop/Claude/red-clone`, links de localhost antes de
  publicar, todo documentado en Storybook antes de subir, "subilo" publica todo de una y respuestas en castellano.

## 2026-10-06 (directo a `main`)

### Cards
- Card sobre el fondo de la página: `TARJETA_PANEL` (sombra, **sin borde**). Card adentro de otra: `TARJETA_INTERNA` /
  `InnerCard`, con una línea de 0,5 px dibujada con sombra inset (`shadow-inner-card`). Las dos están en
  `src/lib/estilos.ts`. **Para el dev:** no usar `border` en cards; tablas y la grilla del calendario sí lo mantienen.

### Drawers con pasos
- New Location, New Employee, New Account, Manage Licenses y Add Relationship pasan a `ui/drawer`; las rutas `/new`
  abren el drawer sobre la lista.
- Los pasos muestran su nombre (nunca "Step") y entran con animación. Estado del formulario con `lib/useFormPasos`.

### Clinical
- New Procedure: paso nuevo *Link to diagnosis* para Planned (código y superficie). Surfaces depende del procedimiento
  elegido.
- Treatment Plan: en Planning, Pending y Presented no se muestran ni consentimiento ni turno.
- Treatment plans card: queda la opción A.

### Navegación y títulos
- El ícono de Billing del menú abre Fee Schedules, Carriers y Coverage Tables.
- Títulos de Settings, Confibot y Help con `ui/page-title`. El botón Columns usa el mismo estilo que los filtros
  (`filterTriggerClasses`).
