"""Shared pieces for every page: head, nav, footer, mockups, covers, tiles.

Text is bilingual: T(en, es) writes both versions and the page shows the one
that matches <html data-lang>. The toggle in the nav switches it.
"""
from mockups import browser, iphone, notif, brand_scene, far_browser, FAR_PHONE, ICO

FONTS = "https://fonts.googleapis.com/css2?family=Geist:wght@300..800&amp;family=Geist+Mono:wght@400..600&amp;display=swap"
LENIS = "https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js"
MARK = '<svg class="brand__tri" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 4.5h19L12 21z"/></svg>'
EMAIL = "juliangerardi266@gmail.com"
LINKEDIN = "https://www.linkedin.com/in/julian-gerardi"
BEHANCE = "https://www.behance.net/Jotainc"
CV = "assets/Julian_Gerardi_CV.pdf"

# Cache busting: each build stamps the assets with a hash of their content, so a
# new version never pairs fresh HTML with a stylesheet the browser kept from before.
import hashlib as _hashlib, os as _os
_ASSETS = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "..", "assets")


def V(name):
    with open(_os.path.join(_ASSETS, name), "rb") as f:
        return name + "?v=" + _hashlib.md5(f.read()).hexdigest()[:8]


PROJECTS = [  # order of the work index and of prev/next
    ("batech.html", "Batech AI Platform"),
    ("confidentally.html", "Confidentally"),
    ("confidentally-ui.html", "Confidentally UI"),
    ("grill.html", "GRILL Empresas"),
    ("mercado-play.html", "Mercado Play"),
]


def T(en, es):
    return f'<span lang="en">{en}</span><span lang="es">{es}</span>'


def head(title_en, title_es, desc_en, desc_es, p="", noindex=False, extra_scripts=""):
    robots = '\n<meta name="robots" content="noindex">' if noindex else ""
    return f"""<!doctype html>
<html lang="en" data-lang="en" data-title-en="{title_en}" data-title-es="{title_es}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title_en}</title>
<meta name="description" content="{desc_en}" data-es="{desc_es}">{robots}
<link rel="icon" href="{p}assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="{p}assets/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="{p}assets/apple-touch-icon.png">
<meta name="theme-color" content="#0a0a0a">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}">
<link rel="stylesheet" href="{p}assets/{V("site.css")}">
<script>(function(){{var d=document.documentElement;d.classList.add('js');d.classList.add(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches?'no-motion':'motion');try{{var t=localStorage.getItem('jg-theme');if(t==='dark'||t==='light')d.setAttribute('data-theme',t);var l=localStorage.getItem('jg-lang');if(!l)l=(navigator.language||'').toLowerCase().indexOf('es')===0?'es':'en';d.setAttribute('data-lang',l);d.lang=l;}}catch(e){{}}}})();</script>
<script src="{LENIS}" defer></script>
{extra_scripts}</head>
<body>
"""


SPRITE = """<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-right" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-left" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-down" viewBox="0 0 24 24"><path d="M12 4v12M6 11l6 6 6-6M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-lock" viewBox="0 0 24 24"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/></symbol>
  <symbol id="i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>
  <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 8h16M4 16h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-component" viewBox="0 0 16 16"><path d="M8 1.2 10.2 3.4 8 5.6 5.8 3.4ZM3.4 5.8 5.6 8 3.4 10.2 1.2 8ZM12.6 5.8 14.8 8 12.6 10.2 10.4 8ZM8 10.4 10.2 12.6 8 14.8 5.8 12.6Z" fill="currentColor"/></symbol>
  <symbol id="i-cursor" viewBox="0 0 20 20"><path d="M3 2.2 17.2 8.6l-6.1 1.9-2.3 6.3Z" fill="currentColor" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></symbol>
  <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v5M12 7.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-send" viewBox="0 0 24 24"><path d="M5 12h13M12 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-monitor" viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 20h7M12 16.5V20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
  <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-minus" viewBox="0 0 24 24"><path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-expand" viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" fill="currentColor"/><path d="M19 15.5c.25 1.6 1 2.35 2.5 2.5-1.5.15-2.25.9-2.5 2.5-.25-1.6-1-2.35-2.5-2.5 1.5-.15 2.25-.9 2.5-2.5Z" fill="currentColor"/></symbol>
</svg>
"""


