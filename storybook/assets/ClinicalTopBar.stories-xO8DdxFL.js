import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{a as t,i as n,n as r,r as i}from"./play-CDw6varG.js";import{i as a,t as o}from"./ClinicalTopBar-CaquETUq.js";import{n as s,r as c}from"./decorators-CDsp_K-7.js";var l,u,d,f,p,m;function h(){return(h=e((()=>{c(),a(),i(),l={title:`Components/Clinical/ClinicalTopBar`,component:o,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620}}},decorators:[s],args:{volverA:`/patients/patient-0001`,encuentro:!1,onEncuentro:()=>{},onOverview:()=>{},enOverview:!1}},u={},d={args:{encuentro:!0}},f={play:t(n(/^medications/i),r(/ibuprofeno/i))},p={play:t(n(/^referrals/i),r(/no referrals/i))},m=[`Default`,`EncounterStarted`,`CounterOpen`,`EmptyCounterOpen`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    encuentro: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^medications/i), esperar(/ibuprofeno/i))
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^referrals/i), esperar(/no referrals/i))
}`,...p.parameters?.docs?.source}}}})))()}h();export{f as CounterOpen,u as Default,p as EmptyCounterOpen,d as EncounterStarted,m as __namedExportsOrder,l as default};