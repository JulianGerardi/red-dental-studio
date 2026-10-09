# red.dev · Settings → Billing (relevamiento 2026-10-08)

Recorrido de `red.dev.confidentally.com/settings/finance/*` con la sesión de Julián, sin guardar ni cambiar datos.
Capturas numeradas en esta carpeta. Los textos van tal cual (con sus errores).

No se probaron (el control de permisos no dejó tocar acciones que cambian datos): las confirmaciones de **Inactive**,
**Delete** y **Archive**, y qué pasa al guardar. Tampoco las columnas de una coverage table **Copayment**.

## Rutas

| Ruta | Pantalla |
|---|---|
| `/settings/finance/carriers` | Lista de carriers |
| `/settings/finance/carriers/new` | New Carrier (página) |
| `/settings/finance/carriers/:id/edit` | Edit Carrier, pestaña *Carrier* |
| `/settings/finance/carriers/:id/edit/insurance-plans` | Edit Carrier, pestaña *Insurance Plans / Employers* |
| `…/insurance-plans/new` | New Insurance Plan (sólo Detail habilitada hasta guardar) |
| `…/insurance-plans/:planId/edit?section=…` | Edit Insurance Plan: `coverage-table`, `predeterminations`, `payment-table`, `deductibles-and-benefits`, `coordination-of-benefits`, `fee-schedule-by-location` (Detail sin `section`) |
| `/settings/finance/fee-schedule` | Lista + detalle vacío ("Search Fee Schedule") |
| `/settings/finance/fee-schedule/:id/edit` | Lista + Edit Fee Schedule |
| `/settings/finance/fee-schedule/new` | New Fee Schedule (página completa, sin la lista) |
| `/settings/finance/coverage-table` | Lista + detalle vacío ("Search Coverage Table") |
| `/settings/finance/coverage-table/:id/edit` | Lista + edición (el id es un `CoverageTableTemplate`) |
| `/settings/finance/coverage-table/new` | "Coverage Table" (página completa, sin la lista) |

Menú de Settings: **Billing** › *Fee Schedules*, *Carriers*, *Coverage Table* (singular). Breadcrumb: Settings › Finance › …

## Carriers

**Lista** (01, 02). Título *Carriers*, bajada *Manage insurance carriers and their group plans.*, botón *+ New Carrier*.
Buscador *Search carrier by name or payer ID...* + botón *Search*. Columnas: *Carrier Name* · *Payer ID* ·
*Group Plans #* · *Actions*. Pie: *Showing 1 to 3 of 3 results* · *Mostrar:* 10 · *Previous* 1 *Next*.
Menú de la fila: *Actions* › *Edit*, *Delete* (rojo).

**Edit Carrier** (03). Botón *+ New Insurance Plan* arriba a la derecha; pestañas segmentadas *Carrier* |
*Insurance Plans / Employers*.
- *General Information*: Carrier Name* y Payer ID* (deshabilitados) · Printed Claim Format* (ADA 2012 · ADA 2019 ·
  ADA 2024) · Expected Period of Insurance Claim Resolution* (número + "days") · ☐ Do not include Dental Diagnostic
  Codes · ☐ Do not bill Insurance · botón *Location Number*.
- *Contact Information*: Email* · Website · Country Code* · Number* (con EE.UU.: *Area Code (3 digits)** y
  *Number (7 digits)**).
- Pie: *Cancel* · *Save* (deshabilitado hasta que algo cambie).

**Location Number** (04), diálogo: ícono (i), *Enter the location number assigned by the insurance carrier for this
clinic. This identifier is required to process electronic claims correctly and avoid rejections. Contact the insurance
carrier if you do not know the assigned number.* Tabla *Location Name* · *Number* (input *Enter a number*), una fila por
locación. *Cancel* · *Save*.

**Insurance Plans / Employers** (05, 06). Buscador *Search...*. Columnas *Plan/Employer Name* · *Group #* · *Status*
(pill Active verde / Inactive roja) · *Actions*. Menú: *Edit*, *Inactive* (rojo), *Delete* (rojo).

**New Carrier** (17–20), página. Igual a *General Information* sin *Location Number*; *Carrier Name** es un buscador
(*Select carrier*) que sugiere carriers ya cargados ("Aetna Dental Plans - 60054"). Placeholders: Payer ID *00000*,
*Select a printed claim format*, *0 Days*, *example@example.com*, *Introduce your website link*, *555*, *000-0000*.
Mientras cargan los permisos el botón *New Carrier* no hace nada y la página muestra *You cannot create a new carrier ·
Permissions are still loading. Please wait.* Al guardar incompleto: banner *Uncompleted fields · All required fields
marked with (\*) must be completed before proceeding* y los rótulos en rojo (Payer ID, Expected Period, Email; Area Code y
Number no se marcan). *Cancel* vuelve a la lista sin preguntar.

## Insurance plan (07–16, 21)

Página *Edit Insurance Plan* / *New Insurance Plan* con 7 pestañas; cada una con su *Cancel* · *Save*.

1. **Detail** — *General description*: Plan/Employer name* (ph *Street name and number*) · Group #* (ph *Additional
   info*). *Contact Information*: Country Code · Area Code (3 digits)* · Number (7 digits)* · Contact (buscador *Select
   contact* + ✕) · First Name · Last Name · Email · Organization. *Address Information*: Address Line 1* · Address
   Line 2 · Country* · State* · City* (*Your city*) · ZIP Code* (*Postal code (only numbers)*). *Configurations*:
   Benefit Renewal Month* (meses) · Source of Payment* (Blue Cross/Blue Shield · CHAMPUS · Commercial Insurance ·
   Commercial Insurance (DHMO) · Commercial Insurance (PPO) · Medicaid · Medicare Part B) · Type* (Dental · Medical) ·
   Max Allowable Amount Fee Schedule (fee schedules, se puede borrar) · Waiting Period* (months) · Dependent Max Age*
   (years) · Missing Tooth Clause* (No · Yes) · Crowns/Bridges Paid On (Prep date · Seat date) · Out of Network Benefits
   (No · Yes) · Out of Network Benefit Assignment (Patient · Provider).
