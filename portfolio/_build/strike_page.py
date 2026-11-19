"""Strike: the UX/UI challenge for a multi-asset security exercise.

Sources: the analysis deck (summarised natively) and the design system in the Figma file, and the working
prototype (React), whose screens were captured at 2x for this page.
"""
from common import *
from scenes import rise, story, fan, dev_browser
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

# the analysis, native: what the five-page deck in Figma said, in short
def chk(ok):
    return ('<svg class="sa__ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' if ok else
            '<svg class="sa__ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3.5v5.5M8 11.6v.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>')


assets3 = [("WEB", "Commerce Web", "10 req/s", T("VPN off", "Sin VPN"), "", False),
           ("iOS", "Commerce iOS", "5 req/s", T("VPN on", "Con VPN"), "", False),
           ("API", "Commerce API", "20 req/s", T("VPN off", "Sin VPN"), T("No destructive", "Sin destructivas"), True)]


def asset_chip(t, n, rate, vpn, exc, hi, i):
    ex = f'<span class="sa__x">{exc}</span>' if exc else ""
    return (f'<li class="sa__asset" style="--i:{i}"><span class="sa__type">{t}</span><b>{n}</b>'
            f'<span class="sa__props"><svg class="sa__lock" aria-hidden="true"><use href="#i-lock"/></svg><span{" class=sa__hi" if hi else ""}>{rate}</span><span>{vpn}</span>{ex}</span></li>')


today = "".join(f'<li style="--i:{i}"><span class="sa__type">{t}</span><span>{T("1 exercise", "1 ejercicio")}</span></li>' for i, (t, *_rest) in enumerate(assets3))
ask = "".join(asset_chip(*a, i) for i, a in enumerate(assets3))
p1 = f"""<article class="sa__card sa__card--wide" data-reveal>
  <div class="sa__copy"><span class="sa__n">01</span><h3>{T("From one asset at a time to many in one exercise.", "De un activo por vez a muchos en un ejercicio.")}</h3>
  <p>{T("Today every asset is tested on its own. The ask is one exercise for the whole e-commerce, where each asset keeps its own credentials, limits, VPN and exclusions.", "Hoy cada activo se prueba por separado. El pedido es un solo ejercicio para todo el e-commerce, donde cada activo mantiene sus credenciales, límites, VPN y exclusiones.")}</p></div>
  <div class="sa__diag">
    <div class="sa__col"><span class="sa__cap">{T("Today", "Hoy")}</span><ul class="sa__today">{today}</ul></div>
    <span class="sa__arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#i-right"/></svg></span>
    <div class="sa__col"><span class="sa__cap sa__cap--on">{T("The ask", "El pedido")}</span>
      <div class="sa__ex"><div class="sa__exh"><b>Q4 Commerce Security Assessment</b><span>{T("Standard · May 24–25 · 09–18 h", "Standard · 24–25 may · 09–18 h")}</span></div><ul>{ask}</ul></div></div>
  </div>
</article>"""

layers = "".join(f'<li style="--i:{i}"><span class="sa__type">{t}</span>' + "".join(
    f'<i{" class=sa__hi" if (i == 2 and r == 1) else ""}></i>' for r in range(4)) + "</li>" for i, (t, *_r) in enumerate(assets3))
p2 = f"""<article class="sa__card" data-reveal style="--k:1">
  <div class="sa__viz sa__layers"><div class="sa__glob"><span>{T("Exercise", "Ejercicio")}</span><i></i><i></i><i></i></div><ul>{layers}</ul>
    <span class="sa__tag">20 req/s · {T("custom", "propio")}</span></div>
  <span class="sa__n">02</span><h3>{T("Global vs. per asset", "Global vs. por activo")}</h3>
  <p>{T("Objective, depth and schedule belong to the exercise. Credentials, limits, VPN and exclusions belong to each asset. Mixed, nobody knows what a change touches.", "Objetivo, profundidad y cronograma son del ejercicio. Credenciales, límites, VPN y exclusiones, de cada activo. Mezclados, nadie sabe qué toca un cambio.")}</p>
</article>"""

dots = "".join(f'<i style="--i:{i}"></i>' for i in range(40))
p3 = f"""<article class="sa__card" data-reveal style="--k:2">
  <div class="sa__viz sa__scale"><div class="sa__dots" aria-hidden="true">{dots}</div><b class="sa__big">3 <span>→</span> 40</b></div>
  <span class="sa__n">03</span><h3>{T("Scale", "Escala")}</h3>
  <p>{T("What works with three assets turns slow with forty. Setting each one by hand repeats work and hides what’s still incomplete.", "Lo que funciona con tres activos se vuelve lento con cuarenta. Configurar cada uno a mano repite trabajo y esconde lo incompleto.")}</p>
</article>"""

