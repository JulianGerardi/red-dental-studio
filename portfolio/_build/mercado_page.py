from common import *
from scenes import rise, story, wipe, scrub, dev_piece
from mockups import ICO
import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")

p = "../"
FN = "mercado-play.html"
FIGMA = "https://www.figma.com/design/MTQT0AwdScSnoRK3m3SHeB/Challenge---UX-UI?node-id=11-544"


def win(name, w, h, cap_en="", cap_es="", ae="", as_="", view="", maxw=""):
    """A Mercado Play screen in a Safari window on the soft yellow of the brand."""
    c = f"<figcaption>{T(cap_en, cap_es)}</figcaption>" if cap_en else ""
    st = f' style="max-width:{maxw}"' if maxw else ""
    return (f'<figure class="shot" data-reveal><div class="panel bg--mp mpwin"><div class="mpwin__in"{st}>'
            f'{browser(p, name, w, h, "play.mercadolibre.com", dark=True, alt_en=ae, alt_es=as_, view=view)}</div></div>{c}</figure>')


def scroll_mock(name, w, h, title, ae, as_, kind="mp", ce="", cs=""):
    """A long page inside a browser window that scrolls itself, top to bottom."""
    c = f"<figcaption>{T(ce, cs)}</figcaption>" if ce else ""
    return (f'<figure class="shot" data-reveal><div class="panel panel--{kind}"><div class="mock mock--dark mock--scroll">'
            f'<div class="mock__bar"><i></i><i></i><i></i><span>{title}</span></div>'
            f'<div class="mock__view">{screen(p, name, w, h, ae, as_, zoom=True)}</div></div></div>{c}</figure>')


def pages(items, kind="mp-dark", ce="", cs=""):
    """Whole long pages side by side, nothing cut."""
    c = f"<figcaption>{T(ce, cs)}</figcaption>" if ce else ""
    cols = "".join(f'<div class="pages__col"><div class="mock mock--dark"><div class="mock__bar"><i></i><i></i><i></i></div>{screen(p, n, w, h, ae, as_, zoom=True)}</div><p>{T(le, ls)}</p></div>'
                   for n, w, h, ae, as_, le, ls in items)
    return f'<figure class="shot" data-reveal><div class="panel panel--{kind}"><div class="pages">{cols}</div></div>{c}</figure>'


def kit(items, ce="", cs=""):
    c = f"<figcaption>{T(ce, cs)}</figcaption>" if ce else ""
    cells = "".join(f'<div class="kit__item"><div class="kit__piece" style="--w:{pw}px">{screen(p, n, w, h, ae, as_, zoom=True)}</div><span>{T(le, ls)}</span></div>'
                    for n, w, h, pw, ae, as_, le, ls in items)
    return f'<figure class="shot" data-reveal><div class="panel panel--mp-dark"><div class="kit">{cells}</div></div>{c}</figure>'


QUOTES = [
    ("Tengo una conversación de WhatsApp conmigo misma para anotar todas las películas que me recomiendan mis compañeros de trabajo, así después puedo verlas en Meli Play.",
     "I keep a WhatsApp chat with myself to note down every film my co-workers recommend, so I can watch them on Meli Play later.", "Carla Gallardo", 21, "a"),
    ("Nunca me guío por las recomendaciones de los críticos de cine o por las opiniones de quienes no conozco.",
     "I never go by film critics’ recommendations or the opinions of people I don’t know.", "Virginia Lopez", 40, "a"),
    ("A veces la crítica puede ser útil, pero siempre prefiero formarme mi propia opinión sobre una película.",
     "Reviews can help sometimes, but I always prefer to make up my own mind about a film.", "Javier Torres", 32, "o"),
    ("Mi papá siempre se olvida el nombre de las series que me quiere recomendar, y termino teniendo que buscar los títulos o los actores en Google.",
     "My dad always forgets the names of the shows he wants to recommend, and I end up searching the titles or the actors on Google.", "Roberto Castro", 60, "o"),
    ("La tecnología no es mi fuerte. Cuando abro Meli Play, me gustaría tener un lugar con los contenidos destacados por mi familia.",
     "Technology isn’t my thing. When I open Meli Play, I’d like a place with the titles my family highlighted.", "Andres Zunino", 30, "o"),
    ("Creo que lo mejor es ver el tráiler y decidir si la película me atrae personalmente.",
     "I think the best thing is to watch the trailer and decide whether the film appeals to me.", "Laura Gómez", 64, "a"),
]
quotes = '      <div class="quotes">' + "".join(
    f'<blockquote class="quote" data-reveal style="--k:{i % 3}"><span class="quote__at">@MercadoPlay</span>'
    f'<p>{T(en, es)}</p><footer><b>{name}</b> · {T(f"{age}", f"{age} años")}{T(" · Mercado Play user", f" · Usuari{g} de Mercado Play")}</footer></blockquote>'
    for i, (es, en, name, age, g) in enumerate(QUOTES)) + "</div>\n"

