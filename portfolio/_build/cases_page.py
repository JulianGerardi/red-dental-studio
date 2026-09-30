from common import *
import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")

p = "../"
APP = "https://juliangerardi.github.io/red-dental-studio/#/patients/patient-0001"
DS = "https://juliangerardi.github.io/red-dental-studio/storybook/?path=/docs/welcome--docs"
BUILDER = "https://juliangerardi.github.io/red-dental-studio/storybook/?path=/docs/builder--docs"
GRILL_EMP = "https://claude.ai/code/artifact/b8691278-bb38-469f-89b1-a323dd661d5d"
GRILL_TEAM = "https://claude.ai/code/artifact/44a2be1f-d2b3-462a-acbd-382cd5c76347"


def fig(name, w, h, title, alt, cap="", kind="soft"):
    c = f"<figcaption>{cap}</figcaption>" if cap else ""
    k = "" if kind == "soft" else f" panel--{kind}"
    return f'<figure class="shot"><div class="panel{k}">{mock(p, name, w, h, title, alt=alt, zoom=True)}</div>{c}</figure>'


def phones(names, kind, alts):
    ph = "".join(phone(p, n, a) for n, a in zip(names, alts))
    return f'<figure class="shot"><div class="panel panel--{kind}"><div class="phones">{ph}</div></div></figure>'


def decision(title, text, figure):
    return f"""      <div class="decision">
        <div class="decision__head"><h3>{title}</h3><div class="prose">{text}</div></div>
        {figure}
      </div>
"""


def page(fn, title, desc, body, noindex=False):
    html = (head(title, desc, p, noindex) + SPRITE + nav(p, on_home=False) + '\n<main class="shell" id="main">\n' + body
            + footer(p) + '  <div class="row shell-end" aria-hidden="true"></div>\n</main>\n' + tail(p, lightbox=True))
    open(os.path.join(ROOT, "work", fn), "w").write(html)
    print(fn, len(html))


# ======================= Confidentally (NDA) =======================
b = case_head(
    "Confidentally", "Confidentally",
    "A dental practice platform, redesigned from the front desk to the dental chair and rebuilt as a prototype the whole team can click through.",
    [("Role", "Lead Product Designer"), ("Client", "Confidential · US"), ("Year", "2026"),
     ("Platform", "Responsive web app"), ("Scope", "Audit, UX, UI, prototype"), ("Tools", "Figma, Claude, React, Storybook")],
)
b += f"""  <section class="row"><div class="cell cell--flush">{cover_dental(p, "cover--hero", lazy=False, shot="d-clinical", title="Red Dental Studio · Clinical Mode")}</div></section>
  <section class="row" data-gate="nda-content" data-hash="dd113f6caa9a677a96e4c3a57f6dd18ea4a3e421f85fe9e4a70a3c2f9bd278fb">
    <div class="cell" style="padding-block:clamp(56px,8vw,96px)">
      <div class="gate">
        <span class="gate__icon"><svg aria-hidden="true"><use href="#i-lock"/></svg></span>
        <h2>This case study is under NDA</h2>
        <p>The client and product details are confidential. Enter the password to read the process, the decisions and every screen.</p>
        <form>
          <label class="sr-only" for="nda-password">Password</label>
          <input id="nda-password" name="password" type="password" autocomplete="current-password" placeholder="Password">
          <button class="btn" type="submit">Unlock case study</button>
        </form>
        <p class="gate__error" role="alert" aria-live="polite"></p>
        <p class="gate__ask">No password? Write to <span>{EMAIL}</span> and I’ll send it to you.</p>
      </div>
    </div>
  </section>
  <div id="nda-content" hidden>
"""
b += chapter("Overview", """      <h2>One product for everyone who works in a dental clinic.</h2>
      <div class="prose">
        <p>Confidentally is a practice-management platform for dental clinics. The front desk checks patients in and manages the waiting room, dentists chart teeth and plan treatments, and the billing team closes the day with insurance claims and patient balances.</p>
        <p>I led the redesign of the interface. Instead of stopping at Figma, I rebuilt the product as a <strong>working prototype with mock data</strong>, so every flow could be tried in a browser, and documented every piece in <strong>Confidentally UI</strong>, a design system that reads the same code.</p>
      </div>
      <div class="note"><svg aria-hidden="true"><use href="#i-info"/></svg><p>Everything shown here is my redesign running on invented data. No real patient, clinic or client information appears in this case study.</p></div>""", "overview")
