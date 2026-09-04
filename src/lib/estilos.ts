/* Botón flotante de sólo ícono — los círculos que quedan sobre el contenido:
   el zoom del visor, las acciones al borde de Vitals y Radiography.

   Figma 4122:248298: caja blanca, borde gris finito y el **ícono en negro**,
   con el mismo hover que los botones con texto. Sólo acá: los kebabs de tabla
   y los íconos dentro de una card van sueltos, sin borde, como estaban.

   `BOTON_ICONO` (cuadrado) queda para los flotantes que no son redondos. */
export const BOTON_ICONO =
  'flex size-9 shrink-0 items-center justify-center rounded-md border border-[#e4e4e7] bg-white text-[#09090b] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors hover:bg-[#fafafa]'

export const BOTON_ICONO_REDONDO =
  'flex size-10 shrink-0 items-center justify-center rounded-full border border-[#e4e4e7] bg-white text-[#09090b] shadow-[0_2px_8px_rgb(0_0_0/0.12)] transition-colors hover:bg-[#fafafa]'

/** Ícono suelto dentro de una card o una tabla: sin caja, pero **en negro**.
    Un ícono que hace algo —el kebab, el history, el ojo— se dibuja con el
    mismo peso que el texto que acompaña; en gris parecía deshabilitado. */
export const ICONO_SUELTO =
  'flex size-7 shrink-0 items-center justify-center rounded-md text-[#09090b] transition-colors hover:bg-[#f4f4f5]'
