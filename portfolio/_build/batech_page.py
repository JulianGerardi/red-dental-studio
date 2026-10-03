from common import *
from scenes import rise, story, rail, rail_browser, dev_browser
from mockups import ICO, BATECH_MARK
import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")

p = "../"
FIGMA = "https://www.figma.com/design/ljgOjnuyx1hS052ehRnyRb/Portfolio?node-id=133-4775"
FLOW_FIGMA = "https://www.figma.com/design/ljgOjnuyx1hS052ehRnyRb/Portfolio?node-id=89-5120"
FN = "batech.html"


def bf(name, w, h, title, ae, as_, ce="", cs=""):
    return fig(p, name, w, h, title, ae, as_, ce, cs, kind="batech", dark=True)


# The "Nuevo análisis" form from the Figma flow, rebuilt in HTML so each step can fill it in.
def sel(at, ph, v, extra=""):
    return f'<span class="bf__in" data-at="{at}"><span class="ph">{ph}</span><span class="v">{v}</span>{extra}</span>'


def tsel(at, v):
    return f'<span class="bf__in bf__in--time" data-at="{at}">{ICO["clock"]}<span class="ph">--:--</span><span class="v">{v}</span></span>'


DAYS = [("Lunes", None), ("Martes", 0), ("Miércoles", None), ("Jueves", 1), ("Viernes", None), ("Sábado", 2), ("Domingo", 3)]
days = "".join(f'<span data-at="2" style="transition-delay:{d * 0.12:.2f}s">{n}</span>' if d is not None else f"<span>{n}</span>" for n, d in DAYS)
LONG = "Explica de qué va esta opción y cómo debe configurarla. Especificar formatos de video, pesos, y todas las limitantes tecnológicas para prevenir el error del usuario."
FORM = (f'<div class="fitbox" data-fit="1200x1320" data-fit-keep style="height:100%"><div class="fit"><div class="bf">'
        f'<div class="bf__top"><span class="bf__logo">{BATECH_MARK}batech</span><span class="bf__hi">Hola ! Kimi ! <b>Bienvenido a Batech</b></span>'
        f'<span class="bf__lang">🇲🇽 Spanish</span><span class="bf__bell">{ICO["bell"]}</span></div>'
        f'<div class="bf__page"><h4>Nuevo análisis</h4><p>Crea un nuevo análisis eventos y perspectivas en tendencia relevantes.</p>'
        f'<div class="bf__card bf__card--gen"><h5>Aspectos generales</h5><p>Ingresa su nombre y elige un modelo de registro inteligentes para el nuevo análisis</p>'
        f'<div class="bf__row"><span class="bf__f">Modelos{sel(1, "Elige un modelo", "Análisis de prueba")}</span><span class="bf__f">Nombre del Análisis{sel(1, "Escribe un nombre", "Modelo de prueba")}</span></div></div>'
        f'<div class="bf__card bf__card--time"><h5>Tiempos de ejecución</h5><p>Configura los tiempos de ejecución de tu análisis.</p>'
        f'<div class="bf__label">Días de ejecución</div><div class="bf__days">{days}</div>'
        f'<div class="bf__row"><span class="bf__f">Horario de inicio{tsel(2, "8:00 hs")}</span><span class="bf__f">Horario de finalización{tsel(2, "8:30 hs")}</span></div></div>'
        f'<div class="bf__card bf__card--src"><h5>Fuente de monitoreo</h5><p>Selecciona la fuente de datos para monitorear.</p>'
        f'<div class="bf__row" style="grid-template-columns:1fr"><span class="bf__f">Fuente de monitoreo{sel(0, "Elige una fuente", "Servicio de video", "<span class=bf__menu><span>Servicio de video</span><span>Enlace RTSP</span><span>Archivo de video</span></span>")}</span></div></div>'
        f'<div class="bf__card bf__card--cfg"><h5>Configuración de análisis de servicio de video</h5><p>{LONG}</p>'
        f'<div class="bf__row" style="grid-template-columns:1fr"><span class="bf__f">Fuente de monitoreo{sel(0, "Elige una opción", "Opción 1")}</span><span class="bf__f">Número de cámara{sel(0, "Elige una cámara", "Opción 2")}</span></div></div>'
        f'<div class="bf__card"><h5>Definición de geocercas de análisis</h5><p>{LONG}</p><span class="bf__geo"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>Crea geocerca de análisis</span></div>'
        f'<div class="bf__actions"><span>Cancelar</span><span>Iniciar análisis</span></div></div></div></div></div>')