b += chapter("The challenge", """      <h2>A product that grew module by module.</h2>
      <div class="prose"><p>Each area had been designed on its own. Screens didn’t share a grid, appointment cards were rewritten by hand in several places, and Spanish strings slipped into English modals. For people who keep the app open all day, those small breaks add up to slower work and more errors.</p></div>
      <p class="pull">One coherent system from the front desk to the dental chair, without slowing down anyone who already knows the product.</p>""", "challenge")
b += chapter("Approach", """      <h2>Audit first, then design, then build.</h2>
      <ol class="steps">
        <li><span class="steps__n">01</span><div><h3>Inventory the live product</h3><p>Every route of the production app mapped at 1440×900 and rated by complexity, from the login to the seven Clinical Mode modules.</p></div></li>
        <li><span class="steps__n">02</span><div><h3>Audit the Figma file, module by module</h3><p>Dashboard, Patients, Scheduling, Treatments, Documents and Relationships: <strong>44 anomalies</strong> logged and numbered so the team could cite them without ambiguity.</p></div></li>
        <li><span class="steps__n">03</span><div><h3>Agree on conventions</h3><p>Keep the Figma proportions with an 11px floor for text in cards, open two- and three-column grids at 1024px, fix what is visual and document the rest.</p></div></li>
        <li><span class="steps__n">04</span><div><h3>Rebuild it as a working prototype</h3><p>React, TypeScript and Tailwind on mock data, built with Claude as a pair. Real flows, such as booking an appointment with a treatment plan, can be tried in a browser.</p></div></li>
        <li><span class="steps__n">05</span><div><h3>Turn the result into a system</h3><p>Every button, card and screen went into Confidentally UI, with the reasons behind each decision and scripts that flag when the code drifts.</p></div></li>
      </ol>
      <h3 style="font-size:1rem;letter-spacing:-0.01em">A few of the 44 anomalies</h3>
      <div class="grid-cards">
        <div><b>#02 · Dashboard</b><span>The date picker shows 30-02-2026, a date that doesn’t exist.</span></div>
        <div><b>#08 · Dashboard</b><span>Type inside cards drops as low as 5.87px.</span></div>
        <div><b>#14 · Patients</b><span>Two different primary blues, #0056ef and #1d56bc.</span></div>
        <div><b>#21 · Scheduling</b><span>All seven calendar columns are labelled “THUR”.</span></div>
        <div><b>#34 · Documents</b><span>A banner says the patient is a minor; the profile says 50 years old.</span></div>
        <div><b>#42 · Relationships</b><span>No button on any screen leads to “Add Relationship”.</span></div>
      </div>""", "approach")
screens = decision("Dashboard: the day at a glance",
                   "<p>The front desk lives here. Appointments, the waiting room and the operatories sit side by side, and one date control drives appointments, the waiting room and tasks.</p><ul class=\"bullets\"><li><b>Stat strip</b> with appointments, people waiting and open encounters.</li><li><b>Signature banner</b> with a 1-of-4 pager instead of a stack of alerts.</li></ul>",
                   fig("d-dashboard", 1600, 1000, "Dashboard", "Dashboard with appointments, waiting room and operatories", kind="dental"))
screens += decision("Patient record",
                    "<p>The left panel keeps identity and the two actions that matter most, <strong>Start Encounter</strong> and <strong>Clinical Mode</strong>, in reach while tabs change on the right.</p><ul class=\"bullets\"><li><b>Clinical accordions</b> with counters, so allergies and medication show before they’re opened.</li><li><b>Pending tasks</b> such as referrals flag expired dates in context.</li></ul>",
                    fig("d-patient", 1600, 1000, "Patients · John Smith", "Patient record with side panel, clinical accordions, insurance and tasks"))
