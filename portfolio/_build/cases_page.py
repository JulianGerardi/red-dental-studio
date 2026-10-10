from common import *
from scenes import rise, story, rail, rail_browser, rail_phone, fan, dev_browser, dev_phone
from builder_ui import pipeline, builder
import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")

p = "../"
APP = "https://juliangerardi.github.io/red-dental-studio/#/patients/patient-0001"
DS = "https://juliangerardi.github.io/red-dental-studio/storybook/?path=/docs/welcome--docs"
BUILDER = "https://juliangerardi.github.io/red-dental-studio/storybook/?path=/docs/builder--docs"
GRILL_EMP = "https://claude.ai/code/artifact/b8691278-bb38-469f-89b1-a323dd661d5d"
GRILL_TEAM = "https://claude.ai/code/artifact/44a2be1f-d2b3-462a-acbd-382cd5c76347"


def write(fn, title, title_es, de, ds, body, noindex=False):
    page = case_page(p, fn, title, title_es, de, ds, body, noindex)
    open(os.path.join(ROOT, "work", fn), "w").write(page)
    print(fn, len(page))


def f(name, title, ae, as_, ce="", cs="", kind="soft", w=1600, h=1000):
    return fig(p, name, w, h, title, ae, as_, ce, cs, kind)


def fig_card(name, w, h, ae, as_, kind, ce="", cs=""):
    c = f"<figcaption>{T(ce, cs)}</figcaption>" if ce else ""
    return (f'<figure class="shot" data-reveal><div class="panel panel--{kind} panel--center">'
            f'<div class="card-shot">{screen(p, name, w, h, ae, as_, zoom=True)}</div></div>{c}</figure>')


def numbers(items):
    return '      <div class="numbers" data-reveal>' + "".join(
        f'<div><b data-count="{n}"{f" data-suffix={chr(34)}{s}{chr(34)}" if s else ""}>{n}{s}</b><span>{T(e, es)}</span></div>' for n, s, e, es in items) + "</div>\n"


def btns(html):
    return f'      <div class="btns" data-reveal>{html}</div>\n'


# ======================= Confidentally (NDA) =======================
FN = "confidentally.html"
b = case_head(
    "Confidentally",
    T("A dental practice platform, redesigned from the front desk to the dental chair and rebuilt as a prototype the whole team can click through.",
      "Una plataforma para clínicas dentales, rediseñada de la recepción al sillón y reconstruida como un prototipo que todo el equipo puede recorrer."),
    [(T("Role", "Rol"), "Lead Product Designer"), (T("Client", "Cliente"), T("Confidential · US", "Confidencial · EE. UU.")), (T("Year", "Año"), "2026"),
     (T("Platform", "Plataforma"), T("Responsive web app", "Web app responsive")), (T("Scope", "Alcance"), T("Audit, UX, UI, prototype", "Auditoría, UX, UI, prototipo")),
     (T("Tools", "Herramientas"), "Figma, Claude Code, React, Storybook")],
)
b += rise(brand_scene(p, "dental", T, big=True), "dental")
b += f"""  <section class="wrap gate-wrap" data-gate="nda-content" data-hash="dd113f6caa9a677a96e4c3a57f6dd18ea4a3e421f85fe9e4a70a3c2f9bd278fb">
    <div class="gate">
      <span class="gate__icon"><svg aria-hidden="true"><use href="#i-lock"/></svg></span>
      <h2>{T("This case study is under NDA", "Este caso está bajo NDA")}</h2>
      <p>{T("The client and product details are confidential. Enter the password to read the process, the decisions and every screen.", "El cliente y los detalles del producto son confidenciales. Ingresá la contraseña para ver el proceso, las decisiones y todas las pantallas.")}</p>
      <form>
        <label class="sr-only" for="nda-password">Password</label>
        <input id="nda-password" name="password" type="password" autocomplete="current-password" data-ph-en="Password" data-ph-es="Contraseña" placeholder="Password">
        <button class="btn" type="submit">{T("Unlock case study", "Desbloquear caso")}</button>
      </form>
      <p class="gate__error" role="alert" aria-live="polite" data-err-empty-en="Type the password to open the case study." data-err-empty-es="Escribí la contraseña para abrir el caso." data-err-wrong-en="That password is not right. Check it and try again." data-err-wrong-es="La contraseña no es correcta. Revisala y probá de nuevo."></p>
      <p class="gate__ask">{T("No password? Write to", "¿No tenés la contraseña? Escribime a")} <span>{EMAIL}</span> {T("and I’ll send it to you.", "y te la paso.")}</p>
    </div>
  </section>
  <div id="nda-content" hidden>
"""
b += chapter(T("Overview", "Resumen"), h2("One product for everyone who works in a dental clinic.", "Un producto para todos los que trabajan en una clínica dental.") + prose(
    ("Confidentally is a practice-management platform for dental clinics. The front desk checks patients in and manages the waiting room, dentists chart teeth and plan treatments, and the billing team closes the day with insurance claims and patient balances.",
     "Confidentally es una plataforma de gestión para clínicas dentales. La recepción registra la llegada de pacientes y maneja la sala de espera, los odontólogos cargan el odontograma y planifican tratamientos, y facturación cierra el día con obras sociales y saldos de pacientes."),
    ("I led the redesign of the interface. Instead of stopping at Figma, I rebuilt the product as a <strong>working prototype with mock data</strong>, so every flow could be tried in a browser, and documented every piece in <strong>Confidentally UI</strong>, a design system that reads the same code.",
     "Lideré el rediseño de la interfaz. En vez de quedarme en Figma, reconstruí el producto como un <strong>prototipo funcional con datos de prueba</strong>, para que cada flujo se pueda probar en el navegador, y documenté cada pieza en <strong>Confidentally UI</strong>, un design system que lee el mismo código.")) +
    f'      <div class="note" data-reveal><svg aria-hidden="true"><use href="#i-info"/></svg><p>{T("Everything shown here is my redesign running on invented data. No real patient, clinic or client information appears in this case study.", "Todo lo que se ve acá es mi rediseño funcionando con datos inventados. No aparece información real de pacientes, clínicas ni del cliente.")}</p></div>\n', "overview")
