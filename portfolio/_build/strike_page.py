"""Strike: the UX/UI challenge for a multi-asset security exercise.

Sources: the analysis deck and the design system in the Figma file, and the working
prototype (React), whose screens were captured at 2x for this page.
"""
from common import *
from scenes import rise, story, rail, fan, dev_browser
from mockups import STRIKE_URL
import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")

p = "../"
FN = "strike.html"
FIGMA = "https://www.figma.com/design/RQ4BFatIeCviomq82cULeH/Challenge---Strike?node-id=17-6908"
FIGMA_DS = "https://www.figma.com/design/RQ4BFatIeCviomq82cULeH/Challenge---Strike?node-id=2-2"
PROTO = "https://juliangerardi.github.io/Strike-Challenge/"
CODE = "https://github.com/JulianGerardi/Strike-Challenge"


def swin_s(name, w, h, ce="", cs="", ae="", as_="", maxw=""):
    return swin(p, name, w, h, STRIKE_URL, "panel--strike", ce, cs, ae, as_, maxw=maxw)


def numbers(items):
    return '      <div class="numbers" data-reveal>' + "".join(
        f'<div><b data-count="{n}">{n}</b><span>{T(e, es)}</span></div>' for n, e, es in items) + "</div>\n"


b = case_head(
    "Strike",
    T("A UX/UI challenge for Strike, a cybersecurity platform: one guided flow to create a security exercise across many assets, with shared settings and exceptions per asset, delivered as a working prototype.",
      "Un challenge de UX/UI para Strike, una plataforma de ciberseguridad: un flujo guiado para crear un ejercicio de seguridad sobre varios assets, con configuración compartida y excepciones por asset, entregado como prototipo funcional."),
    [(T("Role", "Rol"), "UX/UI Designer"), (T("Company", "Empresa"), "Strike · Challenge"), (T("Year", "Año"), "2026"),
     (T("Platform", "Plataforma"), T("Web app · desktop and phone", "Web app · desktop y celular")),
     (T("Scope", "Alcance"), T("Analysis, flows, wireframes, UI, design system, prototype", "Análisis, flujos, wireframes, UI, design system, prototipo")),
     (T("Tools", "Herramientas"), "Figma, Claude Code, React")],
    links=(f'<a class="btn" href="{PROTO}" target="_blank" rel="noopener">{T("Open the prototype", "Abrir el prototipo")} {arrow()}</a>'
           f'<a class="btn btn--ghost" href="{FIGMA}" target="_blank" rel="noopener">{T("View in Figma", "Ver en Figma")} {arrow()}</a>'),
)
b += rise(brand_scene(p, "strike", T, big=True), "strike")

b += chapter(T("The challenge", "El desafío"), h2("Many assets, one coordinated exercise.", "Muchos assets, un solo ejercicio coordinado.") + prose(
    ("Strike manages the assets that take part in a security test one by one. Its clients, though, need to assess <strong>several related assets inside the same coordinated exercise</strong>.",
     "Strike gestiona de forma individual los activos que forman parte de una prueba de seguridad. Pero sus clientes necesitan evaluar <strong>varios activos relacionados dentro de un mismo ejercicio coordinado</strong>."),
    ("The brief: a single experience that coordinates testing across many assets without adding needless complexity, and without losing control over how each one is set up.",
     "El pedido: una experiencia única que coordine las pruebas sobre muchos activos sin sumar complejidad innecesaria y sin perder el control sobre cómo se configura cada uno.")) +
    f'      <div class="note" data-reveal><svg aria-hidden="true"><use href="#i-info"/></svg><p>{T("For example, a security assessment of an e-commerce can involve a website, a mobile app and an API. They belong to the same ecosystem, yet each one can need different credentials, request limits, VPN access and test restrictions.", "Por ejemplo, la evaluación de seguridad de un e-commerce puede involucrar un sitio web, una app móvil y una API. Son parte del mismo ecosistema, pero cada uno puede necesitar credenciales, límites de solicitudes, acceso por VPN y restricciones de pruebas diferentes.")}</p></div>\n',
    "challenge")
