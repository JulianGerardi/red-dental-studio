<!-- Índice general: design-reference/figma/README.md -->

# Treatments — hallazgos del Figma

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
