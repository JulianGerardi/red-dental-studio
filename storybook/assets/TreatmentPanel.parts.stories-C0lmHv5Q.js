import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,r as i}from"./tooltip-6ep9-x7U.js";import{a,c as o,l as s,n as c,o as l,r as u,s as d,t as f}from"./TreatmentPanel-pUOfcCZc.js";import{c as p,i as m,n as h}from"./workflows-CIU_52RF.js";function g(){let[e,t]=(0,v.useState)({"cc-motivo-1":`Problem / Concern`});return(0,y.jsx)(`div`,{className:`flex max-w-[560px] flex-col gap-2`,children:x.pasos[0].preguntas.map(n=>(0,y.jsx)(u,{pregunta:n,respuestas:e,onResponder:(e,n)=>t(t=>({...t,[e]:n}))},n.id))})}function _({inicial:e}){let[t,n]=(0,v.useState)(e);return(0,y.jsxs)(`div`,{className:`w-[290px]`,children:[(0,y.jsx)(`div`,{className:`flex justify-end`,children:(0,y.jsx)(d,{value:t,onChange:n})}),(0,y.jsx)(f,{value:t,onChange:n})]})}var v,y,b,x,S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{v=t(),r(),p(),s(),y=n(),b={title:`Components/Clinical/TreatmentPanel parts`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:560}}},decorators:[e=>(0,y.jsx)(i,{children:(0,y.jsx)(e,{})})]},[x,S,,,,C]=m,w={render:()=>(0,y.jsx)(g,{})},T={render:()=>(0,y.jsxs)(`ul`,{className:`flex w-[290px] flex-col gap-2`,children:[(0,y.jsx)(`li`,{children:(0,y.jsx)(l,{wf:S,seleccionado:!0,completo:!1,onElegir:()=>{}})}),(0,y.jsx)(`li`,{children:(0,y.jsx)(l,{wf:x,seleccionado:!1,completo:!0,onElegir:()=>{}})}),(0,y.jsx)(`li`,{children:(0,y.jsx)(l,{wf:C,seleccionado:!1,completo:!1,onElegir:()=>{}})})]})},E={render:()=>(0,y.jsxs)(`div`,{className:`grid max-w-[960px] gap-4 md:grid-cols-3`,children:[(0,y.jsx)(o,{wf:C,guardados:[]}),(0,y.jsx)(o,{wf:C,guardados:C.pasos.slice(0,3).map(e=>e.id)}),(0,y.jsx)(o,{wf:x,guardados:h[`chief-complaint`].guardados})]})},D={render:()=>(0,y.jsx)(_,{inicial:{categorias:[],q:``}})},O={render:()=>(0,y.jsx)(_,{inicial:{categorias:[`Questionnaire`,`Emergency`],q:`history`}})},k={render:()=>(0,y.jsx)(`div`,{className:`max-w-[640px]`,children:(0,y.jsx)(c,{narrativa:{html:`<h2>Chief Complaint</h2><h3>Reason for Visit</h3><ul><li>Problem / Concern</li><li>Sharp pain on the lower right when drinking something cold.</li></ul>`,origen:`draft`,fecha:`Oct 05, 9:20 AM`},onAbrir:()=>{}})})},A={render:()=>(0,y.jsx)(`div`,{className:`w-[311px]`,children:(0,y.jsx)(a,{})})},j=[`Questions`,`WorkflowCards`,`Progress`,`Filters`,`FiltersApplied`,`Narrative`,`TreatmentPlans`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Preguntas />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <ul className="flex w-[290px] flex-col gap-2">
      <li><WorkflowCard wf={TR} seleccionado completo={false} onElegir={() => {}} /></li>
      <li><WorkflowCard wf={CC} seleccionado={false} completo onElegir={() => {}} /></li>
      <li><WorkflowCard wf={PX} seleccionado={false} completo={false} onElegir={() => {}} /></li>
    </ul>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid max-w-[960px] gap-4 md:grid-cols-3">
      <WorkflowProgress wf={PX} guardados={[]} />
      <WorkflowProgress wf={PX} guardados={PX.pasos.slice(0, 3).map(p => p.id)} />
      <WorkflowProgress wf={CC} guardados={PROGRESO_INICIAL['chief-complaint'].guardados} />
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Filtros inicial={{
    categorias: [],
    q: ''
  }} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <Filtros inicial={{
    categorias: ['Questionnaire', 'Emergency'],
    q: 'history'
  }} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div className="max-w-[640px]">
      <NarrativeSummary narrativa={{
      html: '<h2>Chief Complaint</h2><h3>Reason for Visit</h3><ul><li>Problem / Concern</li><li>Sharp pain on the lower right when drinking something cold.</li></ul>',
      origen: 'draft',
      fecha: 'Oct 05, 9:20 AM'
    }} onAbrir={() => {}} />
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[311px]"><TreatmentPlansCard /></div>
}`,...A.parameters?.docs?.source}}}})))()}M();export{D as Filters,O as FiltersApplied,k as Narrative,E as Progress,w as Questions,A as TreatmentPlans,T as WorkflowCards,j as __namedExportsOrder,b as default};