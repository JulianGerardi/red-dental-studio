import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{c as n,i as r}from"./TreatmentPanel-dKEftA1Z.js";import{a as i,i as a,n as o,r as s,t as c}from"./play-CDw6varG.js";import{i as l,l as u,s as d,t as f}from"./kit-VhBMbBcY.js";import{n as p,t as m}from"./WorkflowsContext-DHMrn74T.js";var h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{u(),n(),p(),s(),h=t(),g={title:`Components/Clinical/TreatmentPanel`,component:r,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:900},description:{component:[`La pestaña **Treatment** de Clinical Mode (Figma 4540:26288, lógica de red.dev). A la izquierda el workflow elegido con sus pasos y preguntas; a la derecha la lista de Workflows (con el filtro del design system), Progress y la card Treatment plans.`,``,`**CC y TR:** completar Chief Complaint o Triage pone en verde CC o TR en el encabezado de Clinical Mode.`,``,`**Probalo:** en *Playground* contestá las preguntas de Triage y tocá Save Step; elegí otro workflow de la lista o generá la narrativa.`].join(`
`)}}},decorators:[e=>(0,h.jsx)(m,{children:(0,h.jsx)(e,{})})]},_={},v={play:i(a(/^chief complaint/i),o(/2\/2 steps completed/i))},y={play:async e=>{for(let t of e.canvasElement.querySelectorAll(`[role="group"]`))[...t.querySelectorAll(`button`)].find(e=>e.textContent===`No`)?.click();await i(a(/^save step$/i),o(/1\/1 steps completed/i))(e)}},b={play:i(c(/search a section/i,`zzzz`),o(/no sections found/i))},x={play:i(a(/^chief complaint/i),a(/^generate narrative$/i),o(/original clinical draft/i))},S={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,h.jsxs)(l,{children:[(0,h.jsx)(f,{titulo:`Workflow (left)`,children:(0,h.jsxs)(d,{encabezado:[`Part`,`What it does`],minimo:560,children:[(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Header`}),(0,h.jsx)(`td`,{children:`Nombre del workflow, versión publicada y, si está completo, la fecha.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Search`}),(0,h.jsx)(`td`,{children:`Busca una sección por nombre.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Narrative summary`}),(0,h.jsx)(`td`,{children:`La narrativa guardada, con Edit Narrative.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Steps`}),(0,h.jsx)(`td`,{children:`Cada paso plegable con sus preguntas; Save Step guarda y abre el siguiente; se pueden ocultar pasos.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Question`}),(0,h.jsx)(`td`,{children:`Opciones como botones; una respuesta puede abrir preguntas que cuelgan de ella.`})]})]})}),(0,h.jsx)(f,{titulo:`Right column`,children:(0,h.jsxs)(d,{encabezado:[`Part`,`What it does`],minimo:560,children:[(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Workflows`}),(0,h.jsx)(`td`,{children:`Lista con el filtro de Elements / Filter (búsqueda primero, tipos con ícono y cantidad) y los filtros aplicados en chips.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Progress`}),(0,h.jsx)(`td`,{children:`Pasos guardados del workflow elegido; tocar uno lo abre.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Treatment plans`}),(0,h.jsx)(`td`,{children:`Components / Clinical / Treatment plans card.`})]})]})})]})},C={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,h.jsx)(l,{children:(0,h.jsx)(f,{titulo:`Specs`,children:(0,h.jsxs)(d,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Right column`}),(0,h.jsx)(`td`,{children:`311px desde lg; abajo del workflow en pantallas angostas.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Workflows list`}),(0,h.jsx)(`td`,{children:`Hasta 300px de alto con scroll.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Opens on`}),(0,h.jsx)(`td`,{children:`El primer workflow sin completar, con su primer paso sin guardar abierto.`})]})]})})})},w=[`Playground`,`CompletedWorkflow`,`CompleteTriage`,`NoSections`,`NarrativeFromAnswers`,`Parts`,`Specs`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^chief complaint/i), esperar(/2\\/2 steps completed/i))
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  play: async c => {
    for (const grupo of c.canvasElement.querySelectorAll('[role="group"]')) {
      const no = [...grupo.querySelectorAll('button')].find(b => b.textContent === 'No');
      no?.click();
    }
    await secuencia(pulsar(/^save step$/i), esperar(/1\\/1 steps completed/i))(c);
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  play: secuencia(escribir(/search a section/i, 'zzzz'), esperar(/no sections found/i))
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^chief complaint/i), pulsar(/^generate narrative$/i), esperar(/original clinical draft/i))
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Workflow (left)">
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Header</td><td>Nombre del workflow, versión publicada y, si está completo, la fecha.</td></tr>
          <tr><td className="font-semibold">Search</td><td>Busca una sección por nombre.</td></tr>
          <tr><td className="font-semibold">Narrative summary</td><td>La narrativa guardada, con Edit Narrative.</td></tr>
          <tr><td className="font-semibold">Steps</td><td>Cada paso plegable con sus preguntas; Save Step guarda y abre el siguiente; se pueden ocultar pasos.</td></tr>
          <tr><td className="font-semibold">Question</td><td>Opciones como botones; una respuesta puede abrir preguntas que cuelgan de ella.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Right column">
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Workflows</td><td>Lista con el filtro de Elements / Filter (búsqueda primero, tipos con ícono y cantidad) y los filtros aplicados en chips.</td></tr>
          <tr><td className="font-semibold">Progress</td><td>Pasos guardados del workflow elegido; tocar uno lo abre.</td></tr>
          <tr><td className="font-semibold">Treatment plans</td><td>Components / Clinical / Treatment plans card.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Right column</td><td>311px desde lg; abajo del workflow en pantallas angostas.</td></tr>
          <tr><td className="font-semibold">Workflows list</td><td>Hasta 300px de alto con scroll.</td></tr>
          <tr><td className="font-semibold">Opens on</td><td>El primer workflow sin completar, con su primer paso sin guardar abierto.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...C.parameters?.docs?.source}}}})))()}T();export{y as CompleteTriage,v as CompletedWorkflow,x as NarrativeFromAnswers,b as NoSections,S as Parts,_ as Playground,C as Specs,w as __namedExportsOrder,g as default};