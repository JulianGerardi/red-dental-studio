# Emails (mails que manda la plataforma)

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)): no hay un epic de mails. Las historias están
repartidas en Accounts (CON-3325, CON-3451), Firma (CON-2908, CON-2909), Guardian (CON-3162, CON-3998), Plan &
Subscriptions (CON-3268, CON-3498, CON-3499, CON-3501) y Scheduling (CON-478).

Fuentes: el documento **"Email Propuesta" (tabla unificada)**, de SharePoint, y la página **📧 Email** del Figma
*Screens & Flows* (`138:4`: *Welcome* y *Email onboarding*). Código: `src/emails/marco.ts` (layout y bloques),
`src/emails/plantillas.ts` (los 16 mails, sus textos y los datos de ejemplo), `src/pages/Emails.tsx` (la vista
previa, en `/emails/:id`) y `scripts/emails-exportar.mjs` (lo que se le entrega al backend, en `public/emails/`).

## 2026-11-18 · Primera versión (CON-3325, CON-2908, CON-3162, CON-3268)

Pedido de Julián: diseñar los mails a partir del documento y del Figma y alinearlos con la plataforma. **Los manda el
backend y el front casi no los va a tocar**, así que el diseño se adaptó a eso.

### 1. Lo que impone el backend

- **Un solo layout para todos los mails.** Cada mail cambia sólo su texto. El layout tiene cabecera, cuerpo, aviso
  legal y pie de Confidentally.
- **Siete bloques fijos:** `saludo`, `parrafo`, `aviso`, `detalles`, `boton` (lleva siempre el enlace de respaldo
  debajo), `nota` y `firma`. Un mail nuevo se arma con esos bloques y no hace falta diseñarlo.
- **Sólo se reemplazan `{{variables}}`**, en `snake_case` como en CON-2908 (`{{patient_first_name}}`,
  `{{practice_name}}`). No hay bucles ni condicionales. Por eso:
  - Los detalles del turno van en filas fijas: Date, Time, Provider, Location y Address.
  - Cada variante es otro mail. La reprogramación, por ejemplo, tiene una versión *booked* y otra *proposed*.
- **HTML apto para clientes de correo:** tablas, estilos inline y 600 px de ancho. El botón es "a prueba de balas":
  la celda lleva el color, así también se ve en Outlook. Los colores van en hex, copiados de los tokens de `@theme`
  (`COLOR` en `marco.ts`), porque los clientes de correo no leen variables CSS. La tipografía es Inter con fuentes del
  sistema de respaldo.
- **Celular:** con una media query (menos de 620 px), la tarjeta ocupa todo el ancho, el botón se estira y las filas
  de detalles se apilan: rótulo arriba y valor abajo. Sin media query, igual entra en 600 px y se achica.
- **Entrega:** `npm run emails:exportar` deja en `public/emails/` un HTML por mail y `emails.json`. El `emails.json`
  trae, para cada mail, asunto, preheader, destinatario, remitente, variables y Jira. Se publica con la app en
  `…/red-dental-studio/emails/<id>.html`. Con `--check`, el script falla si los archivos quedaron desactualizados.
  Las imágenes fijas (el logo de Confidentally y los íconos del aviso) cuelgan de `{{assets_url}}`: el backend aloja
  la carpeta `public/emails/` y pasa su URL. `node scripts/emails-recursos.mjs` regenera los íconos y el logo de
  ejemplo.

### 2. Decisiones de diseño

1. **Cabecera:** se mantiene la franja del Figma (blanco a azul claro). Baja de 179 px a unos 100 px y lleva adentro
   **quién escribe**: el logo de la clínica en los mails al paciente, guardian o empleado, y el de Confidentally en
   los mails al dueño de la cuenta. En el Figma la franja estaba vacía y en el celular empujaba el contenido fuera de
   la primera pantalla. En Outlook se ve el color plano.
2. **Datos del turno y de acceso en una caja** (`detalles`), como la *LOGIN DETAILS* del Figma: título en
   mayúsculas, línea y filas de rótulo y valor.
3. **El vencimiento de 24 h es un aviso** (`aviso`). Es lo único que cambia lo que tiene que hacer el paciente.
4. **Un solo botón primario por mail**, del color del botón primario de la app (`dash-blue`) y de 48 px de alto para
   que se toque bien. Siempre va con "If the button does not work…" y el enlace. El documento lo ponía en algunos
   mails y en otros no; quedó en todos.
5. **La firma de la clínica lleva teléfono y mail** (`{{practice_phone}} | {{practice_email}}`), como en el *Welcome*
   del Figma, porque casi todos los mails dicen "please contact your office". La de Confidentally dice "The
   Confidentally Team" y el mail de soporte.
6. **El pie no lleva "Unsubscribe"**: son mails transaccionales (turnos, accesos, firmas). Darse de baja dejaría al
   paciente sin avisos de sus turnos. También se sacó "To update your emails preferences click here", porque no hay
   pantalla de preferencias. Los links legales van una sola vez en el aviso y otra en el pie, como en el Figma.
7. **Sin emoji en el saludo** (el Figma tenía 👋 y 🚀): se ven distinto en cada cliente y el documento no los trae.
   "Kind regards" pasó a "Best regards", como en el documento.
8. **Preheader en todos los mails**: el texto que se ve al lado del asunto en la bandeja. CON-2908 lo pide. En los
   demás es propuesta.