screens += decision("Clinical Mode",
                    "<p>A takeover without the app shell, because the dentist needs the whole screen. The odontogram sits at the center, with ten exams one tap away and the treatment plan to the left.</p><ul class=\"bullets\"><li><b>Last condition</b> callout on the chart, so the latest finding is never buried.</li></ul>",
                    fig("d-clinical", 1600, 1000, "Clinical Mode", "Clinical Mode with odontogram, treatment plan and problem list", kind="dental"))
screens += decision("Scheduling",
                    "<p>Day, week and month share one legend with seven appointment states. A new appointment is a two-step wizard, patient and time first and treatment plan second, with free slots in a side panel.</p><ul class=\"bullets\"><li><b>Patient in session</b>: a tab on the right edge of every screen lists today’s patients who haven’t finished.</li></ul>",
                    '<div class="pair">' + fig("d-scheduling", 1600, 1000, "Scheduling · Week", "Weekly calendar with appointments by status") + fig("d-patients", 1600, 1000, "Patients", "Patients list with search and status") + "</div>")
screens += decision("Billing and ledger",
                    "<p>Receivables split between what patients owe and what insurance carriers owe, with overdue balances apart. Payments and adjustments open as panels over the ledger.</p>",
                    '<div class="pair">' + fig("d-billing", 1600, 1000, "Billing", "Billing overview with receivables", kind="dental") + fig("d-ledger", 1600, 1000, "Ledger", "Patient ledger with transactions", kind="dental") + "</div>")
screens += decision("Notifications with a “pending” state",
                    "<p>The inbox follows Notion’s logic: inbox, unread and archived, grouped by date, with bulk actions. I added <strong>pending</strong> because here notifications are tasks: sign a consent, confirm an appointment, verify an insurance plan.</p>",
                    fig("d-notifications", 1600, 1000, "Notifications", "Notifications inbox with pending state"))
b += chapter("Key screens", "      <h2>Designed around the moment each person is in.</h2>\n" + screens, "screens")
b += chapter("Mobile", "      <h2>The same product in a dentist’s pocket.</h2>\n      <div class=\"prose\"><p>Every screen is responsive. On a phone the patient menu turns into horizontal tabs and panels stack in the order a clinician reads them.</p></div>\n      "
             + phones(["d-m-dashboard", "d-m-patient", "d-m-scheduling"], "dental", ["Dashboard on a phone", "Patient record on a phone", "Scheduling on a phone"]), "mobile")
b += chapter("Design system", "      <h2>Confidentally UI keeps the redesign from drifting.</h2>\n      <div class=\"prose\"><p>The design system reads the app’s own components: change a token in code and the docs change with it. It has its own case study.</p></div>\n      "
             + fig("ds-welcome", 1600, 1000, "Confidentally UI", "Design system home with search", kind="ds")
             + f'\n      <div class="btns"><a class="btn btn--ghost" href="confidentally-ui.html">Read the design system case study {arrow()}</a></div>', "system")
b += chapter("Outcome", f"""      <h2>A product the team can open, click and build from.</h2>
      <div class="numbers">
        <div><b>32</b><span>screens working in the browser</span></div>
        <div><b>139</b><span>documented pieces</span></div>
        <div><b>481</b><span>live examples</span></div>
        <div><b>44</b><span>anomalies found and cited</span></div>
      </div>
      <div class="prose"><p>Developers get components that already exist in code, product gets a prototype to test with clinics, and design gets one place where every decision is written down.</p></div>
      <div class="btns"><a class="btn" href="{APP}" target="_blank" rel="noopener">Open the prototype {arrow()}</a><a class="btn btn--ghost" href="{DS}" target="_blank" rel="noopener">Open the design system {arrow()}</a></div>""", "outcome")
