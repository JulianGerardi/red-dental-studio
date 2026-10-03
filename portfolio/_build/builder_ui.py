"""Confidentally UI, rebuilt in HTML for the scroll scenes:

pipeline()  Figma → Claude Code → React → Storybook → developers, app and the AI Builder
builder()   the Builder's Describe panel: the prompt types itself, the AI picks pieces
            from the catalog and the Patients screen assembles on the canvas.

Copy inside the product UI stays as it is in the real app (Spanish panel, English app);
sizes and colours follow the app's tokens (primary #1d56bc, zinc greys).
"""


def T(en, es):
    return f'<span lang="en">{en}</span><span lang="es">{es}</span>'


def ic(d, extra=""):
    return f'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"{extra}>{d}</svg>'


I = {
    "home": ic('<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/>'),
    "users": ic('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'),
    "cal": ic('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>'),
    "card": ic('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>'),
    "msg": ic('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>'),
    "phone": ic('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>'),
    "files": ic('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/>'),
    "chart": ic('<path d="M21.2 15.9A10 10 0 1 1 8 2.8"/><path d="M22 12A10 10 0 0 0 12 2v10Z"/>'),
    "help": ic('<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>'),
    "search": ic('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
    "bell": ic('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"/>'),
    "pin": ic('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
    "down": ic('<path d="m6 9 6 6 6-6"/>'),
    "panel": ic('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>'),
    "copy": ic('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
    "link": ic('<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>'),
    "dl": ic('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>'),
    "spark": ic('<path d="M9.9 15.5A2 2 0 0 0 8.5 14.1l-6.1-1.6a.5.5 0 0 1 0-1l6.1-1.6a2 2 0 0 0 1.4-1.4l1.6-6.1a.5.5 0 0 1 1 0l1.6 6.1a2 2 0 0 0 1.4 1.4l6.1 1.6a.5.5 0 0 1 0 1l-6.1 1.6a2 2 0 0 0-1.4 1.4l-1.6 6.1a.5.5 0 0 1-1 0Z"/>'),
    "check": ic('<path d="M20 6 9 17l-5-5"/>'),
    "right": ic('<path d="M5 12h14M12 5l7 7-7 7"/>'),
    "clock": ic('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    "grid": ic('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>'),
    "logo": ic('<path d="M7 3h10a2 2 0 0 1 2 2v3H5V5a2 2 0 0 1 2-2ZM5 8h14v9a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z"/><path d="M9 13h6"/>'),
    "layers": ic('<path d="m12 2 10 5-10 5L2 7Z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>'),
    "comp": ic('<path d="M5.5 8.5 9 12l-3.5 3.5L2 12ZM12 2l3.5 3.5L12 9 8.5 5.5ZM18.5 8.5 22 12l-3.5 3.5L15 12ZM12 15l3.5 3.5L12 22l-3.5-3.5Z"/>'),
    "code": ic('<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>'),
    "sliders": ic('<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>'),
    "box": ic('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>'),
    "type": ic('<path d="M4 7V4h16v3M9 20h6M12 4v16"/>'),
}


# ---------------- Figma → Claude Code → Storybook ----------------
def _node(cls, x, y, w, h, on, icon, title, sub, small=False):
    sm = " pd__n--sm" if small else ""
    sub_html = f"<span>{sub}</span>" if sub else ""
    if small:
        inner = f'<span class="ic">{icon}</span><span><b>{title}</b>{sub_html}</span>'
    else:
        inner = f'<span class="ic">{icon}</span><b>{title}</b>{sub_html}'
    return f'<div class="pd__n pd__n--{cls}{sm}" data-on="{on}" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px">{inner}</div>'


def pipeline(title_en, title_es):
    nodes = "".join([
        f'<div class="pd__group" style="left:40px;top:196px;width:262px;height:348px"><em>{T("Figma file", "Archivo de Figma")}</em></div>',
        _node("tok", 56, 248, 230, 76, 0, I["sliders"], "Variables", T("Colour, type, radius", "Color, tipografía, radios"), True),
        _node("cmp", 56, 336, 230, 76, 0, I["comp"], "Components", T("Buttons, fields, cards", "Botones, campos, tarjetas"), True),
        _node("sty", 56, 424, 230, 76, 0, I["type"], "Styles", T("Text and effects", "Textos y efectos"), True),
        _node("figma", 346, 316, 130, 108, 0.5, "<i></i>", "Figma", T("design source", "fuente de diseño")),
        _node("claude", 548, 262, 216, 216, 1, "", "Claude Code", T("reads the design<br>and the codebase", "lee el diseño<br>y el código")),
        f'<span class="pd__pill pd__pill--hl" data-on="1" style="left:594px;top:206px">human-in-the-loop</span>',
        _node("code", 848, 306, 176, 128, 2, "&lt;/&gt;", "React + Tailwind", T("139 components,<br>same names as Figma", "139 componentes,<br>mismos nombres que Figma")),
        _node("sb", 1066, 306, 176, 128, 3, "S", "Storybook", T("Confidentally UI ·<br>481 live examples", "Confidentally UI ·<br>481 ejemplos en vivo")),
        _node("dev", 1276, 182, 140, 96, 4, I["users"], T("Developers", "Devs"), T("take each piece", "toman cada pieza")),
        _node("app", 1276, 322, 140, 96, 4, I["box"], "App", T("32 screens", "32 pantallas")),
        _node("ai", 1276, 462, 140, 96, 4.2, I["spark"], T("AI Builder", "Builder IA"), T("new screens", "pantallas nuevas")),
        f'<span class="pd__pill" data-on="4.4" style="left:1062px;top:622px">{T("Audit in CI flags drift", "La auditoría en CI avisa desvíos")}</span>',
    ])
    paths = [("M302 370H346", 0.2, ""), ("M476 370H548", 0.75, ""), ("M764 370H848", 1.55, ""), ("M1024 370H1066", 2.55, ""),
             ("M1242 370H1258V230H1276", 3.45, ""), ("M1242 370H1276", 3.45, ""), ("M1242 370H1258V510H1276", 3.65, ""),
             ("M1346 558V638H1154V434", 4.3, " loop")]
    wires = "".join(f'<path class="b" d="{d}"/>' for d, _, _ in paths) + "".join(
        f'<path class="f{c}" d="{d}" pathLength="1" data-wire="{w}" style="stroke-dashoffset:0"/>' for d, w, c in paths)
    caps = [("It starts in Figma.", "Arranca en Figma.",
             "Tokens, components and styles are designed and named in the Figma file: one source for the whole product.",
             "Tokens, componentes y estilos se diseñan y se nombran en el archivo de Figma: una sola fuente para todo el producto."),
            ("Claude Code reads the design and the code.", "Claude Code lee el diseño y el código.",
             "It compares the Figma file with the app’s components and proposes each piece. I review every decision: human in the loop.",
             "Compara el archivo de Figma con los componentes de la app y propone cada pieza. Yo reviso cada decisión: human in the loop."),
            ("Components, written in React.", "Componentes, escritos en React.",
             "139 pieces in React and Tailwind, with the same names, variants and states as in Figma.",
             "139 piezas en React y Tailwind, con los mismos nombres, variantes y estados que en Figma."),
            ("Storybook documents each one.", "Storybook documenta cada una.",
             "Confidentally UI: live examples, guidelines and an audit that flags when the code drifts from the system.",
             "Confidentally UI: ejemplos en vivo, guías y una auditoría que avisa cuando el código se aparta del sistema."),
            ("Developers take them from there.", "Los devs los toman de ahí.",
             "The app imports the same components, and the AI Builder assembles new screens from the catalog.",
             "La app importa los mismos componentes, y el Builder con IA arma pantallas nuevas desde el catálogo.")]
    cap = "".join(f'<div class="pipe__cap{" is-on" if i == 0 else ""}"><b>{T(a, b)}</b><span>{T(c, d)}</span></div>' for i, (a, b, c, d) in enumerate(caps))
    return (f'  <section class="scene scene--pin pipe" data-scene="pipe" style="--len:430vh">\n    <div class="scene__pin">'
            f'<div class="scene__copy"><h2 class="scene__h">{T(title_en, title_es)}</h2></div>'
            f'<div class="pipe__screen"><div class="mon"><div class="mon__screen fitbox" data-fit="1440x760" data-fit-keep><div class="fit"><div class="pd">'
            f'<svg class="pd__wires" viewBox="0 0 1440 760" aria-hidden="true">{wires}</svg>{nodes}</div></div></div></div></div>'
            f'<div class="pipe__caps" aria-live="polite">{cap}</div></div>\n  </section>\n')


# ---------------- the Builder ----------------
PROMPT = "Una pantalla de pacientes con métricas, la tabla de pacientes y a la derecha los turnos del día"
STEPS = ["Leyendo lo que pediste", "Buscando entre 379 piezas y 33 bloques de la app", "“métricas” → Stats",
         "“la tabla de pacientes” → Table · pacientes", "“los turnos del día” → Appointments", "Armando la pantalla"]
CODE = [
    ('<span class="k">import</span> { AppointmentCard } <span class="k">from</span> <span class="s">\'@/components/dashboard/AppointmentCard\'</span>'),
    ('<span class="k">import</span> { StatStrip } <span class="k">from</span> <span class="s">\'@/components/dashboard/StatStrip\'</span>'),
    ('<span class="k">import</span> { PatientsTable } <span class="k">from</span> <span class="s">\'@/components/patients/PatientsTable\'</span>'),
    ('<span class="k">import</span> { CONTENEDOR_PAGINA } <span class="k">from</span> <span class="s">\'@/lib/estilos\'</span>'),
    (''),
    ('<span class="k">export function</span> <span class="c">PatientsScreen</span>() {'),
    ('  <span class="k">return</span> ('),
    ('    &lt;div className={cn(CONTENEDOR_PAGINA, <span class="s">\'flex flex-col gap-6\'</span>)}&gt;'),
    ('      &lt;<span class="c">StatStrip</span> stats={stats} /&gt;'),
    ('      &lt;div className=<span class="s">"grid grid-cols-[1fr_280px] gap-4"</span>&gt;'),
    ('        &lt;<span class="c">PatientsTable</span> rows={pacientes} /&gt;'),
    ('        {turnos.map((t) =&gt; &lt;<span class="c">AppointmentCard</span> appt={t} compact /&gt;)}'),
    ('      &lt;/div&gt;'),
    ('    &lt;/div&gt;'),
    ('  )'),
    ('}'),
]


def builder():
    side = "".join(f"<i>{I[k]}</i>" for k in ["home", "users", "cal", "card", "msg", "phone", "files", "chart", "help"])
    stats = "".join(f'<div class="bu__stat"><div>{t}{I[icn]}</div><b>{v}</b><small>{n}</small></div>' for t, icn, v, n in [
        ("Patients today", "users", "24", "+12% from last week"), ("Revenue", "card", "$8,420", "+4.2% from last week"), ("No shows", "cal", "2", "−1 from yesterday")])
    rows = '<div class="bu__tr"><span>Patient</span><span>Status</span><span>Next appointment</span></div>' + "".join(
        f'<div class="bu__tr"><span class="who"><i>{ini}</i>{name}</span><span class="bu__pill{" bu__pill--off" if st == "Inactive" else ""}">{st}</span><span>{nxt}</span></div>'
        for ini, name, st, nxt in [("MV", "Maria Abril Viola", "Active", "12 Mar 2025 · 10:00"), ("NS", "Noah James Smith", "Active", "14 Mar 2025 · 09:30"),
                                   ("EA", "Elias Aguirre", "Inactive", "—"), ("LG", "Lucía Gómez", "Active", "18 Mar 2025 · 16:15")])
    appts = "".join(f'<div class="bu__appt"><i>{ini}</i><span><b>{n}</b><small>{t}</small></span>{I["right"]}</div>' for ini, n, t in [
        ("NJ", "Noah James", "10:00 · Dr. Elena Martinez"), ("MV", "Maria Abril Viola", "11:30 · Dr. Emily Chen"), ("EA", "Elias Aguirre", "13:00 · Sarah Stone")])
    res = "".join(f"<li>{I['check']}<span>{s}</span></li>" for s in STEPS)
    code = "".join(f'<span class="l">{l or "&nbsp;"}</span>' for l in CODE)
    canvas = (f'<div class="bu__canvas"><div class="bu__bar"><span class="bu__brand">{I["logo"]}</span><span class="bu__ghost">{I["panel"]}</span>'
              f'<span class="bu__hi">👋 Hi! Dentist Sarah</span><span class="bu__loc">{I["pin"]}<b>Abril</b> - Los Angeles</span>'
              f'<span class="bu__search">{I["search"]}Search...</span><span class="bu__ghost">{I["bell"]}</span>'
              f'<span class="bu__user"><i>SS</i><span>Sarah Stone<small>Dentist</small></span></span></div>'
              f'<div class="bu__body"><div class="bu__side">{side}</div><div class="bu__content">'
              f'<div class="bu__drop"><b>Arrastrá componentes acá</b><span>Desde el panel Componentes, o describilo en Describe.</span></div>'
              f'<div class="bu__blk" data-at="3"><div class="bu__h1">Patients</div><div class="bu__stats">{stats}</div></div>'
              f'<div class="bu__split"><div class="bu__blk" data-at="4"><div class="bu__tsearch">{I["search"]}Search patients</div><div class="bu__table">{rows}</div></div>'
              f'<div class="bu__blk bu__appts" data-at="5">{appts}</div></div></div></div></div>')
    panel = (f'<div class="bu__panel"><div class="bu__ph"><span class="bu__logo">{I["grid"]}</span><span><b>Builder</b><small data-blocks>NewScreen · 0 blocks</small></span></div>'
             f'<div class="bu__btns"><span>{I["copy"]}Copy code</span><span>{I["link"]}Share link</span><span>{I["dl"]}PNG</span></div>'
             f'<div class="bu__tabs"><span class="on">Describe</span><span>Components</span><span>Layers</span><span>Code</span></div>'
             f'<div class="bu__pane"><div class="bu__desc"><div class="bu__gem"><i style="background:#16a34a"></i>Piensa con <b style="color:#0a0a0a;font-weight:600">Gemini</b></div>'
             f'<div class="bu__ask"><p><span class="ph">¿Qué querés armar? Ej: una pantalla de pacientes con métricas, la tabla y a la derecha los turnos del día</span><span data-type="{PROMPT}"></span><i class="bu__caret"></i></p>'
             f'<div><span>Enter para armar · Gemini elige piezas del catálogo</span><span class="bu__go">{I["spark"]}Armar</span></div></div>'
             f'<div class="bu__res"><b><i>{I["spark"]}</i><span data-res-label>Listo</span></b><ul>{res}</ul></div></div>'
             f'<div class="bu__code">{code}</div></div></div>')
    site = (f'<div class="bu__site"><span class="bu__logo">{I["logo"]}</span><b>Confidentally UI</b><em>Design system</em>'
            f'<span class="bu__menu"><span>Foundations</span><span>Elements</span><span>Components</span><span>Pages</span><span>Audit</span><span class="on">Builder</span></span></div>')
    chips = "".join(f"<span>{T(a, b)}</span>" for a, b in [("1 · Describe it", "1 · Describilo"), ("2 · The AI picks real pieces", "2 · La IA elige piezas reales"),
                                                           ("3 · The screen assembles", "3 · Se arma la pantalla"), ("4 · Take the code", "4 · Llevate el código")])
    return (f'  <section class="scene scene--pin bld" data-scene="builder" style="--len:480vh" aria-label="Builder">\n    <div class="scene__pin">'
            f'<div class="scene__copy"><div class="bld__steps">{chips}</div></div>'
            f'<div class="bld__box fitbox" data-fit="1440x900"><div class="fit"><div class="bu">{site}<div class="bu__main">{canvas}{panel}</div></div></div></div>'
            f'</div>\n  </section>\n')
