import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./preload-helper-wdlQj8DP.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{i,n as a,r as o,t as s}from"./modals-C3S42C_A.js";import{a as c,i as l,n as u,r as d}from"./play-CDw6varG.js";var f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{i(),d(),f=r(),t(),p={title:`Components/Patients/Insurance modals`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620}}}},m={render:()=>(0,f.jsx)(o,{onClose:()=>{}})},h={render:()=>(0,f.jsx)(s,{onNuevoDependiente:()=>{},onClose:()=>{}})},g={render:()=>(0,f.jsx)(a,{onClose:()=>{}})},_={...m,play:c(l(/^save$/i),u(/required|at least|must|invalid/i))},v={render:()=>(0,f.jsx)(s,{onNuevoDependiente:()=>{},onClose:()=>{}}),play:async e=>{let{userEvent:t,within:r}=await n(async()=>{let{userEvent:e,within:t}=await import(__STORYBOOK_MODULE_TEST__);return{userEvent:e,within:t}},[],import.meta.url),i=r(e.canvasElement.ownerDocument.body).getAllByRole(`textbox`)[0];await t.clear(i),await l(/^save$/i)(e)}},y={...g,play:c(l(/^save$/i),u(/required|at least|must|invalid/i))},b=[`NewSubscription`,`ManageSubscription`,`NewDependent`,`NewSubscriptionWithErrors`,`ManageSubscriptionWithErrors`,`NewDependentWithErrors`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <NewSubscriptionModal onClose={() => {}} />
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <ManageSubscriptionModal onNuevoDependiente={() => {}} onClose={() => {}} />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <NewDependerModal onClose={() => {}} />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  ...NewSubscription,
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <ManageSubscriptionModal onNuevoDependiente={() => {}} onClose={() => {}} />,
  play: async c => {
    const {
      userEvent,
      within
    } = await import('storybook/test');
    const campo = within(c.canvasElement.ownerDocument.body).getAllByRole('textbox')[0];
    await userEvent.clear(campo);
    await pulsar(/^save$/i)(c);
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  ...NewDependent,
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,...y.parameters?.docs?.source}}}})))()}x();export{h as ManageSubscription,v as ManageSubscriptionWithErrors,g as NewDependent,y as NewDependentWithErrors,m as NewSubscription,_ as NewSubscriptionWithErrors,b as __namedExportsOrder,p as default};