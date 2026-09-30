from common import *
import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")

p = ""
BRANDS = ["Batech", "Icarus Digital Marketing", "Bahco", "Datachain Summit", "Blue CP Construction",
          "Azure Printed Homes", "Gloob Marketing", "Cuponstar", "Vieja Cubana", "GRILL"]


def project(href, cover, title, year, desc, badges, external=False, extra=""):
    tgt = ' target="_blank" rel="noopener"' if external else ""
    b = "".join(badges)
    return f"""        <a class="cell spot project{extra}" href="{href}"{tgt}>
          {cover}
          <div class="project__meta">
            <div class="project__top"><h3>{title} {arrow()}</h3><span class="mono muted">{year}</span></div>
            <p>{desc}</p>
            <div class="badges">{b}</div>
          </div>
        </a>
"""


def badge(t):
    return f'<span class="badge">{t}</span>'


NDA = '<span class="badge badge--nda"><svg aria-hidden="true"><use href="#i-lock"/></svg>NDA · password</span>'

marquee = "".join(f"<li>{b}</li>" for b in BRANDS)

XP = [
    ("May 2025 — Now", "Lead UX/UI Designer", "Confidential company · AI product, pre-launch · Miami, US",
     "<p>End-to-end design of an AI-assisted product, from information architecture and journeys to a functional web-app prototype built with Figma and Claude.</p><p>Running research and usability testing, and leading the pre-launch validation stage with the development team.</p>"),
    ("Nov 2023 — Nov 2025", "Senior UX/UI Designer", "Icarus Digital Marketing · Ireland · Remote",
     "<p>Led a digital platform from idea to launch: research, usability testing, flows and a UI redesign focused on reducing abandonment.</p><p>Managed the creative team. The refreshed identity drove a <b>20% rise in brand recognition</b>.</p>"),
    ("Feb 2022 — May 2026", "Lead UX/UI Designer", "Batech · Querétaro, MX · Remote",
     "<p>Designed Batech’s AI video analytics platform end to end and revamped web and mobile flows with analytics and A/B testing to cut abandonment.</p><p>Built the Figma design system and led the design team to <b>10% faster delivery</b>; content drove <b>+25% social engagement</b>.</p>"),
    ("Aug 2019 — Oct 2023", "Digital Designer", "Freelance &amp; contract · US, Mexico, Argentina",
     "<p><b>Datachain Summit</b>: identity redesign (+25% recognition) and a delivery process 40% faster. <b>Blue CP Construction</b>: +40% engagement in 3 months.</p><p>Also Azure Printed Homes, Gloob Marketing and Cuponstar.</p>"),
    ("Jan 2019 — Mar 2022", "Co-founder &amp; CEO", "Vieja Cubana · Mercedes, AR",
     "<p>Digital strategy behind online revenue; creative team delivering <b>15% faster</b> with <b>+25% client referrals</b>.</p>"),
    ("Jul 2018 — Jul 2025", "Senior Digital Designer", "Bahco Argentina · Buenos Aires · Remote",
     "<p>Graphic communication for <b>5 Latin American markets</b> and the brand refresh behind a <b>20% rise in recognition</b>.</p>"),
    ("May 2016 — Oct 2016", "Trainee Graphic Designer", "Orsonia Interactive Ideas · Buenos Aires",
     "<p>Campaigns and content for Amdia, Adblick and Bisblick.</p>"),
]
xp = "".join(f"""      <li class="xp__item">
        <span class="xp__when">{w}</span>
        <div><div class="xp__role">{r}</div><div class="xp__org">{o}</div></div>
        <div class="xp__notes">{n}</div>
      </li>
""" for w, r, o, n in XP)

