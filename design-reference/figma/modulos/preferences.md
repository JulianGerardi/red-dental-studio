# Settings → Preferences

**Jira**: sin historia. Se buscó *preference*, *theme* y *date format* en `CON`: no hay historia de la pantalla (avisarle
a Julián). Se armó desde el video de red.dev.

## Breadcrumb y título iguales (2026-11-27)

Sin historia de Jira. Regla transversal en `../README.md` (*Regla: breadcrumb y título van de la mano*). El título pasa de *Account preferences* a **Preferences**, como el menú y el rastro.

## Pantalla nueva desde red.dev (2026-11-25)

Julián: *"diseñar en base a nuestro design system, componentes, textos y tamaños la parte de Preferences"*, con un video
de red.dev (`/settings/preferences`, *Account Preferences*). Era un placeholder ("Coming soon").

### Qué tiene red.dev

- Título *Account Preferences* con bajada.
- Card *Appearance* › *Theme*: Light (*Tema claro*) y Dark (*Tema oscuro*); elegir Dark cambia la app al instante.
- Card *Live Preview* al costado: el día de hoy en el formato elegido (*CURRENT DISPLAY · 11/25/2026 · Reflects current
  date*).
- Card *Localization & Regional* › *Preferred Date Format*: MM/DD/YYYY (Month/Day/Year), DD/MM/YYYY (Day/Month/Year) y
  YYYY-MM-DD (Year-Month-Day).
- Sin Save: se aplica al elegir.

### Decisiones

1. **Una columna** (hasta 880 px) con dos cards (`settings/primitives › Card`): *Appearance* y *Localization & regional*.
   En red.dev la card de Appearance ocupa media pantalla vacía al lado de la vista previa.
2. **La vista previa va debajo de los formatos**, en una card interna: muestra el cambio donde se hace. Mismos textos
   (*Live preview*, *Reflects current date*).
3. **Opciones como cards con su punto** (el patrón de *OpcionDireccion* en Relationships), con título y bajada; flechas
   para moverse entre ellas, como un radiogroup. Celular: una por fila.
4. **Sin Save**, como red.dev: elegir un formato lo guarda y lo confirma con un toast (*Dates will show as …*). Se guarda
   en el navegador (`preferences:date-format`) hasta que haya backend.
5. **Dark queda a la vista, deshabilitado y con *Coming soon***: los colores de la app (`src/index.css`) no tienen versión
   oscura, así que prenderlo rompería la lectura. Prefiero mostrarlo honesto a esconderlo o a dejarlo roto.
6. Sin bajada debajo del título (regla de Settings). *Account preferences* en minúscula, como el resto de los títulos.

### Anomalías

- *Tema claro* / *Tema oscuro* en castellano en una app en inglés: pasan a *Light theme* / *Dark theme*.

### Pendiente / a validar

1. Que el formato elegido se use en toda la app (hoy las fechas salen de `fechaMDA` y de cada pantalla): es trabajo del
   dev, con la preferencia guardada por usuario en el backend.
2. El tema oscuro: tokens oscuros para todo `src/index.css`.
3. Con usuarios: si el formato es una preferencia de cada persona o de la clínica (red.dev la llama *Account
   Preferences* y el menú dice *Manage user preferences*).

## Rediseño (2026-11-25, segunda vuelta)

Julián: *"me gustaría mejorar ese diseño"*. Cambios, mismos textos y opciones:

1. **Una sola card, una fila por sección**: a la izquierda el título y qué hace (*Choose the theme for your portal.* /
   *Preferred date format for dates across your portal. Examples reflect the current date.*), a la derecha las opciones.
   Es el patrón de settings de las apps SaaS: se lee de arriba abajo sin cards sueltas.
2. **Theme con miniaturas**: cada opción muestra una mini pantalla (rail azul, encabezado y dos cards) con los tokens de
   la app; Dark sigue deshabilitado con *Coming soon*.
3. **Formato de fecha como lista**, cada opción con su ejemplo de hoy a la derecha (azul la elegida). La *Live preview*
   queda en una línea debajo.

### Fill container (2026-11-25)

Julián: la card y su contenido van a todo el ancho, como las otras pantallas de Settings. Se van el tope de 960 px de la
card y el de 520 px de las opciones; las miniaturas de tema pasan a 120 px de alto para acompañar el ancho.

## Tema oscuro y sin formato de fecha (2026-11-26)

Sin historia de Jira (igual que la pantalla). Julián: *"account preference, armar el modo dark así [habilitamos] esa
opción; la parte de la fecha sacala"*.

### Decisiones

1. **Dark funciona**: se va *Coming soon* y el deshabilitado. Elegir un tema lo aplica al instante y sin Save, como
   red.dev; se guarda en el navegador (`preferences:theme`) hasta que haya backend. `lib/tema.ts` lee, guarda y pone la
   clase `dark` en `<html>`; `main.tsx` la aplica antes de pintar, así no hay parpadeo claro al entrar.