form_window = f'<div class="story__dev" style="--far:1.5129">' + browser(p, "", 1200, 750, "app.batech.ai/analisis/nuevo", dark=True, body=FORM) + "</div>"

body = case_head(
    "Batech AI Platform",
    T("A computer-vision platform that turns store cameras into events, alerts and reports. I led its design end to end, from the first flow to a high-fidelity prototype.",
      "Una plataforma de visión artificial que convierte las cámaras de cada tienda en eventos, alertas y reportes. Lideré su diseño de punta a punta, del primer flujo al prototipo de alta fidelidad."),
    [(T("Role", "Rol"), "Lead UX/UI Designer"), (T("Company", "Empresa"), "Batech · Querétaro, MX"), (T("Timeline", "Período"), "2022 — 2026"),
     (T("Platform", "Plataforma"), T("Web app, dark UI", "Web app, UI oscura")), (T("Team", "Equipo"), T("Design team lead", "Líder del equipo de diseño")),
     (T("Scope", "Alcance"), T("Research, flows, UI, design system", "Research, flujos, UI, design system"))],
    links=f'<a class="btn" href="{FIGMA}" target="_blank" rel="noopener">{T("View in Figma", "Ver en Figma")} {arrow()}</a><a class="btn btn--ghost" href="#flow">{T("Jump to the flow", "Ir al flujo")}</a>',
)
body += rise(brand_scene(p, "batech", T, big=True), "batech")

body += chapter(T("Overview", "Resumen"), h2("AI that watches the store, and a place to read what it saw.", "Una IA que mira la tienda, y un lugar para leer lo que vio.") + prose(
    ("Batech builds artificial intelligence for physical retail. Its models watch the cameras of every branch and detect events, such as a cash drawer opening at the till. The platform is where operations teams follow those detections, configure new analyses and download the results.",
     "Batech desarrolla inteligencia artificial para el retail físico. Sus modelos miran las cámaras de cada sucursal y detectan eventos, como la apertura de una caja. La plataforma es donde los equipos de operaciones siguen esas detecciones, configuran nuevos análisis y descargan los resultados."),
    ("I led the design from the first idea to launch: user research and testing, flows and navigation, the interface and the component library in Figma, and the presentations to the client. I also led the design team, which delivered <strong>10% faster</strong>.",
     "Lideré el diseño desde la primera idea hasta el lanzamiento: research y testing con usuarios, flujos y navegación, la interfaz y la librería de componentes en Figma, y las presentaciones al cliente. También lideré al equipo de diseño, que entregó <strong>un 10% más rápido</strong>.")), "overview")

body += chapter(T("The challenge", "El desafío"), h2("A technical setup that has to feel like a form.", "Una configuración técnica que tiene que sentirse como un formulario.") + prose(
    ("Video analytics is full of concepts that are hard to explain: models, camera sources, RTSP links, geofences, execution schedules. And the people configuring an analysis shouldn’t need to be engineers.",
     "El análisis de video está lleno de conceptos difíciles de explicar: modelos, fuentes de cámara, links RTSP, geocercas, horarios de ejecución. Y quien configura un análisis no debería necesitar ser ingeniero."),
    ("At the same time the platform produces a lot of data: hundreds of pages of detections, each tied to a camera, a branch and a video that may or may not be processed yet.",
     "Al mismo tiempo, la plataforma genera muchísimos datos: cientos de páginas de detecciones, cada una atada a una cámara, una sucursal y un video que puede estar procesado o no.")), "challenge")
