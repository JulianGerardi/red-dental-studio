/** "02/28/2026": las fechas de los registros y de los campos, mes/día/año como red.dev (clinical-mode.md, 2026-11-13). */
export const formatMDY = (d: Date) =>
  `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`
