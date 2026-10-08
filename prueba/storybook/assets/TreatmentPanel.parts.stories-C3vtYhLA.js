import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,r as i}from"./tooltip-6ep9-x7U.js";import{c as a,n as o,o as s,r as c,s as l,t as u}from"./TreatmentPanel-m0DXBuxi.js";import{c as d,i as f,n as p}from"./workflows-CIU_52RF.js";function m(){let[e,t]=(0,g.useState)({"cc-motivo-1":`Problem / Concern`});return(0,_.jsx)(`div`,{className:`flex max-w-[560px] flex-col gap-2`,children:y.pasos[0].preguntas.map(n=>(0,_.jsx)(c,{pregunta:n,respuestas:e,onResponder:(e,n)=>t(t=>({...t,[e]:n}))},n.id))})}function h({inicial:e}){let[t,n]=(0,g.useState)(e);return(0,_.jsx)(`div`,{className:`w-[290px]`,children:(0,_.jsx)(u,{value:t,onChange:n})})}var g,_,v,y,b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{g=t(),r(),d(),a(),_=n(),v={title:`Components/Clinical/TreatmentPanel parts`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:560}}},decorators:[e=>(0,_.jsx)(i,{children:(0,_.jsx)(e,{})})]},[y,b,,,,x]=f,S={render:()=>(0,_.jsx)(m,{})},C={render:()=>(0,_.jsxs)(`ul`,{className:`flex w-[290px] flex-col gap-2`,children:[(0,_.jsx)(`li`,{children:(0,_.jsx)(s,{wf:b,seleccionado:!0,completo:!1,onElegir:()=>{}})}),(0,_.jsx)(`li`,{children:(0,_.jsx)(s,{wf:y,seleccionado:!1,completo:!0,onElegir:()=>{}})}),(0,_.jsx)(`li`,{children:(0,_.jsx)(s,{wf:x,seleccionado:!1,completo:!1,onElegir:()=>{}})})]})},w={render:()=>(0,_.jsxs)(`div`,{className:`grid max-w-[960px] gap-4 md:grid-cols-3`,children:[(0,_.jsx)(l,{wf:x,guardados:[]}),(0,_.jsx)(l,{wf:x,guardados:x.pasos.slice(0,3).map(e=>e.id)}),(0,_.jsx)(l,{wf:y,guardados:p[`chief-complaint`].guardados})]})},T={render:()=>(0,_.jsx)(h,{inicial:{categorias:[`Questionnaire`,`Emergency`],q:`history`}})},E={render:()=>(0,_.jsx)(`div`,{className:`max-w-[640px]`,children:(0,_.jsx)(o,{narrativa:{html:`<h2>Chief Complaint</h2><h3>Reason for Visit</h3><ul><li>Problem / Concern</li><li>Sharp pain on the lower right when drinking something cold.</li></ul>`,origen:`draft`,fecha:`Oct 05, 9:20 AM`},onAbrir:()=>{}})})},D=[`Questions`,`WorkflowCards`,`Progress`,`FiltersApplied`,`Narrative`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Preguntas />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <ul className="flex w-[290px] flex-col gap-2">
      <li><WorkflowCard wf={TR} seleccionado completo={false} onElegir={() => {}} /></li>
      <li><WorkflowCard wf={CC} seleccionado={false} completo onElegir={() => {}} /></li>
      <li><WorkflowCard wf={PX} seleccionado={false} completo={false} onElegir={() => {}} /></li>
    </ul>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid max-w-[960px] gap-4 md:grid-cols-3">
      <WorkflowProgress wf={PX} guardados={[]} />
      <WorkflowProgress wf={PX} guardados={PX.pasos.slice(0, 3).map(p => p.id)} />
      <WorkflowProgress wf={CC} guardados={PROGRESO_INICIAL['chief-complaint'].guardados} />
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Filtros inicial={{
    categorias: ['Questionnaire', 'Emergency'],
    q: 'history'
  }} />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div className="max-w-[640px]">
      <NarrativeSummary narrativa={{
      html: '<h2>Chief Complaint</h2><h3>Reason for Visit</h3><ul><li>Problem / Concern</li><li>Sharp pain on the lower right when drinking something cold.</li></ul>',
      origen: 'draft',
      fecha: 'Oct 05, 9:20 AM'
    }} onAbrir={() => {}} />
    </div>
}`,...E.parameters?.docs?.source}}}})))()}O();export{T as FiltersApplied,E as Narrative,w as Progress,S as Questions,C as WorkflowCards,D as __namedExportsOrder,v as default};