b += big_words("The problem isn’t picking several assets. It’s handling shared settings and individual exceptions in one flow that scales.",
               "El problema no es elegir varios activos. Es manejar la configuración compartida y las excepciones de cada uno en un solo flujo que escale.")

breakdown = [("Global settings vs. settings per asset", "Configuración global vs. por activo",
              "Some parameters apply to the whole exercise: the objective, the testing depth and the schedule. Others belong to each asset: credentials, request limits, VPN and excluded tests. Mixed together, it’s hard to tell what affects everything and what affects one asset.",
              "Algunos parámetros aplican a todo el ejercicio: el objetivo, la profundidad de las pruebas y el cronograma. Otros son de cada activo: credenciales, límites de solicitudes, VPN y pruebas excluidas. Mezclados, cuesta entender qué afecta a todo y qué a un solo activo."),
             ("Scale", "Escalabilidad",
              "A flow that works with two or three assets turns slow with 20 or 40. Opening and setting each one by hand repeats work, invites errors and hides what’s still incomplete.",
              "Un flujo que funciona con dos o tres activos se vuelve lento con 20 o 40. Abrir y configurar cada uno a mano repite trabajo, suma errores y esconde lo que quedó incompleto."),
             ("Control", "Control",
              "Incomplete settings and differences between assets have to show up before any test starts.",
              "Las configuraciones incompletas y las diferencias entre activos tienen que aparecer antes de que empiece cualquier prueba.")]
ol = '      <ol class="steps">' + "".join(f'<li data-reveal><span class="steps__n">{i + 1:02d}</span><div><h3>{T(a, c)}</h3><p>{T(d, e)}</p></div></li>' for i, (a, c, d, e) in enumerate(breakdown)) + "</ol>\n"
b += chapter(T("Breaking it down", "Desglose del problema"), h2("Three tensions to solve.", "Tres tensiones para resolver.") + ol, "breakdown")

# the analysis, as it was presented
deck = [("s-deck-cover", 1600, 893, "<b>Cover.</b> The deck opens like a Figma canvas: a selected Alert Dialog, multiplayer cursors and Strike’s pixel pattern.",
         "<b>Portada.</b> El deck abre como un canvas de Figma: un Alert Dialog seleccionado, cursores multiplayer y el patrón de píxeles de Strike."),
        ("s-deck-1", 1600, 1007, "<b>1 · Problem analysis.</b> From one asset at a time to many in one exercise.", "<b>1 · Análisis del problema.</b> De un activo por vez a muchos en un ejercicio."),
        ("s-deck-2", 1600, 1376, "<b>2 · Breakdown.</b> Global vs. per-asset settings, scale and control.", "<b>2 · Desglose.</b> Configuración global vs. por activo, escala y control."),
        ("s-deck-3", 1600, 1601, "<b>3 · Proposal.</b> Five stages, guided by a stepper.", "<b>3 · Propuesta.</b> Cinco etapas, guiadas por un stepper."),
        ("s-deck-4", 1600, 1517, "<b>4 · Design decisions.</b> Shared settings, personalisation, bulk editing and the prototype.", "<b>4 · Decisiones de diseño.</b> Configuración compartida, personalización, edición masiva y el prototipo."),
        ("s-deck-5", 1600, 1175, "<b>5 · Goal.</b> Clear for a few assets, efficient for 40.", "<b>5 · Objetivo.</b> Claro con pocos activos, eficiente con 40.")]
