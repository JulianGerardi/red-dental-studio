import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./preload-helper-wdlQj8DP.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{n as i,t as a}from"./FindingActionsMenu-61yhny3T.js";var o,s,c,l,u,d,f;function p(){return(p=e((()=>{i(),o=r(),t(),s={id:`F-1`,area:`Tooth 3`,condition:`chronic enamel dental caries`,descriptor:`Deep`,date:`May 14, 2026`,status:`Active`,tooth:3,provider:`Elena Martinez`,surfaces:[`O`],notes:``,linked:[],diagnoses:[]},c={title:`Components/Clinical/Dental/FindingActionsMenu`,component:a,args:{finding:s,onEdit:()=>{},onAction:()=>{}},decorators:[e=>(0,o.jsx)(`div`,{className:`h-72 w-64`,children:(0,o.jsx)(e,{})})]},l={},u={args:{finding:{...s,status:`Treated`}}},d={args:{finding:{...s,status:`Treated`}},play:async e=>{let{userEvent:t,within:r}=await n(async()=>{let{userEvent:e,within:t}=await import(__STORYBOOK_MODULE_TEST__);return{userEvent:e,within:t}},[],import.meta.url);await t.click(await r(e.canvasElement).findByRole(`button`))}},f=[`Open`,`Treated`,`StartTreatmentDisabledWhenTreated`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    finding: {
      ...FINDING,
      status: 'Treated'
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    finding: {
      ...FINDING,
      status: 'Treated'
    }
  },
  play: async c => {
    const {
      userEvent,
      within
    } = await import('storybook/test');
    await userEvent.click(await within(c.canvasElement).findByRole('button'));
  }
}`,...d.parameters?.docs?.source}}}})))()}p();export{l as Open,d as StartTreatmentDisabledWhenTreated,u as Treated,f as __namedExportsOrder,c as default};