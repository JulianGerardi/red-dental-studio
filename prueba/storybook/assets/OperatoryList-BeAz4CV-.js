import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{$ as r,et as i}from"./iframe-QFXTXcBk.js";function a({rooms:e,turnos:t,onSelect:n}){let[i,a]=(0,o.useState)([]),c=e=>a(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);return e.length===0?null:(0,s.jsx)(`div`,{role:`group`,"aria-label":`Rooms`,className:`flex flex-col gap-2.5`,children:e.map(e=>(0,s.jsx)(r,{room:e,turnos:t.filter(t=>t.operatory===e.name),abierta:i.includes(e.name),onToggle:()=>c(e.name),onSelect:n},e.name))})}var o,s;function c(){return(c=e((()=>{o=t(),i(),s=n(),a.__docgenInfo={description:``,methods:[],displayName:`OperatoryList`,props:{rooms:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  name: string
  status: OperatoryStatus
  patientsToday: number
  provider: string
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`'Available' | 'Busy' | 'Unavailable'`,elements:[{name:`literal`,value:`'Available'`},{name:`literal`,value:`'Busy'`},{name:`literal`,value:`'Unavailable'`}],required:!0}},{key:`patientsToday`,value:{name:`number`,required:!0}},{key:`provider`,value:{name:`string`,required:!0}}]}}],raw:`Operatory[]`},description:``},turnos:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  name: string
  initials: string
  provider: string
  operatory: string
  time: string
  /* Para qué viene: lo muestra la línea del día de cada sala (OperatoryCard). */
  motivo?: string
  /* Botón del pie. En el frame casi todas dicen "Check Out" y una "Cancel"; Julián sumó "Check In" (2026-10-13). */
  accion?: AccionTurno
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`operatory`,value:{name:`string`,required:!0}},{key:`time`,value:{name:`string`,required:!0}},{key:`motivo`,value:{name:`string`,required:!1}},{key:`accion`,value:{name:`union`,raw:`'Check In' | 'Check Out' | 'Cancel'`,elements:[{name:`literal`,value:`'Check In'`},{name:`literal`,value:`'Check Out'`},{name:`literal`,value:`'Cancel'`}],required:!1}}]}}],raw:`Appointment[]`},description:`Los turnos del día, de todas las salas: cada card toma los suyos por nombre.`},onSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(appt: Appointment, el: HTMLElement) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  name: string
  initials: string
  provider: string
  operatory: string
  time: string
  /* Para qué viene: lo muestra la línea del día de cada sala (OperatoryCard). */
  motivo?: string
  /* Botón del pie. En el frame casi todas dicen "Check Out" y una "Cancel"; Julián sumó "Check In" (2026-10-13). */
  accion?: AccionTurno
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`operatory`,value:{name:`string`,required:!0}},{key:`time`,value:{name:`string`,required:!0}},{key:`motivo`,value:{name:`string`,required:!1}},{key:`accion`,value:{name:`union`,raw:`'Check In' | 'Check Out' | 'Cancel'`,elements:[{name:`literal`,value:`'Check In'`},{name:`literal`,value:`'Check Out'`},{name:`literal`,value:`'Cancel'`}],required:!1}}]}},name:`appt`},{type:{name:`HTMLElement`},name:`el`}],return:{name:`void`}}},description:``}}}})))()}export{c as n,a as t};