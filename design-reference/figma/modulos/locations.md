# Settings - Locations


## Breadcrumb de Settings (2026-08-30)

Sin breadcrumb, volver a General obligaba a abrir el menu flotante del rail:
la pantalla no ofrecia ninguna salida hacia arriba.

El rastro lo arma **el layout** a partir de la ruta, no cada pantalla -asi hay
uno solo; el problema anterior era justamente que se dibujaban dos-:

- `/settings/locations` -> Settings / Locations
- `/settings/locations/abril` -> Settings / Locations / Abril
- `/settings/finance/carriers` -> Settings / Billing / Carriers
- `/settings/general` -> sin migas (es la raiz)

"Settings" siempre apunta a General. El ultimo tramo es la pantalla actual y
por eso no es link. El back-link "< Abril" del detalle se fue: lo reemplaza el
tramo "Locations".


## Roles & Location: diseno nuevo (Figma 3864:270946)

Cambio entero. Antes eran pares de selects "Rol / Location" con un tacho al
lado. Ahora es una lista de **filas de rol**:

- Nombre del rol y, al lado, cuantas sedes tiene.
- A la derecha: "All locations" con su switch, un separador, el tacho y el
  chevron.
- La fila abierta se marca con borde azul y cabecera celeste, y despliega abajo
  una grilla de cuatro sedes, cada una con su switch. La sede activa lleva
  borde azul.
- Arriba a la derecha, **Add Role**; al pie, Cancel y Save.

### La regla del sistema

**Sin ninguna sede tildada, el rol vale para todas.** Por eso el rotulo dice
"All locations" cuando no hay ninguna seleccionada, y no "0 / 4": cero
seleccionadas no significa que el rol no aplique en ningun lado, significa lo
contrario. El switch "All locations" hace las dos cosas -limpia la seleccion, o
la deja lista para elegir a mano-.

### Modal Assign Role

Usa el modal por defecto de la app, igual que New Patient o New Appointment:
**titulo solo** -22px, sin icono ni bajada-, `SectionCard` para la caja
"Locations" y `FieldLabel` para el rotulo del select y los nombres de las
sedes. La primera version traia icono en caja y subtitulo copiados de la
captura, y quedaba como un modal de otra app.

Adentro: el select de Role obligatorio y el aviso azul de **Global access** que
explica la regla, mas las cuatro sedes con switches en tres columnas.

Al guardar sin tocar ninguna sede, el toast lo dice: "X assigned to all
locations".

**Desviacion:** en la captura del modal, Cancel quedo en el extremo izquierdo y
Save en el derecho. Van pegados, como en todo el sistema y como en la pantalla
de Roles & Location del propio Figma.

Las sedes son las del frame, tal cual, incluido **"Naples Detal"**.

El titulo de la pantalla ahora sigue a la pestana -"Roles & Location",
"Provider Info", "Working Hours"-; solo la primera dice "Employee Information".


### "Global access", no "All locations" (2026-08-31)

La fila del rol y el switch decian "All locations" mientras el aviso del modal
llamaba **Global access** a la misma regla. Nombrar dos veces distinto la misma
cosa es lo que hace dudar: ahora es "Global access" en los dos lados.


## Employees se separa de Locations (2026-09-03)

La ficha de un empleado -Employee / Roles & Location / Provider Info / Working
Hours, Figma 3864:235190- vivia colgada de `/settings/locations/:locId`. Un
empleado no es una locacion, asi que se mudo a **Settings -> Employees**
(`/settings/team`), que hasta ahora era un placeholder "Planned".

- `/settings/team` -> tabla de la plantilla: casilla, nombre con avatar
  (iniciales, no foto -ningun otro avatar del sistema usa fotos-), fecha de
  nacimiento, email, pill "Is Provider" y pill de estado. Con busqueda,
  seleccion multiple y kebab por fila.
- `/settings/team/:employeeId` -> la ficha de siempre, sin cambios de
  contenido, solo de direccion.