checks = [(True, T("Credentials", "Credenciales")), (True, T("Rate limit", "Límite de solicitudes")), (True, "VPN"), (False, T("Testing window", "Ventana de prueba"))]
cl = "".join(f'<li class="{"is-ok" if ok else "is-warn"}" style="--i:{i}">{chk(ok)}<span>{lab}</span></li>' for i, (ok, lab) in enumerate(checks))
p4 = f"""<article class="sa__card" data-reveal style="--k:3">
  <div class="sa__viz sa__control"><ul>{cl}</ul><span class="sa__pill">{T("1 issue before creating", "1 problema antes de crear")}</span></div>
  <span class="sa__n">04</span><h3>{T("Control", "Control")}</h3>
  <p>{T("Missing settings and differences between assets have to show up before the exercise exists, not after a test fails.", "La configuración faltante y las diferencias entre activos tienen que aparecer antes de que exista el ejercicio, no después de que falle una prueba.")}</p>
</article>"""

flow = [("Define", "Definir"), ("Select", "Seleccionar"), ("Shared settings", "Config. general"), ("One asset", "Un activo"), ("Review", "Revisar")]
fl = "".join(f'<li style="--i:{i}"><span class="sa__sq">{i + 1}</span><span>{T(e, s)}</span></li>' for i, (e, s) in enumerate(flow))
p5 = f"""<article class="sa__card sa__card--wide sa__card--goal" data-reveal>
  <div class="sa__copy"><span class="sa__n">05</span><h3>{T("The proposal: five stages, one stepper.", "La propuesta: cinco etapas, un stepper.")}</h3>
  <p>{T("Context first, then the scope, then the exceptions only where they’re needed, and a review that counts what’s missing.", "Primero el contexto, después el alcance, las excepciones solo donde hacen falta y una revisión que cuenta lo que falta.")}</p></div>
  <ol class="sa__flow">{fl}</ol>
  <p class="sa__goal">{T("Clear with three assets. Efficient with forty.", "Claro con tres activos. Eficiente con cuarenta.")}</p>
</article>"""

b += (f'  <section class="sa" id="analysis">\n    <div class="wrap">'
      f'<header class="sa__head"><div class="label" data-reveal>{T("The analysis", "El análisis")}</div>'
      f'<h2 class="lines">{T("Before any screen, the problem.", "Antes de cualquier pantalla, el problema.")}</h2>'
      f'<p data-reveal>{T("A five-page deck in Figma framed it, broke it down and proposed the flow. Here it is, in short.", "Un deck de cinco páginas en Figma lo planteó, lo desglosó y propuso el flujo. Acá está, resumido.")}</p></header>'
      f'<div class="sa__grid">{p1}{p2}{p3}{p4}{p5}</div></div>\n  </section>\n')

# from sketch to high fidelity, the same screen
fid = [("Sketch", "Boceto", "Structure only: the stepper, the exercise defaults on top, the table and the actions. No copy, no colour.",
        "Solo estructura: el stepper, los valores del ejercicio arriba, la tabla y las acciones. Sin textos ni color."),
       ("Low fidelity", "Baja fidelidad", "Real copy and real data in greyscale, to check that every column and every label reads before any styling.",
        "Textos y datos reales en escala de grises, para comprobar que cada columna y cada etiqueta se lean antes de cualquier estilo."),
       ("High fidelity", "Alta fidelidad", "Strike’s cyan marks what is selected and what is active, and asset types get their own colour. In the prototype, the whole happy path runs in under 40 seconds: list, details, assets, configure, review and created.",
        "El cian de Strike marca lo seleccionado y lo activo, y los tipos de activo tienen su propio color. En el prototipo, todo el happy path corre en menos de 40 segundos: listado, detalles, activos, configuración, revisión y creado.")]
b += scene_head(T("Process", "Proceso"), "From a sketch to high fidelity.", "Del boceto a la alta fidelidad.",
                "Every screen of the happy path went through three passes: Configure assets as a sketch and in low fidelity, and then the high fidelity, running in the prototype.",
                "Cada pantalla del happy path pasó por tres instancias: Configure assets en boceto y en baja fidelidad, y después la alta fidelidad, funcionando en el prototipo.", "process")