2. **Mismos tokens, otro valor**: `:root.dark` en `src/index.css` redefine los tokens (`ink-*`, `line-*`, `surface-*`,
   `dash-*`, tintes de estado, variables de shadcn). Las pantallas no se tocan una por una.
3. **`bg-surface` en vez de `bg-white`**: token nuevo `--color-surface` (blanco en claro, `#17191e` en oscuro) para el
   fondo de cards, campos, menús y drawers. Se reemplazó `bg-white` / `from-white` / `border-white` en 101 archivos de la
   app; en claro no cambia nada. `bg-white` y `text-white` quedan para lo que va **sobre azul** (texto de botones, los
   puntos del panel del Login), que es blanco en los dos temas.
4. ~~Azul de la marca un poco más claro en oscuro (`#3b78e7`)~~: reemplazado en la segunda vuelta (abajo).
5. **Sombras**: Tailwind compila `shadow-panel` & co. con el valor adentro, así que en oscuro se pisan por clase. Sobre
   negro la sombra no se ve: la card se separa por el tono y una línea blanca tenue.
6. **Miniaturas fieles**: cada una se pinta con su tema aunque la app esté en el otro (`tema-claro` / `tema-oscuro` en
   `index.css`).
7. **Se va *Localization & regional*** (formato de fecha, live preview y su toast). La card queda con una sola fila,
   *Appearance*. `FORMATOS_FECHA` / `formatearFecha` no los usaba nadie más.

### Anomalías / pendiente

- El odontograma de Clinical Mode (embed con su propio CSS) y las ilustraciones de Help / Under construction siguen
  claros en oscuro: son dibujos con colores propios. Pasarlos implica tocar el embed.
- El Storybook sigue sólo en claro (se documenta cuando Julián lo pida).
- Validar con usuarios: contraste del azul en oscuro (punto 4) y si el tema es de la persona o del equipo.
- Para el dev: el tema va guardado por usuario en el backend; leerlo al iniciar sesión.

### Segunda vuelta: research y paleta "dimmed" (2026-11-26)

Julián: *"no me convence mucho, el color contrasta mucho con el negro"*; pidió mirar cómo lo resuelven las marcas top
antes de aplicar.

**Qué hacen** (fuentes: Material 2 *Dark theme*, Apple HIG *Dark Mode*, GitHub Primer y su *Dark Dimmed*, tokens de
Atlassian, la paleta de Google en Gerrit/Android, el rediseño de Linear):

- **Nada de negro**: gris oscuro, a veces azulado. Google `#202124`, GitHub Dimmed `#22272e`, Atlassian `#1D2125`.
  Material pide superficies "lo bastante oscuras para texto blanco", no negras.
- **Texto que no es blanco puro**: Google `#e8eaed`, Atlassian gris azulado. El blanco puro sobre casi negro es lo que
  "vibra".
- **Más arriba = más claro**: Material (overlay blanco según la elevación) y Apple (*base* y *elevated*). La sombra casi
  no se ve en oscuro.
- **Colores desaturados**: Material usa el tono 200 del primario; Google, `blue-300 #8ab4f8` para texto y links.
- **El contraste bajo es una opción buscada**: GitHub creó *Dark Dimmed* para quien pide menos contraste, sin bajar de
  4,5:1 en el texto.

**Qué se aplicó** (sólo cambian valores de `:root.dark`; el claro no se toca):

1. **Fondo `#1b1e23` y cards `#23272d`** (antes `#0f1115` / `#17191e`), en la línea de GitHub Dimmed y Google. Drawers,
   menús y campos siguen la misma escala; el campo queda un poco más hundido (`#1e2227`).
2. **Texto `#e3e6ea`** (antes `#f4f4f5`); secundarios en grises azulados (`#a9afb8`, `#949aa4`), todos ≥ 5:1 sobre la
   card.
3. **Dos azules**: el relleno (botones, chips) `#3b6fcc`, cerca de la marca y con blanco encima a 4,8:1; el texto azul,
   un tono más claro `#86acec` (6,5:1), como el 200 de Material. Es una regla en `index.css` sobre `text-dash-blue`
   con `:where()`, para que un `hover:text-white` le siga ganando.
4. **Estados desaturados**: verdes, rojos, ámbar y violetas en tonos claros para texto y fondos tenues para chips. Los
   botones *success* / *destructive* (y los verdes de la ficha del paciente y de la sala) usan en oscuro su tono medio
   con `dark:`, para que el blanco se lea.

**A validar con usuarios**: si recepción, que pasa el día con la pantalla, lo prefiere así o más oscuro. Si aparecen
las dos preferencias, se puede sumar un tercer tema, como GitHub (Dark / Dark dimmed).

