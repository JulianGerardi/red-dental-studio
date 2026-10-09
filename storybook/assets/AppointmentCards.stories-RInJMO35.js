import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,r as i}from"./toaster-B6mRBNx3.js";import{n as a,r as o}from"./AppointmentSlotPicker-D0hiSqeD.js";import{i as s,r as c}from"./date-picker-hEqgrQfM.js";import{d as l,l as u,s as d}from"./calendar-data-DcMkX9Kf.js";import{n as f,t as p}from"./TurnoCalendario-CPjSEj84.js";import{_t as m,vt as h,xt as g}from"./iframe-Drd78qpx.js";import{c as _,i as ee,l as v,r as y,s as b,t as x,u as S}from"./kit-VhBMbBcY.js";import{n as C,r as w}from"./PatientDetailsPopover-DQJD841P.js";import{o as te,u as ne}from"./dashboard-data-7AI3s00y.js";import{n as re,t as T}from"./PatientAppointmentCard-Dv2gmvmZ.js";import{r as ie,t as ae}from"./AppointmentDetailsDrawer-C00XaJvE.js";import{n as oe,t as E}from"./NewAppointmentModal-kZPgHsoK.js";function se(e){let[t,n]=(0,k.useState)(null),[i,a]=(0,k.useState)(!1),[o,s]=(0,k.useState)(null),l=M[e.shape],d=e.width||N[e.card===`Scheduling calendar`?l:e.card],f={name:e.name,initials:F(e.name),provider:e.provider,operatory:e.operatory,time:e.time,accion:e.action},h=I(e.time);return e.card===`Dashboard`?(0,A.jsxs)(`div`,{style:{width:d,maxWidth:`100%`},children:[(0,A.jsx)(m,{appt:f,id:`demo`,activa:!!t,onSelect:(e,t)=>n(t.getBoundingClientRect()),onEdit:()=>a(!0)}),t&&(0,A.jsx)(C,{name:f.name,initials:f.initials,anchor:t,onClose:()=>n(null)}),i&&(0,A.jsx)(E,{titulo:`Edit Appointment`,inicial:{patient:e.name,primary:e.provider,operatory:e.operatory,reason:e.reason,status:`Check-in`,date:c(new Date),...L(e.time)},onClose:()=>a(!1)})]}):e.card===`Patients list`?(0,A.jsxs)(`div`,{style:{width:d,maxWidth:`100%`},children:[(0,A.jsx)(m,{appt:f,compact:!0,onEdit:()=>a(!0)}),i&&(0,A.jsx)(E,{titulo:`Edit Appointment`,inicial:{patient:e.name,primary:e.provider,operatory:e.operatory,reason:e.reason,status:`Check-in`,date:c(new Date),...L(e.time)},onClose:()=>a(!1)})]}):e.card===`Patient overview`?(0,A.jsx)(`div`,{style:{width:d,maxWidth:`100%`},children:(0,A.jsx)(T,{name:e.name,initials:f.initials,status:e.status,reason:e.reason,when:`12 Mar 2025 · ${u(h)}`,place:`Los Angeles - 789 N Sunrise Street`,onCancel:e.cancellable?()=>r.warn(`Appointment cancelled.`):void 0})}):(0,A.jsxs)(`div`,{style:{width:d,maxWidth:`100%`},children:[(0,A.jsx)(p,{evento:{start:h,patient:e.name,state:e.state},forma:l,className:`w-full`,style:l===`bloque`?{height:e.duration*63}:void 0,onClick:e=>s(e.currentTarget.getBoundingClientRect())}),o&&(0,A.jsx)(ae,{patient:e.name,estado:e.state,hora:u(h),duracion:e.duration,fecha:new Date,provider:e.provider,room:e.operatory,reason:e.reason,anchor:o,onClose:()=>s(null)})]})}function D({estado:e,nota:t,children:n}){return(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,A.jsx)(`td`,{children:n}),(0,A.jsx)(`td`,{className:`text-ink-medium`,children:t})]})}function O(){let e={dash:(0,k.useRef)(null),fila:(0,k.useRef)(null),over:(0,k.useRef)(null),cal:(0,k.useRef)(null),chip:(0,k.useRef)(null)},[t,n]=(0,k.useState)([]);return(0,k.useLayoutEffect)(()=>{n(X.map(([,t,n])=>{let r=e[t].current?.querySelector(n);return r?S(r):null}))},[]),(0,A.jsxs)(ee,{className:`max-w-none`,children:[(0,A.jsxs)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[(0,A.jsx)(`div`,{ref:e.dash,className:`w-[340px]`,children:(0,A.jsx)(m,{appt:B,onSelect:V,onEdit:V})}),(0,A.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,A.jsx)(`div`,{ref:e.fila,className:`w-[300px]`,children:(0,A.jsx)(m,{appt:B,compact:!0})}),(0,A.jsx)(`div`,{ref:e.over,className:`w-[300px]`,children:(0,A.jsx)(T,{name:`Noah James`,initials:`NJ`,status:`Booked`,reason:`Routine cleaning appointment`,when:`12 Mar 2025 · 10:00 AM`,place:`Los Angeles - 789 N Sunrise Street`})})]}),(0,A.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,A.jsx)(`div`,{ref:e.cal,className:`w-40`,children:(0,A.jsx)(p,{evento:{start:10,patient:`Noah James`,state:`Booked`},forma:`bloque`,className:`w-full`,style:{height:63}})}),(0,A.jsx)(`div`,{ref:e.chip,className:`w-36`,children:(0,A.jsx)(p,{evento:{start:10,patient:`Noah James`,state:`Booked`},forma:`chip`,className:`w-full`})})]})]}),(0,A.jsx)(x,{titulo:`Sizes`,nota:`Medidas leídas de las muestras de arriba.`,children:(0,A.jsx)(b,{encabezado:[`Part`,`Width`,`Height`,`Padding`,`Text`,`Radius`],minimo:640,children:X.map(([e],n)=>{let r=t[n];return(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,A.jsx)(`td`,{className:`tabular-nums`,children:r?.ancho??`—`}),(0,A.jsx)(`td`,{className:`tabular-nums`,children:r?.alto??`—`}),(0,A.jsx)(`td`,{className:`tabular-nums`,children:r?.padding??`—`}),(0,A.jsx)(`td`,{className:`tabular-nums`,children:r?`${r.texto} · ${r.peso}`:`—`}),(0,A.jsx)(`td`,{className:`tabular-nums`,children:r?.radio??`—`})]},e)})})}),(0,A.jsx)(x,{titulo:`Colors`,children:(0,A.jsxs)(b,{encabezado:[`Part`,`Token`],minimo:560,children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Dashboard · photo and action`}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(_,{nombre:`dash-blue`}),` · hover `,(0,A.jsx)(_,{nombre:`dash-blue-hover`})]})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Dashboard · fields and time`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(_,{nombre:`dash-field`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Dashboard · selected ring`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(_,{nombre:`dash-ring`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Dashboard · TR / CC chips`}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(_,{nombre:`green-soft`}),` · `,(0,A.jsx)(_,{nombre:`dash-bad-chip`})]})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Patient overview · bar`}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(_,{nombre:`dash-blue`}),` · photo `,(0,A.jsx)(_,{nombre:`dash-blue-hover`})]})]}),d.map(({state:e})=>{let t=e.toLowerCase().replace(/[^a-z]/g,``);return(0,A.jsxs)(`tr`,{children:[(0,A.jsxs)(`td`,{className:`font-semibold`,children:[`Calendar · `,e]}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(_,{nombre:`appt-${t}-bg`}),` · bar `,(0,A.jsx)(_,{nombre:`appt-${t}-bar`}),` · time `,(0,A.jsx)(_,{nombre:`appt-${t}-fg`})]})]},e)})]})})]})}var k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{k=t(),g(),ne(),w(),oe(),re(),f(),ie(),l(),i(),s(),o(),v(),A=n(),j=[`Dashboard`,`Patients list`,`Patient overview`,`Scheduling calendar`],M={"Day / Week block":`bloque`,"Month chip":`chip`,"Phone day list":`fila`},N={Dashboard:360,"Patients list":300,"Patient overview":300,"Scheduling calendar":160,bloque:160,chip:140,fila:340},P=[`Booked`,`Fulfilled`,`No Show`,`Cancelled`],F=e=>e.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase(),I=e=>{let[t=10,n=0]=e.split(`:`).map(Number);return(Number.isFinite(t)?t:10)+(Number.isFinite(n)?n:0)/60},L=e=>{let t=a.findIndex(t=>Number(t.slice(0,2))===Math.floor(I(e)));return t<0?{}:{start:a[t],end:a[t+1]??``}},R={title:`Elements/Appointment cards`,parameters:{layout:`padded`,docs:{decisionsFrom:[`components/dashboard/AppointmentCard.tsx`,`components/patients/PatientAppointmentCard.tsx`,`components/scheduling/TurnoCalendario.tsx`],description:{component:[`Un turno se muestra en cuatro lugares y en cada uno con la card que le sirve a ese lugar. Las cuatro son el mismo turno: mismo paciente, misma hora, mismo estado.`,``,"- **Dashboard** (`AppointmentCard`): la de trabajo del día, en Appointments y Waiting Room. Trae todo para atender sin abrir nada y la acción que sigue.","- **Patients list** (`AppointmentCard compact`): una fila en Today Appointments, al costado de la lista de pacientes. Sólo quién y a qué hora; el kebab abre Edit y Go to appointment.","- **Patient overview** (`PatientAppointmentCard`): los turnos de un paciente, con su estado. Sólo el que todavía se puede cancelar tiene Cancel.","- **Scheduling calendar** (`TurnoCalendario`): el turno en la agenda, del color de su estado. Bloque en Day y Week, chip en Month y fila en el celular.",``,`**Probalo:** en *Playground* elegí la card con *card* y cambiá paciente, hora y estado. Tocá cada una: abren lo mismo que en la app (la ficha rápida del paciente, el detalle del turno, el modal de edición).`].join(`
`)}}},args:{card:`Dashboard`,name:`Noah James`,time:`10:00`,provider:`Dr. Elena Martinez`,operatory:`Operatory 2`,reason:`Routine cleaning appointment`,action:`Check Out`,status:`Booked`,cancellable:!0,state:`Booked`,shape:`Day / Week block`,duration:1,width:0},argTypes:{card:{control:`select`,options:j,description:`Cuál de las cuatro cards.`},name:{control:`text`,description:`Paciente: las iniciales salen de acá. Probá uno largo: se recorta, no salta de renglón.`},time:{control:`text`,description:`Hora del turno, HH:MM (24 h).`},provider:{control:`text`,description:`Profesional. Dashboard, Patients list y el detalle del calendario.`},operatory:{control:`text`,description:`Sala. Dashboard y el detalle del calendario.`},reason:{control:`text`,description:`Motivo. Patient overview y el detalle del calendario.`},action:{control:`inline-radio`,options:[`Check Out`,`Cancel`],description:`El botón del pie: la acción que sigue.`,if:{arg:`card`,eq:`Dashboard`}},status:{control:`inline-radio`,options:P,description:`Estado del turno: el tono de la pill.`,if:{arg:`card`,eq:`Patient overview`}},cancellable:{control:`boolean`,description:`Si todavía se puede cancelar: muestra Cancel.`,if:{arg:`card`,eq:`Patient overview`}},state:{control:`select`,options:d.map(e=>e.state),description:`Estado en la agenda: el color del fondo, la barra y la hora.`,if:{arg:`card`,eq:`Scheduling calendar`}},shape:{control:`inline-radio`,options:Object.keys(M),description:`Bloque en Day y Week, chip en Month, fila en la lista del día del celular.`,if:{arg:`card`,eq:`Scheduling calendar`}},duration:{control:{type:`range`,min:.25,max:3,step:.25},description:`Duración en horas: el alto del bloque (63px por hora).`,if:{arg:`card`,eq:`Scheduling calendar`}},width:{control:{type:`range`,min:0,max:560,step:10},description:`Ancho en px. 0 = el que tiene en la app.`}}},z={render:e=>(0,A.jsx)(se,{...e})},B={name:`Noah James`,initials:`NJ`,provider:`Dr. Elena Martinez`,operatory:`Operatory 2`,time:`10:00`,accion:`Check Out`},V=()=>{},H={name:`Which card goes where`,parameters:{controls:{disable:!0}},render:()=>(0,A.jsxs)(b,{encabezado:[`Card`,`Where`,`What it shows`,`Click opens`],minimo:960,arriba:!0,children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`div`,{className:`w-[340px]`,children:(0,A.jsx)(m,{appt:B,onSelect:V,onEdit:V})})}),(0,A.jsxs)(`td`,{className:`font-semibold`,children:[`Dashboard`,(0,A.jsx)(`br`,{}),(0,A.jsx)(`span`,{className:`font-normal text-ink-muted`,children:`Appointments · Waiting Room`})]}),(0,A.jsx)(`td`,{className:`text-ink-medium`,children:`Paciente, profesional, sala, hora y la acción que sigue. TR y CC son los chips del frame de Figma.`}),(0,A.jsx)(`td`,{className:`text-ink-medium`,children:`La ficha rápida del paciente. El kebab: editar el turno.`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`div`,{className:`w-[300px]`,children:(0,A.jsx)(m,{appt:B,compact:!0})})}),(0,A.jsxs)(`td`,{className:`font-semibold`,children:[`Patients`,(0,A.jsx)(`br`,{}),(0,A.jsx)(`span`,{className:`font-normal text-ink-muted`,children:`Today Appointments`})]}),(0,A.jsx)(`td`,{className:`text-ink-medium`,children:`Paciente, hora y profesional.`}),(0,A.jsx)(`td`,{className:`text-ink-medium`,children:`El kebab: Edit abre el modal del turno; Go to appointment lleva a Scheduling.`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsx)(`div`,{className:`w-[300px]`,children:(0,A.jsx)(T,{name:`Noah James`,initials:`NJ`,status:`Booked`,reason:`Routine cleaning appointment`,when:`12 Mar 2025 · 10:00 AM`,place:`Los Angeles - 789 N Sunrise Street`,onCancel:V})})}),(0,A.jsxs)(`td`,{className:`font-semibold`,children:[`Patient overview`,(0,A.jsx)(`br`,{}),(0,A.jsx)(`span`,{className:`font-normal text-ink-muted`,children:`Appointments`})]}),(0,A.jsx)(`td`,{className:`text-ink-medium`,children:`Estado, motivo, fecha y lugar. El paciente ya se sabe: es su ficha.`}),(0,A.jsx)(`td`,{className:`text-ink-medium`,children:`Cancel, si todavía se puede.`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{children:(0,A.jsxs)(`div`,{className:`flex w-[300px] flex-col gap-2`,children:[(0,A.jsx)(p,{evento:{start:10,patient:`Noah James`,state:`Booked`},forma:`bloque`,className:`w-40`,style:{height:63}}),(0,A.jsx)(p,{evento:{start:10,patient:`Noah James`,state:`Booked`},forma:`chip`,className:`w-36`}),(0,A.jsx)(p,{evento:{start:10,patient:`Noah James`,state:`Booked`},forma:`fila`,className:`w-full`})]})}),(0,A.jsxs)(`td`,{className:`font-semibold`,children:[`Scheduling`,(0,A.jsx)(`br`,{}),(0,A.jsx)(`span`,{className:`font-normal text-ink-muted`,children:`Calendar`})]}),(0,A.jsx)(`td`,{className:`text-ink-medium`,children:`Hora y paciente, del color del estado. Bloque en Day y Week, chip en Month, fila en el celular.`}),(0,A.jsx)(`td`,{className:`text-ink-medium`,children:`El detalle del turno. Se arrastra para cambiarlo de hora o de día.`})]})]})},U={name:`Dashboard card: states`,parameters:{controls:{disable:!0}},render:()=>(0,A.jsxs)(b,{encabezado:[`State`,`Sample`,`What it means`],minimo:760,children:[(0,A.jsx)(D,{estado:`Default`,nota:`Un turno del día, con la acción que sigue.`,children:(0,A.jsx)(`div`,{className:`w-[340px]`,children:(0,A.jsx)(m,{appt:B,onSelect:V,onEdit:V})})}),(0,A.jsx)(D,{estado:`Hover`,nota:`Fondo apenas azulado: la card se puede tocar.`,children:(0,A.jsx)(y,{selector:`:scope > div`,estado:`hover`,className:`w-[340px]`,children:(0,A.jsx)(m,{appt:B,onSelect:V,onEdit:V})})}),(0,A.jsx)(D,{estado:`Keyboard focus`,nota:`Con Tab se llega al paciente; Enter abre su ficha.`,children:(0,A.jsx)(y,{selector:`button[aria-expanded]`,estado:`focus-visible`,className:`w-[340px]`,children:(0,A.jsx)(m,{appt:B,onSelect:V,onEdit:V})})}),(0,A.jsx)(D,{estado:`Selected`,nota:`Anillo azul mientras la ficha rápida del paciente está abierta: dice de qué card salió.`,children:(0,A.jsx)(`div`,{className:`w-[340px] p-1.5`,children:(0,A.jsx)(m,{appt:B,activa:!0,onSelect:V,onEdit:V})})}),(0,A.jsx)(D,{estado:`Menu open`,nota:`El kebab: Edit appointment abre el modal con los datos de la card.`,children:(0,A.jsx)(y,{selector:`button[aria-label^="Actions for"]`,estado:`click`,className:`w-[340px] pb-12`,children:(0,A.jsx)(m,{appt:B,onSelect:V,onEdit:V})})}),(0,A.jsx)(D,{estado:`Cancel`,nota:`Un turno que todavía no llegó: la acción que sigue es cancelarlo.`,children:(0,A.jsx)(`div`,{className:`w-[340px]`,children:(0,A.jsx)(m,{appt:{...B,accion:`Cancel`},onSelect:V,onEdit:V})})}),(0,A.jsx)(D,{estado:`Long name`,nota:`El nombre se recorta: los chips no bajan de renglón.`,children:(0,A.jsx)(`div`,{className:`w-[340px]`,children:(0,A.jsx)(m,{appt:{...B,name:`Maria Abril Viola Fernández de la Torre`,initials:`MA`},onSelect:V,onEdit:V})})})]})},W=`button[aria-label^="Actions for"]`,G={name:`Patients list card: states`,parameters:{controls:{disable:!0}},render:()=>(0,A.jsxs)(b,{encabezado:[`State`,`Sample`,`What it means`],minimo:760,children:[(0,A.jsx)(D,{estado:`Default`,nota:`Un turno del día: quién, a qué hora y con quién. La card no se toca; se actúa desde el kebab.`,children:(0,A.jsx)(`div`,{className:`w-[300px]`,children:(0,A.jsx)(h,{appt:B,onEdit:V})})}),(0,A.jsx)(D,{estado:`Kebab hover`,nota:`El kebab de las tablas (RowActionsMenu): fondo gris al pasar el mouse.`,children:(0,A.jsx)(y,{selector:W,estado:`hover`,className:`w-[300px]`,children:(0,A.jsx)(h,{appt:B,onEdit:V})})}),(0,A.jsx)(D,{estado:`Menu open`,nota:`Con Tab se llega al kebab y Enter lo abre. Edit abre el modal Edit Appointment con los datos de la card (guardar avisa y cierra: los turnos del día no cambian acá). Go to appointment lleva a Scheduling.`,children:(0,A.jsx)(`div`,{className:`h-28 w-[300px]`,children:(0,A.jsx)(h,{appt:B,onEdit:V,menuAbierto:!0})})}),(0,A.jsx)(D,{estado:`Long name`,nota:`El nombre se recorta: el kebab no baja de renglón.`,children:(0,A.jsx)(`div`,{className:`w-[300px]`,children:(0,A.jsx)(h,{appt:{...B,name:`Maria Abril Viola Fernández de la Torre`,initials:`MA`},onEdit:V})})}),(0,A.jsx)(D,{estado:`Ten appointments`,nota:`Today Appointments muestra los 10 del día, con scroll adentro del panel; sin “View all”.`,children:(0,A.jsx)(`div`,{className:`flex h-72 w-[300px] flex-col gap-3 overflow-y-auto p-1`,children:te.map((e,t)=>(0,A.jsx)(h,{appt:e,onEdit:V},t))})})]})},K={Booked:`Confirmado y por venir: es el único que se puede cancelar.`,Fulfilled:`El paciente vino y se atendió.`,"No Show":`El paciente no vino.`,Cancelled:`Se canceló.`},q={name:`Patient overview card: states`,parameters:{controls:{disable:!0}},render:()=>(0,A.jsx)(b,{encabezado:[`Status`,`Sample`,`What it means`],minimo:680,children:P.map(e=>(0,A.jsx)(D,{estado:e,nota:K[e],children:(0,A.jsx)(`div`,{className:`w-[300px]`,children:(0,A.jsx)(T,{name:`Maria Abril Viola`,initials:`av`,status:e,reason:`Routine cleaning appointment`,when:`12 Mar 2025 · 10:00 - 11:00 AM`,place:`Los Angeles - 789 N Sunrise Street`,onCancel:e===`Booked`?V:void 0})})},e))})},J={Proposed:`Propuesto al paciente, todavía sin confirmar.`,"Check-in":`El paciente llegó y está en la sala de espera.`,Booked:`Confirmado.`,"In progress":`Se lo está atendiendo.`,Fulfilled:`Atendido.`,"No-show":`No vino.`,Cancelled:`Cancelado: queda en la agenda, en gris.`},Y={name:`Calendar: states and shapes`,parameters:{controls:{disable:!0}},render:()=>(0,A.jsx)(b,{encabezado:[`State`,`Day / Week block`,`Month chip`,`Phone day list`,`What it means`],minimo:940,children:d.map(({state:e})=>{let t={start:10,patient:`Noah James`,state:e};return(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,A.jsx)(`td`,{children:(0,A.jsx)(p,{evento:t,forma:`bloque`,className:`w-36`,style:{height:47.25}})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(p,{evento:t,forma:`chip`,className:`w-32`})}),(0,A.jsx)(`td`,{children:(0,A.jsx)(p,{evento:t,forma:`fila`,className:`w-64`})}),(0,A.jsx)(`td`,{className:`text-ink-medium`,children:J[e]})]},e)})})},X=[[`Dashboard · card`,`dash`,`[data-appt-card]`],[`Dashboard · photo`,`dash`,`.size-11`],[`Dashboard · field`,`dash`,`.bg-dash-field`],[`Dashboard · action`,`dash`,`[data-appt-card] > button`],[`Patients list · row`,`fila`,`:scope > div`],[`Patient overview · card`,`over`,`:scope > div`],[`Calendar · block (1 h)`,`cal`,`button`],[`Calendar · chip`,`chip`,`button`]],Z={parameters:{controls:{disable:!0}},render:()=>(0,A.jsx)(O,{})},Q=[`Playground`,`WhichCardWhere`,`DashboardStates`,`PatientsListStates`,`PatientOverviewStates`,`CalendarStates`,`Specs`],z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />
}`,...z.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Which card goes where',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Tabla encabezado={['Card', 'Where', 'What it shows', 'Click opens']} minimo={960} arriba>
      <tr>
        <td><div className="w-[340px]"><AppointmentCard appt={NOAH} onSelect={nada} onEdit={nada} /></div></td>
        <td className="font-semibold">Dashboard<br /><span className="font-normal text-ink-muted">Appointments · Waiting Room</span></td>
        <td className="text-ink-medium">Paciente, profesional, sala, hora y la acción que sigue. TR y CC son los chips del frame de Figma.</td>
        <td className="text-ink-medium">La ficha rápida del paciente. El kebab: editar el turno.</td>
      </tr>
      <tr>
        <td><div className="w-[300px]"><AppointmentCard appt={NOAH} compact /></div></td>
        <td className="font-semibold">Patients<br /><span className="font-normal text-ink-muted">Today Appointments</span></td>
        <td className="text-ink-medium">Paciente, hora y profesional.</td>
        <td className="text-ink-medium">El kebab: Edit abre el modal del turno; Go to appointment lleva a Scheduling.</td>
      </tr>
      <tr>
        <td><div className="w-[300px]"><PatientAppointmentCard name="Noah James" initials="NJ" status="Booked" reason="Routine cleaning appointment" when="12 Mar 2025 · 10:00 AM" place="Los Angeles - 789 N Sunrise Street" onCancel={nada} /></div></td>
        <td className="font-semibold">Patient overview<br /><span className="font-normal text-ink-muted">Appointments</span></td>
        <td className="text-ink-medium">Estado, motivo, fecha y lugar. El paciente ya se sabe: es su ficha.</td>
        <td className="text-ink-medium">Cancel, si todavía se puede.</td>
      </tr>
      <tr>
        <td>
          <div className="flex w-[300px] flex-col gap-2">
            <TurnoCalendario evento={{
            start: 10,
            patient: 'Noah James',
            state: 'Booked'
          }} forma="bloque" className="w-40" style={{
            height: HOUR_PX
          }} />
            <TurnoCalendario evento={{
            start: 10,
            patient: 'Noah James',
            state: 'Booked'
          }} forma="chip" className="w-36" />
            <TurnoCalendario evento={{
            start: 10,
            patient: 'Noah James',
            state: 'Booked'
          }} forma="fila" className="w-full" />
          </div>
        </td>
        <td className="font-semibold">Scheduling<br /><span className="font-normal text-ink-muted">Calendar</span></td>
        <td className="text-ink-medium">Hora y paciente, del color del estado. Bloque en Day y Week, chip en Month, fila en el celular.</td>
        <td className="text-ink-medium">El detalle del turno. Se arrastra para cambiarlo de hora o de día.</td>
      </tr>
    </Tabla>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Dashboard card: states',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={760}>
      <Fila estado="Default" nota="Un turno del día, con la acción que sigue.">
        <div className="w-[340px]"><AppointmentCard appt={NOAH} onSelect={nada} onEdit={nada} /></div>
      </Fila>
      <Fila estado="Hover" nota="Fondo apenas azulado: la card se puede tocar.">
        <Forzar selector=":scope > div" estado="hover" className="w-[340px]"><AppointmentCard appt={NOAH} onSelect={nada} onEdit={nada} /></Forzar>
      </Fila>
      <Fila estado="Keyboard focus" nota="Con Tab se llega al paciente; Enter abre su ficha.">
        <Forzar selector="button[aria-expanded]" estado="focus-visible" className="w-[340px]"><AppointmentCard appt={NOAH} onSelect={nada} onEdit={nada} /></Forzar>
      </Fila>
      <Fila estado="Selected" nota="Anillo azul mientras la ficha rápida del paciente está abierta: dice de qué card salió.">
        <div className="w-[340px] p-1.5"><AppointmentCard appt={NOAH} activa onSelect={nada} onEdit={nada} /></div>
      </Fila>
      <Fila estado="Menu open" nota="El kebab: Edit appointment abre el modal con los datos de la card.">
        <Forzar selector='button[aria-label^="Actions for"]' estado="click" className="w-[340px] pb-12"><AppointmentCard appt={NOAH} onSelect={nada} onEdit={nada} /></Forzar>
      </Fila>
      <Fila estado="Cancel" nota="Un turno que todavía no llegó: la acción que sigue es cancelarlo.">
        <div className="w-[340px]"><AppointmentCard appt={{
          ...NOAH,
          accion: 'Cancel'
        }} onSelect={nada} onEdit={nada} /></div>
      </Fila>
      <Fila estado="Long name" nota="El nombre se recorta: los chips no bajan de renglón.">
        <div className="w-[340px]"><AppointmentCard appt={{
          ...NOAH,
          name: 'Maria Abril Viola Fernández de la Torre',
          initials: 'MA'
        }} onSelect={nada} onEdit={nada} /></div>
      </Fila>
    </Tabla>
}`,...U.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Patients list card: states',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={760}>
      <Fila estado="Default" nota="Un turno del día: quién, a qué hora y con quién. La card no se toca; se actúa desde el kebab.">
        <div className="w-[300px]"><AppointmentCardCompacta appt={NOAH} onEdit={nada} /></div>
      </Fila>
      <Fila estado="Kebab hover" nota="El kebab de las tablas (RowActionsMenu): fondo gris al pasar el mouse.">
        <Forzar selector={KEBAB} estado="hover" className="w-[300px]"><AppointmentCardCompacta appt={NOAH} onEdit={nada} /></Forzar>
      </Fila>
      <Fila estado="Menu open" nota="Con Tab se llega al kebab y Enter lo abre. Edit abre el modal Edit Appointment con los datos de la card (guardar avisa y cierra: los turnos del día no cambian acá). Go to appointment lleva a Scheduling.">
        <div className="h-28 w-[300px]"><AppointmentCardCompacta appt={NOAH} onEdit={nada} menuAbierto /></div>
      </Fila>
      <Fila estado="Long name" nota="El nombre se recorta: el kebab no baja de renglón.">
        <div className="w-[300px]"><AppointmentCardCompacta appt={{
          ...NOAH,
          name: 'Maria Abril Viola Fernández de la Torre',
          initials: 'MA'
        }} onEdit={nada} /></div>
      </Fila>
      <Fila estado="Ten appointments" nota="Today Appointments muestra los 10 del día, con scroll adentro del panel; sin “View all”.">
        <div className="flex h-72 w-[300px] flex-col gap-3 overflow-y-auto p-1">
          {TURNOS_PATIENTS.map((t, i) => <AppointmentCardCompacta key={i} appt={t} onEdit={nada} />)}
        </div>
      </Fila>
    </Tabla>
}`,...G.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Patient overview card: states',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Tabla encabezado={['Status', 'Sample', 'What it means']} minimo={680}>
      {ESTADOS_PACIENTE.map(s => <Fila key={s} estado={s} nota={SIGNIFICADO_PACIENTE[s]}>
          <div className="w-[300px]">
            <PatientAppointmentCard name="Maria Abril Viola" initials="av" status={s} reason="Routine cleaning appointment" when="12 Mar 2025 · 10:00 - 11:00 AM" place="Los Angeles - 789 N Sunrise Street" onCancel={s === 'Booked' ? nada : undefined} />
          </div>
        </Fila>)}
    </Tabla>
}`,...q.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Calendar: states and shapes',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Tabla encabezado={['State', 'Day / Week block', 'Month chip', 'Phone day list', 'What it means']} minimo={940}>
      {LEGEND.map(({
      state
    }) => {
      const evento = {
        start: 10,
        patient: 'Noah James',
        state
      };
      return <tr key={state}>
            <td className="font-semibold whitespace-nowrap">{state}</td>
            <td><TurnoCalendario evento={evento} forma="bloque" className="w-36" style={{
            height: HOUR_PX * 0.75
          }} /></td>
            <td><TurnoCalendario evento={evento} forma="chip" className="w-32" /></td>
            <td><TurnoCalendario evento={evento} forma="fila" className="w-64" /></td>
            <td className="text-ink-medium">{SIGNIFICADO_AGENDA[state]}</td>
          </tr>;
    })}
    </Tabla>
}`,...Y.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Medicion />
}`,...Z.parameters?.docs?.source}}}})))()}$();export{Y as CalendarStates,U as DashboardStates,q as PatientOverviewStates,G as PatientsListStates,z as Playground,Z as Specs,H as WhichCardWhere,Q as __namedExportsOrder,R as default};