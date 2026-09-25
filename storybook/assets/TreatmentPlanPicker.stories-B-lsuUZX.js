import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,r,t as i}from"./TreatmentPlanPicker-CuGs99lV.js";var a,o,s,c,l,u,d;function f(){return(f=e((()=>{r(),a=t(),o={id:`p1`,estado:`Accepted`,date:`02/12/2026`,doctor:`Dr. Elena Martinez`,therapy:`Crown and root canal`,visitas:2,procedimientos:4},s={id:`v1`,name:`Visit 1`,procedimientos:[`D3310`,`D2740`],total:`$1,240`},c={title:`Components/Scheduling/TreatmentPlanPicker`,parameters:{layout:`centered`},decorators:[e=>(0,a.jsx)(`div`,{className:`w-[380px]`,children:(0,a.jsx)(e,{})})]},l={render:()=>(0,a.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,a.jsx)(i,{plan:o,on:!0,onClick:()=>{}}),(0,a.jsx)(i,{plan:{...o,id:`p2`,estado:`Inprogress`,doctor:`Dr. Emily Chen`},on:!1,onClick:()=>{}})]})},u={render:()=>(0,a.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,a.jsx)(n,{visita:s,on:!0,onClick:()=>{}}),(0,a.jsx)(n,{visita:{...s,id:`v2`,name:`Visit 2`,total:`$860`},on:!1,onClick:()=>{}})]})},d=[`Plans`,`Visits`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <PlanCard plan={PLAN} on onClick={() => {}} />
      <PlanCard plan={{
      ...PLAN,
      id: 'p2',
      estado: 'Inprogress',
      doctor: 'Dr. Emily Chen'
    }} on={false} onClick={() => {}} />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <VisitRow visita={VISITA} on onClick={() => {}} />
      <VisitRow visita={{
      ...VISITA,
      id: 'v2',
      name: 'Visit 2',
      total: '$860'
    }} on={false} onClick={() => {}} />
    </div>
}`,...u.parameters?.docs?.source}}}})))()}f();export{l as Plans,u as Visits,d as __namedExportsOrder,c as default};