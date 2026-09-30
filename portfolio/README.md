# Portfolio · Julián Gerardi

Sitio personal estático (HTML + CSS + JS). Estética tipo Vercel/Geist sin líneas de grilla: layout ancho (hasta 1680px), tipografía Geist, blanco y negro, y el color solo en las portadas de cada proyecto. Bilingüe (inglés y español).

```bash
python3 -m http.server 8090 -d portfolio   # http://localhost:8090
```

## Estructura

```
portfolio/
  index.html                  home: intro, banner, métricas, marcas, trabajos, proceso, experiencia, about, contacto
  work/batech.html            Batech AI Platform (Figma: Portfolio › Batech)
  work/confidentally.html     caso con NDA (bloqueado con contraseña)
  work/confidentally-ui.html  design system y Builder con IA
  work/grill.html             GRILL Empresas (app de empleados + panel de cocina)
  work/mercado-play.html      challenge de Mercado Play: problema, benchmarking, arquetipos, solución, baja y alta fidelidad, UI kit
  assets/site.css             tokens (claro y oscuro), layout, trabajos, casos, intro, agente, cursor
  assets/site.js              idioma, intro, scroll suave, reveals, marquesina, trabajos, cursor, tema, lightbox, NDA, CV
  assets/hero.js              movimiento del degradé del inicio (solo en la home)
  assets/agent.js             asistente que responde con el contenido del sitio
  assets/Julian_Gerardi_CV.pdf  CV para descargar
  assets/img/                 capturas en WebP (b- Batech, d- dental, ds- design system, g- GRILL, mp- Mercado Play)
  _build/                     scripts que generan los HTML (demos.py: microanimaciones de cada pantalla)
```

## Marca y tamaño

- La marca es un triángulo invertido (aparece suave al cargar y baja apenas al pasar el mouse) con "Julián Gerardi" en Geist Mono. El favicon es el mismo triángulo en blanco.
- Todo el diseño está a la escala de ver la página al 90%: el `html` tiene `font-size: 90%` y las medidas en px del CSS están multiplicadas por 0,9.

## Flujo con zoom (Batech)

El flujo to-be se exportó de Figma a 20000 px y se cortó en 30 mosaicos (`assets/img/flow/t-x-y.webp`) más una vista general de 5000 px (`overview.webp`). Con la rueda del mouse se hace zoom sobre el punto del cursor, arrastrando se mueve, y un clic acerca. Los mosaicos nítidos se cargan solo al acercarse, así no se pixela. Si la página se está scrolleando, la rueda sigue scrolleando la página. Tiene pantalla completa y un botón que abre el flujo en Figma.

## Idioma

Cada texto se escribe dos veces con `T(en, es)` en `_build/`, que genera `<span lang="en">…</span><span lang="es">…</span>`. El CSS muestra solo el idioma de `<html data-lang>`. El switch EN/ES del menú lo cambia y lo recuerda (`localStorage`, clave `jg-lang`); la primera vez sigue el idioma del navegador. También traduce el título de la pestaña, la descripción, los placeholders y los textos alternativos de las imágenes (`data-alt-es`).

## Movimiento

- **Intro**: cada vez que se entra a la home desde afuera del sitio, una pantalla negra cuenta de 0 a 100 con palabras que pasan (Research, Systems, Interfaces, Prototypes) y se levanta. Navegando entre páginas del sitio no se repite.
- **Scroll suave** con [Lenis](https://github.com/darkroomengineering/lenis) (CDN). Los bloques con `data-reveal` suben al entrar, los títulos `.lines` aparecen palabra por palabra detrás de una máscara, y los números con `data-count` cuentan.
- **Portadas de los casos**: parallax suave del mockup.
- **Transición entre páginas**: una cortina cubre la pantalla al salir y se levanta al entrar.
- **Inicio**: una tarjeta clara con el mismo brillo verde y violeta del final de la página, que se mueve solo y sigue el puntero. Las palabras subrayadas de la frase muestran el proyecto al que apuntan (design systems → Confidentally UI, IA → Batech, prototipos → Confidentally, productos de punta a punta → GRILL, que la gente usa → Mercado Play) y llevan a su caso. Se configuran en `HOT` de `_build/index_page.py`.
- **Microanimaciones**: cada pantalla responde como el producto: un pulso en el control usado, un toast que sube y se asienta, un campo que se escribe solo o una fila que se selecciona, con los colores de cada marca (`.demo--batech`, `--dental`, `--ds`, `--grill`, `--mp`). Sin cursores falsos. Los datos están en `_build/demos.py`. Solo se animan mientras están en pantalla.
- Con "reducir movimiento" activado en el sistema, todo queda quieto.

## Selected work

Va sobre una banda oscura, con líneas finas entre filas y el número en verde. Cada fila tiene número, título y etiquetas; al pasar el mouse se invierte y se despliega una tira de 5 pantallas a todo el ancho con la descripción debajo. Cada pantalla flota, y al pasar el mouse se inclina hacia el puntero y se eleva. Las tiras se arman en `_build/common.py` (`tiles_batech`, `tiles_dental`, `tiles_ds`, `tiles_grill`, `tiles_mp`) con `tile_screen` (navegador), `tile_phone` (celular) y `tile_card` (una pieza). El ancho de cada objeto se calcula en el build para que la pantalla entre **entera**, sin recortes.

El cursor es un cuadrado blanco con `mix-blend-mode: difference`: invierte lo que tiene debajo, crece sobre links y, sobre el título de un proyecto, se agranda y muestra el año (`data-cursor`).

## Casos

Cada caso tiene una barra con breadcrumbs (Inicio / Trabajos / Proyecto), el número de proyecto, flechas a anterior y siguiente, y una línea de progreso de lectura. La portada usa una pantalla que no se repite en el resto del caso.

## CV y asistente

- El CV se descarga desde el menú, About, Contacto y el pie. Dentro del visor de Artifacts de Claude pasa por la ventana de descarga del visor.
- El asistente ("Preguntame", el globo negro con el triángulo) no usa ninguna IA externa: responde con el contenido de este sitio. Las preguntas generales (quién es, disponibilidad, contacto, CV, idiomas, formación) tienen respuestas escritas en `assets/agent.js` (`INTENTS`); el resto lo busca en el texto de las páginas y responde con el párrafo que corresponde, con un link a esa sección. El contenido del caso con NDA no se usa.

## Editar

```bash
python3 portfolio/_build/build.py
```

- `_build/common.py`: head, menú, breadcrumbs, agente, pie, mockups, portadas y tiras de trabajos.
- `_build/index_page.py`: la home (intro, banner, experiencia).
- `_build/batech_page.py`: el caso de Batech.
- `_build/cases_page.py`: Confidentally, Confidentally UI y GRILL.
- `_build/mercado_page.py`: Mercado Play.

Los colores de marca de cada portada están en `assets/site.css` (`--batech-*`, `--dental-*`, `--ds-*`, `--grill-*`, `--mp-*`).

## Pie

Como el de vercel.com: columnas de links (trabajos, sitio, proyectos en vivo, contacto), el estado de disponibilidad y un selector de tema (sistema, claro, oscuro).

## Contraseña del caso con NDA

La contraseña actual es `dental2026`. Se guarda como hash SHA-256 en `data-hash` (en `_build/cases_page.py`). Para cambiarla:

```bash
printf 'nueva-clave' | sha256sum
```

Es un candado suave: el contenido está en el HTML, así que sirve para pedir permiso a quien lo lee, no para proteger información sensible.
