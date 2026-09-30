from common import *
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
            f'<div class="card-shot">{img(p, name, w, h, ae, as_, zoom=True)}</div></div>{c}</figure>')


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
     (T("Tools", "Herramientas"), "Figma, Claude, React, Storybook")],
)
b += f'  <section class="wrap case-cover" data-parallax>{cover_mock(p, "dental", "d-login", 1600, 1000, "Red Dental Studio · Login")}</section>\n'
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
    f'      <p class="pull" data-reveal>{T("One coherent system from the front desk to the dental chair, without slowing down anyone who already knows the product.", "Un sistema coherente de la recepción al sillón, sin frenar a nadie que ya conoce el producto.")}</p>\n', "challenge")
steps = [("Inventory the live product", "Relevar el producto en producción", "Every route of the production app mapped at 1440×900 and rated by complexity, from the login to the seven Clinical Mode modules.", "Cada ruta de la app en producción relevada a 1440×900 y clasificada por complejidad, del login a los siete módulos de Clinical Mode."),
         ("Audit the Figma file, module by module", "Auditar el Figma, módulo por módulo", "Dashboard, Patients, Scheduling, Treatments, Documents and Relationships: <strong>44 anomalies</strong> logged and numbered so the team could cite them without ambiguity.", "Dashboard, Patients, Scheduling, Treatments, Documents y Relationships: <strong>44 anomalías</strong> registradas y numeradas para que el equipo las pueda citar sin ambigüedad."),
         ("Agree on conventions", "Acordar convenciones", "Keep the Figma proportions with an 11px floor for text in cards, open two- and three-column grids at 1024px, fix what is visual and document the rest.", "Mantener las proporciones del Figma con un mínimo de 11px para el texto en tarjetas, abrir las grillas de dos y tres columnas a 1024px, corregir lo visual y documentar el resto."),
         ("Rebuild it as a working prototype", "Reconstruirlo como prototipo funcional", "React, TypeScript and Tailwind on mock data, built with Claude as a pair. Real flows, such as booking an appointment with a treatment plan, can be tried in a browser.", "React, TypeScript y Tailwind con datos de prueba, hecho con Claude como compañero. Los flujos reales, como dar un turno con plan de tratamiento, se pueden probar en el navegador."),
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
sc = decision("Dashboard: the day at a glance", "Dashboard: el día de un vistazo",
              f"<p>{T('The front desk lives here. Appointments, the waiting room and the operatories sit side by side, and one date control drives appointments, the waiting room and tasks.', 'La recepción vive acá. Turnos, sala de espera y consultorios van uno al lado del otro, y un solo control de fecha maneja turnos, sala de espera y tareas.')}</p>"
              + bullets(("Stat strip", "Franja de métricas", "with appointments, people waiting and open encounters.", "con turnos, gente esperando y consultas abiertas."),
                        ("Signature banner", "Banner de firmas", "with a 1-of-4 pager instead of a stack of alerts.", "con un paginador de 1 de 4 en vez de una pila de alertas.")),
              f("d-dashboard", "Dashboard", "Dashboard with appointments, waiting room and operatories", "Dashboard con turnos, sala de espera y consultorios", kind="dental"))
sc += decision("Patient record", "Ficha del paciente",
               f"<p>{T('The left panel keeps identity and the two actions that matter most, <strong>Start Encounter</strong> and <strong>Clinical Mode</strong>, in reach while tabs change on the right.', 'El panel izquierdo mantiene la identidad y las dos acciones más importantes, <strong>Start Encounter</strong> y <strong>Clinical Mode</strong>, siempre a mano mientras cambian las pestañas de la derecha.')}</p>"
               + bullets(("Clinical accordions", "Acordeones clínicos", "with counters, so allergies and medication show before they’re opened.", "con contadores, para ver alergias y medicación antes de abrirlos."),
                         ("Pending tasks", "Tareas pendientes", "such as referrals flag expired dates in context.", "como derivaciones marcan las fechas vencidas en contexto.")),
               f("d-patient", "Patients · John Smith", "Patient record with side panel, clinical accordions, insurance and tasks", "Ficha del paciente con panel lateral, acordeones clínicos, seguros y tareas"))
sc += decision("Clinical Mode", "Clinical Mode",
               f"<p>{T('A takeover without the app shell, because the dentist needs the whole screen. The odontogram sits at the center, with ten exams one tap away and the treatment plan to the left.', 'Una vista a pantalla completa sin el marco de la app, porque el odontólogo necesita toda la pantalla. El odontograma va al centro, con diez exámenes a un toque y el plan de tratamiento a la izquierda.')}</p>"
               + bullets(("Last condition", "Última condición", "callout on the chart, so the latest finding is never buried.", "destacada sobre el odontograma, para que el último hallazgo nunca quede escondido.")),
               f("d-clinical", "Clinical Mode", "Clinical Mode with odontogram, treatment plan and problem list", "Clinical Mode con odontograma, plan de tratamiento y lista de problemas", kind="dental"))
sc += decision("Scheduling", "Agenda",
               f"<p>{T('Day, week and month share one legend with seven appointment states. A new appointment is a two-step wizard, patient and time first and treatment plan second, with free slots in a side panel.', 'Día, semana y mes comparten una leyenda con siete estados de turno. Un turno nuevo es un asistente de dos pasos, primero paciente y horario y después plan de tratamiento, con los horarios libres en un panel lateral.')}</p>"
               + bullets(("Patient in session:", "Paciente en consulta:", "a tab on the right edge of every screen lists today’s patients who haven’t finished.", "una pestaña en el borde derecho de cada pantalla lista los pacientes de hoy que todavía no terminaron.")),
               pair(f("d-scheduling", "Scheduling · Week", "Weekly calendar with appointments by status", "Calendario semanal con turnos por estado"),
                    f("d-patients", "Patients", "Patients list with search and status", "Lista de pacientes con búsqueda y estado")))
sc += decision("Billing and ledger", "Facturación y cuenta corriente",
               f"<p>{T('Receivables split between what patients owe and what insurance carriers owe, with overdue balances apart. Payments and adjustments open as panels over the ledger.', 'Las cuentas por cobrar se separan entre lo que deben los pacientes y lo que deben las aseguradoras, con los saldos vencidos aparte. Pagos y ajustes se abren como paneles sobre la cuenta corriente.')}</p>",
               pair(f("d-billing", "Billing", "Billing overview with receivables", "Resumen de facturación con cuentas por cobrar", kind="dental"),
                    f("d-ledger", "Ledger", "Patient ledger with transactions", "Cuenta corriente del paciente con movimientos", kind="dental")))
sc += decision("Notifications with a “pending” state", "Notificaciones con estado “pendiente”",
               f"<p>{T('The inbox follows Notion’s logic: inbox, unread and archived, grouped by date, with bulk actions. I added <strong>pending</strong> because here notifications are tasks: sign a consent, confirm an appointment, verify an insurance plan.', 'La bandeja sigue la lógica de Notion: entrada, no leídas y archivadas, agrupadas por fecha, con acciones en lote. Sumé <strong>pendiente</strong> porque acá las notificaciones son tareas: firmar un consentimiento, confirmar un turno, verificar una cobertura.')}</p>",
               f("d-notifications", "Notifications", "Notifications inbox with pending state", "Bandeja de notificaciones con estado pendiente"))
b += chapter(T("Key screens", "Pantallas clave"), h2("Designed around the moment each person is in.", "Diseñado alrededor del momento de cada persona.") + sc, "screens")
b += chapter("Mobile", h2("The same product in a dentist’s pocket.", "El mismo producto en el bolsillo del odontólogo.") + prose(
    ("Every screen is responsive. On a phone the patient menu turns into horizontal tabs and panels stack in the order a clinician reads them.",
     "Todas las pantallas son responsive. En el celular el menú del paciente pasa a pestañas horizontales y los paneles se apilan en el orden en que los lee un profesional.")) +
    "      " + fig_phones(p, "dental", [("d-m-dashboard", "Dashboard on a phone", "Dashboard en el celular"), ("d-m-patient", "Patient record on a phone", "Ficha del paciente en el celular"), ("d-m-scheduling", "Scheduling on a phone", "Agenda en el celular")]) + "\n", "mobile")
b += chapter("Design system", h2("Confidentally UI keeps the redesign from drifting.", "Confidentally UI evita que el rediseño se desvíe.") + prose(
    ("The design system reads the app’s own components: change a token in code and the docs change with it. It has its own case study.",
     "El design system lee los componentes de la propia app: si cambia un token en el código, la documentación cambia con él. Tiene su propio caso.")) +
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
     (T("Built with", "Hecho con"), "Storybook, React, Tailwind"), ("AI", T("Gemini API, optional", "Gemini API, opcional")), (T("Scope", "Alcance"), T("Tokens, docs, audit, builder", "Tokens, docs, auditoría, builder"))],
    links=f'<a class="btn" href="{DS}" target="_blank" rel="noopener">{T("Open the design system", "Abrir el design system")} {arrow()}</a><a class="btn btn--ghost" href="{BUILDER}" target="_blank" rel="noopener">{T("Try the Builder", "Probar el Builder")} {arrow()}</a>',
)
b += f'  <section class="wrap case-cover" data-parallax>{cover_mock(p, "ds", "ds-welcome", 1600, 1000, "Confidentally UI")}</section>\n'
b += chapter(T("Overview", "Resumen"), h2("Documentation that can’t fall out of date.", "Documentación que no se puede desactualizar.") + prose(
    ("Most design systems are a copy of the product that someone has to keep in sync. Confidentally UI isn’t. Storybook imports the same components the app uses, the colors page parses the app’s stylesheet, and the Pages section mounts the real routes. <strong>When the code changes, the documentation changes with it.</strong>",
     "La mayoría de los design systems son una copia del producto que alguien tiene que mantener sincronizada. Confidentally UI no. Storybook importa los mismos componentes que usa la app, la página de colores lee la hoja de estilos de la app y la sección Pages monta las rutas reales. <strong>Cuando cambia el código, la documentación cambia con él.</strong>"),
    ("I hid Storybook’s own chrome and designed a documentation site on top: a top bar with six sections, a search, a menu per section and the same page layout for every component.",
     "Oculté la interfaz propia de Storybook y diseñé encima un sitio de documentación: una barra superior con seis secciones, un buscador, un menú por sección y el mismo layout de página para cada componente.")) +
    numbers([(139, "", "pieces", "piezas"), (32, "", "screens", "pantallas"), (481, "", "live examples", "ejemplos en vivo"), (174, "", "documentation pages", "páginas de documentación")]), "overview")
