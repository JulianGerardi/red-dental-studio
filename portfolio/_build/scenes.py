"""Scroll scenes for the case studies (see "Scroll scenes" in site.css and site.js).

rise()   the cover grows to fill the screen as you scroll into the case
story()  a sticky device that changes screen as each step scrolls by
rail()   a row of screens that moves sideways with the vertical scroll
fan()    phones stacked in the middle that spread out
wipe()   low fidelity turns into high fidelity under a moving line
scrub()  a long page that scrolls inside its window as you scroll
words()  a paragraph whose words light up as it passes
"""
from mockups import browser, iphone, far_browser, FAR_PHONE


def T(en, es):
    return f'<span lang="en">{en}</span><span lang="es">{es}</span>'


def words(en, es, cls="", tag="p"):
    return f'<{tag} class="words {cls}" data-words>{T(en, es)}</{tag}>'


def rise(inner, bg, length=130):
    return (f'  <section class="scene scene--pin rise" data-scene="rise" style="--len:{length}vh" aria-hidden="true">'
            f'<div class="scene__pin"><div class="rise__frame bg--{bg}"><div class="rise__obj">{inner}</div></div></div></section>\n')


# ---------- devices sized for a story stage ----------
def dev_browser(p, name, w, h, url, dark=False, view="fit", alt_en="", alt_es=""):
    return f'<div class="story__dev" style="--far:{far_browser(w, h, view)}">{browser(p, name, w, h, url, dark, alt_en, alt_es, view=view)}</div>'


def dev_phone(p, name, alt_en="", alt_es=""):
    return f'<div class="story__dev story__dev--ph">{iphone(p, name, alt_en, alt_es)}</div>'


def dev_piece(p, name, w, h, alt_en="", alt_es="", scale=1.3):
    return (f'<div class="story__piece" style="--pw:{round(w * scale)}px;--far:{round(w / h, 4)}">'
            f'<img src="{p}assets/img/{name}.webp" width="{w}" height="{h}" alt="{alt_en}" data-alt-es="{alt_es}" loading="lazy" decoding="async"></div>')


def story(steps, layers, stage, label=""):
    """steps: [(title_en, title_es, text_en, text_es)], layers: [(indices, html)]."""
    lis = "".join(f'<li class="story__step" data-i="{i}"><span class="story__n">{i + 1:02d} / {len(steps):02d}</span>'
                  f'<h3>{T(a, b)}</h3><p>{T(c, d)}</p></li>' for i, (a, b, c, d) in enumerate(steps))
    lay = "".join(f'<div class="story__layer" data-i="{" ".join(str(i) for i in idx)}">{html}</div>' for idx, html in layers)
    dots = "".join("<i></i>" for _ in steps)
    lb = f' aria-label="{label}"' if label else ""
    return (f'  <section class="story" data-story{lb}>\n    <ol class="story__steps">{lis}</ol>\n'
            f'    <div class="story__media"><div class="story__sticky"><div class="story__stage stage--{stage}">{lay}<div class="story__dots" aria-hidden="true">{dots}</div></div></div></div>\n  </section>\n')


def rail(title_en, title_es, text_en, text_es, items, length=None):
    """items: [(device_html, far, caption_html)]"""
    figs = "".join(f'<figure class="rail__item" style="--far:{far}">{dev}<figcaption>{cap}</figcaption></figure>' for dev, far, cap in items)
    return (f'  <section class="scene scene--pin rail" data-scene="rail">\n    <div class="scene__pin">'
            f'<div class="rail__head"><h2 class="lines">{T(title_en, title_es)}</h2><p>{T(text_en, text_es)}</p></div>'
            f'<div class="rail__track">{figs}</div><div class="rail__bar" aria-hidden="true"><i></i></div></div>\n  </section>\n')


def rail_browser(p, name, w, h, url, cap, dark=False):
    return (browser(p, name, w, h, url, dark, view="fit"), far_browser(w, h, "fit"), cap)


def rail_phone(p, name, cap):
    return (iphone(p, name), FAR_PHONE, cap)


def fan(p, names, title_en, title_es, text_en, text_es, length=165):
    pos = [("-112%", "7%", "-9deg"), ("0%", "0%", "0deg"), ("112%", "7%", "9deg")]
    phones = "".join(f'<div class="fan__ph" style="--x:{x};--y:{y};--r:{r}">{iphone(p, n)}</div>' for n, (x, y, r) in zip(names, pos))
    return (f'  <section class="scene scene--pin fan" data-scene="fan" style="--len:{length}vh">'
            f'<div class="scene__pin"><div class="fan__copy scene__copy"><h2>{T(title_en, title_es)}</h2><p>{T(text_en, text_es)}</p></div>'
            f'<div class="fan__stage">{phones}</div></div></section>\n')


def wipe(p, lo, hi, url, tag_lo, tag_hi, title_en, title_es, length=160):
    lo_n, lo_w, lo_h = lo
    hi_n, hi_w, hi_h = hi
    body = (f'<div class="wipe__view sf__view"><img src="{p}assets/img/{lo_n}.webp" width="{lo_w}" height="{lo_h}" alt="" loading="lazy" decoding="async">'
            f'<img class="wipe__hi" src="{p}assets/img/{hi_n}.webp" width="{hi_w}" height="{hi_h}" alt="" loading="lazy" decoding="async">'
            f'<i class="wipe__line"></i><span class="wipe__tag wipe__tag--lo">{tag_lo}</span><span class="wipe__tag wipe__tag--hi">{tag_hi}</span></div>')
    win = browser(p, "", 1200, 750, url, dark=True, body=body).replace('<div class="sf__view" style="--ar:1200/750">', '<div style="--ar:1200/750">')
    return (f'  <section class="scene scene--pin wipe" data-scene="wipe" style="--len:{length}vh">'
            f'<div class="scene__pin"><div class="scene__copy"><h2 class="scene__h">{T(title_en, title_es)}</h2></div><div class="wipe__win">{win}</div></div></section>\n')


def scrub(p, name, w, h, url, dark=True, length=190, alt_en="", alt_es=""):
    shift = round((1 - 0.625 * w / h) * 100, 2)
    win = browser(p, name, w, h, url, dark, alt_en, alt_es)
    return (f'  <section class="scene scene--pin scrubp" data-scene="scrub" style="--len:{length}vh;--shift:{shift}%">'
            f'<div class="scene__pin"><div class="scrubp__win">{win}</div></div></section>\n')