body += big_words("Make the setup read like a form, and make hundreds of detections easy to scan.",
                  "Que la configuración se lea como un formulario, y que cientos de detecciones se puedan escanear de un vistazo.")

cards = [("Dashboard", "What is happening now: active cameras, total detections and rate.", "Qué pasa ahora: cámaras activas, detecciones totales y tasa."),
         ("Eventos", "What was detected, with the camera frame and its video.", "Qué se detectó, con el cuadro de la cámara y su video."),
         ("Alertas", "What needs attention right away.", "Qué necesita atención ya."),
         ("Análisis", "What is being analyzed, and in which state.", "Qué se está analizando y en qué estado."),
         ("Bitácora", "What happened, and when.", "Qué pasó y cuándo."),
         ("Operativo", "How long operations take against what was expected.", "Cuánto tardan las operaciones contra lo esperado."),
         ("Reportes", "What to share with the rest of the company.", "Qué compartir con el resto de la empresa.")]
grid = '      <div class="grid-cards" data-reveal>' + "".join(f"<div><b>{n}</b><span>{T(e, s)}</span></div>" for n, e, s in cards) + "</div>\n"
body += chapter(T("Structure", "Estructura"), h2("Seven sections, each answering one question.", "Siete secciones, cada una responde una pregunta.") + grid +
                prose(("The dashboard opens the platform: three numbers up top and the live analytics panel below, with the seven sections always one click away in the sidebar.",
                       "El dashboard abre la plataforma: tres números arriba y el panel de analítica en vivo debajo, con las siete secciones siempre a un clic en la barra lateral.")) +
                "      " + bf("b-dashboard", 1200, 857, "Batech · Dashboard", "Dashboard with active cameras, detections and rate", "Dashboard con cámaras activas, detecciones y tasa") + "\n", "structure")

# ---------- the six steps, as a story: the form fills itself, then the screens that follow ----------
steps = [("Choose the source", "Elegir la fuente", "A video service, an RTSP link or an uploaded file. Three branches of the flow that land in the same form.", "Un servicio de video, un link RTSP o un archivo subido. Tres ramas del flujo que llegan al mismo formulario."),
         ("Name it and pick a model", "Nombrarlo y elegir el modelo", "General aspects first: the detection model and a name the team will recognise later in the reports.", "Primero lo general: el modelo de detección y un nombre que el equipo reconozca después en los reportes."),
         ("Schedule it", "Programarlo", "Execution days as chips from Monday to Sunday, and a start and end time. No cron, no jargon.", "Los días de ejecución como chips de lunes a domingo, y una hora de inicio y de fin. Sin cron, sin jerga."),
         ("Draw the geofence", "Dibujar la geocerca", "On a real frame of the camera, the user outlines the area to analyze and names it. Nothing is described in coordinates.", "Sobre un cuadro real de la cámara, se marca el área a analizar y se le pone nombre. Nada se describe con coordenadas."),
         ("Confirm", "Confirmar", "The dialog sets expectations: the analysis can take hours, and it says where to follow it and download the report.", "El diálogo marca expectativas: el análisis puede tardar horas, y dice dónde seguirlo y descargar el reporte."),
         ("Read the result", "Ver el resultado", "The geofence over the frame shows exactly what the model watched, with the detections in a table and one button to download.", "La geocerca sobre el cuadro muestra exactamente qué miró el modelo, con las detecciones en una tabla y un botón para descargar.")]
