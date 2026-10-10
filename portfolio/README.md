# Portfolio · Julián Gerardi

En vivo: **https://juliangerardi.github.io/Portfolio/**

Sitio personal estático (HTML + CSS + JS). Estética tipo Vercel/Geist sin líneas de grilla: layout ancho (hasta 1680px), tipografía Geist, blanco y negro, y el color solo en las portadas de cada proyecto. Bilingüe (inglés y español).

```bash
python3 -m http.server 8090 -d portfolio   # http://localhost:8090
```

## Estructura

```
portfolio/
  index.html                  home: intro, banner, frase UX/UI, trabajos, proceso, experiencia, about, contacto
  work/batech.html            Batech AI Platform (Figma: Portfolio › Batech)
  work/confidentally.html     caso con NDA (bloqueado con contraseña)
  work/confidentally-ui.html  design system y Builder con IA
  work/grill.html             GRILL Empresas (app de empleados + panel de cocina)
  work/mercado-play.html      challenge de Mercado Play: problema, benchmarking, arquetipos (como en la página del Figma, con las fotos de Sofía y Ricardo), solución, baja y alta fidelidad, y la página del UI Kit de Figma pieza por pieza con cada estado (`mp-kit-*`, recortadas de la página UI Kit a su tamaño real)
  assets/site.css             tokens (claro y oscuro), layout, trabajos, casos, intro, agente, cursor
  assets/site.js              idioma, intro, scroll suave, reveals, escenas de scroll, trabajos, cursor, tema, lightbox, NDA, CV
  assets/hero.js              movimiento del degradé del inicio (solo en la home)
  assets/agent.js             asistente que responde con lo del CV y el contenido del sitio
  assets/favicon.svg          el ícono: el globo negro con el triángulo blanco (más favicon-32.png y apple-touch-icon.png)
  assets/Julian_Gerardi_CV.pdf  CV para descargar
  assets/img/                 capturas en WebP (b- Batech, d- dental, ds- design system, g- GRILL, mp- Mercado Play)
  _build/                     scripts que generan los HTML (mockups.py: Safari, iPhone y notificaciones; scenes.py: escenas de scroll; builder_ui.py: pipeline y Builder de Confidentally UI)
```

## Marca y tamaño

- La marca es un triángulo invertido (aparece suave al cargar y baja apenas al pasar el mouse; en el pie salta y gira) con "Julián Gerardi" en Geist Mono. El favicon es el globo del asistente: negro, con el triángulo en blanco.
- Todo el diseño está a la escala de ver la página al 90%: el `html` tiene `font-size: 90%` y las medidas en px del CSS están multiplicadas por 0,9.

## Flujo con zoom (Batech)

El flujo to-be se exportó de Figma a 20000 px y se cortó en 30 mosaicos (`assets/img/flow/t-x-y.webp`) más una vista general de 5000 px (`overview.webp`). Con la rueda del mouse se hace zoom sobre el punto del cursor, arrastrando se mueve, y un clic acerca. Los mosaicos nítidos se cargan solo al acercarse, así no se pixela. Si la página se está scrolleando, la rueda sigue scrolleando la página. Tiene pantalla completa y un botón que abre el flujo en Figma.

## Publicación (GitHub Pages)

La carpeta `portfolio/` es el sitio completo, sin build de servidor: se sube tal cual a la raíz del repositorio `JulianGerardi/portfolio` y GitHub Pages lo sirve en **https://juliangerardi.github.io/portfolio/**.

