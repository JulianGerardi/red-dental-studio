from common import *
from scenes import words
import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")

p = ""

XP = [
    ("May 2025 — Now", "May 2025 — Hoy", "Lead UX/UI Designer", "Lead UX/UI Designer",
     "Confidential company · AI product, pre-launch · Miami, US", "Empresa confidencial · producto de IA, pre-lanzamiento · Miami, EE. UU.",
     "End-to-end design of an AI-assisted product, from information architecture and journeys to a functional web-app prototype built with Figma and Claude Code. I run user interviews and usability tests, and lead the pre-launch validation with the development team.",
     "Diseño de punta a punta de un producto asistido por IA, desde la arquitectura de información y los journeys hasta un prototipo web funcional hecho con Figma y Claude Code. Hago entrevistas con usuarios y tests de usabilidad, y lidero la validación previa al lanzamiento con el equipo de desarrollo."),
    ("Nov 2023 — Nov 2025", "Nov 2023 — Nov 2025", "Senior UX/UI Designer", "Senior UX/UI Designer",
     "Icarus Digital Marketing · Ireland · Remote", "Icarus Digital Marketing · Irlanda · Remoto",
     "Led a digital platform from idea to launch: research, usability testing, flows and a UI redesign focused on reducing abandonment. Managed the creative team; the refreshed identity drove a <b>20% rise in brand recognition</b>.",
     "Lideré una plataforma digital de la idea al lanzamiento: research, tests de usabilidad, flujos y un rediseño de UI enfocado en bajar el abandono. Dirigí al equipo creativo; la nueva identidad logró <b>un 20% más de reconocimiento de marca</b>."),
    ("Feb 2022 — May 2026", "Feb 2022 — May 2026", "Lead UX/UI Designer", "Lead UX/UI Designer",
     "Batech · Querétaro, MX · Remote", "Batech · Querétaro, MX · Remoto",
     "Designed Batech’s AI video analytics platform end to end and revamped web and mobile flows with analytics and A/B testing to cut abandonment. Built the Figma design system and led the design team to <b>10% faster delivery</b>.",
     "Diseñé de punta a punta la plataforma de análisis de video con IA de Batech y rediseñé los flujos web y mobile con analytics y A/B testing para bajar el abandono. Armé el design system en Figma y lideré al equipo de diseño a <b>entregas un 10% más rápidas</b>."),
    ("Aug 2019 — Oct 2023", "Ago 2019 — Oct 2023", "Digital Designer", "Diseñador digital",
     "Freelance &amp; contract · US, Mexico, Argentina", "Freelance y contrato · EE. UU., México, Argentina",
     "<b>Datachain Summit</b>: identity redesign (+25% recognition) and a delivery process 40% faster. <b>Blue CP Construction</b>: +40% engagement in 3 months. Also Azure Printed Homes, Gloob Marketing and Cuponstar.",
     "<b>Datachain Summit</b>: rediseño de identidad (+25% de reconocimiento) y un proceso de entrega 40% más rápido. <b>Blue CP Construction</b>: +40% de engagement en 3 meses. También Azure Printed Homes, Gloob Marketing y Cuponstar."),
    ("Jan 2019 — Mar 2022", "Ene 2019 — Mar 2022", "Co-founder &amp; CEO", "Cofundador y CEO",
     "Vieja Cubana · Mercedes, AR", "Vieja Cubana · Mercedes, AR",
     "Digital strategy behind online revenue; a creative team delivering <b>15% faster</b> with <b>+25% client referrals</b>.",
     "Estrategia digital detrás de las ventas online; un equipo creativo que entregó <b>un 15% más rápido</b> con <b>+25% de recomendaciones</b>."),
    ("Jul 2018 — Jul 2025", "Jul 2018 — Jul 2025", "Senior Digital Designer", "Senior Digital Designer",
     "Bahco Argentina · Buenos Aires · Remote", "Bahco Argentina · Buenos Aires · Remoto",
     "Graphic communication for <b>5 Latin American markets</b> and the brand refresh behind a <b>20% rise in recognition</b>.",
     "Comunicación gráfica para <b>5 mercados de Latinoamérica</b> y el refresh de marca que sumó <b>un 20% de reconocimiento</b>."),
    ("May 2016 — Oct 2016", "May 2016 — Oct 2016", "Trainee Graphic Designer", "Diseñador gráfico trainee",
     "Orsonia Interactive Ideas · Buenos Aires", "Orsonia Interactive Ideas · Buenos Aires",
     "Campaigns and content for Amdia, Adblick and Bisblick.", "Campañas y contenido para Amdia, Adblick y Bisblick."),
]
xp = "".join(f"""      <li class="xp__item" data-reveal>
        <span class="xp__when">{T(we, ws)}</span>
        <div><div class="xp__role">{T(re, rs)}</div><div class="xp__org">{T(oe, os_)}</div></div>
        <p class="xp__notes">{T(ne, ns)}</p>
      </li>
""" for we, ws, re, rs, oe, os_, ne, ns in XP)