### Tercera vuelta: base negra y tooltips (2026-11-26)

Julián: *"no me gusta, buscaría el negro, si no queda muy apagado"* y *"los tooltips quedaron en blanco y no se ven"*.
Reemplaza los valores de la segunda vuelta; el research sigue valiendo para el texto y los colores.

1. **Base negra, como Vercel o Linear**: página `#050506`, cards `#111113`, menús un escalón más claros. Neutros sin
   tinte azul (zinc), para que el negro se lea negro.
2. **Texto `#ececee`**, no blanco puro (lo que sí se queda del research): sobre la card da 16:1 sin "vibrar".
3. **Colores vivos**: relleno azul `#356fdc` (blanco 4,7:1), texto azul `#7aa7f7`; estados en tonos claros y saturados
   (verde `#4fd08a`, rojo `#f47272`, ámbar `#f2b84b`) sobre fondos tintados oscuros.
4. **Tooltips con token propio `bg-tooltip`**: eran `bg-ink text-white` y en oscuro `ink` es el texto claro, así que
   quedaban blancos con letra blanca. `--color-tooltip` vale `#09090b` en claro (lo mismo que se veía) y `#2a2b31` en
   oscuro, con una línea blanca tenue para despegarse del negro. Se cambió en `ui/tooltip` y en los 16 `TooltipContent`
   que lo pisaban. Para el dev: los tooltips van con `bg-tooltip`, no con `bg-ink`.

### Cuarta vuelta: guía de UX Design Institute (2026-11-26)

Julián pasó una guía (*Dark mode design: a practical guide*, UX Design Institute) y una nota de inspiración (Webflow,
*5 dark mode websites*). Reemplaza los valores de la tercera vuelta; el token `bg-tooltip` se queda.

**Qué dice la guía y cómo se aplicó**

1. *Nada de colores puros*: fondo `#121212` (gris muy oscuro, no negro) y texto `#E0E0E0` (no blanco). Página `#121212`,
   cards `#1e1e1e`, menús y tooltips `#2c2c2c`: más arriba, más claro. Grises neutros, sin tinte.
2. *Bajar la saturación*: su ejemplo de azul, `#357ABD`, es el relleno de botones y chips (blanco encima a 4,5:1). El
   texto azul va un tono más claro, `#86a9d9`. Estados en tonos apagados al estilo Material 200/300 (verde `#74c69d`,
   rojo `#e57373`, ámbar `#e6b85c`, violeta `#b39ddb`) sobre fondos tintados tenues.
3. *Contraste*: texto ≥ 4,5:1 en todos los tokens (`ink` 12,6:1, `ink-muted` 5,2:1 sobre la card). `ink-faint` (3,1:1)
   queda para placeholders y deshabilitados, como en claro.
4. *Sin sombras: bordes y brillos*: `shadow-panel` y `shadow-inner-card` pasan a un borde blanco tenue. El botón primario
   suma `dark:shadow-glow`: un brillo azul del 30% y un filo de luz arriba, lo que la guía sugiere para un CTA.
5. *Texto legible*: Inter en regular, medium y bold, sin pesos finos; nombres y títulos (`dash-name`) un punto más
   claros que el cuerpo, para la jerarquía.
6. *Toggle*: queda en Preferences. Un acceso directo (en el menú del usuario) sería nuevo: se propone aparte.
7. De Webflow: una transición suave al cambiar de tema. `guardarTema` usa `document.startViewTransition` (fundido del
   navegador) y lo saltea con *reduced motion*.

**A validar**: probar con la luz real de recepción y de un consultorio (la guía pide probar con luz fuerte, tenue y a
oscuras).

## Atajo al tema en My account (2026-11-26)

Julián: *"agregale un switch en My account así lo cambio más rápido, que diga light / dark o con algún ícono"*. Era la
propuesta aparte de la cuarta vuelta (la guía pide un toggle "a un clic").

1. **Una fila *Dark mode* en el menú de la cuenta** (`MenuCuenta`, Topbar), en su propio grupo entre Support y Help
   center: sol o luna a la izquierda según el tema activo y el `ui/switch` de la app a la derecha. Un switch y no dos
   botones Light / Dark: el cambio es al instante y son dos estados, el caso del switch en el design system.
2. **Toda la fila es el control** (`role="menuitemcheckbox"`, `aria-checked`): se usa con mouse, flechas y Enter como el
   resto del menú. El `Switch` es sólo el dibujo (`aria-hidden`, sin foco), para no anidar un botón en otro.
3. **El menú no se cierra al tocarlo** (`preventDefault` en `onSelect`): se ve el cambio y se puede volver atrás.
4. Usa `useTema` de `lib/tema.ts`, igual que Preferences: los dos quedan sincronizados.
