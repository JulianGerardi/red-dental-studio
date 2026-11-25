# Settings → Preferences

**Jira**: sin historia. Se buscó *preference*, *theme* y *date format* en `CON`: no hay historia de la pantalla (avisarle
a Julián). Se armó desde el video de red.dev.

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