`/settings/locations/:locId` queda libre para lo que le corresponde: el flujo
real de una locacion.

## El flujo real de una locacion (Figma 3864:277885)

Cuatro pestanas: **Information / Working Hours / Rooms / Exceptions**.

### Information

General Information (Location Name*, Abreviattion*, Preferred Location Fee
Schedule), Contact Information (Country Code*, Number*, Email) y Adress
Information (Address line 1*/2*, City*, State*, Zip Code*, Country*, Time
Zone*). Mismos campos y mismas opciones que el modal "New Location" -se
exportaron sus constantes para no duplicarlas-.

### Working Hours

Tabla Day / Status / Hours: un switch Open/Close por dia y, si esta abierto,
las franjas horarias como pills. Con mas de dos franjas aparece un chip
**"+N" que se despliega** -regla del sistema: ningun "+N" se queda sin
mostrar lo que cuenta-. "Edit hours" abre el modal.

**El frame salta el martes** en la lista de dias -domingo, lunes, miercoles,
jueves, viernes, sabado-. No se replica: un dia ausente de la semana es un
error de contenido, no una decision de diseno.

**Cuando un dia abierto no tiene horas cargadas**, la fila muestra
"+ Add New Hour" en vez de quedar vacia.

#### Modal "New Availability" (4620:115332)

Lo abre el boton "Edit hours" -el titulo del modal no coincide con el rotulo
del boton que lo abre; se replica tal cual-. Mas chico que "New Hours"
(3864:267207, el de la ficha de empleado): sin el aviso ambar y sin selector
de locacion -ya se esta adentro de una-, y el alcance tiene **dos** opciones
en vez de tres: "Only this day" / "All linked days".

### Rooms

Vacio por defecto: "No Rooms" con el icono de punto del EmptyState del
sistema, y "+ Add Room" en el encabezado, no dentro del panel. Al cargar
salas, cada una es una card con icono de puerta, Type y Abbreviation.

**Rooms — Populated (3864:310040) repite "Daniel Anderson"** -el nombre de un
empleado- como nombre de sala, tres veces, con Type y Abbreviation en blanco.
No se replica: es un placeholder de otro componente pegado en el lugar
equivocado, no contenido real. El icono de persona que trae esa card tampoco
-una sala no es una persona-, se usa un icono de puerta.

#### Modal "New Room" (3864:306314)

Name*, Abreviattion* (typo del frame) y Type.

### Exceptions

Lista de filas: punto de estado, nombre, fecha con icono de calendario,
chevron para editar y tacho para borrar. El chevron abre el mismo modal
precargado.

**Exceptions (3864:313606) repite "Radiological Assessment" con la misma
fecha diez veces.** No se replica: mismo caso que las salas, un placeholder
sin contenido real detras.

#### Modal "New Exception" (3864:317345)

Name*, Abreviattion*, Reason, y un recuadro con Start Time* / Date* / End
Time* / "All day exception". Los iconos de basura y guardar que trae ese
recuadro son redundantes con Cancel/Save del pie -asi esta en el frame-, se
dejan con la misma accion.


## Tres detalles corregidos (2026-09-03)

- **Las pills de horario llevan la cruz para quitar esa franja** -se me habia
  quedado afuera al armar la tabla-. Cada `×` borra solo esa franja; si era la
  ultima del dia, el dia vuelve a Close solo.
- **Las cards de Rooms suman editar y borrar.** El icono de lapiz abre "New
  Room" precargado -el titulo cambia a "Edit Room", que no viene del frame
  pero es la misma convencion que ya usan Assign Role y New Exception para
  este mismo patron-; el tacho borra la card con su aviso.
- **El checkbox de "All day exception" pasa a ser el `OptionCheckbox` del
  sistema.** El que arme a mano tenia el cuadrito en `rounded` (4px) con un
  punto blanco; el del sistema es `rounded-[3px]` con el tilde de `Check`,
  que es el que usan New Patient, Add Relationship y el resto de las casillas
  con rotulo largo.


