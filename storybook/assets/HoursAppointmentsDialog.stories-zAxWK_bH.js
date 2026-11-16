import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,r as i}from"./button-DhtV2iTj.js";import{f as a,i as o,l as s,t as c,u as l}from"./kit-Di92TvVK.js";import{a as u,i as d,n as f,o as p,r as m}from"./play-Dr1R_I1D.js";import{n as h,t as g}from"./HoursAppointmentsDialog-DYrPclm4.js";import{a as _,o as v}from"./location-detail-DOgt8VBp.js";function y(e){let[t,n]=(0,b.useState)(!0);return(0,x.jsxs)(`div`,{className:`p-6`,children:[(0,x.jsx)(i,{onClick:()=>n(!0),children:`Save working hours`}),t&&(0,x.jsx)(g,{...e,onCancel:()=>n(!1),onConfirm:()=>n(!1)})]})}var b,x,S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{b=t(),h(),a(),m(),r(),v(),x=n(),S=_.filter(e=>e.id===`wh1`||e.id===`wh2`),C=e=>{let t=e.fecha.getHours()*60;return(e.fecha.getDay()===1||e.fecha.getDay()===2)&&!(t>=540&&t+60<=840)},w={title:`Components/Settings/HoursAppointmentsDialog`,component:g,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:560},jira:[`CON-1546`,`CON-2890`],description:{component:['Aviso previo a guardar *Set working hours* cuando las horas nuevas dejan afuera turnos **Proposed** o **Booked** de la locación. Es un `ConfirmDialog` primary con `icon="warning"` y la lista de turnos.',``,"**Por turno**, el ⋮ (`RowActionsMenu`): *Edit appointment* abre el drawer de la agenda para moverlo de día, hora o provider; *Cancel appointment*; *Mark as No Show*; *Undo changes* vuelve al original. Cada fila: paciente, fecha y horario, provider, y el estado como badge a la derecha. El único contador es el de *Appointments (N)*.",``,`**Nada se aplica hasta Confirm**: Confirm guarda las horas y pasa los que quedan a *Waiting List*; Cancel vuelve al panel sin guardar ni las horas ni los turnos. El texto es el de CON-2890 adaptado a la locación (la historia habla del provider).`,``,`**Probalo:** en *Playground*, en el ⋮ de John Smith elegí *Mark as No Show* y mirá cómo cambia su badge.`].join(`
`)}}},args:{afectados:S,fueraDeHorario:C,operatorios:[`Operatory 1`,`Operatory 2`,`Operatory 3`],onCancel:()=>{},onConfirm:()=>{}}},T={render:e=>(0,x.jsx)(y,{...e})},E={render:e=>(0,x.jsx)(y,{...e}),play:p(d(/Actions for appointment for John Smith/),u(`menuitem`,/Mark as No Show/),f(/No Show/))},D={render:e=>(0,x.jsx)(y,{...e}),play:p(d(/Actions for appointment for John Smith/),u(`menuitem`,/Cancel appointment/),d(/Actions for appointment for Maria Abril Viola/),u(`menuitem`,/Mark as No Show/),f(/Cancelled/))},O={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,x.jsx)(o,{children:(0,x.jsx)(c,{titulo:`Parts`,children:(0,x.jsx)(l,{partes:[[`Header`,`Ícono de alerta ámbar de 16 px y "Affected appointments".`,`ConfirmDialog icon="warning"`],[`Message`,`"There are scheduled appointments outside the new working hours. You can review and manage each appointment individually, or confirm to move all appointments to the waiting list."`,`Texto de CON-2890, adaptado`],[`Appointments (N)`,`El único contador. Por fila: paciente; fecha y horario completo ("Monday, November 23 · 3:00–4:00 PM"); provider. Scroll adentro desde 288px.`,`Lista con divisores`],[`Status`,`Badge a la derecha, separado del texto, junto al ⋮. Cambia al resolver el turno (Cancelled, No Show).`,`Pill sm`],[`Row actions`,`Edit appointment · Cancel appointment · Mark as No Show · Undo changes.`,`RowActionsMenu`],[`Footer`,`Cancel y Confirm.`,`ConfirmDialog`]]})})})},k={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,x.jsx)(o,{children:(0,x.jsx)(c,{titulo:`States`,nota:`Por fila. Cada uno se ve en vivo en las stories de esta página. El mensaje de arriba ya dice que Confirm pasa a Waiting List lo que quede: no se repite por fila ni al pie.`,children:(0,x.jsxs)(s,{encabezado:[`Row state`,`What the row shows`],minimo:560,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Pending (Booked / Proposed, afuera)`}),(0,x.jsx)(`td`,{children:`Su badge de siempre. Pasa a Waiting List con Confirm.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Moved inside the hours (Edit appointment)`}),(0,x.jsx)(`td`,{children:`Mismo badge y la línea verde "Now within the new working hours.": el estado no cambia, así que se dice aparte.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Cancelled / No Show`}),(0,x.jsx)(`td`,{children:`El badge cambia a Cancelled o No Show.`})]})]})})})},A={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,x.jsx)(o,{children:(0,x.jsx)(c,{titulo:`Specs`,children:(0,x.jsxs)(s,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Width`}),(0,x.jsx)(`td`,{children:`420px, la del ConfirmDialog.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Affected`}),(0,x.jsx)(`td`,{children:`Turnos de una hora que no caben enteros en ninguna franja de los días elegidos.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Edit appointment`}),(0,x.jsx)(`td`,{children:`Abre NewAppointmentModal (Edit Appointment) y esconde el aviso hasta cerrarlo. Si el turno sigue afuera, toast info.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Confirm`}),(0,x.jsx)(`td`,{children:`"Hours saved for 3 days. 1 appointment was moved to the waiting list."`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Out of scope`}),(0,x.jsx)(`td`,{children:`El bloqueo por turnos Check In / In Progress de CON-2890.`})]})]})})})},j=[`Playground`,`PartlyManaged`,`AllManaged`,`Parts`,`States`,`Specs`],T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />,
  play: secuencia(pulsar(/Actions for appointment for John Smith/), pulsarRol('menuitem', /Mark as No Show/), esperar(/No Show/))
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />,
  play: secuencia(pulsar(/Actions for appointment for John Smith/), pulsarRol('menuitem', /Cancel appointment/), pulsar(/Actions for appointment for Maria Abril Viola/), pulsarRol('menuitem', /Mark as No Show/), esperar(/Cancelled/))
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
        <TablaPartes partes={[['Header', 'Ícono de alerta ámbar de 16 px y "Affected appointments".', 'ConfirmDialog icon="warning"'], ['Message', '"There are scheduled appointments outside the new working hours. You can review and manage each appointment individually, or confirm to move all appointments to the waiting list."', 'Texto de CON-2890, adaptado'], ['Appointments (N)', 'El único contador. Por fila: paciente; fecha y horario completo ("Monday, November 23 · 3:00–4:00 PM"); provider. Scroll adentro desde 288px.', 'Lista con divisores'], ['Status', 'Badge a la derecha, separado del texto, junto al ⋮. Cambia al resolver el turno (Cancelled, No Show).', 'Pill sm'], ['Row actions', 'Edit appointment · Cancel appointment · Mark as No Show · Undo changes.', 'RowActionsMenu'], ['Footer', 'Cancel y Confirm.', 'ConfirmDialog']]} />
      </Bloque>
    </Lienzo>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="States" nota="Por fila. Cada uno se ve en vivo en las stories de esta página. El mensaje de arriba ya dice que Confirm pasa a Waiting List lo que quede: no se repite por fila ni al pie.">
        <Tabla encabezado={['Row state', 'What the row shows']} minimo={560}>
          <tr><td className="font-semibold">Pending (Booked / Proposed, afuera)</td><td>Su badge de siempre. Pasa a Waiting List con Confirm.</td></tr>
          <tr><td className="font-semibold">Moved inside the hours (Edit appointment)</td><td>Mismo badge y la línea verde "Now within the new working hours.": el estado no cambia, así que se dice aparte.</td></tr>
          <tr><td className="font-semibold">Cancelled / No Show</td><td>El badge cambia a Cancelled o No Show.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
          <tr><td className="font-semibold">Affected</td><td>Turnos de una hora que no caben enteros en ninguna franja de los días elegidos.</td></tr>
          <tr><td className="font-semibold">Edit appointment</td><td>Abre NewAppointmentModal (Edit Appointment) y esconde el aviso hasta cerrarlo. Si el turno sigue afuera, toast info.</td></tr>
          <tr><td className="font-semibold">Confirm</td><td>"Hours saved for 3 days. 1 appointment was moved to the waiting list."</td></tr>
          <tr><td className="font-semibold">Out of scope</td><td>El bloqueo por turnos Check In / In Progress de CON-2890.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...A.parameters?.docs?.source}}}})))()}M();export{D as AllManaged,E as PartlyManaged,O as Parts,T as Playground,A as Specs,k as States,j as __namedExportsOrder,w as default};