def nav(p="", on_home=True):
    h = "" if on_home else f"{p}index.html"
    cur = '' if on_home else ' aria-current="page"'
    return f"""<a class="skip" href="#main">{T("Skip to content", "Ir al contenido")}</a>
<header class="nav">
  <div class="nav__inner">
    <a class="brand" href="{p}index.html" aria-label="Julián Gerardi"><span class="brand__mark" aria-hidden="true">{MARK}</span><span class="brand__name">Julián Gerardi</span></a>
    <nav class="nav__links" aria-label="Main">
      <a href="{h}#work"{cur}>{T("Work", "Trabajos")}</a>
      <a href="{h}#process">{T("Process", "Proceso")}</a>
      <a href="{h}#experience">{T("Experience", "Experiencia")}</a>
      <a href="{h}#about">{T("About", "Sobre mí")}</a>
      <a href="{h}#contact">{T("Contact", "Contacto")}</a>
      <a class="nav__cv-mobile" href="{p}{CV}" download="Julian_Gerardi_CV.pdf" target="_blank" rel="noopener" data-cv>{T("Download CV", "Descargar CV")}</a>
    </nav>
    <div class="nav__right">
      <div class="lang" role="group" aria-label="Language / Idioma">
        <button type="button" data-set-lang="en">EN</button><button type="button" data-set-lang="es">ES</button>
      </div>
      <button class="icon-btn theme-toggle" type="button" aria-label="Theme">
        <svg class="i-moon" aria-hidden="true"><use href="#i-moon"/></svg>
        <svg class="i-sun" aria-hidden="true"><use href="#i-sun"/></svg>
      </button>
      <a class="btn btn--sm nav__cv" href="{p}{CV}" download="Julian_Gerardi_CV.pdf" target="_blank" rel="noopener" data-cv><svg aria-hidden="true"><use href="#i-down"/></svg>{T("CV", "CV")}</a>
      <button class="icon-btn menu-btn" type="button" aria-label="Menu" aria-expanded="false"><svg aria-hidden="true"><use href="#i-menu"/></svg></button>
    </div>
  </div>
</header>
"""


def crumbs_bar(p, current_file, title):
    idx = [f for f, _ in PROJECTS].index(current_file)
    prev_f, prev_t = PROJECTS[idx - 1]
    next_f, next_t = PROJECTS[(idx + 1) % len(PROJECTS)]
    return f"""<div class="crumbs-bar">
  <div class="crumbs-bar__inner">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="{p}index.html">{T("Home", "Inicio")}</a><span aria-hidden="true">/</span>
      <a href="{p}index.html#work">{T("Work", "Trabajos")}</a><span aria-hidden="true">/</span>
      <span aria-current="page">{title}</span>
    </nav>
    <div class="crumbs-bar__nav">
      <span class="mono">{idx + 1:02d} / {len(PROJECTS):02d}</span>
      <a class="icon-btn" href="{prev_f}" aria-label="{prev_t}" title="{prev_t}"><svg aria-hidden="true"><use href="#i-left"/></svg></a>
      <a class="icon-btn" href="{next_f}" aria-label="{next_t}" title="{next_t}"><svg aria-hidden="true"><use href="#i-right"/></svg></a>
    </div>
  </div>
  <div class="crumbs-bar__progress" aria-hidden="true"><i></i></div>
</div>
"""


def agent(p=""):
    return f"""<div class="agent" data-agent>
  <button class="agent__launch" type="button" aria-expanded="false" aria-controls="agent-panel">
    <span class="agent__pill">{T("Ask me", "Preguntame")}</span>
    <span class="agent__ring" aria-hidden="true"><span class="agent__orb">{MARK}</span></span>
  </button>
  <section class="agent__panel" id="agent-panel" hidden aria-label="Assistant">
    <header class="agent__head">
      <span class="agent__ring agent__ring--sm" aria-hidden="true"><span class="agent__orb">{MARK}</span></span>
      <div><b>{T("Julián’s assistant", "Asistente de Julián")}</b></div>
      <button class="icon-btn agent__close" type="button" aria-label="Close"><svg aria-hidden="true"><use href="#i-close"/></svg></button>
    </header>
    <div class="agent__log" data-agent-log aria-live="polite"></div>
    <div class="agent__chips" data-agent-chips></div>
    <form class="agent__form" data-agent-form>
      <label class="sr-only" for="agent-input">Message</label>
      <input id="agent-input" name="q" autocomplete="off" data-ph-en="Ask about projects, process, availability…" data-ph-es="Preguntá por proyectos, proceso, disponibilidad…" placeholder="Ask about projects, process, availability…">
      <button class="agent__send" type="submit" aria-label="Send"><svg aria-hidden="true"><use href="#i-send"/></svg></button>
    </form>
  </section>
</div>
"""


