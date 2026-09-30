from common import *
import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")

p = "../"
FIGMA = "https://www.figma.com/design/ljgOjnuyx1hS052ehRnyRb/Portfolio?node-id=133-4775"
FN = "batech.html"


def bf(name, w, h, title, ae, as_, ce="", cs=""):
    return fig(p, name, w, h, title, ae, as_, ce, cs, kind="batech", dark=True)


body = case_head(
    "Batech AI Platform",
    T("A computer-vision platform that turns store cameras into events, alerts and reports. I led its design end to end, from the first flow to a high-fidelity prototype.",
      "Una plataforma de visión artificial que convierte las cámaras de cada tienda en eventos, alertas y reportes. Lideré su diseño de punta a punta, del primer flujo al prototipo de alta fidelidad."),
    [(T("Role", "Rol"), "Lead UX/UI Designer"), (T("Company", "Empresa"), "Batech · Querétaro, MX"), (T("Timeline", "Período"), "2022 — 2026"),
     (T("Platform", "Plataforma"), T("Web app, dark UI", "Web app, UI oscura")), (T("Team", "Equipo"), T("Design team lead", "Líder del equipo de diseño")),
     (T("Scope", "Alcance"), T("Research, flows, UI, design system", "Research, flujos, UI, design system"))],
    links=f'<a class="btn" href="{FIGMA}" target="_blank" rel="noopener">{T("View in Figma", "Ver en Figma")} {arrow()}</a><a class="btn btn--ghost" href="#flow">{T("Jump to the flow", "Ir al flujo")}</a>',
)
body += f'  <section class="wrap case-cover" data-parallax>{cover_mock(p, "batech", "b-dashboard", 1200, 857, "Batech · Dashboard", dark=True)}</section>\n'

body += chapter(T("Overview", "Resumen"), h2("AI that watches the store, and a place to read what it saw.", "Una IA que mira la tienda, y un lugar para leer lo que vio.") + prose(
    ("Batech builds artificial intelligence for physical retail. Its models watch the cameras of every branch and detect events, such as a cash drawer opening at the till. The platform is where operations teams follow those detections, configure new analyses and download the results.",
     "Batech desarrolla inteligencia artificial para el retail físico. Sus modelos miran las cámaras de cada sucursal y detectan eventos, como la apertura de una caja. La plataforma es donde los equipos de operaciones siguen esas detecciones, configuran nuevos análisis y descargan los resultados."),
    ("I led the design of the platform from the first idea to launch: research and testing, flows and navigation, the interface and the component library in Figma. I also led the design team, which delivered <strong>10% faster</strong> over the project.",
     "Lideré el diseño de la plataforma desde la primera idea hasta el lanzamiento: research y testing, flujos y navegación, la interfaz y la librería de componentes en Figma. También lideré al equipo de diseño, que entregó <strong>un 10% más rápido</strong> a lo largo del proyecto.")), "overview")

body += chapter(T("The challenge", "El desafío"), h2("A technical setup that has to feel like a form.", "Una configuración técnica que tiene que sentirse como un formulario.") + prose(
    ("Video analytics is full of concepts that are hard to explain: models, camera sources, RTSP links, geofences, execution schedules. And the people configuring an analysis shouldn’t need to be engineers.",
     "El análisis de video está lleno de conceptos difíciles de explicar: modelos, fuentes de cámara, links RTSP, geocercas, horarios de ejecución. Y quien configura un análisis no debería necesitar ser ingeniero."),
    ("At the same time the platform produces a lot of data: hundreds of pages of detections, each tied to a camera, a branch and a video that may or may not be processed yet.",
     "Al mismo tiempo, la plataforma genera muchísimos datos: cientos de páginas de detecciones, cada una atada a una cámara, una sucursal y un video que puede estar procesado o no.")) +
    f'      <p class="pull" data-reveal>{T("Make the setup read like a form, and make hundreds of detections easy to scan.", "Que la configuración se lea como un formulario, y que cientos de detecciones se puedan escanear de un vistazo.")}</p>\n', "challenge")

cards = [("Dashboard", "What is happening now: active cameras, total detections and rate.", "Qué pasa ahora: cámaras activas, detecciones totales y tasa."),
         ("Eventos", "What was detected, with the camera frame and its video.", "Qué se detectó, con el cuadro de la cámara y su video."),
         ("Alertas", "What needs attention right away.", "Qué necesita atención ya."),
         ("Análisis", "What is being analyzed, and in which state.", "Qué se está analizando y en qué estado."),
         ("Bitácora", "What happened, and when.", "Qué pasó y cuándo."),
         ("Operativo", "How long operations take against what was expected.", "Cuánto tardan las operaciones contra lo esperado."),
         ("Reportes", "What to share with the rest of the company.", "Qué compartir con el resto de la empresa.")]