BENCH_COLS = [("Service", "Tipo de servicio"), ("Business model", "Modelo de negocio"), ("Catalogue", "Catálogo"), ("Audience", "Público objetivo"),
              ("Differentiator", "Diferenciador"), ("Onboarding", "Onboarding"), ("UX strengths", "Fortalezas UX"), ("UX weaknesses", "Debilidades UX")]
BENCH = [
    ("Mercado Play", [("Integrated streaming", "Streaming integrado"), ("Free with ads", "Gratis con publicidad"), ("Medium", "Medio"), ("Mercado Libre users", "Usuarios de Mercado Libre"),
                      ("E-commerce integration", "Integración con ecommerce"), ("Very low friction (existing Mercado Libre account)", "Muy baja fricción (cuenta existente de Mercado Libre)"),
                      ("Instant access, part of the ecosystem", "Acceso inmediato, integrado al ecosistema"), ("Smaller catalogue, limited recommendations", "Catálogo menor, recomendaciones limitadas")]),
    ("Netflix", [("Premium streaming", "Streaming premium"), ("Subscription", "Suscripción"), ("Very high", "Muy alto"), ("General audience", "Público general"),
                 ("Recommendation algorithm", "Algoritmo de recomendación"), ("Medium (sign-up + payment)", "Media (registro + pago)"), ("Best-in-class recommendations", "UX líder en recomendación"), ("High price", "Precio alto")]),
    ("Prime Video", [("Streaming + marketplace", "Streaming + marketplace"), ("Subscription", "Suscripción"), ("High", "Alto"), ("Amazon users", "Usuarios Amazon"),
                     ("Amazon ecosystem", "Ecosistema Amazon"), ("Medium", "Media"), ("Integration with Amazon services", "Integración con servicios Amazon"), ("Confusing navigation", "Navegación confusa")]),
    ("Disney+", [("Franchise streaming", "Streaming de franquicias"), ("Subscription", "Suscripción"), ("Medium / High", "Medio / Alto"), ("Families", "Familias"),
                 ("Exclusive content", "Contenido exclusivo"), ("Medium", "Media"), ("Exclusive content", "Contenido exclusivo"), ("Less personalisation", "Menos personalización")]),
    ("Pluto TV", [("Free streaming", "Streaming gratuito"), ("Free with ads", "Gratis con publicidad"), ("High", "Alto"), ("People looking for free TV", "Usuarios que buscan TV gratis"),
                  ("TV-like experience", "Experiencia tipo TV"), ("Low friction", "Baja fricción"), ("TV-like experience", "Experiencia tipo TV"), ("Less user control", "Menor control del usuario")]),
]
US = ' class="is-us"'
bench = ('      <div class="bench" data-reveal data-lenis-prevent><table><thead><tr><th>' + T("Platform", "Plataforma") + "</th>"
         + "".join(f"<th>{T(e, s)}</th>" for e, s in BENCH_COLS) + "</tr></thead><tbody>"
         + "".join(f'<tr{US if name == "Mercado Play" else ""}><th>{name}</th>' + "".join(f"<td>{T(e, s)}</td>" for e, s in cells) + "</tr>" for name, cells in BENCH)
         + "</tbody></table></div>\n")


