import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,r as i}from"./toaster-B6mRBNx3.js";import{n as a,r as o}from"./AppointmentSlotPicker-D0hiSqeD.js";import{a as s,i as c,n as l,r as u}from"./Scheduling-D96B1_zC.js";import{o as d,s as f}from"./date-picker-BCSka6Ms.js";import{d as p,l as ee,s as m}from"./calendar-data-DcMkX9Kf.js";import{n as te,t as h}from"./TurnoCalendario-CPjSEj84.js";import{ht as g,mt as _,vt as ne}from"./iframe-BZ9eIGKu.js";import{c as v,d as re,f as ie,i as y,l as ae,r as b,t as x,u as S}from"./kit-CWUgB5-0.js";import{n as oe,r as se}from"./PatientDetailsPopover-XQgNKNdx.js";import{o as ce,u as le}from"./dashboard-data-7AI3s00y.js";import{r as ue,t as C}from"./TarjetaTurno-Bg2shQD0.js";import{n as w,r as de,t as fe}from"./PatientAppointmentCard-BcyPYtnB.js";import{r as pe,t as me}from"./AppointmentDetailsDrawer-COEeW0Nx.js";import{n as he,t as T}from"./NewAppointmentModal-Du35M59s.js";function ge(e){let[t,n]=(0,D.useState)(null),[i,a]=(0,D.useState)(!1),[o,s]=(0,D.useState)(null),u=A[e.shape],f=e.width||j[e.card===`Scheduling calendar`?u:e.card],p={name:e.name,initials:N(e.name),provider:e.provider,operatory:e.operatory,time:e.time,accion:e.action},m=P(e.time);if(e.card===`Dashboard`)return(0,O.jsxs)(`div`,{style:{width:f,maxWidth:`100%`},children:[(0,O.jsx)(_,{appt:p,id:`demo`,activa:!!t,onSelect:(e,t)=>n(t.getBoundingClientRect()),onEdit:()=>a(!0)}),t&&(0,O.jsx)(oe,{name:p.name,initials:p.initials,anchor:t,onClose:()=>n(null)}),i&&(0,O.jsx)(T,{titulo:`Edit Appointment`,inicial:{patient:e.name,primary:e.provider,operatory:e.operatory,reason:e.reason,status:`Check-in`,date:d(new Date),...F(e.time)},onClose:()=>a(!1)})]});if(e.card===`Patients list`)return(0,O.jsxs)(`div`,{style:{width:f,maxWidth:`100%`},children:[(0,O.jsx)(_,{appt:p,compact:!0,onEdit:()=>a(!0)}),i&&(0,O.jsx)(T,{titulo:`Edit Appointment`,inicial:{patient:e.name,primary:e.provider,operatory:e.operatory,reason:e.reason,status:`Check-in`,date:d(new Date),...F(e.time)},onClose:()=>a(!1)})]});if(e.card===`Patient overview`)return(0,O.jsx)(`div`,{style:{width:f,maxWidth:`100%`},children:(0,O.jsx)(w,{name:e.name,initials:p.initials,status:e.status,reason:e.reason,when:`12 Mar 2025 · ${ee(m)}`,place:`Los Angeles - 789 N Sunrise Street`,onCancel:e.cancellable?()=>r.warn(`Appointment cancelled.`):void 0})});if(e.card===`Appointment request`){let t={...c[0],tipo:e.request,patient:e.name,reason:e.reason,start:F(e.time).start??`10 AM`,end:F(e.time).end??`11 AM`,espera:e.waiting};return(0,O.jsxs)(`div`,{style:{width:f,maxWidth:`100%`},children:[(0,O.jsx)(l,{s:t,onCancel:()=>r.warn(`Request for ${e.name} was cancelled.`),onSchedule:()=>a(!0)}),i&&(0,O.jsx)(T,{inicial:{patient:e.name,primary:e.provider,operatory:e.operatory,reason:e.reason,date:t.date,start:t.start,end:t.end},onClose:()=>a(!1)})]})}return(0,O.jsxs)(`div`,{style:{width:f,maxWidth:`100%`},children:[(0,O.jsx)(h,{evento:{start:m,patient:e.name,state:e.state},forma:u,className:`w-full`,style:u===`bloque`?{height:e.duration*63}:void 0,onClick:e=>s(e.currentTarget.getBoundingClientRect())}),o&&(0,O.jsx)(me,{patient:e.name,estado:e.state,hora:ee(m),duracion:e.duration,fecha:new Date,provider:e.provider,room:e.operatory,reason:e.reason,anchor:o,onClose:()=>s(null)})]})}function E({estado:e,nota:t,children:n}){return(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,O.jsx)(`td`,{children:n}),(0,O.jsx)(`td`,{className:`text-ink-medium`,children:t})]})}function _e(){let e={dash:(0,D.useRef)(null),fila:(0,D.useRef)(null),over:(0,D.useRef)(null),soli:(0,D.useRef)(null),cal:(0,D.useRef)(null),chip:(0,D.useRef)(null)},[t,n]=(0,D.useState)([]);return(0,D.useLayoutEffect)(()=>{n(Q.map(([,t,n])=>{let r=e[t].current?.querySelector(n);return r?ie(r):null}))},[]),(0,O.jsxs)(y,{className:`max-w-none`,children:[(0,O.jsxs)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[(0,O.jsx)(`div`,{ref:e.dash,className:`w-[340px]`,children:(0,O.jsx)(_,{appt:R,onSelect:z,onEdit:z})}),(0,O.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,O.jsx)(`div`,{ref:e.fila,className:`w-[300px]`,children:(0,O.jsx)(_,{appt:R,compact:!0})}),(0,O.jsx)(`div`,{ref:e.over,className:`w-[248px]`,children:(0,O.jsx)(w,{name:`Noah James`,initials:`NJ`,status:`Booked`,reason:`Routine cleaning appointment`,when:`12 Mar 2025 · 10:00 AM`,place:`Los Angeles - 789 N Sunrise Street`})}),(0,O.jsx)(`div`,{ref:e.soli,className:`w-[248px]`,children:(0,O.jsx)(l,{s:c[0],onCancel:z,onSchedule:z})})]}),(0,O.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,O.jsx)(`div`,{ref:e.cal,className:`w-40`,children:(0,O.jsx)(h,{evento:{start:10,patient:`Noah James`,state:`Booked`},forma:`bloque`,className:`w-full`,style:{height:63}})}),(0,O.jsx)(`div`,{ref:e.chip,className:`w-36`,children:(0,O.jsx)(h,{evento:{start:10,patient:`Noah James`,state:`Booked`},forma:`chip`,className:`w-full`})})]})]}),(0,O.jsx)(x,{titulo:`Sizes`,nota:`Medidas leídas de las muestras de arriba.`,children:(0,O.jsx)(v,{encabezado:[`Part`,`Width`,`Height`,`Padding`,`Text`,`Radius`],minimo:640,children:Q.map(([e],n)=>{let r=t[n];return(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:r?.ancho??`—`}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:r?.alto??`—`}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:r?.padding??`—`}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:r?`${r.texto} · ${r.peso}`:`—`}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:r?.radio??`—`})]},e)})})}),(0,O.jsx)(x,{titulo:`Colors`,children:(0,O.jsxs)(v,{encabezado:[`Part`,`Token`],minimo:560,children:[(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold`,children:`Dashboard · photo and action`}),(0,O.jsxs)(`td`,{children:[(0,O.jsx)(S,{nombre:`dash-blue`}),` · hover `,(0,O.jsx)(S,{nombre:`dash-blue-hover`})]})]}),(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold`,children:`Dashboard · fields and time`}),(0,O.jsx)(`td`,{children:(0,O.jsx)(S,{nombre:`dash-field`})})]}),(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold`,children:`Dashboard · selected ring`}),(0,O.jsx)(`td`,{children:(0,O.jsx)(S,{nombre:`dash-ring`})})]}),(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold`,children:`Dashboard · TR / CC chips`}),(0,O.jsxs)(`td`,{children:[(0,O.jsx)(S,{nombre:`green-soft`}),` · `,(0,O.jsx)(S,{nombre:`dash-bad-chip`})]})]}),(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold`,children:`Patient overview and request · photo`}),(0,O.jsx)(`td`,{children:(0,O.jsx)(S,{nombre:`dash-blue-hover`})})]}),M.map(e=>(0,O.jsxs)(`tr`,{children:[(0,O.jsxs)(`td`,{className:`font-semibold`,children:[`Patient overview · `,e,` bar`]}),(0,O.jsxs)(`td`,{children:[(0,O.jsx)(S,{nombre:C[fe[e]].replace(`border-l-`,``)}),` · el borde de la pill `,fe[e]]})]},e)),(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold`,children:`Request · ASAP bar`}),(0,O.jsxs)(`td`,{children:[(0,O.jsx)(S,{nombre:C.danger.replace(`border-l-`,``)}),` · el borde de la pill danger`]})]}),(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold`,children:`Request · Waiting List bar`}),(0,O.jsxs)(`td`,{children:[(0,O.jsx)(S,{nombre:C.info.replace(`border-l-`,``)}),` · el borde de la pill info`]})]}),m.map(({state:e})=>{let t=e.toLowerCase().replace(/[^a-z]/g,``);return(0,O.jsxs)(`tr`,{children:[(0,O.jsxs)(`td`,{className:`font-semibold`,children:[`Calendar · `,e]}),(0,O.jsxs)(`td`,{children:[(0,O.jsx)(S,{nombre:`appt-${t}-bg`}),` · bar `,(0,O.jsx)(S,{nombre:`appt-${t}-bar`}),` · time `,(0,O.jsx)(S,{nombre:`appt-${t}-fg`})]})]},e)})]})})]})}var D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,ve;function ye(){return(ye=e((()=>{D=t(),ne(),le(),se(),he(),de(),u(),s(),ue(),te(),pe(),p(),i(),f(),o(),re(),O=n(),k=[`Dashboard`,`Patients list`,`Patient overview`,`Appointment request`,`Scheduling calendar`],A={"Day / Week block":`bloque`,"Month chip":`chip`,"Phone day list":`fila`},j={Dashboard:360,"Patients list":300,"Patient overview":248,"Appointment request":248,"Scheduling calendar":160,bloque:160,chip:140,fila:340},M=[`Booked`,`Fulfilled`,`No Show`,`Cancelled`],N=e=>e.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase(),P=e=>{let[t=10,n=0]=e.split(`:`).map(Number);return(Number.isFinite(t)?t:10)+(Number.isFinite(n)?n:0)/60},F=e=>{let t=a.findIndex(t=>Number(t.slice(0,2))===Math.floor(P(e)));return t<0?{}:{start:a[t],end:a[t+1]??``}},I={title:`Elements/Appointment cards`,parameters:{layout:`padded`,docs:{decisionsFrom:[`components/dashboard/AppointmentCard.tsx`,`components/patients/PatientAppointmentCard.tsx`,`components/scheduling/TarjetaTurno.tsx`,`components/scheduling/TurnoCalendario.tsx`],description:{component:[`Un turno se muestra en cuatro lugares y en cada uno con la card que le sirve a ese lugar. Las cuatro son el mismo turno: mismo paciente, misma hora, mismo estado.`,``,"- **Dashboard** (`AppointmentCard`): la de trabajo del día, en Appointments y Waiting Room. Trae todo para atender sin abrir nada y la acción que sigue.","- **Patients list** (`AppointmentCard compact`): una fila en Today Appointments, al costado de la lista de pacientes. Sólo quién y a qué hora; el kebab abre Edit y Go to appointment.","- **Patient overview** (`PatientAppointmentCard`): los turnos de un paciente, con su estado. Sólo el que todavía se puede cancelar tiene Cancel.","- **Appointment request** (`SolicitudCard`, en el panel *Appointment requests* de Scheduling): un pedido de turno, ASAP o en lista de espera, con Cancel y Schedule. **Es la misma card que Patient overview** (`TarjetaTurno`): barra de 3px a la izquierda y pill del mismo color, avatar, motivo, fecha y lugar, y las acciones abajo a la derecha.","- **Scheduling calendar** (`TurnoCalendario`): el turno en la agenda, del color de su estado. Bloque en Day y Week, chip en Month y fila en el celular.",``,`**Probalo:** en *Playground* elegí la card con *card* y cambiá paciente, hora y estado. Tocá cada una: abren lo mismo que en la app (la ficha rápida del paciente, el detalle del turno, el modal de edición).`].join(`
`)}}},args:{card:`Dashboard`,name:`Noah James`,time:`10:00`,provider:`Dr. Elena Martinez`,operatory:`Operatory 2`,reason:`Routine cleaning appointment`,action:`Check Out`,status:`Booked`,cancellable:!0,request:`ASAP`,waiting:`Waiting 4 days`,state:`Booked`,shape:`Day / Week block`,duration:1,width:0},argTypes:{card:{control:`select`,options:k,description:`Cuál de las cuatro cards.`},name:{control:`text`,description:`Paciente: las iniciales salen de acá. Probá uno largo: se recorta, no salta de renglón.`},time:{control:`text`,description:`Hora del turno, HH:MM (24 h).`},provider:{control:`text`,description:`Profesional. Dashboard, Patients list y el detalle del calendario.`},operatory:{control:`text`,description:`Sala. Dashboard y el detalle del calendario.`},reason:{control:`text`,description:`Motivo. Patient overview y el detalle del calendario.`},action:{control:`inline-radio`,options:[`Check Out`,`Cancel`],description:`El botón del pie: la acción que sigue.`,if:{arg:`card`,eq:`Dashboard`}},status:{control:`inline-radio`,options:M,description:`Estado del turno: el tono de la pill.`,if:{arg:`card`,eq:`Patient overview`}},cancellable:{control:`boolean`,description:`Si todavía se puede cancelar: muestra Cancel.`,if:{arg:`card`,eq:`Patient overview`}},request:{control:`inline-radio`,options:[`ASAP`,`Waiting List`],description:`Tipo de solicitud: ASAP en rojo, lista de espera en azul (barra y pill).`,if:{arg:`card`,eq:`Appointment request`}},waiting:{control:`text`,description:`Lista de espera: hace cuánto espera. Es el texto de la pill.`,if:{arg:`card`,eq:`Appointment request`}},state:{control:`select`,options:m.map(e=>e.state),description:`Estado en la agenda: el color del fondo, la barra y la hora.`,if:{arg:`card`,eq:`Scheduling calendar`}},shape:{control:`inline-radio`,options:Object.keys(A),description:`Bloque en Day y Week, chip en Month, fila en la lista del día del celular.`,if:{arg:`card`,eq:`Scheduling calendar`}},duration:{control:{type:`range`,min:.25,max:3,step:.25},description:`Duración en horas: el alto del bloque (63px por hora).`,if:{arg:`card`,eq:`Scheduling calendar`}},width:{control:{type:`range`,min:0,max:560,step:10},description:`Ancho en px. 0 = el que tiene en la app.`}}},L={render:e=>(0,O.jsx)(ge,{...e})},R={name:`Noah James`,initials:`NJ`,provider:`Dr. Elena Martinez`,operatory:`Operatory 2`,time:`10:00`,accion:`Check Out`},z=()=>{},B={name:`Which card goes where`,parameters:{controls:{disable:!0}},render:()=>(0,O.jsxs)(v,{encabezado:[`Card`,`Where`,`What it shows`,`Click opens`],minimo:960,arriba:!0,children:[(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{children:(0,O.jsx)(`div`,{className:`w-[340px]`,children:(0,O.jsx)(_,{appt:R,onSelect:z,onEdit:z})})}),(0,O.jsxs)(`td`,{className:`font-semibold`,children:[`Dashboard`,(0,O.jsx)(`br`,{}),(0,O.jsx)(`span`,{className:`font-normal text-ink-muted`,children:`Appointments · Waiting Room`})]}),(0,O.jsx)(`td`,{className:`text-ink-medium`,children:`Paciente, profesional, sala, hora y la acción que sigue. TR y CC son los chips del frame de Figma.`}),(0,O.jsx)(`td`,{className:`text-ink-medium`,children:`La ficha rápida del paciente. El kebab: editar el turno.`})]}),(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{children:(0,O.jsx)(`div`,{className:`w-[300px]`,children:(0,O.jsx)(_,{appt:R,compact:!0})})}),(0,O.jsxs)(`td`,{className:`font-semibold`,children:[`Patients`,(0,O.jsx)(`br`,{}),(0,O.jsx)(`span`,{className:`font-normal text-ink-muted`,children:`Today Appointments`})]}),(0,O.jsx)(`td`,{className:`text-ink-medium`,children:`Paciente, hora y profesional.`}),(0,O.jsx)(`td`,{className:`text-ink-medium`,children:`El kebab: Edit abre el modal del turno; Go to appointment lleva a Scheduling.`})]}),(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{children:(0,O.jsx)(`div`,{className:`w-[300px]`,children:(0,O.jsx)(w,{name:`Noah James`,initials:`NJ`,status:`Booked`,reason:`Routine cleaning appointment`,when:`12 Mar 2025 · 10:00 AM`,place:`Los Angeles - 789 N Sunrise Street`,onCancel:z})})}),(0,O.jsxs)(`td`,{className:`font-semibold`,children:[`Patient overview`,(0,O.jsx)(`br`,{}),(0,O.jsx)(`span`,{className:`font-normal text-ink-muted`,children:`Appointments`})]}),(0,O.jsx)(`td`,{className:`text-ink-medium`,children:`Estado, motivo, fecha y lugar. El paciente ya se sabe: es su ficha.`}),(0,O.jsx)(`td`,{className:`text-ink-medium`,children:`Cancel, si todavía se puede.`})]}),(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{children:(0,O.jsx)(`div`,{className:`w-[300px]`,children:(0,O.jsx)(l,{s:c[0],onCancel:z,onSchedule:z})})}),(0,O.jsxs)(`td`,{className:`font-semibold`,children:[`Scheduling`,(0,O.jsx)(`br`,{}),(0,O.jsx)(`span`,{className:`font-normal text-ink-muted`,children:`Appointment requests`})]}),(0,O.jsx)(`td`,{className:`text-ink-medium`,children:`Paciente, urgencia (ASAP) o cuánto espera, motivo, fecha pedida y lugar. Misma card que Patient overview.`}),(0,O.jsx)(`td`,{className:`text-ink-medium`,children:`Schedule abre New Appointment con lo que pidió el paciente; Cancel la saca de la lista (con Undo).`})]}),(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{children:(0,O.jsxs)(`div`,{className:`flex w-[300px] flex-col gap-2`,children:[(0,O.jsx)(h,{evento:{start:10,patient:`Noah James`,state:`Booked`},forma:`bloque`,className:`w-40`,style:{height:63}}),(0,O.jsx)(h,{evento:{start:10,patient:`Noah James`,state:`Booked`},forma:`chip`,className:`w-36`}),(0,O.jsx)(h,{evento:{start:10,patient:`Noah James`,state:`Booked`},forma:`fila`,className:`w-full`})]})}),(0,O.jsxs)(`td`,{className:`font-semibold`,children:[`Scheduling`,(0,O.jsx)(`br`,{}),(0,O.jsx)(`span`,{className:`font-normal text-ink-muted`,children:`Calendar`})]}),(0,O.jsx)(`td`,{className:`text-ink-medium`,children:`Hora y paciente, del color del estado. Bloque en Day y Week, chip en Month, fila en el celular.`}),(0,O.jsx)(`td`,{className:`text-ink-medium`,children:`El detalle del turno. Se arrastra para cambiarlo de hora o de día.`})]})]})},V={name:`Patient overview and request: one card`,parameters:{controls:{disable:!0}},render:()=>(0,O.jsxs)(y,{children:[(0,O.jsx)(x,{titulo:`Side by side`,nota:`Las dos al ancho de la app (248px): la columna Appointments del Patient Dashboard y el panel Appointment requests de Scheduling. Antes la del paciente no tenía la barra y la de la solicitud tenía un punto en vez del avatar, su propia pill y botones de 11px.`,children:(0,O.jsxs)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[(0,O.jsx)(`div`,{className:`w-[248px]`,children:(0,O.jsx)(w,{name:`Maria Abril Viola`,initials:`av`,status:`Booked`,reason:`Routine cleaning appointment`,when:`12 Mar 2025 · 10:00 - 11:00 AM`,place:`Los Angeles - 789 N Sunrise Street`,onCancel:z})}),(0,O.jsx)(`div`,{className:`w-[248px]`,children:(0,O.jsx)(l,{s:c[0],onCancel:z,onSchedule:z})})]})}),(0,O.jsx)(x,{titulo:`Parts`,children:(0,O.jsx)(ae,{partes:[[`Barra`,`3px a la izquierda, del color de la pill: el estado o la urgencia se lee de reojo en la lista, como en los bloques del calendario.`,`BARRA_TONOS`],[`Superficie`,`La de toda card adentro de un panel: blanca, línea de medio pixel y sombra suave.`,`InnerCard`],[`Avatar`,`Iniciales en blanco sobre azul, 24px. Sin iniciales, salen del nombre.`,`span`],[`Nombre`,`12px Semibold. Si no entra baja a un segundo renglón y recién ahí se recorta (el nombre completo queda en el title).`,`span`],[`Pill`,`Estado del turno (Booked, Fulfilled, No Show, Cancelled) o de la solicitud (ASAP, cuánto espera).`,`Pill`],[`Motivo, fecha y lugar`,`11px gris, un renglón cada uno y recortados: la card no crece en una columna angosta.`,`p`],[`Acciones`,`Abajo a la derecha, ui/button sm (28px). Sin acciones no hay pie.`,`Button`]]})})]})},H={name:`Dashboard card: states`,parameters:{controls:{disable:!0}},render:()=>(0,O.jsxs)(v,{encabezado:[`State`,`Sample`,`What it means`],minimo:760,children:[(0,O.jsx)(E,{estado:`Default`,nota:`Un turno del día, con la acción que sigue.`,children:(0,O.jsx)(`div`,{className:`w-[340px]`,children:(0,O.jsx)(_,{appt:R,onSelect:z,onEdit:z})})}),(0,O.jsx)(E,{estado:`Hover`,nota:`Fondo apenas azulado: la card se puede tocar.`,children:(0,O.jsx)(b,{selector:`:scope > div`,estado:`hover`,className:`w-[340px]`,children:(0,O.jsx)(_,{appt:R,onSelect:z,onEdit:z})})}),(0,O.jsx)(E,{estado:`Keyboard focus`,nota:`Con Tab se llega al paciente; Enter abre su ficha.`,children:(0,O.jsx)(b,{selector:`button[aria-expanded]`,estado:`focus-visible`,className:`w-[340px]`,children:(0,O.jsx)(_,{appt:R,onSelect:z,onEdit:z})})}),(0,O.jsx)(E,{estado:`Selected`,nota:`Anillo azul mientras la ficha rápida del paciente está abierta: dice de qué card salió.`,children:(0,O.jsx)(`div`,{className:`w-[340px] p-1.5`,children:(0,O.jsx)(_,{appt:R,activa:!0,onSelect:z,onEdit:z})})}),(0,O.jsx)(E,{estado:`Menu open`,nota:`El kebab: Edit appointment abre el modal con los datos de la card.`,children:(0,O.jsx)(b,{selector:`button[aria-label^="Actions for"]`,estado:`click`,className:`w-[340px] pb-12`,children:(0,O.jsx)(_,{appt:R,onSelect:z,onEdit:z})})}),(0,O.jsx)(E,{estado:`Cancel`,nota:`Un turno que todavía no llegó: la acción que sigue es cancelarlo.`,children:(0,O.jsx)(`div`,{className:`w-[340px]`,children:(0,O.jsx)(_,{appt:{...R,accion:`Cancel`},onSelect:z,onEdit:z})})}),(0,O.jsx)(E,{estado:`Long name`,nota:`El nombre se recorta: los chips no bajan de renglón.`,children:(0,O.jsx)(`div`,{className:`w-[340px]`,children:(0,O.jsx)(_,{appt:{...R,name:`Maria Abril Viola Fernández de la Torre`,initials:`MA`},onSelect:z,onEdit:z})})})]})},U=`button[aria-label^="Actions for"]`,W={name:`Patients list card: states`,parameters:{controls:{disable:!0}},render:()=>(0,O.jsxs)(v,{encabezado:[`State`,`Sample`,`What it means`],minimo:760,children:[(0,O.jsx)(E,{estado:`Default`,nota:`Un turno del día: quién, a qué hora y con quién. La card no se toca; se actúa desde el kebab.`,children:(0,O.jsx)(`div`,{className:`w-[300px]`,children:(0,O.jsx)(g,{appt:R,onEdit:z})})}),(0,O.jsx)(E,{estado:`Kebab hover`,nota:`El kebab de las tablas (RowActionsMenu): fondo gris al pasar el mouse.`,children:(0,O.jsx)(b,{selector:U,estado:`hover`,className:`w-[300px]`,children:(0,O.jsx)(g,{appt:R,onEdit:z})})}),(0,O.jsx)(E,{estado:`Menu open`,nota:`Con Tab se llega al kebab y Enter lo abre. Edit abre el modal Edit Appointment con los datos de la card (guardar avisa y cierra: los turnos del día no cambian acá). Go to appointment lleva a Scheduling.`,children:(0,O.jsx)(`div`,{className:`h-28 w-[300px]`,children:(0,O.jsx)(g,{appt:R,onEdit:z,menuAbierto:!0})})}),(0,O.jsx)(E,{estado:`Long name`,nota:`El nombre se recorta: el kebab no baja de renglón.`,children:(0,O.jsx)(`div`,{className:`w-[300px]`,children:(0,O.jsx)(g,{appt:{...R,name:`Maria Abril Viola Fernández de la Torre`,initials:`MA`},onEdit:z})})}),(0,O.jsx)(E,{estado:`Ten appointments`,nota:`Today Appointments muestra los 10 del día, con scroll adentro del panel; sin “View all”.`,children:(0,O.jsx)(`div`,{className:`flex h-72 w-[300px] flex-col gap-3 overflow-y-auto p-1`,children:ce.map((e,t)=>(0,O.jsx)(g,{appt:e,onEdit:z},t))})})]})},G={Booked:`Confirmado y por venir: es el único que se puede cancelar.`,Fulfilled:`El paciente vino y se atendió.`,"No Show":`El paciente no vino.`,Cancelled:`Se canceló.`},K={name:`Patient overview card: states`,parameters:{controls:{disable:!0}},render:()=>(0,O.jsxs)(v,{encabezado:[`Status`,`Sample`,`What it means`],minimo:680,children:[M.map(e=>(0,O.jsx)(E,{estado:e,nota:G[e],children:(0,O.jsx)(`div`,{className:`w-[248px]`,children:(0,O.jsx)(w,{name:`Maria Abril Viola`,initials:`av`,status:e,reason:`Routine cleaning appointment`,when:`12 Mar 2025 · 10:00 - 11:00 AM`,place:`Los Angeles - 789 N Sunrise Street`,onCancel:e===`Booked`?z:void 0})})},e)),(0,O.jsx)(E,{estado:`Long name`,nota:`El nombre baja a un segundo renglón; si tampoco entra, se recorta. La pill no se mueve.`,children:(0,O.jsx)(`div`,{className:`w-[248px]`,children:(0,O.jsx)(w,{name:`Maria Abril Viola Fernández de la Torre`,initials:`MA`,status:`Booked`,reason:`Routine cleaning appointment and full-mouth radiographs`,when:`12 Mar 2025 · 10:00 - 11:00 AM`,place:`Los Angeles - 789 N Sunrise Street`,onCancel:z})})})]})},[q,,J]=c,Y={name:`Request card: states`,parameters:{controls:{disable:!0}},render:()=>(0,O.jsxs)(v,{encabezado:[`State`,`Sample`,`What it means`],minimo:680,children:[(0,O.jsx)(E,{estado:`ASAP`,nota:`Quiere el primer lugar libre: barra y pill en rojo.`,children:(0,O.jsx)(`div`,{className:`w-[248px]`,children:(0,O.jsx)(l,{s:q,onCancel:z,onSchedule:z})})}),(0,O.jsx)(E,{estado:`Waiting List`,nota:`En lista de espera: nada es urgente, barra y pill en azul. La pill dice cuánto espera.`,children:(0,O.jsx)(`div`,{className:`w-[248px]`,children:(0,O.jsx)(l,{s:J,onCancel:z,onSchedule:z})})}),(0,O.jsx)(E,{estado:`Schedule hover`,nota:`Schedule es la acción principal (primary sm); Cancel, la secundaria.`,children:(0,O.jsx)(b,{selector:`button:last-child`,estado:`hover`,className:`w-[248px]`,children:(0,O.jsx)(l,{s:q,onCancel:z,onSchedule:z})})}),(0,O.jsx)(E,{estado:`Keyboard focus`,nota:`Con Tab se llega a Cancel y a Schedule: el anillo azul de ui/button.`,children:(0,O.jsx)(b,{selector:`button:last-child`,estado:`focus-visible`,className:`w-[248px] p-1`,children:(0,O.jsx)(l,{s:q,onCancel:z,onSchedule:z})})}),(0,O.jsx)(E,{estado:`Phone`,nota:`En el celular el panel mide 260 y la card 228: los nombres largos bajan a un segundo renglón.`,children:(0,O.jsx)(`div`,{className:`w-[228px]`,children:(0,O.jsx)(l,{s:J,onCancel:z,onSchedule:z})})})]})},X={Proposed:`Propuesto al paciente, todavía sin confirmar.`,"Check-in":`El paciente llegó y está en la sala de espera.`,Booked:`Confirmado.`,"In progress":`Se lo está atendiendo.`,Fulfilled:`Atendido.`,"No-show":`No vino.`,Cancelled:`Cancelado: queda en la agenda, en gris.`},Z={name:`Calendar: states and shapes`,parameters:{controls:{disable:!0}},render:()=>(0,O.jsx)(v,{encabezado:[`State`,`Day / Week block`,`Month chip`,`Phone day list`,`What it means`],minimo:940,children:m.map(({state:e})=>{let t={start:10,patient:`Noah James`,state:e};return(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,O.jsx)(`td`,{children:(0,O.jsx)(h,{evento:t,forma:`bloque`,className:`w-36`,style:{height:47.25}})}),(0,O.jsx)(`td`,{children:(0,O.jsx)(h,{evento:t,forma:`chip`,className:`w-32`})}),(0,O.jsx)(`td`,{children:(0,O.jsx)(h,{evento:t,forma:`fila`,className:`w-64`})}),(0,O.jsx)(`td`,{className:`text-ink-medium`,children:X[e]})]},e)})})},Q=[[`Dashboard · card`,`dash`,`[data-appt-card]`],[`Dashboard · photo`,`dash`,`.size-11`],[`Dashboard · field`,`dash`,`.bg-dash-field`],[`Dashboard · action`,`dash`,`[data-appt-card] > button`],[`Patients list · row`,`fila`,`:scope > div`],[`Patient overview · card`,`over`,`:scope > div`],[`Appointment request · card`,`soli`,`:scope > div`],[`Calendar · block (1 h)`,`cal`,`button`],[`Calendar · chip`,`chip`,`button`]],$={parameters:{controls:{disable:!0}},render:()=>(0,O.jsx)(_e,{})},ve=[`Playground`,`WhichCardWhere`,`OneCardParts`,`DashboardStates`,`PatientsListStates`,`PatientOverviewStates`,`RequestStates`,`CalendarStates`,`Specs`],L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />
}`,...L.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
        <td><div className="w-[300px]"><SolicitudCard s={SOLICITUDES[0]} onCancel={nada} onSchedule={nada} /></div></td>
        <td className="font-semibold">Scheduling<br /><span className="font-normal text-ink-muted">Appointment requests</span></td>
        <td className="text-ink-medium">Paciente, urgencia (ASAP) o cuánto espera, motivo, fecha pedida y lugar. Misma card que Patient overview.</td>
        <td className="text-ink-medium">Schedule abre New Appointment con lo que pidió el paciente; Cancel la saca de la lista (con Undo).</td>
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
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Patient overview and request: one card',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Side by side" nota="Las dos al ancho de la app (248px): la columna Appointments del Patient Dashboard y el panel Appointment requests de Scheduling. Antes la del paciente no tenía la barra y la de la solicitud tenía un punto en vez del avatar, su propia pill y botones de 11px.">
        <div className="flex flex-wrap items-start gap-6">
          <div className="w-[248px]"><PatientAppointmentCard name="Maria Abril Viola" initials="av" status="Booked" reason="Routine cleaning appointment" when="12 Mar 2025 · 10:00 - 11:00 AM" place="Los Angeles - 789 N Sunrise Street" onCancel={nada} /></div>
          <div className="w-[248px]"><SolicitudCard s={SOLICITUDES[0]} onCancel={nada} onSchedule={nada} /></div>
        </div>
      </Bloque>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Barra', '3px a la izquierda, del color de la pill: el estado o la urgencia se lee de reojo en la lista, como en los bloques del calendario.', 'BARRA_TONOS'], ['Superficie', 'La de toda card adentro de un panel: blanca, línea de medio pixel y sombra suave.', 'InnerCard'], ['Avatar', 'Iniciales en blanco sobre azul, 24px. Sin iniciales, salen del nombre.', 'span'], ['Nombre', '12px Semibold. Si no entra baja a un segundo renglón y recién ahí se recorta (el nombre completo queda en el title).', 'span'], ['Pill', 'Estado del turno (Booked, Fulfilled, No Show, Cancelled) o de la solicitud (ASAP, cuánto espera).', 'Pill'], ['Motivo, fecha y lugar', '11px gris, un renglón cada uno y recortados: la card no crece en una columna angosta.', 'p'], ['Acciones', 'Abajo a la derecha, ui/button sm (28px). Sin acciones no hay pie.', 'Button']]} />
      </Bloque>
    </Lienzo>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
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
}`,...W.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Patient overview card: states',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Tabla encabezado={['Status', 'Sample', 'What it means']} minimo={680}>
      {ESTADOS_PACIENTE.map(s => <Fila key={s} estado={s} nota={SIGNIFICADO_PACIENTE[s]}>
          <div className="w-[248px]">
            <PatientAppointmentCard name="Maria Abril Viola" initials="av" status={s} reason="Routine cleaning appointment" when="12 Mar 2025 · 10:00 - 11:00 AM" place="Los Angeles - 789 N Sunrise Street" onCancel={s === 'Booked' ? nada : undefined} />
          </div>
        </Fila>)}
      <Fila estado="Long name" nota="El nombre baja a un segundo renglón; si tampoco entra, se recorta. La pill no se mueve.">
        <div className="w-[248px]">
          <PatientAppointmentCard name="Maria Abril Viola Fernández de la Torre" initials="MA" status="Booked" reason="Routine cleaning appointment and full-mouth radiographs" when="12 Mar 2025 · 10:00 - 11:00 AM" place="Los Angeles - 789 N Sunrise Street" onCancel={nada} />
        </div>
      </Fila>
    </Tabla>
}`,...K.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Request card: states',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={680}>
      <Fila estado="ASAP" nota="Quiere el primer lugar libre: barra y pill en rojo.">
        <div className="w-[248px]"><SolicitudCard s={ASAP} onCancel={nada} onSchedule={nada} /></div>
      </Fila>
      <Fila estado="Waiting List" nota="En lista de espera: nada es urgente, barra y pill en azul. La pill dice cuánto espera.">
        <div className="w-[248px]"><SolicitudCard s={ESPERA} onCancel={nada} onSchedule={nada} /></div>
      </Fila>
      <Fila estado="Schedule hover" nota="Schedule es la acción principal (primary sm); Cancel, la secundaria.">
        <Forzar selector="button:last-child" estado="hover" className="w-[248px]"><SolicitudCard s={ASAP} onCancel={nada} onSchedule={nada} /></Forzar>
      </Fila>
      <Fila estado="Keyboard focus" nota="Con Tab se llega a Cancel y a Schedule: el anillo azul de ui/button.">
        <Forzar selector="button:last-child" estado="focus-visible" className="w-[248px] p-1"><SolicitudCard s={ASAP} onCancel={nada} onSchedule={nada} /></Forzar>
      </Fila>
      <Fila estado="Phone" nota="En el celular el panel mide 260 y la card 228: los nombres largos bajan a un segundo renglón.">
        <div className="w-[228px]"><SolicitudCard s={ESPERA} onCancel={nada} onSchedule={nada} /></div>
      </Fila>
    </Tabla>
}`,...Y.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
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
}`,...Z.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Medicion />
}`,...$.parameters?.docs?.source}}}})))()}ye();export{Z as CalendarStates,H as DashboardStates,V as OneCardParts,K as PatientOverviewStates,W as PatientsListStates,L as Playground,Y as RequestStates,$ as Specs,B as WhichCardWhere,ve as __namedExportsOrder,I as default};