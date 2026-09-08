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

## Columnas elegibles, para no depender del scroll (2026-09-07)

Con las 12 columnas siempre puestas, `LedgerAllocationTable` pedía scroll
horizontal en cualquier ancho razonable -mismo problema en Payment y en
Credit Adjustment, comparten el componente-. Se agrega un botón "Columns"
junto al título de la card, con un desplegable de checkboxes -mismo patrón
visual que `FilterMenu`- para elegir qué columnas mostrar.

Por defecto quedan visibles Transaction Date, Patient, Code, Description,
Charge, Applied y Balance -entran sin scroll en cualquier ancho de
escritorio-; Provider, Tooth, Surface, Other Credit y Guar Estimate quedan
ocultas hasta que se piden. El ancho mínimo de la tabla ya no es un número
fijo: se calcula sumando el ancho de las columnas visibles, así el
`overflow-x-auto` sólo entra en juego si el usuario reactiva suficientes
columnas como para necesitarlo.

Transaction Date, Applied y Balance no se pueden ocultar -aparecen
deshabilitadas en el desplegable-: son las tres columnas sin las que la tabla
deja de tener sentido.

## Tope en "Applied" (2026-09-07)

El input de "Applied" no tenía techo: se podía tipear cualquier número, más
alto que el propio cargo. `Balance` ya lo mostraba bien igual -tiene su
propio `Math.max(...,0)`- pero el estado guardado quedaba mal (ej: $500
aplicados a un cargo de $85). Se agrega un tope por fila: si lo tipeado supera
`monto`, se guarda `monto` en su lugar; por debajo del tope se guarda tal cual
se tipeó, para no interrumpir un decimal a medio escribir (".5" antes de
completar "0.50").

## El picker de columnas pasa a shadcn/ui real (2026-09-07)

Julián pidió que el componente de columnas sea shadcn de verdad, no una
imitación con `<div>`+estado propio -y que todo lo nuevo de acá en más se
construya con esa librería-. Se instaló shadcn/ui (Radix + `components.json`,
antes el proyecto sólo tenía el CSS con la convención de tokens de shadcn
pero ningún componente corría sobre Radix) y `ColumnPicker` se reescribió
sobre `DropdownMenu`/`DropdownMenuCheckboxItem` reales
(`src/components/ui/dropdown-menu.tsx`). Mismos ids, mismo default
visible/oculto; el manejo de apertura, click-afuera y Escape ya no es código
propio, lo da Radix.

## `FilterMenu` se empareja con `ColumnPicker`, y gana "clean all" (2026-09-08)

Julián notó que los filtros de Ledger "no tienen el mismo diseño": el embudo
de "Filter entries" (`src/components/dashboard/FilterMenu.tsx`, compartido
con el Dashboard) seguía siendo el dropdown a mano de antes de la migración a
shadcn -`useState`/`useRef`/`useEffect` propios para abrir/cerrar y click-
afuera, checkbox dibujado con un SVG a medida-, mientras que el "Columns" de
al lado (`LedgerAllocationTable`) ya corría sobre `DropdownMenu` real desde
el fix anterior. Dos componentes visualmente distintos para el mismo tipo de
control. Se reescribe `FilterMenu` sobre los mismos primitivos
(`DropdownMenu`/`DropdownMenuCheckboxItem`/`DropdownMenuSeparator`), mismo
`onSelect={(e) => e.preventDefault()}` para que tildar varias opciones
seguidas no cierre el menú -API externa intacta, los dos call sites
(`Dashboard.tsx`, `Ledger.tsx`) no cambian-.

`FilterMenu` ya tenía su "Clear filter" cuando hay algo tildado; lo que le
faltaba a `ColumnPicker` era el equivalente para columnas. Se agrega "Show
all columns" -mismo lugar, mismo estilo de link, debajo de un
`DropdownMenuSeparator`-, visible sólo si `ocultas.length > 0`, y que limpia
todas las columnas ocultas de un saque (no reaparecen Transaction Date/
Applied/Balance porque nunca se ocultan, son las bloqueadas). Con esto el
"clean all" pedido existe en los dos pickers, con el mismo aspecto.

## La tabla de Transactions se achicaba mal en la última columna (2026-09-08)