## New Employee (2026-09-03)

Settings -> Employees sumo el boton **"+ New Employee"**, alineado a la
convencion del resto del sistema: mismas tres cards que "New Location"
-General / Contact / Address Information- y las mismas listas de pais,
codigo de pais y estado, exportadas de `NewLocationModal.tsx` para no volver
a escribirlas. `DateField` gano un `placeholder` opcional -"Birthdate" en vez
del "Pick a date" por defecto- para calzar con el contenido de la captura.

## Link Person en la ficha del empleado (2026-09-03)

La ficha de un empleado -tab Employee, card "General Information"- traia un
bloque suelto que no encajaba ahi: "Search Procedure or category" con un
"+ Add new" que solo abria un toast "not available in this release". Buscar
un procedimiento no tiene sentido en la informacion general de una persona;
era contenido de otra pantalla clonado por error.

Se reemplaza por el flujo de "vincular una persona que ya existe en el
sistema" que la propia `LinkPersonCheckbox` ya prometia pero no hacia nada
-el checkbox estaba ahi, decorativo, en este mismo lugar y en el de "New
Employee" y "New Patient"-:

- Tildar el checkbox despliega un campo **Person\*** con buscador.
- El buscador filtra sobre `EMPLEADOS` -no un directorio aparte- **filtrado a
  los que ya son provider** (`esProvider: true`), sin incluir a la persona
  cuya ficha se esta mirando. Es la idea de fondo: esto vincula el registro a
  un provider que el sistema ya tiene cargado, no crea uno nuevo.
- Cada resultado es una card chica (avatar, nombre, DOB) igual a las de
  Relationships; al elegir una queda una card mas grande con fondo celeste y
  borde azul -`bg-[#eff6ff] border-dash-blue`, el mismo tono que ya usa
  `ClinicalPopover` para "Prescribed"- con el nombre en mayusculas y DOB +
  Email en una sola linea.
- El boton cuadrado azul al lado del buscador -icono `Delete`, el mismo de
  "backspace"- limpia texto y seleccion juntos; la "x" de adentro del campo
  solo borra el texto.

`LinkPersonCheckbox` no cambio: ya traia el estilo correcto -borde azul
tildado, el default del sistema-, faltaba nada mas la logica detras.

Dos ajustes mas sobre el mismo flujo, del mismo dia:

- **Los campos manuales se ocultan al tildar el checkbox.** First Name / Lasr
  Name / Email / Birthdate quedaban debajo del buscador aunque esos datos ya
  los tiene el sistema -se ven en la card del provider elegido-. Mostrar los
  dos a la vez duplicaba la misma informacion; ahora el grid de los cuatro
  campos solo aparece con el checkbox destildado.
- **Espaciado parejo en Location -> Information.** El wrapper de `Card`
  (`src/components/settings/primitives.tsx`) no le pone gap a sus hijos: dos
  bloques seguidos -el input de arriba y el grid de abajo- quedaban pegados
  sin aire, mas visible entre "Location Name" y "Abreviattion" pero tambien
  entre "Country Code"/"Number" y "Email", y entre la grilla de "Adress
  Information" y "Time Zone". Se corrige con el mismo `mt-4` que ya usa
  Employees en este mismo lugar (`Card title="Contact Information"` ->
  "Extension"), no un componente nuevo.

## Exceptions: fecha y horas por desplegable (2026-09-03)

Start Time / End Time y Date eran texto libre ("00:00 hs", "DD / MM / YY").
Pasan a componentes del sistema:

- **Date**: el `DatePicker` de shadcn que ya usa el resto de la app -mismo
  calendario que Scheduling-, no un campo de texto con mascara.
- **Start Time / End Time**: un `SelectField` con la grilla de cada media
  hora (00:00 a 23:30), el mismo desplegable que usan los selects de
  cualquier otro formulario.

