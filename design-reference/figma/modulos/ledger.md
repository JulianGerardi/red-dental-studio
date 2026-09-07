# Ledger

Figma 4582:28487 "Ledger — Screens": Empty State, Overview (Patient View),
Overview (Guarantor View), y tres modales de acción -Credit (+) Adjustment,
Credit (-) Adjustment, Enter Payment (-), este último en variante Single y
Multiple Methods-.

Hasta el 2026-09-04 esta pantalla no tenía frame propio: se armaba con el
vocabulario del resto del sistema (tabla de Insurance/Documents, pills de
estado, tira de métricas del dashboard) porque el Figma no la traía. Ese
layout base se mantiene -es lo que pidió Julián al pedir esto: "respetando
la estetica actual que armaste de ledger"-; lo que se agrega es lo que el
frame sí define y antes no existía: las tres acciones y el toggle de vista.

## Patient View / Guarantor View

El toggle vive en la misma fila que los tres botones -alineados entre sí,
no apilados- y usa el mismo tab-bar (`bg-[#f1f5f9]` + pill azul) que ya
usan Employees y Location Detail, en vez de inventar un componente de
segmented-control nuevo.

Sin un segundo paciente en los datos, las dos vistas mostrarían la misma
tabla y el toggle no demostraría nada. `Movimiento` suma un campo
`paciente`; John Smith (guarantor) tiene sus 8 movimientos de siempre, y se
agrega Emma Smith (dependiente) con 2 más. Patient View filtra a uno solo;
Guarantor View muestra los dos. El saldo corre sobre la cuenta completa en
los dos casos -no se reinicia por paciente-, así que una fila de Emma Smith
en Guarantor View sigue la cuenta corriente de John Smith, no una propia.

La tabla suma una columna **Patient** que antes no existía -sin ella, la
distinción entre vistas no se leería en ningún lado-.

## Anomalía: el botón dice Charge, el modal dice Credit

"Charge Adjustment (+)" abre un modal titulado **"New Credit (+)
Adjustment"** -así en el frame, no se corrige-. El campo que de verdad
decide Charge vs Credit es "Type" adentro del modal, no el título: mismo
tipo de desajuste botón/título ya documentado en Locations ("Edit hours"
abre "New Availability").

## Simplificaciones deliberadas

- **"Amount" del modal Credit (-)** es texto libre. En el frame trae un
  desplegable -elegís entre créditos sin aplicar existentes-, pero el resto
  de la app no modela "créditos disponibles" como catálogo propio; inventar
  una lista sólo para ese campo era más ficción que la que pide el resto del
  sistema. Se documenta acá en vez de fingir el desplegable.
- **La tabla "Ledger Transactions"** (compartida por Payment y Credit (-),
  componente `LedgerAllocationTable`) usa las columnas que `Movimiento` ya
  tiene -fecha, paciente, provider, código, descripción, monto- en vez de
  las del frame que no existen en ningún otro lado de la app (Tooth,
  Surface, Guar Estimate).
- **"Amount not applied" / "Amount applied"** salen de lo que se tipea en el
  input "Applied" de cada fila, no de un número fijo: en el frame esos dos
  totales no coinciden con las filas que muestran ("Applied" en 0.00 en las
  ocho filas pero "Amount applied" en $430.00), así que tomarlos como mock
  literal habría sido replicar un dato inconsistente en vez de un
  comportamiento real.
- **Check / Bank-Branch** en "New Patient Payment (-)" sólo se muestran
  cuando el método es "Check payment" -el frame los deja siempre visibles y
  vacíos con cualquier método-.
- **Guardar sí escribe en la tabla**: cada modal agrega una fila real a
  `MOVIMIENTOS` -no sólo cierra con un toast-, con el mismo patrón de
  "toda acción visible produce un efecto visible" que ya rige el resto de
  la app.

## La tabla quedaba cortada en el modal (2026-09-04)

Las columnas fijas de `LedgerAllocationTable` (Date, Patient, Provider,
Code, Charge, Applied, Balance) no tenían `shrink-0`: en flexbox, sin eso,
un contenedor más angosto que la suma de columnas las achica a todas por
igual en vez de desbordar. El resultado eran "Balance" y "Applied"
recortados sin ningún indicio de que había más tabla para el costado.

Se corrige en dos pasos: `shrink-0` en cada columna fija -ahora sí
desbordan y `overflow-x-auto` puede hacer su trabajo-, y el modal
(`NewPatientPaymentModal`, `NewCreditAdjustmentModal`) pasa de
`max-w-[820px]` a `max-w-[1080px]` para que la tabla completa entre sin
depender de ese scroll en el ancho de escritorio habitual.

## La tabla principal se ajusta a su propio componente (2026-09-07)

Figma aisló la tabla de la pantalla de Ledger como componente propio -nodo
`4588:84886`, "Ledger Transactions Table"- con siete columnas en un orden
puntual: **Date, Patient, Type, Description, Provider, Amount, Balance**.
La tabla de `Ledger.tsx` traía dos columnas de más que ese componente no
tiene -Code y Status-, y el orden de Type estaba corrido -iba después de
Provider, no después de Patient-.

Se ajusta a las siete columnas y ese orden exacto. `codigo` y `estado`
siguen en `Movimiento` -la búsqueda sigue filtrando por código, y "Insurance
paid" en la tira de métricas sigue contando `estado === 'Denied'`-, sólo
dejan de tener columna propia en la tabla: son datos que otras partes de la
pantalla usan, no filas visibles de más.