El otro reclamo -"al final de la última columna la tabla queda rara"- era un
bug real en la tabla principal de Transactions (`src/pages/patients/
Ledger.tsx`), no en `LedgerAllocationTable`. Sus columnas fijas (`COLS.fecha`,
`.paciente`, `.tipo`, `.provider`, `.monto`, `.saldo`) tenían `w-[Npx]` pero
nunca `shrink-0`; dentro del `flex` de la fila, cuando el panel del paciente
deja menos ancho del que la tabla necesita, el navegador las achica a todas
un par de píxeles para que la fila entre en el `min-w-[960px]` del
contenedor -y ese `960px` ya estaba mal calculado: la suma real de columnas
(870) + gaps (`gap-3` × 6 = 72) + el padding de la fila (`px-4` × 2 = 32) da
974, no 960-. El resultado visible: "Balance" recortada a "Balanc", "$85.00"
a "$85.0", en cualquier ancho de pantalla donde el panel lateral del
paciente está presente (o sea, siempre que se mira una ficha).

Se agrega `shrink-0` a las seis columnas fijas -sólo `desc` sigue con
`flex-1`, para que sea la que absorbe el espacio sobra o falta- y se corrige
el mínimo a `min-w-[974px]`. Mismo patrón que ya usa `LedgerAllocationTable`
(sus columnas fijas también llevan `shrink-0`, sólo `desc` es `flex-1`): si
entra, entra completa; si no entra, se ve completa scrolleando -nunca
recortada a la mitad de un carácter-.

## `LedgerAllocationTable`: header que envuelve mal y demasiado gris (2026-09-08)

Julián reportó tres cosas sobre Patient Payment y Credit Adjustment -las dos
pestañas que usan `LedgerAllocationTable`, comparten el componente-:

1. **"Transaction Date" se parte en dos líneas.** Esa columna medía
   `w-[90px]`, pero el label completo necesita ~98px a `12px/600` -medido con
   `canvas.measureText`, no a ojo-. Se sube a `w-[105px]` (y su `px: 105` en
   el array de columnas, para que `anchoMinimo` seguía sumando bien).
2. **La tabla "queda cortada".** Era el mismo síntoma que el bug anterior de
   arriba pero acá no hay squish -esta tabla ya tenía `shrink-0`-: es que el
   header partido a dos líneas hace parecer rota toda la fila. Arreglado el
   punto 1, se resuelve solo.
3. **"La columna principal tiene mucho padding gris."** `desc` es
   `min-w-[160px] flex-1` sin techo: cuando la tarjeta tiene de sobra (7
   columnas por defecto, bastante angostas), todo ese sobrante iba a parar a
   `Description` -llegaba a 317px reales para mostrar textos de ~230px como
   máximo (medido sobre las descripciones más largas de `data/ledger.ts`,
   "Bitewings – four radiographic images")-, y como el header tiene fondo
   gris de fila completa, ese sobrante se veía como una franja gris vacía
   pegada al label. Se le pone techo -`max-w-[240px]`, con margen sobre el
   máximo medido- vía un `pxMax` nuevo en `Columna` (default: el mismo `px`),
   que ahora también arma un `anchoMaximo` para el wrapper de la fila
   (`style={{ minWidth: anchoMinimo, maxWidth: anchoMaximo }}`): la fila deja
   de estirarse más allá de lo que sus columnas realmente usan, así que el
   sobrante de la tarjeta queda como fondo blanco liso *fuera* de la fila, no
   como gris *adentro* del header.

## La tabla de Transactions tenía el mismo bug de `desc`, sin que se notara (2026-09-08)

Julián pidió que esta tabla -la de arriba- tenga "el mismo diseño y la misma
lógica" que la de Transactions. Antes de tocar nada se midió cómo se
comporta hoy Transactions con la ventana más ancha (1536px): su columna
`desc` (`min-w-[220px] flex-1`, sin techo) llegaba a **358px** -peor que los
317px que tenía `LedgerAllocationTable` antes del fix de arriba-. Es el
mismo bug, sólo que a 1280px (el ancho en el que se venía mirando) el propio
`min-w-[974px]` del contenedor ya fuerza scroll y no deja lugar para que
`desc` se estire, así que nunca se notó ahí.

Con eso confirmado, iguales las dos: `COLS.desc` pasa a `min-w-[220px]
max-w-[240px] flex-1` -mismo techo de 240px que ya tiene la de allocation,
tiene sentido: las descripciones salen del mismo `MOVIMIENTOS`- y el
contenedor gana `max-w-[994px]` junto al `min-w-[974px]` que ya tenía (974
+ los 20px extra que el techo de 240 -vs. el mínimo de 220- le agrega). Acá
no hace falta un `anchoMaximo` calculado por JS como en la tabla de
allocation -esta no tiene columnas para ocultar, el número es fijo- así que
alcanza con la clase de Tailwind directamente.

