# Settings → Billing (Fee Schedules, Carriers, Coverage Table)

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