### 3. Qué viene del documento y qué es propuesta

La vista previa lo marca con *From the document* o *Proposal · pending approval*, y lista "Not in the doc".

- **Del documento:** Clinic account ready, Appointment request, booked, confirmed y cancelled, Treatment plan ready,
  Document to sign, Patient portal ready y Employee account ready. El documento no traía asunto para booked,
  confirmed y cancelled: se propuso uno. El *Patient portal ready* y el *Employee account ready* terminan en
  `{Login details}`; el botón Login y las notas salen del *Welcome* del Figma.
- **Propuesta, porque el documento la deja vacía:**
  - Las dos reprogramaciones: el documento sólo trae "Your appointment has been rescheduled…".
  - Los tres de suscripción (suspended, cancelled, expired). El de suspensión usa el modo de solo lectura de
    CON-3268.
  - Los dos de guardian. Su lógica sale de CON-3162: si no tiene usuario se lo invita con acceso, y si ya tiene se le
    avisa que suma el paciente.

### 4. Anomalías

1. **El documento mezcla `[Patient]`, `{Patient}`, `[Clinic Name]`, `{Clinic Name]` y `[Practice Name]`.** Se
   unificaron en `{{…}}` y la clínica quedó como `{{practice_name}}`, como en CON-2908.
2. **Contraseña temporal en el mail** (Patient, Employee, y Guardian por consistencia): la pide el Figma (*Welcome*)
   y CON-3162 la admite ("contraseña temporal o link de activación"). **Recomendación:** cambiarla por un link de un
   solo uso que venza ("Set your password"). Una contraseña en un mail queda guardada en la bandeja, y en salud eso
   pesa. El cambio es de backend y espera el ok.
3. **El asunto "New message from your dental office"** (paciente nuevo) no dice de qué se trata y se parece a un mail
   de phishing. Se dejó tal cual. Propuesta: "Your patient portal account is ready".
4. **El mail de onboarding lo firma `[Clinic Name]`**, pero lo manda Confidentally al dueño de una clínica que todavía
   no configuró nada. Se dejó tal cual. Propuesta: firmar "The Confidentally Team", como los de suscripción.
5. **CON-2908 dice otra cosa que el documento:** el asunto es "Action Required: Please Review and Sign Your Document" y
   el botón dice "Sign". Se usó el documento, que es más nuevo.
6. **El botón del Figma dice "Login"** (sustantivo). Se copió tal cual; lo correcto es "Log in".
7. **Errores del Figma que no se copiaron porque el texto sale del documento:** "has been creates",
   "Confindetally.com", "read-dental-studio@gmail.com", "Red Dental Studio Dental Clinic" y "configure your clinic"
   en el mail del paciente.
8. **CON-3498 (Email nueva suscription)** está en Jira pero no en el documento. No se armó.

### Para validar con usuarios

- Si los pacientes entienden en el celular, sin abrir el portal, que el turno propuesto vence a las 24 h.
- Si el nombre de la clínica en la cabecera alcanza para que el paciente confíe en el mail, o si hace falta su logo.
  Eso agregaría una variable `{{practice_logo_url}}`.
- Con el backend: probar los HTML en Gmail, Outlook (escritorio) y Apple Mail, también en modo oscuro, antes de
  activarlos.

## 2026-11-19 · Logo de la clínica y aviso con el diseño del Alert (CON-3325, CON-3268)

Pedido de Julián: un logo inventado de una clínica en la cabecera y el aviso con el diseño nuevo de las alertas.

1. **Logo de la clínica en la cabecera** (`{{practice_logo_url}}`), en los mails que manda la clínica. Reemplaza al
   nombre en texto: el paciente reconoce la marca antes de leer, y eso le da confianza en un mail que le pide entrar
   al portal. El de ejemplo (`sample-practice-logo.png`) es inventado: una muela blanca sobre un cuadrado rojo y "Red
   Dental / STUDIO" al lado. No es el logo de ninguna clínica real. El alt es `{{practice_name}}`, así que si la
   imagen no carga se lee el nombre.
   - **Para el backend:** PNG de 88 px de alto (se ve a 44), fondo transparente y hasta 480 px de ancho. Outlook de
     escritorio usa el tamaño real de la imagen, así que un logo más grande se vería enorme ahí.
   - **Clínica sin logo:** la plantilla no tiene condicionales. El backend tiene que mandar una imagen igual (por
     ejemplo, una que genere con el nombre). A definir con ellos.
2. **El aviso es el `Alert` de la app** (`ui/alert`, PR #156): caja con borde redondeado de 8 px y borde fino del
   color del tono al 25 %, ícono de lucide, título en el color del tono y texto en tinta. Sale la franja con barra a
   la izquierda, que la app ya no usa. Tiene los cuatro tonos (info, success, warning, danger). El borde va con el
   color ya mezclado, porque Outlook no entiende transparencias, y los íconos van en PNG (`alert-<tono>.png`) porque
   Gmail y Outlook no muestran SVG.
   - El de 24 h lleva el título "This request expires in 24 hours" (propuesta) y el texto del documento.
   - El mail de suscripción suspendida (propuesta) pasa a usar un aviso warning: "Your account is in read-only
     mode".
3. **Variables:** sale `{{logo_url}}` y entran `{{assets_url}}` (la carpeta de las imágenes fijas) y
   `{{practice_logo_url}}`.

