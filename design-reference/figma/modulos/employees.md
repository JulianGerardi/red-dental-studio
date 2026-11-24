# Settings - Employees

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)):

- Epics: CON-1548 Employee · CON-2889 Employee 2 · CON-3115 Roles y Permisos · CON-3120 [Post Demo] Admin · CON-3230
  Usuarios Admin · CON-3506 Configuración de permisos · CON-3853 List Permission
  ([historias](https://confidetally.atlassian.net/issues?jql=parent%20in%20%28CON-1548%2CCON-2889%2CCON-3115%2CCON-3120%2CCON-3230%2CCON-3506%2CCON-3853%29%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20AND%20%28labels%20is%20EMPTY%20OR%20labels%20%21%3D%20%22design-system%22%29%20ORDER%20BY%20created%20DESC))
- Historias de abril: CON-2890
  ([Jira](https://confidetally.atlassian.net/issues?jql=key%20in%20%28CON-2890%29%20ORDER%20BY%20key%20ASC))
- Insurance / Billing Profile del provider: ver [billing-profile.md](billing-profile.md) (CON-4003).

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

## Un solo avatar de persona (2026-10-18)

La tabla (`PersonCell`, sin el tono celeste) y la ficha del empleado (`EditableAvatar` de 56) usan `ui/avatar`: azul
con iniciales blancas y esquinas redondeadas, igual que un paciente. Regla en `../README.md`.

## New Hours y Assign Role: avisos con `ui/alert` (2026-11-18)

Sin historia de Jira (devolución de diseño de Abril Viola). Las franjas con barra a la izquierda pasan a `Alert`, el
aviso único de la app (detalle en patients.md, 2026-11-18):

- New Hours: *Attention needed* en warning, con el texto como cuerpo; *This will update the hours…* en info, sólo título.
  Se van los hex `#fffbeb` y `#eff4ff`.
- Assign Role: *Global access* en info, con el texto como cuerpo.

## La ficha del empleado no vincula a otra persona (2026-11-18)

Sin historia propia; misma regla que Edit Patient (CON-1329: *sin buscador de persona* al editar). En la ficha de un
empleado ya cargado se saca la opción *Use this option only to link a person that already exists in the system…*
(`LinkExistingPerson`): editar a alguien no es reemplazarlo por otra persona. Queda sólo en *New Employee*, como en 2.0.
General Information muestra directo los campos.

## Tablas de Settings: a la ficha sólo por el ⋮, menús con ícono y *Edit* (2026-11-18)

Sin historia de Jira: devolución de diseño de Julián sobre Locations, Employees y Accounts.

1. **Una sola forma de entrar a la ficha**: el ⋮ → *Edit*. El nombre de la fila deja de ser link (Locations y Accounts:
   `TextCell`; Employees: `PersonCell` sin `to`, que ahora dibuja texto y no un botón vacío). Antes había dos caminos al
   mismo lugar.
2. **Menús alineados** con el de Patients (*Overview* / *Edit*): todos los ítems llevan ícono a la izquierda y nombre
   corto, sin repetir la entidad de la fila.
   - Locations: *Edit* (lápiz), *Delete* (tacho).
   - Employees: *Edit* (lápiz), *Delete* (tacho, antes el ícono de prohibido), *Suspend*, *Terminate*, *Disable*
     (prohibido) y *Remove Provider Role* (persona con menos, antes otro tacho).
   - Accounts: *Edit* (lápiz), *Manage Licenses* (llave), *Suspend* (prohibido). Antes no tenían íconos.

**A validar:** que recepción y administración no extrañen el clic en el nombre (es el patrón de Patients, que sí lo
conserva). Si lo extrañan, la salida es la fila entera clickeable, no volver al link.

## CON-4085 · CON-3542 · Sin casillas y *Clinical practitioner* (2026-11-20)

Pedido de Julián; el nombre sale de Jira (CON-4085 nombra la columna `Is clinical practitioner`; CON-3542, *Enable /
Disable Clinical Practitioner*).

1. **Sin casillas** en la lista: no había ninguna acción sobre varios empleados a la vez (el "N selected" no llevaba a
   nada). Se van la columna de casillas y la pastilla.
2. La columna *Provider* pasa a **Clinical practitioner** (160 px para que entre el título). El interruptor de la ficha
   pasa de *Is provider* a **Is clinical practitioner** y la opción del ⋮ *Remove provider role* a **Disable clinical
   practitioner**: según CON-3542 deshabilitar el perfil clínico no toca los roles, así que "Remove role" decía otra
   cosa. Las pestañas *Provider info* quedan: CON-3542 las llama así.
3. Pendiente (no se pidió): CON-4085 suma "Credentials expired" con un ícono debajo del *Yes* cuando vence una
   credencial requerida; CON-3542 pide validar turnos y encounters antes de deshabilitar (hoy se deshabilita directo).

### CON-4085 · *Credentials expired* debajo del *Yes* (2026-11-20)

Debajo del *Yes* de *Clinical practitioner*, un ícono de advertencia y "Credentials expired" en el tono warning cuando la
persona tiene al menos una credencial requerida vencida (`credencialesVencidas` en `data/employees.ts`; en el mock, Julio
Perez). Sin link: a la ficha se entra por el ⋮ (2026-11-18). Que desaparezca al renovar la credencial depende del
backend; acá no hay vencimientos calculados.

### Botones de la app en vez de links (2026-11-20)

Pedido de Julián: los "Add" escritos como link azul pasan a `ui/button`. *Add new hour* (Working hours) y *Add role*
(Roles & location) en primario, como *New room*; *Add credential* en secundario, porque suma una fila adentro del
formulario. *Select file* del drop de Documents usa `buttonClasses` (era un span pintado a mano). Lo mismo en el resto:
*Add exception* (Location), *Add another time range* (New hours y Location hours), *Add new subscription* (Insurance) y
*Add new* (dependientes de Manage subscription). Los links que navegan (*All images*, *Go to procedure ›*) siguen siendo
links.

## Tablas estandarizadas v2 (2026-11-24)

Pie, alineación, fechas y avatar con las reglas comunes de todas las tablas: ver `design-reference/figma/README.md`
(*Tablas estandarizadas v2*, 2026-11-24).