2. **Coverage Table** — *Type* (Copayment · Percentage), *Copy from* (diálogo: *Copy the form to the coverage table*,
   *Copy from template* | *Copy from insurance*, buscador *Search for name*), *Add Range*. Columnas: *Code Ranges**
   (*R. Min* – *R. Min*) · *Category** (texto) · *Deductible Type** (Basic · Major · None · Orthodontic · Preventive) ·
   *Coverage %** · *Exc* · 🗑. Vacío: *No procedure ranges found · Make sure there are available ranges or try adding a
   new one.*
3. **Predeterminations** — *Predetermination*: *By selecting procedures from this list, you will be warned to generate a
   predetermination claim and submit it to the payer while planning the patient's treatment in the Treatment Planner.*
   Buscador *Search for CDT Code o Description..*; columnas *Requierd* (switch) · *Code* · *Description*.
4. **Payment Table** — *Add Procedure* (*Search for CDT Code o Description*) y *Filter procedures*; columnas *Code* ·
   *Description* · *Value*. Vacío: *No procedures found · Add a new procedure to the payment table*.
5. **Deductibles And Benefits** — *Deductibles*: filas Preventive · Basic · Major · Ortho × *Annual Individual* ·
   *Annual Family* · *Lifetime Individual*. *Benefits*: *Maximum* × *Annual Individual* · *Annual Family* ·
   *Lifetime Ortho*. Montos como `$30,00`.
6. **Coordination Of Benefits** — *Choose the method for coordinating benefits between the primary and secondary
   insurance when this plan is used as the patient's secondary coverage.* Una fila por *Source of Payment for Primary
   Insurance Plan* con *Method for Coordination of Benefits* (Carve out non duplication · Maintenance of benefits ·
   Traditional).
7. **Fee Schedule By Location** — *Max Allowable Amount Fee Schedule By Location*: *Select a fee schedule for a specific
   location. If none is selected, the default from 'Max Allowable Amount Fee Schedule' will be used.* Una fila por
   locación con su select.

## Fee Schedules (22–27)

Lista a la izquierda y detalle a la derecha. Título *Search Fee Schedule* (sin elegir) / *Edit Fee Schedule*; botón
*+ New Fee Schedule*. Lista: buscador *Search a Fee Schedule Here...*, *Filters* (*States*: Active 73 · Inactive 10 ·
Archived 24, con tilde), cada ítem con nombre, pill *Default*, punto de estado y ⋮ (*Inactive*, *Archive*; no hay
Delete). Sin elegir: *No Fee Schedule Found · Select an existing Fee Schedule from the list on the left or create a new
one by clicking the Create New button*.

**Edit**: *General information* con *Copy form* y *Bulk Edit*. Fee Schedule's Name* (con un lápiz al lado) · Fee
Schedule Version (versiones por fecha: `03/06/2026 09:00 PM - Active`, las anteriores `- Expired`) · Save in draft state
(switch, rótulo *Inactive*) · Available From* (fecha). Buscador *Search procedure...*; columnas *Code* · *Description* ·
*Current Fee* · *New Fee* (input). *Cancel* · *Save*.
- *Copy form*: *Select the fee schedule you want to replace with* (select) · *Cancel* · *Confirm*.
- *Bulk Edit* → *Increase All*: *Increase all fees by a specific amount or percentage.* · Increase All Fees By* + By
  ($ · %) · ☐ Exclude $0.0 fees from the increase · ☐ Round up the value to the nearest dollar · *Cancel* · *Confirm*.
  Abrirlo colgó la pestaña varios segundos.

**New** (27): *New Fee Schedule*, sin la lista: Fee Schedule’s Name* · Save in draft state; columnas *Code* ·
*Description* · *New Fee*.

## Coverage Table (28–34)

Igual que Fee Schedules: título *Search Coverage Table* (también al editar), *+ New Coverage Table*; lista con buscador
*Search a Fee Schedule Here...*, filtro de tipo (Percentage · Copayment) y ⋮ (*Delete*). Las tablas de acá son
**plantillas**: cada plan tiene la suya y la copia con *Copy from template*.

**Edit** (29, 33): *Manage Exceptions* y *Add Range*; Name (*Insert name*) · Type (deshabilitado); la misma tabla de
rangos del plan; *Cancel* · *Save*.

**Manage exceptions** (31, 32): *Manage exceptions for standard with exceptions* (título y bajada), buscador *Search...*,
*Add new exception*; columnas *Code, Exception* · *Description* · *Reason*; vacío *No exceptions found in the system.*
*Add new exception* es un asistente de 4 pasos: **Exceptions Type › Select Procedure › Specify Options › Reason For
Exception**, con *Cancel* · *Back* · *Next*.
- Exception Type*: Age limitation · Downgrade · Frequency · Not covered.
- Select Procedure: *Add Procedures (n)*, buscador *Search for CDT Code o Description*, *Please add a procedure to the
  exception*.
- Specify Options: *Age limitation* → Minimum age · Maximum age · Coverage, % **o** Downgrade to (CDT) + Deductible
  Type. *Downgrade* → Downgrade to*. *Frequency* → How many times · Over the course of. *Not covered* → *There are no
  type specific options for Not covered type.*
- Reason For Exception: *Select the reason for the exception.* textarea *Enter a reason for the exception*.

**New** (34): título *Coverage Table*, Name · Type (habilitado) · *Add Range*.
