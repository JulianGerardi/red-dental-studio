import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./preload-helper-wdlQj8DP.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{a as i,i as a,m as o,n as s,p as c,r as l,t as u}from"./modals-mgyl_fIU.js";import{a as d,i as f,n as p,r as m}from"./play-CDw6varG.js";var h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{o(),i(),m(),h=r(),t(),g={title:`Components/Patients/Insurance modals`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620}}}},_={render:()=>(0,h.jsx)(a,{onClose:()=>{}})},v={render:()=>(0,h.jsx)(s,{onNuevoDependiente:()=>{},onClose:()=>{}})},y={render:()=>(0,h.jsx)(l,{onClose:()=>{}})},b={..._,play:d(f(/^save$/i),p(/required|at least|must|invalid/i))},x={render:()=>(0,h.jsx)(s,{onNuevoDependiente:()=>{},onClose:()=>{}}),play:async e=>{let{userEvent:t,within:r}=await n(async()=>{let{userEvent:e,within:t}=await import(__STORYBOOK_MODULE_TEST__);return{userEvent:e,within:t}},[],import.meta.url),i=r(e.canvasElement.ownerDocument.body).getAllByRole(`textbox`)[0];await t.clear(i),await f(/^save$/i)(e)}},S={...y,play:d(f(/^save$/i),p(/required|at least|must|invalid/i))},C={render:()=>(0,h.jsx)(`div`,{className:`w-[300px]`,children:(0,h.jsx)(u,{icon:c,label:`Carrier`,value:`Delta Dental`})})},w=[`NewSubscription`,`ManageSubscription`,`NewDependent`,`NewSubscriptionWithErrors`,`ManageSubscriptionWithErrors`,`NewDependentWithErrors`,`ReadOnlyRow`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <NewSubscriptionModal onClose={() => {}} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <ManageSubscriptionModal onNuevoDependiente={() => {}} onClose={() => {}} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <NewDependerModal onClose={() => {}} />
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  ...NewSubscription,
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  ...NewDependent,
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[300px]"><FilaLectura icon={ShieldHalf} label="Carrier" value="Delta Dental" /></div>
}`,...C.parameters?.docs?.source}}}})))()}T();export{v as ManageSubscription,x as ManageSubscriptionWithErrors,y as NewDependent,S as NewDependentWithErrors,_ as NewSubscription,b as NewSubscriptionWithErrors,C as ReadOnlyRow,w as __namedExportsOrder,g as default};