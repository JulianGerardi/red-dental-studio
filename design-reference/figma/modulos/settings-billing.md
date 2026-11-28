# Settings → Billing (Fee Schedules, Carriers, Coverage Table)


## Breadcrumb y título iguales (2026-11-27)

Sin historia de Jira. Regla transversal en `../README.md` (*Regla: breadcrumb y título van de la mano*). Edit carrier pasa a **el nombre del carrier** (*Aetna Dental Plans*) y Edit insurance plan a **el del plan** (*Acme Corp*), como el último tramo. El encabezado del editor de Fee schedules y Coverage tables es el ítem elegido (*UCR - Red* · Active · Default) en vez de *Edit fee schedule* / *Edit coverage table*. Resuelve el *Queda para decidir* de abajo.


## Aviso de la fecha al lado del campo (2026-11-27)

Sin historia de Jira (CON-1375 y CON-1151 no piden estos mensajes: salen del prototipo). Devolución de Julián con captura.

1. **El aviso de *Available from* va al lado de la fecha**, en la columna libre de la derecha y a la altura del campo (antes
   debajo, y el espacio de al lado quedaba vacío). En celular baja debajo del campo. Vale para *Starts today* y *Starts
   on …*. El error de fecha pasada queda debajo del campo, como cualquier error.
2. **En una Scheduled, el aviso de la fecha repetía el de arriba** (*Scheduled. Starts on 01/02/2027* y, debajo, *Starts on
   01/02/2027*). Sin cambios en la fecha ya no se muestra: alcanza con el de arriba. Aparece cuando se **cambia** la fecha,
   que es cuando dice algo nuevo (por ejemplo *Starts today*). En ese caso dice *as soon as you save*, no *publish*: una
   Scheduled se guarda con *Save changes*.
3. **Create new version** sigue adentro del aviso de la versión activa, a la derecha (`action` de `ui/alert`). Se probó
   sacarlo arriba de la tabla, con las acciones, y Julián lo prefirió en el aviso. Suma el `Plus` de los botones que crean
   algo (*New fee schedule*, *Add range*); deshabilitado conserva su tooltip.

## Aviso de la fecha con `ui/alert` y pill gris en el menú Version (2026-11-27)

Sin historia de Jira. Devolución de Julián sobre el editor de Fee schedules, con captura y video.

1. **Lo que pasa con *Available from*** era una caja propia (fondo de color, pill y texto de 12 px) que no existía en el
   design system. Pasa a `ui/alert`, el mismo aviso de arriba del editor: *Starts today* (`success`) o *Starts on
   MM/DD/YYYY* (`info`) de título y el resto del texto debajo. Mismas palabras del prototipo, partidas en título y cuerpo.
   La ayuda (*Used when you publish…*) es un `FieldHint` y los errores, `FieldError`, como en cualquier campo.
2. **Bug: la pill del menú *Version* se ponía gris al pasarle el mouse.** `DropdownMenuItem` con foco le aplica su color
   de texto a todos sus descendientes y pisaba el verde de *Active* (y el azul de *Scheduled*). Se arregla en la raíz:
   `ui/pill` lleva `data-slot="pill"` y `ui/dropdown-menu` la excluye de esa regla. Vale para cualquier pill en un menú.

## Tachos y métricas de Compare fees como el resto de la app (2026-11-27)

Sin historia de Jira. Julián: *"fijate que los trash estén alineados al design system"* y *"que las métricas de Compare
fees estén alineadas a como tenemos en Billing"*.

1. **Tacho de una fila**: sólo ícono, en rojo (`ICONO_SUELTO` + `text-dash-bad-fg`, Trash2 de 16), como los rangos de la
   Coverage table, las excepciones y la Payment table. En *Assignments* había un botón con texto *Remove* (venía del
   prototipo); el nombre queda en el `aria-label` (*Remove BeneCare Dental Plan (Plan: BeneCare Family)*). *Discard draft*
   sigue con texto (es una acción del pie, no de una fila) y pasa a rojo.
2. **Métricas de Compare fees** con `ui/stat-card` (`interna`), la card de métricas de Billing, el Ledger y Edit Account:
   ícono en caja celeste, rótulo, ⓘ con lo que cuenta el número y valor en azul. Mismos cuatro números (*Higher, Lower,
   Same, Missing a fee*); antes eran cajas grises propias. De a cuatro en el drawer y de a dos en celular.

Pendiente fuera de Billing (no se tocó): el tacho de fila sigue en gris en Locations (Working hours, Exceptions), Employees
(Roles & location) y la ficha clínica.

## Versiones de un Fee Schedule: guía funcional y prototipo (2026-11-27) · CON-1151, CON-1369, CON-1375, CON-495, CON-496, CON-497, CON-1276, CON-1108

Julián pasó la *Guía funcional: ¿Cómo funciona un Fee Schedule?* y después un **prototipo en HTML** (*Fee schedules ·
version flow*) con cada botón, pop up y validación. Manda el prototipo; los textos son los suyos (que salen de Jira). Dos
capas: el **fee schedule** (nombre, tipo, estado) y sus **versiones** (las hojas de precios en el tiempo). Se mantiene el
diseño de la app (Billing con pestañas, lista y editor en dos cards): del prototipo se toma el funcionamiento.

