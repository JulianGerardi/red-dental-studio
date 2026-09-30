# Portfolio · Julián Gerardi

Sitio personal estático (HTML + CSS + JS, sin dependencias). Estética tipo Vercel/Geist: grilla con líneas de 1px y cruces, tipografía Geist, blanco y negro, y el color solo en las portadas de cada proyecto.

```bash
npx http-server portfolio -p 8090   # http://localhost:8090
```

## Estructura

```
portfolio/
  index.html                  home: hero, métricas, marcas, trabajos, proceso, experiencia, about, contacto
  work/batech.html            Batech AI Platform (Figma: Portfolio › Batech)
  work/confidentally.html     caso con NDA (bloqueado con contraseña)
  work/confidentally-ui.html  design system y Builder con IA
  work/grill.html             GRILL Empresas (app de empleados + panel de cocina)
  assets/site.css             tokens arriba de todo (claro y oscuro), grilla, portadas, animaciones
  assets/site.js              tema, menú mobile, palabras del título, spotlight, copiar mail, lightbox, NDA
  assets/img/                 capturas en WebP (b- Batech, d- dental, ds- design system, g- GRILL)
  _build/                     scripts que generan los HTML
```

## Editar

Los HTML se generan con Python para que el menú, el pie y las portadas sean iguales en todas las páginas. Cambiá el texto en `_build/` y regenerá:

```bash
python3 portfolio/_build/build.py
```

- `_build/common.py`: head, menú, pie, mockups y portadas (`cover_batech`, `cover_dental`, `cover_ds`, `cover_grill`, `cover_mp`).
- `_build/index_page.py`: la home.
- `_build/batech_page.py`: el caso de Batech.
- `_build/cases_page.py`: Confidentally, Confidentally UI y GRILL.

Los colores de marca de cada portada están en `assets/site.css` (`--batech-*`, `--dental-*`, `--ds-*`, `--grill-*`, `--mp-*`).

## Contraseña del caso con NDA

La contraseña actual es `dental2026`. Se guarda como hash SHA-256 en `data-hash` (en `_build/cases_page.py`). Para cambiarla:

```bash
printf 'nueva-clave' | sha256sum
```

Es un candado suave: el contenido está en el HTML, así que sirve para pedir permiso a quien lo lee, no para proteger información sensible.

## Animaciones

- Título de la home y de cada caso: las palabras entran con desenfoque, una tras otra.
- Portadas y paneles: el mockup sube al entrar en pantalla (animación ligada al scroll) y se eleva al pasar el mouse.
- Brillo de colores del hero girando lento, marquesina de marcas y spotlight que sigue al puntero en las tarjetas.
- Con "reducir movimiento" activado en el sistema, todo queda quieto.
