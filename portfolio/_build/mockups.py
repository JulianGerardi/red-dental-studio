"""Device mockups and brand scenes.

browser()  a Safari window (traffic lights, URL pill), light or dark chrome
iphone()   an iPhone with titanium edge, Dynamic Island and a status bar
notif()    a floating notification card
brand_scene()  the composition each project uses in the hero previews and
               at the top of its case study: brand background, devices,
               floating notifications.

Every size inside a mockup is in cqw of the mockup itself, so the same markup
works at 300px in a hover card and at 1400px in a case cover.
"""

# status bar colour = the top pixel row of each phone screenshot
STATUS = {
    "g-emp-m-modal": ("#dcdbd5", "dark"), "g-emp-m-dark-app": ("#11120f", "light"),
    "d-m-clinical": ("#fafcfe", "dark"),
}
STATUS_DEFAULT = {"g": ("#f5f3ef", "dark"), "d": ("#ffffff", "dark")}

ICO = {
    "sidebar": '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="4" width="15" height="12" rx="2.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4v12" stroke="currentColor" stroke-width="1.5"/></svg>',
    "back": '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "fwd": '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "lock": '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="5" y="9" width="10" height="7.5" rx="1.6" fill="currentColor"/><path d="M7.2 9V7a2.8 2.8 0 0 1 5.6 0v2" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    "share": '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.8v9.4M6.6 6 10 2.6 13.4 6M6 9H4.8v8h10.4V9H14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "plus": '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    "tabs": '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="6" width="11" height="11" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 3.5h8a2.5 2.5 0 0 1 2.5 2.5v8" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    "signal": '<svg viewBox="0 0 18 12" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" y="0" width="3" height="12" rx=".8"/></svg>',
    "wifi": '<svg viewBox="0 0 16 12" aria-hidden="true"><path d="M8 11.6 5.6 9.2a3.4 3.4 0 0 1 4.8 0Z"/><path d="M3.4 7A6.6 6.6 0 0 1 12.6 7l-1.4 1.4a4.6 4.6 0 0 0-6.4 0Z"/><path d="M1.2 4.8a9.7 9.7 0 0 1 13.6 0l-1.4 1.4a7.7 7.7 0 0 0-10.8 0Z"/></svg>',
    "battery": '<svg viewBox="0 0 26 12" aria-hidden="true"><rect x=".6" y=".6" width="22" height="10.8" rx="3.2" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.2"/><rect x="2.4" y="2.4" width="16.6" height="7.2" rx="1.8"/><path d="M24.4 4.2v3.6a1.9 1.9 0 0 0 0-3.6Z" fill-opacity=".45"/></svg>',
    "gift": '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="9" width="16" height="11" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 9h18M12 9v11M12 9c-1.5-3.5-5.5-4.5-6-2s4 2 6 2Zm0 0c1.5-3.5 5.5-4.5 6-2s-4 2-6 2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    "check": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12.5 4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "clock": '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    "bell": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 20.5a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
}


def _img(p, name, w, h, alt_en="", alt_es="", lazy=True, cls=""):
    es = f' data-alt-es="{alt_es}"' if alt_es else ""
    ld = ' loading="lazy"' if lazy else ""
    c = f' class="{cls}"' if cls else ""
    return f'<img{c} src="{p}assets/img/{name}.webp" width="{w}" height="{h}" alt="{alt_en}"{es}{ld} decoding="async">'


def browser(p, name, w, h, url, dark=False, alt_en="", alt_es="", lazy=True, cls="", view="", body=""):
    """Safari window. view = 'fit' shows the whole screen (no crop),
    otherwise the window is 16:10 and a long page shows its top."""
    d = " sf--dark" if dark else ""
    v = " sf__view--fit" if view == "fit" else ""
    inner = body or _img(p, name, w, h, alt_en, alt_es, lazy)
    return (f'<div class="sf{d} {cls}"><div class="sf__win"><div class="sf__bar"><span class="sf__dots"><i></i><i></i><i></i></span>'
            f'<span class="sf__nav">{ICO["sidebar"]}{ICO["back"]}{ICO["fwd"]}</span>'
            f'<span class="sf__url">{ICO["lock"]}<span>{url}</span></span>'
            f'<span class="sf__tools">{ICO["share"]}{ICO["plus"]}{ICO["tabs"]}</span></div>'
            f'<div class="sf__view{v}" style="--ar:{w}/{h}">{inner}</div></div></div>')


def far_browser(w, h, view=""):
    """width / height of a browser mockup (bar included)."""
    return round(1 / (0.036 + (h / w if view == "fit" else 0.625)), 4)


FAR_PHONE = 0.459


def iphone(p, name, alt_en="", alt_es="", lazy=True, cls="", style=""):
    bg, ink = STATUS.get(name, STATUS_DEFAULT.get(name[0], ("#ffffff", "dark")))
    st = f' style="{style}"' if style else ""
    return (f'<div class="ip {cls}"{st}><div class="ip__body"><div class="ip__bezel"><div class="ip__screen">'
            f'<div class="ip__status ip__status--{ink}" style="background:{bg}"><b>9:41</b><span>{ICO["signal"]}{ICO["wifi"]}{ICO["battery"]}</span></div>'
            f'{_img(p, name, 780, 1688, alt_en, alt_es, lazy)}</div><i class="ip__island"></i></div></div></div>')