b += chapter(T("The challenge", "El desafío"), h2("A product that grew module by module.", "Un producto que creció módulo por módulo.") + prose(
    ("Each area had been designed on its own. Screens didn’t share a grid, appointment cards were rewritten by hand in several places, and Spanish strings slipped into English modals. For people who keep the app open all day, those small breaks add up to slower work and more errors.",
     "Cada área se había diseñado por separado. Las pantallas no compartían grilla, las tarjetas de turnos estaban reescritas a mano en varios lugares y se colaban textos en español en modales en inglés. Para quien tiene la app abierta todo el día, esos cortes chicos suman trabajo más lento y más errores.")) +
    "", "challenge")
b += big_words("One coherent system from the front desk to the dental chair, without slowing down anyone who already knows the product.",
               "Un sistema coherente de la recepción al sillón, sin frenar a nadie que ya conoce el producto.")
steps = [("Inventory the live product", "Relevar el producto en producción", "Every route of the production app mapped at 1440×900 and rated by complexity, from the login to the seven Clinical Mode modules.", "Cada ruta de la app en producción relevada a 1440×900 y clasificada por complejidad, del login a los siete módulos de Clinical Mode."),
         ("Audit the Figma file, module by module", "Auditar el Figma, módulo por módulo", "Dashboard, Patients, Scheduling, Treatments, Documents and Relationships: <strong>44 anomalies</strong> logged and numbered so the team could cite them without ambiguity.", "Dashboard, Patients, Scheduling, Treatments, Documents y Relationships: <strong>44 anomalías</strong> registradas y numeradas para que el equipo las pueda citar sin ambigüedad."),
         ("Agree on conventions", "Acordar convenciones", "Keep the Figma proportions with an 11px floor for text in cards, open two- and three-column grids at 1024px, fix what is visual and document the rest.", "Mantener las proporciones del Figma con un mínimo de 11px para el texto en tarjetas, abrir las grillas de dos y tres columnas a 1024px, corregir lo visual y documentar el resto."),
         ("Rebuild it as a working prototype", "Reconstruirlo como prototipo funcional", "React, TypeScript and Tailwind on mock data, built with Claude Code. Real flows, such as booking an appointment with a treatment plan, can be tried in a browser and tested with users.", "React, TypeScript y Tailwind con datos de prueba, hecho con Claude Code. Los flujos reales, como dar un turno con plan de tratamiento, se pueden probar en el navegador y testear con usuarios."),
         ("Turn the result into a system", "Convertir el resultado en un sistema", "Every button, card and screen went into Confidentally UI, with the reasons behind each decision and scripts that flag when the code drifts.", "Cada botón, tarjeta y pantalla pasó a Confidentally UI, con el porqué de cada decisión y scripts que avisan cuando el código se desvía.")]
ol = '      <ol class="steps">' + "".join(f'<li data-reveal><span class="steps__n">{i + 1:02d}</span><div><h3>{T(a, c)}</h3><p>{T(d, e)}</p></div></li>' for i, (a, c, d, e) in enumerate(steps)) + "</ol>\n"
anom = [("#02 · Dashboard", "The date picker shows 30-02-2026, a date that doesn’t exist.", "El selector de fecha muestra 30-02-2026, una fecha que no existe."),
        ("#08 · Dashboard", "Type inside cards drops as low as 5.87px.", "El texto dentro de las tarjetas baja hasta 5,87px."),
        ("#14 · Patients", "Two different primary blues, #0056ef and #1d56bc.", "Dos azules primarios distintos, #0056ef y #1d56bc."),
        ("#21 · Scheduling", "All seven calendar columns are labelled “THUR”.", "Las siete columnas del calendario dicen “THUR”."),
        ("#34 · Documents", "A banner says the patient is a minor; the profile says 50 years old.", "Un banner dice que el paciente es menor; el perfil dice 50 años."),
        ("#42 · Relationships", "No button on any screen leads to “Add Relationship”.", "Ningún botón de ninguna pantalla lleva a “Add Relationship”.")]
grid = f'      <h3 class="sub" data-reveal>{T("A few of the 44 anomalies", "Algunas de las 44 anomalías")}</h3>\n      <div class="grid-cards" data-reveal>' + "".join(f"<div><b>{k}</b><span>{T(e, s)}</span></div>" for k, e, s in anom) + "</div>\n"
b += chapter(T("Approach", "Enfoque"), h2("Audit first, then design, then build.", "Primero auditar, después diseñar, después construir.") + ol + grid, "approach")
tour = [("Dashboard: the day at a glance", "Dashboard: el día de un vistazo",
         "The front desk lives here. Appointments, the waiting room and the operatories sit side by side, and one date control drives all three, with a 1-of-4 signature banner instead of a stack of alerts.",
         "La recepción vive acá. Turnos, sala de espera y consultorios van uno al lado del otro, y un solo control de fecha maneja los tres, con un banner de firmas de 1 de 4 en vez de una pila de alertas."),
        ("Patient record", "Ficha del paciente",
         "Identity and the two actions that matter most, Start Encounter and Clinical Mode, stay in reach while tabs change. Clinical accordions show allergies and medication counts before they’re opened.",
         "La identidad y las dos acciones más importantes, Start Encounter y Clinical Mode, quedan a mano mientras cambian las pestañas. Los acordeones clínicos muestran alergias y medicación antes de abrirlos."),
        ("Clinical Mode", "Clinical Mode",
         "A takeover without the app shell, because the dentist needs the whole screen: the odontogram at the center, ten exams one tap away and the treatment plan on the left.",
         "Una vista a pantalla completa sin el marco de la app, porque el odontólogo necesita toda la pantalla: el odontograma al centro, diez exámenes a un toque y el plan de tratamiento a la izquierda."),
        ("Scheduling", "Agenda",
         "Day, week and month share one legend with seven appointment states. A new appointment is a two-step wizard, with free slots in a side panel.",
         "Día, semana y mes comparten una leyenda con siete estados de turno. Un turno nuevo es un asistente de dos pasos, con los horarios libres en un panel lateral."),
        ("Billing and ledger", "Facturación y cuenta corriente",
         "Receivables split between what patients owe and what insurance carriers owe, with overdue balances apart. Payments open as panels over the ledger.",
         "Las cuentas por cobrar se separan entre lo que deben los pacientes y las aseguradoras, con los vencidos aparte. Los pagos se abren como paneles sobre la cuenta corriente."),
        ("Notifications with a “pending” state", "Notificaciones con estado “pendiente”",
         "Inbox, unread and archived, like Notion, plus pending: here a notification is a task. Sign a consent, confirm an appointment, verify an insurance plan.",
         "Entrada, no leídas y archivadas, como Notion, más pendiente: acá una notificación es una tarea. Firmar un consentimiento, confirmar un turno, verificar una cobertura.")]
