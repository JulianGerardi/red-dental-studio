import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,t as r}from"./Settings-BmSQFuPW.js";import{n as i,t as a}from"./sliders-horizontal-YdgkuTmM.js";import{i as o,n as s,r as c,t as l}from"./SettingsSectionCard-_YXxuJBk.js";import{l as u,s as d}from"./mock-B6rq00xP.js";var f,p,m,h,g,_;function v(){return(v=e((()=>{i(),o(),s(),u(),n(),f=t(),p={title:`Components/Settings/SettingsSectionCard`,component:l,parameters:{layout:`padded`},args:{to:`/settings/accounts`,icon:c,title:`Accounts`,description:`Manage your account and their access.`},argTypes:{icon:{control:!1}},decorators:[e=>(0,f.jsx)(`div`,{className:`bg-page-background rounded-xl p-6`,children:(0,f.jsx)(`div`,{className:`w-[320px]`,children:(0,f.jsx)(e,{})})})]},m={},h={parameters:{pseudo:{hover:!0}}},g={decorators:[e=>(0,f.jsx)(`div`,{className:`bg-page-background rounded-xl p-6`,children:(0,f.jsx)(e,{})})],render:()=>(0,f.jsx)(`div`,{className:`grid w-[900px] max-w-full gap-5 md:grid-cols-2 xl:grid-cols-3`,children:d.map(e=>(0,f.jsx)(l,{to:e.to,icon:r[e.icon]??a,title:e.title,description:e.desc},e.to))})},_=[`Default`,`Hover`,`Grid`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div className="bg-page-background rounded-xl p-6"><Story /></div>],
  render: () => <div className="grid w-[900px] max-w-full gap-5 md:grid-cols-2 xl:grid-cols-3">
      {SETTINGS_SECTIONS.map(s => <SettingsSectionCard key={s.to} to={s.to} icon={SETTINGS_ICONS[s.icon] ?? SlidersHorizontal} title={s.title} description={s.desc} />)}
    </div>
}`,...g.parameters?.docs?.source}}}})))()}v();export{m as Default,g as Grid,h as Hover,_ as __namedExportsOrder,p as default};