STEPS = [
    ("Research", "Research", "User interviews, usability tests and analytics, plus an audit of screens, components and the rules nobody wrote down.",
     "Entrevistas con usuarios, tests de usabilidad y analytics, más una auditoría de pantallas, componentes y las reglas que nadie escribió."),
    ("Structure", "Estructura", "Information architecture, user flows and journeys. Navigation is agreed before any pixel.",
     "Arquitectura de información, flujos y journeys. La navegación se acuerda antes que cualquier pixel."),
    ("Design", "Diseño", "High-fidelity UI in Figma on a design system shared by web and mobile, reviewed with stakeholders as it grows.",
     "UI de alta fidelidad en Figma sobre un design system compartido por web y mobile, revisado con stakeholders a medida que crece."),
    ("Prototype", "Prototipo", "Working prototypes built with Claude Code, so stakeholders, the CEO and real users try the actual flow.",
     "Prototipos funcionales hechos con Claude Code, para que stakeholders, el CEO y usuarios reales prueben el flujo de verdad."),
    ("Validate &amp; ship", "Validar y lanzar", "Usability tests, A/B tests and KPIs, then a handoff with components that already live in code and in Storybook.",
     "Tests de usabilidad, A/B testing y KPIs, y un handoff con componentes que ya viven en código y en Storybook."),
]
steps = "".join(f"""      <li class="step" data-reveal style="--k:{i}"><span class="step__n">{i + 1:02d}</span><h3>{T(a, b)}</h3><p>{T(c, d)}</p></li>
""" for i, (a, b, c, d) in enumerate(STEPS))

tools = "".join(f'<span class="badge">{t}</span>' for t in ["Figma", "Claude", "Claude Code", "Storybook", "Gemini", "Midjourney", "Freepik Spaces", "Photoshop", "Illustrator", "InDesign"])

