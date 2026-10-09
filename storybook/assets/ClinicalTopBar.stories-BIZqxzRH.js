import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{i as t,n,o as r,r as i}from"./play-Dr1R_I1D.js";import{n as a,o}from"./ClinicalTopBar-BmNnfXkf.js";import{n as s,r as c}from"./decorators-C-DWrbv_.js";var l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{c(),o(),i(),l={title:`Components/Clinical/ClinicalTopBar`,component:a,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620}}},decorators:[s],args:{volverA:`/patients/patient-0001`,encuentro:!1,onEncuentro:()=>{},onOverview:()=>{},enOverview:!1}},u={},d={args:{encuentro:!0}},f={play:r(t(/^medications/i),n(/ibuprofeno/i))},p={play:r(t(/^referrals/i),n(/no referrals/i))},m={play:r(t(/^triage: not completed/i),n(/has not answered the triage/i))},h={play:r(t(/^chief complaint: completed/i),n(/reason for visit/i))},g=[`Default`,`EncounterStarted`,`CounterOpen`,`EmptyCounterOpen`,`TriagePending`,`ChiefComplaintCompleted`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    encuentro: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^medications/i), esperar(/ibuprofeno/i))
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^referrals/i), esperar(/no referrals/i))
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^triage: not completed/i), esperar(/has not answered the triage/i))
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^chief complaint: completed/i), esperar(/reason for visit/i))
}`,...h.parameters?.docs?.source}}}})))()}_();export{h as ChiefComplaintCompleted,f as CounterOpen,u as Default,p as EmptyCounterOpen,d as EncounterStarted,m as TriagePending,g as __namedExportsOrder,l as default};