page = head("Julián Gerardi",
            "Julián Gerardi, Senior Product Designer. SaaS products designed end to end, from research to design systems and working prototypes built with AI.") + SPRITE + nav(p) + f"""
<div class="shell" id="main">
  <section class="row row--plain hero">
    <div class="hero__lines" aria-hidden="true"></div>
    <div class="hero__glow" aria-hidden="true"></div>
    <div class="hero__inner">
      <div class="who rise" style="--d:0s">
        <span class="who__avatar" aria-hidden="true">JG</span>
        <span class="who__text"><b>Julián Gerardi</b><span>Senior Product Designer</span></span>
        <span class="status"><i aria-hidden="true"></i>Open to remote roles</span>
      </div>
      <h1 class="hero__title split">Designing SaaS products <span class="dim">from the first interview to a prototype you can click.</span></h1>
      <p class="hero__sub rise" style="--d:.55s">Lead UX/UI designer for B2B and B2C teams in the United States, Mexico, Ireland and Latin America. Research, flows, design systems and high-fidelity UI, with an AI-assisted workflow that turns ideas into working web apps.</p>
      <div class="btns hero__ctas rise" style="--d:.7s">
        <a class="btn" href="#work">View work {arrow()}</a>
        <a class="btn btn--ghost" href="#contact">Get in touch</a>
      </div>
    </div>
  </section>

  <section class="row">
    <div class="cells stats">
      <div class="cell stat"><b>8+</b><span>years designing products and brands</span></div>
      <div class="cell stat"><b>4</b><span>countries: US, Mexico, Ireland, Argentina</span></div>
      <div class="cell stat"><b>5</b><span>Latin American markets for Bahco</span></div>
      <div class="cell stat"><b>10%</b><span>faster delivery leading Batech’s design team</span></div>
    </div>
  </section>

  <section class="row" aria-label="Teams and brands I have worked with">
    <div class="marquee"><div class="marquee__row">
      <ul class="marquee__list">{marquee}</ul>
      <ul class="marquee__list" aria-hidden="true">{marquee}</ul>
    </div></div>
  </section>

  <section class="row" id="work">
    <div class="cell section-head reveal">
      <div><div class="label">Selected work</div><h2>Products designed end to end, most of them shipped as working prototypes.</h2></div>
      <p>Five projects from 2022 to 2026: an AI video platform, a dental SaaS and its design system, a food-service app and a UX challenge.</p>
    </div>
  </section>
  <section class="row">
    <div class="cells projects">
{project("work/batech.html", cover_batech(p, "cover--wide", lazy=False), "Batech AI Platform", "2022 — 2026",
         "Computer-vision analytics for retail branches: camera events, geofences drawn on live video, operational times and an AI assistant that answers questions about every store.",
         [badge("AI"), badge("Computer vision"), badge("Dashboard"), badge("Lead UX/UI")], extra=" cell--span")}
{project("work/confidentally.html", cover_dental(p), "Confidentally", "2026",
         "Redesign of a dental practice platform, from the front desk to the dental chair, rebuilt as a working prototype.",
         [NDA, badge("SaaS"), badge("Healthcare")])}
{project("work/confidentally-ui.html", cover_ds(p), "Confidentally UI", "2026",
         "A living design system that reads the app’s own code, with search and a Builder that assembles screens with AI.",
         [badge("Design system"), badge("Storybook"), badge("AI builder")])}
{project("work/grill.html", cover_grill(p), "GRILL Empresas", "2026",
         "Corporate lunch ordering: employees pick the day’s meal on their phone, and the kitchen runs tickets, labels and delivery from one panel.",
         [badge("Food service"), badge("Mobile first"), badge("Two apps")])}
{project("https://www.figma.com/design/MTQT0AwdScSnoRK3m3SHeB/Challenge%E2%80%94UX-UI?node-id=11-544", cover_mp(), "Mercado Play", "2026",
         "UX/UI challenge for Mercado Libre’s free streaming service. The cover is rebuilt in code; the full exercise opens in Figma.",
         [badge("Streaming"), badge("Challenge"), badge("Figma")], external=True)}
    </div>
  </section>

  <section class="row" id="process">
    <div class="cell section-head reveal">
      <div><div class="label">Process</div><h2>How a project moves from question to shipped product.</h2></div>
      <p>The stages stay the same from project to project. What changes is how long each one takes.</p>
    </div>
  </section>
  <section class="row">
    <ol class="cells process">
      <li class="cell spot"><span class="process__n">01</span><h3>Research</h3><p>Interviews, usability tests and analytics, plus an audit of screens, components and the rules nobody wrote down.</p></li>
      <li class="cell spot"><span class="process__n">02</span><h3>Structure</h3><p>Information architecture, user flows and journeys. Navigation is agreed before any pixel.</p></li>
      <li class="cell spot"><span class="process__n">03</span><h3>Design</h3><p>High-fidelity UI in Figma on a design system and component library shared by web and mobile.</p></li>
      <li class="cell spot"><span class="process__n">04</span><h3>Prototype</h3><p>Functional web-app prototypes built with Claude and Cursor, so stakeholders test the real flow.</p></li>
      <li class="cell spot"><span class="process__n">05</span><h3>Validate &amp; ship</h3><p>Usability testing, A/B tests and KPIs, then handoff with developers on technical feasibility.</p></li>
    </ol>
  </section>
  <section class="row">
    <div class="cell tools" style="padding-block:20px">
      <span class="mono muted" style="margin-right:6px">TOOLKIT</span>
      {''.join(badge(t) for t in ["Figma", "Claude", "Cursor", "Gemini", "Midjourney", "Freepik Spaces", "Storybook", "Photoshop", "Illustrator", "InDesign"])}
    </div>
  </section>

  <section class="row" id="experience">
    <div class="cell section-head reveal">
      <div><div class="label">Experience</div><h2>Ten years between product, brand and teams.</h2></div>
      <p>2016 to today, remote for teams in four countries.</p>
    </div>
  </section>
  <section class="row">
    <ol class="xp" style="margin-top:-1px">
{xp}    </ol>
  </section>

  <section class="row" id="about">
    <div class="cells about">
      <div class="cell about__bio reveal">
        <div class="label">About</div>
        <p>I trained as an art director, so I care how a product looks. Years of SaaS work taught me to care more about how it behaves on a busy Tuesday.</p>
        <p>I lead product design from research and information architecture to design systems, high-fidelity UI and interactive prototypes, and I measure the result with analytics and A/B testing.</p>
        <p>My workflow runs through AI: Claude and Cursor to build functional prototypes, Midjourney and Freepik Spaces to explore visual directions. A small team can test more ideas with real users before committing to one.</p>
      </div>
      <div class="cell reveal">
        <div class="list"><h3>Education</h3><ul>
          <li>Bachelor’s in Advertising Art Direction, Universidad de Palermo <span>2011–16</span></li>
          <li>Advertising Creative Technician, Universidad de Palermo <span>2011–14</span></li>
          <li>UX/UI Design Program, Coderhouse <span>2019</span></li>
        </ul></div>
        <div class="list"><h3>Awards &amp; talks</h3><ul>
          <li>Speaker, XII Latin American Design Meeting <span>Talk</span></li>
          <li>Creativity Award, Imágenes Creativas <span>Award</span></li>
          <li>Award, Universidad de Palermo <span>Award</span></li>
          <li>“Mundos digitales”, Jueves de Networking DC <span>Interview</span></li>
        </ul></div>
        <div class="list"><h3>Languages</h3><ul>
          <li>Spanish <span>Native</span></li>
          <li>English <span>Full professional</span></li>
          <li>Italian <span>Professional working</span></li>
        </ul></div>
      </div>
    </div>
  </section>

  <section class="row contact" id="contact">
    <div class="hero__glow" aria-hidden="true"></div>
    <div class="contact__inner reveal">
      <div class="label">Contact</div>
      <h2>Let’s build something people want to use.</h2>
      <p>Open to senior and lead product design roles, remote, and to freelance projects.</p>
      <span class="copy"><span data-copy-text>{EMAIL}</span><button type="button" data-copy="{EMAIL}">Copy</button></span>
      <div class="btns" style="justify-content:center">
        <a class="btn" href="{LINKEDIN}" target="_blank" rel="noopener">LinkedIn {arrow()}</a>
        <a class="btn btn--ghost" href="{BEHANCE}" target="_blank" rel="noopener">Behance {arrow()}</a>
      </div>
    </div>
  </section>

{footer(p)}  <div class="row shell-end" aria-hidden="true"></div>
</div>
""" + tail(p)

open(os.path.join(ROOT, "index.html"), "w").write(page)
print("index ok", len(page))
