import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,i,o as a,r as o}from"./pilcrow-DOTNwM_s.js";import{n as s,r as c}from"./play-CDw6varG.js";import{i as l,l as u,s as d,t as f}from"./kit-VhBMbBcY.js";import{c as p,i as m,n as h}from"./workflows-CIU_52RF.js";import{n as g,r as _,t as v}from"./NarrativeEditor-DJuyhwhy.js";function y({wf:e,inicial:t}){let[n,r]=(0,b.useState)(t);return(0,x.jsx)(g,{wf:e,progreso:n,open:!0,onClose:()=>{},onGuardar:e=>r(t=>({...t??{respuestas:{},guardados:[]},narrativa:{...e,fecha:`Oct 05, 9:20 AM`}}))})}var b,x,S,C,w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{b=t(),u(),a(),i(),p(),_(),c(),x=n(),[S,C]=m,w={title:`Components/Clinical/NarrativeEditor`,component:g,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:760},description:{component:[`El **AI Narrative Editor** de Treatment (Clinical Mode): arma la narrativa clínica con lo contestado y guardado en un workflow, como red.dev. Se abre con *Generate Narrative* (o *Edit Narrative* si ya hay una) y es un drawer xl.`,``,`**Flujo:** al abrir genera el borrador (skeleton mientras tanto) y lo guarda solo como *Original Clinical Draft*. Se edita con la barra de formato; *Apply Changes* se habilita recién al editar. Descartar o regenerar encima de cambios pide confirmación.`,``,`**Probalo:** en *Playground* editá el texto y aplicá los cambios.`].join(`
`)}}}},T={wf:S,open:!0,onClose:()=>{},onGuardar:()=>{}},E={args:T,render:()=>(0,x.jsx)(y,{wf:S,inicial:h[`chief-complaint`]})},D={args:T,render:()=>(0,x.jsx)(y,{wf:S,inicial:h[`chief-complaint`]}),play:s(/original clinical draft/i)},O={args:T,render:()=>(0,x.jsx)(y,{wf:C}),play:s(/no answered questions to summarize/i)},k={args:T,render:()=>(0,x.jsx)(y,{wf:S,inicial:{...h[`chief-complaint`],narrativa:{html:`<h2>Chief Complaint</h2><p>Patient reports sharp pain on the lower right with cold drinks, for a few days.</p>`,origen:`edited`,fecha:`Oct 05, 9:20 AM`}}}),play:s(/edited narrative/i)},A={args:T,parameters:{layout:`padded`},render:()=>(0,x.jsxs)(`div`,{className:`flex items-center gap-1`,children:[(0,x.jsx)(v,{etiqueta:`Bold`,icono:r,onClick:()=>{}}),(0,x.jsx)(v,{etiqueta:`Title`,onClick:()=>{}}),(0,x.jsx)(v,{etiqueta:`List`,icono:o,onClick:()=>{},disabled:!0})]})},j={args:T,parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,x.jsx)(l,{children:(0,x.jsx)(f,{titulo:`Parts`,children:(0,x.jsxs)(d,{encabezado:[`Part`,`What it does`],minimo:560,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Status`}),(0,x.jsx)(`td`,{children:`Original Clinical Draft (generado y guardado solo) o Edited narrative (aplicada), con la fecha.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Format bar`}),(0,x.jsx)(`td`,{children:`Bold, Title, Subtitle, Text y List. Deshabilitada mientras genera.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Editor`}),(0,x.jsx)(`td`,{children:`El texto con títulos por paso guardado y la lista de preguntas y respuestas.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Footer`}),(0,x.jsx)(`td`,{children:`Discard o Regenerate a la izquierda; Apply Changes a la derecha.`})]})]})})})},M={args:T,parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,x.jsx)(l,{children:(0,x.jsx)(f,{titulo:`States`,children:(0,x.jsxs)(d,{encabezado:[`State`,`When`,`Story`],minimo:560,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Loading`}),(0,x.jsx)(`td`,{children:`Generando el borrador: skeleton y barra deshabilitada.`}),(0,x.jsx)(`td`,{children:`Draft (al abrir)`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Draft`}),(0,x.jsx)(`td`,{children:`Borrador generado; Apply Changes disabled hasta editar.`}),(0,x.jsx)(`td`,{children:`Draft`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Edited`}),(0,x.jsx)(`td`,{children:`Hay cambios sin aplicar: Apply Changes habilitado; descartar o regenerar pide confirmación.`}),(0,x.jsx)(`td`,{children:`—`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Applied`}),(0,x.jsx)(`td`,{children:`La narrativa editada quedó guardada en el workflow.`}),(0,x.jsx)(`td`,{children:`Edited`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Empty`}),(0,x.jsx)(`td`,{children:`No hay pasos guardados: aviso de error y nada que resumir.`}),(0,x.jsx)(`td`,{children:`No Answers`})]})]})})})},N={args:T,parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,x.jsx)(l,{children:(0,x.jsx)(f,{titulo:`Specs`,nota:`Lo común a todos los drawers está en Components / UI / Drawer.`,children:(0,x.jsxs)(d,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Size`}),(0,x.jsx)(`td`,{children:`xl · 760px`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Generation`}),(0,x.jsx)(`td`,{children:`900ms de skeleton; el borrador se arma con borradorNarrativa de data/workflows.ts.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Saved`}),(0,x.jsx)(`td`,{children:`En el workflow: la tarjeta de resumen de Treatment muestra el texto y Edit Narrative lo reabre.`})]})]})})})},P=[`Playground`,`Draft`,`NoAnswers`,`Edited`,`FormatButtons`,`Parts`,`States`,`Specs`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args,
  render: () => <Editor wf={CC} inicial={PROGRESO_INICIAL['chief-complaint']} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args,
  render: () => <Editor wf={CC} inicial={PROGRESO_INICIAL['chief-complaint']} />,
  play: esperar(/original clinical draft/i)
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args,
  render: () => <Editor wf={TR} />,
  play: esperar(/no answered questions to summarize/i)
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args,
  render: () => <Editor wf={CC} inicial={{
    ...PROGRESO_INICIAL['chief-complaint'],
    narrativa: {
      html: '<h2>Chief Complaint</h2><p>Patient reports sharp pain on the lower right with cold drinks, for a few days.</p>',
      origen: 'edited',
      fecha: 'Oct 05, 9:20 AM'
    }
  }} />,
  play: esperar(/edited narrative/i)
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args,
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="flex items-center gap-1">
      <BotonFormato etiqueta="Bold" icono={Bold} onClick={() => {}} />
      <BotonFormato etiqueta="Title" onClick={() => {}} />
      <BotonFormato etiqueta="List" icono={List} onClick={() => {}} disabled />
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args,
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
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Status</td><td>Original Clinical Draft (generado y guardado solo) o Edited narrative (aplicada), con la fecha.</td></tr>
          <tr><td className="font-semibold">Format bar</td><td>Bold, Title, Subtitle, Text y List. Deshabilitada mientras genera.</td></tr>
          <tr><td className="font-semibold">Editor</td><td>El texto con títulos por paso guardado y la lista de preguntas y respuestas.</td></tr>
          <tr><td className="font-semibold">Footer</td><td>Discard o Regenerate a la izquierda; Apply Changes a la derecha.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args,
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
      <Bloque titulo="States">
        <Tabla encabezado={["State", "When", "Story"]} minimo={560}>
          <tr><td className="font-semibold">Loading</td><td>Generando el borrador: skeleton y barra deshabilitada.</td><td>Draft (al abrir)</td></tr>
          <tr><td className="font-semibold">Draft</td><td>Borrador generado; Apply Changes disabled hasta editar.</td><td>Draft</td></tr>
          <tr><td className="font-semibold">Edited</td><td>Hay cambios sin aplicar: Apply Changes habilitado; descartar o regenerar pide confirmación.</td><td>—</td></tr>
          <tr><td className="font-semibold">Applied</td><td>La narrativa editada quedó guardada en el workflow.</td><td>Edited</td></tr>
          <tr><td className="font-semibold">Empty</td><td>No hay pasos guardados: aviso de error y nada que resumir.</td><td>No Answers</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args,
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
      <Bloque titulo="Specs" nota="Lo común a todos los drawers está en Components / UI / Drawer.">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Size</td><td>xl · 760px</td></tr>
          <tr><td className="font-semibold">Generation</td><td>900ms de skeleton; el borrador se arma con borradorNarrativa de data/workflows.ts.</td></tr>
          <tr><td className="font-semibold">Saved</td><td>En el workflow: la tarjeta de resumen de Treatment muestra el texto y Edit Narrative lo reabre.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...N.parameters?.docs?.source}}}})))()}F();export{D as Draft,k as Edited,A as FormatButtons,O as NoAnswers,j as Parts,E as Playground,N as Specs,M as States,P as __namedExportsOrder,w as default};