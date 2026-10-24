<!-- Índice general: design-reference/figma/README.md -->

# Relationships & Billing — hallazgos del Figma

Sección `3751:76507`, 6 frames:

| Nodo | Frame | Estado |
|---|---|---|
| `3712:60564` | Relationships & Billing (Populated) | ✅ hecho |
| `3712:59142` | Relationships & Billing (Empty State) | ✅ hecho |
| `3716:61372` | Add Relationship Modal (Search Person) | ✅ hecho |
| `3716:62815` | Add Relationship Modal (Existing Person Selected) | ✅ hecho |
| `3716:63601` | Add Relationship Modal (New Person Form) | ✅ hecho |
| `3716:81940` | Edit Relationship Modal | ✅ hecho |

Se llega desde el ítem **Relationships & Billing** del panel lateral
(`/patients/:id/relationships`).

## Especificación

Card: borde `#e4e4e7`, `px-5 py-4`. Header con avatar circular de 40px en
`#1d56bc`, nombre 15px bold + rol 12px gris, badges outline
(`Legal contact` azul, `Financial contact` verde `#1a804d`, `Household` azul) y
kebab a la derecha. Debajo, un divisor y una fila de campos con icono:
Date of Birth, Phone, Email, Contact Address.

Las cards de **Household/Same Guarantor Patients** son iguales pero con sólo dos
campos (Date of Birth y Email) y sin kebab.

## Add Relationship

Pese al nombre de las capas, **no es un modal**: los tres frames reemplazan el
contenido de la página, con una única card "Find or create person" y
Cancel/Save por fuera. Y no son tres pantallas: son **estados del mismo
formulario**.

1. **Search Person** (`3716:61372`) — sólo el buscador, el checkbox de la
   derecha y el bloque "Assign relationship role" reducido a Role +
   Relationship to Patient.
2. **New Person Form** (`3716:63601`) — el checkbox tildado despliega General
   Information (Country\*, Number\*, Email\*), "Adress Information"
   (Adress line 1\*/2\*, Country\*, Region\*, City\*, Postal Code\*) y
   Direction.
3. **Existing Person Selected** (`3716:62815`) — igual que el anterior, más la
   card de la persona elegida con borde azul: avatar cuadrado `MM`, nombre,
   `DOB:` y `Email:`.

Grilla de dos columnas, gap 20. La card del checkbox arranca a la altura del
input, no del label.

### Anomalías 37 a 43

37. **"Adress"** en el título de sección y en los dos labels, sin la doble D.
38. **Adress line 1 y 2 son selects.** Una dirección escrita a mano no puede
    salir de un desplegable; los otros campos libres (Number, Email, Postal
    Code) sí son inputs.
39. **"Country" aparece dos veces**, una en General Information y otra en
    Adress Information, sin distinguir a qué se refiere cada una.
40. **Direction usa dos preposiciones distintas** para la misma relación
    invertida: "is Guardian **for** John Smith" y "is Guardian **of** Michael
    Miller".
41. **El estado New Person nombra a "Michael Miller"** en las dos opciones de
    Direction, cuando por definición todavía no hay ninguna persona elegida.
42. **No hay botón que lleve a esta pantalla.** Ni el frame poblado ni el vacío
    muestran un "Add relationship"; el kebab de las cards tampoco tiene menú
    dibujado. Se agregó un botón primario junto al título y una entrada
    "Edit relationship" en el kebab — ver Desviaciones.
43. ~~**El texto del checkbox se reutiliza como label de Role.**~~
    **Corregido en el Figma el 2026-08-26.** Ahora el de "Find or create
    person" dice "Add New Person" y los dos de Role dicen **Guardian** y
    **Guarantor**.

## Edit Relationship

Esta **sí** es un modal (`3716:81940`, ancho 780), y se abre encima de la
pantalla anterior. Dos cards: **Person**, con la card de la persona en borde
azul, y **Relationship**, con la aclaración "The direction of this relationship
cannot be changed. To update this, delete the relationship and create a new
one.", Role\* y Relationship to Patient\*. Sin Direction, coherente con esa
aclaración.