grid = '      <div class="grid-cards" data-reveal>' + "".join(f"<div><b>{n}</b><span>{T(e, s)}</span></div>" for n, e, s in cards) + "</div>\n"
body += chapter(T("Structure", "Estructura"), h2("Seven sections, each answering one question.", "Siete secciones, cada una responde una pregunta.") + grid +
                prose(("The dashboard above opens the platform: three numbers up top and the live analytics panel below, with the seven sections always one click away in the sidebar.",
                       "El dashboard de arriba abre la plataforma: tres números arriba y el panel de analítica en vivo debajo, con las siete secciones siempre a un clic en la barra lateral.")), "structure")

steps = [("Choose the source", "Elegir la fuente", "A video service, an RTSP link or an uploaded video file. Three branches that converge in the same form.", "Un servicio de video, un link RTSP o un archivo subido. Tres caminos que llegan al mismo formulario."),
         ("Name it and pick a model", "Nombrarlo y elegir el modelo", "General aspects first: the detection model and a name the team will recognise later.", "Primero lo general: el modelo de detección y un nombre que el equipo reconozca después."),
         ("Schedule it", "Programarlo", "Execution days as chips from Monday to Sunday, plus a start and end time.", "Los días de ejecución como chips de lunes a domingo, más una hora de inicio y de fin."),
         ("Draw the geofence", "Dibujar la geocerca", "On a frame of the camera, the user outlines the area to analyze with the cursor and names it.", "Sobre un cuadro de la cámara, se marca con el cursor el área a analizar y se le pone nombre."),
         ("Confirm", "Confirmar", "A dialog warns that the analysis can take hours, and says where to follow its progress and download the report.", "Un diálogo avisa que el análisis puede tardar horas y dice dónde seguir su progreso y descargar el reporte."),
         ("Read the result", "Ver el resultado", "The geofence over the frame, the detections in a table and one button to download.", "La geocerca sobre el cuadro, las detecciones en una tabla y un botón para descargar.")]
ol = '      <ol class="steps">' + "".join(f'<li data-reveal><span class="steps__n">{i + 1:02d}</span><div><h3>{T(a, b)}</h3><p>{T(c, d)}</p></div></li>' for i, (a, b, c, d) in enumerate(steps)) + "</ol>\n"
flow = (f'      <figure class="shot" data-reveal><div class="zoomer" data-zoomer tabindex="0" role="region" aria-label="To-be flow">'
        f'<div class="zoomer__stage" style="width:8000px">{screen(p, "b-flow", 10000, 2243, "To-be flow for configuring an analysis, from source to report", "Flujo to-be para configurar un análisis, de la fuente al reporte")}</div>'
        f'<div class="zoomer__ui"><button type="button" data-zoom="out" aria-label="Zoom out"><svg aria-hidden="true"><use href="#i-minus"/></svg></button>'
        f'<span class="zoomer__pct" data-zoom-pct>10%</span>'
        f'<button type="button" data-zoom="in" aria-label="Zoom in"><svg aria-hidden="true"><use href="#i-plus"/></svg></button>'
        f'<button type="button" data-zoom="fit" class="zoomer__txt">{T("Fit", "Ajustar")}</button>'
        f'<button type="button" data-zoom="full" aria-label="Full screen"><svg aria-hidden="true"><use href="#i-expand"/></svg></button></div>'
        f'<p class="zoomer__hint">{T("Drag to move · pinch, ⌘/Ctrl + scroll or +/− to zoom", "Arrastrá para moverte · pellizcá, ⌘/Ctrl + rueda o +/− para hacer zoom")}</p></div>'
        f'<figcaption>{T("<b>The to-be flow</b>, prototyped in high fidelity in Figma. Zoom in to read every screen.", "<b>El flujo to-be</b>, prototipado en alta fidelidad en Figma. Hacé zoom para leer cada pantalla.")}</figcaption></figure>\n')
