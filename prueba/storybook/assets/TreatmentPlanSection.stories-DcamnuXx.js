import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{it as n,nt as r}from"./data-table-DDRl7nPL.js";import{i,n as a,o,r as s}from"./play-Dr1R_I1D.js";import{c,d as l,i as u,t as d}from"./kit-CWUgB5-0.js";var f,p,m,h,g,_,v,y,b,x,S;function C(){return(C=e((()=>{n(),s(),l(),f=t(),{userEvent:p,within:m}=__STORYBOOK_MODULE_TEST__,h={title:`Components/Clinical/TreatmentPlanSection`,component:r,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`El Treatment Plan de Clinical Mode, como red.dev: a la izquierda los planes por fecha de creación; a la derecha el caso elegido con sus visitas y procedimientos, o los procedimientos sin asignar.`,``,`**Según el estado del caso:** en Planning todo se edita; antes de aceptar el plan (Planning, Pending, Presented) **no hay consentimiento ni turno**: no se ven el bloque de consentimiento, la columna Consent ni el turno de cada visita. Desde Waiting for consent aparecen.`,``,`**Cada fila se despliega** (Unassigned y las visitas de cada caso) con el detalle de la Problem List: el caso, el estado del consentimiento de ese procedimiento, los hallazgos, derivaciones y órdenes. La tabla está en *Components / Clinical / TreatmentPlanSection table*.`,``,`**Probalo:** en *Playground* elegí otro plan de la lista y abrí una fila; en *Accepted Case* se ven el consentimiento y los turnos.`].join(`
`)}}}},g={},_={args:{casoInicial:`c5`}},v={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(u,{children:(0,f.jsx)(d,{titulo:`By case status`,children:(0,f.jsxs)(c,{encabezado:[`Status`,`Edit`,`Consent`,`Appointment`],minimo:560,children:[(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Planning`}),(0,f.jsx)(`td`,{children:`Todo: nombre, alternativa, Move to, categoría, arrastrar`}),(0,f.jsx)(`td`,{children:`—`}),(0,f.jsx)(`td`,{children:`—`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Pending`}),(0,f.jsx)(`td`,{children:`Preview`}),(0,f.jsx)(`td`,{children:`—`}),(0,f.jsx)(`td`,{children:`—`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Presented`}),(0,f.jsx)(`td`,{children:`—`}),(0,f.jsx)(`td`,{children:`—`}),(0,f.jsx)(`td`,{children:`—`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Waiting for consent`}),(0,f.jsx)(`td`,{children:`—`}),(0,f.jsx)(`td`,{children:`Bloque y columna Consent`}),(0,f.jsx)(`td`,{children:`Turno de cada visita`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Accepted`}),(0,f.jsx)(`td`,{children:`Generate Consent`}),(0,f.jsx)(`td`,{children:`Bloque y columna Consent`}),(0,f.jsx)(`td`,{children:`Turno de cada visita`})]})]})})})},y={name:`Row open`,play:async e=>{let[t]=await m(e.canvasElement).findAllByText(/^D0120 Periodic oral evaluation$/);await p.click(t),await a(/No treatment linked/)(e)}},b={play:i(/select all procedures/i)},x={play:o(i(/new alternative case/i),i(/^save$/i),a(/required/i))},S=[`Playground`,`AcceptedCase`,`States`,`RowOpen`,`RowsSelected`,`MoveDialogWithError`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    casoInicial: 'c5'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Row open',
  play: async c => {
    const [fila] = await within(c.canvasElement).findAllByText(/^D0120 Periodic oral evaluation$/);
    await userEvent.click(fila!);
    await esperar(/No treatment linked/)(c);
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  play: pulsar(/select all procedures/i)
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/new alternative case/i), pulsar(/^save$/i), esperar(/required/i))
}`,...x.parameters?.docs?.source}}}})))()}C();export{_ as AcceptedCase,x as MoveDialogWithError,g as Playground,y as RowOpen,b as RowsSelected,v as States,S as __namedExportsOrder,h as default};