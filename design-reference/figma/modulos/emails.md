# Emails (mails que manda la plataforma)

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)): no hay un epic de mails. Las historias están
repartidas en Accounts (CON-3325, CON-3451), Firma (CON-2908, CON-2909), Guardian (CON-3162, CON-3998), Plan &
Subscriptions (CON-3268, CON-3498, CON-3499, CON-3501) y Scheduling (CON-478).

Fuentes: el documento **"Email Propuesta" (tabla unificada)**, de SharePoint, y la página **📧 Email** del Figma
*Screens & Flows* (`138:4`: *Welcome* y *Email onboarding*). Código: `src/emails/marco.ts` (layout y bloques),
`src/emails/plantillas.ts` (los 16 mails, sus textos y los datos de ejemplo), `src/emails/Vista.tsx` (la vista
previa, una página aparte en `/emails/`) y `scripts/emails-exportar.mjs` (lo que se le entrega al backend, en `public/emails/`).

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

## 2026-11-19 · Sin contraseña en el mail y asunto del paciente (CON-3162, CON-2895)

Decisiones de Julián sobre los puntos abiertos de la primera versión:

1. **Link de un solo uso en vez de contraseña temporal** (anomalía 2): en los mails de *Patient portal ready*,
   *Employee account ready* y *Guardian invitation*, la caja *Login details* queda sólo con el usuario. Debajo va
   "To start using your account, set your password with the button below:", el botón **Set your password**
   (`{{set_password_link}}`) y la nota "For your security, this link can only be used once and expires in
   {{link_expiration}}.". Salen `{{temporary_password}}`, `{{login_link}}` en esos tres mails y la nota de
   cambiar la contraseña. **Para el backend:** el link lleva un token de un solo uso que vence; el plazo lo
   definen ellos (en el ejemplo, 48 hours). CON-3162 ya lo prevé ("contraseña temporal o link de activación").
   La pantalla del portal para crear la contraseña no está en este clon.
2. **Asunto del paciente nuevo** (anomalía 3): pasa a "Your patient portal account is ready".
3. **Siguen igual:** los mails propuestos siguen marcados como propuesta hasta que se revisen, y el onboarding lo
   sigue firmando `{{practice_name}}`, como en el documento (anomalía 4).

## 2026-11-19 · La vista previa sale de la app (CON-3325)

Pedido de Julián: publicar los mails en un link aparte, porque no son parte de la app.

- **Página propia en `…/red-dental-studio/emails/`**: otra entrada de Vite (`emails/index.html` →
  `src/emails/main.tsx`), sin menú lateral, sin header y sin la ruta `/emails` de la app. Se arma con las mismas piezas
  del design system (Tabs, Pill, Button, cards) y el logo de Confidentally arriba.
- **Cada mail tiene su link** con el hash: `…/emails/#appointment-request`. El hash, y no una ruta, porque la página no
  usa el router de la app.
- **En la misma carpeta** quedan lo que se le entrega al backend (`<id>.html`, `emails.json`) y las imágenes, así un
  solo link sirve para verlos y para bajarlos.
- **Design system:** `emails/Vista.tsx` y `emails/main.tsx` quedan exentos en `exentos.json`. Es una página de
  referencia para el backend, no una pantalla de la plataforma.


## 2026-11-20 · Documentación en Figma (CON-3325)

Pedido de Julián: documentar los mails en Figma. Página **📧 Email** del archivo *Screens & Flows* (`138:4`), con el
flujo en `scripts/figma/flujos/emails.mjs`.

- **Seis flujos y 19 pantallas:** *Template & preview* (la página de referencia en escritorio, en celular y con las
  variables) y un flujo por grupo de mails: Onboarding & accounts, Scheduling, Treatment plan & documents, Subscription
  y Guardian. Cada pantalla es la página `/emails/#<id>` y su nota dice cuándo se manda, quién lo recibe, el asunto y si
  el texto es del documento o propuesta. Las historias de Jira salen de cada mail.
- **Los diseños originales quedan al pie** de la misma página, sin cambios, como fuente.
- **Anomalía:** la pantalla *Variables* quedó en la vista de celular, porque la anterior del flujo dejó elegido *Mobile*.
  Es un estado real de la página.

## 2026-11-25 · Cabecera, pie y textos nuevos del Figma (CON-3325, CON-2895, CON-3162, CON-3268)

Pedido de Julián: la cabecera de Confidentally como en `526:69` para todos los mails que manda Confidentally, la de la
clínica como en `526:372`, el degradé siempre arrancando en blanco y los textos que reescribió en la página 📧 Email.