def footer(p=""):
    w = f"{p}work/"
    cols = [
        (T("Work", "Trabajos"), [(f"{w}batech.html", "Batech AI Platform"), (f"{w}confidentally.html", "Confidentally"),
                                 (f"{w}confidentally-ui.html", "Confidentally UI"), (f"{w}grill.html", "GRILL Empresas"), (f"{w}mercado-play.html", "Mercado Play")]),
        (T("Site", "Sitio"), [(f"{p}index.html#work", T("Selected work", "Trabajos")), (f"{p}index.html#process", T("Process", "Proceso")),
                              (f"{p}index.html#experience", T("Experience", "Experiencia")), (f"{p}index.html#about", T("About", "Sobre mí")), (f"{p}index.html#contact", T("Contact", "Contacto"))]),
        (T("Live projects", "Proyectos en vivo"), [("https://juliangerardi.github.io/red-dental-studio/#/patients/patient-0001", T("Confidentally prototype", "Prototipo de Confidentally")),
                                                  ("https://juliangerardi.github.io/red-dental-studio/storybook/?path=/docs/welcome--docs", "Confidentally UI"),
                                                  ("https://claude.ai/code/artifact/b8691278-bb38-469f-89b1-a323dd661d5d", T("GRILL employee app", "GRILL, app de empleados")),
                                                  ("https://claude.ai/code/artifact/44a2be1f-d2b3-462a-acbd-382cd5c76347", T("GRILL kitchen panel", "GRILL, panel de cocina"))]),
        (T("Connect", "Contacto"), [(f"mailto:{EMAIL}", "Email"), (LINKEDIN, "LinkedIn"), (BEHANCE, "Behance"), (f"{p}{CV}", T("Download CV", "Descargar CV"))]),
    ]

    def link(href, label):
        if href.endswith(".pdf"):
            return f'<li><a href="{href}" download="Julian_Gerardi_CV.pdf" target="_blank" rel="noopener" data-cv>{label}</a></li>'
        ext = ' target="_blank" rel="noopener"' if href.startswith("http") else ""
        return f'<li><a href="{href}"{ext}>{label}</a></li>'

    grid = "".join(f'<div class="footer__col"><h2>{t}</h2><ul>{"".join(link(h, l) for h, l in items)}</ul></div>' for t, items in cols)
    return f"""<footer class="footer">
  <div class="wrap footer__grid">
    <div class="footer__brand">
      <a class="brand" href="{p}index.html" aria-label="Julián Gerardi"><span class="brand__mark" aria-hidden="true">{MARK}</span><span class="brand__name">Julián Gerardi</span></a>
      <p>Senior Product Designer<br><span>Mercedes, Buenos Aires · <span data-clock>--:--</span></span></p>
    </div>
    {grid}
  </div>
  <div class="wrap footer__bottom">
    <span class="footer__copy">© <span data-year>2026</span> Julián Gerardi</span>
    <div class="footer__switch" role="group" aria-label="Theme">
      <button type="button" data-set-theme="system" aria-label="System"><svg aria-hidden="true"><use href="#i-monitor"/></svg></button>
      <button type="button" data-set-theme="light" aria-label="Light"><svg aria-hidden="true"><use href="#i-sun"/></svg></button>
      <button type="button" data-set-theme="dark" aria-label="Dark"><svg aria-hidden="true"><use href="#i-moon"/></svg></button>
    </div>
  </div>
</footer>
"""


def tail(p="", lightbox=False, extra=""):
    lb = """<dialog class="lightbox" aria-label="Screen preview">
  <button class="icon-btn lightbox__close" type="button" aria-label="Close"><svg aria-hidden="true"><use href="#i-close"/></svg></button>
  <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">
</dialog>
""" if lightbox else ""
    return f"""<div class="curtain" aria-hidden="true"></div>
{agent(p)}{lb}<script src="{p}assets/{V("site.js")}"></script>
<script src="{p}assets/{V("agent.js")}"></script>
{extra}</body>
</html>
"""