### Lista

1. **Filter › Fee schedule status** (una opción): *Active and inactive* (al entrar), *Active*, *Inactive*, *Archived*,
   *All*. Los archivados sólo se ven con el filtro (CON-497). Corrige el "sin filtro se ve todo" del 2026-11-25. El Default
   va primero y el resto por nombre.
2. **⋮**: *Deactivate* o *Activate*, *Archive*; archivado, *Restore*. Con asociaciones, Deactivate y Archive muestran el
   error de CON-496 / CON-1276 en un toast rojo y no hacen nada. Archive confirma (*It will become read-only and stop being
   available in the system.*); Restore confirma (CON-1108) y lo deja **Active**. Toasts de Jira (*Fee Schedule deactivate
   successfully.*, tal cual). Sin Undo.

### Editor

3. **Encabezado**: el nombre del fee schedule con sus pills y, a la derecha, **Version** (`MenuVersion`): fecha y estado
   de cada una, de la más nueva a la más vieja, con el Draft (*No date yet*) arriba. Con una sola, no abre.
4. **Pestañas** *General information* y *Assignments (n)*.
5. **Aviso de arriba** (`ui/alert`, ahora con `action` y tono `neutral`), según lo que se ve:
   - *Active*: *Current version, active since …* y el botón **Create new version**. Si ya hay una Scheduled o un Draft, el
     botón queda deshabilitado con su tooltip y el aviso dice cuál editar.
   - *Creando versión*: *You’re creating a new version.* · *Draft*: *This is a draft.* · *Scheduled*: *Scheduled. Replaces
     the current version on …* · *Expired*: *Expired on …. View only.* · *Archived*: *Archived. View only.*
6. **Active, Expired y Archived son sólo lectura** (CON-495, CON-1369, CON-1276): campos deshabilitados, la tabla en
   texto (*Fee*) y sin pie.
7. **Create new version / Draft**: se editan nombre, tipo, *Available from* y los fees, con *Current fee* (lo que rige hoy)
   al lado de *New fee*. Debajo de la fecha, qué va a pasar: *Starts today. It becomes Active as soon as you publish…* o
   *Starts on …. It stays Scheduled until then…*. Pie: *Cancel · Save draft · Publish…*.
   - **Save draft** no pide fecha (el borrador no la guarda): uno por fee schedule (`Arancel.borrador`).
   - **Publish…** pide la fecha (hoy o después) y abre el resumen (*Name, Available from, Result*) con *Back* y *Publish*.
     Crea la versión: Active si empieza hoy, Scheduled si empieza después. Toast de CON-1151.
   - **Cancel** descarta lo cambiado y queda en la pantalla (*Changes discarded*).
8. **Scheduled** se edita en el lugar, sin versión nueva (CON-1375): *Cancel · Save changes* → *Changes saved.*
9. **Validación**: toast *Please review the highlighted fields.* y cada campo en rojo (*This field is required.*, nombre
   repetido, *The available date must be today or a future date.*). Se va el banner *Uncompleted fields* de esta pantalla.
   Buscar sin resultados: *No results found for the selected filter.* (CON-495; antes el vacío de red.dev).
10. **Assignments** (`finance/AssignmentsTab`): *Locations, Insurance plans, Providers, Patients* con su cantidad, buscador y
    **Remove** por fila (confirma: *… will stop using <fee schedule>.*). Un plan por fila, con su carrier. Sin publicar:
    *Assignments become available once this fee schedule is published.* Reemplaza a *View assignments* del ⋮.
11. **New fee schedule**: *Cancel · Save as draft · Create and publish…*. Save as draft lo deja **Inactive** con su
    borrador y sin versiones; publicar lo deja Active (o con su versión Scheduled). Publicar hoy un fee schedule que sólo era
    borrador lo pasa a Active.
12. Se van el switch *Save in draft state*, el lápiz *Rename* (el nombre se edita al crear una versión) y *Update fees*.
13. Datos: *Delta Dental PPO 2026* suma el aumento publicado para el 01/01/2027 (expirada, activa y programada).

### Fuera del prototipo (a confirmar con Julián)

- **Type** no está en el prototipo; se mantiene (lo pidió el 2026-10-09) y se edita junto con el nombre.
- **Compare fees** tampoco; sigue en el ⋮ (pedido del 2026-10-09), salvo en un fee schedule sin publicar.
- **Discard draft** (pie, a la izquierda, sólo si hay otra versión): la guía dice que el borrador se descarta; sin eso, un
  borrador guardado bloquea *Create new version* hasta publicarlo.
- Cambiar de versión con cambios sin guardar pregunta antes (el prototipo los pierde).
- *Copy form* y *Bulk edit* funcionan (en el prototipo son de muestra).
- Pendientes del propio prototipo: qué tarifa usa un origen después de quitarle la asignación y si el nombre es del fee
  schedule o de cada versión. Draft y Publish no tienen historia en Jira.