1. **Cabecera:** una sola para los dos remitentes. El degradé (`#ffffff` → `#e8eef8` → `#c9dafa`) queda blanco hasta los
   280 px y recién ahí se tiñe. El logo, de hasta 240 px más el margen, apoya siempre sobre blanco, sea del color que
   sea, también en celular. Sin degradé (Outlook) la cabecera queda blanca, no azul.
2. **Logo de ejemplo en cinco colores** (rojo, azul, verde, violeta y negro), para probar que ningún logo pise el
   degradé. El azul es el de la marca, el caso más difícil. En la vista previa, los mails de la clínica tienen una fila
   de muestras *Logo* al lado de las pestañas. `node scripts/emails-recursos.mjs` genera las imágenes.
3. **Pie según quién escribe:**
   - Confidentally: copyright, dirección y links legales.
   - Clínica: nombre, dirección (`{{practice_address}}`), "Powered by" con la marca de Confidentally
     (`confidentally-mark.png`), mail y teléfono (con link) y links legales.
   - Sale el aviso legal largo ("This email was sent to you as a registered member…"), que el Figma ya no tiene.
     `{{website_url}}` deja de usarse.
4. **Cuerpo:** título del mail (18 px, semibold) antes del saludo, "Hello {{nombre}}," con el nombre completo, textos
   cortos, "Questions? Contact …" con el mail en link y la firma "Best regards," + "The {{practice_name}} team" (o "The
   Confidentally team"). Los bloques siguen siendo siete: `saludo` pasa a ser `titulo` (el saludo es un `parrafo`).
5. **Turnos:** la caja *Appointment details* lleva Date, Time, Provider y Location, con el nombre del lugar y la
   dirección en la misma fila. El pedido de turno ya no lleva el aviso de 24 h: el plazo va en un párrafo, antes del
   botón *Confirm appointment*. Booked, Confirmed y Canceled no llevan botón. Las reprogramaciones nombran el turno
   anterior (`{{previous_appointment_date}}`, en negrita).
6. **Variables nuevas:** `patient_name`, `account_owner_name`, `employee_name` y `guardian_name` (antes `*_first_name`),
   `practice_address`, `previous_appointment_date`, `temporary_password` y `document_link`. Salen `set_password_link`,
   `link_expiration`, `support_contact` y `website_url`.
7. **Origen:** `doc` pasa a `figma` (*From the Figma*): el texto es el del Figma, ya no el del documento. "Not in the
   doc" pasa a "Not in the Figma".

### Anomalías

1. **Vuelve la contraseña temporal** en Patient, Employee y Guardian invitation: el Figma muestra *Temporary password*,
   "To sign in, use the temporary password above." y el botón *Sign in*. Esto revierte la decisión del 2026-11-19 (link
   de un solo uso). Se siguió el Figma; la recomendación de no mandar contraseñas por mail sigue en pie.
2. **Pantallas del Figma a medio cambiar.** Se completaron y quedan como propuesta:
   - *Rescheduled (booked)*: el título dice "Appointment scheduled" y la primera línea, "has been canceled". Quedó
     "Appointment rescheduled" / "has been rescheduled".
   - *Treatment plan ready*: repite "To sign in, use the temporary password above." y *Sign in*. Quedó "To review it,
     open the treatment plan." y *Review treatment plan*, siguiendo el patrón de *Document to sign*.
   - *Employee account ready*: muestra el texto del paciente y "Clinic Florida". Quedó "Employee account created" y
     "Your employee account at {{practice_name}} has been created.".
   - *Subscription canceled*: es una copia de *suspended*, con el título "Treatment plan ready". Quedó como *expired*:
     caja *Subscription details* con "Canceled on" y "To subscribe again, contact our support team.", sin el aviso de
     solo lectura (no hay historia que diga qué pasa con la cuenta al cancelar).
3. **Links de ejemplo del Figma copiados de otro mail** (`set-password?token=…` en turnos y guardian,
   `clinic.florida.confidentally.com` en el onboarding): se usaron las variables de cada mail (`portal_link`,
   `login_link`, `setup_link`).
4. **Datos de ejemplo:** el Figma usa nombres distintos para el mismo rol según la pantalla (John Doe y Alexander Scott
   como dueño; Olivia Brooks y Lily Evans como paciente). La vista previa usa uno por rol: Alexander Scott (dueño), Lily
   Evans (paciente), John Doe (guardian y empleado).
5. **"Sign In"** con mayúscula en *Guardian access added* y **"canceled"/"cancelled"**: se unificó en "Sign in" y en
   "canceled" (inglés de EE. UU., como el Figma), también en los asuntos y los nombres de la lista.
