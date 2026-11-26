import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,r as i}from"./button-B6KF1ajn.js";import{f as a,i as o,l as s,t as c,u as l}from"./kit-Di92TvVK.js";import{a as u,i as d,n as f,o as p,r as m}from"./play-Dr1R_I1D.js";import{i as h,n as g,r as _,t as v}from"./HoursAppointmentsDialog-1mtX3Rs6.js";import{a as y,o as b}from"./location-detail-CqGaCj-Y.js";function x(e){let[t,n]=(0,S.useState)(!0),[r,a]=(0,S.useState)(w),o=r.filter(e=>E(e)&&T(e));return(0,C.jsxs)(`div`,{className:`p-6`,children:[(0,C.jsx)(i,{onClick:()=>{a(w),n(!0)},children:`Save working hours`}),t&&o.length>0&&(0,C.jsx)(g,{...e,afectados:o,onCambiar:e=>a(t=>t.map(t=>t.id===e.id?e:t)),onCancel:()=>n(!1),onConfirm:()=>n(!1)}),t&&o.length===0&&(0,C.jsx)(`p`,{className:`mt-4 text-sm text-ink-muted`,children:`No affected appointments left: back to the action that started it.`})]})}var S,C,w,T,E,D,O,k,A,j,M,N,P,F,I;function L(){return(L=e((()=>{S=t(),h(),a(),m(),r(),b(),C=n(),w=y.filter(e=>e.id===`wh1`||e.id===`wh2`),T=e=>{let t=e.fecha.getHours()*60;return(e.fecha.getDay()===1||e.fecha.getDay()===2)&&!(t>=540&&t+60<=840)},E=e=>e.estado===`Proposed`||e.estado===`Booked`,D={title:`Components/Settings/HoursAppointmentsDialog`,component:g,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:560},jira:[`CON-4167`,`CON-4164`,`CON-4165`,`CON-4166`],description:{component:['Citas que pierden cobertura con un cambio de Working Hours (CON-4167, HU 8): guardar el panel, borrar una franja con la ✕ o cerrar un día. Es un `ConfirmDialog` primary con `icon="warning"` y la lista de citas.',``,"**Por cita**, el ⋮ (`RowActionsMenu`): *Edit appointment* (moverla de día, hora o provider), *Cancel appointment* o *Mark as No Show*. Se guarda en el momento y no se deshace con Cancel; la cita resuelta **sale de la lista** y el contador *Appointments (N)* baja. Si no queda ninguna, se vuelve a la acción de origen.",``,"**Confirm** aplica el cambio y pasa a *Waiting List* las que siguen afectadas. **Cancel** no cambia los horarios. Si alguna cita afectada está en Check In o In Progress, en lugar de este aviso sale *Unable to change working hours* (`HoursBlockedDialog`) y no se aplica nada.",``,`**Probalo:** en *Playground*, en el ⋮ de John Smith elegí *Mark as No Show*: la fila sale y el contador pasa a 1.`].join(`
`)}}},args:{afectados:w,fueraDeHorario:T,operatorios:[`Operatory 1`,`Operatory 2`,`Operatory 3`],onCambiar:()=>{},onCancel:()=>{},onConfirm:()=>{}}},O={render:e=>(0,C.jsx)(x,{...e})},k={render:e=>(0,C.jsx)(x,{...e}),play:p(d(/Actions for appointment for John Smith/),u(`menuitem`,/Mark as No Show/),f(/Appointments \(1\)/))},A={render:e=>(0,C.jsx)(x,{...e}),play:p(d(/Actions for appointment for John Smith/),u(`menuitem`,/Cancel appointment/),d(/Actions for appointment for Maria Abril Viola/),u(`menuitem`,/Mark as No Show/),f(/No affected appointments left/))},j={render:()=>(0,C.jsx)(_,{turnos:y.filter(e=>e.estado===`Check in`),onClose:()=>{}})},M={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,C.jsx)(o,{children:(0,C.jsx)(c,{titulo:`Parts`,children:(0,C.jsx)(l,{partes:[[`Header`,`Ícono de alerta azul de 16 px y "Affected appointments".`,`ConfirmDialog icon="warning"`],[`Message`,`"There are scheduled appointments outside the new working hours. You can review and manage each appointment individually, or confirm to move all appointments to the waiting list."`,`Texto de CON-2890, adaptado`],[`Appointments (N)`,`El único contador: las citas pendientes. Por fila: paciente; fecha y horario completo ("Monday, November 23 · 3:00–4:00 PM"); provider. Scroll adentro desde 288px.`,`Lista con divisores`],[`Status`,`Badge a la derecha, separado del texto, junto al ⋮.`,`Pill sm`],[`Row actions`,`Edit appointment · Cancel appointment · Mark as No Show. Se guardan en el momento.`,`RowActionsMenu`],[`Footer`,`Cancel y Confirm.`,`ConfirmDialog`],[`Blocked`,`"Unable to change working hours" con las citas en Check In o In Progress y sólo Close.`,`HoursBlockedDialog`]]})})})},N={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,C.jsx)(o,{children:(0,C.jsx)(c,{titulo:`States`,nota:`La consecuencia del traslado no se repite por fila ni al pie: la dice el mensaje (CON-4167).`,children:(0,C.jsxs)(s,{encabezado:[`State`,`What happens`,`Story`],minimo:560,children:[(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Affected`}),(0,C.jsx)(`td`,{children:`Las citas Proposed o Booked que pierden cobertura, con su contador.`}),(0,C.jsx)(`td`,{children:`Playground`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`One managed`}),(0,C.jsx)(`td`,{children:`La cita resuelta sale de la lista y el contador baja.`}),(0,C.jsx)(`td`,{children:`Partly Managed`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`None left`}),(0,C.jsx)(`td`,{children:`El aviso se cierra y se vuelve a la acción de origen (el panel o la pregunta de borrar o cerrar), sin mover nada a Waiting List.`}),(0,C.jsx)(`td`,{children:`All Managed`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Blocked`}),(0,C.jsx)(`td`,{children:`Una cita afectada en Check In o In Progress: no se aplica nada, sólo Close.`}),(0,C.jsx)(`td`,{children:`Blocked`})]})]})})})},P={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,C.jsx)(o,{children:(0,C.jsx)(c,{titulo:`Specs`,children:(0,C.jsxs)(s,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Width`}),(0,C.jsx)(`td`,{children:`420px, la del ConfirmDialog.`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Affected`}),(0,C.jsx)(`td`,{children:`Citas de una hora que estaban cubiertas por un día Open y dejan de estarlo. Las que ya estaban afuera no cuentan.`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Starts from`}),(0,C.jsx)(`td`,{children:`Save de Set working hours, la ✕ de una franja (Delete working hours?) y el switch de un día (Close working hours?).`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Cancel`}),(0,C.jsx)(`td`,{children:`No cambia los horarios ni revierte lo que se guardó cita por cita.`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Confirm`}),(0,C.jsx)(`td`,{children:`"Monday is now closed. 1 appointment was moved to the waiting list." (con Undo al borrar o cerrar).`})]})]})})})},F={parameters:{layout:`padded`,controls:{disable:!0}},render:()=>(0,C.jsx)(`ul`,{className:`w-[380px] text-[13px]`,children:(0,C.jsx)(v,{t:w[0]})})},I=[`Playground`,`PartlyManaged`,`AllManaged`,`Blocked`,`Parts`,`States`,`Specs`,`AppointmentRow`],O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />,
  play: secuencia(pulsar(/Actions for appointment for John Smith/), pulsarRol('menuitem', /Mark as No Show/), esperar(/Appointments \\(1\\)/))
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />,
  play: secuencia(pulsar(/Actions for appointment for John Smith/), pulsarRol('menuitem', /Cancel appointment/), pulsar(/Actions for appointment for Maria Abril Viola/), pulsarRol('menuitem', /Mark as No Show/), esperar(/No affected appointments left/))
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <HoursBlockedDialog turnos={TURNOS_LOCACION.filter(t => t.estado === 'Check in')} onClose={() => {}} />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Header', 'Ícono de alerta azul de 16 px y "Affected appointments".', 'ConfirmDialog icon="warning"'], ['Message', '"There are scheduled appointments outside the new working hours. You can review and manage each appointment individually, or confirm to move all appointments to the waiting list."', 'Texto de CON-2890, adaptado'], ['Appointments (N)', 'El único contador: las citas pendientes. Por fila: paciente; fecha y horario completo ("Monday, November 23 · 3:00–4:00 PM"); provider. Scroll adentro desde 288px.', 'Lista con divisores'], ['Status', 'Badge a la derecha, separado del texto, junto al ⋮.', 'Pill sm'], ['Row actions', 'Edit appointment · Cancel appointment · Mark as No Show. Se guardan en el momento.', 'RowActionsMenu'], ['Footer', 'Cancel y Confirm.', 'ConfirmDialog'], ['Blocked', '"Unable to change working hours" con las citas en Check In o In Progress y sólo Close.', 'HoursBlockedDialog']]} />
      </Bloque>
    </Lienzo>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States" nota="La consecuencia del traslado no se repite por fila ni al pie: la dice el mensaje (CON-4167).">
        <Tabla encabezado={['State', 'What happens', 'Story']} minimo={560}>
          <tr><td className="font-semibold">Affected</td><td>Las citas Proposed o Booked que pierden cobertura, con su contador.</td><td>Playground</td></tr>
          <tr><td className="font-semibold">One managed</td><td>La cita resuelta sale de la lista y el contador baja.</td><td>Partly Managed</td></tr>
          <tr><td className="font-semibold">None left</td><td>El aviso se cierra y se vuelve a la acción de origen (el panel o la pregunta de borrar o cerrar), sin mover nada a Waiting List.</td><td>All Managed</td></tr>
          <tr><td className="font-semibold">Blocked</td><td>Una cita afectada en Check In o In Progress: no se aplica nada, sólo Close.</td><td>Blocked</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Width</td><td>420px, la del ConfirmDialog.</td></tr>
          <tr><td className="font-semibold">Affected</td><td>Citas de una hora que estaban cubiertas por un día Open y dejan de estarlo. Las que ya estaban afuera no cuentan.</td></tr>
          <tr><td className="font-semibold">Starts from</td><td>Save de Set working hours, la ✕ de una franja (Delete working hours?) y el switch de un día (Close working hours?).</td></tr>
          <tr><td className="font-semibold">Cancel</td><td>No cambia los horarios ni revierte lo que se guardó cita por cita.</td></tr>
          <tr><td className="font-semibold">Confirm</td><td>"Monday is now closed. 1 appointment was moved to the waiting list." (con Undo al borrar o cerrar).</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    }
  },
  render: () => <ul className="w-[380px] text-[13px]"><FilaTurno t={INICIALES[0]} /></ul>
}`,...F.parameters?.docs?.source}}}})))()}L();export{A as AllManaged,F as AppointmentRow,j as Blocked,k as PartlyManaged,M as Parts,O as Playground,P as Specs,N as States,I as __namedExportsOrder,D as default};