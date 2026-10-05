"""Experience, as in the CV: every role opens to show what was done there."""


def T(en, es):
    return f'<span lang="en">{en}</span><span lang="es">{es}</span>'


# when, role, company, place · modality, one-line summary, bullets, highlights
XP = [
    dict(when=("May 2025 — Now", "May 2025 — Hoy"), role=("Lead UX/UI Designer", "Lead UX/UI Designer"),
         org=("Confidential company · AI product, pre-launch", "Empresa confidencial · producto de IA, pre-lanzamiento"),
         where=("Miami, FL, United States · Remote · Full-time", "Miami, FL, EE. UU. · Remoto · Full-time"),
         sum=("End-to-end design of an AI-assisted product, from the first flows to a working web-app prototype.",
              "Diseño de punta a punta de un producto asistido por IA, de los primeros flujos a un prototipo web funcional."),
         items=[("Lead the <b>end-to-end design of an AI-assisted digital product</b>, from initial concept and user flows to a functional web-app prototype.",
                 "Lidero el <b>diseño de punta a punta de un producto digital asistido por IA</b>, desde el concepto y los flujos hasta un prototipo web funcional."),
                ("Define the information architecture, navigation, user journeys and interaction patterns of the product.",
                 "Defino la arquitectura de información, la navegación, los journeys y los patrones de interacción del producto."),
                ("Design interfaces and explore product solutions with <b>Figma and Claude</b>, accelerating the creation and iteration of the application.",
                 "Diseño interfaces y exploro soluciones con <b>Figma y Claude</b>, lo que acelera la creación y la iteración de la aplicación."),
                ("Plan and run <b>user research and usability testing</b> to validate design decisions and improve the product experience.",
                 "Planifico y hago <b>research con usuarios y tests de usabilidad</b> para validar decisiones y mejorar la experiencia."),
                ("Partner with the development team to assess technical feasibility and prepare the product for implementation; currently leading the pre-launch design and validation stage.",
                 "Trabajo con el equipo de desarrollo para evaluar la factibilidad técnica y preparar el producto para implementarlo; hoy lidero la etapa de diseño y validación previa al lanzamiento.")],
         chips=[("Figma + Claude", "Figma + Claude"), ("Usability testing", "Tests de usabilidad"), ("Dev handoff", "Handoff a desarrollo")]),
    dict(when=("Feb 2022 — May 2026", "Feb 2022 — May 2026"), role=("Lead UX/UI Designer", "Lead UX/UI Designer"),
         org=("Batech", "Batech"), where=("Querétaro, Mexico · Remote · Part-time", "Querétaro, México · Remoto · Part-time"),
         sum=("Led an AI video-analytics platform from the idea to launch, and the design team behind it.",
              "Lideré una plataforma de análisis de video con IA de la idea al lanzamiento, y al equipo de diseño detrás."),
         items=[("Led the <b>end-to-end design of a digital platform</b>, from the initial idea to launch.",
                 "Lideré el <b>diseño de punta a punta de una plataforma digital</b>, de la idea al lanzamiento."),
                ("Defined the user experience through user research and testing, structured flows and navigation, and designed modern, functional interfaces.",
                 "Definí la experiencia con research y testing con usuarios, estructuré flujos y navegación, y diseñé interfaces modernas y funcionales."),
                ("Revamped the web and mobile interface, using analytics and A/B testing to simplify key flows and <b>reduce user abandonment</b>.",
                 "Rediseñé la interfaz web y mobile con analytics y A/B testing para simplificar flujos clave y <b>bajar el abandono</b>."),
                ("Built and maintained a <b>design system and component library in Figma</b>, keeping the UI consistent across web and mobile.",
                 "Armé y mantuve un <b>design system y una librería de componentes en Figma</b>, para que la UI sea consistente en web y mobile."),
                ("Led the design team, achieving <b>10% faster project delivery</b>.", "Lideré al equipo de diseño y logramos <b>entregas un 10% más rápidas</b>."),
                ("Produced content that drove a <b>25% rise in social media engagement</b> and a <b>20% increase in online visibility</b>, expanding the audience.",
                 "Produje contenido que logró <b>un 25% más de engagement en redes</b> y <b>un 20% más de visibilidad online</b>, ampliando la audiencia."),
                ("Designed client presentations that were consistently praised by clients.", "Diseñé presentaciones para clientes que fueron elogiadas una y otra vez.")],
         chips=[("10% faster delivery", "10% más rápido"), ("+25% engagement", "+25% engagement"), ("Design system", "Design system")]),
    dict(when=("Nov 2023 — Nov 2025", "Nov 2023 — Nov 2025"), role=("Senior UX/UI Designer", "Senior UX/UI Designer"),
         org=("Icarus Digital Marketing", "Icarus Digital Marketing"), where=("Ireland · Remote", "Irlanda · Remoto"),
         sum=("A digital platform from idea to launch, and a refreshed brand that raised recognition 20%.",
              "Una plataforma digital de la idea al lanzamiento, y una marca renovada que sumó un 20% de reconocimiento."),
         items=[("Led the end-to-end UX/UI design of a digital platform from idea to launch, including research, usability testing, user flows, navigation and a UI redesign focused on reducing abandonment.",
                 "Lideré el diseño UX/UI de punta a punta de una plataforma digital, de la idea al lanzamiento: research, tests de usabilidad, flujos, navegación y un rediseño de UI enfocado en bajar el abandono."),
                ("Managed the creative team and graphic communication, reviewing deliverables and keeping branding and messaging consistent.",
                 "Dirigí al equipo creativo y la comunicación gráfica, revisando entregables y cuidando la consistencia de marca y mensaje."),
                ("Developed a refreshed brand identity that led to a <b>20% rise in brand recognition</b>.", "Desarrollé una identidad renovada que logró <b>un 20% más de reconocimiento de marca</b>.")],
         chips=[("+20% brand recognition", "+20% reconocimiento"), ("Team lead", "Liderazgo de equipo")]),
    dict(when=("Jul 2018 — Jul 2025", "Jul 2018 — Jul 2025"), role=("Senior Digital Designer", "Senior Digital Designer"),
         org=("Bahco Argentina", "Bahco Argentina"), where=("Buenos Aires, Argentina · Remote", "Buenos Aires, Argentina · Remoto"),
         sum=("Graphic communication for five Latin American markets and the brand refresh behind a 20% rise in recognition.",
              "Comunicación gráfica para cinco mercados de Latinoamérica y el refresh de marca que sumó un 20% de reconocimiento."),
         items=[("Owned graphic communication for <b>Latin America across 5 markets</b> (Argentina, Chile, Peru, Paraguay, Colombia), keeping branding and messaging consistent.",
                 "Llevé la comunicación gráfica de <b>Latinoamérica en 5 mercados</b> (Argentina, Chile, Perú, Paraguay, Colombia), cuidando la consistencia de marca y mensaje."),
                ("Led a brand identity refresh that drove a <b>20% rise in brand recognition</b>.", "Lideré un refresh de identidad que logró <b>un 20% más de reconocimiento de marca</b>."),
                ("Created visual content for social media and print campaigns.", "Creé contenido visual para redes y campañas impresas.")],
         chips=[("5 markets", "5 mercados"), ("+20% brand recognition", "+20% reconocimiento")]),
    dict(when=("Jan 2019 — Mar 2022", "Ene 2019 — Mar 2022"), role=("Co-Founder &amp; CEO", "Cofundador y CEO"),
         org=("Vieja Cubana", "Vieja Cubana"), where=("Mercedes, Buenos Aires, Argentina", "Mercedes, Buenos Aires, Argentina"),
         sum=("Ran the studio: digital strategy, a creative team and the processes behind it.",
              "Dirigí el estudio: estrategia digital, un equipo creativo y los procesos detrás."),
         items=[("Built digital strategies that increased online revenue.", "Armé estrategias digitales que aumentaron las ventas online."),
                ("Led the creative team to deliver projects <b>15% faster</b>, driving a <b>25% rise in client referrals</b>.",
                 "Lideré al equipo creativo para entregar <b>un 15% más rápido</b>, con <b>un 25% más de recomendaciones de clientes</b>."),
                ("Revamped planning and client scheduling processes to shorten project completion times.",
                 "Rediseñé la planificación y la agenda de clientes para acortar los tiempos de cada proyecto.")],
         chips=[("15% faster", "15% más rápido"), ("+25% referrals", "+25% recomendaciones")]),
    dict(when=("Aug 2019 — Oct 2023", "Ago 2019 — Oct 2023"), role=("Digital Designer", "Diseñador digital"),
         org=("Freelance &amp; contract clients", "Clientes freelance y por contrato"), where=("United States, Mexico, Argentina · Remote", "EE. UU., México, Argentina · Remoto"),
         sum=("Brand identities, social content and decks for clients in three countries.",
              "Identidades, contenido para redes y presentaciones para clientes de tres países."),
         items=[("<b>Datachain Summit</b> (Querétaro, MX · Feb 2022 – Aug 2023): redesigned the brand identity (<b>+25% brand recognition</b>) and streamlined image delivery for print and digital, <b>cutting turnaround time by 40%</b>.",
                 "<b>Datachain Summit</b> (Querétaro, MX · Feb 2022 – Ago 2023): rediseñé la identidad (<b>+25% de reconocimiento</b>) y ordené la entrega de imágenes para impresión y digital, <b>con un 40% menos de tiempo</b>."),
                ("<b>Blue CP Construction</b> (Florida, US · Sep 2020 – May 2023): led community management and social content, <b>increasing engagement by 40% within 3 months</b> and posting frequency by 20%.",
                 "<b>Blue CP Construction</b> (Florida, EE. UU. · Sep 2020 – May 2023): community management y contenido para redes, <b>con un 40% más de engagement en 3 meses</b> y un 20% más de frecuencia de publicación."),
                ("<b>Azure Printed Homes</b> (California, US · Aug – Oct 2023): brand identity refresh and graphic communication.",
                 "<b>Azure Printed Homes</b> (California, EE. UU. · Ago – Oct 2023): refresh de identidad y comunicación gráfica."),
                ("<b>Gloob Marketing</b> (New York, US · Aug 2019 – Apr 2021): social media graphics and decks for international brands.",
                 "<b>Gloob Marketing</b> (Nueva York, EE. UU. · Ago 2019 – Abr 2021): piezas para redes y presentaciones para marcas internacionales."),
                ("<b>Cuponstar</b> (Buenos Aires, AR · Mar 2019 – Mar 2020): logo design, presentations and web assets.",
                 "<b>Cuponstar</b> (Buenos Aires, AR · Mar 2019 – Mar 2020): diseño de logo, presentaciones y piezas web.")],
         chips=[("5 clients", "5 clientes"), ("+40% engagement", "+40% engagement"), ("−40% turnaround", "−40% de tiempo de entrega")]),
    dict(when=("May 2016 — Oct 2016", "May 2016 — Oct 2016"), role=("Trainee Graphic Designer", "Diseñador gráfico trainee"),
         org=("Orsonia Interactive Ideas", "Orsonia Interactive Ideas"), where=("Buenos Aires, Argentina · Hybrid", "Buenos Aires, Argentina · Híbrido"),
         sum=("Where it started: campaigns and content for brands.", "Donde empezó todo: campañas y contenido para marcas."),
         items=[("Created campaigns, images and content for brands such as Amdia, Adblick and Bisblick.",
                 "Creé campañas, imágenes y contenido para marcas como Amdia, Adblick y Bisblick.")],
         chips=[]),
]


def experience_list():
    out = []
    for i, x in enumerate(XP):
        items = "".join(f"<li>{T(e, s)}</li>" for e, s in x["items"])
        chips = "".join(f'<span class="badge">{T(e, s)}</span>' for e, s in x["chips"])
        chips = f'<div class="xp__chips">{chips}</div>' if chips else ""
        o = " is-open" if i == 0 else ""
        exp = "true" if i == 0 else "false"
        out.append(f"""      <li class="xp__item{o}" data-reveal>
        <button class="xp__head" type="button" aria-expanded="{exp}" aria-controls="xp-{i}">
          <span class="xp__when">{T(*x["when"])}</span>
          <span class="xp__who"><span class="xp__role">{T(*x["role"])}</span><span class="xp__org">{T(*x["org"])}</span></span>
          <span class="xp__notes">{T(*x["sum"])}</span>
          <span class="xp__toggle" aria-hidden="true"><i></i><i></i></span>
        </button>
        <div class="xp__body" id="xp-{i}"><div class="xp__clip"><div class="xp__inner">
          <p class="xp__where">{T(*x["where"])}</p>
          <ul class="xp__list">{items}</ul>{chips}
        </div></div></div>
      </li>
""")
    return "".join(out)