b += rail("The analysis, as presented.", "El análisis, tal como se presentó.",
          "Before any screen, a five-page deck in Figma framed the problem, broke it down and proposed the flow.",
          "Antes de cualquier pantalla, un deck de cinco páginas en Figma planteó el problema, lo desglosó y propuso el flujo.",
          [(f'<div class="deck">{screen(p, n, w, h, "Strike analysis deck", "Deck de análisis de Strike", zoom=True)}</div>', round(w / h, 4), T(ce, cs)) for n, w, h, ce, cs in deck])

# from sketch to high fidelity, the same screen
fid = [("Sketch", "Boceto", "Structure only: the stepper, the exercise defaults on top, the table and the actions. No copy, no colour.",
        "Solo estructura: el stepper, los valores del ejercicio arriba, la tabla y las acciones. Sin textos ni color."),
       ("Low fidelity", "Baja fidelidad", "Real copy and real data in greyscale, to check that every column and every label reads before any styling.",
        "Textos y datos reales en escala de grises, para comprobar que cada columna y cada etiqueta se lean antes de cualquier estilo."),
       ("High fidelity", "Alta fidelidad", "Strike’s cyan marks what is selected and what is active; types get their own colour so a long list scans by kind of asset.",
        "El cian de Strike marca lo seleccionado y lo activo; los tipos tienen su propio color, así una lista larga se recorre por tipo de activo.")]
b += scene_head(T("Process", "Proceso"), "From a sketch to high fidelity.", "Del boceto a la alta fidelidad.",
                "Every screen of the happy path went through three passes in Figma. Here is the same one, Configure assets, in each.",
                "Cada pantalla del happy path pasó por tres instancias en Figma. Acá está la misma, Configure assets, en cada una.", "process")
b += story(fid, [([0], dev_browser(p, "s-sketch", 1180, 811, STRIKE_URL, alt_en="Configure assets, sketch", alt_es="Configure assets, boceto")),
                 ([1], dev_browser(p, "s-lofi", 1180, 811, STRIKE_URL, alt_en="Configure assets, low fidelity", alt_es="Configure assets, baja fidelidad")),
                 ([2], dev_browser(p, "s-hifi", 1180, 811, STRIKE_URL, alt_en="Configure assets, high fidelity", alt_es="Configure assets, alta fidelidad"))], "strike", "Fidelity")

# the proposal: five stages, then the result
stages = [("Define the exercise", "Definir el ejercicio",
           "Name, objective, testing depth, dates, recurrence and the option of a human specialist: the general context comes first, before choosing any asset.",
           "Nombre, objetivo, profundidad, fechas, recurrencia y la opción de un especialista humano: primero el contexto general, antes de elegir cualquier activo."),
          ("Select the assets", "Seleccionar los assets",
           "An inventory with search and filters. Type, environment and identifier help to get the scope right, and the count stays in sight.",
           "Un inventario con búsqueda y filtros. El tipo, el entorno y el identificador ayudan a acertar el alcance, y la cantidad elegida queda a la vista."),
          ("Shared settings, if needed", "Configuración general, si hace falta",
           "Select several assets and edit them together: for each field, keep it, apply a new value or reset it to the exercise default.",
           "Elegir varios activos y editarlos juntos: en cada campo, mantenerlo, aplicar un valor nuevo o volver al valor del ejercicio."),
          ("One asset, if needed", "Un activo, si hace falta",
           "Each asset inherits the exercise’s values. When one needs something different, its drawer sets a custom value, marked as an override.",
           "Cada activo hereda los valores del ejercicio. Cuando uno necesita algo distinto, su panel define un valor propio, marcado como excepción."),
          ("Review and create", "Revisar y crear",
           "Scope, shared settings and every exception on one page, with a readiness check before creating. Creating doesn’t start any test.",
           "El alcance, la configuración compartida y cada excepción en una página, con un chequeo de que todo esté listo antes de crear. Crear no inicia ninguna prueba."),
          ("Created", "Creado",
           "The summary of the exercise, and back to the list, where the new one shows at the top.",
           "El resumen del ejercicio, y de vuelta al listado, donde el nuevo aparece arriba.")]