def arrow(icon="i-arrow"):
    return f'<svg aria-hidden="true"><use href="#{icon}"/></svg>'


def img(p, name, w, h, alt_en="", alt_es="", lazy=True, zoom=False, style=""):
    cls = ' class="zoomable"' if zoom else ""
    ld = ' loading="lazy"' if lazy else ""
    es = f' data-alt-es="{alt_es}"' if alt_es else ""
    st = f' style="{style}"' if style else ""
    return f'<img{cls} src="{p}assets/img/{name}.webp" width="{w}" height="{h}" alt="{alt_en}"{es}{ld}{st} decoding="async">'


def screen(p, name, w, h, alt_en="", alt_es="", lazy=True, zoom=False):
    """A screenshot, whole."""
    return f'<span class="scr">{img(p, name, w, h, alt_en, alt_es, lazy, zoom)}</span>'


def mock(p, name, w, h, title, dark=False, alt_en="", alt_es="", lazy=True, zoom=False, style=""):
    d = " mock--dark" if dark else ""
    st = f' style="{style}"' if style else ""
    return (f'<div class="mock{d}"{st}><div class="mock__bar"><i></i><i></i><i></i><span>{title}</span></div>'
            f'{screen(p, name, w, h, alt_en, alt_es, lazy, zoom)}</div>')


def phone(p, name, alt_en="", alt_es="", lazy=True, style=""):
    st = f' style="{style}"' if style else ""
    return f'<div class="phone"{st}>{screen(p, name, 780, 1688, alt_en, alt_es, lazy)}</div>'


# ---------- Covers: brand colour, whole mockups, nothing cut ----------
COVER_H = 9 / 16      # cover height / width
FIT = 0.8             # mockups take 80% of the cover height
BAR = 0.035           # browser bar height / mock width at cover size
PHONE_RATIO = 2.083   # phone outer height / width


def _mock_w(w, h):
    """Mock width (as % of cover width) so the whole screen fits the cover height."""
    return round(min(0.78, FIT * COVER_H / (h / w + BAR)) * 100, 2)


def cover(kind, inner, mod=""):
    return f'<div class="cover cover--{kind} {mod}" aria-hidden="true"><div class="cover__stage">{inner}</div></div>'


def cover_mock(p, kind, name, w, h, title, dark=False, lazy=False):
    return cover(kind, mock(p, name, w, h, title, dark=dark, lazy=lazy, style=f"width:{_mock_w(w, h)}%"))


def cover_phones(p, kind, names, lazy=False):
    pw = round(FIT * COVER_H / PHONE_RATIO * 100, 2)
    return cover(kind, "".join(phone(p, n, lazy=lazy, style=f"width:{pw}%") for n in names))


def mp_slide():
    return """<div class="mp-slide">
  <div class="mp__stars"><i></i><i></i><i></i></div>
  <div class="mp__year">2026</div>
  <div class="mp__dialog"><div class="mp__dialog-label"><svg><use href="#i-component"/></svg>Alert Dialog</div><div class="mp__dialog-box"><i></i><i></i><i></i><i></i>Challenge UX-UI</div></div>
  <div class="mp__title">Mercado Play</div>
  <div class="mp-cursor mp-cursor--a"><svg><use href="#i-cursor"/></svg><span>Julián Gerardi</span></div>
  <div class="mp-cursor mp-cursor--b"><svg><use href="#i-cursor"/></svg><span>Devs</span></div>
  <div class="mp__foot"><span>Julián Gerardi</span><span>Version 2.0</span></div>
</div>"""


def cover_mp(mod=""):
    return cover("mp", mp_slide(), mod)


# ---------- Presentation tiles: one whole screen, device or piece each ----------
TILE_INNER = 1.203     # tile inner height / width (6:7 tile with 9% padding)
TILE_BAR = 0.08        # browser bar / mock width at tile size


