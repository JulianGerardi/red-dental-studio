# Settings - Location › Insurance Defaults

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)):

- Epic: CON-1173 [Location] Settings Billing (sin descripción)
  ([historias](https://confidetally.atlassian.net/issues?jql=parent%20%3D%20CON-1173%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20ORDER%20BY%20key%20ASC))
- CON-4029 inicializar y guardar · CON-3894 Billing Provider · CON-3896 Rendering Provider · CON-4030 referencia
  contractual y aviso · CON-3898 Place of Service · CON-3899 autorización de nuevos subscribers
- CON-4031 (no desactivar Primary Provider elegido en defaults) · CON-4032 (no deshabilitar un Billing Profile de
  Location elegido en defaults): amplían CON-4007 y CON-4028, ver [billing-profile.md](billing-profile.md).
- Fuera: CON-4067 (DER, back) y las canceladas del epic viejo CON-1188 (entre ellas *Default Payment Address*).

## CON-4029 · CON-3894 · CON-3896 · CON-4030 · CON-3898 · CON-3899 · CON-4031 · CON-4032 — Primera versión (2026-11-06)

Pedido de Julián con el prototipo `insurance-defaults-final.html` y el ticket CON-1173. La lógica sale de las historias
del epic; el orden de la pantalla, los textos y el flujo, del HTML; los componentes, del design system.

### Dónde está

| Ruta | Qué cambia |
|---|---|
| `/settings/locations/:locId` | Pestaña nueva **Insurance Defaults**, la última (después de Insurance / Billing Profile) |
| `/settings/locations/:locId?tab=insurance-defaults` | Entra directo a la pestaña (la usan los avisos de bloqueo) |
| `/settings/locations/:locId` › Insurance / Billing Profile | Deshabilitar un perfil elegido en defaults se frena (CON-4032) |
| `/settings/team/:employeeId` › Provider Info | Guardar Primary Provider apagado se frena si está elegido en defaults (CON-4031) |

Código: `components/settings/LocationInsuranceDefaults.tsx` (pestaña, drawer *Select a billing profile* y
`BloqueoDefaults`, el aviso compartido de los dos bloqueos). Datos: `data/insuranceDefaults.ts` (tipo, inicialización,
catálogo `PLACES`, normalización por modo y búsqueda de referencias) y el mismo store de los perfiles
(`data/billingProfilesStore.tsx`: `defaultsDe`, `guardarDefaults`, `providerElegible`, `perfilElegible`, `referencias`).

Semilla para recorrerlo: **Abril** y las demás con los valores iniciales; **Bayside** factura con su propio perfil
(*Specific Billing Profile* → Bayside Dental Group) y tiene a **Sarah Stone** de *Alternate Rendering Provider*. Sarah pasa
a ser Primary Provider con perfil activo (antes no lo era) para tener dos providers elegibles. Elena no está en ningún
default: el e2e de CON-4007 la sigue desactivando sin bloqueo.

### Reglas

1. **Un registro por Location, con los valores de CON-4029** sin que nadie lo guarde: *Provider of Procedures* en los dos,
   *Use the patient's Primary Provider* marcado, contratos por **Billing Provider**, aviso apagado, **Office — 11** y las
   dos autorizaciones sin marcar. En el clon, la Location que nunca se guardó devuelve esos valores (`defaultsDe`).
2. **Lo que no aplica al modo se guarda en null** (CON-3894 › 3.4, CON-3896 › 3.4): *Specific Billing Profile* deja sólo
   `billingProfileId`; *Provider of Procedures* sólo el alternativo. *Specific Provider* guarda `renderingId`,
   `usePatientPrimary = false` y sin alternativo. Mientras se edita, cambiar de modo y volver no pierde lo elegido: se
   limpia recién al guardar. "Sin guardar" compara los valores ya normalizados.
3. **Elegibles** (y se vuelven a mirar al guardar): Billing Profile activo; si es de un provider, su employee activo, Primary
   Provider y perfil activo. La Location cuenta por su perfil, no por si está operativa. Rendering: sólo providers con esas
   condiciones; nunca una Location.
4. **Alternativos opcionales**: se pueden dejar vacíos o quitar con **Clear**. El específico es obligatorio
   (*Select a billing profile before saving.* / *Select a rendering provider before saving.*).
5. **Referencia no disponible**: si lo guardado deja de ser elegible, el selector lo sigue mostrando con el error de Jira
   debajo (*The selected billing profile is no longer available…*) y no se puede guardar hasta cambiarlo.
6. **Un solo Save para toda la pestaña** (como el HTML), en un pie fijo abajo con *Unsaved changes*. Cancel vuelve a lo
   guardado; sin cambios queda deshabilitado. Save sin cambios avisa *There are no changes to save.* Con errores, el foco va
   al primer campo con error. Toast: *Insurance defaults saved.* Salir de la pestaña con cambios pregunta (*Discard unsaved
   changes?*, con su propio texto).
7. **Bloqueos (CON-4031, CON-4032)**: se buscan referencias en los defaults de todas las Locations. Perfil de Location:
   `billingProfileId` y `alternateBillingId`. Provider: esos dos con su perfil y `renderingId` / `alternateRenderingId`
   con su id. *Provider of Procedures* y *Use the patient's Primary Provider* no cuentan. Si hay alguna, no se pregunta ni
   se guarda nada: aparece **Unable to disable billing profile** / **Unable to deactivate Primary Provider** con el texto
   de Jira y la lista *Location — Setting*. El chequeo se repite al confirmar (en el store para Primary Provider), por si
   lo eligieron con la pregunta abierta.

### Decisiones de diseño (desvíos del HTML)

1. **Opciones de modo con `OpcionDireccion`** (la tarjeta radio de Add Relationship, Copy From y Exceptions), dentro de
   un `radiogroup` con nombre. Mismo look que las `.choice` del HTML, pero la pieza del sistema.
2. **Billing Profile en drawer** (*Select a billing profile*, `ui/drawer`): buscador `SettingsSearch` y `FilterMenu` con
   *All / Providers / Locations* y cantidades, en vez de los botones segmentados del HTML (es el filtro único de la app,
   igual que en Contracted With). Cada perfil es una tarjeta radio con nombre, dirección, organización si difiere y la pill
   *Location / Provider*. Pie con dos botones: Cancel · **Select profile** (el HTML elegía con un click y cerraba; con el
   pie de dos botones del sistema hay que confirmar; doble click elige directo).
3. **Rendering Provider con `SelectField` buscable** en los dos modos. El HTML usaba drawer para el específico y un
   desplegable para el alternativo: la misma elección en dos controles distintos. Son sólo nombres, así que alcanza el
   select del sistema, con *Search by name*.
4. **"Clear" junto al rótulo** en vez de la ✕ dentro del selector: no se superpone con el botón que abre la lista, se toca
   bien en el celular y el lector de pantalla la anuncia (*Clear Alternate Billing Profile*). Los opcionales llevan
   *(optional)* en el rótulo, como el HTML.
5. **Place of Service con `SelectField` buscable** (*Search by name or code*), "Nombre — código" como pide CON-3898. El
   catálogo es el de CMS (13 códigos, todos activos). El select no deja quedar vacío, así que *Select a default Place of
   Service before saving.* sólo se vería con un dato roto; está validado igual.
6. **Aviso de no contratado**: `Toggle` de Settings con la explicación debajo, que cambia entre *Billing* y *Rendering*
   según la referencia elegida (CON-4030 › CA-11: una sola referencia para el cálculo y para el aviso).
7. **Autorización** con `Checkbox` del sistema y el texto al lado clickeable.
8. **Bloqueo con `ConfirmDialog`** tono warning y un solo botón (**Close**): se suma `hideCancel` al componente. Cada
   referencia es un link que lleva a *Insurance Defaults* de esa Location (`?tab=insurance-defaults`) para cambiarla; el
   HTML sólo la listaba.
9. **Fuera**: el panel *Prototipo · controles de demostración* (error simulado, permisos, employee inactivo, vaciar Place of
   Service) y el selector de Location del header del HTML (en el clon se cambia de Location desde la lista).

### Anomalías / pendientes para validar

- **Permisos** (*You do not have permission to edit insurance defaults for this location.*): el clon no tiene usuarios con
  permisos distintos; la vista de solo lectura no se armó.
- **Error de guardado**: Jira pide "el mensaje estándar ya utilizado en el sistema"; el clon no tiene backend que falle.
- Las historias guardan cada sección por separado (cada una dice "guardado conjunto" de sus campos); el HTML final tiene un
  solo Save. Se siguió el HTML; como cada sección se valida y se normaliza igual, guardar todo junto cumple cada historia.
- CON-1173 no tiene descripción: la lógica sale de sus historias.

**Para validar con usuarios:** si "Provider of Procedures" + "Alternate …" se entiende sin explicar cuándo se usa el
alternativo (ninguna historia lo dice; es un tema de claims).
