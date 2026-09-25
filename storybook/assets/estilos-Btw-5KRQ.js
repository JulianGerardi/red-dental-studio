import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Botón flotante de sólo ícono — los círculos que quedan sobre el contenido:
   el zoom del visor, las acciones al borde de Vitals y Radiography.

   Figma 4122:248298: caja blanca, borde gris finito y el **ícono en negro**,
   con el mismo hover que los botones con texto. Sólo acá: los kebabs de tabla
   y los íconos dentro de una card van sueltos, sin borde, como estaban.

   \`BOTON_ICONO\` (cuadrado) queda para los flotantes que no son redondos. */
export const BOTON_ICONO =
  'flex size-9 shrink-0 items-center justify-center rounded-md border border-line bg-white text-ink shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors hover:bg-surface-subtle'

export const BOTON_ICONO_REDONDO =
  'flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_2px_8px_rgb(0_0_0/0.12)] transition-colors hover:bg-surface-subtle'

/** Ícono suelto dentro de una card o una tabla: sin caja, pero **en negro**.
    Un ícono que hace algo —el kebab, el history, el ojo— se dibuja con el
    mismo peso que el texto que acompaña; en gris parecía deshabilitado. */
export const ICONO_SUELTO =
  'flex size-7 shrink-0 items-center justify-center rounded-md text-ink transition-colors hover:bg-surface-muted'

/* Contenedor de página del módulo de Patients (Dashboard, Scheduling,
   Billing, Patients y todo /patients/:id/*): a 1400px fijo, una pantalla de
   1920 o más dejaba una franja vacía a la derecha sin usar. El tope no
   desaparece del todo -a diferencia de Settings, que no tiene uno- porque
   varias de estas pantallas reparten contenido con \`justify-between\`: sin
   techo, en un monitor gigante esos huecos se estiran y la fila se ve rota,
   el mismo problema que ya está documentado (y resuelto con su propio tope)
   en \`ClinicalMode.tsx\`. \`2xl:\` sólo entra a partir de 1536px de viewport,
   así que no cambia nada en las pantallas de todos los días. */
export const ANCHO_PAGINA = 'mx-auto w-full max-w-[1400px] 2xl:max-w-[1800px]'

export const CONTENEDOR_PAGINA = \`\${ANCHO_PAGINA} px-4 py-6 sm:px-6\`
`})))()}export{n,i as r,r as t};