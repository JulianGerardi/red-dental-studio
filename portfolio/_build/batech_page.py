from common import *
import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")

p = "../"
FIGMA = "https://www.figma.com/design/ljgOjnuyx1hS052ehRnyRb/Portfolio?node-id=133-4775"


def panel(inner, kind="batech"):
    return f'<figure class="shot"><div class="panel panel--{kind}">{inner}</div>'


def fig(name, w, h, title, alt, cap="", kind="batech", dark=True):
    c = f"<figcaption>{cap}</figcaption>" if cap else ""
    return f'{panel(mock(p, name, w, h, title, dark=dark, alt=alt, zoom=True), kind)}{c}</figure>'


body = case_head(
    "Batech AI Platform", "Batech AI Platform",
    "A computer-vision platform that turns store cameras into events, alerts and reports. I led its design end to end, from the first flow to a high-fidelity prototype.",
    [("Role", "Lead UX/UI Designer"), ("Company", "Batech · Querétaro, MX"), ("Timeline", "2022 — 2026"),
     ("Platform", "Web app, dark UI"), ("Team", "Design team lead"), ("Scope", "Research, flows, UI, design system")],
    links=f'<a class="btn" href="{FIGMA}" target="_blank" rel="noopener">View in Figma {arrow()}</a><a class="btn btn--ghost" href="#flow">Jump to the flow</a>',
)

body += f"""  <section class="row"><div class="cell cell--flush">{cover_batech(p, "cover--hero", lazy=False, shot="b-resultado", h=1021, title="Batech · Resultado de análisis")}</div></section>
"""

body += chapter("Overview", f"""      <h2>AI that watches the store, and a place to read what it saw.</h2>
      <div class="prose">
        <p>Batech builds artificial intelligence for physical retail. Its models watch the cameras of every branch and detect events, such as a cash drawer opening at the till. The platform is where operations teams follow those detections, configure new analyses and download the results.</p>
        <p>I led the design of the platform from the first idea to launch: research and testing, flows and navigation, the interface and the component library in Figma. I also led the design team, which delivered <strong>10% faster</strong> over the project.</p>
      </div>""", "overview")

body += chapter("The challenge", """      <h2>A technical setup that has to feel like a form.</h2>
      <div class="prose">
        <p>Video analytics is full of concepts that are hard to explain: models, camera sources, RTSP links, geofences, execution schedules. And the people configuring an analysis shouldn’t need to be engineers.</p>
        <p>At the same time the platform produces a lot of data. Hundreds of pages of detections, each one tied to a camera, a branch and a video that may or may not be processed yet.</p>
      </div>
      <p class="pull">Make the setup read like a form, and make hundreds of detections easy to scan.</p>""", "challenge")

body += chapter("Structure", f"""      <h2>Seven sections, each answering one question.</h2>
      <div class="grid-cards">
        <div><b>Dashboard</b><span>What is happening now: active cameras, total detections and rate.</span></div>
        <div><b>Eventos</b><span>What was detected, with the camera frame and its video.</span></div>
        <div><b>Alertas</b><span>What needs attention right away.</span></div>
        <div><b>Análisis</b><span>What is being analyzed, and in which state.</span></div>
        <div><b>Bitácora</b><span>What happened, and when.</span></div>
        <div><b>Operativo</b><span>How long operations take against what was expected.</span></div>
        <div><b>Reportes</b><span>What to share with the rest of the company.</span></div>
      </div>
      {fig("b-dashboard", 1200, 857, "Batech · Dashboard", "Dashboard with active cameras, total detections and rate", "<b>Dashboard.</b> Three numbers up top and the live analytics panel below; the sidebar keeps the seven sections one click away.")}""", "structure")