shots = [("d-dashboard", "Dashboard with appointments, waiting room and operatories", "Dashboard con turnos, sala de espera y consultorios"),
         ("d-patient", "Patient record with side panel and clinical accordions", "Ficha del paciente con panel lateral y acordeones clínicos"),
         ("d-clinical", "Clinical Mode with odontogram and treatment plan", "Clinical Mode con odontograma y plan de tratamiento"),
         ("d-scheduling", "Weekly calendar with appointments by status", "Calendario semanal con turnos por estado"),
         ("d-billing", "Billing overview with receivables", "Resumen de facturación con cuentas por cobrar"),
         ("d-notifications", "Notifications inbox with pending state", "Bandeja de notificaciones con estado pendiente")]
b += scene_head(T("Key screens", "Pantallas clave"), "Designed around the moment each person is in.", "Diseñado alrededor del momento de cada persona.",
                "Each screen is organised around one role: the front desk in the morning, the dentist at the chair, billing at the end of the day.",
                "Cada pantalla se organiza alrededor de un rol: la recepción a la mañana, el odontólogo en el sillón, facturación al cierre del día.", "screens")
b += story(tour, [([i], dev_browser(p, n, 1600, 1000, "app.confidentally.com", alt_en=ae, alt_es=as_)) for i, (n, ae, as_) in enumerate(shots)], "dental", "Key screens")
b += f'  <section class="wrap" style="margin-top:clamp(56px,7vw,110px)">' + pair(f("d-patients", "Patients", "Patients list with search and status", "Lista de pacientes con búsqueda y estado"),
                                                                                f("d-ledger", "Ledger", "Patient ledger with transactions", "Cuenta corriente del paciente con movimientos", kind="dental")) + "</section>\n"
b += fan(p, ["d-m-dashboard", "d-m-patient", "d-m-scheduling"], "The same product in a dentist’s pocket.", "El mismo producto en el bolsillo del odontólogo.",
         "Every screen is responsive. On a phone the patient menu turns into horizontal tabs and panels stack in the order a clinician reads them.",
         "Todas las pantallas son responsive. En el celular el menú del paciente pasa a pestañas horizontales y los paneles se apilan en el orden en que los lee un profesional.")
# ---- the patient file, screen by screen (Figma), and its UI kit ----
def cwin(name, w, h, ce="", cs="", ae="", as_="", maxw=""):
    return swin(p, name, w, h, "app.confidentally.com", "panel--dental", ce, cs, ae, as_, maxw=maxw)


b += chapter(T("Patient file", "Ficha del paciente"), h2("Everything about a patient, one click away.", "Todo sobre un paciente, a un clic.") + prose(
    ("The patient file got its own redesign in Figma: a summary card that never leaves the left column, six sections under it, and every task as a drawer over the page, so the dentist never loses sight of the patient.",
     "La ficha del paciente tuvo su propio rediseño en Figma: una card de resumen que nunca deja la columna izquierda, seis secciones debajo y cada tarea como un panel sobre la página, para que el odontólogo nunca pierda de vista al paciente.")) +
    decision("Overview, before the chair", "Resumen, antes del sillón",
             f"<p>{T('Triage and chief complaint on top, the four clinical histories folded with their counts, insurance coverage, pending tasks and the next appointment requests: what the dentist needs before sitting down.', 'Triage y motivo de consulta arriba, las cuatro historias clínicas plegadas con su cantidad, la cobertura, las tareas pendientes y los próximos turnos: lo que el odontólogo necesita antes de sentarse.')}</p>",
             cwin("c-overview", 1976, 2000, ae="Patient overview with clinical status, histories, insurance, tasks and appointments", as_="Resumen del paciente con estado clínico, historias, cobertura, tareas y turnos", maxw="720px")) +
    decision("Treatment plans as cards", "Planes de tratamiento en cards",
             f"<p>{T('Each plan shows who it is for, its case code, a progress ring, the date it was created and the total, so status and amount read at a glance.', 'Cada plan muestra a quién corresponde, su código de caso, un anillo de progreso, la fecha de creación y el total, así el estado y el monto se leen de un vistazo.')}</p>",
             cwin("c-treatment", 2000, 1751, ae="Treatment plan cards with progress and totals", as_="Cards de planes de tratamiento con progreso y totales")) +
    decision("Relationships and billing", "Relaciones y facturación",
             f"<p>{T('Guardians, guarantors and the household in one place. Editing a relationship opens a drawer: the person, found or created, and whether they are the guardian or the guarantor. The direction can’t change, and the drawer says so.', 'Tutores, garantes y grupo familiar en un solo lugar. Editar una relación abre un panel: la persona, encontrada o creada, y si es tutor o garante. La dirección no se puede cambiar, y el panel lo dice.')}</p>",
             cwin("c-relationships", 1959, 1691, ae="Relationships and billing with the edit relationship drawer", as_="Relaciones y facturación con el panel para editar la relación")) +
    decision("A new patient, in steps", "Un paciente nuevo, por pasos",
             f"<p>{T('Step one links a person who already exists or creates the account with their email; step two adds the guardian, who can also be the guarantor, so a minor is never left without one.', 'El primer paso vincula a una persona que ya existe o crea la cuenta con su mail; el segundo suma al tutor, que también puede ser el garante, así un menor nunca queda sin uno.')}</p>",
             pair(cwin("c-newpatient-1", 1957, 1787, "<b>Step 1.</b> Link an existing person or create the account.", "<b>Paso 1.</b> Vincular a una persona que ya existe o crear la cuenta.", "New patient drawer, step 1", "Panel de paciente nuevo, paso 1"),
                  cwin("c-newpatient-2", 1957, 1788, "<b>Step 2.</b> The guardian, who can also be the guarantor.", "<b>Paso 2.</b> El tutor, que también puede ser el garante.", "New patient drawer, step 2", "Panel de paciente nuevo, paso 2"))), "patient-file")


def ck(n, w, h, label):
    return kit_state(p, n, w, h, label, w / 2)