b += "  </div>\n" + next_row("confidentally-ui.html", "Confidentally UI")
page("confidentally.html", "Confidentally Case Study", "Redesign of a dental practice platform. Case study by Julián Gerardi.", b, noindex=True)


# ======================= Confidentally UI =======================
b = case_head(
    "Confidentally UI", "Confidentally UI",
    "A living design system: every button, table and screen of the app, working and explained, plus a Builder that assembles new screens from the real components.",
    [("Role", "Design system lead"), ("Product", "Confidentally"), ("Year", "2026"),
     ("Built with", "Storybook, React, Tailwind"), ("AI", "Gemini API, optional"), ("Scope", "Tokens, docs, audit, builder")],
    links=f'<a class="btn" href="{DS}" target="_blank" rel="noopener">Open the design system {arrow()}</a><a class="btn btn--ghost" href="{BUILDER}" target="_blank" rel="noopener">Try the Builder {arrow()}</a>',
)
b += f"""  <section class="row"><div class="cell cell--flush">{cover_ds(p, "cover--hero", lazy=False, shot="ds-builder-built", title="Confidentally UI · Builder")}</div></section>
"""
b += chapter("Overview", """      <h2>Documentation that can’t fall out of date.</h2>
      <div class="prose">
        <p>Most design systems are a copy of the product that someone has to keep in sync. Confidentally UI isn’t. Storybook imports the same components the app uses, the colors page parses the app’s stylesheet, and the Pages section mounts the real routes. <strong>When the code changes, the documentation changes with it.</strong></p>
        <p>I hid Storybook’s own chrome and designed a documentation site on top: a top bar with six sections, a search, a menu per section and the same page layout for every component.</p>
      </div>
      <div class="numbers">
        <div><b>139</b><span>pieces</span></div>
        <div><b>32</b><span>screens</span></div>
        <div><b>481</b><span>live examples</span></div>
        <div><b>174</b><span>documentation pages</span></div>
      </div>""", "overview")
b += chapter("The problem", """      <h2>The same thing, built several ways.</h2>
      <div class="prose"><p>Screen titles came in at 20, 24 and 36px. The appointment card of the patient overview was written by hand, and the calendar one was repeated three times in the same file. Colors were typed as hex values instead of tokens. Designers and developers needed one answer to the same question: <strong>which one do I use?</strong></p></div>""", "problem")
b += chapter("Structure", """      <h2>From the smallest decision to the whole screen.</h2>
      <ol class="steps">
        <li><span class="steps__n">01</span><div><h3>Foundations</h3><p>Colors, typography, radius and shadows, read from the app’s CSS, each token with its light and dark value.</p></div></li>
        <li><span class="steps__n">02</span><div><h3>Elements</h3><p>Ten standard pieces: page header, buttons, fields, tabs, pills, cards, appointment cards, tables, navigation and the patient menu.</p></div></li>
        <li><span class="steps__n">03</span><div><h3>Components</h3><p>128 pieces by module: Clinical 39, UI 20, Dashboard 12, Patients 12, Ledger 11, Settings 11, Scheduling 9, Layout 8, Help 5, Billing 1.</p></div></li>
        <li><span class="steps__n">04</span><div><h3>Pages</h3><p>Every route of the app, mounted from the same router.</p></div></li>
        <li><span class="steps__n">05</span><div><h3>Audit</h3><p>What the code does today that departs from the standard, measured by scripts.</p></div></li>
        <li><span class="steps__n">06</span><div><h3>Builder</h3><p>Where the pieces come together into new screens, by hand or described in words.</p></div></li>
      </ol>
      """ + fig("ds-components", 1600, 1000, "Components", "Components overview grouped by module", kind="ds"), "structure")
