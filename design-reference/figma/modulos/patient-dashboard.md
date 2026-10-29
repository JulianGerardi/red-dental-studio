<!-- Generado partiendo dashboard-findings.md por módulo.
     Índice general: design-reference/figma/README.md -->

# Patient Dashboard — hallazgos del Figma

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)):

- Epics: CON-2107 Patient · CON-1749 Personas · CON-2798 Post demo · CON-3919 Perfil Clínico, Provider in Charge y
  Additional Provider · CON-3193 Contacts
  ([historias](https://confidetally.atlassian.net/issues?jql=parent%20in%20%28CON-2107%2CCON-1749%2CCON-2798%2CCON-3919%2CCON-3193%29%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20AND%20%28labels%20is%20EMPTY%20OR%20labels%20%21%3D%20%22design-system%22%29%20ORDER%20BY%20created%20DESC))
- Historias de abril: CON-2946, CON-2940, CON-2942, CON-2952, CON-2954, CON-2840, CON-2916, CON-2847, CON-2944,
  CON-2945, CON-2953
  ([Jira](https://confidetally.atlassian.net/issues?jql=key%20in%20%28CON-2946%2CCON-2940%2CCON-2942%2CCON-2952%2CCON-2954%2CCON-2840%2CCON-2916%2CCON-2847%2CCON-2944%2CCON-2945%2CCON-2953%29%20ORDER%20BY%20key%20ASC))

## Patient Dashboard (`3646:58836`) y flujo de navegación

Pantalla nueva: panel izquierdo de 218px (avatar, nombre, badge Active, edad,
"Start Encounter" verde, "Clinical Mode", nav de 6 secciones, y los bloques
**General** y **Contact**, cada uno con su lápiz) + área principal con 4
accordions clínicos 2×2, tabla de Insurance, Pending Task a dos columnas y una
columna angosta de Appointments con badges Booked / Cancelled / Fulfilled / No Show.

Reemplaza al `PatientDetail` que se había armado en la pasada de ancho, que venía
del sistema viejo y no del Figma.

### Flujo de navegación conectado

| Disparador | Destino |
|---|---|
| Nombre en la tabla (azul `#0056ef`, linkeado) | `/patients/:id` — dashboard del paciente |
| Kebab de la fila → "Edit" | Modal **Edit Patient** (el form con guardián, `3640:56487`, mismo componente con otro título) |
| Lápiz de **General** | Modal **Edit Patient** full form (`3640:72713`) |
| Lápiz de **Contact** | Modal **Edit Contact** (`3640:74270`) |

El lápiz de Contact resolvió una duda que había quedado abierta: el modal de Edit
Contact no tenía disparador conocido y estaba enganchado provisoriamente al kebab.

Nota: el nombre en la tabla del Figma es gris `#71717a`. Se pasó a azul linkeado
por pedido explícito — es un cambio sobre el diseño, no una réplica.

### Breakpoint, otra vez
El panel de Appointments quedaba debajo de Pending Task porque usaba `xl`
(1280px) y el frame del Figma mide 1200. Mismo error que ya había aparecido en la
grilla del Dashboard: **en este archivo las columnas de 3 y de 2 deben abrir en
`lg` (1024), no en `xl`.**

---

## Correcciones sobre el Patient Dashboard

### Edit Patient es página, no modal
El nodo `3640:72713` se llama literalmente **"Edit Patient (Full Page)"** y así
debe abrirse. Estaba puesto como modal desde el lápiz de General; ahora navega a
`/patients/edit`. El modal del kebab (`3640:56487`, el form con guardián titulado
"Edit Patient") sí sigue siendo modal — son dos cosas distintas.

### Tipografía de las appointment cards
Medido sobre el frame, en el Figma esas cards usan tamaños extremos:

| Elemento | Alto de tinta | ≈ fuente |
|---|---|---|
| Nombre | 5px | ~7px |
| Descripción | 3px | ~5px |
| Nombre en Pending Task (mismo panel) | 11px | ~13px |

O sea que dentro de la misma pantalla conviven ~7px y ~13px. En la réplica se
habían copiado esos valores literales (8/9/10px), rompiendo la escala acordada.
Corregido a la escala unificada: nombre 12, textos y badge 11. La columna pasó de
240 a **280** para que entre sin truncar.

### Los tabs no varían tipografía
Todos los controles de tabs de la app quedan en **12px**: Pending Task, Activity,
Next / Next Appointments, y el toggle Recepcionista / Provider. Verificado:
`tabsFontSizes: ["12px"]` — un solo valor en toda la pantalla.

### Efecto colateral resuelto
Al ensanchar Appointments, Pending Task quedó sin espacio y truncaba
"Elena Marquez". El Figma lo muestra a 2 columnas, pero con textos de ~7px. Con
la escala cómoda dos cards no entran a 1200px, así que va a **1 columna abajo de
1280 y 2 arriba**. Verificado: 0 elementos truncados en toda la pantalla.

---

## Cards clínicas: popup flotante (Figma `3646:59881`)

Las cuatro cards (Allergies, Medication, Medical Conditions, Past Surgery and
Hospitalization) **no expanden inline**: al clickearlas la card se pinta de
`#1d56bc` con texto e icono en blanco y el contador invertido
(`#eff6ff` de fondo, número azul), y cuelga un **popup debajo** alineado a su
borde izquierdo y con su mismo ancho.

Popup: fondo `#fafcff`, borde `#e4e4e7`, filas blancas. La primera fila viene
resaltada con `#eff6ff` y borde `#1d56bc`. Cada fila lleva nombre, badge de
estado (`Prescribed` azul / `Completed` verde), "Since: <fecha>", y acciones de
editar y borrar; debajo, la línea de dosis en 10px gris.

Se posiciona en coordenadas de documento y va por portal, así acompaña el scroll
y no lo recorta el contenedor.

El contenido de **Past Surgery and Hospitalization** es el del frame; el de las
otras tres categorías es mock propio con el mismo vocabulario de badges.

## La sección por defecto es Overview
El dashboard del paciente arrancaba en "Documents" por un valor inicial mal
puesto. Ahora arranca en **Overview**.

## Modales clínicos (`3751:76503`)

La sección se llama "Patient Profile — Documents" pero de las cinco pantallas
que tiene, cuatro son los formularios de alta de los bloques clínicos:

| Nodo | Frame | Alto | Estado |
|---|---|---|---|
| `3648:59976` | New Medical Condition Form | 484 | ✅ hecho |
| `3648:60265` | New Allergy Form | 552 | ✅ hecho |
| `3648:61266` | New Past Surgery Or Hospitalization Form | 416 | ✅ hecho |
| `3648:62265` | New Medication Form | 748 | ✅ hecho |

Los cuatro miden 555 de ancho, con los campos en dos columnas y Cancel/Save
abajo a la derecha. El campo principal siempre es un buscador con lupa. Cambia
sólo la lista de campos, que en el código vive en `CONFIG`
(`src/data/clinicalItems.ts`); el modal es uno solo,
`ClinicalItemModal.tsx`.

Campos por formulario, con el ancho que ocupan:

- **Medical Condition** — Medical Condition\* (fila), Status\* (fila),
  Approx Start Date\* | Approx End Date, Notes (fila).
- **Allergy** — Allergy\* (fila), Status\* | Severity\*, Reaction\* (fila),
  Approx Start Date\* | Approx End Date, Notes (fila).
- **Past Surgery or Hospitalization** — el buscador (fila),
  Approx Start Date\* (fila), Notes (fila).
- **Medication** — Medication\* (fila), Strenght\* | unidad,
  Dosage Form\* | Status\*, Approx Start Date\* | Approx End Date\*,
  el subtítulo **Direction for Use**, Dose\* | unidad, Frequency\* (fila),
  Notes\* (fila).

Las unidades de Strenght y de Dose son selects **sin label propio**: se apoyan
en el label del campo de al lado.

### Anomalías 44 a 49

44. **Dos de los cuatro modales se titulan "New Allergy".** El frame
    `3648:62265` se llama "New Medication Form" y el `3648:61266` "New Past
    Surgery Or Hospitalization Form", pero los dos muestran "New Allergy" como
    título. Se replica tal cual, según la regla de contenido literal.
45. **"Strenght"** en vez de "Strength".
46. **Notes es obligatorio sólo en Medication**, y ahí su placeholder es el de
    un formulario de referrals: "Include patient history, previous treatments,
    and specific questions for the specialist…". Los otros tres dicen
    "Add notes".
47. **Approx End Date es obligatorio sólo en Medication.** En Allergy y en
    Medical Condition el mismo campo va sin asterisco, y en Past Surgery
    directamente no existe.
48. **La fila del listado usa siempre el formato de medicación.** El popup
    (`3646:59881`) muestra "10 - ONCE DAILY" debajo de cada ítem, también
    para alergias y cirugías, donde ese dato no aplica. En el prototipo esa
    línea se arma con los campos que cada categoría sí tiene
    (severidad/reacción, notas, dosis/frecuencia).
49. **El primer ítem del listado aparece pintado de azul**, como si estuviera
    seleccionado. Es el estado hover capturado en el frame: en el prototipo el
    azul es hover y ningún ítem arranca marcado.


## Reason for Visit: el conteo deja de ser pill (2026-08-30)

En el bloque Reason for Visit del popover del dashboard, "8 Procedures" era una
pill azul con borde y "Visit 1" iba en peso normal. Quedaba al reves de lo que
importa: la pill se llevaba la mirada y el nombre de la visita -que es el dato-
pasaba desapercibido.

Una pill marca un estado; ese numero solo cuenta las filas de la tabla que esta
justo abajo. Ahora el conteo va en gris al lado y la negrita queda en
"Visit 1". Mismo criterio que en Treatment plans del New Appointment.

## Foto de perfil editable (2026-09-03)

El avatar de iniciales del panel izquierdo (`PatientSidePanel.tsx`, las seis
pantallas del dashboard) ahora tiene un botón de cámara que abre el selector
de archivos y reemplaza las iniciales por la foto elegida. Mismo componente y
mismo mecanismo que en la ficha de un empleado -ver README.md, "Foto de
perfil editable"-: `EditableAvatar` + `usePhoto`, persistida en `localStorage`
para que sobreviva a que el panel se vuelva a montar en cada tab del
paciente.

## Patient Dashboard: documentos pendientes en lugar de Insurance (2026-10-05)

Julian pidio reemplazar la tabla de Insurance del dashboard por los
documentos pendientes a resolver (Insurance sigue en su seccion). De dos
propuestas eligio **By urgency** (la otra era un checklist para la proxima
visita, con el progreso). `PendingDocuments`, datos en
`src/data/pendingDocuments.ts`:

- Agrupados en Overdue, Due this week y Later.
- Cada fila: icono del documento en el color de lo que le falta, nombre,
  motivo (Pending signature, Expired, Missing, Needs review), detalle,
  vencimiento (en rojo si paso), quien tiene que actuar (Patient, Provider,
  Front desk) y un boton con la accion (Send reminder, Request update,
  Upload, Sign, Review); los vencidos con el boton azul.
- Filtro All / Patient / Office. Resolver un documento lo saca de
  pendientes y avisa con un toast; sin pendientes, estado vacio.

## Pending Task sin blanco y las cards con la misma superficie (2026-10-06)

- Pending Task y Appointments comparten fila; Appointments (7 turnos) es más alta y estiraba la card de Pending Task,
  que quedaba con un bloque blanco abajo. Ahora cada card mide lo que su contenido (`lg:items-start`).
- Los turnos (`PatientAppointmentCard`) usan la misma card que el Dashboard (`InnerCard`): fondo blanco, borde fino y
  sombra suave. Se fue el borde azul a la izquierda.
- **Pending documents** sigue en el Overview, entre los cuatro bloques clínicos y Pending Task.

## Las cards de la página, con sombra y sin borde (2026-10-06)

Julián: las cards generales -las que contienen otras cards- no llevan stroke, llevan la sombra de los paneles del
Dashboard. `TARJETA_PANEL` (lib/estilos: blanca, `shadow-panel`, sin borde) en el menú del paciente, los cuatro bloques
clínicos, Pending documents, Pending Task y Appointments, y en Treatments, Insurance, Relationships y Edit Patient. Las
cards de adentro siguen con `InnerCard` (borde fino y sombra suave). Las tablas (Insurance, Ledger, Documents) son la
tabla del design system y mantienen su borde.

## Contadores de las cards clínicas: globo redondo (2026-10-07)

Julián: el número de Allergies, Medical Conditions, Medication y Past Surgery estaba desalineado del resto de la app.
Era un cuadrado de 20 px con `rounded` (4 px) y en el resto los conteos son redondos (`rounded-full`: "Patients today"
del Dashboard, los contadores de la barra de Clinical Mode). Ahora es `h-5 min-w-5 rounded-full px-1.5`: círculo con un
dígito, píldora si el conteo pasa a dos. Mismos colores (`bg-dash-count-bg`, `text-dash-blue-hover`); activa, el fondo
pasó del hex suelto `#eff6ff` al token `bg-info-bg` (`#f0f5ff`, imperceptible). Verificado: 4 globos de 20×20 con el
centro vertical igual al del título.

El globo es ahora la pieza `Count` (`src/components/ui/count.tsx`, página *Elements / Counts* del Storybook), no un
`<span>` suelto en `PatientDetail`: el design system es la fuente y la pantalla sólo la usa.

## Appointments: la misma card que las solicitudes de Scheduling (2026-10-12)

Julián: "las card de appointment request y las de appointment que están en el patient dashboard deben tener el mismo
diseño; a las de appointments del dashboard patient les falta el stroke que tienen las otras". El stroke es la **barra de
3px a la izquierda**: el 2026-10-06, al pasar a `InnerCard`, se le sacó a los turnos del paciente y la solicitud la
conservó. Desde ese día eran dos cards escritas por separado y cada una fue por su lado (punto o avatar, pill propia o
`Pill`, botones de 11px o `ui/button`).

1. **Una sola card**, `TarjetaTurno` (`components/scheduling/TarjetaTurno.tsx`). `PatientAppointmentCard` y
   `SolicitudCard` sólo traducen sus datos; no se pueden volver a separar sin tocarla.
2. **La barra toma el color de la pill** (`BARRA_TONOS`): Booked azul, Fulfilled verde, No Show ámbar, Cancelled rojo; en
   las solicitudes, ASAP rojo y lista de espera azul. Antes de sacarla era siempre azul, y la de la solicitud ya iba del
   color de su pill: la regla "barra = pill" es la que vale para las dos y la que usan los bloques del calendario.
3. Superficie `InnerCard` (línea de medio pixel y sombra suave) **más** la barra: la regla de las cards de adentro de un
   panel sigue igual, la barra es un acento encima.
4. El nombre baja a un segundo renglón antes de recortarse (en las solicitudes del celular se leía "Sofia …"); el nombre
   completo queda en el `title`. El motivo, la fecha y el lugar siguen de un renglón.
5. Validar con usuarios: si cuatro barras ámbar seguidas (No Show) se leen como alerta de más en la ficha. Si molesta, la
   salida es dejar la barra en gris para los estados cerrados (Fulfilled, No Show, Cancelled) y en color sólo para el
   que todavía pide algo (Booked).

Storybook: *Elements / Appointment cards* (Playground con *Appointment request*, *Patient overview and request: one
card*, *Request card: states*, *Long name* en los estados del Overview, barra por estado en *Specs*) y *Components /
Scheduling / TarjetaTurno*.

## Listas largas con "Show more" (2026-10-12)

Misma regla que el Dashboard (ver `dashboard.md`, mismo día, y *Elements / Show more*): se ven unos pocos y "Show N
more" abre el resto con scroll adentro.

- **Pending Task:** las tareas pasan a `TaskRow`, la fila del Dashboard (mismo contenido que `PendingTaskCard`, menos
  alto), dentro de `ListGroup`; se ven 3.
- **Appointments:** la misma `PatientAppointmentCard`; se ven 3.
- **Pending documents:** se ven los primeros 4 en el orden de los grupos (Overdue, Due this week, Later); cada rótulo
  sigue contando todos los de su grupo.

Con los datos de la demo el Overview pasa de 1.842px a 1.291px de alto.

## Overview en dos columnas: Pending Task y Pending documents, Appointments al costado (2026-10-17)

Julián pasó una referencia: Pending Task y Pending documents **apilados a la izquierda** y Appointments en una columna
de punta a punta a la derecha. Antes Pending documents iba a todo el ancho, arriba de Pending Task + Appointments.

- Desde 1024px: grilla `minmax(0,1fr) · 280px`; la columna izquierda lleva Pending Task y debajo Pending documents, y
  Appointments se estira al alto de las dos (ya no `items-start`). Abajo de 1024px, una columna en ese orden.
- Con más alto disponible, Appointments muestra **7** turnos en la columna (`TOPE.turnosColumna`) y 3 apilado, así
  termina a la par de la izquierda en vez de dejar un bloque blanco. Más allá, "Show N more".
- Pending documents pasa de ~1.100px a ~800px de ancho a 1500: el nombre del documento pide 14rem (`basis-56`) y, si no
  entra, el vencimiento y el botón bajan juntos a un segundo renglón, a la derecha. Antes, a 1024px y en el celular el
  nombre se aplastaba ("Informed / Consent –…") y se superponía con "Overdue 5 days".
- Contenido igual: mismos datos, textos y acciones; sólo cambia el orden.
- Validar con usuarios: si recepción prefiere los documentos arriba de las tareas (hoy mandan las tareas por ir primero).

Storybook: *Pages / Parts / Patient Overview* (Playground con cantidad de turnos, Parts, States, Specs) y *Components /
Patients / PendingDocuments → Narrow column*. E2E: `tests/patient-overview.e2e.ts`.


## Bento sin huecos y breadcrumb del paciente (2026-10-13)

Julián: "organizar mejor el bento, no deben quedar espacios en blanco; el menú interno debe ocupar el largo de la
pantalla. El breadcrumb debe ser Patients › nombre del paciente › …; en las pantallas que abro una vez (Patients,
Billing) no debe tener breadcrumbs".

1. **El menú del paciente baja hasta el final** (`PatientSidePanel`, `lg:self-stretch`): la card se estira al alto del
   contenido de al lado en las seis pantallas del paciente. A 1440 terminaba 160px antes que Pending Task y
   Appointments; ahora las tres columnas cierran en la misma línea. Colapsado (60px) es un riel blanco de punta a punta.
2. **Pending Task y Appointments terminan a la misma altura.** Se deshace el `lg:items-start` del 2026-10-06: aquel
   bloque blanco salía de los 7 turnos sin tope; con "Show more" (3 y 3) la diferencia es de ~30px a 1440 y ~90px a
   1024, adentro de la card, igual que los paneles del Dashboard. La fila además es `lg:flex-1`: si el panel es más
   alto que la columna (todos los documentos resueltos), crece y no deja hueco gris.
3. **Breadcrumb `Patients › John Smith › sección`** (`PatientBreadcrumb`) en lugar del "‹ Patients", en las siete
   pantallas: Overview (termina en el paciente), Treatments, Insurance, Ledger, Documents, Relationships & Billing (Add
   Relationship es un drawer sobre la lista y termina ahí) y Edit Patient, que antes no tenía ninguna salida hacia
   arriba. La sección se llama como en el menú del paciente. Se revierte la decisión de README.md ("sin breadcrumb en
   las pantallas del paciente"): el "‹ Patients" sólo volvía a la lista y desde una sección no había vuelta al Overview.
4. **Regla de la app:** las pantallas de primer nivel (Dashboard, Patients, Scheduling, Billing, Help, Notifications,
   Settings y Profile) no llevan rastro; las que se abren desde otra, sí. Auditadas las 40 rutas: el único error era
   `/settings/account` (Profile), que mostraba un "Settings" suelto sin la pantalla actual; ahora no lleva.
5. `Breadcrumb` suma anillo de foco azul en los links y `aria-current="page"` en el último tramo.

Pendiente (no se tocó): el nombre sale fijo, "John Smith", igual que el panel. Desde la tabla se entra con el id de
cada paciente (`/patients/abril-viola`) y la ficha siempre muestra a John Smith; cuando el panel lea al paciente de la
ruta, el rastro tiene que leer el mismo nombre.

Validar con usuarios: si recepción usa el rastro para volver a la lista o sigue yendo por el menú lateral; y si el
blanco al pie del menú del paciente se lee como espacio vacío o como columna (alternativa: menú `sticky`, que no entra
entero en pantallas de menos de 900px de alto).

Storybook: *Elements / Breadcrumb* (regla de dónde va, en *Specs*), *Components / Patients / PatientBreadcrumb* y
*Elements / Patient menu* › *States* › *Next to the screen*.

## Breadcrumb con "/" (2026-10-17)

Julián: "hacelo con slash / en vez de la flecha". `ui/breadcrumb` separa los tramos con una **"/"** en `ink-faint`
(antes el chevron de 14px), con 6px a cada lado y `aria-hidden` para que el lector de pantalla no la lea. Vale para todos
los rastros de la app, no sólo los del paciente: `Patients / John Smith / Ledger`, `Settings / Locations / Abril`.
Storybook: *Elements / Breadcrumb* (Parts, Specs).

## Un solo avatar de persona (2026-10-18)

El avatar del panel izquierdo (62px, 36 colapsado) deja el círculo y pasa al cuadrado con esquinas redondeadas de
`ui/avatar`; los turnos de la columna Appointments y Pending Task, también. Regla en `../README.md`.

## Pending documents primero y Pending Task con su diseño (2026-10-19)

Julián: "poné primero Pending documents y abajo Pending Task", y que Pending Task tenga el diseño de Pending documents.

- En la columna de la izquierda del Overview, **Pending documents va arriba y Pending Task abajo**; Appointments, a la derecha, arranca ahora a la altura de Pending documents.
- **Pending Task usa el diseño de Pending documents** (`PendingTaskList`): grupos por tipo con rótulo en versalitas y cuenta, filas en una caja con divisores finos, ícono del tipo, pills *Requested* y *Expired date*, vencimiento, documento y *Complete this Task*. Es el mismo del Dashboard. Se ven 3 filas y "Show N more".
- El e2e `patient-overview` se invirtió: ahora comprueba Pending documents arriba de Pending Task.

## Las tres columnas cierran al mismo nivel (2026-10-25)

Julián, al comparar con la app de red: "el patient dashboard te faltó" (el hueco del final de la página, ver `../README.md` → Responsive 2026-10-25).

- Con el padding del final ya a 24px, el menú del paciente (izquierda) y Appointments (derecha) llegaban hasta el borde, pero **Pending Task** (centro) terminaba ~180px antes, con la página en blanco debajo. En red, el menú y la card central cierran al mismo nivel.
- La card de **Pending Task** pasa a `flex-1`: llena el alto que le sobra y las tres columnas terminan a 24px del borde, a 1440 y a 1024px. Sin contenido de más: sólo crece la card, el contenido queda arriba.
- Documents, Treatments y Ledger tenían lo mismo: se resolvió en la sección siguiente.

## Documents, Treatments y Ledger cierran igual; Treatments completo con scroll adentro (2026-10-25)

Julián, con una grabación del Patient Dashboard: "alineá también Documents, Treatments y Ledger", y que las tareas "aparezcan por default como en el video" (después de tocar *Show 3 more*) "y el scroll es dentro de la card".

- **Pending Task** (Patient Dashboard): la card llena el alto que deja el menú y la lista muestra las tareas que entran enteras (`llenarAlto`); *Show N more* abre el resto **con scroll adentro de la lista, sin que la card crezca** (`enCaja`, como Appointments). Sin hueco en blanco debajo, abierto o cerrado. Una primera vuelta las mostraba todas sin botón y otra mostraba 3 fijas con aire debajo; Julián pidió la card llena **y** con *Show more*. Para que el botón exista el mock pasa de 6 a 9 tareas (a 1519×829 se ven 6 y *Show 3 more*; a 1024px, 3 y *Show 6 more*). Pending documents conserva su *Show 2 more*.
- `ShowMore` suma `filas` (selector de la fila, `"li"`): con `llenarAlto` mide el alto de la fila y lo que suman los rótulos y espacios de alrededor, porque `PendingTaskList` agrupa por tipo y el primer hijo ya no es una fila.
- **Treatments** muestra todos los planes (sin *Show 4 more*) en un área que llena el alto hasta el pie del menú, con scroll adentro y un degradé abajo que avisa que hay más. `lg:auto-rows-max`: sin eso la grilla comprimía las filas y cortaba el pie de cada card.
- **Documents** y **Ledger**: la tabla se estira hasta el pie del menú y el pie (*Showing…* + paginación) queda abajo de la card. `DataTable` suma `llenar` (desde `lg`); el Ledger tiene su propia tabla y lleva las mismas clases.
- Verificado con Playwright a 1519×829 (la pantalla de Julián) y 1024px: el borde de abajo del menú y de la card coinciden (24px del borde). Por debajo de `lg` nada cambia, salvo que Pending Task ya no se corta en 3.
- **A validar con usuarios:** si con muchas tareas conviene volver a agrupar o filtrar en vez de una lista larga con scroll adentro.

## Pending documents, igual que Pending Task (2026-10-25)

Julián: "lo mismo hace en pending documents".

- Las dos cards del centro (**Pending documents** y **Pending Task**) son `flex-1`: se reparten por igual el alto que deja el menú (453px cada una a 1440-1920px de ancho) y cada una muestra las filas que entran enteras (`llenarAlto`). *Show N more* abre el resto **con scroll adentro de la lista, sin que la card crezca** (`enCaja`). A 1519×829: Pending documents muestra 4 y *Show 2 more*; Pending Task, 5 y *Show 4 more*.
- Antes, Pending documents mostraba 4 fijas y al abrir la card crecía y empujaba a Pending Task.
- `PendingDocuments` suma la prop `llenar`. `ShowMore` con `filas` mide ahora con la fila **más alta** de las dibujadas (en columnas angostas unas filas envuelven a más renglones que otras) para que ninguna quede cortada.
- **A validar:** a 1024px las filas de documentos envuelven a 3 renglones y entra una sola antes de *Show 5 more*; si molesta, subir el mínimo de la card.

## CON-2643: Pending Task filtra por tipo y carga al scrollear, sin tabs (2026-10-28)

Julián pasó un video de referencia (la app de red) donde Pending Task divide las tareas en tabs -Clinical Notes, Lab
Orders, Prescriptions, Referrals- y un botón "Ver más" al pie de la lista. Pidió el mismo comportamiento pero **sin
copiar esos dos controles**: filtro en vez de tabs ("creo que lo tenemos en formato filtro") y, en vez del botón,
que el resto cargue solo al scrollear.

Esto ya estaba resuelto del lado del Dashboard: **CON-2641** (Pending Tasks de la secretaria) pide exactamente filtro
por tipo de tarea (CA1) y "la lista debe permitir scroll completo" (CA7), y `dashboard.md` (2026-08-28) ya había sacado
los tabs del Figma por redundantes con el embudo. CON-2643 (Pending Tasks del paciente) no pide filtro ni scroll
propio, así que esto es extender a la ficha del paciente el mismo patrón que ya corre en el Dashboard, no inventar uno
nuevo -responde además al "a validar" que había quedado abierto el 2026-10-25 ("si con muchas tareas conviene agrupar o
filtrar").

1. **Filtro, no tabs.** Junto a los tabs *Pending Task / Activity* (que son otra cosa: alternan toda la sección, no
   las tareas) va el mismo `FilterMenu` del Dashboard, por tipo (`TASK_KINDS`: Clinical Note, Lab Orders,
   Prescriptions, Referrals), checkboxes, sin nada tildado se ve todo. Antes de esto el mock de `PatientDetail.tsx`
   tenía las 9 tareas como `'Referrals'`: no había nada que filtrar. Pasan a repartirse entre los cuatro tipos (3/2/2/2,
   mismo total que fijó el *Show N more* del 2026-10-25) para que el filtro tenga sentido en la demo.
2. **Carga al scrollear, sin botón** (`ShowMore`, prop nueva `cargarAlScroll`): sólo tiene sentido junto con `enCaja` +
   `llenarAlto` -el alto ya lo da el flex-1 del panel-. La caja arranca scrolleable con dos tandas de las que miden
   cuántas filas entran (para que asome un poco de la próxima y se note que hay más) y, al acercarse al final, suma
   otra tanda hasta mostrarlas todas. Nada de paginar contra un backend: son las mismas tareas ya cargadas, mostrando
   más de a poco. El degradé de abajo (ya existía) sigue avisando que falta; sin botón no hay "Show less" -no hace
   falta, no crece la card-. ~~Sólo lo lleva Pending Task: Pending documents y el Pending Task del Dashboard siguen
   con el botón, que ahí sigue andando bien.~~ Pending documents se suma el mismo día (ver más abajo); el Pending
   Task del Dashboard sigue con el botón.
3. La región sigue siendo alcanzable con Tab y navegable con flechas/Page Down (son las mismas que ya disparan
   `onScroll`), así que el teclado también carga más. Lo que un lector de pantalla no tiene es un control explícito
   tipo "cargar todo": antes "Show N more" lo anunciaba con `aria-expanded`; ahora depende de que el usuario scrollee
   la región (que sí tiene nombre, "All pending tasks"). **A validar con usuarios y con accesibilidad.**
4. Anomalía ya anotada en Jira, no de hoy: CON-2643 sólo admite Referrals/Lab Orders/Prescriptions como tipos de
   Pending Task del paciente; "Clinical Note" es una cuarta categoría que ya traía `TASK_KINDS` desde el Dashboard
   (CON-2640/2641, que tampoco la listan pero el Figma sí la dibuja). No se tocó: es compartida con el Dashboard y
   cambiarla ahí tiene que ser una decisión aparte.

`tests/patient-overview.e2e.ts`: el test de layout ya no espera dos "Show N more" (uno solo, el de Pending documents) y
un test nuevo prueba que *Filter tasks* acota a 2 tareas en Referrals, *Clear all* vuelve a las 9, y que dentro de la
caja de Pending Task no hay botón.

## Pending documents se suma al scroll de Pending Task (2026-10-28)

Julián, sobre el punto 2 de arriba: el *Show more* de Pending documents "se ve mal porque no podés ver más cards"; pidió
que las dos cards tengan **la misma funcionalidad de scroll**, fluida.

- `PendingDocuments` suma `cargarAlScroll={llenar}` a su `ShowMore` -mismo condicional que ya usaba para `enCaja` /
  `llenarAlto` / `filas="li"`-, así que se activa en el mismo lugar donde hoy se activa `llenar` (`PatientDetail.tsx`,
  junto a Pending Task). Ningún cambio de lógica nuevo: es la pieza que ya se armó para Pending Task, aplicada acá.
- Con los 6 documentos de la demo entran los seis sin necesitar scroll a 1519×829 -ya no hay botón ni degradé-, así
  que para ver la carga por tandas hace falta una pantalla más baja o más documentos; igual que Pending Task, con
  pantallas bajas sigue sumando de a tandas en vez de saltar a todos de una.
- `tests/patient-overview.e2e.ts`: el test de layout pasa a esperar **cero** "Show N more" en toda la pantalla (antes
  esperaba uno, el de Pending documents) y un test nuevo prueba que Pending documents tiene la misma caja scrolleable
  con nombre ("All pending documents") que Pending Task, sin botón.

## Las categorías pasan a tabs; Pending documents cambia las suyas (2026-10-29)

Julián: sacar el Filter de Pending Task y ponerlo en tabs -"también aplicalo al Dashboard, que es un componente que
tenemos ahí también"-, y en Pending documents, en vez de sus tabs de hoy, usar **Overdue / Due this week / Later**.
Ver `dashboard.md` (misma fecha) por el lado que comparten las dos pantallas.

1. **Pending Task** (acá y en el Dashboard): el `FilterMenu` del 2026-10-28 sale; en su lugar, `ui/tabs` con **All**
   y los cuatro tipos (`TASK_KINDS`), cada uno con su cuenta. Selección única -tocar un tipo lo deja solo, **All**
   vuelve a mostrarlos todos-, a diferencia del Filter, que combinaba varios a la vez.
2. **Pending documents**: sus tabs *All / Patient / Office* (quién tiene que actuar) pasan a ser **Overdue / Due this
   week / Later** -las mismas tres categorías que ya agrupaban la lista como texto plano desde el 2026-10-05-, con
   selección única y arrancando en **Overdue**. Quién tiene que actuar (Patient, Provider, Front desk) se sigue
   viendo en cada fila; lo que se pierde es poder filtrar por eso desde arriba.
   - El estado vacío distingue ahora "no hay nada pendiente" de "no hay nada en este grupo" (antes sólo existía el
     primer caso, porque *All* siempre tenía algo si había pendientes).
3. Ninguna de las dos pantallas necesitó tocar la agrupación interna (`PendingTaskList` por tipo, `PendingDocuments`
   por los mismos `GRUPOS` de siempre): con una sola categoría activa a la vez, esa agrupación ya hacía lo mismo que
   iba a hacer el tab -queda un solo grupo visible, el que dice el tab-.

**A validar con usuarios:**
- Pending Task pierde el multi-select del Filter (ver, p. ej., "Lab Orders + Referrals" juntos sin el resto).
- Pending documents pierde el filtro por **quién** actúa (Patient/Office) del header; si hace falta, podría volver
  como un segundo control más chico, o dejar que la fila sea el único lugar donde se ve.

`tests/patient-overview.e2e.ts` y `tests/dashboard.e2e.ts`: los tests de *Filter tasks* pasan a tocar las tabs
(`getByRole('tab', …)`); un test nuevo cubre las tabs de urgencia de Pending documents (arranca en Overdue, cambiar a
Later muestra otros documentos).
