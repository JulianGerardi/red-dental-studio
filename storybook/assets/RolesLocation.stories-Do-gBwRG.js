import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a}from"./play-CDw6varG.js";import{n as o,r as s,t as c}from"./RolesLocation-D6jYeGHN.js";var l,u,d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{s(),a(),l=t(),{userEvent:u,within:d}=__STORYBOOK_MODULE_TEST__,f={title:`Components/Settings/RolesLocation`,component:o,parameters:{layout:`padded`}},p={},m={parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620}}},render:()=>(0,l.jsx)(c,{onGuardar:()=>{},onClose:()=>{}})},h={...m,play:n(r(/^save$/i),i(/required|at least|must|invalid/i))},g={render:()=>(0,l.jsx)(o,{}),play:async e=>{let t=d(e.canvasElement.ownerDocument.body);for(let e of[`Administrator`,`Dentist`,`Receptionist`])await u.click(await t.findByRole(`button`,{name:`Remove ${e}`}));await i(/no roles assigned/i)(e)}},_={render:()=>(0,l.jsx)(o,{})},v=[`Default`,`AssignRole`,`AssignRoleWithErrors`,`Empty`,`RoleExpandedSelected`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 620
      }
    }
  },
  render: () => <AssignRoleModal onGuardar={() => {}} onClose={() => {}} />
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  ...AssignRole,
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <RolesLocation />,
  play: async c => {
    const cuerpo = within(c.canvasElement.ownerDocument.body);
    for (const rol of ['Administrator', 'Dentist', 'Receptionist']) {
      await userEvent.click(await cuerpo.findByRole('button', {
        name: \`Remove \${rol}\`
      }));
    }
    await esperar(/no roles assigned/i)(c);
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <RolesLocation />
}`,..._.parameters?.docs?.source}}}})))()}y();export{m as AssignRole,h as AssignRoleWithErrors,p as Default,g as Empty,_ as RoleExpandedSelected,v as __namedExportsOrder,f as default};