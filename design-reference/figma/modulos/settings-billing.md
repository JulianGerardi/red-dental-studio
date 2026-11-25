# Settings → Billing (Fee Schedules, Carriers, Coverage Table)

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
