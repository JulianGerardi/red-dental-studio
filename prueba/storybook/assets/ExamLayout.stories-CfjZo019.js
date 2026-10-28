import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./stethoscope-CtGSUjPD.js";import{n as i,r as a,t as o}from"./ExamLayout-D1ZU0pTU.js";import{n as s,t as c}from"./empty-state-yo-tjb-R.js";import{n as l,r as u}from"./play-Dr1R_I1D.js";import{c as d,d as f,i as p,t as m}from"./kit-CWUgB5-0.js";var h,g,_,v,y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{n(),s(),f(),u(),a(),h=t(),{userEvent:g,within:_}=__STORYBOOK_MODULE_TEST__,v={title:`Components/Clinical/ExamLayout`,component:i,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:620},description:{component:`Lo que comparten todos los exámenes de Clinical Mode: el panel de **Findings** a la izquierda (menos en Vitals) y arriba del contenido **Add Procedure**, **Add Condition** y **View Problem List**, blancas y con el texto que se abre al pasar el mouse. Add Procedure y Add Condition abren el drawer de New Procedure; View Problem List, la tabla flotante, ancha como para que entren todas las columnas y con scroll adentro si una fila abierta la hace más alta que la pantalla. El menú de cada finding empieza con **View full record**: el mismo drawer de la Problem List (procedimientos, caso, derivaciones, órdenes y examen de origen) sin salir del examen; un link a otro registro cambia el drawer a ese y uno a otra pestaña lleva ahí. **Probalo:** pasá el mouse por las acciones y abrí el menú de un finding: View full record o Edit.`}}},args:{findings:!0,children:null},argTypes:{findings:{control:`boolean`,description:`El panel de Findings. Vitals no lo lleva.`}}},y=(0,h.jsx)(`div`,{className:`rounded-xl border border-line bg-white`,children:(0,h.jsx)(c,{icon:r,title:`Physical`,detail:`The exam content goes here.`,pill:`Planned`,className:`py-16`})}),b={render:e=>(0,h.jsx)(o,{children:(0,h.jsx)(i,{findings:e.findings,children:y})})},x={render:()=>(0,h.jsx)(i,{findings:!1,children:y})},S={name:`Problem list open`,parameters:{docs:{story:{inline:!1,iframeHeight:720}}},render:()=>(0,h.jsx)(i,{findings:!1,children:y}),play:async e=>{await g.click(await _(e.canvasElement).findByRole(`button`,{name:`View Problem List`})),await l(/Generally unwell/)(e)}},C={name:`Problem list · row open`,parameters:{docs:{story:{inline:!1,iframeHeight:720}}},render:()=>(0,h.jsx)(i,{findings:!1,children:y}),play:async e=>{await g.click(await _(e.canvasElement).findByRole(`button`,{name:`View Problem List`})),await g.click(await _(document.body).findByText(/Generally unwell/)),await l(/View full record/)(e)}},w={name:`Finding record open`,parameters:{docs:{story:{inline:!1,iframeHeight:720}}},render:()=>(0,h.jsx)(o,{children:(0,h.jsx)(i,{examen:`Dental Assessment`,children:y})}),play:async e=>{await g.click(await _(e.canvasElement).findByRole(`button`,{name:`Actions for Tooth 3`})),await g.click(await _(document.body).findByRole(`menuitem`,{name:`View full record`})),await l(/Source exam/)(e)}},T={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,h.jsxs)(p,{children:[(0,h.jsx)(m,{titulo:`Finding record`,children:(0,h.jsxs)(d,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Where`}),(0,h.jsx)(`td`,{children:`Primer ítem del menú de cada finding (Components / Clinical / Dental / FindingActionsMenu).`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`What opens`}),(0,h.jsx)(`td`,{children:`El drawer lg de View full record de la Problem List (Components / Clinical / RecordDetail): los datos del finding (con Descriptors) y Procedures, Treatment, Referrals, Lab orders y Source exam.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Links`}),(0,h.jsx)(`td`,{children:`Un hallazgo o procedimiento vinculado cambia el drawer a ese registro; un caso, una orden, una derivación o un examen llevan a su pestaña y el drawer se cierra.`})]})]})}),(0,h.jsx)(m,{titulo:`Problem list overlay`,children:(0,h.jsxs)(d,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Width`}),(0,h.jsx)(`td`,{children:`Hasta 1240px, o el ancho de la pantalla menos 32px. Desde 1024px la tabla entra entera (Status y Actions incluidos); más angosto, la tabla scrollea de costado adentro de su caja.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Height`}),(0,h.jsx)(`td`,{children:`Hasta el borde de abajo de la pantalla (menos 16px); si una fila abierta la hace más alta, scrollea adentro del flotante.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Position`}),(0,h.jsx)(`td`,{children:`Debajo de View Problem List, alineado a su izquierda; si no entra, se corre hacia la izquierda dejando 16px de margen.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Shadow`}),(0,h.jsx)(`td`,{children:`0 16px 40px negro al 18%, radio 8px (el de la card de la tabla).`})]})]})})]})},E=[`Playground`,`WithoutFindings`,`ProblemListOpen`,`ProblemListRowOpen`,`FindingRecordOpen`,`Specs`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: a => <ExamFindingsProvider><ExamLayout findings={a.findings}>{contenido}</ExamLayout></ExamFindingsProvider>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <ExamLayout findings={false}>{contenido}</ExamLayout>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Problem list open',
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 720
      }
    }
  },
  render: () => <ExamLayout findings={false}>{contenido}</ExamLayout>,
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', {
      name: 'View Problem List'
    }));
    await esperar(/Generally unwell/)(c);
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Problem list · row open',
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 720
      }
    }
  },
  render: () => <ExamLayout findings={false}>{contenido}</ExamLayout>,
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', {
      name: 'View Problem List'
    }));
    await userEvent.click(await within(document.body).findByText(/Generally unwell/));
    await esperar(/View full record/)(c);
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Finding record open',
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 720
      }
    }
  },
  render: () => <ExamFindingsProvider><ExamLayout examen="Dental Assessment">{contenido}</ExamLayout></ExamFindingsProvider>,
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', {
      name: 'Actions for Tooth 3'
    }));
    await userEvent.click(await within(document.body).findByRole('menuitem', {
      name: 'View full record'
    }));
    await esperar(/Source exam/)(c);
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Finding record">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Where</td><td>Primer ítem del menú de cada finding (Components / Clinical / Dental / FindingActionsMenu).</td></tr>
          <tr><td className="font-semibold">What opens</td><td>El drawer lg de View full record de la Problem List (Components / Clinical / RecordDetail): los datos del finding (con Descriptors) y Procedures, Treatment, Referrals, Lab orders y Source exam.</td></tr>
          <tr><td className="font-semibold">Links</td><td>Un hallazgo o procedimiento vinculado cambia el drawer a ese registro; un caso, una orden, una derivación o un examen llevan a su pestaña y el drawer se cierra.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Problem list overlay">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Width</td><td>Hasta 1240px, o el ancho de la pantalla menos 32px. Desde 1024px la tabla entra entera (Status y Actions incluidos); más angosto, la tabla scrollea de costado adentro de su caja.</td></tr>
          <tr><td className="font-semibold">Height</td><td>Hasta el borde de abajo de la pantalla (menos 16px); si una fila abierta la hace más alta, scrollea adentro del flotante.</td></tr>
          <tr><td className="font-semibold">Position</td><td>Debajo de View Problem List, alineado a su izquierda; si no entra, se corre hacia la izquierda dejando 16px de margen.</td></tr>
          <tr><td className="font-semibold">Shadow</td><td>0 16px 40px negro al 18%, radio 8px (el de la card de la tabla).</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...T.parameters?.docs?.source}}}})))()}D();export{w as FindingRecordOpen,b as Playground,S as ProblemListOpen,C as ProblemListRowOpen,T as Specs,x as WithoutFindings,E as __namedExportsOrder,v as default};