Los dos campos ademas **dejaron de verse deshabilitados** cuando "All day
exception" esta tildado -tenian `opacity-50` puesto, y ademas se podia
seguir tipeando adentro, asi que el aspecto no coincidia con el
comportamiento-. Siguen sin ser obligatorios en ese caso, pero ya no
parecen apagados.

## Kebab de Employees: el menu "Actions" (2026-09-03)

El kebab de cada fila abria un menu de dos lineas propio. Se reemplaza por el
que paso Julian: titulo "Actions", "Edit Employee" en negro con lapiz, y
cuatro acciones en rojo con el icono de "prohibido" -Delete Employee, Suspend
Employee, Terminate Employee, Disable- mas "Remove Provider Role" con tacho.

- **Delete Employee** es la unica que hace algo de verdad: borra la fila,
  como el "Remove" que reemplaza.
- **Suspend / Terminate / Disable** necesitan un estado de cuenta que el
  sistema todavia no modela -activo/suspendido/terminado-, asi que quedan
  como aviso "no disponible en esta version", igual que el resto de las
  acciones sin backend real en la app.
- **Remove Provider Role** no borra a la persona: le apaga el flag
  `esProvider` y la pill "Is Provider" pasa a "No". Si hiciera lo mismo que
  Delete, dos items del mismo menu tendrian la misma accion.

## Working Hours: el switch en azul (2026-09-03)

El rotulo "Open" iba en verde (`#1a804d`). El switch ya usa azul para el
estado activo -el mismo pill que todo el sistema-; el texto pasa a
`dash-blue` para no meter un segundo significado -verde, que la app reserva
para "Active" / "Completado"- sobre el mismo control.

## "Is Provider" destraba tabs, no solo un dato (2026-09-03)

Las cuatro tabs de la ficha -Employee, Roles & Location, Provider Info,
Working Hours- estaban siempre ahi, tuviera sentido o no: alguien de
mostrador (`esProvider: false`) veia igual "Provider Info" y "Working Hours",
vacias de significado para su rol.

Ahora **Provider Info y Working Hours solo existen si "Is Provider" esta en
Yes**. Tildar el switch:

- Hace aparecer las dos tabs con un pop -`@keyframes tab-in` en
  `src/index.css`, la misma curva que ya usa `fab-panel-in`- para que se lea
  como "esto se acaba de destrabar", no como que la pantalla se reordeno
  sola.
- Dispara un toast confirmando que quedaron disponibles.

Si estabas parado en una de esas dos tabs y alguien te saca el "Is Provider"
-hoy no pasa por la UI real, el switch solo vive en la tab Employee, pero
queda cubierto por si el control se mueve mas adelante-, vuelve a Employee en
vez de dejarte mirando una tab que ya no deberia existir.

## Birthdate y horarios: los inputs de fecha/hora que ya existian (2026-09-03)

Dos inputs se habian quedado en texto libre cuando el resto del sistema ya
tenia el componente correcto:

- **Birthdate de la ficha del empleado** (`Employees.tsx`, tab Employee) era
  un `TextField` comun. Pasa a `DateField` -el mismo calendario que usa
  "New Patient" y "New Employee" para nacimiento, que abre en un año
  plausible en vez del mes actual-.
- **Start Time / End Time de "New Availability"** (`LocationHoursModal.tsx`,
  el popup de "Edit hours" en Working Hours de una locacion) **y de "New
  Hours"** (`NewHoursModal.tsx`, el de la ficha de un empleado -en ese momento
  sin uso real en la UI, pero con el mismo problema; se conectó después, ver
  más abajo-) eran texto libre igual que
  Exceptions antes de corregirlo. Pasan al mismo `SelectField` con la grilla
  de cada media hora (`HORAS`, 00:00 a 23:30) que ya usa `NewExceptionModal`.

## Abrir un dia dispara el popup de horas (2026-09-03)

Tildar el switch de un dia cerrado lo pasaba a "Open" pero sin franjas
cargadas: quedaba en `sinHoras` y habia que apretar aparte "+ Add New Hour"
para recien ahi ver el popup. Un paso de mas para algo que siempre termina en
el mismo lugar.

