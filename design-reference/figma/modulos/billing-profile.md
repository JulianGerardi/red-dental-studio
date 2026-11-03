# Settings - Insurance / Billing Profile (Location y provider)

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)):

- Epics: CON-4019 [Location] Billing profile · CON-4003 [Provider] Billing Profile
  ([historias](https://confidetally.atlassian.net/issues?jql=parent%20in%20%28CON-4019%2CCON-4003%29%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20ORDER%20BY%20key%20ASC))
- Location: CON-4021 habilitar · CON-4026 consultar y ajustar · CON-4027 Contracted With · CON-4028 deshabilitar
- Provider: CON-4004 al habilitar Primary Provider · CON-4005 consultar y ajustar · CON-4006 Contracted With · CON-4007
  deshabilitar
- Del epic CON-4019 también: CON-4033 (relaciones al crear un carrier, cubierta por la regla 3) y CON-4010 (DER: sólo la
  imagen del modelo; las tablas que usa cada historia están en el mock). Los dos epics no tienen descripción.
- Sin implementar: CON-4031 / CON-4032 (bloquear la desactivación si el perfil está en Insurance Defaults: el clon no
  tiene Insurance Defaults todavía) y CON-4033 como paso aparte (no hace falta, ver regla 3).

## CON-4021 · CON-4026 · CON-4027 · CON-4028 · CON-4004 · CON-4005 · CON-4006 · CON-4007 — Primera versión (2026-11-03)

Pedido de Julián con dos prototipos HTML (`location-billing-profile.html` y `provider-billing-flow.html`) y las historias
de los dos epics. La lógica sale de los HTML y de Jira; los componentes, del design system.

### Dónde está

| Ruta | Qué cambia |
|---|---|
| `/settings/locations/:locId` | Pestaña nueva **Insurance / Billing Profile**, al final (Information · Working Hours · Rooms · Exceptions) |
| `/settings/team/:employeeId` | **Is a Primary Provider** (Provider Info) se aplica al switchear: en Yes aparece la pestaña **Insurance / Billing Profile** |

Código: `components/settings/LocationBillingProfile.tsx`, `ProviderBillingProfile.tsx` y las piezas compartidas en
`BillingProfile.tsx` (`ContactoCard`, `ReplaceContactDrawer`, `CredentialsDrawer`, `ContractedWith`, `AccionesGuardado`).
Datos: `data/billingProfiles.ts` (semilla y formatos) y `data/billingProfilesStore.tsx` (store en memoria de Settings,
como `finanzasStore`).

Semilla para recorrerlo: **Abril** sin perfil (configuración desde cero), **Bayside** activo, **Northgate** inactivo;
**Elena Martinez** Primary Provider con perfil, **Emily Chen** sin perfil (se prepara al guardar Primary Provider) y
**Daniel Anderson** con el perfil inactivo.

### Reglas

1. **Un perfil por titular, nunca se borra.** Deshabilitar deja `activo: false`; reactivar reutiliza el mismo con sus
   contratos (CON-4028, CON-4007).
2. **Location vs provider.** La Location no trae NPI ni TIN: se cargan al configurarla y después se cambian en su propio
   drawer *Billing credentials* (guardado aparte del nombre y los contactos, como dice CON-4026). El provider toma nombre,
   NPI y TIN/SSN de su ficha y en la pestaña son de lectura: sólo se reemplazan dirección y teléfono (CON-4005).
3. **Contracted With lista los carriers de la account** (los de Settings › Billing › Carriers, `finanzasStore`). El que no
   tiene relación guardada cuenta como *Not contracted*: así un carrier nuevo aparece solo en todos los perfiles, activos e
   inactivos y sin tocar los contratos existentes, que es lo que piden CON-4033 y CON-4027 › 3.1 sin un paso de
   inicialización aparte.
4. **Cada card guarda por separado** —identidad/contactos y contratos—, como en los dos HTML. Buscar, filtrar o saltar
   por letra no pierde lo marcado. Salir de la pestaña con algo sin guardar pregunta (*Discard unsaved changes?*).
5. **El guardado vuelve a mirar el estado**: si el perfil se deshabilitó con la pantalla abierta, se rechaza con
   *This billing profile is inactive and cannot be edited.* (texto de Jira) y no se aplica nada.
6. **Un contacto reemplazado se conserva**: el nuevo se suma a los del titular. En Location, Replace abre un menú con los
   contactos guardados + *Add a new address / phone number*; en provider va directo al drawer (CON-4005 no permite elegir
   otro existente). El nuevo lleva la pill *New · not saved* hasta guardar.
7. **Primary Provider y el perfil se guardan juntos, al switchear** (CON-4004/4007; ver la sección del 2026-11-03 más
   abajo). La pestaña aparece al crearse el perfil y queda aunque se deshabilite, de lectura, con el aviso de cómo volver
   a habilitarlo.

### Decisiones de diseño (desvíos de los HTML)

1. **Pop ups según el sistema**: los `<dialog>` de *Replace*, *Billing credentials* son drawers (`ModalShell` md); las
   preguntas sí/no (*Disable this billing profile?*, *Discard this setup?*, *Discard unsaved changes?*) son
   `ConfirmDialog`. El HTML pedía confirmar la deshabilitación con un bloque inline: con `ConfirmDialog` es la misma
   decisión, en el lugar de siempre.
2. **Edit billing name** del HTML era un diálogo para un solo campo: en la app el nombre es un `TextField` en la card, que
   se guarda con *Save billing information* (aparece sólo con cambios).
3. **Estado del perfil** con `Pill`: *Not configured* y *Inactive* neutrales, *Pending activation* ámbar mientras se
   configura sin guardar, *Active* verde. En Location va una sola vez, junto al switch.
4. **Filtro de contratado** con `FilterMenu` (All / Contracted / Not contracted con cantidades) en vez del segmentado del
   HTML: es el filtro único de la app. Buscador con `SettingsSearch`. La barra A–Z del HTML se mantiene; las letras sin
   carriers (con la búsqueda y el filtro aplicados) quedan apagadas.
5. **Lista larga**: `ShowMore` con 8 carriers a la vista, agrupados por inicial; cada fila con casilla, nombre, Payer ID y
   pill *Contracted / Not contracted*.
6. **Validación de credenciales**: NPI de 10 dígitos y TIN/SSN de 9, sólo números (formato real). Jira no trae el texto:
   *Enter the 10-digit NPI.* / *Enter the 9-digit tax identification number.* Los demás mensajes son los de las historias
   (*A billing name is required.*, etc.). El TIN/SSN guardado se muestra con los últimos cuatro (`TIN •••••6789`).
7. **Fuera**: el panel *Prototipo · controles de demostración* (error simulado, permisos, account sin carriers) no es
   producto. Los estados que simulaba están cubiertos: rechazo por inactivo (regla 5), vacío sin carriers (*No carriers
   have been configured for this account.*) y sin resultados.
8. **Toggle de Settings** (`settings/primitives`) suma `ariaLabel` para el switch que no lleva rótulo arriba.

### Anomalías / pendientes para validar

- *Is a Primary Provider* está en la card "Contact Information" de Provider Info (así está en el Figma); no se movió.
- Permisos (*You do not have permission to edit this location.*): el clon no tiene usuarios con permisos distintos, no
  se muestra.
- Falta una historia para el error de credenciales del provider faltantes al habilitar Primary Provider (CON-4004 lo pone
  como precondición, sin mensaje): todos los providers de la semilla tienen NPI y TIN/SSN.

## CON-4004 · CON-4007 — Primary Provider sin Save (2026-11-03)

Pedido de Julián sobre el link de prueba: prender *Is a Primary Provider* tiene que habilitar el perfil y mostrar la
pestaña en el momento, sin tocar Save.

- **Prender** guarda Primary Provider y crea o reactiva el perfil a la vez; la pestaña entra con el mismo pop que Provider
  Info y Working Hours al prender *Is Provider*. Toast: *Primary Provider enabled. Insurance / Billing Profile is now
  available.* (o *…The billing profile is active again.* si ya existía).
- **Apagar** pregunta con `ConfirmDialog` (*Turn off Primary Provider?*): deja al provider fuera de Rendering y Billing
  Provider y el perfil de lectura. Cancel no cambia nada, que es la salida que pide CON-4007 › Cancelar.
- **Desvío de Jira**: CON-4004 dice "activa y guarda". El switch pasa a ser el guardado —sigue guardando Primary Provider y
  el perfil juntos—. Es la regla del design system (switch = efecto inmediato) y lo mismo que ya hace *Is Provider* en la
  misma ficha. El Save del pie queda para el resto de la ficha.
- Location no cambia: su switch abre un formulario con NPI y TIN que hay que completar, así que ahí *Save and enable*
  sigue siendo necesario (CON-4021).