work = "".join([
    wl_item(p, 1, "work/batech.html", "Batech AI Platform", T("AI · Computer vision · Dashboard", "IA · Visión artificial · Dashboard"), "2022–26", tiles_batech(p),
            T("Computer-vision analytics for retail branches: camera events, geofences drawn on live video, operational times and an AI assistant for every store.",
              "Analítica con visión artificial para sucursales: eventos de cámaras, geocercas dibujadas sobre el video, tiempos operativos y un asistente de IA para cada tienda."),
            T("Lead UX/UI — research, flows, UI, design system", "Lead UX/UI — research, flujos, UI, design system")),
    wl_item(p, 2, "work/confidentally.html", "Confidentally", T("SaaS · Healthcare · Prototype", "SaaS · Salud · Prototipo"), "2026", tiles_dental(p),
            T("Redesign of a dental practice platform, from the front desk to the dental chair, rebuilt as a working prototype on mock data.",
              "Rediseño de una plataforma para clínicas dentales, de la recepción al sillón, reconstruida como prototipo funcional con datos de prueba."),
            T("Lead product designer — audit, UX, UI, coded prototype", "Lead product designer — auditoría, UX, UI, prototipo en código"), nda=True),
    wl_item(p, 3, "work/confidentally-ui.html", "Confidentally UI", T("Design system · AI builder", "Design system · Builder con IA"), "2026", tiles_ds(p),
            T("A living design system that reads the app’s own code, with a search that understands Spanish and a Builder that assembles screens with AI.",
              "Un design system vivo que lee el código de la app, con un buscador que entiende español y un Builder que arma pantallas con IA."),
            T("Design system lead — tokens, docs site, audit scripts, builder", "Design system lead — tokens, sitio de documentación, auditoría, builder")),
    wl_item(p, 4, "work/grill.html", "GRILL Empresas", T("Food service · Mobile · Two apps", "Gastronomía · Mobile · Dos apps"), "2026", tiles_grill(p),
            T("Corporate lunch ordering for a kitchen in Mercedes: employees pick the day’s meal on their phone, the kitchen runs tickets, labels and delivery.",
              "Pedidos de almuerzo para empresas de una cocina en Mercedes: los empleados eligen la vianda desde el celular y la cocina maneja comandas, etiquetas y reparto."),
            T("Product design — flows, UI, working prototype", "Diseño de producto — flujos, UI, prototipo funcional")),
    wl_item(p, 5, "work/mercado-play.html", "Mercado Play", T("Streaming · UX/UI challenge", "Streaming · Challenge UX/UI"), "2026", tiles_mp(p),
            T("A UX/UI challenge for Mercado Libre’s free streaming service: social recommendations that reward people with points when a friend watches what they shared.",
              "Un challenge UX/UI para el streaming gratuito de Mercado Libre: recomendaciones sociales que suman puntos cuando un amigo ve lo que compartiste."),
            T("Research, benchmarking, UX, UI, prototype", "Research, benchmarking, UX, UI, prototipo")),
])

INTRO = """<script>(function(){var d=document.documentElement;try{var r=document.referrer;if(r&&new URL(r).origin===location.origin&&r!==location.href)return;}catch(e){}if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('is-loading','intro');setTimeout(function(){d.classList.remove('is-loading');},7000);})();</script>
<script src="assets/hero.js" defer></script>
"""
LOADER = f"""<div class="loader" aria-hidden="true">
  <div class="loader__top"><span>Julián Gerardi</span><span>{T("Senior Product Designer", "Senior Product Designer")}</span><span>{T("Portfolio", "Portfolio")} ’26</span></div>
  <div class="loader__words"><span>{T("Research", "Research")}</span><span>{T("Systems", "Sistemas")}</span><span>{T("Interfaces", "Interfaces")}</span><span>{T("Prototypes", "Prototipos")}</span></div>
  <div class="loader__bottom"><span class="loader__count" data-loader-count>0</span><span class="loader__label">{T("Loading selected work", "Cargando trabajos")}</span></div>
  <div class="loader__bar"><i data-loader-bar></i></div>
</div>
"""

HOT = {
    "batech": ("work/batech.html", "t-b-ai", "Batech AI Platform", ("AI video analytics for retail", "Analítica de video con IA para retail"), "2022–26", "batech"),
    "dental": ("work/confidentally.html", "t-d-dashboard", "Confidentally", ("Dental platform, rebuilt as a working prototype", "Plataforma dental, reconstruida como prototipo funcional"), "2026 · NDA", "dental"),
    "ds": ("work/confidentally-ui.html", "t-ds-welcome", "Confidentally UI", ("A living design system with an AI Builder", "Un design system vivo con un Builder con IA"), "2026", "ds"),
    "grill": ("work/grill.html", "t-g-emp-app", "GRILL Empresas", ("Two connected apps, from order to delivery", "Dos apps conectadas, del pedido al reparto"), "2026", "grill"),
    "mp": ("work/mercado-play.html", "t-mp-home", "Mercado Play", ("Social recommendations for streaming", "Recomendaciones sociales para streaming"), "2026", "mp"),
}


def hot(key, text):
    return f'<a class="hot" href="{HOT[key][0]}" data-hot="{key}">{text}</a>'


