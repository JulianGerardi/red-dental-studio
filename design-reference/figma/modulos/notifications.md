# Notifications (pantalla nueva, 2026-09-29)

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
