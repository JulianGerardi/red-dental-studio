# Settings → Ledger (Ledger Options)

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)):

- Epics: CON-3732 Ledger 2
  ([historias](https://confidetally.atlassian.net/issues?jql=parent%20in%20%28CON-3732%29%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20AND%20%28labels%20is%20EMPTY%20OR%20labels%20%21%3D%20%22design-system%22%29%20ORDER%20BY%20created%20DESC))

Figma 4293:57917. Dos pantallas que comparten encabezado y se alternan con un
par de tabs arriba a la derecha: **Adjustments Types** y **Payment Method**.

## Adjustments Types

Buscador, tira de filtros -All · Charge · Credit · Production · Collections- y
tabla de seis columnas: Adjustment Type · Description · Category · Direction ·
Impact · Actions. Las tres del medio son pastillas y la última un toggle por
fila. Los filtros cruzan dos campos distintos: Charge/Credit filtran por
`direccion` y Production/Collections por `impacto`.

## Payment Method

Mismo encabezado, filtros All · Patient · Insurance, y tabla de Name ·
Method Type · Status · Actions.

## Anomalías del frame

1. **La bajada es la de Locations**: "Set your location name. Add the location
   you need.", en una pantalla que no tiene nada que ver con locaciones. Se
   replica -el contenido va como está-.
2. **El buscador dice "Search patients"** en las dos pestañas, donde no hay
   pacientes. Se replica.
3. **El pie dice "Showing 6 of 18 referrals"** y tampoco hay referrals; además
   la primera pestaña muestra 13 filas, no 6. Acá sí se corrige, porque es un
   contador que tiene que decir la verdad sobre lo que está en pantalla: dice
   "adjustment types" / "payment methods" y cuenta las filas reales.
4. **Payment Method rotula dos columnas "Status"**: la del badge y la del
   toggle. La segunda pasa a "Actions", que es como la llama la otra pestaña
   para esa misma columna -no es inventar, es usar la palabra que el propio
   diseño ya eligió-.
5. El sidebar del frame trae ítems que no existían en `SETTINGS_NAV`
   -Accounts, Insurance setting, Ledger-. Se agregaron Accounts y Ledger, que
   son los que Julián pidió; "Insurance setting" queda pendiente.

## Tabs → select, pastillas → texto (2026-09-12)

Dos pedidos de Julián, los dos se apartan del frame a propósito:

1. *"en vez de tabs pondría los filtros como tenemos en accounts"*: el par de
   tabs **Adjustments Types / Payment Method** -que elegían qué tabla se
   mostraba, no filtraban una lista- deja el slot `accion` del header y se
   convierte en un `<select>` con el mismo estilo que el filtro de estado de
   Accounts, ahora en la fila del buscador junto al `SearchButton`. La tira de
   filtros de abajo (All · Charge · Credit... / All · Patient · Insurance) no
   cambia: son filtros de la tabla, no la vista.
2. *"las pills que van en ledger settings... no lo haría en forma de pill sino
   en forma de texto, así no queda colorido"*: se sacan `Pill` y el mapa
   `PILL` de colores por categoría; Category, Direction, Impact, Method Type y
   Status se muestran como texto plano (`text-[#3f3f46]`), igual que cualquier
   otra celda de la tabla.

## La lista y su filtro, en el Filter de Accounts (2026-11-20)

Pedido de Julián de un solo diseño de filtro (detalle en `settings-accounts.md`, misma fecha). Es lo que se había pedido
el 2026-09-12 (*"pondría los filtros como tenemos en accounts"*): Accounts tenía entonces un `<select>`; hoy tiene el
menú Filter.

1. El `<select>` **Adjustments Types / Payment Method** y la tira **All · Charge · Credit · Production · Collections**
   (o **All · Patient · Insurance**) pasan a un solo `FilterMenu` con dos grupos de una opción: *View* y *Type*, cada
   tipo con su cantidad. Cambiar de *View* vuelve *Type* a All, como antes. Clear all vuelve a Adjustments Types y All.
2. El buscador pasa a `SettingsSearch` (sigue diciendo "Search patients", anomalía 2).

## Enabled, Name y el buscador de cada pestaña (2026-11-20)

Normalización (ver `figma/README.md`, misma fecha): la columna de switches se llama **Enabled** en las dos pestañas (un
estado editable no es una acción); la primera columna de Adjustment types se llama **Name**; las pestañas son
**Adjustment types** y **Payment methods**; el buscador dice "Search adjustment types" o "Search payment methods" según
la pestaña (el frame decía "Search patients", anomalía 2, corregida). El pie dice "Showing X to Y of N …".

## *Adjustment types* y *Payment methods* en pestañas (2026-11-20)

Pedido de Julián. Corrige el 2026-11-20 anterior: qué lista se ve no es un filtro, son dos catálogos distintos.

1. El grupo *View* del Filter pasa a `Tabs` `sm` debajo del título, como las fichas de Settings (Location, Account,
   Employee). Cambiar de pestaña vuelve *Type* a All, limpia el buscador y la página, como antes.
2. El Filter queda con un solo grupo, *Type*, con las opciones de la pestaña y su cantidad.

### Las pestañas, a la derecha de la fila del buscador (2026-11-20)

Pedido de Julián: las pestañas van a la altura del buscador, en la otra punta de la tabla. Buscador y Filter a la
izquierda, *Adjustment types / Payment methods* a la derecha, alineadas al borde derecho de la tabla, en `md` (32, el alto
del buscador). En el celular bajan a su propio renglón.

### Las pestañas, a la izquierda y debajo del buscador (2026-11-20, corrige la anterior)

Pedido de Julián: en toda la app las pestañas van a la izquierda. Buscador y Filter en su fila; debajo, *Adjustment
types / Payment methods* a la izquierda (`md`); después la tabla.

## Tablas estandarizadas v2 (2026-11-24)

Pie, alineación, fechas y avatar con las reglas comunes de todas las tablas: ver `design-reference/figma/README.md`
(*Tablas estandarizadas v2*, 2026-11-24).

## Pestañas arriba y el Filter de cada lista (2026-11-24)

Devolución de Julián. Sin historia nueva; la lógica de los filtros sale de CON-3363 (`method_type` de los payment
methods: patient / insurance) y de los campos de los adjustment types (direction e impact).

1. **Orden:** primero las pestañas *Adjustment types / Payment methods* y debajo el buscador y el Filter de esa lista;
   después la tabla. Corrige el 2026-11-20 (pestañas debajo del buscador).
2. **El Filter es de la pestaña elegida.** *Adjustment types* tiene dos grupos: *Direction* (All · Charge · Credit) e
   *Impact* (All · Production · Collections). *Payment methods* tiene *Method type* (All · Patient · Insurance). Antes el
   de Adjustment types mezclaba las cuatro opciones en un solo grupo *Type*.
   - **Anomalía / a confirmar con Julián:** pidió Production / Collections para Payment methods, pero un payment method no
     tiene ese dato (CON-3363 sólo le da patient / insurance); Production / Collections es el *impact* de un adjustment
     type. Se dejó en su pestaña y Payment methods filtra por Method type.
3. **Description** ya no se lleva media tabla: Name y Description se reparten el ancho; Category, Direction e Impact a
   120px y Enabled a 80px.