def tile_screen(p, cls, name, w, h, k, dark=False):
    wf = round(min(1, TILE_INNER / (h / w + TILE_BAR)) * 100, 1)
    d = " mock--dark" if dark else ""
    return (f'<span class="tile tile--{cls}" style="--k:{k}"><span class="tile__obj mock{d}" style="width:{wf}%">'
            f'<span class="mock__bar"><i></i><i></i><i></i></span>{screen(p, name, w, h)}</span></span>')


def tile_phone(p, cls, name, k):
    wf = round(TILE_INNER / PHONE_RATIO * 100, 1)
    return f'<span class="tile tile--{cls}" style="--k:{k}"><span class="tile__obj phone" style="width:{wf}%">{screen(p, name, 780, 1688)}</span></span>'


def tile_card(p, cls, name, w, h, k):
    wf = round(min(1, TILE_INNER / (h / w)) * 100, 1)
    return f'<span class="tile tile--{cls}" style="--k:{k}"><span class="tile__obj tile__card" style="width:{wf}%">{screen(p, name, w, h)}</span></span>'


def tiles_batech(p):
    return "".join([
        tile_screen(p, "batech", "b-dashboard", 1200, 857, 0, True),
        tile_screen(p, "batech", "b-eventos", 1200, 932, 1, True),
        tile_screen(p, "batech", "b-geocerca", 1200, 1233, 2, True),
        tile_screen(p, "batech", "b-resultado", 1200, 1021, 3, True),
        tile_screen(p, "batech", "b-ai", 1200, 857, 4, True),
    ])


def tiles_dental(p):
    return "".join([
        tile_screen(p, "dental", "d-dashboard", 1600, 1000, 0),
        tile_phone(p, "dental", "d-m-patient", 1),
        tile_card(p, "ds", "d-crop-apptcard", 800, 429, 2),
        tile_screen(p, "dental", "d-clinical", 1600, 1000, 3),
        tile_phone(p, "dental", "d-m-scheduling", 4),
    ])


def tiles_ds(p):
    return "".join([
        tile_screen(p, "ds", "ds-welcome", 1600, 1000, 0),
        tile_card(p, "ds-deep", "ds-crop-describe", 731, 393, 1),
        tile_screen(p, "ds", "ds-buttons", 1600, 1000, 2),
        tile_screen(p, "ds", "ds-builder-built", 1600, 1000, 3),
        tile_screen(p, "ds", "ds-colors", 1600, 1000, 4),
    ])


def tiles_grill(p):
    return "".join([
        tile_phone(p, "grill", "g-emp-m-app", 0),
        tile_phone(p, "grill-deep", "g-emp-m-dark-app", 1),
        tile_card(p, "cream", "g-crop-label", 532, 195, 2),
        tile_card(p, "grill", "g-crop-modal", 896, 1268, 3),
        tile_screen(p, "cream", "g-corp-cocina", 1600, 1000, 4),
    ])


def tiles_mp(p, with_cover=False):
    return "".join([
        tile_screen(p, "mp", "mp-hero", 1440, 900, 0, True),
        tile_screen(p, "mp", "mp-fav-top", 1440, 900, 1, True),
        tile_screen(p, "mp", "mp-share-top", 1440, 900, 2, True),
        tile_screen(p, "mp", "mp-points-top", 1440, 900, 3, True),
        tile_screen(p, "mp", "mp-recos-top", 1440, 900, 4, True),
    ])


def wl_item(p, n, href, title, tags, year, tiles, desc, credit, is_open=False, nda=False):
    o = " is-open" if is_open else ""
    lock = '<svg class="wl-lock" aria-hidden="true"><use href="#i-lock"/></svg>NDA · ' if nda else ""
    return f"""    <li class="wl-item{o}" data-cursor="{year}">
      <div class="wl-row">
        <a class="wl-head" href="{href}">
          <span class="wl-n">{n:02d}</span>
          <span class="wl-title">{title}</span>
          <span class="wl-tags">{lock}{tags}</span>
        </a>
        <div class="wl-body"><div class="wl-clip"><div class="wl-inner">
          <a class="wl-strip" href="{href}" tabindex="-1" aria-hidden="true">{tiles}</a>
          <div class="wl-desc">
            <p>{desc}</p>
            <p class="wl-credit">{credit}</p>
            <a class="wl-more" href="{href}">{T("View case study", "Ver caso")} {arrow()}</a>
          </div>
        </div></div></div>
      </div>
    </li>
"""