b += kit_section("kit", "kd--dental", ("Every component, every state.", "Cada componente, cada estado."),
                 ("The patient file is built from a short list of pieces, each one designed with its states so the same card works on every screen. These are the ones it uses, straight from the Figma file.",
                  "La ficha del paciente se arma con una lista corta de piezas, cada una diseñada con sus estados para que la misma card funcione en todas las pantallas. Estas son las que usa, tal cual están en el Figma."), None, [
    kit_comp("Patient card", "Card del paciente", "Name, age and a verified check, with Start Encounter as the main action. It stays in the left column on every section.",
             "Nombre, edad y un check de verificado, con Start Encounter como acción principal. Queda en la columna izquierda en todas las secciones.",
             [ck("c-kit-patient", 356, 236, "Default")]),
    kit_comp("Section menu", "Menú de secciones", "The six sections of the file. The active one fills with the primary blue.", "Las seis secciones de la ficha. La activa se llena con el azul primario.",
             [ck("c-kit-menu", 360, 450, T("Active", "Activa"))]),
    kit_comp("Clinical status", "Estado clínico", "Two chips say what is done and what is missing before the encounter; clinical mode is one click away.",
             "Dos chips dicen qué está hecho y qué falta antes de la consulta; el modo clínico queda a un clic.",
             [ck("c-kit-chips", 372, 72, T("Done · missing", "Hecho · falta")), ck("c-kit-clinical-btn", 296, 80, T("Primary with icon", "Primario con ícono"))]),
    kit_comp("Pending task", "Tarea pendiente", "Who, which doctor and what kind of task, with the deadline and its state in red when it has passed.",
             "Quién, qué doctor y qué tipo de tarea, con el vencimiento y su estado en rojo cuando ya pasó.",
             [ck("c-kit-task", 640, 210, T("Expired", "Vencida")), ck("c-kit-filter", 130, 68, T("Filter", "Filtro"))]),
    kit_comp("Clinical accordion", "Acordeón clínico", "Allergies, conditions, medication and surgeries show their count before they are opened.",
             "Alergias, condiciones, medicación y cirugías muestran su cantidad antes de abrirlas.",
             [ck("c-kit-acc-open", 656, 86, T("Open", "Abierto")), ck("c-kit-acc-closed", 656, 86, T("Closed", "Cerrado"))], "kd__comp--col"),
    kit_comp("Treatment plan card", "Card de plan de tratamiento", "Patient, case code, progress ring, date and total amount.", "Paciente, código de caso, anillo de progreso, fecha y monto total.",
             [ck("c-kit-plan", 656, 440, T("Completed · 100%", "Completado · 100%"))]),
    kit_comp("Insurance coverage", "Cobertura", "Order, carrier, plan, subscriber and relation in one table, with primary and secondary told apart by colour.",
             "Orden, aseguradora, plan, titular y relación en una tabla, con la primaria y la secundaria diferenciadas por color.",
             [ck("c-kit-insurance", 1322, 354, T("Primary and secondary", "Primaria y secundaria"))], "kd__comp--span"),
    kit_comp("Appointment requests", "Pedidos de turno", "Next, waiting list and past share one card; the next ones get the blue border and the rest step back.",
             "Próximos, lista de espera y pasados comparten una card; los próximos llevan el borde azul y el resto queda atrás.",
             [ck("c-kit-tabs", 1242, 64, T("Tabs", "Pestañas")), ck("c-kit-appt-on", 620, 126, T("Next", "Próximo")), ck("c-kit-appt-off", 620, 122, T("Waiting list · past", "En espera · pasado"))], "kd__comp--span"),
    kit_comp("Person card", "Card de persona", "The person found by the search, and the same card once it is chosen.", "La persona que encontró la búsqueda, y la misma card una vez elegida.",
             [ck("c-kit-person-off", 712, 140, T("Found", "Encontrada")), ck("c-kit-person-on", 712, 152, T("Selected", "Seleccionada"))], "kd__comp--col"),
    kit_comp("Option", "Opción", "Radio options as cards: the chosen one gets the border, and it can hold two lines of explanation.",
             "Opciones de radio como cards: la elegida lleva el borde, y puede sumar dos líneas de explicación.",
             [ck("c-kit-radio-on", 712, 84, T("Selected", "Seleccionada")), ck("c-kit-radio-off", 712, 80, T("Unselected", "Sin seleccionar")), ck("c-kit-option-link", 712, 122, T("Two lines", "Dos líneas"))], "kd__comp--col"),
    kit_comp("Stepper", "Pasos", "Where you are in the flow: the current step in blue, the finished ones in green.", "Dónde estás en el flujo: el paso actual en azul, los terminados en verde.",
             [ck("c-kit-step1", 712, 86, T("Step 1 of 2", "Paso 1 de 2")), ck("c-kit-step2", 712, 86, T("Step 2 of 3", "Paso 2 de 3"))], "kd__comp--col"),
    kit_comp("Fields", "Campos", "Label, a red asterisk when it is required, and a placeholder that shows the format.", "Label, un asterisco rojo cuando es obligatorio y un placeholder que muestra el formato.",
             [ck("c-kit-input", 712, 114, T("Text", "Texto")), ck("c-kit-date", 712, 110, T("Date", "Fecha")), ck("c-kit-select", 712, 120, "Select"), ck("c-kit-search", 506, 62, T("Search", "Búsqueda"))], "kd__comp--col"),
    kit_comp("Drawer actions", "Acciones del panel", "Every drawer ends the same way: the primary action full width and cancel under it.", "Todos los paneles terminan igual: la acción principal a todo el ancho y cancelar debajo.",
             [ck("c-kit-save", 712, 168, T("Save · cancel", "Guardar · cancelar")), ck("c-kit-next", 712, 172, T("Next step · cancel", "Siguiente paso · cancelar"))], "kd__comp--col"),
    kit_comp("Patients table", "Tabla de pacientes", "Initials in a blue avatar, name, birthday and email.", "Iniciales en un avatar azul, nombre, cumpleaños y mail.",
             [ck("c-kit-row", 934, 92, T("Row", "Fila"))]),
])
b += chapter("Design system", h2("Confidentally UI keeps the redesign from drifting.", "Confidentally UI evita que el rediseño se desvíe.") + prose(
    ("The design system went from Figma to code with Claude Code and lives in Storybook, where the developers take each component. It has its own case study.",
     "El design system pasó de Figma al código con Claude Code y vive en Storybook, de donde los devs toman cada componente. Tiene su propio caso.")) +
    btns(f'<a class="btn btn--ghost" href="confidentally-ui.html">{T("Read the design system case study", "Ver el caso del design system")} {arrow("i-right")}</a>'), "system")
