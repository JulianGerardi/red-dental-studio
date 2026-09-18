# Settings → Ledger (Ledger Options)

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
