/* Clinical Mode, tercera tanda (2026-11-16): Dental Assessment en profundidad (Tooth information, hallazgos, New Procedure,
   Edit Procedure). Se contrasta con Platform Design · Clinical Exam — Dental Assessment. */
import { clic, pasos, texto } from './_util.mjs'

const CM = '/patients/patient-0001/clinical-mode'
const DA = pasos(clic('Dental assessment'))

export default {
  pagina: '🦷 Clinical Mode',
  orden: 12,
  resumen: 'Dental Assessment en profundidad: información del diente, acciones sobre un hallazgo y New / Edit Procedure.',
  jira: ['CON-2083', 'CON-1751', 'CON-2833', 'CON-2067'],
  flujos: [
    {
      nombre: 'Dental Assessment — Tooth & Findings',
      rol: 'Odontólogo',
      jira: ['CON-2083', 'CON-2067'],
      resumen: 'Qué se sabe del diente y qué se puede hacer con un hallazgo: ver, editar, tratar, descartar o borrar.',
      pantallas: [
        { nombre: 'Dental assessment', ruta: CM, hacer: DA, alto: 'fijo', nota: 'Odontograma con el panel de hallazgos (Findings / Review exam), la selección de dientes y las acciones Add Procedure y Add Condition.' },
        { nombre: 'Tooth information', hacer: clic(/Tooth information/), alto: 'fijo', nota: 'La información del diente elegido: caries, obturaciones, endodoncias, diagnósticos, desgaste, estado periodontal.' },
        { nombre: 'Finding menu', ruta: CM, hacer: pasos(DA, clic(/^Actions for Tooth 3$/)), alto: 'fijo', nota: 'El ⋮ de un hallazgo: View full record, Edit, Start Monitoring / Treatment, Mark as…, Discard y Delete.' },
        { nombre: 'View full record', hacer: clic('View full record', 'menuitem'), alto: 'fijo', nota: 'El registro completo del hallazgo con su historia.' },
        { nombre: 'Edit Finding', ruta: CM, hacer: pasos(DA, clic(/^Actions for Tooth 3$/), clic(/^Edit$/, 'menuitem')), alto: 'fijo', nota: 'Edit Finding: descriptors, fecha, examen, provider, diente y superficies.' },
        { nombre: 'Discard finding', ruta: CM, hacer: pasos(DA, clic(/^Actions for Tooth 3$/), clic(/^Discard$/, 'menuitem')), alto: 'fijo', nota: 'Discard pide confirmar: el hallazgo queda en el historial como Discarded.' },
        { nombre: 'Delete finding', ruta: CM, hacer: pasos(DA, clic(/^Actions for Tooth 3$/), clic(/^Delete$/, 'menuitem')), alto: 'fijo', nota: 'Delete lo borra del todo (a diferencia de Discard).' },
      ],
    },
    {
      nombre: 'Dental Assessment — New Procedure',
      rol: 'Odontólogo',
      jira: ['CON-1751', 'CON-2833'],
      resumen: 'Elegir el procedimiento de un diente: planificado o ya existente, con el área y las superficies.',
      pantallas: [
        { nombre: 'New Procedure · Planned', ruta: CM, hacer: pasos(DA, clic('Add Procedure')), alto: 'fijo', nota: 'La lista de códigos CDT con pestañas Existing y Planned y el área elegida (Upper left).' },
        { nombre: 'Filter by area', hacer: clic('Filter by treatment area'), alto: 'fijo', nota: 'El filtro por área: diente, superficie, cuadrante o arcada.' },
        { nombre: 'New Procedure · Existing', ruta: CM, hacer: pasos(DA, clic('Add Procedure'), clic(/Existing/, 'tab')), alto: 'fijo', nota: 'Existing registra lo que el paciente ya tiene hecho.' },
        { nombre: 'Procedure · Surfaces', ruta: CM, hacer: pasos(DA, clic('Add Procedure'), clic(/Existing/, 'tab'), clic(/D2140 on tooth/), clic(/Next Step/)), alto: 'fijo', nota: 'Si el procedimiento lleva superficie, un segundo paso la elige sobre el diente.' },
      ],
    },
  ],
}
