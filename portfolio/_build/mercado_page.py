from common import *
import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")

p = "../"
FN = "mercado-play.html"

b = case_head(
    "Mercado Play",
    T("A UX/UI challenge for Mercado Libre’s free streaming service, with its own visual system for the presentation.",
      "Un challenge de UX/UI para el servicio de streaming gratuito de Mercado Libre, con su propio sistema visual para la presentación."),
    [(T("Role", "Rol"), "UX/UI Designer"), (T("Company", "Empresa"), "Mercado Libre · Challenge"), (T("Year", "Año"), "2026"),
     (T("Product", "Producto"), "Mercado Play"), (T("Version", "Versión"), "2.0"), (T("Tools", "Herramientas"), "Figma")],
)
b += f'  <section class="wrap case-cover" data-parallax>{cover_mp()}</section>\n'
b += chapter(T("Overview", "Resumen"), h2("Streaming inside the largest marketplace in Latin America.", "Streaming dentro del marketplace más grande de Latinoamérica.") + prose(
    ("Mercado Play is Mercado Libre’s free streaming service: films, series and live channels at no cost, supported by ads and available inside the Mercado Libre ecosystem.",
     "Mercado Play es el servicio de streaming gratuito de Mercado Libre: películas, series y canales en vivo sin costo, sostenidos con publicidad y disponibles dentro del ecosistema de Mercado Libre."),
    ("This project is a UX/UI challenge built around the product. It is on its <strong>second version</strong>, and its presentation was designed as carefully as the screens.",
     "Este proyecto es un challenge de UX/UI pensado alrededor del producto. Va por su <strong>segunda versión</strong> y la presentación se diseñó con el mismo cuidado que las pantallas.")), "overview")
b += chapter(T("The cover as a system", "La portada como sistema"), h2("A presentation that opens like a Figma canvas.", "Una presentación que se abre como un lienzo de Figma.") + prose(
    ("The challenge title sits inside a selected component called <strong>Alert Dialog</strong>, the product name is set in Mercado Libre’s yellow, and two multiplayer cursors, mine and the developers’, share the frame.",
     "El título del challenge vive dentro de un componente seleccionado llamado <strong>Alert Dialog</strong>, el nombre del producto va en el amarillo de Mercado Libre y dos cursores multiplayer, el mío y el de desarrollo, comparten el frame."),
    ("The same pieces break down into a small set of assets that carry the rest of the file: the wordmark, the selected dialog, the year and the cursors.",
     "Esas mismas piezas se separan en un set chico de recursos que acompañan el resto del archivo: el logotipo, el diálogo seleccionado, el año y los cursores.")) +
    f'      <div class="mp-set" data-reveal>{tiles_mp(p, with_cover=False)}</div>\n', "cover")
b += chapter(T("How I approach a challenge", "Cómo encaro un challenge"), h2("Same process as a real project, in less time.", "El mismo proceso que un proyecto real, en menos tiempo.") +
             '      <ol class="steps">' + "".join(f'<li data-reveal><span class="steps__n">{i + 1:02d}</span><div><h3>{T(a, c)}</h3><p>{T(d, e)}</p></div></li>' for i, (a, c, d, e) in enumerate([
                 ("Read the brief twice", "Leer el brief dos veces", "Separate what is asked from what is assumed, and write the questions I would ask the team.", "Separar lo que se pide de lo que se supone, y anotar las preguntas que le haría al equipo."),
                 ("Understand the product", "Entender el producto", "Map how Mercado Play lives inside Mercado Libre and who arrives there, and from where.", "Mapear cómo vive Mercado Play dentro de Mercado Libre y quién llega ahí, y desde dónde."),
                 ("Design the flow before the screens", "Diseñar el flujo antes que las pantallas", "Agree on the path first so every screen has a reason to exist.", "Acordar el recorrido primero para que cada pantalla tenga una razón de ser."),
                 ("Present it as a product", "Presentarlo como un producto", "A cover and a system of pieces that anyone on the team can follow on their own.", "Una portada y un sistema de piezas que cualquiera del equipo pueda seguir solo.")])) + "</ol>\n", "approach")
page = case_page(p, FN, "Mercado Play", "Mercado Play",
                 "UX/UI challenge for Mercado Play, Mercado Libre's free streaming service. By Julián Gerardi.",
                 "Challenge de UX/UI para Mercado Play, el streaming gratuito de Mercado Libre. Por Julián Gerardi.", b)
open(os.path.join(ROOT, "work", FN), "w").write(page)
print(FN, len(page))