def persona(name, photo, role_en, role_es, quote_en, quote_es, data, beh, mot, fru, k):
    """A user archetype, laid out as in the Figma page “Arquetipos de usuario”."""
    rows = "".join(f"<div><dt>{T(a, b)}</dt><dd>{T(c, d)}</dd></div>" for a, b, c, d in data)
    lst = lambda items: "<ul>" + "".join(f"<li>{T(e, s)}</li>" for e, s in items) + "</ul>"
    block = lambda en, es, body: f'<section class="persona__block"><h4>{T(en, es)}</h4>{body}</section>'
    return (f'<article class="persona" data-reveal style="--k:{k}">'
            f'<div class="persona__photo"><img src="{p}assets/img/mp-persona-{photo}.webp" width="1000" height="960" alt="{name}" loading="lazy" decoding="async"></div>'
            f'<header class="persona__head"><h3><i aria-hidden="true"></i>{name}</h3><span>{T(role_en, role_es)}</span><p>{T(quote_en, quote_es)}</p></header>'
            + block("Personal details", "Datos personales", f"<dl>{rows}</dl>")
            + block("Behaviour", "Comportamiento", lst(beh)) + block("Motivations", "Motivaciones", lst(mot)) + block("Frustrations", "Frustraciones", lst(fru))
            + '</article>')


personas = ('      <p class="personas__lead" data-reveal>' + T('Mercado Play users:', 'Usuarios de <b>Mercado Play</b>:') + '</p>\n'
             '      <div class="personas">' + persona(
    "Sofía", "sofia", "Casual user", "Usuaria casual",
    "Streaming works as complementary content inside the Mercado Libre ecosystem.", "El streaming funciona como contenido complementario dentro del ecosistema Mercado Libre.",
    [("Age", "Edad", "29", "29 años"), ("Job", "Ocupación", "Administrative", "Administrativa"), ("Main device", "Dispositivo principal", "Phone", "Celular"),
     ("Mercado Libre use", "Uso de Mercado Libre", "Frequent purchases", "Compras frecuentes"), ("Streaming", "Consumo de streaming", "Casual", "Casual")],
    [("Opens Mercado Libre every day", "Entra a Mercado Libre todos los días"), ("Finds Mercado Play inside the app", "Descubre Mercado Play dentro de la app"), ("Watches short content before bed", "Mira contenido corto antes de dormir")],
    [("Watch something quickly", "Ver algo rápido"), ("Not paying for another subscription", "No pagar otra suscripción"), ("Use apps she already knows", "Usar apps que ya conoce")],
    [("Too much time looking for something to watch", "Mucho tiempo buscando contenido"), ("Too many paid platforms", "Tener muchas plataformas pagas")], 0) + persona(
    "Ricardo", "ricardo", "Recurring user", "Usuario recurrente",
    "He values the free, ad-supported model, as long as content is easy to find.", "Este usuario valora el modelo gratuito con publicidad, siempre que el contenido sea fácil de encontrar.",
    [("Age", "Edad", "50", "50 años"), ("Job", "Ocupación", "Shop owner / self-employed", "Comerciante / independiente"), ("Main device", "Dispositivo principal", "Desktop", "Desktop"),
     ("Mercado Libre use", "Uso de Mercado Libre", "Very frequent", "Muy frecuentes"), ("Streaming", "Consumo de streaming", "High", "Alta")],
    [("Browses Mercado Libre several times a week", "Navega Mercado Libre varias veces por semana"), ("Finds Mercado Play while using the app", "Descubre Mercado Play mientras usa la app"),
     ("Watches at night on the TV", "Consume contenido por la noche en la televisión"), ("Prefers well-known, easy-to-pick films", "Prefiere películas conocidas o fáciles de elegir")],
    [("Watch without paying another subscription", "Ver contenido sin pagar otra suscripción"), ("Find something to watch fast", "Encontrar algo para ver rápidamente"), ("Simple platforms", "Usar plataformas simples")],
    [("Complicated interfaces", "Interfaces complicadas"), ("Too many options", "Demasiadas opciones para elegir"), ("Creating new accounts", "Tener que crear cuentas nuevas")], 1) + "</div>\n")

flow = [("Recommend", "Recomendar", "Share a film or a show from its card, by email or with a link.", "Compartir una peli o serie desde su card, por mail o con un enlace."),
        ("A friend watches it", "Un amigo la ve", "The recommendation lands with someone who trusts you.", "La recomendación le llega a alguien que confía en vos."),
        ("They finish it", "La termina", "Points only count when the whole film is watched.", "Los puntos cuentan solo si la ve completa."),
        ("You earn points", "Sumás puntos", "Points go to benefits across Mercado Libre, like Mercado Envíos.", "Los puntos van a beneficios de Mercado Libre, como Mercado Envíos.")]
