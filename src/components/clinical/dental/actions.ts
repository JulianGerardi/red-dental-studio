import type { FindingStatus } from './data'

/* Cada entrada del menú de acciones de un finding, en el orden del frame. */
export type FindingAction =
  | 'edit' | 'monitor' | 'treat' | 'treated' | 'externally-treated'
  | 'no-treatment' | 'patient-declined' | 'clinic-declined' | 'discard' | 'delete'

export type ActionCopy = {
  label: string
  title: string
  question: string
  verb: string
  status?: FindingStatus
  destructive?: boolean
}

export const ACTIONS: Record<Exclude<FindingAction, 'edit'>, ActionCopy> = {
  monitor: { label: 'Start monitoring', title: 'Start monitoring', question: 'Are you sure you want to start monitoring this condition?', verb: 'start monitoring', status: 'Monitoring' },
  treat: { label: 'Start treatment', title: 'Start treatment', question: 'Are you sure you want to start treating this condition?', verb: 'start treating', status: 'In treatment' },
  treated: { label: 'Mark as treated', title: 'Mark as treated', question: 'Are you sure you want to mark this condition as treated?', verb: 'mark this condition as treated', status: 'Treated' },
  'externally-treated': { label: 'Mark as externally treated', title: 'Mark as externally treated', question: 'Are you sure this condition was treated outside the clinic?', verb: 'mark this condition as treated elsewhere', status: 'Externally treated' },
  'no-treatment': { label: 'Mark as no treat. needed', title: 'No treatment needed', question: 'Are you sure this condition needs no treatment?', verb: 'close this condition without treatment', status: 'No treatment needed', destructive: true },
  'patient-declined': { label: 'Mark as patient declined', title: 'Patient declined', question: 'Are you sure you want to record that the patient declined treatment?', verb: 'record that the patient declined', status: 'Patient declined', destructive: true },
  'clinic-declined': { label: 'Mark as clinic declined', title: 'Clinic declined', question: 'Are you sure you want to record that the clinic declined treatment?', verb: 'record that the clinic declined', status: 'Clinic declined', destructive: true },
  discard: { label: 'Discard', title: 'Discard procedure', question: 'Are you sure you want to discard this procedure?', verb: 'discard this procedure', status: 'Discarded', destructive: true },
  /* "This can't be undone" del original no aplica acá: como toda eliminación
     en la app, se puede deshacer desde el toast. */
  delete: { label: 'Delete', title: 'Delete finding', question: 'Are you sure you want to delete this finding?', verb: 'delete this finding', destructive: true },
}