- El paso de Scheduled a Active es por fecha (se calcula con el día de hoy). `AssignmentsDrawer` y `AssignmentsCount` quedan
  sin uso en la app.

**A validar con usuarios:** si *Create new version* se entiende como "cambiar precios", y si quitar asignaciones desde acá
alcanza o esperan reasignar a otro fee schedule en el mismo paso.

## Atajos de Billing en un ⋮ y Settings › Overview (2026-11-26)

Julián: *"los accesos rápidos de Billing ponelo en un elipsis, así quedan las cards iguales"*. Los tres atajos de la card
de Billing (abajo, misma fecha) pasan a un ⋮ arriba a la derecha (`RowActionsMenu`, *Fee schedules / Carriers / Coverage
tables*): la card mide y se ve como las demás. El resto de la card sigue llevando a Billing.

También: la portada de Settings se llama **Overview** (título y su ítem del menú; antes *General* en el menú y *Settings*
de título). La ruta sigue siendo `/settings/general` y el primer tramo del breadcrumb sigue diciendo *Settings*, que es la
sección.

## Billing con pestañas y atajos desde Settings (2026-11-26)

Julián: *"dentro de Billing tenemos 3 opciones … para acceder debo ir siempre al menú y eso es tedioso; creemos alguna
idea para que sea de fácil acceso, también desde Settings General"*.

1. **Billing es una pantalla con tres pestañas**, como *Ledger options*: título *Billing*, la acción de la sección a la
   derecha (*New fee schedule / New carrier / New coverage table*) y debajo **Fee schedules · Carriers · Coverage tables**
   (`finance/BillingHeader`). Cada pestaña es su ruta de siempre. Se pasa de una a otra sin abrir el menú.
2. **Las pestañas son links** (`ui/tabs` › `TabLinks`, mismo look que `Tabs`, con `aria-current`): cambian de pantalla,
   no de vista, y así el aviso de cambios sin guardar del Edit Fee Schedule las frena como a cualquier link.
3. **Settings General**: la card de Billing suma tres atajos (*Fee schedules*, *Carriers*, *Coverage tables*) que van
   directo a la sección. La card sigue llevando a Billing (título con el área estirada; los atajos van por encima, porque
   no se puede anidar un link en otro). Sirve para cualquier sección con `children` en `settings-nav.ts`.
4. **Breadcrumb**: corrige lo de abajo (misma fecha). Billing vuelve a ser link porque ahora tiene pantalla: las tres
   pestañas terminan en `Settings / Billing` (coincide con el título) y lo de adentro cuelga de Billing con link a la
   pestaña de donde viene: `Settings / Billing / New fee schedule`, `Settings / Billing / Aetna Dental Plans / Acme Corp`.
   El tramo de la sección se va: llevaba a la misma pestaña que Billing.

**A validar con usuarios:** si se descubren los atajos de la card (o se sigue entrando por el menú), y que *Billing* de
Settings no se confunda con el módulo Billing del menú lateral, que tiene el mismo nombre.

## Breadcrumb de Billing coherente (2026-11-26)

Julián: *"los breadcrumbs funcionan mal, son incoherentes"*. Relevadas las 25 rutas de Settings (breadcrumb, título y
destino de cada link). Lo que no cerraba en Billing:

1. **Billing llevaba a Fee schedules.** `/settings/finance` redirige a Fee schedules, así que desde Carriers o Coverage
   tables el tramo *Billing* abría otra sección, y en Fee schedules apuntaba a la misma pantalla. Billing no tiene pantalla
   propia: pasa a **texto sin link** (`Settings / Billing / Carriers`). No se inventa una página de Billing.
2. **Lista y editor en una pantalla, dos reglas.** Consents termina en la sección (`Settings / Consents`) elija lo que
   elija; Fee schedules y Coverage tables sumaban el ítem elegido (`… / Fee schedules / Aetna 2026`) con el título
   *Fee schedules* debajo, y el tramo *Fee schedules* volvía a la misma pantalla sin nada elegido. Ahora terminan en la
   sección, como Consents: el último tramo coincide con el título y el ítem elegido se ve marcado en la lista.
3. Sin cambios: Carriers sí lleva el nombre (`… / Carriers / Aetna Dental Plans / Acme Corp`), porque el carrier y el plan
   son pantallas aparte; *Aetna Dental Plans* vuelve a la pestaña de planes. *New fee schedule* y *New coverage table*
   cuelgan de su lista.

**Queda para decidir (no se tocó, es texto de la pantalla):** el título no dice lo mismo que el último tramo en Consents
(*Consent templates*), Ledger (*Ledger options*), Preferences (*Account preferences*), Account (*Edit account*) y el carrier
(*Edit carrier* bajo *Aetna Dental Plans*) y el plan (*Edit insurance plan* bajo *Acme Corp*).

## Edit Fee Schedule con el diseño de Coverage tables (2026-11-26)

