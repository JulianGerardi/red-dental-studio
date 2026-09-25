import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{n,t as r}from"./utils-D-bRdWGo.js";import{t as i}from"./jsx-runtime-DeHZSEgm.js";function a({tabs:e,value:t,onChange:n,className:i,variant:a=`muted`}){return(0,o.jsx)(`div`,{className:r(`bg-muted inline-flex items-center rounded-lg p-1`,i),children:e.map(e=>(0,o.jsx)(`button`,{type:`button`,onClick:()=>n(e),className:r(`rounded-md px-3 py-1.5 text-xs font-medium transition-colors`,t===e?a===`primary`?`bg-primary text-primary-foreground shadow-sm`:`bg-background text-foreground shadow-sm`:`text-muted-foreground hover:text-foreground`),children:e},e))})}var o;function s(){return(s=e((()=>{n(),o=i(),a.__docgenInfo={description:``,methods:[],displayName:`Tabs`,props:{tabs:{required:!0,tsType:{name:`unknown`},description:``},value:{required:!0,tsType:{name:`T`},description:``},onChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(v: T) => void`,signature:{arguments:[{type:{name:`T`},name:`v`}],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``},variant:{required:!1,tsType:{name:`union`,raw:`'muted' | 'primary'`,elements:[{name:`literal`,value:`'muted'`},{name:`literal`,value:`'primary'`}]},description:``,defaultValue:{value:`'muted'`,computed:!1}}}}})))()}function c({variant:e}){let[t,n]=(0,l.useState)(`ASAP`);return(0,u.jsx)(a,{tabs:d,value:t,onChange:n,variant:e})}var l,u,d,f,p,m,h;function g(){return(g=e((()=>{l=t(),s(),u=i(),d=[`ASAP`,`Waiting List`,`Cancelled`],f={title:`Components/UI/Tabs`,component:a},p={args:{tabs:d,value:`ASAP`,onChange:()=>{}},render:()=>(0,u.jsx)(c,{variant:`muted`})},m={args:{tabs:d,value:`ASAP`,onChange:()=>{}},render:()=>(0,u.jsx)(c,{variant:`primary`})},h=[`Muted`,`Primary`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: TABS,
    value: 'ASAP',
    onChange: () => {}
  },
  render: () => <Demo variant="muted" />
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: TABS,
    value: 'ASAP',
    onChange: () => {}
  },
  render: () => <Demo variant="primary" />
}`,...m.parameters?.docs?.source}}}})))()}g();export{p as Muted,m as Primary,h as __namedExportsOrder,f as default};