def notif(icon, title, sub, meta="", cls="", style=""):
    m = f"<em>{meta}</em>" if meta else ""
    st = f' style="{style}"' if style else ""
    return f'<div class="nt {cls}"{st}><span class="nt__ic">{icon}</span><span class="nt__tx"><b>{title}</b><span>{sub}</span></span>{m}</div>'


def emoji(ch, cls):
    return f'<span class="bs__emoji {cls}" aria-hidden="true">{ch}</span>'


GRILL_MARK = '<span class="logo-grill">G</span>'
MP_MARK = '<span class="logo-mp">' + ICO["gift"] + '</span>'
BATECH_MARK = ('<svg class="logo-batech" viewBox="2 2 22 28" aria-hidden="true">'
               '<path d="M12 4.4c5.6 2.6 9.2 7.6 9.2 13 0 6-4.6 10.6-11.2 11.2 2.9-2.7 4.3-6.5 4.1-10.7-.2-4.6-.9-9.1-2.1-13.5Z" fill="#2ba9e1"/>'
               '<circle cx="7.3" cy="24.3" r="2.8" fill="#fff"/></svg>')


def pipeline_mini(T):
    """Figma -> Claude Code -> Storybook -> developers, small enough for a card."""
    n = lambda cls, label, sub="": f'<span class="pm__n pm__n--{cls}"><i></i><span><b>{label}</b>{f"<em>{sub}</em>" if sub else ""}</span></span>'
    return ('<div class="pm">'
            '<div class="pm__col">' + n("tok", "Variables") + n("cmp", "Components") + n("sty", "Styles") + '</div>'
            '<i class="pm__w"></i>' + n("figma", "Figma")
            + '<i class="pm__w"></i>'
            + '<span class="pm__n pm__n--claude"><i></i><b>Claude Code</b><em>' + T("reads design + code", "lee diseño y código") + '</em></span>'
            + '<i class="pm__w"><span class="pm__pill">human-in-the-loop</span></i>'
            + n("sb", "Storybook", "Confidentally UI")
            + '<i class="pm__w"></i>'
            + '<div class="pm__col">' + n("dev", T("Developers", "Devs")) + n("app", "App") + n("ai", T("AI Builder", "Builder IA")) + '</div>'
            '</div>')


def brand_scene(p, kind, T, big=False):
    """The composition for each project (hero previews and case covers)."""
    lazy = not big
    if kind == "batech":
        return (f'<div class="bs bs--batech">'
                f'<div class="bs__dev bs__dev--win">{browser(p, "b-eventos", 1200, 932, "app.batech.ai", dark=True, lazy=lazy, view="fit")}</div>'
                f'{notif(BATECH_MARK, "Batech AI", T("Cash drawer opened · Branch 12", "Apertura de caja · Sucursal 12"), T("now", "ahora"), "bs__nt bs__nt--a nt--dark")}'
                f'</div>')
    if kind == "dental":
        return (f'<div class="bs bs--dental">'
                f'<div class="bs__dev bs__dev--win">{browser(p, "d-dashboard", 1600, 1000, "app.confidentally.com", lazy=lazy, view="fit")}</div>'
                f'{notif("<span class=logo-dental>C</span>", T("Noah James checked in", "Noah James llegó"), T("Waiting room · Operatory 2", "Sala de espera · Consultorio 2"), "9:41", "bs__nt bs__nt--a")}'
                f'</div>')
    if kind == "ds":
        return (f'<div class="bs bs--ds">'
                f'<div class="bs__head"><span>Confidentally UI</span><b>{T("Design system,<br>from Figma to code", "Design system,<br>de Figma al código")}</b><em>Figma <i>✦</i> Claude Code <i>✦</i> Storybook</em></div>'
                f'<div class="bs__dev bs__dev--mon"><div class="mon"><div class="mon__screen">{pipeline_mini(T)}</div></div></div>'
                f'</div>')
    if kind == "grill":
        return (f'<div class="bs bs--grill">'
                f'<div class="bs__dev bs__dev--win">{browser(p, "g-emp-app", 1600, 1000, "empresas.grill.com.ar", lazy=lazy, view="fit")}</div>'
                f'{notif(GRILL_MARK, T("Order confirmed", "Pedido confirmado"), "Milanesa de ternera · Puré de papa", "$10.800", "bs__nt bs__nt--a")}'
                f'</div>')
    if kind == "mp":
        return (f'<div class="bs bs--mp">'
                f'<div class="bs__dev bs__dev--win bs__dev--tilt">{browser(p, "mp-points", 1200, 3597, "play.mercadolibre.com", dark=True, lazy=lazy)}</div>'
                f'{notif(MP_MARK, T("Congratulations!", "¡Felicitaciones!"), T("Guido watched the film you recommended · <u>+213 points</u> for Mercado Envíos", "Guido vio la peli que le recomendaste · <u>Sumaste 213 puntos</u> para Mercado Envíos"), "", "bs__nt bs__nt--a nt--mp")}'
                f'{emoji("🍿", "bs__emoji--a")}{emoji("⭐", "bs__emoji--b")}{emoji("👑", "bs__emoji--c")}'
                f'</div>')
    raise ValueError(kind)