b += chapter(T("Outcome", "Resultado"), h2("A product the team can open, click and build from.", "Un producto que el equipo puede abrir, recorrer y usar de base.") +
             numbers([(32, "", "screens working in the browser", "pantallas funcionando en el navegador"), (139, "", "documented pieces", "piezas documentadas"),
                      (481, "", "live examples", "ejemplos en vivo"), (44, "", "anomalies found and cited", "anomalías encontradas y citadas")]) +
             prose(("Developers get components that already exist in code, product gets a prototype to test with clinics, and design gets one place where every decision is written down.",
                    "Desarrollo recibe componentes que ya existen en código, producto recibe un prototipo para probar con clínicas y diseño tiene un solo lugar donde cada decisión queda escrita.")) +
             btns(f'<a class="btn" href="{APP}" target="_blank" rel="noopener">{T("Open the prototype", "Abrir el prototipo")} {arrow()}</a><a class="btn btn--ghost" href="{DS}" target="_blank" rel="noopener">{T("Open the design system", "Abrir el design system")} {arrow()}</a>'), "outcome")
b += "  </div>\n"
write(FN, "Confidentally", "Confidentally", "Redesign of a dental practice platform. Case study by Julián Gerardi.", "Rediseño de una plataforma para clínicas dentales. Caso de Julián Gerardi.", b, noindex=True)


# ======================= Confidentally UI =======================
FN = "confidentally-ui.html"
b = case_head(
    "Confidentally UI",
    T("A living design system: every button, table and screen of the app, working and explained, plus a Builder that assembles new screens from the real components.",
      "Un design system vivo: cada botón, tabla y pantalla de la app, funcionando y explicado, más un Builder que arma pantallas nuevas con los componentes reales."),
    [(T("Role", "Rol"), "Design system lead"), (T("Product", "Producto"), "Confidentally"), (T("Year", "Año"), "2026"),
     (T("Built with", "Hecho con"), "Figma, Claude Code, Storybook"), ("AI", T("Gemini API in the Builder", "Gemini API en el Builder")), (T("Scope", "Alcance"), T("Tokens, docs, audit, builder", "Tokens, docs, auditoría, builder"))],
    links=f'<a class="btn" href="{DS}" target="_blank" rel="noopener">{T("Open the design system", "Abrir el design system")} {arrow()}</a><a class="btn btn--ghost" href="{BUILDER}" target="_blank" rel="noopener">{T("Try the Builder", "Probar el Builder")} {arrow()}</a>',
)
b += rise(f'<div class="bs bs--ds"><div class="bs__dev bs__dev--win" style="left:14%;top:8%;width:72%">{browser(p, "ds-welcome", 1600, 1000, "juliangerardi.github.io/red-dental-studio/storybook", lazy=False, view="fit")}</div></div>', "ds")
b += chapter(T("Overview", "Resumen"), h2("Documentation that can’t fall out of date.", "Documentación que no se puede desactualizar.") + prose(
    ("The design system was designed in Figma. With Claude Code I took it to code, component by component, and published it in Storybook, where the developers take each piece. Storybook imports the same components the app uses, so <strong>when the code changes, the documentation changes with it.</strong>",
     "El design system se diseñó en Figma. Con Claude Code lo llevé al código, componente por componente, y lo publiqué en Storybook, de donde los devs toman cada pieza. Storybook importa los mismos componentes que usa la app, así que <strong>cuando cambia el código, la documentación cambia con él.</strong>"),
    ("I hid Storybook’s own chrome and designed a documentation site on top: a top bar with six sections, a search, a menu per section and the same page layout for every component.",
     "Oculté la interfaz propia de Storybook y diseñé encima un sitio de documentación: una barra superior con seis secciones, un buscador, un menú por sección y el mismo layout de página para cada componente.")) +
    numbers([(139, "", "pieces", "piezas"), (32, "", "screens", "pantallas"), (481, "", "live examples", "ejemplos en vivo"), (174, "", "documentation pages", "páginas de documentación")]), "overview")
b += pipeline("From Figma to Storybook, through Claude Code.", "De Figma a Storybook, pasando por Claude Code.")
b += chapter(T("The problem", "El problema"), h2("The same thing, built several ways.", "Lo mismo, hecho de varias formas.") + prose(
    ("Screen titles came in at 20, 24 and 36px. The appointment card of the patient overview was written by hand, and the calendar one was repeated three times in the same file. Colors were typed as hex values instead of tokens. Designers and developers needed one answer to the same question: <strong>which one do I use?</strong>",
     "Los títulos de pantalla aparecían en 20, 24 y 36px. La tarjeta de turno del resumen del paciente estaba escrita a mano y la del calendario se repetía tres veces en el mismo archivo. Los colores se escribían como hexadecimales en vez de tokens. Diseño y desarrollo necesitaban una respuesta a la misma pregunta: <strong>¿cuál uso?</strong>")), "problem")
b += big_words("Designers and developers needed one answer to the same question: which one do I use?",
               "Diseño y desarrollo necesitaban una respuesta a la misma pregunta: ¿cuál uso?")
st = [("Foundations", "Foundations", "Colors, typography, radius and shadows, read from the app’s CSS, each token with its light and dark value.", "Colores, tipografía, radios y sombras, leídos del CSS de la app, cada token con su valor claro y oscuro."),
      ("Elements", "Elements", "Ten standard pieces: page header, buttons, fields, tabs, pills, cards, appointment cards, tables, navigation and the patient menu.", "Diez piezas estándar: encabezado, botones, campos, pestañas, pills, tarjetas, tarjetas de turno, tablas, navegación y el menú del paciente."),
      ("Components", "Components", "128 pieces by module: Clinical 39, UI 20, Dashboard 12, Patients 12, Ledger 11, Settings 11, Scheduling 9, Layout 8, Help 5, Billing 1.", "128 piezas por módulo: Clinical 39, UI 20, Dashboard 12, Patients 12, Ledger 11, Settings 11, Scheduling 9, Layout 8, Help 5, Billing 1."),
      ("Pages", "Pages", "Every route of the app, mounted from the same router.", "Cada ruta de la app, montada desde el mismo router."),
      ("Audit", "Audit", "What the code does today that departs from the standard, measured by scripts.", "Lo que hoy hace el código que se aparta del estándar, medido con scripts."),
      ("Builder", "Builder", "Where the pieces come together into new screens, by hand or described in words.", "Donde las piezas se juntan en pantallas nuevas, a mano o describiéndolas con palabras.")]
