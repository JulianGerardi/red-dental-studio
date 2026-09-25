import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,o as r,u as i}from"./calendar-data-rAGOWcc_.js";import{a,i as o,n as s,r as c,s as l,t as u}from"./CalendarViews-ryPnUV0v.js";var d,f,p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{i(),l(),d=t(),f={eventos:n,fecha:r,onMover:()=>{},onAbrir:()=>{}},p={title:`Components/Scheduling/CalendarViews`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:720}}}},m={render:()=>(0,d.jsx)(a,{...f})},h={render:()=>(0,d.jsx)(c,{...f})},g={render:()=>(0,d.jsx)(o,{...f})},_={render:()=>(0,d.jsx)(a,{...f,eventos:[]})},v={render:()=>(0,d.jsx)(o,{...f,eventos:[]})},y={render:()=>(0,d.jsx)(`div`,{className:`h-[420px] w-20 overflow-hidden`,children:(0,d.jsx)(s,{})})},b={render:()=>{let e=Array.from({length:7},(e,t)=>new Date(2022,4,29+t));return(0,d.jsx)(`div`,{className:`flex w-[900px]`,children:(0,d.jsx)(u,{dias:e,hoy:new Date(2022,4,31)})})}},x=[`Week`,`Day`,`Month`,`EmptyWeek`,`EmptyMonth`,`HoursColumn`,`DayHeader`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <VistaSemana {...props} />
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <VistaDia {...props} />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <VistaMes {...props} />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <VistaSemana {...props} eventos={[]} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <VistaMes {...props} eventos={[]} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-[420px] w-20 overflow-hidden"><ColumnaHoras /></div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const dias = Array.from({
      length: 7
    }, (_, i) => new Date(2022, 4, 29 + i));
    return <div className="flex w-[900px]"><Cabecera dias={dias} hoy={new Date(2022, 4, 31)} /></div>;
  }
}`,...b.parameters?.docs?.source}}}})))()}S();export{h as Day,b as DayHeader,v as EmptyMonth,_ as EmptyWeek,y as HoursColumn,g as Month,m as Week,x as __namedExportsOrder,p as default};