layers = [([0, 1, 2], form_window),
          ([3], dev_browser(p, "b-geocerca", 1200, 1233, "app.batech.ai/analisis/nuevo", True, alt_en="Geofence drawn over a parking lot camera frame", alt_es="Geocerca dibujada sobre el cuadro de una cámara de estacionamiento")),
          ([4], dev_browser(p, "b-confirm", 1200, 1396, "app.batech.ai/analisis/nuevo", True, alt_en="Confirmation dialog before starting the analysis", alt_es="Diálogo de confirmación antes de iniciar el análisis")),
          ([5], dev_browser(p, "b-resultado", 1200, 1021, "app.batech.ai/analisis/1042", True, alt_en="Analysis result with the geofence highlighted and a table of detections", alt_es="Resultado del análisis con la geocerca resaltada y la tabla de detecciones"))]
body += scene_head(T("Configuring an analysis", "Configurar un análisis"), "From camera to report in six steps.", "De la cámara al reporte en seis pasos.",
                   "Scroll through the flow: the first three steps fill the real form, rebuilt from the Figma screens.",
                   "Recorré el flujo con el scroll: los tres primeros pasos completan el formulario real, reconstruido desde las pantallas de Figma.", "flow")
body += story(steps, layers, "batech", "From camera to report")

flow = (f'      <figure class="shot" data-reveal><div class="zoomer" data-zoomer data-w="20000" data-h="4486" data-tile="2048" data-cols="10" data-rows="3" data-base="{p}assets/img/flow/" tabindex="0" role="region" aria-label="To-be flow">'
        f'<div class="zoomer__stage"><img class="zoomer__low" src="{p}assets/img/flow/overview.webp" width="5000" height="1122" alt="To-be flow for configuring an analysis, from source to report" data-alt-es="Flujo to-be para configurar un análisis, de la fuente al reporte" decoding="async" loading="lazy"></div>'
        f'<div class="zoomer__ui"><button type="button" data-zoom="out" aria-label="Zoom out"><svg aria-hidden="true"><use href="#i-minus"/></svg></button>'
        f'<span class="zoomer__pct" data-zoom-pct>–</span>'
        f'<button type="button" data-zoom="in" aria-label="Zoom in"><svg aria-hidden="true"><use href="#i-plus"/></svg></button>'
        f'<button type="button" data-zoom="fit" class="zoomer__txt">{T("Fit", "Ajustar")}</button>'
        f'<button type="button" data-zoom="full" aria-label="Full screen"><svg aria-hidden="true"><use href="#i-expand"/></svg></button>'
        f'<a class="zoomer__txt zoomer__figma" href="{FLOW_FIGMA}" target="_blank" rel="noopener">Figma <svg aria-hidden="true"><use href="#i-arrow"/></svg></a></div>'
        f'<p class="zoomer__hint">{T("Scroll to zoom · drag to move", "Rueda para hacer zoom · arrastrá para moverte")}</p></div>'
        f'<figcaption>{T("<b>The to-be flow</b>, prototyped in high fidelity in Figma: the three source branches, the geofence, the confirmation and the report. Zoom in with the mouse wheel to read every screen, or open it in Figma.", "<b>El flujo to-be</b>, prototipado en alta fidelidad en Figma: las tres ramas de fuente, la geocerca, la confirmación y el reporte. Hacé zoom con la rueda del mouse para leer cada pantalla, o abrilo en Figma.")}</figcaption></figure>\n')
body += chapter(T("The whole flow", "El flujo completo"), h2("Every branch, on one board.", "Cada rama, en un solo tablero.") + flow, "board")