ol = '      <ol class="steps">' + "".join(f'<li data-reveal><span class="steps__n">{i + 1:02d}</span><div><h3>{T(a, c)}</h3><p>{T(d, e)}</p></div></li>' for i, (a, c, d, e) in enumerate(st)) + "</ol>\n"
b += chapter(T("Structure", "Estructura"), h2("From the smallest decision to the whole screen.", "De la decisión más chica a la pantalla entera.") + ol +
             "      " + f("ds-components", "Components", "Components overview grouped by module", "Resumen de componentes agrupados por módulo", kind="ds") + "\n", "structure")
b += chapter(T("A component page", "Una página de componente"), h2("Three questions answered before anyone scrolls.", "Tres preguntas respondidas antes de scrollear.") +
             '      <div class="prose" data-reveal>' + f"<p>{T('Every page follows the same order: breadcrumb, name, one sentence, and Overview, Guidelines and Code tabs. Three status cards answer what a team asks first:', 'Cada página sigue el mismo orden: breadcrumb, nombre, una frase y las pestañas Overview, Guidelines y Code. Tres tarjetas de estado responden lo primero que pregunta un equipo:')}</p>"
             + bullets(("Component · Ready", "Component · Ready", "when it has a playground and documented decisions.", "cuando tiene playground y decisiones documentadas."),
                       ("Usage", "Usage", "counted in the code, such as “Used in 10 files”.", "contado en el código, como “Used in 10 files”."),
                       ("Design", "Design", "with the decisions behind it, under “Why it looks like this”.", "con las decisiones detrás, bajo “Why it looks like this”."))
             + f"<p>{T('Specs are measured from the rendered component, not typed by hand.', 'Las medidas se toman del componente dibujado, no se escriben a mano.')}</p></div>\n"
             + "      " + f("ds-buttons", "Elements · Buttons", "Buttons documentation page with status cards", "Página de documentación de botones con tarjetas de estado") + "\n", "anatomy")
b += chapter(T("Designed from the code", "Diseñado desde el código"), h2("I measured the button before I designed it.", "Medí el botón antes de diseñarlo.") +
             '      <div class="pair" data-reveal>' + f"<div class=\"prose\"><p>{T('Each variant, <strong>primary, secondary, ghost, link and destructive</strong>, is the look the code already used most for that kind of action. The sizes, <strong>28, 32 and 36px</strong>, are the three heights the app used most. Hover, pressed, focus, disabled and loading are solved once, in one component.', 'Cada variante, <strong>primary, secondary, ghost, link y destructive</strong>, es el aspecto que el código ya usaba más para ese tipo de acción. Los tamaños, <strong>28, 32 y 36px</strong>, son las tres alturas más usadas en la app. Hover, presionado, foco, deshabilitado y cargando se resuelven una sola vez, en un componente.')}</p></div>"
             + f"<div class=\"prose\"><p>{T('The same logic shaped the <strong>appointment cards</strong>: one appointment appears in four places, and each place gets the card that serves it. Same patient, same time, same status.', 'La misma lógica definió las <strong>tarjetas de turno</strong>: un turno aparece en cuatro lugares y cada lugar tiene la tarjeta que le sirve. Mismo paciente, mismo horario, mismo estado.')}</p></div></div>\n"
             + "      " + f("ds-appt-cards", "Elements · Appointment cards", "Appointment cards documentation page", "Página de documentación de tarjetas de turno", kind="ds") + "\n", "from-code")
b += chapter(T("Search", "Buscador"), h2("Search in the words people actually use.", "Buscar con las palabras que la gente usa.") + prose(
    ("The search reads names, descriptions, examples and Spanish synonyms. Typing <strong>“turno”</strong> finds every appointment component, even though none of them is called that in the code.",
     "El buscador lee nombres, descripciones, ejemplos y sinónimos en español. Escribir <strong>“turno”</strong> encuentra todos los componentes de turnos, aunque ninguno se llame así en el código.")) +
    "      " + f("ds-search", "Confidentally UI · Search", "Search results for the word turno", "Resultados de búsqueda para la palabra turno") + "\n", "search")
b += chapter(T("Builder with AI", "Builder con IA"), h2("An AI that builds screens with the design system’s own components.", "Una IA que arma pantallas con los componentes del propio design system.") +
             '      <div class="prose" data-reveal>' + f"<p>{T('The Builder assembles screens from the app’s own components on a canvas that starts with the real sidebar and top bar. <strong>Layers</strong> shows the tree, <strong>Code</strong> gives the TSX with its imports, <strong>PNG</strong> exports the design and <strong>Share link</strong> compresses it into the URL, with nothing uploaded to a server.', 'El Builder arma pantallas con los componentes de la propia app, sobre un lienzo que arranca con la barra lateral y la barra superior reales. <strong>Layers</strong> muestra el árbol, <strong>Code</strong> da el TSX con sus imports, <strong>PNG</strong> exporta el diseño y <strong>Share link</strong> lo comprime en la URL, sin subir nada a un servidor.')}</p>"
             + f"<p>{T('<strong>Describe</strong> goes further: write “a patients screen with metrics, the table and today’s appointments on the right”, and it searches 379 pieces and 33 blocks and builds the screen block by block.', '<strong>Describe</strong> va más allá: escribís “una pantalla de pacientes con métricas, la tabla y a la derecha los turnos del día” y busca entre 379 piezas y 33 bloques y arma la pantalla bloque por bloque.')}</p>"
             + bullets(("With a free Gemini key,", "Con una clave gratis de Gemini,", "the model streams its reasoning and can only answer with pieces from the catalog.", "el modelo muestra su razonamiento y solo puede responder con piezas del catálogo."),
                       ("Without a key,", "Sin clave,", "a parser splits the sentence and recognizes about 45 kinds of data for fields.", "un parser divide la frase y reconoce unos 45 tipos de dato para los campos."),
                       ("Every result can be undone,", "Todo se puede deshacer,", "and each block keeps its alternatives.", "y cada bloque guarda sus alternativas."),
                       ("A privacy note", "Un aviso de privacidad", "asks people not to type real patient data.", "pide no escribir datos reales de pacientes.")) + "</div>\n"
             , "builder")
b += builder()
b += chapter(T("Governance", "Gobierno"), h2("The system tells you when the code drifts.", "El sistema avisa cuando el código se desvía.") +
             '      <div class="prose" data-reveal>' + bullets(("Audit pages", "Las páginas de Audit", "list colors without a token, pieces written outside the components, duplicates and missing states.", "listan colores sin token, piezas escritas fuera de los componentes, duplicados y estados faltantes."),
                                                          ("In CI,", "En CI,", "a check reports hard-coded colors that already have a token.", "un chequeo reporta colores escritos a mano que ya tienen token."),
                                                          ("Headers in the app", "Headers in the app", "detects which header each screen uses and flags the ones that differ.", "detecta qué encabezado usa cada pantalla y marca los que no coinciden.")) + "</div>\n"
             + "      " + pair(f("ds-audit", "Audit", "Audit overview", "Resumen de auditoría"), f("ds-colors", "Foundations · Colors", "Color tokens with light and dark values", "Tokens de color con valores claro y oscuro")) + "\n", "governance")
