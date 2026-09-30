# Portfolio · Julián Gerardi

Sitio personal estático (HTML + CSS + JS, sin build). Se abre directo en el navegador o se sirve con cualquier hosting estático.

```bash
npx http-server portfolio -p 8090   # http://localhost:8090
```

## Estructura

```
portfolio/
  index.html                  home: hero, trabajos, proceso, experiencia, about, contacto
  work/confidentally.html     caso de estudio con NDA (bloqueado con contraseña)
  work/confidentally-ui.html  caso del design system y el Builder con IA
  work/grill.html             caso de GRILL Empresas (app de empleados + panel de cocina)
  assets/site.css             tokens de color y tipografía arriba de todo (claro y oscuro)
  assets/site.js              tema, menú mobile, copiar mail, lightbox, índice y NDA
  assets/img/                 capturas reales en WebP (d- dental, ds- design system, g- GRILL, mp- Mercado Play)
```

Mercado Play no tiene página propia: la tarjeta de la home recrea la portada en código y abre el archivo de Figma. Cuando haya contenido del challenge se puede sumar `work/mercado-play.html` copiando la estructura de `work/grill.html`.

## Cambiar colores

Todo sale de los tokens al principio de `assets/site.css`. `--select` es el violeta de selección (acento), `--cursor-1` y `--cursor-2` los cursores, y cada proyecto tiene su gradiente (`--dental-*`, `--ds-*`, `--grill-*`, `--mp-*`). El tema oscuro redefine los mismos tokens en los dos bloques de abajo.

## Contraseña del caso con NDA

La contraseña actual es `dental2026`. Se guarda como hash SHA-256 en el atributo `data-hash` de `work/confidentally.html`. Para cambiarla:

```bash
printf 'nueva-clave' | sha256sum
```

y pegá el resultado en `data-hash`. Es un candado suave: el contenido está en el HTML, así que sirve para pedir permiso a quien lo lee, no para proteger información sensible.

## Capturas

Las capturas se sacaron corriendo la app dental (`npm run dev`), el Storybook compilado y los artifacts de GRILL con Playwright, a 2x, y se pasaron a WebP. Si una pantalla cambia, se reemplaza el archivo con el mismo nombre.
