import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{r as n,x as r}from"./clinical-mode-DbQBEzgV.js";import{c as i,n as a}from"./workflows-CNMUeq6f.js";import{n as o,t as s}from"./row-actions-menu-C8Fs22OQ.js";import{$t as c,Zt as l,en as u,nn as d,rn as f,tn as p}from"./iframe-BUvxbRz7.js";var m,h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{r(),i(),o(),f(),m=t(),h={title:`Components/Clinical/ClinicalTopBar parts`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:360}}}},g={render:()=>(0,m.jsx)(c,{titulo:`Medications`,ancla:new DOMRect(80,20,60,32),onClose:()=>{},children:(0,m.jsx)(u,{c:n[1]})})},_={render:()=>(0,m.jsx)(`div`,{className:`w-[220px] p-4`,children:(0,m.jsx)(u,{c:n[1]})})},v={render:()=>(0,m.jsx)(`div`,{className:`w-[220px] p-4`,children:(0,m.jsx)(u,{c:n[0]})})},y={render:()=>(0,m.jsx)(`div`,{className:`w-[300px] p-4`,children:(0,m.jsx)(d,{k:`CC`,progreso:a[`chief-complaint`],onAbrir:()=>{}})})},b={render:()=>(0,m.jsx)(`div`,{className:`w-[300px] p-4`,children:(0,m.jsx)(d,{k:`TR`,onAbrir:()=>{}})})},x={render:()=>(0,m.jsx)(l,{open:!0,onClose:()=>{},paciente:`patient-0001`})},S=e=>(0,m.jsx)(`div`,{className:`h-40 p-4`,children:(0,m.jsx)(s,{label:`Encounter options`,abierto:!0,children:(0,m.jsx)(p,{estado:e,onCambiar:()=>{},onCompletar:()=>{}})})}),C={render:()=>S(`enCurso`)},w={render:()=>S(`enPausa`)},T=[`FloatingPopover`,`CounterListFilled`,`CounterListEmpty`,`BadgeCompleted`,`BadgeEmpty`,`ClinicalNote`,`EncounterOptionsInProgress`,`EncounterOptionsPaused`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Flotante titulo="Medications" ancla={new DOMRect(80, 20, 60, 32)} onClose={() => {}}>
      <ListaContador c={CONTADORES[1]} />
    </Flotante>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[220px] p-4"><ListaContador c={CONTADORES[1]} /></div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[220px] p-4"><ListaContador c={CONTADORES[0]} /></div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[300px] p-4"><ResumenWorkflow k="CC" progreso={PROGRESO_INICIAL['chief-complaint']} onAbrir={() => {}} /></div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[300px] p-4"><ResumenWorkflow k="TR" onAbrir={() => {}} /></div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <ClinicalNoteDialog open onClose={() => {}} paciente="patient-0001" />
}`,...x.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => menuEncuentro('enCurso')
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => menuEncuentro('enPausa')
}`,...w.parameters?.docs?.source}}}})))()}E();export{y as BadgeCompleted,b as BadgeEmpty,x as ClinicalNote,v as CounterListEmpty,_ as CounterListFilled,C as EncounterOptionsInProgress,w as EncounterOptionsPaused,g as FloatingPopover,T as __namedExportsOrder,h as default};