HOT_CARDS = "".join(f"""<div class="hot-card hot-card--{b}" data-card="{k}">{brand_scene(p, k, T)}<span class="hot-card__meta"><b>{name}</b><span>{T(*sub)}</span><em>{yr}</em></span></div>""" for k, (href, im, name, sub, yr, b) in HOT.items())

FLAGS = {
    "us": '<svg viewBox="0 0 21 14" aria-hidden="true"><rect width="21" height="14" fill="#fff"/>' + "".join(f'<rect y="{i * 14 / 13:.2f}" width="21" height="{14 / 13:.2f}" fill="#b22234"/>' for i in range(0, 13, 2)) + '<rect width="9.4" height="7.54" fill="#3c3b6e"/></svg>',
    "mx": '<svg viewBox="0 0 21 14" aria-hidden="true"><rect width="7" height="14" fill="#006847"/><rect x="7" width="7" height="14" fill="#fff"/><rect x="14" width="7" height="14" fill="#ce1126"/><circle cx="10.5" cy="7" r="1.9" fill="#8c6a2f"/></svg>',
    "ie": '<svg viewBox="0 0 21 14" aria-hidden="true"><rect width="7" height="14" fill="#169b62"/><rect x="7" width="7" height="14" fill="#fff"/><rect x="14" width="7" height="14" fill="#ff883e"/></svg>',
    "ar": '<svg viewBox="0 0 21 14" aria-hidden="true"><rect width="21" height="14" fill="#74acdf"/><rect y="4.67" width="21" height="4.67" fill="#fff"/><circle cx="10.5" cy="7" r="1.6" fill="#f6b40e"/></svg>',
}
flags = "".join(f'<span class="flag">{FLAGS[k]}{T(en, es)}</span>' for k, en, es in [("us", "United States", "Estados Unidos"), ("mx", "Mexico", "México"), ("ie", "Ireland", "Irlanda"), ("ar", "Argentina", "Argentina")])
practice = "".join(f'<span class="badge">{T(en, es)}</span>' for en, es in [("Brand identity", "Identidad de marca"), ("Visual systems", "Sistemas visuales"), ("Art direction", "Dirección de arte"), ("Product design", "Diseño de producto")])

cv_attrs = f'href="{CV}" download="Julian_Gerardi_CV.pdf" target="_blank" rel="noopener" data-cv'