El texto da por sentado que **borrar una relación es posible**, pero el borrado
no está diseñado en ningún frame. Por eso el kebab despliega sólo "Edit
relationship".

## Add Relationship pasa a drawer (2026-10-06)

Como en Confidentally 2.0 (`AddRelationshipDrawer`): drawer lg con tres pasos. **Person** (buscar por nombre o Add New
Person con First, Last Name y Email; con la casilla tildada el buscador se deshabilita), **Contact** (General Information
y Adress Information, con los textos del Figma) y **Relationship** (Guardian y/o Guarantor, Direction con las dos frases
armadas con la persona, los roles y el paciente, y Relationship to Patient). Se abre desde el botón y el estado vacío de
Relationships & Billing; `/patients/:id/relationships/new` abre la lista con el drawer abierto. La relación nueva entra
primera, con Legal contact (Guardian) y/o Financial contact (Guarantor). `DIRECTORIO` y `PersonaSeleccionada` se mudaron
al archivo del drawer. Design system: *Components / Patients / AddRelationshipDrawer*.

## Un solo avatar de persona (2026-10-18)

El avatar de cada card deja el círculo de 40px del Figma (ver *Especificación*) y pasa al cuadrado con esquinas
redondeadas de `ui/avatar`, mismo tamaño y color. Las cards de Add relationship ya eran cuadradas. Regla en
`../README.md`.

## "Select person" pasa a `PersonSearchField`, compartido por toda la app (2026-10-20)

Julián: "cuando busco un patient el parte de appointment o en cualquier buscador de la app el diseño debe ser el mismo
que tenemos en add relationship cuando pongo: select person". Buscar una persona se veía distinto según la pantalla:
acá (y en los modales de Insurance) las sugerencias ya eran cards con avatar, DOB y email, y la elegida quedaba con
borde azul y un visto; en New Appointment (Patient, Primary/Additional Provider) y en New Patient (Select Person del
guardián) la misma búsqueda usaba `ui/SearchField`, un menú flotante sin avatar con una sola línea de texto por
sugerencia.

Se extrajo el diseño de acá a `PersonSearchField` (`patients/form.tsx`, al lado de `SearchField`): mismo campo, pero
las sugerencias y la elegida son las cards de Add Relationship -avatar, nombre y hasta dos líneas (`lineas`, como
"DOB: …" / "Email: …")- en vez de un menú flotante, sin resultados mientras no se escribe nada. `AddRelationshipDrawer`
pasa a usarlo (ya no tiene su propio bloque de búsqueda); también se armó con New Appointment, New Patient y los dos
buscadores de persona de Insurance (Select Subscriber, Dependent Patient) — ver `scheduling.md`, `patients.md` e
`insurance.md` (2026-10-20). Fuera de alcance: `PlanFields.tsx` → "Contact" (un contacto de la aseguradora, con su
propia `X` para vaciar al lado, no un buscador de paciente/provider) y los dos displays fijos de
`ManageSubscriptionModal` (muestran al suscriptor/dependiente ya elegido, sin buscador).

**Para el dev:** *Elements / Fields → States → Person search* documenta el campo nuevo y sus estados (vacío,
escribiendo, elegido, deshabilitado). Ver `design-system.md` (2026-10-20).

## Archivar, reactivar y quitar el acceso de Guardian (CON-3958, 2026-10-22)

Historias de Jira CON-3958 (Julián pegó los textos; el ticket pide login y no se pudo abrir desde acá, así que todo sale de lo que pegó):

- **Archive relationship** reemplaza a *Delete relationship*: la relación no se borra, sale de la lista vigente y queda en **Archived**. Pide
  confirmación (`ConfirmDialog`, *Archive relationship*): *Are you sure you want to archive the relationship between [persona] and [paciente]?*; si
  la relación tiene el rol Guardian, suma *[persona] will no longer have guardian access to [paciente]'s profile.* y, **si era su último vínculo de guardián
  activo**, *[His/Her] user account for this practice will be deactivated because [she/he] has no other active guardian relationships.* Botones Cancel /
  Archive relationship. Una relación sólo Guarantor no tiene acceso que quitar: queda la pregunta. No es destructivo (se recupera): botón primario, no rojo.
  El toast conserva *Undo*.