b += chapter("A component page", """      <h2>Three questions answered before anyone scrolls.</h2>
      <div class="prose"><p>Every page follows the same order: breadcrumb, name, one sentence, and Overview, Guidelines and Code tabs. Three status cards answer what a team asks first:</p>
      <ul class="bullets"><li><b>Component · Ready</b> when it has a playground and documented decisions.</li><li><b>Usage</b> counted in the code, such as “Used in 10 files”.</li><li><b>Design</b> with the decisions behind it, under “Why it looks like this”.</li></ul>
      <p>Specs are measured from the rendered component, not typed by hand.</p></div>
      """ + fig("ds-buttons", 1600, 1000, "Elements · Buttons", "Buttons documentation page with status cards"), "anatomy")
b += chapter("Designed from the code", """      <h2>I measured the button before I designed it.</h2>
      <div class="pair">
        <div class="prose"><p>Each variant, <strong>primary, secondary, ghost, link and destructive</strong>, is the look the code already used most for that kind of action. The sizes, <strong>28, 32 and 36px</strong>, are the three heights the app used most. Hover, pressed, focus, disabled and loading are solved once, in one component.</p></div>
        <div class="prose"><p>The same logic shaped the <strong>appointment cards</strong>: one appointment appears in four places, and each place gets the card that serves it. Same patient, same time, same status.</p></div>
      </div>
      """ + fig("ds-appt-cards", 1600, 1000, "Elements · Appointment cards", "Appointment cards documentation page", kind="ds"), "from-code")
b += chapter("Search", f"""      <h2>Search in the words people actually use.</h2>
      <div class="pair" style="align-items:center">
        <div class="prose"><p>The search reads names, descriptions, examples and Spanish synonyms. Typing <strong>“turno”</strong> finds every appointment component, even though none of them is called that in the code.</p><p>Starting points sit under the search box, and a strip of 18 real pieces invites people to explore by clicking.</p></div>
        <figure class="shot"><div class="panel panel--ds">{img(p, "ds-crop-search", 1100, 891, "Search results for the word turno", zoom=True)}</div></figure>
      </div>""", "search")
b += chapter("Builder with AI", """      <h2>Describe a screen, get it built with the real components.</h2>
      <div class="prose">
        <p>The Builder assembles screens from the app’s own components on a canvas that starts with the real sidebar and top bar. <strong>Layers</strong> shows the tree, <strong>Code</strong> gives the TSX with its imports, <strong>PNG</strong> exports the design and <strong>Share link</strong> compresses it into the URL, with nothing uploaded to a server.</p>
        <p><strong>Describe</strong> goes further: write “a patients screen with metrics, the table and today’s appointments on the right”, and it searches 379 pieces and 33 blocks and builds the screen block by block.</p>
        <ul class="bullets">
          <li><b>With a free Gemini key</b>, the model streams its reasoning and can only answer with pieces from the catalog.</li>
          <li><b>Without a key</b>, a parser splits the sentence and recognizes about 45 kinds of data for fields.</li>
          <li><b>Every result can be undone</b>, and each block keeps its alternatives.</li>
          <li><b>A privacy note</b> asks people not to type real patient data.</li>
        </ul>
      </div>
      """ + fig("ds-builder-built", 1600, 1000, "Builder · Describe", "Builder after describing a patients screen", "<b>Describe, without AI.</b> The sentence became a Patients screen with stats, the table and today’s appointments.", kind="ds"), "builder")
b += chapter("Governance", """      <h2>The system tells you when the code drifts.</h2>
      <div class="prose"><ul class="bullets">
        <li><b>Audit pages</b> list colors without a token, pieces written outside the components, duplicates and missing states.</li>
        <li><b>In CI</b>, a check reports hard-coded colors that already have a token.</li>
        <li><b>Headers in the app</b> detects which header each screen uses and flags the ones that differ.</li>
      </ul></div>
      <div class="pair">""" + fig("ds-audit", 1600, 1000, "Audit", "Audit overview") + fig("ds-colors", 1600, 1000, "Foundations · Colors", "Color tokens with light and dark values") + "</div>", "governance")