page = head("Julián Gerardi · Senior Product Designer", "Julián Gerardi · Senior Product Designer",
            "Julián Gerardi, Senior Product Designer. SaaS products designed end to end, from research to design systems and working prototypes built with AI.",
            "Julián Gerardi, Senior Product Designer. Productos SaaS diseñados de punta a punta, del research al design system y prototipos funcionales hechos con IA.",
            p, extra_scripts=INTRO) + SPRITE + LOADER + nav(p) + f"""
<main id="main">
  <section class="hero">
    <div class="hero-card" data-hero>
      <div class="hero-card__mesh" aria-hidden="true"><i class="m1"></i><i class="m2"></i><i class="m3"></i><i class="m4"></i><i class="m5"></i><i class="m-spot"></i></div>
      <div class="hero-card__body">
        <p class="hero-card__hi rise" style="--d:.15s">{T("Hey, I’m Julián", "Hey, soy Julián")}</p>
        <h1 class="hero-card__title split">{T(f"Fewer standalone screens. More {hot('grill', 'end-to-end products')}, living {hot('ds', 'design systems')} and {hot('batech', 'AI')} {hot('dental', 'prototypes')} {hot('mp', 'people actually use')}.",
                                              f"Menos pantallas sueltas. Más {hot('grill', 'productos de punta a punta')}, {hot('ds', 'design systems')} vivos y {hot('dental', 'prototipos')} con {hot('batech', 'IA')} {hot('mp', 'que la gente usa')}.")}</h1>
      </div>
      <div class="hot-cards" aria-hidden="true">{HOT_CARDS}</div>
      <div class="hero-card__foot">
        <p class="rise" style="--d:.9s"><b>Senior Product Designer</b><span>{T("Lead UX/UI · AI-assisted product design", "Lead UX/UI · Diseño de producto asistido por IA")}</span></p>
        <p class="hero-card__right rise" style="--d:1s"><b>{T("Open to new projects", "Abierto a nuevos proyectos")}</b><span>{T("Designing from Mercedes, Buenos Aires", "Diseñando desde Mercedes, Buenos Aires")}</span></p>
      </div>
    </div>
  </section>

  <section class="wrap statement" aria-label="Brand and visual systems">
    <div class="label" data-reveal>{T("Brand &amp; visual systems", "Marca y sistemas visuales")}</div>
    {words("I design brand and visual systems that hold up in every format they have to live in. I learned it in advertising agencies in Argentina, building identities from scratch, and today I bring it to digital products.",
           "Diseño sistemas de marca y visuales que se sostienen en cada formato en el que tienen que vivir. Lo aprendí en agencias de publicidad de Argentina, armando identidades desde cero, y hoy lo llevo a productos digitales.", "statement__text")}
    <div class="statement__facts">
      <div class="fact" data-reveal style="--k:0"><b data-count="8" data-suffix="+">8+</b><span>{T("years designing brands, visual systems and products", "años diseñando marcas, sistemas visuales y productos")}</span></div>
      <div class="fact" data-reveal style="--k:1"><b data-count="4">4</b><span>{T("countries I’ve worked for, remote", "países para los que trabajé, en remoto")}</span><div class="flags">{flags}</div></div>
      <div class="fact" data-reveal style="--k:2"><span class="mono muted">{T("PRACTICE", "PRÁCTICA")}</span><div class="fact__tags">{practice}</div></div>
    </div>
  </section>

  <section class="work" id="work">
    <div class="wrap wl-top" data-reveal><b>{T("Selected work", "Trabajos seleccionados")}</b><span>{T("Five projects · 2022–2026", "Cinco proyectos · 2022–2026")}</span></div>
    <ol class="wl-list">
{work}    </ol>
  </section>

  <section class="wrap section" id="process">
    <div class="section-head">
      <div class="label" data-reveal>{T("Process", "Proceso")}</div>
      <h2 class="lines">{T("How a project moves from question to shipped product.", "Cómo un proyecto pasa de una pregunta a un producto lanzado.")}</h2>
      <p data-reveal>{T("The stages stay the same from project to project. What changes is how long each one takes.", "Las etapas son las mismas en cada proyecto. Lo que cambia es cuánto dura cada una.")}</p>
    </div>
    <ol class="steps-grid">
{steps}    </ol>
    <div class="tools" data-reveal><span class="mono muted">{T("TOOLKIT", "HERRAMIENTAS")}</span>{tools}</div>
  </section>

  <section class="wrap section" id="experience">
    <div class="section-head">
      <div class="label" data-reveal>{T("Experience", "Experiencia")}</div>
      <h2 class="lines">{T("Ten years between product, brand and teams.", "Diez años entre producto, marca y equipos.")}</h2>
      <p data-reveal>{T("2016 to today, remote for teams in four countries.", "De 2016 a hoy, en remoto para equipos de cuatro países.")}</p>
    </div>
    <ol class="xp">
{xp}    </ol>
  </section>

  <section class="wrap section about" id="about">
    <div class="about__bio">
      <div class="label" data-reveal>{T("About", "Sobre mí")}</div>
      <p class="about__lead lines">{T("I trained as an art director, so I care how a product looks. Years of SaaS work taught me to care more about how it behaves on a busy Tuesday.",
                                   "Me formé como director de arte, así que me importa cómo se ve un producto. Años de SaaS me enseñaron que importa más cómo se comporta un martes cualquiera.")}</p>
      <p data-reveal>{T("I lead product design from research and information architecture to design systems, high-fidelity UI and interactive prototypes, and I measure the result with analytics and A/B testing.",
                       "Lidero el diseño de producto desde el research y la arquitectura de información hasta el design system, la UI de alta fidelidad y los prototipos interactivos, y mido el resultado con analytics y A/B testing.")}</p>
      <p data-reveal>{T("I work side by side with developers from the first sketch, present the work to stakeholders and CEOs, and run user interviews and usability tests so decisions rest on what people actually do.",
                       "Trabajo codo a codo con los devs desde el primer boceto, presento el trabajo a stakeholders y CEOs, y hago entrevistas y tests de usabilidad para que las decisiones se apoyen en lo que la gente hace de verdad.")}</p>
      <p data-reveal>{T("My workflow runs through AI: Claude Code turns designs into working prototypes and takes a Figma design system into code, documented in Storybook for the developers. Midjourney and Freepik Spaces help me explore visual directions.",
                       "Mi flujo de trabajo pasa por la IA: con Claude Code convierto diseños en prototipos funcionales y llevo un design system de Figma al código, documentado en Storybook para los devs. Midjourney y Freepik Spaces me ayudan a explorar direcciones visuales.")}</p>
      <div class="btns" data-reveal><a class="btn" {cv_attrs}>{arrow("i-down")}{T("Download CV", "Descargar CV")}</a></div>
    </div>
    <div class="about__lists">
      <div class="list" data-reveal><h3>{T("Education", "Formación")}</h3><ul>
        <li><span>{T("Bachelor’s in Advertising Art Direction", "Licenciatura en Dirección de Arte Publicitario")}, Universidad de Palermo</span><em>2011–16</em></li>
        <li><span>{T("Advertising Creative Technician", "Técnico en Creatividad Publicitaria")}, Universidad de Palermo</span><em>2011–14</em></li>
        <li><span>{T("UX/UI Design Program", "Carrera de Diseño UX/UI")}, Coderhouse</span><em>2019</em></li>
      </ul></div>
      <div class="list" data-reveal><h3>{T("Awards &amp; talks", "Premios y charlas")}</h3><ul>
        <li><span>{T("Speaker, XII Latin American Design Meeting", "Orador, XII Encuentro Latinoamericano de Diseño")}</span><em>{T("Talk", "Charla")}</em></li>
        <li><span>{T("Creativity Award, Imágenes Creativas", "Premio a la Creatividad, Imágenes Creativas")}</span><em>{T("Award", "Premio")}</em></li>
        <li><span>{T("Award, Universidad de Palermo", "Premio, Universidad de Palermo")}</span><em>{T("Award", "Premio")}</em></li>
        <li><span>“Mundos digitales”, Jueves de Networking DC</span><em>{T("Interview", "Entrevista")}</em></li>
      </ul></div>
      <div class="list" data-reveal><h3>{T("Languages", "Idiomas")}</h3><ul>
        <li><span>{T("Spanish", "Español")}</span><em>{T("Native", "Nativo")}</em></li>
        <li><span>{T("English", "Inglés")}</span><em>{T("Full professional", "Profesional completo")}</em></li>
        <li><span>{T("Italian", "Italiano")}</span><em>{T("Professional working", "Profesional")}</em></li>
      </ul></div>
    </div>
  </section>

  <section class="contact" id="contact">
    <div class="contact__glow" aria-hidden="true"></div>
    <div class="wrap contact__inner">
      <div class="label" data-reveal>{T("Contact", "Contacto")}</div>
      <h2 class="lines">{T("Let’s build something people want to use.", "Construyamos algo que la gente quiera usar.")}</h2>
      <p data-reveal>{T("Open to senior and lead product design roles, remote, and to freelance projects.", "Disponible para roles senior y lead de diseño de producto, en remoto, y para proyectos freelance.")}</p>
      <span class="copy" data-reveal><span data-copy-text>{EMAIL}</span><button type="button" data-copy="{EMAIL}">{T("Copy", "Copiar")}</button></span>
      <div class="btns" data-reveal>
        <a class="btn" href="{LINKEDIN}" target="_blank" rel="noopener">LinkedIn {arrow()}</a>
        <a class="btn btn--ghost" href="{BEHANCE}" target="_blank" rel="noopener">Behance {arrow()}</a>
        <a class="btn btn--ghost" {cv_attrs}>{T("Download CV", "Descargar CV")}</a>
      </div>
    </div>
  </section>
</main>
""" + footer(p) + tail(p)

open(os.path.join(ROOT, "index.html"), "w").write(page)
print("index ok", len(page))