## Los tres botones pasan a ser tabs (2026-09-07)

Pedido de Julián: "Patient Payment (-)", "Credit Adjustment (-)" y "Charge
Adjustment (+)" dejan de ser botones que abren un modal y pasan a ser tabs,
junto con un cuarto tab nuevo, "Transactions", que es la vista que ya
existía (tira de métricas, buscador, tabla). Mismo tab-bar
(`bg-[#f1f5f9]` + pill azul) que ya usan Employees y Location Detail, y la
misma conversión modal→pantalla que ya tuvieron "New Location" y "New
Employee": `NewPatientPaymentModal.tsx`, `NewCreditAdjustmentModal.tsx` y
`NewChargeAdjustmentModal.tsx` se renombran a `PatientPaymentPanel.tsx`,
`CreditAdjustmentPanel.tsx` y `ChargeAdjustmentPanel.tsx` -sin `ModalShell`,
con `FormFooter` al pie de la página en vez de en el `footer` del modal-.

- El **título de la página** (el `<h1>`) cambia según el tab activo, igual
  que ya hace `Employees.tsx` con `{tab === 'Employee' ? 'Employee
  Information' : tab}`: en "Transactions" dice "Ledger"; en los otros tres
  dice el título real del modal de Figma -"New Patient Payment (-)", "New
  Credit (-) Adjustment", "New Credit (+) Adjustment"-, preservando el
  desajuste botón/título de este último (ver más arriba) aunque el tab en
  sí se llame "Charge Adjustment (+)".
- **Guardar o cancelar vuelve al tab de Transactions** -antes el modal se
  cerraba sobre la tabla que ya estaba ahí atrás; ahora no hay "atrás", así
  que el cambio de tab hace ese mismo trabajo-.
- El toggle **Patient View / Guarantor View** y **Export statement** se
  mudan a la fila de búsqueda/filtro, y sólo se muestran en el tab
  Transactions -no tienen nada que hacer en un formulario de alta-.
- Las tablas de aplicación (`LedgerAllocationTable`) traían sólo 4 cargos
  por paciente en los datos de prueba, bastante menos que las capturas del
  Figma. Se suman 4 cargos más a John Smith y 2 a Emma Smith en
  `data/ledger.ts` para que las tablas de Payment y Credit Adjustment se
  vean tan pobladas como el frame.

## Las 12 columnas de la tabla de aplicación, completas (2026-09-07)

La primera versión de `LedgerAllocationTable` recortaba el frame -Figma
4582:29618 y 4582:30251- a 8 columnas, sacando Tooth, Surface, Other Credit
y Guar Estimate por no existir en ningún otro lado de la app. Julián pidió
explícitamente no recortarla: van las 12.

- **Tooth / Surface**: nuevos campos opcionales en `Movimiento`
  (`diente`/`superficie`). Sólo los tiene un cargo restaurativo de pieza
  puntual -la corona (D2740) y la resina de dos superficies (D2392)-; una
  limpieza o una radiografía no van sobre un diente, así que quedan en
  `undefined` y la tabla muestra "-".
- **Other Credit / Guar Estimate**: no son datos guardados, se calculan por
  código en el momento (`coberturaSeguro` en `LedgerAllocationTable.tsx`).
  Diagnóstico y preventivo (D0/D1) los cubre el seguro al 100% -Other Credit
  = el cargo entero, Guar Estimate = $0-; el resto, a mitad. Es el criterio
  real de cobertura dental -preventivo cubierto, restaurativo con
  coseguro-, no un número copiado de una fila.
- Las 8 filas del frame repiten literalmente la misma persona y el mismo
  código -Brent Crosby, D7450, "Remove Ben. O..."- ocho veces: es una fila
  de prueba pegada en loop, el mismo tipo de anomalía que ya se documentó
  con los placeholders de Radiography y de Rooms. Se listan los cargos
  reales de la cuenta en su lugar, no el loop.
- La tabla pasó a necesitar más ancho (`min-w-[1280px]`) para las 12
  columnas; como ya no vive dentro de un modal con ancho fijo sino en la
  página de Ledger, el `overflow-x-auto` de siempre alcanza sin tener que
  ensanchar nada más.

## `LedgerAllocationTable` no tenía el look de las otras tablas (2026-09-07)

La cabecera y las filas se habían armado con valores propios -`h-9`, texto
`11px`, fondo blanco, tres bordes grises distintos entre cabecera/filas
(`#e4e4e7`, `#f1f1f4`)- en vez de los que ya usa toda tabla del sistema
-Ledger, Employees, Locations-: cabecera `h-12` con fondo `#f9f9f9` y texto
`text-xs`, filas `py-3` con texto `13px`, un solo gris de borde (`#e7e7e7`)
para las dos. Se empareja a esos valores.

De paso, **Credit Adjustment** y **Charge Adjustment** ganan la misma
cabecera con ícono que ya tenía Payment -"Credit Information" y "Adjustment
Information"-, que el Figma no trae para estos dos pero permite el paralelo
visual entre las tres cards, pedido explícito de Julián. El ícono
(`CreditCard`) es el mismo que ya usa "Ledger Transactions" -Figma reusa un
único glifo genérico para estos encabezados de card, no uno por tema-.