Sin historia de abril (epic CON-57). Pedido de Julián: *"que fee scheduling tenga el mismo diseño que coverage table"*. Edit
Fee Schedule deja la card única con `MasterList` y pasa al patrón de `components/settings/ListaEditor.tsx` (ver
2026-11-24, Coverage tables y Consents). El contenido es el mismo: campos, versiones, tabla, Copy form, Bulk edit,
*Non-zero fees* y el aviso al salir.

1. **Dos cards**: lista de 340 px (*Fee schedules*, buscador `sm` y *Filter* `sm` al lado) y editor con el resto. Bajan una
   debajo de la otra por debajo de 768 px de contenedor. El título de la página pasa a *Fee schedules*, como *Coverage
   tables*; el editor dice *Edit fee schedule* con la pill del estado guardado (y *Default* si lo es).
2. **Ítem**: la card de `ItemLista` con la pill del estado (*Active / Inactive / Archived*, con los tonos de la tabla:
   `TONO_ARANCEL`) en lugar del punto de color, y *Default* al lado. El ⋮ sigue siendo el de fee schedules (*Inactive /
   Active*, *Archive / Restore*, con Undo): `ItemLista` suma `estado` y `acciones` para no forzar Deactivate / Delete.
   No hay Delete: los fee schedules se archivan.
3. **Editor**: se va el título *General information* (el encabezado del editor ocupa su lugar). *Copy form* y *Bulk edit*
   bajan justo encima de la tabla, a la derecha, como *Manage exceptions* y *Add range*; el buscador de procedimientos y
   *Non-zero fees* quedan a la izquierda en la misma fila.
4. **Pie** de `PieEditor`: línea, fijo abajo, *Cancel · Save* a la derecha (antes Cancel a la izquierda). *Cancel* sigue
   pasando por el aviso de cambios sin guardar.
5. **New fee schedule** usa la misma card del editor, sin encabezado (como *New coverage table*).
6. `MasterList` queda sin uso en la app (sólo en su story).

### Sin la tabla al entrar (Julián, 2026-11-26)

*"Al inicio no va la tabla directamente, va lo creado, porque si no es redundante."* `/settings/finance/fee-schedule` ya
no muestra la `DataTable` (Name, Type, Assignments, Effective, Last updated, Status): abre la lista y el editor vacío
(*No fee schedule selected*), como `/settings/finance/coverage-table`. Una sola pantalla para las dos rutas.

7. **El ⋮ de cada ítem** suma lo que sólo estaba en la tabla: *View assignments* y *Compare fees*, una línea y después
   *Inactive / Active* y *Archive / Restore*. *Edit* no hace falta: tocar el ítem lo abre.
8. **Se pierden de la vista** *Assignments* (el número con el desglose al pasar), *Effective* y *Last updated*. Effective
   se ve en *Fee schedule version*; las asignaciones, en *View assignments*. Si recepción o administración extrañan
   *Last updated* o el número de asignaciones de un vistazo, sumarlos como `extra` del ítem.

**A validar con usuarios:** que con la lista de 340 px el editor tenga ancho suficiente en notebooks de 1024–1280 px
(Description se parte en dos líneas antes que antes), y que la pill *Inactive* en rojo no se lea como error al lado del
gris de Coverage.

## Coverage tables y Consents con el mismo patrón (2026-11-24)

**CON-1488** (Delete Coverage Table Template, sin descripción en Jira). Pedido de Julián con un HTML de referencia y un
PDF (*Estandarización de Coverage tables y Consent templates*): seguir la estructura del HTML tal cual, con el diseño de
la app. La pieza común es `components/settings/ListaEditor.tsx` (`PanelLista`, `ItemLista`, `EncabezadoEditor`,
`PieEditor`, `GRILLA_LISTA_EDITOR`, `TARJETA_EDITOR`); Consents usa la misma (ver `consents.md`, misma fecha).

1. **Dos cards**: lista de 340 px a la izquierda y editor con el resto, 20 px entre las dos. La lista no se estira para
   igualar al editor. Con el contenedor por debajo de 768 px (`@3xl`) bajan una debajo de la otra. Se va la card única
   con lista de 260 px.
2. **Lista**: título *Coverage tables* dentro de la card, buscador `sm` que filtra mientras se escribe y, debajo, las
   pestañas **Percentage / Copayment** (`ui/tabs`, `fullWidth`) en lugar del select de tipo. Buscador y pestaña se
   combinan: sólo se busca en el tipo elegido (antes la tabla abierta quedaba en la lista aunque fuera del otro tipo).
   Cambiar de pestaña abre la primera tabla de ese tipo; entrar por link a una del otro tipo mueve la pestaña.
   Sin coincidencias: *No matching results* (`EmptyState`).
3. **Ítem**: card con borde (azul suave y borde azul la elegida), nombre en 14 px semibold y ⋮ a la derecha; debajo la
   pill **Active / Inactive**. Sin segunda línea de relleno. Reemplaza las filas de `MasterList` (que queda sólo para Fee
   schedules).
4. **⋮**: *Deactivate* (o *Activate*), una línea y *Delete* en rojo. Delete ahora pide confirmación con el nombre
   (*Delete coverage table?*) y mantiene el Undo del toast. Activar/desactivar una coverage table es **propuesta**: no hay
   historia; `TablaCobertura.activo` (sin el campo, activa) todavía no saca la tabla de *Copy from template*.