b += chapter(T("The problem", "El problema"), h2("The same thing, built several ways.", "Lo mismo, hecho de varias formas.") + prose(
    ("Screen titles came in at 20, 24 and 36px. The appointment card of the patient overview was written by hand, and the calendar one was repeated three times in the same file. Colors were typed as hex values instead of tokens. Designers and developers needed one answer to the same question: <strong>which one do I use?</strong>",
     "Los títulos de pantalla aparecían en 20, 24 y 36px. La tarjeta de turno del resumen del paciente estaba escrita a mano y la del calendario se repetía tres veces en el mismo archivo. Los colores se escribían como hexadecimales en vez de tokens. Diseño y desarrollo necesitaban una respuesta a la misma pregunta: <strong>¿cuál uso?</strong>")), "problem")
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
b += chapter(T("Builder with AI", "Builder con IA"), h2("Describe a screen, get it built with the real components.", "Describí una pantalla y se arma con los componentes reales.") +
             '      <div class="prose" data-reveal>' + f"<p>{T('The Builder assembles screens from the app’s own components on a canvas that starts with the real sidebar and top bar. <strong>Layers</strong> shows the tree, <strong>Code</strong> gives the TSX with its imports, <strong>PNG</strong> exports the design and <strong>Share link</strong> compresses it into the URL, with nothing uploaded to a server.', 'El Builder arma pantallas con los componentes de la propia app, sobre un lienzo que arranca con la barra lateral y la barra superior reales. <strong>Layers</strong> muestra el árbol, <strong>Code</strong> da el TSX con sus imports, <strong>PNG</strong> exporta el diseño y <strong>Share link</strong> lo comprime en la URL, sin subir nada a un servidor.')}</p>"
             + f"<p>{T('<strong>Describe</strong> goes further: write “a patients screen with metrics, the table and today’s appointments on the right”, and it searches 379 pieces and 33 blocks and builds the screen block by block.', '<strong>Describe</strong> va más allá: escribís “una pantalla de pacientes con métricas, la tabla y a la derecha los turnos del día” y busca entre 379 piezas y 33 bloques y arma la pantalla bloque por bloque.')}</p>"
             + bullets(("With a free Gemini key,", "Con una clave gratis de Gemini,", "the model streams its reasoning and can only answer with pieces from the catalog.", "el modelo muestra su razonamiento y solo puede responder con piezas del catálogo."),
                       ("Without a key,", "Sin clave,", "a parser splits the sentence and recognizes about 45 kinds of data for fields.", "un parser divide la frase y reconoce unos 45 tipos de dato para los campos."),
                       ("Every result can be undone,", "Todo se puede deshacer,", "and each block keeps its alternatives.", "y cada bloque guarda sus alternativas."),
                       ("A privacy note", "Un aviso de privacidad", "asks people not to type real patient data.", "pide no escribir datos reales de pacientes.")) + "</div>\n"
             + "      " + f("ds-builder-built", "Builder · Describe", "Builder after describing a patients screen", "Builder después de describir una pantalla de pacientes",
                              "<b>Describe, without AI.</b> The sentence became a Patients screen with stats, the table and today’s appointments.", "<b>Describe, sin IA.</b> La frase se convirtió en una pantalla de pacientes con métricas, la tabla y los turnos del día.", kind="ds") + "\n", "builder")
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
     (T("Platform", "Plataforma"), T("Mobile web + desktop panel", "Web mobile + panel de escritorio")), (T("Language", "Idioma"), T("Rioplatense Spanish", "Español rioplatense")), (T("Tools", "Herramientas"), "Figma, Claude, React")],
    links=f'<a class="btn" href="{GRILL_EMP}" target="_blank" rel="noopener">{T("Try the employee app", "Probar la app de empleados")} {arrow()}</a><a class="btn btn--ghost" href="{GRILL_TEAM}" target="_blank" rel="noopener">{T("Try the kitchen panel", "Probar el panel de cocina")} {arrow()}</a>',
    note=T("Demo: sign in with any email and password.", "Demo: ingresá con cualquier email y contraseña."),
)
b += f'  <section class="wrap case-cover" data-parallax>{cover_phones(p, "grill", ["g-emp-m-app", "g-emp-m-carta", "g-emp-m-dark-app"])}</section>\n'
b += chapter(T("Overview", "Resumen"), h2("A kitchen that feeds whole offices, one tray at a time.", "Una cocina que alimenta oficinas enteras, bandeja por bandeja.") + prose(
    ("GRILL is a kitchen in Mercedes, Buenos Aires that delivers lunch to companies. Each company covers a daily amount per employee and pays at the end of the month; each employee chooses what they eat.",
     "GRILL es una cocina de Mercedes, Buenos Aires, que lleva el almuerzo a empresas. Cada empresa cubre un monto diario por empleado y paga a fin de mes; cada empleado elige qué come."),
    ("I designed both sides of the service and built them as working web apps with an AI-assisted workflow: <strong>GRILL Empresas</strong> for employees and <strong>GRILL Team</strong>, the panel the kitchen runs the day from.",
     "Diseñé los dos lados del servicio y los construí como web apps funcionales con un flujo asistido por IA: <strong>GRILL Empresas</strong> para los empleados y <strong>GRILL Team</strong>, el panel desde el que la cocina maneja el día.")), "overview")
