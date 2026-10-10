# Settings - Employees

## "Link existing person" no hacía nada en "New Employee" (2026-09-07)

Comparando contra un proyecto hermano armado sobre el mismo Figma (ver
[[red-clone-dashboard-figma-sibling]] en memoria) apareció el mismo bug de
los dos lados: el checkbox "Use this option only to link a person that
already exists..." se mostraba en "New Employee" pero no hacía nada -sin
buscador, sin ocultar los campos manuales-. La ficha de un empleado ya
existente (`SettingsEmployeeDetail`, tab Employee) sí lo tenía bien resuelto
desde antes.

Se extrajo esa lógica a un componente compartido -`LinkExistingPerson`,
`src/components/settings/LinkExistingPerson.tsx`- usado ahora por los dos
lugares: checkbox + buscador sobre providers (`EMPLEADOS` filtrado) + card
del seleccionado, ocultando First/Middle/Last/Email/Birthdate mientras está
tildado -mismo criterio que ya regía en la ficha de empleado-.

En "New Employee" la validación de obligatorios cambia según el checkbox:
tildado, alcanza con haber elegido a alguien (`vinculado`); destildado, vuelve
a pedir los cuatro campos manuales.

## Catálogos de país/estado incompletos (2026-09-07)

`ESTADOS` en `data/location-options.ts` tenía sólo 4 estados de EE.UU.;
`CODIGOS` no tenía México pese a que `PAISES` sí lo listaba. Se completan los
50 estados y se empareja País/Código (se suma Canadá y México a los dos).
Mismo catálogo, usado por "New Location", "New Employee" y la pestaña
Information de una locación.

## "New Employee" vuelve a abrirse encima de la lista, como drawer (2026-10-06)

Julián pidió que todo pop up sea un drawer con los pasos de Confidentally 2.0. New Employee deja de ser una pantalla:
`components/settings/NewEmployeeDrawer.tsx`, lg, con los pasos **General** (casilla para vincular a alguien que ya
existe o nombre, nacimiento y email), **Contact** y **Address**. Con la casilla tildada, Next Step queda deshabilitado
hasta elegir a la persona. `/settings/team/new` sigue existiendo y abre la lista con el drawer abierto; el breadcrumb
queda en "Employees". El empleado nuevo entra primero en la tabla (al final caía en la página 2). Design system:
*Components / Settings / NewEmployeeDrawer*.

## New Employee: Email del ancho de los demás (2026-10-10)

Regla de Julián (2026-10-10, sobre una captura de Post payment con campos de anchos distintos): en los drawers los
campos van de a dos y del mismo ancho, y vale para todo. Está en *Components / UI / Drawer → Specs → Fields* y se
controla con `npm run ds:campos`. Email deja el `sm:col-span-2` y va en la columna izquierda, debajo de Last name.