b += chapter(T("Outcome", "Resultado"), h2("One answer to “which one do I use?”", "Una respuesta a “¿cuál uso?”") + prose(
    ("Published next to the app, updated from the code, and shared by design, development and product. The Builder turns it into a tool: a new screen starts from real components instead of a blank frame.",
     "Publicado junto a la app, actualizado desde el código y compartido por diseño, desarrollo y producto. El Builder lo convierte en una herramienta: una pantalla nueva arranca desde componentes reales y no desde un frame en blanco.")) +
    btns(f'<a class="btn" href="{DS}" target="_blank" rel="noopener">{T("Open the design system", "Abrir el design system")} {arrow()}</a><a class="btn btn--ghost" href="confidentally.html">{T("Read the product case study", "Ver el caso del producto")}</a>'), "outcome")
write(FN, "Confidentally UI", "Confidentally UI", "A living design system with search and an AI Builder. Case study by Julián Gerardi.", "Un design system vivo con buscador y un Builder con IA. Caso de Julián Gerardi.", b)


# ======================= GRILL =======================
FN = "grill.html"
b = case_head(
    "GRILL Empresas",
    T("Lunch for companies, ordered from the phone. Two connected web apps for a kitchen in Mercedes: one for the people who eat, one for the team that cooks.",
      "Almuerzos para empresas, pedidos desde el celular. Dos web apps conectadas para una cocina de Mercedes: una para quienes comen y otra para el equipo que cocina."),
    [(T("Role", "Rol"), T("Product designer, UX/UI", "Diseñador de producto, UX/UI")), (T("Client", "Cliente"), "GRILL · Mercedes, AR"), (T("Year", "Año"), "2026"),
     (T("Platform", "Plataforma"), T("Mobile web + desktop panel", "Web mobile + panel de escritorio")), (T("Language", "Idioma"), T("Rioplatense Spanish", "Español rioplatense")), (T("Tools", "Herramientas"), "Figma, Claude Code, React")],
    links=f'<a class="btn" href="{GRILL_EMP}" target="_blank" rel="noopener">{T("Try the employee app", "Probar la app de empleados")} {arrow()}</a><a class="btn btn--ghost" href="{GRILL_TEAM}" target="_blank" rel="noopener">{T("Try the kitchen panel", "Probar el panel de cocina")} {arrow()}</a>',
    note=T("Demo: sign in with any email and password.", "Demo: ingresá con cualquier email y contraseña."),
)
b += rise(brand_scene(p, "grill", T, big=True), "grill")
b += chapter(T("Overview", "Resumen"), h2("A kitchen that feeds whole offices, one tray at a time.", "Una cocina que alimenta oficinas enteras, bandeja por bandeja.") + prose(
    ("GRILL is a kitchen in Mercedes, Buenos Aires that delivers lunch to companies. Each company covers a daily amount per employee and pays at the end of the month; each employee chooses what they eat.",
     "GRILL es una cocina de Mercedes, Buenos Aires, que lleva el almuerzo a empresas. Cada empresa cubre un monto diario por empleado y paga a fin de mes; cada empleado elige qué come."),
    ("I designed both sides of the service and built them as working web apps with an AI-assisted workflow: <strong>GRILL Empresas</strong> for employees and <strong>GRILL Team</strong>, the panel the kitchen runs the day from.",
     "Diseñé los dos lados del servicio y los construí como web apps funcionales con un flujo asistido por IA: <strong>GRILL Empresas</strong> para los empleados y <strong>GRILL Team</strong>, el panel desde el que la cocina maneja el día.")), "overview")
b += chapter(T("The problem", "El problema"), h2("Everything lived on paper and in WhatsApp.", "Todo vivía en papel y en WhatsApp.") + prose(
    ("Kitchen tickets, orders per company, new employee accounts and the monthly account closing. Every day the team gathers choices, counts dishes, labels trays, plans the delivery run and keeps each company’s account, all before 11:30.",
     "Comandas de cocina, pedidos por empresa, altas de empleados y el cierre de cuenta corriente. Cada día el equipo junta los pedidos, cuenta platos, etiqueta bandejas, arma el reparto y lleva la cuenta de cada empresa, todo antes de las 11:30.")) +
    "", "problem")
b += big_words("Make ordering take less than a minute, and turn the kitchen’s morning into a checklist.",
               "Que pedir lleve menos de un minuto, y que la mañana de la cocina sea una lista de tareas.")
b += chapter(T("Two users", "Dos usuarios"), h2("Same orders, two very different mornings.", "Los mismos pedidos, dos mañanas muy distintas.") +
             f'      <div class="grid-cards" data-reveal><div><b>{T("EMPLOYEE · PHONE", "EMPLEADO · CELULAR")}</b><span>{T("<strong>A minute between meetings, before the cutoff.</strong> When is the next delivery, what does the kitchen suggest, how much does the company cover, which side dish.", "<strong>Un minuto entre reuniones, antes del cierre.</strong> Cuándo es la próxima entrega, qué sugiere la cocina, cuánto cubre la empresa, qué guarnición.")}</span></div>'
             f'<div><b>{T("KITCHEN TEAM · DESKTOP", "EQUIPO DE COCINA · ESCRITORIO")}</b><span>{T("<strong>The whole morning, hands busy.</strong> How many of each dish, a label for every tray, the delivery run by company, and what to bill each one.", "<strong>Toda la mañana, con las manos ocupadas.</strong> Cuántos de cada plato, una etiqueta por bandeja, el reparto por empresa y qué facturarle a cada una.")}</span></div></div>\n', "users")