b += chapter(T("The problem", "El problema"), h2("Everything lived on paper and in WhatsApp.", "Todo vivía en papel y en WhatsApp.") + prose(
    ("Kitchen tickets, orders per company, new employee accounts and the monthly account closing. Every day the team gathers choices, counts dishes, labels trays, plans the delivery run and keeps each company’s account, all before 11:30.",
     "Comandas de cocina, pedidos por empresa, altas de empleados y el cierre de cuenta corriente. Cada día el equipo junta los pedidos, cuenta platos, etiqueta bandejas, arma el reparto y lleva la cuenta de cada empresa, todo antes de las 11:30.")) +
    f'      <p class="pull" data-reveal>{T("Make ordering take less than a minute, and turn the kitchen’s morning into a checklist.", "Que pedir lleve menos de un minuto, y que la mañana de la cocina sea una lista de tareas.")}</p>\n', "problem")
b += chapter(T("Two users", "Dos usuarios"), h2("Same orders, two very different mornings.", "Los mismos pedidos, dos mañanas muy distintas.") +
             f'      <div class="grid-cards" data-reveal><div><b>{T("EMPLOYEE · PHONE", "EMPLEADO · CELULAR")}</b><span>{T("<strong>A minute between meetings, before the cutoff.</strong> When is the next delivery, what does the kitchen suggest, how much does the company cover, which side dish.", "<strong>Un minuto entre reuniones, antes del cierre.</strong> Cuándo es la próxima entrega, qué sugiere la cocina, cuánto cubre la empresa, qué guarnición.")}</span></div>'
             f'<div><b>{T("KITCHEN TEAM · DESKTOP", "EQUIPO DE COCINA · ESCRITORIO")}</b><span>{T("<strong>The whole morning, hands busy.</strong> How many of each dish, a label for every tray, the delivery run by company, and what to bill each one.", "<strong>Toda la mañana, con las manos ocupadas.</strong> Cuántos de cada plato, una etiqueta por bandeja, el reparto por empresa y qué facturarle a cada una.")}</span></div></div>\n', "users")