1. Crear el repositorio público `portfolio` (vacío) en GitHub y darle acceso a la app de Claude.
2. Subir el contenido de `portfolio/` a la rama `main` (el `.nojekyll` evita que Jekyll ignore `_build/`).
3. En el repositorio: *Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`*.

Todos los links son relativos, así que funciona igual en `/portfolio/`, en local y en cualquier otra ruta.

## Idioma

Cada texto se escribe dos veces con `T(en, es)` en `_build/`, que genera `<span lang="en">…</span><span lang="es">…</span>`. El CSS muestra solo el idioma de `<html data-lang>`. El switch EN/ES del menú lo cambia y lo recuerda (`localStorage`, clave `jg-lang`); la primera vez sigue el idioma del navegador. También traduce el título de la pestaña, la descripción, los placeholders y los textos alternativos de las imágenes (`data-alt-es`).

## Movimiento

- **Intro**: cada vez que se entra a la home desde afuera del sitio, una pantalla negra cuenta de 0 a 100 con palabras que pasan (Research, Systems, Interfaces, Prototypes) y se levanta. Navegando entre páginas del sitio no se repite.
- **Scroll suave** con [Lenis](https://github.com/darkroomengineering/lenis) (CDN). Cada paso de la rueda tiene un tope y el destino del scroll nunca se adelanta más de una pantalla, así un scroll rápido no salta hasta el final. Los bloques con `data-reveal` suben al entrar, los títulos `.lines` aparecen palabra por palabra detrás de una máscara, y los números con `data-count` cuentan.
- **Portadas de los casos**: parallax suave del mockup.
- **Transición entre páginas**: una cortina cubre la pantalla al salir y se levanta al entrar.
- **Inicio**: una tarjeta clara con el mismo brillo verde y violeta del final de la página, que se mueve solo y sigue el puntero. Las palabras clave de la frase (sin subrayado hasta pasar el mouse) muestran el proyecto al que apuntan en su escena de marca: una ventana de Safari sobre un degradé suave con una notificación (Batech, Confidentally, GRILL), el monitor con el diagrama Figma → Claude Code → Storybook (Confidentally UI) o la ventana inclinada sobre el amarillo de Mercado Play (design systems → Confidentally UI, IA → Batech, prototipos → Confidentally, productos de punta a punta → GRILL, que la gente usa → Mercado Play). En el celular el primer toque muestra la tarjeta y tocarla (o tocar la palabra otra vez) abre el caso. Se configuran en `HOT` de `_build/index_page.py` y `brand_scene()` de `_build/mockups.py`.
- **UX/UI**: debajo del banner, una frase corta cuyas palabras se encienden a medida que se scrollea, con los años, los cuatro países con sus banderas y las áreas de práctica.
- **Proceso**: las cinco etapas son cards; al pasar el mouse se eleva un poco y se enciende al estilo IA: el degradé verde y violeta del orbe del asistente (botón "Preguntame") corre por el borde con un haz de luz que lo recorre, y detrás respira un halo suave de los mismos colores.
- **Escenas de scroll (los casos)**, al estilo de las páginas de producto de Apple. El JS le da a cada escena su avance (`--p`, de 0 a 1) y cada una lo usa a su manera:
  - `rise`: la portada arranca apenas recostada, se endereza y crece hasta ocupar la pantalla.
  - `story`: un dispositivo queda fijo y cambia de pantalla a medida que pasan los pasos (Batech: el formulario de nuevo análisis se completa solo, reconstruido en HTML desde el Figma). En el celular los pasos son un carrusel: una card por paso con su captura arriba del texto, la siguiente asomando al costado, y cada deslizamiento avanza exactamente un paso, con puntos que marcan dónde estás.
  - `rail`: una fila de pantallas que se mueve de costado con el scroll.
  - `fan`: los celulares se abren en abanico.
  - `wipe`: la baja fidelidad pasa a alta fidelidad bajo una línea (Mercado Play).
  - `scrub`: una página larga se desplaza dentro de su ventana.
  - `pipe` y `builder` (Confidentally UI): no quedan fijas ni siguen el scroll. Se reproducen solas cuando aparecen en pantalla (`data-play`, en ms) y tienen un botón "Ver de nuevo". El diagrama Figma → Claude Code → Storybook → devs se enciende paso a paso con sus cinco pasos debajo (en el celular el diagrama pasa a ser un flujo vertical, sin recortes); el Builder escribe el pedido, la IA elige piezas del catálogo y la pantalla se arma hasta mostrar el código, y cada chip de arriba salta a su etapa.
  En el celular `wipe`, `scrub` y `fan` no quedan fijas. El abanico se abre mientras cruza la pantalla; `wipe` y `scrub` se reproducen solos a su ritmo al aparecer (`data-play-narrow`), así un deslizamiento rápido no los apura. Las capturas de los casos entran sin inclinación. Con "reducir movimiento" todas muestran su estado final.
- **Pantallas de los casos** (`.shot`): al entrar con el scroll, el panel de color se abre apenas y la pantalla sube y se asienta con una leve inclinación, al estilo Apple. El avance (`--t`, de 0 a 1) lo calcula `site.js`.
- Con "reducir movimiento" activado en el sistema, todo queda quieto.

## Pantallas en detalle y UI Kit

Mercado Play, Confidentally y Batech tienen la misma lógica: una sección con las pantallas en detalle (cada decisión con su pantalla en una ventana de Safari sobre el color del proyecto, `swin()` en `_build/common.py`) y un **UI Kit** con cada componente y sus estados (`kit_section()`, `kit_comp()` y `kit_state()`). El kit toma el estilo de cada proyecto con variables CSS: Mercado Play oscuro y amarillo (por defecto), Confidentally claro y azul (`.kd--dental`) y Batech negro y cian (`.kd--batech`).

- **Confidentally**: "Ficha del paciente" con el resumen, los planes de tratamiento, relaciones y facturación y el alta de paciente en dos pasos, desde las pantallas del Figma (`c-*.webp`, a 2x). Los componentes (`c-kit-*.webp`) están recortados de esas mismas pantallas. Esas pantallas también son la preview de la home y la portada del caso.
- **Batech**: "Cada estado" con la lista de análisis, el bloque de cada fuente, la subida de video y la geocerca (`b-flow-*.webp`, recortadas del tablero del flujo). En el kit, las piezas del formulario están reconstruidas en HTML y renderizadas a 2x (`b-kit-h-*.webp`); el resto sale de las pantallas (`b-kit-*.webp`).

## Selected work

Sigue el tema: blanca en modo claro y negra en modo oscuro, con líneas finas entre filas y el número en verde. Cada fila tiene número, título y etiquetas; al pasar el mouse se invierte y se despliega una tira de 5 pantallas a todo el ancho con la descripción debajo. Al abrirse una fila, cada panel sube suave, uno tras otro, y la pantalla de adentro sube un poco más detrás, así las dos capas se leen como profundidad (en el celular pasa lo mismo cuando el proyecto aparece en pantalla). Después cada pantalla flota, y al pasar el mouse se inclina hacia el puntero y se eleva. Las tiras se arman en `_build/common.py` (`tiles_batech`, `tiles_dental`, `tiles_ds`, `tiles_grill`, `tiles_mp`) con `tile_screen` (navegador), `tile_phone` (celular) y `tile_card` (una pieza). El ancho de cada objeto se calcula en el build para que la pantalla entre **entera**, sin recortes.

El cursor es un cuadrado blanco con `mix-blend-mode: difference`: invierte lo que tiene debajo, crece sobre links y, sobre el título de un proyecto, se agranda y muestra el año (`data-cursor`).

## Casos

Cada caso tiene una barra con breadcrumbs (Inicio / Trabajos / Proyecto), el número de proyecto, flechas a anterior y siguiente, y una línea de progreso de lectura. La portada usa una pantalla que no se repite en el resto del caso.

## CV y asistente

- El CV se descarga desde el menú, About, Contacto y el pie. Dentro del visor de Artifacts de Claude pasa por la ventana de descarga del visor.
- El asistente ("Preguntame", el globo negro con el triángulo, con sombra) no usa ninguna IA externa. Las preguntas generales (quién es, cómo trabaja con devs, stakeholders y CEOs, research y tests de usabilidad, Claude Code y el design system llevado de Figma a Storybook, disponibilidad, contacto, CV, idiomas, formación) tienen respuestas escritas en `assets/agent.js` (`INTENTS`), basadas en el CV; el resto lo busca en el texto de las páginas y responde con el párrafo que corresponde, con un link a esa sección. El contenido del caso con NDA no se usa. Dentro del panel vuelve el cursor del sistema.

## Editar

```bash
python3 portfolio/_build/build.py
```

- `_build/common.py`: head, menú, breadcrumbs, agente, pie, mockups, portadas y tiras de trabajos.
- `_build/index_page.py`: la home (intro, banner, about).
- `_build/experience.py`: la experiencia tal cual el CV; cada rol se despliega con sus logros, el lugar y la modalidad.
- `_build/batech_page.py`: el caso de Batech.
- `_build/cases_page.py`: Confidentally, Confidentally UI y GRILL.
- `_build/mercado_page.py`: Mercado Play.

Los colores de marca de cada portada están en `assets/site.css` (`--batech-*`, `--dental-*`, `--ds-*`, `--grill-*`, `--mp-*`).

## Pie

Como el de vercel.com: columnas de links (trabajos, sitio, proyectos en vivo, contacto) y un selector de tema (sistema, claro, oscuro).

## Contraseña del caso con NDA

La contraseña actual es `dental2026`. Se guarda como hash SHA-256 en `data-hash` (en `_build/cases_page.py`). Para cambiarla:

```bash
printf 'nueva-clave' | sha256sum
```

Es un candado suave: el contenido está en el HTML, así que sirve para pedir permiso a quien lo lee, no para proteger información sensible.
