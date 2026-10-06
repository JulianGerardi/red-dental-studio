import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,l as r}from"./TreatmentPanel-pUOfcCZc.js";import{a as i,i as a,n as o,r as s,t as c}from"./play-CDw6varG.js";import{n as l,t as u}from"./WorkflowsContext-DHMrn74T.js";var d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{r(),l(),s(),d=t(),f={title:`Components/Clinical/TreatmentPanel`,component:n,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:900}}},decorators:[e=>(0,d.jsx)(u,{children:(0,d.jsx)(e,{})})]},p={},m={play:i(a(/^chief complaint/i),o(/2\/2 steps completed/i))},h={play:async e=>{for(let t of e.canvasElement.querySelectorAll(`[role="group"]`))[...t.querySelectorAll(`button`)].find(e=>e.textContent===`No`)?.click();await i(a(/^save step$/i),o(/1\/1 steps completed/i))(e)}},g={play:i(c(/search a section/i,`zzzz`),o(/no sections found/i))},_={play:i(a(/^chief complaint/i),a(/^generate narrative$/i),o(/original clinical draft/i))},v=[`Default`,`CompletedWorkflow`,`CompleteTriage`,`NoSections`,`NarrativeFromAnswers`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^chief complaint/i), esperar(/2\\/2 steps completed/i))
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  play: async c => {
    for (const grupo of c.canvasElement.querySelectorAll('[role="group"]')) {
      const no = [...grupo.querySelectorAll('button')].find(b => b.textContent === 'No');
      no?.click();
    }
    await secuencia(pulsar(/^save step$/i), esperar(/1\\/1 steps completed/i))(c);
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  play: secuencia(escribir(/search a section/i, 'zzzz'), esperar(/no sections found/i))
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^chief complaint/i), pulsar(/^generate narrative$/i), esperar(/original clinical draft/i))
}`,..._.parameters?.docs?.source}}}})))()}y();export{h as CompleteTriage,m as CompletedWorkflow,p as Default,_ as NarrativeFromAnswers,g as NoSections,v as __namedExportsOrder,f as default};