emp = decision("The cutoff comes first", "Primero, el horario de cierre",
               f"<p>{T('The screen opens on the next delivery date and a countdown to the 10:30 cutoff. When today’s cutoff has passed, a banner says the order goes to the next delivery and can be changed until 10:30 that day.', 'La pantalla abre con la fecha de la próxima entrega y una cuenta regresiva al cierre de las 10:30. Si el cierre de hoy ya pasó, un aviso explica que el pedido entra en la próxima entrega y se puede modificar hasta las 10:30 de ese día.')}</p>"
               + bullets(("A short selection first,", "Primero una selección corta,", "and the full menu one link away.", "y la carta completa a un link."),
                         ("The allowance always visible:", "El tope siempre visible:", "the company covers up to $11,000 a day.", "la empresa cubre hasta $11.000 por día.")),
               f("g-emp-app", "GRILL Empresas · Pedido del día", "Order of the day on desktop with the cutoff countdown and the kitchen selection", "Pedido del día en escritorio con la cuenta regresiva y la selección de la cocina", kind="grill"))
emp += decision("Choosing is one step", "Elegir es un solo paso",
                f"<p>{T('Picking a dish opens a sheet to choose the side and leave a note for the kitchen, up to 140 characters. The button carries the price, so there’s no surprise at checkout. The full menu has <strong>59 dishes in 9 categories</strong>, filtered by gluten-free and vegetarian.', 'Elegir un plato abre una hoja para la guarnición y una nota para la cocina, de hasta 140 caracteres. El botón lleva el precio, así no hay sorpresas. La carta completa tiene <strong>59 platos en 9 categorías</strong>, con filtros sin TACC y vegetariano.')}</p>",
                fig_card("g-crop-modal", 896, 1268, "Side dish sheet with a note for the kitchen", "Hoja de guarnición con nota para la cocina", "cream"))