## Vuelta atrás del techo: el contenedor debe abrazar la tabla, no estirarse (2026-09-08)

El fix anterior arregló el gris pero abrió otro: con `max-w-[994px]`/
`anchoMaximo` puestos, el **contenedor** (`rounded-lg border`) seguía siendo
`w-full` -sin clase de ancho, así que ocupa todo el `min-w-0 flex-1` de la
página- mientras el contenido de adentro ya no. Resultado: un borde
redondeado mucho más ancho que la tabla que envuelve, con blanco de sobra
adentro del borde. Julián lo resumió así: *"la clave esta en el rounder de
la tabla"* -el borde redondeado tiene que quedar pegado al contenido, no
estirarse aparte-.

Para resolverlo de raíz se miró el componente real de `dashboard-figma`
(`src/components/ledger/LedgerTransactions.tsx` y `LedgerSection.tsx`, el
mismo Figma pero con sus propios anchos) que Julián señaló como la
referencia -*"en ese diseño las tablas entran mejor"*-. Ahí no hay ningún
techo de `max-width`: `Description` es `min-w-[160px] flex-1` sin tope, y
sus columnas fijas son bastante más angostas que las nuestras (`Date`/
`Patient`/`Provider` en ~112px, `Amount`/`Balance` en 80-96px). El motivo por
el que a ellos no se les nota el gris de sobra es doble: columnas más
angostas de entrada, y el layout alrededor deja menos aire.

Se adoptan las dos partes de esa lógica:

1. **Se sacan los techos** (`max-w-[240px]`/`max-w-[994px]`/`anchoMaximo`/
   `pxMax`) de las dos tablas -vuelven a ser un simple `min-w-[…px] flex-1`
   en `desc`, sin cap, como en la referencia-.
2. **El contenedor (`rounded-lg border`) pasa a `w-fit max-w-full`** en vez
   de ancho completo. `w-fit` lo encoge a lo que su contenido realmente
   necesita -sin nada empujándolo a estirarse, `desc` tampoco tiene motivo
   para crecer más allá de su propio mínimo, ver el punto 3-; `max-w-full`
   evita que se salga del layout cuando la página es angosta, y ahí
   `overflow-x-auto` sigue entrando en juego igual que siempre. Aplicado a
   ambas tablas: el `<div className="... rounded-lg border ...">` de
   Transactions y el `<div className="mt-3 overflow-x-auto">` de
   `LedgerAllocationTable` (éste último por dentro de la card, que sigue
   siendo ancho completo -tiene el título y el botón de Columns, no sólo la
   tabla-).
3. **Anchos de columna medidos de nuevo con `canvas.measureText`** sobre el
   contenido real de `data/ledger.ts` -no copiados literales de
   `dashboard-figma`, que tiene sus propios datos-: `paciente` 110→90,
   `tipo`/`provider`/`monto`/`saldo` bajan proporcionalmente en las dos
   tablas (detalle exacto en el diff, no repetido acá). Con columnas más
   angostas *y* el contenedor abrazando el contenido, `Description` ya no
   tiene ni espacio de sobra para estirarse ni gris para mostrar de más.

## Pasada grande contra las capturas de Confidentally 2.0 (2026-09-08)

Julián pasó tres capturas puntuales -Transactions, y la de allocation dos
veces (Patient Payment y Credit Adjustment, mismo componente)- más una
lista corta de pendientes. Cambios, todos verificados contra esas capturas:

**Columna "Type" de Transactions, con más matiz.** Antes era un lookup fijo
por `tipo` (Charge/Payment/Adjustment/Insurance, un color cada uno). La
referencia distingue paciente de seguro, y cargo de crédito dentro de
Adjustment, y para Charge muestra el código en vez de una etiqueta. Mismo
dato (`tipo` + signo de `monto`), función nueva `detalleTipo()` que deriva
el texto/color -no hace falta tocar `Movimiento` ni `TIPOS`, que siguen
filtrando por las 4 categorías anchas-.

**Paginación en las dos tablas**, componente nuevo `Pagination.tsx` (mismo
patrón que trae `dashboard-figma`, retipeado con nuestros tokens): 8 por
página en Transactions, 5 en la de allocation -mismo tamaño que se veía en
la captura-. El pie "Showing X of Y" ahora cuenta la página, no el total
filtrado.