b += scene_head(T("The proposal", "La propuesta"), "A guided flow, five stages.", "Un flujo guiado, cinco etapas.",
                "A stepper keeps the whole flow in view: where you are and what’s left. Simpler, without losing flexibility.",
                "Un stepper mantiene a la vista todo el flujo: dónde estás y qué falta. Más simple, sin perder flexibilidad.", "proposal")
b += story(stages, [([0], dev_browser(p, "s-details", 2000, 1819, STRIKE_URL, alt_en="Step 1, exercise details", alt_es="Paso 1, detalles del ejercicio")),
                    ([1], dev_browser(p, "s-assets-selected", 2000, 1250, STRIKE_URL, alt_en="Step 2, three assets selected", alt_es="Paso 2, tres assets seleccionados")),
                    ([2], dev_browser(p, "s-bulk", 2000, 1250, STRIKE_URL, alt_en="Step 3, bulk edit of the selected assets", alt_es="Paso 3, edición masiva de los assets seleccionados")),
                    ([3], dev_browser(p, "s-drawer-custom", 2000, 1250, STRIKE_URL, alt_en="Step 3, one asset with a custom value", alt_es="Paso 3, un asset con un valor propio")),
                    ([4], dev_browser(p, "s-review", 2000, 2272, STRIKE_URL, alt_en="Step 4, review with readiness", alt_es="Paso 4, revisión con el estado de preparación")),
                    ([5], dev_browser(p, "s-created", 2000, 1250, STRIKE_URL, alt_en="Exercise created", alt_es="Ejercicio creado"))], "strike", "Proposal")