b += chapter("Outcome", f"""      <h2>One answer to “which one do I use?”</h2>
      <div class="prose"><p>Published next to the app, updated from the code, and shared by design, development and product. The Builder turns it into a tool: a new screen starts from real components instead of a blank frame.</p></div>
      <div class="btns"><a class="btn" href="{DS}" target="_blank" rel="noopener">Open the design system {arrow()}</a><a class="btn btn--ghost" href="confidentally.html">Read the product case study</a></div>""", "outcome")
b += next_row("grill.html", "GRILL Empresas")
page("confidentally-ui.html", "Confidentally UI Case Study", "A living design system with search and an AI Builder. Case study by Julián Gerardi.", b)


# ======================= GRILL =======================
b = case_head(
    "GRILL Empresas", "GRILL Empresas",
    "Lunch for companies, ordered from the phone. Two connected web apps for a kitchen in Mercedes: one for the people who eat, one for the team that cooks.",
    [("Role", "Product designer, UX/UI"), ("Client", "GRILL · Mercedes, AR"), ("Year", "2026"),
     ("Platform", "Mobile web + desktop panel"), ("Language", "Rioplatense Spanish"), ("Tools", "Figma, Claude, React")],
    links=f'<a class="btn" href="{GRILL_EMP}" target="_blank" rel="noopener">Try the employee app {arrow()}</a><a class="btn btn--ghost" href="{GRILL_TEAM}" target="_blank" rel="noopener">Try the kitchen panel {arrow()}</a>',
    note="Demo: sign in with any email and password.",
)
b += f"""  <section class="row"><div class="cell cell--flush">{cover_grill(p, "cover--hero", lazy=False)}</div></section>
"""
b += chapter("Overview", """      <h2>A kitchen that feeds whole offices, one tray at a time.</h2>
      <div class="prose">
        <p>GRILL is a kitchen in Mercedes, Buenos Aires that delivers lunch to companies. Each company covers a daily amount per employee and pays at the end of the month; each employee chooses what they eat.</p>
        <p>I designed both sides of the service and built them as working web apps with an AI-assisted workflow: <strong>GRILL Empresas</strong> for employees and <strong>GRILL Team</strong>, the panel the kitchen runs the day from.</p>
      </div>""", "overview")
b += chapter("The problem", """      <h2>Everything lived on paper and in WhatsApp.</h2>
      <div class="prose"><p>Kitchen tickets, orders per company, new employee accounts and the monthly account closing. Every day the team gathers choices, counts dishes, labels trays, plans the delivery run and keeps each company’s account, all before 11:30.</p></div>
      <p class="pull">Make ordering take less than a minute, and turn the kitchen’s morning into a checklist.</p>""", "problem")
b += chapter("Two users", """      <h2>Same orders, two very different mornings.</h2>
      <div class="grid-cards">
        <div><b>EMPLOYEE · PHONE</b><span><strong>A minute between meetings, before the cutoff.</strong> When is the next delivery, what does the kitchen suggest, how much does the company cover, which side dish.</span></div>
        <div><b>KITCHEN TEAM · DESKTOP</b><span><strong>The whole morning, hands busy.</strong> How many of each dish, a label for every tray, the delivery run by company, and what to bill each one.</span></div>
      </div>""", "users")
emp = decision("The cutoff comes first",
               "<p>The screen opens on the next delivery date and a countdown to the 10:30 cutoff. When today’s cutoff has passed, a banner says the order goes to the next delivery and can be changed until 10:30 that day.</p><ul class=\"bullets\"><li><b>A short selection first</b>, and the full menu one link away.</li><li><b>The allowance always visible</b>: the company covers up to $11,000 a day.</li></ul>",
               fig("g-emp-app", 1600, 1000, "GRILL Empresas · Pedido del día", "Order of the day with next delivery, cutoff countdown and the kitchen selection", kind="grill"))
emp += decision("Choosing is one step",
                "<p>Tapping a dish opens a sheet to pick the side and leave a note for the kitchen, up to 140 characters. The button carries the price, so there’s no surprise at checkout. The full menu has <strong>59 dishes in 9 categories</strong>, filtered by gluten-free and vegetarian.</p>",
                phones(["g-emp-m-app", "g-emp-m-modal", "g-emp-m-carta"], "grill", ["Order of the day on a phone", "Side dish sheet on a phone", "Full menu on a phone"]))