def case_head(title, lede, meta, links="", note=""):
    cells = "".join(f'<div><dt>{k}</dt><dd>{v}</dd></div>' for k, v in meta)
    n = f'<p class="case-note" data-reveal>{note}</p>' if note else ""
    lk = f'<div class="btns" data-reveal>{links}</div>' if links else ""
    return f"""  <header class="case-head wrap">
    <h1 class="case-title split">{title}</h1>
    <p class="case-lede" data-reveal>{lede}</p>
    {lk}
    {n}
    <dl class="case-meta" data-reveal>{cells}</dl>
  </header>
"""


def chapter(label, body, cid=""):
    i = f' id="{cid}"' if cid else ""
    return f"""  <section class="chapter wrap"{i}>
    <div class="chapter__label"><span>{label}</span></div>
    <div class="chapter__body">
{body}
    </div>
  </section>
"""


def next_row(p, current_file):
    idx = [f for f, _ in PROJECTS].index(current_file)
    nf, nt = PROJECTS[(idx + 1) % len(PROJECTS)]
    return f"""  <section class="wrap"><a class="next" href="{nf}"><div><div class="label">{T("Next project", "Próximo proyecto")}</div><h2>{nt}</h2></div><span class="next__go" aria-hidden="true">{arrow("i-right")}</span></a></section>
"""


def case_page(p, fn, title, title_es, desc_en, desc_es, body, noindex=False):
    return (head(f"{title} · Julián Gerardi", f"{title_es} · Julián Gerardi", desc_en, desc_es, p, noindex)
            + SPRITE + nav(p, on_home=False) + crumbs_bar(p, fn, title)
            + '\n<main id="main" class="case">\n' + body + next_row(p, fn) + '</main>\n' + footer(p) + tail(p, lightbox=True))


# ---------- Figures inside case studies (whole screens on a brand panel) ----------
def fig(p, name, w, h, title, alt_en, alt_es, cap_en="", cap_es="", kind="soft", dark=False):
    c = f"<figcaption>{T(cap_en, cap_es)}</figcaption>" if cap_en else ""
    k = "" if kind == "soft" else f" panel--{kind}"
    return (f'<figure class="shot" data-reveal><div class="panel{k}">{mock(p, name, w, h, title, dark=dark, alt_en=alt_en, alt_es=alt_es, zoom=True)}</div>{c}</figure>')


def fig_phones(p, kind, items, cap_en="", cap_es=""):
    ph = "".join(phone(p, n, ae, as_) for n, ae, as_ in items)
    c = f"<figcaption>{T(cap_en, cap_es)}</figcaption>" if cap_en else ""
    return f'<figure class="shot" data-reveal><div class="panel panel--{kind}"><div class="phones">{ph}</div></div>{c}</figure>'


def pair(a, b):
    return f'<div class="pair">{a}{b}</div>'


def decision(title_en, title_es, text, figure):
    return f"""      <div class="decision">
        <div class="decision__head" data-reveal><h3>{T(title_en, title_es)}</h3><div class="prose">{text}</div></div>
        {figure}
      </div>
"""


def h2(en, es):
    return f'      <h2 class="lines">{T(en, es)}</h2>\n'


def prose(*pairs):
    return '      <div class="prose" data-reveal>' + "".join(f"<p>{T(e, s)}</p>" for e, s in pairs) + "</div>\n"


def bullets(*items):
    return '<ul class="bullets">' + "".join(f"<li><b>{T(be, bs)}</b> {T(te, ts)}</li>" for be, bs, te, ts in items) + "</ul>"


# ---------- Scroll storytelling (see scenes.py) ----------
def scene_head(label, h_en, h_es, p_en="", p_es="", sid=""):
    i = f' id="{sid}"' if sid else ""
    pp = f'<p data-reveal>{T(p_en, p_es)}</p>' if p_en else ""
    return (f'  <header class="wrap section-head scene-head"{i}><div class="label" data-reveal>{label}</div>'
            f'<h2 class="lines">{T(h_en, h_es)}</h2>{pp}</header>\n')


def big_words(en, es, sub_en="", sub_es=""):
    sub = f'<p data-reveal>{T(sub_en, sub_es)}</p>' if sub_en else ""
    return f'  <section class="wrap big-words"><p class="words" data-words>{T(en, es)}</p>{sub}</section>\n'