body += chapter("Configuring an analysis", f"""      <h2>From camera to report in six steps.</h2>
      <div class="prose"><p>I prototyped the to-be flow in high fidelity: three ways to connect a source, and one shared path from there to the report.</p></div>
      <div class="flow" tabindex="0" aria-label="High-fidelity to-be flow, scroll sideways">{img(p, "b-flow", 3200, 718, "To-be flow for configuring an analysis, from source to report", zoom=True)}</div>
      <ol class="steps">
        <li><span class="steps__n">01</span><div><h3>Choose the source</h3><p>A video service, an RTSP link or an uploaded video file. Three branches that converge in the same form.</p></div></li>
        <li><span class="steps__n">02</span><div><h3>Name it and pick a model</h3><p>General aspects first: the detection model and a name the team will recognise later.</p></div></li>
        <li><span class="steps__n">03</span><div><h3>Schedule it</h3><p>Execution days as chips from Monday to Sunday, plus a start and end time.</p></div></li>
        <li><span class="steps__n">04</span><div><h3>Draw the geofence</h3><p>On a frame of the camera, the user outlines the area to analyze with the cursor and names it.</p></div></li>
        <li><span class="steps__n">05</span><div><h3>Confirm</h3><p>A dialog warns that the analysis can take hours, and says where to follow its progress and download the report.</p></div></li>
        <li><span class="steps__n">06</span><div><h3>Read the result</h3><p>The geofence over the frame, the detections in a table and one button to download.</p></div></li>
      </ol>
      <div class="pair">
        {fig("b-geocerca", 1200, 1233, "Nuevo análisis · Geocerca", "Geofence creation dialog over a parking lot camera frame", "<b>Step 04.</b> The geofence is drawn on the real camera frame, not described in coordinates.")}
        {fig("b-confirm", 1200, 1396, "Nuevo análisis · Confirmación", "Confirmation dialog before starting the analysis", "<b>Step 05.</b> The dialog sets expectations: it may take hours, and here is where to check.")}
      </div>
      {fig("b-resultado", 1200, 1021, "Resultado de análisis", "Analysis result with the geofence highlighted and a table of detections", "<b>Step 06.</b> The highlighted area shows exactly what the model watched.")}""", "flow")

body += chapter("Events and operations", f"""      <h2>Hundreds of pages, scannable at a glance.</h2>
      <div class="decision">
        <div class="decision__head">
          <h3>Events as cards with the frame</h3>
          <ul class="bullets">
            <li><b>The camera frame leads</b>, so people recognise the scene before they read the ID.</li>
            <li><b>Four filters</b> above the grid: event ID, date range, detection type and branch.</li>
            <li><b>Video state in colour</b>: a red bar when the video is not processed yet, a blue button when it can be watched.</li>
            <li><b>Pagination with jump-to-page</b>, because there can be 300 pages.</li>
          </ul>
        </div>
        {fig("b-eventos", 1200, 932, "Batech · Eventos detectados", "Grid of detected events with camera frames, filters and pagination")}
      </div>
      <div class="decision">
        <div class="decision__head">
          <h3>Analyses and operational times</h3>
          <div class="prose"><p>The analysis table puts status last and in colour (retry, error, active, configured) so problems stand out in a long list. The operational view compares <strong>real time against expected time</strong> for each analysis and turns it into a percentage.</p></div>
        </div>
        <div class="pair">
          {fig("b-analisis", 1200, 857, "Batech · Análisis", "Analysis table with coloured statuses")}
          {fig("b-operativos", 1200, 857, "Batech · Operativos", "Operational cards comparing real and expected time")}
        </div>
      </div>""", "events")

body += chapter("Batech AI", f"""      <h2>Ask the platform instead of building a report.</h2>
      <div class="prose"><p>An assistant opens in a side panel over any screen. It opens with suggested questions, such as the most visited branch, the most recurrent event or the conversion rate, and accepts text, attachments and voice.</p></div>
      {fig("b-ai", 1200, 857, "Batech AI · New chat", "AI assistant panel with suggested questions")}""", "ai")

body += chapter("Access and system", f"""      <h2>One dark system, from the login in.</h2>
      <div class="prose"><p>Sign-in works with a phone or an email, switched with a segmented control. Every screen is built from the same Figma library (sidebar, filters, cards, tables, dialogs and pagination) on a dark theme with the brand’s cyan as the accent.</p></div>
      {fig("b-login", 1200, 857, "Batech · Iniciar sesión", "Login with phone or email tabs")}""", "system")

body += chapter("Outcome", f"""      <h2>One place to set up, follow and share every analysis.</h2>
      <div class="numbers">
        <div><b>7</b><span>sections in the navigation</span></div>
        <div><b>3</b><span>video sources, one setup flow</span></div>
        <div><b>6</b><span>steps from camera to report</span></div>
        <div><b>10%</b><span>faster delivery from the design team</span></div>
      </div>
      <div class="prose"><p>Alongside the platform I revamped Batech’s web and mobile interfaces with analytics and A/B testing to simplify key flows and reduce abandonment, and kept the design system in Figma consistent across both.</p></div>
      <div class="btns"><a class="btn" href="{FIGMA}" target="_blank" rel="noopener">View in Figma {arrow()}</a></div>""", "outcome")

body += next_row("confidentally.html", "Confidentally")

page = (head("Batech AI Platform Case Study", "Design of Batech's AI video analytics platform for retail. Case study by Julián Gerardi.", p)
        + SPRITE + nav(p, on_home=False) + '\n<main class="shell" id="main">\n' + body + footer(p)
        + '  <div class="row shell-end" aria-hidden="true"></div>\n</main>\n' + tail(p, lightbox=True))
open(os.path.join(ROOT, "work", "batech.html"), "w").write(page)
print("batech ok", len(page))
