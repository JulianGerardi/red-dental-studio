import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { FindingStatus } from './data'

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
  monitor: { label: 'Start Monitoring', title: 'Start Monitoring', question: 'Are you sure you want to start monitoring this condition?', verb: 'start monitoring', status: 'Monitoring' },
  treat: { label: 'Start Treatment', title: 'Start Treatment', question: 'Are you sure you want to start treating this condition?', verb: 'start treating', status: 'In Treatment' },
  treated: { label: 'Mark As Treated', title: 'Mark As Treated', question: 'Are you sure you want to mark this condition as treated?', verb: 'mark this condition as treated', status: 'Treated' },
  'externally-treated': { label: 'Mark As Externally Treated', title: 'Mark As Externally Treated', question: 'Are you sure this condition was treated outside the clinic?', verb: 'mark this condition as treated elsewhere', status: 'Externally Treated' },
  'no-treatment': { label: 'Mark As No Treat. Needed', title: 'No Treatment Needed', question: 'Are you sure this condition needs no treatment?', verb: 'close this condition without treatment', status: 'No Treatment Needed', destructive: true },
  'patient-declined': { label: 'Mark As Patient Declined', title: 'Patient Declined', question: 'Are you sure you want to record that the patient declined treatment?', verb: 'record that the patient declined', status: 'Patient Declined', destructive: true },
  'clinic-declined': { label: 'Mark As Clinic Declined', title: 'Clinic Declined', question: 'Are you sure you want to record that the clinic declined treatment?', verb: 'record that the clinic declined', status: 'Clinic Declined', destructive: true },
  discard: { label: 'Discard', title: 'Discard Procedure', question: 'Are you sure you want to discard this procedure?', verb: 'discard this procedure', status: 'Discarded', destructive: true },
  /* "This can't be undone" del original no aplica acá: como toda eliminación
     en la app, se puede deshacer desde el toast. */
  delete: { label: 'Delete', title: 'Delete Finding', question: 'Are you sure you want to delete this finding?', verb: 'delete this finding', destructive: true },
}
`})))()}export{n,i as r,r as t};