emp += decision("Order history", "Historial de pedidos",
                f"<p>{T('<strong>My orders</strong> shows the week or the month day by day, with a summary to download. The copy talks the way people in Mercedes do: “Elegí”, “Tocá”, “¿La olvidaste?”.', '<strong>Mis pedidos</strong> muestra la semana o el mes día por día, con un resumen para descargar. Los textos hablan como se habla en Mercedes: “Elegí”, “Tocá”, “¿La olvidaste?”.')}</p>",
                f("g-emp-historial", "Mis pedidos", "Order history by week", "Historial de pedidos por semana"))
b += chapter(T("Employee app", "App de empleados"), h2("Order lunch in a few taps.", "Pedir el almuerzo en pocos toques.") + emp, "employees")
kit = decision("Summary of the day", "Resumen del día",
               f"<p>{T('Units, orders and companies at the top with the departure time; below, one card per job of the morning and the alerts still to resolve.', 'Unidades, pedidos y empresas arriba con el horario de salida; debajo, una tarjeta por cada tarea de la mañana y las alertas que faltan resolver.')}</p>",
               f("g-corp-hoy", "GRILL Team · Resumen", "Summary of the day with units, orders and companies", "Resumen del día con unidades, pedidos y empresas", kind="grill"))
kit += decision("Kitchen ticket", "Comanda de cocina",
                f"<p>{T('Every order added up by dish and side, grouped by category, with a checkbox to tick as each one is cooked. It prints as the day’s ticket, and works in dark mode for the kitchen.', 'Todos los pedidos sumados por plato y guarnición, agrupados por categoría, con una casilla para tildar a medida que se cocina. Se imprime como la comanda del día y funciona en modo oscuro para la cocina.')}</p>",
                fig(p, "g-corp-dark-cocina", 1600, 1000, "Cocina · Comanda del día", "Kitchen ticket with aggregated quantities in dark mode", "Comanda con cantidades sumadas en modo oscuro", dark=True))