emp += decision("History and dark mode",
                "<p><strong>My orders</strong> shows the week or month day by day, with a summary to download. The app has a dark theme, and the copy talks the way people in Mercedes do: “Elegí”, “Tocá”, “¿La olvidaste?”.</p>",
                '<div class="pair">' + fig("g-emp-historial", 1600, 1000, "Mis pedidos", "Order history by week") + fig("g-emp-dark-app", 1600, 1000, "Pedido del día · dark", "Order of the day in dark mode") + "</div>")
b += chapter("Employee app", "      <h2>Order lunch in a few taps.</h2>\n" + emp, "employees")
kit = decision("Summary of the day",
               "<p>Units, orders and companies at the top with the departure time; below, one card per job of the morning and the alerts still to resolve.</p>",
               fig("g-corp-hoy", 1600, 1000, "GRILL Team · Resumen", "Summary of the day with units, orders and companies", kind="grill"))
kit += decision("Kitchen ticket",
                "<p>Every order added up by dish and side, grouped by category, with a checkbox to tick as each one is cooked. It prints as the day’s ticket.</p>",
                fig("g-corp-dark-cocina", 1600, 1000, "Cocina · Comanda del día", "Kitchen ticket with aggregated quantities in dark mode"))
kit += decision("Labels that fit the real sheet",
                "<p>Each tray gets a label on a sheet of <strong>70 × 25.4 mm</strong> labels. “Start from” reuses a half-used sheet by tapping the first free cell, and a note reminds the team to print at real size so labels don’t shift off the die cut.</p>",
                fig("g-corp-etiquetas", 1600, 1000, "Etiquetas · Pliego del día", "Label sheet with start-from selector", kind="grill"))
kit += decision("Delivery, orders and accounts",
                "<ul class=\"bullets\"><li><b>Delivery</b>: stops by company, trays per person and a checklist per stop.</li><li><b>Orders</b>: totals to invoice for any period and status.</li><li><b>Companies and employees</b>: a registration code per company; block accounts or make someone admin.</li></ul>",
                '<div class="pair">' + fig("g-corp-reparto", 1600, 1000, "Reparto", "Delivery run grouped by company") + fig("g-corp-pedidos", 1600, 1000, "Pedidos", "Orders for the period with amount to invoice") + "</div>")
b += chapter("Kitchen panel", "      <h2>The kitchen’s morning, as a checklist.</h2>\n" + kit, "kitchen")
b += chapter("Access", """      <h2>Two doors, each one explained.</h2>
      <div class="prose"><p>Employees don’t sign up on their own: their company creates the account. The login says so, tells them who to ask and offers companies a proposal. The kitchen has its own internal entrance, with a link back for employees who land there by mistake.</p></div>
      <div class="pair">""" + fig("g-emp-login", 1600, 1000, "GRILL Empresas · Ingresar", "Employee login", kind="grill") + fig("g-corp-login", 1600, 1000, "GRILL Team · Acceso interno", "Internal login for the kitchen panel", kind="grill") + "</div>", "access")
b += chapter("Outcome", """      <h2>Two apps, one language.</h2>
      <div class="numbers">
        <div><b>2</b><span>connected apps</span></div>
        <div><b>12</b><span>screens</span></div>
        <div><b>59</b><span>dishes in the menu</span></div>
        <div><b>2</b><span>themes, light and dark</span></div>
      </div>
      <div class="prose"><p>Both apps share the GRILL wordmark, the lime accent and the same components, so the kitchen and its clients read the same order the same way.</p></div>""", "outcome")
b += next_row("batech.html", "Batech AI Platform")
page("grill.html", "GRILL Empresas Case Study", "Corporate lunch ordering for a kitchen in Mercedes, Buenos Aires. Case study by Julián Gerardi.", b)