**Caja de totales de la tabla de allocation**, de la pastilla
`bg-dash-count-bg` a una `<dl>` con borde propio -dos filas, etiqueta con
fondo gris a la izquierda, valor en negrita a la derecha-, calcada de la
`dl` real de `dashboard-figma`.

**Tooth/Surface** pasan de `-` a `—` (em dash) cuando no aplican, para que
lea igual que la referencia.

**Tooltips en las columnas que truncan** (`title` en Patient/Provider/
Description de las dos tablas): con texto más largo que el ancho de la
columna, el navegador ya muestra el texto completo al pasar el mouse.
Probado inyectando una descripción larga a mano en vivo -no hay dato de
prueba tan largo en `data/ledger.ts` todavía-.

**Panel lateral del paciente, colapsable** (`PatientSidePanel.tsx`): botón
nuevo arriba del avatar, sólo visible en desktop -en angosto el panel ya es
compacto por su cuenta-. Colapsado baja a una tira de 56px con nav
icon-only (`title` por accesibilidad) y esconde Start Encounter/Clinical
Mode/General/Contact; son secundarios frente al objetivo real, que es
liberar ancho para las tablas del Ledger. Estado local, no persiste al
cambiar de pestaña del paciente -no pareció necesario agregar un segundo
mecanismo de estado global sólo para esto-.

**Formularios de Payment/Credit/Charge**: "Transaction date" y "Apply to"
pasaban por `grid-cols-2`, que en una card ancha los estira a la mitad del
ancho aunque el contenido sea corto. Pasan a `flex flex-wrap` con un ancho
fijo por campo (200px los selects/fecha, 160 Amount, 320 Visit date, que sí
necesita espacio real). En Patient Payment y Credit Adjustment, Notes sale
de la card de arriba y pasa a su propia card -mismo estilo, debajo de la
tabla de allocation, arriba del footer-. Charge Adjustment no tiene tabla
de allocation ni pidió el split; sólo los anchos de campo.

## Las tablas, esta vez copiando los anchos reales de la referencia (2026-09-08)

Julián marcó que las tablas seguían mal: *"no es como las tablas que te pase
que entran bien sin que tengas que reducir columnas, aparte la tabla en sí
debe ocupar fill container"*. Tenía razón y el error era mío: había leído
`LedgerTransactions.tsx`/`LedgerSection.tsx` del proyecto de referencia pero
no había copiado **lo que más importaba**, sus anchos de columna.

Dos datos concretos que me faltaban:

1. **`useColumns` arranca con `new Set()`** — o sea, **todas** las columnas
   visibles. Nosotros arrancábamos ocultando cinco. El picker de columnas
   ahí es para achicar si querés, no para tapar un default que no entraba.
2. **Sus columnas son mucho más angostas.** En la tabla de allocation:
   `Date`/`Patient` 76, `Provider` 44, `Tooth` 40, `Surface` 48, `Code` 52,
   `Description` `min-w-[88px] flex-1`, `Charge` 56, `Other Credit` 68,
   `Guar Estimate` 76, `Applied` 72, `Balance` 60 — con `gap-1.5` (6px) y
   `px-3`, no `gap-3`/`px-4`. Y el texto es 11px en la cabecera / 12px en
   las filas, no 12/13.

Con esos números las 12 columnas entran en ~890px, que es lo que la card
tiene disponible a 1280 de viewport. Por eso allá no necesitan ocultar nada.

También usan **fecha numérica** (`04/20/2026`) en la tabla de allocation
—por eso les entra en 76px—, mientras que en Transactions va larga
(`May 20, 2026`, columna `w-28`). Se agrega `fechaCorta()` en `data/ledger.ts`
y la tabla de allocation la usa; Transactions sigue con el formato largo.

Cambios aplicados a las dos tablas:

- **`w-full` en el contenedor** (fill container), y `Description` con
  `flex-1` sin techo: cuando sobra ancho lo absorbe la descripción, que es
  justo lo que hace la referencia. Se revierte el `w-fit` de la vuelta
  anterior —era un parche a un problema que en realidad venían causando las
  columnas anchas—.
- **Anchos de la referencia**, adaptados sólo donde nuestro contenido lo
  exige: `Provider` va 72 en vez de 44 (ellos muestran "3 Hyg", nosotros
  "Dr. Elena Martinez"), `Charge`/`Balance` 64 en vez de 56/60 (nuestros
  montos llegan a `$1,270.00`). El resto es literal.
