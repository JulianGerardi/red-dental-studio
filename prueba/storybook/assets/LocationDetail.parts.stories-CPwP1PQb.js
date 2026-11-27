import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{f as r,i,l as a,t as o}from"./kit-Di92TvVK.js";import{a as s,i as c,n as l,o as u,r as d}from"./play-Dr1R_I1D.js";import{c as f,i as p,n as m,o as h,r as g,s as _,t as v}from"./LocationDetail-p1RQO1oE.js";function y(){let[e,t]=(0,b.useState)(!0);return(0,x.jsx)(h,{on:e,onChange:t})}var b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{b=t(),f(),r(),d(),x=n(),S={title:`Pages/Parts/Location detail`,parameters:{docs:{jira:[`CON-1590`,`CON-4019`,`CON-1173`]},layout:`padded`}},C={render:()=>(0,x.jsx)(y,{})},w={render:()=>(0,x.jsx)(g,{nombreLocacion:`Abril`})},T={render:()=>(0,x.jsx)(_,{})},E={render:()=>(0,x.jsx)(p,{})},D={render:()=>(0,x.jsx)(v,{})},O=[`08:00 AM - 01:00 PM`,`02:00 PM - 06:00 PM`,`06:30 PM - 08:00 PM`,`08:15 PM - 09:00 PM`],k={render:()=>(0,x.jsx)(`div`,{className:`w-[900px]`,children:(0,x.jsx)(m,{label:`Monday`,rangos:O,onQuitar:()=>{},onEditar:()=>{}})})},A={render:()=>(0,x.jsx)(`div`,{className:`w-[420px]`,children:(0,x.jsx)(m,{label:`Monday`,rangos:O,onQuitar:()=>{},onEditar:()=>{}})})},j={name:`Working Hours · Delete working hours?`,parameters:{docs:{jira:[`CON-4166`]}},render:()=>(0,x.jsx)(_,{}),play:u(c(/^Remove 02:00 PM - 06:00 PM on Tuesday/),l(/This will delete the working hours from 02:00 PM to 06:00 PM on Tuesday/))},M={name:`Working Hours · Close working hours?`,parameters:{docs:{jira:[`CON-4165`]}},render:()=>(0,x.jsx)(_,{}),play:u(s(`switch`,/^Thursday open$/),l(/This will close the location every Thursday/))},N={name:`Working Hours · Unable to change`,parameters:{docs:{jira:[`CON-4167`]}},render:()=>(0,x.jsx)(_,{}),play:u(c(/^Remove 08:00 AM - 01:00 PM on Monday/),c(/^Confirm$/),l(/Unable to change working hours/))},P={name:`Working Hours · States`,parameters:{docs:{jira:[`CON-4160`,`CON-4161`,`CON-4162`,`CON-4164`,`CON-4165`,`CON-4166`,`CON-4167`]}},render:()=>(0,x.jsx)(i,{children:(0,x.jsx)(o,{titulo:`States`,nota:`Toda acción pasa por pregunta, impacto en las citas y aplicación. Cancel en cualquier paso deja la tabla como estaba.`,children:(0,x.jsxs)(a,{encabezado:[`Action`,`Question`,`Then`,`Story`],minimo:720,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`✕ de una franja`}),(0,x.jsx)(`td`,{children:`Delete working hours? (danger, tacho). Si es la última del día: "Monday will be closed."; si es la última de la locación: "The location will have no working hours."`}),(0,x.jsx)(`td`,{children:`Sale sólo esa franja; sin franjas, el día queda Closed. Toast con Undo.`}),(0,x.jsx)(`td`,{children:`Delete working hours?`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Switch a Closed`}),(0,x.jsx)(`td`,{children:`Close working hours? (danger): "This will close the location every Monday."`}),(0,x.jsx)(`td`,{children:`El día conserva sus franjas; reabrirlo las trae a Set working hours.`}),(0,x.jsx)(`td`,{children:`Close working hours?`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Save del panel`}),(0,x.jsx)(`td`,{children:`Replace working hours? si pisa otro día abierto con otro horario.`}),(0,x.jsx)(`td`,{children:`Reemplaza el horario de cada día elegido.`}),(0,x.jsx)(`td`,{children:`LocationHoursModal`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Citas que pierden cobertura`}),(0,x.jsx)(`td`,{children:`Affected appointments (HoursAppointmentsDialog).`}),(0,x.jsx)(`td`,{children:`Confirm pasa las pendientes a Waiting List.`}),(0,x.jsx)(`td`,{children:`HoursAppointmentsDialog`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Cita afectada en Check In o In Progress`}),(0,x.jsx)(`td`,{children:`Unable to change working hours (sólo Close).`}),(0,x.jsx)(`td`,{children:`No se aplica nada.`}),(0,x.jsx)(`td`,{children:`Unable to change`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Franjas que no entran en la fila`}),(0,x.jsx)(`td`,{children:`—`}),(0,x.jsx)(`td`,{children:`Las que caben y "+N", que despliega el resto.`}),(0,x.jsx)(`td`,{children:`Day Hours Overflow`})]})]})})})},F=[`OpenClosedSwitch`,`InformationTabView`,`WorkingHoursTabView`,`RoomsTabView`,`ExceptionsTabView`,`DayHoursFit`,`DayHoursOverflow`,`DeleteHoursQuestion`,`CloseDayQuestion`,`ChangeBlocked`,`WorkingHoursStates`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Switch />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <InformationTab nombreLocacion="Abril" />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <WorkingHoursTab />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <RoomsTab />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <ExceptionsTab />
}`,...D.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[900px]"><FranjasDia label="Monday" rangos={CUATRO} onQuitar={() => {}} onEditar={() => {}} /></div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px]"><FranjasDia label="Monday" rangos={CUATRO} onQuitar={() => {}} onEditar={() => {}} /></div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Working Hours · Delete working hours?',
  parameters: {
    docs: {
      jira: ['CON-4166']
    }
  },
  render: () => <WorkingHoursTab />,
  play: secuencia(pulsar(/^Remove 02:00 PM - 06:00 PM on Tuesday/), esperar(/This will delete the working hours from 02:00 PM to 06:00 PM on Tuesday/))
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Working Hours · Close working hours?',
  parameters: {
    docs: {
      jira: ['CON-4165']
    }
  },
  render: () => <WorkingHoursTab />,
  play: secuencia(pulsarRol('switch', /^Thursday open$/), esperar(/This will close the location every Thursday/))
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Working Hours · Unable to change',
  parameters: {
    docs: {
      jira: ['CON-4167']
    }
  },
  render: () => <WorkingHoursTab />,
  play: secuencia(pulsar(/^Remove 08:00 AM - 01:00 PM on Monday/), pulsar(/^Confirm$/), esperar(/Unable to change working hours/))
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Working Hours · States',
  parameters: {
    docs: {
      jira: ['CON-4160', 'CON-4161', 'CON-4162', 'CON-4164', 'CON-4165', 'CON-4166', 'CON-4167']
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States" nota="Toda acción pasa por pregunta, impacto en las citas y aplicación. Cancel en cualquier paso deja la tabla como estaba.">
        <Tabla encabezado={['Action', 'Question', 'Then', 'Story']} minimo={720}>
          <tr><td className="font-semibold">✕ de una franja</td><td>Delete working hours? (danger, tacho). Si es la última del día: "Monday will be closed."; si es la última de la locación: "The location will have no working hours."</td><td>Sale sólo esa franja; sin franjas, el día queda Closed. Toast con Undo.</td><td>Delete working hours?</td></tr>
          <tr><td className="font-semibold">Switch a Closed</td><td>Close working hours? (danger): "This will close the location every Monday."</td><td>El día conserva sus franjas; reabrirlo las trae a Set working hours.</td><td>Close working hours?</td></tr>
          <tr><td className="font-semibold">Save del panel</td><td>Replace working hours? si pisa otro día abierto con otro horario.</td><td>Reemplaza el horario de cada día elegido.</td><td>LocationHoursModal</td></tr>
          <tr><td className="font-semibold">Citas que pierden cobertura</td><td>Affected appointments (HoursAppointmentsDialog).</td><td>Confirm pasa las pendientes a Waiting List.</td><td>HoursAppointmentsDialog</td></tr>
          <tr><td className="font-semibold">Cita afectada en Check In o In Progress</td><td>Unable to change working hours (sólo Close).</td><td>No se aplica nada.</td><td>Unable to change</td></tr>
          <tr><td className="font-semibold">Franjas que no entran en la fila</td><td>—</td><td>Las que caben y "+N", que despliega el resto.</td><td>Day Hours Overflow</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...P.parameters?.docs?.source}}}})))()}I();export{N as ChangeBlocked,M as CloseDayQuestion,k as DayHoursFit,A as DayHoursOverflow,j as DeleteHoursQuestion,D as ExceptionsTabView,w as InformationTabView,C as OpenClosedSwitch,E as RoomsTabView,P as WorkingHoursStates,T as WorkingHoursTabView,F as __namedExportsOrder,S as default};