kit += decision("Labels that fit the real sheet", "Etiquetas que calzan en la hoja real",
                f"<p>{T('Each tray gets a label on a sheet of <strong>70 × 25.4 mm</strong> labels. “Start from” reuses a half-used sheet by tapping the first free cell, and a note reminds the team to print at real size so labels don’t shift off the die cut.', 'Cada bandeja tiene su etiqueta en una hoja de <strong>70 × 25,4 mm</strong>. “Empezar desde” reutiliza una hoja a medio usar tocando la primera casilla libre, y un aviso recuerda imprimir en tamaño real para que no se corran del troquel.')}</p>",
                f("g-corp-etiquetas", "Etiquetas · Pliego del día", "Label sheet with start-from selector", "Pliego de etiquetas con selector de inicio", kind="grill"))
kit += decision("Delivery, orders and accounts", "Reparto, pedidos y cuentas",
                bullets(("Delivery:", "Reparto:", "stops by company, trays per person and a checklist per stop.", "paradas por empresa, bandejas por persona y una lista por parada."),
                        ("Orders:", "Pedidos:", "totals to invoice for any period and status.", "totales a facturar por período y estado."),
                        ("Companies and employees:", "Empresas y empleados:", "a registration code per company; block accounts or make someone admin.", "un código de registro por empresa; bloquear cuentas o hacer admin a alguien.")),
                pair(f("g-corp-reparto", "Reparto", "Delivery run grouped by company", "Reparto agrupado por empresa"), f("g-corp-pedidos", "Pedidos", "Orders for the period with amount to invoice", "Pedidos del período con el monto a facturar")))
b += chapter(T("Kitchen panel", "Panel de cocina"), h2("The kitchen’s morning, as a checklist.", "La mañana de la cocina, como lista de tareas.") + kit, "kitchen")
b += chapter(T("Access", "Acceso"), h2("Two doors, each one explained.", "Dos puertas, cada una explicada.") + prose(
    ("Employees don’t sign up on their own: their company creates the account. The login says so, tells them who to ask and offers companies a proposal. The kitchen has its own internal entrance, with a link back for employees who land there by mistake.",
     "Los empleados no se registran solos: la cuenta la crea su empresa. El login lo explica, dice a quién pedirla y ofrece una propuesta a las empresas. La cocina tiene su propia entrada interna, con un link de vuelta para el empleado que llega ahí por error.")) +
    "      " + pair(f("g-emp-login", "GRILL Empresas · Ingresar", "Employee login", "Login de empleados", kind="grill"), f("g-corp-login", "GRILL Team · Acceso interno", "Internal login for the kitchen panel", "Login interno del panel de cocina", kind="grill")) + "\n", "access")
b += chapter(T("Outcome", "Resultado"), h2("Two apps, one language.", "Dos apps, un mismo lenguaje.") +
             numbers([(2, "", "connected apps", "apps conectadas"), (12, "", "screens", "pantallas"), (59, "", "dishes in the menu", "platos en la carta"), (2, "", "themes, light and dark", "temas, claro y oscuro")]) +
             prose(("Both apps share the GRILL wordmark, the lime accent and the same components, so the kitchen and its clients read the same order the same way.",
                    "Las dos apps comparten el logo de GRILL, el verde lima y los mismos componentes, así la cocina y sus clientes leen el mismo pedido de la misma forma.")), "outcome")
write(FN, "GRILL Empresas", "GRILL Empresas", "Corporate lunch ordering for a kitchen in Mercedes, Buenos Aires. Case study by Julián Gerardi.", "Pedidos de almuerzo para empresas de una cocina en Mercedes, Buenos Aires. Caso de Julián Gerardi.", b)