body += chapter(T("Configuring an analysis", "Configurar un análisis"), h2("From camera to report in six steps.", "De la cámara al reporte en seis pasos.") + flow + ol +
                "      " + pair(bf("b-geocerca", 1200, 1233, "Nuevo análisis · Geocerca", "Geofence creation over a parking lot camera frame", "Creación de geocerca sobre el cuadro de una cámara de estacionamiento",
                                  "<b>Step 04.</b> The geofence is drawn on the real camera frame, not described in coordinates.", "<b>Paso 04.</b> La geocerca se dibuja sobre el cuadro real de la cámara, no se describe con coordenadas."),
                              bf("b-confirm", 1200, 1396, "Nuevo análisis · Confirmación", "Confirmation dialog before starting the analysis", "Diálogo de confirmación antes de iniciar el análisis",
                                 "<b>Step 05.</b> The dialog sets expectations: it may take hours, and here is where to check.", "<b>Paso 05.</b> El diálogo marca expectativas: puede tardar horas, y acá es donde se sigue.")) + "\n"
                + "      " + bf("b-resultado", 1200, 1021, "Resultado de análisis", "Analysis result with the geofence highlighted and a table of detections", "Resultado del análisis con la geocerca resaltada y la tabla de detecciones",
                               "<b>Step 06.</b> The highlighted area shows exactly what the model watched.", "<b>Paso 06.</b> El área resaltada muestra exactamente qué miró el modelo.") + "\n", "flow")

ev = decision("Events as cards with the frame", "Eventos como tarjetas con el cuadro",
              bullets(("The camera frame leads,", "El cuadro de la cámara va primero,", "so people recognise the scene before they read the ID.", "así se reconoce la escena antes de leer el ID."),
                      ("Four filters", "Cuatro filtros", "above the grid: event ID, date range, detection type and branch.", "sobre la grilla: ID del evento, rango de fechas, tipo de detección y sucursal."),
                      ("Video state in colour:", "El estado del video en color:", "a red bar when the video is not processed yet, a blue button when it can be watched.", "una barra roja cuando el video todavía no se procesó, un botón azul cuando ya se puede ver."),
                      ("Pagination with jump-to-page,", "Paginación con salto a página,", "because there can be 300 pages.", "porque puede haber 300 páginas.")),
              bf("b-eventos", 1200, 932, "Batech · Eventos detectados", "Grid of detected events with camera frames, filters and pagination", "Grilla de eventos detectados con cuadros de cámara, filtros y paginación"))
ev += decision("Analyses and operational times", "Análisis y tiempos operativos",
               f"<p>{T('The analysis table puts status last and in colour (retry, error, active, configured) so problems stand out in a long list. The operational view compares <strong>real time against expected time</strong> for each analysis and turns it into a percentage.', 'La tabla de análisis pone el estado al final y en color (reintento, error, activo, configurado) para que los problemas resalten en una lista larga. La vista operativa compara <strong>el tiempo real contra el esperado</strong> de cada análisis y lo convierte en un porcentaje.')}</p>",
               pair(bf("b-analisis", 1200, 857, "Batech · Análisis", "Analysis table with coloured statuses", "Tabla de análisis con estados en color"),
                    bf("b-operativos", 1200, 857, "Batech · Operativos", "Operational cards comparing real and expected time", "Tarjetas operativas que comparan el tiempo real y el esperado")))
body += chapter(T("Events and operations", "Eventos y operación"), h2("Hundreds of pages, scannable at a glance.", "Cientos de páginas, legibles de un vistazo.") + ev, "events")

body += chapter("Batech AI", h2("Ask the platform instead of building a report.", "Preguntarle a la plataforma en vez de armar un reporte.") + prose(
    ("An assistant opens in a side panel over any screen. It opens with suggested questions, such as the most visited branch, the most recurrent event or the conversion rate, and accepts text, attachments and voice.",
     "Un asistente se abre en un panel lateral sobre cualquier pantalla. Arranca con preguntas sugeridas, como la sucursal más visitada, el evento más recurrente o la tasa de conversión, y acepta texto, adjuntos y voz.")) +
    "      " + bf("b-ai", 1200, 857, "Batech AI · New chat", "AI assistant panel with suggested questions", "Panel del asistente de IA con preguntas sugeridas") + "\n", "ai")

body += chapter(T("Access and system", "Acceso y sistema"), h2("One dark system, from the login in.", "Un sistema oscuro, desde el login.") + prose(
    ("Sign-in works with a phone or an email, switched with a segmented control. Every screen is built from the same Figma library (sidebar, filters, cards, tables, dialogs and pagination) on a dark theme with the brand’s cyan as the accent.",
     "El ingreso funciona con teléfono o con email, que se cambian con un control segmentado. Cada pantalla sale de la misma librería de Figma (barra lateral, filtros, tarjetas, tablas, diálogos y paginación) sobre un tema oscuro con el cian de la marca como acento.")) +
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