5. **Editor**: *Edit coverage table* + pill de estado; Name y Type (fijo, *Set when the table is created.*); *Manage
   exceptions* y *Add range* justo encima de la tabla, a la derecha; pie con línea, fijo abajo, *Cancel · Save* a la
   derecha (antes Cancel a la izquierda). El pie es el mismo de Consents (`PieEditor`).
6. **RangesTable**: *Exc* → *Exceptions*; Coverage % / Copayment y Exceptions alineados a la derecha (`TextField numero`).
   Las columnas siguen el ancho de la tabla (`@container`, `@3xl`) y no el de la ventana: con la lista al lado, a 1024 px
   cada rango baja a filas apiladas. **Anomalía respecto del PDF**: pide scroll horizontal cuando la tabla no entra; no se
   hizo porque el contenedor con scroll corta el menú del select *Deductible type* (se abre como `absolute`). El tacho
   por rango se mantiene (el PDF lo pide aunque el HTML lo omitió). Vale también en la Coverage del plan.
7. Borrar la tabla abierta pasa a la primera que queda en la pestaña: la guarda de "tabla inexistente" redirige ahí (un
   `navigate` después de borrar perdía contra ella: React Router navega en una transición).

## 2026-10-13 · Casillas de Edit Carrier en la misma fila

Pedido de Julián sobre una captura de Edit Carrier › *Information*: *Do not include Dental Diagnostic Codes* y *Do not bill
Insurance* van en la misma fila, cada una bajo una de las dos columnas de arriba (`grid gap-4 sm:grid-cols-2`); en el
celular se apilan. Cambia lo decidido el 2026-10-10 (una debajo de la otra) sólo en esta pantalla: en el drawer New
Carrier siguen apiladas, como pide la regla de campos de los drawers.

## 2026-10-10 · Campos parejos en los drawers

Regla de Julián (2026-10-10, sobre una captura de Post payment con campos de anchos distintos): en los drawers los
campos van de a dos y del mismo ancho, y vale para todo. Está en *Components / UI / Drawer → Specs → Fields* y se
controla con `npm run ds:campos`.

1. **New Carrier** y la pestaña *Information* de Edit Carrier: *Do not include Dental Diagnostic Codes* y *Do not bill
   Insurance*, una debajo de la otra (pedido de Julián). En New Carrier, Expected Period of Insurance Claim Resolution
   entra en la grilla, en la columna izquierda.
2. **PhoneFields**: Country Code | Area Code y Number, de a dos (antes tres por fila con +1).
3. **Increase All / Increase Selected**: el monto y *By* ($ o %) del mismo ancho (antes 1fr + 96px).

## 2026-10-09 · Segunda vuelta de correcciones de Julián

16. **Breadcrumbs como el resto de Settings**: `Settings › Billing › Fee Schedules | Carriers | Coverage Table › ítem`
    (› plan, colgado de su carrier). Se va el tramo *Edit* y *Finance* de red.dev: el nombre del ítem linkeaba a la misma
    pantalla y quedaba con el foco marcado al tocarlo. El último tramo nunca es link (`ui/breadcrumb`).
17. **Manage Exceptions**: título *Manage Exceptions* (como el botón) y una bajada que nombra la plantilla; red.dev
    repetía *Manage exceptions for standard with exceptions* en los dos. Buscador + Search a la izquierda, *Add new
    exception* a la derecha y la tabla con columnas fijas (*Code, Exception* · *Description* · *Reason* · *Actions*); antes
    el tacho caía en la primera columna y el texto se corría una.
18. **Add Range avisa**: toast *A new range was added at the end. Complete it and Save.*, la tabla baja hasta la fila
    nueva, la resalta un momento y pone el foco en *R. Min*.
19. **Drawers sin títulos repetidos**: un título de sección no repite el rótulo del campo ni el título del drawer (Copy
    form decía "Fee schedule" dos veces). Corregido en Copy form, Increase All, Location Number (el texto de red.dev pasa
    a la bajada), Copy from y el asistente de excepciones; fuera de Billing, la bajada de Add Relationship y Edit
    Relationship.
20. **Patrón de tablas** (todas las de la app; guía: Locations, Employees, Patients): encabezado en banda gris, celdas en
    13px Regular ink-soft, azul y Semibold sólo en lo que navega. Los nombres de Carriers y de Insurance Plans pasan a ser
    links a su edición. Clases en `lib/estilos.ts` (`TABLA_*`); ver design-system.md.
21. **Los selects de una tabla se abren por encima** (bug reportado por Julián en Fee Schedule By Location): el marco de
    la tabla ya no recorta. Los procedimientos elegidos de una excepción son `Chip` (celeste), no una pill gris.

## 2026-10-09 · Rehecho desde red.dev, con las correcciones de Julián