steps = '      <ol class="steps">' + "".join(f'<li data-reveal><span class="steps__n">{i + 1:02d}</span><div><h3>{T(a, b)}</h3><p>{T(c, d)}</p></div></li>' for i, (a, b, c, d) in enumerate(flow)) + "</ol>\n"

b = case_head(
    "Mercado Play",
    T("A UX/UI challenge for Mercado Libre’s free streaming service: people recommend films to the people who trust them, and earn points when a friend watches the whole thing.",
      "Un challenge de UX/UI para el streaming gratuito de Mercado Libre: la gente recomienda pelis a quien confía en ella y suma puntos cuando un amigo la ve completa."),
    [(T("Role", "Rol"), "UX/UI Designer"), (T("Company", "Empresa"), "Mercado Libre · Challenge"), (T("Year", "Año"), "2026"),
     (T("Platform", "Plataforma"), "Web · desktop"), (T("Scope", "Alcance"), T("Research, benchmarking, UX, UI, prototype", "Research, benchmarking, UX, UI, prototipo")), (T("Tools", "Herramientas"), "Figma")],
)
b += rise(brand_scene(p, "mp", T, big=True), "mp")
b += chapter(T("The problem", "El problema"), h2("Usage dropped 4% in a month.", "El uso cayó un 4% en un mes.") + prose(
    ("In the last month, how often people used the platform fell 4% compared with the month before. To understand why, the User Research team surveyed users and found clear patterns in their answers.",
     "En el último mes, la frecuencia de uso de la plataforma cayó un 4% respecto del mes anterior. Para entender por qué, el equipo de User Research encuestó a las personas usuarias y encontró patrones claros en sus respuestas.")) +
    f'      <h3 class="sub" data-reveal>{T("What people say about Mercado Play", "Lo que dicen de Mercado Play")}</h3>\n' + quotes, "problem")
b += chapter("Benchmarking", h2("Five platforms, eight dimensions.", "Cinco plataformas, ocho dimensiones.") + prose(
    ("To understand where Mercado Play stands in streaming, I compared it with Netflix, Prime Video, Disney+ and Pluto TV across business model, onboarding, navigation, content discovery and ecosystem, looking for similarities, differences and room to improve its value proposition.",
     "Para entender dónde se ubica Mercado Play en el streaming, lo comparé con Netflix, Prime Video, Disney+ y Pluto TV en modelo de negocio, onboarding, navegación, descubrimiento de contenido y ecosistema, buscando similitudes, diferencias y oportunidades para mejorar su propuesta de valor.")) +
    bench, "benchmarking")
b += big_words("Mercado Play wins on access, a Mercado Libre account is all it takes, and loses on discovery.",
               "Mercado Play gana en acceso, alcanza con la cuenta de Mercado Libre, y pierde en descubrimiento.")
b += chapter(T("User archetypes", "Arquetipos de usuario"), h2("People don’t come looking for content. They find it.", "La gente no llega buscando contenido. Lo encuentra.") + prose(
    ("Mercado Play users don’t necessarily arrive looking for something to watch: they discover it while using the rest of Mercado Libre. That turns the platform into <strong>an opportunity for engagement and retention inside the main product</strong>.",
     "Las personas usuarias de Mercado Play no necesariamente llegan buscando contenido: lo descubren mientras usan el resto de Mercado Libre. Eso convierte a la plataforma en <strong>una oportunidad de engagement y retención dentro del producto principal</strong>.")) + personas, "archetypes")
b += chapter(T("The solution", "La solución"), h2("Recommendations between people, rewarded.", "Recomendaciones entre personas, con recompensa.") + prose(
    ("The proposal adds social recommendations to Mercado Play. People recommend the films and shows they liked and share them with anyone through a link. If someone watches the whole title from that recommendation, the person who shared it earns points to use on benefits across Mercado Libre.",
     "La propuesta suma recomendaciones sociales a Mercado Play. La gente recomienda las pelis y series que le gustaron y las comparte con quien quiera mediante un enlace. Si alguien ve el contenido completo a partir de esa recomendación, quien la compartió suma puntos para usar en beneficios dentro de Mercado Libre.")), "solution")