- **Todas las columnas visibles por defecto** en la tabla de allocation.
  El botón "Columns" gana el badge `visibles/total` y el rótulo "Show
  columns", como la referencia.
- Cabecera `text-[11px] py-2.5`, filas `text-[12px] py-2.5` con `border-t`
  (no `border-b` + `last:border-0`), `px-3`, `gap-1.5`. Transactions queda
  en `gap-3`/13px porque tiene 7 columnas y ese es su valor de referencia.

## Panel del paciente colapsado, prolijo y con tooltips (2026-09-08)

La primera versión del colapso quedaba desprolija: se hacía a fuerza de
`lg:hidden` sueltos sobre el layout expandido, sin achicar el padding ni
alinear nada. Se rehízo:

- `lg:w-[60px] lg:p-2`, con el botón de toggle, el avatar (`lg:size-9`), el
  ícono de Clinical Mode y los seis ítems de nav todos en 36×36 y centrados
  (`centerOffset: 0` medido en vivo para los cuatro grupos).
- **Clinical Mode sobrevive al colapso** como ícono: es la acción principal
  del panel, no un dato secundario.
- **Tooltips reales** (`components/ui/tooltip.tsx`, shadcn/Radix recién
  instalado) en cada ítem y en Clinical Mode, sólo cuando está colapsado
  —expandido el ítem ya dice qué es—.
- **`aria-label` cuando está colapsado**: el label va oculto por CSS, así
  que sin eso los links quedaban sin nombre accesible y el tooltip, que es
  puramente visual, no alcanzaba. Detectado leyendo el árbol de
  accesibilidad, que mostraba `link [ref_19]` sin texto.

Colapsar libera 160px reales para la tabla (892 → 1052 a 1280 de viewport).

## Columnas redimensionables y detalle de fila (2026-09-08)

Pedido de Julián: poder achicar/agrandar cada columna a mano para leer datos
largos, y algún modo de ver la fila completa. Eligió "las dos": fila
expandible inline **y** modal.

**Resize** (`useAnchoColumnas.tsx`, compartido por las dos tablas — dos call
sites reales, no una abstracción especulativa). Manija en el borde derecho de
cada cabecera; arrastre con pointer events, y flechas ←/→ mueven de a 16px
para que no quede sólo al alcance del mouse. Los anchos arrancan en los del
diseño y aparece un link "Reset column widths" en el pie apenas se toca algo.
La columna elástica (`Description`) crece con la tabla hasta que se la
arrastra; ahí pasa a ancho fijo (`flexGrow: 0`), que es lo que uno espera al
fijarla a mano.

Dos bugs encontrados armando esto, los dos por la misma causa —la manija vive
dentro de la celda de cabecera—:
1. La celda llevaba `truncate`, y su `overflow:hidden` **recortaba la manija**
   dejándola inclickeable. Se pasa el `truncate` a un span interno y la celda
   queda `relative flex items-center`, sin overflow.
2. `h-full` en la manija daba **17px** (la altura de la caja de línea del
   texto, no la de la fila). Pasa a alto fijo de 28px centrado, y 10px de
   ancho, para tener área de agarre real.

**Detalle de fila** (`LedgerRowDetail.tsx`): click en cualquier lugar de la
fila la despliega abajo con todos los campos (Description arriba, después
Transaction date/Patient/Type/Code/Provider/Status/Tooth/Surface/Amount/
Balance en tres columnas). Adentro, "View full record" abre el mismo
contenido en un `ModalShell`. El click se ignora si cae en el input de
"Applied" o en una manija de resize —si no, tipear un monto abría el
detalle—. Con teclado, Enter/Espacio sobre la fila hace lo mismo.

El modal es de **sólo lectura**: lleva un único botón "Close", no el par
Cancel/Save —que implicaría que hay algo para guardar—. Es la excepción
razonable a la regla de "Cancel y Save siempre juntos", que aplica a
formularios.

## El rail colapsado perdía datos del paciente (2026-09-08)

Julián marcó que al colapsar faltaban "el de information y si el paciente
está activo". Los dos vuelven, adaptados al ancho del rail:

- **Estado**: el pill "Active" no entra en 60px, así que pasa a un punto
  verde sobre el avatar, con `Nombre · Active · 50 years` en el tooltip y en
  el `aria-label`.
- **General/Contact**: botón nuevo con ícono que abre un `Popover`
  (shadcn/Radix, recién instalado) con los dos bloques completos, incluidos
  sus lápices de edición, que siguen funcionando igual que expandidos.