b += chapter(T("Design decisions", "Decisiones de diseño"), h2("Decide once, differ where it matters.", "Decidir una vez, diferenciar donde importa.") +
    decision("Shared settings, set once", "Configuración compartida, una sola vez",
             f"<p>{T('The exercise defaults sit above the table: depth, human validation, dates and the testing window. Every asset starts from them, so the table only has to show what’s different.', 'Los valores del ejercicio quedan arriba de la tabla: profundidad, validación humana, fechas y ventana de prueba. Cada activo parte de ellos, así la tabla solo tiene que mostrar lo distinto.')}</p>",
             swin_s("s-configure", 2000, 1250, ae="Configure assets with the exercise defaults on top", as_="Configure assets con los valores del ejercicio arriba")) +
    decision("Inherited or custom, always explicit", "Heredado o propio, siempre explícito",
             f"<p>{T('In an asset’s drawer every field says whether it inherits the default, with the value in brackets, or has its own. The review lists each exception per asset.', 'En el panel de un activo cada campo dice si hereda el valor del ejercicio, con el valor entre paréntesis, o si tiene uno propio. La revisión lista cada excepción por activo.')}</p>",
             pair(swin_s("s-drawer", 2000, 1250, "<b>Inherited.</b> The drawer opens with the asset’s current values.", "<b>Heredado.</b> El panel abre con los valores actuales del activo.", "Asset drawer", "Panel del asset"),
                  swin_s("s-drawer-custom", 2000, 1250, "<b>Custom.</b> A different rate limit for the API only.", "<b>Propio.</b> Un límite de solicitudes distinto solo para la API.", "Asset drawer with a custom value", "Panel del asset con un valor propio"))) +
    decision("Bulk changes, on purpose", "Cambios masivos, deliberados",
             f"<p>{T('Select the assets, choose which fields to change, see the impact and confirm. Credentials are never part of a bulk change: they stay with each asset, apart from the shared settings.', 'Elegir los activos, definir qué campos cambiar, ver el impacto y confirmar. Las credenciales nunca entran en un cambio masivo: quedan en cada activo, separadas de la configuración compartida.')}</p>",
             pair(swin_s("s-bulk", 2000, 1250, "<b>Edit.</b> Keep, apply new or reset, field by field.", "<b>Editar.</b> Mantener, aplicar nuevo o volver al valor del ejercicio, campo por campo.", "Bulk edit settings", "Edición masiva"),
                  swin_s("s-confirm", 2000, 1250, "<b>Confirm.</b> The fields and the assets the change will touch.", "<b>Confirmar.</b> Los campos y los activos que va a tocar el cambio.", "Confirm bulk changes", "Confirmar cambios masivos")) +
             swin_s("s-applied", 2000, 1250, "<b>Applied.</b> The table updates and a toast says how many changes went through.", "<b>Aplicado.</b> La tabla se actualiza y un aviso dice cuántos cambios se aplicaron.", "Changes applied with a toast", "Cambios aplicados con un aviso")) +
    decision("Problems before the exercise, not after", "Los problemas antes del ejercicio, no después",
             f"<p>{T('The form starts empty and says exactly what is missing. Before creating, a readiness panel counts the assets reviewed, missing setup, schedule issues and custom exceptions.', 'El formulario arranca vacío y dice exactamente qué falta. Antes de crear, un panel cuenta los activos revisados, la configuración faltante, los problemas de agenda y las excepciones.')}</p>",
             pair(swin_s("s-details-errors", 2000, 1881, "<b>Validation.</b> Name and dates, flagged in place.", "<b>Validación.</b> Nombre y fechas, marcados en el lugar.", "Exercise details with validation errors", "Detalles del ejercicio con errores de validación"),
                  swin_s("s-review", 2000, 2272, "<b>Readiness.</b> Ready, with 3 of 3 assets reviewed and 3 exceptions.", "<b>Preparación.</b> Listo, con 3 de 3 activos revisados y 3 excepciones.", "Review with the readiness panel", "Revisión con el panel de preparación"))) +
    decision("Back to where it started", "De vuelta al inicio",
             f"<p>{T('The confirmation sums the exercise up, and the list shows the new one first, so the person sees it landed.', 'La confirmación resume el ejercicio, y el listado muestra el nuevo primero, así la persona ve que quedó creado.')}</p>",
             pair(swin_s("s-created", 2000, 1250, "<b>Created.</b> ID, assets, depth, dates and exceptions.", "<b>Creado.</b> ID, activos, profundidad, fechas y excepciones.", "Exercise created", "Ejercicio creado"),
                  swin_s("s-list-new", 2000, 1250, "<b>In the list.</b> The new exercise, first.", "<b>En el listado.</b> El ejercicio nuevo, primero.", "Exercise list with the new exercise", "Listado con el ejercicio nuevo"))), "decisions")

b += chapter(T("Prototype", "Prototipo"), h2("A prototype that explains itself.", "Un prototipo que se explica solo.") + prose(
    ("Besides the screens in Figma, I built the flow as a working prototype with Claude Code, in React, to try the features, the animations and how every input behaves.",
     "Además de las pantallas en Figma, construí el flujo como un prototipo funcional con Claude Code, en React, para probar las funcionalidades, las animaciones y el comportamiento de cada input."),
    ("It includes <strong>Strike Bot</strong>, an assistant that walks the person through the new feature: it explains how to create an exercise and how to apply settings to the assets, and starts a tour that highlights the exact control of each step. The prototype also works in English and Spanish, and on phones, tablets and desktop.",
     "Incluye a <strong>Strike Bot</strong>, un asistente que acompaña a la persona en la funcionalidad nueva: explica cómo crear un ejercicio y cómo aplicar la configuración a los activos, y arranca un tour que resalta el control exacto de cada paso. El prototipo además funciona en inglés y en español, y en celular, tablet y desktop.")) +
    decision("Strike Bot", "Strike Bot",
             f"<p>{T('Two questions cover the feature. Each answer can turn into a 15-step tour that waits for the person to click the highlighted control.', 'Dos preguntas cubren la funcionalidad. Cada respuesta puede convertirse en un tour de 15 pasos que espera a que la persona haga clic en el control resaltado.')}</p>",
             pair(swin_s("s-assistant-answer", 2000, 1250, "<b>The answer.</b> The steps to create an exercise, with “you are here”.", "<b>La respuesta.</b> Los pasos para crear un ejercicio, con “estás acá”.", "Strike Bot answering how to create an exercise", "Strike Bot respondiendo cómo crear un ejercicio"),
                  swin_s("s-tour-2", 2000, 1250, "<b>The tour.</b> Step 2 of 15, on the field it talks about.", "<b>El tour.</b> Paso 2 de 15, sobre el campo del que habla.", "Guided tour on the exercise name", "Tour guiado sobre el nombre del ejercicio"))) +
    f'      <div class="btns" data-reveal><a class="btn" href="{PROTO}" target="_blank" rel="noopener">{T("Open the prototype", "Abrir el prototipo")} {arrow()}</a></div>\n', "prototype")
