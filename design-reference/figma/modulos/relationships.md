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
