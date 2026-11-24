import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./utils-D-bRdWGo.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{a as i,i as a}from"./DashboardRows-C7XAPoIi.js";import{n as o,r as s}from"./show-more-CHydSrpk.js";function c({tasks:e,limit:t,enCaja:r,llenarAlto:i,cargarAlScroll:s,encuentroAbierto:c,onAccion:d,hoy:p}){let m=[...new Set([...u.filter(t=>e.some(e=>e.kind===t)),...e.map(e=>e.kind)])],h=m.flatMap(t=>e.filter(e=>e.kind===t).sort(f));return h.length===0?null:(0,l.jsx)(o,{total:h.length,limit:t??h.length,enCaja:r,llenarAlto:i,filas:i?`li`:void 0,cargarAlScroll:s,label:`pending tasks`,className:`flex flex-col gap-4`,children:t=>{let r=h.slice(0,t);return m.map(t=>{let i=r.filter(e=>e.kind===t);return i.length?(0,l.jsxs)(`section`,{"aria-label":t,className:`flex flex-col gap-1.5`,children:[(0,l.jsxs)(`p`,{className:n(`text-[11px] font-semibold tracking-wide text-ink-muted uppercase`),children:[t,` · `,e.filter(e=>e.kind===t).length]}),(0,l.jsx)(`ul`,{className:`shadow-hairline flex flex-col divide-y divide-line-soft rounded-lg`,children:i.map((e,t)=>(0,l.jsx)(`li`,{children:(0,l.jsx)(a,{task:e,encuentroAbierto:c?.(e),onAccion:d,hoy:p})},e.id??t))})]},t):null})}})}var l,u,d,f;function p(){return(p=e((()=>{t(),s(),i(),l=r(),u=[`Clinical note`,`Lab orders`,`Prescriptions`,`Referrals`],d=e=>new Date(e).getTime()||0,f=(e,t)=>d(e.expiration)-d(t.expiration)||d(e.register)-d(t.register)||e.person.localeCompare(t.person),c.__docgenInfo={description:``,methods:[],displayName:`PendingTaskList`,props:{tasks:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Identifica la tarea: el menú y Complete this Task la cambian por id (dashboard.md, 2026-11-20). */
  id?: string
  kind: string
  state: string
  person: string
  initials: string
  /** La ficha del paciente: Complete this Task abre su Clinical Mode. */
  patientId?: string
  provider?: string
  register: string
  expiration: string
  /** Ya tiene documento (la orden se pidió, la nota se cerró): se ve el botón PDF. */
  pdf?: boolean
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!1},description:`Identifica la tarea: el menú y Complete this Task la cambian por id (dashboard.md, 2026-11-20).`},{key:`kind`,value:{name:`string`,required:!0}},{key:`state`,value:{name:`string`,required:!0}},{key:`person`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`patientId`,value:{name:`string`,required:!1},description:`La ficha del paciente: Complete this Task abre su Clinical Mode.`},{key:`provider`,value:{name:`string`,required:!1}},{key:`register`,value:{name:`string`,required:!0}},{key:`expiration`,value:{name:`string`,required:!0}},{key:`pdf`,value:{name:`boolean`,required:!1},description:`Ya tiene documento (la orden se pidió, la nota se cerró): se ve el botón PDF.`}]}}],raw:`PendingTask[]`},description:``},limit:{required:!1,tsType:{name:`number`},description:``},enCaja:{required:!1,tsType:{name:`boolean`},description:``},llenarAlto:{required:!1,tsType:{name:`boolean`},description:``},cargarAlScroll:{required:!1,tsType:{name:`boolean`},description:``},encuentroAbierto:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(t: PendingTask) => boolean`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  /** Identifica la tarea: el menú y Complete this Task la cambian por id (dashboard.md, 2026-11-20). */
  id?: string
  kind: string
  state: string
  person: string
  initials: string
  /** La ficha del paciente: Complete this Task abre su Clinical Mode. */
  patientId?: string
  provider?: string
  register: string
  expiration: string
  /** Ya tiene documento (la orden se pidió, la nota se cerró): se ve el botón PDF. */
  pdf?: boolean
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!1},description:`Identifica la tarea: el menú y Complete this Task la cambian por id (dashboard.md, 2026-11-20).`},{key:`kind`,value:{name:`string`,required:!0}},{key:`state`,value:{name:`string`,required:!0}},{key:`person`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`patientId`,value:{name:`string`,required:!1},description:`La ficha del paciente: Complete this Task abre su Clinical Mode.`},{key:`provider`,value:{name:`string`,required:!1}},{key:`register`,value:{name:`string`,required:!0}},{key:`expiration`,value:{name:`string`,required:!0}},{key:`pdf`,value:{name:`boolean`,required:!1},description:`Ya tiene documento (la orden se pidió, la nota se cerró): se ve el botón PDF.`}]}},name:`t`}],return:{name:`boolean`}}},description:`Si el paciente de la tarea tiene un encuentro abierto: habilita su ⋮.`},onAccion:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(t: PendingTask, a: AccionUI) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  /** Identifica la tarea: el menú y Complete this Task la cambian por id (dashboard.md, 2026-11-20). */
  id?: string
  kind: string
  state: string
  person: string
  initials: string
  /** La ficha del paciente: Complete this Task abre su Clinical Mode. */
  patientId?: string
  provider?: string
  register: string
  expiration: string
  /** Ya tiene documento (la orden se pidió, la nota se cerró): se ve el botón PDF. */
  pdf?: boolean
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!1},description:`Identifica la tarea: el menú y Complete this Task la cambian por id (dashboard.md, 2026-11-20).`},{key:`kind`,value:{name:`string`,required:!0}},{key:`state`,value:{name:`string`,required:!0}},{key:`person`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`patientId`,value:{name:`string`,required:!1},description:`La ficha del paciente: Complete this Task abre su Clinical Mode.`},{key:`provider`,value:{name:`string`,required:!1}},{key:`register`,value:{name:`string`,required:!0}},{key:`expiration`,value:{name:`string`,required:!0}},{key:`pdf`,value:{name:`boolean`,required:!1},description:`Ya tiene documento (la orden se pidió, la nota se cerró): se ve el botón PDF.`}]}},name:`t`},{type:{name:`union`,raw:`AccionTarea | 'Complete' | 'PDF'`,elements:[{name:`union`,raw:`'Edit' | 'Request' | 'Activate' | 'Cancel' | 'Delete'`,elements:[{name:`literal`,value:`'Edit'`},{name:`literal`,value:`'Request'`},{name:`literal`,value:`'Activate'`},{name:`literal`,value:`'Cancel'`},{name:`literal`,value:`'Delete'`}]},{name:`literal`,value:`'Complete'`},{name:`literal`,value:`'PDF'`}]},name:`a`}],return:{name:`void`}}},description:``},hoy:{required:!1,tsType:{name:`Date`},description:``}}}})))()}export{p as n,c as t};