b += fan(p, ["s-m-list", "s-m-bulk", "s-m-review"], "The same flow on a phone.", "El mismo flujo en el celular.",
         "Tables keep their columns and scroll sideways, dialogs and drawers fill the screen, and the stepper shrinks to numbers.",
         "Las tablas mantienen sus columnas y se desplazan de costado, los diálogos y paneles ocupan la pantalla y el stepper se reduce a números.")


def sk(n, w, h, label, hi=False, disp=None):
    """hi: captured at 2x from the prototype, shown at half width."""
    return kit_state(p, n, w, h, label, disp or (w / 2 if hi else w))


b += kit_section("kit", "kd--strike", ("Every component, every state.", "Cada componente, cada estado."),
                 ("The Figma file has its own design system page: colours, type, header, sidebar, steppers, buttons, badges, fields and tables, each with its variants. The pieces from Figma are shown as exported; the interactive ones come from the prototype at 2x.",
                  "El Figma tiene su propia página de design system: colores, tipografía, header, sidebar, steppers, botones, badges, campos y tablas, cada uno con sus variantes. Las piezas del Figma se muestran tal como se exportaron; las interactivas salen del prototipo a 2x."),
                 (FIGMA_DS, "Open the design system in Figma", "Abrir el design system en Figma"), [
    kit_comp("Header", "Header", "The animated smiley greets on every screen, next to the language switch and the account.", "El smiley animado saluda en cada pantalla, junto al selector de idioma y la cuenta.",
             [sk("st-kit-p-header", 2736, 96, "Default", True)], "kd__comp--span"),
    kit_comp("Stepper", "Stepper", "Four steps and a completed state: the current one in cyan, the done ones checked in teal.", "Cuatro pasos y un estado completo: el actual en cian, los terminados con check en verde azulado.",
             [sk("st-kit-step-1", 862, 64, T("Step 1", "Paso 1")), sk("st-kit-step-2", 862, 64, T("Step 2", "Paso 2")), sk("st-kit-step-3", 862, 64, T("Step 3", "Paso 3")),
              sk("st-kit-step-4", 862, 64, T("Step 4", "Paso 4")), sk("st-kit-step-done", 862, 64, T("Completed", "Completo"))], "kd__comp--span kd__comp--col"),
    kit_comp("Rate limit", "Límite de solicitudes", "Every field of an asset inherits the exercise default, with the value in brackets, or takes its own.",
             "Cada campo de un activo hereda el valor del ejercicio, con el valor entre paréntesis, o toma uno propio.",
             [sk("st-kit-rate", 367, 96, T("Inherited", "Heredado")), sk("st-kit-rate-custom", 367, 150, T("Custom", "Propio"))], "kd__comp--col"),
    kit_comp("VPN access", "Acceso por VPN", "Custom opens a two-option switch.", "El valor propio abre un selector de dos opciones.",
             [sk("st-kit-vpn", 367, 92, T("Inherited", "Heredado")), sk("st-kit-vpn-custom", 367, 142, T("Custom", "Propio"))], "kd__comp--col"),
    kit_comp("Excluded tests", "Pruebas excluidas", "Custom opens the list of tests that can be excluded.", "El valor propio abre la lista de pruebas que se pueden excluir.",
             [sk("st-kit-excluded", 367, 93, T("Inherited", "Heredado")), sk("st-kit-excluded-custom", 367, 237, T("Custom", "Propio"))], "kd__comp--col"),
    kit_comp("Testing window", "Ventana de prueba", "Custom asks for its own start and end time.", "El valor propio pide su propia hora de inicio y de fin.",
             [sk("st-kit-window", 367, 97, T("Inherited", "Heredado")), sk("st-kit-window-custom", 367, 174, T("Custom", "Propio"))], "kd__comp--col"),
    kit_comp("Fields", "Campos", "Selects and time pickers: empty with a hint, open with the cyan border.", "Selects y selectores de hora: vacíos con una pista, abiertos con el borde cian.",
             [sk("st-kit-select-empty", 335, 73, T("Select · empty", "Select · vacío")), sk("st-kit-select-filled", 335, 73, T("Select · open", "Select · abierto")),
              sk("st-kit-time-start", 335, 72, T("Start time", "Hora de inicio")), sk("st-kit-time-end", 335, 75, T("End time", "Hora de fin"))], "kd__comp--col"),
    kit_comp("Badges and buttons", "Badges y botones", "Status in cyan and green, asset types in violet, and one primary action per screen.", "Los estados en cian y verde, los tipos de activo en violeta y una sola acción principal por pantalla.",
             [sk("st-kit-badges", 117, 143, "Badges"), sk("st-kit-p-btn-create", 354, 96, T("Primary", "Primario"), True),
              sk("st-kit-p-toggle-off", 100, 66, T("Toggle · off", "Toggle · apagado"), True), sk("st-kit-p-toggle-on", 100, 66, T("Toggle · on", "Toggle · prendido"), True)]),
    kit_comp("Testing depth", "Profundidad", "Three options as cards, with the recommended one marked.", "Tres opciones como cards, con la recomendada marcada.",
             [sk("st-kit-p-depth", 2488, 276, T("Standard selected", "Standard elegida"), True)], "kd__comp--span"),
    kit_comp("Exercise defaults", "Valores del ejercicio", "The shared settings, one line above the table, with an edit button.", "La configuración compartida, en una línea arriba de la tabla, con un botón para editar.",
             [sk("st-kit-p-defaults", 2576, 134, "Default", True)], "kd__comp--span"),
    kit_comp("Bulk edit", "Edición masiva", "Each field chooses between keeping, applying a new value or resetting; only “Apply new” opens the editor.",
             "Cada campo elige entre mantener, aplicar un valor nuevo o volver al del ejercicio; solo “Aplicar nuevo” abre el editor.",
             [sk("st-kit-p-segmented-keep", 420, 72, T("Keep current", "Mantener"), True), sk("st-kit-p-segmented-apply", 420, 72, T("Apply new", "Aplicar nuevo"), True),
              sk("st-kit-p-segmented-reset", 420, 72, T("Reset", "Volver al valor"), True), sk("st-kit-p-bulk-field", 1160, 310, T("Field with editor", "Campo con editor"), True)], "kd__comp--col"),
    kit_comp("Confirmation and toast", "Confirmación y aviso", "The impact before saving, and a short toast after.", "El impacto antes de guardar, y un aviso corto después.",
             [sk("st-kit-p-confirm", 1240, 962, T("Confirm", "Confirmar"), True), sk("st-kit-p-toast", 704, 90, "Toast", True)], "kd__comp--col"),
    kit_comp("Tables", "Tablas", "Exercises that expand to show their assets and configuration, the asset inventory and the configuration table, each selected and not.",
             "Ejercicios que se despliegan con sus activos y su configuración, el inventario de activos y la tabla de configuración, cada una con y sin selección.",
             [sk("st-kit-tbl-exercises", 1028, 717, T("Exercises", "Ejercicios"), disp=760), sk("st-kit-tbl-exercises-open", 1028, 797, T("Exercise expanded", "Ejercicio desplegado"), disp=760),
              sk("st-kit-tbl-assets", 1028, 554, T("Assets", "Activos"), disp=760), sk("st-kit-tbl-assets-selected", 1028, 572, T("Assets · selected", "Activos · seleccionados"), disp=760),
              sk("st-kit-tbl-config", 1028, 256, T("Configuration", "Configuración"), disp=760), sk("st-kit-tbl-config-selected", 1028, 256, T("Configuration · selected", "Configuración · seleccionada"), disp=760)], "kd__comp--wide"),
    kit_comp("Readiness", "Preparación", "What’s left before creating, counted.", "Lo que falta antes de crear, contado.",
             [sk("st-kit-p-readiness", 560, 600, T("Ready", "Listo"), True)]),
    kit_comp("Strike Bot", "Strike Bot", "The chat and the tour card that points at each control.", "El chat y la card del tour que señala cada control.",
             [sk("st-kit-p-chat", 760, 1080, "Chat", True), sk("st-kit-p-tour-card", 616, 408, T("Tour step", "Paso del tour"), True)]),
    kit_comp("Exercise created", "Ejercicio creado", "The summary card, and the new row highlighted in the list.", "La card de resumen, y la fila nueva resaltada en el listado.",
             [sk("st-kit-p-created", 2576, 528, T("Summary", "Resumen"), True), sk("st-kit-p-row-new", 2572, 118, T("New row", "Fila nueva"), True)], "kd__comp--span kd__comp--col"),
])

