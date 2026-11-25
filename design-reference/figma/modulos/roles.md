# Settings → Roles

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)):

- Epics: CON-3115 Roles y Permisos · CON-3506 Configuración de permisos
  ([historias](https://confidetally.atlassian.net/issues?jql=parent%20in%20%28CON-3115%2CCON-3506%29%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20AND%20%28labels%20is%20EMPTY%20OR%20labels%20%21%3D%20%22design-system%22%29%20ORDER%20BY%20created%20DESC))
- Historias que usa la pantalla: CON-3130 Añadir rol (y Duplicate), CON-3131 Edit rol, CON-3132 Eliminar rol, CON-3181
  Desactivar rol, CON-3229 Activar rol, CON-3411 "Select All", CON-3528 permisos de Roles, CON-3337 y CON-4065 roles del
  sistema en sólo lectura.

## Pantalla nueva desde red.dev (2026-11-25) · CON-3130, CON-3131, CON-3132, CON-3181, CON-3229, CON-3411, CON-4065

Julián: *"armemos la pantalla de Roles en base a nuestro design system, componentes, textos y tamaños"*, con un video de
red.dev (`/settings/roles`). Era un placeholder ("Coming soon").

### Qué tiene red.dev

- Cards en tres columnas: nombre, descripción, pill Active / Inactive, *System Role* en los del sistema, *Updated:
  MM/DD/YYYY* y ⋮ (Edit, Duplicate, Deactivate, Delete).
- *New Role* / *Edit Role*: un modal centrado con Name*, Description* y *Permissions*: una caja por categoría con
  "1/6", el switch *All permissions* y el chevron; adentro, casillas en tres columnas con nombre y descripción. Cancel y
  Save.
- *Duplicate Role*: un modal chico con *Role Name* (precargado con el mismo nombre) y Confirm.
- *Deactivate Role*: "This role will be disabled and won't be available for new assignments. You can reactivate it later."

### Decisiones

1. **Tabla en vez de cards**, como el resto de las listas de Settings (Locations, Employees, Fee schedules): título y
   *New role*, buscador y *Filter*, `ui/data-table` con ⋮. Mismos datos: Name (+ pill *System role*), Description,
   Last updated y Status; suma *Permissions* (cuántos tiene), que red.dev muestra adentro del modal como "n/m" por
   categoría. Con 19 roles, la tabla se recorre más rápido que 7 filas de cards y pagina como todas.
2. **Filter**: *Status* (Active / Inactive) y *Type* (System role / Custom role), con cantidades. Arranca sin filtro.
3. **Drawers en vez de modales** (regla de pop ups):
   - *New role* y *Duplicate role*: dos pasos, **General** (Name, Description) y **Permissions**.
   - *Edit role*: las mismas dos partes en **pestañas** y un solo *Save changes* (regla de editar algo ya cargado).
   - Un **rol del sistema** se abre como *View role*: pestañas, todo deshabilitado, sin Save ni Edit, sólo *Close*
     (CON-4065). Su ⋮ tiene *View permissions* y *Duplicate*; no se edita, desactiva ni borra (CON-3131, CON-3132,
     CON-3181).
4. **Duplicate abre el drawer de New role precargado** (CON-3130, escenario 2: precarga los permisos, se define un nombre
   nuevo y se ajustan los permisos). El nombre viene igual al original, como en red.dev, y no se acepta hasta cambiarlo.
5. **Permisos** (`settings/PermissionsPicker`): una card interna por categoría, plegada, con el nombre, el contador
   (`ui/count`, azul si tiene alguno) y *All permissions* (`ui/switch`, CON-3411). Adentro, casillas de a dos con nombre y
   descripción; todo el renglón tilda. Arriba, *n permissions selected* y *Expand all / Collapse all*. Plegadas para ver
   las 18 categorías de un vistazo; red.dev las abre todas.
6. **Validación** (CON-3130 / CON-3131): Name y Description obligatorios (*This field is required.*), nombre único
   (*This role name is already in use.*) y al menos un permiso (*Select at least one permission.*), con el banner
   *Uncompleted fields* de red.dev arriba, como en Billing.
7. **Desactivar, activar y borrar** con `ui/confirm-dialog` y los textos de Jira. Un rol con empleados activos no se
   desactiva ni se borra: el aviso (*Error deactivating role* / *Error deleting role* · "This role is assigned to active
   users. Reassign or remove all users before …") sólo deja *Close*, como *Unable to change working hours*. Borrar deja
   *Undo* en el toast.

### Datos

`data/roles.ts`: los 18 roles del video con sus textos (también los de prueba —*sadsad*, *provioder-test*—: es
contenido) y el catálogo de permisos por categoría. `usuarios` (empleados activos con el rol) es de ejemplo.

### Anomalías

- **Copiadas tal cual:** *Insurance permisions*, *Patient All permitions*, *Test descriptio*, *Deactviate Ledger …*,
  *Archived Fee Schedule*, *Delay lab ordesrs*, *Provides a self-Accesses the patient portal …*.
- **Inferidas (no se ven en el video):** los encabezados *Billing* (Fee Schedule + Ledger + Export Billing) y *Patient*
  (pacientes + relaciones); los permisos de Prescription y algunos de Lab Order y Ledger Transactions (de CON-3479,
  CON-3513, CON-3517); el texto de *Activate role* (CON-3229 no lo trae): "This role will be available for new
  assignments again.".
- red.dev muestra *Clinical Order 3/27*; acá la categoría tiene 21 (los que se pudieron leer o inferir).

### Pendiente / a validar

1. Que *Employees › Roles & location* tome los roles de acá (hoy usa su propia lista, `ROLES_DISPONIBLES`).
2. Con usuarios: si conviene un buscador de permisos adentro del drawer (son 150) y si las categorías plegadas se
   entienden o extrañan verlas abiertas como en red.dev.
