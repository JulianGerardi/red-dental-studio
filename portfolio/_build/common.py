FONTS = "https://fonts.googleapis.com/css2?family=Geist:wght@300..800&amp;family=Geist+Mono:wght@400..600&amp;display=swap"
ICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23171717'/%3E"
        "%3Ctext x='16' y='20.5' font-family='Arial' font-weight='700' font-size='11' text-anchor='middle' fill='%23fff'%3EJG%3C/text%3E%3C/svg%3E")
EMAIL = "juliangerardi266@gmail.com"
LINKEDIN = "https://www.linkedin.com/in/julian-gerardi"
BEHANCE = "https://www.behance.net/Jotainc"


def head(title, desc, p="", noindex=False):
    robots = '\n<meta name="robots" content="noindex">' if noindex else ""
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">{robots}
<link rel="icon" href="{ICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}">
<link rel="stylesheet" href="{p}assets/site.css">
<script>try{{var t=localStorage.getItem('jg-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}}catch(e){{}}</script>
</head>
<body>
"""


SPRITE = """<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-lock" viewBox="0 0 24 24"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/></symbol>
  <symbol id="i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>
  <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 8h16M4 16h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-component" viewBox="0 0 16 16"><path d="M8 1.2 10.2 3.4 8 5.6 5.8 3.4ZM3.4 5.8 5.6 8 3.4 10.2 1.2 8ZM12.6 5.8 14.8 8 12.6 10.2 10.4 8ZM8 10.4 10.2 12.6 8 14.8 5.8 12.6Z" fill="currentColor"/></symbol>
  <symbol id="i-cursor" viewBox="0 0 20 20"><path d="M3 2.2 17.2 8.6l-6.1 1.9-2.3 6.3Z" fill="currentColor" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></symbol>
  <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v5M12 7.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
</svg>
"""


def nav(p="", on_home=True):
    h = "" if on_home else f"{p}index.html"
    cur = '' if on_home else ' aria-current="page"'
    return f"""<a class="skip" href="#main">Skip to content</a>
<header class="nav">
  <div class="nav__inner">
    <a class="brand" href="{p}index.html" aria-label="Julián Gerardi, home"><span class="brand__mark" aria-hidden="true">JG</span>Julián Gerardi</a>
    <nav class="nav__links" aria-label="Main">
      <a href="{h}#work"{cur}>Work</a>
      <a href="{h}#process">Process</a>
      <a href="{h}#experience">Experience</a>
      <a href="{h}#about">About</a>
    </nav>
    <div class="nav__right">
      <button class="icon-btn theme-toggle" type="button" aria-label="Switch theme">
        <svg class="i-moon" aria-hidden="true"><use href="#i-moon"/></svg>
        <svg class="i-sun" aria-hidden="true"><use href="#i-sun"/></svg>
      </button>
      <button class="icon-btn menu-btn" type="button" aria-label="Open menu" aria-expanded="false"><svg aria-hidden="true"><use href="#i-menu"/></svg></button>
      <a class="btn btn--sm" href="{h}#contact">Get in touch</a>
    </div>
  </div>
</header>
"""


def footer(p=""):
    return f"""  <footer class="row">
    <div class="footer">
      <span>© <span data-year>2026</span> Julián Gerardi · Mercedes, Buenos Aires · <span data-clock>--:--</span> local time</span>
      <div class="footer__links">
        <a href="{p}index.html#work">Work</a>
        <a href="{LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a>
        <a href="{BEHANCE}" target="_blank" rel="noopener">Behance</a>
      </div>
    </div>
  </footer>
"""


def tail(p="", lightbox=False):
    lb = """<dialog class="lightbox" aria-label="Screen preview">
  <button class="icon-btn lightbox__close" type="button" aria-label="Close preview"><svg aria-hidden="true"><use href="#i-close"/></svg></button>
  <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">
</dialog>
""" if lightbox else ""
    return f"""{lb}<script src="{p}assets/site.js"></script>
</body>
</html>
"""


def arrow():
    return '<svg aria-hidden="true"><use href="#i-arrow"/></svg>'


def img(p, name, w, h, alt="", lazy=True, zoom=False):
    cls = ' class="zoomable"' if zoom else ""
    ld = ' loading="lazy"' if lazy else ""
    return f'<img{cls} src="{p}assets/img/{name}.webp" width="{w}" height="{h}" alt="{alt}"{ld} decoding="async">'


def mock(p, name, w, h, title, dark=False, alt="", lazy=True, zoom=False):
    d = " mock--dark" if dark else ""
    return (f'<div class="mock{d}"><div class="mock__bar"><i></i><i></i><i></i><span>{title}</span></div>'
            f'{img(p, name, w, h, alt, lazy, zoom)}</div>')


def phone(p, name, alt="", lazy=True):
    return f'<div class="phone">{img(p, name, 780, 1688, alt, lazy)}</div>'


# ---------- Covers: one brand colour, one centred mockup ----------
def cover_batech(p, mod="", lazy=True, shot="b-eventos", h=932, title="Batech · Eventos detectados"):
    return (f'<div class="cover cover--batech {mod}" aria-hidden="true"><div class="cover__stage">'
            f'{mock(p, shot, 1200, h, title, dark=True, lazy=lazy)}</div></div>')


def cover_dental(p, mod="", lazy=True, shot="d-dashboard", title="Red Dental Studio · Dashboard"):
    return (f'<div class="cover cover--dental {mod}" aria-hidden="true"><div class="cover__stage">'
            f'{mock(p, shot, 1600, 1000, title, lazy=lazy)}</div></div>')


def cover_ds(p, mod="", lazy=True, shot="ds-welcome", title="Confidentally UI"):
    return (f'<div class="cover cover--ds {mod}" aria-hidden="true"><div class="cover__stage">'
            f'{mock(p, shot, 1600, 1000, title, lazy=lazy)}</div></div>')


def cover_grill(p, mod="", lazy=True):
    return (f'<div class="cover cover--grill {mod}" aria-hidden="true"><div class="cover__stage">'
            f'{phone(p, "g-emp-m-app", lazy=lazy)}{phone(p, "g-emp-m-modal", lazy=lazy)}{phone(p, "g-emp-m-dark-app", lazy=lazy)}</div></div>')


def cover_mp(mod=""):
    return f"""<div class="cover cover--mp {mod}" aria-hidden="true"><div class="cover__stage"><div class="mp-slide">
  <div class="mp__stars"><i></i><i></i><i></i></div>
  <div class="mp__year">2026</div>
  <div class="mp__dialog"><div class="mp__dialog-label"><svg><use href="#i-component"/></svg>Alert Dialog</div><div class="mp__dialog-box"><i></i><i></i><i></i><i></i>Challenge UX-UI</div></div>
  <div class="mp__title">Mercado Play</div>
  <div class="mp-cursor mp-cursor--a"><svg><use href="#i-cursor"/></svg><span>Julián Gerardi</span></div>
  <div class="mp-cursor mp-cursor--b"><svg><use href="#i-cursor"/></svg><span>Devs</span></div>
  <div class="mp__foot"><span>Julián Gerardi</span><span>Version 2.0</span></div>
</div></div></div>"""


def case_head(crumb, title, lede, meta, links="", note=""):
    cells = "".join(f'<div class="cell"><dt>{k}</dt><dd>{v}</dd></div>' for k, v in meta)
    n = f'<p class="case-note">{note}</p>' if note else ""
    return f"""  <section class="row case-head">
    <div class="cell" style="padding-block:clamp(56px,9vw,112px) clamp(40px,6vw,72px)">
      <nav class="crumbs rise" style="--d:0s" aria-label="Breadcrumb"><a href="../index.html#work">Work</a><span>/</span><span>{crumb}</span></nav>
      <h1 class="case-title split">{title}</h1>
      <p class="case-lede rise">{lede}</p>
      {('<div class="btns rise" style="--d:.55s">' + links + '</div>') if links else ''}
      {n}
    </div>
  </section>
  <section class="row"><dl class="cells meta" style="margin:0">{cells}</dl></section>
"""


def chapter(label, body, cid=""):
    i = f' id="{cid}"' if cid else ""
    return f"""  <section class="row chapter"{i}>
    <div class="chapter__label"><span>{label}</span></div>
    <div class="chapter__body">
{body}
    </div>
  </section>
"""


def next_row(href, name):
    return f"""  <section class="row"><a class="next" href="{href}"><div><div class="label">Next project</div><h2>{name}</h2></div>{arrow()}</a></section>
"""


# ---------- Presentation tiles for the Selected work index ----------
def tile_full(p, cls, name, w, h, pos="50% 50%", z=1.0, k=0):
    return (f'<span class="tile tile--full tile--{cls}" style="--k:{k};--pos:{pos};--z:{z}">'
            f'{img(p, name, w, h)}</span>')


def tile_window(p, cls, name, w, h, k=0):
    return f'<span class="tile tile--window tile--{cls}" style="--k:{k}">{img(p, name, w, h)}</span>'


def tile_card(p, cls, name, w, h, width="84%", k=0):
    return f'<span class="tile tile--card tile--{cls}" style="--k:{k};--w:{width}">{img(p, name, w, h)}</span>'


def tile_phone(p, cls, name, k=0):
    return f'<span class="tile tile--{cls}" style="--k:{k}">{phone(p, name)}</span>'


def tiles_batech(p):
    return "".join([
        tile_window(p, "batech", "b-dashboard", 1200, 857, 0),
        tile_full(p, "batech", "b-geocerca", 1200, 1233, "40% 38%", 2.1, 1),
        tile_full(p, "batech", "b-eventos", 1200, 932, "45% 30%", 1.9, 2),
        tile_full(p, "batech", "b-resultado", 1200, 1021, "62% 38%", 2.2, 3),
        tile_full(p, "batech", "b-ai", 1200, 857, "84% 34%", 1.8, 4),
    ])


def tiles_dental(p):
    return "".join([
        tile_window(p, "dental", "d-dashboard", 1600, 1000, 0),
        tile_phone(p, "dental", "d-m-patient", 1),
        tile_card(p, "ds", "d-crop-apptcard", 800, 429, "86%", 2),
        tile_full(p, "dental", "d-clinical", 1600, 1000, "66% 40%", 2.0, 3),
        tile_phone(p, "dental", "d-m-dashboard", 4),
    ])


def tiles_ds(p):
    return "".join([
        tile_full(p, "ds", "ds-welcome", 1600, 1000, "50% 30%", 1.55, 0),
        tile_card(p, "ds", "ds-crop-describe", 731, 393, "88%", 1),
        tile_card(p, "dental", "ds-crop-search", 1100, 891, "90%", 2),
        tile_window(p, "ds", "ds-buttons", 1600, 1000, 3),
        tile_full(p, "ds", "ds-builder-built", 1600, 1000, "30% 70%", 1.9, 4),
    ])


def tiles_grill(p):
    return "".join([
        tile_phone(p, "grill", "g-emp-m-app", 0),
        tile_phone(p, "grill-deep", "g-emp-m-dark-app", 1),
        tile_card(p, "cream", "g-crop-label", 532, 195, "86%", 2),
        tile_phone(p, "grill", "g-emp-m-modal", 3),
        tile_full(p, "cream", "g-corp-cocina", 1600, 1000, "38% 20%", 1.5, 4),
    ])


def tiles_mp(p):
    return "".join([
        '<span class="tile tile--mp" style="--k:0"><span class="mp-word">Mer<br>cado<br>Play</span></span>',
        '<span class="tile tile--mp-dark" style="--k:1"><span class="mp-sel"><span class="mp__dialog-label"><svg><use href="#i-component"/></svg>Alert Dialog</span>'
        '<span class="mp__dialog-box" style="display:block"><i></i><i></i><i></i><i></i>Challenge UX-UI</span></span></span>',
        '<span class="tile tile--mp-dark" style="--k:2"><span class="mp-stars"><i></i><i></i><i></i></span><span class="mp-year">20<br>26</span></span>',
        '<span class="tile tile--mp" style="--k:3"><span class="mp-cursor mp-cursor--a"><svg><use href="#i-cursor"/></svg><span>Julián Gerardi</span></span>'
        '<span class="mp-cursor mp-cursor--b"><svg><use href="#i-cursor"/></svg><span>Devs</span></span></span>',
        tile_full(p, "mp-dark", "mp-cover", 2000, 1126, "28% 58%", 1.7, 4),
    ])


def wl_item(p, n, href, title, tags, year, tiles, desc, credit, is_open=False, nda=False):
    o = " is-open" if is_open else ""
    lock = ' <svg aria-hidden="true" style="width:12px;height:12px;vertical-align:-1px"><use href="#i-lock"/></svg> NDA ·' if nda else ""
    return f"""      <li class="wl-item{o}" data-cursor="{year}">
        <a class="wl-head" href="{href}">
          <span class="wl-n">{n:02d}</span>
          <span class="wl-title">{title}</span>
          <span class="wl-tags">{lock} {tags}</span>
        </a>
        <div class="wl-body"><div class="wl-clip"><div class="wl-inner">
          <a class="wl-strip" href="{href}" tabindex="-1" aria-hidden="true">{tiles}</a>
          <div class="wl-desc">
            <p>{desc}</p>
            <p class="wl-credit">{credit}</p>
            <a class="wl-more" href="{href}">View case study {arrow()}</a>
          </div>
        </div></div></div>
      </li>
"""