## Manijas de resize: diseño, aviso y límites (2026-09-08)

Julián pidió que la manija se vea mejor y que el sistema avise que la tabla
se puede ajustar; después sumó dos requisitos que resultaron los más
importantes: poder volver una columna a su estado normal, y que ajustar una
columna no empuje a las últimas fuera de la tabla.

**Diseño de la manija.** Antes era una línea de 1px. Ahora es una cápsula de
3px redondeada, gris en reposo, que crece de 16 a 22px y se pinta de azul al
pasar el mouse; arrastrando queda azul de 26px. Mientras se arrastra baja una
**guía vertical** por toda la tabla (`h-[1200px]` recortada por el
`overflow` del contenedor) para ver dónde va a quedar el corte. Una columna
ya tocada a mano deja la manija visible y semiazul, así se distingue de las
que siguen con el ancho de diseño.

**Aviso inicial.** Al montar la primera tabla de la sesión, las manijas se
muestran solas en cascada de izquierda a derecha (`col-hint`, 60ms de
retardo por columna) y en el pie aparece "Drag column edges to resize ·
double-click to reset". Dura 2.4s y corre **una sola vez por sesión**
(bandera a nivel de módulo, no por componente: si no, cada tabla del Ledger
lo repetía). Respeta `prefers-reduced-motion`.

Trampa encontrada acá: la animación estaba con `fill: both`, y eso **deja
fijada la opacidad final (0)** pisando al `group-hover`; las manijas
quedaban invisibles para siempre después del aviso. Se corrió sin `fill`.

**Doble click para volver atrás.** Doble click en una manija devuelve esa
columna sola a su ancho de diseño (`soltarUna`); el link "Reset column
widths" del pie sigue estando para volver todas juntas. Con teclado,
Enter o Backspace sobre la manija hace lo mismo.

**Techo del arrastre.** Es el requisito que más cambia el comportamiento:
ensanchar una columna ya no puede empujar a Balance fuera de la vista
-si hay que scrollear para encontrarlo, se pierde más de lo que se gana-.
El máximo se mide sobre el DOM en el momento de agarrar (así las columnas
ocultas por el picker no entran en la cuenta): espacio libre del contenedor
más lo que la columna elástica pueda ceder hasta su mínimo. Verificado: con
la tabla llena, arrastrar Patient 344px la agranda sólo 70 -hasta que
Description toca su mínimo- y ahí frena, con `scrollWidth === clientWidth` y
Balance entero adentro de la tabla.

## El popover de información abre con el mouse encima (2026-09-08)

En el rail colapsado, el botón de información abría sólo con click. Pasa a
abrir también al pasar el mouse: es información de consulta, no una acción.
El cierre lleva 160ms de retardo para poder cruzar el hueco entre el botón y
el panel sin que se escape, y el panel mismo mantiene abierto mientras el
mouse está encima. Se le sacó el tooltip: con el panel abriéndose solo, el
tooltip se le encimaba y decía menos que el propio panel.

## Datos de estrés y repaso responsive (2026-09-08)

Julián pidió datos más exigentes -descripciones y nombres largos, diente y
superficie cargados, montos hasta USD 10.000- y recordó que todo tiene que
quedar responsive sin cambiar cómo se ve en escritorio.

