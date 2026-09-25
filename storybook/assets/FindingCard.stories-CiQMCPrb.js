import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./FindingCard-TFymixkK.js";var i,a,o,s,c,l,u;function d(){return(d=e((()=>{n(),i=t(),a={id:`F-1`,area:`Tooth 3`,condition:`chronic enamel dental caries`,descriptor:`Deep`,date:`May 14, 2026`,status:`Active`,tooth:3,provider:`Elena Martinez`,surfaces:[`O`,`DB`],notes:``,linked:[],diagnoses:[]},o=[`Active`,`Monitoring`,`In Treatment`,`Treated`,`Externally Treated`,`No Treatment Needed`,`Patient Declined`,`Clinic Declined`,`Discarded`],s={title:`Components/Clinical/Dental/FindingCard`,component:r,args:{finding:a},decorators:[e=>(0,i.jsx)(`div`,{className:`w-[360px]`,children:(0,i.jsx)(e,{})})]},c={},l={render:()=>(0,i.jsx)(`div`,{className:`flex flex-col gap-2`,children:o.map(e=>(0,i.jsx)(r,{finding:{...a,id:e,status:e}},e))})},u=[`Default`,`AllStatuses`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      {ESTADOS.map(status => <FindingCard key={status} finding={{
      ...BASE,
      id: status,
      status
    }} />)}
    </div>
}`,...l.parameters?.docs?.source}}}})))()}d();export{l as AllStatuses,c as Default,u as __namedExportsOrder,s as default};