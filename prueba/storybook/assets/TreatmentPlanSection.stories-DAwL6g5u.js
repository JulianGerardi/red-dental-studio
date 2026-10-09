import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{h as n,v as r}from"./TreatmentPlanSection-Bz1e-V6T.js";import{i,n as a,o,r as s}from"./play-Dr1R_I1D.js";import{c,d as l,i as u,t as d}from"./kit-4bQS7S9u.js";var f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{r(),s(),l(),f=t(),p={title:`Components/Clinical/TreatmentPlanSection`,component:n,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`El Treatment Plan de Clinical Mode, como red.dev: a la izquierda los planes por fecha de creación; a la derecha el caso elegido con sus visitas y procedimientos, o los procedimientos sin asignar.`,``,`**Según el estado del caso:** en Planning todo se edita; antes de aceptar el plan (Planning, Pending, Presented) **no hay consentimiento ni turno**: no se ven el bloque de consentimiento, la columna Consent ni el turno de cada visita. Desde Waiting for consent aparecen.`,``,`**Probalo:** en *Playground* elegí otro plan de la lista; en *Accepted Case* se ven el consentimiento y los turnos.`].join(`
`)}}}},m={},h={args:{casoInicial:`c5`}},g={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(u,{children:(0,f.jsx)(d,{titulo:`By case status`,children:(0,f.jsxs)(c,{encabezado:[`Status`,`Edit`,`Consent`,`Appointment`],minimo:560,children:[(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Planning`}),(0,f.jsx)(`td`,{children:`Todo: nombre, alternativa, Move to, categoría, arrastrar`}),(0,f.jsx)(`td`,{children:`—`}),(0,f.jsx)(`td`,{children:`—`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Pending`}),(0,f.jsx)(`td`,{children:`Preview`}),(0,f.jsx)(`td`,{children:`—`}),(0,f.jsx)(`td`,{children:`—`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Presented`}),(0,f.jsx)(`td`,{children:`—`}),(0,f.jsx)(`td`,{children:`—`}),(0,f.jsx)(`td`,{children:`—`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Waiting for consent`}),(0,f.jsx)(`td`,{children:`—`}),(0,f.jsx)(`td`,{children:`Bloque y columna Consent`}),(0,f.jsx)(`td`,{children:`Turno de cada visita`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Accepted`}),(0,f.jsx)(`td`,{children:`Generate Consent`}),(0,f.jsx)(`td`,{children:`Bloque y columna Consent`}),(0,f.jsx)(`td`,{children:`Turno de cada visita`})]})]})})})},_={play:i(/select all procedures/i)},v={play:o(i(/new alternative case/i),i(/^save$/i),a(/required/i))},y=[`Playground`,`AcceptedCase`,`States`,`RowsSelected`,`MoveDialogWithError`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    casoInicial: 'c5'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
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
      <Bloque titulo="By case status">
        <Tabla encabezado={['Status', 'Edit', 'Consent', 'Appointment']} minimo={560}>
          <tr><td className="font-semibold">Planning</td><td>Todo: nombre, alternativa, Move to, categoría, arrastrar</td><td>—</td><td>—</td></tr>
          <tr><td className="font-semibold">Pending</td><td>Preview</td><td>—</td><td>—</td></tr>
          <tr><td className="font-semibold">Presented</td><td>—</td><td>—</td><td>—</td></tr>
          <tr><td className="font-semibold">Waiting for consent</td><td>—</td><td>Bloque y columna Consent</td><td>Turno de cada visita</td></tr>
          <tr><td className="font-semibold">Accepted</td><td>Generate Consent</td><td>Bloque y columna Consent</td><td>Turno de cada visita</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  play: pulsar(/select all procedures/i)
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/new alternative case/i), pulsar(/^save$/i), esperar(/required/i))
}`,...v.parameters?.docs?.source}}}})))()}b();export{h as AcceptedCase,v as MoveDialogWithError,m as Playground,_ as RowsSelected,g as States,y as __namedExportsOrder,p as default};