b += big_words("Recommendations between people are one of the most trusted ways to discover content, especially when the film is one click away.",
               "Las recomendaciones entre personas son una de las formas más confiables de descubrir contenido, sobre todo si la peli está a un clic.")
GIFT = ICO["gift"]
notif = ('<div class="mpn"><div class="mpn__head"><b>Notificaciones</b><span>×</span></div>'
         + "".join(f'<div class="mpn__item">{GIFT}<div><b>¡Felicitaciones!</b><span>Guido vio la peli que le recomendaste</span><em><u>Sumaste 213 puntos</u> para Mercado Envíos</em></div></div>' for _ in range(3))
         + '</div>')
flow_steps = [("Save or share from any card", "Guardar o compartir desde cualquier card",
               "Every film and show carries two actions, save and share, right on the card, so recommending takes one click.",
               "Cada peli y serie lleva dos acciones, guardar y compartir, en la misma card, así recomendar lleva un clic."),
              ("Send it to someone who trusts you", "Mandarla a alguien que confía en vos",
               "A short modal: an email or a link, and a clear promise, points if the person watches it all.",
               "Un modal corto: un mail o un enlace, y una promesa clara, puntos si la persona la ve completa."),
              ("Sent", "Enviado",
               "The recommendation lands with a friend, one click away from the film.",
               "La recomendación le llega a un amigo, a un clic de la peli."),
              ("Points when they watch it all", "Puntos cuando la ve completa",
               "The bell tells you when a friend finished what you shared, and the points go to benefits such as Mercado Envíos.",
               "La campana avisa cuando un amigo terminó lo que compartiste, y los puntos van a beneficios como Mercado Envíos.")]
b += story(flow_steps, [([0], dev_piece(p, "mp-kit-peli-bookmark", 325, 585, "Card saved to favourites", "Card guardada en favoritos", 1.1)),
                        ([1], dev_piece(p, "mp-kit-modal-mail", 349, 372, "Share modal with an email typed", "Modal para compartir con un mail", 1.2)),
                        ([2], dev_piece(p, "mp-kit-modal-sent", 349, 202, "Message sent", "Mensaje enviado", 1.2)),
                        ([3], notif)], "mp", "Recommend and earn points")
b += chapter(T("Low fidelity", "Baja fidelidad"), h2("Structure first, then colour.", "Primero la estructura, después el color.") + prose(
    ("The wireframes settle the hierarchy of the home and where the new actions live: favourite and share on every card, comments in place and a notifications panel for points. The same screen in high fidelity keeps every block where it was.",
     "Los wireframes definen la jerarquía de la home y dónde viven las acciones nuevas: favorito y compartir en cada card, comentarios en el lugar y un panel de notificaciones para los puntos. La misma pantalla en alta fidelidad mantiene cada bloque donde estaba.")) +
    "", "lofi")
b += wipe(p, ("mp-lofi", 1440, 4319), ("mp-points", 1440, 4320), "play.mercadolibre.com", T("Low fidelity", "Baja fidelidad"), T("High fidelity", "Alta fidelidad"),
          "Same blocks, same places.", "Mismos bloques, mismos lugares.")
b += chapter(T("High fidelity", "Alta fidelidad"), h2("Every card can be saved, shared and talked about.", "Cada card se puede guardar, compartir y comentar.") +
    decision("A home built around what people recommend", "Una home armada alrededor de lo que recomienda la gente",
             f"<p>{T('“Top 10 films recommended by people” sits next to the usual rows. Each card carries two actions, save and share, and opens its comments in place.', '“Top 10 pelis recomendadas por la gente” convive con las filas de siempre. Cada card lleva dos acciones, guardar y compartir, y abre sus comentarios en el lugar.')}</p>",
             "") +
    "", "hifi")