- **Reactivar**: una relación archivada sólo ofrece *Reactivate relationship* en su menú. Abre un drawer para **revisarla** antes de activarla (la persona, sus
  roles, el vínculo, cuándo se archivó) y, con Guardian, qué recupera: *[persona] will have guardian access to [paciente]'s profile again.* y, si le habían dado de
  baja el usuario, *[His/Her] user account for this practice will be reactivated.* (esa línea es la inversa de la del ticket, **no está en el ticket**: para validar).
- **Add Relationship detecta una archivada**: al elegir a alguien que ya tiene una relación archivada con el paciente, debajo del buscador aparece
  *An archived relationship already exists between [paciente] and [persona].* con **Open reactivation**, que cierra el alta y abre la revisión. Es un aviso:
  **no bloquea** seguir (para validar: ¿conviene bloquear el duplicado?).
- **Edit Relationship: quitar Guardian**: abre con los roles y el vínculo que ya tiene la relación. Si se destilda Guardian y se guarda, antes de revocar aparece
  *Remove Guardian access* (pop up, no un mensaje arriba): *[persona] will no longer have guardian access to [paciente].* + la línea de la cuenta si era su último
  vínculo; Cancel vuelve al formulario, **Remove Guardian** guarda. Sumé la validación de siempre en Add: al menos un rol. La bajada ya no dice "delete the
  relationship and create a new one" sino "archive".
- **Filtro en Relationships & Billing**: `Active (n) | Archived (n)` (`ui/tabs`) debajo del título; arranca en Active. Archived muestra las archivadas (con la pill
  *Archived* y *Archived on*) o *No archived relationships*; Household/Same Guarantor Patients sólo se ve en Active (no se archiva).
- **Pronombres**: his/her sale del género de la persona (mock: `GENERO` en `RelationshipDialogs.tsx`); sin dato, "Their… they have".
- **Mock**: dos cards de Jessica Miller (guardián las dos: archivar la primera no desactiva su usuario, la segunda sí) y Michael Miller **archivada** (para ver Archived
  y el aviso de Add Relationship). "Último vínculo de guardián" = otra relación activa con el mismo nombre y rol Guardian.

**Para el dev:** `MenuAcciones` ahora recibe `archivada`, `onArchive` y `onReactivate` (no más `onDelete`); `PersonaCard` suma `onArchive`/`onReactivate` y `archivadaEl`.
Pop ups nuevos en `components/patients/RelationshipDialogs.tsx`; `AddRelationshipDrawer` suma `archivadas` y `onReactivar`; `EditRelationshipModal` suma `inicial`,
`ultimaDeGuardian`, `paciente` y `onGuardar`. Storybook: *Pages / Parts / Relationships* (cards, menús y pop ups), *Pages → Patient Relationships Archived* y *Components /
Patients / AddRelationshipDrawer → Archived Relationship Found*, *EditRelationshipModal → Remove Guardian access*.

## El buscador de persona: sugerencias en un desplegable y ✕ para quitar (2026-10-21)

Julián, sobre `PersonSearchField` (ver 2026-10-20): "esa card debe estar situada en el mismo desplegable del input" y "tengo que tener la opción de eliminar esa opción que elegí".
Las sugerencias dejaron de empujar los campos de abajo: flotan en un desplegable pegado al input (como `SearchField`, con la misma sombra y cierre al tocar afuera), con la
card de cada persona adentro. La elegida sigue debajo del input -es el valor del campo, no algo transitorio- y la tilde verde se cambió por una **✕** que la quita y deja el campo
vacío para buscar a otra (no aparece con el campo deshabilitado). Vale para Add Relationship, New Appointment (Patient, Primary y Additional Provider) y los modales de Insurance.