Ahora, si el switch pasa a Open y el dia no tiene franjas (`dia.rangos.length
=== 0`), "New Availability" se abre solo, con ese dia ya marcado en "Repeat on
days". Cerrar un dia no cambia -sigue vaciando sus franjas, como siempre-, asi
que en la practica esto cubre todos los casos reales: no hay forma de terminar
con un dia recien abierto que ya tenga horas cargadas.

## "New Location" pasa a pantalla completa (2026-09-03)

Era un modal (`NewLocationModal.tsx`) sobre la lista de locaciones. Ahora es
su propia ruta -`/settings/locations/new`, `SettingsNewLocation` en
`NewLocation.tsx`- con el breadcrumb de siempre (`Settings > Locations > New
Location`) como camino de vuelta a la lista, en vez de un botón "Cancel" que
sólo cierra un overlay.

El contenido no cambió: las mismas tres cards -General / Contact / Address
Information-, los mismos catálogos. Esos catálogos (`PAISES`, `CODIGOS`,
`ESTADOS`, `ZONAS`, `FEES`) se movieron a `src/data/location-options.ts` -ya
no tenía sentido que vivieran en un archivo que se llama "Modal" y ya no es
uno-; `LocationDetail.tsx` y `NewEmployeeModal.tsx`, que sólo usaban esas
constantes, apuntan al nuevo archivo.

El primer pase dejó un `max-w-[860px]` heredado del ancho que tenía el modal
-tenía sentido ahí, centrado sobre un overlay; en una pantalla propia sólo
angostaba el contenido contra el borde izquierdo, cards e inputs incluidos-.
Se sacó: ahora ocupa el mismo ancho que la pestaña Information de una
locación, que es la referencia -mismo wrapper `flex flex-col gap-4` sin tope,
ninguna de las dos pantallas lo tiene.

## "Add new hour" de la ficha de un empleado abre "New Hours" (2026-09-03)

Figma 3864:267207 "New Hours" -aviso ámbar, selector de locación, rangos
horarios, días de repetición, alcance del cambio- ya estaba construido en
`NewHoursModal.tsx`, pero **no colgaba de ningún botón**: el "+ Add new hour"
de la tab Working Hours de un empleado (`Employees.tsx`) sólo mostraba un
toast "not available in this release". Se conecta al modal real, que ya tenía
resueltos los Start/End Time como desplegable (ver más arriba) en vez de
esperar a que se usara para recién ahí notar que estaban en texto libre.

## Working Hours de una locación, roto en desktop ancho (2026-09-03)

La fila usa `grid-cols-[140px_140px_1fr]` -Day / Status / Hours-, sin tope de
ancho. En una ventana angosta no se nota, pero a 1440px la columna Hours se
estira a ~900px: las franjas quedan agrupadas a la izquierda y "Edit hours"
-que llevaba `ml-auto`- terminaba solo, pegado al borde derecho, con un vacío
enorme en el medio que lo desconectaba visualmente de las franjas que dice
editar.

Se saca el `ml-auto`. Ahora "Edit hours" sigue directo a la última franja
-o al chip "+N"-, como ya hacía "Add New Hour" en un día sin franjas: la fila
se lee de izquierda a derecha, con el espacio sobrante quedando *después* del
contenido, no partiéndolo en dos.

## "New Employee" pasa a pantalla completa (2026-09-03)

Misma conversión que "New Location", misma razón: era un modal
(`NewEmployeeModal.tsx`) sobre la tabla de empleados, ahora es su propia
ruta -`/settings/team/new`, `SettingsNewEmployee` en `NewEmployee.tsx`- con
el breadcrumb (`Settings > Employees > New Employee`) como vuelta a la lista,
sin tope de ancho. El contenido no cambió: las mismas tres cards, los mismos
catálogos de `location-options.ts`. `Employees.tsx` cambió el botón "+ New
Employee" de `onClick` con estado local a `Link`, igual que "+ New location"
en su momento.