b += scrub(p, "mp-home", 1440, 4287, "play.mercadolibre.com", alt_en="Mercado Play home with recommendation rows", alt_es="Home de Mercado Play con filas de recomendaciones")
b += chapter(T("Every state", "Cada estado"), h2("Share, and see it pay off.", "Compartir, y ver que suma.") +
    decision("Saved and shared, in place", "Guardado y compartido, en el lugar",
             f"<p>{T('Sharing opens a short modal: an email or a link, and a clear promise, 100 points if the person watches it all. Saving confirms with a toast, and the bell tells you when a friend finished what you shared.', 'Compartir abre un modal corto: un mail o un enlace, y una promesa clara, 100 puntos si la persona la ve completa. Guardar confirma con un toast, y la campana avisa cuando un amigo terminó lo que compartiste.')}</p>",
             pair(win("mp-fav-top", 1440, 900, "<b>Saved.</b> A toast confirms it at the top: “Agregaste a tu lista de favoritos”.", "<b>Guardado.</b> Un toast lo confirma arriba: “Agregaste a tu lista de favoritos”.", "Home with the saved-to-favourites toast", "Home con el toast de agregado a favoritos"),
                  win("mp-share-top", 1440, 900, "<b>Share.</b> The modal over the film: an email or a link, and 100 points if it’s watched to the end.", "<b>Compartir.</b> El modal sobre la peli: un mail o un enlace, y 100 puntos si la ven completa.", "Share modal over the home", "Modal para compartir sobre la home")) +
             win("mp-points-top", 1440, 900, "<b>Points.</b> The bell lists every friend who finished what you shared, with the points earned for Mercado Envíos.", "<b>Puntos.</b> La campana lista a cada amigo que terminó lo que compartiste, con los puntos sumados para Mercado Envíos.", "Notifications panel with the points earned", "Panel de notificaciones con los puntos sumados")) +
    decision("My favourites and my recommendations", "Mis favoritos y mis recomendados",
             f"<p>{T('A page of its own keeps what you saved and what you shared, so recommending becomes a habit instead of a WhatsApp chat with yourself.', 'Una página propia guarda lo que guardaste y lo que compartiste, así recomendar se vuelve un hábito y no un chat de WhatsApp con uno mismo.')}</p>",
             win("mp-recos", 1440, 1845, ae="My favourites and my recommendations page", as_="Página de mis favoritos y mis recomendados", view="fit", maxw="760px")), "states")
def state(name, w, h, label, disp=None):
    dw = disp or w
    return (f'<figure class="kd__st" data-reveal><div class="kd__img" style="--w:{dw}px"><img src="{p}assets/img/mp-kit-{name}.webp" width="{w}" height="{h}" alt="{label}" loading="lazy" decoding="async"></div>'
            f'<figcaption>{label}</figcaption></figure>')


def comp(title_en, title_es, text_en, text_es, states, cls=""):
    return (f'<article class="kd__comp {cls}"><header data-reveal><h3>{T(title_en, title_es)}</h3><p>{T(text_en, text_es)}</p></header>'
            f'<div class="kd__states">{"".join(states)}</div></article>')


