import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{$ as r,et as i}from"./iframe-D282qwB2.js";import{b as a,h as o}from"./dashboard-data-BsDrsbk6.js";function s({rooms:e,turnos:t,dia:n,onSelect:i}){let[o,s]=(0,c.useState)([]),u=e=>s(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);return e.length===0?null:(0,l.jsx)(`div`,{role:`group`,"aria-label":`Rooms`,className:`flex flex-col gap-2.5`,children:e.map(e=>(0,l.jsx)(r,{room:e,turnos:t.filter(t=>t.operatory===e.name),resumen:n&&a(e,n),abierta:o.includes(e.name),onToggle:()=>u(e.name),onSelect:i},e.name))})}var c,l;function u(){return(u=e((()=>{c=t(),i(),o(),l=n(),s.__docgenInfo={description:``,methods:[],displayName:`OperatoryList`,props:{rooms:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  name: string
  status: OperatoryStatus
  patientsToday: number
  provider: string
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`'Available' | 'Busy' | 'No bookings' | 'Unavailable'`,elements:[{name:`literal`,value:`'Available'`},{name:`literal`,value:`'Busy'`},{name:`literal`,value:`'No bookings'`},{name:`literal`,value:`'Unavailable'`}],required:!0}},{key:`patientsToday`,value:{name:`number`,required:!0}},{key:`provider`,value:{name:`string`,required:!0}}]}}],raw:`Operatory[]`},description:``},turnos:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  name: string
  initials: string
  provider: string
  operatory: string
  time: string
  /* Para qué viene: lo muestra la línea del día de cada sala (OperatoryCard). */
  motivo?: string
  /* Botón del pie. En el frame casi todas dicen "Check Out" y una "Cancel"; Julián sumó "Check In" (2026-10-13). */
  accion?: AccionTurno
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`operatory`,value:{name:`string`,required:!0}},{key:`time`,value:{name:`string`,required:!0}},{key:`motivo`,value:{name:`string`,required:!1}},{key:`accion`,value:{name:`union`,raw:`'Check In' | 'Check Out' | 'Cancel'`,elements:[{name:`literal`,value:`'Check In'`},{name:`literal`,value:`'Check Out'`},{name:`literal`,value:`'Cancel'`}],required:!1}}]}}],raw:`Appointment[]`},description:`Los turnos del día, de todas las salas: cada card toma los suyos por nombre.`},dia:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  appointments: Turno[]
  waiting: EnEspera[]
  rooms: Operatory[]
  tasks: PendingTask[]
  encuentros: { abiertos: number; promedio: string }
}`,signature:{properties:[{key:`appointments`,value:{name:`Array`,elements:[{name:`intersection`,raw:`Appointment & {
  completado?: boolean
  enCurso?: boolean
  /** Cerrado sin atenderse: sale de Appointments y de la Waiting Room. Cancelled libera el lugar; No Show no (CON-1827, CON-1828). */
  cerrado?: 'Cancelled' | 'No Show'
}`,elements:[{name:`Appointment`},{name:`signature`,type:`object`,raw:`{
  completado?: boolean
  enCurso?: boolean
  /** Cerrado sin atenderse: sale de Appointments y de la Waiting Room. Cancelled libera el lugar; No Show no (CON-1827, CON-1828). */
  cerrado?: 'Cancelled' | 'No Show'
}`,signature:{properties:[{key:`completado`,value:{name:`boolean`,required:!1}},{key:`enCurso`,value:{name:`boolean`,required:!1}},{key:`cerrado`,value:{name:`union`,raw:`'Cancelled' | 'No Show'`,elements:[{name:`literal`,value:`'Cancelled'`},{name:`literal`,value:`'No Show'`}],required:!1},description:`Cerrado sin atenderse: sale de Appointments y de la Waiting Room. Cancelled libera el lugar; No Show no (CON-1827, CON-1828).`}]}}]}],raw:`Turno[]`,required:!0}},{key:`waiting`,value:{name:`Array`,elements:[{name:`intersection`,raw:`Appointment & { nuevo?: boolean; etapa: EtapaEspera; desde?: string }`,elements:[{name:`Appointment`},{name:`signature`,type:`object`,raw:`{ nuevo?: boolean; etapa: EtapaEspera; desde?: string }`,signature:{properties:[{key:`nuevo`,value:{name:`boolean`,required:!1}},{key:`etapa`,value:{name:`unknown[number]`,raw:`(typeof ETAPAS_ESPERA)[number]`,required:!0}},{key:`desde`,value:{name:`string`,required:!1}}]}}]}],raw:`EnEspera[]`,required:!0}},{key:`rooms`,value:{name:`Array`,elements:[{name:`Operatory`}],raw:`Operatory[]`,required:!0}},{key:`tasks`,value:{name:`Array`,elements:[{name:`PendingTask`}],raw:`PendingTask[]`,required:!0}},{key:`encuentros`,value:{name:`signature`,type:`object`,raw:`{ abiertos: number; promedio: string }`,signature:{properties:[{key:`abiertos`,value:{name:`number`,required:!0}},{key:`promedio`,value:{name:`string`,required:!0}}]},required:!0}}]}},description:`Con el día completo, cada sala calcula su estado, Now y Next (dashboard.md, 2026-11-19).`},onSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(appt: Appointment, el: HTMLElement) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  name: string
  initials: string
  provider: string
  operatory: string
  time: string
  /* Para qué viene: lo muestra la línea del día de cada sala (OperatoryCard). */
  motivo?: string
  /* Botón del pie. En el frame casi todas dicen "Check Out" y una "Cancel"; Julián sumó "Check In" (2026-10-13). */
  accion?: AccionTurno
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`operatory`,value:{name:`string`,required:!0}},{key:`time`,value:{name:`string`,required:!0}},{key:`motivo`,value:{name:`string`,required:!1}},{key:`accion`,value:{name:`union`,raw:`'Check In' | 'Check Out' | 'Cancel'`,elements:[{name:`literal`,value:`'Check In'`},{name:`literal`,value:`'Check Out'`},{name:`literal`,value:`'Cancel'`}],required:!1}}]}},name:`appt`},{type:{name:`HTMLElement`},name:`el`}],return:{name:`void`}}},description:``}}}})))()}export{u as n,s as t};