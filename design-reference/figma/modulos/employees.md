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
