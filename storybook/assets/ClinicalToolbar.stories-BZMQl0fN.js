import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./ClinicalToolbar-BiUW8Ne4.js";function a(){let[e,t]=(0,o.useState)(`Exams`),[n,r]=(0,o.useState)(`Vitals`);return(0,s.jsx)(i,{juego:e,onJuego:t,pestana:n,onPestana:r})}var o,s,c,l,u,d;function f(){return(f=e((()=>{o=t(),r(),s=n(),c={title:`Components/Clinical/ClinicalToolbar`,component:i,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:720}}},args:{juego:`Exams`,onJuego:()=>{},pestana:`Vitals`,onPestana:()=>{}}},l={render:()=>(0,s.jsx)(a,{})},u={args:{juego:`Records`,pestana:`Treatment Plan`},render:e=>(0,s.jsx)(i,{...e})},d=[`Default`,`RecordsSelected`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Demo />
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    juego: 'Records',
    pestana: 'Treatment Plan' as Pestana
  },
  render: args => <ClinicalToolbar {...args} />
}`,...u.parameters?.docs?.source}}}})))()}f();export{l as Default,u as RecordsSelected,d as __namedExportsOrder,c as default};