b += story(fid, [([0], dev_browser(p, "s-sketch", 1180, 811, STRIKE_URL, alt_en="Configure assets, sketch", alt_es="Configure assets, boceto")),
                 ([1], dev_browser(p, "s-lofi", 1180, 811, STRIKE_URL, alt_en="Configure assets, low fidelity", alt_es="Configure assets, baja fidelidad")),
                 ([2], dev_browser(p, "", 1440, 900, STRIKE_URL, body=video(p, "st-flow", 1440, 900, "The prototype, from the list of exercises to a new one", "El prototipo, del listado de ejercicios a uno nuevo")))], "strike", "Fidelity")

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
# the motion, as written in the prototype's CSS
motion = [("st-m-smiley", 960, 420, "The smiley", "El smiley",
           "It spins in with an overshoot, winks, and the greeting types itself letter by letter. Then it only blinks, every few seconds.",
           "Entra girando con un rebote, guiña y el saludo se escribe letra por letra. Después solo parpadea, cada tantos segundos.",
           "smile-intro 1.6s cubic-bezier(.3,1.2,.5,1) · greet-in .9s steps(11) · blink 4.2s"),
          ("st-m-drawer", 540, 900, "Asset drawer", "Panel del activo",
           "The drawer slides in from the right, and each “Set custom value” unfolds its own control right under the field.",
           "El panel entra desde la derecha, y cada “Set custom value” despliega su propio control justo debajo del campo.",
           "slide-in .3s cubic-bezier(.2,.8,.2,1)"),
          ("st-m-bot", 1440, 900, "Strike Bot", "Strike Bot",
           "The launcher floats and pings, the chat pops in from the right, and the tour dims the page and pulses on the control it talks about.",
           "El botón flota y emite un pulso, el chat aparece desde la derecha y el tour oscurece la página y late sobre el control del que habla.",
           "bot-float 3.2s · chat-pop .28s cubic-bezier(.3,1.2,.5,1) · tour-pulse 1.8s"),
          ("st-m-bulk", 1440, 900, "Bulk edit", "Edición masiva",
           "Keep, apply new or reset, field by field; the confirmation lists what will change, and a toast closes the loop.",
           "Mantener, aplicar nuevo o volver al valor, campo por campo; la confirmación lista lo que va a cambiar y un aviso cierra el circuito.",
           "keep · apply new · reset → confirm → toast")]
mo = [f'<figure class="mo__item" style="--ar:{round(w / h, 4)}" data-reveal><div class="mo__frame">{video(p, n, w, h, te, ts)}</div>'
      f'<figcaption><h3>{T(te, ts)}</h3><p>{T(ce, cs)}</p><code>{spec}</code></figcaption></figure>'
      for n, w, h, te, ts, ce, cs, spec in motion]
b += scene_head(T("Motion", "Animaciones"), "How it moves, up close.", "Cómo se mueve, de cerca.",
                "I wrote the motion in the prototype as CSS keyframes: springy curves for what appears, steps for what types, and all of it off when the system asks for reduced motion.",
                "Escribí las animaciones del prototipo como keyframes de CSS: curvas con rebote para lo que aparece, pasos para lo que se escribe, y todo apagado cuando el sistema pide menos movimiento.", "motion")
b += f'  <section class="wrap mo"><div class="mo__row">{mo[2]}{mo[1]}</div><div class="mo__row">{mo[0]}{mo[3]}</div></section>\n'
b += fan(p, ["s-m-list", "s-m-bulk", "s-m-review"], "The same flow on a phone.", "El mismo flujo en el celular.",
         "Tables keep their columns and scroll sideways, dialogs and drawers fill the screen, and the stepper shrinks to numbers.",
         "Las tablas mantienen sus columnas y se desplazan de costado, los diálogos y paneles ocupan la pantalla y el stepper se reduce a números.")


def sk(n, w, h, label, hi=False, disp=None):
    """hi: captured at 2x from the prototype, shown at half width."""
    return kit_state(p, n, w, h, label, disp or (w / 2 if hi else w))