body += rail("Hundreds of pages, scannable at a glance.", "Cientos de páginas, legibles de un vistazo.",
             "Once analyses run, the platform fills up. Each view answers one question without opening a single video.",
             "Cuando los análisis corren, la plataforma se llena. Cada vista responde una pregunta sin abrir un solo video.", [
    rail_browser(p, "b-eventos", 1200, 932, "app.batech.ai/eventos", T("<b>Events as cards with the frame.</b> The camera frame leads so people recognise the scene before the ID; a red bar means the video isn’t processed yet, a blue button means it can be watched.", "<b>Eventos como tarjetas con el cuadro.</b> El cuadro de la cámara va primero para reconocer la escena antes que el ID; una barra roja avisa que el video no se procesó, un botón azul que ya se puede ver."), True),
    rail_browser(p, "b-analisis", 1200, 857, "app.batech.ai/analisis", T("<b>Analyses with the status last, in colour:</b> retry, error, active, configured. Problems stand out in a long list.", "<b>Análisis con el estado al final y en color:</b> reintento, error, activo, configurado. Los problemas resaltan en una lista larga."), True),
    rail_browser(p, "b-operativos", 1200, 857, "app.batech.ai/operativo", T("<b>Operational times:</b> real time against expected time for each analysis, turned into a percentage.", "<b>Tiempos operativos:</b> el tiempo real contra el esperado de cada análisis, convertido en un porcentaje."), True),
    rail_browser(p, "b-ai", 1200, 857, "app.batech.ai/ia", T("<b>Batech AI.</b> An assistant in a side panel over any screen, with suggested questions such as the most visited branch or the most recurrent event, and text, attachments and voice.", "<b>Batech AI.</b> Un asistente en un panel lateral sobre cualquier pantalla, con preguntas sugeridas como la sucursal más visitada o el evento más recurrente, y texto, adjuntos y voz."), True),
])

body += chapter(T("Access and system", "Acceso y sistema"), h2("One dark system, from the login in.", "Un sistema oscuro, desde el login.") + prose(
    ("Sign-in works with a phone or an email, switched with a segmented control. Every screen is built from the same Figma library (sidebar, filters, cards, tables, dialogs and pagination) on a dark theme with the brand’s cyan as the accent, so developers build from one source.",
     "El ingreso funciona con teléfono o con email, que se cambian con un control segmentado. Cada pantalla sale de la misma librería de Figma (barra lateral, filtros, tarjetas, tablas, diálogos y paginación) sobre un tema oscuro con el cian de la marca como acento, así desarrollo construye desde una sola fuente.")) +
    "      " + bf("b-login", 1200, 857, "Batech · Iniciar sesión", "Login with phone or email tabs", "Login con pestañas de teléfono o email") + "\n", "system")

body += chapter(T("Outcome", "Resultado"), h2("One place to set up, follow and share every analysis.", "Un solo lugar para configurar, seguir y compartir cada análisis.") +
                f"""      <div class="numbers" data-reveal>
        <div><b data-count="7">7</b><span>{T("sections in the navigation", "secciones en la navegación")}</span></div>
        <div><b data-count="3">3</b><span>{T("video sources, one setup flow", "fuentes de video, un solo flujo")}</span></div>
        <div><b data-count="6">6</b><span>{T("steps from camera to report", "pasos de la cámara al reporte")}</span></div>
        <div><b data-count="10" data-suffix="%">10%</b><span>{T("faster delivery from the design team", "entregas más rápidas del equipo de diseño")}</span></div>
      </div>
""" + prose(("Alongside the platform I revamped Batech’s web and mobile interfaces with analytics and A/B testing to simplify key flows and reduce abandonment, and kept the design system in Figma consistent across both.",
             "Además de la plataforma, rediseñé las interfaces web y mobile de Batech con analytics y A/B testing para simplificar flujos clave y bajar el abandono, y mantuve el design system en Figma consistente entre ambas.")) +
                f'      <div class="btns" data-reveal><a class="btn" href="{FIGMA}" target="_blank" rel="noopener">{T("View in Figma", "Ver en Figma")} {arrow()}</a></div>\n', "outcome")

page = case_page(p, FN, "Batech AI Platform", "Batech AI Platform",
                 "Design of Batech's AI video analytics platform for retail. Case study by Julián Gerardi.",
                 "Diseño de la plataforma de análisis de video con IA de Batech para retail. Caso de Julián Gerardi.", body)
open(os.path.join(ROOT, "work", FN), "w").write(page)
print("batech ok", len(page))
