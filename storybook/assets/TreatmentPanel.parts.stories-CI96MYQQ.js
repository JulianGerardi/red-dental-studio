import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,r as i}from"./tooltip-6ep9-x7U.js";import{a,c as o,n as s,o as c,r as l,s as u,t as d}from"./TreatmentPanel-TjtrDh0f.js";import{c as f,i as p,n as m}from"./workflows-CIU_52RF.js";function h(){let[e,t]=(0,_.useState)({"cc-motivo-1":`Problem / Concern`});return(0,v.jsx)(`div`,{className:`flex max-w-[560px] flex-col gap-2`,children:b.pasos[0].preguntas.map(n=>(0,v.jsx)(l,{pregunta:n,respuestas:e,onResponder:(e,n)=>t(t=>({...t,[e]:n}))},n.id))})}function g({inicial:e}){let[t,n]=(0,_.useState)(e);return(0,v.jsx)(`div`,{className:`w-[290px]`,children:(0,v.jsx)(d,{value:t,onChange:n})})}var _,v,y,b,x,S,C,w,T,E,D,O,k;function A(){return(A=e((()=>{_=t(),r(),f(),o(),v=n(),y={title:`Components/Clinical/TreatmentPanel parts`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:560}}},decorators:[e=>(0,v.jsx)(i,{children:(0,v.jsx)(e,{})})]},[b,x,,,,S]=p,C={render:()=>(0,v.jsx)(h,{})},w={render:()=>(0,v.jsxs)(`ul`,{className:`flex w-[290px] flex-col gap-2`,children:[(0,v.jsx)(`li`,{children:(0,v.jsx)(c,{wf:x,seleccionado:!0,completo:!1,onElegir:()=>{}})}),(0,v.jsx)(`li`,{children:(0,v.jsx)(c,{wf:b,seleccionado:!1,completo:!0,onElegir:()=>{}})}),(0,v.jsx)(`li`,{children:(0,v.jsx)(c,{wf:S,seleccionado:!1,completo:!1,onElegir:()=>{}})})]})},T={render:()=>(0,v.jsxs)(`div`,{className:`grid max-w-[960px] gap-4 md:grid-cols-3`,children:[(0,v.jsx)(u,{wf:S,guardados:[]}),(0,v.jsx)(u,{wf:S,guardados:S.pasos.slice(0,3).map(e=>e.id)}),(0,v.jsx)(u,{wf:b,guardados:m[`chief-complaint`].guardados})]})},E={render:()=>(0,v.jsx)(g,{inicial:{categorias:[`Questionnaire`,`Emergency`],q:`history`}})},D={render:()=>(0,v.jsx)(`div`,{className:`max-w-[640px]`,children:(0,v.jsx)(s,{narrativa:{html:`<h2>Chief Complaint</h2><h3>Reason for Visit</h3><ul><li>Problem / Concern</li><li>Sharp pain on the lower right when drinking something cold.</li></ul>`,origen:`draft`,fecha:`Oct 05, 9:20 AM`},onAbrir:()=>{}})})},O={render:()=>(0,v.jsx)(`div`,{className:`w-[311px]`,children:(0,v.jsx)(a,{})})},k=[`Questions`,`WorkflowCards`,`Progress`,`FiltersApplied`,`Narrative`,`TreatmentPlans`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Preguntas />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <ul className="flex w-[290px] flex-col gap-2">
      <li><WorkflowCard wf={TR} seleccionado completo={false} onElegir={() => {}} /></li>
      <li><WorkflowCard wf={CC} seleccionado={false} completo onElegir={() => {}} /></li>
      <li><WorkflowCard wf={PX} seleccionado={false} completo={false} onElegir={() => {}} /></li>
    </ul>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid max-w-[960px] gap-4 md:grid-cols-3">
      <WorkflowProgress wf={PX} guardados={[]} />
      <WorkflowProgress wf={PX} guardados={PX.pasos.slice(0, 3).map(p => p.id)} />
      <WorkflowProgress wf={CC} guardados={PROGRESO_INICIAL['chief-complaint'].guardados} />
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Filtros inicial={{
    categorias: ['Questionnaire', 'Emergency'],
    q: 'history'
  }} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div className="max-w-[640px]">
      <NarrativeSummary narrativa={{
      html: '<h2>Chief Complaint</h2><h3>Reason for Visit</h3><ul><li>Problem / Concern</li><li>Sharp pain on the lower right when drinking something cold.</li></ul>',
      origen: 'draft',
      fecha: 'Oct 05, 9:20 AM'
    }} onAbrir={() => {}} />
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[311px]"><TreatmentPlansCard /></div>
}`,...O.parameters?.docs?.source}}}})))()}A();export{E as FiltersApplied,D as Narrative,T as Progress,C as Questions,O as TreatmentPlans,w as WorkflowCards,k as __namedExportsOrder,y as default};