b += kit_section("kit", "kd--strike", ("Every component, every state.", "Cada componente, cada estado."),
                 ("The Figma file has its own design system page: colours, type, header, sidebar, steppers, buttons, badges, fields and tables, each with its variants. The prototype is built on the same tokens, so every piece here is captured from it at 2x, in its real states.",
                  "El Figma tiene su propia página de design system: colores, tipografía, header, sidebar, steppers, botones, badges, campos y tablas, cada uno con sus variantes. El prototipo usa los mismos tokens, así que cada pieza está capturada de ahí a 2x, en sus estados reales."),
                 (FIGMA_DS, "Open the design system in Figma", "Abrir el design system en Figma"), [
    kit_comp("Header", "Header", "The animated smiley greets on every screen, next to the language switch and the account.", "El smiley animado saluda en cada pantalla, junto al selector de idioma y la cuenta.",
             [sk("st-kit-p-header", 2736, 96, "Default", True)], "kd__comp--span"),
    kit_comp("Stepper", "Stepper", "Four steps: the current one in cyan, the done ones checked in teal.", "Cuatro pasos: el actual en cian, los terminados con check en verde azulado.",
             [sk(f"st-kit-p-stepper-{i}", 2576, 144, T(f"Step {i}", f"Paso {i}"), True) for i in range(1, 5)], "kd__comp--span kd__comp--col"),
    kit_comp("Rate limit", "Límite de solicitudes", "Every field of an asset inherits the exercise default, with the value in brackets, or takes its own.",
             "Cada campo de un activo hereda el valor del ejercicio, con el valor entre paréntesis, o toma uno propio.",
             [sk("st-kit-p-in-rateLimit", 784, 194, T("Inherited", "Heredado"), True), sk("st-kit-p-cu-rateLimit", 784, 354, T("Custom", "Propio"), True)], "kd__comp--col"),
    kit_comp("VPN access", "Acceso por VPN", "Custom opens a two-option switch.", "El valor propio abre un selector de dos opciones.",
             [sk("st-kit-p-in-vpnRequired", 784, 194, T("Inherited", "Heredado"), True), sk("st-kit-p-cu-vpnRequired", 784, 290, T("Custom", "Propio"), True)], "kd__comp--col"),
    kit_comp("Excluded tests", "Pruebas excluidas", "Custom opens the list of tests that can be excluded.", "El valor propio abre la lista de pruebas que se pueden excluir.",
             [sk("st-kit-p-in-excludedTests", 784, 194, T("Inherited", "Heredado"), True), sk("st-kit-p-cu-excludedTests", 784, 500, T("Custom", "Propio"), True)], "kd__comp--col"),
    kit_comp("Testing window", "Ventana de prueba", "Custom asks for its own start and end time.", "El valor propio pide su propia hora de inicio y de fin.",
             [sk("st-kit-p-in-window", 784, 194, T("Inherited", "Heredado"), True), sk("st-kit-p-cu-window", 784, 354, T("Custom", "Propio"), True)], "kd__comp--col"),
    kit_comp("Fields", "Campos", "Selects, dates and times: empty with a hint, then filled.", "Selects, fechas y horas: vacíos con una pista, después completos.",
             [sk("st-kit-p-f-select-empty", 826, 144, T("Select · empty", "Select · vacío"), True), sk("st-kit-p-f-select-filled", 826, 144, T("Select · filled", "Select · completo"), True),
              sk("st-kit-p-f-date-empty", 826, 144, T("Date · empty", "Fecha · vacía"), True), sk("st-kit-p-f-date-filled", 826, 144, T("Date · filled", "Fecha · completa"), True),
              sk("st-kit-p-f-time-empty", 826, 144, T("Time · empty", "Hora · vacía"), True), sk("st-kit-p-f-time-filled", 826, 144, T("Time · filled", "Hora · completa"), True)], "kd__comp--col"),
    kit_comp("Badges and buttons", "Badges y botones", "Status in cyan and green, asset types in violet, and one primary action per screen.", "Los estados en cian y verde, los tipos de activo en violeta y una sola acción principal por pantalla.",
             [sk("st-kit-p-badges", 294, 392, "Badges", True), sk("st-kit-p-btn-create", 354, 96, T("Primary", "Primario"), True),
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
             [sk("st-kit-p-tbl-exercises", 2576, 1374, T("Exercises", "Ejercicios"), disp=860), sk("st-kit-p-tbl-exercises-open", 2576, 2050, T("Exercise expanded", "Ejercicio desplegado"), disp=860),
              sk("st-kit-p-tbl-assets", 2576, 1122, T("Assets", "Activos"), disp=860), sk("st-kit-p-tbl-assets-selected", 2576, 1122, T("Assets · selected", "Activos · seleccionados"), disp=860),
              sk("st-kit-p-tbl-config", 2576, 426, T("Configuration", "Configuración"), disp=860), sk("st-kit-p-tbl-config-selected", 2576, 426, T("Configuration · selected", "Configuración · seleccionada"), disp=860)], "kd__comp--wide"),
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
