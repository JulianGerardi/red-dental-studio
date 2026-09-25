import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a}from"./play-CDw6varG.js";import{a as o,n as s,r as c,t as l}from"./RolesLocation-C6snoMWT.js";var u,d,f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{o(),a(),u=t(),{userEvent:d,within:f}=__STORYBOOK_MODULE_TEST__,p={title:`Components/Settings/RolesLocation`,component:c,parameters:{layout:`padded`}},m={},h={parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620}}},render:()=>(0,u.jsx)(l,{onGuardar:()=>{},onClose:()=>{}})},g={...h,play:n(r(/^save$/i),i(/required|at least|must|invalid/i))},_={render:()=>(0,u.jsx)(c,{}),play:async e=>{let t=f(e.canvasElement.ownerDocument.body);for(let e of[`Administrator`,`Dentist`,`Receptionist`])await d.click(await t.findByRole(`button`,{name:`Remove ${e}`}));await i(/no roles assigned/i)(e)}},v={render:()=>(0,u.jsx)(c,{})},y={render:()=>(0,u.jsxs)(`div`,{className:`flex w-[560px] flex-col gap-3`,children:[(0,u.jsx)(s,{rol:{id:`r1`,nombre:`Administrator`,sedes:[`Buenos Aires Medical 1`]},abierto:!1,onAbrir:()=>{},onCambiar:()=>{},onBorrar:()=>{}}),(0,u.jsx)(s,{rol:{id:`r2`,nombre:`Dentist`,sedes:[`Sede Pruebas 1`]},abierto:!0,onAbrir:()=>{},onCambiar:()=>{},onBorrar:()=>{}})]})},b=[`Default`,`AssignRole`,`AssignRoleWithErrors`,`Empty`,`RoleExpandedSelected`,`RoleRow`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  ...AssignRole,
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <RolesLocation />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[560px] flex-col gap-3">
      <FilaRol rol={{
      id: 'r1',
      nombre: 'Administrator',
      sedes: ['Buenos Aires Medical 1']
    }} abierto={false} onAbrir={() => {}} onCambiar={() => {}} onBorrar={() => {}} />
      <FilaRol rol={{
      id: 'r2',
      nombre: 'Dentist',
      sedes: ['Sede Pruebas 1']
    }} abierto onAbrir={() => {}} onCambiar={() => {}} onBorrar={() => {}} />
    </div>
}`,...y.parameters?.docs?.source}}}})))()}x();export{h as AssignRole,g as AssignRoleWithErrors,m as Default,_ as Empty,v as RoleExpandedSelected,y as RoleRow,b as __namedExportsOrder,p as default};