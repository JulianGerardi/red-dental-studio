import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,i,o as a,r as o}from"./pilcrow-DOTNwM_s.js";import{n as s,r as c}from"./play-CDw6varG.js";import{c as l,i as u,n as d}from"./workflows-CIU_52RF.js";import{n as f,r as p,t as m}from"./NarrativeEditor-5I4-pIm2.js";function h({wf:e,inicial:t}){let[n,r]=(0,g.useState)(t);return(0,_.jsx)(f,{wf:e,progreso:n,open:!0,onClose:()=>{},onGuardar:e=>r(t=>({...t??{respuestas:{},guardados:[]},narrativa:{...e,fecha:`Oct 05, 9:20 AM`}}))})}var g,_,v,y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{g=t(),a(),i(),l(),p(),c(),_=n(),[v,y]=u,b={title:`Components/Clinical/NarrativeEditor`,component:f,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:760}}}},x={wf:v,open:!0,onClose:()=>{},onGuardar:()=>{}},S={args:x,render:()=>(0,_.jsx)(h,{wf:v,inicial:d[`chief-complaint`]}),play:s(/original clinical draft/i)},C={args:x,render:()=>(0,_.jsx)(h,{wf:y}),play:s(/no answered questions to summarize/i)},w={args:x,render:()=>(0,_.jsx)(h,{wf:v,inicial:{...d[`chief-complaint`],narrativa:{html:`<h2>Chief Complaint</h2><p>Patient reports sharp pain on the lower right with cold drinks, for a few days.</p>`,origen:`edited`,fecha:`Oct 05, 9:20 AM`}}}),play:s(/edited narrative/i)},T={args:x,parameters:{layout:`padded`},render:()=>(0,_.jsxs)(`div`,{className:`flex items-center gap-1`,children:[(0,_.jsx)(m,{etiqueta:`Bold`,icono:r,onClick:()=>{}}),(0,_.jsx)(m,{etiqueta:`Title`,onClick:()=>{}}),(0,_.jsx)(m,{etiqueta:`List`,icono:o,onClick:()=>{},disabled:!0})]})},E=[`Draft`,`NoAnswers`,`Edited`,`FormatButtons`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args,
  render: () => <Editor wf={CC} inicial={PROGRESO_INICIAL['chief-complaint']} />,
  play: esperar(/original clinical draft/i)
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args,
  render: () => <Editor wf={TR} />,
  play: esperar(/no answered questions to summarize/i)
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args,
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="flex items-center gap-1">
      <BotonFormato etiqueta="Bold" icono={Bold} onClick={() => {}} />
      <BotonFormato etiqueta="Title" onClick={() => {}} />
      <BotonFormato etiqueta="List" icono={List} onClick={() => {}} disabled />
    </div>
}`,...T.parameters?.docs?.source}}}})))()}D();export{S as Draft,w as Edited,T as FormatButtons,C as NoAnswers,E as __namedExportsOrder,b as default};