emp = [("The cutoff comes first", "Primero, el horario de cierre",
        "The app opens on the next delivery and a countdown to the 10:30 cutoff. When today’s cutoff has passed, a banner says the order goes to the next delivery.",
        "La app abre con la próxima entrega y una cuenta regresiva al cierre de las 10:30. Si el cierre de hoy ya pasó, un aviso explica que el pedido entra en la próxima entrega."),
       ("Choosing is one step", "Elegir es un solo paso",
        "A dish opens a sheet to pick the side and leave a note for the kitchen, up to 140 characters. The button carries the price, so there’s no surprise.",
        "Un plato abre una hoja para elegir la guarnición y dejar una nota para la cocina, de hasta 140 caracteres. El botón lleva el precio, así no hay sorpresas."),
       ("The full menu, one link away", "La carta completa, a un link",
        "A short selection first, and 59 dishes in 9 categories behind it, filtered by gluten-free and vegetarian. The company allowance stays visible.",
        "Primero una selección corta, y detrás 59 platos en 9 categorías, con filtros sin TACC y vegetariano. El tope de la empresa queda siempre visible."),
       ("My orders", "Mis pedidos",
        "The week or the month day by day, with a summary to download. The copy talks the way people in Mercedes do: “Elegí”, “Tocá”, “¿La olvidaste?”.",
        "La semana o el mes día por día, con un resumen para descargar. Los textos hablan como se habla en Mercedes: “Elegí”, “Tocá”, “¿La olvidaste?”."),
       ("Light and dark", "Claro y oscuro",
        "Both themes come from the same tokens, so the lime accent and the cards read the same at noon and at night.",
        "Los dos temas salen de los mismos tokens, así el verde lima y las tarjetas se leen igual al mediodía y a la noche.")]
phones = [("g-emp-m-app", "Order of the day with the cutoff countdown", "Pedido del día con la cuenta regresiva"),
          ("g-emp-m-modal", "Side dish sheet with a note for the kitchen", "Hoja de guarnición con nota para la cocina"),
          ("g-emp-m-carta", "Full menu by category", "Carta completa por categoría"),
          ("g-emp-m-historial", "Order history by week", "Historial de pedidos por semana"),
          ("g-emp-m-dark-app", "Order of the day in dark mode", "Pedido del día en modo oscuro")]
b += scene_head(T("Employee app", "App de empleados"), "Order lunch in a few taps.", "Pedir el almuerzo en pocos toques.",
                "Employees order from their phones, between meetings, in under a minute. The same orders reach the kitchen panel.",
                "Los empleados piden desde el celular, entre reuniones, en menos de un minuto. Los mismos pedidos llegan al panel de la cocina.", "employees")
b += story(emp, [([i], dev_phone(p, n, ae, as_)) for i, (n, ae, as_) in enumerate(phones)], "grill", "Employee app")
b += rail("The kitchen’s morning, as a checklist.", "La mañana de la cocina, como lista de tareas.",
          "GRILL Team, the panel the kitchen runs the day from. Scroll through the morning, from the summary to the delivery run.",
          "GRILL Team, el panel desde el que la cocina maneja el día. Recorré la mañana, del resumen al reparto.", [
    rail_browser(p, "g-corp-hoy", 1600, 1000, "team.grill.com.ar", T("<b>Summary of the day.</b> Units, orders and companies with the departure time, and one card per job of the morning.", "<b>Resumen del día.</b> Unidades, pedidos y empresas con el horario de salida, y una tarjeta por cada tarea de la mañana.")),
    rail_browser(p, "g-corp-dark-cocina", 1600, 1000, "team.grill.com.ar/cocina", T("<b>Kitchen ticket.</b> Every order added up by dish and side, ticked as it’s cooked, in dark mode for the kitchen.", "<b>Comanda.</b> Todos los pedidos sumados por plato y guarnición, tildados a medida que se cocinan, en modo oscuro para la cocina."), True),
    rail_browser(p, "g-corp-etiquetas", 1600, 1000, "team.grill.com.ar/etiquetas", T("<b>Labels that fit the real sheet</b> of 70 × 25.4 mm. “Start from” reuses a half-used sheet.", "<b>Etiquetas que calzan en la hoja real</b> de 70 × 25,4 mm. “Empezar desde” reutiliza una hoja a medio usar.")),
    rail_browser(p, "g-corp-reparto", 1600, 1000, "team.grill.com.ar/reparto", T("<b>Delivery run</b> by company, with trays per person and a checklist per stop.", "<b>Reparto</b> por empresa, con bandejas por persona y una lista por parada.")),
    rail_browser(p, "g-corp-pedidos", 1600, 1000, "team.grill.com.ar/pedidos", T("<b>Orders</b> for any period and status, with the amount to invoice each company.", "<b>Pedidos</b> de cualquier período y estado, con el monto a facturar a cada empresa.")),
    rail_browser(p, "g-corp-empleados", 1600, 1000, "team.grill.com.ar/empleados", T("<b>Companies and employees.</b> A registration code per company; block an account or make someone admin.", "<b>Empresas y empleados.</b> Un código de registro por empresa; bloquear una cuenta o hacer admin a alguien.")),
])
b += chapter(T("Access", "Acceso"), h2("Two doors, each one explained.", "Dos puertas, cada una explicada.") + prose(
    ("Employees don’t sign up on their own: their company creates the account. The login says so, tells them who to ask and offers companies a proposal. The kitchen has its own internal entrance, with a link back for employees who land there by mistake.",
     "Los empleados no se registran solos: la cuenta la crea su empresa. El login lo explica, dice a quién pedirla y ofrece una propuesta a las empresas. La cocina tiene su propia entrada interna, con un link de vuelta para el empleado que llega ahí por error.")) +
    "      " + pair(f("g-emp-login", "GRILL Empresas · Ingresar", "Employee login", "Login de empleados", kind="grill"), f("g-corp-login", "GRILL Team · Acceso interno", "Internal login for the kitchen panel", "Login interno del panel de cocina", kind="grill")) + "\n", "access")
b += chapter(T("Outcome", "Resultado"), h2("Two apps, one language.", "Dos apps, un mismo lenguaje.") +
             numbers([(2, "", "connected apps", "apps conectadas"), (12, "", "screens", "pantallas"), (59, "", "dishes in the menu", "platos en la carta"), (2, "", "themes, light and dark", "temas, claro y oscuro")]) +
             prose(("Both apps share the GRILL wordmark, the lime accent and the same components, so the kitchen and its clients read the same order the same way.",
                    "Las dos apps comparten el logo de GRILL, el verde lima y los mismos componentes, así la cocina y sus clientes leen el mismo pedido de la misma forma.")), "outcome")
write(FN, "GRILL Empresas", "GRILL Empresas", "Corporate lunch ordering for a kitchen in Mercedes, Buenos Aires. Case study by Julián Gerardi.", "Pedidos de almuerzo para empresas de una cocina en Mercedes, Buenos Aires. Caso de Julián Gerardi.", b)
