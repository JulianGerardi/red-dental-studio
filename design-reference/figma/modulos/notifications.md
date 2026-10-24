# Notifications (pantalla nueva, 2026-09-29)

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)):

- Epics: CON-3611 Alerta
  ([historias](https://confidetally.atlassian.net/issues?jql=parent%20in%20%28CON-3611%29%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20AND%20%28labels%20is%20EMPTY%20OR%20labels%20%21%3D%20%22design-system%22%29%20ORDER%20BY%20created%20DESC))

Pedido de Julián: una sección con **todas** las notificaciones, donde cada una
se pueda marcar como **leída, pendiente o no leída**, siguiendo la lógica del
Inbox de Notion y manteniendo el estilo de la app. Se entra desde la campana
con **View all notifications**. Código: `src/pages/Notifications.tsx`
(pantalla y `FilaNotificacion`), `src/data/notificaciones.ts` (datos y
tiempos) y `src/data/notificacionesStore.tsx` (estado compartido). No hay
nodo de Figma: se diseñó sobre las piezas que ya tiene la app.

## 1. La lógica, tomada del Inbox de Notion

- **Filtros como pestañas:** *Inbox* (leídas y sin leer, lo que Notion llama
  "Unread and read"), *Unread* ("Unread only") y *Archived*. Cada una con su
  número, con el `Tabs` estándar.
- **Abrir una notificación la marca leída** y lleva a donde pasó (su `to`),
  como en Notion. Si estaba oculta del banner, vuelve a él.
- **Se archiva lo que ya no hace falta ver**, no se borra: sale del Inbox y
  queda en Archived, de donde se puede devolver (*Move to inbox*).
- **Acciones en lote** como las de Notion: *Mark all as read* (botón a la
  vista), *Archive read* y *Archive all* (en el menú ⋮ de al lado).
- **Agrupadas por fecha:** Today, Yesterday, This week, Older, de la más
  nueva a la más vieja. Notion agrupa por página; acá lo útil es el tiempo.

## 2. "Pending": lo que Notion no tiene

Julián pidió marcar como **pendiente**. En Notion no existe; acá sí hace falta
porque las notificaciones de la app son tareas (firmar, confirmar un turno,
verificar un seguro). Es un tercer estado, no una marca aparte:

- **Unread** → no se vio. Punto azul, fondo apenas azul, título en negrita.
- **Read** → vista y resuelta. Texto más apagado.
- **Pending** → vista, pero queda para hacer. Se marca como las sin leer
  pero en amarillo: punto `amber` y fondo amarillo tenue (`warn-bg`), título
  en negrita. Al principio llevaba una etiqueta *Pending* (Pill); Julián pidió
  sacarla (2026-09-29): el color alcanza y la etiqueta desalineaba la fila.

Abrir una pendiente **no** le saca el pendiente: sólo el que la marcó sabe
cuándo está resuelta. *Remove from pending* la pasa a leída. Tiene su propia
pestaña, *Pending*.

## 3. La fila

- **Todo en una línea:** el punto, el centro del ícono (36px), el título y
  los íconos de acción comparten la misma altura de centro (18px desde
  arriba). Verificado midiendo la fila dibujada.
- Punto azul si está sin leer; ícono en círculo, **ámbar si es una tarea** y
  gris si es un aviso (un pago recibido, una mención).
- Título, detalle y abajo "hace cuánto · quién · acción" (*Review*, *Open
  referral*…): la acción es el link a donde lleva, el mismo texto del banner.
- **Acciones al pasar el mouse**, como en Notion: leída/no leída (sobre
  abierto o cerrado), pendiente (reloj, ámbar si está activo) y archivar.
  Con el teclado aparecen al llegar a la fila (`focus-within`); en pantallas
  chicas quedan siempre a la vista.
- **Cada ícono con su tooltip** (el oscuro de la app, como en el menú del
  paciente): dice qué hace antes de tocarlo -*Mark as read*, *Mark as
  pending*, *Archive*…-.
- **Sin menú ⋮ en la fila** (pedido de Julián, 2026-09-29): repetía las mismas
  tres acciones de los íconos. El ⋮ de arriba, junto a *Mark all as read*, se
  queda: ahí están *Archive read* y *Archive all*, que no tienen otro lugar.

## 4. Undo en todo lo que saca cosas de la lista

Regla del proyecto (toda eliminación lleva Undo): archivar una, *Archive
read*, *Archive all* y *Mark all as read* avisan con un toast y **Undo**, que
devuelve cada notificación exactamente a como estaba (estado y archivo). Las
marcas de una sola (leída, pendiente, no leída) no llevan toast: el cambio se
ve en la fila y se deshace con la misma acción.

## 5. Vacíos

Cada pestaña dice qué significa estar vacía y qué hacer: *You're all caught
up* (Inbox), *No unread notifications* (Unread, y dónde quedó lo que se dejó
para después), *Nothing pending* (cómo marcar algo pendiente) y *No archived
notifications*.

## 6. La campana, alineada con la pantalla

- El número es **cuántas hay sin leer** (antes, cuántas tareas había). Es lo
  que muestra Notion y baja a medida que se leen.
- Muestra las **5 más nuevas** no archivadas, con el punto azul, la hora y la
  punto amarillo de las pendientes; *Mark all as read* arriba y **View all notifications**
  abajo, que lleva a la pantalla.
- Abrir una desde la campana la marca leída, como en la pantalla.

## 7. El banner sigue siendo de tareas

El banner de arriba muestra las **tareas** sin resolver: las que son tarea y
están sin leer o pendientes, no archivadas y no sacadas con la X. Leer una
tarea (o archivarla) la saca del banner. Con los ejemplos arranca en "1 of 4"
(firma, derivación, seguro y el llamado para confirmar el turno); verificado
que *Mark all as read* lo deja en "1 of 2" (quedan las pendientes).

## 8. Estado compartido, en memoria

Campana, banner y pantalla leen el mismo store (`NotificacionesProvider` en
`App.tsx`, y en `pantalla.tsx` para el design system). Como el de pacientes,
**no se guarda entre recargas**: es un prototipo y la demo tiene que arrancar
siempre igual.

## Verificado (2026-09-29)

Campana con "4 unread" → View all → `/notifications` con 12 en cuatro grupos;
leída/pendiente/archivar desde el hover cambian los números de las pestañas y
de la campana; Undo devuelve lo archivado; *Archive read* archivó 8 con Undo;
en Unread, abrir "Referral expires today" llevó a Treatments y la marcó leída.

## Design system (2026-09-29)

Documentado con la misma estructura que Elements (Buttons, Patient menu),
pedido de Julián: descripción corta (qué es, estados y tipos, "Probalo"),
**Playground** primero con sus *Controls* (título, detalle, estado, tipo,
archivada, hace cuánto, autor y, en *Preview*, dejar las acciones a la
vista), y después **Parts** (la fila con una tabla de qué hace cada parte),
**States** (Unread, Read, Pending, Archived, Hover y Keyboard focus),
**Types** (Task, Notice, Mention), **Row actions** (los seis íconos con su
nombre) y **Specs** (medidas leídas de la fila dibujada, tokens y reglas).
La pantalla completa está en Pages › Notifications.

Para el estado *Keyboard focus* se sumó `focus-within` a `Forzar` (kit del
design system) y un anillo azul de foco a los íconos de la fila, que no
tenían estilo propio de foco.


## Íconos de un solo color y variantes (2026-10-03)

1. **El ícono es gris en todas las notificaciones** (`surface-slate` /
   `ink-slate`) y sólo se pone ámbar cuando está **pendiente**, junto con el
   punto y el fondo. Antes las tareas eran ámbar siempre: mezclaba dos
   significados en el mismo color. Igual en la campana.
2. **Design system**, variantes y estados que faltaban:
   - *Variants*: cada estado con cada tipo (unread, read y pending × task y
     notice) y las archivadas (read, unread, pending).
   - *States*: hover en leída, sin leer y pendiente; foco de teclado en una
     acción y en la fila.
   - *Content*: texto largo, con y sin autor, y cómo se escribe el tiempo
     (Just now, 25m ago, 3h ago, Yesterday, 4d ago, fecha).
   - *Empty states*: el vacío de cada pestaña.
   - En el celular las acciones quedan a la vista: lo muestra *Guidelines ›
     On each device*.

3. **Todo eso también en la app.** Los datos de ejemplo suman lo que faltaba
   para ver cada caso en la pantalla real: una de "Just now", una tarea leída,
   un aviso pendiente, un texto largo con autor y tres archivadas (leída, sin
   leer y pendiente).
4. **Move all to inbox**, en el menú de la pantalla, con Undo: devuelve todas
   las archivadas. Con eso cada pestaña se puede vaciar en un paso y ver su
   vacío: *Mark all as read* (Unread), *Archive all* (Inbox y Pending) y *Move
   all to inbox* (Archived).

## Cards con sombra, sin borde (2026-10-06)

Julián pidió que en toda la app las cards generales lleven la sombra de los paneles del Dashboard en vez de stroke.
En Notifications: la lista. Las cards de adentro siguen con borde fino y sombra suave (`InnerCard`). Ver *Elements / Cards*.

## Filtro de fecha para cuando hay muchas (2026-10-12)

Pedido de Julián: con muchas notificaciones la lista se vuelve difícil de recorrer; propuso un input de fecha para
filtrar. Código: `ui/date-filter.tsx` (`DateFilter` y `DateFilterPanel`), la pantalla y `data/notificaciones.ts`.

1. **Un solo campo para un día o un rango.** Un clic en un día filtra ese día (lo que pidió Julián: "un input de
   fecha"); un segundo clic cierra el rango, en cualquier orden. Se eligió así y no un `DatePicker` de un día porque
   casi nunca se recuerda el día exacto en que llegó algo ("la semana pasada", "a principios de mes"), y no dos
   campos *From / To* porque son dos popovers para algo que se resuelve en uno. Mientras se elige el segundo día, el
   rango se ve hasta el día bajo el mouse y abajo dice *Now pick the end date.*
2. **Atajos:** *All dates* (sin filtro), *Today*, *Yesterday*, *Last 7 days*, *Last 30 days*, *Last 90 days*. Ventanas
   que corren (no "This month"): se entienden sin pensar en qué día del mes es. Tocar uno aplica y cierra.
3. **Se aplica al tocar**, sin *Apply*, como *Filter*. El campo dice *All dates* sin filtro; con fechas se pinta de
   azul (el mismo lenguaje que *Filter* con algo aplicado), dice el atajo o las fechas ("Oct 3", "Sep 10 – Sep 20",
   con año sólo si no es el actual) y lleva una ✕ para sacarlas sin abrir el panel.
4. **El calendario ayuda a elegir:** punto en los días que tienen notificaciones de la pestaña abierta (como el
   `DatePicker` del Dashboard) y los días que vienen deshabilitados, con la flecha al mes siguiente escondida cuando no
   hay nada adelante.
5. **Dónde va:** en la fila de las pestañas, a la derecha. Pestañas y fecha cambian qué se ve, así que van juntas; las
   acciones (*Mark all as read*, ⋮) siguen arriba, junto al título. En el celular la fecha baja debajo de las pestañas
   y el panel pone los atajos en una tira arriba del calendario (con 12px de aire al borde).
6. **Las fechas acotan todo lo de abajo:** los números de las pestañas, la lista y las **acciones en lote**. *Mark all
   as read*, *Archive read*, *Archive all* y *Move all to inbox* actúan sobre lo que se ve en esas fechas, como en
   Gmail con una búsqueda: lo que se ve es lo que se toca. El toast dice cuántas y tiene Undo, así que el alcance
   queda claro y se deshace. La campana y el banner no cambian: siguen contando todo.
7. **Vacío con fechas:** dice qué no hay en esas fechas según la pestaña (*No unread notifications on these dates*…)
   y ofrece **Clear dates**, para no quedar en una lista vacía sin saber por qué.
8. **Grupos por mes.** Lo de más de una semana ya no cae en un solo *Older*: va en *Earlier this month* y un grupo por
   mes (*September*, *August*; con año si es otro). Con muchas notificaciones es lo que permite ubicarse al recorrer.
9. **Días de calendario, no 24 horas.** *Today*, *Yesterday* y *This week* se cuentan por día de calendario (antes,
   por horas: algo de hace 20 horas caía en Today aunque hubiera llegado ayer). Así el grupo *Today* y el atajo *Today*
   muestran lo mismo; "Yesterday" y "4d ago" de la fila también siguen el calendario.
10. **Más historial en los datos de ejemplo** (`HISTORIAL`, 27 de los últimos dos meses y medio: reportes semanales,
    pagos, cancelaciones, menciones, tres archivadas y una pendiente vieja). Todas leídas o pendientes y ninguna tarea:
    la campana (6 sin leer) y el banner ("1 of 4") no cambian. Inbox pasa a 40.

**Para validar con usuarios:** si recepción busca más por fecha o por paciente (si es por paciente, el paso siguiente
es un buscador de texto en la misma fila); si se entiende que *Mark all as read* con fechas elegidas toca sólo esas;
y si los atajos alcanzan o falta *This month*.

Verificado (2026-10-12): *Last 7 days* deja Inbox en las de la semana y saca los reportes semanales; dos clics arman
"Sep 10 – Sep 20" y en Unread el vacío ofrece *Clear dates*; en celular el panel entra con los atajos arriba. E2E en
`tests/notifications.e2e.ts`. Design system: *Elements / Date filter* (Playground, Parts, States, Open, Specs) y los
vacíos con fechas en *Pages / Parts / Notifications → Empty states*.

**2026-10-12, después:** el campo y el calendario del filtro pasan a ser los del `DatePicker` (`fechaTriggerClasses` y
`MonthCalendar`), así el Dashboard y Notifications no se vuelven a separar. Ver `dashboard.md` (2026-10-12).

## Sin Pending ni Archived, el ojo y el banner de punta a punta (2026-10-13)

Julián mandó una captura de cómo tiene que quedar la pantalla y tres pedidos:

1. **No va más Pending ni Archived.** Quedan dos estados (*unread* y *read*) y dos pestañas (*Inbox* y *Unread*). Se
   fueron el estado pendiente (punto y fondo amarillos, el reloj), archivar y sus acciones (*Archive*, *Move to inbox*,
   *Archive read*, *Archive all*, *Move all to inbox*) y sus vacíos. Las secciones 2, 4 y 5 de arriba quedan como
   historia.
   - **El menú ⋮ de arriba se sacó:** sólo tenía acciones de archivar y quedaba vacío (en la captura todavía se ve).
     *Mark all as read* sigue, con Undo.
   - **Los datos:** las cuatro pendientes de ejemplo pasan a otro estado. Las dos que son tareas (*Insurance
     verification pending* y *Call to confirm tomorrow's appointment*) quedan **sin leer**, porque siguen por hacer y
     así siguen en el banner ("1 of 4", como en la captura). Las dos que eran avisos (*New fee schedule from Delta
     Dental* y *from Northwind*) quedan leídas. Las seis archivadas se borran de los ejemplos (en la captura no
     aparecen). Inbox queda en 40, como en la captura, y Unread en 8 (la captura dice 6: no contaba esas dos tareas).
   - **El banner** muestra las tareas sin leer que no se ocultaron con la X.
2. **La acción de la fila es un ojo:** *Mark as read* con el ojo abierto en las sin leer y *Mark as unread* con el ojo
   tachado en las leídas, con su tooltip. Es la única acción de la fila; aparece al pasar el mouse o con Tab, y en el
   celular queda a la vista.
3. **El banner amarillo va de punta a punta** del contenido, con la X sola a la derecha (ver `header-sidebar.md`,
   2026-10-13).

La bajada de la pantalla pasa a *Open one to go where it happened, or mark it as read or unread.* La campana pierde el
amarillo de las pendientes. Verificado: pestañas *Inbox (40)* y *Unread (8)*; el ojo pasa Unread de 8 a 7 y la deja
como estaba al volver; banner y lista del mismo ancho. E2E en `tests/notifications.e2e.ts`. Design system: *Pages /
Parts / Notifications* (estados, variantes, el ojo en *Row actions*, specs y reglas) y *Components / Layout /
NotificationBanner*.

**Para validar con usuarios:** sin *Pending*, ¿recepción usa "sin leer" para lo que queda por hacer, o le falta una
forma de dejar algo para después? Y si el ojo se entiende como "marcar leída" sin el tooltip.