La primera versión (2026-10-08, en este mismo PR #18) estaba armada "con criterio propio" porque desde la nube
`red.dev` no resolvía: portada con Setup checks, detalles con StatStrip, coverage tables por categoría y precios editables
en la celda. **Se reemplazó entera.** Ahora la lógica, las pantallas, los campos y los textos salen de
`red.dev.confidentally.com/settings/finance/*`, recorrido el 2026-10-08 con la sesión de Julián: inventario, textos tal
cual y 34 capturas en `design-reference/red-dev/settings-billing/`. El estilo y los componentes son los nuestros.

Sobre eso, Julián corrigió el 2026-10-09 (al pie de la letra): la tabla de Fee Schedules con *Assignments*, *Compare
fees* en vez de *vs UCR*, *Non-zero fees*, selección para Bulk Edit e *Information* primero en todas las pestañas.

### Rutas

| Ruta | Pantalla |
|---|---|
| `/settings/finance` | Redirige a Fee Schedules |
| `/settings/finance/fee-schedule` | **Fee Schedules**: tabla (Name · Type · Assignments · Effective · Last updated · Status · Actions) |
| `/settings/finance/fee-schedule/new` | **New Fee Schedule**, página sin la lista |
| `/settings/finance/fee-schedule/:id/edit` | **Edit Fee Schedule**: la lista de red.dev a la izquierda y el editor (`/:id` redirige acá) |
| `/settings/finance/carriers` (`/new`) | **Carriers** (con el drawer New Carrier abierto) |
| `/settings/finance/carriers/:id/edit` | **Edit Carrier**, pestaña *Information* (`/:id` redirige acá) |
| `…/:id/edit/insurance-plans` (`/new`) | Pestaña *Insurance Plans / Employers* (con el drawer New Insurance Plan) |
| `…/insurance-plans/:planId/edit?section=` | **Edit Insurance Plan**, siete pestañas; sin `section` es *Information* |
| `/settings/finance/coverage-table` | **Search Coverage Table**: lista de plantillas y detalle vacío |
| `/settings/finance/coverage-table/new` | **Coverage Table** (alta), página sin la lista |
| `/settings/finance/coverage-table/:id/edit` | La lista y la plantilla (`/:id` redirige acá) |

Menú: **Billing** › *Fee Schedules*, *Carriers*, *Coverage Table* (singular, tal cual). Breadcrumb: Settings › Billing ›
sección › ítem (› plan), como el resto de Settings (decisión 16).

### Decisiones

1. **red.dev manda en lógica y textos; el estilo es nuestro.** Los errores de red.dev se copian y se anotan abajo, salvo
   los placeholders que describen otro campo (se corrigen).
2. **Information primero, en todas las pantallas** (Julián, 2026-10-09). Edit Carrier: *Information* | *Insurance Plans /
   Employers* (red.dev dice *Carrier*). Edit Insurance Plan: *Information* primero (red.dev dice *Detail*).
3. **Carriers → Edit → plan**: la lista lleva a Edit Carrier; en *Insurance Plans / Employers*, *Edit* de un plan entra a
   su página de siete pestañas para configurarlo todo (Information, Coverage Table, Predeterminations, Payment Table,
   Deductibles And Benefits, Coordination Of Benefits, Fee Schedule By Location), cada una con su Cancel · Save.
4. **New Carrier y New Insurance Plan son drawers con pasos** (regla de pop ups; en red.dev son páginas). Carrier:
   General · Contact. Plan: General · Contact · Address · Configurations. Guardar el plan abre su *Coverage Table*.
   *Carrier Name* busca entre los payers y completa el *Payer ID*; un carrier repetido no se acepta.
5. **Fee Schedules es una tabla** (Julián, 2026-10-09), no la lista + "No Fee Schedule Found" de red.dev. Columnas:
   - *Name* (link al editor, pill *Default*), *Type*, *Assignments*, *Effective* (desde cuándo rige la versión vigente),
     *Last updated*, *Status* y *Actions* (*Edit*, *View assignments*, *Compare fees*).
   - Buscador *Search a Fee Schedule Here...* y *Filters* › *States*; arranca en Active + Inactive (Archived oculto).
     Desde el 2026-11-24 arranca sin filtro (ver abajo).
   - Al editar se ve la pantalla de red.dev: la lista con su filtro y su ⋮ (*Inactive*/*Active*, *Archive*/*Restore*) y el
     editor a la derecha.
6. **Type** (UCR · PPO · Medicaid · Discount plan) no existe en red.dev: es obligatorio en el editor para llenar la
   columna.
7. **Assignments** = entidades linkeadas directamente: patients, carriers, providers y locations. El número abre el
   desglose al pasar el mouse o al tocarlo (Popover, porque tiene *View assignments*); con 0 queda gris. Los carriers
   salen de los planes que lo usan como *Max Allowable Amount Fee Schedule* o en *Fee Schedule By Location*; patients,
   providers y locations son datos de ejemplo (`Arancel.asignados`) hasta que sus fichas lo puedan elegir.
8. **No hay "vs UCR" ni "Procedures".** Cada código tiene su propia diferencia contra el UCR, así que no hay un porcentaje
   global honesto. En su lugar:
   - *Compare fees* (drawer): la referencia es explícita (*Compare with*, arranca en el Default, UCR - Red), compara las
     versiones vigentes código por código ($ y %) y resume Higher · Lower · Same · Missing a fee.
   - *Non-zero fees — 19 / 26* en el editor: cuántos New Fee son mayores que cero. Dice cuántos importes hay, no si el
     fee schedule está completo.
9. **Editor de fee schedule** (red.dev): *Copy form* y *Bulk Edit*; *Fee Schedule's Name* con lápiz para renombrar;
   *Fee Schedule Version* (`dd/mm/yyyy - Active | Expired | Scheduled`); *Save in draft state* (rótulo *Inactive*);
   *Available From*; *Search procedure...*; columnas *Code · Description · Current Fee · New Fee*. Save con precios
   distintos crea una versión desde *Available From* (o pisa la de ese mismo día). Un New Fee distinto del Current queda
   en azul.
10. **Selección para Bulk Edit** (Julián, 2026-10-09): casillas por fila y "todas" en el encabezado (sobre lo filtrado).
    Con filas tildadas, Bulk Edit pasa a *Increase Selected* y cambia sólo esas; una barra dice cuántas hay y ofrece
    *Clear selection*.
11. **Coverage Table son plantillas** (`CoverageTableTemplate` en red.dev): *Manage Exceptions (n)*, *Add Range*, *Name*,
    *Type* (fijo al editar) y la tabla de rangos (*Code Ranges · Category · Deductible Type · Coverage % · Exc*). El plan
    copia una con *Copy from* (*Copy from template* | *Copy from insurance*). Las excepciones se arman con el asistente de
    cuatro pasos de red.dev y se guardan al terminar.
12. **Inactive, Archive y Delete** se hacen sin confirmación y con *Undo* en el toast. En red.dev no se pudieron probar.
13. **Cambiar de pestaña del plan con cambios sin guardar** pregunta *Discard your changes?* (nuestro; red.dev no se
    probó).
14. **Errores**: el banner de red.dev (*Uncompleted fields · All required fields marked with (\*) must be completed before
    proceeding*) y, además, el error en cada campo.
15. **Un store para todo** (`data/finanzasStore.tsx`, `FinanzasProvider` en la ruta de Settings), sin persistencia: al
    recargar vuelven los datos de ejemplo. `location-options → FEES` sale de los fee schedules activos.

### Anomalías de red.dev

- **Copiadas tal cual:** columna *Requierd* (Predeterminations); *Search for CDT Code o Description*; el título *Search
  Coverage Table* también al editar; *Create New button* en el vacío de Coverage Table; *Fee Schedule's* / *Fee
  Schedule’s*; menú *Coverage Table* en singular; el switch *Save in draft state* con el rótulo *Inactive*.
- **Corregidas:** Plan/Employer name y Group # tenían de placeholder *Street name and number* y *Additional info*; el rango
  decía *R. Min – R. Min* (acá *R. Max*); el buscador de Coverage Table decía *Search a Fee Schedule Here...*; *Manage
  exceptions for standard with exceptions* en título y bajada (decisión 17); el breadcrumb *Finance › … › Edit* (decisión
  16).
- **No copiadas:** *Mostrar:* (queda el pie de nuestra tabla); montos como `$30,00` (acá `$30.00`); la hora de la versión
  (`09:00 PM`); el título *Search Fee Schedule* de la lista (ahora es una tabla: *Fee Schedules*).
- **Inferidas** (no se vieron en red.dev): las columnas de una plantilla *Copayment*, el estado *Scheduled* de una
  versión, qué hacen Inactive / Archive / Delete, la unidad *months* de Frequency, la opción *Use the plan default* en Fee
  Schedule By Location y el lápiz que habilita renombrar.

### Componentes

`components/finance/` (*Components / Finance*): `fields` (UnitField, PhoneFields, MoneyInput), `RangesTable`,
`MasterList`, `PlanFields`, `CarrierDrawer`, `PlanDrawer`, `LocationNumberDrawer`, `CopyFromDrawer`, `FeeScheduleTools`
(Copy form, Increase All), `ExceptionsDrawer`, `Assignments` (AssignmentsCount, AssignmentsDrawer) y `CompareFeesDrawer`.
Las piezas de las pantallas, en *Pages / Parts / Billing settings*. `patients/form`: `hideLabel` en TextField y
SelectField (rótulo sólo para lectores, para celdas de tabla) y `control()` exportado.

Salieron `CoverageBar`, `CoverageSummary`, `EditableAmount`, `PlansTable`, `FeeScheduleDrawer`, `AdjustFeesDrawer`,
`CoverageTableDrawer`, `CoverageRuleDrawer` y la portada `Billing.tsx` (nunca llegaron a `main`).

### Pendiente

1. Validar con usuarios de recepción y administración si *Assignments* y *Compare fees* responden lo que necesitan (¿a
   quién afecta si cambio este fee schedule?, ¿cuánto se aleja del UCR?).
2. Dónde se elige el fee schedule de un paciente y de un provider (hoy sólo datos de ejemplo); Locations ya tiene
   *Preferred Location Fee Schedule*, pero todavía no alimenta *Assignments*.
3. Confirmar en red.dev las confirmaciones de Inactive / Archive / Delete y la tabla Copayment.
4. Si la pestaña Insurance del paciente (`data/insurance.ts → CARRIERS`) tiene que tomar los carriers y planes de acá.

## Campo vacío: *This field is required.* (2026-11-16)

Mismo texto en todos los campos obligatorios vacíos (`OBLIGATORIO`, regla en [figma/README.md › Validación](../README.md)):

1. *Manage Exceptions*: *Please add a procedure to the exception* (texto de red.dev), *Select the procedure it is paid
   as.*, *Enter how many times.*, *Enter the period.* y *Enter the reason.* pasan a *This field is required.* La edad
   máxima menor que la mínima sigue con su mensaje.
2. *Copy from fee schedule* sin elegir y *Increase fees* vacío: *This field is required.*; *Enter an amount other than
   0.* queda para el 0.
3. Rangos de la Coverage Table: *Required* → *This field is required.* (entra en las celdas, también en celular).

## Tablas estandarizadas v2 (2026-11-24)

Pie, alineación, fechas y avatar con las reglas comunes de todas las tablas: ver `design-reference/figma/README.md`
(*Tablas estandarizadas v2*, 2026-11-24).

### Fee schedules: Assignments alineada y el Filter sin selección al entrar (2026-11-24)

Devolución de Julián sobre las tablas estandarizadas v2.

1. **Assignments** a la derecha quedaba pegada a *Effective* y el número con link, 6 px corrido del encabezado y del 0
   (el padding del botón). Toda columna a la derecha de `DataTable` suma `pr-3` (24 px hasta la siguiente, como el HTML) y
   el botón de `AssignmentsCount` compensa su padding con `-mx-1.5`.
   - **Corrección (Julián, con referencia):** Assignments va a la **izquierda**, el número al inicio de la columna, debajo
     de la "A" del encabezado. Excepción a "cantidades a la derecha": es un link que abre el desglose, no un importe.
2. **Filter › States arranca vacío**: antes abría con Active + Inactive tildados y el botón decía *Filter 2* sin que nadie
   hubiera filtrado. Sin nada tildado se ve todo, como en el resto de las listas; un fee schedule *Archived* también
   aparece, con su pill. La lista del editor (a la izquierda) sigue arrancando en Active, como red.dev.

## Edit Fee Schedule como red.dev: scroll adentro, aviso al salir y vacío (2026-11-25)

Sin historia de abril (epic CON-57): Julián pasó un video de red.dev con lo que estaba mal. Cambios:

1. **La tabla scrollea adentro** con el encabezado fijo (hasta 480 px o el 60 % de la ventana). Antes la página crecía con
   los 26 procedimientos y *Cancel* / *Save* quedaban abajo de todo; ahora están siempre a la vista, como en red.dev.
2. **Irse con cambios sin guardar pregunta**: otro fee schedule de la lista, el breadcrumb, el menú o *Cancel* abren
   *Are you sure you want to leave?* — *You have unsaved changes. Are you sure you want to leave this page without saving
   them?* — con *Cancel* y *Leave without saving* (textos de red.dev). Recargar o cerrar la pestaña usa el aviso del
   navegador. Va en `lib/useAvisoSalida`, que sirve para cualquier pantalla con Save.
3. **Buscar sin resultados** muestra el vacío de red.dev con `ui/empty-state`: *No procedures available* · *No procedures
   match your current filters or may not be available at this time.* (antes una línea suelta).
4. **La lista de la izquierda arranca en Active + Inactive**, como red.dev (los inactivos con punto rojo). Corrige lo del
   2026-11-24: abría sólo en Active y un fee schedule inactivo aparecía al final, sólo cuando estaba abierto.
5. **Versión que todavía no empezó**: decía *Active* cuando era la única (Cigna DPPO 2027, 01/01/2027). Ahora dice
   *Scheduled*.

Quedan como estaban, a propósito: *Type*, las casillas para Bulk edit y *Non-zero fees* (decisiones 6, 8 y 10), que red.dev
no tiene.

**A validar con usuarios:** que el alto de la tabla alcance en notebooks de 768 px de alto, y que el aviso al salir no
moleste a quien sólo miró precios (sólo salta si algo cambió).

### Segunda vuelta de Julián (2026-11-25)

1. **Sin casillas**: *"los check no van, es más formato texto"* (video de red.dev). Se van las casillas por fila, la de
   "todas", la barra *n selected* y *Increase selected*: Bulk edit vuelve a cambiar todos los fees. Corrige la decisión 10
   (2026-10-09).
2. **New fee como texto**: el importe se ve como texto, alineado con *Current fee*, y el borde aparece al pasar o al
   editar (`MoneyInput comoTexto`). Filas más bajas, como red.dev.
3. **Filter de la lista** como el del resto: con su ancho (antes estirado a toda la columna) y **sin selección al
   entrar** (antes Active + Inactive, y el botón azul con "2"). Se ven todos con su punto; los archivados en gris.