b += chapter(T("Outcome", "Resultado"), h2("A repetitive task turned into one flow.", "Una tarea repetitiva convertida en un solo flujo.") +
    numbers([(13, "screens in the happy path", "pantallas del happy path"), (4, "steps, one stepper", "pasos, un solo stepper"),
             (40, "assets the flow is designed for", "assets para los que está pensado el flujo"), (15, "steps in Strike Bot’s tour", "pasos en el tour de Strike Bot")]) +
    prose(("Shared decisions are made once and the differences between assets are handled explicitly. The focus isn’t only on fewer steps: it’s on helping people understand the scope of the assessment, keep control of each asset and catch problems before the exercise is created.",
           "Las decisiones compartidas se toman una sola vez y las diferencias entre activos se manejan de forma explícita. El foco no está solo en reducir pasos: está en ayudar a entender el alcance de la evaluación, mantener el control de cada activo y detectar problemas antes de crear el ejercicio.")) +
    f'      <div class="btns" data-reveal><a class="btn" href="{PROTO}" target="_blank" rel="noopener">{T("Open the prototype", "Abrir el prototipo")} {arrow()}</a>'
    f'<a class="btn btn--ghost" href="{FIGMA}" target="_blank" rel="noopener">{T("See the file in Figma", "Ver el archivo en Figma")} {arrow()}</a>'
    f'<a class="btn btn--ghost" href="{CODE}" target="_blank" rel="noopener">{T("See the code on GitHub", "Ver el código en GitHub")} {arrow()}</a></div>\n', "outcome")

page = case_page(p, FN, "Strike", "Strike",
                 "UX/UI challenge for Strike: a guided flow to create a security exercise across many assets, with a working prototype. By Julián Gerardi.",
                 "Challenge de UX/UI para Strike: un flujo guiado para crear un ejercicio de seguridad sobre varios assets, con prototipo funcional. Por Julián Gerardi.", b)
open(os.path.join(ROOT, "work", FN), "w").write(page)
print(FN, len(page))