**Datos.** `data/ledger.ts` suma 10 movimientos (m17-m26) con descripciones
reales de códigos ADA largos ("Implant/abutment supported fixed denture for
edentulous arch – maxillary"), un provider largo ("Dr. Konstantinos
Papadopoulos"), un dependiente nuevo de nombre largo ("Maximiliano
Fernández-Ugarte"), diente/superficie en casi todos -incluida una superficie
de cinco letras (MODBL)- y montos de 1.180 a 9.850. Medido: con estos datos
Description trunca 116-141px y Provider/Patient 31-77px, que es justo lo que
hacía falta para ver el truncado, los tooltips y el ajuste de columnas
trabajando. Las columnas de plata no necesitaron tocarse: `-$9,850.00` mide
71px contra los 80 de Amount, y `$13,123.00` de saldo corrido mide 70 contra
96 de Balance.

**Responsive.** Tres cosas que estaban mal por debajo de `lg`:

1. **Las manijas de resize seguían montadas** en mobile/tablet. Ahí no hay
   hover que las revele, así que eran invisibles, y peor: su `touch-none`
   se comía el gesto de scroll horizontal de la tabla si el dedo caía
   encima. Pasan a `hidden lg:flex`. El aviso de texto y el link "Reset
   column widths" siguen la misma regla, y el aviso ni se gasta abajo de
   `lg` -si no, entrar una vez desde el celular dejaba sin aviso al
   escritorio-.
2. **El detalle de fila nacía del ancho de la tabla** (864px), no del
   visible: en mobile había que scrollear para leerlo, o sea lo contrario de
   para qué está. Ahora va `sticky left-0` con el ancho tomado de
   `--tabla-visible`, una variable que el contenedor publica desde
   `useAnchoVisible`. Verificado: 341 de 341 en mobile, 660 de 660 en tablet,
   y sigue en su lugar con la tabla scrolleada 400px.
3. Un `100vw` no servía para el punto 2 -en tablet el contenedor mide 660
   contra 768 de ventana-, de ahí que la medida salga del contenedor real.

`useAnchoVisible` escucha `ResizeObserver` **y** `resize` de ventana: el
observer cubre los cambios que no vienen de la ventana (colapsar el panel del
paciente) y el evento cubre el de ventana aunque el observer venga demorado.

Escritorio quedó igual: mismos anchos de columna (112/112/96/230/112/80/96),
sin scroll y con las manijas activas.

## Las columnas ceden en vez de desbordar, y "Expand all" (2026-09-08)

Julián marcó que lo responsive era la tabla, no su contenido: con el menú
lateral y el panel del paciente abiertos, la tabla pedía scroll en vez de
entrar. Medido a 1280: el rail abierto son 234px y el panel 218, así que a
la tabla le quedan 758 contra los 864 que necesitaba -106 de más-.

**Mínimos por columna.** Antes las columnas eran `shrink-0`: o entraban o
desbordaban. Ahora cada una tiene un piso (`ANCHO_MINIMO`) y puede ceder
hasta ahí, medido contra el contenido real ("March 17, 2025" 93px, la
pastilla "Ins Payment" 86, "-$9,850.00" 71). El `minWidth` del contenedor
pasa a ser la suma de los **mínimos**, no de los anchos de diseño, así que
el scroll recién aparece cuando ni los mínimos entran.

Una columna movida a mano queda exceptuada: se queda en el ancho que le
dejaron (`flexShrink: 0`), porque si el usuario la fijó no tiene sentido que
el layout se la vuelva a achicar.

Medido en la tabla de Transactions: a **758px entra entera sin scroll**
(columnas 96/93/88/133/93/76/80), a 934 queda idéntica a antes
(112/112/96/228/112/80/96, o sea escritorio sin cambios), y recién por
debajo de ~704 cae en scroll.

**Lo que sigue sin entrar.** La tabla de allocation son 12 columnas con
montos de cinco cifras: sus mínimos suman 755 y en el peor caso (ambos
menús abiertos) el hueco es de ~716, así que ahí todavía scrollea unos
40px. Bajar más los mínimos dejaría Patient en ~44px, que muestra cinco
letras y no es "que se vea bien". Para ese caso está el picker de columnas,
que es justamente para lo que sirve: esconder Tooth/Surface/Other Credit
recupera de sobra. Queda anotado por si Julián prefiere que se auto-oculten.

**Expand all / Collapse all.** Botón nuevo (`BotonExpandirTodo`, compartido)
al lado del título de cada tabla: abre o cierra de una todas las filas de la
página. Opera sobre **la página visible**, no sobre las 26 entradas -abrir
todo un ledger paginado no le sirve a nadie-, y el rótulo alterna según si
ya están todas abiertas.

## El Confibot tapaba Cancel/Save, y tooltip por fila (2026-09-08)

**Confibot.** Vive fijo en la esquina inferior derecha (`fixed right-4
bottom-4`), justo donde caen los Cancel/Save de los formularios de Payment,
Credit y Charge Adjustment: quedaban abajo del FAB y costaba clickearlos. Se
reserva su alto una sola vez, en el `main` del `AppShell`
(`pb-24 sm:pb-28`), en vez de parchear cada pantalla: cualquier control que
termine al pie de cualquier página queda por encima. Verificado midiendo
solapamiento real entre los rects de Save/Cancel y los dos botones del
Confibot: ya no se tocan.

**Tooltip por fila.** Cada fila de las dos tablas muestra al pasar el mouse
un resumen de tres líneas -descripción, después paciente · provider ·
código · diente/superficie, y abajo monto · estado · balance- para leerla
entera sin abrirla. Sale del mismo `Movimiento`, no hay dato nuevo.

Reemplaza a los `title` que tenían las celdas que truncan: con los dos
puestos, parar el mouse sobre Description mostraba **dos tooltips
distintos** -el nativo de la celda y el de la fila-. El resumen incluye el
texto completo de esas columnas, así que no se pierde nada. Los `title` de
las manijas de resize quedan: viven en la cabecera, no en las filas.

Delay de 400ms, para que recorrer la tabla con el mouse no dispare tooltips
todo el tiempo.

## Al ocultar columnas el espacio se reparte, no se apila (2026-09-08)

Julián marcó que al usar el picker de columnas la tabla "debería ir
acomodándose al container, porque si no queda mucho espacio". Medido: con
las 12 columnas, Description está en 94px; al ocultar cuatro, los ~256px
liberados iban **todos** a Description -saltaba a 350px- mientras el resto
quedaba igual de apretado. La tabla llenaba el ancho, pero mal repartido.

Ahora Description tiene techo (`MAX_ELASTICA`) y las demás columnas también
pueden crecer:

- Description conserva un `flexGrow` altísimo (1000) contra 1 del resto, así
  que mientras haya poco excedente se lo lleva prácticamente todo -que es
  como se comporta hoy en escritorio- pero deja de crecer en su techo.
- Pasado ese techo, el sobrante se reparte entre las demás columnas.

Números medidos con las mismas 8 columnas visibles:
`76·76·72·52·350·64·72·64` → `92·92·88·68·240·80·88·80`. El total sigue
llenando el contenedor exacto (892 = 892), pero ahora crecen todas.

El techo se eligió para **no tocar el escritorio**: en Transactions es 280 y
a 934px la columna llega a 230, o sea el mismo valor de siempre
(112/112/96/230/112/80/96 verificado sin cambios). En la de allocation es
240.

## El total de Transactions no se parecía a las otras tablas (2026-09-08)

En Payment y Credit Adjustment el total cierra con una cajita con borde
(`<dl>` de dos filas, etiqueta con fondo gris a la izquierda). En
Transactions, en cambio, el "Balance due" iba como texto suelto al lado de
la paginación, adentro del contenedor de la tabla. Pasa a la misma cajita
con borde, afuera y abajo a la derecha, igual que las otras dos.

## El tooltip de fila parpadeaba (2026-09-08)

Julián: "está muy rápido, no se logra a ver". Medido: con el mouse quieto el
tooltip **no se cierra** -sigue abierto pasados 1,5s-, así que el problema
no era la duración. Lo que pasaba es que Radix trae una ventana de gracia
(`skipDelayDuration`, 300ms por defecto): al pasar de una fila a otra el
tooltip siguiente abre **al instante**, y encima alcanza a mostrar el
contenido de la fila anterior antes de actualizarse -verificado: parado
sobre "BCBS claim" el tooltip todavía decía "Crown – porcelain/ceramic"-.
Barriendo la tabla eso es un parpadeo permanente.

Se pone `skipDelayDuration={0}` -cada tooltip espera su demora completa, no
hay apertura instantánea- y la demora sube a 500ms, para que aparezca sólo
cuando uno se detiene de verdad. Además `sideOffset={8}` lo despega de la
fila: pegado, el puntero le quedaba encima y el tooltip peleaba con su
propio disparador.

## El resumen pasa adentro de la tabla (2026-09-08)

Julián: "el resumen debe estar al finalizar la tabla, no abajo del paginado
ni afuera del background general". En las tres tablas la cajita de totales
colgaba **afuera** del contenedor con borde, debajo de todo. Ahora es la
última sección **adentro** de ese contenedor, separada por su propio
`border-t`, y el paginado queda debajo de ella. De paso, en la tabla de
allocation el pie "Showing X of Y" + paginado también entra al contenedor:
antes estaba suelto afuera, distinto de Transactions.

## El tooltip de fila ya no tapa filas (2026-09-08)

Iba con `side="top"`, y como la fila ocupa todo el ancho de la tabla el
tooltip caía sí o sí sobre la fila de arriba. Pasa a `side="right"`: ahí no
hay lugar -la fila llega al borde derecho- así que Radix lo voltea al margen
izquierdo, **fuera** de la tabla. Medido: el tooltip queda en x 39-311 con la
tabla arrancando en 320, y la lista de filas tapadas da vacía.

Además, con la fila desplegada el tooltip no aparece: el detalle ya está a la
vista y repetirlo flotando encima sólo estorba (`abierta` corta el render del
`Tooltip`, no sólo lo esconde).
