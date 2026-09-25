import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./preload-helper-wdlQj8DP.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{i,r as a}from"./LocationSelector-D4Id2ey7.js";var o,s,c,l,u;function d(){return(d=e((()=>{i(),o=r(),t(),s={title:`Components/Layout/LocationSelector`,component:a,decorators:[e=>(0,o.jsx)(`div`,{className:`h-[420px] w-[340px]`,children:(0,o.jsx)(e,{})})]},c={},l={play:async e=>{let{userEvent:t,within:r}=await n(async()=>{let{userEvent:e,within:t}=await import(__STORYBOOK_MODULE_TEST__);return{userEvent:e,within:t}},[],import.meta.url);await t.click(await r(e.canvasElement).findByRole(`button`,{expanded:!1}))}},u=[`Default`,`Open`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  play: async c => {
    const {
      userEvent,
      within
    } = await import('storybook/test');
    await userEvent.click(await within(c.canvasElement).findByRole('button', {
      expanded: false
    }));
  }
}`,...l.parameters?.docs?.source}}}})))()}d();export{c as Default,l as Open,u as __namedExportsOrder,s as default};