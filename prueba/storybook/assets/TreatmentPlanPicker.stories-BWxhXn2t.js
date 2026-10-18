import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,r as i,t as a}from"./TreatmentPlanPicker-BgaIM6-n.js";var o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{n(),o=t(),s={id:`p1`,estado:`Accepted`,date:`02/12/2026`,doctor:`Dr. Elena Martinez`,therapy:`Crown and root canal`,visitas:2,procedimientos:4},c={id:`v1`,name:`Visit 1`,procedimientos:[`D3310`,`D2740`],total:`$1,240`},l={title:`Components/Scheduling/TreatmentPlanPicker`,parameters:{layout:`centered`},decorators:[e=>(0,o.jsx)(`div`,{className:`w-[380px]`,children:(0,o.jsx)(e,{})})]},u={render:()=>(0,o.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,o.jsx)(a,{plan:s,on:!0,onClick:()=>{}}),(0,o.jsx)(a,{plan:{...s,id:`p2`,estado:`Inprogress`,doctor:`Dr. Emily Chen`},on:!1,onClick:()=>{}})]})},d={render:()=>(0,o.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,o.jsx)(r,{visita:c,on:!0,onClick:()=>{}}),(0,o.jsx)(r,{visita:{...c,id:`v2`,name:`Visit 2`,total:`$860`},on:!1,onClick:()=>{}})]})},f={render:()=>(0,o.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,o.jsx)(i,{on:!0,onClick:()=>{},barra:`var(--color-dash-blue)`,className:`p-3`,children:(0,o.jsx)(`span`,{className:`text-[13px] font-semibold`,children:`Selected`})}),(0,o.jsx)(i,{on:!1,onClick:()=>{},className:`p-3`,children:(0,o.jsx)(`span`,{className:`text-[13px] font-semibold`,children:`Not selected`})})]})},p=[`Plans`,`Visits`,`SelectableCard`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <PlanCard plan={PLAN} on onClick={() => {}} />
      <PlanCard plan={{
      ...PLAN,
      id: 'p2',
      estado: 'Inprogress',
      doctor: 'Dr. Emily Chen'
    }} on={false} onClick={() => {}} />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <VisitRow visita={VISITA} on onClick={() => {}} />
      <VisitRow visita={{
      ...VISITA,
      id: 'v2',
      name: 'Visit 2',
      total: '$860'
    }} on={false} onClick={() => {}} />
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <Seleccionable on onClick={() => {}} barra="var(--color-dash-blue)" className="p-3"><span className="text-[13px] font-semibold">Selected</span></Seleccionable>
      <Seleccionable on={false} onClick={() => {}} className="p-3"><span className="text-[13px] font-semibold">Not selected</span></Seleccionable>
    </div>
}`,...f.parameters?.docs?.source}}}})))()}m();export{u as Plans,f as SelectableCard,d as Visits,p as __namedExportsOrder,l as default};