kit_doc = (f'  <section class="kd" id="kit">\n    <div class="wrap">'
           f'<header class="kd__head"><div class="label" data-reveal>UI Kit</div><h2 class="lines">{T("Every component, every state.", "Cada componente, cada estado.")}</h2>'
           f'<p data-reveal>{T("The new pieces were documented in Figma with all their states, so development builds each one once. This is the UI Kit page, piece by piece.", "Las piezas nuevas se documentaron en Figma con todos sus estados, para que desarrollo construya cada una una sola vez. Esta es la página del UI Kit, pieza por pieza.")}</p>'
           f'<a class="btn btn--ghost kd__btn" href="https://www.figma.com/design/MTQT0AwdScSnoRK3m3SHeB/Challenge---UX-UI?node-id=11-291" target="_blank" rel="noopener" data-reveal>{T("Open the UI Kit in Figma", "Abrir el UI Kit en Figma")} {arrow()}</a></header>'
           + '<div class="kd__grid">'
           + comp("Save button", "Botón guardar", "Adds the title to My favourites. The tooltip explains it on hover.", "Agrega el título a Mis favoritos. El tooltip lo explica al pasar el mouse.",
                  [state("bm-tooltip", 159, 116, "Tooltip"), state("bm-default", 159, 64, "Default"), state("bm-active", 159, 64, "Activo"), state("bm-disabled", 159, 64, "Desabilitado")], "kd__comp--btn")
           + comp("Share button", "Botón compartir", "Opens the share modal. Same four states as the save button.", "Abre el modal para compartir. Los mismos cuatro estados que guardar.",
                  [state("sh-tooltip", 86, 116, "Tooltip"), state("sh-default", 64, 64, "Default"), state("sh-active", 66, 64, "Activo"), state("sh-disabled", 64, 64, "Desabilitado")], "kd__comp--btn")
           + comp("Share modal", "Modal para compartir", "An email or a link, and the promise in yellow: 100 points if the friend watches it all.", "Un mail o un enlace, y la promesa en amarillo: 100 puntos si el amigo la ve completa.",
                  [state("modal-default", 349, 372, "Default"), state("modal-mail", 349, 372, "Activo"), state("modal-sent", 349, 202, "Mensaje enviado")], "kd__comp--wide")
           + comp("Film card", "Card de peli", "Save and share on every card, and the comments of the people who recommended it, in place.", "Guardar y compartir en cada card, y los comentarios de quienes la recomendaron, en el lugar.",
                  [state("peli-default", 325, 585, "Default", 230), state("peli-bookmark", 325, 585, "Bookmark", 230), state("peli-active", 325, 618, "Activo · comentarios", 230), state("peli-norecos", 325, 585, "Sin recomendaciones", 230)], "kd__comp--wide")
           + comp("Top 10 card", "Card Top 10", "The ranking number grows into the card when it becomes active, with the trailer and “Ver ahora”.", "El número del ranking crece con la card al activarse, con el tráiler y “Ver ahora”.",
                  [state("serie-default", 426, 405, "Default", 300), state("serie-active", 782, 405, "Card activa", 552), state("serie-v1", 782, 405, "Card activa 1", 552), state("serie-v2", 782, 405, "Card activa 2", 552), state("serie-v3", 486, 405, "Card activa 3", 343)], "kd__comp--wide")
           + comp("Links and wide card", "Links y card ancha", "“Discover more” turns yellow on hover; the wide card keeps the same two actions.", "“Descubrí más” se vuelve amarilla al pasar el mouse; la card ancha mantiene las mismas dos acciones.",
                  [state("more-default", 260, 47, "Default"), state("more-hover", 260, 47, "Hover"), state("wide", 437, 240, "Card ancha")], "kd__comp--wide")
           + '</div></div>\n  </section>\n')
b += kit_doc
b += chapter(T("Outcome", "Resultado"), h2("Discovery that comes from people.", "Descubrimiento que viene de las personas.") +
    '      <div class="numbers" data-reveal>' + "".join(f'<div><b data-count="{n}"{f" data-suffix={chr(34)}{sfx}{chr(34)}" if sfx else ""}>{n}{sfx}</b><span>{T(e, s)}</span></div>'
                                                      for n, sfx, e, s in [(6, "", "users quoted", "personas citadas"), (5, "", "platforms benchmarked", "plataformas comparadas"),
                                                                           (2, "", "user archetypes", "arquetipos de usuario"), (100, "", "points per watched recommendation", "puntos por recomendación vista")]) + "</div>\n" +
    prose(("The challenge goes from a 4% drop in usage to a feature that gives people a reason to come back: the recommendations of someone they trust, and points for sharing them.",
           "El challenge va de una caída del 4% en el uso a una funcionalidad que le da a la gente un motivo para volver: las recomendaciones de alguien de confianza, y puntos por compartirlas.")) +
    f'      <div class="btns" data-reveal><a class="btn btn--ghost" href="{FIGMA}" target="_blank" rel="noopener">{T("See the file in Figma", "Ver el archivo en Figma")} {arrow()}</a></div>\n', "outcome")

page = case_page(p, FN, "Mercado Play", "Mercado Play",
                 "UX/UI challenge for Mercado Play, Mercado Libre's free streaming service: social recommendations with rewards. By Julián Gerardi.",
                 "Challenge de UX/UI para Mercado Play, el streaming gratuito de Mercado Libre: recomendaciones sociales con recompensa. Por Julián Gerardi.", b)
open(os.path.join(ROOT, "work", FN), "w").write(page)
print(FN, len(page))
