<!-- Índice general: design-reference/figma/README.md -->

# Treatments — hallazgos del Figma

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)):

- Epics: CON-1138 Cases · CON-2709 Cases 2 · CON-2982 [Post Demo] Cases · CON-3939 Treatment & Case · CON-3207
  Treatment / Workflow · CON-3695 Caso y estimaciones final MVP · CON-2140 Documents 2.0
  ([historias](https://confidetally.atlassian.net/issues?jql=parent%20in%20%28CON-1138%2CCON-2709%2CCON-2982%2CCON-3939%2CCON-3207%2CCON-3695%2CCON-2140%29%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20AND%20%28labels%20is%20EMPTY%20OR%20labels%20%21%3D%20%22design-system%22%29%20ORDER%20BY%20created%20DESC))
- Historias de abril: CON-2861
  ([Jira](https://confidetally.atlassian.net/issues?jql=key%20in%20%28CON-2861%29%20ORDER%20BY%20key%20ASC))

Sección **"Patient Profile — Treatment Plan & Documents"** (`3763:254355`), 4 frames:

| Nodo | Frame | Estado |
|---|---|---|
| `3768:803852` | Treatment Plan (Populated) | ✅ hecho |
| `3769:808875` | Treatment Plan (Empty State) | ✅ hecho |
| `3769:812962` | Treatment Plan (Empty State — Mislabeled Insurance Copy) | no replicado, ver abajo |
| `3768:794930` | Patient Profile — Documents (Default) | ✅ hecho |

Se llega desde el ítem **Treatments** del panel lateral del perfil
(`/patients/:id/treatments`).

## Especificación de la card

Header blanco: avatar `#eff4ff` con iniciales `#0056ef`, nombre 13px bold +
"Patient" 11px gris, badge de estado a la derecha.
Cuerpo `#fafafa`: código `TO01 - Acute / Emergency` 11px gris, nombre del
tratamiento 13px bold `#0056ef`, barra de progreso de 3px
(**verde `#28c563`**, **roja `#ef4444`** si está cancelado) y la nota debajo.
Footer blanco: "Created On" y "Total Amount" con iconos en `#0056ef`.

Badges: Completed `#1a804d`/`#f0fcf5`, Expired `#b22626`/`#fff2f2`.

## Anomalías nuevas (29 a 32)

29. **El título dice "Treatments plan"** (plural + singular) mientras el
    breadcrumb dice "Treatment plan". No coinciden entre sí.
30. **El breadcrumb termina en un chevron suelto**, sin nada después.
31. **Una card tiene badge "Expired" pero la nota dice "Cancelled"** — dos
    vocabularios para el mismo estado.
32. **El propio archivo admite un bug en el nombre de una capa:**
    `Treatment Plan (Empty State — Mislabeled Insurance Copy)`. Es una variante
    del estado vacío con copy de seguros pegado por error. **No se replicó**: se
    tomó el estado vacío correcto (`3769:808875`), porque replicar un frame que
    el propio diseño marca como equivocado no aporta.


---

## Documents

**La pantalla real es la sección `3753:80194`**, no el frame `3768:794930` que
está dentro de esta sección. Ese último repite el layout de Overview con
Documents activo y **no contiene ningún documento** — es una vista de perfil, no
el manager. La implementación usa `3753:80195`.

### Documents Manager (`3753:80195`)

Panel lateral + widget "Documents Manager": toolbar con buscador de 265×32 y un
botón de descarga a la derecha, y tabla de archivos con checkbox, icono de
archivo en `#1d56bc`, nombre, badge de firma y fecha.

Badges: `Signed` verde `#1a804d`/`#f0fcf5`, `Pending Signature` ámbar
`#99660d`/`#fffaf0`.

### El banner de garante quedó fuera
El banner del frame `3768:794930` **pertenece a otro flujo** (paciente menor sin
garante) y no va en Documents. Se conserva sin usar en
`src/components/patients/GuarantorBanner.tsx` para engancharlo cuando ese flujo
exista.

### Anomalías nuevas (33 a 36)

33. **El frame `3768:794930` se llama "Documents" pero no contiene documentos**:
    repite el contenido de Overview.
34. **El banner dice "This patient is a minor"** mientras el perfil del mismo
    frame dice **50 years**.
35. **Capas muertas declaradas en el propio nombre**: `Legacy Sidebar (Hidden,
    Unused)` —una versión vieja del panel lateral— y `Action Button (Hidden)`,
    ambas ocultas dentro del frame de Documents. También hay un `search-row`
    suelto en `x=1407` con 1px de ancho, fuera del canvas.
36. **El footer de la tabla de documentos dice "Showing 3 of 15 referrals"** —
    otra instancia del mismo `table/referral-table` sin relabelar (ver anomalía 13).

## Treatments con "Show more" (2026-10-12)

Regla de listas largas (ver `dashboard.md`, *Elements / Show more*): se ven los primeros 4 planes (dos filas de la
grilla) y "Show 4 more" abre el resto con scroll adentro; el degradé de abajo va del color de la página porque las
cards están sobre el fondo gris.

## Documents Manager alineado a las tablas por defecto (2026-10-12)

Julián: "la tabla de documents manager no está alineada a las tablas que tenemos por default". Se apartaba del patrón
de Locations y Employees en tres cosas, y ahora lo sigue:

- **Encabezado:** `SettingsPageHeader` (título con la acción alineada, sin bajada porque el Figma no la trae) y el
  buscador compartido `SettingsSearch`: campo de 36px y hasta 320px con el botón **Search** al lado (antes un campo
  propio de 265×32 sin botón).
- **Descarga:** el botón de descarga va alineado con el título, como la acción principal de las otras tablas.
- **Last Update** alineada a la izquierda como el resto de las columnas (estaba a la derecha).

Desviación deliberada sobre el Figma (`3753:80195`), que traía el buscador de 265×32.

## Un solo avatar de persona (2026-10-18)

El avatar del header de la card deja el `#eff4ff` / `#0056ef` del Figma (ver *Especificación de la card*) y pasa a
`ui/avatar` de 36px: azul con iniciales blancas, como el resto de la app. Regla en `../README.md`.
