import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{c as r,i,n as a,o,r as s,s as c,t as l}from"./LocationDetail-TZRV1may.js";function u(){let[e,t]=(0,d.useState)(!0);return(0,f.jsx)(o,{on:e,onChange:t})}var d,f,p,m,h,g,_,v,y,b,x,S;function C(){return(C=e((()=>{d=t(),r(),f=n(),p={title:`Pages/Parts/Location detail`,parameters:{docs:{jira:[`CON-1590`,`CON-4019`,`CON-1173`]},layout:`padded`}},m={render:()=>(0,f.jsx)(u,{})},h={render:()=>(0,f.jsx)(s,{nombreLocacion:`Abril`})},g={render:()=>(0,f.jsx)(c,{})},_={render:()=>(0,f.jsx)(i,{})},v={render:()=>(0,f.jsx)(l,{})},y=[`08:00 AM - 01:00 PM`,`02:00 PM - 06:00 PM`,`06:30 PM - 08:00 PM`,`08:15 PM - 09:00 PM`],b={render:()=>(0,f.jsx)(`div`,{className:`w-[900px]`,children:(0,f.jsx)(a,{label:`Monday`,rangos:y,onQuitar:()=>{},onEditar:()=>{}})})},x={render:()=>(0,f.jsx)(`div`,{className:`w-[420px]`,children:(0,f.jsx)(a,{label:`Monday`,rangos:y,onQuitar:()=>{},onEditar:()=>{}})})},S=[`OpenClosedSwitch`,`InformationTabView`,`WorkingHoursTabView`,`RoomsTabView`,`ExceptionsTabView`,`DayHoursFit`,`DayHoursOverflow`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Switch />
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <InformationTab nombreLocacion="Abril" />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <WorkingHoursTab />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <RoomsTab />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <ExceptionsTab />
}`,...v.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[900px]"><FranjasDia label="Monday" rangos={CUATRO} onQuitar={() => {}} onEditar={() => {}} /></div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px]"><FranjasDia label="Monday" rangos={CUATRO} onQuitar={() => {}} onEditar={() => {}} /></div>
}`,...x.parameters?.docs?.source}}}})))()}C();export{b as DayHoursFit,x as DayHoursOverflow,v as ExceptionsTabView,h as InformationTabView,m as OpenClosedSwitch,_ as RoomsTabView,g as WorkingHoursTabView,S as __namedExportsOrder,p as default};