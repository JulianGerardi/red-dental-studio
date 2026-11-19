/* Clinical Mode, quinta tanda (2026-11-16): editar un hallazgo de región y los procedimientos del Problem List. Cierra Dental
   Assessment junto con clinical-mode-3.mjs. Los pop-ups de New Condition de Platform Design siguen sin equivalente en la app. */
import { clic, pasos } from './_util.mjs'

const CM = '/patients/patient-0001/clinical-mode'
const DA = pasos(clic('Dental assessment'))
const PROC = pasos(clic('View Problem List'), clic('Procedures', 'tab'))

export default {
  pagina: '🦷 Clinical Mode',
  orden: 14,
  resumen: 'Editar un hallazgo de región y los procedimientos desde el Problem List.',
  jira: ['CON-2083', 'CON-1751', 'CON-2833', 'CON-2067'],
  flujos: [
    {
      nombre: 'Dental Assessment — Edit Condition & Procedure',
      rol: 'Odontólogo',
      jira: ['CON-2083', 'CON-1751', 'CON-2833'],
      resumen: 'Corregir un hallazgo de región (Soft Palate) y editar, completar o discontinuar un procedimiento.',
      pantallas: [
        { nombre: 'Finding menu · región', ruta: CM, hacer: pasos(DA, clic(/^Actions for Soft Palate$/)), alto: 'fijo', nota: 'El ⋮ de un hallazgo de región (Soft Palate) ofrece las mismas acciones que el de un diente.' },
        { nombre: 'Edit Condition · región', hacer: clic(/^Edit$/, 'menuitem'), alto: 'fijo', nota: 'Edit Finding de una región: descriptors, fecha, examen, provider y notas; sin superficies ni diente.' },
        { nombre: 'Problem List · Procedures', ruta: CM, hacer: pasos(clic('View Problem List'), clic('Procedures', 'tab')), alto: 'fijo', nota: 'La pestaña Procedures de la Problem List lista los procedimientos con su estado.' },
        { nombre: 'Procedure actions', hacer: clic(/^Actions for D0220/), alto: 'fijo', nota: 'El ⋮ de un procedimiento: Edit, Complete y Discontinue.' },
        { nombre: 'Edit Procedure', ruta: CM, hacer: pasos(PROC, clic(/^Actions for D0220/), clic(/^Edit/, 'menuitem')), alto: 'fijo', nota: 'Edit procedure: sólo se editan los campos autorizados y las notas no cambian el estado clínico.' },
        { nombre: 'Complete procedure', ruta: CM, hacer: pasos(PROC, clic(/^Actions for D0220/), clic(/^Complete/, 'menuitem')), alto: 'fijo', nota: 'Complete lo marca como realizado; en un procedimiento con consentimiento pendiente se bloquea.' },
        { nombre: 'Discontinue procedure', ruta: CM, hacer: pasos(PROC, clic(/^Actions for D0220/), clic(/^Discontinue/, 'menuitem')), alto: 'fijo', nota: 'Discontinue lo interrumpe y lo deja registrado.' },
      ],
    },
  ],
}
