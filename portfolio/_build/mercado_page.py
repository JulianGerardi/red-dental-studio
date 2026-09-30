from common import *
import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")

p = "../"
FIGMA = "https://www.figma.com/design/MTQT0AwdScSnoRK3m3SHeB/Challenge%E2%80%94UX-UI?node-id=11-544"

body = case_head(
    "Mercado Play", "Mercado Play",
    "A UX/UI challenge for Mercado Libre’s free streaming service, delivered as a Figma file with its own visual system.",
    [("Role", "UX/UI Designer"), ("Company", "Mercado Libre · Challenge"), ("Year", "2026"),
     ("Product", "Mercado Play"), ("Version", "2.0"), ("Tools", "Figma")],
    links=f'<a class="btn" href="{FIGMA}" target="_blank" rel="noopener">Open the challenge in Figma {arrow()}</a>',
)
body += f"""  <section class="row"><div class="cell cell--flush">{cover_mp("cover--hero")}</div></section>
"""
body += chapter("Overview", """      <h2>Streaming inside the largest marketplace in Latin America.</h2>
      <div class="prose">
        <p>Mercado Play is Mercado Libre’s free streaming service: films, series and live channels at no cost, supported by ads and available inside the Mercado Libre ecosystem.</p>
        <p>This project is a UX/UI challenge built around the product. The file is on its <strong>second version</strong>, and its presentation was designed as carefully as the screens.</p>
      </div>""", "overview")
body += chapter("The cover as a system", f"""      <h2>A presentation that opens like a Figma canvas.</h2>
      <div class="prose">
        <p>The challenge title sits inside a selected component called <strong>Alert Dialog</strong>, the product name is set in Mercado Libre’s yellow, and two multiplayer cursors, mine and the developers’, share the frame. The same pieces break down into a small set of assets for the rest of the file.</p>
      </div>
      <div class="mp-set">{tiles_mp(p)}</div>
      <figure class="shot"><div class="panel" style="background:var(--mp-bg);border-color:transparent">{img(p, "mp-cover", 2000, 1126, "Original Figma cover of the Mercado Play UX/UI challenge", zoom=True)}</div>
      <figcaption><b>The original cover</b>, exported from Figma. The one at the top of this page is rebuilt in code.</figcaption></figure>""", "cover")
body += chapter("The full challenge", f"""      <h2>Everything else lives in the file.</h2>
      <div class="prose"><p>The complete exercise, from the brief to the final screens, is in Figma.</p></div>
      <div class="btns"><a class="btn" href="{FIGMA}" target="_blank" rel="noopener">Open the challenge in Figma {arrow()}</a></div>""", "challenge")
body += next_row("batech.html", "Batech AI Platform")

page = (head("Mercado Play Case Study", "UX/UI challenge for Mercado Play, Mercado Libre's free streaming service. By Julián Gerardi.", p)
        + SPRITE + nav(p, on_home=False) + '\n<main class="shell" id="main">\n' + body + footer(p)
        + '  <div class="row shell-end" aria-hidden="true"></div>\n</main>\n' + tail(p, lightbox=True))
open(os.path.join(ROOT, "work", "mercado-play.html"), "w").write(page)
print("mercado-play ok", len(page))
